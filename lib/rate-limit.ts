/**
 * Simple in-memory rate limiter for API routes.
 * Limits requests per IP within a sliding time window.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60_000); // Clean every 60 seconds

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60_000 }
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { allowed: true, remaining: config.maxRequests - 1, retryAfterMs: 0 };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: entry.resetTime - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    retryAfterMs: 0,
  };
}
