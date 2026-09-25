#!/usr/bin/env bash
# ==============================================================================
# setup-new-pc.sh — Workspace Brain Onboarding & Symlink Provisioner
# ==============================================================================
# Use this script when setting up a new PC or syncing brain to another machine.
# Cloned path: <WORKSPACE_ROOT>/brain
# Run: cd brain && bash scripts/setup-new-pc.sh
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRAIN_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKSPACE_ROOT="$(cd "${BRAIN_DIR}/.." && pwd)"

echo "========================================================"
echo " Workspace Brain Setup for New PC / Multi-Machine Sync"
echo "========================================================"
echo "Brain Directory:  ${BRAIN_DIR}"
echo "Workspace Root:   ${WORKSPACE_ROOT}"
echo "--------------------------------------------------------"

# 1. Verify Prerequisites
echo "[1/3] Checking prerequisites..."
check_cmd() {
  if command -v "$1" >/dev/null 2>&1; then
    echo "  ✓ $1 is installed ($($1 --version 2>&1 | head -n 1))"
  else
    echo "  ⚠ $1 is NOT installed. ($2)"
  fi
}

check_cmd "git" "Required for version control"
check_cmd "node" "Required for JS tools & MCP servers"
check_cmd "jq" "Required for Claudify safety hooks (apt install jq / brew install jq)"
check_cmd "claude" "Claude Code CLI (curl -fsSL https://claude.ai/install.sh | bash)"

# 2. Provision Discovery Symlinks in Workspace Root
echo ""
echo "[2/3] Provisioning discovery symlinks in workspace root..."

declare -A SHIMS=(
  ["AGENTS.md"]="brain/AGENTS.md"
  ["CLAUDE.md"]="brain/CLAUDE.md"
  ["CLAUDE.local.md"]="brain/CLAUDE.local.md"
  ["GEMINI.md"]="brain/GEMINI.md"
  [".claude"]="brain/.claude"
  [".cursor"]="brain/.cursor"
  [".trae"]="brain/.trae"
  [".kilocode"]="brain/.kilocode"
  [".dsh"]="brain/.dsh"
  [".agents"]="brain/.agents"
  [".codebuddy"]="brain/.codebuddy"
  [".gemini"]="brain/.gemini"
  [".codex"]="brain/.codex"
  [".opencode"]="brain/.opencode"
  [".qwen"]="brain/.qwen"
  [".mcp.json"]="brain/.mcp.json"
  ["documentation"]="brain/documentation"
  ["skills-lock.json"]="brain/tool-config/skills-lock.json"
  ["Daily Notes"]="brain/state/daily-notes"
  ["Task Board.md"]="brain/state/task-board.md"
  ["Scratchpad.md"]="brain/state/scratchpad.md"
)

for shim in "${!SHIMS[@]}"; do
  target="${SHIMS[$shim]}"
  link_path="${WORKSPACE_ROOT}/${shim}"
  
  if [ -L "${link_path}" ]; then
    echo "  ✓ Symlink already exists: ${shim} -> $(readlink "${link_path}")"
  elif [ -e "${link_path}" ]; then
    echo "  ⚠ Existing file/directory found at ${shim}; skipping to avoid overwrite."
  else
    ln -s "${target}" "${link_path}"
    echo "  + Created symlink: ${shim} -> ${target}"
  fi
done

# 3. Claudify Hooks Permissions
echo ""
echo "[3/3] Setting execute permissions on hooks & scripts..."
find "${BRAIN_DIR}/scripts" -type f -name "*.sh" -exec chmod +x {} + || true
if [ -d "${BRAIN_DIR}/.claude/hooks" ]; then
  find "${BRAIN_DIR}/.claude/hooks" -type f -exec chmod +x {} + || true
fi

echo ""
echo "========================================================"
echo " Setup complete! Next steps:"
echo " 1. Verify Task Board: cat '${WORKSPACE_ROOT}/Task Board.md'"
echo " 2. Verify Claude Code: run 'claude' from '${WORKSPACE_ROOT}'"
echo " 3. Verify Gemini/Antigravity: ensure GEMINI.md is loaded"
echo "========================================================"
