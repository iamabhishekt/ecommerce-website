---
name: sync
description: Mid-session context refresh for DeepSeek Harness — process scratchpad, review task board, and update the shared memory the same way Claude Code's /sync does.
argument-hint: ""
---

# Mid-session sync (DSH memory refresh)

DeepSeek Harness equivalent of Claude Code's `/sync`. Refresh context against the
**shared** workspace memory (not a DSH-private copy) and process captured notes.

## Steps

### Step 1: Read current state (parallel)

Read simultaneously, from workspace root:

- `brain/CURRENT_STATE.local.md`
- `brain/.claude/memory.md`
- `brain/state/daily-notes/{MMDDYY}.md` (today)
- `brain/state/scratchpad.md` (root shim `Scratchpad.md`)

### Step 2: Process scratchpad

For each item in `Scratchpad.md`:
- Is it a task? → Move to Task Board
- Is it a decision? → Add to Daily Note → Decisions
- Is it a learning? → Nominate to `brain/.claude/knowledge-nominations.md`
- Is it a note? → Add to Daily Note → Notes
- Is it stale? → Delete

Clear processed items from Scratchpad.

### Step 3: Scan task board

Read `brain/state/task-board.md`:
- Move completed tasks from Today → Done
- Flag blocked tasks
- Check if priorities have shifted

### Step 4: Context health check (self-assess)

- Am I still oriented on the right problem?
- Have I been going in circles on anything?
- Is my context getting heavy? (Consider a fresh session after sync if so.)

### Step 5: Update shared state

Edit `brain/CURRENT_STATE.local.md`:
- Update "Focus" if the problem changed
- Record any new blockers/decisions
- Update "Next action"

If a durable learned rule surfaced, nominate it to
`brain/.claude/knowledge-nominations.md` (do NOT edit knowledge-base.md directly —
that is auditor-gated).

### Step 6: Status report

Brief summary:
- What was accomplished this session
- Current focus
- Any blockers or changes in priority
- Suggested next action
