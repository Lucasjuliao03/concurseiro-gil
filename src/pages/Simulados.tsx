import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ClipboardList, Clock, Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { subjects } from "@/data/mockData";

interface SimuladoConfig {
  questionCount: number;
  timeMinutes: number;
  selectedSubjects: string[];
}

export default function SimuladosPage() {
  const [config, setConfig] = useState<SimuladoConfig>({
    questionCount: 20,
    timeMinutes: 60,
    selectedSubjects: [],
  });

  const questionOptions = [10, 20, 30, 50];
  const timeOptions = [30, 60, 90, 120];

  const toggleSubject = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(id)
        ? prev.selectedSubjects.filter((s) => s !== id)
        : [...prev.selectedSubjects, id],
    }));
  };

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-5 animate-slide-up">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Simulado</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Configure sua prova simulada e teste seus conhecimentos em condições reais.
        </p>

        {/* Question count */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Número de questões</label>
          <div className="grid grid-cols-4 gap-2">
            {questionOptions.map((n) => (
              <button
                key={n}
                onClick={() => setConfig((p) => ({ ...p, questionCount: n }))}
                className={cn(
                  "rounded-xl border py-2.5 text-sm font-semibold transition-all active:scale-[0.95]",
                  config.questionCount === n
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary/40"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" /> Tempo (minutos)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeOptions.map((t) => (
              <button
                key={t}
                onClick={() => setConfig((p) => ({ ...p, timeMinutes: t }))}
                className={cn(
                  "rounded-xl border py-2.5 text-sm font-semibold transition-all active:scale-[0.95]",
                  config.timeMinutes === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground hover:border-primary/40"
                )}
              >
                {t}min
              </button>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Matérias</label>
          <div className="grid grid-cols-2 gap-2">
            {subjects.map((s) => {
              const selected = config.selectedSubjects.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSubject(s.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border p-3 text-left text-sm transition-all active:scale-[0.97]",
                    selected
                      ? "bg-primary/10 border-primary/40 text-foreground"
                      : "bg-card border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  <span className="text-lg">{s.icon}</span>
                  <span className="font-medium truncate">{s.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {config.selectedSubjects.length === 0
              ? "Nenhuma selecionada = todas as matérias"
              : `${config.selectedSubjects.length} matéria(s) selecionada(s)`}
          </p>
        </div>

        {/* Start button */}
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground active:scale-[0.98] transition-all animate-pulse-glow">
          <Play className="h-5 w-5" /> Iniciar Simulado
        </button>

        {/* Info */}
        <div className="rounded-2xl bg-card border border-border p-4 text-sm text-muted-foreground space-y-1.5">
          <p className="font-medium text-foreground text-xs uppercase tracking-wider">Sobre o simulado</p>
          <p>• Cronômetro regressivo durante a prova</p>
          <p>• Navegação livre entre questões</p>
          <p>• Relatório completo ao finalizar</p>
          <p className="text-accent font-medium">+50 XP ao completar</p>
        </div>
      </div>
    </AppLayout>
  );
}
