import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z ,.'\\-]+$/;
const HTML_PATTERN = /<[^>]*>/;
const SCRIPT_PATTERN = /<script[\s\S]*?>[\s\S]*?<\/script>/i;
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

type RateLimitResult = {
  success: boolean;
  reset: number;
};

type InMemoryRateLimitEntry = {
  count: number;
  reset: number;
};

const inMemoryRateLimitStore = new Map<string, InMemoryRateLimitEntry>();

const redis =
  typeof process.env.UPSTASH_REDIS_REST_URL === 'string' &&
  process.env.UPSTASH_REDIS_REST_URL.length > 0 &&
  typeof process.env.UPSTASH_REDIS_REST_TOKEN === 'string' &&
  process.env.UPSTASH_REDIS_REST_TOKEN.length > 0
    ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null;

const contactRateLimit =
  redis !== null
    ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, '1 h'),
      prefix: 'ratelimit:contact',
    })
    : null;

export const runtime = 'nodejs';

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function containsHtml(value: string): boolean {
  return HTML_PATTERN.test(value);
}

function containsScript(value: string): boolean {
  return SCRIPT_PATTERN.test(value);
}

function validateBody(body: ContactRequestBody): { error: string } | null {
  const { name, email, message } = body;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return { error: 'Please enter your name.' };
  }
  if (containsHtml(name) || containsScript(name)) {
    return { error: 'Name contains invalid content.' };
  }
  if (!NAME_PATTERN.test(name.trim())) {
    return { error: "Use letters, spaces, ', or - only." };
  }

  if (typeof email !== 'string' || email.trim().length === 0) {
    return { error: 'Please enter your email.' };
  }
  if (containsHtml(email) || containsScript(email)) {
    return { error: 'Email contains invalid content.' };
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return { error: 'Please enter a valid email address.' };
  }

  if (typeof message !== 'string' || message.trim().length === 0) {
    return { error: 'Please enter a message.' };
  }
  if (containsHtml(message) || containsScript(message)) {
    return { error: 'Message contains invalid content.' };
  }
  if (message.trim().length < 10) {
    return { error: 'Message must be at least 10 characters.' };
  }

  return null;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }

  return 'unknown';
}

function applyInMemoryRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const existing = inMemoryRateLimitStore.get(identifier);

  if (existing === undefined || existing.reset <= now) {
    const reset = now + RATE_LIMIT_WINDOW_MS;
    inMemoryRateLimitStore.set(identifier, { count: 1, reset });
    return { success: true, reset };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { success: false, reset: existing.reset };
  }

  existing.count += 1;
  inMemoryRateLimitStore.set(identifier, existing);
  return { success: true, reset: existing.reset };
}

async function applyRateLimit(identifier: string): Promise<RateLimitResult> {
  if (contactRateLimit === null) {
    if (IS_PRODUCTION) {
      throw new Error('Contact rate limiter is not configured for production.');
    }

    return applyInMemoryRateLimit(identifier);
  }

  const result = await contactRateLimit.limit(identifier);
  return {
    success: result.success,
    reset: result.reset,
  };
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const validationError = validateBody(body);
  if (validationError !== null) {
    return NextResponse.json(validationError, { status: 400 });
  }

  const toAddress = process.env.CONTACT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (typeof toAddress !== 'string' || toAddress.length === 0) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }
  if (typeof resendApiKey !== 'string' || resendApiKey.length === 0) {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const message = String(body.message).trim();
  const ip = getClientIp(request);
  const identifier = `${ip}:${email.toLowerCase()}`;
  let rateLimitResult: RateLimitResult;

  try {
    rateLimitResult = await applyRateLimit(identifier);
  } catch {
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  if (!rateLimitResult.success) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
    );

    return NextResponse.json(
      { error: 'Too many messages. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSeconds),
        },
      },
    );
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: 'portfolio@andrewchupka.com',
    to: toAddress,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Message:\n${message}`,
    ].join('\n\n'),
  });

  if (error !== null) {
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Message sent successfully.' });
}
