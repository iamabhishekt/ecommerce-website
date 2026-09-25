# Ecommerce Website Agent Entry Point

This file is canonical project guidance for every coding agent and interface: Claude Code, Antigravity, Cursor, TRAE, Codex, Copilot, Gemini, JetBrains, and future tools.

Tool-specific files may add runtime instructions. They must not duplicate or override project rules here or in linked scoped documents.

## Workspace Boundary

Workspace root is the folder that contains `brain/` and project repositories/code.

- Start agent sessions from workspace root so universal context loads before entering subdirectories.
- Product source stays in the workspace root or designated project folders.
- Agent rules, tools, and shared state live in `brain/` and are surfaced via discovery symlinks in root.

## Mandatory Read Order

Before making decisions or changing files:

1. Read this file (`AGENTS.md` / `brain/AGENTS.md`).
2. Read `CLAUDE.md` / `brain/CLAUDE.md` (project directives, Claudify OS architecture).
3. Read `CURRENT_STATE.local.md` / `brain/CURRENT_STATE.local.md` when present (local cross-agent handoff state).
4. Read `Task Board.md` / `brain/state/task-board.md` for detailed local tasks.
5. Read `.claude/memory.md` (active session context and working style).
6. Read `.claude/knowledge-base.md` (system-wide learned rules and constraints).

## Non-Negotiable Invariants

1. **Phased Execution:** Break complex tasks into explicit phases of max 5 files. Complete one phase, verify it, and confirm before continuing.
2. **Forced Verification:** Run type checks and linters before marking tasks complete. Fix all resulting errors.
3. **No Secrets in Project Context:** Never store credentials, tokens, card data, private keys, or API keys in source code or git. Use `.env` files.
4. **Follow Memory Rituals:** Update `.claude/memory.md` and `Task Board.md` to keep context fresh across sessions.
5. **No Hallucinated Edits:** Always inspect and verify target files before and after editing.

## Context Ownership

| Information | Source of truth |
|---|---|
| Universal project constraints and read order | `AGENTS.md` |
| Claudify operating system architecture | `CLAUDE.md` |
| Current local handoff | `brain/CURRENT_STATE.local.md` |
| Detailed local tasks | `Task Board.md` (`brain/state/task-board.md`) |
| Quick capture scratchpad | `Scratchpad.md` (`brain/state/scratchpad.md`) |
| Chronological session record | `Daily Notes/` (`brain/state/daily-notes/`) |
| Tool mechanics, hooks, commands, skills | `brain/.claude/`, `brain/.cursor/`, `brain/.trae/`, `brain/.gemini/` |
| Architecture and system design | `brain/architecture/` |
| Curated documentation and research | `brain/documentation/` |

## Local State

`CURRENT_STATE.local.md`, `Task Board.md`, `Daily Notes/`, and `Scratchpad.md` are local workflow files. Refresh local state from repository evidence and user direction; never invent completed work.
