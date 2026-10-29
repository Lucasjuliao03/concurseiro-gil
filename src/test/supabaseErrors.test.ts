import { describe, expect, it } from "vitest";
import { studyDataErrorMessage } from "@/lib/supabaseErrors";

describe("studyDataErrorMessage", () => {
  it("identifies a backend migration mismatch", () => {
    expect(studyDataErrorMessage({ code: "PGRST202", message: "missing RPC" }))
      .toContain("banco de dados do SAFO precisa ser atualizado");
  });

  it("identifies a course or RLS authorization failure", () => {
    expect(studyDataErrorMessage({ code: "42501", message: "permission denied" }))
      .toContain("Confirme o curso vinculado");
  });

  it("keeps a safe generic message for unknown failures", () => {
    expect(studyDataErrorMessage(new Error("internal details")))
      .toContain("Não foi possível carregar os dados");
  });
});
