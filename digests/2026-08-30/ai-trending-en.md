# AI Open Source Trends 2026-08-30

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-08-30 07:55 UTC

---

# AI Open Source Trends Report  
**Date:** 2026-08-30 · Sources: GitHub Trending (this week) + topic-tagged activity (last 7 days)

---

## 1. This Week’s Highlights

The week’s signal is not a new model drop — it is **Agent Skills** becoming a portable, first-class artifact. Official and community plugin directories from Anthropic and Cursor, plus three large curated skill catalogs, landed on the weekly trending list together, pointing to a shared “skills pack” format across Claude Code, Codex, Cursor, Gemini CLI, and related CLIs. Terminal-native coding agents also moved: OpenAI’s `codex`, Apache Maka (incubating, local-first agent workspace with an append-only event log), and several “use frontier agents for free” wrappers all posted multi-thousand weekly stars. Vertical agents (job search, scientific research, architecture diagrams, GPT-Image-2 prompt engines) outpaced generic chat UIs. Local-first personal agents (`openhuman`, Maka) and free multi-provider LLM gateways (`freellmapi`, `free-claude-code`) show the community optimizing for ownership, cost, and harness reuse rather than another hosted chatbot.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [openai/codex](https://github.com/openai/codex) | Rust | 0 (+7775) | Lightweight coding agent that runs in the terminal. Official OpenAI harness with strong weekly momentum as teams treat CLI agents as the default coding surface. |
| [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) | TypeScript | 0 (+2691) | Single `/v1` endpoint over 34 free LLM providers and 635 free model endpoints, with routing, failover, and encrypted keys. Useful as a personal experimentation layer when token budgets are the bottleneck. |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Python | 0 (+1603) | Anthropic-managed directory of high-quality Claude Code plugins. The official catalog that community skill packs are now targeting. |
| [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community) | Python | 0 (+2234) | Read-only community marketplace mirror for Claude Cowork / Claude Code plugins. Signals that plugin submission and discovery have become a first-class product surface. |
| [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | 0 (+1571) | Cursor plugin specification plus official plugins. Completes the two-IDE plugin story (Claude Code + Cursor) that skill authors are writing to this week. |
| [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | Python | 0 (+4942) | Wrapper to run Claude Code, Codex, Pi, OpenCode and more against large free-token pools from the terminal, app, IDE, or phone. High weekly stars because it lowers the cost of trying the new harnesses. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 179,764 | Local runner for Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and others. Remains the default local inference frontend that agent CLIs sit on top of. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,623 | Model-definition framework for text, vision, audio, and multimodal models. Still the shared substrate when people train, convert, or serve the models behind the agent wave. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [apache/maka](https://github.com/apache/maka) | TypeScript | 0 (+1876) | Apache-incubating local-first AI agent workspace that records messages, tool calls, results, permission decisions, and termination as an append-only log. Notable as an Apache-backed, auditable agent runtime rather than another chat wrapper. |
| [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) | Rust | 0 (+2434) | Personal “super intelligence”: local-first life memory, agent-fleet orchestrator, and deep researcher. Weekly spike reflects demand for a private brain that sits above many tools. |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | — | 0 (+2341) | Curated 1000+ agent skills from official teams and the community, compatible with Claude Code, Codex, Gemini CLI, Cursor, and more. The index repo for the week’s skills standard. |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Python | 0 (+3642) | 165 validated science skills plus 100+ scientific databases (biology, chemistry, medicine, drug discovery). Claims use by 190,000+ scientists and compatibility with the open Agent Skills standard. |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | JavaScript | 0 (+14875) | Agent skill that emits verifiable architecture, workflow, sequence, data-flow, and lifecycle diagrams as self-contained HTML with motion and crisp export. Highest weekly-star count on the AI trending list this week. |
| [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | CSS | 0 (+1154) | Open skill pack covering web design, knowledge retrieval, image generation, and more. Another data point that “skills collections” are the new awesome-lists. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 238,240 | Long-running “agent that grows with you” under the `ai-agent` topic. Shows the installed base that new skill formats are trying to plug into. |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | Python | 75,623 | Nano Claude Code–like agent harness built from scratch in bash. Popular as the readable reference implementation of the current coding-agent loop. |

### 📦 AI Applications

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+13141) | “Prompt as Code” engine and template library for GPT-Image-2: 530+ reverse-engineered cases, 20+ industrial templates, extracted as Skills. Second-highest weekly AI star count; image prompting is being packaged like agent skills. |
| [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search) | Python | 0 (+5145) | Local AI job-application framework on Claude Code: evaluate postings, tailor CVs, write cover letters, prep interviews. Fork-and-own positioning matches the week’s local-first mood. |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 69,335 | Open-source AI job search that scans portals, scores listings A–H, tailors CVs, and tracks applications inside Claude Code / Codex / OpenCode. Same vertical as `ai-job-search`, larger installed base. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,295 | LLM-driven multi-market stock system: multi-source quotes, news, decision board, scheduled push, designed to run at near-zero cost. Concrete agent app rather than a framework. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 50,271 | Turns documents or topics into native PowerPoint with real shapes, transitions, charts, tables, narration, and user templates. High-utility document agent that keeps showing up in agent-topic search. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,246 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants over many frontier LLMs. Desktop “agent workbench” class of app. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 118,626 | Topic-to-HD-short-video pipeline using LLMs plus automation. Still the reference open stack for AI short-form video generation. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 0 (+3488) / 51,072 | “Learn it. Build it. Ship it” curriculum that also appears on the ML topic list. This week’s star spike shows engineers still want end-to-end build guides, not only agent wrappers. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,030 | Step-by-step PyTorch implementation of a ChatGPT-like LLM. Remains the standard teaching repo when people want to understand the model under the agent. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 55,209 | Train a 64M-parameter LLM from scratch in about two hours. Attractive for local experimentation and for people who cannot rent large clusters. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,665 | Core tensor and dynamic-network library with GPU acceleration. Still the training/inference substrate most of the above tutorials and custom models assume. |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 198,026 | General open-source ML framework. Lower weekly narrative than the agent stack, but still the largest classic ML infra repo in the topic set. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 150,381 | User-facing UI over Ollama, OpenAI-compatible APIs, and local RAG. Default front-end when teams self-host retrieval + chat. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,262 | Agent-engineering platform that still anchors a large share of RAG and tool-calling production stacks. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 89,618 | RAG engine that folds agent capabilities into the context layer. Frequently cited as the “RAG + agent” production alternative to notebook demos. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 92,606 | Persistent cross-session memory for Claude Code, Codex, Gemini, Hermes, Copilot, OpenCode, and others: capture, compress, reinject. Directly addresses the memory hole in CLI agents. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 112,391 | Turns a codebase plus docs, SQL, configs, and PDFs into a queryable knowledge graph via deterministic AST parsing (no vector store). Shipped as a skill for Claude Code / Cursor / Codex / Gemini CLI. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 64,340 | Universal memory layer for AI agents. Complements session-log tools like Maka and claude-mem with a reusable memory API. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,876 | Cloud-native vector database for large-scale ANN search. Still the scale-out retrieval backend behind many RAG deployments. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,261 | EMNLP 2025 RAG method positioned as simple and fast. Continues to attract implementers who want graph-style retrieval without a full platform. |

---

## 3. Trend Signal Analysis

Explosive attention this week is on **packaged Agent Skills and plugin directories**, not on new base models. `archify` (+14,875), `awesome-gpt-image-2` (+13,141), `scientific-agent-skills` (+3,642), `awesome-agent-skills` (+2,341), plus official Anthropic and Cursor plugin repos, all describe the same idea: a skill is a versioned, reusable capability (prompts, tools, templates, diagrams, science workflows) that any compliant coding agent can load. That is a layer above MCP-style tool servers: MCP connects tools; skills encode *how* an agent should use them for a job.

A second stack is the **terminal coding agent + free-token gateway**. OpenAI `codex`, Apache Maka, `learn-claude-code`, `free-claude-code`, and `freellmapi` treat the agent harness as a product and the model as a swappable backend. Maka’s append-only log of messages, tools, permissions, and termination is a new direction for auditability and local-first ops — closer to an event-sourced workspace than a chat transcript.

**Local-first personal agents** (`openhuman`, Maka, AnythingLLM-class apps in the topic set) and **vertical agents** (job search, stock analysis, PPT generation, scientific databases, GPT-Image-2 industrial prompts) are getting more stars than generic multi-agent frameworks. Graphify’s “skill that builds a knowledge graph without a vector store” and `claude-mem` show RAG evolving into *agent-native memory* rather than a separate indexing product.

This lines up with the current industry shape: Claude Code / Cursor / Codex as daily IDEs, open models (Qwen, GLM, DeepSeek, gpt-oss, Kimi) served locally via Ollama, and cost pressure that makes free-endpoint aggregators and forkable job/science packs immediately useful. The new artifact to watch is not another agent framework README — it is a skill pack that runs on more than one vendor CLI.

---

## 4. Community Hot Spots

- **[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) + official plugin dirs** — If you ship capabilities, target the emerging Agent Skills / Claude Code / Cursor plugin format once, not five custom prompt folders.
- **[tt-a1i/archify](https://github.com/tt-a1i/archify)** — Highest weekly AI star count; architecture-as-a-skill (motion HTML + export) is a concrete pattern other domains will copy.
- **[apache/maka](https://github.com/apache/maka)** — Apache incubation plus an append-only agent event log is the most interesting *runtime* design this week for teams that need audit trails and local-first ops.
- **[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)** — Vertical skills + curated scientific databases; the template for domain packs (legal, finance, manufacturing) that will follow.
- **[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) and [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** — Personal memory + fleet orchestration vs. session memory injection. Together they define the two memory layers developers are actually wiring into coding agents right now.