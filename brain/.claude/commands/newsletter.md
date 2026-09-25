# /newsletter [action] [issue-number]

Newsletter pipeline orchestration. Invokes the `newsletter-orchestrator` agent which coordinates 9 phases (strategy → draft → architect → build → audit → render-test → preview → send → analyse).

## Actions

| Command | What it does |
|---|---|
| `/newsletter strategy [N]` | Pick the topic + write the brief for issue N |
| `/newsletter draft [N]` | Drafter writes issue body from brief |
| `/newsletter architect [N]` | Validate or produce the god-tier prompt via 3-codebase test harness |
| `/newsletter build [N]` | Render markdown to HTML (`build.py`) |
| `/newsletter audit [N]` | Quality gate — 25 mechanical + 13 semantic + regression checks |
| `/newsletter render-test [N]` | Visual gate — 20 structural + Playwright at 4 viewports |
| `/newsletter preview [N]` | Send preview email to inbox |
| `/newsletter send [N]` | Create broadcast (manual paste for Beehiiv free tier, API for others) |
| `/newsletter analyse [N]` | Day-of-send + day-7 reports |
| `/newsletter all [N]` | Run phases 1-7 sequentially, halt for user review at preview |
| `/newsletter next` | Show what issue type is next in the rotation |

## Procedure

For any sub-action, invoke the `newsletter-orchestrator` agent via Task tool with `subagent_type: newsletter-orchestrator`. Pass:
- Action (one of: strategy / draft / architect / build / audit / render-test / preview / send / analyse / all / next)
- Issue number (optional — defaults to next issue in rotation)
- Brand (optional — defaults to active brand from memory.md)

The orchestrator manages the pipeline state and routes to the right sub-agent for each phase.

## Phase order (when running `/newsletter all`)

1. **Strategy** — strategist picks topic + writes brief
2. **Draft** — drafter writes issue body
3. **Architect** — prompt-architect produces / validates god-tier prompt (3-codebase test harness)
4. **Build** — `build.py` renders HTML
5. **Audit** — newsletter-auditor runs 25 mechanical + 13 semantic + regression checks
6. **Render-test** — stylist runs 20 structural checks + Playwright at 4 viewports
7. **Preview** — `send.js --preview` to inbox
8. **HALT** — user reviews preview, says "ship" or provides corrections
9. **Send** — manual paste OR API broadcast
10. **Analyse** — analyst day-of-send (4-6 hours after send) + day-7 reports

Each phase runs in fresh context (the orchestrator invokes a new sub-agent per phase). Halts at phase 7 for user review of preview email.

## State management

The orchestrator maintains state at `.claude/agent-memory/newsletter-orchestrator/state/{brand}-N.md` so the pipeline can resume after `/safe-clear` or context flushes.

## Examples

```
/newsletter all 002
```
Runs phases 1-7 for issue 002, halts at preview.

```
/newsletter strategy 002
```
Just runs the strategy phase — useful when you want to confirm topic before drafting.

```
/newsletter analyse 001
```
Runs day-of-send analytics on issue 001.

```
/newsletter next
```
Shows what type comes next in the rotation (e.g., "Last issue was Config (#001). Next is Command (#002).").

## Hand-off

After phase 9 (analyse), the analyst's report includes proposed updates to the brand-memory / knowledge-base. User approves before any rule changes propagate.
