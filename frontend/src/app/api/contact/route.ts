import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z ,.'\\-]+$/;
const HTML_PATTERN = /<[^>]*>/;
const SCRIPT_PATTERN = /<script[\s\S]*?>[\s\S]*?<\/script>/i;

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
