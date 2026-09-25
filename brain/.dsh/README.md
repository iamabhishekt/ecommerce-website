# DeepSeek Harness (DSH) — workspace memory

Tool-specific folder for the DeepSeek Harness agent, mirroring the pattern used by
`.claude/`, `.cursor/`, `.trae/`, and `.kilocode/`. It owns only **DSH-native
mechanics** (skills). The actual memory is the **shared, tool-neutral** workspace
brain — DSH reads the same files every other agent reads; nothing here duplicates
or overrides them.

## Memory map (what DSH loads)

| Need | File (workspace root, via shims / brain) |
|---|---|
| Universal read order + constraints | `AGENTS.md` → `brain/AGENTS.md` |
| Current handoff (the "now" pointer) | `brain/CURRENT_STATE.local.md` |
| Session history / open threads / decisions | `brain/.claude/memory.md` |
| Learned rules / hard rules (auditor-gated) | `brain/.claude/knowledge-base.md` |
| Verified research index | `brain/documentation/research/README.md` |
| Detailed local tasks | `brain/state/task-board.md` (root `Task Board.md`) |
| Chronological record | `brain/state/daily-notes/` (root `Daily Notes/`) |
| Quick capture | `brain/state/scratchpad.md` (root `Scratchpad.md`) |
| Architecture / decisions / agreement | `brain/architecture/`, `brain/documentation/agent-context/` |

DSH loads the root discovery shims automatically (`AGENTS.md`, `CLAUDE.md`, etc.
resolve into `brain/`), so universal context is already present in every session.
This folder adds the DSH-native workflow rituals.

## Skills

DSH discovers project skills at `<projectRoot>/.dsh/skills/` (rank 100 in the
filesystem skill provider). The root `.dsh` symlink resolves this to
`brain/.dsh/skills/`.

- **`start`** — DSH equivalent of Claude Code `/start`. Loads the shared memory
  (`CURRENT_STATE.local.md`, `memory.md`, `knowledge-base.md`, research README),
  reads the task board, creates today's daily note, and orientates.
- **`sync`** — DSH equivalent of Claude Code `/sync`. Processes scratchpad,
  scans the task board, updates `CURRENT_STATE.local.md`, self-checks context
  health.
- **`figma`** — DSH-native open-figma-mcp client (no MCP support in DSH):
  `node brain/scripts/figma.mjs screenshot|design|info|meta|pages <nodeId>`
  over `ws://127.0.0.1:18765/ws`. Pull exact screens/specs for 1:1 React
  website polish; includes bridge recovery steps.

## Convention

- Use kebab-case skill names, `name` + `description` frontmatter (see the
  workspace's existing skills in `brain/.agents/skills/` for the format).
- Add only **DSH-native mechanics** here. Do not copy universal rules or shared
  state — update the canonical owner in `brain/` instead.
- Register any new root discovery shim in `brain/README.md`.
