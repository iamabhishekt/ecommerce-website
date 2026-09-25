#!/usr/bin/env bash
# Claude Code hook: auto-sync brain changes to GitHub on session stop
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRAIN_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"

if [ -f "${BRAIN_DIR}/scripts/sync-brain.sh" ]; then
  bash "${BRAIN_DIR}/scripts/sync-brain.sh" --quiet &
fi
exit 0
