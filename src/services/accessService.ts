// accessService.ts — Supabase-backed access control
// Access is now derived from the user object in AuthContext

import { User } from "@/types/study";

export const FREE_QUESTION_LIMIT = 10;

export function getAnsweredCount(_userId: string): number {
  // This is now tracked via user_daily_productivity in Supabase
  // The UI will pass the count from the hook data instead
  return 0;
}

export function canAnswer(user: User | null): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.isApproved) return true;
  // For free users, we check via the profile's plan_status
  return true; // allow by default, limit enforced via daily productivity count
}

export function getRemainingFreeQuestions(user: User | null, answeredCount: number): number {
  if (!user) return 0;
  if (user.role === "admin" || user.isApproved) return Infinity;
  return Math.max(0, FREE_QUESTION_LIMIT - answeredCount);
}
