# Backend

Express server for the andrewchupka.com portfolio. Handles contact form submissions and forwards them via email using Resend.

## Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript (ESM, NodeNext)
- **Email:** Resend
- **Rate limiting:** express-rate-limit

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload via tsx |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server from `dist/` |
| `npm run typecheck` | Type-check without emitting files |

## Environment Variables

Create a `.env` file in this directory with the following:

```env
PORT=4000
RESEND_API_KEY=         # From your Resend dashboard
CONTACT_EMAIL=          # The address that receives form submissions
```

`RESEND_API_KEY` requires a verified sending domain in Resend. The `from` address used is `portfolio@andrewchupka.com`.

## Routes

### `GET /health`

Returns server status and a timestamp. Used to confirm the compile and run pipeline is working.

**Response `200`**
```json
{ "status": "ok", "timestamp": "2026-03-31T00:00:00.000Z" }
```

---

### `POST /contact`

Accepts a contact form submission and sends an email to the configured `CONTACT_EMAIL` address.

**Rate limit:** 3 requests per IP per hour.

**Request body**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Hello, I'd like to get in touch."
}
```

| Field | Rules |
|---|---|
| `name` | Required. Letters, spaces, `'`, `-`, `.`, `,` only. No HTML. |
| `email` | Required. Valid email format. No HTML. |
| `message` | Required. Minimum 10 characters. No HTML. |

**Response `200`**
```json
{ "message": "Message sent successfully." }
```

**Response `400`** — validation failure
```json
{ "error": "Please enter a valid email address." }
```

**Response `429`** — rate limit exceeded
```json
{ "error": "Too many requests, please try again later." }
```

**Response `500`** — Resend failure or server misconfiguration
```json
{ "error": "Failed to send message. Please try again." }
```

The `reply-to` header is set to the visitor's submitted email so replies go directly to them.
