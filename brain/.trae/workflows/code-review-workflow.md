# Code Review Workflow

> Source: `Claude Code/bundled-skills/code-review/high.md` — the multi-angle diff review process.
> Any model with git, file-read, and grep can run this. Works at any effort level — adjust candidate counts.

## When to use

Review a diff (PR, branch, working-tree changes) for **correctness bugs + cleanup**. Produces a ranked list of findings with file, line, summary, and a concrete failure scenario.

## Phase 0 — Gather the diff

```bash
git diff @{upstream}...HEAD         # the range under review
# fallbacks:
git diff main...HEAD
git diff HEAD~1
git diff HEAD                       # include uncommitted changes
```

If a PR number / branch / file path was given, scope to that. **The diff is the review scope** — don't review the whole codebase.

## Phase 1 — Finder angles (run independently, up to N candidates each)

Run **8 independent finder passes** over the diff. Each surfaces up to 6 candidates with: `file`, `line`, one-line `summary`, concrete `failure_scenario`.

### Correctness angles (hunt for bugs)

**A — Line-by-line diff scan**
Read every hunk line by line. Then read the enclosing function — bugs in unchanged lines of a touched function are in scope. For every line ask: *what input, state, timing, or platform makes this wrong?* Look for: inverted conditions, off-by-one, null/undefined deref, missing `await`, falsy-zero checks, wrong-variable copy-paste, swallowed errors, unescaped regex metachars.

**B — Removed-behavior auditor**
For every line the diff DELETES/replaces: name the invariant it enforced, then find where the new code re-establishes it. If you can't find it → candidate. (Removed guard, dropped error path, narrowed validation, deleted covering test.)

**C — Cross-file tracer**
For each changed function: find its callers (grep the symbol), check whether the change breaks any call site — new precondition, changed return shape, new exception, timing/ordering dependency. Also check callees: does a parallel change in the same PR make a call unsafe?

### Cleanup angles (hunt for maintenance debt)

**Reuse** — flag new code re-implementing something the codebase already has. Grep shared/utility modules; name the existing helper to call instead.

**Simplification** — flag unnecessary complexity the diff adds: redundant/derivable state, copy-paste with slight variation, deep nesting, dead code. Name the simpler form.

**Efficiency** — flag wasted work: redundant computation, repeated I/O, sequential-when-independent, blocking work added to startup/hot paths. Also: long-lived closures capturing large scopes (memory leak). Name the cheaper alternative.

### Structural angles

**Altitude** — is each change at the right depth? Special cases layered on shared infra = bandaid. Prefer generalizing the underlying mechanism over adding special cases.

**Conventions** — read any `CLAUDE.md` / `AGENTS.md` / lint config / contributing guide that governs the changed code. Only flag a violation when you can **quote the exact rule and the exact line that breaks it** — no vague "spirit of the doc." Name the rule file + quote it.

**Pass through every candidate with a nameable failure scenario.** Finders that silently drop "half-believed" candidates bypass verification and are the dominant cause of misses.

## Phase 2 — Verify (1-vote, recall-biased)

Dedup near-duplicates (same defect, same location, same reason → keep one). For each remaining candidate, run **one verifier**:

Give it: the diff, the relevant file(s), the candidate. It returns exactly one of:

- **CONFIRMED** — the bug is real, reproducible.
- **PLAUSIBLE** — could be real on a realistic path: concurrency race, nil on rare-but-reachable path (error handler, cold cache, missing optional field), falsy-zero, off-by-one on an unexcluded boundary, retry storms / partial failures, regex/allowlist that lost an anchor.
- **REFUTED** — only when constructible from the code: factually wrong (quote the actual line), provably impossible (show the type/constant/invariant), already handled in this diff (cite the guard), or pure style with no observable effect.

**PLAUSIBLE by default.** Don't refute for being "speculative" or "depends on runtime state" when the state is realistic.

Keep CONFIRMED + PLAUSIBLE. Drop REFUTED.

## Phase 3 — Output

Return findings as a ranked JSON array (most-severe first), capped at 10:

```json
[
  {
    "file": "path/to/file.ext",
    "line": 123,
    "summary": "one-sentence statement of the bug",
    "failure_scenario": "concrete inputs/state → wrong output/crash",
    "severity": "correctness|cleanup|altitude|conventions"
  }
]
```

Correctness findings always outrank cleanup/altitude/conventions when the cap forces a cut. If nothing survives, return `[]`.

## Effort levels (adjust to taste)

| Level | Finder angles | Candidates each | Verifier | Output cap |
|---|---|---|---|---|
| low | 1 (line-by-line only) | 4 | none | ≤4 |
| medium | 8 | 6 | 1-vote, precision-tuned | ≤8 |
| high (default) | 8 | 6 | 1-vote, recall-biased | ≤10 |
| xhigh | 10 (+ language-pitfall + wrapper/proxy) | 8 | verify + gap-sweep | ≤15 |
| max | same as xhigh | 8 | verify + gap-sweep | ≤15 |

## Tools needed

- `git diff` (or equivalent PR-diff fetch)
- File read (enclosing functions, callers)
- Grep (symbol search for cross-file tracing)
- Sub-agent fan-out (optional — sequential works at lower effort levels)
