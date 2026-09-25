# Claudify OS Integration (TRAE)

This project runs the **Claudify** operating system for Claude Code. The system files are in `.claude/` and are shared across Claude Code, Cursor, and TRAE.

## What's Installed

| Layer | Location | Purpose |
|-------|----------|---------|
| Agents | `.claude/agents/*.md` (24 agents) | Specialist subagents with persistent memory |
| Commands | `.claude/commands/*.md` (37 commands) | Workflow rituals (/start, /sync, /wrap-up, /audit, /safe-clear, etc.) |
| Hooks | `.claude/hooks/*.sh` (14 hooks) | Safety enforcement, backup, logging, completeness gates |
| Skills | `.claude/skills/` (1,950+ skills, 31+ categories) | Domain knowledge loaded on demand |
| Memory | `.claude/memory.md` | Active session context (max 100 lines) |
| Knowledge Base | `.claude/knowledge-base.md` | System-wide learned rules with [Source:] provenance |
| Agent Memory | `.claude/agent-memory/` | Per-agent persistent knowledge across sessions |
| Logs | `.claude/logs/` | Audit trail + incident log |

## Precedence Rules

1. **Project-owned directives** (root `CLAUDE.md` sections: Agent Directives, Project Context, Coach Mode, Critical Constraints) take priority over Claudify system rules.
2. **TRAE rules** (`.trae/rules/*.md`) for website development, WCNC, token budget, caveman, ponytail remain active and are not overridden by Claudify.
3. Claudify's memory/agents/commands are supplementary - they add workflow capabilities without replacing existing project conventions.

## Daily Workflow

```
Morning:    /start -> work -> /sync (if switching tasks)
Afternoon:  work -> /safe-clear (if context gets heavy) -> work
Evening:    /wrap-up
```

## Key Commands

| Command | When |
|---------|------|
| `/start` | Beginning of a work session |
| `/sync` | Mid-session to refresh context |
| `/safe-clear` | Between unrelated tasks or when quality drops |
| `/wrap-up` | End of a work session |
| `/audit` | After finishing something important |
| `/unstick` | When you're stuck on a problem |

## Context Health

- After ~30+ tool calls or 3+ large file reads: run `/safe-clear` proactively
- If you see a "compacting conversation" warning: run `/safe-clear` immediately
- When switching between different task domains: prefer `/safe-clear`

## Specialist Agents Available

- `auditor` - Quality gate, reviews work, promotes knowledge
- `unsticker` - Unblocks when stuck, root-cause analysis
- `error-whisperer` - Translates cryptic errors into fixes
- `rubber-duck` - Socratic debugging
- `pr-ghostwriter` - PR descriptions, commit messages
- `yak-shave-detector` - Catches scope creep
- `debt-collector` - Tracks tech debt
- `onboarding-sherpa` - Learns new codebases fast
- `archaeologist` - Excavates why code exists (git blame)
- Plus content/SEO specialist agents

## Reference Files

- `SETUP.md` - 10-minute onboarding walkthrough
- `INTEGRATION.md` - How standalone vs bundled installs work
- `SPEC.md` - Build spec and status
- `.claude/command-index.md` - Full command catalog
