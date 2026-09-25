# Knowledge Base

System-wide learned rules. Read by ALL agents and sessions at startup.
Written ONLY by the auditor after confirming learnings.
Entries are mandatory constraints, not suggestions.

## Provenance Hierarchy
Every entry MUST cite its source using one of:
- `[Source: user override MMDDYY]` — User explicitly corrected something
- `[Source: empirical MMDDYY]` — Verified through testing or data
- `[Source: agent inference MMDDYY]` — Pattern observed by an agent, confirmed by auditor

## Hard Rules
(none yet — rules accumulate as you work and the auditor validates learnings)

## Platform & Tool Rules
- **guard-bash.sh soft-blocks `rm -rf` even after explicit user confirmation.** Move the target to `~/.Trash/<dated-name>` instead — reversible, and the hook allows `mv`. [Source: empirical 071726]

## Project Patterns
(none yet — domain patterns accumulate as features are built)
