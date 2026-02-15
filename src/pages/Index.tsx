import { Flame, Zap, Target, ChevronRight, TrendingUp, BookOpen, Layers } from "lucide-react";
import { mockProgress, subjects, ranks } from "@/data/mockData";
import { AppLayout } from "@/components/AppLayout";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

function StreakCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Sequência</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-accent animate-streak-fire">
              {mockProgress.streak}
            </span>
            <span className="text-sm font-semibold text-accent">dias</span>
          </div>
        </div>
        <Flame className="h-12 w-12 text-accent opacity-80" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function XpCard() {
  const currentRank = ranks.find((r) => r.level === mockProgress.level)!;
  const nextRank = ranks.find((r) => r.level === mockProgress.level + 1);
  const xpProgress = nextRank
    ? ((mockProgress.xp - currentRank.xpRequired) / (nextRank.xpRequired - currentRank.xpRequired)) * 100
    : 100;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-xp/20 to-xp/5 border border-xp/20 p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Patente</p>
          <p className="text-lg font-bold text-foreground">{mockProgress.rank}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-xp/20 px-3 py-1">
          <Zap className="h-4 w-4 text-xp" />
          <span className="text-sm font-bold text-xp">{mockProgress.xp} XP</span>
        </div>
      </div>
      {nextRank && (
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{currentRank.name}</span>
            <span>{nextRank.name}</span>
          </div>
          <Progress value={xpProgress} className="h-2 bg-muted [&>div]:bg-xp" />
        </div>
      )}
    </div>
  );
}

function DailyGoalCard() {
  const { dailyGoal } = mockProgress;
  const questionsPercent = (dailyGoal.questionsCompleted / dailyGoal.questionsTarget) * 100;
  const flashcardsPercent = (dailyGoal.flashcardsCompleted / dailyGoal.flashcardsTarget) * 100;

  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Meta Diária</h3>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Questões</span>
            <span className="font-medium text-foreground">{dailyGoal.questionsCompleted}/{dailyGoal.questionsTarget}</span>
          </div>
          <Progress value={questionsPercent} className="h-2 bg-muted [&>div]:bg-primary" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Flashcards</span>
            <span className="font-medium text-foreground">{dailyGoal.flashcardsCompleted}/{dailyGoal.flashcardsTarget}</span>
          </div>
          <Progress value={flashcardsPercent} className="h-2 bg-muted [&>div]:bg-accent" />
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link
        to="/questoes"
        className="flex items-center gap-3 rounded-2xl bg-primary/10 border border-primary/20 p-4 transition-all active:scale-[0.97]"
      >
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <p className="font-semibold text-foreground text-sm">Questões</p>
          <p className="text-xs text-muted-foreground">Praticar agora</p>
        </div>
      </Link>
      <Link
        to="/flashcards"
        className="flex items-center gap-3 rounded-2xl bg-accent/10 border border-accent/20 p-4 transition-all active:scale-[0.97]"
      >
        <Layers className="h-8 w-8 text-accent" />
        <div>
          <p className="font-semibold text-foreground text-sm">Flashcards</p>
          <p className="text-xs text-muted-foreground">Revisar</p>
        </div>
      </Link>
    </div>
  );
}

function PerformanceOverview() {
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-success" />
          <h3 className="font-semibold text-foreground">Desempenho</h3>
        </div>
        <Link to="/perfil" className="text-xs text-primary font-medium flex items-center gap-0.5">
          Ver tudo <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="space-y-2.5">
        {mockProgress.subjectPerformance.slice(0, 4).map((sp) => {
          const subject = subjects.find((s) => s.id === sp.subjectId);
          return (
            <div key={sp.subjectId} className="flex items-center gap-3">
              <span className="text-lg">{subject?.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium truncate">{sp.name}</span>
                  <span className={`font-bold ${sp.accuracy >= 70 ? "text-success" : sp.accuracy >= 50 ? "text-warning" : "text-destructive"}`}>
                    {sp.accuracy}%
                  </span>
                </div>
                <Progress
                  value={sp.accuracy}
                  className="h-1.5 bg-muted [&>div]:transition-all"
                  style={{ ["--tw-progress-color" as string]: sp.accuracy >= 70 ? "hsl(var(--success))" : sp.accuracy >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-4 animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Olá, Recruta! 🎯</h1>
          <p className="text-sm text-muted-foreground mt-0.5">PMMG / PCMG — Continue firme.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StreakCard />
          <XpCard />
        </div>

        <DailyGoalCard />
        <QuickActions />
        <PerformanceOverview />
      </div>
    </AppLayout>
  );
}
