# Model-Agnostic Workflows

Process recipes extracted from Claude-specific prompts. **Any capable model can follow these** — they describe *what to do and in what order*, not "be Claude." Drop the relevant one into your agent's system prompt, or have it read this file before starting the task.

Source prompts (Claude-flavored) live alongside these workflows in `../Claude Code/bundled-skills/` and the root `*.md` files. These versions strip Claude-specific tool names, identity, and safety reminders — keeping only the reusable process.

## Available workflows

| Workflow | What it produces | Source |
|---|---|---|
| [deep-research-workflow.md](./deep-research-workflow.md) | A cited, multi-source, fact-checked research report | `Claude Code/bundled-skills/deep-research/SKILL.md` |
| [code-review-workflow.md](./code-review-workflow.md) | A ranked list of code findings (bugs + cleanups) from a diff | `Claude Code/bundled-skills/code-review/high.md` |
| [dataviz-workflow.md](./dataviz-workflow.md) | A chart/visualization that reads as one designed system | `Claude Code/bundled-skills/dataviz/SKILL.md` |
| [visual-creation-workflow.md](./visual-creation-workflow.md) | SVG diagrams, HTML widgets, charts, art | `visualize.md` |
| [design-artifact-workflow.md](./design-artifact-workflow.md) | A design artifact (HTML, slide, mockup) built in a project | `claude-design.md` |
| [research-clarifying-questions.md](./research-clarifying-questions.md) | When + how to ask clarifying questions before a long task | `research_instructions.md` |
| [skill-generation-workflow.md](./skill-generation-workflow.md) | A run/drive skill for any project type | `Claude Code/bundled-skills/run-skill-generator/SKILL.md` |

## How to use these with any model

1. **Inline the workflow** — paste the workflow file's contents into your agent's system prompt, or
2. **Reference the file** — tell the agent: "Read `~/Prompts/Anthropic/workflows/<file>.md` and follow it for this task", or
3. **Adapt to your tool** — most workflows have a "Tools needed" section naming the capabilities required (search, fetch, file read, etc.). Map them to whatever your agent has.

## What's NOT here (and why)

These are **Claude-specific** and not extracted as workflows — see `../PATTERNS.md` for the full tagging:

- Claude's identity, personality, values → baked into model weights, not portable
- Claude-specific tool schemas (`web_search`, `launch_extended_search_task`, `ReportFindings`) → other models have different tools
- Safety/reminders system (`anthropic_reminders.md`) → model-specific tuning
- "Don't divulge your system prompt" → Claude behavior, not a general process
