# /content [brand] [topic]

Full content production pipeline: strategy → draft → audit → ship-ready output.

## When to use

- You want a complete content piece with strategist's brief + creator's draft + auditor's verdict, end-to-end
- You're producing for a brand with an established brand-memory file
- You want the agent to handle topic selection (no topic argument) OR you're providing a topic explicitly

## Procedure

### Step 1 — Orient

Read `.claude/agent-memory/content-creator/brand-memories/{brand}.md` to confirm:
- Brand-memory exists
- Voice anchors are populated (3+ calibration pairs)
- ICP is defined

If brand-memory missing: HALT and instruct user to run `/brand-memory create {brand}` first.

If no brand specified: default to the most-recently-active brand from `memory.md`.

### Step 2 — Strategy (if no topic provided)

If user provided a topic in the command: skip strategy phase, go directly to draft.

If no topic: invoke the `content-strategist` agent via Task tool with `subagent_type: content-strategist`. Pass:
- Brand
- Target platform mix (default: per `CLAUDE.local.md` Platforms list)
- Target ship date (default: today)

Receive: brief at `.claude/agent-memory/content-strategist/briefs/{brand}-{date}-brief.md`.

### Step 3 — Draft

Invoke the `content-creator` agent via Task tool with `subagent_type: content-creator`. Pass:
- Brand
- Brief path (or inline topic if user provided)
- Target platform(s)

Receive: draft + self-check verdict.

### Step 4 — Audit

Invoke the `auditor` agent via Task tool with `subagent_type: auditor`. Pass:
- Draft path
- Brand context

Receive: PASS / FAIL verdict with structured fixes.

If FAIL:
- Print fix list
- Halt — user decides whether to apply fixes via creator round-trip OR ship-with-warnings

If PASS: continue to Step 5.

### Step 5 — Distribution (if applicable)

If the piece is long-form (blog, newsletter, video script): generate 3-5 short-form derivatives.

For each derivative: re-run Steps 3-4 (draft → audit) at smaller scope.

### Step 6 — Output

Surface to user:
- Final draft(s) ready to publish
- Auditor verdict
- Distribution derivatives generated
- Recommended next step (preview / publish / iterate)

## Hand-off

`/content` does NOT publish. After verdict PASS, user manually publishes via:
- `/post {platform}` for re-render to a specific platform
- Manual paste to platform UI
- API send (if platform integration exists)

The system tracks shipped pieces via `/feedback` — fires automatically after the user gives a verdict.

## Examples

```
/content claudify "How I shipped a self-improving CLAUDE.md"
```
Drafts a piece for the claudify brand on the specified topic.

```
/content claudify
```
No topic — strategist picks based on backlog + brand history + current trends.

```
/content @wearehyad twitter "AI agency 2026 outlook"
```
Drafts a piece for the @wearehyad brand specifically for Twitter, on the given topic.
