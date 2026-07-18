import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requests = new Map<string, RateLimitEntry>();

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function rejectOversizedRequest(
  request: Request,
  maximumBytes: number,
): NextResponse | null {
  const contentLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(contentLength) && contentLength > maximumBytes) {
    return NextResponse.json(
      {
        error: "Your submission is too large. Please shorten it and try again.",
      },
      { status: 413 },
    );
  }

  return null;
}

export function enforceRateLimit({
  request,
  route,
  limit,
  windowMs,
}: {
  request: Request;
  route: string;
  limit: number;
  windowMs: number;
}): NextResponse | null {
  const now = Date.now();
  const key = `${route}:${getClientIp(request)}`;
  const existing = requests.get(key);

  if (!existing || now >= existing.resetAt) {
    requests.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (existing.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  existing.count += 1;
  return null;
}
