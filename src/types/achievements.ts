export type AchievementCategory = 
  | "questions" 
  | "streak" 
  | "xp" 
  | "flashcards" 
  | "accuracy" 
  | "milestone"
  | "special";

export type AchievementRarity = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  requirement: number;
  xpReward: number;
  isSecret?: boolean;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: string;
  notificationShown: boolean;
}

export interface AchievementProgress {
  achievementId: string;
  current: number;
  target: number;
  percentage: number;
  isUnlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // === PRIMEIROS PASSOS (QUESTÕES) ===
  {
    id: "first_question",
    name: "Primeiro Passo",
    description: "Resolva sua primeira questão",
    icon: "🎯",
    category: "questions",
    rarity: "bronze",
    requirement: 1,
    xpReward: 10,
  },
  {
    id: "first_correct",
    name: "Acerto Inicial",
    description: "Acerte sua primeira questão",
    icon: "✨",
    category: "questions",
    rarity: "bronze",
    requirement: 1,
    xpReward: 15,
  },
  {
    id: "ten_questions",
    name: "Dezena",
    description: "Resolva 10 questões",
    icon: "🔟",
    category: "questions",
    rarity: "bronze",
    requirement: 10,
    xpReward: 25,
  },
  {
    id: "fifty_questions",
    name: "Meio Centenar",
    description: "Resolva 50 questões",
    icon: "5️⃣",
    category: "questions",
    rarity: "silver",
    requirement: 50,
    xpReward: 50,
  },
  {
    id: "hundred_questions",
    name: "Centenário",
    description: "Resolva 100 questões",
    icon: "💯",
    category: "questions",
    rarity: "silver",
    requirement: 100,
    xpReward: 100,
  },
  {
    id: "two_hundred_questions",
    name: "Dobra",
    description: "Resolva 200 questões",
    icon: "💪",
    category: "questions",
    rarity: "silver",
    requirement: 200,
    xpReward: 150,
  },
  {
    id: "five_hundred_questions",
    name: "Quinze Vintenas",
    description: "Resolva 500 questões",
    icon: "🔥",
    category: "questions",
    rarity: "gold",
    requirement: 500,
    xpReward: 250,
  },
  {
    id: "thousand_questions",
    name: "Milenar",
    description: "Resolva 1000 questões",
    icon: "👑",
    category: "questions",
    rarity: "platinum",
    requirement: 1000,
    xpReward: 500,
  },

  // === STREAK (SEQUÊNCIAS) ===
  {
    id: "streak_3",
    name: "Consistência",
    description: "Estude 3 dias seguidos",
    icon: "🔥",
    category: "streak",
    rarity: "bronze",
    requirement: 3,
    xpReward: 30,
  },
  {
    id: "streak_7",
    name: "Semana Perfeita",
    description: "Estude 7 dias seguidos",
    icon: "📅",
    category: "streak",
    rarity: "silver",
    requirement: 7,
    xpReward: 75,
  },
  {
    id: "streak_14",
    name: "Quinzena",
    description: "Estude 14 dias seguidos",
    icon: "🌟",
    category: "streak",
    rarity: "silver",
    requirement: 14,
    xpReward: 150,
  },
  {
    id: "streak_30",
    name: "Mês de Aço",
    description: "Estude 30 dias seguidos",
    icon: "🏆",
    category: "streak",
    rarity: "gold",
    requirement: 30,
    xpReward: 300,
  },
  {
    id: "streak_60",
    name: "Bimestral",
    description: "Estude 60 dias seguidos",
    icon: "💎",
    category: "streak",
    rarity: "platinum",
    requirement: 60,
    xpReward: 600,
  },
  {
    id: "streak_100",
    name: "Trimestre",
    description: "Estude 100 dias seguidos",
    icon: "🚀",
    category: "streak",
    rarity: "platinum",
    requirement: 100,
    xpReward: 1000,
  },
  {
    id: "streak_365",
    name: "Anual",
    description: "Estude 365 dias seguidos",
    icon: "🌍",
    category: "streak",
    rarity: "diamond",
    requirement: 365,
    xpReward: 3650,
  },

  // === XP ===
  {
    id: "xp_100",
    name: "Novato",
    description: "Acumule 100 XP",
    icon: "⭐",
    category: "xp",
    rarity: "bronze",
    requirement: 100,
    xpReward: 10,
  },
  {
    id: "xp_500",
    name: "Aprendiz",
    description: "Acumule 500 XP",
    icon: "🌙",
    category: "xp",
    rarity: "bronze",
    requirement: 500,
    xpReward: 25,
  },
  {
    id: "xp_1000",
    name: "Estudioso",
    description: "Acumule 1000 XP",
    icon: "☀️",
    category: "xp",
    rarity: "silver",
    requirement: 1000,
    xpReward: 50,
  },
  {
    id: "xp_5000",
    name: "Mestre",
    description: "Acumule 5000 XP",
    icon: "🌈",
    category: "xp",
    rarity: "gold",
    requirement: 5000,
    xpReward: 150,
  },
  {
    id: "xp_10000",
    name: "Lenda",
    description: "Acumule 10000 XP",
    icon: "🎖️",
    category: "xp",
    rarity: "platinum",
    requirement: 10000,
    xpReward: 300,
  },

  // === FLASHCARDS ===
  {
    id: "flashcard_first",
    name: "Cartada Inicial",
    description: "Revise seu primeiro flashcard",
    icon: "📇",
    category: "flashcards",
    rarity: "bronze",
    requirement: 1,
    xpReward: 10,
  },
  {
    id: "flashcard_10",
    name: "Dezena de Cards",
    description: "Revise 10 flashcards",
    icon: "📚",
    category: "flashcards",
    rarity: "bronze",
    requirement: 10,
    xpReward: 25,
  },
  {
    id: "flashcard_50",
    name: "Meia Centena",
    description: "Revise 50 flashcards",
    icon: "📗",
    category: "flashcards",
    rarity: "silver",
    requirement: 50,
    xpReward: 50,
  },
  {
    id: "flashcard_100",
    name: "Centenário dos Cards",
    description: "Revise 100 flashcards",
    icon: "📕",
    category: "flashcards",
    rarity: "silver",
    requirement: 100,
    xpReward: 100,
  },
  {
    id: "flashcard_500",
    name: "Mestre da Memória",
    description: "Revise 500 flashcards",
    icon: "🧠",
    category: "flashcards",
    rarity: "gold",
    requirement: 500,
    xpReward: 200,
  },

  // === PRECISÃO/ACERTOS ===
  {
    id: "accuracy_10",
    name: "Iniciante Preciso",
    description: "Acerte 10 questões",
    icon: "🎯",
    category: "accuracy",
    rarity: "bronze",
    requirement: 10,
    xpReward: 30,
  },
  {
    id: "accuracy_50",
    name: "Marceneiro",
    description: "Acerte 50 questões",
    icon: "⚒️",
    category: "accuracy",
    rarity: "silver",
    requirement: 50,
    xpReward: 75,
  },
  {
    id: "accuracy_100",
    name: "Atirador de Elite",
    description: "Acerte 100 questões",
    icon: "🏅",
    category: "accuracy",
    rarity: "gold",
    requirement: 100,
    xpReward: 150,
  },
  {
    id: "accuracy_500",
    name: "Perfeito",
    description: "Acerte 500 questões",
    icon: "💫",
    category: "accuracy",
    rarity: "platinum",
    requirement: 500,
    xpReward: 400,
  },

  // === MILESTONES ESPECIAIS ===
  {
    id: "perfect_session",
    name: "Sessão Perfeita",
    description: "Acerte 5 questões seguidas sem errar",
    icon: "💯",
    category: "special",
    rarity: "silver",
    requirement: 5,
    xpReward: 100,
  },
  {
    id: "comeback",
    name: "Retorno Vitorioso",
    description: "Acerte uma questão que você havia errado antes",
    icon: "🔄",
    category: "special",
    rarity: "bronze",
    requirement: 1,
    xpReward: 25,
  },
  {
    id: "no_mistakes_topic",
    name: "Mestre do Tema",
    description: "Complete um tema sem errar nenhuma questão",
    icon: "🏆",
    category: "special",
    rarity: "gold",
    requirement: 1,
    xpReward: 150,
  },
  {
    id: "speed_demon",
    name: "Veloz",
    description: "Responda 10 questões em menos de 5 minutos",
    icon: "⚡",
    category: "special",
    rarity: "silver",
    requirement: 10,
    xpReward: 75,
    isSecret: true,
  },
  {
    id: "night_owl",
    name: "Coruja",
    description: "Estude depois da meia-noite",
    icon: "🦉",
    category: "special",
    rarity: "bronze",
    requirement: 1,
    xpReward: 25,
    isSecret: true,
  },
  {
    id: "early_bird",
    name: "Madrugador",
    description: "Estude antes das 6h da manhã",
    icon: "🐦",
    category: "special",
    rarity: "bronze",
    requirement: 1,
    xpReward: 25,
    isSecret: true,
  },

  // === RESUMOS ===
  {
    id: "first_summary",
    name: "Leitor",
    description: "Leia seu primeiro resumo",
    icon: "📖",
    category: "milestone",
    rarity: "bronze",
    requirement: 1,
    xpReward: 15,
  },
  {
    id: "summary_5",
    name: "Estudioso",
    description: "Leia 5 resumos",
    icon: "📚",
    category: "milestone",
    rarity: "silver",
    requirement: 5,
    xpReward: 40,
  },
  {
    id: "summary_10",
    name: "Enciclopédia",
    description: "Leia 10 resumos",
    icon: "📕",
    category: "milestone",
    rarity: "gold",
    requirement: 10,
    xpReward: 100,
  },

  // === PATENTES/LEVEL ===
  {
    id: "rank_soldier",
    name: "Soldado",
    description: "Alcance a patente Soldado",
    icon: "🎖️",
    category: "milestone",
    rarity: "bronze",
    requirement: 200,
    xpReward: 0,
  },
  {
    id: "rank_sergeant",
    name: "2º Sargento",
    description: "Alcance a patente 2º Sargento",
    icon: "⭐",
    category: "milestone",
    rarity: "silver",
    requirement: 900,
    xpReward: 0,
  },
  {
    id: "rank_captain",
    name: "Capitão",
    description: "Alcance a patente Capitão",
    icon: "🌟",
    category: "milestone",
    rarity: "gold",
    requirement: 6500,
    xpReward: 0,
  },
  {
    id: "rank_colonel",
    name: "Coronel",
    description: "Alcance a patente Coronel",
    icon: "👑",
    category: "milestone",
    rarity: "platinum",
    requirement: 18000,
    xpReward: 0,
  },
  {
    id: "rank_commander",
    name: "Comandante-Geral",
    description: "Alcance a patente máxima: Comandante-Geral",
    icon: "🏆",
    category: "milestone",
    rarity: "diamond",
    requirement: 25000,
    xpReward: 500,
  },
];

export const getRarityColor = (rarity: AchievementRarity): string => {
  switch (rarity) {
    case "bronze": return "text-amber-700";
    case "silver": return "text-slate-400";
    case "gold": return "text-yellow-500";
    case "platinum": return "text-cyan-400";
    case "diamond": return "text-purple-500";
  }
};

export const getRarityBgColor = (rarity: AchievementRarity): string => {
  switch (rarity) {
    case "bronze": return "bg-amber-700/10 border-amber-700/30";
    case "silver": return "bg-slate-400/10 border-slate-400/30";
    case "gold": return "bg-yellow-500/10 border-yellow-500/30";
    case "platinum": return "bg-cyan-400/10 border-cyan-400/30";
    case "diamond": return "bg-purple-500/10 border-purple-500/30";
  }
};

export const getRarityLabel = (rarity: AchievementRarity): string => {
  switch (rarity) {
    case "bronze": return "Bronze";
    case "silver": return "Prata";
    case "gold": return "Ouro";
    case "platinum": return "Platina";
    case "diamond": return "Diamante";
  }
};
