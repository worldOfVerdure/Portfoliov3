# Small Business Next Template

A lean `Next.js + React + TypeScript + CSS Modules` starter for building small business websites with strong first-load performance.

## Stack

- Next.js (App Router)
- React 19
- TypeScript (strict)
- CSS Modules + global design tokens

## Performance Defaults

- Minimal dependency baseline
- Tokenized styling via CSS variables
- Fluid typography using `clamp()`
- No UI framework dependency in core
- Compression and stripped `X-Powered-By` header in `next.config.ts`

## Run

```bash
npm install
npm run dev
```

Create a `.env.local` file in this directory for the contact route:

```env
RESEND_API_KEY=         # From your Resend dashboard
CONTACT_EMAIL=          # The address that receives form submissions
```

## Build

```bash
npm run build
npm run start
```

## Contact API

The contact form submits to the App Router route handler at `/api/contact`.

- It runs server-side in Next.js, which Netlify deploys as a serverless function.
- `RESEND_API_KEY` and `CONTACT_EMAIL` must be set in Netlify site environment variables for production.
- `NEXT_PUBLIC_API_BASE_URL` is no longer required.

## Styling System

## Form Rulebook Docs

- `src/components/test/testForm/rulebooks/README.md`
- `src/components/test/anotherTestForm/rulebooks/README.md`

### Global Tokens

`src/app/globals.css` contains primitives and semantic typography tokens:

- Color, spacing, radius, container width
- Type scale (`--font-size-*`) with fluid values
- Semantic text roles (`--text-body`, `--text-heading`, etc.)

### Breakpoint Utilities

`src/lib/breakpoints.ts` exports shared breakpoint constants and a media-query helper for JS logic.

### Component Override Pattern

`Button` demonstrates the reusable styling contract:

- `className` for root-level overrides
- `classes` for slot-level overrides
- `vars` for CSS variable overrides
- `variant` and `size` for common style changes
- `unstyled` for full style ownership

Example:

```tsx
<Button
  variant="ghost"
  className="myButton"
  classes={{ label: "myButtonLabel" }}
  vars={{ "--btn-border": "var(--color-primary)", "--btn-color": "var(--color-primary)" }}
>
  Custom Button
</Button>
```

## Suggested Package Strategy

Keep this repo as `template-core`, then create optional packages for headless integrations (Radix wrappers) to avoid shipping unnecessary dependencies in every client site.
