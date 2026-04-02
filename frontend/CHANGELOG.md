# Changelog

## 2026-04-02

- Added app-level contact form rate limiting in src/app/api/contact/route.ts: maximum 3 messages per rolling 1-hour window per `<client-ip>:<email-lowercased>` identifier.
- Added HTTP 429 handling with `Retry-After` response header when the contact rate limit is exceeded.
- Integrated Redis-backed serverless-safe limiting via Upstash (`@upstash/ratelimit`, `@upstash/redis`) with automatic in-memory fallback when Upstash environment variables are not configured.
- Added contact API documentation in src/app/api/contact/README.md describing policy, enforcement, storage modes, and production environment variable requirements.

## 2026-03-23

- Added IntersectionObserver-driven reveal behavior in src/components/project/projects/Projects.tsx for project list items, using header-height-aware rootMargin and one-time per-mount animation triggers.
- Added data-attribute animation states in src/components/project/projects/styles/projects.module.css, including staggered reveal timing and a prefers-reduced-motion fallback.

## 2026-03-22

- Extended src/components/elevated/Form/helpers/types.ts with containsHtml and containsScriptTag validation message keys.
- Updated src/components/elevated/Form/rulebooks/idleInvalidRule.ts and src/components/elevated/Form/rulebooks/invalidFocusValidRule.ts to reject values containing HTML-like tags or script tags before native constraint checks.

## 2026-03-15

- Updated `src/components/elevated/Form/controls/uncontrolled/useControlValidationHandlers.ts` to replace pseudo-class-based autofill detection (`:autofill` / `:-webkit-autofill`) with an input-event heuristic.
- Added input-type filtering so normal typing and deletion (`insertText`, `insertCompositionText`, `deleteContentBackward`, `deleteContentForward`) do not trigger early validation in untouched uncontrolled fields.
- Kept blur/invalid validation behavior unchanged while allowing non-typing value injections (for example QuickType-like fills) to enter validation flow when the control is untouched, non-empty, and has autocomplete enabled.

## 2026-03-14

- Updated `src/components/test/customButtons/styles/customButtons.module.css` to use the custom media breakpoint `--bp-up-sm` (min-width: 600px).
- Added responsive spacing behavior for the `.container` layout so `gap` increases to `var(--space-4)` at the `sm` breakpoint and up.
