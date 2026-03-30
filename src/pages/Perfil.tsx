import { AppLayout } from "@/components/AppLayout";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { buildStats, getSubjectPerformance, ranks } from "@/services/statsService";
import { User, ChevronRight, Medal, Flame, Zap, LogOut, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubjects, useQuestions, useUserProfile, useUserProductivity, useUserQuestionStats } from "@/hooks/useStudyData";

export default function PerfilPage() {
  const { user, isAdmin, logout } = useAuth();

  const { data: subjects = [], isLoading: loadingSub } = useSubjects();
  const { data: questions = [], isLoading: loadingQ } = useQuestions();
  const { data: profile } = useUserProfile(user?.id);
  const { data: todayProd } = useUserProductivity(user?.id);
  const { data: qStats = [] } = useUserQuestionStats(user?.id);

  const stats = buildStats(profile, todayProd);
  const performance = !loadingQ && !loadingSub ? getSubjectPerformance(qStats, questions, subjects) : [];

  const currentRank = ranks.find((r) => r.level === stats.level) ?? ranks[0];
  const nextRank = ranks.find((r) => r.level === stats.level + 1);
  const xpProgress = nextRank
    ? ((stats.xp - currentRank.xpRequired) / (nextRank.xpRequired - currentRank.xpRequired)) * 100
    : 100;

  if (loadingSub || loadingQ) {
    return <AppLayout><div className="p-8 text-center text-muted-foreground">Carregando perfil...</div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{user?.name ?? "Recruta"}</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => logout()}
            className="flex items-center gap-1.5 text-xs text-destructive font-medium rounded-lg bg-destructive/10 px-3 py-1.5 border border-destructive/20">
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
        </div>

        {isAdmin && (
          <Link to="/admin"
            className="flex items-center justify-between rounded-xl bg-primary/10 border border-primary/25 p-3 transition-all active:scale-[0.98]">
            <span className="text-sm font-semibold text-primary">Painel Admin</span>
            <ChevronRight className="h-4 w-4 text-primary" />
          </Link>
        )}

        {/* Rank card */}
        <div className="rounded-2xl bg-gradient-to-br from-xp/20 to-xp/5 border border-xp/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-xp" />
              <span className="font-bold text-foreground">{stats.rank}</span>
            </div>
            <div className="flex items-center gap-1 bg-xp/20 px-2.5 py-1 rounded-full">
              <Zap className="h-3.5 w-3.5 text-xp" />
              <span className="text-sm font-bold text-xp">{stats.xp} XP</span>
            </div>
          </div>
          {nextRank && (
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{currentRank.name}</span><span>{nextRank.name}</span>
              </div>
              <Progress value={xpProgress} className="h-2 bg-muted [&>div]:bg-xp" />
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {nextRank.xpRequired - stats.xp} XP para {nextRank.name}
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Flame className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{stats.streak}</p>
            <p className="text-xs text-muted-foreground">Dias seguidos</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <TrendingUp className="h-5 w-5 text-success mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">
              {todayProd ? `${todayProd.questions_answered}` : "0"}
            </p>
            <p className="text-xs text-muted-foreground">Questões hoje</p>
          </div>
        </div>

        {/* Subject performance */}
        <div className="rounded-2xl bg-card border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Desempenho por Matéria
          </h3>
          <div className="space-y-3">
            {performance.map((sp) => {
              const subject = subjects.find((s) => s.id === sp.subjectId);
              return (
                <div key={sp.subjectId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium flex items-center gap-1.5">
                      {subject?.icon ?? "📖"} {sp.name}
                    </span>
                    <span className={`font-bold ${sp.accuracy >= 70 ? "text-success" : sp.accuracy >= 50 ? "text-warning" : "text-destructive"}`}>
                      {sp.totalAttempts > 0 ? `${sp.accuracy}%` : "—"}
                    </span>
                  </div>
                  <Progress value={sp.accuracy} className="h-1.5 bg-muted" />
                  <p className="text-xs text-muted-foreground mt-0.5">{sp.totalAttempts} questões respondidas</p>
                </div>
              );
            })}
            {performance.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-3">
                Responda questões para ver seu desempenho.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
