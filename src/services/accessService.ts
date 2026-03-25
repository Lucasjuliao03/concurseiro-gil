import { UserAnswer } from "@/types/study";
import { getList, STORAGE_KEYS } from "./storageService";
import { getCurrentUser } from "./authService";

export const FREE_QUESTION_LIMIT = 10;

export function getAnsweredCount(userId: string): number {
  const answers = getList<UserAnswer>(STORAGE_KEYS.ANSWERS);
  return answers.filter((a) => a.userId === userId).length;
}

export function canAnswer(): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.isApproved) return true;
  return getAnsweredCount(user.id) < FREE_QUESTION_LIMIT;
}

export function getRemainingFreeQuestions(): number {
  const user = getCurrentUser();
  if (!user) return 0;
  if (user.role === "admin" || user.isApproved) return Infinity;
  const answered = getAnsweredCount(user.id);
  return Math.max(0, FREE_QUESTION_LIMIT - answered);
}
