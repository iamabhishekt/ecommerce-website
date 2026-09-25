---
name: anthropic-code-review
description: "Review a diff for correctness bugs + cleanup at any effort level (low/medium/high/xhigh/max). Model-agnostic workflow — any model with git + grep + file-read can follow it. Runs 8 finder angles (line-by-line, removed-behavior, cross-file, reuse, simplification, efficiency, altitude, conventions), verifies, outputs ranked JSON findings. Use when the user wants a code review or PR review. Source: ~/Prompts/Anthropic/workflows/code-review-workflow.md"
---

# Anthropic Code Review

Read and follow: `~/Prompts/Anthropic/workflows/code-review-workflow.md`

That file contains the full multi-angle diff review workflow:
1. Gather the diff (`git diff @{upstream}...HEAD`)
2. Run 8 finder angles (up to 6 candidates each)
3. Verify (1-vote, recall-biased — PLAUSIBLE by default)
4. Output ranked JSON (≤10 findings, most-severe first)

Effort levels: low / medium / high (default) / xhigh / max — adjust candidate counts and output cap.

Tools needed: git diff, file read, grep, sub-agent fan-out (optional at higher efforts).
