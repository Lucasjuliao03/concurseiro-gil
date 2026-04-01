import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ACHIEVEMENTS, AchievementCategory, getRarityBgColor, getRarityColor } from "@/types/achievements";

export interface UserAchievementRow {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  notification_shown: boolean;
}

export function useUserAchievements(userId: string | undefined) {
  return useQuery({
    queryKey: ["userAchievements", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", userId)
        .order("unlocked_at", { ascending: false });

      if (error) {
        console.error("[useUserAchievements] Erro:", error);
        return [];
      }
      
      return (data || []) as UserAchievementRow[];
    },
    enabled: !!userId,
    staleTime: 1000 * 30,
  });
}

export function useAchievementStats(userId: string | undefined) {
  const { data: userAchievements = [], isLoading } = useUserAchievements(userId);

  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievement_id));
  const unlockedCount = unlockedIds.size;
  
  // Não conta conquistas secretas
  const totalCount = ACHIEVEMENTS.filter(a => !a.isSecret).length;

  const categories: Record<AchievementCategory, { unlocked: number; total: number }> = {
    questions: { unlocked: 0, total: 0 },
    streak: { unlocked: 0, total: 0 },
    xp: { unlocked: 0, total: 0 },
    flashcards: { unlocked: 0, total: 0 },
    accuracy: { unlocked: 0, total: 0 },
    milestone: { unlocked: 0, total: 0 },
    special: { unlocked: 0, total: 0 },
  };

  ACHIEVEMENTS.filter(a => !a.isSecret).forEach((a) => {
    categories[a.category].total++;
    if (unlockedIds.has(a.id)) {
      categories[a.category].unlocked++;
    }
  });

  const totalXpFromAchievements = ACHIEVEMENTS
    .filter((a) => unlockedIds.has(a.id))
    .reduce((sum, a) => sum + a.xpReward, 0);

  const recentAchievements = userAchievements.slice(0, 5).map((ua) => {
    const achievement = ACHIEVEMENTS.find((a) => a.id === ua.achievement_id);
    return achievement ? { ...achievement, unlockedAt: ua.unlocked_at } : null;
  }).filter(Boolean);

  return {
    unlockedCount,
    totalCount,
    categories,
    totalXpFromAchievements,
    recentAchievements,
    percentage: totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0,
    isLoading,
  };
}

export function useAchievementProgress(userId: string | undefined, stats: {
  questionsAnswered?: number;
  questionsCorrect?: number;
  currentStreak?: number;
  totalXp?: number;
  flashcardsReviewed?: number;
  summariesRead?: number;
}) {
  const { data: userAchievements = [] } = useUserAchievements(userId);

  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievement_id));

  return ACHIEVEMENTS.filter((a) => !a.isSecret).map((achievement) => {
    const isUnlocked = unlockedIds.has(achievement.id);

    let current = 0;
    switch (achievement.category) {
      case "questions":
        current = stats.questionsAnswered || 0;
        break;
      case "streak":
        current = stats.currentStreak || 0;
        break;
      case "xp":
        current = stats.totalXp || 0;
        break;
      case "flashcards":
        current = stats.flashcardsReviewed || 0;
        break;
      case "accuracy":
        current = stats.questionsCorrect || 0;
        break;
      case "milestone":
        current = stats.summariesRead || 0;
        break;
    }

    const percentage = Math.min(100, Math.round((current / achievement.requirement) * 100));

    return {
      ...achievement,
      isUnlocked,
      current,
      progress: {
        current: Math.min(current, achievement.requirement),
        target: achievement.requirement,
        percentage,
      },
    };
  });
}

export function useGroupedAchievements(userId: string | undefined, stats: {
  questionsAnswered?: number;
  questionsCorrect?: number;
  currentStreak?: number;
  totalXp?: number;
  flashcardsReviewed?: number;
  summariesRead?: number;
}) {
  const progress = useAchievementProgress(userId, stats);

  const grouped: Record<AchievementCategory, typeof progress> = {
    questions: [],
    streak: [],
    xp: [],
    flashcards: [],
    accuracy: [],
    milestone: [],
    special: [],
  };

  progress.forEach((p) => {
    grouped[p.category].push(p);
  });

  // Ordenar por raridade e depois por requirement
  const rarityOrder = ["bronze", "silver", "gold", "platinum", "diamond"] as const;
  const sortFn = (a: typeof progress[0], b: typeof progress[0]) => {
    const rarityDiff = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    if (rarityDiff !== 0) return rarityDiff;
    return a.requirement - b.requirement;
  };

  grouped.questions.sort(sortFn);
  grouped.streak.sort(sortFn);
  grouped.xp.sort(sortFn);
  grouped.flashcards.sort(sortFn);
  grouped.accuracy.sort(sortFn);
  grouped.milestone.sort(sortFn);
  grouped.special.sort(sortFn);

  return grouped;
}
