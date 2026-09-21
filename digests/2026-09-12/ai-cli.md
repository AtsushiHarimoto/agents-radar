# AI CLI 工具社区动态周报 2026-09-12

> 生成时间: 2026-09-12 03:47 UTC | 覆盖工具: 7 个

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

我会把提供的 2026-09-12 摘要综合成一份面向决策者的对比，仅在数量或发布状态需要快速核实时才补齐缺口。
# AI CLI Tools Cross-Comparison — 2026-09-12

来源窗口：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi 与 Qwen Code 的社区 digest 摘要。下方计数为**digest 窗口内被重点提及的活动**，并非完整仓库未关闭总数。

## 1. 生态概览

到 2026 年 9 月中旬，AI CLI 市场已不再是“哪个模型坐在 TTY 里”的竞赛。每个认真做的产品都是一套 **harness**：会话生命周期、sandbox、MCP、skills/hooks、远程控制，以及跨表面身份（CLI + Desktop + IDE + 手机）。一线实验室（Anthropic、OpenAI、Google、GitHub/Microsoft、Alibaba/Qwen）以每日或近乎每日的节奏发补丁；独立 harness（OpenCode、Pi）则在供应商无关 API 与插件面上竞争。共同瓶颈已不是“模型能不能改代码”——而是 **Windows/WSL 可靠性、进程卫生、配额诚实度、远程/会话存活，以及不会悄悄弄坏 skills 或 MCP 的扩展模型**。新的前沿模型（GPT-6 Astra 及其同代）已经在多个 CLI 上同时暴露出 compaction、`invalid_prompt` 以及协议相邻类 bug。

## 2. 活跃度对比

| Tool | Issues (digest window) | PRs (digest window) | Discussions | Release status (this cut) |
|---|---|---|---|---|
| **Claude Code** | 高信号聚集；置顶线程 #91870 Function Hooks（161 条评论）。约 10 个具名热点 issue + 若干可记一笔的提及 | 约 10 个具名产品 PR（hooks/mods、installer、security-guidance） | 源 dump 中未收录 | **极热：** 24 小时内 6 个 tag（`v2.1.263`–`v2.1.269`） |
| **OpenAI Codex** | 密集的 Windows/auth/model 簇；#42215 领跑（31 条评论）。约 10+ 个被盯着的 issue | 合并流量很重（voice、经由 app server 的 sandbox、personality 退役、command center） | **活跃：** Ideas + Q&A + Show-and-tell（remote control #9200：190 👍） | **热 alpha：** Rust `0.155.0-alpha.3.x` 爆发 + Python SDK `0.154.0` |
| **Gemini CLI** | 可靠性/安全混杂；MAX_TURNS 假成功、auth 循环、hang | Security/sandbox/policy PR 正在打进 nightly | **活跃：** roadmap、abuse/traffic（约 930+）、Antigravity 过渡 | Nightly `v0.61.0-nightly.20260912`；preview `0.60.0`；stable `v0.59.0` |
| **GitHub Copilot CLI** | Windows/WSL/MCP/skills；Vim 请求在上线后关闭 | 近 24 小时集合偏薄（约 9 个 PR；多为 docs/security/examples） | 未收录 / 未提供 | 补丁列车 **`v1.0.84-2`–`1.0.84-5`**（Vim GA、JSONL import） |
| **OpenCode** | 已关闭的功能胜仗（`/loop`）与仍开放的 Desktop/serve 泄漏混杂 | 2.0 线活跃：cgroup isolation、`/visualize`、RTL TUI、plugin API | dump 中未单独制表 | **`v1.18.30`**（Astra system prompt + provider 兼容） |
| **Pi** | Windows 元线程 #7547（62 条评论）主导 | Shell discovery、会话中途 system deltas、Bedrock/Codex attribution | **活跃 Ideas + Show-and-tell**（Phosphor、Pi Manager、Eco Coding） | **`v0.85.1`**（2026-09-05）；Astra 已进，后续崩溃报告已经开着 |
| **Qwen Code** | 近 24 小时 issue 更新稀疏（6），但有 P1：多 agent 完成时 TUI 静默死亡 | 功能/修复队列很大（Responses adjacency、memory recall、Web Shell） | 源 dump 中未收录 | 稳定版 **`v0.23.3`**（9 月 10 日）+ Desktop `0.3.0` + TS SDK `0.1.12` + nightly |

注：把 “Omitted” 理解为 **digest 里没有这份数据**，而不是“不活跃”。本窗口里只有 Gemini 和 Codex 有明确记录的高量 Discussions。Copilot CLI 的 issue #13（Vim）是少见的长期诉求真正因已上线而关闭的案例。

## 3. 共同功能方向

**Hooks / plugins 正在变成真正的扩展模型**  
Claude Code（function hooks + 一线 `diff`/`telemetry`/`sec-default` mods、`claude plugin eval`）、Copilot（`plugin enable/disable`、JSONL session import）、OpenCode（plugin session forms / 全局事件流）、Pi（对话中途 system-message deltas、延迟 `/reload`）。需求是同一件事：加载一整个插件目录、评估它们，并且不要仅仅因为 auto-invoke 关了就把 skill 藏起来（Claude #78523、Copilot #4438）。

**多会话 / 多 agent 编排**  
Claude 跨会话通信（#24798，关闭后仍被引用）、Codex planner/worker + CoCo/agent-watch 社区工具、Gemini 诚实的子 agent 终止 + `/chat share`、Qwen 把一轮交给 Claude Code 的 ACP hand-off、OpenCode `/loop` + visualize。用户要的是把迭代当成原语，而不是一段“再试一次”的段落。

**死了还能活下来的远程控制**  
Claude Remote Control 会在 Desktop 自动更新后掉线；Codex Ideas #9200（从 ChatGPT app 做 headless，190 👍）以及 thread sync #14067；Gemini 个人档迁到 Antigravity，Enterprise 仍留在 Gemini CLI。Headless + 手机 + 更新后恢复现在已是入场门槛。

**配额、成本与模型路由透明度**  
Claude gateway `pricing:` 与 `/cost` 对齐、`maxEffortLevel`；Codex 本地限额看板（Codex Limits、CodexFuse）；Qwen reasoning presets + `/model --compaction` + Web Shell 角色选择器；Gemini 钉死 Flash 版本的拉锯（`gemini-2.5-flash` 被改写成 3.5）。运维要的是*哪个模型干哪份活*以及*这一轮实际花了多少*。

**Windows 作为一等运行时（仍未兑现）**  
除 Gemini 偏安全的切片外，每份 digest 都在喊 Windows：Claude always-on-top + Plan9/KB5124008 + MSIX；Codex 项目上下文同步、`git ls-files` 池膨胀、浏览器控制上的 API-key vs ChatGPT auth；Copilot WSL clipboard/tmux/CPU 空转；Pi “这东西在 Windows 上到底怎么跑？”（#7547）；Qwen ConPTY / PTY worker 泄漏。这是全行业的共同税。

**MCP + OAuth 正确性**  
Gemini RFC 9207 issuer + SSRF 修复；Copilot resume 会杀掉 stdio MCP 以及 `initialize` 之前的 `server/discover`；OpenCode OAuth refresh 缺 `resource`；Pi/Qwen 的 provider-adapter 被拉得很紧。规范合规现在就是产品功能。

**不能 fail closed 的 compaction / memory**  
Claude `/compact` hang；Pi Astra max-reasoning compaction 上限；Qwen 结构化按需召回 vs 一把倒；Codex 实验性上下文管理的计费疑问。长会话才是工作单元；摘要 bug 就是会话杀手。

## 4. 差异化分析

| | Feature focus | Target users | Technical approach |
|---|---|---|---|
| **Claude Code** | 本月的插件叙事（hooks、eval harness、output styles、effort caps） | 跑 Anthropic 模型的 power user 与插件作者；Desktop/Cowork | 极快的补丁节奏；一线 hook 模块挂在即将到来的 function-hooks API 上；gateway 作为企业控制面 |
| **Codex** | Voice 包装、Computer Use、agent command center、Windows 上的 app-server sandbox | ChatGPT 套餐开发者；多设备（app、CLI、iOS、Android Remote） | Rust CLI + Python SDK 双轨；personality UX 退役，改成内置 instructions；社区在补可观测性缺口 |
| **Gemini CLI** | 安全加固（经构建文件注入、sandbox FS 隔离、MCP OAuth） | Google 生态 + 免费/Pro 个人；担心 Antigravity 分裂的 Enterprise/API 用户 | Nightly 安全列车；fail-closed 信任；policy-as-data（`--yolo` → `allowedTools: ["*"]`）；AST 感知导航仍是史诗级任务 |
| **Copilot CLI** | 贴近编辑器的 CLI：Vim GA、语法补全、instruction/LSP list、企业 org agents | 已经活在 VS Code + Copilot 里的 GitHub 组织开发者 | 1.0.84.x 增量打磨；会话互换（semantic JSONL）；企业发现仍坏（`{org}/.github-private`） |
| **OpenCode** | 供应商无关的 2.0：serve 隔离、visualize、RTL TUI、plugin API | BYOK / 多供应商 / i18n / 自托管 | Client/server `serve`；Desktop SQLite 迁移是成熟度税；社区驱动的 `/loop` 已作为“已交付意图”关闭 |
| **Pi** | 薄 CLI + 扩展生态；第三方 GUI 在填官方 desktop 的坑 | 折腾党、多供应商、RPC-desktop 作者 | 会话中途 system deltas 作为扩展架构；Windows 仍是“自带能跑的组合”；自动关闭策略把崩溃报告埋掉 |
| **Qwen Code** | 跨表面会话总线（CLI、Web Shell、VS Code、Desktop、ACP、channels） | 国内云（DashScope/ModelStudio）+ 跨 agent 运维 | Responses-API 保真、ACP 委托给 Claude Code、256 个 workspace、Desktop + CUA driver 打包 |

Claude 与 Codex 仍是**闭源模型重量级选手**。Gemini 是**安全 + 免费档 harness**。Copilot 是 **GitHub 管理侧 / IDE 原生 CLI**。OpenCode 与 Pi 属于**所有权 / BYOK / 插件**阵营。Qwen 打的是**多表面 + ACP 互操作**，而不只是 Qwen 模型的包装层。

## 5. 社区动能与成熟度

**迭代速度最高：** Claude Code（一天六个 tag）与 Codex（叠起来的 Rust alpha + SDK）。这速度也带来最吵的回归（gateway 强制登录、空闲更新后 Remote Control 掉线、Astra `invalid_prompt`）。

**讨论/生态能量最高：** Codex（remote-control 与 rewind 线程三位数 👍；Awesome Codex CLI、CoCo、isitdone hooks）以及 Pi（一周内四个独立 desktop 表面：Phosphor、Pi Manager、Eco Coding、pi-agent-views）。官方 Desktop 一落后，社区就自己发一个。

**本周安全成熟度最高的切片：** Gemini CLI。Nightly 几乎全是注入、sandbox 隔离、OAuth issuer、NTFS 8.3，以及 fail-closed 的 MCP allowlist。可靠性（hang、假 GOAL）仍落后于安全叙事。

**“产品表面扩张快过 TUI 稳健度”最明显：** Qwen Code。v0.23.3 是一次真正的功能发布（Responses generator、ACP delegation、Web Shell），紧接着就被 P1 盖住：多个后台 agent 完成时 TUI 静默死亡。

**“把大家要的东西真正发出去”最到位：** Copilot CLI 的 Vim 模式。本集合里近 24 小时 PR 量最低；动能在打磨与企业缺口，而不是新架构。

**成熟度警示灯：** 全线 Windows 二等公民；Desktop/SQLite schema 漂移（OpenCode）；进程泄漏（stdio MCP 孤儿、Computer Use 僵尸、`serve` 实例从不回收）；社区自己重做的配额 UX。

## 6. 趋势信号

1. **竞争单元是 harness，不是模型。** Astra 同一周落进 Codex、OpenCode 和 Pi，立刻打出 prompt-invalid、compaction-cap 和 adapter bug。模型发布现在是协议代码的负载测试。

2. **扩展 API 正在收敛到 hooks + eval + 一目录插件。** 2026 Q4 选 CLI 的团队应该问：我们能不能给插件做版本、测试，并在关掉 auto-invoke 时仍不把 skill 藏起来？

3. **可观测性正在被众包。** Limit dashboard、stop-hooks、agent-watch、coordinator 之所以存在，是因为一线配额与多 agent 状态仍不完整。这是采购标准，不是 nice-to-have。

4. **Windows 是企业入场门。** Plan9/KB 损坏、MSIX、WSL clipboard、NTFS 短文件名、sandbox ACL，将决定这些工具能不能离开爱好者机器。

5. **会话身份正在走向多表面。** Qwen 的统一会话注册表、Codex thread sync 诉求、Claude Remote Control 恢复、Copilot JSONL import——可以预期“一个 session 对象、多个客户端”会成为 2026 下半年的默认架构。

6. **诚实的 agent 生命周期胜过更多工具。** `MAX_TURNS` 上的假 `GOAL`、不提示就不用的 skills、tool-count HTTP 400、定时 prompt 作为用户文本重新进上下文——开发者正在关掉子 agent 才能继续干活。可见性与终止原因，比再多一个 MCP server 更重要。

7. **Google 栈个人用户的谱系风险。** Antigravity 过渡加上滞后的模型 ID，已经对那些被告知 Gemini CLI 仍受支持的人构成信任问题。钉死版本；不要假定 nightly 安全修复就等于产品线稳定。

**给决策者的实用结论：** 若你要最强的日更 agent、并能吞下补丁列车回归，选 Claude Code 或 Codex；若安全策略与 Google 认证比无 hang 的多 agent 更重要，选 Gemini CLI；若组织已经以 GitHub agents 为标准，选 Copilot CLI；若不能接受供应商锁定、并愿意跑社区 GUI，选 OpenCode/Pi；若需要 ACP/Web Shell 作为跨 agent、跨国内云厂商的总线，选 Qwen Code。无论选谁，都要为 Windows、MCP OAuth 和会话恢复预留工程时间——本周真正把活干停的，就是这些问题。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

我会拉取官方 Skills 仓库以及若干高流量 PR/Issue，使排名与状态反映当前 GitHub 数据。
# Claude Code Skills 社区要点  
**来源：** [anthropics/skills](https://github.com/anthropics/skills) · 快照 **2026-09-12**  
**说明：** 本快照中许多未关闭 PR 的评论数为 `undefined`。下方排名综合了 **Issue 讨论量**、**近期 / 最后更新活跃度**，以及 **某 Skill 在各 PR 中出现的频次**。

---

## 1. Top Skills 排名

**1. skill-creator（eval / Windows / description 循环）** — 仍是最热的官方 Skill  
相关：[PR #1298](https://github.com/anthropics/skills/pull/1298) · [PR #1099](https://github.com/anthropics/skills/pull/1099) · [PR #1050](https://github.com/anthropics/skills/pull/1050) · [PR #539](https://github.com/anthropics/skills/pull/539) · [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论）· [Issue #202](https://github.com/anthropics/skills/issues/202)（已关闭，8 条评论）

- **功能：** 用于编写与迭代 Skills 的元 Skill（`run_eval.py`、`run_loop.py`、description 优化）。
- **讨论：** `run_eval.py` 对每条 description 都报 **0% recall**；`claude -p` 从未触发被测 Skill。Windows 管道 / `claude.cmd` / 编码问题使该循环不可用。贡献者还希望有 YAML 校验（未加引号且含 `:` 的 `description`）。
- **状态：** 多条 **OPEN** PR 持续到 **2026-09-11**。这是仓库里持续时间最长的可靠性讨论线。

**2. mcp-builder** — MCP 生成 + 评估框架  
相关：[PR #1742](https://github.com/anthropics/skills/pull/1742) · [PR #1724](https://github.com/anthropics/skills/pull/1724) · [PR #1602](https://github.com/anthropics/skills/pull/1602) · [Issue #1390](https://github.com/anthropics/skills/issues/1390)（4 条评论）

- **功能：** 通过 Skill 工作流构建并评估 MCP server。
- **讨论：** MCP SDK ≥2 重命名（`streamable_http_client`）、自定义 headers、评估默认模型仍钉在旧 Sonnet 快照、`TextContent` 无法 JSON 序列化，导致对真实 server 的评估分数为 **0/N**。
- **状态：** **OPEN**，最近更新于 **2026-09-11**。若 import + 序列化补丁一并合入，合并可能性高。

**3. pdf / docx（document-skills 可靠性）**  
相关：[PR #538](https://github.com/anthropics/skills/pull/538) · [PR #541](https://github.com/anthropics/skills/pull/541) · [PR #1734](https://github.com/anthropics/skills/pull/1734) · [PR #514](https://github.com/anthropics/skills/pull/514) · [PR #486](https://github.com/anthropics/skills/pull/486)

- **功能：** 官方文档流水线（PDF、DOCX；拟议 ODT 与排版质检）。
- **讨论：** 大小写敏感的 `REFERENCE.md` / `FORMS.md` 在 Linux 上会出问题；`w:id` 冲突会损坏带修订痕迹的 DOCX；孤立评论；排版（孤行/寡行、编号）。
- **状态：** 所列 PR 全部 **OPEN**。文档类 Skill 仍是「生产在用、边缘 case 持续泄漏」最集中的一簇。

**4. claude-api** — 官方 API 参考 Skill  
相关：[PR #1607](https://github.com/anthropics/skills/pull/1607) · [Issue #1487](https://github.com/anthropics/skills/issues/1487)（4 条评论）

- **功能：** 随 Claude Code 打包的模型目录与 API 指引。
- **讨论：** 已退役的 model ID 仍被标为 active/legacy；该 Skill **急切加载约 156k tokens**，一次工具调用就可能耗尽上下文窗口。
- **状态：** Model-ID PR **OPEN**（更新于 2026-09-01）。上下文膨胀问题仍 **OPEN**。

**5. self-audit / 推理质量门**  
相关：[PR #1367](https://github.com/anthropics/skills/pull/1367) · [Issue #1385](https://github.com/anthropics/skills/issues/1385)

- **功能：** 交付前审计：先做机械性文件存在性检查，再按损害严重度做四维推理审查。
- **讨论：** 社区想要可复用的质量门（校准 → 对抗审查 → 核验），而不只是更多领域 Skill。
- **状态：** **OPEN**（最近 PR 活动在 2026 年中）。概念上是 agent-governance 的姊妹篇。

**6. Hivemind（零成本多智能体编排）**  
[PR #1628](https://github.com/anthropics/skills/pull/1628)

- **功能：** Claude Code 负责规划/审查/合并；廉价无头 [opencode](https://opencode.ai) worker 做机械工作。
- **讨论：** 将昂贵模型的 **上下文**（而非智力）视为稀缺资源。
- **状态：** **OPEN**（创建于 2026-08-21）。

**7. Buffer API agent skill**  
[PR #1627](https://github.com/anthropics/skills/pull/1627)

- **功能：** 面向 Buffer 的可移植 GraphQL Skill：账户、渠道、`addToQueue` / 自定义排期；面向 Claude、Cursor、Codex、OpenClaw、n8n。
- **状态：** **OPEN**，更新于 **2026-09-05**。

**8. Meta / marketplace skills（quality-analyzer、security-analyzer、UIZZE、frontend-design）**  
[PR #83](https://github.com/anthropics/skills/pull/83) · [PR #1595](https://github.com/anthropics/skills/pull/1595) · [PR #210](https://github.com/anthropics/skills/pull/210)

- **功能：** 分析其他 Skill（结构、安全）、合作方 UI 方向（UIZZE）、更紧的 frontend-design 指令。
- **状态：** **OPEN**。表明对 **skill-about-skills** 与设计系统合作方的需求。

---

## 2. 社区需求趋势（来自 Issues）

| 需求 | 依据 | 信号 |
|---|---|---|
| **信任与命名空间卫生** | [#492](https://github.com/anthropics/skills/issues/492) — **43 条评论**，👍2 | 评论数最高的 Issue。安装在 `anthropic/` 下的社区 Skill 会冒充官方 Skill；部分人要求 Bash + hooks。 |
| **组织级 / 团队共享** | [#228](https://github.com/anthropics/skills/issues/228) — 16 条评论，👍8 | 点赞最高。用户拒绝「下载 `.skill` → Slack → Settings 上传」这套流程。 |
| **真正能做评估的 skill-creator** | [#556](https://github.com/anthropics/skills/issues/556) — 12 条评论，👍7 | 评估框架形同噪音；description 优化无法成立。 |
| **安装 / 插件卫生** | [#189](https://github.com/anthropics/skills/issues/189) — 6 条评论，👍9；[#62](https://github.com/anthropics/skills/issues/62) | `document-skills` + `example-skills` 造成重复 Skill；本地重命名后 Skill 消失。 |
| **上下文纪律** | [#1487](https://github.com/anthropics/skills/issues/1487)；compact-memory [#1329](https://github.com/anthropics/skills/issues/1329) | 一次倾倒 100k+ tokens、或用散文式 memory 的 Skill，被视为不友好。 |
| **治理 / 安全模式** | [#412](https://github.com/anthropics/skills/issues/412)（已关闭）；[#1175](https://github.com/anthropics/skills/issues/1175) | 智能体策略、审计轨迹、SharePoint ACL-in-SKILL.md 相关顾虑。 |
| **平台互操作** | [#29](https://github.com/anthropics/skills/issues/29) Bedrock；[#16](https://github.com/anthropics/skills/issues/16) “expose Skills as MCPs” | Skills 应是可移植 API，而不是仅限 Claude 的文件夹。 |
| **HPC / 社交 / 工作流垂直领域** | PR：[scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615)、Buffer #1627、Hivemind #1628 | 新 Skill 正从文档转向 **运维 + 编排**。 |

预期的*新* Skill 方向（不只是修 bug）：**组织 Skill 库**、**命名空间/安全扫描器**、**紧凑记忆**、**智能体治理**、**真正能用的 MCP 评估**、**质量门**、**社交/排期 API**、**HPC/Slurm**。

---

## 3. 高潜力待合入 Skills

可能很快合入或保持积极审阅（开放 + 近期有更新）：

| PR | 可能很快合入的原因 |
|---|---|
| [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder MCP≥2 + headers | 修复对当前 SDK 的硬性断裂；更新于 2026-09-11。 |
| [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator eval recall | 针对 #556 的复现；更新于 2026-09-11。 |
| [#1734](https://github.com/anthropics/skills/pull/1734) orphaned DOCX comments | 范围窄、具体的 docx 修复；更新于 2026-09-11。 |
| [#1724](https://github.com/anthropics/skills/pull/1724) mcp-builder default model | 单文件将 model ID 提升到 `claude-sonnet-5`。 |
| [#1607](https://github.com/anthropics/skills/pull/1607) claude-api retired IDs | 文档正确性对齐线上 API。 |
| [#1627](https://github.com/anthropics/skills/pull/1627) Buffer API | 完整的可移植垂直 Skill；进入 9 月仍在更新。 |
| [#1628](https://github.com/anthropics/skills/pull/1628) Hivemind | 产品论点清晰；取决于维护者对多运行时 Skill 的接受度。 |
| [#514](https://github.com/anthropics/skills/pull/514) document-typography | 对每份生成文档都可见的质量提升。 |

紧迫性较低但仍开放：[ODT #486](https://github.com/anthropics/skills/pull/486)、[scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615)、[self-audit #1367](https://github.com/anthropics/skills/pull/1367)。

---

## 4. Skills 生态洞察

**社区的集中需求不是「更多 Skills」，而是可信、加载成本低的 Skills：正确的官方来源、能用的 eval/MCP 框架，以及不会撑爆上下文窗口的组织可共享库。**

---

# Claude Code 社区摘要 — 2026-09-12

Source: [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. 本周要点

Function hooks 是社区关注的重心：Anthropic 承诺将在「数周而非数天」内交付，#91870 是评论最多的开放议题。补丁版本中产品面迅速扩大（plugin eval、output styles、gateway 定价对齐、`maxEffortLevel`）。Windows 仍是反馈最集中的平台集群——Desktop 始终置顶、KB5124008 之后 Cowork 的 Plan9 挂载、安装包状态，以及自动更新后 Remote Control 失效。

## 2. 版本发布

过去 24 小时内落地六个标签（2.1.263–2.1.269）：

- **[v2.1.269](https://github.com/anthropics/claude-code/releases/tag/v2.1.269)** — `claude plugin eval`（JSON + HTML 评分报告）；`/output-style [name]`，含 Remote Control / cloud。
- **[v2.1.268](https://github.com/anthropics/claude-code/releases/tag/v2.1.268)** — 在 `gateway.yaml` 中加入 Gateway `pricing:`，使已登录客户端与 `/cost` 及遥测共用费率；当 `access_control.allow_cidrs` 为空时发出警告。
- **[v2.1.267](https://github.com/anthropics/claude-code/releases/tag/v2.1.267)** — `maxEffortLevel`（全局或按模型，含 Bedrock/Vertex/Foundry）；`--system-prompt-snapshot off`。
- **[v2.1.266](https://github.com/anthropics/claude-code/releases/tag/v2.1.266)** — 回归修复：`CLAUDE_CODE_USE_GATEWAY` 不再单独强制 Cloud 登录。
- **[v2.1.265](https://github.com/anthropics/claude-code/releases/tag/v2.1.265)** — Desktop/Cowork 遥测增加 `user.email` / `user.groups`；`--plugin-dir` 可指向插件目录。
- **[v2.1.263](https://github.com/anthropics/claude-code/releases/tag/v2.1.263)** — 缺陷修复与稳定性。

## 3. 热门议题

1. **[#91870 Function Hooks](https://github.com/anthropics/claude-code/issues/91870)** — 161 条评论，95 👍。官方更新「将在 N 周内交付」；高质量设计反馈正在塑造 API。这是本月的插件能力主线。
2. **[#85891 Desktop always-on-top (Win11)](https://github.com/anthropics/claude-code/issues/85891)** — 99 条评论，236 👍。窗口保持置顶且无可切换开关；对应 macOS 的 #66516。本组反应数最高。
3. **[#92984 Cowork Plan9 mount fails after KB5124008](https://github.com/anthropics/claude-code/issues/92984)** — 99 条评论。所有 Plan9 共享均失败（`invalid argument`）；卸载该 KB 是唯一变通办法。一次常规 Windows 更新后即阻断 Windows Cowork。
4. **[#24798 Inter-session communication](https://github.com/anthropics/claude-code/issues/24798)** — 已关闭的增强请求，84 条评论。跨隔离会话的多 Claude 编排；仍被视作大型项目工作流缺失的原语。
5. **[#49917 Windows installer HRESULT 0x80073CF6](https://github.com/anthropics/claude-code/issues/49917)** — 42 条评论。「成功」首次安装后再装一次，会把 MSIX 留在损坏状态。
6. **[#93525 Cowork egress allowlist collapse](https://github.com/anthropics/claude-code/issues/93525)** — 已关闭为重复。尽管设为「All domains」，沙箱白名单仍收缩至约 5 个主机。回归 + 网络 + Cowork。
7. **[#79773 Max 20x not reflected in weekly limits](https://github.com/anthropics/claude-code/issues/79773)** — 自七月升级以来的计费/配额错配；仍未关闭，额度按 5x（甚至更差）消耗。
8. **[#58996 `/compact` stuck at 95%](https://github.com/anthropics/claude-code/issues/58996)** — 已关闭。macOS 上长时间压缩挂起；典型的「会话变得不可用」报告。
9. **[#87959 Worktree Bash guard rejects compound commands](https://github.com/anthropics/claude-code/issues/87959)** — 隔离检查器拒绝 `&&`、`;`、heredoc，即便完全未触及 git。
10. **[#78523 `disable-model-invocation` hides `/skill-name`](https://github.com/anthropics/claude-code/issues/78523)** — 选择退出自动调用的 Skills 也会从显式斜杠调用中消失。

另值一提：孤立的 stdio MCP 服务器（[#93087](https://github.com/anthropics/claude-code/issues/93087)）、Apple Silicon 上 Design 窗口 OOM（[#93679](https://github.com/anthropics/claude-code/issues/93679)）、空闲自动更新后丢失 Remote Control（[#91915](https://github.com/anthropics/claude-code/issues/91915)、[#80969](https://github.com/anthropics/claude-code/issues/80969)、[#93288](https://github.com/anthropics/claude-code/issues/93288)），以及会在加载时实际执行 `` !`cmd` `` 的 skill 文档（[#93748](https://github.com/anthropics/claude-code/issues/93748)）。

## 4. 关键 PR 进展

1. **[#93215 mods: sec-default, diff, telemetry](https://github.com/anthropics/claude-code/pull/93215)**（已关闭）— 以源码形式发布第一方 hook 模块；依赖 function hooks 开放。
2. **[#93452 mods/diff match built-in /diff](https://github.com/anthropics/claude-code/pull/93452)**（开放）— 与原生 diff 面板的视觉/交互对齐。
3. **[#93244 mods API renames + diff backend seam](https://github.com/anthropics/claude-code/pull/93244)**（已关闭）— 插件 API 命名、遥测卫生、git 作为默认 VCS 后端。
4. **[#89404 validate-agent.sh don’t abort on first warning](https://github.com/anthropics/claude-code/pull/89404)**（开放）— 修复 `set -e` + 算术自增导致 plugin-dev 自有 agent 被杀死（[#83803](https://github.com/anthropics/claude-code/issues/83803)）。
5. **[#42205 hookify matcher trim/normalize](https://github.com/anthropics/claude-code/pull/42205)**（已关闭）— `"Edit or Write"` 风格匹配器不再因空格失败。
6. **[#87079 `**` globs match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)**（开放）— security-guidance 模式此前会静默跳过顶层文件。
7. **[#68689 block symlink escape in security-guidance](https://github.com/anthropics/claude-code/pull/68689)**（已关闭）— 阻止将 `.claude/claude-security-guidance.md` 作为指向 `~/.ssh/id_rsa` 的符号链接。
8. **[#68786 / #68785 plugin-dev hook script hardening](https://github.com/anthropics/claude-code/pull/68786)**（已关闭）— 用 stdin 重定向替代 shell 插值；hook JSON 输出到 stdout；示例中的 CI/JSON 注入修复。
9. **[#26175 replace broken native installer bootstrap](https://github.com/anthropics/claude-code/pull/26175)**（已关闭）— `install.sh` 在写入 `~/.local/bin/claude` 失败后，不再删除仍可用的 npm 安装。
10. **[#63686 stale/autoclose 14 → 90 days](https://github.com/anthropics/claude-code/pull/63686)**（已关闭）— Issue 机器人对长周期设计讨论不再那么激进。

另外值得注意：hookify 与 security-guidance 上的 Windows 路径/CRLF/python-stub 修复（[#68699](https://github.com/anthropics/claude-code/pull/68699)、[#68694](https://github.com/anthropics/claude-code/pull/68694)、[#68701](https://github.com/anthropics/claude-code/pull/68701)）；`/bug` 报告插件（[#68707](https://github.com/anthropics/claude-code/pull/68707)）。

## 5. 热门讨论

从略 — 未提供 Discussions 数据。

## 6. 功能请求趋势

- **Function / plugin hooks 作为真正的扩展模型** — eval 评测套件、第一方 mods（`diff`、`telemetry`、`sec-default`）、按目录加载插件。
- **多会话 / 多智能体编排** — 跨会话消息、真正会触发的 ScheduleWakeup 循环、自撰写唤醒提示的出处追溯。
- **进程死后仍能存活的 Remote Control** — Desktop 更新后重连、空闲再启动、会话恢复、移动端唤醒、容量满时的「新会话」行为。
- **输出与成本控制** — output styles、按提供方的 effort 上限、gateway 定价与 `/cost` 对齐。
- **Desktop/IDE 打磨** — 始终置顶开关、麦克风快捷键、VS Code 回复一键复制、路径与斜杠命令解析。

## 7. 开发者痛点

- **Windows 仍是二等运行时**：始终置顶的 Desktop、一次累积 KB 就打断 Plan9/Cowork、残留的 MSIX 状态、非 ASCII 项目 slug 冲突、浏览器面板权限提示在非 localhost 上永不持久化。
- **Remote Control 在无头 / 长生命周期机器上很脆**：自动更新与恢复路径会丢掉桥接且不再重新武装（`isFirstTurn` 门控）。
- **生命周期泄漏**：会话结束时孤立的 stdio MCP 服务器；Design 渲染器内存无上限；`/compact` 挂起。
- **配额与鉴权意外**：Max 20x 未反映到周上限；gateway 环境变量回归强制 Cloud 登录。
- **Skill/hook 陷阱**：`disable-model-invocation` 同时干掉显式 `/skill`；文档示例中的 `` !`cmd` `` 会在加载时执行；worktree Bash 守卫把任何复合命令都当成越界。
- **Agent 权威混淆**：定时提示 / 压缩文本重新进入上下文，仿佛是用户说的；跨 ScheduleWakeup 跳转没有出处追溯。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex 社区周报 — 2026-09-12**  
来源：[github.com/openai/codex](https://github.com/openai/codex)

### 1. 本周要点
Codex 本周密集发布了一批 **0.155.0-alpha.3.x Rust** 标签以及 **Python SDK 0.154.0**；社区讨论最热的仍是桌面端 / Windows 稳定性：项目上下文同步、sandbox/exec 辅助进程、Computer Use，以及 API-key 浏览器控制。产品方向在合并侧同样忙碌——语音打包、经 app server 路由的 Windows sandbox、personality 下线，以及 agent-command-center 分组。GPT-6 Astra 的 “invalid prompt” / 回退报告和用量上限困惑仍在持续，同时远程控制、rewind、跨设备线程同步等长期诉求也未降温。

### 2. 发布
- **Rust alphas：** `0.155.0-alpha.3` 至 `0.155.0-alpha.3.10`，另有 `0.155.0-alpha.2` / `.2.3` 以及 `0.154.0-alpha.6.2`。迭代很快；仓库内说明大多只有 tag。
- **Python SDK 0.154.0：** `pip install --upgrade openai-codex==0.154.0`（Python 3.10+），配套 `openai-codex-cli-bin==0.154.0`。
- **本轮发布中值得注意的产品说明：**
  - `max` 与 `ultra` reasoning-effort 取值（[#39662](https://github.com/openai/codex/pull/39662)）
  - 同步路径新增 `ExternalMessage`
- **Voice / Windows 打包：** Cygwin 构建输入（`voice-cygwin-…`）用于原生 Windows voice CI；不进入用户安装包。相关 PR 捆绑了原生语音运行时，并澄清了 VC++ runtime 提示。

### 3. 热点 Issue
1. **[#42215](https://github.com/openai/codex/issues/42215)** — Windows ChatGPT Work：本地聊天在文件系统项目上下文同步处失败（23 个文件的项目）。评论量最高（31）。阻塞 “Work inside an existing Project.”
2. **[#43410](https://github.com/openai/codex/issues/43410)** — Windows 浏览器控制在 API-key 鉴权时失败（`unsupported Codex auth method: apikey`）。24 条评论，13 个 👍。成功连接后影响 Edge 插件 + native host。
3. **[#25744](https://github.com/openai/codex/issues/25744)** — macOS Computer Use / MCP helpers 泄漏并留下僵尸进程；HID 延迟以及 WindowServer/TCC 卡住。存活很久（6 月开立），仍在更新。
4. **[#16786](https://github.com/openai/codex/issues/16786)** — Windows 应用反复执行 `git ls-files --others --exclude-standard -z`；`ntfs.sys` 非分页池持续增长。典型资源泄漏报告，自 4 月起仍未关闭。
5. **[#40596](https://github.com/openai/codex/issues/40596)** — Windows unified exec：`helper_unknown_error: setup refresh had errors`。与其他 sandbox 初始化失败属同一类问题。
6. **[#37856](https://github.com/openai/codex/issues/37856)** — VS Code：Web renderer 重载后线程所有者过期 → “open in another application.” 8 个 👍；多客户端所有权 bug。
7. **[#42214](https://github.com/openai/codex/issues/42214)** — Windows Computer Use 无法驱动原生应用（`cua.getApp is not a function`）。
8. **[#43237](https://github.com/openai/codex/issues/43237)** + **[#44649](https://github.com/openai/codex/issues/44649)** + **[#44700](https://github.com/openai/codex/issues/44700)** — GPT-6 Astra 拒绝极简提示（`hi` / `你好`），报 `invalid_prompt` 并回退到 GPT-5.6 Sol。CLI 与应用均可复现。
9. **[#28340](https://github.com/openai/codex/issues/28340)** — iOS 间歇性无法打开正在运行的任务会话（13 个 👍）。
10. **[#44963](https://github.com/openai/codex/issues/44963)** / **[#43632](https://github.com/openai/codex/issues/43632)** — Windows 计划任务唤醒、ACK，然后停住；心跳回复的是长线程中*更早*的回合。当天新报。

同时关注：sandbox 锁 / `SetNamedSecurityInfoW`（[#36475](https://github.com/openai/codex/issues/36475)）、macOS 上 workspace-write 重命名被拒绝（[#40565](https://github.com/openai/codex/issues/40565)）、Android Remote 漏掉 agent 创建的线程（[#43017](https://github.com/openai/codex/issues/43017)）、macOS 上 queue SQLite 损坏（[#44955](https://github.com/openai/codex/issues/44955)）。

### 4. 关键 PR 进展
当天大部分已合并流量来自 **copyberry[bot]**，外加一条较早的生命周期 PR。以下十条定义了当前产品界面：

1. **[#44957](https://github.com/openai/codex/pull/44957)** — Agent command center：按项目 / 状态 / **model** 分组任务（`Ctrl+S`）。
2. **[#44952](https://github.com/openai/codex/pull/44952)** / **[#44928](https://github.com/openai/codex/pull/44928)** / **[#44925](https://github.com/openai/codex/pull/44925)** / **[#44924](https://github.com/openai/codex/pull/44924)** — 语音字幕在说话人更新时保持可见；电平表在静音采样期间保留历史；先接受音频再出字幕；蓝牙麦克风切换后刷新说话人格式。
3. **[#44922](https://github.com/openai/codex/pull/44922)** / **[#44942](https://github.com/openai/codex/pull/44942)** — 捆绑原生 Windows 语音运行时；澄清 `vcruntime140.dll` 可再发行组件提示。
4. **[#44945](https://github.com/openai/codex/pull/44945)** / **[#44939](https://github.com/openai/codex/pull/44939)** — Windows TUI sandbox 初始化走 app server（`windowsSandbox/setupStart`）；遵循 execution hosts（本地 TUI 不再从 remote-executor 起 sandbox）。
5. **[#44946](https://github.com/openai/codex/pull/44946)** / **[#44935](https://github.com/openai/codex/pull/44935)** / **[#44930](https://github.com/openai/codex/pull/44930)** — 下线 Friendly/Pragmatic personality UX；在 GPT-5.4/5.5 中内嵌固定的友好指令；从 TUI 移除 `/personality`。
6. **[#44944](https://github.com/openai/codex/pull/44944)** — 对*已有* app-server 线程重新校验托管 provider 要求。
7. **[#44948](https://github.com/openai/codex/pull/44948)** / **[#44932](https://github.com/openai/codex/pull/44932)** / **[#44934](https://github.com/openai/codex/pull/44934)** — 为异步用户提问、插件刷新、远程 compaction 以及 Code Mode 工具提供上下文快照；统一快照窗口。
8. **[#44938](https://github.com/openai/codex/pull/44938)** — 即使没有 install URL，也能检测 connector 鉴权失败。
9. **[#44933](https://github.com/openai/codex/pull/44933)** — 从 TUI 启动流程中移除 Windows world-writable 扫描/警告。
10. **[#25383](https://github.com/openai/codex/pull/25383)** — App-server 账户会话生命周期，用于 Desktop 多账户资料切换（`accountSession/login|add|list|switch|logout`）。

### 5. 热门讨论

**Ideas**
- **[#9200](https://github.com/openai/codex/discussions/9200)**（46 条评论，190 个 👍）— 从 ChatGPT 应用远程控制无头 Codex（已有人用 Tailscale + SSH 自行打通）。
- **[#9618](https://github.com/openai/codex/discussions/9618)**（23 / 132）— `/rewind` 或 `/revert`；对照点是 OpenCode 与 Claude Code。
- **[#14067](https://github.com/openai/codex/discussions/14067)**（10 / 62）— 跨机器同步线程与会话上下文。
- **[#12567](https://github.com/openai/codex/discussions/12567)** — 官方 “Memories in Codex” 设计讨论（引用 vs. 静默使用）。
- **[#41716](https://github.com/openai/codex/discussions/41716)** — ChatGPT 做规划，Codex 做工人编排。
- **[#7366](https://github.com/openai/codex/discussions/7366)** — 用 `@` 引用被 gitignore 的文件。

**Q&A**
- **[#40385](https://github.com/openai/codex/discussions/40385)** — Windows “control other devices” / Remote Connections 未出现在 UI 中。
- **[#42503](https://github.com/openai/codex/discussions/42503)** — Astra 何时进入 Codex？
- **[#43257](https://github.com/openai/codex/discussions/43257)** — 实验性上下文管理会不会对历史查找计费？
- **[#40707](https://github.com/openai/codex/discussions/40707)** / **[#42983](https://github.com/openai/codex/discussions/42983)** — 5 小时上限又回来了；Luna-low 与 Astra-high 的消耗节奏感觉不一致。

**Show and tell**
- **[#16329](https://github.com/openai/codex/discussions/16329)** — Awesome Codex CLI（150+ 生态工具）。
- **[#44641](https://github.com/openai/codex/discussions/44641)** — Codex Limits CLI/TUI，用于用量 / 重置 / credits。
- **[#41157](https://github.com/openai/codex/discussions/41157)** — CodexFuse 1.2.0 Windows 限流仪表盘。
- **[#44643](https://github.com/openai/codex/discussions/44643)** — CoCo：并行 Codex 工作的协调器。
- **[#42041](https://github.com/openai/codex/discussions/42041)** — agent-watch，监控后台 `codex exec`（DONE / FAILED / STALL）。
- **[#44153](https://github.com/openai/codex/discussions/44153)** — isitdone Stop hook：测试 / lint 通过前禁止报 “done”。

### 6. 功能请求趋势
- **远程 + 多设备：** 无头守护进程、手机 / 应用远程控制、线程 / 会话同步、Android Remote 完整性。
- **撤销 / 导航：** rewind/revert、跳转到用户消息、线程内提示导航器。
- **记忆与编排：** 引用或静默使用 memories、planner/worker 拆分、AGENTS.md 指引图、并行 agent 协调器。
- **限额透明度：** 本地仪表盘和 CLI，查看剩余配额、重置时间以及 credit 行为。
- **平台对等：** Intel macOS 与原生 Windows 应用上的 Computer Use；感知 gitignore 的 `@` 引用；CLI 中 Shift+Enter 换行。

### 7. 开发者痛点
- **Windows 是可靠性热点：** 项目上下文文件系统同步、sandbox 初始化（`helper_unknown_error`、锁 / ACL 错误）、`git ls-files` 池增长、浏览器控制的 API-key 与 ChatGPT 登录鉴权分裂、计划任务 / 心跳误触发。
- **进程卫生：** macOS 上未回收的 MCP / Computer Use 子进程；marketplace 暂存目录残留在 `.tmp`。
- **面向模型的摩擦：** GPT-6 Astra 对极简输入报 `invalid_prompt`；不透明的 5 小时 vs 周限额记账；personality 旋钮正在被移除，用户仍在排查 provider/线程继承。
- **客户端所有权 bug：** VS Code “open in another application”、composer 消失、SQLite 队列损坏、Remote 线程列表丢掉 agent 拉起的聊天。
- **变通文化：** 社区正在自己做配额 UI、stop-hooks、回放工具和协调器，因为官方可观测性与多会话控制仍不完整。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

先核对仓库与讨论页，避免摘要漏掉社区帖，再按规则只输出简体译文。# Gemini CLI 社区周报 — 2026-09-12

Repo: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. 本周亮点

当前 nightly 线的主线是安全加固。`v0.61.0-nightly.20260912` 针对构建文件与不受信任的 flags 加入了提示注入防护，并收紧了沙箱文件系统隔离。稳定版 `v0.59.0` 与预览版 `v0.60.0-preview.0` 延续同一方向：MCP OAuth 的 SSRF/issuer 校验、工作区信任的 fail-closed 行为、NTFS 短文件名路径缓解，以及沙箱设置隔离。社区讨论最热的仍是 Agent 可靠性——卡死、在 `MAX_TURNS` 后误报 `GOAL success`、登录循环，以及 Auto Memory 质量——而 PR 则集中在策略一致性、模型固定（model-pin）保留，以及 Windows 沙箱命令校验。

## 2. 版本发布

**最新 nightly：** [v0.61.0-nightly.20260912.g9c1b0a610](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260912.g9c1b0a610)

- [PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250) — 阻断通过构建文件编辑与不受信任 flags 发起的间接提示注入。
- [PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214) — 加固沙箱文件系统边界，并隔离运行时状态。

**近期相关 nightly / preview**

- [v0.61.0-nightly.20260909](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260909.ged2ac40df)：NTFS 8.3 短文件名路径缓解（[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)）；在沙箱容器中隔离 settings 目录（[#29216](https://github.com/google-gemini/gemini-cli/pull/29216)）；为不受信任的工具输出增加 envelope provenance；保留显式带版本号的 Flash 模型 ID（[#29252](https://github.com/google-gemini/gemini-cli/pull/29252)）。
- [v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0)：更安全的 web-fetch 路由（[#29120](https://github.com/google-gemini/gemini-cli/pull/29120)）；MCP OAuth 中的 RFC 9207 issuer ID（[#29117](https://github.com/google-gemini/gemini-cli/pull/29117)）；Seatbelt 临时目录隔离；扩展路径/边界加固；CrUX key 消毒；更严格的系统配置所有权检查。
- **当前稳定版：** [v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0) — MCP OAuth SSRF 修复（[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)）；fail-closed 的工作区信任，以及受限模式下的 MCP server 过滤（[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)）。

## 3. 热点 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent 已触及 `MAX_TURNS`，却仍报告 `status: success` / `Termination Reason: GOAL`。P1 Agent 缺陷；13 条评论。会把 `codebase_investigator` 的真实中断掩盖掉。
2. **[#29267](https://github.com/google-gemini/gemini-cli/issues/29267)** — 登录时出现认证循环（Pro 用户）。3 天内 10 条评论。直接卡住首次运行。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — 零依赖的 OS 沙箱 + 执行后意图路由，让 Gemini 3 能继续使用原生 POSIX 工具。大型增强；数月后仍在活跃讨论。
4. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent 会永久卡住（连 mkdir 也不例外）。8 个 👍。变通办法：禁用 sub-agents。在卡死类问题里社区信号最强。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC：具备 AST 感知的 read/search/map，减少错位读取与 token 噪声。
6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — 除非明确指示，否则模型很少使用 skills 和 sub-agents。削弱了 Agent 架构本身。
7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** / **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** / **[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)** — Auto Memory 一组问题：密钥在脱敏前就进入模型；低信号会话会无限重试；无效的 inbox patch 静默失败。安全 + 质量。
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — 命令已经结束，Shell 仍停在 “Waiting input”。P1 核心卡死；3 个 👍。
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent 在 Wayland 上失败。
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 工具数量超过约 128 时返回 400。Agent 不会收缩工具范围。

同时关注：[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)（劝阻破坏性 git/DB 操作）、[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)（`/compress` 不会持久化）、[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)（get-shit-done hook 崩溃）。

## 4. 关键 PR 进展

1. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250)**（已合并）— 对构建文件与不受信任 flags 做工作区边界检查；已随今日 nightly 发布。
2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** / **[#29283](https://github.com/google-gemini/gemini-cli/pull/29283)**（已合并）— 在 Docker/Podman/runsc/LXC/Seatbelt 上隔离沙箱文件系统；配置只读，运行时状态临时化。
3. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201)** — 在确认重试时保留已批准的 shell 命令（修复多条 `!{}` TOML 命令中的无限 allow 循环）。
4. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217)** — 不再把显式指定的 `gemini-2.5-flash` 改写成 3.5 Flash。钉死 2.5 的用户保持钉死。
5. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200)** — MCP allowlist 大小写不敏感并会 trim；空的 `mcp.allowed` 采用 fail-closed。
6. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205)** — MCP prompt 文本按原文提交，不再做 JSON 编码（引号/换行得以保留）。
7. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282)** — 浏览器/user-code 登录后立即持久化 OAuth 凭据（与 #29267 直接相关）。
8. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184)** — Windows 沙箱：校验 git 参数，避免 `git diff --output=` 静默截断文件。
9. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203)** — `stripShellWrapper` 现在能处理额外 flags，策略会重新检查内部命令。
10. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287)**（已合并）— 将 `--yolo` 映射为 `allowedTools: ["*"]`，并取消作为特殊状态的 `ApprovalMode.YOLO`。

值得一提：[#29211](https://github.com/google-gemini/gemini-cli/pull/29211)（嵌套 React 状态更新）、[#29208](https://github.com/google-gemini/gemini-cli/pull/29208)（畸形 `agents.json` 不再崩溃）、[#29118](https://github.com/google-gemini/gemini-cli/pull/29118)（只剥离末尾的 `.git`）。

## 5. 热门讨论

### 公告
- [Public Roadmap for Gemini CLI v1](https://github.com/google-gemini/gemini-cli/discussions)（置顶）
- [Service update: mitigating abuse and prioritizing traffic](https://github.com/google-gemini/gemini-cli/discussions) — 互动很高（约 930+）
- [Transitioning Gemini CLI to Antigravity CLI](https://github.com/google-gemini/gemini-cli/discussions) — 仍被反复引用；Enterprise/API 用户被告知继续留在 Gemini CLI

### 想法 / 产品方向
- [#14181](https://github.com/google-gemini/gemini-cli/discussions/14181) — Aider 风格的单轮 UX：`/clear` 之后仍钉住 `@files`/`@folders`
- [#28685](https://github.com/google-gemini/gemini-cli/discussions/28685) — Gemini 3.6 Flash 支持；并争论 CLI 是否已放弃个人用户

### 问答 / 反馈
- [#24725](https://github.com/google-gemini/gemini-cli/discussions/24725) — Pro 订阅用户：卡死、Ctrl+C 循环、会污染 PowerShell 的注释
- [#25448](https://github.com/google-gemini/gemini-cli/discussions/25448) — 性能 / OAuth 缓慢反馈汇总
- 针对由 shell 驱动的文件变更的 Checkpoint 覆盖（Q&A，8 月 25 日）

### Show and tell
- Sumlyzer（npm workspace 反馈）
- agent-watch — 后台 Agent 的 DONE / FAILED / STALL 检测
- 15 个工程工作流 skills，采用 SKILL.md 格式
- WorkPaper MCP、Semble hooks

## 6. 功能请求趋势

- **原生 bash + 低成本沙箱**，让模型能直接用 `grep`/`sed`/`awk`，而不必背上一整套沉重工具面（#19873）。
- **AST 感知导航**，替代“消防水管式”整文件读取（#22745、#22746、#19561 “tactful extraction”）。
- **诚实的 Agent 生命周期**：可见的 subagent 轨迹（`/chat share`，#22598）、准确的终止原因、对锁定浏览器配置的会话接管（#22232）。
- **自我认知**：正确的 flags、快捷键，以及“如何运行我自己”（#21432）。
- **持久会话卫生**：resume 时保留 `/compress`（#21335）；能在 `/clear` 后存活的钉住文件。
- **策略即数据**：`--yolo` 作为通配 allowlist；运行时一致的 MCP allow/deny。
- **更新的 Gemini 模型**进入 CLI，面向被告知“仍会获得模型更新”的 Enterprise/API 用户。

## 7. 开发者痛点

- **卡死与虚假成功。** Generalist agent 死锁（#21409）、命令退出后 Shell 仍 “Waiting input”（#25166）、`MAX_TURNS` 被报成 GOAL（#22323）。用户只能关掉 sub-agents 才能继续干活。
- **认证与凭据持久化。** 登录循环（#29267）；OAuth 模式比 API key 更慢；凭据写入过晚（#29282）。
- **安全与便利的拉锯。** 经构建文件的间接注入、Windows 上的 `git diff --output`、NTFS 8.3 路径、MCP SSRF、密钥在脱敏前进入 Auto Memory。
- **工具面膨胀。** 超过 128 个工具就 HTTP 400；不显式提示就不会用 skills/sub-agents；临时脚本散落在仓库各处（#23571）。
- **平台缺口。** Wayland 上的 browser agent、Windows 沙箱只读分类、沙箱设置泄漏到宿主机。
- **对产品线的信任。** 个人档迁移到 Antigravity，再加上模型 ID 滞后，让 Enterprise/API 用户开始追问：“仍受支持”是否包含新的 Flash/Pro SKU。

---

*根据 2026-09-12 过去 24 小时的 GitHub 动态，以及当前 Discussions 列表生成。Nightly 属于预发布版本；接入生产 Agent 前请钉住模型，并先审阅 sandbox/policy 差异。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-12

Repo: [github/copilot-cli](https://github.com/github/copilot-cli)

## 1. This Week's Highlights

1.0.84.x 快速补丁列车已落地：为语义 JSONL 交换格式提供 session/memory 导入、基于同一套解析语法的 shell 补全、独立的 `instruction`/`lsp` list 命令、插件 enable/disable + `--json`，以及**全员可用的 Vim 模式**。社区热度仍集中在 Windows/WSL/tmux 输入与剪贴板问题、MCP 生命周期（OAuth、`server/discover`、resume 超时）、带 `disable-model-invocation` 的 skills，以及企业组织级 agents 在 CLI 中始终不出现。

## 2. Releases

**v1.0.84-5** — 为语义 JSONL 交换格式提供 session 与 memory 的 **import** 命令。补全现在来自 CLI 解析所用的同一套语法，因此 `copilot <TAB>` 会显示根级 flags 以及子命令，且每个子命令只提供自身选项。

**v1.0.84-4** — `copilot instruction list` 与 `copilot lsp list` 取代 `copilot plugins list --kind …`。plugin list / marketplace list / browse 支持 `--json`。新增 `copilot plugin enable` / `disable`。

**v1.0.84-3** — `/copy` 在可用时会包含任务完成消息。经 OAuth 认证的 MCP 服务器在 session 启动时连接更可靠。

**v1.0.84-2** — Vim 模式全面可用（`/vim` 或 `editorMode: vim`）；输入时显示模式指示。在受支持的 Windows sandbox 策略下，交互式 shell 命令会记录被拦截的访问。

## 3. Hot Issues

1. **[#13](https://github.com/github/copilot-cli/issues/13) — Vim/Vi input mode**（CLOSED，12 条评论，76 👍）  
   长期存在的模态编辑诉求。在 1.0.84-2 向全员推出 Vim 模式后关闭——本窗口互动量最高的 issue。

2. **[#1285](https://github.com/github/copilot-cli/issues/1285) — Org-level Agent not showing up**（OPEN，9 条评论）  
   `{org}/.github-private` 中的 agents 在 CLI 与 VS Code 中均不出现。阻碍企业落地。

3. **[#3260](https://github.com/github/copilot-cli/issues/3260) — Copy/paste broken over SSH + tmux → Windows Server 2025**（OPEN，7 条评论）  
   v1.0.47 之后的回归。远程 Windows + tmux 是常见运维路径。

4. **[#3534](https://github.com/github/copilot-cli/issues/3534) — WSL2 ARM64 `/copy` fails (`clip.exe` quoting)**（OPEN，6 条评论）  
   `cmd.exe` 包装层的 quoting 导致 aarch64 WSL2 上剪贴板失效。

5. **[#4438](https://github.com/github/copilot-cli/issues/4438) — `disable-model-invocation: true` makes skills unreachable**（OPEN，5 条评论，7 👍）  
   Skill 已列出，但 `skill()` 返回 “Skill not found.” 仅手动调用的 skills 无法使用。

6. **[#4035](https://github.com/github/copilot-cli/issues/4035) — Voice installer hits private Azure Artifacts (401)**（OPEN，5 条评论）  
   安装器应从 nuget.org 拉取 `Microsoft.AI.Foundry.Local.Core`，而不是私有源。

7. **[#4753](https://github.com/github/copilot-cli/issues/4753) — Session resume cancels in-flight stdio MCP (~1s vs ~16s)**（OPEN，4 条评论）  
   Resume 交接会杀掉仍在初始化的 MCP 服务器；本 session 内它们不会再回来。

8. **[#3700](https://github.com/github/copilot-cli/issues/3700) — WSL2 idle MainThread ~215% CPU, TUI frozen**（OPEN，4 条评论）  
   #2208 的高严重度回归；实时输出在重启前不会绘制。

9. **[#1168](https://github.com/github/copilot-cli/issues/1168) — Authorization fatigue**（OPEN，4 条评论）  
   一次高层请求可能触发十几次权限提示。

10. **[#4095](https://github.com/github/copilot-cli/issues/4095) — Windows plugin update “Access is denied” while VS Code is open**（OPEN，2 条评论，21 👍）  
    Copilot 扩展持有对 `installed-plugins` 的 watchers。本周期开放缺陷中 👍 最高。

**持续关注：** [#4764](https://github.com/github/copilot-cli/issues/4764) 辅助权限约 1 小时后失效；[#4795](https://github.com/github/copilot-cli/issues/4795) Atlassian MCP OAuth 回调端口不匹配；[#4699](https://github.com/github/copilot-cli/issues/4699) 长 `--resume` 触发 OOM，且 crash dumps 写入 cwd；[#4809](https://github.com/github/copilot-cli/issues/4809)（CLOSED）在 `initialize` 之前发出非规范的 `server/discover`。

## 4. Key PR Progress

过去 24 小时内仅有 **9** 个 PR 更新（不是 10 个）。值得关注的包括：

1. **[#4808](https://github.com/github/copilot-cli/pull/4808)**（OPEN）— 将 GitHub Actions 固定到 commit SHA（安全机器人）。供应链卫生。

2. **[#4786](https://github.com/github/copilot-cli/pull/4786)**（CLOSED）— 澄清第三方服务声明 / 访问条款。

3. **[#4770](https://github.com/github/copilot-cli/pull/4770)**（OPEN）— 文档化 WebSocket responses 退出选项（网络拦截 / `400 input item ID` 失败）。

4. **[#4761](https://github.com/github/copilot-cli/pull/4761)** / **[#4762](https://github.com/github/copilot-cli/pull/4762)**（CLOSED）— 在 FreeBSD 上，安装器报告不支持的 OS，而不再提示 “Windows detected but winget not found”。

5. **[#4746](https://github.com/github/copilot-cli/pull/4746)**（OPEN）— `examples/next-best-action/` 下的实验性 next-action SDK 扩展原型（`joinSession()`，无工具 UI）。

6. **[#4739](https://github.com/github/copilot-cli/pull/4739)**（OPEN）— 终端自管 macOS 通知的文档 + MIT 示例（点击聚焦问题）。

7. **[#4748](https://github.com/github/copilot-cli/pull/4748)**（OPEN）— “Add joke cli” — 低信号 / 趣味向 PR。

8. **[#4100](https://github.com/github/copilot-cli/pull/4100)**（CLOSED）— 极简 “安全性” PR；非产品变更。

## 5. Hot Discussions

已省略 — 未提供 Discussions 数据。

## 6. Feature Request Trends

- **模态 / 键盘优先编辑** — Vim 已上线；用户仍希望打磨，并与经典 vi motions 对齐（[#13](https://github.com/github/copilot-cli/issues/13)）。
- **多账号切换**无需重新认证（[#367](https://github.com/github/copilot-cli/issues/367)，因信息不足已关闭）。
- **跨 session 上下文** — 查询另一 session 的 memory，而不是冷启动（[#2436](https://github.com/github/copilot-cli/issues/2436)）。
- **企业 agent 发现**，来自组织 `.github-private`（[#1285](https://github.com/github/copilot-cli/issues/1285)）。
- **Skills UX** — 可读的 `/skills list`（[#4823](https://github.com/github/copilot-cli/issues/4823)）；通过 slash 调用且带 `disable-model-invocation` 的 skills 仍必须能解析（[#4438](https://github.com/github/copilot-cli/issues/4438)、[#4637](https://github.com/github/copilot-cli/issues/4637)）。
- **可观测性** — 在 OpenTelemetry 上输出 HydraFusion 各阶段的 model/verdict/credits（[#4825](https://github.com/github/copilot-cli/issues/4825)）。
- **Prompt 队列** — `ctrl-t` 入队应在当前回合结束后执行（[#4824](https://github.com/github/copilot-cli/issues/4824)）。
- **Session 交换** — JSONL import 刚落地；对可移植 session/memory 的需求仍在。

## 7. Developer Pain Points

- **Windows / WSL / 远程终端栈：** 剪贴板（`/copy`、`clip.exe` quoting）、SSH+tmux 粘贴、Windows 25H2 上 sandbox “not supported on this host”、VS Code 运行时插件更新文件锁、自五月起的原生运行时崩溃。
- **MCP 可靠性：** `initialize` 之前的 `server/discover` 破坏符合规范的服务器；FastMCP `-32602`；resume 杀掉进行中的 stdio；`--additional-mcp-config` 服务器在第二次 reconciliation 时被剥离；Atlassian OAuth 回调端口与已注册的 33418 不一致；向刚被取消的服务器刷新 tools/list 会永久丢掉工具。
- **权限 UX：** 一次请求反复弹出认证提示；辅助自动批准约 1 小时后失效。
- **长 session：** `--resume` 时 V8 heap 在 4 GiB 处 OOM；crash dumps 写入 cwd。
- **配置未生效：** 启动时忽略 `settings.json` 的 `model`（回退到 `claude-sonnet-5`）。
- **Instruction 发现：** `AGENTS.md` 会跟随已解析的符号链接，并跨越仓库边界遍历全部祖先目录（[#4822](https://github.com/github/copilot-cli/issues/4822)）。
- **过激的外泄过滤器**拦截合法规范内容（YAML 中的环境变量 token）。
- **TUI 异常：** `/ask` 与 `/btw` 的回答空白，但对话框仍开着；空闲 CPU 空转导致输出冻结。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

先核对仓库里 v1.18.30 的正式发布说明和相关 issue/PR，避免把 digest 里的细节译错。# OpenCode 社区周报 — 2026-09-12

Repo: [anomalyco/opencode](https://github.com/anomalyco/opencode)

## 本周要点

v1.18.30 已落地，新增 GPT-6 的 Astra system prompt 支持，并修复 Bedrock / Azure / OpenAI 提供商兼容性。2.0 分支本周主要集中在托管 `serve` 进程隔离、MCP 实例泄漏、Desktop / SQLite 会话迁移，以及原生 TUI 的 RTL / bidi 支持。功能侧热度仍集中在 agent loop / visualize / plugin API；可靠性问题（Desktop schema 漂移、历史膨胀、OAuth 刷新、Windows 权限）继续占据 issue 流量的大头。

## 版本发布

**[v1.18.30](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)**（最新）

核心改进
- 为 GPT-6 模型加入 Astra system prompt。

问题修复
- 保留 Bedrock DeepSeek 模型 ID（含基于 ARN 的 ID），确保能正确解析（@YeEmrick）。
- 更新 Azure 与 OpenAI 提供商 SDK，以修复兼容性问题。
- 为受支持的 GitLab GPT 与 Claude 模型增加 reasoning-effort 变体（@far-ouq）。

社区贡献还包含 console 用量 / 层级修复，以及 GitLab reasoning 变体。

## 热门 Issue

1. **[#18001](https://github.com/anomalyco/opencode/issues/18001) [CLOSED] `/loop` for automated iterative tasks** — 12 条评论，43 👍。本窗口互动最高的功能请求；社区希望有一等公民的迭代能力，而不是靠冗长自然语言反复重试。
2. **[#27328](https://github.com/anomalyco/opencode/issues/27328) [CLOSED] Local server crashes during use** — 9 条评论。授权通过后 sidecar 退出；会话还在，但 UI 卡住。本地 server 工作流的核心可靠性投诉。
3. **[#42170](https://github.com/anomalyco/opencode/issues/42170) [OPEN] Desktop: `no such column: project_id`** — 6 条评论。Desktop 1.18.17 在 schema 重映射后无法加载会话，阻断既有配置的升级。
4. **[#36539](https://github.com/anomalyco/opencode/issues/36539) [CLOSED] v2 child repos ignore shared workspace config** — 5 条评论。`OPENCODE_CONFIG_DIR` 在 shell 里可见，但子 git 仓库内不生效。伤害 monorepo / 共享工作区用户。
5. **[#34592](https://github.com/anomalyco/opencode/issues/34592) [CLOSED] MCP OAuth refresh omits `resource`** — 4 条评论。Atlassian（以及 RFC 9728 风格的服务端）在 refresh 时返回 401。MCP 鉴权仍是锐边。
6. **[#47727](https://github.com/anomalyco/opencode/issues/47727) [OPEN] `serve`: per-request instances never disposed** — 3 条评论。多目录轮询客户端下，MCP 子进程不断堆积直至 OOM。
7. **[#34215](https://github.com/anomalyco/opencode/issues/34215) [CLOSED] Desktop hang from 179MB+ `opencode.global.dat`** — 3 条评论，6 👍。历史里的 Base64 PDF 附件导致数分钟卡顿和数 GB 级 I/O。
8. **[#32567](https://github.com/anomalyco/opencode/issues/32567) [CLOSED] Context-percentage usage alert** — 3 条评论，2 👍。用户希望在 context 耗尽前有可视化提示。
9. **[#36690](https://github.com/anomalyco/opencode/issues/36690) [CLOSED] Permissions case-sensitive on Windows** — 3 条评论。Windows cmdlet 加上大小写敏感的 permission key，破坏预期配置。
10. **[#48588](https://github.com/anomalyco/opencode/issues/48588) [OPEN] Managed serve stays in client cgroup** — 1 条评论，今日提交。共享 `serve --service` 继承客户端内存上限，被 watchdog 杀掉。同日已有配套修复 PR。

值得一提：[#36675](https://github.com/anomalyco/opencode/issues/36675) 授权后的 Copilot 模型选择，[#36709](https://github.com/anomalyco/opencode/issues/36709) SQLite 迁移 schema 不匹配，[#35884](https://github.com/anomalyco/opencode/issues/35884) TUI 中的 AltGr 符号。

## 关键 PR 进展

1. **[#48591](https://github.com/anomalyco/opencode/pull/48591) [OPEN] Spawn managed serve in its own systemd scope** — 修复 #48588。把分离的 `serve` 移出客户端 cgroup，避免共享 server 被饿死。
2. **[#48586](https://github.com/anomalyco/opencode/pull/48586) [OPEN] Interactive `/visualize` command** — 新增 `/visualize` 以及 `opencode visualize`，带确认步骤（关闭 #48585）。
3. **[#48587](https://github.com/anomalyco/opencode/pull/48587) / [#48589](https://github.com/anomalyco/opencode/pull/48589) / [#48590](https://github.com/anomalyco/opencode/pull/48590) [OPEN] Native TUI Arabic/RTL (bidi)** — 通过 bidi-js 实现 UAX #9 排版，并对 URL / 路径 / 代码做隔离；同时登陆 `dev` 与 `opencode2` beta。
4. **[#48582](https://github.com/anomalyco/opencode/pull/48582) [CLOSED] Omit empty Bedrock tool descriptions** — 避免空的 `toolSpec.description` 触发 Bedrock Converse HTTP 400。
5. **[#48575](https://github.com/anomalyco/opencode/pull/48575) [CLOSED] Render home prompt before plugins settle** — 加快 TUI 首屏绘制；plugin chrome 随后填入，无需重挂已聚焦的 prompt。
6. **[#48570](https://github.com/anomalyco/opencode/pull/48570) [CLOSED] Defer named-theme palette detection** — 具名主题不再因探测终端调色板而阻塞启动。
7. **[#48559](https://github.com/anomalyco/opencode/pull/48559) [CLOSED] Codemode errors get real JS prototypes** — value-model 重写的第三步；解释器失败现在看起来像原生 JS 错误。
8. **[#48568](https://github.com/anomalyco/opencode/pull/48568) [CLOSED] Omit Node CLI from `latest`** — 实验性 Node CLI 不再进入官方 latest；dev / beta 不变。
9. **[#48576](https://github.com/anomalyco/opencode/pull/48576) [CLOSED] Docs: use stable V2 packages** — 安装 / SDK / plugin 示例从 `@beta` 切到 `@opencode/*`。
10. **[#46690](https://github.com/anomalyco/opencode/pull/46690) [OPEN] Plugin API: session forms, session list, global event stream** — 扩大 plugin 表面，面向 bot 与自定义 UI。

另外关注：[#48435](https://github.com/anomalyco/opencode/pull/48435) timeline-row 对账性能，[#43460](https://github.com/anomalyco/opencode/pull/43460) 跨 Effect 版本的 plugin tool-input 解码，[#47555](https://github.com/anomalyco/opencode/pull/47555) `--continue` 的 dummy session 拉取，[#42223](https://github.com/anomalyco/opencode/pull/42223) continue-session 的工作目录。

## 功能请求趋势

- **Agent 控制循环**：`/loop`（#18001）、agent 托管提醒（#36676）、动态会话持久化（#36635）。
- **可视化与状态 UX**：交互式 `/visualize`（#48585 / #48586）、plugin 状态栏 / 侧边栏 API（#36625）、context 用量告警（#32567）。
- **配置与文档卫生**：AGENTS.md 继承规则 + 关闭开关（#36699）、文档化 `OPENCODE_CONFIG` 优先级（#36663）、agent 文件的 linter 命令（#36719）。
- **Serve / 多项目运维**：`opencode serve` 的 `--dir`（#36658）、在服务端持久化 web 已打开项目（#48592）。
- **TUI 国际化 / 媒体**：原生 RTL（#48587+）、经终端协议内联图片（#36630）、波斯语 README（#47783）。
- **Reasoning-effort 持久化**，跨 agent 与会话（#36703、#36651、#36638）。

## 开发者痛点

- **Desktop + SQLite 迁移**：缺少 `project_id`，升级 schema 与全新 schema 不一致，内嵌附件把 `opencode.global.dat` 撑得巨大。
- **`serve` 的进程生命周期**：按请求创建的 Instance / MCP 子进程泄漏，托管 server 困在客户端 cgroup 里，本地 sidecar 在权限提示后崩溃。
- **提供商 / 鉴权边角**：MCP OAuth 缺少 `resource`，Copilot 授权后模型仍未解锁，Bedrock 空 tool description，Ollama-cloud 的 `think` 未转发。
- **Windows / 键盘 / multiplexer 摩擦**：大小写敏感的 permissions、TUI 吞掉 AltGr 符号、`/exit` 与 Ctrl+C 会干掉整个 Zellij 会话。
- **配置优先级仍出人意料**：环境变量配置被全局 agent markdown 覆盖；子仓库不会合并共享工作区配置。
- **历史与 shell 输出质量**：工具结果里残留回车进度帧；会话数据只在干净退出时刷新。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区周报 — 2026-09-12

来源：[earendil-works/pi](https://github.com/earendil-works/pi)

## 1. 本周亮点

Windows 仍是呼声最高的支持面：一条长期存在的「到底怎么在 Windows 上跑 Pi？」帖子继续占据评论量榜首，同时新的 PR 在加固 Store 别名、shell 发现、PowerShell 路径查找，以及 Git-bash 超时杀进程。另一条主线是 Provider 管线——**v0.85.1** 已接入 GPT-6 Astra，会话中途的 system-message 增量也落地了；而一连串 OpenAI-compatible / Codex / Bedrock / Vertex 问题说明目录扩张速度快过请求适配层。扩展与第三方 UI（Phosphor、Eco Coding、Pi Manager、pi-agent-views）继续填补社区反复要求的「官方桌面界面」缺口。

## 2. 版本发布

**[v0.85.1](https://github.com/earendil-works/pi/releases/tag/v0.85.1)**（最新；打标于 2026-09-05）

- 通过 OpenAI API keys 与 OpenAI Codex subscriptions 接入 **GPT-6 Astra**。
- 全屏 TUI：Alt + 鼠标滚轮滚动速度提升 5×（[#9166](https://github.com/earendil-works/pi/pull/9166)）。
- 修复：model/thinking 选择器保存快捷键；0.85.0 SDK 因未发布的 experimental 路径导致 import 损坏；自动补全/设置中 hover 重新居中导致点击落空；GPT-5.6+ Responses 的 prompt-cache TTL（`prompt_cache_options.ttl: "30m"`，不再按 24h 保留）。

说明：若干 0.85.1 时期的 issue 已报告 Astra 压缩上限、捆绑 native addon 触发 SIGILL，以及 OpenAI Responses 流被提前终止——预计还会有一轮跟进补丁。

## 3. 热点 Issue

1. **[#7547](https://github.com/earendil-works/pi/issues/7547)** — *How do you use Pi on Windows?*（62 条评论，👍2）  
   关于 WSL vs 原生 vs Store vs Git-bash 的元帖。对「先补文档还是先修核心」优先级判断信号最强。

2. **[#9052](https://github.com/earendil-works/pi/issues/9052)** — Fullscreen wheel scroll ~3× slower（9 条评论，👍4）  
   用户既要固定输入框，又要普通模式的滚动速度。0.85.1 已部分缓解（Alt 加速滚动）；仍未关闭。

3. **[#9323](https://github.com/earendil-works/pi/issues/9323)** — Fireworks-specific config（14 条评论）  
   Provider 配置仍然过于通用；社区正在公开排查各模型族的怪癖。

4. **[#5323](https://github.com/earendil-works/pi/issues/5323)** — Vertex + GCP metadata server（9 条评论）  
   对 ADC 文件做同步 `existsSync`，并不能可靠代表 GCE/Cloud Run 上「Vertex 是否已鉴权」。

5. **[#8928](https://github.com/earendil-works/pi/issues/8928)** — Parallel startup reports “No API key” for ~48s  
   *另一个* Provider 的 OAuth 过期会卡住当前正在用的 Provider。对多进程 / CI 很伤。

6. **[#7321](https://github.com/earendil-works/pi/issues/7321)** — Multi-line paste broken without bracketed paste（Termux）  
   第一个 `\r` 直接提交而不是插入。移动端/Android 用户被卡住。

7. **[#9262](https://github.com/earendil-works/pi/issues/9262)** — `find` glob with `\` silently returns nothing  
   Windows 路径分隔符会得到空结果且无错误——agent 会据此判断文件不存在。

8. **[#9129](https://github.com/earendil-works/pi/issues/9129)** — Windows bash timeout leaves pipeline orphans  
   对 MSYS2 bash PID 执行 `taskkill` 杀不掉管道各阶段。

9. **[#9512](https://github.com/earendil-works/pi/issues/9512)** — Compaction hits token cap with GPT-6 Astra at max reasoning（已关闭，未分诊）  
   新模型加上继承下来的会话 reasoning，把摘要撑爆。相关：[#8371](https://github.com/earendil-works/pi/issues/8371) 压缩输入无上界。

10. **[#9500](https://github.com/earendil-works/pi/issues/9500)** / **[#9507](https://github.com/earendil-works/pi/issues/9507)** — SIGILL in 0.85.1 and Windows RPC `libuv` assertion on shutdown  
    新版本上的 native/运行时故障；按新贡献者策略被自动关闭，需要维护者接手。

另外留意：[#7658](https://github.com/earendil-works/pi/issues/7658)（扩展 API 无法持久化 `auth.json` 密钥）、[#9462](https://github.com/earendil-works/pi/issues/9462)（`ctx.ui.notify` 后写覆盖）、[#9510](https://github.com/earendil-works/pi/issues/9510)/[#9509](https://github.com/earendil-works/pi/issues/9509) 非拉丁键盘布局下 Alt+字母失效。

## 4. 关键 PR 进展

1. **[#9116](https://github.com/earendil-works/pi/pull/9116)** + **[#9117](https://github.com/earendil-works/pi/pull/9117)** *（已关闭）* — 会话中途的 system messages；把 prompt/tool 变更做成 system 增量，而不是改写顶层 prompt。这是扩展在会话中途改写工具的核心架构。

2. **[#9501](https://github.com/earendil-works/pi/pull/9501)** *（开放）* + **[#9504](https://github.com/earendil-works/pi/pull/9504)** *（开放）* — 统一 Windows shell 发现；接受 Windows Store 别名（`accessSync` vs `existsSync` 的 EACCES）。直接回应 #7547。

3. **[#9505](https://github.com/earendil-works/pi/pull/9505)** *（已关闭）* — 在 openai-completions 的 *tool* 流路径上尊重 `models.json` 的 `samplingParams`（此前只在 `streamSimple` 里生效）。

4. **[#9488](https://github.com/earendil-works/pi/pull/9488)** *（开放）* — Codex 回合归属规范化（在重试、工具、压缩之间贯穿 `requestIdentity`）。

5. **[#9442](https://github.com/earendil-works/pi/pull/9442)** *（开放）* — `compat.supportsPromptCacheKey`，让 OpenAI-compatible 代理也能收到会话 cache key。

6. **[#8572](https://github.com/earendil-works/pi/pull/8572)** *（开放，WIP）* — Amazon Bedrock Mantle 表面（在 Converse 上失败的 GPT 族模型）。

7. **[#8627](https://github.com/earendil-works/pi/pull/8627)** + **[#9483](https://github.com/earendil-works/pi/pull/9483)** *（已关闭）* — 工具相对 `ctx.cwd` 解析；随后通过 `customCwd` 做成 opt-in 以保持向后兼容。

8. **[#9468](https://github.com/earendil-works/pi/pull/9468)** *（已关闭）* — 延迟扩展重载（`requestReload`，在 settle 时合并），避免 `/reload` 发生在回合中途。

9. **[#9478](https://github.com/earendil-works/pi/pull/9478)** *（已关闭）* — 压缩 token 估算时限制单条消息字符数（超大 `web_fetch` JSON 会立刻再次触发压缩）。

10. **[#9489](https://github.com/earendil-works/pi/pull/9489)** *（已关闭）* — Bedrock Converse：按模型族规范化 `usage.inputTokens` 的毛量 vs 净量。

值得一提：[#9491](https://github.com/earendil-works/pi/pull/9491) customization-doc 评测；[#9467](https://github.com/earendil-works/pi/pull/9467) 将 setup 阶段中止归类为 aborted；[#8708](https://github.com/earendil-works/pi/pull/8708) 解析 fd/rg 版本时不再消耗 GitHub API 配额。

## 5. 热门讨论

### Ideas
- **[#8420](https://github.com/earendil-works/pi/discussions/8420)** — 官方 Web UI 底座？DSH 的插件生态已经长出大量 UI 插件；Pi 自身仍偏 CLI/TUI。
- **[#9207](https://github.com/earendil-works/pi/discussions/9207)** — 从 system message 里拿掉 “Available tools” 段（浪费 token）。
- **[#9146](https://github.com/earendil-works/pi/discussions/9146)** — 按仓库覆盖 API key，并忽略全局 `auth.json`（1Password / OpenRouter 工作流）。
- **[#9312](https://github.com/earendil-works/pi/discussions/9312)** — Pi Context Memory：找回「压缩前那个决定是为什么做的」。

### Q&A
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** — Which plugins/extensions do you actually use?（16 条评论，👍9） 仍是置顶的社区目录。

### Show and tell
- **[#9446](https://github.com/earendil-works/pi/discussions/9446)** — **Phosphor**：叠在 `pi --mode rpc` 上的桌面界面（聊天、diff、文件、终端）。
- **[#9427](https://github.com/earendil-works/pi/discussions/9427)** — **Pi Manager**：面向 providers/models/`~/.pi/agent` 的本地控制面。
- **[#9327](https://github.com/earendil-works/pi/discussions/9327)** — **Eco Coding**：桌面 GUI（视觉分屏、团队、浏览器、computer use）。
- **[#9373](https://github.com/earendil-works/pi/discussions/9373)** — **pi-agent-views**：在 Pi 内部渲染并发子 agent。
- **[#8803](https://github.com/earendil-works/pi/discussions/8803)** — **pi-verdict**：单文件 allow/ask/deny 权限门。
- **[#9213](https://github.com/earendil-works/pi/discussions/9213)** — Agent-Friendly Score 徽章（Pi 得分 86.2）。

## 6. 功能请求趋势

1. **一等公民级 Windows** — shell 发现、Store 别名、非 C: 安装、Git-bash 进程树、键盘布局、路径分隔符。
2. **官方（或受背书的）GUI / RPC 客户端** — 一周内冒出多个独立桌面端；discussion #8420 希望要一个底座，而不是 N 个分叉。
3. **Provider 保真度** — Vertex ADC、Fireworks、Bedrock Mantle、Codex 归属、代理上的 prompt-cache key、停止把仅 OpenAI 才有的字段发给「兼容」端点。
4. **扩展平台完整性** — 持久化凭据、导出 hook 类型、非竞态的 UI notify、公开的 OAuth HTML 辅助、延迟重载、会话中途的 system 增量。
5. **压缩不能静默失败** — 限制摘要输入、处理 Astra 最大 reasoning 上限、更便宜的会话检索（[#9267](https://github.com/earendil-works/pi/issues/9267)）。
6. **按项目作用域的鉴权** — 每仓库独立 key、忽略全局 `auth.json`、不要因为 Provider B 的 OAuth 过期而堵住 Provider A。

## 7. 开发者痛点

- **Windows 仍是「自备能跑的组合」。** 写死的 `C:\` PowerShell、Store 别名 `EACCES`、被遗弃的 bash 管道、ЙЦУКЕН 布局下 Alt+字母失效、会话恢复时 RPC libuv 崩溃。
- **静默空结果比大声报错更糟。** Windows glob、并行启动时缺失的 key、被丢掉的 `samplingParams`——agent 会推断出错误的世界状态。
- **新贡献者自动关闭** 正在把 0.85.1 的崩溃/兼容报告埋掉（`SIGILL`、Responses SSE 中断、`TOO_MANY_TOOL_CALLS` 类型错误），直到日常 review 才被看见。
- **压缩 + 超大工具载荷** 仍会误触发（6.6 MB 的 `web_fetch` JSON；Astra 输出上限）。长会话可能变得无法再压缩。
- **扩展作者撞上 API 天花板：** 没有写入 `auth.json` 的路径、后写覆盖的 `notify`、导出类型不完整、发行二进制里 `/reload` 会重跑依赖副作用（[#6108](https://github.com/earendil-works/pi/issues/6108)）。
- **OpenAI-compatible 不是 OpenAI。** 多出来的 role/字段/鉴权头，再加上缺少 cache-key 开关，持续把中继打崩（ModelScope、new-api、本地桥）。

---

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

我将拉取实时 GitHub 页面，使摘要与当前的 releases、issues 和 PRs 一致，而不是截断的 dump。
接下来我会获取完整 changelog 以及 issue 和 PR 页面，以便摘要可以引用真实标题和链接。
# Qwen Code Community Digest — 2026-09-12

Repo: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) · window: 过去 24 小时的 GitHub 活动（外加本快照前刚发布的 stable/nightly 标签）。

## 1. 本周亮点

稳定版 **v0.23.3** 于 9 月 10 日落地，官方未宣布破坏性变更：扩展了 Kimi/Qwen/DeepSeek 推理预设、一等公民级的 OpenAI Responses 内容生成器、通过 ACP 将子 agent 回合交接给外部 agent（首先支持 Claude Code），以及更紧凑的 Web Shell 会话界面（统一来源、可点击 URL、可配置品牌）。同一切点附近，项目还发布了 **Desktop v0.3.0**、TypeScript SDK **v0.1.12**（捆绑 CLI 0.23.3）、CUA driver **v0.20.5**，以及 9 月 11 日的 nightly。当前火线是可靠性：多个后台 agent 同时完成时 TUI 会 P1 级静默崩溃、Responses 流水线邻接性 bug 会破坏 reasoning + tool-call 配对，以及历史图片重新附加导致的 DashScope 缓存未命中。

## 2. 发布

| Tag | When | Notes |
| --- | --- | --- |
| [v0.23.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3) | 10 Sep | 稳定版 CLI。特性：推理预设（[#11349](https://github.com/QwenLM/qwen-code/pull/11349)）、OpenAI Responses 生成器（[#8169](https://github.com/QwenLM/qwen-code/pull/8169)）、ACP 外部 agent 委托（[#11003](https://github.com/QwenLM/qwen-code/pull/11003)）、会话注册表 / 线协议（[#11463](https://github.com/QwenLM/qwen-code/pull/11463)）、Web Shell 会话总览 + 统一来源 + 可点击链接（[#11238](https://github.com/QwenLM/qwen-code/pull/11238)、[#11262](https://github.com/QwenLM/qwen-code/pull/11262)、[#11464](https://github.com/QwenLM/qwen-code/pull/11464)）、默认 256 个工作区（[#11515](https://github.com/QwenLM/qwen-code/pull/11515)）。修复包括 Windows ConPTY 托管（[#11497](https://github.com/QwenLM/qwen-code/pull/11497)）、SSE 重连（[#11467](https://github.com/QwenLM/qwen-code/pull/11467)）、推理签名保留（[#8260](https://github.com/QwenLM/qwen-code/pull/8260)）、跨会话加载保留待处理权限 / 问题（[#11468](https://github.com/QwenLM/qwen-code/pull/11468)）。 |
| [v0.23.3-nightly.20260911.aaa6a32aae](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260911.aaa6a32aae) | 11 Sep | 基于 0.23.3 的 nightly。要点：移除钉钉后台聚合（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）、`feat(channels)!:` 移除消息前缀过滤（[#11571](https://github.com/QwenLM/qwen-code/pull/11571) — nightly 说明中标为破坏性，尽管稳定版 0.23.3 说明写的是“已知无破坏性变更”）。 |
| [v0.23.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2) | 9 Sep | 分屏会话导航（[#11250](https://github.com/QwenLM/qwen-code/pull/11250)）、带 token/二维码的远程一键启动（[#11172](https://github.com/QwenLM/qwen-code/pull/11172)）、ModelStudio Standard/Token Plan 内置 `web_search`（[#11348](https://github.com/QwenLM/qwen-code/pull/11348)）、GPT-5/6 推理力度配置（[#11295](https://github.com/QwenLM/qwen-code/pull/11295)）、Web Shell 中 Plan 与 execution 权限拆分（[#11423](https://github.com/QwenLM/qwen-code/pull/11423)）。 |
| [desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0) | 10 Sep | 桌面打包 CI 定时运行（[#11519](https://github.com/QwenLM/qwen-code/pull/11519)）、会话刷新后保留待处理权限 / 问题、VS Code 切换前历史恢复、Windows PTY worker 清理。预览标签 `desktop-v0.3.0-preview.0` 仍让 `desktop-latest` 更新器停留在 0.2.2 — 请刻意安装。 |
| [sdk-typescript-v0.1.12](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.12) | 10 Sep | 捆绑 CLI **0.23.3**。 |
| [cua-driver-rs-v0.20.5](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.5) | 9 Sep | 预构建 CUA driver：已公证的通用 macOS + `QwenCuaDriver.app`；未签名 Linux（x86_64/arm64，glibc 2.31+）以及 Windows UIAccess/SDK 载荷。 |

npm `@qwen-code/qwen-code` 当前为 **0.23.3**。

## 3. 热点 Issues

过去 24 小时内仅有 **六** 个 issue 被更新。按严重程度与用户影响排序（不是按点赞 — 本 dump 中全部为 0 👍）：

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — 多个后台 agent 同时完成时 TUI 静默崩溃（React #185）**  
   **Open · P1 · UI/rendering · 7 comments。** Ink `useBoxMetrics` 布局监听进入 `setState` 循环；进程退回 shell，屏幕上没有任何错误，恢复时报告上一会话为脏状态。本窗口内用户侧最高严重度缺陷：多 agent 是一等产品路径，TUI 静默死亡就是一次会话丢失事件。

2. **[#11665](https://github.com/QwenLM/qwen-code/issues/11665) — Responses 清理可能破坏 reasoning / tool-call 邻接**  
   **Open · P2 · core / content-generation · ready-for-human · 4 comments。** 回放清理把 `reasoning` 项与其 `function_call` 当作彼此独立处理，违反 OpenAI Responses 邻接不变量。直接威胁 0.23.3 新上的 Responses 生成器。对应修复已以 [#11684](https://github.com/QwenLM/qwen-code/pull/11684) 提交。

3. **[#11627](https://github.com/QwenLM/qwen-code/issues/11627) — DashScope：重复重新附加图片可能阻止 prompt-cache 复用**  
   **Closed · P2 · performance/caching · 2 comments。** 历史图片在缓存断点之后被重新追加；下一回合把新的 assistant/tool 消息插到这些图片之前，使前缀失效。窗口内已关闭 — 视为已知的 DashScope 多模态税，而不是未灭的火。

4. **[#11617](https://github.com/QwenLM/qwen-code/issues/11617) — PR #11241（Playwright Browser SDK）的延期审查发现**  
   **Open · bot-filed。** `feat(browser-use)` 未能塞进原 PR 范围的后续表面。说明 browser-use 正在切片落地，审查债务被暂存而不是卡死。

5. **[#11685](https://github.com/QwenLM/qwen-code/issues/11685) — PR #11679（Windows monitor 调试目录）的延期审查发现**  
   **Open · created today。** 同一套 autofix-延期模式，落在一条活的 Windows 路径上。Windows PTY/monitor 工作在推进，但遗留审查评论正在自成一条 issue 流。

6. **[#7167](https://github.com/QwenLM/qwen-code/issues/7167) — Fleet Shepherd Dashboard**  
   **Open · bot-maintained。** 运维心跳（`Last tick: 2026-09-12T03:41:17Z`）。不是产品缺陷；只说明 bot 舰队仍在扫描（PR #11679 被标为 “checks in flight”）。

## 4. 关键 PR 进展

按产品影响挑选，不按评论数（dump 里评论数标为 `undefined`）。

1. **[#11684](https://github.com/QwenLM/qwen-code/pull/11684) — `fix(core): keep reasoning and function_call items adjacent through Responses cleanup`**（`he-yufeng`，今日开启）  
   把回放的 reasoning 项与其 function call 视为一个整体。孤立的 call 会连同其前置 reasoning 项一起丢弃。这是 #11665 的在途补丁，也是新 Responses 路径上的承重级正确性修复。

2. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — `feat(memory): add structured on-demand recall`**（`ZijianZhang989`，autofix/takeover）  
   用两级 ref/title 树、面向查询的元数据子树，以及显式召回工具，替换扁平的自动记忆倾倒。队列中最大的记忆架构变更。

3. **[#10410](https://github.com/QwenLM/qwen-code/pull/10410) — `feat(core): preserve prompt cache for deferred tools`**（`DragonnZhang`，autofix/takeover）  
   稳定的两步桥接：`tool_search` 在不改动已声明工具列表的情况下检查延期 schema；`tool_call` 走现有流水线执行。目标是工具晚揭示时的缓存命中率。

4. **[#11342](https://github.com/QwenLM/qwen-code/pull/11342) — `feat(web-shell): add model role and context window configuration`**（`wenshao`）  
   Advisor/图像模型获得感知 endpoint 的选择器；语音使用工作区转录模型；自定义设置覆盖对话、图像生成和转录。让 Web Shell 成为真正的多模型控制台。

5. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — `feat(web-shell): show shell and monitor task output`**（`BZ-D`）  
   把 Monitor 的 stdout/stderr 与 Shell 捕获并排持久化；daemon 暴露按 live-session-owner 作用域清洗过的 tail。补上“我启动了任务却看不见”的缺口。

6. **[#6019](https://github.com/QwenLM/qwen-code/pull/6019) — `feat(cli): add /model --compaction`**（`Rajeshwaran-R`）  
   专用压缩模型，与聊天模型分离。长跑请求；两个月后仍开放，本身就说明压缩成本 / 质量尚未解决。

7. **[#11291](https://github.com/QwenLM/qwen-code/pull/11291) — `fix(core): retry status-less upstream errors instead of ending the turn`**（`wenshao`）  
   网关把错误对象塞进已经是 200 的 SSE 流时，当前会直接结束本回合。将其归类为可重试。与 [#10347](https://github.com/QwenLM/qwen-code/pull/10347)（EOF / 包装后的 4xx 作为传输错误）成对。

8. **[#11584](https://github.com/QwenLM/qwen-code/pull/11584) — `fix(vscode): list all workspace sessions in the panel history`**（`yiliang114`）  
   去掉 `sourceType` 过滤，让 VS Code、终端、Web Shell 以及未归属会话共享一份历史。对齐 0.23.3 的“统一会话来源”主题。

9. **[#11659](https://github.com/QwenLM/qwen-code/pull/11659) — `fix(cli): keep the expanded OpenTUI confirmation dialog on screen`**（bot，#11655）  
   OpenTUI E2E 自 `518f6795f9` 起一直红：确认载荷被渲染两次并溢出固定 alt-screen。卡住 OpenTUI 渲染器车道。

10. **[#11647](https://github.com/QwenLM/qwen-code/pull/11647) — `fix(cli): resolve ACP core settings against the active target dir`**（`yiliang114`）  
    `qwen/settings/getCore` 和 `setCoreValue` 在客户端省略 `cwd` 时不再回退到 `process.cwd()`；改用 `config.getTargetDir()`。ACP 多工作区行为正确所必需。

仍在推进的荣誉提名：[#9305](https://github.com/QwenLM/qwen-code/pull/9305)（短视口内容底部对齐）、[#10455](https://github.com/QwenLM/qwen-code/pull/10455)（输出语言文件不可写时不要崩溃）、[#11562](https://github.com/QwenLM/qwen-code/pull/11562)（一次性系统提醒不要混进用户自己的消息）、[#10963](https://github.com/QwenLM/qwen-code/pull/10963)（在委托边界触发 active-todo 提醒）、[#11289](https://github.com/QwenLM/qwen-code/pull/11289)（daemon 在 idle 时拒绝的中途消息予以保留）。

## 5. 热点讨论

略 — 源 dump 未提供 Discussions 数据。

## 6. 功能请求趋势

从开放 PR 以及 0.23.2/0.23.3 特性列表推断（无 Discussions 语料）：

- **多表面会话身份。** 统一会话来源、去掉 `sourceType` 过滤的 VS Code 历史、会话注册表 + 线协议、可发送对等消息的 ACP 会话。产品正在收敛成一个可从 CLI、Web Shell、VS Code、Desktop 和 channels 到达的会话对象。
- **模型路由成为一等设置。** 推理预设（Kimi/Qwen/DeepSeek）、GPT-5/6 推理力度、Web Shell 角色 + 上下文窗口选择器、`/model --compaction`。用户要的是*哪个模型干哪份活*，而不是一个全局模型。
- **跨 agent / ACP 互操作。** 通过 ACP 把子 agent 回合委托给 Claude Code（[#11003](https://github.com/QwenLM/qwen-code/pull/11003)）；Playwright Browser SDK 后续（[#11617](https://github.com/QwenLM/qwen-code/issues/11617) / PR #11241）。Qwen Code 正被当成总线使用，而不只是一个 agent。
- **可拉取、而非倾倒的记忆。** 结构化按需召回（[#10183](https://github.com/QwenLM/qwen-code/pull/10183)），以及不击穿 prompt cache 的延期工具 schema 搜索（[#10410](https://github.com/QwenLM/qwen-code/pull/10410)）。
- **可观察的长跑工作。** Web Shell 中的 Shell/Monitor tail、9 月 10 日周报里的工作流可视化、Goal checkpoint 重试而不是卡住。运维想*看着*子 agent，而不只是把它们拉起来。

## 7. 开发者痛点

- **扇出下的 TUI 稳健性。** 多 agent 完成可用未捕获的 React max-update-depth 错误打掉交互进程，且没有任何渲染诊断（#11500）。同一家族：OpenTUI 确认框溢出（#11659）、短视口顶部对齐留下空白（#9305）、中途发送被当成硬失败拒绝（#11289）。
- **提供商协议不变量。** Responses 清理把 reasoning 与其 tool call 拆开（#11665 / #11684）。DashScope 缓存断点落在重新附加的图片之后（#11627）。无状态码的 SSE 错误对象直接结束回合而不是重试（#11291）。这些不是外观问题 — 它们浪费缓存并丢掉工具回合。
- **Windows 运行时债务。** 捆绑 ConPTY 以停止孤儿 `conhost.exe`（已随 0.23.3 发布）、`node-pty` conout worker 泄漏、Windows 上的 monitor 调试目录（#11679 / #11685）。Desktop 和 CUA 二进制现在已在发货，这条路径不再是可选项。
- **启动 / 环境脆性。** 全局配置目录不可写会让 CLI 启动崩溃（#10455）。ACP 设置对着 `cwd` 解析而不是目标工作区（#11647）。一次性系统提醒泄漏进用户自己的转录和 ↑ 召回历史（#11562）。
- **CI 与 autofix 噪音。** macOS E2E shard 死亡需要受预算门控的重试（#11134）；PTY 测试清理竞态（#11001）；“热点” PR 列表里很大一部分是 bot 持有的 `autofix/needs-human` 或 `autofix/takeover`。没能塞进原 PR 范围的审查发现被开成新 issue（#11617、#11685），而不是就地关闭 — 瓶颈是人工审查队列，不是点子供给。
- **Prompt-cache 卫生。** 延期工具、历史图片重新附加、以及晚揭示的 schema，都会在前缀缓存上打洞。#10410 与已关闭的 #11627 是同一成本问题的两面。

---

</details>