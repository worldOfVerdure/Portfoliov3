# Contact API Rate Limiting

This route applies app-level rate limiting to reduce contact form abuse.

## Policy

- Limit: 3 messages
- Window: 1 hour
- Scope key: `<client-ip>:<email-lowercased>`

In practice, each unique IP + email pair can send up to 3 messages per rolling hour.

## Where It Is Enforced

Rate limiting is enforced in `route.ts` before the email is sent.

If a request exceeds the limit, the API returns:

- HTTP status `429`
- Body: `{"error":"Too many messages. Please wait before trying again."}`
- Header: `Retry-After` (seconds until next allowed request)

## Storage Behavior

The route supports two modes:

1. Durable mode (recommended): Upstash Redis
2. Fallback mode: in-memory map (single instance only)

### Durable Mode (Serverless-safe)

When these environment variables exist, the limiter uses Redis and works across serverless instances:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

This is the correct production setup.

### In-Memory Fallback

If Redis env vars are missing, the route falls back to an in-memory `Map`.

Important limitation:

- Counts are local to one runtime instance
- Counts reset on cold starts/redeploys
- Not globally consistent across multiple serverless instances

Use this for local development only.

## Notes

- Input validation still runs first.
- Rate limiting runs before calling Resend.
- Current algorithm with Redis: sliding window (`3` requests per `1 h`).
