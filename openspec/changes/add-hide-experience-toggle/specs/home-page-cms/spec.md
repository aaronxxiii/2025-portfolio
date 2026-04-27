## ADDED Requirements

### Requirement: Experience entries SHALL support a per-entry `hidden` toggle in the CMS

The Decap CMS configuration in `static/admin/config.yml` SHALL expose a boolean field named `hidden` on each item of the `experiences` list. The field MUST use `widget: boolean`, default to `false`, and display a hint describing that the toggle removes the entry from the public website. The field SHALL be ordered as the first field of the experiences item so that editors see it before per-entry formatting toggles.

#### Scenario: CMS editor sees the hidden toggle

- **WHEN** an editor opens the Home page in the CMS and expands an experiences entry
- **THEN** the first visible field for that entry is a boolean toggle labeled "Hidden"
- **AND** the toggle is off by default
- **AND** a hint under the toggle states that it hides the entry from the website

#### Scenario: Existing experience entries remain valid

- **WHEN** the CMS loads an experiences entry that does not have a `hidden` key in frontmatter
- **THEN** the toggle renders as off
- **AND** saving the entry without changes does not add a `hidden` key unless the editor flips the toggle

### Requirement: The rendered site SHALL omit experiences marked hidden

Every component that renders the `experiences` collection SHALL filter out entries where `hidden === true` before displaying them. This applies to the main experiences section on the home page and to the terminal-mode `/experiences` command output.

#### Scenario: Hidden entry removed from the main Experiences section

- **WHEN** an experience entry has `hidden: true` in frontmatter
- **AND** a visitor views the home page
- **THEN** the entry does not appear in the `<section id="experiences">` list
- **AND** no placeholder, blank card, or spacing artifact is rendered for the hidden entry

#### Scenario: Hidden entry removed from terminal-mode output

- **WHEN** an experience entry has `hidden: true` in frontmatter
- **AND** a visitor runs the `/experiences` command in terminal mode
- **THEN** the entry is not listed in the command output

#### Scenario: Non-hidden entries unaffected

- **WHEN** an experience entry has `hidden: false` or no `hidden` field
- **THEN** the entry renders normally in both the main section and the terminal-mode output
