import { useState, useEffect, useCallback } from 'react';
import { NotificationSettings, DEFAULT_NOTIFICATION_SETTINGS, NOTIFICATION_MESSAGES, NotificationPayload } from '@/types/notifications';
import { supabase } from '@/lib/supabase';

const SETTINGS_KEY = 'notification_settings';
const LAST_NOTIFICATION_KEY = 'last_notification_date';

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        try {
          setSettings({ ...DEFAULT_NOTIFICATION_SETTINGS, ...JSON.parse(savedSettings) });
        } catch (e) {
          console.error('Erro ao carregar settings de notificação:', e);
        }
      }

      setLastStudyDate(localStorage.getItem(LAST_NOTIFICATION_KEY));
    }
  }, []);

  const saveSettings = useCallback((newSettings: NotificationSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    
    if (newSettings.enabled) {
      scheduleNotifications(newSettings);
    } else {
      clearScheduledNotifications();
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        const newSettings = { ...settings, enabled: true };
        saveSettings(newSettings);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Erro ao solicitar permissão:', e);
      return false;
    }
  }, [isSupported, settings, saveSettings]);

  const sendNotification = useCallback((payload: NotificationPayload) => {
    if (!isSupported || permission !== 'granted' || !settings.enabled) {
      return;
    }

    try {
      const notification = new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon-192.png',
        tag: payload.tag || 'safo-notification',
        requireInteraction: false,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        if (payload.data?.url) {
          window.location.href = payload.data.url;
        }
      };

      setTimeout(() => notification.close(), 10000);
    } catch (e) {
      console.error('Erro ao enviar notificação:', e);
    }
  }, [isSupported, permission, settings.enabled]);

  const sendDailyReminder = useCallback(() => {
    if (!settings.dailyReminder) return;
    
    const messages = NOTIFICATION_MESSAGES.dailyReminder;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    sendNotification({
      title: '📚 Hora de Estudar!',
      body: randomMessage,
      tag: 'daily-reminder',
      data: { url: '/questoes' },
    });
  }, [settings.dailyReminder, sendNotification]);

  const sendStreakAlert = useCallback(() => {
    if (!settings.streakAlert) return;
    
    const messages = NOTIFICATION_MESSAGES.streakAlert;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    sendNotification({
      title: '🔥 Streak em Risco!',
      body: randomMessage,
      tag: 'streak-alert',
      data: { url: '/questoes' },
    });
  }, [settings.streakAlert, sendNotification]);

  const sendAchievementNotification = useCallback((achievementName: string, icon: string) => {
    if (!settings.achievementAlert) return;
    
    sendNotification({
      title: '🏆 Conquista Desbloqueada!',
      body: `${icon} ${achievementName}`,
      tag: 'achievement',
      data: { url: '/medalhas' },
    });
  }, [settings.achievementAlert, sendNotification]);

  const sendStreakSavedNotification = useCallback(() => {
    if (!settings.streakAlert) return;
    
    const messages = NOTIFICATION_MESSAGES.streakSaved;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    sendNotification({
      title: '✅ Streak Mantido!',
      body: randomMessage,
      tag: 'streak-saved',
    });
  }, [settings.streakAlert, sendNotification]);

  const markAsStudied = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(LAST_NOTIFICATION_KEY, today);
    setLastStudyDate(today);
  }, []);

  const checkAndNotify = useCallback(async (userId: string) => {
    if (!settings.enabled) return;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const { data: prodData } = await supabase
      .from('user_daily_productivity')
      .select('questions_answered')
      .eq('user_id', userId)
      .eq('productivity_date', todayStr)
      .single();

    const hasStudiedToday = prodData && prodData.questions_answered > 0;

    if (hasStudiedToday) {
      markAsStudied();
    } else {
      const lastStudy = localStorage.getItem(LAST_NOTIFICATION_KEY);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastStudy !== yesterdayStr && lastStudy !== todayStr) {
        sendStreakAlert();
      }
    }
  }, [settings.enabled, markAsStudied, sendStreakAlert]);

  return {
    settings,
    permission,
    isSupported,
    lastStudyDate,
    saveSettings,
    requestPermission,
    sendNotification,
    sendDailyReminder,
    sendStreakAlert,
    sendAchievementNotification,
    sendStreakSavedNotification,
    markAsStudied,
    checkAndNotify,
  };
}

function scheduleNotifications(settings: NotificationSettings) {
  if (typeof window === 'undefined') return;
  
  clearScheduledNotifications();
  
  if (settings.dailyReminder && settings.dailyReminderTime) {
    scheduleDailyReminder(settings.dailyReminderTime);
  }
}

function scheduleDailyReminder(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hours, minutes, 0, 0);
  
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  const msUntilReminder = scheduledTime.getTime() - now.getTime();
  
  (window as any).dailyReminderTimeout = setTimeout(() => {
    window.dispatchEvent(new CustomEvent('safo:daily-reminder'));
    scheduleDailyReminder(time);
  }, msUntilReminder);
}

function clearScheduledNotifications() {
  if ((window as any).dailyReminderTimeout) {
    clearTimeout((window as any).dailyReminderTimeout);
  }
}

export function initNotificationListeners(notifications: ReturnType<typeof useNotifications>) {
  if (typeof window === 'undefined') return;

  window.removeEventListener('safo:daily-reminder', () => {});
  
  window.addEventListener('safo:daily-reminder', () => {
    notifications.sendDailyReminder();
  });
}
