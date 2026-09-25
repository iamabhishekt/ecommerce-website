#!/usr/bin/env bash
# ==============================================================================
# sync-brain.sh — Automated Bidirectional Sync for Workspace Brain
# ==============================================================================
# Usage:
#   bash brain/scripts/sync-brain.sh          # One-shot sync (pull & push if dirty)
#   bash brain/scripts/sync-brain.sh --watch  # Continuous background auto-sync
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRAIN_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

sync_once() {
  local QUIET="${1:-false}"
  
  if [ ! -d "${BRAIN_DIR}/.git" ]; then
    if [ "$QUIET" = "false" ]; then
      echo "[Brain Sync] Notice: ${BRAIN_DIR} is not yet a separate git repository. Skipping remote sync."
    fi
    return 0
  fi

  # 1. Pull latest changes with rebase
  local HAS_CHANGES=false
  if [ -n "$(git -C "${BRAIN_DIR}" status --porcelain)" ]; then
    HAS_CHANGES=true
  fi

  if [ "$QUIET" = "false" ]; then
    echo "[Brain Sync] Checking remote for updates..."
  fi

  if [ "$HAS_CHANGES" = "true" ]; then
    git -C "${BRAIN_DIR}" stash push -u -m "auto-sync-temp-stash" >/dev/null 2>&1 || true
    git -C "${BRAIN_DIR}" pull --rebase origin main >/dev/null 2>&1 || true
    git -C "${BRAIN_DIR}" stash pop >/dev/null 2>&1 || true
  else
    git -C "${BRAIN_DIR}" pull --rebase origin main >/dev/null 2>&1 || true
  fi

  # 2. Check if local changes exist to commit and push
  if [ -n "$(git -C "${BRAIN_DIR}" status --porcelain)" ]; then
    local TIMESTAMP
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    local HOST
    HOST=$(hostname -s 2>/dev/null || hostname 2>/dev/null || echo "host")

    git -C "${BRAIN_DIR}" add -A
    git -C "${BRAIN_DIR}" commit -m "sync: update brain state from ${HOST} [${TIMESTAMP}]" >/dev/null 2>&1 || true
    git -C "${BRAIN_DIR}" push origin main >/dev/null 2>&1 || true

    if [ "$QUIET" = "false" ]; then
      echo "  ✓ Local changes committed and pushed (${TIMESTAMP})"
    fi
  else
    if [ "$QUIET" = "false" ]; then
      echo "  ✓ Brain is already in sync."
    fi
  fi
}

watch_loop() {
  local INTERVAL="${1:-30}"
  echo "========================================================"
  echo " Brain Auto-Sync Watcher Started (Interval: ${INTERVAL}s)"
  echo " Brain directory: ${BRAIN_DIR}"
  echo " Press [Ctrl+C] to stop."
  echo "========================================================"

  sync_once false || true

  while true; do
    sleep "${INTERVAL}"
    if [ -n "$(git -C "${BRAIN_DIR}" status --porcelain 2>/dev/null)" ]; then
      sleep 3
      sync_once false || true
    fi
  done
}

if [ "${1:-}" = "--watch" ] || [ "${1:-}" = "-w" ]; then
  watch_loop "${2:-30}"
elif [ "${1:-}" = "--quiet" ] || [ "${1:-}" = "-q" ]; then
  sync_once true
else
  sync_once false
fi
