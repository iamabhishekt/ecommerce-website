---
name: anthropic-skill-generation
description: "Generate a run/drive skill for any project so a future agent can build, launch, and drive it programmatically. Model-agnostic — any agent with shell + file-read + ability to launch the project can follow. Produces SKILL.md + driver script. Use when the user wants to make a project runnable by agents. Source: ~/Prompts/Anthropic/workflows/skill-generation-workflow.md"
---

# Anthropic Skill Generation

Read and follow: `~/Prompts/Anthropic/workflows/skill-generation-workflow.md`

Definition of done — all must be true:
1. You launched the app and interacted with it (not the test suite — the actual app)
2. The interaction harness is committed next to the skill
3. SKILL.md documents the harness as the primary agent path
4. Every code block in SKILL.md is a command you ran that worked

Process:
1. Find any existing run skill → refine, don't rewrite
2. Discover — treat every doc claim as disprovable ("not supported" = "I never tried")
3. Execute — build the harness, take a screenshot, do one real user flow
4. Write SKILL.md (prescriptive, verified, honest)
5. Verify — fresh shell, follow line-by-line

Project-type patterns: web server (curl smoke), CLI (args smoke), TUI (tmux), Electron (Playwright REPL under xvfb), browser (chromium-cli), library (import-and-call).

Tools needed: shell, file read/write, ability to launch the project, screenshot capability for GUIs.
