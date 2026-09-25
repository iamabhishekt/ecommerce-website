# Design Artifact Workflow

> Source: `claude-design.md` — building design artifacts (HTML, slides, mockups) in a project.
> Any model with file-write + browser-preview can run this. The DC (Design Component) format and `dc_write` tool are Claude-specific — map them to your environment's component/file system.

## When to use

The user wants you to produce a design artifact — a landing page, a slide deck, a UI mockup, a React component, a prototype — and you operate in a filesystem-based project.

## Workflow

### 1. Understand user needs
- Ask clarifying questions for new/ambiguous work
- Understand: output format, fidelity (loose/mockup vs production), option count, constraints
- Identify the design systems + UI kits + brands in play

### 2. Explore provided resources
- Read the design system's full definition and relevant linked files
- Copy needed assets from design systems/UI kits — do NOT reference them directly (don't bulk-copy >20 files; make targeted copies)
- Understand the existing visual vocabulary before adding to it

### 3. Make a todo list

### 4. Build folder structure + copy resources + create deliverable

### 5. Finish: verify it loads cleanly, fork a background verifier if available, surface the file to the user

### 6. Summarize EXTREMELY BRIEFLY — caveats and next steps only

## Output creation guidelines

- **Descriptive filenames** — `Landing Page.dc.html`, not `page1.html`
- **Preserve old versions on significant revision** — `My Design.dc.html`, `My Design v2.dc.html`
- **Small targeted changes** — when the user asks for a small change (text, color, one element), change ONLY that. Leave all other layout/spacing/margins/fonts/sizes/positions/colors/content exactly as they are. Don't redesign or "improve" parts you weren't asked to touch.
- **A redesign / new direction / from-scratch request is different** — then make substantial changes
- If you think a broader change would help a small request, **finish what they asked first**, then SUGGEST the rest rather than applying it unprompted

## Don't reference, copy

- Copy needed assets from design systems or UI kits; do not reference them directly
- Don't bulk-copy large resource folders (>20 files) — make targeted copies of only the files you need

## For videos and timed content

Make playback position persistent: store it in localStorage whenever it changes, re-read on load. Never clear or overwrite localStorage entries you did not write this turn.

## When adding to an existing UI

Understand its visual vocabulary first and follow it:
- Copywriting style
- Color palette, tone
- Hover/click states
- Animation styles
- Shadow + card + layout patterns
- Density

## Canonical HTML

- Close every non-void element explicitly
- Double-quote every attribute value
- Don't self-close non-void elements

## Color usage

- Try to use colors from brand / design system, if you have one
- If too restrictive, use `oklch` to define harmonious colors that match the existing palette
- Avoid inventing new colors from scratch

## Emoji usage
Only if the design system uses them.

## Recreate from code, not screenshots

You are better at recreating or editing interfaces based on code rather than screenshots. When given source data, focus on exploring the code and design context, less so on screenshots.

## Small-change discipline (the most-violated rule)

| User says | You do | You don't do |
|---|---|---|
| "change the button text to 'Submit'" | Change ONLY the text | Restyle the button, change spacing, "improve" layout |
| "make the header blue" | Change ONLY the header color | Adjust related colors to "match better" |
| "add a tooltip to the icon" | Add ONLY the tooltip | Redesign the icon, change hover states |
| "redesign the dashboard" | Make substantial changes | (this is the exception — full redesign is what they asked for) |

If you think a broader change would help: finish what they asked, then SUGGEST the rest.
