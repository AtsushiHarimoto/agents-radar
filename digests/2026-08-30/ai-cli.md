# AI CLI 工具社区动态周报 2026-08-30

> 生成时间: 2026-08-30 07:55 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比 — 2026-08-30

## 1. 生态总览

2026 年 8 月末的 AI CLI，已经不再比拼「能不能改文件」。真正的赛场是 **可治理的多 Agent 运行时**：把 MCP/hooks 当成平台、受限/评测安全模式、远程控制面，以及诚实的成本/配额遥测。产品团队在交付限制开关、模型切换 hooks、MCP 结果拦截器和默认失败关闭的信任模型；社区仍然卡在 **Windows/桌面完整度**、**子 Agent 诚实度**、**长会话稳定性**，以及 **和本地证据对得上的计量器**。重心已从提示词质量，转向 **进程隔离、策略与会话生命周期**。第一方办公文档、密钥保险库，以及产品面集成（Projects、ChatGPT remote、Web Shell）仍是「会写代码的 Agent」与「能在公司里无人值守跑起来的 Agent」之间的鸿沟。

## 2. 活跃度对比

下表计数遵循 digest 窗口（多为 2026-08-30 近 24 小时 GitHub 活跃）。某渠道未收录或未量化时标为 **N/A / not in snapshot**，不等于「不活跃」。

| Tool | Issues (window) | PRs (window) | Discussions (window) | Latest release |
|---|---|---|---|---|
| **Claude Code** | High volume (10+ hot issues; #2511 still 399 👍) | ~10 notable open/closed | N/A (payload omitted) | **v2.1.251** (28 Aug) |
| **OpenAI Codex** | **48** updated / 24h | **50** updated / 24h | **42** updated / 24h | **rust-v0.151.0** (29 Aug); 0.152.0-alpha.1 in flight |
| **Gemini CLI** | Active P1 cluster (roadmap #4191 = 99 👍) | Dense nightly merges (trust/SSRF/sandbox) | Active (roadmap, capacity, ideas) | Stable **v0.57.0** (25 Aug); nightly **v0.59.0** (30 Aug) |
| **GitHub Copilot CLI** | Stability cluster (FileWatch, OOM, TUI freeze) | **6** updated / 24h (thin public PR stream) | N/A (not in snapshot) | **v1.0.82** (29 Aug); 1.0.81 = last feature train |
| **OpenCode** | Billing + CPU + MCP leak cluster | Dense core/TUI/MCP fixes | N/A (payload omitted) | **v1.18.25** (patch train 1.18.22–25) |
| **Pi** | TUI/layout + long-session CPU | Full-parity web GUI + providers closed | Active (harness benchmarks, plugins) | **v0.84.4** (28 Aug) |
| **Qwen Code** | **5** updated / 24h (ops/CI-heavy) | High merge velocity (daemon/auth/review) | N/A (payload omitted) | **v0.22.3**; 2026-08-30 nightly **failed CI** |

**读表要点：** Codex 是唯一给出完整三渠道 24 小时普查的仓库，也是公开追踪器里最吵的一个。Claude 和 Gemini 更像成熟产品的噪音（长寿北极星 issue + 发版列车）。Copilot 的公开 PR 面很安静，产品由发版列车承载。Qwen 本窗口的追踪器更像运维/CI 形态，而不是终端用户形态。

## 3. 共同功能方向

以下需求至少出现在 **两个或以上** 社区，并有具体例子：

- **把 MCP / hooks 做成真正的 API，而不是挂件**  
  Codex 0.151.0：discovery grace、inspect/replace MCP results、plugin catalogs。Claude：`PreModelSwitch` / `PostModelSwitch`，hook load-from-wrong-root。Copilot：MCP 2026-07-28 + OTel-aware hooks；Atlassian/ADO OAuth breakage。Gemini：restricted mode 下的 MCP filter + OAuth discovery 的 SSRF 修复。OpenCode/Pi：斜杠命令的插件拦截、prompt transforms、UI prompt events。

- **受限 / 评测安全 / 失败关闭运行时**  
  Claude `--restricted` (v2.1.248)。Gemini fail-closed workspace trust + MCP filter（nightly）。Codex remote sandbox 使用真实 home/OS/paths。Qwen：trusted-loopback operator API + hook trust-boundary 漏洞。

- **子 Agent 可观测性与诚实度**  
  Claude：sibling scratchpad 共享；depth-2 notifications 被丢掉。Gemini：MAX_TURNS 被报成 GOAL；generalist hangs；unused skills。Codex：嵌套子 Agent token 现在计入根预算；stale subagents 会复活。Copilot：并行子 Agent 拉起时 TUI 挂掉。OpenCode：live subagent sidebar 诉求；mimo-v2.5 infinite thinking。Pi：fork/retry 必须把当前 turn 结算掉。

- **与本地证据对得上的配额、缓存与计费**  
  Claude：`/cost` cache line；`/compact` 被当成 cold write 重新计费。Codex：周限额「体感像以前的 5 小时上限」；meta tracker #41220；Chronicle 空转也烧配额。OpenCode：付费 Zen 仍撞免费上限；catalog 200 + inference 401。Plus 用户要的是 **策略选择**（burst vs sustain），而不只是一块仪表盘。

- **远程控制 + 桌面完整度**  
  Codex：ChatGPT-app remote（#9200，190 👍）+ 缺失 Windows「Control other devices」。Claude：Remote Control 会直播前台子 Agent 的工具调用。Copilot/Pi/OpenCode：Windows resume、更新后的 headless、PowerShell/console、always-on-top。

- **长会话 / resume 可靠性**  
  Copilot：FileWatch 13 GB log，resume 时 heap OOM。Pi：出第一条 prompt 前先完整解析 JSONL；macOS 50–110% CPU。OpenCode：`serve` 重连时 MCP 子进程泄漏。Claude：后台 Bash 假报 exit 0。Gemini：shell 卡在 “Waiting input.”。

- **密钥、鉴权与企业 IdP**  
  Claude #29910 first-party vault。Copilot：远程 MCP 的 Entra/WAM；`-p` 模式下 GHEC 401。OpenCode：不用 Bun 的 Azure CLI / Entra。Qwen：loopback vs bearer 精神分裂。Codex：Advanced Account Security 登录死循环。

## 4. 差异化分析

| Tool | Feature focus this window | Implied target user | Technical approach |
|---|---|---|---|
| **Claude Code** | 可治理的模型切换、`--restricted`、成本/缓存面、Remote Control 流式输出 | 企业 + 评测 harness + 已经住在 Claude.ai 里的重度 CLI 用户 | 把 hook 事件当控制面；做减法卸工具而不是堆工具；计费惊吓之后补齐遥测诚实度 |
| **Codex** | MCP 平台、sandbox 路径真实性、嵌套预算记账 | 想把桌面 + 手机 + CLI 当成同一产品的 ChatGPT 套餐用户 | Rust core + app-server；产品热度在 **计量 + Windows 客户端**，不在 CLI 内核 |
| **Gemini CLI** | 公开 v1 roadmap、Seatbelt/Docker 隔离、write-policy checkers、AST/bash-native 之争 | Google 生态 + 安全敏感的本地用户 | Nightly 加固信任；用开放 roadmap 当社区契约 |
| **Copilot CLI** | 面向所有人的 plugins dashboard、MCP 2026-07-28、OTel hooks、Entra/WAM | GitHub/Enterprise + 贴近 IDE 的 CLI | 发版列车优先于公开 PR；痛点是 **运行时隔离**（FileWatch、event store、resume heap） |
| **OpenCode** | 多供应商正确性（Azure、Bedrock、CF Gateway）、TUI 插件能力、Zen 计费 | 供应商无关的重度用户与自托管者 | 在供应商契约上快修快发；社区希望把 TUI 做成扩展宿主 |
| **Pi** | 扩展 UI 事件、与 TUI 对等的 web GUI、树内供应商（Tencent、DeepSeek V4 Flash Vision） | Harness 构建者与扩展作者 | TUI 与 web 共享会话运行时；立场是「自己做权限 UI」 |
| **Qwen Code** | Channels 里的具名会话、daemon/Web Shell、review-pipeline 自动化 | 跑本地 daemon + web 运维控制台的团队 | 把 `qwen serve` 产品化：热重载模型、trusted loopback、shell 里的 git/worktree |

**一句话：** Anthropic 和 Google 在收紧 **策略**。OpenAI 在收紧 **平台 MCP**，用户则在和 **计量器与 Windows 应用** 较劲。GitHub 在收紧 **企业 MCP 登录**，会话却在融化。OpenCode/Pi/Qwen 在收紧 **供应商 + daemon + 扩展** 面，面向不打算绑死某一家实验室的人。

## 5. 社区动能与成熟度

- **公开追踪器热度最高：** Codex（24 小时 48/50/42）和 Claude（已存活 14 个月的 #2511 仍是北极星；密集的 2.1.245–251 列车）。看起来像是 **产品面集成尚未完成的成熟产品**。
- **原始迭代最快：** Claude 补丁列车（几天内六个版本）、OpenCode 窗口内四个补丁、Qwen 0.22.2→0.22.3 外加 nightlies（其中一个 nightly **failed**）、Gemini stable/preview/nightly 三轨并行。
- **最「运维，不是 vibe」的追踪器：** Qwen — 五个 issue，全是 daemon/CI/review。动能在维护者流水线，不在终端用户争论。
- **最原生扩展向的能量：** Pi（web GUI 对等 PR 已合、plugin catalog 讨论、pi-verdict）和 OpenCode（prompt coordinator、slash intercept、live subagents）。
- **边缘最脆弱：** Copilot 长会话与 Windows；Codex Windows remote + 配额信任；Claude 后台 Bash 以及 `[cyber]`/Fable 5 误报；Gemini 子 Agent 挂起。

按「能不能在共享机器上整天挂着跑」排的成熟度，仍然 **不等于** star 数或发版节奏。受限模式和失败关闭信任已经在出货；后台子进程 API 和 Windows 客户端还不够可信。

## 6. 趋势信号

1. **Agent 正在变成操作系统，所以隔离才是产品。** Sibling scratchpads、共享 MCP 进程、FileWatch 风暴、重连泄漏，是 2026 年的失败模式。评估 CLI 的团队应测 **多 Agent + resume + 隔夜空转**，而不是 hello-world 改文件。

2. **Hooks 胜过再堆斜杠命令。** 模型切换门禁、MCP 结果改写、OTel 上下文、UI prompt 起止、失败关闭的 MCP filter，是共同架构。如果要做内部 Agent，现在就该投 hook 契约；只靠 flag 的 CLI 已经落后。

3. **计量器需要策略 UI，而不是再多一个百分比。** Claude 的 `/cost` cache line、Codex 的周限额 vs 5 小时之争、Chronicle 后台空转、OpenCode 的 Zen/免费错配，说的是同一件事：在官方记账既可检查 **又可选择**（burst vs sustain）之前，用户会去用第三方追踪器。

4. **Windows + 远程是企业入场券。** 缺失「Control other devices」、Store headless 启动、Git Bash 反斜杠被减半、PowerShell 把 stderr 当失败、Entra/WAM、GHEC tenant endpoints —— 把 Windows 当二等公民的实验室，会丢掉付钱的那个席位。

5. **安全过滤器 vs 防御性安全工作，是市场风险。** Claude 对 CVP 已批准组织触发 `[cyber]`/Fable 5，Gemini 收紧信任而用户想读父目录，Codex Browser Use 在成功认领标签页后死亡。无人值守 Agent 需要一条 **白名单化的安全工作路径**，否则安全团队会直接禁掉工具。

6. **给构建者的参照价值**
   - 评测 / 共享 CI 机器 → Claude `--restricted` + Gemini fail-closed nightly。
   - MCP 平台 + 贴近 ChatGPT 的工作流 → Codex 0.151.0，盯紧配额仪表盘。
   - GitHub Enterprise + IdP → Copilot 1.0.81/82，但在 FileWatch/OOM 修好前要限制会话长度。
   - 多供应商 / 自托管 → OpenCode 或 Pi。
   - Daemon + web 运维控制台 + 具名长任务 → Qwen Channels / `qwen serve`。
   - 不要假设办公二进制、密钥保险库或 Projects/RAG 后端已经存在；这些仍是整个品类里信号最强的未满足需求。

**2026-08-30 小结：** CLI 层正在围绕 **hooks、限制、MCP 和成本面** 职业化。社区温度由 **对计量器的信任、对后台进程的信任、对 Windows/远程的信任** 决定 —— 而不是由 `/model` 里下一个模型名字决定。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

先核对仓库与高关注 PR/Issue 的当前状态，再按你的规则只输出简体中文译文。# Claude Code Skills 社区亮点
**来源：** [anthropics/skills](https://github.com/anthropics/skills) · 快照日期 **2026-08-30**  
**仓库规模：** 约 172.5k stars，约 20.5k forks。官方合集；社区 PR 是提交通道，Issues 用于提案与缺陷报告。

本次快照中多数 PR 的评论数未给出，因此下方排序综合了 **Issue 评论量**、**交叉关联的缺陷线程**、**审查活跃度** 与 **时效性**。除非另行注明，所列 PR 均为 **OPEN**。

---

## 1. 热门 Skills 排行

### 1. `skill-creator` eval harness（技术热度最高）
**PRs：** [#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050)  
**Issue：** [#556](https://github.com/anthropics/skills/issues/556) — 12 comments, 7 👍 · **OPEN**

`skill-creator` 是用于编写其他 skill 的元 skill。`run_eval.py`（以及 `run_loop.py` / `improve_description.py`）对每一条 description 都报出 **0% recall**，导致 description 优化循环实际在拟合噪声。

讨论要点：四个相互独立的根因——eval 产物被安装成 *command*（从未进入面向模型的 skills 列表）、Windows 上 `select.select()` / `claude.cmd` 失败、触发检测器把 `TodoWrite`/`Glob`/`Bash` 判成 miss，以及并行 worker 在 UUID 副本上产生竞态。[#1298](https://github.com/anthropics/skills/pull/1298) 是最完整的修复（真正的 skill 产物、可移植的流读取器、共享产物、`--max-turns`）。状态：**open**，若干重叠的部分 Windows 修复仍处于开放状态。

### 2. 命名空间 / 信任边界安全
**Issue：** [#492](https://github.com/anthropics/skills/issues/492) — **43 comments, 2 👍** · **OPEN**  
本次快照中评论数最高的条目。

社区 skill 被落到 `~/.claude/skills/anthropic/` 下，并带有 `Bash` 与 settings-write 权限。用户会把 `anthropic/` 当成官方来源。指出的攻击路径：hook-builder 写入 `PostToolUse` hooks → 每次 tool use 之后执行任意命令。诉求是 **命名空间隔离、官方 skill 签名，以及 marketplace 溯源**，而不是再做一个新的领域 skill。

### 3. 组织级 skill 共享
**Issue：** [#228](https://github.com/anthropics/skills/issues/228) — 16 comments, **8 👍** · **OPEN**

点赞最高的产品需求：在组织内共享 skill，不必走 Slack + 手动 Settings 上传。说明 Skills 已经超出单用户安装体验的承载力。

### 4. 文档栈质量（`docx` / `pdf` / typography / ODT）
**PRs：** typography [#514](https://github.com/anthropics/skills/pull/514), PDF case-sensitivity [#538](https://github.com/anthropics/skills/pull/538), DOCX `w:id` collision [#541](https://github.com/anthropics/skills/pull/541), ODT [#486](https://github.com/anthropics/skills/pull/486)  
**Issue：** whitespace corruption [#12](https://github.com/anthropics/skills/issues/12) — 仍开放，已约 10 months。

功能：生产级文档生成。热度在 **正确性**，不在新功能——孤行/孤段、Linux 上大小写敏感的引用、与书签冲突的 OOXML ID、会把 Word 弄坏的空白。本簇里唯一净新增格式是 ODT。

### 5. 质量门禁与元 skills
**PRs：** self-audit [#1367](https://github.com/anthropics/skills/pull/1367), quality/security analyzers [#83](https://github.com/anthropics/skills/pull/83)  
**Issues：** reasoning-gate pipeline [#1385](https://github.com/anthropics/skills/issues/1385); skill-creator best-practice rewrite [#202](https://github.com/anthropics/skills/issues/202) (closed)

方向：能够 **审计其他 Skills 与模型输出** 的 Skills——先做机械式文件存在性检查，再按严重级别做推理审查。社区希望 Skills 成为 QA 层，而不只是任务配方。

### 6. 多智能体编排 — Hivemind
**PR：** [#1628](https://github.com/anthropics/skills/pull/1628) · **OPEN**（Aug 21–24 仍在活跃审查）

把脏活交给无头 [opencode](https://opencode.ai) worker（scout / coder / tester），Claude Code 继续担任 planner、reviewer 与 merger。Worker 只回一行 JSON，原始流不会进入昂贵上下文。审查者认为协议扎实；阻塞性小问题（license frontmatter、`LICENSE.txt`、路径需落在 `skills/` 下）已处理。第三方免费模型依赖已披露，这是剩下的产品问题。

### 7. 平台 / 企业 skills
**PRs：** ServiceNow [#568](https://github.com/anthropics/skills/pull/568)（自 March 起开放，最近更新 Aug 12）, SCNet HPC [#1615](https://github.com/anthropics/skills/pull/1615), testing-patterns [#723](https://github.com/anthropics/skills/pull/723), Pyxel retro games [#525](https://github.com/anthropics/skills/pull/525), frontend-design rewrite [#210](https://github.com/anthropics/skills/pull/210)

ServiceNow 是覆盖面最广的「平台助手」提交（从 ITSM 到 IntegrationHub）。HPC 与 testing-patterns 呈现同一模式：**垂直 runbook**，而不是泛化 prompt。

### 8. 官方 skills 周边工具可靠性
**PRs：** mcp-builder eval serialization [#1602](https://github.com/anthropics/skills/pull/1602); claude-api retired model IDs [#1607](https://github.com/anthropics/skills/pull/1607)  
**Issues：** mcp-builder 0/N scores [#1390](https://github.com/anthropics/skills/issues/1390); `claude-api` injecting ~156k tokens [#1487](https://github.com/anthropics/skills/issues/1487); plugin duplicate skills [#189](https://github.com/anthropics/skills/issues/189) (9 👍)

与 `skill-creator` 同一主题：官方辅助 skill **根本跑不通或撑爆上下文窗口** 时，关注度高于新的创意 skill。

---

## 2. 社区需求趋势（来自 Issues）

| 需求 | 证据 | 人们想要什么 |
|---|---|---|
| **溯源与安全** | [#492](https://github.com/anthropics/skills/issues/492) (43 comments), [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint ACL-in-SKILL.md | 命名空间保障、禁止伪造 `anthropic/` 路径、警惕把授权逻辑只写在 markdown 里 |
| **分发 / 组织库** | [#228](https://github.com/anthropics/skills/issues/228) (8 👍), [#189](https://github.com/anthropics/skills/issues/189) duplicates | 一等公民级分享链接；停止在两个 plugin 里重复打包同一套 skill |
| **真正能测 trigger rate 的 eval** | [#556](https://github.com/anthropics/skills/issues/556) + three PRs | 一个真正能用的 description 优化循环 |
| **输出质量门禁** | [#1385](https://github.com/anthropics/skills/issues/1385), [#1367](https://github.com/anthropics/skills/pull/1367), compact-memory [#1329](https://github.com/anthropics/skills/issues/1329) | 任务前校准 → 对抗式审查 → 交付核验；更便宜的 agent 状态 |
| **上下文窗口卫生** | [#1487](https://github.com/anthropics/skills/issues/1487) 156k-token inject | 惰性 / 渐进式 skill 加载 |
| **把 MCP 当作 skill 的 API 表面** | [#16](https://github.com/anthropics/skills/issues/16), mcp-builder [#1390](https://github.com/anthropics/skills/issues/1390) | 把 Skills 暴露为带类型的 MCP tools；能对接真实服务器的 eval |
| **企业连接器** | ServiceNow [#568](https://github.com/anthropics/skills/pull/568), HPC [#1615](https://github.com/anthropics/skills/pull/1615), Bedrock [#29](https://github.com/anthropics/skills/issues/29) | 面向现有平台的 runbook，而不是从零开始的玩具 |
| **文档保真度** | [#12](https://github.com/anthropics/skills/issues/12), [#514](https://github.com/anthropics/skills/pull/514), [#541](https://github.com/anthropics/skills/pull/541) | 生成出来 Word 打得开的 Office 文件 |

本次快照中不突出的：作为独立 skill 的泛化「多写测试」或「多写文档」。testing-patterns [#723](https://github.com/anthropics/skills/pull/723) 存在，但更响亮的诉求是 **核验 agent 自己的工作**。

---

## 3. 高潜力待合并 Skills

更可能落地或保持活跃审查：

1. **[#1298 skill-creator eval](https://github.com/anthropics/skills/pull/1298)** — 打通所有 description 调优工作流；修复一个复现超过 10 次的缺陷。队列里杠杆最高的合并。
2. **[#1628 Hivemind](https://github.com/anthropics/skills/pull/1628)** — 审查已过阻塞项；只剩第三方 opencode worker 的产品/政策问题。
3. **[#1602 / #1390 mcp-builder](https://github.com/anthropics/skills/pull/1602)** — eval harness 对着真实 MCP 服务器目前打出 0/N（`TextContent` 无法 JSON 序列化）。与 #556 同类的「harness 在说谎」问题。
4. **[#1607 claude-api retired IDs](https://github.com/anthropics/skills/pull/1607)** — 改动小、正确、最近更新（Aug 26）；容易合并。
5. **[#1367 self-audit](https://github.com/anthropics/skills/pull/1367)** + **[#1385](https://github.com/anthropics/skills/issues/1385)** — 质量门禁家族；与 Hivemind 互补（plan/review vs. 事后审计）。
6. **[#568 ServiceNow](https://github.com/anthropics/skills/pull/568)** — 存活很久，8 月仍在更新；如果维护者想要企业旗舰，这就是候选。
7. **[#1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615)** 与 **[#1595 UIZZE partner listing](https://github.com/anthropics/skills/pull/1595)** — 范围窄、较新（Aug 17–29），若符合 Partner Skills 格式则合并风险低。
8. **文档正确性三件套** [#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) / [#514](https://github.com/anthropics/skills/pull/514) — 捆绑文档 skills 里的生产缺陷；应独立于「要不要收新 skill」的争论尽快合入。

短期内不太可能：[#486 ODT](https://github.com/anthropics/skills/pull/486) 与 [#525 Pyxel](https://github.com/anthropics/skills/pull/525)（小众），[#83 marketplace analyzers](https://github.com/anthropics/skills/pull/83)（自 Jan 起停滞）。

---

## 4. Skills 生态洞察

**社区集中的需求不是「更多任务配方」——而是一套可信的 Skill 运行时：正确的 trigger/eval 循环、无法冒充 `anthropic/` 的溯源、惰性上下文加载，以及能够编排或审计其他 agent 的 skills，而不只是教一次性流程。**

---

# Claude Code 社区周报 — 2026-08-30

Repo: [anthropics/claude-code](https://github.com/anthropics/claude-code) · latest tag **v2.1.251** (28 Aug 2026)

## 1. 本周要点

Anthropic 在 8 月下旬密集发布了 **v2.1.245–v2.1.251**：面向企业安全的 **`--restricted`**、一等公民级 **model-switch hooks**、前台 subagent 在 **Remote Control** 上更丰富的可见性，以及费用/缓存面板（`/usage`、`/cost`）。社区热度仍集中在一个已开放 14 个月的请求：把 Claude Code 接到 **claude.ai Projects** 知识库（#2511，399 👍）；同时新报告不断堆积在 **[cyber]/Fable 5 误报**、**后台 Bash 可靠性**，以及 **Windows/macOS 桌面窗口行为** 上。

## 2. 版本发布

**[v2.1.251](https://github.com/anthropics/claude-code/releases/tag/v2.1.251)** (28 Aug) — 最新  
- 新增 hook 事件 **`PreModelSwitch` / `PostModelSwitch`**：可拦截、确认或标注模型切换。`SessionStart` 的 resume hooks 现在会收到 **session staleness** 以及 **estimated re-cache cost**。  
- 将前台 subagent 的工具调用与结果 **实时流式** 推送到 Remote Control 客户端（后台 subagent 仍仅显示状态）。  
- `/usage` 增加消费上限进度条，并为 Claude apps gateway 提供 `rate_limits.spend_limit`。  
- `/cost` 增加按 session 的 **prompt-cache** 行（命中率、miss、重新缓存的 token、warm/cold）。  
- `claude --help` 新增 `attach`、`logs`、`stop`、`respawn`、`rm`。  
- 安全修复：文件工具的事后校验 **symlink swap**、插件路径穿越、项目设置泄漏 beta tracing / 原始 API body、Workflow `scriptPath` 在授权前读取。

**[v2.1.250](https://github.com/anthropics/claude-code/releases/tag/v2.1.250)** — 仅缺陷修复与可靠性改进。

**[v2.1.248](https://github.com/anthropics/claude-code/releases/tag/v2.1.248)** — **`--restricted`** / `CLAUDE_CODE_RESTRICTED=1`：剥离命令/代码工具以及 `WebFetch`（除非在 `--tools` 中显式列出），将文件工具限制在工作目录内，拒绝 `bypassPermissions`，忽略 user/project/local settings。面向评测 harness 与共享机器。

**[v2.1.247](https://github.com/anthropics/claude-code/releases/tag/v2.1.247)** — **`SendFeedback`** 工具：Claude 可为 `/feedback` 起草报告（可用 `feedbackDrafts` 关闭）；更丰富的 `spinnerTipsOverride` schema。

**[v2.1.246](https://github.com/anthropics/claude-code/releases/tag/v2.1.246)** — 对子命令前带通配符的 Bash allow 规则给出启动警告（例如 `Bash(git * main)`）；`/permissions` 增加 Auto mode 标签页。

**[v2.1.245](https://github.com/anthropics/claude-code/releases/tag/v2.1.245)** — 修复 **glibc 2.44**（Arch、CachyOS、Fedora Rawhide）上的启动崩溃。

## 3. 热门 Issues

1. **[#2511 — Connect Claude Code to Claude.ai Projects](https://github.com/anthropics/claude-code/issues/2511)** · OPEN · 49 comments · 399 👍  
   追踪器里持续时间最长的产品请求：在 CLI/Desktop agent 中复用 Project 知识库（规格、文档、RAG）。仍是社区的北极星级集成；讨论持续到 2026-08-30。

2. **[#65632 — Inline KaTeX `$...$` no longer renders](https://github.com/anthropics/claude-code/issues/65632)** · OPEN · 28 comments · 75 👍  
   回归：只有块级 `$$...$$` 能渲染。对数学密集和研究类工作流很痛；作为渲染缺陷，评论量偏高。

3. **[#9631 — Microsoft Word `.docx` editing with track changes](https://github.com/anthropics/claude-code/issues/9631)** · OPEN · 26 comments · 31 👍  
   法律/财务用户无法读取、编辑或保留 Word 修订。反复出现的「办公文档一等公民」主题。

4. **[#29910 — Built-in secrets management](https://github.com/anthropics/claude-code/issues/29910)** · OPEN · 15 comments · 35 👍  
   没有官方 vault；希望可选接入 1Password/Vault/云端密钥。安全导向团队把这视为无人值守 agent 的阻塞项。

5. **[#15597 — Pass image file paths as strings, don’t embed](https://github.com/anthropics/claude-code/issues/15597)** · OPEN · 16 comments · 19 👍  
   粘贴路径会自动嵌入图片。希望 Claude *对路径本身操作*（流水线、关闭视觉、大资源）的用户需要绕过方案。

6. **[#88093 — Windows Desktop always-on-top](https://github.com/anthropics/claude-code/issues/88093)** · OPEN · 11 comments · 19 👍  
   已关闭的 macOS [#66516](https://github.com/anthropics/claude-code/issues/66516) 的兄弟问题。窗口管理冲突现已成为跨平台 Desktop 投诉。

7. **[#84689 — CVP-approved org still blocked by cyber safeguards](https://github.com/anthropics/claude-code/issues/84689)** · OPEN · 17 comments  
   Org ID 匹配，申诉表却是空的。与同日的 [#90680](https://github.com/anthropics/claude-code/issues/90680)、[#90693](https://github.com/anthropics/claude-code/issues/90693) 同属一类：针对*防御性*安全工作的 Fable 5 / `[cyber]` 误报。

8. **[#88755 — `/compact` re-bills the whole conversation as a cache write](https://github.com/anthropics/claude-code/issues/88755)** · OPEN · 6 comments  
   内部 fork 请求漏掉 Advisor → compact 被按冷缓存计费。直接打到钱包；与 2.1.251 中 `/cost` 新增的缓存行形成对照。

9. **[#90659 — Background Bash reports exit 0 on failure](https://github.com/anthropics/claude-code/issues/90659)** · OPEN · created 29 Aug  
   `run_in_background: true` 可能谎报成功。对 CI 风格和多 agent 编排很危险。相关：空闲杀死 [#88071](https://github.com/anthropics/claude-code/issues/88071)、Linux 内存回收器 [#78674](https://github.com/anthropics/claude-code/issues/78674)。

10. **[#90450 — Auto Mode Bash-first silently disables nested `CLAUDE.md`](https://github.com/anthropics/claude-code/issues/90450)** · OPEN  
    Auto mode 的 Bash-first 指令会丢掉嵌套 / 按路径作用域的规则。Agent 在没有可见报错的情况下忽略项目约定——属于静默策略类缺陷。

**同时关注：** [#64615](https://github.com/anthropics/claude-code/issues/64615) `/rewind` 默认具有破坏性（已关闭，仍被搜索）；[#85856](https://github.com/anthropics/claude-code/issues/85856) Windows 上 Git Bash 把反斜杠减半；[#87243](https://github.com/anthropics/claude-code/issues/87243) 兄弟 subagent 共用一块 scratchpad；[#90683](https://github.com/anthropics/claude-code/issues/90683) 项目根目录 ≠ 仓库根目录时 hooks 缺失（当日关闭）。

## 4. 重点 PR 进展

1. **[#61720](https://github.com/anthropics/claude-code/pull/61720)** · OPEN · docs  
   排查 Cowork 队列已投递消息却未拉起后续 turn 的问题（与限流处理器的竞态）。关闭 #61718。

2. **[#87079](https://github.com/anthropics/claude-code/pull/87079)** · OPEN · security  
   `security-patterns.json` 中的 `**` glob 无法匹配零深度 / 顶层文件，因为 `fnmatch` 已把 `*` 视为可跨越 `/`。安全规则出现静默漏覆盖。

3. **[#89404](https://github.com/anthropics/claude-code/pull/89404)** · OPEN · plugin-dev  
   `validate-agent.sh` 在第一条 warning 就退出（`set -e` + `((x++))`），并把合法 agent 误判为失败。修复 #83803。

4. **[#13437](https://github.com/anthropics/claude-code/pull/13437)** · OPEN · hookify  
   绝对导入 `from hookify.core...` 会失败，因为 `PLUGIN_ROOT` 已经*是*包根。改为相对导入。

5. **[#83374](https://github.com/anthropics/claude-code/pull/83374)** · OPEN · docs  
   在捆绑的 plugin-dev / Hook Development skill 中补充 **`MessageDisplay`** 流式语义文档（触发表和事件指引里原先缺失）。

6. **[#75252](https://github.com/anthropics/claude-code/pull/75252)** · CLOSED · docs  
   澄清插件的 `mcpServers` 用于*捆绑*的 MCP 定义，并不是 `~/.claude.json` 里用户级的 allow/deny 列表。

7. **[#79898](https://github.com/anthropics/claude-code/pull/79898)** · CLOSED  
   在 `examples/gateway/aws/` 下补充 **Claude apps gateway on AWS + Bedrock** 参考资源，与现有 GCP 示例并列。

8. **[#69226](https://github.com/anthropics/claude-code/pull/69226)** · CLOSED  
   更新 frontend-design skill，并将插件版本升到 1.1.0，使已安装副本能拿到变更。

9. **[#83890](https://github.com/anthropics/claude-code/pull/83890)** · OPEN  
   增加 `pylint.yml` CI — 小卫生 PR，仍开放。

10. **[#58673](https://github.com/anthropics/claude-code/pull/58673)** · OPEN  
    标题/正文只是占位（`s`）。落在 24 小时更新窗口里的噪音；无可执行信息。

## 5. 热门讨论

从略 — 未提供 GitHub Discussions 数据。

## 6. 功能请求趋势

| Direction | Signal | Examples |
|---|---|---|
| **把 Claude.ai Projects 当作知识后端** | 主导（399 👍，开放 14 个月） | #2511 |
| **一等公民级办公 / 二进制文档** | 反复出现的企业诉求 | #9631 `.docx` + track changes |
| **把密钥当作平台原语** | 安全 + 无人值守 agent | #29910 |
| **多模态输入走路径而非 blob** | 视觉 vs 工具链分工 | #15597 |
| **远程 / 多主机 session 溯源** | Remote Control 运维 | #73343 hostname in session UI |
| **Desktop session 感知** | 侧栏 + 上下文 chrome | #83699, #85437 |
| **受治理的模型切换** | 现已以 hooks 形式落地 | v2.1.251 `PreModelSwitch` / `PostModelSwitch` |
| **评测安全 / 锁定运行时** | 现已落地 | v2.1.248 `--restricted` |

净结论：产品在补齐 **hooks、限制模式和费用遥测**；社区更想要的仍是 **产品面集成**（Projects、Word、secrets），而不是再多一个 CLI flag。

## 7. 开发者痛点

- **安全过滤器 vs 正当安全工作。** 已通过 CVP 的组织和仓内回归测试仍会触发 `[cyber]` / Fable 5；恢复 UI 可能**静默降级模型**（#84689、#90680、#90693）。  
- **后台 Bash 还不是可靠的子进程 API。** 失败却报 exit 0、没有 `TaskStop` 的空闲杀死，以及按 `MemFree` 而不是 `MemAvailable` 决策的 Linux 回收器（#90659、#88071、#78674）。  
- **Windows 编码 + 权限。** Git Bash 静默把反斜杠减半（#85856）；计划任务无视 “unattended” 表述，每个工具都要询问（#89632）；Auto Mode 丢掉嵌套 `CLAUDE.md`（#90450）。  
- **费用记账意外。** `/compact` 可能把整条线程重写成 cache miss（#88755）。2.1.251 在 `/cost` 上的缓存行是第一次诚实的计数器。  
- **Agent 隔离弱于提示词宣称。** 兄弟 subagent 共用一块 scratchpad（#87243）；depth-2 完成通知路由到根节点，并在 2.1.250 上被丢掉（#90256）。  
- **Hooks 和设置从 “project root” 加载，而不是 `cwd`。** 在仓库上一层目录启动，所有 hook 会静默消失（#90683）。  
- **Desktop 打磨欠债。** 始终置顶（Win + 历史上的 macOS）、冻结后消失且无 dump（#89679）、上下文指示器绑错聊天（#85437）、Linux Cowork 在 `O_DIRECT` + ext4 `EINVAL` 上挂起（#90359）。  
- **macOS keychain 循环。** “Claude Code-credentials” 重写造成分区不匹配；“Always Allow” 永远粘不住（#87348）。  
- **破坏性默认。** `/rewind`（Esc Esc）在无确认的情况下同时恢复代码*和*对话，即便 #64615 已关闭，仍是被反复搜索的踩坑点。

**升级提示：** 若跑滚动更新的 Linux（glibc 2.44），请停留在 **≥ 2.1.245**。若从评测 harness 或共享机器驱动 Claude，请用 **`--restricted`** 启动 session。若要自动化模型路由，先接上 **`PreModelSwitch`**，再依赖 `/model` 或自动回退。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

我会先拉取 Codex 仓库的最新动态，好让这篇摘要对得上今天实际在发的内容。
# OpenAI Codex Community Digest — 2026-08-30

来源：[github.com/openai/codex](https://github.com/openai/codex) · 过去 24 小时内有 48 个 issue、50 个 PR 和 42 条 discussion 更新。

## 1. This Week's Highlights

稳定版 **Codex CLI 0.151.0** 于 Aug 29 落地，本轮平台工作集中在 MCP：可为可选服务器配置发现宽限期；扩展钩子能在 MCP 工具结果到达模型前检查或替换；插件目录会合并各仓库配置，某个 marketplace 无效时也不会丢掉仍有效的插件。

产品侧，社区对 **配额核算** 和 **Windows 桌面端可靠性** 的讨论比对新功能更响。大家在拿每周额度跟以前的 5 小时上限对比；现在有一个元跟踪帖，把「配额掉得比本地证据更快」的报告归到一起。Windows 用户仍然撞上：找不到 Remote Connections 界面、线程历史冻结、更新后无界面启动，以及 SSH/配对失败。

## 2. Releases

**[rust-v0.151.0](https://github.com/openai/codex/releases/tag/rust-v0.151.0)** — 当前稳定版（Aug 29）

新功能
- 可为可选 MCP 服务器配置工具发现宽限期（[#41199](https://github.com/openai/codex/pull/41199)）
- 扩展可在 MCP 工具结果到达模型前检查或替换（[#41202](https://github.com/openai/codex/pull/41202)）
- 插件目录会合并各仓库配置，并在项目 marketplace 无效时上报，同时不隐藏仍有效的插件（[#41208](https://github.com/openai/codex/pull/41208)）

缺陷修复
- 恢复的权限配置会在 TUI 回合中保留；`/cd` 不再削弱沙箱限制（[#41192](https://github.com/openai/codex/pull/41192)）
- 切换/回退模型时，工具可用性与 reasoning effort 保持正确（[#41195](https://github.com/openai/codex/pull/41195)、[#41206](https://github.com/openai/codex/pull/41206)）
- 远程沙箱执行现在使用 executor 真实的主目录、操作系统和路径约定（[#41196](https://github.com/openai/codex/pull/41196)、[#41204](https://github.com/openai/codex/pull/41204)、[#41207](https://github.com/openai/codex/pull/41207)、[#41209](https://github.com/openai/codex/pull/41209)）
- 结构化的 MCP 工具/资源错误会保留在 app-server 响应中
- 嵌套 subagent 的 token 用量会计入根目标预算（[#41183](https://github.com/openai/codex/pull/41183)）
- 权限变更后，过期的 Guardian 分类不再授权操作

**[rust-v0.150.1](https://github.com/openai/codex/releases/tag/rust-v0.150.1)**
- 远程 compaction 默认把保留的图片计入 token 预算，并按需裁掉更旧的图片（[#41003](https://github.com/openai/codex/pull/41003)）

同一窗口还发了一串密集的 alpha（`0.151.0-alpha.7` 到 `alpha.12`，外加 **[0.152.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.1)**）。这些标签的 release notes 很薄，真正有产品意义的表面变化在 0.151.0。

## 3. Hot Issues

1. **[#28919](https://github.com/openai/codex/issues/28919) — Windows app missing “Control other devices”**  
   48 条评论 / 46 👍。本窗口互动最高的缺陷。Windows 10/11 上的 Pro 用户在 Settings 里找不到 Remote Connections，从而阻断了其他平台已有的手机控桌面流程。同一症状也出现在 discussion [#40385](https://github.com/openai/codex/discussions/40385)。

2. **[#33685](https://github.com/openai/codex/issues/33685) — Weekly limit drains like the old 5-hour cap**  
   29 条评论 / 17 👍。GPT-5.5 High 用户反馈：5 小时计量消失后，每周配额下降节奏几乎跟以前的短窗口一样。这是最清楚的「限额体感更差、不是更好」帖。

3. **[#41220](https://github.com/openai/codex/issues/41220) — Meta tracker: abnormal quota depletion**  
   「用量超过本地 token / 仪表盘 / credits 所能解释」的汇总枢纽。把 Plus、Pro、Business Premium、CLI、Desktop 和 Bedrock 的报告串在一起。当日新增例子：[#41468](https://github.com/openai/codex/issues/41468)（GPT-5.6 Sol High 约 6 分钟烧掉 Plus 5 小时窗口的约 60%）和 [#41625](https://github.com/openai/codex/issues/41625)（`v0.151.0`、Business Premium，「用量掉得非常快」）。

4. **[#39280](https://github.com/openai/codex/issues/39280) — macOS Chrome tabs claimable, every real action fails policy**  
   Browser Use 能列出 profile 并认领标签页，随后每一个真正的页面操作都在策略校验上被拒。浏览器自动化是对外宣传的能力；这让 macOS 路径看起来只接了一半。

5. **[#40611](https://github.com/openai/codex/issues/40611) — Login/logout loop after Advanced Account Security**  
   一位 20x Pro 用户为了保留 Daybreak Blue 开通了 Advanced Account Security，桌面应用随后不可用。把付费用户锁在应用外的鉴权回退，优先级高于普通 UI 缺陷。

6. **[#41079](https://github.com/openai/codex/issues/41079) / [#41566](https://github.com/openai/codex/issues/41566) — Paginated thread history freezes on duplicate ordinal**  
   Windows Desktop 停在过期快照上，而权威的 rollout JSONL 是完整的。[#41566](https://github.com/openai/codex/issues/41566) 描述同一类问题：未完成回合后出现重复 ordinal，历史投影永久卡住。数据没有删；UI 只是不再追上。

7. **[#30639](https://github.com/openai/codex/issues/30639) — Chronicle background screen summaries drain plan limits**  
   macOS Chronicle / `SkyComputerUseService` 大约每 10 分钟录屏并摘要。关掉功能也不会立刻停止采集。静默后台计算现在被当成配额缺陷，而不是「锦上添花」。

8. **[#22965](https://github.com/openai/codex/issues/22965) — Remote SSH to native Windows still needs hidden CLI/Bash setup**  
   长期未结的远程主机问题（5 月开帖）。Desktop Remote SSH 到 Windows 主机，即使做了非官方 CLI 引导，仍会在 app-server 代理处失败。相关：[#37925](https://github.com/openai/codex/issues/37925) 解绑手机后 Android 配对失败。

9. **[#41540](https://github.com/openai/codex/issues/41540) / [#41523](https://github.com/openai/codex/issues/41523) — Windows post-update headless launch**  
   Store 构建 `26.825.5331.0`：受保护的 `node_repl.exe` 迁移失败（`0x80071770`）导致应用无界面启动；自动更新可能留下 `MainWindowHandle=0`。多台机器上「更新后首次启动」是坏的。

10. **[#40524](https://github.com/openai/codex/issues/40524) — Let Plus users choose how weekly quota is consumed**  
    9 👍 增强建议。用户希望自己选爆发 vs 匀速（恢复 5 小时、只走周额度，或拆分）。这是配额耗尽缺陷的建设性对照：就算核算修好了，大家也想要策略控制权。

值得顺带一提：Windows 钩子从不触发 `PreToolUse`（[#24453](https://github.com/openai/codex/issues/24453)）；`PostToolUse` 没有失败信号，`PostToolUseFailure` 也从不触发（[#34289](https://github.com/openai/codex/issues/34289)）；Linux seccomp 拒绝 `sendto` 仍会打断 asyncio / 已连接的 Unix socket（[#24933](https://github.com/openai/codex/issues/24933)、[#33793](https://github.com/openai/codex/issues/33793)）；悬浮宠物变成点击穿透（[#41513](https://github.com/openai/codex/issues/41513)）；DWM 合成器卡顿在应用关闭后仍在（[#40531](https://github.com/openai/codex/issues/40531)）。

## 4. Key PR Progress

过去 24 小时几乎所有高流速 PR 都是已合并的 `copyberry[bot]` 落地，落在 Rust 核心 / TUI / app-server。其中 10 个会改产品行为：

1. **[#41630](https://github.com/openai/codex/pull/41630) — `update_plan` default-on tests**  
   覆盖 enabled / disabled / default 状态，并在设置了自定义 base/developer instructions 时保持 prompt 工具列表稳定。

2. **[#41586](https://github.com/openai/codex/pull/41586) + [#41613](https://github.com/openai/codex/pull/41613) — Vim search motions in the composer**  
   草稿局部的 `/` 和 `?`、环绕的 `n`/`N`，以及 delete/change/yank 之后的搜索。测试挪到了 history-search 模块旁边。

3. **[#41567](https://github.com/openai/codex/pull/41567) — Restore thread cwd from owned settings snapshots**  
   恢复线程时若未显式给 `cwd`，现在会还原该线程最近保留的设置，而不是继承分叉或 compaction 后的邻居。

4. **[#41562](https://github.com/openai/codex/pull/41562) — Preserve turn lineage across goal continuations**  
   自动目标续写仍归到创建该目标的那一轮，即使 hooks 或后续编辑把元数据弄乱。

5. **[#41467](https://github.com/openai/codex/pull/41467) — Refresh TUI model picker from the app server**  
   选择器不再打开启动时的过期目录；展示缓存选项的同时拉取账户当前模型列表。

6. **[#41457](https://github.com/openai/codex/pull/41457) + [#41461](https://github.com/openai/codex/pull/41461) — Model-catalog-sourced agent copy**  
   主动多 agent 指令和异步用户消息描述现在来自当前模型目录，并带内置回退。

7. **[#41456](https://github.com/openai/codex/pull/41456) — App targets in executor plugin hooks**  
   当 `browser.turn_ended` 符合策略时，允许精选的远程 Browser 插件 `Stop` / `SubagentStop` 钩子进入。

8. **[#41454](https://github.com/openai/codex/pull/41454) — Block goals after repeated exec-host failures**  
   连续三次合格的失败 `exec` 回合会封住该目标；任意一次成功的工具调用都会清零连败。

9. **[#41447](https://github.com/openai/codex/pull/41447) — `openai/elicitation` form requests**  
   声明了对象值 `form` 能力的客户端会拿到一等公民的 elicitation 表单，而不是派生出来的 `openai/form` 残留。

10. **[#41436](https://github.com/openai/codex/pull/41436) — Answer terminal queries from TTY subprocesses**  
    来自 PTY 子进程的设备状态、窗口大小、光标位置和 DEC private-mode 查询会得到有界回复，避免工具卡在终端探测上。

另外值得跟：诊断上传加固（[#41569](https://github.com/openai/codex/pull/41569)）、保留权限的会话元数据更新（[#41464](https://github.com/openai/codex/pull/41464)）、code-mode 主机耗时指标（[#41452](https://github.com/openai/codex/pull/41452)），以及 Bazel/`rules_rs` 发布平台清理（[#41476](https://github.com/openai/codex/pull/41476)、[#41477](https://github.com/openai/codex/pull/41477)）。

## 5. Hot Discussions

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200) — Remote-control Codex from the ChatGPT app**（45 条评论 / 190 👍）  
  仓库里信号仍然最强的产品诉求：工作站上跑无界面守护进程，用 ChatGPT 移动端做一等公民遥控，官方路径不要 Tailscale + SSH。直接对应 Windows「Control other devices」缺失。

- **[#12567](https://github.com/openai/codex/discussions/12567) — Memories in Codex**  
  贴近 OpenAI 的讨论：Codex 该多积极地引用先前线程。相关用户提案：可迁移的持久经验记忆（[#38021](https://github.com/openai/codex/discussions/38021)）。

- **[#40291](https://github.com/openai/codex/discussions/40291) — Fixed-price high-usage individual plan**  
  重度用户想要公平使用的不限量档，好停止围着计量表排期。同一簇还有「5 小时限额又回来了」（[#40707](https://github.com/openai/codex/discussions/40707)）以及 Plus 配额自选 [#40524](https://github.com/openai/codex/issues/40524)。

- **[#40384](https://github.com/openai/codex/discussions/40384) — Prompt queue / drafts that do not steer**  
  回合进行中先排队后续指令，但不要把它们当成 steer 注入。搭配 issue [#16681](https://github.com/openai/codex/issues/16681)（编辑/删除待处理 steer）。

- **[#25630](https://github.com/openai/codex/discussions/25630) — Switch accounts in-app**  
  体量不大的 UX 请求，但对额度用尽后轮换账号的人有超比例的运营价值。

### Q&A
- **[#31522](https://github.com/openai/codex/discussions/31522) — Does toggling Fast Speed invalidate prompt cache?**  
  重度使用 skills 时很实际的成本问题。

- **[#8338](https://github.com/openai/codex/discussions/8338) — Forking CLI + “Sign in with ChatGPT” ToS**  
  仍未关闭：个人向的 UX fork 能否继续用 ChatGPT 登录？

- **[#40385](https://github.com/openai/codex/discussions/40385) — Windows Connections tab missing**  
  #28919 的用户侧重复帖。

- **[#41623](https://github.com/openai/codex/discussions/41623) — Bedrock GPT-5.6 Sol usage underreported**  
  因为不能直接开 issue 才发成 discussion；请维护者升格为缺陷。又一个遥测可信度数据点。

### Show and tell
社区工具正在往 **用量可见性**、**工作区卫生** 和 **多 agent 协同** 聚集：
- [Enkidu for macOS](https://github.com/openai/codex/discussions/40272) — 经核验的用量跟踪与工作规划
- [CodexFuse 1.2.0](https://github.com/openai/codex/discussions/41157) — Windows 本地限速仪表盘
- [Codex Command Center](https://github.com/openai/codex/discussions/41555) — Windows 上的项目/会话/Git 工作区
- [WorkGround2](https://github.com/openai/codex/discussions/41033) — 盖在官方 CLI 上的本地优先工作台
- [LikeMinds](https://github.com/openai/codex/discussions/40840) — 协调彼此独立的 Codex agent，不再让人当总线
- [Click](https://github.com/openai/codex/discussions/41319) — 阻止反复规划 / 过度核验的插件
- [CtxWise](https://github.com/openai/codex/discussions/39516) 和 [Harness Lens](https://github.com/openai/codex/discussions/40309) — 审计哪些规则、skills、hooks 和 memory 真正会绑定到工作区

## 6. Feature Request Trends

1. **一等公民的远程控制** — daemon 模式 + ChatGPT 移动端当遥控器，外加可见的 Windows「Control other devices」入口。[#9200](https://github.com/openai/codex/discussions/9200)、[#28919](https://github.com/openai/codex/issues/28919)
2. **可预期、用户可控的配额** — 自选 5 小时 vs 周消耗、高用量一口价方案，以及和本地 token 证据对得上的仪表盘。[#40524](https://github.com/openai/codex/issues/40524)、[#40291](https://github.com/openai/codex/discussions/40291)
3. **可检查的会话记忆** — 引用先前线程、跨项目迁移经验、在 ChatGPT↔Codex 交接时锁定验收标准。[#12567](https://github.com/openai/codex/discussions/12567)、[#38021](https://github.com/openai/codex/discussions/38021)、[#40290](https://github.com/openai/codex/discussions/40290)
4. **Steer/prompt 排队** — 先起草下一条指令但不立刻生效，并能编辑/删除待处理 steer。[#40384](https://github.com/openai/codex/discussions/40384)、[#16681](https://github.com/openai/codex/issues/16681)
5. **账号与会话体验** — 应用内切账号、可用 `--resume` 创建的具名会话（[#41619](https://github.com/openai/codex/discussions/41619)）、恢复「Open with Code Editor」。
6. **钩子完整性** — Windows 上的 `PreToolUse`、`PostToolUse` 的失败判别，以及真正会触发的 `PostToolUseFailure`。

## 7. Developer Pain Points

- **配额不被信任。** 本地 rollout、缓存 token 混合、Bedrock 遥测、Chronicle，以及桌面端的环境「建议」，都和计量表对不上。用户开始自备第三方跟踪器（Enkidu、CodexFuse），因为官方百分比没法拿来做决策。
- **Windows 是最弱客户端。** 缺少远程控制 UI、Store 更新后无界面启动、分页历史冻结、点击穿透宠物、DWM 卡顿、SSH 到原生 Windows、Android 重新配对，以及从不发出事件的钩子。其中好几条已经开了几个月还没关。
- **后台功能按前台工作计费。** Chronicle 屏幕摘要和桌面「建议」会吃每周配额，即使用户在空闲，或自以为功能已关。
- **远程 / 多 agent 状态机在漏。** 过期 subagent 会复活成 Running（[#37876](https://github.com/openai/codex/issues/37876)、[#35209](https://github.com/openai/codex/issues/35209)）；移动端续写可能把桌面的全权限会话降级（[#30485](https://github.com/openai/codex/issues/30485)）；线程投影会卡在重复 ordinal 上。
- **沙箱仍会让系统程序员意外。** 受限 Linux seccomp 拒绝 `sendto`，会打断已连接的 Unix socket 和 Python asyncio 唤醒——这类失败看起来像「程序挂了」，而不是策略未命中。
- **鉴权与策略门在不透明地失败关闭。** Advanced Account Security 登录死循环；macOS Browser Use 在成功认领标签页后，死在策略校验上。

**小结：** CLI 核心在 0.151.0 里确实在推进 MCP/扩展/沙箱加固，但 2026-08-30 社区的温度，是由 **计量可信度** 和 **Windows/远程桌面完整度** 决定的，而不是由 release notes 决定的。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

Gemini CLI 社区周报 — 2026-08-30

Repo: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 最新稳定版: [v0.57.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0) · 最新 nightly: [v0.59.0-nightly.20260830](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260830.g0bd1d4397)

## 1. 本周要点

安全与信任加固已合入 nightly 线：受限模式下采用 fail-closed 工作区信任，并对 MCP server 做过滤；同时修复了 MCP OAuth 元数据发现中的 SSRF。稳定版 **v0.57.0** 与预览版 **v0.58.0-preview.0** 重点在 IDE/OAuth 可靠性、macOS 沙箱隔离、write-policy 安全检查器，以及历史记录/重试行为。社区讨论热度仍集中在 subagents（挂起、MAX_TURNS 被报成 GOAL 成功、skills 未被调用）以及持续更新的公开路线图。

## 2. 发布

**稳定版 — [v0.57.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0)** (2026-08-25)  
修复 Cloud Workstations OAuth 重定向 URI、IDE 目录不匹配、带可用性 TTL 的容量错误重试、中止时的多轮回滚、git env / workspace-state 规范化，并完成一轮较大的 SSR-agent 问题清扫（TUI 挂起超时、subagent 交接 token、隐私文案、`/clear` 文档）。评测工具新增校验与 tool-call 失败摘要。变更日志: [v0.56.0…v0.57.0](https://github.com/google-gemini/gemini-cli/compare/v0.56.0...v0.57.0)。

**预览版 — [v0.58.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0-preview.0)**  
ignore 路径中符号链接求值保持一致；macOS Seatbelt 隔离 Docker/容器套接字；新一轮对话清除 A2A 过期取消；顶层 write-policy 安全检查器；历史回滚 / retry-nudge 优化。说明: [geminicli.com preview changelog](https://geminicli.com/docs/changelogs/preview/)。

**Nightly（v0.59.0 线）**  
- [20260827](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260827.g3c311beac): 防止 MCP OAuth 元数据发现中的 SSRF（[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)）。  
- [20260829](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260829.g0bd1d4397): fail-closed 工作区信任；受限模式下过滤 `mcpServers`（[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)）。  
- [20260830](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260830.g0bd1d4397): 自动 nightly 版本提升（[#29129](https://github.com/google-gemini/gemini-cli/pull/29129)）。

## 3. 热点 Issue

1. **[#4191 Public Roadmap](https://github.com/google-gemini/gemini-cli/issues/4191)** — 20 条评论，99 👍。持续更新的贡献地图；仍是互动最高的跟踪项。  
2. **[#22323 Subagent MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1。`codebase_investigator` 在触及轮次上限后仍宣称成功，掩盖了中断。  
3. **[#21409 Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1。转交给 generalist agent 可能无限挂起；变通办法是「不要用 subagents」。  
4. **[#19873 Zero-dep OS sandbox + bash affinity](https://github.com/google-gemini/gemini-cli/issues/19873)** — 让 Gemini 像原生 bash 用户一样工作，同时不放弃安全。  
5. **[#22745 AST-aware file read/search/map](https://github.com/google-gemini/gemini-cli/issues/22745)** — 关于 AST 工具能否减少轮次与 token 噪声的 Epic。  
6. **[#21968 Skills/sub-agents underused](https://github.com/google-gemini/gemini-cli/issues/21968)** — 除非明确指示，模型很少调用自定义 skills。  
7. **[#26525 Deterministic redaction / Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** — 转录在脱敏前就进入模型上下文；日志面过大。  
8. **[#25166 Shell stuck on “Waiting input”](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1。已结束的命令仍被标为进行中。  
9. **[#21983 Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** — Linux 桌面用户受阻。  
10. **[#24246 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** — 调用 API 前未对工具集规模做裁剪。

仍在活跃：Auto Memory inbox/retry 问题（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）、browser agent 设置被忽略（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)），以及 agent 对 flags/hotkeys 的自我感知（[#21432](https://github.com/google-gemini/gemini-cli/issues/21432)）。

## 4. 关键 PR 进展

1. **[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)** *（已合入 nightly）* — Fail-closed 工作区信任；受限模式下过滤 MCP servers。  
2. **[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)** *（已合并）* — 防止 MCP OAuth 发现中的 SSRF。  
3. **[#28915](https://github.com/google-gemini/gemini-cli/pull/28915)** — ignore 路径中符号链接求值保持一致。  
4. **[#28935](https://github.com/google-gemini/gemini-cli/pull/28935)** — 在 macOS Seatbelt 中隔离 Docker/runtime 套接字。  
5. **[#28961](https://github.com/google-gemini/gemini-cli/pull/28961)** — 顶层 write-policy 安全检查器。  
6. **[#29125](https://github.com/google-gemini/gemini-cli/pull/29125)** — Hook 超时：Claude 的秒 → Gemini 的毫秒（修复 [#29122](https://github.com/google-gemini/gemini-cli/issues/29122)）。  
7. **[#29124](https://github.com/google-gemini/gemini-cli/pull/29124)** — 修正 hooks 迁移中的 `SubagentStop` 键（修复 [#29123](https://github.com/google-gemini/gemini-cli/issues/29123)）。  
8. **[#29110](https://github.com/google-gemini/gemini-cli/pull/29110)** — 将 `read_file` 经 `FileSystemService` 路由，以支持 ACP 远程文件系统。  
9. **[#29120](https://github.com/google-gemini/gemini-cli/pull/29120)** — Web-fetch 目标校验 + Undici 绑定到已解析地址。  
10. **[#28967](https://github.com/google-gemini/gemini-cli/pull/28967)** — 阻止 `clearTerminal` 在静态刷新时清空 scrollback（Linux）。

相关：Claude-hooks 对等、excludeTools 文档（[#28966](https://github.com/google-gemini/gemini-cli/pull/28966)）、skill-dir 符号链接去重（[#28968](https://github.com/google-gemini/gemini-cli/pull/28968)）、trackers/安全边界评测套件（[#28822](https://github.com/google-gemini/gemini-cli/pull/28822)–[#28824](https://github.com/google-gemini/gemini-cli/pull/28824)）、预览模型静默替换警告（[#28828](https://github.com/google-gemini/gemini-cli/pull/28828)）。

## 5. 热门讨论

### 公告
- [Public Roadmap for Gemini CLI v1](https://github.com/google-gemini/gemini-cli/discussions)（置顶）— 官方 v1 规划入口。  
- [Service update: mitigating abuse and prioritizing traffic](https://github.com/google-gemini/gemini-cli/discussions)（置顶，高票）— 容量 / 反滥用策略。

### 问答 / 支持
- [Gemini 3.6 Flash Support](https://github.com/google-gemini/gemini-cli/discussions) — 对更新 Flash SKU 的需求。  
- [How to give read_file access to parent folder?](https://github.com/google-gemini/gemini-cli/discussions) — 工作区信任 vs. 读取父目录。  
- [OAuth mode hangs on “Thinking…” while API key works](https://github.com/google-gemini/gemini-cli/discussions) — 认证路径上的性能差异。

### 想法 / 反馈
- [Better single-turn Aider-inspired features](https://github.com/google-gemini/gemini-cli/discussions/14181) — 在 `/clear` 后仍钉住 `@files`/`@folders`。  
- [Complaints from a Google AI Pro subscriber](https://github.com/google-gemini/gemini-cli/discussions/24725) 与 [A Feedback to Google Thread](https://github.com/google-gemini/gemini-cli/discussions/25448) — 卡顿、静默降级模型、付费档可靠性。  
- 容量 / “Server Limit Exceeded” 相关帖仍反复出现（[#21075](https://github.com/google-gemini/gemini-cli/discussions/21075)）。

### 展示
- WorkPaper MCP、Semble hooks / 语义代码搜索、作为更轻量 CONDUCTOR 替代的 SPAE — 社区扩展正围绕 MCP 与 prompt 上下文注入聚集。

## 6. 功能请求趋势

- **Subagent 可观测性与诚实性** — 暴露轨迹（`/chat share`），在 `/bug` 中纳入 subagent 上下文，停止把 MAX_TURNS 标成 GOAL。  
- **原生工具 / AST / bash 优先工作流** — OS 沙箱 + POSIX 链式调用；具备 AST 感知的 read/search/map。  
- **Skills 与本地 agents** — 自动调用 skills；将符号链接的 `~/.gemini/agents/*.md` 视为一等公民；Claude-hooks 迁移保真度。  
- **更安全的 I/O 策略** — write-policy 检查器、按精确名称 excludeTools、信任前提下读取父目录、面向远程客户端的 ACP `FileSystemService`。  
- **会话体验** — 钉住文件（Aider 风格）、无闪烁缩放、不清空终端 scrollback、可见的预览模型替换提示。  
- **记忆卫生** — 进入模型上下文前做确定性脱敏；隔离无效 inbox 补丁；停止重试低信号会话。

## 7. 开发者痛点

- **挂起与虚假成功** — generalist/browser agents 冻结；shell 停在 “Awaiting user input”；轮次上限被报成已完成目标。  
- **交互 / 平台摩擦** — Vite 风格提示会卡住 agent；Wayland 上的 browser agent；Linux 终端闪烁/scrollback 被清空。  
- **认证与容量** — OAuth 比 API key 更慢；429 / “no capacity”；预览模型被静默回退。  
- **工具面膨胀** — 128+ tools → HTTP 400；除非提示否则不用 skills；临时脚本散落在仓库各处。  
- **信任 vs. 能力** — 用户想读父目录并使用 MCP，维护者则在收紧 fail-closed 信任、SSRF 与沙箱套接字。  
- **迁移缺口** — `gemini hooks migrate` 时 Claude hook 事件名与超时单位丢失或缩放错误。

---

*来源: [Releases](https://github.com/google-gemini/gemini-cli/releases)、过去 24 小时的 issue/PR 动态、[Discussions](https://github.com/google-gemini/gemini-cli/discussions)、[preview changelog](https://geminicli.com/docs/changelogs/preview/)。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

我会先拉一点线上仓库的实时上下文，让这份周报与当前 Copilot CLI 动态对齐，再根据你提供的数据写出结构化摘要。
# GitHub Copilot CLI Community Digest — 2026-08-30

Source: [github/copilot-cli](https://github.com/github/copilot-cli)

## 1. This Week's Highlights

v1.0.82 已发布。此前 1.0.81 周期相当密集：插件仪表盘向所有人开放，落地 MCP 2026-07-28 支持，加入感知 OpenTelemetry 的 hooks，并改进了 Windows Entra ID / WAM 远程 MCP 登录。这次补丁更小、更精准：`/worktree` 或 `/move` 准备 worktree 期间输入的消息，切换时不再丢失；计划审批卡片可用 Ctrl+E 重新展开完整计划；认证失败会展示具体错误（例如 `401 Bad credentials`），而不再只弹出笼统的 `/login` 提示。社区讨论集中在长会话稳定性（FileWatch 循环、恢复时 heap OOM）、并行子代理启动时 TUI 卡死，以及 1.0.79–1.0.81 之后的 MCP/OAuth 回归。

## 2. Releases

**[v1.0.82](https://github.com/github/copilot-cli/releases/tag/v1.0.82)** (2026-08-29) — 当前最新版

- 在 `/worktree` 或 `/move` 准备 worktree 时输入的消息，不再把切换过程打断。
- Ctrl+E 可展开计划审批卡片，再次显示完整计划。
- 认证失败现在会展示具体错误（例如 `401 Bad credentials`），而不再只给出 `/login` 提示。

过去 24 小时内的相关预发布版本：[v1.0.82-2](https://github.com/github/copilot-cli/releases/tag/v1.0.82-2)、[v1.0.82-1](https://github.com/github/copilot-cli/releases/tag/v1.0.82-1)、[v1.0.82-0](https://github.com/github/copilot-cli/releases/tag/v1.0.82-0) 已预置同一批修复。

**[v1.0.81](https://github.com/github/copilot-cli/releases/tag/v1.0.81)** (2026-08-27) — 仍是功能密度最高的基线版本

- 插件仪表盘对所有人开放，可通过 `/plugin`、`/mcp` 或 `/skills` 进入（设 `PLUGINS_DASHBOARD=false` 可关闭）。
- CLI、SDK、IDE 及内存客户端全面支持 MCP 2026-07-28。
- Hooks 可接收当前 OpenTelemetry 上下文（`traceparent` / `tracestate`）并发送关联 span。
- 位于 Microsoft Entra ID 之后的 Windows 远程 MCP 服务器，可通过系统 WAM broker 登录。
- 大会话恢复时优先展示近期历史；`/model` 会提示数据保留相关警告；被企业策略拦截的 MCP 服务器会显示为 blocked，而不再一直转圈。

## 3. Hot Issues

1. **[#4612 Runaway FileWatch loop freezes TUI and grows debug log to 13 GB](https://github.com/github/copilot-cli/issues/4612)** — Open，7 条评论。长时间运行或恢复的会话可能陷入紧密的 `FileWatch` host-event 循环。TUI 卡死，debug log 暴涨；这是本窗口内严重程度最高的稳定性报告。

2. **[#4480 Atlassian MCP OAuth fails with RFC 8414 issuer mismatch on 1.0.79+](https://github.com/github/copilot-cli/issues/4480)** — Closed，7 条评论，6 👍。自 1.0.71 引入的回归；远程 Atlassian MCP 的 OAuth discovery 会拒绝所宣称的 issuer。调查后已关闭，但仍是 MCP 认证相关反应最多的帖子。

3. **[#4535 `store_memory` fails in 1.0.81 prereleases: `Instance id is required`](https://github.com/github/copilot-cli/issues/4535)** — Open，7 条评论。原生 memory writer 被调用时缺少 instance ID，预发布通道上的记忆持久化因此失效。

4. **[#4165 `copilot --resume` hangs at “Resuming session” on Windows cold start](https://github.com/github/copilot-cli/issues/4165)** — Open，4 条评论。PowerShell 冷启动后无法进入交互状态；同一会话用其他方式打开则能恢复。截至 2026-08-29 仍在跟进。

5. **[#4533 TUI stops consuming events when a turn launches parallel subagents](https://github.com/github/copilot-cli/issues/4533)** — Open，4 条评论。输入和滚动全部失效，但 Rust runtime 仍在运行。会打击对 multi-agent turn 的信任。

6. **[#4027 Tool `str_replace` does not exist](https://github.com/github/copilot-cli/issues/4027)** — Open，13 👍。本组中反应数最高。Java 编辑经常先报缺少该工具，再回退到另一条编辑路径。

7. **[#2369 Unable to scroll long results](https://github.com/github/copilot-cli/issues/2369)** — Closed，4 👍。经典 TUI 抱怨（鼠标、触控板、没有滚动条）。2026-08-30 再次更新，关闭后痛点依然可见。

8. **[#1392 OmniSharp LSP initialize timeout on large C# solutions](https://github.com/github/copilot-cli/issues/1392)** — Open，5 👍。默认 LSP initialize 超时过短；用户希望提供可配置的 `initializeTimeout`。

9. **[#4527 `copilot -p` 401 on GHEC data residency since 1.0.81-1](https://github.com/github/copilot-cli/issues/4527)** — Open，4 👍。Prompt 模式从 `api.githubcopilot.com` 拉取模型目录，而不是租户端点。交互模式正常，headless/CI 不行。

10. **[#4664 Heap OOM when resuming a long-standing session](https://github.com/github/copilot-cli/issues/4664)** / **[#4639 Event-storage exhaustion retry storm → GC loop and Node OOM](https://github.com/github/copilot-cli/issues/4639)** — 均为 Open，近几日新开。二者描述同一类故障：大会话叠加远程 event storage，会在用户继续工作前把内存打爆。

本窗口内还有更新、值得一提的帖子：[#4647 chroma-mcp broken on 1.0.81](https://github.com/github/copilot-cli/issues/4647)、[#4660 ADO remote MCP OAuth fails under the new WAM path](https://github.com/github/copilot-cli/issues/4660)、[#4655 Agent Plugins 1.0 custom agents not discovered](https://github.com/github/copilot-cli/issues/4655)、[#2930 local auto-memory without remote storage](https://github.com/github/copilot-cli/issues/2930)。

## 4. Key PR Progress

过去 24 小时内只有 6 个 PR 有更新，其中若干信号很弱。有实质内容的是：

1. **[#2381 install: add fish shell support for PATH configuration](https://github.com/github/copilot-cli/pull/2381)** — Closed。Fish 用户被写进 `~/.profile`，而且还用了 POSIX `export` 语法；Fish 既不会 source 该文件，也读不懂这种写法。这是一次针对静默 onboarding 失败的真正安装修复。

2. **[#4497 Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)** — Closed。受信任的 invalid-label writer 现在能在 GitHub 省略 fork workflow run 上的 PR 关联时恢复，条件是恰好只有一个匹配的未关闭 PR。

3. **[#4607 Prepare public prerelease v1.0.81-11](https://github.com/github/copilot-cli/pull/4607)** — Closed。发版列车的事务性工作，为发布 1.0.81-11 做准备（该列车已包含 WAM MCP 登录以及 resume/telemetry 修复）。

4. **[#4659 Initial commit with exported changes from codespace](https://github.com/github/copilot-cli/pull/4659)** — Open。无范围的 codespace 导出；除非维护者点名修改，否则视为噪音。

5. **[#4610 Update README.md](https://github.com/github/copilot-cli/pull/4610)** — Open。摘要为空；低信号文档 PR。

6. **[#4573 Rename README.md to README.mdmain](https://github.com/github/copilot-cli/pull/4573)** — Open。不太可能合并；看起来像误操作。

24 小时窗口内并没有 10 个有实质内容的 PR。产品推进发生在发版列车里，而不是公开功能 PR 上。

## 6. Feature Request Trends

- **本地 / 私有 memory。** [#2930](https://github.com/github/copilot-cli/issues/2930) 以及 [#4535](https://github.com/github/copilot-cli/issues/4535) 中损坏的 `store_memory` 路径表明，大家需要由 agent 主动写入、且不依赖远程 Copilot Memory 的记忆能力。
- **文件夹级 `.agents` 发现。** [#4204](https://github.com/github/copilot-cli/issues/4204) 希望在任意打开的文件夹中发现 instructions、agents 和 hooks，而不只限于 Git 仓库。
- **真正可用的插件与自定义 agent 发现。** [#4655](https://github.com/github/copilot-cli/issues/4655) 和 [#4556](https://github.com/github/copilot-cli/issues/4556) 要求 Agent Plugins 1.0 agents 以及服务端管理的 marketplace 能够完成注册，而不是静默失败。
- **企业 / GHEC 在 headless 模式下的正确性。** [#4527](https://github.com/github/copilot-cli/issues/4527) 和 [#4666](https://github.com/github/copilot-cli/issues/4666) 希望使用租户端点，以及感知 hostname 的账户页脚。
- **可配置的 LSP 超时**，以应对大型解决方案（[#1392](https://github.com/github/copilot-cli/issues/1392)）。
- **与文档意图一致的权限 UX。** `/allow-all` 仍会就 bash 二次询问（[#2955](https://github.com/github/copilot-cli/issues/2955)），以及编辑权限超时（[#4486](https://github.com/github/copilot-cli/issues/4486)）。

## 7. Developer Pain Points

- **长会话很脆弱。** FileWatch 事件风暴、event-storage 重试循环，以及恢复时的 V8 heap OOM，是当前最突出的可靠性主题。把 Copilot CLI 挂一整天的用户最容易踩中。
- **TUI 和 Windows 仍是锋利边缘。** 并行子代理运行时输入冻结、会话中途对比度失效（[#4648](https://github.com/github/copilot-cli/issues/4648)）、恢复挂起、Windows 25H2 上 sandbox 报 “unsupported host”（[#4652](https://github.com/github/copilot-cli/issues/4652)），以及历史遗留的 stdio/`npx` 拉起问题。
- **MCP 认证仍是移动靶。** Atlassian issuer 不匹配、ADO + WAM 失败、chroma-mcp 在 1.0.81 上损坏，以及曾经会一直转圈的企业拦截服务器。
- **工具契约漂移。** 模型会调用并不存在的 `str_replace`；hook `sessionStart` 的 additionalContext 每一轮都被重复，并泄漏进子代理（[#4665](https://github.com/github/copilot-cli/issues/4665)）。
- **上下文成本报告有误导。** `/context` 的 “MCP Tools” 仍在报告未延迟加载的 schema 体积，而不是模型实际收到的内容（[#4189](https://github.com/github/copilot-cli/issues/4189)）。

**给维护者的结论：** 先把 1.0.82 的 UX/认证打磨发出去，然后优先处理会话运行时隔离（FileWatch、event export、恢复内存）以及 MCP OAuth 兼容性。这两个桶产生的评论，已经超过新功能请求。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-30

Source: [anomalyco/opencode](https://github.com/anomalyco/opencode)

## 1. 本周亮点

OpenCode 连续发布了四个补丁版本，最新到 **v1.18.25**，重点修复提供商对接正确性：无需 Bun 即可完成 Azure CLI / Entra ID 登录、Bedrock 推理缓存回放、Cloudflare AI Gateway 路由，以及 OpenAI 兼容请求体清理。社区讨论仍集中在 **计费/鉴权不一致**（付费 Zen 仍撞上免费额度、余额为正却出现 `INFERENCE_ACCESS_BLOCKED`）、长会话与 `serve` 重连时的 **CPU/MCP 进程爆炸**，以及 **TUI 插件能力**（提示词控制、斜杠命令拦截、实时子代理）。维护者与贡献者还落地了一批密集的 v2 协议与会话恢复修复。

## 2. 版本发布

在所提供数据的最近 24 小时窗口内，落地了四个核心补丁：

- **[v1.18.25](https://github.com/anomalyco/opencode/releases/tag/v1.18.25)** — Azure CLI 登录不再依赖 Bun。
- **[v1.18.24](https://github.com/anomalyco/opencode/releases/tag/v1.18.24)** — Bedrock 推理不再把内容缓存成无法回放的空消息；支持通过 Azure CLI 使用 Azure Entra ID；V1 可读取受支持的 V2 配置字段；Desktop 会立即从 Home 中移除已归档会话。
- **[v1.18.23](https://github.com/anomalyco/opencode/releases/tag/v1.18.23)** — 为第三方模型提供 Cloudflare AI Gateway REST 路由；Anthropic 带点号的 ID 映射为带连字符的 slug；请求头中带上父会话 ID；GitHub 鉴权支持不可变 OIDC token。
- **[v1.18.22](https://github.com/anomalyco/opencode/releases/tag/v1.18.22)** — 移除过时的 Go 首月折扣文案；设备登录链接支持相对 URL / base path；停止向会拒绝该字段的提供商发送 `textVerbosity`；Bedrock 兼容性；Desktop 模型选择器表头在滚动时保持可见。

## 3. 热点 Issue

1. **[OpenCode is heavily CPU-bound (#21470)](https://github.com/anomalyco/opencode/issues/21470)** — 开放，16 条评论，17 👍。长 Gemini 会话的大部分墙钟时间消耗在 OpenCode 自身（有人提到 1.5+ CPU 小时），而不是在等 API。信号最强的性能帖；提交数月后仍在活跃讨论。

2. **[credit card declined (#33264)](https://github.com/anomalyco/opencode/issues/33264)** — 已关闭，20 条评论，5 👍。该窗口内评论数最高。即便关闭后，计费摩擦仍是社区磁铁。

3. **[Xcode 27 ACP ignores opencode.json / TUI model (#34743)](https://github.com/anomalyco/opencode/issues/34743)** — 开放，16 条评论。Xcode 27 beta 的 ACP 总是回退到 `big-pickle`，而不是 LM Studio / Ollama 配置。阻塞 IDE 原生工作流。

4. **[Zen paid balance still hits FreeUsageLimitError (#33318)](https://github.com/anomalyco/opencode/issues/33318)** — 开放，11 条评论。已付费额度无法解除每日免费上限。反复出现的计费信任问题。

5. **[Plugins intercept slash commands + custom dialogs (#28292)](https://github.com/anomalyco/opencode/issues/28292)** — 开放，10 条评论。要求插件能确定性地处理命令并跳过 LLM。核心扩展性诉求。

6. **[Unlimited usage exploit via IP/VPN (#34344)](https://github.com/anomalyco/opencode/issues/34344)** — 开放，6 条评论。免费模型限额按 IP 计算，可用 VPN 轮换重置。对 Zen/免费档构成滥用与公平性风险。

7. **[Live Subagents sidebar in TUI (#41249)](https://github.com/anomalyco/opencode/issues/41249)** — 开放，6 条评论。作者已发布 npm 插件；希望 TUI 提供一等公民界面来展示已拉起的代理。

8. **[serve MCP children leak until OOM (#46035)](https://github.com/anomalyco/opencode/issues/46035)** — 开放，5 条评论，针对 **1.18.25** 提交。Web 客户端重连会在 systemd 下堆积 MCP 子进程。无头生产环境的可靠性缺陷。

9. **[mimo-v2.5 subagent infinite thinking loop (#42923)](https://github.com/anomalyco/opencode/issues/42923)** — 开放，4 条评论。子代理永不结束，持续消耗额度。直接关系到 2.0 多代理成本风险。

10. **[API inference blocked while catalog works (#46219)](https://github.com/anomalyco/opencode/issues/46219)** — 开放，3 条评论，当日提交。有效密钥且余额为正，仍返回 `INFERENCE_ACCESS_BLOCKED` / HTTP 401。目录与推理之间的授权分裂。

同时关注：TUI 冻结 / Tree-sitter 崩溃（[#46203](https://github.com/anomalyco/opencode/issues/46203)）、重复注入的 `system-reminder` 爆炸（[#46217](https://github.com/anomalyco/opencode/issues/46217)、[#46208](https://github.com/anomalyco/opencode/issues/46208)）、Muse 端点不可用（[#43477](https://github.com/anomalyco/opencode/issues/43477)）、中国托管模型需显式 opt-in 却 403（[#46228](https://github.com/anomalyco/opencode/issues/46228)）。

## 4. 关键 PR 进展

1. **[feat(tui): prompt transform coordinator (#46233)](https://github.com/anomalyco/opencode/pull/46233)** — 开放。由宿主侧掌控的确定性提示词变换；属于 [#38962](https://github.com/anomalyco/opencode/issues/38962)（插件无法读取/驱动提示词）的一部分。

2. **[fix(app): global permission:allow in Settings toggle (#46226)](https://github.com/anomalyco/opencode/pull/46226)** — 开放。设置里的自动接受现在会反映 `"permission": "allow"`。

3. **[feat(plugin): native Fireworks AI login (#46223)](https://github.com/anomalyco/opencode/pull/46223)** — 开放。为 `auth login` / `/connect` 内置 Fireworks Connect。

4. **[fix(app): encode server credentials as UTF-8 (#46225)](https://github.com/anomalyco/opencode/pull/46225)** — 开放。修复非 ASCII 服务器凭据上的 `btoa()` 损坏。

5. **[fix(core): bound ProjectCopy.refresh concurrency (#46214)](https://github.com/anomalyco/opencode/pull/46214)** — 已关闭。限制大型仓库上无界的 git/stat 扇出（CPU 抖动）。

6. **[fix(core): defer FFF init on cold location (#46211)](https://github.com/anomalyco/opencode/pull/46211)** — 已关闭。Fast File Finder 不再在单体仓库上把 location 获取阻塞 50 秒以上。

7. **[fix(mcp): share identical MCP subprocesses across Locations (#46210)](https://github.com/anomalyco/opencode/pull/46210)** — 已关闭。全局 MCP 进程池；直接对应重连/OOM 报告。

8. **[fix(ai): preserve forced reasoning signature (#46218)](https://github.com/anomalyco/opencode/pull/46218)** + **[preserve Responses reasoning state (#43362)](https://github.com/anomalyco/opencode/pull/43362)** — 已关闭。推理续写 / 可安全回放的提供商元数据。

9. **[fix(ai): fail malformed Bedrock Converse output (#46193)](https://github.com/anomalyco/opencode/pull/46193)** — 已关闭。将 `malformed_model_output` / `malformed_tool_use` 视为错误，而不是成功结束。

10. **[fix(app): recover sessions with unavailable locations (#46215)](https://github.com/anomalyco/opencode/pull/46215)** — 已关闭。Desktop/web 获得类似 TUI 的 location 恢复界面，而不再是失灵的输入框。

其他值得注意的合入：按 agent 作用域的 reasoning-effort 变体（[#46202](https://github.com/anomalyco/opencode/pull/46202)）、共享时间线工具表头（[#46205](https://github.com/anomalyco/opencode/pull/46205)）、desktop 签名/终端 entitlement 修复（[#46212](https://github.com/anomalyco/opencode/pull/46212)）、Go/Hy3 文档清理（[#46221](https://github.com/anomalyco/opencode/pull/46221)、[#46213](https://github.com/anomalyco/opencode/pull/46213)）。

## 6. 功能请求趋势

- **把 TUI 插件运行时做成真正的 API**：读取/编辑提示词、无需 LLM 往返即可拦截斜杠命令、注册对话框、实时子代理侧边栏（[#38962](https://github.com/anomalyco/opencode/issues/38962)、[#28292](https://github.com/anomalyco/opencode/issues/28292)、[#41249](https://github.com/anomalyco/opencode/issues/41249)、[#46233](https://github.com/anomalyco/opencode/pull/46233)、[#46220](https://github.com/anomalyco/opencode/issues/46220)）。
- **按模型 / 按 agent 控制**：压缩阈值与压缩所用模型选择（[#43703](https://github.com/anomalyco/opencode/issues/43703)、[#44094](https://github.com/anomalyco/opencode/issues/44094)）；reasoning-effort 钉在 agent 上而不是模型上（[#46202](https://github.com/anomalyco/opencode/pull/46202)）。
- **会话作用域终端 + 模型可见的终端上下文**（[#43758](https://github.com/anomalyco/opencode/issues/43758)）。
- **生态连接器**：Fireworks 登录、Telegram 远程控制、GitHub 项目图标发现（[#46223](https://github.com/anomalyco/opencode/pull/46223)、[#46227](https://github.com/anomalyco/opencode/pull/46227)、[#46229](https://github.com/anomalyco/opencode/issues/46229)）。
- **IDE/ACP 保真度**：从 Xcode 启动时尊重 `opencode.json` 与 TUI 所选模型（[#34743](https://github.com/anomalyco/opencode/issues/34743)）。

## 7. 开发者痛点

- **计费与运行时授权漂移**：付费 Zen 仍被当成免费封顶；目录 200 + 推理 401；付款回执仍显示 “No payment method”；已在区域内的用户却碰到区域模型 403。
- **进程与 CPU 爆炸**：FFF/git 无界并发、MCP 子进程按 Location 和每次 web 重连成倍增加、TUI/Tree-sitter 冻结、1.18.25 上鼠标被当成键盘导致控制台损坏。
- **上下文卫生**：每次工具结果都重新注入完整的 `AGENTS.md` / `system-reminder`，直到窗口里堆满成千上万块重复内容。
- **烧钱的 agent 循环**：mimo-v2.5 思考永不终止；畸形的提供商 XML 卡住会话重载；Muse 上游 “endpoint unavailable.”
- **Windows / Desktop 事件积压**：每次启动都重放过期的会话错误 toast + 提示音。
- **限流设计**：按 IP 绑定的免费档限额可轻易轮换，同时削弱产品经济模型与公平使用执行。

未提供 GitHub Discussions 数据集，故省略 Discussions 章节。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

先核对仓库与最新 release，再按你的规则只输出简体中文译文。# Pi Community Digest — 2026-08-30
来源：[earendil-works/pi](https://github.com/earendil-works/pi)

## 1. 本周要点
Pi 连续发布了 **v0.84.3** 和 **v0.84.4**：Windows PowerShell 执行、更安全的分阶段更新、终端能力覆盖、扩展 UI 提示事件，以及实验性 DeepSeek V4 Flash Vision。Issue 追踪器里最集中的是 TUI 流式输出/布局回归和长会话资源占用；PR 则在推进 provider 覆盖、会话正确性，以及与 TUI 全对等的 Web GUI。社区注意力一边在 harness 基准对比，一边在以扩展为先的权限/provider 工作流。

## 2. 发布
**[v0.84.4](https://github.com/earendil-works/pi/releases/tag/v0.84.4)** (2026-08-28)
- 终端能力覆盖：超链接 / 图片 / truecolor 检测
- 扩展 `ui_prompt_start` / `ui_prompt_end` 事件，便于宿主把 agent 工作与 UI 等待拆开
- RPC `clear_queue`，用于转向指令与后续消息
- 全屏选区复制控制（`Ctrl+X`；可关闭自动复制）
- 通过内置 DeepSeek provider 提供实验性 DeepSeek V4 Flash Vision
- 修复：thinking 开关清空正在输出的 Bash 内容；Windows 在缺少 `taskkill.exe` 时 abort 崩溃；JSONL 恢复时文件末尾无换行导致损坏

**[v0.84.3](https://github.com/earendil-works/pi/releases/tag/v0.84.3)** (2026-08-24)
- Windows 上可选的原生 **PowerShell tool**
- 更安全的托管更新（stage → verify → 原子 activate）
- 新 PowerShell 路径已立刻带出后续 Windows 问题（把 stderr 当失败、控制台窗口闪烁）

## 3. 热门 Issue
1. **[#8584](https://github.com/earendil-works/pi/issues/8584)** — 长工具输出后 TUI 行错乱（25 条评论，9 👍，OPEN）  
   宽幅工具转储之后，助手文本变成一行一个词。本窗口互动最高的 bug；用户在对大文件跑 `sed`/`cat` 后踩中。

2. **[#7730](https://github.com/earendil-works/pi/issues/7730)** — macOS 长会话高 CPU（13 条评论，9 👍，OPEN）  
   CPU 50–110%，RSS 600–800 MB； anecdotal 上与会话时长 / 上下文规模相关。全天跑 agent 时很伤。

3. **[#3200](https://github.com/earendil-works/pi/issues/3200)** — `prompt` RPC 支持视频/音频（10 条评论，6 👍，OPEN）  
   图片已经可用；多模态用户希望视频/音频同样走这条路，让 Gemma 4 / GPT-4o 级模型能吃媒体。

4. **[#8061](https://github.com/earendil-works/pi/issues/8061)** — 上下文预算忽略 `maxTokens` 预留（3 条评论，2 👍，OPEN，进行中）  
   请求在约 1M 窗口的 78% 处失败；compact-and-retry 又以同样方式失败。超大上下文模型的核心可靠性问题。

5. **[#8753](https://github.com/earendil-works/pi/issues/8753)** — 0.84.3 的 reasoning_details 回显弄坏 Venice GLM（CLOSED）  
   `preservedReasoningDetails` 开始回显后出现确定性推理退化。针对刚发版的回归报告。

6. **[#8643](https://github.com/earendil-works/pi/issues/8643)** — Bedrock OpenAI 模型拒绝 `toolResult.content` 里的图片（OPEN）  
   需要 openai-completions 已经做过的同类 image-hoist。挡住 Bedrock 上的多模态工具循环。

7. **[#3966](https://github.com/earendil-works/pi/issues/3966)** — 内置 `--profile` 做状态隔离（CLOSED）  
   工作 / 个人 / 本地 LLM 配置目前挤在同一个 `PI_CODING_AGENT_DIR`。反复出现的隔离诉求。

8. **[#8847](https://github.com/earendil-works/pi/issues/8847)** — TUI 崩溃：git diff footer 未截断（CLOSED，2026-08-30 提交）  
   窄终端（≤33 列）在 resume 时崩溃。与其他宽度/截断类 bug 同族。

9. **[#8843](https://github.com/earendil-works/pi/issues/8843)** — 惰性会话恢复：首次 prompt 前约 10s（CLOSED）  
   启动时完整解析 JSONL；成本随会话年龄增长。用户不该只为 resume 就被迫 compact。

10. **[#8842](https://github.com/earendil-works/pi/issues/8842)** / **[#8846](https://github.com/earendil-works/pi/issues/8846)** — 0.84.3 带来的 Windows PowerShell/控制台余波  
    PS 5.1 把 stderr 进度当成失败；`windowsHide:true` 每个原生子进程都会闪一下 conhost。新平台面，立刻破窗。

值得一提：[#6907](https://github.com/earendil-works/pi/issues/6907) README 安装章节；[#8713](https://github.com/earendil-works/pi/issues/8713) LM Studio 图片读取被禁用；[#8831](https://github.com/earendil-works/pi/issues/8831) NVDA 与 `pi -p` 行为不一致。

## 4. 关键 PR 进展
1. **[#8840](https://github.com/earendil-works/pi/pull/8840)** `feat: pi web GUI with full TUI parity`（CLOSED）  
   Token 门控的本地 HTTP + WebSocket GUI，与 TUI 共用同一套 `AgentSessionRuntime`。本批最大的界面扩展。

2. **[#8844](https://github.com/earendil-works/pi/pull/8844)** Tencent Token Plan Individual provider（CLOSED）  
   通过 `TENCENT_TOKEN_PLAN_API_KEY` 加入 tc-code-latest、DeepSeek V4 Flash/Pro、GLM-5.2、MiniMax M2.7。

3. **[#8818](https://github.com/earendil-works/pi/pull/8818)** 无工具时省略 Responses `tool_choice`（CLOSED）  
   修复 compaction 期间的 xAI 400；对应 issue [#8820](https://github.com/earendil-works/pi/issues/8820)。

4. **[#8725](https://github.com/earendil-works/pi/pull/8725)** 内存 fork 前先 settle 当前 turn（CLOSED）  
   避免发出的 `toolResult` / `dispose()` 落到替换后的 session 上。

5. **[#8297](https://github.com/earendil-works/pi/pull/8297)** 恢复上下文时排除已被取代的重试尝试（CLOSED）  
   失败重试仍留在 JSONL/UI 里，但不进入 provider 上下文、compaction 和 token 预算。

6. **[#8812](https://github.com/earendil-works/pi/pull/8812)** 在模型解析前先 flush 扩展的 provider 注册（CLOSED）  
   避免首轮选模型时忽略扩展加载期间注册的 provider。

7. **[#8805](https://github.com/earendil-works/pi/pull/8805)** 窄终端上自适应截断而非崩溃（CLOSED）  
   渲染行过宽时不再硬抛；直接关联 [#8847](https://github.com/earendil-works/pi/issues/8847)。

8. **[#8811](https://github.com/earendil-works/pi/pull/8811)** startup composer（CLOSED）  
   启动阶段即可输入，并把状态带进交互模式，含 trust/selection 对话框。

9. **[#8828](https://github.com/earendil-works/pi/pull/8828)** 检测 Zed 终端能力（OPEN）  
   将 Zed 的 Alacritty 内核视为支持超链接 + truecolor、不支持图片；并记录默认 Pi 快捷键。

10. **[#8262](https://github.com/earendil-works/pi/pull/8262)** 在每条 turn-start 路径上派发 hooks（OPEN）  
    `sendCustomMessage(triggerTurn: true)` 目前会跳过 `input` / `before_agent_start`。可取消的 preflight 需要它。

仍在推进：TUI 打磨簇 [#8800](https://github.com/earendil-works/pi/pull/8800) / [#8799](https://github.com/earendil-works/pi/pull/8799) / [#8801](https://github.com/earendil-works/pi/pull/8801) / [#8678](https://github.com/earendil-works/pi/pull/8678)；Bedrock Mantle [#8572](https://github.com/earendil-works/pi/pull/8572)；pnpm/jiti realpath [#8112](https://github.com/earendil-works/pi/pull/8112)；artifact 校验门禁 [#8795](https://github.com/earendil-works/pi/pull/8795)。

## 5. 热门讨论
### Ideas
- **[#1637](https://github.com/earendil-works/pi/discussions/1637)** 给 Pi 的 harness 做基准（31 👍）——团队换内部实现前，希望和 Codex CLI、Claude Agent SDK 正面对比。
- **[#6646](https://github.com/earendil-works/pi/discussions/6646)** Pi vs OpenCode vs Codex：token、cache、MCP 与成本 —— 要具体开销对比，不只是 hello-prompt 体积。
- **[#4445](https://github.com/earendil-works/pi/discussions/4445)** 改 system prompt —— 覆盖后的 prompt 仍应收到注入的工具列表和其他动态来源。

### Show and tell
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** 最爱的 plugins / extensions（14 条评论，8 👍）——大家实际在跑什么的活目录。
- **[#1558](https://github.com/earendil-works/pi/discussions/1558)** CursorAI Agent CLI 自定义 provider —— 已发布 `@netandreus/pi-cursor-provider`。
- **[#8803](https://github.com/earendil-works/pi/discussions/8803)** pi-verdict —— 零依赖的 allow/ask/deny 门，贴合 README「不要权限弹窗；自己做」的立场。
- **[#5951](https://github.com/earendil-works/pi/discussions/5951)** Thanks —— 情绪与多场景可用性的感谢帖。

### Q&A
- **[#8729](https://github.com/earendil-works/pi/discussions/8729)** 为什么 agent 团队爱 npm —— Node 18 vs 22/24 加上 nvm/fnm，一切换版本 CLI 就消失。
- **[#8563](https://github.com/earendil-works/pi/discussions/8563)** 本地 llama-server API key —— 无密钥的本地 OpenAI 兼容服务，上手摩擦大。

## 6. 功能请求趋势
- **更多内置 provider**：Tencent Token Plan、Command Code、DeepSeek `/responses`、Bedrock Mantle、Cursor 自定义 provider。
- **真正的多模态 I/O**：`prompt` 上的视频/音频、从 tool results 把图片 hoist 到 Bedrock/OpenAI、LM Studio 图片路径、DeepSeek V4 Flash Vision。
- **会话隔离与生命周期**：`--profile`、惰性 JSONL resume、fork/retry 上下文卫生、扩展 reload/`session_start` 正确性。
- **宿主/扩展 API**：UI prompt 事件、skill 可见性/命名空间、footer 状态打包、turn-start hooks、artifact 校验门禁、权限扩展（pi-verdict）。
- **TUI/Web 对等**：web GUI、Zed 能力、搜索/spinner/滚动条打磨、可选 prompt 编辑、能力覆盖。
- **Windows 原生执行**：需要 PowerShell tool，但还要把 stderr/退出码和控制台窗口做对。

## 7. 开发者痛点
- **TUI 布局很脆**：一字一行流式、thinking 尾部换行、markdown 软换行 vs 硬换行、`NO_COLOR` 的 SGR 泄漏、窄终端 footer 溢出崩溃。
- **长会话很疼**：macOS CPU 空转、首次 prompt 前完整解析 JSONL、上下文预算不预留输出 token，导致 compact-retry 循环失败。
- **Provider 契约漂移**：xAI `tool_choice` 400、Venice reasoning 回显退化、Codex 在宣称 TTL 内 cache miss、Bedrock 图片位置、OAuth token 交换忽略 `HTTP_PROXY`。
- **0.84.3 之后 Windows 仍是二等公民**：PowerShell NativeCommandError、conhost 闪烁、system-prompt 路径反斜杠未规范化，把小型本地模型搞糊涂。
- **上手缺口**：README 没有安装章节、本地服务硬要 API key、Node 版本管理器弄丢全局 CLI、没有 profile 时项目/个人状态混在一起。
- **扩展 SDK 棱角**：spread 拷贝丢掉 class UI 上的原型方法；绑定为空时 `reload()` 跳过替换生命周期；provider 注册赶不上初次模型解析。

---

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

我将拉取最新的 Qwen Code GitHub 动态，以便摘要反映当前的发布、Issue 和 PR。
# Qwen Code Community Digest — 2026-08-30

Repo: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)（约 27.5k stars）。数据窗口为所提供的最近 24 小时 GitHub 活动。

## 1. 本周亮点

0.22.x 系列发布节奏很快：**v0.22.3** 已落地，带来 Channels 中按所有者作用域的命名会话（每个聊天最多八个持久任务），以及更安全的 daemon Extension 安装；**v0.22.2** 将持久 Node REPL 拆成独立 MCP 服务器（破坏性变更）。工作集中在 Web Shell / daemon 加固（受信任的 loopback API、运行时模型热重载、脏工作树 git 更新）、评审流水线自动化，以及夜间构建失败（`v0.22.3-nightly.20260830`）之后的 CI 可靠性。

## 2. 发布

| Version | Notes |
|---|---|
| [**v0.22.3**](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.3) | Channels 中的命名会话（[#10198](https://github.com/QwenLM/qwen-code/pull/10198)）；daemon Extension 安装仅接受**绝对**本地路径。 |
| [**v0.22.3-nightly.20260829.e5cb60ad48**](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.3-nightly.20260829.e5cb60ad48) | Web Shell 在分支选择器旁显示 git 状态提示（[#10397](https://github.com/QwenLM/qwen-code/pull/10397)）；评审 “St…” 产出工作（说明被截断）。 |
| [**v0.22.2**](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.2) | **破坏性变更：** Node REPL 以独立 MCP 服务器形式提供（[#9499](https://github.com/QwenLM/qwen-code/pull/9499) by @LaZzyMan）。 |
| [**v0.22.2-nightly / preview.1**](https://github.com/QwenLM/qwen-code/releases) | Web Shell 中的 session-diff 恢复；DingTalk 富文本保留；continuation-prompt 契约（[#9834](https://github.com/QwenLM/qwen-code/pull/9834)）。 |
| [**desktop-v0.2.2**](https://github.com/QwenLM/qwen-code/releases) | Desktop 跟踪相同的 goal/continuation 以及核心 auth-gate 工作。 |
| [**cua-driver-rs-v0.20.1 / v0.20.2**](https://github.com/QwenLM/qwen-code/releases) | 预构建 CUA 二进制（macOS 已公证的 universal + app；Linux/Windows 未签名 x86_64+arm64）。 |

随后的 nightly 标签 `v0.22.3-nightly.20260830.413b6d15d3` 在 CI 中**失败**（`integration_none`）——见 [#10535](https://github.com/QwenLM/qwen-code/issues/10535)。

## 3. 热点 Issue

最近 24 小时内仅有 **五个** Issue 被更新。以下全部列出。

1. **[#10535](https://github.com/QwenLM/qwen-code/issues/10535)** — *Release Failed for v0.22.3-nightly.20260830*（OPEN，bot）  
   Nightly 发布任务失败（`integration_none`）。阻塞了 0.22.3 nightly 列车；该运行上已有两条评论。

2. **[#7167](https://github.com/QwenLM/qwen-code/issues/7167)** — *Fleet Shepherd Dashboard*（OPEN，need-info / CI-CD）  
   为 agent PR 自动维护的车队状态（#10532 上检查正在进行）。自审/自动修复循环的运维心跳。

3. **[#10401](https://github.com/QwenLM/qwen-code/issues/10401)** — *Trust tokenless loopback for full operator API*（CLOSED）  
   `qwen serve` 将无 token 的 loopback 与 operator 路由上的 401 混用。在对应 PR 合并后关闭；这是本地 daemon 的鉴权模型讨论。

4. **[#10184](https://github.com/QwenLM/qwen-code/issues/10184)** — *Runtime-added model cannot be set current until restart*（CLOSED）  
   Web Shell “+ Add model” 列出了该模型，但 `POST /session/:id/model` 在 daemon 重启前会拒绝。随热重载工作一并关闭。

5. **[#10549](https://github.com/QwenLM/qwen-code/issues/10549)** — *Deferred review findings from PR #10347*（OPEN）  
   Autofix 将 network-EOF 重试 PR 中超出范围的评审项暂存。供维护者 / ready-for-agent 的跟进队列。

本窗口社区反应稀少（五个 Issue 均为 0 👍；评论 0–3 条）。信号是**运维 + daemon 正确性**，而非面向用户的功能争论。

## 4. 关键 PR 进展

1. **[#10403](https://github.com/QwenLM/qwen-code/pull/10403)** *（CLOSED）* — 绑定到 loopback 时提供受信任 loopback 的完整 operator API，无需 bearer，无需 `--require-auth`。关闭 #10401 的鉴权不一致。

2. **[#10269](https://github.com/QwenLM/qwen-code/pull/10269)** *（CLOSED）* — 热重载运行时模型提供者，使 ACP 子进程无需完整 daemon 重启即可感知增删。与 #10184 配对。

3. **[#10116](https://github.com/QwenLM/qwen-code/pull/10116)** *（CLOSED）* — 当 `synchronize` 仅刷新 base 时跳过自动评审轮次。减少浪费的评审算力。

4. **[#10542](https://github.com/QwenLM/qwen-code/pull/10542)** — 保持跨会话 peer inbox 可达，并暴露失败而非静默失败（传输层加固，#8724 步骤 4a）。

5. **[#10390](https://github.com/QwenLM/qwen-code/pull/10390)** — Web Shell “Update Project” 不再在脏工作树上走进死胡同；分支选择器提供解决面板。

6. **[#10283](https://github.com/QwenLM/qwen-code/pull/10283)** — 通过 `general.outputStyle` 或 `--output-style` 选择输出风格（`Concise` / `Proactive` / `Explanatory`，大小写不敏感）。#9565 风格的首个面向用户的控制项。

7. **[#10427](https://github.com/QwenLM/qwen-code/pull/10427)** — 关闭四个 hook 信任边界漏洞（HTTP 重定向、仓库控制的配置 → exec/egress）。在当前 main 上重开 #8396。

8. **[#10543](https://github.com/QwenLM/qwen-code/pull/10543)** — 用 `model.goalTokenBudget` 设定或禁用来自 #9891 的自主 Goal 消耗窗口。

9. **[#10221](https://github.com/QwenLM/qwen-code/pull/10221)** — 根据 #9655 事后分析增加 prose-execution + counter-frame 评审审计（替代 #9717）。

10. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347)** — 将包装后的 network EOF / peer-close 4xx 视为可重试的传输错误，使有界自动重试在无法使用 Ctrl+Y 的场景（channels/daemon）生效。延迟处理的剩余项跟踪于 #10549。

值得一提的 CI/UX：[#10517](https://github.com/QwenLM/qwen-code/pull/10517)（`npm ci` 期间的磁盘采样），[#10548](https://github.com/QwenLM/qwen-code/pull/10548)（ECS updater 跳过产品测试），[#10500](https://github.com/QwenLM/qwen-code/pull/10500)（短对话保留启动横幅），[#10423](https://github.com/QwenLM/qwen-code/pull/10423)（在 agent 运行前预构建评审 worktree）。

## 5. 热点讨论

从略 — 本窗口未提供 Discussions 数据。

## 6. 功能请求趋势

来自本切片中的 Issue + PR 标题：

- **Daemon 作为一等产品**：无 token 但受信任的 loopback、运行时模型/提供者同步、独立的 Web Shell 会话 UI（[#10514](https://github.com/QwenLM/qwen-code/pull/10514) PR6 计划）。
- **会话生命周期控制**：命名持久任务（#10198）、`sessionRotation` 边界（[#8927](https://github.com/QwenLM/qwen-code/pull/8927)）、Goal token 预算。
- **评审系统产品化**：额外审计镜头、感知线程的 finding 回复（[#9940](https://github.com/QwenLM/qwen-code/pull/9940)）、预构建、base 刷新时跳过。
- **Web Shell 中的 Git / worktree UX**：脏工作树更新路径、可选 worktree（[#10226](https://github.com/QwenLM/qwen-code/pull/10226)）、git 状态提示。
- **可由运维调节的 agent 行为**：输出风格、Goal 消耗上限、hook 安全默认值。

## 7. 开发者痛点

- **Daemon 重启税** — 在 Web Shell 中添加模型后直到重启才能被选中（#10184）；运维希望对提供者/模型进行实时变更。
- **鉴权语义容易搞错** — 无 token loopback 与严格的 operator 路由（#10401）给本地 `qwen serve` 造成了脑裂。
- **脆弱的 CI / 发布路径** — nightly 20260830 失败；正在对 `npm ci` 期间的磁盘压力做埋点（#10517）；仅基础设施的 PR 上产品测试过跑（#10548）。
- **hook 中的信任边界** — 仓库控制的配置仍可触及 exec/网络；#10427 是一次安全敏感的重开。
- **静默传输失败** — peer inbox 以及包装了 EOF 的 4xx 以关闭方式失败，没有重试路径或用户可见原因（#10542、#10347）。
- **异常机器上的 CLI 健壮性** — 不可写的全局配置目录导致启动崩溃（#10455）；短对话吞掉了横幅（#10500）；VP 模式在输入框上方留出空隙（#9305）。
- **评审算力浪费** — 仅刷新 base 的 synchronize 以及过晚的 worktree 构建烧掉了 agent 轮次；流水线正在加门控并预构建。

---

*根据所提供的 2026-08-30 24 小时 GitHub 快照生成。未包含讨论区。源材料中若干发布说明与 PR 正文被截断；将这些条目视为方向性信息，而非完整 changelog。*

</details>