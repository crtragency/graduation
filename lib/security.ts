import { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return;
  const originHost = new URL(origin).host;
  if (originHost !== host) throw new Error("INVALID_ORIGIN");
}

export function rateLimit(request: NextRequest, scope: string, limit = 12, windowMs = 60_000) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = `${scope}:${forwarded ?? request.headers.get("x-real-ip") ?? "local"}`;
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { remaining: limit - 1, resetAt: now + windowMs };
  }
  if (bucket.count >= limit) throw new Error("RATE_LIMITED");
  bucket.count += 1;
  return { remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

export function apiError(error: unknown) {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
  if (message === "UNAUTHORIZED") return { status: 401, message: "Sign in to continue." };
  if (message === "INVALID_ORIGIN") return { status: 403, message: "Request origin is not allowed." };
  if (message === "RATE_LIMITED") return { status: 429, message: "Too many requests. Please try again shortly." };
  return { status: 500, message: "Something went wrong while processing the request." };
}
