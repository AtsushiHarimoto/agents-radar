# AI 开源趋势周报 2026-09-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-13 22:07 UTC

---

我会先核实几个内容单薄或含义模糊的仓库，确保分类与摘要准确，再基于筛选后的集合撰写本报告。
# AI 开源趋势报告  
**时间窗口：** week of 2026-09-14 · 来源：GitHub Trending（本周）+ 主题搜索

## 1. 本周要点

本周榜单关注的不是新模型权重，而是**封装、引导并约束编程智能体**。一簇密集的 “agent skills” 仓库——面向 Claude Code、Codex、OpenCode、Cursor 及同类工具的可移植操作手册——吸走了大部分新增 Star，领涨的是 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (+15,924)、[affaan-m/ECC](https://github.com/affaan-m/ECC) (+8,086)、[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (+9,272) 和 [tt-a1i/archify](https://github.com/tt-a1i/archify) (+10,442)。

官方目录也顺着同一股潮流：[openai/skills](https://github.com/openai/skills) 与 [openai/plugins](https://github.com/openai/plugins) 正被当作 Codex/ChatGPT 扩展的默认分发面；GitHub 自家的 [spec-kit](https://github.com/github/spec-kit) 则把规范驱动开发推成叠加在任意编程智能体之上的流程层。

第二条主线是**上下文卫生**：[mksglu/context-mode](https://github.com/mksglu/context-mode)（沙箱化工具输出、持久化会话记忆、跨 17 个平台路由）以及一波反水文 / “写得像人” 的 skills 表明，token 浪费和千篇一律的 LLM 文风，已经是一等一的产品问题。在编程智能体赛道之外，[bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) (+10,510) 和 [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) 则显示空间智能与面向智能体的视频渲染正在作为应用破圈。

## 2. 分类热门项目

### 🔧 AI 基础设施

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | 0 (+1,936) | 面向编程智能体的上下文窗口优化器：沙箱化工具输出（约削减 98%）、持久化会话记忆，并通过 MCP + hooks 把工作路由到 17 个平台。这是目前最清晰的信号：上下文工程已是产品品类，而不再只是提示技巧。 |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | TypeScript | 0 (+783) | 官方相邻的 MCP server，把 Chrome DevTools 暴露给编程智能体。让智能体拥有真正的浏览器检视面，而不是截图再猜的循环。 |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | 0 (+4,823) | 把 Office 文档及各类混合文件转成 Markdown，方便 LLM 干净摄入。本周暴涨说明智能体流水线如今有多频繁地从「先把这坨 blob 变成 token」起步。 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Rust | 0 (+257) | 面向并行智能体运行的 Git worktree 管理 CLI。把隔离的 worktree 当作并发单元，而不是挤在一棵乱糟糟的工作树上。 |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | 0 (+1,120) | OpenAI 面向 Codex 与 ChatGPT 的公开插件/市场目录（Figma、GitHub、Linear、HyperFrames、安全扫描器等）。正在变成「智能体插件长什么样」的参考索引。 |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+1,579) | Codex 的 Skills 目录——社区 skills 仓库涌上 Trending 时的官方对应物。把 skills 定位成一等公民的封装格式，而不只是 Claude Code 的约定。 |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+2,501) | GitHub 的规范驱动开发工具包，可搭配任意编程智能体（Spec → Plan → Tasks → Implement）。把智能体工作从即兴聊天推进到可版本化的 Markdown 产物与多智能体集成。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,824 | 本地运行时，覆盖 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等。在上层 agent-skill 层爆发之际，它仍是自托管推理的默认入口。 |

### 🤖 AI 智能体 / 工作流

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,710 (+8,086) | 覆盖 skills、instincts、memory、security 与研究优先开发的智能体 Harness，可跑在 Claude Code、Codex、OpenCode 与 Cursor 上。本周数据把「Harness」看得比又一个智能体框架更值钱。 |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 137,257 (+9,272) | 强迫智能体表现得像懒散资深工程师的 skill：能不写代码就不写。走红是因为它打中了智能体默认的过度生成失败模式。 |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+15,924) | 阻止编程智能体把答案埋在开场白下面的 skill。本周 Star 增量最高；需求是*可读的智能体输出*，而不是更多工具。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+3,938) | 智能体 skills 框架外加一套软件开发方法论。把流程（智能体该怎么干活）和 skills 本身绑在一起。 |
| [kunchenguid/firstmate](https://github.com/kunchenguid/firstmate) | Shell | 0 (+763) | 「跟一个智能体说话，用一队人交货。」面向多智能体交付的轻量编排层，而不是重量级多智能体 OS。 |
| [humanlayer/skills](https://github.com/humanlayer/skills) | TypeScript | 0 (+1,380) | HumanLayer 的 Claude Code skills：重写 CLAUDE.md、迭代式智能体循环，以及控制环设计。把人在回路的产品工作接到新的 skills 格式上。 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+4,417) | Open Multi-Agent Interactive Classroom——一键式沉浸多智能体学习。本周榜上少有的教育优先多智能体应用。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,150 | 「会跟着你一起成长的智能体」——来自 Nous 的持久、可演化智能体。仍是参考实现；本周能量已转向叠在现有 CLI 之上的轻量 skills。 |

### 📦 AI 应用

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) | JavaScript | 0 (+10,510) | 浏览器里的「间谍卫星」：照片级真实 3D 地球上叠加实时飞机、船舶、卫星，并可用自然语言控制。是空间智能 + 对话式 UI，而不是又一个聊天套壳。 |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | 0 (+5,124) | 写 HTML，渲染视频——专为让智能体输出动态画面而非幻灯片而建。同时出现在 OpenAI 插件目录和 Trending 上，分发信号很强。 |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | JavaScript | 0 (+10,442) | 面向架构、工作流、时序、数据流与生命周期图的 agent skill，产出带动效、可干净导出的自包含 HTML。图表正在变成智能体的默认交付物。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+7,409) | 面向 Claude Code、Codex 与 Pi 的 38 种编辑级图表类型——自包含 HTML + SVG，明确反 Mermaid。与 archify 互补：比的是品味和格式，而不只是生成。 |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | 0 (+2,822) | 面向 Claude Code 及其他智能体的 CRO、文案、SEO、分析与增长工程 skills。把 skills 格式从工程延伸到 GTM。 |
| [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) | Python | 0 (+1,011) | 面向 CAD、CAE 与 CAM 的 agent-skill 库。同一套 skill 模式向硬件/设计工具的早期垂直化。 |
| [blader/humanizer](https://github.com/blader/humanizer) | Python | 0 (+4,069) | 剥掉可被识别的 AI 写作痕迹的 agent skill。与 no-ai-slop 成对出现，说明「听起来像人」已是智能体文案的上线门槛。 |
| [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | Python | 0 (+1,307) | 从任意文本中去掉 20+ 种水文模式。问题和 humanizer 一样，更偏清单驱动；两者都是对智能体输出淹没文档与 PR 的反应。 |

### 🧠 LLM / 训练

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,468 | 文本、视觉、音频与多模态模型的模型定义框架。即便周榜几乎不提它，它仍是大多数开源训练与推理工作的共用底座。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,923 | 大约两小时从零训练一个 64M 参数 LLM。对想要权重、而不是智能体的人来说，仍是最短路径的教学仓库。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 | 在 Apple Silicon 上搭一套精简的 vLLM + Qwen 推理栈。面向学 serving 的系统工程师，而不是写提示的人。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,896 | 用 PyTorch 逐步实现 ChatGPT 风格 LLM。行业周关注点已上移到 Harness 层，这份教育仓库依然长红。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,425 | 评测平台，覆盖 Llama、Qwen、GLM、Claude、GPT-4 与 100+ 数据集。skills 热潮安静的另一面：总得有人给这些 skills 调用的模型打分。 |

### 🔍 RAG / 知识

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [Tencent/WeKnora](https://github.com/Tencent/WeKnora) | Go | 0 (+1,168) | 把原始文档变成可查询的 RAG 系统、自主推理智能体，以及可自我维护的 wiki。本周 Trending 上唯一上榜的知识平台。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,940 | 规模化搜索、抓取并与网页交互的 Context API。需要活页面、而不是静态语料的智能体的默认网页摄入层。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,807 | 持久会话记忆：跨 Claude Code、Codex、Gemini、OpenCode 等捕获、压缩并回注上下文。与本周 context-mode 主题直接相邻。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,614 | 与智能体能力融合的 RAG 引擎，作为 LLM 的上下文层。skills 仓库抢走周头条时，它仍是高 Star 的开源 RAG 栈。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,241 | 面向智能体与应用的即插即用记忆基础设施。对 cognee 这类图/记忆项目的生产向补充。 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,668 | 面向智能体的自托管知识图谱记忆。图记忆是「别每次从零灌满上下文窗口」运动的另一极。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,634 | 面向 RAG 的无向量、基于推理的文档索引。上下文预算收紧时，值得作为「把一切都 embed」的替代方案关注。 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,611 | 简单、快速的 RAG（EMNLP 2025）。轻量检索，气质上贴近 context-mode 与原始人式砍 token。 |

## 3. 趋势信号分析

爆发性注意力落在**智能体 skills 与 Harness**上，而不是新框架，也不是新基础模型。开源工作的单元已从「造一个智能体 OS」收缩成「交一个智能体能加载的文件夹」：输出风格（`i-have-adhd`、`ponytail`、`humanizer`、`no-ai-slop`）、图表（`archify`、`diagram-design`）、垂直领域（营销、CAD），以及流程（`superpowers`、`spec-kit`、`firstmate`）。这是平台迁移。Claude Code 带火了 SKILL.md 式模块；Codex、Cursor、OpenCode 以及 OpenAI 自己的 `skills` / `plugins` 仓库，正在把同一形态当成跨工具标准。

第二套栈正在围绕**作为稀缺资源的上下文**成形。`context-mode`（沙箱化工具输出、持久记忆、MCP 路由）、`claude-mem`、更广主题集里的 `headroom` 一类压缩，以及「像原始人说话 / 懒散资深」类 skills，都默认模型已经够用，瓶颈是你往窗口里塞什么。MCP（Chrome DevTools、多平台 hooks）和 Git worktree（`worktrunk`）是同一思路的系统件：隔离副作用、收缩 I/O、并行跑智能体。

一年前还小众、本周已上榜的新方向：**规范驱动开发**成为 GitHub 官方工作流；**面向智能体的原生媒体**（经 HyperFrames 的 HTML→视频）；**拒绝 Mermaid 默认项的编辑级图表系统**；作为可安装 skill 的**反水文过滤器**；把 LLM 当摄像机操作员、罩在实时 OSINT 上的**空间智能**应用。与产业的衔接：本地模型与前沿模型被当成可互换选项（`ollama` 列出 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen）。能量已从「选哪个模型」转到「在你已经在跑的模型之上，叠哪套 skill pack、哪套 Harness」。

## 4. 社区热点

- **[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) + [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)** —— 最高速度的证据：智能体*行为*（先给答案、少写代码）比又一个规划循环更受欢迎，也更适合做成开源产物。
- **[openai/skills](https://github.com/openai/skills) + [openai/plugins](https://github.com/openai/plugins)** —— 官方目录。若你在 2026 年末交付智能体集成，应对准这块分发面，而不是一次性的 CLAUDE.md。
- **[mksglu/context-mode](https://github.com/mksglu/context-mode) + [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** —— 把上下文和记忆当基础设施。若你正把 token 烧在工具倾倒上，或跨会话丢状态，值得读。
- **[github/spec-kit](https://github.com/github/spec-kit)** —— 编程智能体的流程层（spec → plan → tasks → implement），并带广泛的智能体集成。相对「一直聊到 PR 看起来差不多」的认真替代方案。
- **[tt-a1i/archify](https://github.com/tt-a1i/archify) / [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) / [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)** —— 智能体被期待输出人类能审的产物（图、动效、视频），而不只是源文件。这是 Markdown 之后的下一种默认输出模态。

---