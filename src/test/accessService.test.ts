import { describe, expect, it } from "vitest";
import { canAccessContent, canAccessSummaries, getRemainingUsage, isUserActive } from "@/services/accessService";
import type { User } from "@/types/study";

const baseUser: User = {
  id: "user-1", name: "Aluno", email: "aluno@example.com", passwordHash: "", role: "student",
  isApproved: false, createdAt: "2026-01-01T00:00:00.000Z",
};

describe("accessService", () => {
  it("enforces the lifetime free content boundary", () => {
    expect(canAccessContent(baseUser, 9)).toBe(true);
    expect(canAccessContent(baseUser, 10)).toBe(false);
    expect(getRemainingUsage(baseUser, 7)).toBe(3);
  });

  it("allows approved students and admins without a usage cap", () => {
    expect(canAccessContent({ ...baseUser, isApproved: true }, 999)).toBe(true);
    expect(getRemainingUsage({ ...baseUser, role: "admin" }, 999)).toBe(Infinity);
  });

  it("blocks expired students but never expires admins", () => {
    const expired = { ...baseUser, isApproved: true, activeUntil: "2020-01-01T00:00:00.000Z" };
    expect(isUserActive(expired)).toBe(false);
    expect(canAccessContent(expired, 0)).toBe(false);
    expect(isUserActive({ ...expired, role: "admin" })).toBe(true);
  });

  it("enforces the free summary boundary", () => {
    expect(canAccessSummaries(baseUser, 1)).toBe(true);
    expect(canAccessSummaries(baseUser, 2)).toBe(false);
  });
});
