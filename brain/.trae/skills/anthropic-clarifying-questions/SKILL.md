---
name: anthropic-clarifying-questions
description: "Decide whether to ask clarifying questions before a long task (research, refactor, migration, large generation). Model-agnostic decision logic — any model can follow. Max 3 questions, numbered, few-words answerable, never ask twice. Use before launching expensive/long tasks. Source: ~/Prompts/Anthropic/workflows/research-clarifying-questions.md"
---

# Anthropic Clarifying Questions

Read and follow: `~/Prompts/Anthropic/workflows/research-clarifying-questions.md`

Decision flowchart:
1. Is the query detailed + specific? → Start immediately, note assumed defaults.
2. Some ambiguity? Can you pick a reasonable default? → Start immediately, note the assumption.
3. The answer changes the work's direction? → Ask ≤3 clarifying questions (numbered, few-words answerable), then STOP and wait.

Rules:
- Never more than 3 questions
- Numbered list
- Few-words answerable
- Never ask twice — after they reply, start immediately

Applies to any long/expensive task: research, multi-file refactors, architecture decisions, migrations, large generations.

Tools needed: none — pure decision logic.
