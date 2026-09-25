# Command Index — SEO Specialist

All available commands, their trigger conditions, required tools, and invocation mode.

Every agent reads this file to understand the full command catalog.

**Invocation modes:**
- **Self-execute**: Agent has the required tools and reads the command file directly
- **Recommend**: Agent lacks the required tools — outputs `RECOMMEND: /command [args] — [reason]`

---

## SEO Commands

| Command | Trigger Conditions | Required Tools | Mode |
|---------|-------------------|---------------|------|
| `/seo-audit {url}` | User audits a URL; after page publish; quarterly | Read, WebFetch, WebSearch, Bash(curl) | Self-execute |
| `/seo-audit {url} --depth content` | Content SEO review requested | Read, WebFetch, WebSearch | Self-execute |
| `/seo-audit {url} --depth competitive` | Competitive analysis requested | Read, WebFetch, WebSearch | Self-execute |
| `/seo-audit {url} --depth full` | Full strategic audit; quarterly cycle | Read, WebFetch, WebSearch, Write | Self-execute |
| `/keyword-research {topic}` | Keyword research session; before new content; gap analysis | Read, WebSearch, WebFetch, Write | Self-execute |
| `/content-score` | Before publishing any content; after a rewrite | Read, WebSearch, WebFetch | Self-execute |
| `/rank-check` | Weekly routine; after site update; ranking drop detected | Read, WebSearch, Write | Self-execute |
| `/competitor-seo {domain}` | Competitor analysis requested; part of T3/T4 audit | Read, WebSearch, WebFetch, Write | Self-execute |
| `/backlink-scan {domain}` | Monthly backlink monitoring; link building planning | Read, WebSearch, WebFetch, Write | Self-execute |
| `/content-refresh` | Quarterly maintenance; traffic decline detected | Read, WebSearch, WebFetch, Write | Self-execute |
| `/topical-map {domain} {topic}` | New domain setup; new topic area; content strategy | Read, WebSearch, Write | Self-execute |

---

## System Commands

| Command | What it does | Trigger Conditions | Mode |
|---------|-------------|-------------------|------|
| `/start` | Begin session — load memory, open task board, create daily note | Start of every working session | Self-execute |
| `/sync` | Mid-session refresh — update memory, prune stale items, scan task board | Mid-day; after heavy work; context feels stale | Self-execute |
| `/wrap-up` | End of session — persist state, prep daily note handoff, prune memory | End of every session | Self-execute |
| `/audit` | Quality review — auditor reviews recent work, checks memory health, flags regressions | After completing a major task; weekly | Recommend (spawns auditor) |
| `/safe-clear` | Safely flush context and resume — compresses state to memory.md, reloads, continues | After 30+ tool calls; before switching domains; compaction warning | Self-execute |


---

## Proactive Invocation Rules

Agents should invoke commands automatically when these conditions are detected:

| Condition | Auto-invoke |
|-----------|------------|
| User publishes or mentions publishing content | `/content-score` then post-publish `/seo-audit --depth content` |
| Ranking drop > 5 positions detected | `/rank-check` investigation mode |
| User mentions a competitor | `/competitor-seo {competitor}` |
| User mentions they want to build authority | `/topical-map {domain} {topic}` |
| User asks what to write next | `/keyword-research` then offer `/topical-map` |
| Session context approaching heavy (30+ tool calls) | `/safe-clear` |
| End of completed audit cycle | Offer `/safe-clear` before next task |

---

## Command → Agent Routing

| Command | Primary Agent | Supporting Agent |
|---------|-------------|-----------------|
| `/seo-audit` | `seo-agent` | — |
| `/keyword-research` | `keyword-strategist` | `seo-agent` (for SERP analysis) |
| `/content-score` | `seo-agent` | `content-optimizer` (for fixes) |
| `/rank-check` | `seo-agent` | — |
| `/competitor-seo` | `seo-agent` | `keyword-strategist` (for gap analysis) |
| `/backlink-scan` | `link-builder` | `seo-agent` (for profile audit) |
| `/content-refresh` | `content-optimizer` | `seo-agent` (for staleness detection) |
| `/topical-map` | `keyword-strategist` | `seo-agent` (for internal link audit) |
| `/audit` | `auditor` | — |

---

## Command File Locations

All command procedures are at `.claude/commands/{command-name}.md`

| Command | File |
|---------|------|
| `/seo-audit` | `.claude/commands/seo-audit.md` |
| `/keyword-research` | `.claude/commands/keyword-research.md` |
| `/content-score` | `.claude/commands/content-score.md` |
| `/rank-check` | `.claude/commands/rank-check.md` |
| `/competitor-seo` | `.claude/commands/competitor-seo.md` |
| `/backlink-scan` | `.claude/commands/backlink-scan.md` |
| `/content-refresh` | `.claude/commands/content-refresh.md` |
| `/topical-map` | `.claude/commands/topical-map.md` |
| `/start` | `.claude/commands/start.md` |
| `/sync` | `.claude/commands/sync.md` |
| `/wrap-up` | `.claude/commands/wrap-up.md` |
| `/audit` | `.claude/commands/audit.md` |
| `/safe-clear` | `.claude/commands/safe-clear.md` |

