import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { questions, subjects } from "@/data/questionsDb";
import { Question } from "@/types/study";
import { CheckCircle2, XCircle, ChevronRight, Filter, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { canAnswer, getAnsweredCount } from "@/services/accessService";
import { recordAnswer } from "@/services/statsService";
import { BlockedOverlay } from "@/components/BlockedOverlay";

function QuestionCard({ question, onNext, onAnswer }: {
  question: Question;
  onNext: () => void;
  onAnswer: (isCorrect: boolean, selectedOption: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const subject = subjects.find((s) => s.id === question.subjectId);
  const isCorrect = selected === question.correctOption;

  const handleConfirm = () => {
    if (selected) {
      setConfirmed(true);
      onAnswer(selected === question.correctOption, selected);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setConfirmed(false);
    onNext();
  };

  const difficultyColor = {
    fácil: "bg-success/15 text-success border-success/20",
    média: "bg-warning/15 text-warning border-warning/20",
    difícil: "bg-destructive/15 text-destructive border-destructive/20",
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
          {subject?.icon} {subject?.name}
        </Badge>
        <Badge variant="outline" className={cn("text-xs", difficultyColor[question.difficulty])}>
          {question.difficulty}
        </Badge>
        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
          {question.organ} · {question.year}
        </Badge>
      </div>

      <div className="rounded-2xl bg-card border border-border p-4">
        <p className="text-sm leading-relaxed text-foreground">{question.statement}</p>
      </div>

      <div className="space-y-2">
        {question.options.map((opt) => {
          const letter = opt.id.toUpperCase();
          const isSelected = selected === opt.id;
          const isRight = opt.id === question.correctOption;

          let optStyle = "bg-card border-border hover:border-primary/40";
          if (confirmed) {
            if (isRight) optStyle = "bg-success/10 border-success/40";
            else if (isSelected && !isRight) optStyle = "bg-destructive/10 border-destructive/40";
            else optStyle = "bg-card border-border opacity-50";
          } else if (isSelected) {
            optStyle = "bg-primary/10 border-primary/50 ring-1 ring-primary/30";
          }

          return (
            <button
              key={opt.id}
              onClick={() => !confirmed && setSelected(opt.id)}
              disabled={confirmed}
              className={cn(
                "w-full flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all active:scale-[0.98]",
                optStyle
              )}
            >
              <span className={cn(
                "flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold",
                confirmed && isRight ? "bg-success text-success-foreground" :
                confirmed && isSelected && !isRight ? "bg-destructive text-destructive-foreground" :
                isSelected ? "bg-primary text-primary-foreground" :
                "bg-muted text-muted-foreground"
              )}>
                {confirmed && isRight ? <CheckCircle2 className="h-4 w-4" /> :
                 confirmed && isSelected && !isRight ? <XCircle className="h-4 w-4" /> :
                 letter}
              </span>
              <span className="text-sm text-foreground leading-relaxed flex-1">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={cn(
            "w-full rounded-xl py-3.5 font-semibold text-sm transition-all",
            selected
              ? "bg-primary text-primary-foreground active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Confirmar Resposta
        </button>
      ) : (
        <div className="space-y-3 animate-slide-up">
          <div className={cn(
            "rounded-xl p-4 border",
            isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
          )}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />}
              <span className={cn("font-bold text-sm", isCorrect ? "text-success" : "text-destructive")}>
                {isCorrect ? "Resposta Correta!" : "Resposta Incorreta"}
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{question.explanation}</p>
          </div>

          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-sm text-primary-foreground active:scale-[0.98] transition-all"
          >
            Próxima Questão <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuestoesPage() {
  const { user, isApproved } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blocked, setBlocked] = useState(!canAnswer());
  const answeredCount = user ? getAnsweredCount(user.id) : 0;

  const handleAnswer = (isCorrect: boolean, selectedOption: string) => {
    if (user) {
      recordAnswer(user.id, questions[currentIndex].id, selectedOption, isCorrect);
      // Recheck access
      if (!canAnswer()) {
        setBlocked(true);
      }
    }
  };

  const handleNext = () => {
    if (!canAnswer()) {
      setBlocked(true);
      return;
    }
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  if (blocked && !isApproved) {
    return (
      <AppLayout>
        <BlockedOverlay answeredCount={answeredCount} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Questões</h1>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <Filter className="h-3.5 w-3.5" /> Filtrar
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Questão {currentIndex + 1} de {questions.length}</span>
          <span>·</span>
          <span className="text-primary font-medium">+15 XP por acerto</span>
        </div>

        <QuestionCard
          key={questions[currentIndex].id}
          question={questions[currentIndex]}
          onNext={handleNext}
          onAnswer={handleAnswer}
        />
      </div>
    </AppLayout>
  );
}
