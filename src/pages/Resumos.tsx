import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { FileText, ChevronLeft, BookOpen, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useSubjects, useSummaries, SUBJECT_UI_MAP } from "@/hooks/useStudyData";

export default function ResumosPage() {
  const { user } = useAuth();
  const { data: subjects = [], isLoading: loadingSub } = useSubjects();
  const { data: summaries = [], isLoading: loadingSum } = useSummaries();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);

  if (loadingSub || loadingSum) {
    return <AppLayout><div className="p-8 text-center text-muted-foreground">Carregando resumos...</div></AppLayout>;
  }

  // Group summaries by subject
  const subjectsWithSummaries = subjects.filter(s =>
    summaries.some(sum => sum.subjectId === s.id)
  );

  // View a specific summary
  if (selectedSummaryId) {
    const summary = summaries.find(s => s.id === selectedSummaryId);
    if (!summary) return null;
    const subject = subjects.find(s => s.id === summary.subjectId);

    return (
      <AppLayout>
        <div className="px-4 pt-6 space-y-4 animate-slide-up">
          <button onClick={() => setSelectedSummaryId(null)}
            className="flex items-center gap-1 text-sm text-primary font-medium">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              {subject?.icon ?? "📖"} {subject?.name ?? "Geral"}
            </Badge>
          </div>

          <h1 className="text-xl font-bold text-foreground">{summary.title}</h1>

          <div className="rounded-2xl bg-card border border-border p-5">
            {summary.contentHtml ? (
              <div className="prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: summary.contentHtml }} />
            ) : summary.contentMarkdown ? (
              <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {summary.contentMarkdown}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Conteúdo indisponível.</p>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  // View summaries for a subject
  if (selectedSubjectId) {
    const subject = subjects.find(s => s.id === selectedSubjectId);
    const subjectSummaries = summaries.filter(s => s.subjectId === selectedSubjectId);

    return (
      <AppLayout>
        <div className="px-4 pt-6 space-y-4 animate-slide-up">
          <button onClick={() => setSelectedSubjectId(null)}
            className="flex items-center gap-1 text-sm text-primary font-medium">
            <ChevronLeft className="h-4 w-4" /> Voltar
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl">{subject?.icon ?? "📖"}</span>
            <h1 className="text-xl font-bold text-foreground">{subject?.name ?? "Resumos"}</h1>
          </div>

          <div className="space-y-2">
            {subjectSummaries.map(summary => (
              <button key={summary.id} onClick={() => setSelectedSummaryId(summary.id)}
                className="w-full flex items-center gap-3 rounded-xl bg-card border border-border p-4 text-left transition-all hover:border-primary/40 active:scale-[0.98]">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{summary.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {summary.format === 'html' ? 'HTML' : summary.format === 'markdown' ? 'Markdown' : 'PDF'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Subjects list
  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-4 animate-slide-up">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-xp" />
          <h1 className="text-xl font-bold text-foreground">Resumos</h1>
        </div>

        <p className="text-sm text-muted-foreground">
          Conteúdo teórico organizado por matéria. Toque para ler.
        </p>

        <div className="space-y-3">
          {subjectsWithSummaries.map(subject => {
            const count = summaries.filter(s => s.subjectId === subject.id).length;
            const ui = SUBJECT_UI_MAP[subject.name] || { icon: "📖", color: "hsl(217 91% 60%)" };
            return (
              <button key={subject.id} onClick={() => setSelectedSubjectId(subject.id)}
                className="w-full flex items-center gap-4 rounded-2xl bg-card border border-border p-4 text-left transition-all hover:border-primary/40 active:scale-[0.98]">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl"
                  style={{ background: `${ui.color}15`, border: `1px solid ${ui.color}30` }}>
                  {ui.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{subject.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{count} {count === 1 ? 'resumo' : 'resumos'}</p>
                </div>
              </button>
            );
          })}

          {subjectsWithSummaries.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum resumo cadastrado no banco de dados.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
