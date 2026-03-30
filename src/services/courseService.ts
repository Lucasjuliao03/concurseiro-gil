// courseService.ts — Uses localStorage for user preference

import { getItem, setItem } from "./storageService";

const COURSE_KEY = "user_course";

export function setUserCourseId(userId: string, courseId: string): void {
  const map = getItem<Record<string, string>>(COURSE_KEY) ?? {};
  map[userId] = courseId;
  setItem(COURSE_KEY, map);
}

export function getUserCourseId(userId: string): string | null {
  const map = getItem<Record<string, string>>(COURSE_KEY) ?? {};
  return map[userId] || null;
}

