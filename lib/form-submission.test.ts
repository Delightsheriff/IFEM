import { afterEach, describe, expect, it, vi } from "vitest";
import {
  MAXIMUM_EMAIL_LENGTH,
  MAXIMUM_MESSAGE_LENGTH,
  forwardToWebhook,
  isHoneypot,
  validateEmail,
} from "@/lib/form-submission";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("validateEmail", () => {
  it("rejects missing and malformed emails", () => {
    expect(validateEmail("")).toMatch(/enter/i);
    expect(validateEmail("not-an-email")).toMatch(/doesn't look right/i);
    expect(validateEmail("a@b")).toMatch(/doesn't look right/i);
    expect(
      validateEmail(`${"a".repeat(MAXIMUM_EMAIL_LENGTH)}@example.com`),
    ).toMatch(/shorter/i);
  });

  it("accepts a well-formed email", () => {
    expect(validateEmail("student@example.com")).toBeNull();
  });
});

describe("isHoneypot", () => {
  it("flags any non-empty string as a bot trap", () => {
    expect(isHoneypot(" ")).toBe(false);
    expect(isHoneypot("hello")).toBe(true);
  });

  it("ignores non-string values", () => {
    expect(isHoneypot(undefined)).toBe(false);
    expect(isHoneypot(null)).toBe(false);
    expect(isHoneypot(123)).toBe(false);
    expect(isHoneypot(["x"])).toBe(false);
  });
});

describe("forwardToWebhook", () => {
  it("skips posting when no URL is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await forwardToWebhook(undefined, { source: "newsletter", email: "a@b.c" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the JSON payload to the configured URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    await forwardToWebhook("https://example.com/hook", {
      source: "contact-form",
      email: "a@b.c",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/hook",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact-form", email: "a@b.c" }),
      }),
    );
  });

  it("never throws when the webhook is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    await expect(
      forwardToWebhook("https://example.com/hook", {
        message: "x".repeat(MAXIMUM_MESSAGE_LENGTH),
      }),
    ).resolves.toBeUndefined();
  });
});