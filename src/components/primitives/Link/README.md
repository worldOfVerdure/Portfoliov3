# Link Component

`Link` is a styled navigation primitive built on `next/link`, with optional button-like appearances.

## Styling options

The component supports these styling methods:

1. **`variant`**
   - Built-in visual variants: `text`, `buttonPrimary`, `buttonSecondary`, `buttonGhost`.

2. **`size`**
   - Built-in sizes: `none`, `sm`, `md`, `lg`, `compact-lg`.
   - Default: `none` (applies no size class).

3. **`className`**
   - Extra class(es) applied to the root anchor.
   - Can include utility classes.

4. **`classes.root`**
   - Slot-based class for the root anchor.

5. **`classes.label`**
   - Slot-based class for the inner label `<span>`.

6. **`vars`**
   - CSS custom property overrides for link tokens:
   - `--link-bg`, `--link-color`, `--link-border`, `--link-radius`, `--link-px`, `--link-py`, `--link-font-size`, `--link-decoration`, `--link-hover-decoration`.

7. **`style`**
   - Standard inline style object applied to the root anchor.

8. **`unstyled`**
   - When `true`, skips default module classes so styles can be fully controlled externally.

## Priority / merge behavior

- Base styles come from `Link.module.css` (`link`, `variant`, optional `size`).
- Inline styles from `style`/`vars` are merged into `mergedStyle` and applied to the root anchor.
- In `mergedStyle`, `vars` is spread after `style`, so on key conflicts `vars` wins.

## Example

```tsx
<Link
  href="/contact"
  variant="buttonSecondary"
   size="none"
  className="myLink"
  classes={{ root: 'myLinkRoot', label: 'myLinkLabel' }}
  vars={{ '--link-border': 'var(--color-primary)', '--link-color': 'var(--color-primary)' }}
  style={{ opacity: 0.95 }}
>
  Contact us
</Link>
```

## Label slot example

The `classes.label` slot is useful when the root link should keep its spacing/border tokens,
but the inner content needs its own layout (for example text + icon alignment).

```css
/* Hero.module.css */
.ctaLink {
   width: fit-content;
}

.ctaLabel {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2);
}
```

```tsx
import { ChevronRightIcon } from '@radix-ui/react-icons';

<Link
   href="#projects"
   variant="buttonPrimary"
   size="lg"
   classes={{ root: styles.ctaLink, label: styles.ctaLabel }}
>
   View Work
   <ChevronRightIcon width={16} height={16} />
</Link>
```

This keeps root-level visuals on the anchor while letting the label handle icon/text composition.
