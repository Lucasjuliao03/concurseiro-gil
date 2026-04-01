import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNotifications, initNotificationListeners } from '@/hooks/useNotifications';

interface NotificationContextType {
  settings: ReturnType<typeof useNotifications>['settings'];
  permission: NotificationPermission;
  isSupported: boolean;
  sendNotification: ReturnType<typeof useNotifications>['sendNotification'];
  sendDailyReminder: ReturnType<typeof useNotifications>['sendDailyReminder'];
  sendStreakAlert: ReturnType<typeof useNotifications>['sendStreakAlert'];
  sendAchievementNotification: ReturnType<typeof useNotifications>['sendAchievementNotification'];
  sendStreakSavedNotification: ReturnType<typeof useNotifications>['sendStreakSavedNotification'];
  markAsStudied: ReturnType<typeof useNotifications>['markAsStudied'];
  checkAndNotify: ReturnType<typeof useNotifications>['checkAndNotify'];
  requestPermission: ReturnType<typeof useNotifications>['requestPermission'];
  saveSettings: ReturnType<typeof useNotifications>['saveSettings'];
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notifications = useNotifications();

  useEffect(() => {
    initNotificationListeners(notifications);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return ctx;
}
