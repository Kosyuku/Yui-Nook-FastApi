# Project Instructions

## Frontend React Migration

- `frontend -latest` is the only visual source of truth.
- Do not redesign, restyle, "optimize", or reinterpret the UI while migrating.
- Reuse the existing CSS from `frontend -latest` as-is whenever possible.
- Preserve old HTML structure and class names as closely as React allows.
- JSX conversion should be limited to required syntax changes, such as `class` to `className`, `for` to `htmlFor`, inline style objects, and closing void tags.
- First make the React page visually match the old page. Split components only after visual parity is confirmed.
- Prefer boring 1:1 migration over "clean" React architecture if architecture changes risk visual drift.
- If a page looks different after migration, treat that as a bug unless the user explicitly requested the visual change.
