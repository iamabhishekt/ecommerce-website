---
name: anthropic-deep-research
description: "Run a deep, multi-source, fact-checked research report on any topic. Model-agnostic workflow — any model with web search + URL fetch can follow it. Decomposes into 5 search angles, fans out, fetches sources, adversarially verifies claims (3-vote), synthesizes a cited report. Use when the user wants research, a deep dive, or a cited report. Source: ~/Prompts/Anthropic/workflows/deep-research-workflow.md"
---

# Anthropic Deep Research

Read and follow: `~/Prompts/Anthropic/workflows/deep-research-workflow.md`

That file contains the full 5-phase model-agnostic workflow:
1. Scope (clarify if underspecified, max 3 questions)
2. Decompose into 5 search angles
3. Fan-out search (5 parallel searches)
4. Fetch + extract falsifiable claims
5. Adversarial verify (3-vote: prover/refuter/judge) → synthesize cited report

Tools needed: web search, URL fetch, sub-agent fan-out (optional), long-context synthesis.
