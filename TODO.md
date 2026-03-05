## New Addition (Rulebook + Control Model)

- Keep one shared visual state model for form feedback: `focus`, `valid`, `invalid` (same 3-color cycle across forms).
- Support both uncontrolled and controlled control variants.
- Rulebook must drive **when** states transition based on control model (not whether states exist).
	- Uncontrolled: default to blur/invalid lifecycle.
	- Controlled: allow live revalidation timing (e.g., validate on change after first error or submit).
- Goal: either control model can be used while preserving consistent state vocabulary and theming hooks.
