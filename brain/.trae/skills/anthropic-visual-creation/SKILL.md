---
name: anthropic-visual-creation
description: "Create SVG diagrams, HTML widgets, interactive explainers, charts, or art. Model-agnostic design rules — any model that writes SVG/HTML can follow. Routes on the verb (how/what/explain) to pick diagram type (flowchart/structural/illustrative/stepper/ERD). Includes SVG setup, viewBox safety, color assignment, complexity budget. Source: ~/Prompts/Anthropic/workflows/visual-creation-workflow.md"
---

# Anthropic Visual Creation

Read and follow: `~/Prompts/Anthropic/workflows/visual-creation-workflow.md`

Routes on the verb, not the noun:
- "how does X work" → illustrative diagram (spatial metaphor)
- "transformer architecture" → structural diagram (labelled boxes)
- "what are the steps" → flowchart
- "explain the cycle/event loop" → HTML stepper (never a ring)
- "draw the schema/ERD" → mermaid.js

Includes: SVG setup (viewBox 680px), pre-built classes, arrow marker, complexity budget, color assignment rules, dark mode requirements.

Tools needed: SVG/HTML output, optional mermaid.js for ERDs.
