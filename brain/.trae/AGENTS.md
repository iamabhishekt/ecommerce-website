# AGENTS.md — Anthropic Prompts Library

> Entry point for any AI agent (Claude Code, TRAE, Cursor, Codex, custom) discovering this library.
> Full index: see [README.md](./README.md) in this same folder.
> Pattern tagging (reusable vs identity): see [PATTERNS.md](./PATTERNS.md).

## What this is

A central library of Anthropic/Claude system prompts, skills, and reference material.
This folder is the **single source of truth** — tools symlink into it, never copy.

**Two kinds of content:**
- **WORKFLOWS** (`workflows/`) — model-agnostic process recipes. Any capable model (GPT, Gemini, Llama, Mistral) can follow them. Start here if you're building a non-Claude agent.
- **IDENTITY** (root `claude-*.md`, `Official/`, `old/`, `raw/`) — Claude-specific system prompts. Use for reference/inspiration, not for other models.

## Quick start by intent

### "I want a reusable process for any model/agent"
→ Start in [workflows/](./workflows/) — model-agnostic recipes extracted from Claude prompts:
- [deep-research-workflow.md](./workflows/deep-research-workflow.md) — cited, verified research report
- [code-review-workflow.md](./workflows/code-review-workflow.md) — ranked code findings from a diff
- [dataviz-workflow.md](./workflows/dataviz-workflow.md) — designed-system data viz
- [visual-creation-workflow.md](./workflows/visual-creation-workflow.md) — SVG diagrams, HTML widgets, charts, art
- [design-artifact-workflow.md](./workflows/design-artifact-workflow.md) — design artifacts (HTML, slides, mockups)
- [research-clarifying-questions.md](./workflows/research-clarifying-questions.md) — when + how to ask clarifying questions
- [skill-generation-workflow.md](./workflows/skill-generation-workflow.md) — generate run/drive skills

### "I want to review code"
→ Workflow (any model): [workflows/code-review-workflow.md](./workflows/code-review-workflow.md)
→ Skill (Claude Code/TRAE): `code-review` (auto-discovered)
→ Reference: [Claude Code/bundled-skills/code-review/](./Claude%20Code/bundled-skills/code-review/)
→ Levels: `low.md` → `medium.md` → `high.md` → `xhigh.md` → `max.md`

### "I want to do deep research"
→ Workflow (any model): [workflows/deep-research-workflow.md](./workflows/deep-research-workflow.md)
→ Skill (Claude Code/TRAE): `deep-research` (auto-discovered)
→ Reference: [Claude Code/bundled-skills/deep-research/](./Claude%20Code/bundled-skills/deep-research/)

### "I want to make data visualizations"
→ Workflow (any model): [workflows/dataviz-workflow.md](./workflows/dataviz-workflow.md)
→ Skill (Claude Code/TRAE): `dataviz` (auto-discovered)
→ Reference: [Claude Code/bundled-skills/dataviz/](./Claude%20Code/bundled-skills/dataviz/)

### "I want to create visuals (diagrams, mockups, charts, art)"
→ Workflow (any model): [workflows/visual-creation-workflow.md](./workflows/visual-creation-workflow.md)
→ Reference: [visualize.md](./visualize.md)

### "I want to build a design artifact (HTML, slides, mockups)"
→ Workflow (any model): [workflows/design-artifact-workflow.md](./workflows/design-artifact-workflow.md)
→ Reference: [claude-design.md](./claude-design.md), [default-styles.md](./default-styles.md)

### "I want to understand how a Claude model thinks" (Claude-only reference)
→ Browse [Official/](./Official/) for dated release-notes system prompts
→ Browse root `claude-*.md` files for current model prompts (see table below)
→ Browse [raw/](./raw/) for unedited raw system prompts
→ Browse [old/](./old/) for legacy prompts (3.7, 4.1, 4.5)

### "I want Claude's research mode behavior" (Claude-only reference)
→ [research_instructions.md](./research_instructions.md)
→ Reusable version: [workflows/research-clarifying-questions.md](./workflows/research-clarifying-questions.md)

### "I want Anthropic's safety/reminders system" (Claude-only reference)
→ [anthropic_reminders.md](./anthropic_reminders.md)
→ [sonnet-4.6-reminders.md](./sonnet-4.6-reminders.md)

### "I want a specific product integration prompt" (Claude-product-specific reference)
→ [claude-for-excel.md](./claude-for-excel.md)
→ [claude-for-word.md](./claude-for-word.md)
→ [claude-in-chrome.md](./claude-in-chrome.md)
→ [claude-in-powerpoint.md](./claude-in-powerpoint.md)
→ [claude-mobile-ios.md](./claude-mobile-ios.md)
→ [claude-desktop-code.md](./claude-desktop-code.md)
→ [claude-cowork.md](./claude-cowork.md)
→ [claude-cowork-dispatch.md](./claude-cowork-dispatch.md)
→ [claude-fable-5.md](./claude-fable-5.md)

### "I want Claude Code tool docs / slash commands" (Claude Code-specific reference)
→ [Claude Code/bundled-skills/](./Claude%20Code/bundled-skills/) — `glob-tool.md`, `grep-tool.md`, `init.md`, `compact.md`, `debug.md`, `verify.md`, `run.md`, `loop.md`, `schedule.md`, `batch.md`, `simplify.md`, `security-review.md`, `deferred-tools.md`, `claude-api.md`, `artifact-design.md`, `fewer-permission-prompts.md`, `update-config.md`, `keybindings-help.md`

### "I want Claude Code's model-specific configs" (Claude Code-specific reference)
→ [Claude Code/claude-code-opus-4.8.md](./Claude%20Code/claude-code-opus-4.8.md)
→ [Claude Code/claude-code-opus-4.6.md](./Claude%20Code/claude-code-opus-4.6.md)
→ [Claude Code/claude-code-docs-assistant.md](./Claude%20Code/claude-code-docs-assistant.md)
→ [Claude Code/claude-code-2.1.172-fable-5.md](./Claude%20Code/claude-code-2.1.172-fable-5.md)
→ [Claude Code/claude-code-2.1.172-opus-4.6.md](./Claude%20Code/claude-code-2.1.172-opus-4.6.md)
→ [Claude Code/claude-code-2.1.172-opus-4.8.md](./Claude%20Code/claude-code-2.1.172-opus-4.8.md)

## Where skills are symlinked

| Tool | Path |
|---|---|
| Claude Code | `~/.claude/skills/<skill-name>/` → `./Claude Code/bundled-skills/<skill-name>/` |
| TRAE | `~/.trae/builtin/global/skills/<skill-name>/` → `./Claude Code/bundled-skills/<skill-name>/` |
| Reference browse | `~/.claude/anthropic-prompts/` and `~/.trae/anthropic-prompts/` → this folder |

## Model prompt reference (IDENTITY — Claude-only)

Current model system prompts at the root:

| Model | File |
|---|---|
| Opus 4.8 | `claude-opus-4.8.md` |
| Opus 4.7 | `claude-opus-4.7.md` |
| Opus 4.6 (tools) | `claude-opus-4.6.md` |
| Opus 4.6 (no tools) | `claude-opus-4.6-no-tools.md` |
| Sonnet 5 | `claude-sonnet-5.md` |
| Sonnet 4.6 (tools) | `claude-sonnet-4.6.md` |
| Sonnet 4.6 (no tools) | `claude-sonnet-4.6-no-tools.md` |
| Fable 5 | `claude-fable-5.md` |

Historical prompts: [Official/](./Official/) (dated, 2024–2026), [old/](./old/) (legacy 3.7–4.5), [raw/](./raw/) (unedited raw).

## Pattern tagging

See [PATTERNS.md](./PATTERNS.md) for the full index tagging every file as:
- **WORKFLOW (reusable)** — process/recipe any model can follow
- **IDENTITY (Claude-only)** — Claude's personality, values, safety tuning, specific tool schemas

## Notes for agent maintainers

- **Never copy** files out of this folder into tool-specific dirs. Always symlink.
- **Editing a skill** → edit it here, the symlink propagates to all tools.
- **Adding a new skill** → create under `Claude Code/bundled-skills/<name>/SKILL.md`, then symlink into `~/.claude/skills/` and `~/.trae/builtin/global/skills/`.
- **Adding a new model prompt** → drop the `.md` at the root, add to README.md index, tag in PATTERNS.md.
- **Adding a new reusable workflow** → extract it into `workflows/<name>-workflow.md`, strip Claude-specific tool names, add a "Tools needed" section.
