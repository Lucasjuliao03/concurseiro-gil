import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotificationContext } from '@/contexts/NotificationContext';

interface NotificationBannerProps {
  onDismiss?: () => void;
}

export function NotificationBanner({ onDismiss }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const notifications = useNotificationContext();

  useEffect(() => {
    const dismissed = localStorage.getItem('notification_banner_dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }
    
    if (notifications.isSupported && notifications.permission === 'default') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications.isSupported, notifications.permission]);

  const handleAccept = async () => {
    const granted = await notifications.requestPermission();
    if (granted) {
      notifications.saveSettings({
        ...notifications.settings,
        enabled: true,
        dailyReminder: true,
        streakAlert: true,
        achievementAlert: true,
      });
    }
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('notification_banner_dismissed', 'true');
    onDismiss?.();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('notification_banner_dismissed', 'true');
    onDismiss?.();
  };

  if (!isVisible || isDismissed || !notifications.isSupported) {
    return null;
  }

  return (
    <div className={cn(
      "fixed top-4 left-4 right-4 z-50 mx-auto max-w-md",
      "animate-slide-down"
    )}>
      <div className="rounded-2xl bg-gradient-to-br from-primary/95 to-primary/90 p-4 shadow-xl backdrop-blur-sm border border-white/10">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg mb-1">
              Ative as Notificações 🔔
            </h3>
            <p className="text-white/80 text-sm mb-3">
              Receba lembretes diários para estudar e não perca seu streak! Nunca mais esqueça de praticar.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 transition-colors active:scale-[0.98]"
              >
                Ativar
              </button>
              <button
                onClick={handleDismiss}
                className="py-2.5 px-4 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useNotificationBanner() {
  const notifications = useNotificationContext();

  useEffect(() => {
    if (!notifications.isSupported || notifications.permission !== 'default') {
      return;
    }

    const dismissed = localStorage.getItem('notification_banner_dismissed');
    if (dismissed) {
      return;
    }

    const timer = setTimeout(() => {
      const event = new CustomEvent('safo:show-notification-banner');
      window.dispatchEvent(event);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notifications.isSupported, notifications.permission]);
}
