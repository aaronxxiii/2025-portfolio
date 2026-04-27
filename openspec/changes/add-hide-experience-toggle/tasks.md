## 1. CMS schema

- [x] 1.1 In `static/admin/config.yml`, add a `hidden` boolean field as the first field under the `experiences` list item schema. Use `widget: "boolean"`, `default: false`, and hint "Toggle to hide this experience from the website" (mirroring the existing `projects.hidden` field at `static/admin/config.yml:112-118`).

## 2. Seed frontmatter for Gatsby schema inference

- [x] 2.1 In `src/markdowns/home/index.md`, add `hidden: false` to at least one existing entry under `experiences:` so Gatsby's automatic schema inference exposes the new field on the `markdownRemark.frontmatter.experiences` GraphQL type. No other entries need to be changed.

## 3. Render-path filtering

- [x] 3.1 In `src/components/core/experiences.tsx`, add `hidden` to the GraphQL selection set (alongside `hideStacks`, `date`, `body`, etc.), then filter the `experiences` array with `.filter((item) => !item?.hidden)` before `.map(...)` renders each card.
- [x] 3.2 In `src/components/core/terminal-mode.tsx`, add `hidden` to the `experiences { ... }` selection in the GraphQL query (around line 109), and filter with `!item?.hidden` before rendering in the `/experiences` case (around line 243). Do not touch the nav-hint list — the command still exists even if every entry is hidden.

## 4. Verify

- [ ] 4.1 Run `npm run develop` (or the project's equivalent dev command). Open the home page and confirm all current experiences still render (regression check).
- [ ] 4.2 In `src/markdowns/home/index.md`, temporarily set `hidden: true` on one entry. Confirm it disappears from both the main Experiences section and the terminal-mode `/experiences` command output. Revert the change.
- [ ] 4.3 Open the local CMS (`/admin/`) and confirm the new "Hidden" toggle appears as the first field of each experience entry, with the hint text visible.
