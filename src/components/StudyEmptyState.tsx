import { BookOpen } from "lucide-react";

export function StudyEmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-4 mt-10 rounded-2xl border border-border bg-card p-6 text-center" role="status">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
