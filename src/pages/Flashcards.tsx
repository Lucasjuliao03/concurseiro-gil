import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { flashcards } from "@/data/flashcardsDb";
import { subjects } from "@/data/questionsDb";
import { Layers, RotateCcw, X, Check, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { canAnswer, getAnsweredCount } from "@/services/accessService";
import { recordFlashcardReview } from "@/services/statsService";
import { BlockedOverlay } from "@/components/BlockedOverlay";

function FlashcardViewer({ card, onRate }: {
  card: typeof flashcards[0];
  onRate: (rating: "wrong" | "almost" | "correct") => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const subject = subjects.find((s) => s.id === card.subjectId);

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
          {subject?.icon} {subject?.name}
        </Badge>
        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
          {card.topic}
        </Badge>
      </div>

      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full min-h-[280px] rounded-2xl border border-border bg-card p-6 text-left transition-all active:scale-[0.98] relative overflow-hidden"
      >
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {flipped ? "VERSO" : "FRENTE"} · toque para virar
          </span>
        </div>

        {!flipped ? (
          <div className="flex items-center justify-center h-full pt-4">
            <p className="text-base font-medium text-foreground leading-relaxed text-center">{card.front}</p>
          </div>
        ) : (
          <div className="pt-4 animate-flip-in">
            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{card.back}</p>
          </div>
        )}
      </button>

      {flipped ? (
        <div className="space-y-2 animate-slide-up">
          <p className="text-xs text-center text-muted-foreground">Como foi?</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => onRate("wrong")} className="flex flex-col items-center gap-1.5 rounded-xl bg-destructive/10 border border-destructive/20 py-3 active:scale-[0.95] transition-all">
              <X className="h-5 w-5 text-destructive" />
              <span className="text-xs font-medium text-destructive">Errei</span>
            </button>
            <button onClick={() => onRate("almost")} className="flex flex-col items-center gap-1.5 rounded-xl bg-warning/10 border border-warning/20 py-3 active:scale-[0.95] transition-all">
              <HelpCircle className="h-5 w-5 text-warning" />
              <span className="text-xs font-medium text-warning">Quase</span>
            </button>
            <button onClick={() => onRate("correct")} className="flex flex-col items-center gap-1.5 rounded-xl bg-success/10 border border-success/20 py-3 active:scale-[0.95] transition-all">
              <Check className="h-5 w-5 text-success" />
              <span className="text-xs font-medium text-success">Acertei</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-sm text-primary-foreground active:scale-[0.98] transition-all"
        >
          <RotateCcw className="h-4 w-4" /> Revelar Resposta
        </button>
      )}
    </div>
  );
}

export default function FlashcardsPage() {
  const { user, isApproved } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasAccess = canAnswer();
  const answeredCount = user ? getAnsweredCount(user.id) : 0;

  if (!hasAccess && !isApproved) {
    return (
      <AppLayout>
        <BlockedOverlay answeredCount={answeredCount} />
      </AppLayout>
    );
  }

  const handleRate = (_rating: "wrong" | "almost" | "correct") => {
    if (user) {
      recordFlashcardReview(user.id);
    }
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <AppLayout>
      <div className="px-4 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            <h1 className="text-xl font-bold text-foreground">Flashcards</h1>
          </div>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} / {flashcards.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-accent font-medium">+5 XP por revisão</span>
          <span>·</span>
          <span>Repetição espaçada ativa</span>
        </div>

        <FlashcardViewer
          key={flashcards[currentIndex].id}
          card={flashcards[currentIndex]}
          onRate={handleRate}
        />
      </div>
    </AppLayout>
  );
}
