# Portfolio

This repository is my personal portfolio application, built to show how I design, architect, and
ship production-grade fullstack experiences.

It is intentionally engineered as a real-world product, not a one-page demo. The codebase emphasizes
maintainability, accessibility, performance, and clear component boundaries.

## What This Project Demonstrates

- End-to-end product thinking: from UX structure to deployment concerns.
- Modern React architecture with App Router patterns in Next.js.
- Type-safe component development in strict TypeScript.
- Scalable styling using CSS Modules and global design tokens.
- Server-side form handling and email delivery through a secure API route.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (strict mode)
- CSS Modules + global CSS variables
- Resend API for contact form email delivery

## Core Areas

### UI and Component System

- Reusable primitives (Button, Link, Stack) with predictable override patterns.
- Project sections split into focused feature components (Hero, About, Projects, Contact, Footer).
- Composition-first approach that favors small, testable pieces over large monolithic components.

### Styling and Responsiveness

- Design tokens in global styles for spacing, typography, and color consistency.
- Fluid typography and responsive layout behavior.
- Shared breakpoint helpers for consistent responsive logic.

### Contact Flow

- Contact form posts to an App Router endpoint at /api/contact.
- Validation and server-side processing happen in the backend route.
- Email delivery is powered by Resend, with secrets stored in environment variables.

## Performance and Quality Priorities

- Lightweight dependency strategy.
- Strict TypeScript for safer refactors.
- App-level configuration focused on production readiness (compression and reduced header surface).
- Component structure designed for long-term maintainability.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create .env.local in this folder:

```env
RESEND_API_KEY=
CONTACT_EMAIL=
```

3. Start development server:

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Why Employers Might Care

This portfolio is evidence of how I approach software beyond visuals:

- I optimize for clarity and long-term maintainability.
- I make deliberate tradeoffs between speed, DX, and runtime performance.
- I treat accessibility, responsiveness, and code quality as core requirements.
- I structure frontend code in a way that scales with product growth.

## Project Structure

- src/app: Next.js routes and global styles.
- src/components/primitives: Foundational reusable UI components.
- src/components/project: Portfolio feature sections.
- src/components/elevated/Form: Structured form system and validation rulebooks.
- src/lib: Shared utility and responsive helpers.

## Contact

If you are reviewing this repository as part of a hiring process, thank you for your time.
I am always open to discussing implementation details, architecture decisions, and tradeoffs made in
this project.
