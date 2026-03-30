// statsService.ts — Supabase-backed stats (ranks kept locally for UI display)

import { SubjectPerformance } from "@/types/study";

const XP_PER_CORRECT = 15;
const XP_PER_WRONG = 3;
const XP_PER_FLASHCARD = 5;

const RANKS = [
  { level: 1, name: "Recruta", xpRequired: 0 },
  { level: 2, name: "Soldado", xpRequired: 200 },
  { level: 3, name: "Cabo", xpRequired: 500 },
  { level: 4, name: "Sargento", xpRequired: 1000 },
  { level: 5, name: "Subtenente", xpRequired: 2000 },
  { level: 6, name: "Tenente", xpRequired: 3500 },
  { level: 7, name: "Capitão", xpRequired: 5500 },
  { level: 8, name: "Major", xpRequired: 8000 },
  { level: 9, name: "Coronel", xpRequired: 12000 },
  { level: 10, name: "Delegado", xpRequired: 18000 },
];

export { RANKS as ranks };

export function getRankForXp(xp: number) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.xpRequired) current = rank;
    else break;
  }
  return current;
}

/**
 * Build stats object from profile + daily productivity data pulled via hooks
 */
export function buildStats(profile: any, todayProd: any) {
  const xp = profile?.xp_total ?? 0;
  const rank = getRankForXp(xp);
  return {
    userId: profile?.id ?? "",
    totalAnswered: 0,
    totalCorrect: 0,
    streak: profile?.streak_days ?? 0,
    lastActivityDate: profile?.last_access_at ?? "",
    xp,
    level: rank.level,
    rank: rank.name,
    dailyGoal: {
      questionsTarget: 10,
      questionsCompleted: todayProd?.questions_answered ?? 0,
      flashcardsTarget: 10,
      flashcardsCompleted: todayProd?.flashcards_reviewed ?? 0,
    },
    weeklyXp: [0, 0, 0, 0, 0, 0, 0],
  };
}

/**
 * Compute subject-level performance from the user_question_stats rows + questions list
 */
export function getSubjectPerformance(
  questionStats: any[],
  allQuestions: { id: string; subjectId: string }[],
  subjects: { id: string; name: string }[]
): SubjectPerformance[] {
  return subjects.map((subject) => {
    const subjectQuestionIds = allQuestions
      .filter((q) => q.subjectId === subject.id)
      .map((q) => q.id);

    const relevantStats = questionStats.filter((s: any) =>
      subjectQuestionIds.includes(String(s.question_id))
    );

    const totalAttempts = relevantStats.reduce((acc: number, s: any) => acc + (s.total_attempts || 0), 0);
    const totalCorrect = relevantStats.reduce((acc: number, s: any) => acc + (s.total_correct || 0), 0);

    return {
      subjectId: subject.id,
      name: subject.name,
      accuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
      totalAttempts,
    };
  });
}
