---
name: start
description: Start a DeepSeek Harness working session — load the workspace's shared memory (the same files Claude Code's /start reads) and orient for work.
argument-hint: ""
---

# Start a working session (DSH memory load)

DeepSeek Harness does not have Claude Code's `/start` slash command. This skill is
the DSH-native equivalent: it loads the **same shared memory** the other agents in
this workspace load, so a fresh DSH session begins oriented exactly like Claude
Code, Cursor, TRAE, Kimi, and Qwen.

The workspace memory is **tool-neutral and canonical** — all agents read the same
files. Do not fork or duplicate those files into a DSH-only copy.

## Steps

### Step 1: Get today's date

```bash
date +"%m%d%y %H:%M %A"
```

The daily-note filename is the `MMDDYY` prefix (e.g. `082126.md`).

### Step 2: Load the shared memory (parallel reads)

Read simultaneously, from workspace root:

- `brain/CURRENT_STATE.local.md` — cross-agent handoff state (focus, blockers,
  open threads, next action). NOTE: this is the current "now" pointer; it is
  the DSH/parent-agnostic equivalent of Claude's `memory.md` "Now" section.
- `brain/.claude/memory.md` — durable per-session history (Now / Open Threads /
  Recent Decisions / Blockers). Read the top entries for recent EOD focus.
- `brain/.claude/knowledge-base.md` — system-wide learned rules and hard rules.
  Entries here are **mandatory constraints**.
- `brain/documentation/research/README.md` — verified research index (TL;DR +
  confidence table per doc). Apply confirmed findings before non-trivial work.

These are your working context. Knowledge-base and research entries are
constraints, not suggestions.

### Step 3: Open the task board

Read `brain/state/task-board.md` (root shim `Task Board.md`). Scan for:

- Overdue items (previous days still open)
- Today's priorities
- Blocked items

Also read `brain/AGENTS.md` mandatory read-order section and follow it.

### Step 4: Create or refresh today's daily note

If `brain/state/daily-notes/{MMDDYY}.md` does not exist, create it:

```markdown
# {MMDDYY} - Daily Work Log

## Decisions
-

## Meetings & Conversations
-

## Notes
-

## End of Day Summary
-
```

### Step 5: Task review

For each task in Today:
1. Is it still relevant?
2. Do I have what I need to start?
3. Are there dependencies?

Move stale tasks to Backlog. Flag blocked items.

### Step 6: Ready to work

Output a brief orientation:
- What day it is
- Top 1-3 priorities for today (from `CURRENT_STATE.local.md` "Next action" /
  "Focus" and the task board)
- Any blockers or open threads
- "Ready to work. What's first?"

Keep it short.
