# AI Open Source Trends 2026-09-14

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-13 22:07 UTC

---

I'll verify a few thin or ambiguous repos so the categories and summaries stay accurate, then write the report from the filtered set.# AI Open Source Trends Report  
**Window:** week of 2026-09-14 · sources: GitHub Trending (this week) + topic search

## 1. This Week’s Highlights

This week’s board is not about new model weights. It is about **packaging, steering, and constraining coding agents**. A dense cluster of “agent skills” repos—portable playbooks for Claude Code, Codex, OpenCode, Cursor, and peers—absorbed most of the new stars, with [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (+15,924), [affaan-m/ECC](https://github.com/affaan-m/ECC) (+8,086), [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (+9,272), and [tt-a1i/archify](https://github.com/tt-a1i/archify) (+10,442) leading the surge.

Official catalogs moved with the same current: [openai/skills](https://github.com/openai/skills) and [openai/plugins](https://github.com/openai/plugins) are being treated as the default distribution surface for Codex/ChatGPT extensions, while GitHub’s own [spec-kit](https://github.com/github/spec-kit) is pushing spec-driven development as the process layer on top of any coding agent.

A second theme is **context hygiene**: [mksglu/context-mode](https://github.com/mksglu/context-mode) (sandbox tool output, persist session memory, route across 17 platforms) and a wave of anti-slop / “write like a human” skills show that token waste and generic LLM prose are now first-class product problems. Outside the coding-agent lane, [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) (+10,510) and [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) show spatial intelligence and agent-native video rendering breaking out as applications.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | 0 (+1,936) | Context-window optimizer for coding agents: sandboxes tool output (~98% reduction), persists session memory, and routes work across 17 platforms via MCP + hooks. It is the clearest signal that context engineering is now a product category, not a prompt trick. |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | TypeScript | 0 (+783) | Official-adjacent MCP server that exposes Chrome DevTools to coding agents. Gives agents a real browser inspection surface instead of screenshot-and-guess loops. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | 0 (+4,823) | Converts Office docs and mixed file types to Markdown so LLMs can ingest them cleanly. Weekly surge reflects how often agent pipelines now start with “turn this blob into tokens.” |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Rust | 0 (+257) | CLI for Git worktree management aimed at parallel agent runs. Treats isolated worktrees as the unit of concurrency instead of one messy working tree. |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | 0 (+1,120) | OpenAI’s public plugin/marketplace catalog for Codex and ChatGPT (Figma, GitHub, Linear, HyperFrames, security scanners, and more). This is becoming the reference index for “what an agent plugin looks like.” |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+1,579) | Skills catalog for Codex—the official counterpart to the community skill repos flooding Trending. Positions skills as a first-party packaging format, not just a Claude Code convention. |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+2,501) | GitHub’s toolkit for spec-driven development with any coding agent (Spec → Plan → Tasks → Implement). Moves agent work from ad-hoc chat into versioned Markdown artifacts and multi-agent integrations. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,824 | Local runtime for Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and others. Remains the default on-ramp for self-hosted inference while the agent-skill layer explodes above it. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,710 (+8,086) | Agent harness for skills, instincts, memory, security, and research-first development across Claude Code, Codex, OpenCode, and Cursor. This week’s numbers treat “harness” as more valuable than yet another agent framework. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 137,257 (+9,272) | Skill that forces an agent to behave like a lazy senior engineer: prefer not writing code. Viral because it attacks the default agent failure mode of over-generating. |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+15,924) | Skill that stops coding agents from burying the answer under preamble. Highest weekly star count on the board; demand is for *readable agent output*, not more tools. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+3,938) | Agentic skills framework plus a software-development methodology. Bundles process (how the agent should work) with the skills themselves. |
| [kunchenguid/firstmate](https://github.com/kunchenguid/firstmate) | Shell | 0 (+763) | “Talk to one agent. Ship with a crew.” Thin orchestration layer for multi-agent shipping rather than a heavyweight multi-agent OS. |
| [humanlayer/skills](https://github.com/humanlayer/skills) | TypeScript | 0 (+1,380) | Claude Code skills from HumanLayer: CLAUDE.md rewrites, iterated agentic loops, and control-loop design. Bridges human-in-the-loop product work with the new skills format. |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+4,417) | Open Multi-Agent Interactive Classroom—one-click immersive multi-agent learning. One of the few education-first multi-agent apps on the weekly list. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,150 | “The agent that grows with you”—persistent, evolving agent from Nous. Stays a reference implementation while the week’s energy shifts to lightweight skills on top of existing CLIs. |

### 📦 AI Applications

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) | JavaScript | 0 (+10,510) | Browser “spy satellite” over a photorealistic 3D globe with live aircraft, ships, satellites, and natural-language control. Spatial intelligence + conversational UI, not another chat wrapper. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | 0 (+5,124) | Write HTML, render video—built so agents can emit motion instead of slides. Lands in both the OpenAI plugin catalog and Trending, which is a strong distribution signal. |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | JavaScript | 0 (+10,442) | Agent skill for architecture, workflow, sequence, data-flow, and lifecycle diagrams as self-contained HTML with motion and clean export. Diagrams are becoming a default agent deliverable. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+7,409) | 38 editorial diagram types for Claude Code, Codex, and Pi—self-contained HTML + SVG, explicitly anti-Mermaid. Complements archify: taste and format, not just generation. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | 0 (+2,822) | CRO, copy, SEO, analytics, and growth-engineering skills for Claude Code and other agents. Extends the skills format out of engineering into GTM work. |
| [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) | Python | 0 (+1,011) | Agent-skill library for CAD, CAE, and CAM. Early verticalization of the same skill pattern into hardware/design tooling. |
| [blader/humanizer](https://github.com/blader/humanizer) | Python | 0 (+4,069) | Agent skill that strips detectable AI-writing tells. Paired with no-ai-slop, it shows “sound human” is now a shipping requirement for agent-written copy. |
| [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | Python | 0 (+1,307) | Removes 20+ slop patterns from any text. Same problem as humanizer, more checklist-driven; both are reactions to agent output flooding docs and PRs. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,468 | Model-definition framework for text, vision, audio, and multimodal models. Still the shared substrate under most open training and inference work even as the weekly chart ignores it. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,923 | Train a 64M-parameter LLM from scratch in about two hours. Continues to be the short-path teaching repo for people who want weights, not agents. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 | Build a tiny vLLM + Qwen inference stack on Apple Silicon. Aimed at systems engineers learning serving, not prompt authors. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,896 | Step-by-step PyTorch implementation of a ChatGPT-style LLM. Enduring education repo while the industry’s weekly attention sits one layer up, on harnesses. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,425 | Evaluation platform covering Llama, Qwen, GLM, Claude, GPT-4 and 100+ datasets. The quiet counterpart to the skills boom: someone still has to score the models those skills call. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [Tencent/WeKnora](https://github.com/Tencent/WeKnora) | Go | 0 (+1,168) | Turns raw documents into a queryable RAG system, an autonomous reasoning agent, and a self-maintaining wiki. The only knowledge platform that also made this week’s Trending list. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,940 | Context API to search, scrape, and interact with the web at scale. Default web-ingest layer for agents that need live pages rather than a static corpus. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,807 | Persistent session memory: capture, compress, and re-inject context across Claude Code, Codex, Gemini, OpenCode, and others. Directly adjacent to this week’s context-mode theme. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,614 | RAG engine fused with agent capabilities as a context layer for LLMs. Still the high-star open RAG stack while skills repos steal the weekly headline. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,241 | Drop-in memory infrastructure for agents and apps. Production-oriented complement to graph/memory projects such as cognee. |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,668 | Self-hosted knowledge-graph memory for agents. Graph memory is the other pole of the “don’t refill the context window from scratch” movement. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,634 | Vectorless, reasoning-based document index for RAG. Worth watching as an alternative to “embed everything” while context budgets tighten. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,611 | Simple, fast RAG (EMNLP 2025). Lightweight retrieval that fits the same efficiency mood as context-mode and caveman-style token cuts. |

## 3. Trend Signal Analysis

Explosive attention is on **agent skills and harnesses**, not new frameworks and not new foundation models. The unit of open-source work has shrunk from “build an agent OS” to “ship a folder the agent can load”: output style (`i-have-adhd`, `ponytail`, `humanizer`, `no-ai-slop`), diagrams (`archify`, `diagram-design`), vertical domains (marketing, CAD), and process (`superpowers`, `spec-kit`, `firstmate`). That is a platform shift. Claude Code popularized SKILL.md-style modules; Codex, Cursor, OpenCode, and OpenAI’s own `skills` / `plugins` repos are now treating the same shape as a cross-tool standard.

A second stack is forming around **context as a scarce resource**. `context-mode` (sandbox tool output, persist memory, MCP routing), `claude-mem`, `headroom`-class compression in the broader topic set, and “talk like a caveman / lazy senior” skills all assume the model is good enough and the bottleneck is what you put in the window. MCP (Chrome DevTools, multi-platform hooks) and Git worktrees (`worktrunk`) are the systems pieces of the same idea: isolate side effects, shrink I/O, run agents in parallel.

New directions that were niche a year ago and are now on the weekly chart: **spec-driven development** as an official GitHub workflow; **agent-native media** (HTML→video via HyperFrames); **editorial diagram systems** that reject Mermaid defaults; **anti-slop filters** as installable skills; **spatial intelligence** apps that use an LLM as a camera operator over live OSINT. Connection to the industry: local and frontier model choice is treated as interchangeable (`ollama` listing Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen). Energy has moved from “which model” to “which skill pack and which harness sit on top of whatever model you already run.”

## 4. Community Hot Spots

- **[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) + [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** — Highest-velocity proof that agent *behavior* (lead with the answer, write less code) is a more popular open-source artifact than another planner loop.
- **[openai/skills](https://github.com/openai/skills) + [openai/plugins](https://github.com/openai/plugins)** — First-party catalogs. If you ship an agent integration in late 2026, this is the distribution surface to target, not a one-off CLAUDE.md.
- **[mksglu/context-mode](https://github.com/mksglu/context-mode) + [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** — Context and memory as infrastructure. Worth reading if you are burning tokens on tool dumps or losing state across sessions.
- **[github/spec-kit](https://github.com/github/spec-kit)** — Process layer for coding agents (spec → plan → tasks → implement) with broad agent integrations. The serious alternative to “just keep chatting until the PR looks right.”
- **[tt-a1i/archify](https://github.com/tt-a1i/archify) / [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) / [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)** — Agents are expected to emit artifacts humans can review (diagrams, motion, video), not only source files. This is the next default output modality after Markdown.