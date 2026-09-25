# GEMINI.md

> Canonical Gemini / Antigravity Agent Configuration for Ecommerce Website.

## Mandatory Read Order

Before making decisions or changing files:

1. Read `CLAUDE.md` (project directives, Claudify OS architecture, retrieval map).
2. Read `.claude/memory.md` (active session context and working style).
3. Read `Task Board.md` (active sprint and queued tasks).
4. Read `.claude/knowledge-base.md` (system-wide learned rules and constraints).

---

## Core Invariants

1. **Phased Execution:** Break complex tasks into explicit phases of max 5 files. Verify each phase before continuing.
2. **Forced Verification:** Run type checks and linters before marking tasks complete.
3. **No Secrets in Project Context:** Never commit API keys, tokens, or credentials to source code or git. Use `.env` files.
4. **Follow Memory Rituals:** Update `.claude/memory.md` and `Task Board.md` to keep context fresh across sessions.

---

## Gemini Multi-Agent Orchestration

The workspace provides dedicated subagent roles under `.gemini/agents/`:

- **`leader`**: Technical Architect & Orchestrator. Owns high-level planning, structural design, task decomposition, and delegation.
- **`developer`**: Senior Systems Engineer. Implements assigned tasks with zero mocks, production quality, and test verification.
- **`researcher`**: Internet Researcher. Performs web searches and references primary documentation to return concise, source-cited facts.
- **Specialist Subagents**: Full specialist suite available in `.gemini/agents/` (including `auditor`, `unsticker`, `error-whisperer`, `rubber-duck`, `debt-collector`, `archaeologist`, `onboarding-sherpa`, `pr-ghostwriter`, and SEO/Content specialists).

---

## Customizations & Discovery

- **Skills**: Discovered automatically from `.claude/skills/` (and `.agents/skills/`, `.gemini/skills/`).
- **Rules**: `CLAUDE.md` and `GEMINI.md` load hierarchically from the workspace root.
- **MCP Servers**: Configured in `.mcp.json` (and `.gemini/mcp_config.json`).
