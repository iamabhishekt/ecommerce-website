# Data Visualization Workflow

> Source: `Claude Code/bundled-skills/dataviz/SKILL.md` — design-system-agnostic chart creation.
> Any model that can write HTML/SVG/plotting code can run this.

## When to use

Before writing the first line of chart code, picking chart colors, building a stat tile / KPI row, or laying out a dashboard. Applies to ANY output medium: HTML, React, inline SVG, matplotlib, plotly, d3, Recharts, PNG.

## Core principle

**Color comes LAST.** Most bad charts pick colors first. The form picks the chart type; the data's job picks the color assignment; validation is computed, not eyeballed.

## The procedure — do these in order

### 1. Pick the form

What is the data's job?

| Job | Form |
|---|---|
| Magnitude (how big is X?) | Bar, sorted |
| Identity (which is which?) | Categorical bar, dot plot |
| Polarity (good↔bad, +↔−) | Diverging bar, diverging stacked |
| Change over time | Line, area (one series); small multiples (many) |
| Part-of-whole | Stacked bar (not pie if >3 parts) |
| Distribution | Histogram, box, violin |
| Correlation | Scatter, heatmap |
| Single headline number | **Stat tile / hero number — NOT a chart** |

Sometimes the answer is *not a chart*. A stat tile or a table is the right answer. Don't force a chart when a number + sentence does the job.

### 2. Assign color by the job it does

| Color job | Rule |
|---|---|
| **Categorical** (identity) | Fixed hue order, never cycled. A 9th series folds into "Other" / small multiples — never a generated hue. |
| **Sequential** (magnitude) | One hue, light→dark. Never a rainbow. |
| **Diverging** (polarity) | Two hues + neutral gray midpoint. Never a hue at the midpoint. |
| **Status** (state) | Reserved semantic palette (good/warning/serious/critical) + icon + label. Never reused for "series 4." |

### 3. VALIDATE the palette — compute it, don't reason about ΔE

If you have a script runner, run a CVD/contrast validator on the palette. Checks:
- Lightness band (categorical hues should sit in a similar lightness band)
- Chroma floor (no mud)
- Adjacent-pair CVD separation (colorblind-safe)
- Contrast vs surface

Target: CVD separation ≥ 12. Floor 8–12 is legal ONLY with secondary encoding (label/texture). A contrast WARN obligates visible labels or a table view — not dismissable.

If no validator available: pick hues from a known colorblind-safe palette (Okabe-Ito, Tableau 10) and add secondary encoding (direct labels) for any 2-series chart.

### 4. Apply mark specs & spacers

- Thin marks (not fat bars)
- 4px rounded data-ends anchored to baseline
- 2px line weight for series
- ≥8px markers
- **2px surface gap** between fills (stacked segments + adjacent bars alike)
- 2px surface ring on overlapping marks
- Selective direct labels (not every point)

### 5. Add the hover layer — by default

An interactive chart *is* interactive; ship it:
- Line/area → crosshair + tooltip
- Bar/dot/cell → per-mark hover tooltip
- Filters in one row ABOVE the charts (not below, not in a sidebar)

The only form that skips hover: a bare stat tile with no plot.

### 6. Final accessibility pass

- For ≥2 series: legend always present, ≤4 also direct-labeled. One series → no legend box (the title names it).
- Identity is never color-alone — always label + color.
- A table view exists (the chart is a view of the table, not the only representation).
- Dark mode is **selected** — its own steps from the same ramps, validated against the dark surface. Not an automatic invert.
- Texture available for CVD/print/forced-colors case.

### 7. Render it and look at it

The validator checks color, not layout. Open or screenshot the output and eyeball:
- Label collisions
- Geometry (bars aligned, axes right)
- Overflow (text spilling out of boxes)

## Non-negotiables (true in every design system)

- **Assign categorical hues in fixed order, never cycled.**
- **One axis.** Never a dual-axis chart (two y-scales) — #1 chart mistake. Two measures of different scale → two charts, small multiples, or index to a common base.
- **Color follows the entity, never its rank.** A filter that changes series count must not repaint the survivors.
- **Sequential = one hue, light→dark. Diverging = two hues + neutral midpoint.** Never rainbow; never hue at diverging midpoint.
- **Run the validator before shipping any categorical palette.**
- **Text wears text tokens, never the series color** — values, labels, legends stay in primary/secondary/muted ink. A colored mark beside them carries identity.
- **Status colors are reserved** and never reused for "series 4"; they ship with icon + label, never color alone.

## Plugging in a design system

The method is invariant. Only these parameters change per system:

| Parameter | What the system provides |
|---|---|
| Ramps | hue scales (named steps) |
| Categorical theme | fixed hue order |
| Sequential hue | default single hue for magnitude |
| Diverging pair | warm/cool poles + neutral midpoint |
| Status palette | good/warning/serious/critical |
| Texture fill | one directional hand-drawn fill |
| Surfaces | light & dark chart-surface colors |
| Filter controls | date-range + dimension controls |

To onboard a new system: fill those rows, feed its ramps to the validator, let it snap each slot to the nearest passing step.

## Anti-patterns to check against

After step 7, scan the result against this catalog (full version in source):
- Dual-axis chart → split into two charts
- Pie with >3 slices → stacked bar or tree map
- Rainbow sequential → single hue ramp
- 3D bars → 2D bars
- No legend with ≥2 series → add legend
- Color-alone identity → add labels
- Every point labeled → label only endpoints + extremes
- Fat marks → thin marks + 2px gap
