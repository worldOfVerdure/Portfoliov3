# Stack Component

`Stack` is a lightweight polymorphic layout primitive for one-dimensional spacing and alignment.

## Purpose

Use `Stack` to replace repeated flex container classes for common layouts (column/row, gap, alignment, wrapping).

## Allowed elements

`Stack` supports these semantic root elements through `as`:

- `div` (default)
- `section`
- `ul`
- `ol`
- `nav`
- `article`
- `form`

## Layout props

1. **`direction`**
   - Maps to `flex-direction`.

2. **`gap`**
   - Maps to `gap`.

3. **`align`**
   - Maps to `align-items`.

4. **`justify`**
   - Maps to `justify-content`.

5. **`wrap`**
   - Maps to `flex-wrap`.

6. **`inline`**
   - When `true`, uses `inline-flex` instead of `flex`.

7. **`vars`**
   - CSS custom property overrides:
   - `--stack-direction`, `--stack-gap`, `--stack-align`, `--stack-justify`, `--stack-wrap`.

8. **`className` / `style`**
   - Standard escape hatches for additional styling.

## Merge behavior

- Base styles come from `Stack.module.css` (`stack`, `inline`).
- `direction`/`gap`/`align`/`justify`/`wrap` are written as CSS vars on the root element.
- In `mergedStyle`, `vars` is spread after `style`, so conflicting keys in `vars` win.

## Examples

```tsx
<Stack gap="var(--space-3)">
  <p>One</p>
  <p>Two</p>
</Stack>
```

```tsx
<Stack as="section" direction="row" gap="var(--space-4)" align="center" wrap="wrap">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
</Stack>
```

```tsx
<Stack as="ul" gap="var(--space-2)">
  <li>First</li>
  <li>Second</li>
</Stack>
```

## Responsive example (column below `md`, row above)

Use a local class for breakpoint-driven direction changes:

```css
.responsiveActions {
   --stack-direction: column;

   @media (--bp-up-md) {
      --stack-direction: row;
   }
}
```

```tsx
<Stack className={styles.responsiveActions} gap="var(--space-3)">
   <Button>Primary</Button>
   <Button variant="secondary">Secondary</Button>
</Stack>
```
