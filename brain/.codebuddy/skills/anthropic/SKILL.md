---
name: anthropic
description: "Universal entry point to the Anthropic prompts library at ~/Prompts/Anthropic/. Loads model-agnostic workflows (deep-research, code-review, dataviz, visual-creation, design-artifact, clarifying-questions, skill-generation) that ANY model can follow. Invoke when the user wants a Claude-quality process, says 'use anthropic', 'use the library', 'universal prompt', or asks for research/review/viz/design workflows. The skill reads the appropriate workflow file and the agent follows it — works for any model (Claude, GPT, Gemini, Llama, etc.)."
---

# Anthropic Prompts Library — Universal Skill

You are being invoked as the universal entry point to the Anthropic prompts library at `~/Prompts/Anthropic/`.

## What this gives you

This library contains **model-agnostic workflows** — process recipes extracted from Claude's best prompts. They describe *what to do and in what order*, not "be Claude." Any model can follow them. They give you Claude's process discipline (multi-angle verification, adversarial claim-checking, designed-system method) without needing Claude's weights.

## How to dispatch

Read the user's request and load the matching workflow. Each workflow file is at `~/Prompts/Anthropic/workflows/`. Read it, then follow it.

| User intent | Workflow file to read | What it produces |
|---|---|---|
| Deep research / multi-source report / "look into X" | `workflows/deep-research-workflow.md` | Cited, verified research report |
| Code review / "review this diff" / "check my PR" | `workflows/code-review-workflow.md` | Ranked code findings from a diff |
| Chart / graph / plot / dashboard / data viz | `workflows/dataviz-workflow.md` | Designed-system data visualization |
| Diagram / flowchart / mockup / SVG / widget | `workflows/visual-creation-workflow.md` | SVG diagrams, HTML widgets, charts, art |
| Design artifact / landing page / slide / mockup | `workflows/design-artifact-workflow.md` | Design artifact (HTML, slides, mockups) |
| "Should I ask clarifying questions?" / scoping a long task | `workflows/research-clarifying-questions.md` | When + how to ask clarifying questions |
| "Build a run skill for this project" / "how do I drive this app" | `workflows/skill-generation-workflow.md` | Run/drive skill for any project |

## If the intent is ambiguous

Ask the user which workflow they want (max 3 options, few-words answerable). Or pick the closest match and note the assumption.

## Reference material (read only if needed)

- **Master index:** `~/Prompts/Anthropic/README.md`
- **Agent discovery:** `~/Prompts/Anthropic/AGENTS.md`
- **Pattern tagging (reusable vs identity):** `~/Prompts/Anthropic/PATTERNS.md`
- **Claude-specific system prompts (IDENTITY — reference only, don't use as your identity):** `~/Prompts/Anthropic/claude-*.md`, `Official/`, `old/`, `raw/`

## Important — you keep your own identity

This skill loads a **process** into your context. It does NOT change your model identity, values, or safety tuning. You are still whatever model you are — you just now have a high-quality workflow to follow. Follow the workflow's steps; use your own judgment for everything else.

## After loading a workflow

1. Read the workflow file fully.
2. Check the "Tools needed" section — map each capability to tools you actually have.
3. Follow the workflow's phases in order.
4. If a phase references a tool you don't have, adapt (e.g., no sub-agent fan-out → run searches sequentially).
