import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

const { resendSendMock } = vi.hoisted(() => ({ resendSendMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    apiKey: string;
    constructor(apiKey: string) {
      this.apiKey = apiKey;
    }
    emails = { send: resendSendMock };
  },
}));

vi.mock("@/sanity/sanity", () => ({
  getBranches: vi.fn().mockResolvedValue([
    { _id: "hq", email: "hq@example.com" },
    { _id: "abuja", email: "abuja@example.com" },
  ]),
}));

const origin = "http://localhost";
const clientRequest = (body: unknown, ip: string) =>
  new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ip },
    body: JSON.stringify(body),
  });

const validBody = {
  name: "Ada Obi",
  email: "ada@example.com",
  phone: "+2348000000000",
  subject: "Study in the UK",
  message: "I'd like to know about September intake requirements.",
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  resendSendMock.mockReset();
  resendSendMock.mockResolvedValue({ error: null });
});

describe("POST /api/contact", () => {
  it("silently acknowledges honeypot submissions", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      clientRequest({ ...validBody, honeypot: "bot" }, "10.0.0.10"),
    );
    expect(response.status).toBe(200);
    expect(resendSendMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns field errors with 422 for an invalid submission", async () => {
    const response = await POST(
      clientRequest({ ...validBody, name: "", message: "short" }, "10.0.0.11"),
    );
    expect(response.status).toBe(422);
    const { errors } = (await response.json()) as { errors: Record<string, string> };
    expect(errors.name).toMatch(/name/i);
    expect(errors.message).toMatch(/little more/i);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("returns 503 when Resend is not configured", async () => {
    const response = await POST(
      clientRequest(validBody, "10.0.0.12"),
    );
    expect(response.status).toBe(503);
    expect(resendSendMock).not.toHaveBeenCalled();
  });

  it("sends the email to the configured recipient and forwards the record", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "no-reply@example.com");
    vi.stubEnv("CONTACT_RECIPIENT_OVERRIDE", "admissions@example.com");
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://example.com/contact-hook");

    const response = await POST(clientRequest(validBody, "10.0.0.13"));
    expect(response.status).toBe(200);

    expect(resendSendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "no-reply@example.com",
        to: ["admissions@example.com"],
        replyTo: "ada@example.com",
        subject: "New enquiry: Study in the UK",
      }),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/contact-hook",
      expect.objectContaining({
        body: JSON.stringify({
          source: "contact-form",
          name: "Ada Obi",
          email: "ada@example.com",
          phone: "+2348000000000",
          subject: "Study in the UK",
          message: "I'd like to know about September intake requirements.",
        }),
      }),
    );
  });
});