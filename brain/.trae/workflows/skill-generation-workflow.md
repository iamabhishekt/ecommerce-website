# Skill Generation Workflow

> Source: `Claude Code/bundled-skills/run-skill-generator/SKILL.md` — generate a run/drive skill for any project.
> Any agent with shell, file-read, and the ability to launch the project can follow this. Produces a skill that lets future agents build, launch, and drive the project from a clean machine.

## When to use

You need to produce a **skill** for a project so a future agent can build it, launch it, and **drive it programmatically** (not just "run `npm start` and a window opens"). The deliverable is code AND docs — a driver script plus its man page.

## Definition of done

You are done when **all** of these are true:

1. **You launched the app and interacted with it** — not its test suite, the actual running app. For anything with a GUI, that means a screenshot file on disk that you took.
2. **The interaction harness is committed** next to the skill — a driver script, REPL wrapper, smoke test, or inline heredoc.
3. **The SKILL.md documents the harness** as the primary agent path — the section a future agent reads first is "run this driver / pipe these commands," not "run `npm start` and a window opens."
4. **Every code block in SKILL.md is a command you ran that worked** — this session, this container. Not from the README, not inferred.

If you're about to write the skill and you don't have (1), **stop.** You are about to paraphrase existing docs. That document already exists — it's called the README, and the whole reason you're here is that it wasn't enough.

## Deliverables

```
<unit>/.claude/skills/run-<unit-name>/
  SKILL.md      ← agent-facing instructions — SHORT. Points at the driver.
  driver.mjs    ← (or driver.py, smoke.sh, … — or none: web apps use
                   chromium-cli off-the-shelf, and the heredoc in
                   SKILL.md is the script)
```

The driver lives **inside the skill directory** by default. They are a pair — the skill's instructions and the code that implements them. A driver that lives here is allowed to be messier than production code; it's agent tooling.

**Graduation:** if the driver grows into something the project's own test suite wants to reuse — shared launch helpers, a real e2e harness — move it to `scripts/` or `e2e/` and update SKILL.md to reference the new path. The skill stays; the driver finds a better home.

## Process

### 0. Find any existing skill about running this app

List the project's skills with their descriptions. If one is about launching/driving this app — whatever it's named — **refine, don't rewrite**: verify its claims, fix what's wrong, add what's missing, preserve what works. Re-run the driver if there is one. Keep its existing name.

If none exists, decide where to create it and continue.

### 1. Discover — and treat every claim as disprovable

Figure out what you're authoring for:
- Manifest right here (`package.json`, `go.mod`, `pyproject.toml`) and it's one self-contained thing → this is the unit
- Looks like a mega-repo root (`apps/`, `packages/`, `services/`) → **ask which one**
- Genuinely ambiguous → ask

Survey: `README.md`, `package.json` scripts, `Dockerfile`, `Makefile`, `.github/workflows/`, `CONTRIBUTING.md`. CI configs are often more accurate than READMEs.

**Every claim in existing docs is a hypothesis.** Especially the negative ones:

| When docs say… | What you do |
|---|---|
| "Requires macOS/Windows" | Launch it on Linux anyway. Apps rarely refuse to start — they crash on a missing `.so`, which `apt-get` fixes. |
| "Requires a GPU" | Try software rendering. Electron/Chrome fall back with `--disable-gpu`. |
| "Requires a paid account / feature flag" | The gate is code you can read. Find it (env var? build define? SSR-embedded JSON?) and patch it for your local run. Document the patch. |
| "Run `npm start`" | That's the human path. Find or build the *programmatic* path. |

"Not supported on Linux" in a README written by a macOS developer means "I never tried." You're about to try.

### 2. Execute — and BUILD the harness you need

Keep a running `NOTES.md` as you go. Every error → every fix → every command that finally worked. This scratchpad becomes the Troubleshooting section.

**Work up to a real interaction:**

1. **Install + build.** When something's missing, note the exact `apt-get` / `npm install` that fixed it.
2. **Launch the app.** Not the test suite — the app. A desktop GUI needs `xvfb-run` and `lib*` packages; a web app driven by `chromium-cli` runs headless and needs neither.
3. **Build a harness to drive it.** You need a handle on the running app that lets you send input and observe output programmatically. The shape depends on the project (see table below).
4. **Cover the layer(s) PRs actually touch.** A tmux driver that pokes the CLI's user surface is the right handle for UI changes — and the wrong one for a PR that touches one internal function. For the latter, an agent wants `NODE_ENV=test bun run script.ts` (or equivalent): import the function, call it, observe. Look at recent merged PRs: what layer do they touch? Cover that.
5. **Do one real user flow end-to-end.** Click the button. Fill the form. See the result in the DOM. Take a screenshot. **Actually look at the screenshot.** If it's blank or showing an error page, you're not done.
6. **Then run the tests.** Unit tests are a sanity check, not the main event.
7. **Stop cleanly.**

**Obstacles are content.** You will hit weird ones. Each gets a bullet in Gotchas and (often) a helper in your driver. The gold standard is a Gotchas section full of things nobody could have guessed.

### 3. Write SKILL.md

Short. Point at the driver. Body structure:

1. **One-paragraph intro** — what this app is, how it's driven
2. **Prerequisites** — the exact `apt-get install` line you ran
3. **Build** — the exact commands, in order. Include any patches you had to apply with the exact `sed` or edit.
4. **Run (agent path)** — FIRST. How to launch the driver, what commands it accepts, where screenshots land. This is the section the next agent will actually use.
5. **Run (human path)** — SECOND, if different. Brief. Note that it's useless headless.
6. **Gotchas** — the battle scars. Things that look like they should work but don't, and the workaround. If this section is generic, you didn't fight hard enough.
7. **Troubleshooting** — symptom → fix. Only errors you actually hit.

Keep it **verified** (you ran it), **prescriptive** (one path, not options), **honest** (flaky? slow? say so).

Paths in SKILL.md are relative to `<unit>/`, not to the skill directory.

### 4. Verify

Fresh shell, `cd` into the unit, follow the skill's `SKILL.md` line-by-line without deviating. Any improvisation = a gap. Fix it.

## Project-type patterns

Pick a starting shape for your driver:

| Project type | Driver shape |
|---|---|
| Web server / API | Background-launch + `curl`-based smoke script |
| CLI tool | Representative-args smoke script, check exit codes + output |
| TUI / interactive terminal | tmux wrapper: `send-keys` / `capture-pane` |
| Electron / desktop GUI | Playwright `_electron` REPL driver under xvfb, screenshots, tmux-wrapped |
| Browser-driven | dev server + `chromium-cli` script |
| Library / SDK | Import-and-call smoke script |

For a web app, start from the chromium-cli pattern — drive it with `chromium-cli`, no custom driver needed. For a desktop app, write a REPL driver (stdin commands → click/type/screenshot), run it inside tmux, use `send-keys` / `capture-pane`.

## What to include

- Prerequisites — OS packages, runtimes, tools. The exact ones.
- Setup — install deps, configure, any patches.
- Build — compile/bundle.
- Run (agent path) — the driver. Commands. Screenshot location.
- Direct invocation — if callable: how to import and run internal code without the full app.
- Run (human path) — if meaningfully different.
- Test — the test suite command.
- Gotchas — non-obvious traps you hit.
- Troubleshooting — error → fix.
- The driver itself — committed in the skill dir (or graduated to `scripts/`/`e2e/`).

## What to leave out

- **Anything you didn't run.** If the README says `yarn start:prod` and you never ran it, it's not in the skill. Full stop.
- **Documented happy paths for platforms you're not on.** Mention it exists; don't elaborate.
- **Exhaustive options.** One working path.
- **Architecture prose.** That's other docs.
- **Generic troubleshooting.** "If the build fails, check your Node version" — useless. Only include errors you actually hit and fixed.

## Red flags — you are about to ship the wrong thing

Stop and reconsider if:
- **You haven't taken a screenshot** of a GUI app. You didn't run it.
- **Your skill has no driver/smoke script** to point at, and the app is interactive.
- **Your skill reads like the README.** Same structure, same commands, same caveats. You paraphrased.
- **Your Troubleshooting section is generic.** Real execution produces specific, weird errors. Generic errors = you didn't execute.
- **You wrote "not supported on this platform"** without trying to launch it.
- **Everything worked first try.** Either this project is trivially simple, or you ran the test suite and called it done.
