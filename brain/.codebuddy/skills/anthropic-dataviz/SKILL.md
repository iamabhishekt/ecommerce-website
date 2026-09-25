---
name: anthropic-dataviz
description: "Create any chart, graph, plot, dashboard, or data visualization with a designed-system method. Model-agnostic — any model that writes HTML/SVG/plotting code can follow it. 7-step procedure: pick form → assign color by job → validate palette → mark specs → hover layer → accessibility → render. Use before writing chart code or picking chart colors. Source: ~/Prompts/Anthropic/workflows/dataviz-workflow.md"
---

# Anthropic Data Visualization

Read and follow: `~/Prompts/Anthropic/workflows/dataviz-workflow.md`

Core principle: **color comes LAST.** The form picks the chart type; the data's job picks the color assignment; validation is computed, not eyeballed.

7-step procedure:
1. Pick the form (magnitude/identity/polarity/time/part-of-whole/distribution/correlation/headline)
2. Assign color by job (categorical/sequential/diverging/status)
3. Validate the palette (compute, don't reason about ΔE)
4. Apply mark specs & spacers
5. Add hover layer by default
6. Accessibility pass
7. Render and look at it

Tools needed: chart library or SVG/HTML, optional palette validator script.
