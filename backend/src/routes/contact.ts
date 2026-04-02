import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { Resend } from "resend";

const contactRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 1500,
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z ,.'\\-]+$/;
const HTML_PATTERN = /<[^>]*>/;
const SCRIPT_PATTERN = /<script[\s\S]*?>[\s\S]*?<\/script>/i;

function containsHtml(value: string): boolean {
  return HTML_PATTERN.test(value);
}

function containsScript(value: string): boolean {
  return SCRIPT_PATTERN.test(value);
}

function validateBody(body: unknown): { error: string } | null {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body." };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Please enter your name." };
  }
  if (containsHtml(name) || containsScript(name)) {
    return { error: "Name contains invalid content." };
  }
  if (!NAME_PATTERN.test(name.trim())) {
    return { error: "Use letters, spaces, ', or - only." };
  }

  if (typeof email !== "string" || email.trim().length === 0) {
    return { error: "Please enter your email." };
  }
  if (containsHtml(email) || containsScript(email)) {
    return { error: "Email contains invalid content." };
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return { error: "Please enter a valid email address." };
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return { error: "Please enter a message." };
  }
  if (containsHtml(message) || containsScript(message)) {
    return { error: "Message contains invalid content." };
  }
  if (message.trim().length < 10) {
    return { error: "Message must be at least 10 characters." };
  }

  return null;
}

contactRouter.post("/", contactLimiter, async (request, response) => {
  const validationError = validateBody(request.body);
  if (validationError !== null) {
    response.status(400).json(validationError);
    return;
  }

  const { name, email, message } = request.body as {
    name: string;
    email: string;
    message: string;
  };

  const toAddress = process.env.CONTACT_EMAIL;
  if (typeof toAddress !== "string" || toAddress.length === 0) {
    response.status(500).json({ error: "Server misconfiguration." });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (typeof resendApiKey !== "string" || resendApiKey.length === 0) {
    response.status(500).json({ error: "Server misconfiguration." });
    return;
  }

  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: "portfolio@andrewchupka.com",
    to: toAddress,
    replyTo: email.trim(),
    subject: `New contact form message from ${name.trim()}`,
    text: [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Message:\n${message.trim()}`,
    ].join("\n\n"),
  });

  if (error !== null) {
    response.status(500).json({ error: "Failed to send message. Please try again." });
    return;
  }

  response.status(200).json({ message: "Message sent successfully." });
});

export { contactRouter };
