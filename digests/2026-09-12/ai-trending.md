# AI 开源趋势周报 2026-09-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-12 03:47 UTC

---

# AI 开源趋势报告 — 2026-09-12 当周

**来源：** GitHub Trending（本周新增 star）以及 GitHub topic 检索（`llm`、`ai-agent`、`rag`、`ml`、`vector-db`）。已排除非 AI 仓库，例如 `fmtlib/fmt`。

---

## 1. 本周亮点

本周 star 增速高度集中在一类新的软件单元上：**可安装的 Agent Skills**（`SKILL.md` 包），可接入 Claude Code、Codex、OpenCode、Cursor 及同类 harness。仅四个 skill 仓库本周各自新增 star 就超过 1 万——[i-have-adhd](https://github.com/ayghri/i-have-adhd)（+13,164）、[ponytail](https://github.com/DietrichGebert/ponytail)（+11,054）、[archify](https://github.com/tt-a1i/archify)（+11,006）以及 [mattpocock/skills](https://github.com/mattpocock/skills)（+10,571）。跨 harness 的「操作系统」如 [ECC](https://github.com/affaan-m/ECC)，以及会自我进化的运行时如 [hermes-agent](https://github.com/NousResearch/hermes-agent)，位于 skill 层之上；与此同时，OpenAI 官方目录（`skills`、`plugins`）和 Chrome DevTools MCP 表明厂商正在抢占同一层接口。第二簇热点是 **上下文与产物工具**——窗口压缩、Markdown 转换、HTML 转视频、图表 skill——因为 agent 循环现在卡在 token 预算和可核验输出上，而不再卡在模型可用性上。

---

## 2. 分类热门项目

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,587 (+8714) | 跨 harness 的 agent OS：skills、instincts、memory、security，以及面向 Claude Code、Codex、OpenCode、Cursor 等的研究优先工作流。本周数据确认：开发者一旦不再满足单一 CLI，就会把它标成默认「控制平面」仓库。 |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | 0 (+1810) | 上下文窗口优化器：沙箱化工具输出（约减少 98%）、持久化会话记忆，并通过 MCP + hooks 在 17 个平台间路由。本周关注度来自社区对「agent 被自己的日志淹死」的回应。 |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | TypeScript | 0 (+804) | 官方 Chrome DevTools 以 MCP server 形式暴露给 coding agent。厂商级浏览器检视正在成为一等公民工具，而不再是自制 Playwright 脚本。 |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | 0 (+4650) | 将 Office 及混合文件转为 Markdown，供 LLM 摄入。本周 star 表明它已被当作 RAG 与 agent 文档循环的管道件，而不是独立转换器。 |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | 0 (+1063) | OpenAI 官方 Plugins 界面。本周动能与其说是「新产品」，不如说是生态对齐：skills、plugins 与 MCP 正在收束成同一套扩展模型。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,615 | 在工具输出、日志、文件和 RAG chunk 进入模型前先压缩（宣称 coding agent 少用约 20% token，JSON 上可降 60–95%）。问题与 `context-mode` 相同，交付形态是库 + proxy + MCP。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,702 | 本地运行器，覆盖 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等同级模型。在 agent-skill 浪潮背后，仍是端侧推理的默认入口。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,258 | 可规模化搜索、抓取并与网页交互的 Context API。多数 agent harness 仍直接调用它作为网页摄入层，而不是自己重做。 |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+13164) | 强制 coding agent 先给答案、不要把结论埋在长文里的 skill。本周榜单最高增量——直接抗议啰嗦的 agent UX。 |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 135,909 (+11054) | 让 agent 表现得像「懒惰的资深工程师」：删比加多。本周 +11k 说明「最小 diff」已是可打包的人格，而不只是 prompt 技巧。 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Shell | 0 (+10571) | 从真实在用的 `.agents` 目录提炼出的生产级 skills（TDD、spec-to-tickets、review）。开发者更愿意给实战包点 star，而不是玩具目录。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,649 (+3481) | 带持久记忆与 skill 创建循环的自我进化 agent（「会跟你一起成长的 agent」）。仍是该 topic 索引中体量最大的开源个人 agent 运行时。 |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+1532) | Codex 官方 skills 目录。表明 OpenAI 把 skills 当作一等产物，与 Anthropic 的 `SKILL.md` 约定并列。 |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | 0 (+1726) | 多玩家 swarm harness，含自适应记忆、federation、向量 RAG，以及对接 Claude Code / Codex / Hermes 的原生 hooks。少数瞄准多 agent 运维、而非单一编码循环的热门仓库。 |
| [humanlayer/skills](https://github.com/humanlayer/skills) | TypeScript | 0 (+1637) | HumanLayer 面向 agent–人控制流的 skill 包。体量小于病毒式传播的那些包，但落在生产团队真正需要的审批 / HITL 路径上。 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+4509) | 清华大学 MAIC 出品的一键式多智能体互动课堂。本周拉动强劲，说明教育正在变成具体的多 agent 产品，而不只是 demo。 |

### 📦 AI Applications

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | 0 (+5100) | 写 HTML，渲染成视频——为 agent 而生。把 agent 生成的标记语言变成动态产物，无需传统非编软件。 |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | JavaScript | 0 (+11006) | 输出架构、工作流、时序、数据流与生命周期图的 agent skill，产物是带动效、可干净导出的自包含 HTML。图表正在成为 agent 交付物，而不再是 Mermaid 的事后补丁。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+7776) | 面向 Claude Code、Codex 和 Pi 的 38 种编辑级图表类型（HTML+SVG），明确反对「Mermaid slop」。与 `archify` 共同回应同一可视化需求。 |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | 0 (+2765) | 给 coding agent 用的 CRO、文案、SEO、分析和增长 skills。Skills 正在离开 IDE，进入 GTM 工作流。 |
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) | JavaScript | 0 (+8916) | 基于真实开放空间数据、在逼真 3D 地球上的浏览器「间谍卫星」模拟器。空间智能变成可被 agent 查询的公共界面。 |
| [every-app/open-seo](https://github.com/every-app/open-seo) | TypeScript | 0 (+1507) | Semrush / Ahrefs 的开源替代。符合「垂直 SaaS 被重做成 agent 可操作工具」这一模式。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,763 | 文档或主题 → 原生 PowerPoint，含形状、转场、图表与旁白。高意图办公自动化，与 `markitdown`、`hyperframes` 相邻。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,301 | 本地 AI 求职 agent：门户扫描、A–H 评分报告、简历定制，并在 Claude Code / Codex / OpenCode 内跟踪。Agent CLI 正在成为新的求职客户端。 |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,747 | 从零训练 6400 万参数 LLM，约 2 小时。仍是 `llm-model` topic 里被引用最多的「用训练来学」项目。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,560 | 面向 Apple Silicon 系统工程师的精简 vLLM + Qwen 栈。目标是推理系统素养，而不是又一个 chatbot 套壳。 |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | MatMul-free 语言模型实现。团队在寻找更便宜 decode 时，这一研究方向反复浮现。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,421 | 评测平台，覆盖 Llama 3、Mistral、InternLM2、GPT-4、Qwen、GLM、Claude 以及 100+ 数据集。模型发布周期背后的评测层。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,794 | 用 PyTorch 逐步实现 ChatGPT 级模型。仍是 `ml` topic 中的 canonical 训练教材仓库。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,133 | 文本、视觉、音频与多模态模型的模型定义框架。大多数新开源权重仍以它为交换格式落地。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 317 | 通过 x-bit 量化做端侧 LLM 推理。体量小，但与 harness 叙事中的本地 / 自托管一侧对齐。 |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [Tencent/WeKnora](https://github.com/Tencent/WeKnora) | Go | 0 (+964) | 把原始文档变成可查询 RAG、自主推理 agent，以及可自我维护的 wiki。本周 trending 名单上唯一落地的大型 RAG 平台。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 117,039 | 基于确定性 AST 的知识图谱，覆盖代码、文档、SQL、配置和 PDF——以 `/graphify` skill 交付，无需向量库。无向量、可解释的边，是对「只靠 embedding 的 RAG」的反趋势。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,703 | 持久会话记忆：在 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 之间捕获、压缩并回注。记忆成为任何 harness 之上的可移植层。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,539 | 融合 agent 能力的 RAG 引擎，作为 LLM 的上下文层。仍是该 topic 索引中高 star 的生产级 RAG 栈。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,147 | 面向 agent 与应用的即插即用记忆基础设施。与 `claude-mem` 一起解决「跨会话仍能活下来的上下文」问题。 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,581 | 简单、快速的 RAG（EMNLP 2025）。继续作为研究到生产的检索基线，与 LlamaIndex、LangChain 并列。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,622 | 面向无向量、基于推理的 RAG 的文档索引。与 Graphify 同一套「跳过 embedding 库」论题。 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Python | 30,646 | 面向 agent 的自托管知识图谱记忆平台。图记忆是本周「上下文压缩」故事的另一半。 |

---

## 3. 趋势信号分析

本周真正爆发的对象不是新的模型 checkpoint，而是 **Agent Skill**：一份带版本的指令、脚本与资源文件夹，由 coding harness 按需加载。周 star 榜前列几乎全是 skills 或 skill harness——ADHD 友好输出、「懒惰资深」编码风格、架构图、营销包、humanizer、OpenAI 的 Codex 目录。这是一次打包形态的迁移。能力正从巨型 system prompt 中拆出，变成可安装、带市场形态的单元，并在 Claude Code、Codex、OpenCode、Cursor 和 Kimi 之间流转。

第二条紧密耦合的产品线正在成为一等公民：**harness + memory + 上下文压缩 + MCP**。ECC 把自己定位成 harness 中立的 OS（skills、hooks、MCP 清单、会话适配器）。`context-mode` 和 `headroom` 把工具输出当成 token 预算问题。`claude-mem`、`mem0` 和 Cognee 把跨会话状态当成基础设施。Chrome DevTools MCP 与 Firecrawl 表明厂商正通过同一协议暴露真实工具。新的默认架构是：薄运行时之上的可移植 skills，而不是单体 agent 框架。

新近「变响」而非新近发明的方向包括：**把图表和视频当 agent 产物**（`archify`、`diagram-design`、`hyperframes`）、**反 slop 写作**（`humanizer`、`i-have-adhd`），以及作为对不透明 chunk 库反应的 **无向量 RAG**（Graphify、PageIndex）。教育与 GTM（`OpenMAIC`、`marketingskills`、`open-seo`、`career-ops`）则说明 skills 正在离开仓库本身。

这与 2026 年中的行业事件对齐：DeepSeek 级 harness 发布、Claude Code / Codex 插件市场、开源权重（Kimi、GLM-5.x、Qwen、gpt-oss）让 *agent 层* 变成稀缺资产，以及 Anthropic 与 OpenAI 的官方 skill 目录把 `SKILL.md` 变成交换格式。社区不再给「又一个 agent 框架」点 star，而是给那些行为包和控制平面点 star——它们能让你手头已有的模型表现得像一名资深同事。

---

## 4. 社区热点

- **[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) + [blader/humanizer](https://github.com/blader/humanizer)** — 输出质量类 skills。ADHD 友好回答一周 +13k，是产品信号：agent 啰嗦已成为面向用户的缺陷，而不再是 prompt 调参脚注。
- **[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) + [mattpocock/skills](https://github.com/mattpocock/skills)** — 把工程品味编码成 skills（最小 diff、TDD、spec-to-tickets）。若你已生活在 Claude Code / Codex 里，这是杠杆最高的安装项。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — 若要在多个 CLI 上统一 skills、hooks、MCP 与 memory，这是值得研究的跨 harness 控制平面。
- **[tt-a1i/archify](https://github.com/tt-a1i/archify) + [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) + [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)** — 交付图表和视频、而不只是代码的 agent。若你的流水线终点是给人审阅的产物，值得对着它们建。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) + [Tencent/WeKnora](https://github.com/Tencent/WeKnora) + [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** — 要么原生是图、要么会维护 wiki、要么跨会话持久的知识层。对「我的 agent 每天早上都把仓库忘光」的实用回答。