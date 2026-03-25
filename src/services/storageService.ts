// Generic localStorage wrapper with type safety

const PREFIX = "concurseiro_";

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

export function getList<T>(key: string): T[] {
  return getItem<T[]>(key) ?? [];
}

export function appendToList<T>(key: string, item: T): void {
  const list = getList<T>(key);
  list.push(item);
  setItem(key, list);
}

// Storage keys constants
export const STORAGE_KEYS = {
  USERS: "users",
  CURRENT_USER_ID: "current_user_id",
  ANSWERS: "answers",
  FLASHCARD_REVIEWS: "flashcard_reviews",
  USER_STATS: "user_stats",
} as const;
