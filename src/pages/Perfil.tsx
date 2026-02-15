import { AppLayout } from "@/components/AppLayout";
import { mockProgress, subjects, ranks } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { User, Flame, Zap, Award, Settings, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PerfilPage() {
  const currentRank = ranks.find((r) => r.level === mockProgress.level)!;
  const nextRank = ranks.find((r) => r.level === mockProgress.level + 1);

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-5 animate-slide-up">
        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/15 border border-primary/25">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Recruta</h1>
            <p className="text-sm text-muted-foreground">Concurso: PMMG / PCMG</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Flame className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{mockProgress.streak}</p>
            <p className="text-[10px] text-muted-foreground">Streak</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Zap className="h-5 w-5 text-xp mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">{mockProgress.xp}</p>
            <p className="text-[10px] text-muted-foreground">XP Total</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Award className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold text-foreground">Nv.{mockProgress.level}</p>
            <p className="text-[10px] text-muted-foreground">{mockProgress.rank}</p>
          </div>
        </div>

        {/* Rank progress */}
        {nextRank && (
          <div className="rounded-2xl bg-card border border-border p-4">
            <p className="text-sm font-medium text-foreground mb-2">Próxima patente: {nextRank.name}</p>
            <Progress
              value={((mockProgress.xp - currentRank.xpRequired) / (nextRank.xpRequired - currentRank.xpRequired)) * 100}
              className="h-2 bg-muted [&>div]:bg-xp"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {nextRank.xpRequired - mockProgress.xp} XP restantes
            </p>
          </div>
        )}

        {/* Mapa de domínio */}
        <div className="rounded-2xl bg-card border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Mapa de Domínio</h3>
          <div className="space-y-3">
            {mockProgress.subjectPerformance.map((sp) => {
              const subject = subjects.find((s) => s.id === sp.subjectId);
              const level = sp.accuracy >= 75 ? "Forte" : sp.accuracy >= 50 ? "Médio" : "Fraco";
              const levelColor = sp.accuracy >= 75 ? "text-success" : sp.accuracy >= 50 ? "text-warning" : "text-destructive";
              return (
                <div key={sp.subjectId} className="flex items-center gap-3">
                  <span className="text-lg">{subject?.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{sp.name}</span>
                      <span className={cn("text-xs font-bold", levelColor)}>{level} · {sp.accuracy}%</span>
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
          {[
            { icon: Settings, label: "Configurações", action: () => {} },
            { icon: LogOut, label: "Sair", action: () => {}, destructive: true },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium transition-colors",
                i > 0 && "border-t border-border",
                (item as any).destructive ? "text-destructive" : "text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
