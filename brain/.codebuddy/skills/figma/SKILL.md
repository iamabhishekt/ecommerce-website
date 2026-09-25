---
name: figma
description: Pull Figma screens/specs through the local open-figma-mcp bridge for pixel-exact React website polish. Use when the user gives a Figma node URL/id (e.g. "polish this screen", "check this frame") or when website UI work needs the exact design values.
argument-hint: "<nodeId|url>"
---

# Figma bridge client (DSH-native open-figma-mcp)

DeepSeek Harness has no MCP client support. This skill wraps the SAME local
open-figma-mcp bridge the other agents use, via a small Node client:

```
node brain/scripts/figma.mjs <command> [nodeId|url] [--out path]
```

Commands:

| Command | Bridge tool | Use |
|---|---|---|
| `meta` | `get_metadata` | Which Figma file is open, current page |
| `pages` | `get_pages` | Page list |
| `screenshot <id>` | `get_screenshot` | PNG of the node (default `figma-<id>.png`) |
| `design <id>` | `get_design_context` | Text spec (React/MUI hints) |
| `info <id>` | `get_node_info` | Raw node JSON |
| `raw <tool> '{json}'` | any tool | Passthrough for other tools |

Node id accepts either a bare id (`90:11401`) or a Figma URL
(`https://www.figma.com/design/<file>/...?node-id=90-11401` — the `-` is
converted to `:` automatically).

## Prerequisites

- Figma desktop app open with the target file, and the local bridge plugin
  running (`brain/tool-config/figma-plugin/`).
- The bridge process: `npx -y open-figma-mcp@latest` listening on
  `ws://127.0.0.1:18765/ws` (override with `FIGMA_MCP_WS`).

## Bridge health + recovery (mandatory before blaming Figma)

1. `lsof -iTCP:18765 -sTCP:LISTEN` — a listener must exist.
2. If the WS handshake hangs even though the port is listening, the owner is a
   STALE npx process (they wedge after days): kill every node PID holding
   18765 (`kill -9 <pid>`), start a fresh `npx -y open-figma-mcp@latest`
   (background job), then restart the plugin in Figma desktop if commands
   still time out.
3. Sanity check: `node brain/scripts/figma.mjs meta` must return file/page
   JSON and exit 0.

## Workflow for 1:1 website polish

1. User names a screen or pastes a Figma node URL/id.
2. `node brain/scripts/figma.mjs screenshot <id> --out brain/state/figma-capture/<name>.png`
   and read the image to see the design.
3. `node brain/scripts/figma.mjs design <id>` (or `info <id>`) for the exact
   node spec: bounds, padding, radius, stroke, fontSize/lineHeight, colors.
4. Compare against the current UI component; apply values numerically — the 1:1 rule: identical to Figma down to spacing and the smallest detail, no "somewhat near".
5. Follow design tokens for colors/fonts/spacing rather than hardcoded raw literals; icons use the SVGR `.svg` convention.

