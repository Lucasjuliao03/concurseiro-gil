import { UserAnswer, UserStats, DailyGoal, SubjectPerformance } from "@/types/study";
import { getItem, setItem, getList, appendToList, STORAGE_KEYS } from "./storageService";
import { subjects } from "@/data/questionsDb";

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

function getRankForXp(xp: number) {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.xpRequired) current = rank;
    else break;
  }
  return current;
}

function getDefaultStats(userId: string): UserStats {
  return {
    userId,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastActivityDate: "",
    xp: 0,
    level: 1,
    rank: "Recruta",
    dailyGoal: { questionsTarget: 10, questionsCompleted: 0, flashcardsTarget: 10, flashcardsCompleted: 0 },
    weeklyXp: [0, 0, 0, 0, 0, 0, 0],
  };
}

export function getStats(userId: string): UserStats {
  const allStats = getList<UserStats>(STORAGE_KEYS.USER_STATS);
  return allStats.find((s) => s.userId === userId) ?? getDefaultStats(userId);
}

function saveStats(stats: UserStats): void {
  const allStats = getList<UserStats>(STORAGE_KEYS.USER_STATS);
  const idx = allStats.findIndex((s) => s.userId === stats.userId);
  if (idx !== -1) {
    allStats[idx] = stats;
  } else {
    allStats.push(stats);
  }
  setItem(STORAGE_KEYS.USER_STATS, allStats);
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function getDayOfWeek(): number {
  return new Date().getDay(); // 0=Sunday
}

export function recordAnswer(userId: string, questionId: string, selectedOption: string, isCorrect: boolean): void {
  // Save answer
  const answer: UserAnswer = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
    userId,
    questionId,
    selectedOption,
    isCorrect,
    answeredAt: new Date().toISOString(),
  };
  appendToList(STORAGE_KEYS.ANSWERS, answer);

  // Update stats
  const stats = getStats(userId);
  stats.totalAnswered += 1;
  if (isCorrect) stats.totalCorrect += 1;

  const earnedXp = isCorrect ? XP_PER_CORRECT : XP_PER_WRONG;
  stats.xp += earnedXp;

  // Update rank
  const rank = getRankForXp(stats.xp);
  stats.level = rank.level;
  stats.rank = rank.name;

  // Update streak
  const today = todayStr();
  if (stats.lastActivityDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    stats.streak = stats.lastActivityDate === yesterdayStr ? stats.streak + 1 : 1;
    stats.lastActivityDate = today;
  }

  // Update daily goal
  stats.dailyGoal.questionsCompleted += 1;

  // Update weekly XP
  const dayIdx = getDayOfWeek();
  stats.weeklyXp[dayIdx] = (stats.weeklyXp[dayIdx] || 0) + earnedXp;

  saveStats(stats);
}

export function recordFlashcardReview(userId: string): void {
  const stats = getStats(userId);
  stats.xp += XP_PER_FLASHCARD;
  stats.dailyGoal.flashcardsCompleted += 1;

  const rank = getRankForXp(stats.xp);
  stats.level = rank.level;
  stats.rank = rank.name;

  const today = todayStr();
  if (stats.lastActivityDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    stats.streak = stats.lastActivityDate === yesterdayStr ? stats.streak + 1 : 1;
    stats.lastActivityDate = today;
  }

  const dayIdx = getDayOfWeek();
  stats.weeklyXp[dayIdx] = (stats.weeklyXp[dayIdx] || 0) + XP_PER_FLASHCARD;

  saveStats(stats);
}

export function getSubjectPerformance(userId: string, allQuestions: { id: string; subjectId: string }[]): SubjectPerformance[] {
  const answers = getList<UserAnswer>(STORAGE_KEYS.ANSWERS).filter((a) => a.userId === userId);

  return subjects.map((subject) => {
    const subjectQuestionIds = allQuestions
      .filter((q) => q.subjectId === subject.id)
      .map((q) => q.id);
    const subjectAnswers = answers.filter((a) => subjectQuestionIds.includes(a.questionId));
    const correct = subjectAnswers.filter((a) => a.isCorrect).length;
    const total = subjectAnswers.length;

    return {
      subjectId: subject.id,
      name: subject.name,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
      totalAttempts: total,
    };
  });
}

export function getUserAnswers(userId: string): UserAnswer[] {
  return getList<UserAnswer>(STORAGE_KEYS.ANSWERS).filter((a) => a.userId === userId);
}
