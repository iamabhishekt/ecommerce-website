# CLAUDE.md

> Project instructions and agent directives for Ecommerce Website.
> Claudify Operating System configuration lives below.

---

# Agent Directives: Mechanical Overrides

## Pre-Work
1. **THE "STEP 0" RULE:** Dead code accelerates context compaction. Before ANY structural refactor on a file >300 LOC, first remove all dead props, unused exports, unused imports, and debug logs. Commit this cleanup separately before starting the real work.
2. **PHASED EXECUTION:** Never attempt large multi-file refactors in a single response. Break work into explicit phases of max 5 files. Complete one phase, run verification, and wait for explicit approval before continuing.

## Code Quality
1. **THE SENIOR DEV OVERRIDE:** If the architecture is flawed, state is duplicated, or patterns are inconsistent, propose and implement proper structural fixes. Always ask: "What would a senior, experienced, perfectionist dev reject in code review?" Fix all of it.
2. **FORCED VERIFICATION:** FORBIDDEN from claiming a task is complete until you have:
   - Run type check (`npx tsc --noEmit` or equivalent)
   - Run linter (`npm run lint` or equivalent if configured)
   - Fixed ALL resulting errors
   If no type-checker is set up, state it clearly instead of saying "done."

## Context Management
1. **SUB-AGENT STRATEGY:** For tasks touching >5 independent files, propose a split into parallel sub-agents (or sequential phases). Each sub-agent gets its own clean context.
2. **CONTEXT DECAY AWARENESS:** After ~8–10 messages or when changing focus, always re-read relevant files before editing. Do not trust previous memory.
3. **FILE READ BUDGET:** Files are hard-capped at ~2,000 lines per read. For any file >500 LOC, read in chunks using offset/limit. Never assume a single read gave you the full file.
4. **TOOL RESULT BLINDNESS:** Large tool outputs (>50k chars) are silently truncated. If grep returns suspiciously few results, re-run with narrower scope.

## Edit Safety
1. **EDIT INTEGRITY:** Before every file edit, re-read the target file. After editing, re-read to confirm changes applied. Never batch more than 3 edits on the same file without verification.
2. **NO SEMANTIC SEARCH:** You only have grep (text pattern matching), not an AST. When renaming or changing any function/type/variable, search separately for: direct calls, type-level references, string literals, dynamic imports.

---

# Project Context: Ecommerce Website

**What it is:** Modern ecommerce platform and storefront.

**Status:** Newly initialized workspace with Claudify OS. Run `/start` to begin session onboarding.

---

<!-- CLAUDIFY-SYSTEM:START -->
<!-- Claudify OS Integration: 6-tier memory, specialist agents, workflow commands, safety hooks -->

# Claudify Operating System

This project runs the **Claudify** OS for Claude Code — a 6-tier memory system with specialist agents, workflow commands, safety hooks, and an extensive skills library.

> **Precedence:** The project-owned sections above (Agent Directives, Project Context) take priority over general Claudify rules. Where conflicts arise, project rules win.

## Quick Start
- Run `/start` to begin work (loads memory, opens task board, creates daily note)
- Run `/sync` mid-day to refresh memory and process scratchpad
- Run `/wrap-up` at end of day to summarize and persist state
- Run `/audit` to verify recent work quality (spawns auditor agent)
- Run `/safe-clear` to safely flush context and resume fresh
- Run `/unstick` when stuck on a problem
- Run `/retro` for sprint retrospective
- Run `/system-audit` for deep infrastructure audit

## Key Files
- Memory: `.claude/memory.md` (read for current session context)
- Knowledge Base: `.claude/knowledge-base.md` (system-wide learned rules, read before every task)
- Task Board: `Task Board.md` (active sprint and task tracker)
- Scratchpad: `Scratchpad.md` (quick capture, processed during `/sync`, cleared at `/wrap-up`)
- Daily Notes: `Daily Notes/` (created automatically by `/start`)
- Knowledge Nominations: `.claude/knowledge-nominations.md` (candidate learnings, auditor reviews)
- Command Index: `.claude/command-index.md` (all commands with triggers and tools)

## System Architecture
- **Agents** (`.claude/agents/`): Specialist subagents with persistent memory
  - `auditor`: Quality gate. Reviews work, promotes knowledge, proposes SOP revisions
  - `unsticker`: Unblocks you when stuck. Root-cause analysis, fresh approaches
  - `error-whisperer`: Translates cryptic errors into fixes. Pattern matching across sessions
  - `rubber-duck`: Forces you to articulate the real problem. Socratic debugging
  - `pr-ghostwriter`: Writes PR descriptions, commit messages, changelogs from diffs
  - `yak-shave-detector`: Catches scope creep
  - `debt-collector`: Tracks tech debt. Catalogues shortcuts, suggests when to pay them down
  - `onboarding-sherpa`: Learns a new codebase fast. Architecture maps, key-file identification
  - `archaeologist`: Excavates why code exists. Git blame + context reconstruction
  - Plus full suite of SEO and Content specialist agents (see `.claude/agents/`)
- **Commands** (`.claude/commands/`): Workflow rituals and utilities — see `.claude/command-index.md`
- **Hooks** (`.claude/hooks/`): Deterministic safety enforcement (logging, verification, backup)
- **Logs** (`.claude/logs/`): Audit trail + incident log, auto-populated by hooks
- **Skills** (`.claude/skills/`): 1,950+ domain knowledge skills, loaded on demand

## Memory Architecture (6 Tiers)
1. **memory.md**: Active session context (what you're doing now)
2. **Agent Memory** (`.claude/agent-memory/`): Per-agent persistent knowledge across sessions
3. **Knowledge Base** (`.claude/knowledge-base.md`): System-wide learned rules (auditor-gated)
4. **Knowledge Nominations** (`.claude/knowledge-nominations.md`): Candidate learnings pipeline
5. **MCP Knowledge Graph**: Structured entities and relations (if memory MCP enabled)
6. **Daily Notes**: Chronological session history and handoff records

## Command Awareness

All agents can invoke system commands. Read `.claude/command-index.md` for the full catalog.
- **Self-execute**: If you have the tools a command requires, read `.claude/commands/{name}.md` and follow the procedure directly.
- **Recommend**: If you lack the tools, output `RECOMMEND: /command [args]: [reason]` for the orchestrator.
- Agents should proactively invoke commands when trigger conditions match.

## Retrieval Map: Where to look for what

| You need... | Check first | Then |
|---|---|---|
| What am I doing right now? | `.claude/memory.md` -> Now | `Task Board.md` -> Today |
| How to do a procedure | `.claude/commands/` or `.claude/skills/` | `CLAUDE.md` |
| A fact or learned rule | `.claude/knowledge-base.md` | Agent memory |
| What happened on a specific day | `Daily Notes/MMDDYY.md` | Audit trail |
| What went wrong before | `.claude/knowledge-base.md` -> Hard Rules | Agent memory -> Known Patterns |
| What commands exist | `.claude/command-index.md` | `.claude/commands/{name}.md` |

## Context Health

Sessions have finite context. Heavy operations consume it fast.

**Automatic safety net (hooks):**
- `PreCompact` hook saves state before auto-compaction
- `SessionStart(compact)` hook restores context after compaction
- `SessionStart(user)` hook resets stale gate files on every fresh session

**Completeness gates (PreToolUse Write|Edit, hard blocks):**
- **knowledge-base.md**: Every entry needs `[Source:]` provenance, max 200 lines, no TBD/TODO
- **memory.md**: Max 100 lines (Write only)
- **settings.json**: Must be valid JSON (broken JSON breaks all hooks)
- **Agent defs** (`.claude/agents/*.md`): No TBD/TODO. Instructions must be definitive.
- **Ungated** (iterative by nature): Daily Notes, Scratchpad, Templates, Logs, Commands, Skills

**Self-monitoring (soft signals):**
- After ~30+ tool calls or 3+ large file reads: run `/safe-clear` proactively
- If you see a "compacting conversation" warning: run `/safe-clear` immediately
- If output quality degrades (repetition, missed details): run `/safe-clear`
- When switching between different task domains: prefer `/safe-clear`

## Maintenance
- Keep `memory.md` compact (<100 lines)
- Aggressively prune stale items
- Review incident log during `/sync` and `/wrap-up`
- Auditor proposes SOP revisions. User approves before changes apply.

<!-- CLAUDIFY-SYSTEM:END -->
