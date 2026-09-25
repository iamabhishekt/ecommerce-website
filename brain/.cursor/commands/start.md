---
description: Start session — load brain, Claudify memory, task board, daily note
---

Begin a working session in this workspace. Cursor CLI and IDE both use this file. Do the work; do not wait for a second prompt.

## Procedure

Read and execute `.claude/commands/start.md` in full (date, memory, knowledge-base, daily note, Task Board review, short orientation).

Then read these in order (workspace `AGENTS.md` mandatory read order). Skip a file only if it is missing:

1. `AGENTS.md`
2. `documentation/agent-context/WORKING_AGREEMENT.md`
3. `brain/CURRENT_STATE.local.md` — local focus, blockers, next action
4. `Task Board.md`
5. Architecture as needed: `brain/architecture/REPO_CONTEXT.md`, `brain/architecture/SYSTEM_MAP.md`
6. `.claude/command-index.md` — `/start` `/sync` `/wrap-up` `/audit` `/safe-clear` and the rest

Website WCNC handoff (when that work is in focus): `brain/archives/chats/SESSION_HANDOFF.md`.

Do not invent a second brain. Product invariants live in `AGENTS.md`. Session focus lives in `brain/CURRENT_STATE.local.md`. Claudify rituals live in `.claude/commands/`.

## Ready output

Keep it short:

- date
- next action from `brain/CURRENT_STATE.local.md`
- top 1–3 Task Board items
- blockers
- "Ready to work. What's first?"
