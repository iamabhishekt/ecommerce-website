# CodeBuddy / WorkBuddy — workspace adapter

Tool-specific folder for the Tencent CodeBuddy IDE and WorkBuddy, mirroring the pattern used
by `.claude/`, `.cursor/`, `.trae/`, `.kilocode/`, `.dsh/`, and `.agents/`. It owns only
CodeBuddy/WorkBuddy-native mechanics (skills). The actual memory is the **shared,
tool-neutral** workspace `brain/` — CodeBuddy reads the same files every other agent reads;
nothing here duplicates or overrides them.

CodeBuddy IDE and WorkBuddy share the same "CodeBuddy Code" skill engine and the same
project-scope skills folder (`.codebuddy/skills/`), so one adapter serves both apps.

## Memory map (what CodeBuddy / WorkBuddy load)

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

Root discovery shims (`AGENTS.md`, `CLAUDE.md`, …) resolve into `brain/`, so universal
context is already present in every session.

## Skills

CodeBuddy Code discovers project skills at `<projectRoot>/.codebuddy/skills/`
(user-level `~/.codebuddy/skills/` also applies). The root `.codebuddy` symlink resolves
this to `brain/.codebuddy/skills/` — **real skill directories**, one `SKILL.md` each.

The enabled set is the **union of the top-level skills the other agents load** in this
workspace, copied as real directories (no symlinks inside, matching every other adapter):

| Origin | Count | Notes |
|---|---|---|
| `.agents/skills` | 75 | J-Limo workflow + mattpocock engineering skills |
| `.claude/skills` | 53 | extra generic top-level skills |
| `.cursor/skills` | 9 | Cursor-only top-level skills |
| `.dsh/skills` | 1 | `figma` (DSH-native client, reused) |
| **Total** | **138** | |

Source precedence per skill name: `.agents` → `.dsh` → `.claude` → `.cursor` → `.trae`;
the first source that has a top-level `SKILL.md` wins.

Intentionally **excluded**: nested-only category folders that contain leaf `SKILL.md`s but
no top-level `SKILL.md` (e.g. the 31-category "Claudify" library under `.claude/skills`,
~1700 leaf skills). No SKILL.md-based runtime — Claude Code, Cursor, or CodeBuddy —
discovers those at project scope, so they are not loadable skills here.

### Regenerate after the other adapters change

```sh
cd brain
rm -rf .codebuddy && mkdir -p .codebuddy/skills
python3 - <<'PY'
import os, shutil
root = "."; sources = [".agents", ".dsh", ".claude", ".cursor", ".trae"]
withskill = {}
for s in sources:
    d = os.path.join(root, s, "skills")
    for n in os.listdir(d):
        p = os.path.join(d, n)
        if os.path.isdir(p) and os.path.isfile(os.path.join(p, "SKILL.md")):
            withskill.setdefault(n, []).append(s)   # source list is in precedence order
for name in sorted(withskill):
    shutil.copytree(os.path.join(root, withskill[name][0], "skills", name),
                    os.path.join(root, ".codebuddy", "skills", name))
PY
```

### Verify

- In CodeBuddy or WorkBuddy chat, run `/skills` — User / Project / Plugin skills with token
  counts are listed; Project skills should include this set.
- To trim noise for a session, skills can be disabled per skill via `skillOverrides` in
  `~/.codebuddy/settings.json` or by removing folders here (re-run the regeneration after
  source changes).

## Convention

- Use kebab-case skill names, `name` + `description` frontmatter (see existing skills in
  `brain/.agents/skills/`).
- Add only **CodeBuddy/WorkBuddy-native mechanics** here. Do not copy universal rules or
  shared state — update the canonical owner in `brain/` instead.
- Register any new root discovery shim in `brain/README.md`.
