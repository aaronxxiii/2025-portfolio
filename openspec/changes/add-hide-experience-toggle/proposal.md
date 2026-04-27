## Why

The portfolio CMS already lets me hide individual projects via a `hidden` toggle, but Experience entries have no equivalent. When I want to temporarily remove a work-history entry (e.g., an old short contract, or an entry I'm rewriting), I have to delete or comment out content instead of flipping a switch. Matching the Projects pattern with a per-entry `hidden` toggle gives the same non-destructive control for Experiences.

## What Changes

- Add a per-entry `hidden` boolean field to the `experiences` list in `static/admin/config.yml`, mirroring the existing `hidden` toggle on `projects` (default `false`, hint "Toggle to hide this experience from the website").
- Update the rendering path so entries with `hidden: true` are filtered out of every surface that consumes `experiences`:
  - `src/components/core/experiences.tsx` — filter out hidden entries before mapping; extend GraphQL query to fetch `hidden`.
  - `src/components/core/terminal-mode.tsx` — same filter for the `/experiences` terminal command output; extend GraphQL query.
  - `src/pages/main-content.tsx` — no change expected; it already delegates list rendering to `<Experiences />`.
- Existing entries in `src/markdowns/home/index.md` continue to work because the field defaults to `false` / absent.

## Capabilities

### New Capabilities
- `home-page-cms`: Defines the CMS-driven content model and visibility controls for the home page (Decap/Netlify CMS config plus the rendered site's behavior for toggles like `hidden`, `featured`, and `hideStacks`).

### Modified Capabilities
<!-- None — openspec/specs/ is currently empty, so this is the first spec. -->

## Impact

- `static/admin/config.yml` — one new boolean field under the `experiences` list.
- `src/markdowns/home/index.md` — authors may start writing `hidden: true` on entries; no migration needed for existing entries.
- `src/components/core/experiences.tsx`, `src/components/core/terminal-mode.tsx` — GraphQL query and render logic gain a filter step.
- No backend, build, deploy, or styling changes.
