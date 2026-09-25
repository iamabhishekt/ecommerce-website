# /blog [topic-or-keyword]

Long-form blog post production, SEO-aware if Claudify SEO Specialist is also installed.

## When to use

- Long-form content (800-2000+ words)
- Topic with informational or commercial intent
- You want SEO targeting (when SEO Specialist is present, this command integrates with keyword-strategist)

## Procedure

### Step 1 — Parse arguments

```
/blog "topic here"              # informational, no specific keyword
/blog "target keyword"          # SEO-targeted (informational/commercial intent inferred)
/blog                           # no args — strategist picks based on backlog
```

### Step 2 — Strategy (if no topic OR if SEO targeting needed)

If SEO Specialist is installed:
- Invoke `seo-agent` (from SEO Specialist) for keyword research / cannibalization check
- Receive: target keyword, search intent classification, content depth recommendation, competitor coverage gaps

If SEO Specialist not installed:
- Skip SEO research
- Apply general blogging best-practices from `.claude/knowledge-base.md`

### Step 3 — Brief

If no brief from strategist: invoke `content-strategist` agent for a complete brief.

Brief includes:
- Target keyword (if applicable)
- Search intent
- Required H2 subtopics (informational depth match)
- Word count target
- Internal linking opportunities (from SEO agent if present)

### Step 4 — Draft

Invoke `content-creator` agent with mode: long-form blog.

Creator follows blog structure rules:
- H1 = target keyword variant, 50-70 chars (matches title tag if SEO)
- Intro: hook (specific moment / pattern / claim) + scope statement (what this post covers)
- Body: 4-8 H2 sections with 1-2 H3 subsections each
- Internal links: minimum 1 per 300 words, descriptive anchor text
- Code blocks (if technical): runnable as-is, no placeholders
- Conclusion: payoff / next step / CTA — NOT "in conclusion" (banned)
- Meta description: 150-160 chars, target keyword + clear CTA

### Step 5 — Audit

Invoke auditor + (if SEO Specialist) seo-agent:
- Auditor: voice / format / anti-slop checks
- SEO agent (if present): on-page SEO score, keyword density, cannibalization re-check

### Step 6 — Output

Print:
- Final blog post (markdown or HTML per user preference)
- Audit verdict
- SEO score (if applicable)
- Distribution derivatives suggested (X thread, LinkedIn post, newsletter teaser)

## Hand-off

`/blog` produces the post; you publish to your blog platform manually. Next response triggers `/feedback`.

## Examples

```
/blog "How to set up a self-improving CLAUDE.md"
```
Drafts a long-form blog on the topic.

```
/blog "claude code workflow"
```
SEO-targeted (if SEO Specialist installed) — keyword-strategist confirms target intent + cannibalization, creator drafts.

```
/blog
```
Strategist picks topic from backlog + brand history.
