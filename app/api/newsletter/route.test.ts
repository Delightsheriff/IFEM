import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/newsletter/route";

const origin = "http://localhost";
const clientRequest = (body: unknown, ip: string) =>
  new Request(`${origin}/api/newsletter`, {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ip },
    body: JSON.stringify(body),
  });

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("POST /api/newsletter", () => {
  it("returns 404 when the feature is disabled", async () => {
    const response = await POST(clientRequest({ email: "a@b.c" }, "10.0.0.1"));
    expect(response.status).toBe(404);
  });

  it("silently acknowledges honeypot submissions", async () => {
    vi.stubEnv("NEWSLETTER_ENABLED", "true");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      clientRequest({ email: "a@b.c", honeypot: "trapped" }, "10.0.0.2"),
    );
    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid email with 422", async () => {
    vi.stubEnv("NEWSLETTER_ENABLED", "true");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      clientRequest({ email: "not-an-email" }, "10.0.0.3"),
    );
    expect(response.status).toBe(422);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("forwards a valid subscription to the webhook", async () => {
    vi.stubEnv("NEWSLETTER_ENABLED", "true");
    vi.stubEnv("NEWSLETTER_WEBHOOK_URL", "https://example.com/newsletter");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      clientRequest({ email: "student@example.com" }, "10.0.0.4"),
    );
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/newsletter",
      expect.objectContaining({
        body: JSON.stringify({ source: "newsletter", email: "student@example.com" }),
      }),
    );
  });
});