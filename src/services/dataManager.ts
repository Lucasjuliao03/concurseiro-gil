/**
 * dataManager.ts — Dynamic data layer
 * Seeds static data into localStorage on first load.
 * All reads/writes go through this service for CRUD support.
 */
import { getItem, setItem } from "./storageService";
import { Question, Flashcard, Subject } from "@/types/study";
import { questions as seedQuestions, subjects as seedSubjects } from "@/data/questionsDb";
import { flashcards as seedFlashcards } from "@/data/flashcardsDb";
import { resumoTopics as seedResumos, ResumoTopic, ResumoSubtopic } from "@/data/resumosDb";
import { courses as seedCourses, Course } from "@/data/courses";

// Storage keys for dynamic data
const DK = {
  QUESTIONS: "dyn_questions",
  FLASHCARDS: "dyn_flashcards",
  RESUMOS: "dyn_resumos",
  COURSES: "dyn_courses",
  SUBJECTS: "dyn_subjects",
  SEEDED: "dyn_seeded",
} as const;

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// ── Seed ────────────────────────────────────────────────
export function seedIfNeeded(): void {
  if (getItem<boolean>(DK.SEEDED)) return;
  setItem(DK.QUESTIONS, seedQuestions);
  setItem(DK.FLASHCARDS, seedFlashcards);
  setItem(DK.RESUMOS, seedResumos);
  setItem(DK.COURSES, seedCourses);
  setItem(DK.SUBJECTS, seedSubjects);
  setItem(DK.SEEDED, true);
}

// ── Subjects ────────────────────────────────────────────
export function getSubjects(): Subject[] {
  return getItem<Subject[]>(DK.SUBJECTS) ?? seedSubjects;
}
export function addSubject(s: Omit<Subject, "id">): Subject {
  const list = getSubjects();
  const item: Subject = { ...s, id: generateId() } as Subject;
  list.push(item);
  setItem(DK.SUBJECTS, list);
  return item;
}
export function updateSubject(id: string, data: Partial<Subject>): void {
  const list = getSubjects();
  const idx = list.findIndex((s) => s.id === id);
  if (idx !== -1) { list[idx] = { ...list[idx], ...data }; setItem(DK.SUBJECTS, list); }
}
export function deleteSubject(id: string): void {
  setItem(DK.SUBJECTS, getSubjects().filter((s) => s.id !== id));
}

// ── Questions ───────────────────────────────────────────
export function getQuestions(): Question[] {
  return getItem<Question[]>(DK.QUESTIONS) ?? seedQuestions;
}
export function addQuestion(q: Omit<Question, "id">): Question {
  const list = getQuestions();
  const item: Question = { ...q, id: generateId() } as Question;
  list.push(item);
  setItem(DK.QUESTIONS, list);
  return item;
}
export function updateQuestion(id: string, data: Partial<Question>): void {
  const list = getQuestions();
  const idx = list.findIndex((q) => q.id === id);
  if (idx !== -1) { list[idx] = { ...list[idx], ...data }; setItem(DK.QUESTIONS, list); }
}
export function deleteQuestion(id: string): void {
  setItem(DK.QUESTIONS, getQuestions().filter((q) => q.id !== id));
}

// ── Flashcards ──────────────────────────────────────────
export function getFlashcards(): Flashcard[] {
  return getItem<Flashcard[]>(DK.FLASHCARDS) ?? seedFlashcards;
}
export function addFlashcard(f: Omit<Flashcard, "id">): Flashcard {
  const list = getFlashcards();
  const item: Flashcard = { ...f, id: generateId() } as Flashcard;
  list.push(item);
  setItem(DK.FLASHCARDS, list);
  return item;
}
export function updateFlashcard(id: string, data: Partial<Flashcard>): void {
  const list = getFlashcards();
  const idx = list.findIndex((f) => f.id === id);
  if (idx !== -1) { list[idx] = { ...list[idx], ...data }; setItem(DK.FLASHCARDS, list); }
}
export function deleteFlashcard(id: string): void {
  setItem(DK.FLASHCARDS, getFlashcards().filter((f) => f.id !== id));
}

// ── Resumos ─────────────────────────────────────────────
export function getResumos(): ResumoTopic[] {
  return getItem<ResumoTopic[]>(DK.RESUMOS) ?? seedResumos;
}
export function addResumo(r: Omit<ResumoTopic, "id">): ResumoTopic {
  const list = getResumos();
  const item: ResumoTopic = { ...r, id: generateId() };
  list.push(item);
  setItem(DK.RESUMOS, list);
  return item;
}
export function updateResumo(id: string, data: Partial<ResumoTopic>): void {
  const list = getResumos();
  const idx = list.findIndex((r) => r.id === id);
  if (idx !== -1) { list[idx] = { ...list[idx], ...data }; setItem(DK.RESUMOS, list); }
}
export function deleteResumo(id: string): void {
  setItem(DK.RESUMOS, getResumos().filter((r) => r.id !== id));
}
export function addSubtopic(resumoId: string, sub: Omit<ResumoSubtopic, "id">): void {
  const list = getResumos();
  const idx = list.findIndex((r) => r.id === resumoId);
  if (idx !== -1) {
    list[idx].subtopics.push({ ...sub, id: generateId() });
    setItem(DK.RESUMOS, list);
  }
}
export function updateSubtopic(resumoId: string, subId: string, data: Partial<ResumoSubtopic>): void {
  const list = getResumos();
  const rIdx = list.findIndex((r) => r.id === resumoId);
  if (rIdx !== -1) {
    const sIdx = list[rIdx].subtopics.findIndex((s) => s.id === subId);
    if (sIdx !== -1) {
      list[rIdx].subtopics[sIdx] = { ...list[rIdx].subtopics[sIdx], ...data };
      setItem(DK.RESUMOS, list);
    }
  }
}
export function deleteSubtopic(resumoId: string, subId: string): void {
  const list = getResumos();
  const idx = list.findIndex((r) => r.id === resumoId);
  if (idx !== -1) {
    list[idx].subtopics = list[idx].subtopics.filter((s) => s.id !== subId);
    setItem(DK.RESUMOS, list);
  }
}

// ── Courses ─────────────────────────────────────────────
export function getCourses(): Course[] {
  return getItem<Course[]>(DK.COURSES) ?? seedCourses;
}
export function addCourse(c: Omit<Course, "id">): Course {
  const list = getCourses();
  const item: Course = { ...c, id: generateId() } as Course;
  list.push(item);
  setItem(DK.COURSES, list);
  return item;
}
export function updateCourse(id: string, data: Partial<Course>): void {
  const list = getCourses();
  const idx = list.findIndex((c) => c.id === id);
  if (idx !== -1) { list[idx] = { ...list[idx], ...data }; setItem(DK.COURSES, list); }
}
export function deleteCourse(id: string): void {
  setItem(DK.COURSES, getCourses().filter((c) => c.id !== id));
}
