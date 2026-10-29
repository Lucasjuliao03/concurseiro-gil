import { describe, expect, it } from "vitest";
import { getRankForXp, getSubjectPerformance } from "@/services/statsService";

describe("statsService", () => {
  it("selects the highest rank reached", () => {
    expect(getRankForXp(0).name).toBe("Recruta");
    expect(getRankForXp(900).name).toBe("2º Sargento");
    expect(getRankForXp(25_000).name).toBe("Comandante-Geral");
  });

  it("aggregates attempts and accuracy by subject", () => {
    const result = getSubjectPerformance(
      [{ question_id: 10, total_attempts: 4, total_correct: 3 }],
      [{ id: "10", subjectId: "1" }],
      [{ id: "1", name: "Direito Penal" }],
    );
    expect(result[0]).toEqual({ subjectId: "1", name: "Direito Penal", accuracy: 75, totalAttempts: 4 });
  });
});
