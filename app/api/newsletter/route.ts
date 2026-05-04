import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeString } from "@/lib/sanitize";
import lockfile from "proper-lockfile";

const dataFilePath = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

function readSubscribers(): Subscriber[] {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeSubscribers(subscribers: Subscriber[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(subscribers, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 3 newsletter subscriptions per minute per IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimit = checkRateLimit(`newsletter:${ip}`, { maxRequests: 3, windowMs: 60_000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil(rateLimit.retryAfterMs / 1000)) },
        }
      );
    }

    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email address is too long." },
        { status: 400 }
      );
    }

    // Ensure file exists before locking
    if (!fs.existsSync(dataFilePath)) {
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dataFilePath, "[]", "utf-8");
    }

    // Acquire lock
    const release = await lockfile.lock(dataFilePath, {
      retries: { retries: 5, minTimeout: 50, maxTimeout: 500 },
    });

    try {
      const subscribers = readSubscribers();

      // Check for duplicates
      const exists = subscribers.some(
        (s) => s.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        return NextResponse.json(
          { success: true, message: "Already subscribed." },
          { status: 200 }
        );
      }

      // Sanitize and save subscriber
      const newSubscriber: Subscriber = {
        id: crypto.randomUUID(),
        email: sanitizeString(email.trim().toLowerCase()),
        subscribedAt: new Date().toISOString(),
      };
      subscribers.push(newSubscriber);
      writeSubscribers(subscribers);
    } finally {
      await release();
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET endpoint removed for security — prevents unauthorized access to subscriber emails.
// To re-enable, implement proper authentication middleware.
