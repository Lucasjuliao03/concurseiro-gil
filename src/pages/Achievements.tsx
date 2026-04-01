import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useGroupedAchievements, useAchievementStats, useUserAchievements } from "@/hooks/useAchievements";
import { useUserProfile, useUserQuestionStats, useUserProductivity, useUserFlashcardReviews } from "@/hooks/useStudyData";
import { ACHIEVEMENTS, AchievementCategory, getRarityColor, getRarityBgColor, getRarityLabel } from "@/types/achievements";
import { Trophy, ChevronLeft, Lock, Check, Flame, BookOpen, Zap, Layers, Target, Star, Sparkles, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const CATEGORY_INFO: Record<AchievementCategory, { label: string; icon: typeof Trophy; description: string }> = {
  questions: { label: "Questões", icon: BookOpen, description: "Resolva questões para desbloquear" },
  streak: { label: "Sequência", icon: Flame, description: "Estude dias seguidos" },
  xp: { label: "Experiência", icon: Zap, description: "Acumule XP total" },
  flashcards: { label: "Flashcards", icon: Layers, description: "Revise flashcards" },
  accuracy: { label: "Precisão", icon: Target, description: "Acerte questões" },
  milestone: { label: "Marcos", icon: Award, description: "Conquistas especiais" },
  special: { label: "Especiais", icon: Sparkles, description: "Conquistas secretas e únicas" },
};

const RARITY_ORDER = ["bronze", "silver", "gold", "platinum", "diamond"] as const;

function AchievementCard({ achievement, progress, showProgress = true }: {
  achievement: any;
  progress?: { current: number; target: number; percentage: number };
  showProgress?: boolean;
}) {
  const isUnlocked = achievement.isUnlocked;

  return (
    <div className={cn(
      "relative rounded-2xl border p-4 transition-all",
      isUnlocked
        ? getRarityBgColor(achievement.rarity)
        : "bg-card border-border opacity-60"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "flex items-center justify-center w-14 h-14 rounded-2xl text-2xl",
          isUnlocked ? getRarityBgColor(achievement.rarity) : "bg-muted"
        )}>
          {isUnlocked ? achievement.icon : "🔒"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              "font-semibold text-sm",
              isUnlocked ? getRarityColor(achievement.rarity) : "text-muted-foreground"
            )}>
              {achievement.name}
            </h3>
            {isUnlocked && <Check className="h-4 w-4 text-success" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
          
          {showProgress && !isUnlocked && progress && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{progress.current}/{progress.target}</span>
                <span>{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} className="h-1.5" />
            </div>
          )}
          
          {isUnlocked && achievement.xpReward > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <Zap className="h-3 w-3 text-xp" />
              <span className="text-xs text-xp font-medium">+{achievement.xpReward} XP</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategorySection({ category, achievements }: { category: AchievementCategory; achievements: any[] }) {
  const info = CATEGORY_INFO[category];
  const Icon = info.icon;
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalCount = achievements.length;

  const [isExpanded, setIsExpanded] = useState(unlockedCount > 0);

  if (totalCount === 0) return null;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{info.label}</h3>
            <p className="text-xs text-muted-foreground">{info.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {unlockedCount}/{totalCount}
          </span>
          <ChevronLeft className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isExpanded && "rotate-[-90deg]"
          )} />
        </div>
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 gap-2 pl-2">
          {RARITY_ORDER.map((rarity) => {
            const rarityAchievements = achievements.filter((a) => a.rarity === rarity);
            if (rarityAchievements.length === 0) return null;
            return (
              <div key={rarity} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-medium", getRarityColor(rarity))}>
                    {getRarityLabel(rarity)}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                {rarityAchievements.map((a) => (
                  <AchievementCard key={a.id} achievement={a} showProgress={!a.isUnlocked} />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AchievementsPage() {
  const { user } = useAuth();
  const { data: profile } = useUserProfile(user?.id);
  const { data: qStats = [] } = useUserQuestionStats(user?.id);
  const { data: todayProd } = useUserProductivity(user?.id);
  const { data: userFlashcards = [] } = useUserFlashcardReviews(user?.id);

  const totalQuestionsAnswered = qStats.reduce((sum, s) => sum + (s.total_attempts || 0), 0);
  const totalQuestionsCorrect = qStats.reduce((sum, s) => sum + (s.total_correct || 0), 0);
  const totalFlashcardsReviewed = userFlashcards.reduce((sum, s) => sum + (s.total_reviews || 0), 0);
  const summariesRead = parseInt(localStorage.getItem(`summary_count_${user?.id}`) || "0");

  const stats = {
    questionsAnswered: totalQuestionsAnswered,
    questionsCorrect: totalQuestionsCorrect,
    currentStreak: profile?.streak_days || 0,
    totalXp: profile?.xp_total || 0,
    flashcardsReviewed: totalFlashcardsReviewed,
    summariesRead,
  };

  const groupedAchievements = useGroupedAchievements(user?.id, stats);
  const achievementStats = useAchievementStats(user?.id);

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-warning/15 border border-warning/25 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Medalhas</h1>
              <p className="text-xs text-muted-foreground">Suas conquistas</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-warning/15 to-warning/5 border border-warning/25 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              <span className="font-semibold text-foreground">Progresso Geral</span>
            </div>
            <span className="text-lg font-black text-warning">
              {achievementStats.unlockedCount}/{achievementStats.totalCount}
            </span>
          </div>
          <Progress value={achievementStats.percentage} className="h-3 bg-muted [&>div]:bg-warning" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {achievementStats.percentage}% das conquistas desbloqueadas
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Trophy className="h-5 w-5 text-warning mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{achievementStats.unlockedCount}</p>
            <p className="text-[10px] text-muted-foreground">Medalhas</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Star className="h-5 w-5 text-xp mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{achievementStats.totalXpFromAchievements}</p>
            <p className="text-[10px] text-muted-foreground">XP Ganho</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Award className="h-5 w-5 text-success mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">
              {achievementStats.totalCount - achievementStats.unlockedCount}
            </p>
            <p className="text-[10px] text-muted-foreground">Restantes</p>
          </div>
        </div>

        <div className="space-y-4">
          {(Object.keys(groupedAchievements) as AchievementCategory[]).map((category) => (
            <CategorySection
              key={category}
              category={category}
              achievements={groupedAchievements[category]}
            />
          ))}
        </div>

        <div className="h-20" />
      </div>
    </AppLayout>
  );
}
