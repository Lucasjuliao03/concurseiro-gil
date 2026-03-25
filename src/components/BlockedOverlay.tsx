import { Lock, Mail } from "lucide-react";
import { FREE_QUESTION_LIMIT } from "@/services/accessService";

interface BlockedOverlayProps {
  answeredCount: number;
}

export function BlockedOverlay({ answeredCount }: BlockedOverlayProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6">
      <div className="max-w-sm w-full text-center space-y-5 animate-slide-up">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-destructive/15 border-2 border-destructive/30">
          <Lock className="h-10 w-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Acesso Bloqueado</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Você respondeu suas <span className="font-bold text-foreground">{FREE_QUESTION_LIMIT} questões gratuitas</span>.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Total respondidas: <span className="font-bold text-accent">{answeredCount}</span>
          </p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4 space-y-2">
          <p className="text-sm font-medium text-foreground">Como liberar o acesso?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Entre em contato com o administrador do app para solicitar a liberação da sua conta.
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">Aguarde a aprovação do administrador</span>
          </div>
        </div>
      </div>
    </div>
  );
}
