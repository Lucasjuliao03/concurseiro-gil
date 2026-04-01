import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, BellOff, Clock, Flame, Trophy, BarChart3, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function NotificationSettings() {
  const notifications = useNotifications();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = async (key: keyof typeof notifications.settings) => {
    if (key === 'enabled') {
      if (!notifications.settings.enabled) {
        const granted = await notifications.requestPermission();
        if (!granted) {
          toast.error('Permissão de notificação negada');
          return;
        }
        toast.success('Notificações ativadas!');
      }
      notifications.saveSettings({
        ...notifications.settings,
        enabled: !notifications.settings.enabled,
      });
    } else {
      notifications.saveSettings({
        ...notifications.settings,
        [key]: !notifications.settings[key as keyof typeof notifications.settings],
      });
    }
  };

  const handleTimeChange = (time: string) => {
    notifications.saveSettings({
      ...notifications.settings,
      dailyReminderTime: time,
    });
  };

  if (!notifications.isSupported) {
    return (
      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-sm text-muted-foreground text-center">
          Notificações não são suportadas neste navegador.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            notifications.settings.enabled 
              ? "bg-primary/15 text-primary" 
              : "bg-muted text-muted-foreground"
          )}>
            {notifications.settings.enabled ? (
              <Bell className="h-5 w-5" />
            ) : (
              <BellOff className="h-5 w-5" />
            )}
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">Notificações</p>
            <p className="text-xs text-muted-foreground">
              {notifications.settings.enabled ? 'Ativadas' : 'Desativadas'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            notifications.permission === 'granted' 
              ? "bg-success/15 text-success" 
              : notifications.permission === 'denied'
              ? "bg-destructive/15 text-destructive"
              : "bg-warning/15 text-warning"
          )}>
            {notifications.permission === 'granted' ? 'OK' : 
             notifications.permission === 'denied' ? 'Bloqueado' : 'Pendente'}
          </span>
          <ChevronRight className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-90"
          )} />
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-3 pl-2 animate-slide-down">
          <ToggleOption
            icon={Bell}
            label="Lembrete Diário"
            description="Receba um lembrete para estudar"
            checked={notifications.settings.dailyReminder}
            onChange={() => handleToggle('dailyReminder')}
          />

          {notifications.settings.dailyReminder && (
            <div className="pl-8 pr-4 py-2">
              <label className="text-xs text-muted-foreground mb-1 block">
                Horário do lembrete
              </label>
              <input
                type="time"
                value={notifications.settings.dailyReminderTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
          )}

          <ToggleOption
            icon={Flame}
            label="Alerta de Streak"
            description="Avise quando seu streak estiver em risco"
            checked={notifications.settings.streakAlert}
            onChange={() => handleToggle('streakAlert')}
          />

          <ToggleOption
            icon={Trophy}
            label="Conquistas"
            description="Notifique ao desbloquear medalhas"
            checked={notifications.settings.achievementAlert}
            onChange={() => handleToggle('achievementAlert')}
          />

          <ToggleOption
            icon={BarChart3}
            label="Relatório Semanal"
            description="Resumo do seu progresso"
            checked={notifications.settings.weeklyReport}
            onChange={() => handleToggle('weeklyReport')}
          />

          {notifications.permission === 'denied' && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-xs text-destructive">
                ⚠️ Notificações bloqueadas. Para ativar, vá nas configurações do navegador e permita notificações para este site.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ToggleOption({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: typeof Bell;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center",
          checked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className={cn(
        "w-11 h-6 rounded-full transition-all relative",
        checked ? "bg-primary" : "bg-muted"
      )}>
        <div className={cn(
          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
          checked ? "left-6" : "left-1"
        )} />
      </div>
    </button>
  );
}
