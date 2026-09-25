# Deep Research Workflow

> Source: `Claude Code/bundled-skills/deep-research/SKILL.md` — stripped of Claude-specific tool names.
> Any model with web search + URL fetch + sub-agent fan-out can run this.

## When to use

The user wants a deep, multi-source, fact-checked research report on a topic — not a one-shot answer. Trigger when they say "research," "deep dive," "find out about," or ask a question that needs multiple sources to answer well.

## Phase 0 — Scope (clarify first if needed)

Before researching, check whether the question is specific enough. If underspecified, ask **2–3 clarifying questions** — never more. Good clarifications narrow scope, region, timeframe, or definition.

Bad (too vague): "what car to buy"
Good clarifications:
1. What's your budget range?
2. Primary use — city, highway, family, hauling?
3. New only, or is certified pre-owned okay?

If the question is already detailed, **do not ask** — pick reasonable defaults and note the assumption.

## Phase 1 — Decompose into search angles

Break the question into **5 independent search angles** — different framings that each surface different sources. Examples:

| Question | 5 angles |
|---|---|
| "Is X startup's growth sustainable?" | (1) X's revenue/MAU trajectory (2) competitor growth rates (3) market size / TAM (4) unit economics / burn (5) regulatory/moat risks |
| "Compare React vs Vue in 2026" | (1) benchmark perf (2) ecosystem size + hiring (3) DX + migration cost (4) long-term roadmap (5) real production case studies |

## Phase 2 — Fan-out search

Run **5 parallel searches**, one per angle. Each search:
- Uses 3–5 different query phrasings
- Targets different source types (official docs, news, benchmarks, GitHub, academic, forums)
- Returns the top 10 URLs per angle

If you have sub-agent capability, dispatch one agent per angle. If not, run searches sequentially but keep them independent (don't let angle 2's results bias angle 3's queries).

## Phase 3 — Fetch + extract claims

1. **URL-dedup** across all 50 results → keep top 15 unique sources by relevance + authority.
2. **Fetch** each source's full content.
3. **Extract falsifiable claims** — each claim must be checkable: "X grew 40% YoY in 2025" (checkable), not "X is doing well" (vague).
4. Tag each claim with its source URL + quote.

## Phase 4 — Adversarial verify (the part that separates research from summarizing)

For each surviving claim, run **3-vote adversarial verification**:

1. **Prover vote** — argue the claim is true, find supporting evidence.
2. **Refuter vote** — argue the claim is false, find contradicting evidence or source bias.
3. **Judge vote** — weigh both, mark CONFIRMED / PLAUSIBLE / REFUTED.

- Need **2/3 refutes to kill** a claim (recall-biased — keep borderline claims).
- REFUTED only when: factually wrong (cite the actual source), provably impossible (show the invariant), or the source is unreliable (bias, no citations, AI-generated).
- PLAUSIBLE by default for anything that could be true on a realistic path.

Keep CONFIRMED and PLAUSIBLE. Drop REFUTED.

## Phase 5 — Synthesize

1. **Merge semantic duplicates** — "X grew 40%" from source A and "X's YoY growth was 40%" from source B are one claim.
2. **Rank by confidence** — CONFIRMED first, then PLAUSIBLE, then uncertain.
3. **Cite every claim** — `[source-name](url)`. No uncited claims in the final report.
4. **Flag uncertainty** — for PLAUSIBLE claims, state what would confirm/deny them.
5. **Structure the report**:
   - TL;DR (3 sentences)
   - Key findings (ranked, each with citation)
   - Methodology (briefly: angles searched, sources fetched, claims verified)
   - Open questions / what to research next

## Tools needed (map to whatever your agent has)

- Web search (any)
- URL fetch / page reader
- Sub-agent fan-out (optional — sequential works, just slower)
- Long-context synthesis (the final report merges 15+ sources)

## What makes this different from "just search"

- **Adversarial verification** — most "research" agents summarize the top 5 results. This one tries to *break* each claim before including it.
- **Fan-out, not serial** — 5 angles in parallel catches sources a single query misses.
- **Citations are mandatory** — no claim without a source. Hallucinated citations = report failure.
