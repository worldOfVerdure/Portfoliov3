# Changelog

## 2026-03-22

- Extended src/components/elevated/Form/helpers/types.ts with containsHtml and containsScriptTag validation message keys.
- Updated src/components/elevated/Form/rulebooks/idleInvalidRule.ts and src/components/elevated/Form/rulebooks/invalidFocusValidRule.ts to reject values containing HTML-like tags or script tags before native constraint checks.
- Refactored src/components/project/projects/reuseables/projectCard/ProjectCard.tsx to use a single stable markup structure and removed runtime media-query branching that caused back-navigation layout drift.
- Updated src/components/project/projects/reuseables/projectCard/styles/projectCard.module.css so responsive layout and alternating card orientation are handled fully in CSS.
- Hardened src/components/project/header/Header.tsx by adding explicit nav-state resync on scroll, resize, and pageshow to restore sentinel-driven theme/active-link behavior after browser back-forward cache restores.
- Updated src/components/project/header/Header.tsx sentinel guards so empty-sentinel checks run inside bind/resolve paths (instead of effect-level lifecycle bailout), allowing observer/state recovery when sentinel nodes appear later.

## 2026-03-15

- Updated `src/components/elevated/Form/controls/uncontrolled/useControlValidationHandlers.ts` to replace pseudo-class-based autofill detection (`:autofill` / `:-webkit-autofill`) with an input-event heuristic.
- Added input-type filtering so normal typing and deletion (`insertText`, `insertCompositionText`, `deleteContentBackward`, `deleteContentForward`) do not trigger early validation in untouched uncontrolled fields.
- Kept blur/invalid validation behavior unchanged while allowing non-typing value injections (for example QuickType-like fills) to enter validation flow when the control is untouched, non-empty, and has autocomplete enabled.

## 2026-03-14

- Updated `src/components/test/customButtons/styles/customButtons.module.css` to use the custom media breakpoint `--bp-up-sm` (min-width: 600px).
- Added responsive spacing behavior for the `.container` layout so `gap` increases to `var(--space-4)` at the `sm` breakpoint and up.
