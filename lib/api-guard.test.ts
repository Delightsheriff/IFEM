import { afterEach, describe, expect, it, vi } from "vitest";
import {
  enforceRateLimit,
  getClientIp,
  rejectOversizedRequest,
} from "@/lib/api-guard";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe("getClientIp", () => {
  it("prefers cf-connecting-ip when present", () => {
    const request = new Request("http://localhost", {
      headers: {
        "cf-connecting-ip": "203.0.113.7",
        "x-forwarded-for": "203.0.113.99",
      },
    });
    expect(getClientIp(request)).toBe("203.0.113.7");
  });

  it("falls back to the first x-forwarded-for address", () => {
    const request = new Request("http://localhost", {
      headers: { "x-forwarded-for": "203.0.113.5, 10.0.0.1" },
    });
    expect(getClientIp(request)).toBe("203.0.113.5");
  });

  it("returns unknown when no client IP exists", () => {
    expect(getClientIp(new Request("http://localhost"))).toBe("unknown");
  });
});

describe("enforceRateLimit", () => {
  it("allows requests up to the limit and rejects beyond it", () => {
    const request = new Request("http://localhost", {
      headers: { "cf-connecting-ip": "1.1.1.1" },
    });
    const options = { request, route: "rl-a", limit: 2, windowMs: 60_000 };

    expect(enforceRateLimit(options)).toBeNull();
    expect(enforceRateLimit(options)).toBeNull();

    const rejected = enforceRateLimit(options);
    expect(rejected?.status).toBe(429);
    expect(rejected?.headers.get("Retry-After")).toBe("60");
  });

  it("resets the window once it has elapsed", () => {
    vi.useFakeTimers();
    const request = new Request("http://localhost", {
      headers: { "cf-connecting-ip": "1.1.1.1" },
    });
    const options = { request, route: "rl-b", limit: 1, windowMs: 60_000 };

    const start = new Date("2026-01-01T00:00:00.000Z");
    vi.setSystemTime(start);
    expect(enforceRateLimit(options)).toBeNull();

    vi.setSystemTime(start.getTime() + 60_001);
    expect(enforceRateLimit(options)).toBeNull();
  });

  it("tracks per-IP independently", () => {
    const ipA = new Request("http://localhost", {
      headers: { "cf-connecting-ip": "1.1.1.1" },
    });
    const ipB = new Request("http://localhost", {
      headers: { "cf-connecting-ip": "2.2.2.2" },
    });
    const optionsA = { request: ipA, route: "rl-c", limit: 1, windowMs: 60_000 };
    const optionsB = { request: ipB, route: "rl-c", limit: 1, windowMs: 60_000 };

    expect(enforceRateLimit(optionsA)).toBeNull();
    expect(enforceRateLimit(optionsA)).not.toBeNull();
    expect(enforceRateLimit(optionsB)).toBeNull();
  });
});

describe("rejectOversizedRequest", () => {
  it("rejects based on content-length header", async () => {
    const oversized = new Request("http://localhost", {
      method: "POST",
      headers: { "content-length": "9000" },
      body: "x".repeat(9000),
    });
    const rejection = await rejectOversizedRequest(oversized, 2000);
    expect(rejection?.status).toBe(413);
  });

  it("rejects on the real byte count when the header understates it", async () => {
    const sneaky = new Request("http://localhost", {
      method: "POST",
      headers: { "content-length": "100" },
      body: "y".repeat(5000),
    });
    const rejection = await rejectOversizedRequest(sneaky, 2000);
    expect(rejection?.status).toBe(413);
  });

  it("allows a compliant payload through", async () => {
    const compliant = new Request("http://localhost", {
      method: "POST",
      headers: { "content-length": "50" },
      body: JSON.stringify({ message: "short" }),
    });
    expect(await rejectOversizedRequest(compliant, 2000)).toBeNull();
  });
});