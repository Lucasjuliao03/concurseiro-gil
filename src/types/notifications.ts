export interface NotificationSettings {
  enabled: boolean;
  dailyReminder: boolean;
  dailyReminderTime: string; // HH:mm
  streakAlert: boolean;
  streakAlertHours: number; // horas antes de perder streak
  achievementAlert: boolean;
  weeklyReport: boolean;
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  tag?: string;
  data?: Record<string, any>;
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: false,
  dailyReminder: true,
  dailyReminderTime: "09:00",
  streakAlert: true,
  streakAlertHours: 20, // Alerta às 20h se não estudou hoje
  achievementAlert: true,
  weeklyReport: true,
};

export const NOTIFICATION_MESSAGES = {
  dailyReminder: [
    "Hora de estudar! 🚀 Sua jornada rumo à aprovação continua.",
    "Bom dia, concurseiro! Vamos resolver algumas questões? 💪",
    "O estudo é a chave do sucesso. Você está pronto? 📚",
    "Um novo dia, uma nova chance de crescer. Vamos estudar! 🌟",
    "Não deixe o estudo para depois. Comece agora! 🎯",
  ],
  streakAlert: [
    "⚠️ Seu streak está em risco! Estude hoje para não perdê-lo.",
    "🔥 Você ainda não estudou hoje. Seu streak precisa de você!",
    "⏰ O dia está acabando! Resolva pelo menos uma questão para manter seu streak.",
  ],
  streakSaved: [
    "🎉 Streak mantido! Você está indo muito bem!",
    "✅ Uma questão resolvida e seu streak está salvo!",
  ],
  achievementUnlocked: [
    "🏆 Nova conquista desbloqueada! Continue assim!",
    "⭐ Você ganhou uma nova medalha!",
  ],
  weeklyReport: [
    "📊 Seu resumo semanal está pronto! Veja seu progresso.",
  ],
};
