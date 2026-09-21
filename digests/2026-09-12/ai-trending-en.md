# AI Open Source Trends 2026-09-12

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-12 03:47 UTC

---

# AI Open Source Trends Report — Week of 2026-09-12

**Sources:** GitHub Trending (this week’s new stars) and GitHub topic search (`llm`, `ai-agent`, `rag`, `ml`, `vector-db`). Non-AI repos such as `fmtlib/fmt` are excluded.

---

## 1. This Week’s Highlights

The week’s star velocity is concentrated on a new unit of software: **installable Agent Skills** (`SKILL.md` packs) that plug into Claude Code, Codex, OpenCode, Cursor, and sibling harnesses. Four skill repos alone added more than 10k weekly stars each — [i-have-adhd](https://github.com/ayghri/i-have-adhd) (+13,164), [ponytail](https://github.com/DietrichGebert/ponytail) (+11,054), [archify](https://github.com/tt-a1i/archify) (+11,006), and [mattpocock/skills](https://github.com/mattpocock/skills) (+10,571). Cross-harness “operating systems” such as [ECC](https://github.com/affaan-m/ECC) and self-improving runtimes such as [hermes-agent](https://github.com/NousResearch/hermes-agent) sit above the skill layer, while official catalogs from OpenAI (`skills`, `plugins`) and Chrome DevTools MCP show vendors racing to own the same surface. A second cluster is **context and artifact tooling** — window compression, Markdown conversion, HTML-to-video, and diagram skills — because agent loops are now limited by tokens and verifiable output, not by model access.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,587 (+8714) | Cross-harness agent OS: skills, instincts, memory, security, and research-first workflows for Claude Code, Codex, OpenCode, Cursor and others. This week’s numbers confirm it is the default “control plane” repo developers star when they outgrow a single CLI. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | 0 (+1810) | Context-window optimizer that sandboxes tool output (~98% reduction), persists session memory, and routes across 17 platforms via MCP + hooks. Attention this week is the community answering “agents drown in their own logs.” |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | TypeScript | 0 (+804) | Official Chrome DevTools exposed as an MCP server for coding agents. Vendor-grade browser inspection is becoming a first-class agent tool rather than a custom Playwright script. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | 0 (+4650) | Converts Office and mixed files to Markdown for LLM ingestion. Weekly stars show it is now treated as plumbing for RAG and agent document loops, not a standalone converter. |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | 0 (+1063) | Official OpenAI Plugins surface. Momentum this week is less “new product” than ecosystem alignment: skills, plugins, and MCP are collapsing into one extension model. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,615 | Compresses tool outputs, logs, files, and RAG chunks before they hit the model (claimed 20% fewer tokens for coding agents, 60–95% on JSON). Same problem as `context-mode`, shipped as library + proxy + MCP. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,702 | Local runner for Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and peers. Still the default on-device inference entry point behind the agent-skill wave. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,258 | Context API to search, scrape, and interact with the web at scale. Remains the web-ingest layer most agent harnesses call rather than reinvent. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+13164) | Skill that forces coding agents to lead with the answer instead of burying it. Highest weekly gainer on the list — a direct protest against verbose agent UX. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 135,909 (+11054) | Makes the agent behave like a lazy senior: delete more than you add. +11k this week shows “minimal diff” is now a packaged personality, not a prompt trick. |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Shell | 0 (+10571) | Production skills lifted from a working `.agents` directory (TDD, spec-to-tickets, review). Developers are starring practitioner packs over toy catalogs. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,649 (+3481) | Self-improving agent with persistent memory and a skill-creation loop (“the agent that grows with you”). Continues as the largest open personal-agent runtime in the topic index. |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+1532) | Official skills catalog for Codex. Signals OpenAI treating skills as a first-class artifact alongside Anthropic’s `SKILL.md` convention. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | 0 (+1726) | Multi-player swarm harness with adaptive memory, federation, vector RAG, and native hooks into Claude Code / Codex / Hermes. One of the few trending repos aimed at multi-agent ops rather than a single coding loop. |
| [humanlayer/skills](https://github.com/humanlayer/skills) | TypeScript | 0 (+1637) | HumanLayer’s skill pack for agent–human control flow. Smaller than the viral packs, but it sits on the approval/HITL path production teams actually need. |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+4509) | One-click multi-agent interactive classroom from Tsinghua MAIC. Strong weekly pull as education becomes a concrete multi-agent product, not a demo. |

### 📦 AI Applications

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | 0 (+5100) | Write HTML, render video — built for agents. Turns agent-generated markup into motion output without a traditional NLE. |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | JavaScript | 0 (+11006) | Agent skill that emits architecture, workflow, sequence, data-flow, and lifecycle diagrams as self-contained HTML with motion and clean export. Diagrams are becoming an agent deliverable, not a Mermaid afterthought. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+7776) | 38 editorial diagram types for Claude Code, Codex, and Pi as HTML+SVG, explicitly anti-“Mermaid slop.” Complements `archify` on the same visualization demand. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | 0 (+2765) | CRO, copy, SEO, analytics, and growth skills for coding agents. Skills are leaving the IDE and entering GTM workflows. |
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) | JavaScript | 0 (+8916) | Browser spy-satellite simulator on a photorealistic 3D globe using live open spatial data. Spatial intelligence as a public, agent-queryable surface. |
| [every-app/open-seo](https://github.com/every-app/open-seo) | TypeScript | 0 (+1507) | Open-source alternative to Semrush/Ahrefs. Fits the pattern of vertical SaaS being rebuilt as agent-operable tools. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,763 | Documents or topics → native PowerPoint with shapes, transitions, charts, and narration. High-intent office automation sitting next to `markitdown` and `hyperframes`. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,301 | Local AI job-search agent: portal scan, A–H scored reports, CV tailoring, tracking inside Claude Code / Codex / OpenCode. Agent CLIs as the new job-search client. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,747 | Train a 64M-parameter LLM from scratch in ~2 hours. Still the most-cited “learn by training” project in the `llm-model` topic. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,560 | Tiny vLLM + Qwen stack aimed at systems engineers on Apple Silicon. Inference-systems literacy, not another chatbot wrapper. |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | Implementation of a MatMul-free language model. Research direction that keeps resurfacing as teams hunt cheaper decode. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,421 | Evaluation platform covering Llama 3, Mistral, InternLM2, GPT-4, Qwen, GLM, Claude and 100+ datasets. The eval layer behind the model-release cycle. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,794 | Step-by-step ChatGPT-class model in PyTorch. Remains the canonical training textbook repo in the `ml` topic. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,133 | Model-definition framework for text, vision, audio, and multimodal models. Still the interchange format most new open weights land in. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 317 | On-device LLM inference via x-bit quantization. Small but aligned with the local/self-hosted side of the harness story. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [Tencent/WeKnora](https://github.com/Tencent/WeKnora) | Go | 0 (+964) | Turns raw documents into queryable RAG, an autonomous reasoning agent, and a self-maintaining wiki. The only major RAG platform that landed on this week’s trending list. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 117,039 | Deterministic AST-based knowledge graph over code, docs, SQL, configs, and PDFs — shipped as a `/graphify` skill, no vector store required. Vectorless, explainable edges are the counter-trend to embedding-only RAG. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,703 | Persistent session memory: capture, compress, re-inject across Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot, OpenCode. Memory as a portable layer above any harness. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,539 | RAG engine fused with agent capabilities as a context layer for LLMs. Still the high-star production RAG stack in the topic index. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,147 | Drop-in memory infrastructure for agents and apps. Complements `claude-mem` on the “context that survives sessions” problem. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,581 | Simple, fast RAG (EMNLP 2025). Continues as the research-to-prod retrieval baseline next to LlamaIndex and LangChain. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,622 | Document index for vectorless, reasoning-based RAG. Same “skip the embedding store” thesis as Graphify. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,646 | Self-hosted knowledge-graph memory platform for agents. Graph memory is the other half of this week’s context-compression story. |

---

## 3. Trend Signal Analysis

The explosive object this week is not a new model checkpoint. It is the **Agent Skill**: a versioned folder of instructions, scripts, and resources that a coding harness loads on demand. Weekly-star leaders are almost all skills or skill harnesses — ADHD-friendly output, “lazy senior” coding style, architecture diagrams, marketing packs, humanizer, OpenAI’s Codex catalog. That is a packaging shift. Capability is moving out of giant system prompts and into installable, marketplace-shaped units that travel across Claude Code, Codex, OpenCode, Cursor, and Kimi.

A second, tightly coupled stack is appearing as a first-class product line: **harness + memory + context compression + MCP**. ECC positions itself as a harness-neutral OS (skills, hooks, MCP inventory, session adapters). `context-mode` and `headroom` treat tool output as a token budget problem. `claude-mem`, `mem0`, and Cognee treat cross-session state as infrastructure. Chrome DevTools MCP and Firecrawl show vendors exposing real tools through the same protocol. The new default architecture is portable skills on top of a thin runtime, not a monolith agent framework.

Directions that are newly *loud* rather than newly invented: **diagrams and video as agent artifacts** (`archify`, `diagram-design`, `hyperframes`), **anti-slop writing** (`humanizer`, `i-have-adhd`), and **vectorless RAG** (Graphify, PageIndex) as a reaction to opaque chunk stores. Education and GTM (`OpenMAIC`, `marketingskills`, `open-seo`, `career-ops`) show skills leaving the repo.

This lines up with mid-2026 industry events: DeepSeek-class harness releases, Claude Code / Codex plugin marketplaces, open weights (Kimi, GLM-5.x, Qwen, gpt-oss) making the *agent layer* the scarce asset, and official skill catalogs from Anthropic and OpenAI turning `SKILL.md` into an interchange format. The community is no longer starring “another agent framework.” It is starring the behavior packs and control planes that make whatever model you already run act like a senior teammate.

---

## 4. Community Hot Spots

- **[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) + [blader/humanizer](https://github.com/blader/humanizer)** — Output-quality skills. The +13k week on ADHD-friendly answers is a product signal: agent verbosity is now a user-facing defect, not a prompt-tuning footnote.
- **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) + [mattpocock/skills](https://github.com/mattpocock/skills)** — Engineering taste encoded as skills (minimal diffs, TDD, spec-to-tickets). Highest-leverage installs if you already live in Claude Code / Codex.
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — The cross-harness control plane to study if you are standardizing skills, hooks, MCP, and memory across more than one CLI.
- **[tt-a1i/archify](https://github.com/tt-a1i/archify) + [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) + [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)** — Agents that ship diagrams and video, not just code. Worth building against if your pipeline ends in artifacts humans review.
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) + [Tencent/WeKnora](https://github.com/Tencent/WeKnora) + [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** — Knowledge that is either graph-native, wiki-maintaining, or session-persistent. The practical answer to “my agent forgets the repo every morning.”