## Context

The site is a Gatsby + Decap CMS portfolio. `static/admin/config.yml` defines the CMS fields, which are written into `src/markdowns/home/index.md` as frontmatter, then queried via Gatsby's `useStaticQuery` and rendered by React components.

Two existing patterns in `config.yml` are relevant:

- **`projects` has a per-item `hidden` toggle** (`static/admin/config.yml:112-118`) — a `widget: boolean`, `default: false`, with a hint describing the effect.
- **`experiences` has a per-item `hideStacks` toggle** (`static/admin/config.yml:50-56`) but no way to hide the entry itself. Four experience entries currently exist in `src/markdowns/home/index.md`.

Experiences are consumed in two places:

1. `src/components/core/experiences.tsx` — the main rendered list on the home page.
2. `src/components/core/terminal-mode.tsx` — the `/experiences` terminal command (`src/components/core/terminal-mode.tsx:109,243`) and its navigation hint (`:194`).

`src/pages/main-content.tsx` queries `experiences` but only uses it to wrap the section — the actual list rendering is delegated to `<Experiences />`, so no filter is needed there. The same file unconditionally renders the `<section id="experiences">` wrapper; that stays visible even if all entries are hidden (which matches how an empty Projects list would behave).

## Goals / Non-Goals

**Goals:**
- Give the CMS editor a single checkbox per experience entry to hide it from the public site, non-destructively.
- Keep consistency with the existing `projects.hidden` pattern: same field name, same default, same hint wording pattern.
- Apply the filter at every surface where experiences are rendered (main list + terminal mode).

**Non-Goals:**
- No section-level kill switch to hide the whole Experiences section. If the editor wants that, they can mark all entries hidden; the wrapper `<section>` remains (acceptable — matches Projects behavior).
- No UI treatment for hidden entries (no "draft" badge, no admin preview-mode override). Hidden means hidden everywhere the public site renders.
- No content migration. Existing entries have no `hidden` field; GraphQL will return `null`/`undefined`, which is falsy and renders as visible — the desired default.

## Decisions

### Decision 1: Per-entry `hidden` boolean, not a section-level toggle

Mirrors the existing `projects.hidden` field exactly — same name, widget, default, and hint style. Rationale:

- Consistency across the CMS schema reduces editor cognitive load.
- Per-entry control is strictly more expressive than a section toggle (you can achieve "hide all" by checking every entry, but not the reverse).
- Matches the user's phrasing ("a toggle", singular per item).

**Alternative considered:** section-level `experiences.hidden` under an `object` wrapper. Rejected — would require restructuring `experiences` from `list` to `object` (breaking the existing frontmatter layout) and doesn't match any other section's pattern.

### Decision 2: Filter in each consuming component, not in a shared helper

Two consumers (main list, terminal mode) is below the threshold where a shared helper pays off. Each consumer adds `hidden` to its GraphQL query and filters the array before mapping. Rationale:

- No existing shared helper for experiences exists; introducing one just for this would be premature abstraction per the repo conventions.
- Gatsby's `useStaticQuery` is called independently in each component, so the filter has to happen post-query anyway.

**Alternative considered:** a single `useExperiences()` hook that both components consume. Rejected for the same reason — only two call sites, and the queries differ slightly in shape (terminal mode selects fewer fields).

### Decision 3: Field placement in the CMS schema

Place `hidden` as the **first** field in the experiences item schema, above `hideStacks`. Rationale:

- Matches the ordering in `projects` where `hidden` is listed first (`config.yml:112`).
- Editors scanning the form see the visibility toggle before per-entry formatting toggles.

### Decision 4: GraphQL field name maps 1:1

`hidden` in YAML → `hidden` in frontmatter → `hidden` in the Gatsby `markdownRemark` schema. No aliasing. Gatsby's automatic schema inference will pick up the boolean from existing frontmatter entries once any one of them sets it; for safety during rollout, set `hidden: false` on at least one entry during implementation so the schema is stable.

## Risks / Trade-offs

- **[Risk]** Gatsby schema inference may not expose `hidden` on the `experiences` type if no entry has the field set → **Mitigation:** set `hidden: false` explicitly on at least one existing entry in `src/markdowns/home/index.md` during implementation to force the field into the inferred schema. (Optional follow-up: add an explicit `createSchemaCustomization` type definition — out of scope for this change.)
- **[Risk]** A developer adds a new surface that consumes `experiences` later and forgets the filter → **Mitigation:** note in `tasks.md` to grep for `experiences {` in GraphQL queries; consider documenting the pattern in `AGENTS.md`/`CLAUDE.md` only if a third consumer is added.
- **[Trade-off]** The outer `<section id="experiences">` wrapper in `main-content.tsx:62-67` still renders even if every entry is hidden, so the terminal-prompt header (`$ ls ./experiences/`) will appear above an empty list. Accepted — matches how the Projects section behaves today; a section-level kill switch is out of scope.
