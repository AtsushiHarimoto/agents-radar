# AI CLI 工具社区动态周报 2026-09-14

> 生成时间: 2026-09-13 22:07 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

先核对 Gemini CLI 的公开发布状态，再按规则把整篇报告译成简体中文。Gemini CLI digest 缺失；我将核对是否存在当前公开快照，以便对比表保持完整。
# AI CLI 工具横向对比 — 2026-09-14

来源：Claude Code、OpenAI Codex、GitHub Copilot CLI、OpenCode、Pi 与 Qwen Code 的社区 digest 包；Gemini CLI digest 生成失败，因此 Gemini 仅依据公开发布/渠道状态纳入。

## 1. 生态总览

AI 编程 CLI 已不再是「终端里的聊天」。它们正在变成多表面 Agent 运行时：TUI + Desktop + IDE + 远程控制 + plugin/MCP 市场，并带有 effort/reasoning 旋钮（`max` / `ultra`）、Skills、worktrees，以及会话导入/导出。发版节奏极快——Claude Code 2.1.265–270、Codex 0.155.0-alpha.3.x、Copilot CLI 1.0.84-x、Qwen Code 0.23.3、OpenCode 1.18.30 外加早期 v2 标签——这种速度正在与次级表面（Windows/WSL、Desktop 自动更新、VS Code、MCP 握手）发生碰撞。本周真正的共同战场不是模型质量，而是 **会话完整性、sandbox/权限、MCP 生命周期、用量记账，以及长会话 TUI/堆内存存活**。把 CLI 当日常主力的团队应当锁定版本，并把「latest」当金丝雀，而不是默认值。

## 2. 活跃度对比

下表计数是 **本周 digest 窗口**，不是仓库生命周期总量。「热点 issue / 关键 PR」是维护者或 digest 作者选出的条目。digest 未拆出 Discussions 或未提供该渠道时标为 **N/A**——不视为不活跃。

| Tool | Hot issues (digest) | Key PRs (digest) | Discussions (digest) | Release status this window |
| --- | --- | --- | --- | --- |
| **Claude Code** | 10 + 若干值得一提项（Desktop 重启 #42776，多账号 #36151） | 列出约 10 项（plugin eval/tests、hooks、`/diff`） | digest 未按独立渠道拆出 | **密集稳定补丁：** v2.1.265 → v2.1.270 |
| **OpenAI Codex** | 10 + 若干值得一提项（WSL 项目生命周期、配额元跟踪器） | 列出约 10 项，窗口内 **全部已关闭** | Ideas/Q&A/Show-and-tell 活跃（远程控制 190 👍，`/rewind` 134 👍） | **Rust alphas** 0.155.0-alpha.3–3.10 + **Python SDK 0.154.0** |
| **Gemini CLI** | Digest **失败** — issue/PR/discussion 计数按 **N/A** 处理 | **N/A** | **N/A** | 仍在发版：稳定版 **v0.59.0**（2026-09-08），预览版 **v0.60.0-preview.0**，nightly 到 **v0.61.0-nightly.20260913**；消费级免费档此前已指向 Antigravity CLI |
| **GitHub Copilot CLI** | 列出 10 项（Vim 已关闭；MCP/OOM/WSL 仍开放） | 24 小时内约 10 项（若干 bot/docs/security） | 未收录 → **N/A** | **v1.0.84-2 … 1.0.84-5**（Vim GA、JSONL 导入、plugin 拆分命令） |
| **OpenCode** | 10（剪贴板仍以 👍 数排第一；1.18.30 崩溃；Zen/Muse 报错） | 约 10 项（context-window fail-fast、`tool_choice`、图片 URL） | 功能请求更多落在 Issues，而非独立 digest 分区 | **v1.18.30** 为最新说明；**v2.0.0–v2.0.3** 标签已开始与用户撞车 |
| **Pi** | 10（TUI 缩放、compaction thinking cap、Codex 超时） | 约 10 项（Foundry、Muse OAuth、serverTools、对话中途系统消息） | Show-and-tell 很强（多个独立 GUI 跑在 `pi --mode rpc` 上） | **过去 24 小时无发版** |
| **Qwen Code** | 7 个有更新的 issue（👍 偏少；TUI React 崩溃、AUTO 审批） | 约 10 项产品/CI PR（容器子 Agent、Playwright SDK、结构化记忆） | 未收录 → **N/A** | **v0.23.3** + nightlies，Desktop **v0.3.0**，TS SDK **0.1.12**，CUA driver **v0.20.6** |

## 3. 共同功能方向

在 **两个或以上** 社区反复出现的诉求：

- **Skills / plugins 应是平台，而不是一文件夹 markdown**  
  Claude Code：`claude plugin eval`、`--plugin-dir`，一线模组按源码交付。Copilot CLI：`instruction list` / `lsp list` / plugin 启用-禁用，`disable-model-invocation` 仍坏。OpenCode/Qwen：slash-skill 参数，以及 resume 时 Skill 副作用。跨表面 Skills 同步是 Claude 的明确需求（Desktop ↔ CLI）。

- **MCP 必须符合规范，且对会话安全**  
  Copilot：`initialize` 之前要先 `server/discover`，OAuth 端口不匹配，`--resume` 会杀掉 stdio 服务器，工作区 `.mcp.json` 被忽略。OpenCode：新 UI 缺少 MCP 开关。Claude：Chrome MCP profile 消歧。Gemini 本周公开说明强调 MCP OAuth SSRF 加固，以及受限模式下的 MCP 过滤。

- **Effort / reasoning 作为一等策略**  
  Codex 已上线 `max` / `ultra`。Claude 在 Bedrock/Vertex/Foundry 加上了 `maxEffortLevel`。Pi 正在把 compaction 与继承来的 thinking level 解耦，以免自适应 thinking 裁掉 `max_tokens`。用户希望 effort 跨会话持久化，而不是每次重问。

- **撤销、rewind、会话保真**  
  Codex 讨论区在要 `/rewind` / `/revert`。Qwen 正按稳定 prompt 身份重构 rewind，并在 resume 时恢复 Skill hooks。Claude/Codex/OpenCode 都报告升级后历史被清空或「会话卡住」。Copilot 增加了语义化 JSONL 会话/记忆 **导入**。

- **远程 / 多客户端控制**  
  Codex：ChatGPT 移动端 → 无头 Codex（190 👍）。Claude：Windows 自动更新会丢掉 Remote Control 桥。Pi：RPC disposition 事件，让 GUI 知道是排队还是已启动。VS Code「stale thread owner」出现在 Codex，Claude 则有通知缺口。

- **Windows / WSL 仍是默认故障簇**  
  Claude Desktop 重启锁死；Codex 的 WSL 项目创建/删除与 sandbox Git HTTPS；Copilot WSL 215% CPU + plugin 文件锁；OpenCode 离线安装器缺 ripgrep，Desktop 静默中止；Pi 的 Windows Store shell 别名，以及 2 核重绘饱和。

- **可观测性与诚实计量**  
  Claude：时间戳、隐藏内联 diffs、`/cost` 与网关定价对齐。Codex：配额 UI 对本地日志、第三方限额看板。Copilot：HydraFusion/OTel 阶段额度。OpenCode：固定 prompt 开销已超出窗口时 fail-fast。Pi：启动耗时预算 vs jcode。

- **权限作为可持久策略**  
  Plan agent 无视父级 `settings.json`（Claude），授权疲劳 / 1 小时自动批准过期（Copilot），AUTO 模式确认到不了分类器（Qwen），worktree 预批准，用操作系统密钥库替代明文凭据。

## 4. 差异化分析

| Tool | Feature focus this week | Target user | Technical approach |
| --- | --- | --- | --- |
| **Claude Code** | Plugin eval 测试架、多 plugin 加载、网关定价/遥测对齐、effort 上限、Skills 同步欠债 | 横跨 Desktop + CLI + Cowork 的 Anthropic 栈重度用户 | CLI 补丁列车很快；产品缺口仍停在 Desktop/鉴权；plugins 正在变成带同仓测试的工程化子系统 |
| **Codex** | Reasoning-effort 取值、Windows sandbox 所有权/清理、TUI 历史/搜索、command-center 会话 | 想要同一账号打通 agent + Desktop + VS Code 的 ChatGPT 套餐订阅者 | Rust 核心 + Python SDK；sandbox/worktree 投入很重；社区在补仪表、协调器、`/rewind` |
| **Gemini CLI** | 安全围栏：MCP OAuth SSRF、失败即关闭的工作区信任、受限 MCP、工具输出出处 | Google 生态 / 企业 Code Assist；消费级免费路径已被导向 Antigravity | 每日 nightly + 每周 stable/preview；digest 缺口让本周社区热度更难打分 |
| **Copilot CLI** | Vim GA、语法驱动补全、JSONL 会话导入、plugin/LSP 列表拆分 | 已在 Copilot/VS Code 里的 GitHub 原生开发者 | Node TUI；企业 MCP（Atlassian 等）；堆内存/`--resume` 脆弱是长会话的税 |
| **OpenCode** | 多供应商下沉（Bedrock ARN、空 `tool_choice`、图片 URL）、Astra prompts、v1→v2 布局 | 供应商无关 / OSS 优先用户，含加密货币 Pay-Go 需求 | 版本节奏激进（v1 稳定版崩溃 + 已有 v2 标签）；当前火线是 AI payload 正确性 |
| **Pi** | TUI 缩放、供应商完整度（Azure Foundry、Muse/Antigravity/Cursor Pro OAuth）、`serverTools`、面向外部 GUI 的 RPC | 扩展/RPC 构建者与多供应商机群 | 发版日相对安静；能量在 **向外** 流向独立 GUI，而不是押注一线 Desktop |
| **Qwen Code** | Reasoning 预设、容器化子 Agent、Playwright 浏览器 SDK、结构化记忆、web-shell 操作员体验 | Qwen/Kimi/DeepSeek 用户，以及想要隔离子 Agent 的团队 | 单体仓覆盖 CLI + Desktop + TS SDK + CUA driver；CI 堆内存与 TUI React 循环是当前拖累 |

## 5. 社区动能与成熟度

- **产品热度最高：** Claude Code 与 Codex。长寿命 issue 动辄数百 👍（多账号 721 👍；Desktop 重启 181 条评论），叠加密集官方补丁。它们看起来像 **品类在位者**，社区现在报的是 *平台级* 缺陷（身份、远程桥、配额可信度），而不是「请加个聊天」。
- **原始迭代最快：** Claude 2.1.265–270、Codex alpha.3.x 爆发、Copilot 1.0.84-x、Qwen nightlies。快车正在修核心 CLI，而 IDE/Desktop/WSL 落后——Claude 与 Codex 的痛点章节都点名了这一点。
- **核心外围生态：** Codex（Awesome 列表、CoCo、Polter、限额看板）与 Pi（Heao、Phosphor、Pi Manager、基于 RPC 的 Eco Coding）通过 **第三方壳** 体现成熟度，这通常意味着协议有用、官方 UX 还不完整。
- **「更新很危险」风险最高：** OpenCode 1.18.30 首条 prompt 就崩溃 + Zen `encrypted_content` 报错，同时 v2 标签已经存在。Claude 2.1.269 的 WSL 听写粘贴，以及自动更新丢掉 Remote Control。把 latest-stable 当金丝雀。
- **Copilot CLI** 处于中等成熟：Vim 诉求在长期呼声后关闭，交换格式落地，但 MCP 握手与 4 GiB 堆 OOM 仍是长 `--resume` 工作的生产阻断项。
- **Qwen Code** 正在铺最宽的 *表面集合*（Desktop、SDK、CUA driver、容器后端），公开 👍 偏轻；信号在 CI/TUI 正确性，不在病毒式 issue。
- **Pi** 在架构上显得成熟（会话树裁剪、对话中途系统消息、供应商矩阵），但规模化 TUI 渲染还谈不上「完成」。
- **Gemini CLI** 仍是高星公开项目，nightly/preview/stable 渠道纪律清晰，但本周缺失 digest，再叠加消费级 → Antigravity 分流，社区动能更难做苹果对苹果比较。

## 6. 趋势信号

1. **瓶颈已从「模型会不会写代码」转到「运行时能否让一周长的 Agent 会话保持诚实」。** 升级后历史、排队的后续、卡住的会话、静默 `AbortError`，以及 resume 时丢掉 MCP 或 Skill hooks，现在都是一等产品缺陷。

2. **MCP 既是互操作层，也是最锋利的刃。** 规范顺序（`initialize` vs `discover`）、OAuth 回调端口、resume vs stdio 生命周期、受限模式过滤、元数据发现中的 SSRF，是各家同一类问题。团队应把握手集成时间算进预算，而不是只算工具 schema。

3. **Windows/WSL 仍不是一等 Agent 操作系统。** Sandbox 凭据、Defender 拦未签名 Computer-Use 二进制、IDE 带来的文件锁、macOS 的 TCC/Local Network，以及自动更新丢掉远程桥，都是结构性问题，不是一次性事故。

4. **用量仪表需要接近密码学级别的可信度。** Codex 用户自建第三方看板，因为 5 小时进度条会在几分钟内从 70% 跳到 100%。Claude 正在接入网关 `pricing:`，让 `/cost` 与花费仪表对齐。可以预期采购方与重度用户会要求 token 级对账。

5. **Agent 控制平面正在任何单一供应商之外成型。** Planner/worker（ChatGPT + Codex workers）、CoCo/Polter 监督器、Pi RPC GUI、Qwen 容器后端、Claude plugin eval——开发者应按 **编排多套 CLI** 来设计，而不是嫁给某一个二进制。

6. **给决策者的实用建议**
   - 锁定补丁版本；在远程/WSL 机群上推迟 Desktop 自动更新。
   - 若要跑长寿命 Agent，优先选择有明确会话交换格式的工具（Copilot JSONL；Qwen 按 prompt-id rewind；Claude plugin eval）。
   - 若 Windows + sandbox + Git 远程不可妥协，本周把 Codex 与 Claude Desktop 相关问题视为已知残余风险。
   - 若多供应商与自定义 GUI 比打磨过的一线 Desktop 更重要，Pi 与 OpenCode 是更利于扩展的押注——若撞上崩溃，OpenCode 需先避开 1.18.30。
   - 把 MCP + 权限策略当成平台级工作流来排期，而不是一下午的配置任务。

市场正在收敛到同一张清单：可持久身份、可持久会话、可持久权限、诚实成本，以及能熬过 resume 的 MCP。只赢模型赛道的厂商，在这五项于 Windows、WSL 和 Desktop——而不只是干净的 Linux TUI——站稳之前，仍会丢掉日常主力用户。

---

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

我会先拉取官方仓库页面，确保评论数和 PR 状态准确后再进行排名。
# Claude Code Skills 社区精选  
**来源：** [anthropics/skills](https://github.com/anthropics/skills) · 快照 **2026-09-14**  
PR 视为 Skill 提交；Issue 视为需求信号。源提取中的 PR 评论数未设置，因此下方排名依据 **更新时效、Issue 关联与主题权重**。

---

## 1. Top Skills 排名

**1. skill-creator eval harness（trigger / recall = 0%）**  
[PR #1298](https://github.com/anthropics/skills/pull/1298) · OPEN · 更新于 2026-09-13  
[Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 👍）· 相关 [PR #1099](https://github.com/anthropics/skills/pull/1099)、[Issue #1721](https://github.com/anthropics/skills/issues/1721)  

**功能：** 修复 `run_eval.py`，避免 description 优化对着噪声优化。当前每条 description 的得分都是 `recall=0%`；Windows 管道读取、触发检测和并行 worker 全部失效。  
**为何重要：** 这是官方的编写闭环。评测一旦失效，社区 Skills 就无法被衡量或改进。仓库中存活最久的缺陷簇（3 月–9 月）。  
**状态：** Open；截至 9 月中旬仍在修补。

**2. mcp-builder（MCP ≥2 + 评测可靠性）**  
[PR #1742](https://github.com/anthropics/skills/pull/1742) · OPEN · 更新于 2026-09-13  
另有 [PR #1724](https://github.com/anthropics/skills/pull/1724)、[PR #1602](https://github.com/anthropics/skills/pull/1602)、[Issue #1390](https://github.com/anthropics/skills/issues/1390)  

**功能：** 让 *构建 MCP 服务器* 的 Skill 保持最新：`streamable_http_client` 重命名、自定义 headers、默认模型改为 `claude-sonnet-5`，以及 MCP 返回 `TextContent` 时停止伪造工具错误。  
**为何重要：** MCP 是 Skills 与工具通信的主要方式。构建器 Skill 一旦损坏，失败会在每一次新集成中被放大。  
**状态：** Open；多层修复叠加，最后一次改动 9 月 13 日。

**3. document-typography**  
[PR #514](https://github.com/anthropics/skills/pull/514) · 自 2026-03-04 起 OPEN  

**功能：** 生成文档的排版质检——孤行换行、寡行标题、编号错位。  
**为何重要：** 覆盖所有 Claude 产出的文档；作者认为用户从不会主动要求排版，因此该 Skill 必须在未提示时自动触发。  
**状态：** Open，自 3 月起停滞——概念需求高，合并速度低。

**4. frontend-design 清晰度重写**  
[PR #210](https://github.com/anthropics/skills/pull/210) · OPEN  
官方 skill 后来已在 main 上更新（[#1713](https://github.com/anthropics/skills/commit)，9 月 3 日），以避免泛化设计默认值。  

**功能：** 让 frontend-design 指令在单次对话中即可执行，而不是论文式指南。  
**为何重要：** 外部排名中可见度最高的官方 Skills 之一；社区仍希望更强的可执行性。  
**状态：** 社区 PR 仍开放；官方主线已在迭代。

**5. Pyxel 复古游戏 Skill**  
[PR #525](https://github.com/anthropics/skills/pull/525) · OPEN · 更新于 2026-09-13  

**功能：** [pyxel-mcp](https://github.com/kitao/pyxel-mcp) 工作流：编写 → run_and_capture → 检查 → 迭代 Python 像素/8-bit 游戏。  
**为何重要：** 少见的「趣味 + MCP + 闭环」Skill；开放半年后仍在更新。  
**状态：** Open，维护活跃。

**6. Hivemind — 零成本多智能体编排**  
[PR #1628](https://github.com/anthropics/skills/pull/1628) · OPEN  

**功能：** Claude Code 负责规划/审查/合并；廉价无头 [opencode](https://opencode.ai) worker 承担机械性工作。  
**为何重要：** 明确回应「上下文即稀缺资源」。与后续 `/skill-doctor` 针对未使用 Skill token 成本的工作一致。  
**状态：** Open（8 月 21–24 日集中爆发）。

**7. self-audit / 推理质量门禁**  
[PR #1367](https://github.com/anthropics/skills/pull/1367) · OPEN  
配套提案 [Issue #1385](https://github.com/anthropics/skills/issues/1385)  

**功能：** 先做机械文件校验，再按损害严重程度进行四维推理审计。通用、与技术栈无关。  
**为何重要：** 社区要的是 *交付门禁*，而不是更多生成器。  
**状态：** Open；已提出 v1.3.0，尚未合并。

**8. Buffer GraphQL Agent Skill**  
[PR #1627](https://github.com/anthropics/skills/pull/1627) · OPEN · 更新于 2026-09-05  

**功能：** Buffer GraphQL API 的可移植 Skill——发现渠道、调度（`addToQueue` / `customSchedule`）、从任意 agent 运行时分析帖子。  
**为何重要：** 具体的「Skill 作为可移植 API 包装器」模式，超越仅限 Anthropic 的工具。  
**状态：** Open。

仍开放的荣誉提名：[ODT Skill #486](https://github.com/anthropics/skills/pull/486)、[scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615)、[docx comment/orphan + bookmark ID 修复 #1734 / #541](https://github.com/anthropics/skills/pull/1734)、[skill-quality + security analyzers #83](https://github.com/anthropics/skills/pull/83)。

---

## 2. 社区需求趋势（来自 Issues）

| 主题 | 信号 | 链接 |
|---|---|---|
| **信任与命名空间** | 本集合中评论最多的 Issue | [#492](https://github.com/anthropics/skills/issues/492) — 43 条评论。以 `anthropic/` 发布的社区 Skills 会冒充官方 Skills，并继承更高信任。 |
| **组织级共享** | 产品缺口，8 👍 | [#228](https://github.com/anthropics/skills/issues/228) — 没有 Slack 传文件再重新上传的工作流。 |
| **评测 / 触发可靠性** | 阻断 Skill 质量闭环 | [#556](https://github.com/anthropics/skills/issues/556)、[#1721](https://github.com/anthropics/skills/issues/1721)、[#1390](https://github.com/anthropics/skills/issues/1390) |
| **上下文卫生** | 注入内容过多的 Skills | [#1487](https://github.com/anthropics/skills/issues/1487)（`claude-api` 约 156k tokens）；重复项 [#189](https://github.com/anthropics/skills/issues/189) |
| **治理 / 安全 Skills** | 已提案，尚未作为官方发布 | [#412](https://github.com/anthropics/skills/issues/412) agent-governance；[#1175](https://github.com/anthropics/skills/issues/1175) SharePoint ACL-in-SKILL.md 风险 |
| **紧凑 agent 状态** | 把上下文压缩做成 Skill | [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` |
| **Skills ↔ MCP** | 把 Skill 当作 MCP 表面 | [#16](https://github.com/anthropics/skills/issues/16) |
| **企业运行时** | Bedrock / 平台缺口 | [#29](https://github.com/anthropics/skills/issues/29) |

预期的 *新 Skill 方向*（不只是修 bug）：**质量/安全分析器**、**推理门禁**、**记忆压缩**、**HPC/Slurm 运维**、**社交调度 API**、**DOCX/PDF 之外的文档格式（ODT、排版）**、**组织级 Skill 库**。

---

## 3. 高潜力待合并 Skills

因其仍为 OPEN **且** 近期有改动，或能解锁其他 Skills，故很可能落地或持续吸引审查：

| Skill / PR | 可能很快落地的原因 |
|---|---|
| [fix skill-creator eval #1298](https://github.com/anthropics/skills/pull/1298) | 解锁所有作者；昨天（9 月 13 日）刚更新。 |
| [mcp-builder mcp≥2 #1742](https://github.com/anthropics/skills/pull/1742) | 与当前 MCP 存在兼容性断裂；9 月 13 日更新。 |
| [Pyxel #525](https://github.com/anthropics/skills/pull/525) | 存活半年，9 月 13 日仍在更新——维护者响应及时。 |
| [Buffer API #1627](https://github.com/anthropics/skills/pull/1627) | 干净的可移植 API 模板；9 月 5 日有改动。 |
| [Hivemind #1628](https://github.com/anthropics/skills/pull/1628) | 成本套利多智能体模式；概念上与官方上下文审计工作对齐。 |
| [self-audit #1367](https://github.com/anthropics/skills/pull/1367) + [quality gate #1385](https://github.com/anthropics/skills/issues/1385) | 补充（而非取代）官方 `/skill-doctor`。 |
| [claude-api retired IDs #1607](https://github.com/anthropics/skills/pull/1607) | 改动小而正确，解除 model-card 漂移阻塞。 |
| [UIZZE partner listing #1595](https://github.com/anthropics/skills/pull/1595) | 市场/合作伙伴展示面，代码风险低。 |

陈旧但有价值：排版 [#514](https://github.com/anthropics/skills/pull/514)、ODT [#486](https://github.com/anthropics/skills/pull/486)、分析器 [#83](https://github.com/anthropics/skills/pull/83) — 需求真实，审查带宽不足。

---

## 4. Skills 生态洞察

**社区集中的需求不是「更多 Skills」——而是可信、可衡量、上下文廉价的 Skills：可用的评测闭环、清晰的官方 vs 社区信任边界，以及阻止 agent 交付未验证或臃肿输出的门禁。**

---

# Claude Code 社区摘要 — 2026-09-14

Source: [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. 本周要点

Claude Code 密集发布了从 **v2.1.265 到 v2.1.270** 的补丁列车，聚焦插件（`claude plugin eval`、多插件 `--plugin-dir`）、网关定价/遥测对齐、Bedrock/Vertex/Foundry 全平台的 effort 上限，以及长时间会话后过期 git 权限提示的回归修复。社区热度仍集中在长期存在的产品缺口——Windows Desktop 重启锁定、多账号切换、Desktop/CLI Skills 同步——而 2.1.269+ 的新回归（VS Code WSL 中的听写粘贴、自动更新时 Remote Control 桥接断开）表明发布节奏已经跑在部分端前面。

## 2. Releases

**v2.1.270** — 修复长时间会话后，Bash 中只读 git 命令意外弹出权限请求的问题（2.1.269 引入的回归）。  
https://github.com/anthropics/claude-code/releases

**v2.1.269** — 新增 `claude plugin eval`（带评分、可复现的插件评测，输出 JSON + HTML 报告）。新增 `/output-style [name]` 用于列出/切换输出样式，覆盖 Remote Control 及云端/其他界面。

**v2.1.268** — 在 `gateway.yaml` 中增加 Gateway `pricing:`，使已登录客户端通过托管设置获得一致费率（`/cost` 与遥测与消耗计量对齐）。当 `access_control.allow_cidrs` 为空时给出启动警告。

**v2.1.267** — `maxEffortLevel`（顶层或 `modelSettings` 下按模型配置）在包括 Bedrock、Vertex 和 Foundry 在内的所有提供商上限制 effort。`--system-prompt-snapshot off` 会在每次请求时重新渲染系统提示。

**v2.1.266** — 修复 2.1.265 的网关/代理回归：`CLAUDE_CODE_USE_GATEWAY` 不再单独强制 Cloud 网关登录。

**v2.1.265** — 遥测现在通过网关为 Desktop/Cowork 包含 `user.email` 和 `user.groups`（与终端对齐）。`--plugin-dir` 可指向插件目录；带清单的子文件夹会加载并热更新。

## 3. Hot Issues

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776)** — Windows 上 Desktop 无法重新启动（孤立进程文件锁）。181 条评论，88 👍。互动量最高的缺陷；提交数月后用户仍在遇到。

2. **[#36151](https://github.com/anthropics/claude-code/issues/36151)** — Claude Mobile 在无共享邮箱的情况下切换多账号。176 条评论，**721 👍**。个人 + 工作账号上最突出的认证/产品诉求。

3. **[#20697](https://github.com/anthropics/claude-code/issues/20697)** — 在 Claude Desktop 与 Claude Code CLI 之间同步 Skills。44 条评论，154 👍。随着 Skills 成为一等公民，这是核心工作流断裂点。

4. **[#44763](https://github.com/anthropics/claude-code/issues/44763)** — 在会话消息上显示时间戳。37 条评论，88 👍。长时间运行 / 后台 agent 监控所必需。

5. **[#76694](https://github.com/anthropics/claude-code/issues/76694)** — Chat/Cowork 合并后 Cowork 丢失“选择文件夹”；右键菜单变成仅上传。24 条评论。破坏了多文件夹项目设置。

6. **[#37951](https://github.com/anthropics/claude-code/issues/37951)** — 为 Edit/Write 工具输出提供隐藏行内 diff 的选项。23 条评论，73 👍。高频文件编辑时 TUI 噪音过大。

7. **[#10906](https://github.com/anthropics/claude-code/issues/10906)** — 内置 Plan agent 忽略父级 `settings.json` 权限并反复提示。20 条评论，46 👍。自 2025 年末以来持续存在的 agent/权限不匹配。

8. **[#29928](https://github.com/anthropics/claude-code/issues/29928)** — VS Code 扩展的内置完成通知。13 条评论，32 👍。`Notification` / `idle_prompt` 在 VS Code 中不触发。

9. **[#93782](https://github.com/anthropics/claude-code/issues/93782)** — 2.1.269 回归：听写工具粘贴（剪贴板 + 模拟 Ctrl+V）无法插入 WSL2 上的 VS Code 集成终端。新问题，有复现；2.1.268 正常。

10. **[#94049](https://github.com/anthropics/claude-code/issues/94049)** — 自动更新静默断开所有 Remote Control 桥接；正在运行的会话无法重连（Windows，2.1.266→2.1.270）。对远程会话有高运营影响。

值得一提：Chrome MCP 配置文件消歧（[#74902](https://github.com/anthropics/claude-code/issues/74902)）、默认路径外的 worktree 预批准（[#77069](https://github.com/anthropics/claude-code/issues/77069)）、用于凭据的 OS secret store（[#73582](https://github.com/anthropics/claude-code/issues/73582)）、2.1.267 上 OAuth `redirect_uri` 被拒绝（[#93216](https://github.com/anthropics/claude-code/issues/93216)）、macOS TCC / Local Network SSH 失败（[#90227](https://github.com/anthropics/claude-code/issues/90227), [#93707](https://github.com/anthropics/claude-code/issues/93707)）。

## 4. Key PR Progress

1. **[#93951](https://github.com/anthropics/claude-code/pull/93951)** (OPEN) — 将 diff / sec-default / telemetry 测试移到对应 mods 旁；通过 `claude plugin test` 运行。

2. **[#93912](https://github.com/anthropics/claude-code/pull/93912)** (CLOSED) — 上述三个 mods 的单元测试，按插件声明做类型约束，经由引擎的 `$` 驱动。

3. **[#93215](https://github.com/anthropics/claude-code/pull/93215)** (CLOSED) — 将内置 hooks-module 插件以源码形式发布：`sec-default`、`diff`（`/diff`）、`telemetry`。

4. **[#93244](https://github.com/anthropics/claude-code/pull/93244)** (CLOSED) — 插件 API 重命名、收紧遥测、为 `/diff` 增加 git 后端接缝。

5. **[#93452](https://github.com/anthropics/claude-code/pull/93452)** (CLOSED) — 使 `/diff` mod 面板与内置 diff 面板对齐（hunks、关闭控件、空状态、缩放）。

6. **[#93932](https://github.com/anthropics/claude-code/pull/93932)** (CLOSED) — 将遥测 `types` 路径改为 `./` 相对路径，以匹配清单 schema。

7. **[#89404](https://github.com/anthropics/claude-code/pull/89404)** (OPEN) — `validate-agent.sh` 不再在第一条警告处中止；停止对有效 agent 的误报（`set -e` + 算术）。

8. **[#79148](https://github.com/anthropics/claude-code/pull/79148)** (OPEN) — 要求示例规则文件名带 `hookify.` 前缀，使随包示例真正能够加载。

9. **[#61716](https://github.com/anthropics/claude-code/pull/61716)** (OPEN) — 文档：虚假的“usage limit”往往是 1M 模型上 `/compact` 失败后的上下文溢出。

10. **[#39043](https://github.com/anthropics/claude-code/pull/39043)** (OPEN) — 从 Frontend Design Skill 中移除“retro-futuristic”建议。

另外值得关注：已关闭的构建/安装程序工作（[#41621](https://github.com/anthropics/claude-code/pull/41621), [#26175](https://github.com/anthropics/claude-code/pull/26175)）、hookify matcher 裁剪（[#42205](https://github.com/anthropics/claude-code/pull/42205)）、stale/autoclose 窗口从 14 天改为 90 天（[#63686](https://github.com/anthropics/claude-code/pull/63686)）。

## 6. Feature Request Trends

- **跨界面身份与资产**：无需共享邮箱的多账号切换；Skills 在 Desktop ↔ CLI 间同步；Cowork / claude.ai 上的社区插件市场。
- **TUI/IDE 可观测性**：消息时间戳、隐藏行内 diff、VS Code 中持久的当前模型指示器、可靠的“agent 完成”通知。
- **权限作为策略而非提示**：Plan agent 遵守父级 `settings.json`；在默认路径外预批准 `EnterWorktree`；跨会话持久化 `ultracode`/`max` effort（与新的 `maxEffortLevel` 相关）。
- **插件 / mods 平台**：评测框架、插件目录加载、第一方 mods 以源码发布并就近放置测试。
- **凭据与执行卫生**：用 OS secret store 替代 `~/.claude/` 下的明文；每个 Cowork 项目可见 Local vs Remote 执行模式。

## 7. Developer Pain Points

- **次级界面上的发布回归**：WSL+VS Code 粘贴、Windows 自动更新断开 Remote Control 桥接、OAuth 回调被拒、网关环境变量强制登录。快速补丁列车在修复核心 CLI，而 IDE/Desktop/远程仍滞后。
- **macOS TCC / 沙盒归属**：过期的 audit token、Documents 访问丢失、因子进程缺少 Local Network 权限导致 SSH “No route to host”。
- **Chat 合并后的 Cowork 项目模型**：“选择文件夹”消失；绑定单一文件夹；文档仍描述多文件夹行为。
- **Agent 权限循环**：尽管有允许列表，Plan agent 与 worktree 进入仍反复提示。
- **不透明失败**：Stop-hook 的“JSON validation failed”掩盖真实评测器错误；Workflow 名称静默解析为内置而非本地 `.claude/workflows/`；分类器按词汇而非意图触发。
- **Windows Desktop 生命周期**：孤立锁文件阻止重启，仍是评论最多、持续时间最长的缺陷。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区周报 — 2026-09-14

来源：[github.com/openai/codex](https://github.com/openai/codex)

## 1. 本周要点

Codex 密集发布了一批 **0.155.0-alpha.3.x Rust 构建**，以及 **Python SDK 0.154.0**，新增 `max` / `ultra` reasoning-effort 取值。社区热度主要集中在 **Windows sandbox 与 WSL 项目生命周期失败**、**额度/用量统计与本地日志对不上**，以及 **Desktop/app-server 线程状态**（排队 follow-up、更新后历史被清空）。内部 PR 显示，Windows sandbox 所有权/清理、TUI 历史/搜索、command-center 会话 UX 都在大力推进。

## 2. 发布

**Rust alpha（过去 24 小时）：** `0.155.0-alpha.3` 至 `0.155.0-alpha.3.10`，另有 `0.155.0-alpha.2` / `.2.3` 以及 `0.154.0-alpha.6.2`。本次 dump 中的发行说明很薄（仅 tag）。

**Python SDK 0.154.0：** `pip install --upgrade openai-codex==0.154.0`（Python 3.10+），配套 `openai-codex-cli-bin==0.154.0`。

本轮附带的主要产品说明：
- 新增 `max` 与 `ultra` reasoning-effort 取值 — [#39662](https://github.com/openai/codex/pull/39662)
- 在同步 API 中加入 `ExternalMessage`（源材料中说明被截断）
- 仅用于 CI 的 **Cygwin voice** 构建输入（`voice-cygwin-108b38cf…`）— 未随用户包发布

## 3. 热点 Issue

1. **[#41290](https://github.com/openai/codex/issues/41290)** — Windows + WSL：将 Agent Environment 切到 WSL 后，项目创建/删除失败（62 条评论，49 👍）。Windows 工作流中互动最高的阻断问题；环境切换后项目管理直接卡住。

2. **[#41220](https://github.com/openai/codex/issues/41220)** — 额度异常消耗 / 用量核算不一致的总跟踪 Issue（41 条评论）。横跨 Plus/Pro/Max 反馈；用户称额度掉得比 token 日志预测更快。

3. **[#30918](https://github.com/openai/codex/issues/30918)** — Plus 5 小时限额：约 6 分钟内从 70% 升到 100%（26 条评论）。额度问题族中有日志支撑的具体案例；更新两个月后仍未关闭。

4. **[#44781](https://github.com/openai/codex/issues/44781)** — Desktop：编辑/重发排队消息 → “App-server queued follow-up no longer exists”（21 条评论，26 👍）。在 Windows Desktop 26.903 + CLI 0.153.4 上打断迭代对话。

5. **[#31073](https://github.com/openai/codex/issues/31073)** — 原生 Windows sandbox：Git HTTPS remote 失败/崩溃；本地 Git 正常（23 条评论）。失败面隔离在 sandbox 凭据/网络路径。

6. **[#37856](https://github.com/openai/codex/issues/37856)** — VS Code 扩展：Web renderer 重载后线程所有者过期（“open in another application”）（13 条评论）。多客户端所有权粘滞；UI 没有恢复路径。

7. **[#42088](https://github.com/openai/codex/issues/42088)** — `function_call_output` 发出时缺少 `call_id` → 在严格的 `/responses` 上游返回 400（11 条评论）。自定义/OpenAI 兼容后端（如 DeepSeek）上恢复会话会失败。

8. **[#31419](https://github.com/openai/codex/issues/31419)** — Windows Defender 将未签名的 `codex-computer-use.exe` 标为 Trojan:Win32/ClickFix（9 条评论，7 👍）。未签名 Computer Use 二进制 vs 企业杀毒。

9. **[#45119](https://github.com/openai/codex/issues/45119)** — macOS 14.2 sandbox 启动：未绑定变量 `TIOCSTI`（8 条评论）。报告时 `main` 上已存在该 sandbox 规则集缺陷。

10. **[#40452](https://github.com/openai/codex/issues/40452)** / 相关 **[#45203](https://github.com/openai/codex/issues/45203)** — Desktop 更新后，分页线程历史塌成一次被中断的首轮对话，或变成空条目。升级后的数据丢失类 UX。

额外提及：Windows 安装 `helper_failed`（[#40550](https://github.com/openai/codex/issues/40550)、[#45003](https://github.com/openai/codex/issues/45003)），follow-up 永远发不出去（[#45069](https://github.com/openai/codex/issues/45069)），CLI 0.154.0 上 MCP Messages/Computer History 启动问题（[#44458](https://github.com/openai/codex/issues/44458)）。

## 4. 关键 PR 进展

截至 2026-09-13，下列 PR 全部为 **CLOSED**；多数作者为 `copyberry[bot]`。

1. **[#45276](https://github.com/openai/codex/pull/45276)** — 从 agents overview（`w`）创建 worktree session，使用缓存的默认分支 / remote HEAD。

2. **[#45271](https://github.com/openai/codex/pull/45271)** — 视口变高时保留 TUI scrollback（改用换行策略，避免 `CSI S` 在 QTermWidget/xterm.js 中丢掉历史）。

3. **[#45262](https://github.com/openai/codex/pull/45262)** — 将粘贴内容路由进当前激活的 `Ctrl+R` 历史搜索查询。

4. **[#45255](https://github.com/openai/codex/pull/45255)** — Command center：从会话列表用 `n` 打开新会话，且不发送初始 turn。

5. **[#45248](https://github.com/openai/codex/pull/45248)** — 请求元数据与 tool hooks 使用*已捕获步骤*的 model/reasoning 设置，而非该 turn 的初始值。

6. **[#45224](https://github.com/openai/codex/pull/45224)** — 在 sandbox 初始化之前先注册 Windows Desktop 卸载所有权（覆盖未签名安装场景）。

7. **[#45182](https://github.com/openai/codex/pull/45182)** / **[#45178](https://github.com/openai/codex/pull/45178)** / **[#45169](https://github.com/openai/codex/pull/45169)** — Windows sandbox 加固：复制 SID 前校验 token groups；将清理拆成 prepare/finish；把 setup + 安装存储迁入 `codex-windows-sandbox`。

8. **[#45176](https://github.com/openai/codex/pull/45176)** — 将 Windows **MXC** sandbox 接入命令执行（后端身份、违规分类）。

9. **[#45135](https://github.com/openai/codex/pull/45135)** — TUI：在换行前预览流式散文，使超长单行回复能实时可见。

10. **[#45094](https://github.com/openai/codex/pull/45094)** — 按内容估算历史 token，而不是按序列化 envelope（ID/元数据不再虚增预算）。

另外值得关注：musl 用的 OpenSSL 3.6.4（[#45149](https://github.com/openai/codex/pull/45149)）、移除 Astra sparkle 动画（[#45137](https://github.com/openai/codex/pull/45137)）、异步用户消息 feature flag（[#45124](https://github.com/openai/codex/pull/45124)）。

## 5. 热门讨论

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200)** — 用 ChatGPT 移动端远程控制 Codex（headless/daemon）。190 👍，46 条评论；用户已经在用 Tailscale + SSH 拼方案。
- **[#9618](https://github.com/openai/codex/discussions/9618)** — `/rewind` 或 `/revert`（对齐 OpenCode / Claude Code）。134 👍；被描述为没有它就“几乎没法用”。
- **[#12567](https://github.com/openai/codex/discussions/12567)** — 官方 memories 设计调研（引用先前线程应有多激进）。
- **[#41716](https://github.com/openai/codex/discussions/41716)** — ChatGPT 做 planner，Codex 做 worker 编排层。
- **[#45284](https://github.com/openai/codex/discussions/45284)** — 可选的每个 GitHub PR 持久 Codex session（避免评审上下文被切碎）。

### Q&A
- **[#40385](https://github.com/openai/codex/discussions/40385)** — Windows：“control other devices” / 远程连接未出现在 UI 中。
- **[#42503](https://github.com/openai/codex/discussions/42503)** — Astra 何时落地 Codex？
- **[#43257](https://github.com/openai/codex/discussions/43257)** — 实验性 context / 历史查找如何计入用量限额。

### Show and tell
- **[#16329](https://github.com/openai/codex/discussions/16329)** — Awesome Codex CLI：150+ subagents、skills、plugins、MCP servers。
- **[#41157](https://github.com/openai/codex/discussions/41157)** / **[#44641](https://github.com/openai/codex/discussions/44641)** — 社区限额看板（CodexFuse Windows；Codex Limits CLI/TUI）。
- **[#44643](https://github.com/openai/codex/discussions/44643)** — CoCo：跨终端/仓库并行 Codex 工作的协调器。
- **[#45278](https://github.com/openai/codex/discussions/45278)** — Polter：一个 Codex 监督其他 AI CLI。

## 6. 功能请求趋势

1. **Undo / rewind / revert** agent 编辑，且不必为每次改动单独 commit。
2. **一等公民远程控制**（移动端 ChatGPT → headless 桌面 Codex；Windows 的 “control other devices”）。
3. **跨设备 / 按 PR 持久会话**，让历史与远程工作聊天保持同步。
4. **Memories + 长程上下文**，并明确引用规则与 token 核算。
5. **透明用量仪表**（5h / 周限额、重置额度）——社区已做出多个第三方看板。
6. **Worktree / 多会话 command center**（相关 PR 已在落地）。
7. 通过 `@` **引用 gitignored 文件**。
8. 在 ChatGPT 与一个或多个 Codex worker 之间做 **planner/worker 编排**。

## 7. 开发者痛点

- **Windows 是故障集群：** WSL 项目生命周期、sandbox Git HTTPS / 凭据（`SEC_E_NO_CREDENTIALS`）、安装 `helper_failed` / `helper_sandbox_lock_failed`、Computer Use 被 Defender 拦截、follow-up 发送失败、IAB 路由消失。
- **额度核算信任缺口：** 限额几分钟内骤降；本地 token 与 UI 不一致；Astra 与 Luna 的 effort 定价体感不统一。
- **更新后的线程/会话完整性：** 历史分页被替换成一次中断的首轮；手机上看不到远程聊天；VS Code 线程所有权过期。
- **Sandbox + MCP 启动脆弱**，Windows 与 macOS 14.2（`TIOCSTI`）都中招；CLI 0.154.0 的实验性上限会弄坏捆绑的 Messages / Computer History MCP。
- **自定义 `/responses` 兼容性：** `function_call_output` 缺少 `call_id`，严格上游直接失败。
- **指令遵循 / 编排爆炸** 会烧掉周额度，同时号称在“预防”同类失败（[#43193](https://github.com/openai/codex/issues/43193)）。
- 生态反应：用户自己做本地看板、协调器、stop-hooks（`isitdone`）、会话导出器，以及 SKILL.md → plugin 转换器，而不是等官方 UX。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-14

来源：[github/copilot-cli](https://github.com/github/copilot-cli)

## 1. 本周要点

CLI 推出了一轮紧凑的 1.0.84 补丁列车：Vim 模式现已正式可用，plugin/instruction/LSP 列表正被拆成带 JSON 输出的一等命令，会话/记忆导入已落地，面向语义 JSONL 交换格式。补全现在来自 CLI 自身解析所用的同一套语法，因此 `copilot <TAB>` 与真实 flags 和子命令保持一致。社区热度仍集中在 MCP 生命周期正确性（OAuth、`server/discover`、resume 超时）、Windows/WSL 稳定性（CPU 空转、插件文件锁、sandbox 支持），以及长时间 `--resume` 会话上的堆 OOM。

## 2. 版本发布

过去 24 小时内落地了四个预发布标签：

- **[v1.0.84-5](https://github.com/github/copilot-cli/releases)** — 面向语义 JSONL 交换格式的会话与记忆 **import** 命令。Shell 补全由 CLI 解析所用的同一套语法生成，因此根级 flags 会与子命令并列出现，且每个子命令只提供自身选项。
- **[v1.0.84-4](https://github.com/github/copilot-cli/releases)** — `copilot instruction list` 与 `copilot lsp list` 取代 `copilot plugins list --kind …`。`--json` 已加入 plugin list / marketplace list / browse。`enable` / `disable` 已加入 `copilot plugin`。
- **[v1.0.84-3](https://github.com/github/copilot-cli/releases)** — `/copy` 在可用时会包含任务完成消息。经 OAuth 认证的 MCP 服务器在会话启动时连接更可靠。
- **[v1.0.84-2](https://github.com/github/copilot-cli/releases)** — **全员可用的 Vim 模式**（`/vim` 或 `editorMode: vim`）；输入时会显示当前模式。在受支持的 Windows sandbox 策略下，交互式 shell 命令现在会记录被拦截的访问。

## 3. 热点 Issue

1. **[#13 — CLI vi/vim input mode](https://github.com/github/copilot-cli/issues/13)**（CLOSED，12 条评论，76 👍）  
   长期存在的模态编辑需求。因 1.0.84-2 正式推出 Vim 模式而关闭——本窗口内社区信号最强。

2. **[#4438 — `disable-model-invocation: true` makes a skill unreachable](https://github.com/github/copilot-cli/issues/4438)**（OPEN，5 条评论）  
   标记为 “manual only” 的项目 skill 会从模型的 `skill()` 工具中消失（`Skill not found`），即使显式调用也一样。破坏了预期的「可列出但不自动调用」契约。

3. **[#4035 — Voice installer hits private Azure Artifacts (401)](https://github.com/github/copilot-cli/issues/4035)**（OPEN，5 条评论）  
   Voice runtime 尝试从私有源拉取 `Microsoft.AI.Foundry.Local.Core`，而不是 nuget.org。没有 Azure DevOps 凭据的人无法完成 voice 安装。

4. **[#4725 — Frequent JS heap OOM on Linux](https://github.com/github/copilot-cli/issues/4725)**（OPEN，4 条评论）  
   每隔几分钟在约 4 GiB 处触发 Mark-Compact。与下文长时间 resume 的 OOM 属同一类故障。

5. **[#4753 — Session resume cancels in-flight stdio MCP (~1s vs ~16s)](https://github.com/github/copilot-cli/issues/4753)**（OPEN，4 条评论）  
   `--resume` 时的前台交接会杀掉仍在初始化的 MCP 服务器。表现为整段会话静默「server missing」。

6. **[#3700 — WSL2 MainThread ~215% CPU, TUI frozen](https://github.com/github/copilot-cli/issues/3700)**（OPEN，4 条评论，高严重性）  
   #2208 的回归：空闲空转、流式输出直到重启才绘制。每次重启后的新会话都会中招。

7. **[#1168 — Authorization fatigue](https://github.com/github/copilot-cli/issues/1168)**（OPEN，4 条评论）  
   一个高层请求（例如 “fix PR 727”）可能触发十来个权限提示。相关：#4764 辅助自动批准约 1 小时后失效。

8. **[#4795 — Atlassian MCP OAuth callback URL mismatch](https://github.com/github/copilot-cli/issues/4795)**（OPEN，3 条评论）  
   随机监听端口 vs 已注册的 `33418`。在 1.0.83 和 1.0.84-3（WSL）上可复现。

9. **[#4095 — Windows plugin update “Access is denied” while VS Code is open](https://github.com/github/copilot-cli/issues/4095)**（OPEN，2 条评论，21 👍）  
   Copilot 桌面端/扩展在 `installed-plugins` 上持有文件监视。近期 Windows 问题中 👍 最高。

10. **[#4699 — OOM on long `--resume`; crash dumps in cwd](https://github.com/github/copilot-cli/issues/4699)**（OPEN，3 条评论，5 👍）  
    反复出现 4 GiB V8 OOM；Node 诊断报告落在用户当前工作目录。

值得一提：[#4370](https://github.com/github/copilot-cli/issues/4370) / [#4809](https://github.com/github/copilot-cli/issues/4809)（`initialize` 之前就发 `server/discover`）、[#4026](https://github.com/github/copilot-cli/issues/4026)（自 5 月起的 Windows 原生崩溃）、[#4832](https://github.com/github/copilot-cli/issues/4832)（1.0.83 中工作区 `.mcp.json` 从未被加载）、[#4829](https://github.com/github/copilot-cli/issues/4829)（subagent 工具风暴打爆 prompt cache）。

## 4. 关键 PR 进展

1. **[#4770 — Document WebSocket responses opt-out](https://github.com/github/copilot-cli/pull/4770)**（OPEN）  
   记录 `400 input item ID does not belong to this connection`（#2147）以及屏蔽 WebSocket 的网络的逃生开关。

2. **[#4746 — Experimental next-action extension prototype](https://github.com/github/copilot-cli/pull/4746)**（OPEN）  
   `examples/next-best-action/` 下的可选 SDK 示例；加入前台会话，无自动发现，不改动已安装 CLI。

3. **[#4761](https://github.com/github/copilot-cli/pull/4761) / [#4762](https://github.com/github/copilot-cli/pull/4762) — Installer reports unsupported OS**（CLOSED）  
   FreeBSD 不再回落到 “Windows detected but winget not found.”

4. **[#4808 — Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)**（CLOSED）  
   供应链卫生：钉死 3 个 action 引用。

5. **[#4827](https://github.com/github/copilot-cli/pull/4827) / [#4828](https://github.com/github/copilot-cli/pull/4828) — Dependabot bumps**（CLOSED）  
   `actions/stale` 9.1.0 → 11.0.0，`actions/github-script` 7.1.0 → 9.0.0。

6. **[#4786 — Revise third-party services notice](https://github.com/github/copilot-cli/pull/4786)**（CLOSED）  
   澄清第三方服务的访问要求与条款。

7. **[#4748 — Add joke cli](https://github.com/github/copilot-cli/pull/4748)**（OPEN）  
   低信号的趣味性 PR；列入仅因其出现在 24 小时更新集合中。

8. **[#4100](https://github.com/github/copilot-cli/pull/4100)**（CLOSED）  
   来自外部账号的稀疏 “安全性” PR；除非维护者评论，否则视为噪音。

*（24 小时窗口内只有 10 个 PR；其中若干是 bot/安全/文档，而非产品功能。产品侧推进主要体现在上方 1.0.84-x 发行说明中。）*

## 5. 热点讨论

从略 — 未提供 Discussions 数据。

## 6. 功能请求趋势

- **模态 / 键盘优先编辑** — Vim 模式已发布；剩余需求是打磨（模式指示器、按键绑定对齐）。
- **Skills 作为一等表面** — list/enable/disable、`disable-model-invocation` 仍允许斜杠调用、不再重复出现 “Skill not found” 查找（#4438、#4637）。
- **MCP 作为可靠底座** — 符合规范的生命周期（禁止在 `initialize` 之前发 `server/discover`）、稳定的 OAuth 回调端口、resume 不取消仍在初始化的 stdio 服务器、工作区 `.mcp.json` 真正被加载。
- **Agent 可观测性** — 后台 sub-agent 的实时进度（#2254），OpenTelemetry 上按阶段输出 HydraFusion 的 model/verdict/credits（#4825）。
- **会话记忆可移植性** — 语义 JSONL 的导入/导出（现已在 1.0.84-5）以及跨会话上下文查询（#2436）。
- **权限体验** — 单次请求更少提示、持久的辅助自动批准、用 `/remove-dir` 撤销访问而无需重启（#4830）。
- **Prompt 排队** — `ctrl-t` 入队后能在当前回合结束后真正排空（#4824）。

## 7. 开发者痛点

- **MCP 是最锋利的刀口。** 规范违规（`server/discover`）、OAuth 端口不匹配、resume 杀掉正在初始化的服务器、启动对账时丢掉额外配置、工作区 `.mcp.json` 被忽略。在做 FastMCP / Atlassian / 自定义 stdio 服务器的团队，时间耗在握手上，而不是工具本身。
- **长会话死在 4 GiB 堆上。** Linux 空闲 OOM 与 `--resume` OOM 会把 Node 报告倒进 `cwd`。一轮内跑出上百次工具调用的 subagent 也会打爆 prompt cache 和 token 预算（#4829）。
- **Windows / WSL 仍是二等运行时。** 空闲 215% CPU + TUI 冻结、插件更新被 VS Code 文件监视挡住、25H2 上 sandbox “not supported on this host”、跨多个版本的原生崩溃、voice 安装器打到私有源。
- **权限与策略在会话中途漂移。** 单任务授权疲劳；辅助模式约 1 小时后过期；无法在不重启的情况下缩小允许目录。
- **多模态和 voice 很脆弱。** 粘贴一张图就可能把后续 `view` 调用限制为 1 张图（#4831）。Voice 模式可在 Linux 上于 ONNX/Nemotron ASR 中 `SIGABRT`（#4833）。
- **传输层意外。** 默认 WebSocket responses 路径会产生 `CAIP 400: input item ID does not belong to this connection`；退出选项一直存在，但直到 #4770 才有文档。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-14

来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)

## 本周亮点

v1.18.30 已发布，为 GPT-6 引入 Astra system prompts，并修复 provider SDK/ID 问题；与此同时 v2 相关改动已开始冲击生产环境：用户反馈 1.18.30 上出现 prompt 崩溃，Muse Spark 上 Zen/`encrypted_content` 失败，以及 Desktop/TUI 在布局、MCP 和 session 生命周期方面的回归。维护者正在合入紧凑的 AI 层 PR（image URLs、empty tool choice、context-window fail-fast），社区则仍在争论剪贴板、加密货币支付，以及强制新 UI 隐藏 MCP 控件的问题。

## 发布

**[v1.18.30](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)**（2026-09-09，当前 latest release）

- **改进：** 为 GPT-6 模型加入 Astra system prompt。
- **缺陷修复：** 保留 Bedrock DeepSeek 模型 ID（含基于 ARN 的 ID）；更新 Azure 与 OpenAI provider SDK；为受支持的 GitLab GPT 与 Claude 模型补充 reasoning-effort 变体。
- **社区贡献：** @YeEmrick、@far-ouq、@heimoshuiyu。
- 说明：标签中同时包含 **v2.0.0–v2.0.3**（9 月 11–12 日）。这些版本尚未写入官方 “latest” release notes，但已有若干 issue/PR 将 v2 视为已上线（config 环境变量、布局、Zen）。

## 热点 Issue

1. **[#4283 Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** — 开放数月仍未关闭；133 条评论 / 124 👍。跟踪器中互动最高的 UX 缺陷；对许多用户而言 TUI 选区复制仍然失败。
2. **[#23153 Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)** — 51 👍，22 条评论。针对 OpenCode Go 的持续计费诉求；需求偏商业，而非纯爱好向。
3. **[#48741 Opencode Zen critical errors on Muse Spark](https://github.com/anomalyco/opencode/issues/48741)** — 新开（9 月 13 日），已有 21 条评论。Muse Spark 收到图片或 tool call 时出现 `encrypted_content` / `invalid_request_error`；会立刻阻断 Zen 用户。
4. **[#48645 Regression in 1.18.30: every prompt crashes (`a.name`)](https://github.com/anomalyco/opencode/issues/48645)** — 全新安装 / 第一条消息即以 `SystemPrompt.environment` TypeError 失败；已知可用版本为 1.18.18。严重程度高，因为落在最新稳定标签上。
5. **[#43277 Sessions permanently stuck across reboots](https://github.com/anomalyco/opencode/issues/43277)** — session 拒绝新消息，完整重启后仍卡住。属于数据丢失级别的可靠性问题。
6. **[#48850 Desktop randomly marks running turn as interrupted](https://github.com/anomalyco/opencode/issues/48850)** — Windows Desktop 上静默出现 `AbortError`；无 UI 报错、无可重试。会削弱对长 turn 的信任。
7. **[#34442 Windows Desktop installer broken offline](https://github.com/anomalyco/opencode/issues/34442)** — 未打包 ripgrep；离线环境下 `grep` / `glob` / `skill` 与 `customize-opencode` 失败。4 👍，自 6 月起仍开放。
8. **[#46426 / #48859 MCP toggle missing in New UI](https://github.com/anomalyco/opencode/issues/46426)** — 已配置的 MCP server 无法在新布局中启用；开关只存在于 Legacy UI。同一投诉另有俄语工单（#48859）。
9. **[#39835 New users can't switch back from the new layout](https://github.com/anomalyco/opencode/issues/39835)** — 强制新布局且无切换开关。直接关联 MCP/设置的可发现性。
10. **[#48848 Snapshot git transactions race / stale index.lock](https://github.com/anomalyco/opencode/issues/48848)** — 多进程 snapshot git 竞态会卡住 worktree。对同一仓库同时跑多个 OpenCode 实例的人很危险。

值得一提：[#48864](https://github.com/anomalyco/opencode/issues/48864) 同样的 `encrypted_content` provider 错误；[#38529](https://github.com/anomalyco/opencode/issues/38529) session 列表混入无关的非 git 目录；[#48851](https://github.com/anomalyco/opencode/issues/48851) TUI 滚动不同步；[#48847](https://github.com/anomalyco/opencode/issues/48847) context-window fail-fast（已有对应 PR 合入）。

## 关键 PR 进展

1. **[#48852 fail fast when fixed request overhead exceeds usable window](https://github.com/anomalyco/opencode/pull/48852)**（CLOSED）— compaction 循环保护的后续工作。当 system prompt + tools 已超出模型窗口时，停止无限 compact/retry。
2. **[#48857 omit OpenAI tool_choice when tools are empty](https://github.com/anomalyco/opencode/pull/48857)**（CLOSED）— 工具列表为空后，避免生成非法的 OpenAI Chat/Responses payload。
3. **[#48854 keep Windows ConPTY / zellij pane alive on exit](https://github.com/anomalyco/opencode/pull/48854)**（CLOSED）— 退出 OpenCode 时不再干掉父级 Alacritty+zellij pane。
4. **[#48860 restrict reflective access](https://github.com/anomalyco/opencode/pull/48860)**（CLOSED）— Oxlint baseline，并禁止未授权的 `Reflect` 使用；一次加固清理。
5. **[#48862 preserve OpenAI Chat image URLs](https://github.com/anomalyco/opencode/pull/48862)**（OPEN，rekram1-node）— 不再把 HTTPS image URL 当成原始 base64；也覆盖工具返回的远程图片。
6. **[#48863 serialize undefined historical tool input](https://github.com/anomalyco/opencode/pull/48863)**（OPEN）— 对显式 `undefined` 的 tool input 输出 `{}`，避免 replay/history 破坏 OpenAI lowering。
7. **[#48858 Resolve config from OPENCODE_CONFIG](https://github.com/anomalyco/opencode/pull/48858)**（OPEN）— 修复 [#48853](https://github.com/anomalyco/opencode/issues/48853) 中的 v2 回归，恢复 v1 的环境变量配置路径。
8. **[#48770 refactor(codemode): materialize interpreter failures once](https://github.com/anomalyco/opencode/pull/48770)**（OPEN）— 单一 `PendingThrow` → 在调用边界生成一个 Error；Code Mode 堆栈更干净。
9. **[#48733 preserve slash skill arguments](https://github.com/anomalyco/opencode/pull/48733)**（OPEN）— slash skill 后的尾随文本现在作为 user prompt 提交，并附带该 skill。
10. **[#48856 RTL header for Hebrew and Arabic Windows](https://github.com/anomalyco/opencode/pull/48856)**（OPEN）— 为 RTL 桌面用户提供原生 caption-button 布局。

清理批次仍在推进：较早的自动化 PR（#42169 project_id remap、#31980 Windows code page、#31809 误导性的 Read-before-Write 文档、#31645 upgrade progress、#31644 `/compact` `/summarize` 可见性）。

## 功能请求趋势

- **计费灵活性：** OpenCode Go 的加密货币 / Pay-Go（#23153）。
- **布局控制：** 允许退出新 Desktop 布局；恢复 Legacy UI 中的 MCP 及其他设置（#39835、#46426、#48859）。
- **MCP 作为一等客户端：** 新 UI 中提供开关；把自定义 server→client 通知（progress、wake-up）暴露到 session（#48855）。
- **Agent/工具管道：** 为插件注入 bash `env`（#11065，已关闭但方向仍相关）；保留 slash-skill 参数。
- **日常 UX：** 清空最近文件夹历史（#19546，已关闭）；新 session wordmark 动画（#48841，已关闭）。
- **context-window 诚实性：** 固定开销已超出可用窗口时直接 fail fast，而不是循环 compaction（#48847）。

## 开发者痛点

- **最新稳定版可能不可用。** 1.18.30 首条 prompt 即崩溃（#48645），加上 Zen/Muse Spark 的 `encrypted_content` 错误（#48741、#48864），让“直接升级”变得冒险。
- **v2 的配置/布局破坏肌肉记忆。** `OPENCODE_CONFIG` 被忽略（#48853 / PR #48858）；MCP 开关消失；新用户无法切换布局。
- **Session 完整性脆弱。** 永久卡住的 session（#43277）、Desktop 静默中止（#48850）、snapshot `index.lock` 竞态（#48848）、非 git 目录混入 session 列表（#38529）。
- **Windows / 离线 / 终端栈仍是二等公民。** 未打包 ripgrep（#34442）、ConPTY pane 被杀掉（已在 #48854 修复）、剪贴板（#4283）、TUI 滚动不同步（#48851）。
- **Provider payload 边界情况持续泄漏。** 空 tools + `tool_choice`、历史 tool input 为 undefined、image URL 被当成 base64、reasoning ID/ARN——今天多数热修复都落在 AI lowering 层。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-14
Source: [earendil-works/pi](https://github.com/earendil-works/pi)

## 本周亮点
本周活动集中在 TUI 可靠性（大 diff、长 transcript、重绘风暴）、会话/模型恢复正确性，以及提供商覆盖面（Azure Foundry、Codex 归因、订阅 OAuth、服务端工具）。社区精力也在向外扩散：Discussions 里落地了多个独立 GUI 和基于 RPC 的 shell，Issues 则继续追问启动延迟、compaction 思考预算，以及 OAuth token 竞态。

## 发布
过去 24 小时无发布。

## 热门 Issues
1. **[#7739](https://github.com/earendil-works/pi/issues/7739) — Startup-time budget vs jcode**（OPEN，8 条评论）  
   要求给出明确的延迟/内存预算，让 Pi 能对标 jcode 的交互式 PTY 基准。之所以重要，是因为冷启动正在变成竞争力指标，而不再只是打磨项。

2. **[#8036](https://github.com/earendil-works/pi/issues/8036) — Edit tool crashes TUI on large diffs**（OPEN，8 条评论）  
   一份约 14.5 MB 的 HTML diff 已跑完，但交互式 TUI 在渲染时崩溃，恢复时再次崩溃。对编辑生成物或压缩资源的人来说严重性很高。

3. **[#9311](https://github.com/earendil-works/pi/issues/9311) — Fullscreen mouse selection survives session switch**（OPEN，6 条评论）  
   全屏 TUI 中的选择状态会跨会话泄漏。小 bug，但「感觉坏了」的代价很高；建议的修复是切换时清除。

4. **[#9255](https://github.com/earendil-works/pi/issues/9255) — Full-screen redraw storm on long transcripts**（OPEN，4 条评论）  
   当流式 thinking 尾部位于视口上方时，`TuiMainScreen.doRender()` 几乎每帧都走完整渲染路径。长会话会出现剧烈跳动 / 文字翻倍。

5. **[#9075](https://github.com/earendil-works/pi/issues/9075) — Compaction hits output cap on adaptive thinking**（OPEN，3 条评论，3 👍）  
   Compaction 继承会话的 thinking 级别；thinking token 计入 `max_tokens`，因此高努力的 Anthropic adaptive 模型会确定性截断。对长会话是直接的质量打击。

6. **[#9474](https://github.com/earendil-works/pi/issues/9474) — Codex transport has no non-resetting deadline**（OPEN，3 条评论）  
   心跳/部分 delta 会重置空闲超时，卡住的 SSE/WebSocket 可能永远挂起。生产环境无头集群需要这个。

7. **[#9243](https://github.com/earendil-works/pi/issues/9243) — Resume restores echoed model name, not routed id**（OPEN，3 条评论）  
   最后一条助手消息会覆盖 `model`，因此恢复后提供商回显 ≠ 路由 id。会打破「我以为还在用 X」的预期。

8. **[#9098](https://github.com/earendil-works/pi/issues/9098) — Expose prompt disposition in RPC**（OPEN，4 条评论）  
   RPC `prompt` 成功并不区分 handled / queued / started。阻碍状态 UI 和扩展编排。

9. **[#9565](https://github.com/earendil-works/pi/issues/9565) — Unwritable jiti cache slows every launch**（CLOSED）  
   多用户 Linux 下 `/tmp/jiti` 符号链接到另一用户 `0700` 主目录，导致每次启动都强制重新编译 TS 扩展。运维陷阱。

10. **[#9549](https://github.com/earendil-works/pi/issues/9549) — Large transcripts re-render every frame (Windows, 1 core saturated)**（CLOSED）  
    与 #9255 同类，在 2 核 Windows Terminal 上测得。确认全屏/长 transcript 渲染是跨平台热点。

## 关键 PR 进展
1. **[#9548](https://github.com/earendil-works/pi/pull/9548) — Mid-conversation system messages**（OPEN，mitsuhiko）  
   把 system-prompt 和 tool-set 变更写入 transcript，以便 resume/branching 能恢复指令并保持缓存前缀。

2. **[#9488](https://github.com/earendil-works/pi/pull/9488) — Canonical Codex turn attribution**（OPEN）  
   增加提供商中立的 `requestIdentity`，让 Codex 能把工具续写、重试、steering 和 compaction 恢复归因到同一次用户 turn。

3. **[#9096](https://github.com/earendil-works/pi/pull/9096) — Meta Muse subscription OAuth**（OPEN）  
   新的订阅提供商；不寻常的每日 identity-token 重新签发，以及突发式「假」流式传输。

4. **[#9531](https://github.com/earendil-works/pi/pull/9531) — Permanent branch deletion from session tree**（CLOSED）  
   `SessionManager.pruneBranch` + `/tree` 中的 Shift+D；保护活动路径，重新串联标签，重定向幸存的 compaction。

5. **[#9558](https://github.com/earendil-works/pi/pull/9558) — Azure Foundry v3 / Anthropic on Azure**（CLOSED）  
   提供商 + 测试矩阵覆盖（stream、abort、overflow、tools、images、handoff）。

6. **[#9556](https://github.com/earendil-works/pi/pull/9556) — `serverTools` in model config**（CLOSED）  
   允许 models.json 声明提供商原生的服务端工具（OpenAI/Zhipu `web_search`、Anthropic web_search），原样追加。

7. **[#9529](https://github.com/earendil-works/pi/pull/9529) — Google Antigravity + Cursor Pro OAuth**（CLOSED）  
   浏览器 OAuth 订阅提供商，无需 API key；与 issue #9530 配套。

8. **[#9517](https://github.com/earendil-works/pi/pull/9517) — Group long tool-call runs in TUI**（CLOSED）  
   将 6+ 次连续工具调用折叠为一行可展开行；失败仍保持可见。

9. **[#9523](https://github.com/earendil-works/pi/pull/9523) — Emit ui_prompt_start/end for built-in selectors**（CLOSED）  
   状态集成不再漏掉 model picker / settings / resume / tree，并在被阻塞时报告「running」。

10. **[#9504](https://github.com/earendil-works/pi/pull/9504) / [#9501](https://github.com/earendil-works/pi/pull/9501) — Windows Store shells + install-dir resolution**（OPEN / OPEN）  
    修复 Store 别名上的 `existsSync` EACCES，并统一 Windows 二进制发现，使 shell 真正能启动。

值得一提：[#9543](https://github.com/earendil-works/pi/pull/9543) 模型侧 `exit` tool；[#9539](https://github.com/earendil-works/pi/pull/9539) loop-guard 示例扩展；[#8635](https://github.com/earendil-works/pi/pull/8635) 在 lazy setup 期间保留被中止的 stop reason。

## 热门 Discussions

**展示与分享**
- **[#9552](https://github.com/earendil-works/pi/discussions/9552) — Pi Heao GUI** — 基于 pi-agent-studio 聊天 UI 的 Windows 桌面客户端。  
- **[#9446](https://github.com/earendil-works/pi/discussions/9446) — Phosphor** — 桌面界面：聊天、diffs、文件、终端、artifacts，走 `pi --mode rpc`。  
- **[#9427](https://github.com/earendil-works/pi/discussions/9427) — Pi Manager** — 面向 providers/models/`~/.pi/agent` 的本地控制面，无需 fork Pi。  
- **[#9327](https://github.com/earendil-works/pi/discussions/9327) — Eco Coding** — 桌面 GUI，含 vision 分屏、teams、browser、computer use、mobile。  
- **[#9373](https://github.com/earendil-works/pi/discussions/9373) — pi-agent-views** — 由 Pi 自身渲染的并发子 agent。  
- **[#9525](https://github.com/earendil-works/pi/discussions/9525) — web-agent thank-you** — 手机仪表盘 + Siri/Matrix 桥接，共用一个持久 RPC 会话。

**想法**
- **[#3373](https://github.com/earendil-works/pi/discussions/3373) — Favorite plugins/extensions**（16 条评论，9 👍） — 社区里持续时间最长的「大家实际常驻加载什么」清单。  
- **[#8420](https://github.com/earendil-works/pi/discussions/8420) — Official Web UI base?** — 对比 DSH 的 UI-plugin 热潮；认为 Pi 的扩展故事偏 CLI。  
- **[#8803](https://github.com/earendil-works/pi/discussions/8803) — pi-verdict** — 单文件 allow/ask/deny 权限门（Claude Code auto-mode 的同类物）。  
- **[#9312](https://github.com/earendil-works/pi/discussions/9312) — Pi Context Memory** — 把被 compact 掉的决策追溯回原始 turn。  
- **[#9516](https://github.com/earendil-works/pi/discussions/9516) — Tool-result images dropped by compatible gateways** — Responses 编码 vs Completions 仅字符串的 `role: tool`。

## 功能请求趋势
- **TUI 之外的官方/一方面**：Web UI 底座、桌面 shell、会话查看器、RPC 状态事件（`disposition`、`ui_prompt_*`）。
- **无需 API key 的提供商补全**：Antigravity、Cursor Pro、Meta Muse、Azure Foundry、Commandcode、Copilot refresh、面向子 agent 的 llama.cpp 实时目录。
- **会话语义**：`/new` 时继承 model/effort、从 `model_change` 而非 echo 恢复、对话中途的 system messages、树分支删除、查看另一路实时会话。
- **模型原生能力**：`serverTools`、exit tool、prompt disposition、权限门。
- **启动与长会话卫生**：jcode 级别预算、可写的 jiti cache、compaction thinking 隔离。

## 开发者痛点
- **大规模 TUI 渲染**：大 diff 崩溃；长 transcript 每帧全量重绘；compaction_end 抹掉可见历史；第一个 thinking token 导致翻倍；ScrollView 吞掉鼠标事件；选择状态跨会话泄漏。
- **鉴权与多会话集群**：via undici 的 Copilot 403；keychain 重写会清掉 silent-read 授权；并发会话竞态 Slack 式轮转 refresh token。
- **模型/协议错配**：GLM-5.3-flash 的 CoT 被倒进 `content`；Anthropic adapter 丢掉根级 JSON Schema 关键字；llama.cpp 在 `/llama` 之前目录为空；被长度截断的巨型 tool-call 墙淹没上下文（14k 条错误结果）。
- **Windows / 多用户运维**：Store shell 别名、install-dir 查找、2 核重绘打满、共享 `/tmp/jiti`。
- **会撒谎的超时**：Codex keep-alive 打败空闲超时，且没有硬性的单请求 deadline。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code 社区周报 — 2026-09-14**  
仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

### 1. 本周亮点
Nightly 与稳定线均落地在 **v0.23.3** 附近，扩展了推理预设（Kimi / Qwen / DeepSeek），Desktop **v0.3.0**、TypeScript SDK **v0.1.12**，以及新的 **CUA driver** 预编译二进制。日常工作集中在 CI 稳定性（Windows live monitor、`tsc` 堆内存 OOM）、后台任务后的 TUI/React 崩溃循环、会话/审批正确性，以及 web-shell 体验（定时任务、cockpit 截图、命令解释语言）。

### 2. 发布
- **[v0.23.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3)** — 功能亮点：扩展 Kimi、Qwen 与 DeepSeek 推理预设（[#11349](https://github.com/QwenLM/qwen-code/pull/11349)）。未宣称破坏性变更。
- **Nightlies** `v0.23.3-nightly.20260910` 至 `20260913` — 重复出现的 changelog 包括钉钉后台响应清理（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）以及与 channels 相关的破坏性变更（`feat(channels)!: remove me`）。
- **[v0.23.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2)** — Web-shell 分栏会话导航（[#11250](https://github.com/QwenLM/qwen-code/pull/11250)）。
- **[sdk-typescript-v0.1.12](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.12)** — 捆绑 CLI 0.23.3（说明中亦提到上一捆绑版本为 0.23.2）。
- **[desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0)** / **[desktop-v0.3.0-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0-preview.0)** — 定时桌面打包 CI（[#11519](https://github.com/QwenLM/qwen-code/pull/11519)）；preview **不会**把 `desktop-latest` 更新源从 0.2.2 挪走。
- **[cua-driver-rs-v0.20.6](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.6)** — 预编译 CUA driver 二进制（macOS 已公证 universal + app；Linux/Windows 未签名多架构）。

### 3. 热点 Issue
窗口内仅有 7 个 issue 被更新；全部列出。

| Issue | 为何重要 |
| --- | --- |
| [#11783](https://github.com/QwenLM/qwen-code/issues/11783) 后台 `run_shell_command` 后出现 TUI React #185（max update depth） | P1 UI 崩溃；交互会话在后台任务数秒后挂掉。3 条评论。 |
| [#11019](https://github.com/QwenLM/qwen-code/issues/11019) AUTO 模式：审批从未到达分类器；会话重建后模式回退 | P2 安全 / 会话管理：用户连说三次 “yes”，工具调用仍被拦截；harness/API 托管环境受影响。 |
| [#11791](https://github.com/QwenLM/qwen-code/issues/11791) Web-shell「Command explanation」语言写死 EN/zh-CN | P3 i18n 缺口：解释面板忽略会话语言。 |
| [#11790](https://github.com/QwenLM/qwen-code/issues/11790) Main CI 在 `faa395885e` 失败（macOS install deps） | 机器人跟踪的 main 分支变红；衍生后续 PR #11792。 |
| [#11780](https://github.com/QwenLM/qwen-code/issues/11780) `tsc --build` 在 3072 MB 处 OOM（已关闭） | CLI 包峰值约 3.14 GB；高负载下 CI 成败看运气。上调堆上限后关闭。 |
| [#11587](https://github.com/QwenLM/qwen-code/issues/11587) 来自 PR #11562 的延期评审结论 | Autofix 残留：一次性系统提醒泄漏进用户消息。6 条评论。 |
| [#7167](https://github.com/QwenLM/qwen-code/issues/7167) Fleet Shepherd Dashboard | 长期存在的机器人集群状态看板（need-information / CI-CD）；最近一次更新 2026-09-13。 |

本批次社区反应偏淡（整组 0 个 👍）；信号主要来自延期评审与崩溃相关 issue 的评论量。

### 4. 关键 PR 进展
按产品表面积、CI 稳定性或会话正确性筛选。

1. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711)** `feat(core): add container execution for subagents` — 普通子 agent 的 Docker/Podman 后端（`QWEN_AGENT_EXECUTION_BACKEND`，按 agent 的 `executionBackend: container`）。
2. **[#11241](https://github.com/QwenLM/qwen-code/pull/11241)** `feat(browser-use): Playwright Browser SDK` — 面向模型的 SDK，运行在持久 Node REPL 中（语义定位器、DOM 快照、坐标）。
3. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183)** `feat(memory): structured on-demand recall` — 两级 ref/title 树 + 面向查询的元数据 + 专用召回工具（取代扁平自动记忆倾倒）。
4. **[#11635](https://github.com/QwenLM/qwen-code/pull/11635)** `feat(web-shell): show fixed scheduled tasks in session sidebar` — 固定会话控制器出现在 Tasks 列表中，带结构化运行卡片。
5. **[#11692](https://github.com/QwenLM/qwen-code/pull/11692)** `feat(core): configurable web_search budget` — `tools.webSearch.timeoutMs` / `WEB_SEARCH_TIMEOUT_MS`，默认 120s，带有界提取器回退。
6. **[#11280](https://github.com/QwenLM/qwen-code/pull/11280)** `fix(skills): re-apply Skill side effects on resume` — 在 `--continue` / `--resume` 时恢复 `allowedTools` 与 `hooks:`，而不仅是指令文本。
7. **[#9466](https://github.com/QwenLM/qwen-code/pull/9466)** `refactor: rewind mapping by stable prompt identity` — 可穿越 resume、无头 `-p --resume` 以及回合重新编号。
8. **[#11792](https://github.com/QwenLM/qwen-code/pull/11792)** `fix(live): monitor debug store on Windows` — 修复 #11790：Windows `stat` 模式位导致隐私检查失败。
9. **[#11781](https://github.com/QwenLM/qwen-code/pull/11781)** `fix(ci): raise build heap cap 3072 → 4096 MB`（已关闭） — #11780 的直接修复；测试车道仍保持 3072。
10. **[#11783](https://github.com/QwenLM/qwen-code/issues/11783) 相邻稳定性：** [#11742](https://github.com/QwenLM/qwen-code/pull/11742)（已关闭）在未捕获异常时回收 monitors；[#11788](https://github.com/QwenLM/qwen-code/pull/11788) 将写侧 PTY `EIO` 视为良性拆解竞态。

值得一提：[#11218](https://github.com/QwenLM/qwen-code/pull/11218) 无头 JSON 现在将终端模型错误报告为失败；[#11786](https://github.com/QwenLM/qwen-code/pull/11786) 确定性 web-shell cockpit 截图；[#10455](https://github.com/QwenLM/qwen-code/pull/10455) 输出语言文件不可写时不再启动崩溃。

### 5. 热点讨论
省略 — 未提供 Discussions 数据。

### 6. 功能请求趋势
- **隔离 / 容器化子 agent 执行**（#11711）。
- **面向模型的一等公民浏览器控制**（Playwright SDK，#11241）。
- **结构化、可查询的记忆**，而不是倾倒整个语料（#10183）。
- **Web-shell 操作体验**：侧栏定时任务、双语命令解释、确定性 cockpit 画面（#11635、#11791、#11786）。
- **可配置的工具预算**（web search 超时 / 提取器回退，#11692）。
- **会话保真**：按 prompt 身份 rewind、resume 时恢复 Skill 副作用、重建后仍存活的审批模式（#9466、#11280、#11019）。

### 7. 开发者痛点
- **CI 脆弱**：CLI 包上的 `tsc` 堆 OOM、macOS install-deps 偶发失败、Windows live-monitor 隐私检查、构建车道成败看运气（#11780、#11790、#11792、#11134）。
- **后台 shell 任务注册后的 TUI / React 循环崩溃**（#11783）；相关的 PTY 拆解竞态以及未捕获异常时的 monitor 泄漏（#11788、#11742）。
- **非 TUI harness 中的审批 / AUTO 模式语义** — 用户确认无法覆盖拦截，会话重建后 AUTO 又回来（#11019）。
- **Web-shell 解释文案的 i18n 空洞**（#11791）。
- **Resume 不一致** — Skills 恢复了文本，但丢掉 allow 规则与 hooks，除非 #11280 合入。
- **Autofix 债务** — 延期评审项与接管 PR（#11587，大量 `autofix/takeover` / `needs-human` 标签）意味着最后一公里仍需人工收口。

</details>