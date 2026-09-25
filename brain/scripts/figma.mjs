#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const WS_URL = process.env.FIGMA_MCP_WS || 'ws://127.0.0.1:18765/ws';
const pending = new Map();
let counter = 0;
let ws;

function connect() {
  return new Promise((res, rej) => {
    ws = new WebSocket(WS_URL);
    const timer = setTimeout(() => rej(new Error(`bridge connect timeout to ${WS_URL}`)), 10000);
    ws.onopen = () => {
      clearTimeout(timer);
      ws.send(JSON.stringify({ type: 'register', role: 'mcp_peer' }));
      res();
    };
    ws.onerror = () => {
      clearTimeout(timer);
      rej(new Error(`bridge connect failed to ${WS_URL} — is the open-figma-mcp bridge running? (npx -y open-figma-mcp@latest)`));
    };
    ws.onmessage = (evt) => {
      let msg;
      try { msg = JSON.parse(String(evt.data)); } catch { return; }
      if (!msg.id) return;
      const p = pending.get(msg.id);
      if (!p) return;
      pending.delete(msg.id);
      clearTimeout(p.timer);
      if (msg.ok) p.resolve(msg.result);
      else p.reject(new Error(msg.error || 'command failed'));
    };
  });
}

function request(command, params = {}, timeoutMs = 60000) {
  const id = `figma-${process.pid}-${++counter}`;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`timeout waiting for ${command}`));
    }, timeoutMs);
    pending.set(id, { resolve, reject, timer });
    ws.send(JSON.stringify({ id, command, params }));
  });
}

function nodeIdFrom(input) {
  if (!input) return null;
  const urlMatch = String(input).match(/node-id=([\d]+-[\d]+)/);
  if (urlMatch) return urlMatch[1];
  return String(input);
}

function extractImageB64(result) {
  if (Array.isArray(result?.exports)) {
    const img = result.exports.find((e) => e?.base64);
    if (img) return img.base64;
  }
  if (Array.isArray(result?.content)) {
    const img = result.content.find((c) => c?.type === 'image' && c?.data);
    if (img) return img.data;
  }
  return null;
}

function extractText(result) {
  if (typeof result === 'string') return result;
  return JSON.stringify(result, null, 2);
}

const usage = `usage: node brain/scripts/figma.mjs <command> [nodeId|url] [--out path] [json params]

commands (aliases over the open-figma-mcp bridge tools):
  meta                        get_metadata — file + plugin info
  pages                       get_pages — page list
  screenshot <nodeId|url>     get_screenshot → PNG file (default: figma-<nodeId>.png)
  design <nodeId|url>         get_design_context → text spec (React/MUI hints)
  info <nodeId|url>           get_node_info → raw node JSON
  raw <command> [json]        any bridge command, params from JSON string
Example: node brain/scripts/figma.mjs screenshot 90:11401 --out /tmp/figma.png`;

const [, , rawCmd, rawArg, ...rest] = process.argv;
const cmd = rawCmd === '--help' || rawCmd === '-h' || !rawCmd ? null : rawCmd;
if (!cmd) {
  console.log(usage);
  process.exit(0);
}

const outIdx = rest.indexOf('--out');
const outPath = outIdx >= 0 ? rest[outIdx + 1] : null;
const rawParamsJson = rest.find((a, i) => a !== '--out' && (outIdx < 0 || i !== outIdx + 1) && a.startsWith('{'));

let command = cmd;
let params = {};
if (cmd === 'screenshot') { command = 'get_screenshot'; params = { nodeId: nodeIdFrom(rawArg) }; }
else if (cmd === 'design') { command = 'get_design_context'; params = { nodeId: nodeIdFrom(rawArg), clientLanguages: 'typescript', clientFrameworks: 'react,mui' }; }
else if (cmd === 'info') { command = 'get_node_info'; params = { nodeId: nodeIdFrom(rawArg) }; }
else if (cmd === 'meta') { command = 'get_metadata'; }
else if (cmd === 'pages') { command = 'get_pages'; }
else if (cmd === 'raw') {
  command = rawArg;
  params = rawParamsJson ? JSON.parse(rawParamsJson) : {};
} else {
  console.log(usage);
  process.exit(2);
}

try {
  await connect();
  const result = await request(command, params);
  if (cmd === 'screenshot') {
    const b64 = extractImageB64(result);
    if (!b64) {
      console.error('get_screenshot returned no image exports:', extractText(result));
      process.exit(1);
    }
    const target = resolve(outPath || `figma-${String(params.nodeId).replace(':', '-')}.png`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, Buffer.from(b64, 'base64'));
    console.log(`saved ${target}`);
  } else {
    console.log(extractText(result));
  }
  try { ws.close(); } catch {}
  process.exit(0);
} catch (e) {
  console.error('FIGMA BRIDGE ERROR:', e.message);
  console.error('Recovery: kill stale node PIDs on 18765, run `npx -y open-figma-mcp@latest`, restart the plugin in Figma desktop.');
  process.exit(1);
}
