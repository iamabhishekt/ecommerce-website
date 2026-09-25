---
name: anthropic-design-artifact
description: "Build a design artifact (HTML, slide, mockup, React component, prototype) in a filesystem project. Model-agnostic workflow — any model with file-write + browser-preview can follow. Includes small-change discipline (change ONLY what's asked), canonical HTML rules, color usage. Use when creating design artifacts. Source: ~/Prompts/Anthropic/workflows/design-artifact-workflow.md"
---

# Anthropic Design Artifact

Read and follow: `~/Prompts/Anthropic/workflows/design-artifact-workflow.md`

6-step workflow:
1. Understand user needs (clarify for new/ambiguous work)
2. Explore provided resources (read design system, copy needed assets — don't reference directly)
3. Make a todo list
4. Build folder structure + create deliverable
5. Finish: verify it loads cleanly, surface to user
6. Summarize briefly — caveats and next steps only

Key discipline: **small changes stay small.** When asked for a small targeted change, change ONLY that — don't redesign or "improve" parts you weren't asked to touch. If a broader change would help, finish what they asked first, then suggest the rest.

Tools needed: file write, browser preview (optional).
