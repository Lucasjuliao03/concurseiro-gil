import { useState } from "react";
import { useCourses } from "@/hooks/useStudyData";
import { setUserCourseId } from "@/services/courseService";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseSelectorProps {
  onSelect: (courseId: string) => void;
  currentCourseId?: string;
}

export function CourseSelector({ onSelect, currentCourseId }: CourseSelectorProps) {
  const { user } = useAuth();
  const { data: courses = [], isLoading } = useCourses();
  const [selected, setSelected] = useState<string | null>(currentCourseId ?? null);

  const handleConfirm = () => {
    if (!selected || !user) return;
    setUserCourseId(user.id, selected);
    onSelect(selected);
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando cursos...</div>;

  return (
    <div className="space-y-5 animate-slide-up">
      <div className="text-center space-y-2">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/15 border border-primary/25">
          <GraduationCap className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Escolha seu Concurso</h2>
        <p className="text-xs text-muted-foreground">Todo o material será filtrado para o concurso escolhido.</p>
      </div>

      <div className="space-y-2">
        {courses.map((course) => {
          const isSelected = selected === course.id;
          return (
            <button
              key={course.id}
              onClick={() => setSelected(course.id)}
              className={cn(
                "w-full flex items-center gap-4 rounded-2xl border p-4 text-left transition-all active:scale-[0.98]",
                isSelected
                  ? "bg-primary/10 border-primary/40 ring-1 ring-primary/30"
                  : "bg-card border-border hover:border-primary/30"
              )}
            >
              <span className="text-2xl">🎓</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{course.name}</p>
                <p className="text-xs text-muted-foreground truncate">{course.description || "Concurso Preparatório"}</p>
              </div>
              {isSelected && (
                <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
        {courses.length === 0 && !isLoading && (
          <p className="text-center text-muted-foreground text-sm py-8">Nenhum curso cadastrado no momento.</p>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selected}
        className={cn(
          "w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold text-sm transition-all",
          selected
            ? "bg-primary text-primary-foreground active:scale-[0.98]"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        Confirmar <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
