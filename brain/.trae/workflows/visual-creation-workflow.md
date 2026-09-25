# Visual Creation Workflow

> Source: `visualize.md` — diagrams, mockups, interactive widgets, charts, art.
> Any model that can write SVG/HTML can run this. The design tokens here are Claude-specific (`--color-text-primary`, `c-blue` classes) — swap them for your target environment's tokens.

## When to use

The user wants a visual: a diagram (flowchart, structural, illustrative), a UI mockup, an interactive explainer, a chart, or illustration/art. Pick the right module:

| Module | When |
|---|---|
| `diagram` | SVG flowcharts, structural diagrams, illustrative diagrams |
| `mockup` | UI mockups, forms, cards, dashboards |
| `interactive` | Interactive explainers with controls |
| `chart` | Charts and data analysis |
| `art` | Illustration and generative art |

## Pick the right diagram type — route on the verb, not the noun

| User says | Type | What to draw |
|---|---|---|
| "how do LLMs work" | **Illustrative** | Spatial metaphor: stacked layers, attention threads glowing |
| "transformer architecture" | Structural | Labelled boxes: embedding, attention heads, FFN |
| "how does attention work" | **Illustrative** | One query token, fan of lines, opacity = weight |
| "what are the training steps" | Flowchart | Forward → loss → backward → update (boxes + arrows) |
| "explain the Krebs cycle" / "how does the event loop work" | **HTML stepper** | Click through stages. Never a ring. |
| "draw the database schema" / "show me the ERD" | **mermaid.js** | `erDiagram` syntax. Not SVG. |

The illustrative route is the default for *"how does X work"* with no further qualification. Don't chicken out into a flowchart because it feels safer.

## Core design rules (apply to ALL visuals)

### Philosophy
- **Seamless** — output should feel native to its host
- **Flat** — no gradients, mesh backgrounds, noise textures, decorative effects (exception: one gradient permitted for continuous physical properties in illustrative diagrams)
- **Compact** — show the essential inline, explain the rest in text
- **Text goes in your response, visuals go in the tool** — never put paragraphs of explanation inside the SVG/HTML

### Streaming (if output streams token-by-token)
- HTML: `<style>` (short) → content HTML → `<script>` last
- SVG: `<defs>` (markers) → visual elements immediately
- Prefer inline `style="..."` over `<style>` blocks — inputs must look correct mid-stream
- Keep `<style>` under ~15 lines
- Gradients/shadows/blur flash during streaming diffs → use solid flat fills instead

### Hard rules
- No HTML comments or CSS comments (waste tokens, break streaming)
- No font-size below 11px
- No emoji — use CSS shapes or SVG paths
- No gradients, drop shadows, blur, glow, neon (illustrative exception above)
- No dark/colored backgrounds on outer containers (transparent only — host provides bg)
- Sentence case always. Never Title Case, never ALL CAPS.
- No mid-sentence bolding. Entity names → `code style`, not **bold**.
- Two font weights only: 400 regular, 500 bold. Never 600/700.

## SVG setup (load-bearing — do not change)

```svg
<svg width="100%" viewBox="0 0 680 H">
```
- **680px wide** is the container width — coordinate units render 1:1 with CSS pixels
- Set H to fit content tightly — last element's bottom edge + 20px
- Safe area: x=40 to x=640, y=40 to y=(H-40)
- Background transparent. **Do not wrap SVG in a container div** — output raw `<svg>`.

### ViewBox safety checklist
1. Find lowest element: max(y + height) across rects, max(y) across text baselines
2. Set viewBox height = that value + 20px (not 40)
3. Rightmost element: max(x + width). All content stays within x=0 to x=680
4. For `text-anchor="end"`: text extends LEFT from x — check it doesn't go past x=0
5. Never use negative x or y coordinates
6. Flowcharts: for boxes in the same row, left box's (x + width) < right box's x by ≥20px

### Pre-built classes (swap for your environment's tokens)
- `class="t"` = 14px primary text
- `class="ts"` = 12px secondary text
- `class="th"` = 14px medium (500) heading
- `class="box"` = neutral rect
- `class="node"` = clickable group with hover
- `class="arr"` = arrow line (1.5px, open chevron head)
- `class="c-{ramp}"` = colored node (c-blue, c-teal, c-amber, c-green, c-red, c-purple, c-coral, c-pink, c-gray) — sets fill+stroke on shapes, auto-adjusts child text, dark mode automatic

### Arrow marker (include at start of every SVG)
```svg
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </marker>
</defs>
```
Then `marker-end="url(#arrow)"` on lines. The head uses `context-stroke`, so it inherits the line's color.

## Two rules that cause most diagram failures

1. **Arrow intersection check** — before writing any `<line>`/`<path>`, trace coordinates against every placed box. If the line crosses a rect's interior (not just source/target), it slashes through that box → use an L-shaped `<path>` detour.
2. **Box width from longest label** — `rect_width = max(title_chars × 8, subtitle_chars × 7) + 24`. A 100px box holds at most a 10-char subtitle.

## Tier packing (compute before placing)

- 4 pub/sub consumer boxes:
  - WRONG: x=40,160,260,360 w=160 → 40-60px overlaps (4×160=640 > 480 available)
  - RIGHT: x=50,200,350,500 w=130 gap=20 → fits (4×130 + 3×20 = 580 ≤ 590)
- Work bottom-up for trees: size leaf tier first, parent width ≥ sum of children

## Complexity budget — hard limits

- Box subtitles: ≤5 words. Detail goes in click-through or prose below — not the box.
- Colors: ≤2 ramps per diagram. If colors encode meaning (states, tiers), add a 1-line legend. Otherwise one neutral ramp.
- Horizontal tier: ≤4 boxes at full width (~140px each). 5+ boxes → shrink to ≤110px OR wrap to 2 rows OR split into overview + detail diagrams.
- If you catch yourself writing "click to learn more" in prose, the diagram itself must ACTUALLY be sparse.

## Color assignment (encode meaning, not sequence)

Don't cycle through colors like a rainbow. Instead:
- Group nodes by **category** — same type shares one color (immune cells = purple, pathogens = coral, outcomes = teal)
- For illustrative diagrams, map colors to **physical properties** — warm = heat/energy, cool = cold/calm, green = organic, gray = structural
- Use **gray for neutral/structural** nodes (start, end, generic steps)
- **2-3 colors per diagram**, not 6+
- Prefer purple, teal, coral, pink for general categories. Reserve blue/green/amber/red for genuine informational/success/warning/error semantics.

## Dark mode is mandatory

- Every color must work in both modes
- SVG: use pre-built color classes (`c-blue`, `c-teal`, etc.) — they handle light/dark automatically
- HTML: always use CSS variables for text — never hardcode `color: #333` (invisible in dark)
- Mental test: if the background were near-black, would every text element still be readable?

## Text on colored backgrounds

- Always use the darkest shade from the same ramp for text — never black/gray on colored fills
- When a box has title + subtitle, they must be **two different stops** — title darker (800 in light / 100 in dark), subtitle lighter (600 in light / 200 in dark). Same stop reads flat.

## One SVG per call

Each output must contain exactly one `<svg>`. Never leave an abandoned/partial SVG. If your first attempt has problems, replace it entirely — do not append a corrected version.

## Diagram-type-specific rules

### Flowchart (sequential processes)
- Single-direction flows (all top-down or all left-right)
- Max 4-5 nodes per diagram (widget is narrow ~680px)
- 60px minimum between boxes, 24px padding inside, 12px text-to-edge
- Cycles don't get drawn as rings → build a stepper in HTML instead
- Feedback loops in linear flows: small `↻ returns to start` glyph, not a traversing arrow

### Structural diagram (containment)
- Outer container: large rounded rect, rx=20-24, lightest fill, 0.5px stroke, label top-left
- Inner regions: rx=8-12, next shade, different ramp if semantically different
- 20px minimum padding inside every container
- Max 2-3 nesting levels

### Illustrative diagram (intuition — most ambitious type)
- Physical subjects → cross-sections/cutaways/schematics
- Abstract subjects → spatial metaphors (transformer = stacked slabs, hash = funnel, call stack = stack of frames)
- **Prefer interactive over static** — if the real system has a control, give the diagram that control
- Color encodes intensity, not category (warm = active, cool = dormant)
- Layering/overlap encouraged for shapes — never let a stroke cross text (8px clear air)
- One gradient permitted — only for continuous physical property across a region

## When the prompt is over budget

If the user lists 6+ components ("draw auth, products, orders, payments, gateway, queue"):
1. Don't draw all in one pass — overlapping boxes guaranteed
2. Decompose: stripped overview (boxes only, 1-2 arrows) → one diagram per interesting sub-flow
3. Count the nouns before you draw — give completeness across several diagrams, not crammed into one

## Always add prose between diagrams

Never stack multiple SVG/HTML outputs back-to-back without text. Between each, write a short paragraph (in your response text, outside the tool call) explaining what the next diagram shows.

## Promise only what you deliver

If your response text says "here are three diagrams," include all three. Never promise a follow-up and omit it. One complete diagram > three promised and one delivered.
