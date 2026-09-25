# Ecommerce Website Workspace Brain

`brain/` is the sole local owner for agent rules, tool configuration, working state, architecture, documentation, research, chats, transcripts, scripts, and generated assets for this workspace.

Workspace root: `/home/abhishek/ecommerce-website`

## Boundary

- Product source files live in the workspace root or designated project modules.
- Agent sessions start from workspace root.
- Root auto-discovery names are relative symlinks into `brain/`.
- `brain/` holds the unified cross-agent OS and state (Claude Code, Gemini/Antigravity, Cursor, Trae, etc.).

## Multi-Machine Sync & New PC Setup

To set up and provision symlinks on a new machine:
```bash
bash brain/scripts/setup-new-pc.sh
```

## Discovery Shims

| Root path | Brain owner |
|---|---|
| `AGENTS.md` | `brain/AGENTS.md` |
| `CLAUDE.md` | `brain/CLAUDE.md` |
| `CLAUDE.local.md` | `brain/CLAUDE.local.md` |
| `GEMINI.md` | `brain/GEMINI.md` |
| `.claude` | `brain/.claude` |
| `.cursor` | `brain/.cursor` |
| `.trae` | `brain/.trae` |
| `.kilocode` | `brain/.kilocode` |
| `.dsh` | `brain/.dsh` |
| `.agents` | `brain/.agents` |
| `.codebuddy` | `brain/.codebuddy` |
| `.gemini` | `brain/.gemini` |
| `.codex` | `brain/.codex` |
| `.opencode` | `brain/.opencode` |
| `.qwen` | `brain/.qwen` |
| `.mcp.json` | `brain/.mcp.json` |
| `documentation` | `brain/documentation` |
| `skills-lock.json` | `brain/tool-config/skills-lock.json` |
| `Daily Notes` | `brain/state/daily-notes` |
| `Task Board.md` | `brain/state/task-board.md` |
| `Scratchpad.md` | `brain/state/scratchpad.md` |

## Content Ownership

| Content | Destination |
|---|---|
| Universal rules and current state | `brain/` |
| Architecture | `brain/architecture/` |
| Curated docs and research | `brain/documentation/` |
| Local task and daily state | `brain/state/` |
| Workspace utilities & scripts | `brain/scripts/` |
| Tool-specific metadata | `brain/tool-config/` |
| Runtimes | `brain/.claude/`, `brain/.gemini/`, `brain/.cursor/`, `brain/.trae/`, etc. |
