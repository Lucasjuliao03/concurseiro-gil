import { useState } from "react";
import { Flame, Zap, Target, ChevronRight, TrendingUp, BookOpen, Layers, AlertTriangle, FileText, GraduationCap } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { buildStats, getSubjectPerformance, ranks } from "@/services/statsService";
import { canAnswer, getRemainingFreeQuestions } from "@/services/accessService";
import { getUserCourseId } from "@/services/courseService";
import { CourseSelector } from "@/components/CourseSelector";
import { useSubjects, useQuestions, useUserProfile, useUserProductivity, useUserQuestionStats, useCourses } from "@/hooks/useStudyData";

export default function HomePage() {
  const { user, isApproved } = useAuth();
  const [courseId, setCourseId] = useState<string | null>(user ? getUserCourseId(user.id) : null);

  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  const { data: subjects = [], isLoading: isLoadingSub } = useSubjects();
  const { data: questions = [], isLoading: isLoadingQ } = useQuestions();
  const { data: profile } = useUserProfile(user?.id);
  const { data: todayProd } = useUserProductivity(user?.id);
  const { data: qStats = [] } = useUserQuestionStats(user?.id);

  const course = courses.find((c) => c.id === courseId);

  const stats = buildStats(profile, todayProd);
  const performance = !isLoadingQ && !isLoadingSub ? getSubjectPerformance(qStats, questions, subjects) : [];
  const answeredCount = todayProd?.questions_answered ?? 0;
  const hasAccess = canAnswer(user);
  const remaining = getRemainingFreeQuestions(user, answeredCount);

  if (isLoadingSub || isLoadingQ || isLoadingCourses) {
    return <AppLayout><div className="p-8 text-center text-muted-foreground">Carregando...</div></AppLayout>;
  }

  if (!courseId || !course) {
    return (
      <AppLayout>
        <div className="px-4 pt-10">
          <CourseSelector onSelect={(id) => setCourseId(id)} currentCourseId={courseId || undefined} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-4 animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Olá, {user?.name ?? "Recruta"}! 🎯</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            <p className="text-sm text-primary font-medium">{course.name}</p>
            <span className="text-sm text-muted-foreground">— Continue firme.</span>
          </div>
        </div>

        {!isApproved && !hasAccess && (
          <div className="rounded-2xl bg-destructive/10 border border-destructive/30 p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive">Acesso bloqueado</p>
              <p className="text-xs text-muted-foreground mt-0.5">Você usou suas questões gratuitas. Aguarde a aprovação.</p>
            </div>
          </div>
        )}

        {!isApproved && hasAccess && remaining !== Infinity && (
          <div className="rounded-2xl bg-warning/10 border border-warning/30 p-3 text-center">
            <p className="text-xs text-warning font-medium">⚡ Restam <span className="font-bold">{remaining}</span> questões gratuitas</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sequência</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-accent animate-streak-fire">{stats.streak}</span>
                  <span className="text-sm font-semibold text-accent">dias</span>
                </div>
              </div>
              <Flame className="h-12 w-12 text-accent opacity-80" strokeWidth={1.5} />
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-xp/20 to-xp/5 border border-xp/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Patente</p>
                <p className="text-lg font-bold text-foreground">{stats.rank}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-xp/20 px-3 py-1">
                <Zap className="h-4 w-4 text-xp" />
                <span className="text-sm font-bold text-xp">{stats.xp} XP</span>
              </div>
            </div>
            {(() => {
              const currentRank = ranks.find((r) => r.level === stats.level) ?? ranks[0];
              const nextRank = ranks.find((r) => r.level === stats.level + 1);
              if (!nextRank) return null;
              const xpProgress = ((stats.xp - currentRank.xpRequired) / (nextRank.xpRequired - currentRank.xpRequired)) * 100;
              return (
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{currentRank.name}</span><span>{nextRank.name}</span>
                  </div>
                  <Progress value={xpProgress} className="h-2 bg-muted [&>div]:bg-xp" />
                </div>
              );
            })()}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Meta Diária</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Questões</span>
                <span className="font-medium text-foreground">{stats.dailyGoal.questionsCompleted}/{stats.dailyGoal.questionsTarget}</span>
              </div>
              <Progress value={(stats.dailyGoal.questionsCompleted / stats.dailyGoal.questionsTarget) * 100} className="h-2 bg-muted [&>div]:bg-primary" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Flashcards</span>
                <span className="font-medium text-foreground">{stats.dailyGoal.flashcardsCompleted}/{stats.dailyGoal.flashcardsTarget}</span>
              </div>
              <Progress value={(stats.dailyGoal.flashcardsCompleted / stats.dailyGoal.flashcardsTarget) * 100} className="h-2 bg-muted [&>div]:bg-accent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Link to="/questoes" className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 border border-primary/20 p-4 transition-all active:scale-[0.97]">
            <BookOpen className="h-7 w-7 text-primary" />
            <p className="font-semibold text-foreground text-xs">Questões</p>
          </Link>
          <Link to="/flashcards" className="flex flex-col items-center gap-2 rounded-2xl bg-accent/10 border border-accent/20 p-4 transition-all active:scale-[0.97]">
            <Layers className="h-7 w-7 text-accent" />
            <p className="font-semibold text-foreground text-xs">Flashcards</p>
          </Link>
          <Link to="/resumos" className="flex flex-col items-center gap-2 rounded-2xl bg-xp/10 border border-xp/20 p-4 transition-all active:scale-[0.97]">
            <FileText className="h-7 w-7 text-xp" />
            <p className="font-semibold text-foreground text-xs">Resumos</p>
          </Link>
        </div>

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
            {performance.slice(0, 4).map((sp) => {
              const subject = subjects.find((s) => s.id === sp.subjectId);
              return (
                <div key={sp.subjectId} className="flex items-center gap-3">
                  <span className="text-lg">{subject?.icon ?? "📖"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium truncate">{sp.name}</span>
                      <span className={`font-bold ${sp.accuracy >= 70 ? "text-success" : sp.accuracy >= 50 ? "text-warning" : "text-destructive"}`}>
                        {sp.totalAttempts > 0 ? `${sp.accuracy}%` : "—"}
                      </span>
                    </div>
                    <Progress value={sp.accuracy} className="h-1.5 bg-muted [&>div]:transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
