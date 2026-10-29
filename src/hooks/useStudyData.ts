import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { supabase } from "@/lib/supabase";
import { localDateKey } from "@/lib/dates";
import { ACHIEVEMENTS } from "@/types/achievements";
import type { Flashcard, Question, Subject } from "@/types/study";

export const SUBJECT_UI_MAP: Record<string, { icon: string; color: string }> = {
  "Direito Penal": { icon: "⚖️", color: "hsl(0 72% 55%)" },
  "Direito Constitucional": { icon: "📜", color: "hsl(217 91% 60%)" },
  "Legislação Especial": { icon: "📋", color: "hsl(142 71% 45%)" },
  "Direito Administrativo": { icon: "🏛️", color: "hsl(38 92% 55%)" },
  "Direitos Humanos": { icon: "🤝", color: "hsl(271 68% 60%)" },
  "Português": { icon: "📝", color: "hsl(190 80% 50%)" },
};

const DEFAULT_UI = { icon: "📖", color: "hsl(217 91% 60%)" };

interface SubjectRow { id: number; name: string }
interface TopicRow { id: number; subject_id: number; name: string; description?: string | null; sort_order?: number | null }
interface QuestionRpcRow {
  id: number; subject_id: number; topic_id: number | null; question_type: string;
  difficulty: "easy" | "medium" | "hard"; source_year: number | null; statement: string;
  option_a: string | null; option_b: string | null; option_c: string | null;
  option_d: string | null; option_e: string | null; board_name: string | null; topic_name: string | null;
}
interface FlashcardRow {
  id: number; subject_id: number; topic_id: number | null; front_text: string; back_text: string;
  topics: { name: string } | null;
}
interface SummaryRow {
  id: number; subject_id: number; topic_id: number | null; title: string; content_html: string | null;
  content_markdown: string | null; format: string; sort_order: number | null;
}

export interface SummaryItem {
  id: string; subjectId: string; topicId: string | null; title: string; contentHtml: string | null;
  contentMarkdown: string | null; format: string; sortOrder: number;
}
export interface CourseRow { id: string; name: string; description: string | null }
export interface UserQuestionStatRow {
  question_id: number; total_attempts: number; total_correct: number; total_wrong: number;
  last_is_correct: boolean | null; last_answered_at: string | null;
}
export interface UserFlashcardReviewRow {
  flashcard_id: number; total_reviews: number; total_correct: number; total_wrong: number;
  last_review_result: string | null; last_reviewed_at: string | null;
}
export interface StudyUsage { content: number; summaries: number; summaryIds: string[] }
export interface AnswerResult {
  isCorrect: boolean; correctOption: string; explanation: string; xpAwarded: number; unlocked: string[];
}

function friendlyMutationError(error: Error): string {
  if (error.message.includes("FREE_CONTENT_LIMIT_REACHED")) return "Seu limite gratuito foi atingido.";
  if (error.message.includes("FREE_SUMMARY_LIMIT_REACHED")) return "Seu limite gratuito de resumos foi atingido.";
  if (error.message.includes("ACCESS_EXPIRED")) return "Seu período de acesso expirou.";
  if (error.message.includes("NOT_AVAILABLE")) return "Este conteúdo não está mais disponível.";
  return "Não foi possível salvar seu progresso. Tente novamente.";
}

function showUnlockedAchievements(ids: string[], notifications: ReturnType<typeof useNotificationContext>) {
  const unlocked = ids.flatMap((id) => {
    const achievement = ACHIEVEMENTS.find((item) => item.id === id);
    return achievement ? [achievement] : [];
  });
  if (unlocked.length === 0) return;
  const first = unlocked[0];
  toast.success(unlocked.length === 1 ? "🏆 Conquista desbloqueada!" : `🎉 ${unlocked.length} conquistas desbloqueadas!`, {
    description: unlocked.map((item) => `${item.icon} ${item.name}`).join(" • "), duration: 6000,
  });
  notifications.sendAchievementNotification(first.name, first.icon);
}

export function useSubjects(courseId?: string | null) {
  return useQuery({
    queryKey: ["subjects", courseId],
    queryFn: async () => {
      if (courseId === null) return [];
      const { data, error } = await supabase.from("subjects").select("id,name").order("name");
      if (error) throw error;
      return ((data ?? []) as SubjectRow[]).map((row): Subject => {
        const ui = Object.entries(SUBJECT_UI_MAP).find(([key]) => row.name.includes(key))?.[1] ?? DEFAULT_UI;
        return { id: String(row.id), name: row.name, icon: ui.icon, color: ui.color, questionCount: 0 };
      });
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTopics(courseId?: string | null) {
  return useQuery({
    queryKey: ["topics", courseId ?? "admin"],
    queryFn: async () => {
      if (courseId === null) return [];
      const { data, error } = await supabase.from("topics").select("id,subject_id,name,description,sort_order").order("sort_order");
      if (error) throw error;
      return (data ?? []) as TopicRow[];
    }, staleTime: 30 * 60 * 1000,
  });
}

export function useQuestions(courseId?: string | null) {
  return useQuery({
    queryKey: ["questions", courseId ?? "admin"],
    queryFn: async () => {
      if (courseId === null) return [];
      const { data, error } = await supabase.rpc("get_study_questions");
      if (error) throw error;
      return ((data ?? []) as QuestionRpcRow[]).map((row): Question => {
        const options = (["a", "b", "c", "d", "e"] as const).flatMap((id) => {
          const text = row[`option_${id}`];
          return text ? [{ id, text }] : [];
        });
        const difficulty = { easy: "fácil", medium: "média", hard: "difícil" } as const;
        return {
          id: String(row.id), subjectId: String(row.subject_id), topicId: row.topic_id ? String(row.topic_id) : null,
          topic: row.topic_name ?? "Geral", subtopic: "", difficulty: difficulty[row.difficulty] ?? "média",
          year: row.source_year ?? new Date().getFullYear(), board: row.board_name ?? "Banca",
          organ: row.question_type === "ia" ? "IA" : "Banca", statement: row.statement, options,
        };
      });
    }, staleTime: 10 * 60 * 1000,
  });
}

export function useFlashcards(courseId?: string | null) {
  return useQuery({
    queryKey: ["flashcards", courseId ?? "admin"],
    queryFn: async () => {
      if (courseId === null) return [];
      const { data, error } = await supabase.from("flashcards")
        .select("id,subject_id,topic_id,front_text,back_text,topics(name)")
        .eq("is_active", true).eq("status", "published");
      if (error) throw error;
      return ((data ?? []) as unknown as FlashcardRow[]).map((row): Flashcard => ({
        id: String(row.id), subjectId: String(row.subject_id), topicId: row.topic_id ? String(row.topic_id) : null,
        topic: row.topics?.name ?? "Geral", front: row.front_text, back: row.back_text,
      }));
    }, staleTime: 10 * 60 * 1000,
  });
}

export function useSummaries(courseId?: string | null) {
  return useQuery({
    queryKey: ["summaries", courseId ?? "admin"],
    queryFn: async () => {
      if (courseId === null) return [];
      const { data, error } = await supabase.from("summaries")
        .select("id,subject_id,topic_id,title,format,content_html,content_markdown,sort_order")
        .eq("is_active", true).eq("status", "published").order("sort_order");
      if (error) throw error;
      return ((data ?? []) as SummaryRow[]).map((row): SummaryItem => ({
        id: String(row.id), subjectId: String(row.subject_id), topicId: row.topic_id ? String(row.topic_id) : null,
        title: row.title, contentHtml: row.content_html, contentMarkdown: row.content_markdown,
        format: row.format, sortOrder: row.sort_order ?? 0,
      }));
    }, staleTime: 10 * 60 * 1000,
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("id,name,description").eq("is_active", true);
      if (error) throw error;
      return (data ?? []).map((row): CourseRow => ({ id: String(row.id), name: row.name, description: row.description }));
    }, staleTime: 30 * 60 * 1000,
  });
}

export function useRecordAnswer() {
  const queryClient = useQueryClient();
  const notifications = useNotificationContext();
  return useMutation({
    mutationFn: async ({ questionId, selectedOption }: { questionId: number; selectedOption: string }): Promise<AnswerResult> => {
      const { data, error } = await supabase.rpc("record_question_answer", {
        p_question_id: questionId, p_selected_option: selectedOption,
      });
      if (error) throw error;
      const result = data as { is_correct: boolean; correct_option: string; explanation: string; xp_awarded: number; unlocked?: string[] };
      return { isCorrect: result.is_correct, correctOption: result.correct_option, explanation: result.explanation,
        xpAwarded: result.xp_awarded, unlocked: result.unlocked ?? [] };
    },
    onSuccess: (result) => {
      notifications.markAsStudied();
      showUnlockedAchievements(result.unlocked, notifications);
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["userProductivity"] }),
        queryClient.invalidateQueries({ queryKey: ["userQuestionStats"] }),
        queryClient.invalidateQueries({ queryKey: ["userAchievements"] }),
        queryClient.invalidateQueries({ queryKey: ["studyUsage"] }),
      ]);
    },
    onError: (error: Error) => toast.error(friendlyMutationError(error)),
  });
}

export function useRecordFlashcardReview() {
  const queryClient = useQueryClient();
  const notifications = useNotificationContext();
  return useMutation({
    mutationFn: async ({ flashcardId, result }: { flashcardId: number; result: "wrong" | "hard" | "good" | "easy" }) => {
      const { data, error } = await supabase.rpc("record_flashcard_review", { p_flashcard_id: flashcardId, p_result: result });
      if (error) throw error;
      return data as { xp_awarded: number; unlocked?: string[] };
    },
    onSuccess: (result) => {
      notifications.markAsStudied();
      showUnlockedAchievements(result.unlocked ?? [], notifications);
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["userProductivity"] }),
        queryClient.invalidateQueries({ queryKey: ["userFlashcardReviews"] }),
        queryClient.invalidateQueries({ queryKey: ["userAchievements"] }),
        queryClient.invalidateQueries({ queryKey: ["studyUsage"] }),
      ]);
    },
    onError: (error: Error) => toast.error(friendlyMutationError(error)),
  });
}

export function useRecordSummaryView() {
  const queryClient = useQueryClient();
  const notifications = useNotificationContext();
  return useMutation({
    mutationFn: async (summaryId: number) => {
      const { data, error } = await supabase.rpc("record_summary_view", { p_summary_id: summaryId });
      if (error) throw error;
      return data as { first_view: boolean; unlocked?: string[] };
    },
    onSuccess: (result) => {
      showUnlockedAchievements(result.unlocked ?? [], notifications);
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["studyUsage"] }),
        queryClient.invalidateQueries({ queryKey: ["userAchievements"] }),
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      ]);
    },
    onError: (error: Error) => toast.error(friendlyMutationError(error)),
  });
}

export function useStudyUsage(userId: string | undefined) {
  return useQuery({
    queryKey: ["studyUsage", userId],
    queryFn: async (): Promise<StudyUsage> => {
      const { data, error } = await supabase.rpc("get_my_usage");
      if (error) throw error;
      const usage = data as { content?: number; summaries?: number; summary_ids?: Array<number | string> } | null;
      return {
        content: Number(usage?.content ?? 0),
        summaries: Number(usage?.summaries ?? 0),
        summaryIds: (usage?.summary_ids ?? []).map(String),
      };
    }, enabled: Boolean(userId), staleTime: 30 * 1000,
  });
}

export function useUserProfile(userId: string | undefined) {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (error) throw error;
      return data;
    }, enabled: Boolean(userId), staleTime: 2 * 60 * 1000,
  });
}

export function useUserProductivity(userId: string | undefined) {
  return useQuery({
    queryKey: ["userProductivity", userId, localDateKey()],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase.from("user_daily_productivity").select("*")
        .eq("user_id", userId).eq("productivity_date", localDateKey()).maybeSingle();
      if (error) throw error;
      return data;
    }, enabled: Boolean(userId), staleTime: 30 * 1000,
  });
}

export function useUserQuestionStats(userId: string | undefined) {
  return useQuery({
    queryKey: ["userQuestionStats", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase.from("user_question_stats").select("*").eq("user_id", userId);
      if (error) throw error;
      return (data ?? []) as UserQuestionStatRow[];
    }, enabled: Boolean(userId),
  });
}

export function useUserFlashcardReviews(userId: string | undefined) {
  return useQuery({
    queryKey: ["userFlashcardReviews", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase.from("user_flashcard_reviews").select("*").eq("user_id", userId);
      if (error) throw error;
      return (data ?? []) as UserFlashcardReviewRow[];
    }, enabled: Boolean(userId),
  });
}
