# TODO

## ContactForm theming issue

### Why `classes.control` / `classes.textarea` did not apply as expected

- The base `ContactForm` styles define `color` and `border-color` in `ContactForm.module.css` on `.control, .textarea`.
- Validation-state selectors in the same file are more specific, e.g.:
  - `.control[data-validation='focus']`
  - `.control[data-validation='valid']`
  - `.control[data-validation='invalid']`
- Those state selectors override border styles from test classes whenever focus/valid/invalid state is active.
- `textarea` test class currently sets only `border-color` (not text `color`), so text color never changes there.

### Solution (recommended)

Use CSS variables in the base `ContactForm` styles and override variables in themed wrapper classes.

1. In `ContactForm.module.css`, replace hard-coded values with fallback vars:
   - `border-color: var(--contact-form-control-border, var(--color-border));`
   - `color: var(--contact-form-control-text, var(--color-text));`
   - `background: var(--contact-form-control-bg, var(--color-bg));`
   - Validation outlines:
     - `--contact-form-outline-focus` (default `var(--color-info)`)
     - `--contact-form-outline-valid` (default `var(--color-primary)`)
     - `--contact-form-outline-invalid` (default `var(--color-error)`)

2. In test theme (`testContactForm.module.css`), set those vars at wrapper scope (`.testContactSection` or `.testContactForm`) instead of competing class declarations.

3. Keep using `classes={{ ... }}` for structural slot styling (layout, spacing, container visuals), and use vars for color tokens/state colors.

### Minimal fallback if not refactoring

- Increase selector specificity in test styles to beat base + state selectors, e.g. target `[data-validation]` combinations.
- This is less maintainable than variable-driven theming.
