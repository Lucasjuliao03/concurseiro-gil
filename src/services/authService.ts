import { User, UserRole } from "@/types/study";
import { getItem, setItem, getList, STORAGE_KEYS } from "./storageService";

// Simple hash for localStorage-only auth (NOT production-grade crypto)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_concurseiro_salt_2024");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// Admin seed — created on first app load
const ADMIN_EMAIL = "admin@concurseirogil.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_NAME = "Administrador";

export async function seedAdmin(): Promise<void> {
  const users = getList<User>(STORAGE_KEYS.USERS);
  const adminExists = users.some((u) => u.email === ADMIN_EMAIL);
  if (adminExists) return;

  const hash = await hashPassword(ADMIN_PASSWORD);
  const admin: User = {
    id: "admin_001",
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    passwordHash: hash,
    role: "admin",
    isApproved: true,
    createdAt: new Date().toISOString(),
  };
  users.push(admin);
  setItem(STORAGE_KEYS.USERS, users);
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  const users = getList<User>(STORAGE_KEYS.USERS);

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Este email já está cadastrado." };
  }

  if (password.length < 4) {
    return { success: false, error: "A senha deve ter no mínimo 4 caracteres." };
  }

  const hash = await hashPassword(password);
  const newUser: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    passwordHash: hash,
    role: "user" as UserRole,
    isApproved: false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  setItem(STORAGE_KEYS.USERS, users);
  setItem(STORAGE_KEYS.CURRENT_USER_ID, newUser.id);

  return { success: true, user: newUser };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  const users = getList<User>(STORAGE_KEYS.USERS);
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: "Email ou senha inválidos." };
  }

  const hash = await hashPassword(password);
  if (user.passwordHash !== hash) {
    return { success: false, error: "Email ou senha inválidos." };
  }

  setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);
  return { success: true, user };
}

export function logout(): void {
  setItem(STORAGE_KEYS.CURRENT_USER_ID, null);
}

export function getCurrentUser(): User | null {
  const userId = getItem<string>(STORAGE_KEYS.CURRENT_USER_ID);
  if (!userId) return null;
  const users = getList<User>(STORAGE_KEYS.USERS);
  return users.find((u) => u.id === userId) ?? null;
}

export function getAllUsers(): User[] {
  return getList<User>(STORAGE_KEYS.USERS);
}

export function approveUser(userId: string): void {
  const users = getList<User>(STORAGE_KEYS.USERS);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx !== -1) {
    users[idx].isApproved = true;
    setItem(STORAGE_KEYS.USERS, users);
  }
}

export function blockUser(userId: string): void {
  const users = getList<User>(STORAGE_KEYS.USERS);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx !== -1) {
    users[idx].isApproved = false;
    setItem(STORAGE_KEYS.USERS, users);
  }
}
