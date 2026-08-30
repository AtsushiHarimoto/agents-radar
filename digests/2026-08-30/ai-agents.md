# OpenClaw 生态周报 2026-08-30

> Issues: 148 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-08-30 07:55 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

我将拉取实时的 OpenClaw 仓库、发行说明以及最热门的 issues/PRs，以确保这份摘要准确，而不是只依赖被截断的快照。快照中的发行说明是截断的；接下来我会获取 GitHub releases 和 changelog。
# OpenClaw Project Digest — 2026-08-30

**Repo:** [openclaw/openclaw](https://github.com/openclaw/openclaw)  
**定位：** 自托管的个人/团队 AI 助手网关——把模型、工具和消息渠道收拢到同一套本地控制平面之后。  
**规模（截至 2026-08-30）：** 约 388k stars、约 81.5k forks、约 23.4k 组织 followers。今日已更新。

---

## 1. 本周总览

OpenClaw 正处于高速可靠性攻坚阶段，而不是从零铺功能的阶段。仅过去 24 小时，追踪器就流动了 **148 个 issues**（仍有 127 个开放/活跃，21 个已关闭）以及 **500 个 PRs**（仍有 349 个开放，151 个已合并或关闭），并落地两个 beta 标签：`v2026.8.1-beta.3`（24 Aug）和 `v2026.9.1-beta.1`（28 Aug）。这样的体量，再加上几乎给每张工单打标签的 ClawSweeper 分诊机器人，说明项目已经超出“随手审一眼”的规模，正在跑一套工业化的进件流水线。

产品表面已经很宽（Gateway、Control UI、Codex runtime、Telegram/WhatsApp/Feishu/LINE/Teams/Discord、plugins、Swarm/subagents、memory）。真正卡住的痛点更窄：**内部已经跑完、却永远到不了终端用户可见回复的回合**、**跨重启/压缩/鉴权边界失步的会话状态**，以及 **丢掉回执或把通道卡死的渠道适配器**。维护者（尤其是 @steipete）正在这些路径上交付大块、定向的修复，与此同时社区 PR 仍在排队等审。

健康度解读：社区能量和贡献者深度都很好；真正的硬约束仍然是“智能体在 Telegram/WhatsApp 上能回我”的运行可靠性。这种错位，就是本周的主线。

---

## 2. Releases

两个新的预发布版本。两套说明里都没有 breaking-change 小节。最新稳定线仍是 2026.7.1-x / 2026.6.34 家族；2026.8/9 仍处于 beta。

### [v2026.9.1-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.9.1-beta.1) — 28 Aug 2026

重点：**扛住 Gateway 重启，并让进行中的工作保持可见。**

- **Gateway 重启恢复** — 已准入的回合能熬过反复的 Gateway 重启，沿 checkpoint 继续，并仍能交付最终响应（[#130491](https://github.com/openclaw/openclaw/pull/130491)，@jalehman）。
- **配置写入可靠性** — 已提交的配置写入在 watcher 交接期间保持 pending，避免 `config.patch` 在热重载中途失败（[#131515](https://github.com/openclaw/openclaw/pull/131515)，修复 [#131405](https://github.com/openclaw/openclaw/issues/131405)）。
- **Codex managed runtime 0.150.1** 覆盖 Linux/macOS/Windows（[#130685](https://github.com/openclaw/openclaw/pull/130685)，@vincentkoc）。
- **Linux installer** 钉死 Node 24 LTS / NodeSource，避免 RPM 安装误选不兼容的 Node 预发布版（[#130369](https://github.com/openclaw/openclaw/pull/130369)）。
- **Worker 恢复** — 重新武装 admission-deadline 启动、把已死 worker 的回合收成终态、推迟残骸清理（[#130446](https://github.com/openclaw/openclaw/pull/130446)）。
- Control UI：重叠文件保存更安全（[#130468](https://github.com/openclaw/openclaw/pull/130468)）；模型发现能扛住插件激活（[#130481](https://github.com/openclaw/openclaw/pull/130481)）；外观偏好按 profile 隔离（[#130340](https://github.com/openclaw/openclaw/pull/130340)）。
- 另外：在真正的执行边界审计决策；可配置的模型选择作用域。

迁移：未声明。npm：`openclaw@2026.9.1-beta.1`。

### [v2026.8.1-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.3) — 24 Aug 2026

重点：**模型 + 首次运行 + 浏览器 + 生命周期。**

- 在 OpenClaw 与 Codex runtime 中接入 GPT-5.6 Sol / Terra / Luna / Ultra 推理。
- Control UI 首次运行会把已验证的模型配置延续到 Custodian，并可选接入渠道配置。
- 面向成对 Chrome 会话的 Puppeteer 兼容 CDP 中继。
- 显式的外部 Gateway 生命周期监管，带重启交接。
- 紧凑的 SQLite 备份/恢复。
- 渠道插件共享的持久化入站监视器。

此前的 8.1-beta.2（15 Aug）已经加入密钥出站主机绑定、渠道入站监视器、SQLite 快照、macOS 应用 profile，以及插件来源告警。8.x/9.x 这条线是叠在 7.2-beta 更大产品表面（session rewind/branch、MCP Apps、Talk/meetings、Wear OS）之上的可靠性 + 运维工具列车。

---

## 3. 项目进展

这 24 小时窗口关闭了 **21 个 issues** 和 **151 个 PRs**。这是大型产品组织量级的合并吞吐，不是典型开源周末的节奏。

**真正在往前走的部分（来自已合并/关闭项 + 维护者就绪 PR）：**

| 主题 | 证据 |
|---|---|
| 重启安全的运行与 Gateway 生命周期 | 已随 9.1-beta.1 交付；后续 PR [#133178](https://github.com/openclaw/openclaw/pull/133178)（重试失败的 observer 准备）、[#130706](https://github.com/openclaw/openclaw/pull/130706)（多 workspace 下 Gateway 卡住） |
| 渠道投递正确性 | [#126818](https://github.com/openclaw/openclaw/pull/126818) 应答后释放被拒绝的 webhook；[#132136](https://github.com/openclaw/openclaw/pull/132136) LINE 多图并入同一回合；[#133103](https://github.com/openclaw/openclaw/pull/133103) 空 HTML → Markdown 垃圾；[#125190](https://github.com/openclaw/openclaw/pull/125190) Telegram 插件审批留在 topic 内 |
| Agent/Swarm 生命周期 | [#133076](https://github.com/openclaw/openclaw/pull/133076) 随父级停止 Swarm collectors；[#129729](https://github.com/openclaw/openclaw/pull/129729) settle 后请求方继续 |
| Control UI / 运维体验 | [#133052](https://github.com/openclaw/openclaw/pull/133052) 大批量附件；[#123535](https://github.com/openclaw/openclaw/pull/123535) session catalog 刷新风暴（已关闭）；[#133117](https://github.com/openclaw/openclaw/issues/133117) 丢麦后的浏览器语音（已关闭） |
| Plugins / 安装完整性 | [#103398](https://github.com/openclaw/openclaw/pull/103398) 拒绝空壳插件安装 |
| 可观测性 / 成本 | [#132453](https://github.com/openclaw/openclaw/pull/132453) + [#132454](https://github.com/openclaw/openclaw/pull/132454) 按账号的 provider 用量 |

本窗口内对运维真正有意义的关闭项：

- [#93917](https://github.com/openclaw/openclaw/issues/93917) — `genericRepeat` 熔断器在执行结果略有差异时从不触发（存在崩溃循环风险）。
- [#119884](https://github.com/openclaw/openclaw/issues/119884) — 会话库迁移跳过 `ANALYZE` → 大库上会话操作 15s，事件循环饥饿 30–57s。
- [#111358](https://github.com/openclaw/openclaw/issues/111358) — 目标没有渠道绑定时，`sessions_send` 会静默投递成 webchat。
- [#121958](https://github.com/openclaw/openclaw/issues/121958) — correction-release 容器内嵌了基础版本，并永久显示“有可用更新”横幅。
- [#118667](https://github.com/openclaw/openclaw/issues/118667) — 过严的 `ModelCompatSchema` 拒绝了合法的兼容键。

净效果：合并队列偏向 **投递、重启、会话库和 UI 风暴** 修复。功能类 PR（dashboard 重绘、Teams 多 bot、按账号用量 UI）也在动，但在维护者注意力上排在可靠性 PR 之后。

---

## 4. 社区热点

按所提供 24h 集合中的评论活跃度排序。

1. **[Issue #48788](https://github.com/openclaw/openclaw/issues/48788)** — 19 条评论 — 为 Feishu 以及每一个渠道适配器统一 `Content-Disposition` 的文件名编码（UTF-8 / Shift-JIS / EUC-KR / GB18030）。诉求：把东亚文件名正确性做成平台原语，而不是单渠道补丁。

2. **[Issue #102175](https://github.com/openclaw/openclaw/issues/102175)** — 18 条评论 — 内嵌 prompt cache 会在 room-event、policy 和 Responses 边界上断裂。诉求：缓存复用必须熬过真实会话生命周期，而不是只覆盖快乐路径的连续回合。已打上 security/auth-provider 影响标签。

3. **[Issue #87744](https://github.com/openclaw/openclaw/issues/87744)** — 17 条评论，4 👍 — 自 2026.5.27 起，Codex 驱动的 Telegram 回合会在等待 `turn/completed` 时超时。诉求：需要一个与已经完成的工作对齐的终态事件。这是“智能体干完了，用户却一片沉默”的典型工单。

4. **[Issue #96834](https://github.com/openclaw/openclaw/issues/96834)** — 14 条评论 — WhatsApp 1:1 入站图片会把主通道卡住约 3 分钟才开始处理。诉求：多模态入站不能饿死回复通道。

5. **[Issue #87561](https://github.com/openclaw/openclaw/issues/87561)** — 12 条评论 — 定义跨渠道的持久化 **最终回退投递语义**。诉求：只要运行时产出了经过清洗的回退内容，用户就必须看到 *点什么*。这是多条渠道缺陷背后的产品策略工单。

6. **[Issue #98435](https://github.com/openclaw/openclaw/issues/98435)** — 10 条评论 — Gateway 重启后 MCP loopback 不会自动重连；`recovered=1` 有误导性。

7. **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)** — 9 条评论 — hook/tool 子进程未被回收 → 僵尸进程与运行时劣化。

8. **[Issue #99586](https://github.com/openclaw/openclaw/issues/99586)** — 7 条评论，2 👍 — 触及 gateway 的操作之后，工具面返回空白正文，直到容器重启。

**底层诉求（一句话）：** 运维希望 Gateway 可以重启、压缩、鉴权、更换工具，*同时* 不丢掉用户的最后一条消息、模型的缓存，或渠道的投递回执。

信号最强的元工单：**[#90974](https://github.com/openclaw/openclaw/issues/90974)**（“Stop shipping features. Start shipping a product that works.”）——只有 3 条评论 / 2 👍，但点名的正是高评论缺陷所描述的同一簇问题。

与这些主题对得上、已就绪给维护者的 PR：[#130706](https://github.com/openclaw/openclaw/pull/130706)、[#133076](https://github.com/openclaw/openclaw/pull/133076)、[#133052](https://github.com/openclaw/openclaw/pull/133052)、[#126818](https://github.com/openclaw/openclaw/pull/126818)。

---

## 5. 缺陷与稳定性

按严重度排序，依据标签（`impact:message-loss`、`impact:crash-loop`、`impact:session-state`、`impact:security`）再叠加评论热度。许多带着 `clawsweeper:no-new-fix-pr`——已报告，尚未认领。

### P0 / P1 — 消息丢失、卡死、崩溃循环

| Issue | 问题 | 修复 PR？ |
|---|---|---|
| [#87744](https://github.com/openclaw/openclaw/issues/87744) P1 | Codex Telegram 回合从不发出 `turn/completed` | 未见专门的新修复 PR |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) P1 | WhatsApp 图片把主通道卡住约 3 min | 需要线上复现 |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) P1 | 内部已产出回退/错误，用户看到的是沉默 | 产品决策仍开放 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) P1 | hook/tool 子进程未回收，僵尸进程 | needs-info |
| [#99586](https://github.com/openclaw/openclaw/issues/99586) P1 | 触及 gateway 的操作后工具面空白 | needs-info |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) P1 | Telegram 持久化更新在传输落定前被 tombstone | source-repro |
| [#133058](https://github.com/openclaw/openclaw/issues/133058) P1 *今日提交* | 已成功但投递失败的 subagent 任务从未浮出 | queueable-fix，形态清晰 |
| [#133170](https://github.com/openclaw/openclaw/issues/133170) P1 *今日* | `chat.abort` 从 transcript 丢掉已流式输出的部分内容 | queueable-fix |
| [#133166](https://github.com/openclaw/openclaw/issues/133166) P1 *今日* | 可重试的 Telegram 入站无限重试，堵住共享通道 | queueable-fix |
| [#42803](https://github.com/openclaw/openclaw/issues/42803) P1 | Feishu `/stop` `/new` `/status` 不再绕过队列（3.8 回归） | 已关联开放 PR |
| [#128637](https://github.com/openclaw/openclaw/issues/128637) P1 | 多 agent 在 ambient 操作上出现 `AgentSelectionRequiredError` | source-repro |
| [#122073](https://github.com/openclaw/openclaw/issues/122073) P1 | WhatsApp 群组 `@LID` 提及从不解析 | bulk-filed |
| [#111496](https://github.com/openclaw/openclaw/issues/111496) P1 | Workboard 清理可能删掉已声明的本地产物（`impact:data-loss`） | 已关联开放 PR |

### P1/P2 — 会话状态 / 安全 / 缓存

| Issue | 问题 | 备注 |
|---|---|---|
| [#102175](https://github.com/openclaw/openclaw/issues/102175) P2 | 内嵌 prompt cache 在 room-event / policy / Responses 边界断裂 | `impact:security`，`impact:auth-provider`，需要安全评审 |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) P2 | Gateway 重启后 MCP loopback 未重新握手 | `recovered=1` 在说谎 |
| [#88077](https://github.com/openclaw/openclaw/issues/88077) P2 | Active Memory 召回使用完整 OpenClaw prompt 信封（约 30k） | 已关联 PR |
| [#125139](https://github.com/openclaw/openclaw/issues/125139) P2 | memory-wiki 的 unsafe-local 会重新导入自己的 vault | 已关联 PR |
| [#133051](https://github.com/openclaw/openclaw/issues/133051) P2 *今日* | Telegram 投递成功；缺失回执把 Control UI 会话标成失败 | — |
| [#133171](https://github.com/openclaw/openclaw/issues/133171) P2 *今日* | Session observer 在不可持久化会话上对 utility model 重复计费 | queueable-fix |

### P2 性能 / 最终会变成稳定性的体验问题

- [#84037](https://github.com/openclaw/openclaw/issues/84037) — Codex app-server 稳态 CPU + helper 进程开销。
- [#125360](https://github.com/openclaw/openclaw/issues/125360) — 插件关闭时，Codex Computer Use 仍轮询 `plugin/list` 达 60s。
- [#125312](https://github.com/openclaw/openclaw/issues/125312) — `terminal read` 每次轮询都倾倒完整缓冲区；自动化无法在一次调用里等待/检查。
- [#128875](https://github.com/openclaw/openclaw/issues/128875) — WhatsApp 蓝勾只在智能体回复后出现，而不是在回执时。

**模式：** 2026-08-30 的新缺陷（[#133058](https://github.com/openclaw/openclaw/issues/133058)、[#133166](https://github.com/openclaw/openclaw/issues/133166)、[#133170](https://github.com/openclaw/openclaw/issues/133170)、[#133051](https://github.com/openclaw/openclaw/issues/133051)）更锋利，并且已经打上 `fix-shape-clear` / `queueable-fix`。5–7 月的老 P1 仍停在 `needs-maintainer-review` + `needs-product-decision`。进件速度快于最老那批投递缺陷的闭环。

---

## 6. 功能请求与路线信号

VISION.md 已经把 **安全、缺陷修复、安装可靠性** 排在新表面之上。本周社区请求大多在强化这一点，只有少数产品押注。

**较可能近端落地（形态清晰，或已进入 8.1/9.1 betas）：**

- 持久化最终回退投递语义 — [#87561](https://github.com/openclaw/openclaw/issues/87561)
- 沉默看门狗 + 投递确认 — [#47591](https://github.com/openclaw/openclaw/issues/47591)
- Telegram 默认出站 topic/thread 绑定 — [#53890](https://github.com/openclaw/openclaw/issues/53890)
- Feishu 提及规则按 topic vs group 拆分 — [#76010](https://github.com/openclaw/openclaw/issues/76010)
- Telegram 进度行裁剪 — PR [#132530](https://github.com/openclaw/openclaw/pull/132530)
- API + UI 中的按账号 provider 用量 — PRs [#132453](https://github.com/openclaw/openclaw/pull/132453)、[#132454](https://github.com/openclaw/openclaw/pull/132454)
- 把 CDP / Browser Use 做成一等公民路径 — issue [#53763](https://github.com/openclaw/openclaw/issues/53763)，文档 PR [#124188](https://github.com/openclaw/openclaw/pull/124188)；8.1-beta.3 已加入 Puppeteer 兼容 CDP 中继
- Control UI dashboard 现代化 — [#111965](https://github.com/openclaw/openclaw/pull/111965)
- Teams 多 bot 账号 — [#112811](https://github.com/openclaw/openclaw/pull/112811)
- 模型请求限流 — [#129366](https://github.com/openclaw/openclaw/issues/129366)
- WebChat 会话管理 / 多 AI 协作 — [#27526](https://github.com/openclaw/openclaw/issues/27526)（2 月起开放，仍是 P3）

**预测下一个打标版本（9.1.x 或 8.1 stable）会优先：** 重启安全的回合（已在 9.1-beta.1）、Swarm 父/子停止、附件批量 UI、webhook 连接释放、Telegram 回执/审批/topic 修复，以及按账号用量——而不是 WebChat 重设计或捆绑 Chromium。

**若没有产品决策，下一轮不太可能落地：** 集中式多编码文件名工具（[#48788](https://github.com/openclaw/openclaw/issues/48788)）、全局模型限流器、“停止发功能”的范围冻结。

---

## 7. 用户反馈摘要

**人们拿 OpenClaw 做什么（从工单推断）：** 在笔记本或小型服务器上常驻一套 Gateway，从 Telegram / WhatsApp / Feishu / LINE 对话，常常配 Codex 作为编码运行时，再加上 plugins、cron/subagents，以及用于运维的 Control UI。多 agent、多 workspace 部署已不再是边角案例。

**痛点，用用户自己的话说：**

- “模型把活干完了；Telegram 始终没等到 `turn/completed`。”
- “我在 WhatsApp 发了一张图，等了三分钟才开始动。”
- “Gateway 重启了，UI 说 recovered，Claude Code MCP 已经死了。”
- “我改完配置 / 重启了 HA / SSH 进了 guest 之后，每个工具都返回空白正文。”
- “Feishu 的 `/stop` 排在当前这次运行后面。”
- “智能体回了，但 WhatsApp 蓝勾要到那时才出现——看起来像个机器人。”
- “你们一直在加 Parallel search / Matrix voice / 插件包。我需要的是智能体能回答。”（[#90974](https://github.com/openclaw/openclaw/issues/90974)）

**满意信号：**

- 贡献者仍在缺陷当天就送来高质量、带源码复现的 PR（30 Aug 那一簇）。
- 东亚渠道用户（Feishu、LINE、Telegram topics、CJK 文件名）投入到足以设计平台级修复，而不只是一次性补丁。
- Beta 采用是真的：工单会精确引用 2026.5.27、2026.6.10、2026.7.1、2026.7.2-beta.7。

**不满针对的是信任，而不是缺功能。** 投递语义、重启诚实性，以及通道公平性，才是声誉风险。

---

## 8. 积压观察

这些已经开放足够久，或标签含义就是：没有维护者/产品负责人就不会动。

**需要产品决策（而不只是补丁）：**

- [#87561](https://github.com/openclaw/openclaw/issues/87561) — 持久化最终回退投递（May 28，P1，12 条评论）
- [#48788](https://github.com/openclaw/openclaw/issues/48788) — 集中式文件名编码（Mar 17，19 条评论）
- [#53890](https://github.com/openclaw/openclaw/issues/53890) — Telegram 默认出站 topic（Mar 24）
- [#76010](https://github.com/openclaw/openclaw/issues/76010) — Feishu 提及按 topic vs group 拆分（May 2）
- [#47591](https://github.com/openclaw/openclaw/issues/47591) — 沉默看门狗 + 投递确认（Mar 15）
- [#53763](https://github.com/openclaw/openclaw/issues/53763) — 捆绑无头浏览器（Mar 24）
- [#90974](https://github.com/openclaw/openclaw/issues/90974) — “ship a product that works”（Jun 6）
- [#129366](https://github.com/openclaw/openclaw/issues/129366) — 模型限流（Aug 25）

**需要维护者评审 / 安全评审：**

- [#102175](https://github.com/openclaw/openclaw/issues/102175) — prompt-cache 边界断裂（Jul 8，安全标签）
- [#87744](https://github.com/openclaw/openclaw/issues/87744) — Telegram Codex 超时（May 28）
- [#96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp 图片通道卡死（Jun 25）
- [#42803](https://github.com/openclaw/openclaw/issues/42803) — Feishu 命令绕过回归（Mar 11）
- [#84037](https://github.com/openclaw/openclaw/issues/84037) — Codex CPU 开销（May 19）

**仍开放的老平台缺陷：**

- [#47273](https://github.com/openclaw/openclaw/issues/47273) — macOS 上跳过内存探测（Mar 15）
- [#41966](https://github.com/openclaw/openclaw/issues/41966) — markdown fence 内的 `MEDIA:` token 被忽略（Mar 10）
- [#27526](https://github.com/openclaw/openclaw/issues/27526) — WebChat 会话管理（Feb 26）

**会慢慢腐烂的内务：**

- [#114414](https://github.com/openclaw/openclaw/issues/114414) — 过期 TODO 清扫（doctor 弃用项自 2026-07-26 起逾期）

**卡在 ready/proof 队列里的大型 PR**（若腐烂，会拖住可靠性列车）：

- [#130706](https://github.com/openclaw/openclaw/pull/130706) XL — 多 workspace 时 Gateway 卡住（P1，ready）
- [#133052](https://github.com/openclaw/openclaw/pull/133052) XL — 大批量附件（P1，ready；需与未合并的 [#133067](https://github.com/openclaw/openclaw/pull/133067) session-identity 修复协同）
- [#133076](https://github.com/openclaw/openclaw/pull/133076) XL — 随父级停止 Swarm collectors（P1，ready）
- [#103398](https://github.com/openclaw/openclaw/pull/103398) XL — 拒绝空壳插件安装（P1，ready）
- [#126818](https://github.com/openclaw/openclaw/pull/126818) XL — 释放被拒绝的 webhook 连接（P1，ready）
- [#132136](https://github.com/openclaw/openclaw/pull/132136) XL — LINE 多图同一回合（P1，等待作者）
- [#112811](https://github.com/openclaw/openclaw/pull/112811) XL — Teams 多 bot（needs proof）
- [#115184](https://github.com/openclaw/openclaw/pull/115184) XL — 重置超时时 ACP 会话恢复（needs proof）

---

**一句话结论：** 以 star 数和每日 PR 量衡量，OpenClaw 已是最大的开源个人智能体代码库之一。8.1/9.1 betas 对准了正确的问题（重启、投递、worker 收口）。风险在流程，不在野心：349 个开放 PR，再加上一摞打着 `needs-product-decision` 的 5–7 月 P1 投递缺陷，会持续制造“智能体干完了，我什么都没看到”的报告——直到回退语义和渠道回执被当成同一份契约来对待，而不是按适配器各自打补丁。

---

## 横向生态对比

# 个人 AI 助手生态 — 跨项目对比  
**截至 2026-08-30** · 来源：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw 的社区摘要窗口

---

## 1. 生态总览

开源个人 Agent 技术栈已经走出「Agent 存不存在」的阶段。本窗口内的五个项目都是**常驻控制面**：本地或自托管网关、模型/运行时适配器、工具/MCP 表面，以及消息通道（Telegram、WhatsApp、飞书、Slack、Discord、LINE）。规模已不再是差异点 — OpenClaw（约 388k stars）与 Hermes（约 238k）已达到工业级进件量 — **交付是否诚实、重启语义、以及一轮对话的成本**才是。

就整体而言，2026-08-30 更像是**可靠性与边界周**，而不是从零铺功能的一周。OpenClaw 与 QwenPaw 仍在针对通道/会话缺陷发 beta；Hermes 正在滚动一个 patch 标签，并叠加一轮凭据保险库安全浪潮；IronClaw 刚切出稳定版 1.4.0，随即转向工具载荷投影；ZeroClaw 则处于冻结周收尾。共同的产品承诺是同一件事：*模型已经完成的工作必须到达用户、挺过重启，并且不能花到底层 API 四倍的钱。*

---

## 2. 活跃度对比

数据除非另注，均为**最近约 24 小时**。健康分是本窗口内的 1–10 运维就绪判断（发版节奏 × 严重度构成 × 约束瓶颈是否正在被处理）。

| Project | 24h issues | 24h PRs | Latest release | Stars / forks (digest) | Health |
|---|---:|---:|---|---|---|
| **OpenClaw** | 148 touched (21 closed / 127 still active) | **500** touched (151 merged-or-closed / 349 still open) | `v2026.9.1-beta.1` (28 Aug); `v2026.8.1-beta.3` (24 Aug). Stable still 2026.7.x | ~388k / ~81.5k | **6.5** — 吞吐无敌；P1「做完了 / 用户却一片安静」仍未关 |
| **Hermes Agent** | 5 bumped, **0 closed** | 50 touched (4 merged / 46 open) | **v0.20.6** (`v2026.8.27`, 27 Aug) patch rollup; v0.21.0 promised as curated notes | ~238k / ~48.5k | **7.5** — 给运维打了标签线；Windows / WAF / pin 契约落后于功能投放 |
| **IronClaw** | 14 touched (11 open) | 50 touched (**28 merged** / 22 open) | **1.4.0 stable** (27 Aug) from RC.1 (26 Aug); no migration | ~12.6k / ~1.5k | **8.0** — 干净切版 + 可度量追踪；经济循环风险仍在 |
| **QwenPaw** | 28 touched (12 closed / 16 open) | 50 touched (24 merged / 26 open) | Stable **v2.1.0** (13 Aug); five 2.2.0 / 2.1.1 **betas** this window | ~34.6k / ~3k | **6.5** — 2.2 叙事连贯（Hub + MCP 2026）；打包 TLS 与通道配置完整性滞后 |
| **ZeroClaw** | 9 touched (2 closed / 7 open) | 50 touched (6 merged / 44 open) | **v0.8.4** (2 Aug); **v0.8.5 freeze due today** (~70% closed: 462/657). No tag this weekend | ~32.7k | **7.0** — 冻结纪律还在；ZeroCode/本地运行时诚实度仍是用户可见缺口 |

**读表。** OpenClaw 在*进件量*上高一个数量级（500 PRs/天）。IronClaw 在本切片里*合并/进件*比最好（28/50）。Hermes 与 QwenPaw 是中等体量的产品组织，都有具名的下一叙事版本。ZeroClaw 刻意不再打开表面积。

---

## 3. OpenClaw 的位置

**相对同行的优势**

- **多通道个人/团队场景的默认控制面。** Gateway + Control UI + Codex runtime + Telegram/WhatsApp/飞书/LINE/Teams/Discord + Swarm/子 Agent，是本集合里*已上线*表面最宽的。
- **工业级社区深度。** 约 388k stars、约 81.5k forks、ClawSweeper 分诊、一天关掉 151 个 PR — 更接近产品组织，而不是周末 OSS 仓库。
- **8.1 / 9.1 beta 对准的是正确问题**（重启安全的 turn、worker 结算、跨 watcher 交接的配置写入、共享入口监控），而不是再贴一个通道 logo。

**相对同行的技术路径**

- OpenClaw 是**以 Node 为中心的网关**，配托管 Codex runtime、插件来源证明、会话 DB，以及按通道适配器。可靠性工作落在*路径级*（turn completed 事件、receipt/tombstone、车道公平）。
- Hermes 是**Python/桌面 + 网关**产品，强调供应商目录、浏览器/保险库信任边界，以及把 `hermes update` 当成日常仪式。
- IronClaw 是**Rust + WASM 沙箱 Agent OS**：隐私优先、持久 Docker 沙箱、通知收件箱 — 现在卡住的是*上下文投影*，不是通道数量。
- QwenPaw 是**AgentScope 2.0 产品**（国内通道、Hub 多租户、第三方 harness 含 Codex/Qoder，Claude Code「即将到来」）。
- ZeroClaw 是**偏策略的运行时**（Landlock、审计链、带风险标签的合并、ACP/ZeroCode），处于冻结期，v0.9 留给身份隔离。

**社区体量。** 按 stars 计，OpenClaw 约为 Hermes 的 1.6 倍，约为三个较小项目的 10–30 倍。这个规模本身也是风险：349 个未关 PR，以及 5–7 月仍标着 `needs-product-decision` 的 P1，意味着约束在*流程*，不在野心。IronClaw 的 12.6k-star 社区偏核心（带度量的生产追踪，几乎没有路过式帖子）。QwenPaw 与 ZeroClaw 同处 30k-star 档，但拉动的区域不同（国内团队/Hub vs 本地优先 + ZeroCode TUI）。

**一句话定位：** OpenClaw 是参考级*网关产品*；它还不是参考级*交付契约*。同行要么在成本上更克制（IronClaw），要么对密钥更直白（Hermes vault），要么更原生面向团队（QwenPaw Hub），要么冻结更诚实（ZeroClaw）。

---

## 4. 共同技术焦点

本周出现在**两个或以上**项目中的需求：

| Shared need | Who | Concrete form |
|---|---|---|
| **重启 / 重连诚实度** | OpenClaw, Hermes, QwenPaw | 网关重启必须保住已受理的 turn 与 MCP 回环（`recovered=1` 不许撒谎）；远端服务器重启后的 MCP Streamable-HTTP 会话恢复；用控制套接字暂停网关的更新器，而不是整棵进程树杀掉 |
| **「活干完了，用户却一片安静」** | OpenClaw, QwenPaw, ZeroClaw | 缺失 `turn/completed`、内部已产出 fallback 却未投递、飞书首条之后静音、终端事件丢失后 ZeroCode 面板卡在 `Processing` |
| **通道是产品，不是胶水** | OpenClaw, QwenPaw, Hermes, ZeroClaw | WhatsApp 图片楔死主车道；飞书 `/stop` 不再绕过队列；飞书配置被抹掉；钉钉在休眠/VPN 后流过期；WhatsApp 按联系人的工具白名单；跨 30+ 传输层统一 webhook 分发 |
| **工具 / MCP 载荷不得霸占上下文窗口** | IronClaw, QwenPaw, Hermes | 未投影的 Gmail MIME → 19.7s 推理；GitHub `list_repos` → 64 次调用 / 519 KB；MCP 倾倒物停成工作区产物；Hermes 现已默认 lean-tail 压缩 |
| **长会话 prompt / 缓存正确性** | OpenClaw, Hermes, IronClaw | 嵌入式 prompt cache 在 room-event/policy/Responses 之间断裂；系统提示必须在 compaction 提交时重建；PinchBench 全线程回放相对旧 shell 约 4× tokens |
| **本地 / 自定义供应商当作生产环境** | Hermes, ZeroClaw, QwenPaw | Ollama/GLM 的 stop→length 抢救循环；SDK User-Agent 触发 WAF 403；`local_small` 8k prompt 上限；自定义 OpenAI 兼容发现选择器先空后修 |
| **Windows / 打包运行时最后一公里** | Hermes, QwenPaw, ZeroClaw, OpenClaw | Cloud Files 注水、Desktop/shim 更新错位、OpenSSL 3.0 + 运营商 DPI、PowerShell `PSModulePath` 丢失、Linux 安装器钉死 Node 24 LTS |
| **密钥 / 信任边界** | Hermes, IronClaw, ZeroClaw, OpenClaw | 模型看不见的凭据保险库；沙箱出口代理，让密钥永不进入客代码；Landlock `allowed_roots`；运维级 skill 抽头；标了 `impact:security` 的 prompt-cache |
| **子 Agent / swarm 生命周期** | OpenClaw, IronClaw | 随父进程停收集器；孤儿愈合；已成功但投递失败的子任务必须浮出水面 |
| **运维成本 / 用量遥测** | OpenClaw, IronClaw, ZeroClaw | 按账户的供应商用量 API+UI；仅落在文件系统上的租户级 BI；成本汇总的周期算术 |

元需求写在 OpenClaw #90974 里，并且到处可见：**别再把 fallback、回执和重启当成按适配器打的补丁。它们是同一份契约。**

---

## 5. 差异化分析

| Axis | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Primary user** | 7×24 多通道网关的高阶运维（笔记本或小服务器） | 日常个人 + 家庭网关；Desktop 优先 | 本地 Docker 上隐私敏感的个人/工作 Agent | 国内团队 + 个人；飞书/钉钉/Telegram；即将面向 Hub 租户 | 本地优先运维；ZeroCode/ACP 作为全天表面 |
| **Feature bet this window** | 重启安全的 turn、通道回执、Swarm stop、用量 UI | 加密保险库填充且模型永远看不见；真实资料浏览；MCP 目录 ≥50 | 通知收件箱、后台子 Agent、持久沙箱 — 然后是**投影** | Hub 多租户、MCP 2026-07-28 双栈、第三方 harness（Codex/Qoder；Claude Code 即将） | 冻结：ZeroCode 挂起、ACP 会话可见性、审计轮转、`local_small` 预算 |
| **Architecture** | JS/Node 网关 + Codex 托管 runtime + 插件 + 会话 SQLite | Python agent + Desktop + 网关；可插拔终端；OS keychain | Rust Agent OS、WASM 沙箱、libSQL、Docker Exec | AgentScope 2.0；Tauri 桌面 / Docker；Console + Hub | 策略/运行时 + ZeroCode TUI + ACP；Landlock；风险门控合并 |
| **Coding runtime stance** | Codex 一等公民（也是 Telegram 超时工单的来源） | 供应商选择器（GLM-5.3-Flash、MiniMax、Ollama） | 有界循环内的扩展工具（Gmail、GitHub） | Harness 注册表；Plan Mode / `/btw` 被要求对齐 Claude Code | ACP Code 会话必须对会话工具可见 |
| **Security story** | 插件来源证明、密钥出口主机绑定，缓存/鉴权审查仍开着 | Vault + 按联系人的 WhatsApp 工具集 + 四眼看板 | 密钥经出口代理留在沙箱外；失败即关闭的输出所有权 | Hub 隔离仍在被证明；TLS 栈是当前破口 | 跨轮转的审计链；`risk:high` 需两名 Core Team 批准 |
| **What “done” means this month** | 重启/compaction/鉴权之后用户能看见回复 | `hermes update` 不弄坏 memory/Windows/WAF | 两封邮件或一次 list-repos 的 turn 花的是 API 量级 token，而不是 20s / $10 | Hub 上线时不抹飞书配置、不污染 Ark 历史 | v0.8.5 交出已就绪子集；身份隔离等到 v0.9 |

**架构一句话。** OpenClaw 与 QwenPaw 优化*表面积与通道*。Hermes 优化*运维仪式与密钥致盲*。IronClaw 优化*沙箱 + token 经济*。ZeroClaw 优化*策略与本地模型诚实度*。这是四个碰巧都接了 Telegram 的不同产品。

---

## 6. 社区动能与成熟度

**A 档 — 工业级进件（必须把评审专业化）**  
**OpenClaw。** 24 小时 148 issues + 500 PRs，是产品组织体量。成熟度*不均匀*：beta 对准了正确故障，但最老的 P1 投递缺陷仍停在 `needs-product-decision`。社区能量极好；信任是声誉风险。

**B 档 — 快速产品迭代，且有具名的下一版本**  
**Hermes**（v0.21.0 精选说明；六天内把 525 个 PR 滚进 0.20.6）与 **QwenPaw**（本窗口五个标签；Hub + MCP 2026 作为 2.2 叙事）。两者都有首次贡献者，以及当天合并的维护者。两者积累最后一公里债务（pin、TLS、WAF UA、通道持久化）的速度，快过发行说明能消化的速度。

**C 档 — 更小、更锋利、在发稳定版**  
**IronClaw。** 从 RC 到 1.4.0 两天，零迁移，通知史诗关掉。吞吐是核心团队密度，而不是 star 密度。成熟度信号：他们交的是带毫秒和 token 计数的追踪，不是表情包。

**D 档 — 冻结 / 稳住**  
**ZeroClaw。** 进件自 4 Aug 冻结；30 Aug 是收尾，不是发现。里程碑用语已经写明：交出已就绪子集，其余停放。这比若干更大仓库的流程更成熟。

**稳住 vs 继续迭代**

- 现在在稳住：ZeroClaw（明示）、IronClaw（1.4.0 之后的性能架构）、OpenClaw 8.x/9.x beta（在 7.2 表面之上开可靠性专列）。
- 仍在迭代产品叙事：Hermes vault + 长会话重建；QwenPaw Hub + harness。

---

## 7. 趋势信号

本周工单在说行业什么，以及 Agent 开发者该拿走什么。

1. **交付即产品。** 用户不会提「加 Matrix 语音」。他们提「Codex 跑完了；Telegram 从没收到 `turn/completed`」。终端事件 + 通道回执 + 可持久 fallback 现在是入场门槛。把它当成跨适配器的一份契约。

2. **重启是一等运行时事件。** 网关弹跳、MCP 远端重启、HA 补丁、SSH 客机、compaction 提交 — 全部必须重新握手工具并保住用户上一轮 turn。让 Claude-Code MCP 死掉的 `recovered=1`，比崩溃更糟。

3. **上下文是稀缺资源，不是日志。** IronClaw 的 19.7s Gmail turn 与 4× PinchBench 回退、QwenPaw 把巨型 MCP 行停成产物、Hermes 默认 lean-tail — 赢的设计是*投影 + 按引用取结果 + 有界 compaction*，而不是「把 REST body 倒进 prompt」。

4. **本地与代理模型就是生产环境。** 被 WAF 拦下的 SDK User-Agent、Ollama stop-reason 循环、`local_small` prompt 上限、自定义 OpenAI 兼容选择器。云 SDK 假设现在就是缺陷。

5. **信任正从「Agent 拿着我的密码」转向「模型永远看不见密码」。** Hermes vault-fill、IronClaw 沙箱出口代理、ZeroClaw Landlock + 审计链、OpenClaw 插件来源证明。预计这会在 2026 H2 变成买家问题。

6. **团队/多租户是个人助手的下一道分叉。** QwenPaw Hub、Hermes 按联系人工具集、OpenClaw 多工作区 Gateway 卡顿、ZeroClaw v0.9 按主体隔离。隔离缺陷（错 Agent 路由、配置被抹）将决定 Hub 是产品，还是多几个登录字段。

7. **打包运行时落后于用户所在的网络。** RPM 上的 Node 预发布、OpenSSL 3.0 vs 运营商 DPI、Windows Cloud Files、WebView2、PowerShell 模块路径。安装/更新/doctor 是 Agent 循环的一部分。

8. **流程现在是功能。** ClawSweeper、Hermes 四眼看板、ZeroClaw 双审批人 `risk:high` CI、IronClaw 失败即关闭的输出所有权测试。在这种 PR 体量下，未打标的进件*就是*故障。

**对在此栈上构建或与之竞争的开发者的价值**

- 先实现 **turn 生命周期**（admit → checkpoint → terminalize → deliver → ack），再加下一个通道。
- 每个供应商工具第一天就放一条**投影缝**；把原始 MIME/REST 塞进上下文，是一起等着被量出来的成本事故。
- 让 **update** 对 pin 安全、对重启诚实；日常驱动器能继续当日常驱动器，靠的是这个。
- 若面向东亚，文件名编码、飞书/钉钉/LINE 的话题语义、以及 CJK 投递是平台原语，不是插件。
- 若面向编码 Agent，harness 对等（先规划再行动、turn 中途转向、能看见 UI 所见的会话工具）才是用户拿你跟 Claude Code / Codex 比的东西 — 不是 star 数。

---

**给决策者的底线。** OpenClaw 是规模与表面积的领跑者，也是正确的核心参照 — 前提是你为交付契约工作预留预算，5–7 月那些 P1 表明这件事还没做完。若 vault + Windows 落地，Hermes 是最强的「我每天在桌面上跑这个」产品线。IronClaw 是该盯住的**token 经济与沙箱架构**。QwenPaw 是国内团队助手押注，闸门在 Hub 完整性与打包 TLS。ZeroClaw 是策略与本地运行时专家，冻结期间正确地拒绝加表面积。生态在 2026-08-30 的共识异常清晰：**功能很便宜；一轮能到达、能挺过重启、且不烧掉上下文窗口的 turn，才是稀缺资产。**

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

我会收集当前 Hermes Agent 仓库上下文并补全所提供快照中的缺口，使摘要准确。正在获取完整的 v0.20.6 说明以及若干高信号议题，以便摘要能准确排序缺陷与路线图信号。
# Hermes Agent 项目摘要 — 2026-08-30

数据窗口：GitHub 上 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) 过去 24 小时的活动，外加三天前落地的 **v0.20.6 (v2026.8.27)** 发行。摘要时仓库规模：约 238k stars / 约 48.5k forks。

---

## 1. 本周概览

Hermes Agent 仍是一个高节奏、维护者加社区共同推进的项目：8 月 27 日的一次 **补丁标签** 汇总了自 v0.20.5（8 月 21 日）以来约 **525 个已合并 PR / 约 1,313 次提交 / 约 1,557 个文件**，而 **8 月 30 日当天仍是洪峰日** —— 24 小时内触及 50 个 PR（46 个仍开放，4 个已合并/关闭），另有 5 个 issue 被顶起，全部仍开放。

这种组合是健康的而非混乱：打标签的线面向 Docker/托管/全新安装用户，而 `main` 继续吸收 Windows、Ollama/GLM、MCP 认证、memory-provider、gateway 以及安全边界方面的工作。项目姿态是「持续滚动汇总，迈向 **v0.21.0**」，该版本被明确承诺为第一份覆盖自 v0.20.0 以来全部内容的*精选*发行说明。24 小时 issue 集合中未见故障级事故；当前痛点是 **平台/提供商边界案例**（Windows Cloud Files、MCP OAuth 端口、WAF User-Agent 403、本地视觉路由），外加一轮进行中的大规模 **凭证保险库 / 信任边界** 功能浪潮。

---

## 2. 发布

**v0.20.6 (tag `v2026.8.27`)** — 由 teknium1 于 **27 Aug 2026** 发布。  
链接：[github.com/NousResearch/hermes-agent/releases/tag/v2026.8.27](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.27)

定位：**补丁 / 汇总**，而非功能大版本。存在的目的是让下游镜像和新安装不再漂在未标记的 `main` 上。官方说明将完整精选变更日志与贡献者致谢推迟到 **v0.21.0**；本窗口内没有任何内容被描述为已砍掉。

**0.20.5 → 0.20.6 窗口中的头条变更**

- 需同意后启用的 **真实配置文件浏览**（默认 Chromium profile 快照；Windows 关闭需批准）。
- Desktop Browser 使用 **独立操作系统窗口**；托管的 **SSH 远程更新** 引擎 + 机群 profile 轨道。
- 远程 **MCP catalog ≥50** 个已现场验证的厂商服务器（Cloudflare、Grafana Cloud、Better Stack、Railway 等）。
- `web_search` / `web_extract` 的 TTL 缓存；**lean-tail 压缩现为默认**。
- 带词干提取的多查询 `tool_search`。
- 可选的 **OS-keychain 加密** 存储密钥（减少每次启动时的 macOS Keychain 弹窗）。
- 更新器通过控制套接字 **暂停 gateway**，而不再整树杀死它们；镜像/包管理安装拒绝不安全的原地更新（#91277 Phase 3）。
- Cron 持久事件确认；Slack link-unfurl 控制；共享 Docker 容器身份；可插拔终端后端。
- Picker 新增：**GLM-5.3-Flash**、**MiniMax M3 free**、**MiniMax H3 Max**（视频）。

**破坏性变更：** 该标签未声明任何破坏性变更。部分行为默认值*会*让部分运维人员感到意外：

- 若未设置 `agent.compression.tail_mode`，则启用 lean-tail 压缩。
- Keychain 选择加入后，首次切换可能改写已存储的密钥 blob（`connection.json`、`connections.json`、`native-oauth-tokens.json`）。

**迁移 / 更新**

```text
hermes update
# or preview first
hermes update --plan
hermes doctor
hermes gateway   # restart after upgrade
```

全新安装仍使用发行说明正文中的官方安装脚本。对比：[v2026.8.19...v2026.8.27](https://github.com/NousResearch/hermes-agent/compare/v2026.8.19...v2026.8.27)。

GitHub 发行页上的社区反应偏正面（点赞 / 欢呼 / 爱心 / 火箭数十计），与「即使说明推迟，也持续打出稳定标签」的预期一致。

---

## 3. 项目进展

**过去 24 小时（数据窗口）：** 50 个 PR 被更新，**4 个已合并/关闭**，**46 个仍开放**。这是一个 inbound-review 日，而不是合并狂欢日。

**快照中已关闭的项**

- [#97013](https://github.com/NousResearch/hermes-agent/pull/97013) — `feat(desktop): manage the credential vault from Settings, with agent deep-link prefill`（**CLOSED**）。Desktop Settings UI 用于加密、对模型不可见的保险库；叠在 [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) 之上。这是「智能体可以登录站点却永远看不到密码」的可见产品化。

**`main` 上推进中的功能（开放、高信号）**

| 主题 | PR | 推进内容 |
|---|---|---|
| 对模型不可见的浏览器登录 | [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) | 加密本地保险库 → 不透明句柄 → 服务端填充；CLI + browser + Desktop |
| 消息信任 | [#97934](https://github.com/NousResearch/hermes-agent/pull/97934) | WhatsApp `contact_toolsets` — 按联系人的工具白名单，而非平台级一套 |
| 消息 UX | [#98419](https://github.com/NousResearch/hermes-agent/pull/98419) | Telegram STT 回声折叠为可展开 HTML 引用 |
| 消息管理 | [#98427](https://github.com/NousResearch/hermes-agent/pull/98427) | Discord 私有频道创建 + 权限覆盖 |
| 长会话正确性 | [#98426](https://github.com/NousResearch/hermes-agent/pull/98426) | 系统提示在 compaction commit **重建**，使提示侧升级到达现有会话 |
| API / goals | [#98309](https://github.com/NousResearch/hermes-agent/pull/98309) | `/v1/runs` 上的原生持久 goals + 生命周期事件 |
| 插件 UX | [#98197](https://github.com/NousResearch/hermes-agent/pull/98197) | 延迟的插件提问（SQLite 队列，空闲会话投递） |
| 流程 / 四眼原则 | [#98305](https://github.com/NousResearch/hermes-agent/pull/98305) | Kanban 评审不能由实现者 profile 自己批准 |
| i18n | [#92336](https://github.com/NousResearch/hermes-agent/pull/92336) | CLI、gateway、Desktop 的完整印尼语（`id`）locale |
| Skills 供应链 | [#98423](https://github.com/NousResearch/hermes-agent/pull/98423) | 运维人员添加的 skill tap 获得 `operator` 信任层级 |

**推进中的修复（开放）**

- Windows 更新 / Desktop 偏差：[#97380](https://github.com/NousResearch/hermes-agent/pull/97380)
- Windows Cloud Files / OneDrive-iCloud 搜索：[#98425](https://github.com/NousResearch/hermes-agent/pull/98425)（配对 issue #97898）
- Ollama/GLM stop→length 挽救循环：[#98410](https://github.com/NousResearch/hermes-agent/pull/98410)、[#98415](https://github.com/NousResearch/hermes-agent/pull/98415)
- 终端守卫对 `&` 的误报：[#98429](https://github.com/NousResearch/hermes-agent/pull/98429)
- mem0 entity-id 契约：[#97935](https://github.com/NousResearch/hermes-agent/pull/97935)
- 辅助回退链真正走完整列表：[#98422](https://github.com/NousResearch/hermes-agent/pull/98422)
- Dashboard Portal 缺少 `client_id` 现改为 WARN：[#98418](https://github.com/NousResearch/hermes-agent/pull/98418)

**进展解读：** 0.20.6 之后的能量集中在 **(a)** 降低 Windows 与本地模型后端的锐边，**(b)** 收紧安全边界（保险库、WhatsApp toolsets、skill tap、kanban 四眼），以及 **(c)** 让长生命周期的 gateway/API 会话尊重实时配置（compaction 提示重建、原生 goals）。这是一轮成熟度浪潮，而非绿地功能浪潮。

---

## 4. 社区热点

本 24 小时切片的评论量不大；此处的「热」指 **被更新 + 被讨论**，而非病毒式反应计数（所列条目的 👍 均为 0）。按所提供 issue 集合中的评论数排序：

1. **[#73997](https://github.com/NousResearch/hermes-agent/issues/73997)** — 6 条评论，自 **2026-07-29** 开放，2026-08-30 被顶起。  
   `hermes mcp login` 重试仍绑定同一个固定的 `oauth.redirect_port`，而第一个监听器仍占着它 → `Errno 98`，从而 **掩盖真正的凭证错误**。需要：OAuth 重试必须分配新端口或拆除第一个监听器；运维人员需要的是*实际*认证失败，而不是绑定冲突。

2. **[#24293](https://github.com/NousResearch/hermes-agent/issues/24293)** — 6 条评论，自 **2026-05-12** 开放，`needs-decision`。  
   位于 Cloudflare（或类似 WAF）之后的自定义提供商因 Anthropic/OpenAI **SDK User-Agent** 被拦截而 403。需要：为 `custom_providers` 提供可配置 / 可伪装 / 可剥离的 UA。这是本集合中存活最久的决策项，也说明有多少用户通过 **第三方中继 / GLM 代理** 运行 Hermes。

3. **[#95855](https://github.com/NousResearch/hermes-agent/issues/95855)** — 4 条评论，于 2026-08-26 打开。  
   `hermes update` 之后，Hindsight `local_embedded` 记忆失效：**fastmcp 需要 mcp 1.x，pyproject 钉死 `mcp==2.0.0`** → 缺少 `request_ctx`。需要：内部一致的依赖钉死，使 `hermes update` 不再变成 memory-provider 抽奖。

4. **[#97898](https://github.com/NousResearch/hermes-agent/issues/97898)** — 2 条评论，于 2026-08-29 针对 **v0.20.6 / Windows 11** 打开。  
   目录遍历会对 iCloud/OneDrive Cloud Files 占位符做 `stat` 并 **从云端水合它们**。配套 PR [#98425](https://github.com/NousResearch/hermes-agent/pull/98425)。需要：Windows 文件工具默认将同步根视为不可遍历。

5. **[#98428](https://github.com/NousResearch/hermes-agent/issues/98428)** — 0 条评论，**今天**提交。  
   文本路由（非视觉）模型再次调用 `vision_analyze` 时带上裸的 `path:` 伪 scheme 并失败。需要：视觉工具必须接受路由自己注入的缓存路径。

**底层需求模式：** 用户把 Hermes 当 **日常主力**（MCP 登录、自定义 LLM 代理、Windows 家目录、本地 Ollama/GLM、记忆插件）。他们不再问「智能体存在吗？」——而是问「第 50 个集成能否挺过一次更新和一道 WAF？」

---

## 5. 缺陷与稳定性

按 24 小时 issue 集合中的严重度 / 影响面排序。五个 issue **全部仍 OPEN**；窗口内已关闭 issue 数为 **0**。

| 排名 | Issue | 严重度 | 症状 | 修复 PR？ |
|---|---|---|---|---|
| 1 | [#24293](https://github.com/NousResearch/hermes-agent/issues/24293) 经 SDK UA 的自定义提供商 403 | P2，`needs-decision` | 经 Cloudflare 前置中继的全部调用失败 | 无（决策受阻） |
| 2 | [#73997](https://github.com/NousResearch/hermes-agent/issues/73997) MCP 登录端口冲突 | P2 | 认证失败被误报为 `Errno 98` | 快照中没有 |
| 3 | [#97898](https://github.com/NousResearch/hermes-agent/issues/97898) Windows Cloud Files 水合 | P2，Windows | 智能体文件遍历把 iCloud/OneDrive 占位符从云端拉下来 | **有 — [#98425](https://github.com/NousResearch/hermes-agent/pull/98425)** |
| 4 | [#98428](https://github.com/NousResearch/hermes-agent/issues/98428) `vision_analyze` `path:` scheme | P2 | 本地/文本路由的视觉路径断裂 | 尚无 |
| 5 | [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) mcp 2.0 vs fastmcp 1.x 钉死 | P3 | 每次更新后 Hindsight 记忆「不可用」 | 快照中没有；相关卫生工作在 [#97935](https://github.com/NousResearch/hermes-agent/pull/97935)（mem0 ids） |

**相关开放修复 PR（尚非 issue，但对稳定性关键）：**

- [#97380](https://github.com/NousResearch/hermes-agent/pull/97380) — Windows shim 交接可能报告成功，而 **Desktop 仍停留在旧版本**（该 PR 上为 P1）。
- [#98410](https://github.com/NousResearch/hermes-agent/pull/98410) / [#98415](https://github.com/NousResearch/hermes-agent/pull/98415) — Ollama GLM 的 `stop` 被改写成 `length` → 续写循环；`:cloud` 模型被错误归类为本地 GLM。
- [#98429](https://github.com/NousResearch/hermes-agent/pull/98429) — 终端守卫拦截含 `&` 的良性命令（heredoc 等）。
- [#98422](https://github.com/NousResearch/hermes-agent/pull/98422) — 辅助回退链在第一个可构造的客户端后停止（402 永远到不了后续条目）。

**稳定性解读：** 本切片中没有核心智能体的崩溃循环。风险画像是 **Windows + 本地模型 + 插件依赖**。最值得在下一个面向用户的标签之前合并的，是那条 P1 更新器/Desktop 偏差 PR。

---

## 6. 功能请求与路线图信号

24 小时集合中明确的「功能」PR，视为活的路线图（v0.21.0 是被点名的下一叙事版本）：

**较可能近期落地（已叠层、维护者触达、或正在闭合已记录缺口）**

1. **凭证保险库端到端** — [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) 仍开放；Desktop 一半已在 [#97013](https://github.com/NousResearch/hermes-agent/pull/97013) 关闭。本周最高产品信号：「智能体从加密保险库登录站点，模型永远看不到密码。」
2. **Compaction 始终重建系统提示** — [#98426](https://github.com/NousResearch/hermes-agent/pull/98426)，标记为维护者导向（#95681 弧线）。解锁对数周龄会话的提示改进。
3. **API 服务器上的原生持久 goals** — [#98309](https://github.com/NousResearch/hermes-agent/pull/98309)。托管 / OpenAI 兼容 `/v1/runs` 消费者需要它。
4. **WhatsApp 按联系人的 toolsets** — [#97934](https://github.com/NousResearch/hermes-agent/pull/97934)。面向必须接纳低信任联系人的 gateway 运维人员的安全边界功能。
5. **运维人员可信的 skill tap** — [#98423](https://github.com/NousResearch/hermes-agent/pull/98423)（`needs-decision` 但具体）。

**可能进入下一标签、稍远一点**

- Discord 私有频道 — [#98427](https://github.com/NousResearch/hermes-agent/pull/98427)
- 延迟的插件提问 — [#98197](https://github.com/NousResearch/hermes-agent/pull/98197)（`needs-decision`）
- 印尼语 locale — [#92336](https://github.com/NousResearch/hermes-agent/pull/92336)（纯 i18n，自 8 月 22 日起开放）
- Telegram STT 引用折叠 — [#98419](https://github.com/NousResearch/hermes-agent/pull/98419)
- Kanban 四眼原则 — [#98305](https://github.com/NousResearch/hermes-agent/pull/98305)

**预测：** v0.21.0 将打包 0.20.x 汇总*故事*（真实配置文件浏览、MCP catalog、lean-tail、keychain、Desktop 浏览器窗口），**外加** 若落地则纳入的保险库填充与长会话提示重建。i18n 与各平台消息打磨若有评审带宽会搭车；它们不是这次发行存在的理由。

---

## 7. 用户反馈摘要

24 小时语料是缺陷报告与实现 PR，而非表扬串。推断出的痛点与用例：

**痛点**

- **「更新弄坏了我的记忆插件。」** `#95855` — `hermes update` 被当作日常仪式信任；不一致的 `mcp` 钉死违背了这份信任。
- **「我的代理才是真正的 API。」** `#24293` — Cloudflare 前置的自定义提供商在用户架构里是一等公民，在 SDK 假设里是二等公民。
- **「Windows 家目录不是 POSIX 树。」** `#97898` / `#97380` — iCloud/OneDrive 占位符以及 Desktop/shim 更新偏差。
- **「本地 / Ollama / GLM 就是生产。」** `#98410`、`#98415`、`#98428` — stop-reason 启发式与视觉路径注入假定了云端视觉行为。
- **「MCP 登录失败了，但错误却是端口绑定。」** `#73997` — 认证 UX 仍在泄漏内部实现。

**PR 中可见的用例**

- 个人 + 家庭/gateway 运维人员在 WhatsApp/Telegram/Discord 上对联系人实行 **不等信任**。
- 以 Desktop 为先的用户，不会从终端管理保险库。
- 需要 **goals** 与事件流、而不只是 CLI 会话的托管 API 服务器部署。
- 必须让 Desktop 与 CLI 一起更新的多 profile / 机群 Windows 安装。
- 应在 compaction 之后拾取新系统提示指引的长生命周期会话。

**满意 vs 不满**

- 满意隐含在体量里：一天 50 个 PR，三天前一次 525-PR 的补丁标签，说明贡献者把 `main` 当作活的产品。
- 不满集中在 **兼容性契约**（User-Agent、mcp 钉死、Windows Cloud Files、Ollama stop 语义）——即 0.20.6 功能落地后的最后一英里。v0.20.6 本身的发行反应净正面。

---

## 8. 待办观察

需要维护者决策、或相对其影响已显陈旧的项：

| 项 | 年龄 / 状态 | 为何需要关注 |
|---|---|---|
| [#24293](https://github.com/NousResearch/hermes-agent/issues/24293) WAF / SDK User-Agent 403 | 自 **12 May 2026** 开放，`needs-decision`，6 条评论，今天再次被触达 | 本集合中最老的决策。阻塞常见的自定义提供商部署。要么允许 UA 覆盖，要么写明「WAF 后不受支持」。 |
| [#73997](https://github.com/NousResearch/hermes-agent/issues/73997) MCP OAuth 端口冲突 | 自 **29 Jul 2026** 开放，6 条评论 | 重试逻辑正在*掩盖*真正的认证错误。代码修复相对小，支持成本高。 |
| [#92336](https://github.com/NousResearch/hermes-agent/pull/92336) 印尼语 locale | 自 **22 Aug** 开放，纯 i18n，无逻辑风险 | locale 文件过审即可轻松合并；否则会逐渐腐化。 |
| [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) 浏览器保险库填充 | 开放；Desktop 姊妹项已关闭 | 功能只落地一半。Settings UI 已在、CLI/browser 填充未合并，会分叉安全叙事。 |
| [#98197](https://github.com/NousResearch/hermes-agent/pull/98197) 延迟的插件提问 | `needs-decision` | 触及会话状态 + 消息投递。需要对 SQLite 队列设计给出明确是/否。 |
| [#98423](https://github.com/NousResearch/hermes-agent/pull/98423) 信任运维人员 skill tap | `needs-decision` | 安全边界变更。隔离 vs operator 层级是策略决定，而不只是补丁。 |
| [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) mcp 1.x vs 2.0 钉死 | 仅 4 天，但 **每次更新都会回归** | 依赖单一事实来源问题；若 Hindsight 是受支持的记忆提供商，应进入下一个补丁标签。 |

---

**健康快照：** 发布节奏优秀；面向运维人员的打标签发行存在；v0.21.0 是已被承认的文档债务。下一道质量门槛不是更多功能 —— 而是 **关闭五月份那道 WAF 决策、让 `hermes update` 钉死安全，并落地 Windows + 保险库 PR**，使 0.20.6 的功能面在人们已经在用的平台上真正可用。

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

我将先收集 IronClaw 仓库当前状态、近期发布以及最热门的 issues/PRs，确保摘要准确。接下来拉取完整的 1.4.0 发行说明以及评论最多的 issues。
# IronClaw Project Digest — 2026-08-30

**Repo:** [nearai/ironclaw](https://github.com/nearai/ironclaw) · Agent OS / 个人 AI 助手（Rust、WASM 沙箱、隐私优先）· 约 12.6k stars、约 1.5k forks · Apache-2.0 / MIT

---

## 1. 本周概览

IronClaw 正处于 1.4.0 发布后的稳定化冲刺，核心团队吞吐异常高。仅过去 24 小时，tracker 就显示 **14 个 issues 被触及**（11 个仍开放）以及 **50 个 PRs 有更新**（22 个开放，28 个已合并/关闭），外加两次打标发布（2026-08-26 的 `1.4.0-rc.1` 与 2026-08-27 的稳定版 **1.4.0**）。发版节奏与 CI 纪律看起来很健康；真正的瓶颈不是贡献者闲置，而是 **未投影的工具载荷与无界 agent 循环造成的 token/延迟浪费**。issues 中引用的生产 traces（两次 Gmail 拉取耗时 19.7s；列出 GitHub repos 用了 64 次工具调用 / 3m01s；一次 593 次调用 / 70 分钟的失控）指向同一失败模式：原始 REST/MIME 正文未经投影或引用缝合就进入模型上下文。1.4.0 落地了持久通知收件箱、后台子 agent，以及持久 Docker 沙箱；当前开放队列转向性能架构（上下文投影、按引用返回结果、压缩边界），再加上生命周期钩子和持久执行器 spike。

---

## 2. 发布

### [ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0) — 2026-08-27（稳定版）

由 `1.4.0-rc.1` 晋升。自 `ironclaw-v1.3.0` 起共 **81 commits**。**无破坏性变更。无需从 1.3.0 迁移。** 接受 1.2.x 安装状态，因此跳过 1.3 的部署可直接跃迁。

**Added**
- 按用户持久化的 **notification inbox**（运行结果 + 可操作门控；WebUI 通知中心，使审批/鉴权提示在错过会话后仍可恢复）。
- **Background subagents**：父 turn 可派生子 agent，各自拥有投递、激活溯源、自主唤醒上限以及孤儿愈合。
- 本地 Docker 配置下的 **按用户持久沙箱容器**（Docker Exec；安装与状态在命令之间保留）。Railway preview 仍为按命令短暂存在。
- 托管沙箱 **egress proxy**，凭据绑定由 manifest 声明，密钥不会进入沙箱代码。
- 自动化支持立即运行；精确的运行能力事实。
- 针对用户无需审批、只读工具的持久后端建议，受已连接扩展门控。
- Google Docs 语义编辑工具；可下载对话产物中附带运行耗时证据。
- 运行时镜像中可选的 in-worker SSH。

**Fixed**
- 有界结构化收尾卡死；保留 OpenAI 兼容的仅推理响应。
- Provider/鉴权失败以可读上下文形式送达模型。
- libSQL 写通道饥饿不再表现为无关的工具失败。
- Telegram：工作区 bot 配对 vs 个人设备绑定；Slack：未绑定用户的私聊连接提示。
- 增量压缩摘要上下文得以保留。

**运维说明（非面向用户的破坏性变更）：** `IRONCLAW_REBORN_SSH_PUBLIC_KEY` 可在容器 2222 端口以用户 `agent` 启用公钥 SSH（与运行时同一 uid 1000 —— 将该密钥视为 shell 访问权限）。新增旋钮：`IRONCLAW_REBORN_SANDBOX_PROXY_IMAGE`、`IRONCLAW_SANDBOX_EXTRA_ALLOWED_DOMAINS`。`IRONCLAW_REBORN_WORKSPACE_ROOT` 与 `IRONCLAW_REBORN_HOME` 均不得为 `/`。

### [ironclaw-v1.4.0-rc.1](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0-rc.1) — 2026-08-26

功能范围与 1.4.0 相同；覆盖这 81-commit 窗口的首个候选。

---

## 3. 项目进展

本窗口已关闭/合并的工作集中在 **通知能力落地**、**工具循环卫生**、**CI 拓扑** 以及 **WebUI 设计债**。

**通知（1.4.0 表面，相关 issues 现已关闭）**
- [#7873](https://github.com/nearai/ironclaw/issues/7873) / [#7899](https://github.com/nearai/ironclaw/pull/7899) — 自动化预运行失败（配置/输入/准备）产生持久 `RunFailed` 收件箱条目，而非瞬时错误。
- [#7875](https://github.com/nearai/ironclaw/issues/7875) / [#7901](https://github.com/nearai/ironclaw/pull/7901) — 在 enrichment **之前**持久化 `AuthenticationRequired` 门控，避免鉴权后端宕机把恢复项藏起来。
- [#7874](https://github.com/nearai/ironclaw/issues/7874) — 资源上限、预算耗尽与策略拦截产生 `RunBlocked`。

**工具 / 推理正确性**
- [#7982](https://github.com/nearai/ironclaw/pull/7982) — `builtin.result_read` 不再在模型无法达到的预算之后继续发送（生产线程对 `max_bytes: 400` 重试了五次）。
- [#7965](https://github.com/nearai/ironclaw/pull/7965) — `tool_search` 不再因共享一个偶然 BM25 词而给工具排名（假阳性“该工具存在”）。
- [#7979](https://github.com/nearai/ironclaw/pull/7979) — 失败即关闭门控：每个编码/加密/二进制/header/JSON-RPC 输出边界必须点名所有者。

**CI / 贡献者平台**
- [#7980](https://github.com/nearai/ironclaw/pull/7980) — 测试运行前校验 Cargo integration-group 拓扑。
- [#7992](https://github.com/nearai/ironclaw/pull/7992)（开放，XL）— PR + merge-queue 集成使用一次 `cargo nextest`，四测并发上限。

**WebUI 设计（长期进行，本周关闭）**
- [#5563](https://github.com/nearai/ironclaw/pull/5563) — 设计系统 token + `/playground`。
- [#5084](https://github.com/nearai/ironclaw/pull/5084) — 按该系统设计 Automations 页面。

**仍在进行（大概率 1.4.x / 1.5）**
- 循环终止器 + 交互墙钟上限 — [#7977](https://github.com/nearai/ironclaw/pull/7977)（旧 digest 终止器移除后，生产环境出现 593 次工具调用 / 70 分钟运行）。
- 压缩输入上界 — [#7978](https://github.com/nearai/ironclaw/pull/7978)。
- 共享运行后学习评审路由器 — [#7958](https://github.com/nearai/ironclaw/pull/7958)。
- 租户作用域 BI 遥测（仅文件系统，无额外 DB 驱动）— [#7961](https://github.com/nearai/ironclaw/pull/7961)。
- Companion/原生客户端表面 demo — [#7983](https://github.com/nearai/ironclaw/pull/7983)（明确不用于合并）。
- DX：macOS pre-push hook — [#7991](https://github.com/nearai/ironclaw/pull/7991)；更清晰的 `list_dir` / memory / 工具披露错误类型 — [#7989](https://github.com/nearai/ironclaw/pull/7989)、[#7985](https://github.com/nearai/ironclaw/pull/7985)、[#7990](https://github.com/nearai/ironclaw/pull/7990)。

---

## 4. 社区热点

评论量集中在少数由核心作者提出的性能 issues，而非路过式用户帖。底层需求：**不要为模型并未索取的字节支付推理费用**。

| Item | Activity | Need |
|---|---|---|
| [#7891](https://github.com/nearai/ironclaw/issues/7891) `perf(extensions)`: 未投影 MIME + 24 KiB head-slice | **10 comments**，更新于 2026-08-28 | 两次 `gmail.get_message`（274–290 ms）产生了 **19.7s turn / 19.2s inference**，因为 **49,152 字节原始 MIME 头**被未经请求地塞入。 |
| [#7824](https://github.com/nearai/ironclaw/issues/7824) 上下文投影 / Pi 风格压缩 | **5 comments**，更新于 2026-08-29 | PinchBench 全线程回放：**2.277 亿 input tokens / $10.31**，对比旧 shell **5510 万 / $2.52**。回归的是成本，不是质量。 |
| [#7770](https://github.com/nearai/ironclaw/issues/7770) Epic: agent 生命周期钩子 | **4 comments**，更新于 2026-08-29 | after-turn / before-turn / compaction / tool-result 缝合点，使功能变为钩子注册而非改核心。 |
| [#7981](https://github.com/nearai/ironclaw/issues/7981) GitHub `list_repos` + `result_read` | **3 comments** | “list my github repos” → **64 次工具调用，3m01s**；答案在第 1 次调用后已完整。载荷：**519,551 字节 / 98 个仓库 × 81 个原始 REST 字段**。与 [#7986](https://github.com/nearai/ironclaw/issues/7986) 成对。 |
| [#7903](https://github.com/nearai/ironclaw/issues/7903) 按用户持久沙箱执行器 | **2 comments**，风险：高 | 决策 spike：把规范循环留在受信主机，还是把更多执行器迁入沙箱，以免每个新 CLI 都要主机侧配管。 |

同一主题的相关开放 PRs：[#7930](https://github.com/nearai/ironclaw/issues/7930)（按引用引用先前工具结果，而非重新发出）、[#7984](https://github.com/nearai/ironclaw/pull/7984)（把 `tool_search` 限制在首次查看信封内）、[#7978](https://github.com/nearai/ironclaw/pull/7978)（限制 summarizer 输入）。

---

## 5. 缺陷与稳定性

按生产影响排序。全部由工程侧提交并附带实测 traces；看起来都不是未认证终端用户的崩溃报告。

**P0 / 高 — 无界成本或失控循环**
1. **[#7891](https://github.com/nearai/ironclaw/issues/7891)** — prompt 中未投影的 Gmail MIME（两封邮件约 20s inference）。开放。与 #7986/#7981 同类。
2. **[#7981](https://github.com/nearai/ironclaw/issues/7981) + [#7986](https://github.com/nearai/ironclaw/issues/7986)** — `github.list_repos` 下发 81 个原始字段；有界 JSON 视图拒绝内联；模型随后发出 61 次 `result_read`。包内已有未使用的投影缝合点。开放。
3. **[#7977](https://github.com/nearai/ironclaw/pull/7977)**（修复进行中）— PR #7531 移除 digest 终止器后，无进展的默认循环没有结束条件。生产：**593 次调用 / 70 分钟**。修复：在主导重复输出时终止 + 限制交互墙钟。

**P1 — 静默正确性 / 浪费 token**
4. **[#7987](https://github.com/nearai/ironclaw/issues/7987)** — `flatten_top_level` 按白名单重建工具 schema，并 **静默丢弃所有非禁止的顶层约束**。Provider 永远看不到作者写的关键词。无警告，无测试。
5. **[#7930](https://github.com/nearai/ironclaw/issues/7930)** — 没有“按引用使用先前结果”；模型必须把大载荷重新作为 JSON 参数发出（串行输出 token）。
6. **[#7982](https://github.com/nearai/ironclaw/pull/7982)** — **已修复**：`result_read` 的预算提示把模型指向了错误方向。

**P2 — 分类 / DX（失败类型错误，非数据丢失）**
7. 无法解析的工具名被打成 `InputEncode` — 修复 [#7990](https://github.com/nearai/ironclaw/pull/7990)。
8. 缺失的 memory 文档被报成畸形输入 — 修复 [#7985](https://github.com/nearai/ironclaw/pull/7985)。
9. 对缺失路径执行 `list_dir` 时不点名该路径 — 修复 [#7989](https://github.com/nearai/ironclaw/pull/7989)。
10. macOS pre-push 门控无法完成，开发者于是绕过 — [#7991](https://github.com/nearai/ironclaw/pull/7991)。

本 24 小时样本中未见面向用户的崩溃/回归浪潮。稳定性风险是 **经济与延迟**：循环不停、工具倾倒原始厂商载荷。

---

## 6. 功能请求与路线图信号

大概率 **1.4.x 补丁**（已在 PR 中或体量小、失败即关闭）：
- 循环终止器 + 墙钟上限（[#7977](https://github.com/nearai/ironclaw/pull/7977)）。
- 压缩累计输入上界（[#7978](https://github.com/nearai/ironclaw/pull/7978)）。
- GitHub / Gmail / 通用能力 **投影** 以及 `result_read` 首次查看尺寸（[#7984](https://github.com/nearai/ironclaw/pull/7984)、#7891、#7986）。
- 按引用返回工具结果（[#7930](https://github.com/nearai/ironclaw/issues/7930)）。
- 在发现与 WebUI 中保留并渲染 **NEAR AI 模型模态 / 能力标签**（[#7969](https://github.com/nearai/ironclaw/issues/7969)、[#7970](https://github.com/nearai/ironclaw/issues/7970)、[#7971](https://github.com/nearai/ironclaw/issues/7971)）。

大概率 **1.5 / 下一小版本**（epic 与 spike）：
- Agent 生命周期钩子 epic（[#7770](https://github.com/nearai/ironclaw/issues/7770)）—— 以架构方式增加“当 X 则做 Y”，而无需改引擎。
- Pi 风格上下文投影 + 结构化摘要 + 溢出恢复（[#7824](https://github.com/nearai/ironclaw/issues/7824)）—— 若要让 PinchBench token 消耗保持竞争力，这是刚需。
- 受信主机内核之后的持久沙箱执行器（[#7903](https://github.com/nearai/ironclaw/issues/7903)，风险：高）。
- 共享学习评审路由器（[#7958](https://github.com/nearai/ironclaw/pull/7958)）。
- 作用域租户 BI 遥测（[#7961](https://github.com/nearai/ironclaw/pull/7961)）—— 隐私有界，仅 `ScopedFilesystem`。
- 原生 companion 客户端（`/approvals/pending`、`/session/tokens`）—— [#7983](https://github.com/nearai/ironclaw/pull/7983) 是 demo 分支，不合并。

---

## 7. 用户反馈摘要

这一切片 **几乎全是核心/资深贡献者**（`henrypark133`、`serrrfirat`、`italic-jinxin`、`standardtoaster`）提交的实测生产 traces，而非论坛式满意度打分。从这些 traces 推断出的痛点：

**痛点**
- 日常已连接应用任务（读两封邮件、列出我的仓库）的成本 **比底层 API 高出几个数量级**。
- 当 `result_read` / schema 展平 / BM25 搜索对模型说谎时，模型无法停止或恢复。
- 长线程被完整回放；相对旧 shell 基线，PinchBench 成本约 **4× tokens 与约 4× 美元**。
- 为避免假阳性而移除终止器后，一次线上运行持续了 **70 分钟**。
- Mac 贡献者跑不完 pre-push hook，于是关掉它。

**traces 中的用例**
- Gmail + GitHub 作为个人/工作 agent 的一等扩展。
- 自动化必须在持久失败 / 鉴权过期 / 策略拦截时发出通知（现已进入 1.4.0）。
- 多通道（Slack/Telegram）配对，以及应展示视觉 vs 纯文本的 WebUI 模型选择。
- 本地 Docker 持久沙箱 vs Railway 短暂 worker。

**满意信号**
- 1.4.0 **零迁移** 发布，并明确兼容 1.2.x 安装状态 —— 运维友好。
- 设计系统与 Automations 重设计 PR 关闭，表明 WebUI v2 正离开“孤立规格”，进入产品表面。
- 失败即关闭的 CI 与输出所有权测试表明，项目把扩展/安全边界当作合并门控，与 README 的安全立场一致。

所列 issues 没有值得一提的公开反应计数（👍 = 0），因此社区热度体现在讨论深度，而非表情。

---

## 8. 待办观察

需要维护者拍板、或体量大会因只停留在讨论而卡住的事项：

1. **[#7824](https://github.com/nearai/ironclaw/issues/7824)** — 上下文投影。自 2026-08-22 开放；仍是最清晰的成本回归工单。压缩 PR #7978 只是切片，不是 Pi 风格屏障。
2. **[#7770](https://github.com/nearai/ironclaw/issues/7770)** — 生命周期钩子 epic。设计上分阶段；若没有具名阶段负责人，会堆积“干脆改核心”的 PR。
3. **[#7903](https://github.com/nearai/ironclaw/issues/7903)** — 持久沙箱执行器。高风险架构分叉；需要明确 go/no-go，而不是更多评论。
4. **[#7891](https://github.com/nearai/ironclaw/issues/7891) / [#7986](https://github.com/nearai/ironclaw/issues/7986) / [#7981](https://github.com/nearai/ironclaw/issues/7981)** — 三张工单、同一类缺陷（未使用的投影缝合点 + 原始厂商载荷）。应合并为一条有负责人的工作流。
5. **[#7987](https://github.com/nearai/ironclaw/issues/7987)** — 静默丢弃 schema 约束。零评论；容易漏掉，到了 provider 侧又很难排查。
6. **[#7930](https://github.com/nearai/ironclaw/issues/7930)** — 按引用返回结果。P1 性能；提交后无评论。
7. **[#7983](https://github.com/nearai/ironclaw/pull/7983)** — companion 客户端 demo 分支。作为预览可以；需要后续产品 PR，以免它成为唯一原生客户端契约后腐烂。
8. **[#7992](https://github.com/nearai/ironclaw/pull/7992)** — XL CI 统一，**今天**刚开。对 merge-queue 可靠性杠杆很高；不应排在功能 PR 后面。

---

**健康快照：** 发版速度与发布卫生极好（RC 两天内升到 1.4.0，无迁移税，通知 epic 关闭）。项目当前风险不是停滞或社区崩盘，而是 **1.4.x 能否在生产 traces 继续显示“列一次仓库、读两封邮件就要数分钟、数美元”之前，落地投影 + 循环边界。**

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目速览 — 2026-08-30

**仓库：** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) · 基于 AgentScope 2.0 的个人 AI 助手（本地/云端）  
**规模：** 约 34.6k stars / 约 3k forks · 稳定版 **v2.1.0** (2026-08-13) · 活跃线 **v2.2.0-beta.1–3**  
**窗口：** 过去约 24 小时内更新的 issues/PRs/releases（外加相邻 beta 周期上下文）

---

## 1. 本周概览

QwenPaw 正处于 2.2.0 发布前的高速迭代期。仅过去一天，仓库就出现了 **28 次 issue 更新**（16 个仍开放、12 个已关闭）、**50 次 PR 更新**（26 个开放、24 个已合并/关闭），以及 **五个带标签的发布**。这是发版列车式的吞吐，而非维护空窗。

2.2.0 的多个 beta 同时落地两条战略主线：**协议现代化**（MCP Streamable-HTTP 双栈 + 会话恢复）以及 **团队级产品化**（自托管多用户 Hub、第三方 agent harness）。维护者几乎每日发版，每个 beta 都配有自动化的「发版值班」安装验证 issue。

健康度喜忧参半，但方向是建设性的。核心回路（MCP 重连、自定义 provider 发现、钉钉流、上下文溢出）正在拿到真正的修复。与此同时，通道配置丢失、Desktop+Docker 上的 TLS/运营商 DPI、飞书投递，以及 Console agent 路由 bug，说明产品正在同时铺开过多表面。社区热情高，首次贡献者也在场；风险在于稳定性债务积累的速度快于 Hub/路线图叙事能够消化的速度。

---

## 2. 发布

稳定版 **Latest** 仍是 **[v2.1.0](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0)** (13 Aug)。本窗口内五个新 tag 全部是 **预发布**。beta 说明中没有附带官方 breaking-change 或迁移指南。

### v2.2.0-beta.3 — 28 Aug ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.3))
- **feat(mcp)** 带握手期回退的 Streamable-HTTP 双协议客户端 — [#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330)
- **fix(mcp)** 拆除时中止挂起的会话 RPC；恢复过期的 `list_tools` — [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329)
- **fix(dingtalk)** 过期流检测 + 有界 SDK 请求 — [#7381](https://github.com/agentscope-ai/QwenPaw/pull/7381)
- **fix(providers)** 迁移已发现模型的输出上限 — [#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386)
- **fix(providers)** 恢复自定义 OpenAI 兼容 provider 的模型发现 — [#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320)

这是 MCP 2026-07-28（无状态）兼容性落地，并对 2025 握手客户端提供一次性回退。使用远程 `streamable_http` MCP 的运维应重新测试「服务端重启后重连」；这正是 [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329) / 已关闭 [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) 的明确目标。

### v2.2.0-beta.2 — 28 Aug ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.2))
- Workspace 启动失败清理改为 cancellation-safe — [#7194](https://github.com/agentscope-ai/QwenPaw/pull/7194)
- E2E console 覆盖：23 个定向用例 + 扩展断言 — [#7327](https://github.com/agentscope-ai/QwenPaw/pull/7327)
- 同一发版列车中的相邻说明：prompt-cache 可观测性、助手消息自动折叠、tool-stop 取消、移动端 composer、cron 日历、file-guard 加固。

### v2.2.0-beta.1 — 27 Aug ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.1))
- 面向严格模型的 DashScope tool-schema 清洗 — [#7284](https://github.com/agentscope-ai/QwenPaw/pull/7284)
- 文档：scroll context manager 博客 — [#7300](https://github.com/agentscope-ai/QwenPaw/pull/7300)
- 更广列车：Volcengine Agent Plan 与 MiMo V2.5 provider、按像素上限缩放图片、钉钉共享群会话上下文。

### v2.1.1-beta.3 / v2.1.1-beta.2 (25 / 24 Aug)
2.1 线上的补丁列车：钉死 `@agentscope-ai/chat` 1.1.72 ([#7257](https://github.com/agentscope-ai/QwenPaw/pull/7257))、助手卡片上的 artifacts ([#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161))、OpenAI Responses API 视频 tool-results ([#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061))、未读会话指示器，Hub 已在更早的 2.1.1 工作中落地。

**迁移说明（推断，非官方）：**
- MCP 客户端：优先使用 2026-07-28 Streamable-HTTP；旧握手仍可一次性工作。
- 自定义 OpenAI 兼容 provider：发现后的模型列表现在应能持久化 ([#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320))；若选择器仍为空请报 issue。
- `discovered_models.max_tokens` 已迁移；加密的 provider 快照仍应能加载 ([#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386))。
- Desktop/Docker 仍携带 Python 3.11 / OpenSSL 3.0.x TLS 栈 — 见 Bugs。

---

## 3. 项目进展

本窗口内已关闭/合并的工作聚成五条轨道。

**MCP 可靠性（合并密度最高）**  
[#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330) 双协议客户端与 [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329) 挂起 RPC 中止，闭环了 [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) 以及 [#6761](https://github.com/agentscope-ai/QwenPaw/issues/6761) 中的协议问题。这是本周最完整的功能+修复组合。

**Provider 正确性**  
[#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320) 修复「发现成功、选择器仍空」([#7305](https://github.com/agentscope-ai/QwenPaw/issues/7305))。[#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386) 在不丢弃加密凭据的前提下迁移输出上限。[#7284](https://github.com/agentscope-ai/QwenPaw/pull/7284) 清洗 DashScope tool schema。[#7388](https://github.com/agentscope-ai/QwenPaw/pull/7388) 将 ACP 上限以 `max_completion_tokens` 发送。

**上下文 / tool-result 溢出**  
[#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331) 限制过长的单行 tool result，把完整载荷停放到 workspace artifact，并保留恢复元数据。直接回应企业 MCP dump 撑爆模型 ([#7288](https://github.com/agentscope-ai/QwenPaw/issues/7288)) 以及更早的 shell 截断诉求 ([#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512))。

**通道**  
[#7381](https://github.com/agentscope-ai/QwenPaw/pull/7381) 把休眠/VPN 后看似仍活着的钉钉 Stream socket 判为死亡。飞书「首条能回、之后沉默」([#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757)) 在长线程（15 条评论）后标记关闭 — 在新的配置被清空报告 ([#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408)) 完成分诊前，先按当前构建已修复处理。

**Console / desktop / 测试基建**  
响应卡片上的 artifacts、e2e console 覆盖、workspace 清理的 cancellation-safety、WebView2 崩溃 [#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427) 以及 ReMe editable-install 泄漏 [#6124](https://github.com/agentscope-ai/QwenPaw/issues/6124) 已关闭。Chrome 标签页生命周期 [#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770) 也已关闭。

**仍开放且在推进（未合并）：** chat 滚动锁定 [#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356)、tool-call 可见性开关 [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357)、聊天历史虚拟化 [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361)、MCP tool-call 超时 [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)、PowerContext 记忆后端 [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)、作用域内 embedding 重建索引 [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133)、独立 fallback-model 设置 [#7392](https://github.com/agentscope-ai/QwenPaw/pull/7392)、Windows ACP 启动卡住 [#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)。

---

## 4. 社区热点

按所给快照中的评论量排序。

| Item | Comments | Why it is hot |
|---|---|---|
| [\#5757 Feishu stops replying after first message](https://github.com/agentscope-ai/QwenPaw/issues/5757) | 15 | 该通道是国内主表面；ack 后沉默会直接击穿信任。现已关闭。 |
| [\#7318 Hub multi-tenant — what next?](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 14 | 官方路线图帖。Hub 是对多年多用户诉求的回答（[#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324) 及相关）。 |
| [\#7298 OpenSSL 3.0 / Python 3.11 TLS + carrier DPI](https://github.com/agentscope-ai/QwenPaw/issues/7298) | 9 | Desktop 没有变通；Docker 同一套栈。挡住了走被检测移动/运营商网络的用户。 |
| [\#6524 MCP session dead after remote restart](https://github.com/agentscope-ai/QwenPaw/issues/6524) | 6 | 已在 beta.3 处理。模式是：远程工具已是生产关键路径，重连却不是。 |
| [\#6770 / \#6512 Chrome tab lifetime & huge shell output](https://github.com/agentscope-ai/QwenPaw/issues/6770) · [\#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) | 各 4 | Agent 当分析师用：超长浏览器会话，以及上万字符的 tool 输出。 |

**底层诉求**
1. **团队，而不只是个人** — 隔离、管理员托管的 skills、白名单（Telegram GUI [#7389](https://github.com/agentscope-ai/QwenPaw/issues/7389)）。
2. **与 Claude Code / Codex 对齐的 agent harness** — Plan Mode 回归 ([#7405](https://github.com/agentscope-ai/QwenPaw/issues/7405))、`/btw` 旁路提问 ([#7398](https://github.com/agentscope-ai/QwenPaw/issues/7398))、回合中途转向 ([#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775))、Claude Code harness 状态 ([#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395)、[#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396))。
3. **把通道 + TLS 当产品，而不是胶水** — 飞书/钉钉/Telegram 必须扛得住重启、休眠、DPI 和配置写入。
4. **把上下文当一等资源** — scroll 压缩 vs 巨型 MCP/shell 载荷；用户要可检查，又不能把窗口撑爆。

---

## 5. 缺陷与稳定性

严重度按运营冲击，不按表情数量。

### P0 — 生产停摆 / 数据路径投毒
- **[\#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408)** 飞书通道配置被清空（`enabled=false`、空 `app_id`）→ cron `KeyError('channel not found: feishu')`。开放，今日新建。快照中无关联修复 PR。国内部署上运营风险最高。
- **[\#7402](https://github.com/agentscope-ai/QwenPaw/issues/7402)** 空的助手 `output_text` 被写入历史 → 之后每一轮 Ark Responses API 都 400。一条坏消息毒死整段会话。开放。
- **[\#7301](https://github.com/agentscope-ai/QwenPaw/issues/7301)** MCP 旧迁移给空环境客户端留下悬空凭据引用 → 每个新会话都 `CredentialNotFoundError`。开放。

### P1 — 安装 / 网络 / 桌面不可用
- **[\#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298)** Desktop 与官方 Docker 携带 OpenSSL 3.0.x；运营商 DPI 会重置 TLS。Desktop 没有用户侧变通。开放，9 条评论。
- **[\#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)** Windows ACP agent 在 workspace 引导期间卡住数分钟（事件循环上的 `bootstrap_plugins()`）。开放 PR 已存在。
- **[\#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427)** WebView2 渲染进程在 v2.0.0+post.4 启动约 7 秒后崩溃（`msedge.dll`，0x80000003）。已关闭 — 除非在 2.2 beta 上再现，否则按已修复处理。

### P1 — agent 正确性
- **[\#7407](https://github.com/agentscope-ai/QwenPaw/issues/7407)** Console 消息静默落到错误的 agent。开放，今日提交。
- **[\#7397](https://github.com/agentscope-ai/QwenPaw/issues/7397)** Browser SDK 每次 `present()`/`open()` 都开新的 tab-group；页面无法共享同一组。在 2.2.0b3 上开放。
- **[\#7288](https://github.com/agentscope-ai/QwenPaw/issues/7288)** 大型 MCP 结果绕过 scroll 压缩并撑爆上下文。已关闭；由 [#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331) 缓解。

### P2 — 已关闭或已收口
- [#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757) 飞书不回复、[#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) MCP 重连、[#6124](https://github.com/agentscope-ai/QwenPaw/issues/6124) ReMe editable install 下 48GB 泄漏、[#7305](https://github.com/agentscope-ai/QwenPaw/issues/7305) 自定义 provider 选择器 — 全部已关闭，有对应 PR 的已注明。
- [#7400](https://github.com/agentscope-ai/QwenPaw/issues/7400) 无效（「搞错」）。
- [#7399](https://github.com/agentscope-ai/QwenPaw/issues/7399) `daily_users` 的「UTC」按 AgentScope `Msg` 设计是朴素本地时间，不是时钟 bug。

---

## 6. 功能请求与路线图信号

**已写进 2.2.0 对外表述**
- **QwenPaw Hub（多租户 / 自托管多用户）** — 宣布随 2.2.0 推出；讨论在 [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)。代码早已通过 Hub PR [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) 落地（在 2.1.1/2.2 列车上被引用）。预期是打磨，而不是从零开始。
- **MCP 2026-07-28** — 已随 beta.3 带上并附回退；很可能在 2.2.0 正式版中成为默认。
- **第三方 harness** — Codex 与 Qoder 已在 console 中可用；**Claude Code 明确是 “Coming soon”**（`harnesses/registry.py`，`coming_soon=True`）。两条重复状态帖：[#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395)（已关闭）、[#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)（开放）。若 harness 框架已经通用，很大概率会进 2.2.0 或紧随其后的点版本。

**若维护者继续对齐 Claude Code UX，下一步很可能是**
- 把 Plan Mode 恢复为可见的「先规划再执行」表面 — [#7405](https://github.com/agentscope-ai/QwenPaw/issues/7405)
- 不消耗 scroll/历史的 `/btw` 旁路提问 — [#7398](https://github.com/agentscope-ai/QwenPaw/issues/7398)
- 执行中途转向 / 附加 — [#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775)（自 3 月起开放，标了 “good first issue”，本周仅 2 条评论）

**已在审查中的 Console UX（测试通过即可合入）**
- 滚动锁定 [#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356)、隐藏 tool 卡片 [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357)、长转录虚拟化 [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361)、fallback-model 设置页 [#7392](https://github.com/agentscope-ai/QwenPaw/pull/7392)、钉钉 console 设置中的 `card_auto_layout` [#7404](https://github.com/agentscope-ai/QwenPaw/issues/7404)

**平台完整度**
- 官方主题（强调色/字体/间距） — [#7406](https://github.com/agentscope-ai/QwenPaw/issues/7406)
- Desktop GUI 中的 Telegram 白名单字段 — [#7389](https://github.com/agentscope-ai/QwenPaw/issues/7389)
- 可配置的 MCP `tool_call_timeout` — [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)
- 可选的 PowerContext 长期记忆 — [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)
- 超大图片按像素上限拒绝 — [#7220](https://github.com/agentscope-ai/QwenPaw/pull/7220)

预判：2.2.0 正式版会主打 **Hub + MCP 2026 + harnesses**。Console 手感与 Claude Code 对齐，是社区税；它将决定 Hub 看起来像产品，还是带额外登录字段的又一个个人助手 beta。

---

## 7. 用户反馈摘要

**痛点**
- 通道既是日常主力，也是可靠性最弱的一条线：飞书静音、飞书配置被覆盖、钉钉过期 socket、Telegram 访问控制缺 GUI、cron 投递假定一个刚刚消失的通道还在。
- 打包运行时（Tauri desktop、bookworm Docker、Python 3.11 TLS）落后于用户实际所在的网络。
- Agent 控制仍是「发射然后祈祷」：用户要可见的计划、回合中途轻推的方式，以及一条不污染记忆的旁路通道。
- 高阶用户（运维分析、多标的报告、批量日志）撞上硬限制：被截断的 shell、跳过压缩的 MCP 载荷、会永久打断线程的空 Ark 文本块。
- 多 agent console 路由与 Browser tab-group 隔离泄漏 — 一旦 Hub 邀请不止一个 persona/用户，就是致命的。

**工单里可见的用例**
- 飞书 / 钉钉 / Telegram 上带 cron 的团队助手。
- 跑遥测与报表的企业 MCP。
- 自定义 OpenAI 兼容 / Volcengine Ark / DashScope / 阿里云 Coding Plan 模型混用。
- Windows + WebView2 上以 Desktop 为先的个人安装。
- 人们会逐行对照 Claude Code 与 Codex 的 coding-agent 工作流。

**满意**
- 首次贡献者 PR 的体量，以及维护者当日合入，说明项目显得可接近。
- 用户把 Hub 和第三方 harness 当真，而不是当成空气 — 他们会跟帖，而不是弃帖。
- 长跑 bug（飞书沉默、MCP 重启、provider 发现、WebView2、ReMe 泄漏）正在被退役，而不是被无视。

**不满**
- Beta 节奏快于打包 TLS、通道持久化和会话历史卫生。「PR 里能跑，Docker/Desktop/飞书里就坏」是反复出现的模式。
- 重复的 Claude Code 提问（[#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395)/[#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)）说明公开路线图还不够可见。

---

## 8. 待办观察

需要维护者回复或关联 PR；其中若干相对发版时钟已经偏旧。

1. **[\#1775 Steer / message-attach mid-run](https://github.com/agentscope-ai/QwenPaw/issues/1775)** — 2026-03-18 打开，标了 good first issue，仍开放。直接对标竞品能力。本周有更新但无人认领。
2. **[\#7298 TLS / OpenSSL 3.0 on Desktop+Docker](https://github.com/agentscope-ai/QwenPaw/issues/7298)** — 快照中无修复 PR；发版说明里糊弄不过去。
3. **[\#7408 Feishu config wiped](https://github.com/agentscope-ai/QwenPaw/issues/7408)** 与 **[\#7407 wrong-agent message drift](https://github.com/agentscope-ai/QwenPaw/issues/7407)** — 均于 2026-08-30 提交；以 Hub 的多租户主张论，应当日分诊。
4. **[\#7301 dangling MCP credential after migration](https://github.com/agentscope-ai/QwenPaw/issues/7301)** — 升级踩雷；每个新会话都会失败。
5. **[\#7402 empty Ark `output_text` poisons history](https://github.com/agentscope-ai/QwenPaw/issues/7402)** — 一行持久化守卫就能挡住一类 400。
6. **[\#7396 Claude Code harness status](https://github.com/agentscope-ai/QwenPaw/issues/7396)** — 给一个带日期的答复，免得 [#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395) 继续克隆。
7. **[\#7080 PowerContext memory](https://github.com/agentscope-ai/QwenPaw/pull/7080)** 与 **[\#7133 explicit embedding reindex](https://github.com/agentscope-ai/QwenPaw/pull/7133)** — 记忆后端与 Hub 相邻；Hub 已官宣却仍停在 “Under Review”，会形成能力缺口。
8. **[\#6874 MCP tool_call_timeout](https://github.com/agentscope-ai/QwenPaw/pull/6874)** — 自 10 Aug 开放，仍 Under Review；与本周挂起 RPC 工作成对。
9. **[\#7361 chat virtualization](https://github.com/agentscope-ai/QwenPaw/pull/7361)** — 后端分页已有；前端才是用户感到卡死的地方。
10. 文档卫生：**[\#7391](https://github.com/agentscope-ai/QwenPaw/pull/7391)** 记录了一个不存在的 `QWENPAW_MEMORY_COMPACT_THRESHOLD`。小事，不该活到 2.2.0 正式版。

---

**健康快照：** 发版速度与贡献者广度都很强；2.2.0 有一条连贯叙事（Hub、现代 MCP、外部 harness）。约束不在点子 — 而在打包运行时的 TLS、通道配置完整性，以及会话历史不变量。这三件事决定 Hub 是作为团队产品上线，还是又一个多了登录字段的个人助手 beta。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

我将收集当前 ZeroClaw 仓库的上下文，使摘要贴合今日活动，而非仅停留在快照上。正在拉取发行版与若干高信号 issue，以便摘要能把冻结周的稳定化工作与仍开放的事项区分开来。
# ZeroClaw Project Digest — 2026-08-30

Source window: last 24 hours on [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw). Snapshot: **9 issues updated**（7 open / 2 closed），**50 PRs updated**（44 open / 6 merged or closed），**0 new releases**。当前已发布版本线仍为 **v0.8.4**。**v0.8.5** 稳定化里程碑今日到期（约 70% 已关闭：462 / 657）。

---

## 1. 本周概览

ZeroClaw 正处于**冻结周稳定化冲刺**，而非功能发布周。v0.8.5 的纳入窗口已于 4 August 冻结；剩余队列为缺陷、回归、安全、CI/policy、测试、文档与打包。30 August 的活动对冻结期而言异常密集：24 小时内 50 个 PR 更新，几乎全部针对 `master`，维护者 **Audacity88** 当天推动了一大批改动（风险审批 CI、`local_small` 提示词预算、ACP 会话可见性、ZeroCode “Processing” 卡住、内存快照灌入、审计日志轮转、PowerShell 模块路径、成本汇总周期）。这一体量是**健康的收尾信号**，而非混乱的纳入高峰：标签集中在 `risk:medium`/`risk:high`、`status:in-progress`、`zerocode`、`runtime`、`channel:core` 和 `domain:security`。项目依然体量大、运营热度高（~32.7k stars，数小时内仍有推送），但产品姿态是「落地已就绪子集，未完成工作后移」，而非「再开新表面」。

今日没有打 tag 的版本切出。若 8 月最后一次周切会发布，将从冻结期已就绪子集组装，而不是等每一个开放的 v0.8.5 项都完成。

---

## 2. 发行版

**2026-08-29 或 2026-08-30 无新的 GitHub releases。**

最新已发布版本仍为 **[v0.8.4](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.4)**（2 August 2026）：v0.8.3 SOP/WASM/desktop 波次之后的维护与加固。官网仍列出 v0.8.4。今日到期的 **[v0.8.5 milestone](https://github.com/zeroclaw-labs/zeroclaw/milestone)** 是一条有限、非破坏性的稳定化线；未完成工作预计会移至 Parking Lot 或 **[v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/milestones)**（authn/authz、按主体隔离、未认证 WSS 关闭）。

---

## 3. 项目进展

过去 24 小时关闭的集合不大，但与冻结目标对齐。

**已关闭的 issues**
- [#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001) — Provider 回合失败不再应把原因特定的诊断信息藏在通用的 `All model_providers/models failed` 重试信封之下（S2，`provider:reliable`）。Closed 2026-08-30。
- [#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086) — ZeroCode Logs 面板文本现可选择/复制。Closed 2026-08-30。

窗口内有 **Six PRs merged or closed**（标题不在所提供的 top-20 open list 中）。开放 PR 集合显示的是即便尚未合并、仍在*推进*的事项：

| Theme | Evidence | Link |
|---|---|---|
| 发布治理 | 仅报告的风险分类器 + `risk:high` / `domain:security` 需两名 Core Team 批准 | [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461) implements tracker [#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185) |
| 本地优先运行时 | 紧凑的 `local_small` profile、8k system-prompt 上限、精简 skill metadata | [#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465) → [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) |
| ACP / Code sessions | Session 工具获得按 alias 范围查看自己拥有的 Code sessions | [#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468) → [#10292](https://github.com/zeroclaw-labs/zeroclaw/issues/10292) |
| ZeroCode TUI 稳定性 | 用 `session/prompt` 作为完成围栏，使丢失的终端事件不会把界面留在 `Processing` | [#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) → [#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302) |
| 内存完整性 | 快照导出对无法解码的 SQLite 行采取失败关闭；冷启动灌入是事务性的 | [#10469](https://github.com/zeroclaw-labs/zeroclaw/pull/10469) |
| 审计 / 安全 | 日志轮转时保持审计链完整（stacked，`risk:high`） | [#10463](https://github.com/zeroclaw-labs/zeroclaw/pull/10463) |
| 频道 / 语音 | 可选的 VoiceHost WebSocket bridge，用于 FunASR/SenseVoice | [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740) |
| 沙箱策略 | Landlock 尊重 `allowed_roots` 的读/写层级 | [#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100) |
| 首次运行质量 | 封闭的 Quickstart adapter 序列化测试 | [#10460](https://github.com/zeroclaw-labs/zeroclaw/pull/10460) toward [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766) |

同日批次中还有：PowerShell `PSModulePath` 保留（[#10464](https://github.com/zeroclaw-labs/zeroclaw/pull/10464)）、成本汇总周期修正（[#10462](https://github.com/zeroclaw-labs/zeroclaw/pull/10462)）、MCP 持久 SSE 事件边界处理（[#10459](https://github.com/zeroclaw-labs/zeroclaw/pull/10459)）、WebSocket 依赖门控（[#10467](https://github.com/zeroclaw-labs/zeroclaw/pull/10467)）。

净结果：今日推进最远的是**运行时正确性、ZeroCode 可操作性、本地模型提示词卫生，以及评审策略校准**。新的产品表面（VoiceHost、更丰富的频道卡片）仍开放，且大多被 `needs-author-action` 或 `risk:high` 卡住。

---

## 4. 社区热点

所提供 PR 列表的评论数不可用（`undefined`）。Issue 讨论是可用的热度信号。

**讨论最多的 issues**
1. **[#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)** — *refactor(gateway): centralize webhook channel message dispatch* — **9 comments**，open since 2026-07-01，仍为 `in-progress`。需求：一个 webhook-to-channel 入口辅助，使 webhook 支撑的频道保留传输层特定的解析 + 快速 ACK，但共享 autosave、agent dispatch、回复/错误投递以及 quickstart 处理。底层诉求是**频道架构一致性**——随着 30+ 种传输积累一次性生命周期缺陷。
2. **[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)** — *compact `local_small` runtime profile and prompt-budget contract* — **7 comments, 2 👍**，open since 2026-04-04。需求：压缩本地模型的提示词膨胀，关闭宽松的回退解析，停止把 tool/system 指令泄漏到用户可见输出。这是本窗口内最清晰的**本地优先用户痛点**，现已有实现 PR（[#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)）。

**最高速度的 PR 主题（今日有更新，不少为 XL）**
- 治理：[#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461)
- 语音频道：[#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740)
- ACP 工具：[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)
- 审计链：[#10463](https://github.com/zeroclaw-labs/zeroclaw/pull/10463)

**需求分析。** 运维人员同时要三件事：(1) **本地小模型守住预算且不泄漏内部信息**，(2) **ZeroCode/ACP session 工具与 UI 已展示的内容一致**，(3) **共享的频道/网关入口，而非按传输各写一套**。维护者同时在提高**谁可以合并 `risk:high` / `domain:security` 工作**的门槛。这一组合——面向用户的可靠性加上评审校准——才是 30 August 的真正议题。

---

## 5. 缺陷与稳定性

按声明的严重程度与运营爆炸半径排序。所列条目均在本 24 小时窗口内有更新。

| Rank | Severity | Issue | Status | Fix PR |
|---|---|---|---|---|
| 1 | S2 / high operational cost | [#10292](https://github.com/zeroclaw-labs/zeroclaw/issues/10292) — ACP session 工具无法列出或检查 Code sessions（`sessions_list` 漏掉侧边栏可见的近期 Code sessions） | OPEN, in-progress | [#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468) |
| 2 | S2 | [#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302) — 浏览历史时 ZeroCode Code pane 停留在 `Processing`，并持续抬高 CPU | OPEN, in-progress | [#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) |
| 3 | S2（closed today） | [#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001) — provider 失败被埋在通用重试信封下（LM Studio / Ollama 及其他不同原因看起来一样） | CLOSED | related attribution work still open in [#10415](https://github.com/zeroclaw-labs/zeroclaw/pull/10415) |
| 4 | Degraded RPC | 断开连接后挂起的 JSON-RPC 调用一直悬挂 | OPEN PR | [#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260)（`needs-author-action`） |
| 5 | False-healthy channels | 从未连接的频道 `/health` 仍报告 `ok`（listener future ≠ connected） | OPEN PR | [#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005) |
| 6 | Memory integrity | 快照灌入可能静默丢弃无法解码的 SQLite 行 | OPEN PR | [#10469](https://github.com/zeroclaw-labs/zeroclaw/pull/10469) |
| 7 | Windows runtime | 净化后的 shell env 丢掉了 `PSModulePath`，破坏安全的 PowerShell pipelines | OPEN PR | [#10464](https://github.com/zeroclaw-labs/zeroclaw/pull/10464) |
| 8 | Cost observability | `daily_cost_usd` / `monthly_cost_usd` 的周期计算相对全时段 `session_cost_usd` 有误 | OPEN PR | [#10462](https://github.com/zeroclaw-labs/zeroclaw/pull/10462) |
| 9 | MCP transport | 当负载超过 `max_response_bytes` 时，持久 SSE 事件边界未被保留 | OPEN PR | [#10459](https://github.com/zeroclaw-labs/zeroclaw/pull/10459) |
| 10 | Clipboard / TUI | 剪贴板清理失败未被表面化；临时附件必须仍由当前回合持有 | OPEN PR | [#10443](https://github.com/zeroclaw-labs/zeroclaw/pull/10443) |

本快照中未出现崩溃级（S0/S1）条目。当前风险是**运维体验降级与错误遥测**，集中在 ZeroCode、ACP session 工具、provider 错误归因和频道健康。

相关仍开放的高风险正确性 PRs：cron owner-qualified triggers（[#10414](https://github.com/zeroclaw-labs/zeroclaw/pull/10414)），模型路由更新后的保存后 provider probe（[#10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034)），approval-card 批次位置（[#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004)）。

---

## 6. 功能请求与路线图信号

**本窗口内的活跃请求**
- 紧凑本地运行时 / prompt-budget 契约 — [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) + [#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)
- 共享 webhook channel dispatch — [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)
- 首次运行 / quickstart 用户行为 E2E — [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766) + [#10460](https://github.com/zeroclaw-labs/zeroclaw/pull/10460)
- 显式 ZeroCode keybinding 冲突报告 — [#10458](https://github.com/zeroclaw-labs/zeroclaw/issues/10458)（opened today）
- VoiceHost WebSocket bridge — [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740)
- Landlock `allowed_roots` 层级 — [#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)
- approval cards 上的 tool-call 批次位置 — [#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004)
- PR 风险/安全审批校准 — [#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185) + [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461)
- 可选中的 ZeroCode logs — [#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086)（**done**）

**近期可能（v0.8.5 final cut，若发布）**  
仅缺陷/回归/安全/CI 项：ZeroCode Processing hang、ACP session listing、provider 诊断信封、内存快照 fail-closed、成本周期修复、PowerShell env、仅报告的风险审批 CI、首次运行测试覆盖。若评审者把 `local_small` 视为与冻结兼容的运行时加固而非新功能，则可能合入。

**下一条可能线（v0.9.0 / later named milestones）**  
VoiceHost、Landlock root tiers、webhook dispatch 统一、keybinding 冲突 UX、approval-card 批次元数据，以及 v0.9.0 的头条认证栈（OIDC / ssh-key / peercred / native 置于 RPC/WSS 之前，per-user × per-agent authorization，按主体的内存隔离）。Identity & Access 仅 **17% closed**（5 / 28），是结构性后续，而非 30 August 交付物。

---

## 7. 用户反馈摘要

Issue 文本由运维人员撰写，并非社交媒体情绪。反复出现的痛点：

- **本地模型在提示词形态上是二等公民。** 使用 Ollama / LM Studio 的用户会遇到提示词膨胀、泄漏的 system/tool 文本，以及把 “daemon not running” 与 “model missing” 藏在一起的通用 “all providers failed” 信封。（[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)，[#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001)）
- **ZeroCode 对状态撒谎。** 浏览历史可停留在 `Processing`、烧掉 CPU、丢掉 prompt-complete 通知，即便侧边栏已显示，仍对 agent 工具隐藏 Code sessions。（[#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)，[#10292](https://github.com/zeroclaw-labs/zeroclaw/issues/10292)，[#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260)）
- **首次运行仍会产出看似合理但错误的配置。** #8505 已经展示过一条看起来没问题其实有问题的首次运行路径；#8766 要求覆盖 quickstart、ZeroCode onboarding、doctor 与运行时接线的用户行为 E2E。
- **TUI 纸割伤会叠加不信任。** 日志直到今日才可选择；keybindings 可能被接受却悄然不可达（[#10458](https://github.com/zeroclaw-labs/zeroclaw/issues/10458)）。
- **多工具体量下，频道健康与审批难以操作。** 连接前 health 就可显示绿色（[#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005)）；堆叠的 approval cards 无法区分（[#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004)）。

满意度信号是间接的：贡献者在冻结日仍持续提交 XL 加固 PRs，且两个用户可见的纸割伤已关闭（#9001，#10086）。不满集中在**本地运行时诚实性**与 **ZeroCode/ACP session 保真度**——人们整天盯着的那些表面。

---

## 8. 待办观察

重要、陈旧、或卡在人而非代码体量上的事项。

**长期开放且已接受的工作**
- [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) — opened **2026-04-04**，仍为 accepted / in-progress / `risk:high`。实现终于存在（[#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)）；需要一次冻结策略判断：现在落地还是滑到 v0.9.0。
- [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) — opened **2026-07-01**，9 comments，架构后续仍开放。
- [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766) — opened **2026-07-06**，`priority:p1`，`risk:high`，首次运行 E2E 仍为 in-progress。

**等待作者或维护者的 PRs**
- `needs-author-action`：[#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740) VoiceHost，[#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260) RPC disconnect，[#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005) channel health，[#10415](https://github.com/zeroclaw-labs/zeroclaw/pull/10415) reliable stream attribution，[#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004) approval-card batch index，[#10414](https://github.com/zeroclaw-labs/zeroclaw/pull/10414) cron owner guards。
- `needs-maintainer-review`：[#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100) Landlock roots（`domain:security`，`risk:high`），[#10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034) provider probe after routing update（`risk:high`）。

**流程观察**
- [#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185) / [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461) 必须在 automatic risk-label mutation（#9345）**之前**落地。评审者应将其视为发布基础设施，而非可选的 docs/CI。
- 堆叠 PRs [#10463](https://github.com/zeroclaw-labs/zeroclaw/pull/10463)（audit rotation）与 [#10467](https://github.com/zeroclaw-labs/zeroclaw/pull/10467)（WebSocket deps）在父 PR 合并前会产生嘈杂 diffs；需要明确的 “owned range” 评审，而非整份 diff 评审。

**v0.8.5 收尾风险。** Milestone due date 就是今天，仍有约 195 items still open。策略已说明 weekly cuts 发布就绪子集，未完成工作后移。要盯的待办不是 “can 195 issues close today”——而是 **ACP session visibility、ZeroCode Processing、provider diagnostics、以及 risk-approval CI** 能否进入切出版，以及 `local_small` 是否被归为 freeze-legal 加固。

---

**健康读数：** 吞吐高、所有权集中、严重程度组合是 S2-not-S0，里程碑表述与 PR 组合匹配。30 August 的项目健康是**运营上高强度、方向上有纪律**：冻结纪律在标签层仍成立，而 ZeroCode + 本地运行时诚实性仍是用户可见的薄弱点，将决定最后一次 v0.8.5 cut 是否让人觉得做完了。

</details>