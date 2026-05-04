import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { checkRateLimit } from "@/lib/rate-limit";
import { sanitizeString } from "@/lib/sanitize";
import lockfile from "proper-lockfile";

const dataFilePath = path.join(process.cwd(), "data", "messages.json");

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

function readMessages(): ContactMessage[] {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeMessages(messages: ContactMessage[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: max 5 contact submissions per minute per IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimit = checkRateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 60_000 });

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
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
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

    if (typeof subject !== "string" || subject.trim().length < 2) {
      return NextResponse.json(
        { error: "Subject must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (typeof subject !== "string" || subject.trim().length > 200) {
      return NextResponse.json(
        { error: "Subject must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Message must be 2000 characters or fewer." },
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
      // Sanitize and save message
      const messages = readMessages();
      const newMessage: ContactMessage = {
        id: crypto.randomUUID(),
        name: sanitizeString(name),
        email: sanitizeString(email),
        subject: sanitizeString(subject),
        message: sanitizeString(message),
        createdAt: new Date().toISOString(),
        read: false,
      };
      messages.push(newMessage);
      writeMessages(messages);
    } finally {
      await release();
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET endpoint removed for security — prevents unauthorized access to user messages.
// To re-enable, implement proper authentication middleware.
