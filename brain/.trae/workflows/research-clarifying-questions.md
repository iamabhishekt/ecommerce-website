# Research Clarifying Questions Workflow

> Source: `research_instructions.md` — when to ask clarifying questions before a long task.
> Any model running a multi-step research or long-running task can use this. Model-agnostic.

## When to ask clarifying questions

Before launching a long research or multi-step task, check whether the request is specific enough. The rule:

### DO NOT ask if the query is already clear and specific

- User explicitly requests the task ("Research X") → start immediately
- The query is detailed, long, and/or unambiguous → start immediately
- Some details unspecified but you can pick a reasonable default (timeframe, region, which examples to include) → start and **note the assumption**, don't ask. Only ask when the answer would send the work in a completely different direction.

### ONLY ask when genuinely needed (max 3)

When the request has ambiguities, ask up to 3 clarifying questions. The questions must be:
- **Useful** — actually affects the output
- **Clearly relevant** — not tangential
- **Genuinely uncertain** — you can't infer the answer
- **Not obvious** — not something you should already know

Avoid: generic, useless, or obvious questions. Don't ask anything that can be inferred.

## Rules for the questions themselves

1. **Never more than 3** — hard cap.
2. **Use a numbered list.**
3. **Call-to-action must be clear** — the user should be able to answer each in a few words.
4. **No unnecessary text** — keep them clear, simple, straightforward. Easy to review and answer.
5. **Wait for the response** — after asking, STOP. Do not start the task until the user answers. Respecting their agency is critical.
6. **Never ask twice** — after asking once, immediately start the task when they reply. Avoid sending multiple messages before starting; as soon as they reply, begin.

## Good clarifying question patterns

### Pattern 1: definition ambiguity

User: *"What are the top 5 fastest growing startups of all time by revenue growth in a single year?"*

Good clarifications:
1. Are you looking for fastest **absolute** revenue growth (e.g., $100M → $1B) or fastest **percentage** growth (e.g., 1000% YoY)?
2. Startups only (under 10 years old at time of growth), or unicorns and fast-scaling later-stage companies also okay?

> Why good: "fastest growing" is genuinely ambiguous — the answer changes completely based on definition.

### Pattern 2: scope narrowing

User: *"my friends and I want to take a trip to taiwan this year, maybe in october. give me a detailed plan on not just what to do in taiwan, but what to do to plan for taiwan. when do i book flights? etc."*

Good clarifications:
1. How long do you plan to stay in Taiwan?
2. Do you have any specific interests? (food, hiking, beaches, cultural sites, shopping)
3. What is your approximate budget per person?

> Why good: all three directly affect the plan; none can be inferred; user can answer each in a few words.

## Bad clarifying question patterns (avoid)

- ❌ "What would you like me to research?" (the user just told you)
- ❌ "Are you sure you want me to research this?" (yes, they asked)
- ❌ "What's your preferred output format?" (unless it genuinely matters and you can't default)
- ❌ "Can you tell me more about your use case?" (too open-ended; not a few-words answer)
- ❌ Questions where the default is obvious ("do you want me to be accurate?")

## Decision flowchart

```
User asks for research / long task
        │
        ▼
Is the query detailed + specific?
        ├── YES → Start immediately. Note any assumed defaults.
        │
        └── NO (some ambiguity)
                │
                ▼
        Can I pick a reasonable default for the ambiguous part?
                ├── YES → Start immediately. Note the assumption.
                │
                └── NO (the answer changes the work's direction)
                        │
                        ▼
                Ask ≤3 clarifying questions (numbered, few-words answerable)
                        │
                        ▼
                STOP. Wait for user response.
                        │
                        ▼
                User responds → Start immediately. Never ask twice.
```

## Applies beyond research

This pattern works for any long-running or expensive task where getting the direction wrong wastes effort:
- Multi-file refactors ("refactor the auth layer" — clarify scope first)
- Architecture decisions ("design the new payments service" — clarify constraints)
- Migrations ("migrate the database to Postgres" — clarify which DB, downtime tolerance)
- Large generations ("write the docs for this API" — clarify audience, format, depth)

The cost of asking is one round-trip. The cost of not asking is doing the wrong work entirely.
