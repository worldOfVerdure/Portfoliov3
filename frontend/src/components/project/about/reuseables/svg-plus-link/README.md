# SvgPlusLink: Text-Only Underline

## Goal
Keep the icon and text on one line, but animate the underline under the text only (not under the icon).

## Why This Was Needed
The shared `Link` primitive applies its underline animation to the internal label wrapper. Since both the icon and text live inside that wrapper, the underline spans the full wrapper width by default.

## What Changed
1. Targeted the inner label wrapper through the `classes` prop on `Link`.
2. Disabled the wrapper underline for this component only.
3. Added a dedicated `span` for the text and moved the animated underline to that span.

## Implementation Details
### In `SvgPlusLink.tsx`
- Passed the label slot class:
	- `classes={{ label: styles.linkLabel }}`
- Added a text-specific class:
	- `<span className={styles.linkText}>{linkText}</span>`

### In `svgPlusLink.module.css`
- Kept label layout horizontal:
	- `.linkLabel { display: inline-flex; align-items: center; gap: var(--space-2); }`
- Disabled inherited wrapper underline:
	- `.linkLabel::after { display: none; }`
- Added text-only underline animation:
	- `.linkText` and `.linkText::after`
	- hover/focus selectors now animate `.linkText::after`

## Involved Files
- `src/components/project/about/reuseables/svg-plus-link/SvgPlusLink.tsx`
- `src/components/project/about/reuseables/svg-plus-link/styles/svgPlusLink.module.css`
- `src/components/primitives/link/Link.tsx`
- `src/components/primitives/link/Link.module.css`

## Result
The icon remains un-underlined, while the link text animates underline on hover and focus-visible.
