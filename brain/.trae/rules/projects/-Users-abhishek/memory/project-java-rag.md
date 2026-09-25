---
name: project-java-rag
description: Building production-grade RAG system in Java as portfolio + blog series.
metadata: 
  node_type: memory
  type: project
  originSessionId: b942bb01-03c9-49f2-8dc3-0958e0090bc6
---

User is building a Retrieval-Augmented Generation (RAG) system in Java across three JDK versions (8, 17, 21) as both a hireable portfolio project and a technical blog series.

**Scope:**
- Phase 1 (Java 8): LangChain4j, raw JDBC/OkHttp, manual concurrency.
- Phase 2 (Java 17): Spring AI, VectorStore abstractions, hybrid search, metadata security filters.
- Phase 3 (Java 21): Virtual threads, StructuredTaskScope, streaming.

**Enterprise patterns to implement:**
- DoorDash-style output guardrails.
- Bell-style incremental knowledge sync.
- Grab/Pinterest semantic schema routing (Text-to-SQL).

**Production gaps to address:**
- GraalVM native images for cloud deployment.
- JDBC fetch size tuning and HikariCP configuration.
- Testcontainers + Ollama for offline CI testing.

**Blog series structure:**
8 chapters covering first principles through evaluation. Writing style targets Beej/Nullprogram density with Feynman clarity.

**Resources generated:**
- `java-rag-master-guide.md` — Complete learning path.
- `java-rag-evolution-guide.md` — Quick reference.
- `BLOG-SERIES-INDEX.md` + 8 chapter files in `chapters/`.
- `RESOURCES-TECHNICAL-WRITING.md` — Books and blogs for writing improvement.

**Why:** User is a Java developer seeking to transition into AI/GenAI engineering roles in enterprise environments. Wants to prove ability to operate inside legacy constraints while understanding modern capabilities.
