# Anthropic Prompts Library

A central, model-agnostic library of Anthropic/Claude prompts, system messages, and skills.
This folder is the **single source of truth** — all tools (Claude Code, TRAE, Cursor, any agent)
reference it via symlinks. Edit here, everything updates.

**Two kinds of content:**
- **Workflows** (`workflows/`) — model-agnostic process recipes. Any capable model (GPT, Gemini, Llama, Mistral) can follow these. Stripped of Claude-specific identity/tool names.
- **Identity** (root `claude-*.md`, `Official/`, `old/`, `raw/`) — Claude-specific system prompts. Use for reference, not for other models.

See [PATTERNS.md](./PATTERNS.md) for the full index tagging every file as reusable vs identity.

## Library structure

```
~/Prompts/Anthropic/
├── README.md                  ← you are here (master index)
├── AGENTS.md                  ← agent-facing discovery guide
├── PATTERNS.md                ← reusable vs identity tagging index
├── workflows/                 ← MODEL-AGNOSTIC workflows (any model can follow)
│   ├── README.md
│   ├── deep-research-workflow.md
│   ├── code-review-workflow.md
│   ├── dataviz-workflow.md
│   ├── visual-creation-workflow.md
│   ├── design-artifact-workflow.md
│   ├── research-clarifying-questions.md
│   └── skill-generation-workflow.md
├── *.md                        ← Claude-specific system prompts (IDENTITY — see below)
├── Claude Code/               ← Claude Code skills + tool docs + model configs
│   ├── bundled-skills/        ← 4 auto-discoverable skills (SKILL.md format)
│   │   ├── code-review/
│   │   ├── dataviz/
│   │   ├── deep-research/
│   │   └── run-skill-generator/
│   ├── *.md                   ← Claude Code slash commands & tool docs
│   └── claude-code-*.md       ← model-specific Claude Code system prompts
├── Official/                  ← official Claude model release notes / system prompts
│   ├── README.md              ← archive source link
│   ├── all.md                 ← combined archive
│   └── YYYY-MM-DD-claude-*.md ← dated model system prompts (Haiku/Opus/Sonnet)
├── old/                       ← legacy Claude system prompts (3.7, 4.1, 4.5)
└── raw/                       ← raw unedited system prompts (opus/sonnet 4.6, ±tools)
```

## Model-agnostic workflows (`workflows/`)

Process recipes extracted from the Claude-specific prompts. **Any capable model can follow these** — they describe *what to do and in what order*, not "be Claude." Each has a "Tools needed" section you map to your agent's actual capabilities.

| Workflow | Produces | Source |
|---|---|---|
| [deep-research-workflow.md](./workflows/deep-research-workflow.md) | Cited, verified research report | `deep-research/SKILL.md` |
| [code-review-workflow.md](./workflows/code-review-workflow.md) | Ranked code findings from a diff | `code-review/high.md` |
| [dataviz-workflow.md](./workflows/dataviz-workflow.md) | Designed-system data viz | `dataviz/SKILL.md` |
| [visual-creation-workflow.md](./workflows/visual-creation-workflow.md) | SVG diagrams, HTML widgets, charts, art | `visualize.md` |
| [design-artifact-workflow.md](./workflows/design-artifact-workflow.md) | Design artifacts (HTML, slides, mockups) | `claude-design.md` |
| [research-clarifying-questions.md](./workflows/research-clarifying-questions.md) | When + how to ask clarifying questions | `research_instructions.md` |
| [skill-generation-workflow.md](./workflows/skill-generation-workflow.md) | Run/drive skill for any project | `run-skill-generator/SKILL.md` |

See [workflows/README.md](./workflows/README.md) for how to use these with any model.

## Standalone system prompts (root) — IDENTITY (Claude-specific)

| File | Purpose |
|---|---|
| `anthropic_reminders.md` | Anthropic's reminder/warning system (image_reminder, cyber_warning, ip_reminder, etc.) |
| `claude-cowork.md` | Claude cowork agent prompt |
| `claude-cowork-dispatch.md` | Claude cowork dispatch prompt |
| `claude-design.md` | Designer agent — produces HTML design artifacts |
| `claude-desktop-code.md` | Claude Desktop code mode prompt |
| `claude-fable-5.md` | Claude Fable 5 prompt |
| `claude-for-excel.md` | Claude for Excel integration |
| `claude-for-word.md` | Claude for Word integration |
| `claude-in-chrome.md` | Claude in Chrome integration |
| `claude-in-powerpoint.md` | Claude in PowerPoint integration |
| `claude-mobile-ios.md` | Claude mobile iOS prompt |
| `claude-opus-4.6.md` | Claude Opus 4.6 system prompt (with tools) |
| `claude-opus-4.6-no-tools.md` | Claude Opus 4.6 (no tools) |
| `claude-opus-4.7.md` | Claude Opus 4.7 system prompt |
| `claude-opus-4.8.md` | Claude Opus 4.8 system prompt |
| `claude-sonnet-4.6.md` | Claude Sonnet 4.6 system prompt (with tools) |
| `claude-sonnet-4.6-no-tools.md` | Claude Sonnet 4.6 (no tools) |
| `claude-sonnet-5.md` | Claude Sonnet 5 system prompt |
| `default-styles.md` | Default styles reference |
| `research_instructions.md` | Advanced research mode instructions |
| `sonnet-4.6-reminders.md` | Sonnet 4.6 specific reminders |
| `visualize.md` | Visual creation suite (diagrams, mockups, charts, art) |

## Claude Code folder

### Bundled skills (auto-discoverable — symlinked into tool skill dirs)

| Skill | Description |
|---|---|
| `bundled-skills/code-review/` | Multi-level code review (low → xhigh) with findings tool |
| `bundled-skills/dataviz/` | Data visualization design (marks, palettes, anti-patterns) |
| `bundled-skills/deep-research/` | Fan-out web research, verify claims, cited reports |
| `bundled-skills/run-skill-generator/` | Generate per-project run/drive skills |

### Tool docs & slash commands

`artifact-design.md`, `batch.md`, `claude-api.md`, `code-review.md`, `compact.md`,
`debug.md`, `deferred-tools.md`, `fewer-permission-prompts.md`, `glob-tool.md`,
`grep-tool.md`, `init.md`, `init-new.md`, `keybindings-help.md`, `loop.md`,
`review.md`, `run.md`, `schedule.md`, `security-review.md`, `simplify.md`,
`update-config.md`, `verify.md`

### Model-specific Claude Code prompts

`claude-code-2.1.172-fable-5.md`, `claude-code-2.1.172-opus-4.6.md`,
`claude-code-2.1.172-opus-4.8.md`, `claude-code-docs-assistant.md`,
`claude-code-opus-4.6.md`, `claude-code-opus-4.8.md`

## Official folder

Archived official Claude model system prompts from
`https://platform.claude.com/docs/en/release-notes/system-prompts`.
Files are dated `YYYY-MM-DD-claude-<model>.md` spanning 2024-07-12 through 2026-05-28.
`all.md` contains the combined archive.

## How tools access this library

| Tool | Integration point | What's linked |
|---|---|---|
| **Claude Code** | `~/.claude/skills/<skill>/` | 4 bundled skills (symlinked) |
| **Claude Code** | `~/.claude/anthropic-prompts/` | Full library (symlink, for browsing) |
| **Claude Code** | `~/.claude/CLAUDE.md` | Reference section pointing here |
| **TRAE** | `~/.trae/builtin/global/skills/<skill>/` | 4 bundled skills (symlinked) |
| **TRAE** | `~/.trae/anthropic-prompts/` | Full library (symlink, for browsing) |
| **Cursor** | `.cursor/rules/anthropic-prompts-library.mdc` | Rule file pointing here |
| **Any agent** | `AGENTS.md` (this folder) | Discovery guide |

## Usage

### Use a workflow with ANY model (GPT, Gemini, Llama, Mistral, etc.)

```bash
# Point your agent at a workflow file
cat ~/Prompts/Anthropic/workflows/deep-research-workflow.md

# Or inline it into your agent's system prompt
```

Each workflow has a "Tools needed" section — map those capabilities to whatever your agent has. No Claude-specific identity or tool schemas.

### Browse Claude system prompts (IDENTITY — reference only)

```bash
# List all standalone prompts
ls ~/Prompts/Anthropic/*.md

# Read a specific model's system prompt
cat ~/Prompts/Anthropic/claude-opus-4.8.md

# Search across the entire library
grep -ri "thinking" ~/Prompts/Anthropic/
```

### Use a skill (auto-discovered in Claude Code / TRAE)

Skills are symlinked and auto-discovered. Invoke by name:
- `/code-review` — multi-level code review
- `/dataviz` — data visualization guidance
- `/deep-research` — cited research reports
- `/run-skill-generator` — generate project run skills

### Reference for custom agents

Point any agent at `~/Prompts/Anthropic/AGENTS.md` for structured discovery.
For reusable processes, point at `~/Prompts/Anthropic/workflows/`.
For pattern tagging (what's reusable vs Claude-only), see `~/Prompts/Anthropic/PATTERNS.md`.
