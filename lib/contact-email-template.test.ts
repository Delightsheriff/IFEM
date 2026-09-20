import { describe, expect, it } from "vitest";
import { buildContactEmail } from "@/lib/contact-email-template";

describe("buildContactEmail", () => {
  it("includes every submitted field in text and HTML safely", () => {
    const { text, html } = buildContactEmail(
      {
        name: "Ada <Obi>",
        email: "ada@example.com",
        phone: "+234 800 000 0000",
        subject: "Study in the UK",
        message: "Please advise <me>\nabout September.",
      },
      new Date("2026-09-20T12:00:00.000Z"),
    );

    expect(text).toContain("Ada <Obi>");
    expect(text).toContain("Please advise <me>\nabout September.");
    expect(text).toContain("Submitted: 2026-09-20T12:00:00.000Z");
    expect(html).toContain("Ada &lt;Obi&gt;");
    expect(html).toContain("Please advise &lt;me&gt;");
    expect(html).not.toContain("<Obi>");
  });
});
