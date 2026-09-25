# PATTERNS — Reusable vs Identity Content

> Use this index to know what you can lift from this library into a non-Claude model/agent, and what is Claude-specific (won't help other models).

Two categories:

- **WORKFLOW (reusable)** — process, recipe, structure, decision logic. Any capable model can follow it. Strip the Claude-specific tool names and it works for GPT, Gemini, Llama, Mistral, etc.
- **IDENTITY (Claude-only)** — Claude's personality, values, safety tuning, specific tool schemas, or behavior baked into the model weights. Pasting these into another model does nothing (or worse — confuses it).

---

## ✅ WORKFLOW — Reusable (see `workflows/` for extracted versions)

| Source file | Workflow extracted | What it produces | Reusable because |
|---|---|---|---|
| `Claude Code/bundled-skills/deep-research/SKILL.md` | [deep-research-workflow.md](./workflows/deep-research-workflow.md) | Cited, verified research report | Process: decompose → fan-out → fetch → adversarially verify → synthesize. Any model with search + fetch can run it. |
| `Claude Code/bundled-skills/code-review/high.md` (+low/medium/xhigh/max) | [code-review-workflow.md](./workflows/code-review-workflow.md) | Ranked code findings from a diff | Process: gather diff → 8 finder angles → verify → output JSON. Any model with git + grep + file-read. |
| `Claude Code/bundled-skills/dataviz/SKILL.md` (+references/) | [dataviz-workflow.md](./workflows/dataviz-workflow.md) | Designed-system data viz | 7-step procedure: form → color → validate → marks → interaction → a11y → render. Design-system-agnostic by design. |
| `visualize.md` | [visual-creation-workflow.md](./workflows/visual-creation-workflow.md) | SVG diagrams, HTML widgets, charts, art | Design rules + diagram-type routing + complexity budget. Token names are Claude-specific but the method transfers. |
| `claude-design.md` | [design-artifact-workflow.md](./workflows/design-artifact-workflow.md) | Design artifacts (HTML, slides, mockups) | Build process + small-change discipline. The DC format is Claude-specific; the workflow isn't. |
| `research_instructions.md` | [research-clarifying-questions.md](./workflows/research-clarifying-questions.md) | When + how to ask clarifying questions | Decision logic: when to ask, max 3, numbered, few-words answerable, never twice. Pure logic. |
| `Claude Code/bundled-skills/run-skill-generator/SKILL.md` | [skill-generation-workflow.md](./workflows/skill-generation-workflow.md) | Run/drive skill for any project | Definition-of-done + process + project-type patterns. The `.claude/skills/` path is Claude-specific; the method isn't. |
| `Claude Code/bundled-skills/code-review/README.md` | (reference — no workflow extracted) | Catalog of code-review effort levels | The level definitions (low → max) are reusable. The `ReportFindings` tool is Claude-specific. |
| `Claude Code/bundled-skills/dataviz/references/*.md` | (reference — used by dataviz workflow) | Form heuristic, color formula, marks, interaction, anti-patterns, palette | The references are model-agnostic reference material — any model can read and apply them. |
| `Claude Code/bundled-skills/run-skill-generator/examples/*.md` | (reference) | Project-type driver examples (cli, electron, library, playwright, server, tui) | Reusable patterns for any agent building a driver. |

### Reusable slash commands / tool docs (in `Claude Code/bundled-skills/`)

These describe *processes* a non-Claude agent can adopt. They reference Claude-specific tools but the underlying workflows transfer:

| File | Reusable process |
|---|---|
| `compact.md` | When + how to compact context mid-session |
| `debug.md` | Debugging workflow |
| `verify.md` | Verification loop before completing a task |
| `loop.md` | Iterative loop pattern |
| `run.md` | How to run/drive a project |
| `schedule.md` | Scheduling tasks |
| `batch.md` | Batching operations |
| `simplify.md` | Code simplification workflow |
| `init.md` / `init-new.md` | Project initialization |
| `artifact-design.md` | Designing artifacts |
| `fewer-permission-prompts.md` | Reducing permission friction |
| `update-config.md` | Config update process |
| `keybindings-help.md` | Keybinding reference |
| `glob-tool.md` / `grep-tool.md` | Tool reference (capability docs, not workflows) |
| `deferred-tools.md` | Deferred tool loading pattern |
| `claude-api.md` | Claude API usage (Claude-specific API) |
| `loop.md` | Loop pattern |

---

## ❌ IDENTITY — Claude-specific (not extracted as workflows)

These describe Claude's identity, personality, values, or reference Claude-specific tools/safety systems. Pasting them into GPT-4 or Gemini does **not** make those models behave like Claude. Use them as reference for understanding Claude, or as inspiration when designing your own agent's identity — but don't expect cross-model portability.

### Model system prompts (identity + Claude-specific behavior)

| File | Why identity |
|---|---|
| `claude-opus-4.8.md` | Claude Opus 4.8 system prompt — defines Claude's personality, values, tool-use behavior |
| `claude-opus-4.7.md` | Same, Opus 4.7 |
| `claude-opus-4.6.md` | Same, Opus 4.6 (with tools) |
| `claude-opus-4.6-no-tools.md` | Same, Opus 4.6 (no tools) |
| `claude-sonnet-5.md` | Claude Sonnet 5 system prompt |
| `claude-sonnet-4.6.md` | Claude Sonnet 4.6 (with tools) |
| `claude-sonnet-4.6-no-tools.md` | Claude Sonnet 4.6 (no tools) |
| `claude-fable-5.md` | Claude Fable 5 prompt |
| `Official/*.md` (dated) | Historical Claude model system prompts — useful for understanding how Claude's behavior evolved, not for other models |
| `old/*.md` | Legacy Claude prompts (3.7, 4.1, 4.5) — same caveat |
| `raw/*.md` | Raw unedited Claude prompts — same caveat |
| `Claude Code/claude-code-*.md` | Claude Code (the IDE) model-specific configs — Claude Code-specific |

### Safety / reminders system (Claude-specific tuning)

| File | Why identity |
|---|---|
| `anthropic_reminders.md` | Anthropic's reminder/warning system (`image_reminder`, `cyber_warning`, `ip_reminder`, etc.) — sent to Claude by Anthropic. Other models have their own safety tuning. |
| `sonnet-4.6-reminders.md` | Sonnet 4.6 specific reminders |

### Product-specific integration prompts (Claude-product-specific)

| File | Why identity |
|---|---|
| `claude-cowork.md` | Claude cowork agent — Claude-product-specific |
| `claude-cowork-dispatch.md` | Claude cowork dispatch — Claude-product-specific |
| `claude-desktop-code.md` | Claude Desktop code mode — Claude-product-specific |
| `claude-mobile-ios.md` | Claude mobile iOS — Claude-product-specific |
| `claude-for-excel.md` | Claude for Excel integration — product-specific |
| `claude-for-word.md` | Claude for Word — product-specific |
| `claude-in-chrome.md` | Claude in Chrome — product-specific |
| `claude-in-powerpoint.md` | Claude in PowerPoint — product-specific |

### Claude-specific tool schemas (in prompts)

These appear *inside* prompts and reference tools that only exist in Claude's environment:
- `web_search`, `launch_extended_search_task` (Claude.ai research mode)
- `ReportFindings` tool (Claude Code code-review)
- `dc_write`, `dc_html_str_replace`, `dc_js_str_replace` (Claude design mode)
- `sendPrompt`, `imagine_svg`, `imagine_html` (Claude visualize mode)

Other models have their own tool systems. The *workflows* above replace these with capability requirements ("web search + URL fetch") that map to any model's tools.

---

## How to use this index

### "I want to give my GPT/Gemini/Llama agent a useful process"
→ Pick a WORKFLOW file from `workflows/`, paste it into the agent's system prompt or have it read the file. Map the "Tools needed" section to your agent's actual tools.

### "I want to understand how Claude behaves"
→ Read an IDENTITY file. Useful for: building Claude-compatible agents, understanding Claude's safety design, comparing model behaviors, researching prompt engineering patterns.

### "I want to build a custom agent with Claude-like qualities"
→ Read IDENTITY files for inspiration on identity/safety design, then read WORKFLOW files for the actual processes your agent should follow. Don't copy Claude's identity verbatim — design your own.

### "I want to compare how Claude's prompts evolved over time"
→ Read `Official/*.md` dated files in sequence. Each shows what Anthropic changed in that model version's release.
