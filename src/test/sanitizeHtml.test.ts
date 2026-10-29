import { describe, expect, it } from "vitest";
import { sanitizeSummaryHtml } from "@/lib/sanitizeHtml";

describe("sanitizeSummaryHtml", () => {
  it("removes scripts, event handlers and inline styles", () => {
    const dirty = '<p style="color:red" onclick="alert(1)">Seguro</p><script>alert(2)</script><img src=x onerror="alert(3)">';
    const clean = sanitizeSummaryHtml(dirty);
    expect(clean).toContain("Seguro");
    expect(clean).not.toMatch(/script|onclick|onerror|style=/i);
  });
});
