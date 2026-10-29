import { describe, expect, it } from "vitest";
import { localDateKey } from "@/lib/dates";

describe("localDateKey", () => {
  it("formats the browser-local calendar day without UTC conversion", () => {
    expect(localDateKey(new Date(2026, 0, 2, 23, 59))).toBe("2026-01-02");
  });
});
