# Rulebooks

A rulebook defines form behavior policy. In this project, `shouldClearOnEmptyBlur` controls whether blur should clear validation state for a field.

## What `shouldClearOnEmptyBlur` controls

In `useControlValidationHandlers`, when `shouldClearOnEmptyBlur(value)` returns `true`, blur will:

- set touched to `false`
- clear the field error (`null`)
- skip validation message computation for that blur cycle

When it returns `false`, blur will mark the field touched and compute a validation message.

## Why `trim()` is often used

A common policy is:

```ts
shouldClearOnEmptyBlur: (value: string) => value.trim().length === 0
```

This treats whitespace-only input (for example, `"   "`) as empty.

## Alternative policy examples

1. Never clear on blur

```ts
shouldClearOnEmptyBlur: () => false
```

2. Clear only for truly empty strings (not whitespace-only)

```ts
shouldClearOnEmptyBlur: (value: string) => value.length === 0
```

3. Clear for very short accidental input

```ts
shouldClearOnEmptyBlur: (value: string) => value.trim().length <= 1
```

4. Clear for optional semantics like blank or `n/a`

```ts
shouldClearOnEmptyBlur: (value: string) => {
  const trimmed = value.trim().toLowerCase();
  return trimmed === '' || trimmed === 'n/a';
}
```

5. Clear for formatting-only phone input

```ts
shouldClearOnEmptyBlur: (value: string) => /^[\s\-()]*$/.test(value)
```

## Summary

`shouldClearOnEmptyBlur` is a UX policy hook. It is not limited to "empty means clear"; you can encode any blur-clearing rule that matches your form behavior goals.
