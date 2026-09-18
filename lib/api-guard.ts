import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const requests = new Map<string, RateLimitEntry>();

const MAX_TRACKED_KEYS = 1_000;
const PRUNE_BATCH_SIZE = 200;

function pruneOldEntries(): void {
  if (requests.size <= MAX_TRACKED_KEYS) return;
  const keysToPrune = [...requests.keys()].slice(
    0,
    Math.min(PRUNE_BATCH_SIZE, requests.size),
  );
  for (const key of keysToPrune) requests.delete(key);
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function rejectOversizedRequest(
  request: Request,
  maximumBytes: number,
): Promise<NextResponse | null> {
  const contentLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(contentLength) && contentLength > maximumBytes) {
    return NextResponse.json(
      {
        error: "Your submission is too large. Please shorten it and try again.",
      },
      { status: 413 },
    );
  }

  // Content-Length is a hint; enforce on the real byte count too. The
  // clone lets the route read the body afterwards and is cheap for the
  // small payloads these forms send.
  try {
    const bytes = await request.clone().arrayBuffer();
    if (bytes.byteLength > maximumBytes) {
      return NextResponse.json(
        {
          error: "Your submission is too large. Please shorten it and try again.",
        },
        { status: 413 },
      );
    }
  } catch {
    // Unreadable body — fall back to the header check above.
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
    pruneOldEntries();
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
