import { AppLayout } from "@/components/AppLayout";
import { Progress } from "@/components/ui/progress";
import { User, Flame, Zap, Award, Settings, ChevronRight, LogOut, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getStats, getSubjectPerformance, ranks } from "@/services/statsService";
import { subjects, questions } from "@/data/questionsDb";
import { useNavigate, Link } from "react-router-dom";

export default function PerfilPage() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const stats = user ? getStats(user.id) : null;
  const performance = user ? getSubjectPerformance(user.id, questions) : [];

  const currentRank = ranks.find((r) => r.level === (stats?.level ?? 1)) ?? ranks[0];
  const nextRank = ranks.find((r) => r.level === (stats?.level ?? 1) + 1);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-5 animate-slide-up">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/15 border border-primary/25">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{user?.name ?? "Usuário"}</h1>
            <p className="text-sm text-muted-foreground">Concurso: PMMG / PCMG</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Flame className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{stats?.streak ?? 0}</p>
            <p className="text-[10px] text-muted-foreground">Streak</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Zap className="h-5 w-5 text-xp mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{stats?.xp ?? 0}</p>
            <p className="text-[10px] text-muted-foreground">XP Total</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Award className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">Nv.{stats?.level ?? 1}</p>
            <p className="text-[10px] text-muted-foreground">{stats?.rank ?? "Recruta"}</p>
          </div>
        </div>

        {/* Rank progress */}
        {nextRank && (
          <div className="rounded-2xl bg-card border border-border p-4">
            <p className="text-sm font-medium text-foreground mb-2">Próxima patente: {nextRank.name}</p>
            <Progress
              value={(((stats?.xp ?? 0) - currentRank.xpRequired) / (nextRank.xpRequired - currentRank.xpRequired)) * 100}
              className="h-2 bg-muted [&>div]:bg-xp"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {nextRank.xpRequired - (stats?.xp ?? 0)} XP restantes
            </p>
          </div>
        )}

        {/* Mapa de domínio */}
        <div className="rounded-2xl bg-card border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Mapa de Domínio</h3>
          <div className="space-y-3">
            {performance.map((sp) => {
              const subject = subjects.find((s) => s.id === sp.subjectId);
              const level = sp.accuracy >= 75 ? "Forte" : sp.accuracy >= 50 ? "Médio" : sp.totalAttempts > 0 ? "Fraco" : "—";
              const levelColor = sp.accuracy >= 75 ? "text-success" : sp.accuracy >= 50 ? "text-warning" : sp.totalAttempts > 0 ? "text-destructive" : "text-muted-foreground";
              return (
                <div key={sp.subjectId} className="flex items-center gap-3">
                  <span className="text-lg">{subject?.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{sp.name}</span>
                      <span className={cn("text-xs font-bold", levelColor)}>
                        {sp.totalAttempts > 0 ? `${level} · ${sp.accuracy}%` : "Sem dados"}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1.5 flex-1 rounded-full",
                            i < Math.round(sp.accuracy / 10)
                              ? sp.accuracy >= 75 ? "bg-success" : sp.accuracy >= 50 ? "bg-warning" : "bg-destructive"
                              : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Menu items */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          {isAdmin && (
            <Link
              to="/admin"
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-primary transition-colors border-b border-border"
            >
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                <span>Painel Admin</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          )}
          <button className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-foreground transition-colors border-b border-border">
            <div className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-destructive transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
