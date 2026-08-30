# AI 开源趋势周报 2026-08-30

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-30 07:55 UTC

---

# AI 开源趋势报告  
**日期：** 2026-08-30 · 来源：GitHub Trending（本周）+ 按主题标记的活动（近 7 天）

---

## 1. 本周要点

本周真正的信号不是新模型发布，而是 **Agent Skills** 正在成为可移植、一等公民级的产物。Anthropic 与 Cursor 的官方及社区插件目录，再加上三个大型精选 skill 目录，一同登上本周趋势榜，指向 Claude Code、Codex、Cursor、Gemini CLI 及相关 CLI 之间共享的「skills pack」格式。终端原生编程 Agent 也在推进：OpenAI 的 `codex`、Apache Maka（孵化中，本地优先的 Agent 工作区，带仅追加事件日志），以及若干「免费使用前沿 Agent」的封装项目，本周都收获了数千 star。垂直 Agent（求职、科研、架构图、GPT-Image-2 prompt 引擎）的热度超过了通用聊天 UI。本地优先个人 Agent（`openhuman`、Maka）以及免费多厂商 LLM 网关（`freellmapi`、`free-claude-code`）表明社区正在优化所有权、成本和 harness 复用，而不是再做一个托管聊天机器人。

---

## 2. 按类别的热门项目

### 🔧 AI 基础设施

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [openai/codex](https://github.com/openai/codex) | Rust | 0 (+7775) | 运行在终端里的轻量编程 Agent。OpenAI 官方 harness，周增长强劲，团队正把 CLI Agent 当作默认编码界面。 |
| [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) | TypeScript | 0 (+2691) | 用单个 `/v1` 端点聚合 34 家免费 LLM 提供商、635 个免费模型端点，带路由、故障转移与密钥加密。token 预算吃紧时，很适合当作个人实验层。 |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Python | 0 (+1603) | Anthropic 维护的高质量 Claude Code 插件目录。社区 skill pack 正在对标的官方目录。 |
| [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community) | Python | 0 (+2234) | Claude Cowork / Claude Code 插件的只读社区市场镜像。说明插件提交与发现已成为一等产品面。 |
| [cursor/plugins](https://github.com/cursor/plugins) | TypeScript | 0 (+1571) | Cursor 插件规范及官方插件。补齐了本周 skill 作者同时面向的双 IDE 插件故事（Claude Code + Cursor）。 |
| [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code) | Python | 0 (+4942) | 封装层，可在终端、App、IDE 或手机上把 Claude Code、Codex、Pi、OpenCode 等接到大批免费 token 池。降低试用新 harness 的成本，因此本周 star 很高。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 179,764 | Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型的本地运行器。仍是 Agent CLI 默认叠在上面的本地推理前端。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,623 | 文本、视觉、音频与多模态模型的模型定义框架。训练、转换或服务这波 Agent 背后的模型时，依然是共享底座。 |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [apache/maka](https://github.com/apache/maka) | TypeScript | 0 (+1876) | Apache 孵化中的本地优先 AI Agent 工作区，把消息、工具调用、结果、权限决策与终止写入仅追加日志。值得关注的是 Apache 背书、可审计的 Agent 运行时，而不是又一个聊天封装。 |
| [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) | Rust | 0 (+2434) | 个人「超级智能」：本地优先人生记忆、Agent 舰队编排器与深度研究员。本周暴涨反映了对坐在众多工具之上的私有大脑的需求。 |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | — | 0 (+2341) | 精选 1000+ 官方与社区 Agent Skills，兼容 Claude Code、Codex、Gemini CLI、Cursor 等。本周 skills 标准的索引仓库。 |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Python | 0 (+3642) | 165 个已验证科学 skill，外加 100+ 科学数据库（生物、化学、医学、药物发现）。宣称被 190,000+ 科学家使用，并兼容开放 Agent Skills 标准。 |
| [tt-a1i/archify](https://github.com/tt-a1i/archify) | JavaScript | 0 (+14875) | 生成可核验架构、工作流、时序、数据流与生命周期图的 Agent Skill，输出带动效、可清晰导出的自包含 HTML。本周 AI 趋势榜周增 star 最高。 |
| [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | CSS | 0 (+1154) | 覆盖网页设计、知识检索、图像生成等的开放 skill pack。又一个信号：「skills 合集」正在成为新的 awesome-list。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 238,240 | `ai-agent` 主题下长期运行的「会陪你一起成长的 Agent」。显示新 skill 格式正试图接入的既有装机量。 |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | Python | 75,623 | 用 bash 从零实现的迷你 Claude Code 风格 Agent harness。作为当前编程 Agent 循环的可读参考实现很受欢迎。 |

### 📦 AI 应用

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+13141) | 面向 GPT-Image-2 的「Prompt as Code」引擎与模板库：530+ 逆向案例、20+ 工业模板，并抽成 Skills。本周 AI 周增 star 第二；图像提示词正在被打包装成 Agent Skills。 |
| [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search) | Python | 0 (+5145) | 跑在 Claude Code 上的本地 AI 求职框架：评估岗位、定制简历、写求职信、准备面试。Fork 即自有的定位契合本周本地优先氛围。 |
| [santifer/career-ops](https://github.com/santifer/career-ops) | JavaScript | 69,335 | 开源 AI 求职工具：扫描门户、按 A–H 打分、定制简历，并在 Claude Code / Codex / OpenCode 内跟踪投递。与 `ai-job-search` 同属垂直场景，装机量更大。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,295 | LLM 驱动的多市场股票系统：多源行情、新闻、决策看板、定时推送，按近零成本运行设计。是具体 Agent 应用，而不是框架。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 50,271 | 把文档或主题做成原生 PowerPoint，含真实形状、转场、图表、表格、旁白与用户模板。高实用度的文档 Agent，在 agent 主题检索里反复出现。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,246 | AI 生产力工作室：智能对话、自主 Agent，以及覆盖多家前沿 LLM 的 300+ 助手。桌面「Agent 工作台」这一类应用。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 118,626 | 主题到高清短视频的流水线，LLM 加自动化。仍是开源 AI 短视频生成的参考技术栈。 |

### 🧠 LLM / 训练

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 0 (+3488) / 51,072 | 「学会、做出、上线」课程，也出现在 ML 主题列表。本周 star 暴涨说明工程师仍需要端到端构建指南，而不只是 Agent 封装。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,030 | 用 PyTorch 逐步实现类 ChatGPT 的 LLM。想搞懂 Agent 底下那层模型时，仍是标准教学仓库。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 55,209 | 约两小时从零训练 6400 万参数 LLM。适合本地实验，以及租不起大集群的人。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,665 | 带 GPU 加速的核心张量与动态网络库。上面多数教程与自定义模型仍默认这一训练/推理底座。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 198,026 | 通用开源机器学习框架。本周叙事弱于 Agent 技术栈，但仍是主题集合里体量最大的经典 ML 基础设施仓库。 |

### 🔍 RAG / 知识

| Project | Lang | Stars (total / this week) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 150,381 | 面向 Ollama、OpenAI 兼容 API 与本地 RAG 的用户界面。团队自托管检索 + 对话时的默认前端。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,262 | Agent 工程平台，仍锚定大量 RAG 与工具调用生产栈。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 89,618 | 把 Agent 能力折进上下文层的 RAG 引擎。常被当作相对 notebook demo 的「RAG + Agent」生产替代方案。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 92,606 | 为 Claude Code、Codex、Gemini、Hermes、Copilot、OpenCode 等提供跨会话持久记忆：捕获、压缩、回注。直接补 CLI Agent 的记忆空洞。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 112,391 | 用确定性 AST 解析把代码库加上文档、SQL、配置与 PDF 变成可查询知识图谱（无向量库）。以 skill 形式面向 Claude Code / Cursor / Codex / Gemini CLI 发布。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 64,340 | AI Agent 的通用记忆层。与 Maka、claude-mem 这类会话日志工具互补，提供可复用记忆 API。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 45,876 | 面向大规模 ANN 检索的云原生向量数据库。仍是许多 RAG 部署背后的横向扩展检索后端。 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,261 | EMNLP 2025 的 RAG 方法，定位简单、快速。持续吸引想要图风格检索、又不想上一整套平台的实现者。 |

---

## 3. 趋势信号分析

本周爆炸性关注点落在 **打包好的 Agent Skills 与插件目录**，而不是新的基座模型。`archify`（+14,875）、`awesome-gpt-image-2`（+13,141）、`scientific-agent-skills`（+3,642）、`awesome-agent-skills`（+2,341），再加上 Anthropic 与 Cursor 的官方插件仓库，描述的是同一件事：skill 是一份可版本化、可复用的能力（提示词、工具、模板、图表、科研工作流），任何合规的编程 Agent 都能加载。这是比 MCP 式工具服务更高一层：MCP 负责接工具；skills 编码的是 Agent **如何**为某项工作使用这些工具。

第二条技术栈是 **终端编程 Agent + 免费 token 网关**。OpenAI `codex`、Apache Maka、`learn-claude-code`、`free-claude-code` 和 `freellmapi` 把 Agent harness 当产品，把模型当可替换后端。Maka 对消息、工具、权限与终止的仅追加日志，是可审计性与本地优先运维的新方向——更接近事件溯源工作区，而不是聊天记录。

**本地优先个人 Agent**（`openhuman`、Maka，以及主题集合里 AnythingLLM 一类应用）和 **垂直 Agent**（求职、股票分析、PPT 生成、科学数据库、GPT-Image-2 工业提示词）拿到的 star 多于通用多 Agent 框架。Graphify「不靠向量库、用 skill 建知识图谱」以及 `claude-mem` 表明 RAG 正在演变成 *Agent 原生记忆*，而不是单独的索引产品。

这与当前产业形态一致：Claude Code / Cursor / Codex 作为日常 IDE，开源模型（Qwen、GLM、DeepSeek、gpt-oss、Kimi）经 Ollama 本地提供，成本压力让免费端点聚合器以及可 fork 的求职/科研 pack 立刻有用。接下来该盯的新产物不是又一份 Agent 框架 README，而是能在多家厂商 CLI 上跑起来的 skill pack。

---

## 4. 社区热点

- **[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) + 官方插件目录** — 若你要交付能力，一次对齐正在成形的 Agent Skills / Claude Code / Cursor 插件格式，而不是维护五套自定义 prompt 文件夹。
- **[tt-a1i/archify](https://github.com/tt-a1i/archify)** — 本周 AI 周增 star 最高；「架构即 skill」（动效 HTML + 导出）是其他领域会复制的具体模式。
- **[apache/maka](https://github.com/apache/maka)** — Apache 孵化加上仅追加的 Agent 事件日志，是本周对需要审计轨迹与本地优先运维的团队最有意思的 *运行时* 设计。
- **[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)** — 垂直 skill + 精选科学数据库；后续法律、金融、制造等域 pack 会照这个模板走。
- **[tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) 与 [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** — 个人记忆 + 舰队编排 vs. 会话记忆注入。二者合起来定义了开发者此刻真正往编程 Agent 里接的两层记忆。