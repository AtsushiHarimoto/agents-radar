# OpenClaw 生态周报 2026-09-12

> Issues: 151 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-12 03:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw Project Digest — 2026-09-12

**Repo:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  
**范围:** 以最近 24 小时为中心，并覆盖 2026.9.x / June LTS 发布簇的活动窗口  
**快照规模:** 151 个 issue 有更新（77 仍开放 / 74 已关闭），500 个 PR 有更新（287 开放 / 213 已合并或关闭），4 个新 release  
**项目体量背景:** 约 389k stars、约 82k forks、3,140 位贡献者，MIT，TypeScript；由 OpenClaw Foundation 托管。

OpenClaw 是自托管的个人/团队 AI 助手网关：一个本地 Gateway 进程，对接多种聊天渠道（Discord、Telegram、Slack、Teams、WhatsApp、iMessage 以及另外 20+ 种），原生应用、可插拔模型/harness，以及设备端状态。

---

## 1. 本周总览

OpenClaw 正处于高吞吐的九月节奏：大约一周内落地四个 tagged release（`2026.9.2` → `2026.9.4`，外加最终的 June LTS `2026.6.35`），而最近 24 小时单独就推动了 151 个 issue 和 500 个 PR。这个量级符合它已从安静的库，变成自托管 agent 基础设施的现状。

健康度喜忧参半，但方向在变好。产品面在扩张（统一 Plugins workspace、prepared cloud sessions、Skill Workshop、Control UI 打磨、GPT Image 2.5 / GPT-6 Astra）。与此同时，**更新/迁移可靠性是当前最主要的线上事故类型**：Doctor 拒绝、schema-17 candidate 不匹配、macOS npm「global install swap」失败，以及 runtime-verification 失败，正随着 `2026.9.3` → `2026.9.4` 发版被持续报出。维护者把这当成一等优先级——rollback、rehearsal，以及 ownership-safe probe 是 `2026.9.4` 的头条——但走 2026.7.x → 2026.9.x 混合路径的运维人员，仍会撞上 P0 阻断。

社区信号也很明确：进程泄漏、session 状态丢失、渠道截断（Discord/Telegram），以及 Doctor/schema 修复路径产生最多评论。项目并不缺贡献者；缺的是维护者对大量 ready-for-look 队列的审查带宽。

---

## 2. Releases

窗口内共四个 release。当前 latest stable 是 **`2026.9.4`**（9 月 11 日）。June LTS 以 **`2026.6.35`** 收官。

### `v2026.9.4` — latest stable ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4))

约 9 月 11 日发布。要点：

- **对兼容的失败更新做 rollback。** 当 schema + config 检查认为回滚安全时，保留上一份 package 并恢复先前的 config/service。数据库迁移仍要求有经过验证的更新前备份。([#140339](https://github.com/openclaw/openclaw/pull/140339))
- **统一 Plugins workspace。** 在 Control UI 中发现 bundled + ClawHub 插件，并完成安装与配置。([#135839](https://github.com/openclaw/openclaw/pull/135839) 及相关)
- **Prepared cloud sessions。** 从已准备好的本地项目或公开 GitHub repo 启动符合条件的 Linux session；在 Control UI 中构建可复用 snapshot。就绪 worker 在删除前会持续产生 provider 费用。
- Gateway 与本地 TUI 中的终端提问提示（键盘 / 自由文本 / 多问题）。
- 通过 OpenAI 或 fal 使用 GPT Image 2.5 Flare / Sunburst。
- 中断流以及 chat→history 交接后，更强的对话历史恢复。
- Voice 路径在多轮委托后返回 subagent 结果。
- `OPENCLAW_CONFIG_READONLY=1`，用于外部托管的配置。

**迁移说明:** 自动 rollback 会被改 schema 的升级、不兼容的新 DB，或 candidate 启动后运维人员改过配置所阻断。带迁移的升级前请使用[已验证备份](https://docs.openclaw.ai/install/updating/rollback-and-recovery)。Node 下限仍是 **24.16+ 或 26.1+**。

### `v2026.9.3` ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3))

- 更安全的更新：在隔离的 candidate 状态中预演 core/plugin 变更，再激活；在不停止健康且匹配的 Gateway 的前提下，恢复被遗弃的更新记录。
- 相关：[#136997](https://github.com/openclaw/openclaw/issues/136997)、[#138839](https://github.com/openclaw/openclaw/pull/138839)、[#141109](https://github.com/openclaw/openclaw/pull/141109)。

当前许多 P0 更新 bug 正是从这一版本报出。

### `v2026.9.2` ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.2))

- 长 transcript 与磁盘工作离开 Gateway event loop 后，chat/dashboards/session UI 更快；持久化 history 读取；dashboard 直接查找。([#136862](https://github.com/openclaw/openclaw/issues/136862)、[#138](https://github.com/openclaw/openclaw) cluster)

### `v2026.6.35` — 最终 June 2026 Extended Stable / LTS ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35))

- 更安全的 provider/channel 边界：约束不受信任的响应体，在昂贵工作前拒绝过大输入，传输失败时保留安全恢复。
- 作为 2026.6 LTS 线的最后一版；无法承接 September schema 工作的运维人员应停留在此，直到存在经过验证的备份 + Doctor 路径。

9.4 说明里没有明确的「breaking API」横幅，但 **schema 17 candidate rehearsal** 以及 Doctor attestation/workspace 迁移，对跳过备份的升级事实上构成破坏性变更。

---

## 3. 项目进展

最近 24 小时关闭或合并了 **213 个 PR**，关闭了 **74 个 issue**。这不是功能冻结，而是产品面扩展与更新路径加固的双轨并行。

**已在 2026.9.x 落地或推进中**

| 领域 | 进展内容 |
|---|---|
| Updates / Doctor | 隔离 candidate rehearsal、兼容失败 rollback、遗弃记录恢复、ownership-safe capability probe |
| Plugins / Skills | 统一 Plugins UI、ClawHub 发现、Skill Workshop 迁移、仅 workspace 的个人 skill 读取 |
| Control UI / apps | IndexedDB 关闭后的历史恢复、settings 导航共享、默认桌面尺寸侧栏、model-picker 缓存、原生 Gateway 快捷键 |
| Sessions / chat | 离开 event loop 的 transcript 工作、Doctor 中的 omitted-history 导入、流式块失败后保留最终答案 |
| Cloud / workers | 从本地 Git 或公开 GitHub 准备 worker；chat 前 snapshot |
| Models / media | GPT-6 Astra（9.2）、GPT Image 2.5（9.4）、更长的语音备忘转录（去掉 1,200s decoder 上限） |
| Ops | 只读配置模式、削减 Prometheus 日志开销、repository checkpoint 延迟 |

**维护者撰写 / 已就绪待审的活跃 PR（9 月 12 日）** 主题一致：压缩 Doctor 文案（[#145577](https://github.com/openclaw/openclaw/pull/145577)）、更新结算诚实性（[#145321](https://github.com/openclaw/openclaw/pull/145321)）、不做 state migration 的 candidate probe（[#145547](https://github.com/openclaw/openclaw/pull/145547)）、过期 Codex migrations（[#145043](https://github.com/openclaw/openclaw/pull/145043)）、UI 恢复（[#145545](https://github.com/openclaw/openclaw/pull/145545)）。

进展是真实的。缺口在于：本周若干面向用户的 P0（Doctor 拒绝遗留 workspace、macOS 上的 npm swap、9.3→9.4 candidate 用旧 binary 对着 schema 17 跑）是在「更安全更新」的宣传落地**之后**才被报出的。

---

## 4. 社区热点

先按所给 24 小时 issue 切片中的评论数排序，再按线程实际讨论内容。

### 进程 / 运行时完整性

1. **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — *OpenClaw 泄漏未回收的 hook/tool 子进程*（OPEN，16 条评论，P1，丢消息 + crash-loop）。主进程下出现僵尸 `openclaw-hooks` / `bash` / `codex` 子进程。本集合中存活最久、评论最多的高热 bug（2026-06-29 开启，9 月 12 日仍在动）。
2. **[#144911](https://github.com/openclaw/openclaw/issues/144911)** — MCP init 超时通过未处理的 rejection `service child cleanup identity lost` 把整个 Gateway 打崩（OPEN，7 条评论，P1，diamond-lobster）。与子进程卫生问题直接相邻。

**需要:** 单一的子进程生命周期负责人（reap、identity、timeout），且不能把 Gateway 一起拖垮。

### 升级 / Doctor 作为产品面

3. **[#142585](https://github.com/openclaw/openclaw/issues/142585)** — `2026.9.3` 的 Doctor 在缺少 canonical 行时拒绝有效的遗留 workspace + attestation 导入（OPEN，15 条评论，P0，gold-shrimp，UX 发版阻断）。
4. 9 月 12 日新鲜的更新失败报告：**[#145510](https://github.com/openclaw/openclaw/issues/145510)** runtime-verification-failed（win32），**[#145491](https://github.com/openclaw/openclaw/issues/145491)** doctor-failed（darwin），**[#144739](https://github.com/openclaw/openclaw/issues/144739)** 9.3 的 npm 更新用 9.3 去跑 schema-17 candidate 状态。

**需要:** 能导入 pre-canonical 状态的 Doctor，以及永远不会用*旧* binary 去执行*新* schema 的 updater。

### 渠道保真（丢消息一类）

5. **[#96007](https://github.com/openclaw/openclaw/issues/96007)** — Discord 多段回复在一行内联错误后被截断（CLOSED，10 条评论）。
6. **[#89954](https://github.com/openclaw/openclaw/issues/89954)** — Telegram `getUpdates` 在 IPv6→IPv4 回退后出现 409 级联；重建循环不取消进行中的 long-poll（CLOSED，7 条评论，P1）。
7. **[#59662](https://github.com/openclaw/openclaw/issues/59662)** — Anthropic Max 用量告警文本被当成 assistant 消息下发（CLOSED，7 条评论）。

**需要:** 渠道适配器把 provider/系统文本与用户可见的 assistant 内容隔离开，并且不会在第一行错误处丢掉多段 payload 的剩余部分。

### Session / compaction / 安全残留

- **[#59618](https://github.com/openclaw/openclaw/issues/59618)** auto-compaction 静默放弃进行中的 turn（CLOSED，7 条评论）。
- **[#112475](https://github.com/openclaw/openclaw/issues/112475)** 设备移除后 pairing 恢复失败（OPEN，6 条评论，P0）。
- **[#114158](https://github.com/openclaw/openclaw/issues/114158)** `@openclaw/fs-safe` 硬编码 `0o600`，忽略 umask —— 破坏 NFS/SMB 共享 workspace（OPEN，6 条评论）。

9 月 12 日看板上的热门 PR 更少是「被讨论」（评论数常常未设），更多是「等维护者看一眼」：来自 `fuller-stack-dev` / `steipete` 的更新路径 PR，来自 `steipete` / `obviyus` 的 UI 恢复，memory dreaming 报告（[#145458](https://github.com/openclaw/openclaw/pull/145458)），历史 transcript 恢复（[#120781](https://github.com/openclaw/openclaw/pull/120781)）。

---

## 5. Bug 与稳定性

严重度排序使用项目自身标签（`P0` / crash-loop / ux-release-blocker / data-loss），再加上所给切片中是否能看到修复 PR。

### P0 / 发版阻断

| Issue | 症状 | 状态 | 可见修复 PR？ |
|---|---|---|---|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Doctor 在缺少 canonical 行时拒绝有效遗留 workspace/attestation | OPEN | 不在顶部 PR 列表中 |
| [#145072](https://github.com/openclaw/openclaw/issues/145072) | macOS npm 更新在「global install swap」失败；launcher fingerprint 包含 symlink mode；shim 备份从未 chmod | CLOSED（9 月 11 日提交） | 视为可排队/可源码复现；很可能被吸收进 9.4 的 rollback 工作 |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | 9.3→9.4 更新 `runtime-verification-failed`（Windows） | OPEN | 相关：[#145547](https://github.com/openclaw/openclaw/pull/145547)、[#145321](https://github.com/openclaw/openclaw/pull/145321) |
| [#145491](https://github.com/openclaw/openclaw/issues/145491) | 更新 `doctor-failed`（darwin/arm64） | OPEN | 同一更新簇 |
| [#144739](https://github.com/openclaw/openclaw/issues/144739) | 9.3→9.4 npm 更新用 9.3 对着 schema-17 candidate 跑 | OPEN | 同一簇 |
| [#142586](https://github.com/openclaw/openclaw/issues/142586) | Doctor 发现孤立的 `task_delivery_state` FK，没有受支持的恢复路径 | OPEN | 无 |
| [#144672](https://github.com/openclaw/openclaw/issues/144672) | Control Port 填错后 App 不给出可操作错误 | OPEN | 无 |
| [#112475](https://github.com/openclaw/openclaw/issues/112475) | 设备移除后的 pairing 恢复 | OPEN | 无 |

### P1 / crash-loop / 进程

| Issue | 症状 | 状态 | 备注 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 未回收的 hook/tool 子进程 → 僵尸、性能退化 | 自 6 月起 OPEN | 评论最多的开放 bug |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP init 超时 → 未处理 rejection → Gateway 宕机 | OPEN | 修复形态清晰 |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | 2026.8.1 后，大型 skill/agent 舰队下 Gateway 在文件系统发现中钉死一个 CPU 核 | OPEN | 需要维护者 + 更多信息 |

### P1–P2 丢消息 / session 状态（不少已因 stale 关闭，仍有诊断价值）

已关闭但仍有更新的线程（[#96007](https://github.com/openclaw/openclaw/issues/96007)、[#59618](https://github.com/openclaw/openclaw/issues/59618)、[#89954](https://github.com/openclaw/openclaw/issues/89954)、[#59563](https://github.com/openclaw/openclaw/issues/59563)、[#97163](https://github.com/openclaw/openclaw/issues/97163)）呈现出稳定模式：compaction、渠道错误或 session 重建会*静默*丢掉工作。仍开放的近亲包括：

- [#145562](https://github.com/openclaw/openclaw/issues/145562) — 尽管报告声称已包含，原生 Gemini `systemInstruction` 中仍缺少 `available_skills`。
- [#145503](https://github.com/openclaw/openclaw/issues/145503) — 9.3 Workshop 迁移后 `skill_workshop` 未注册；`doctor --fix` 建议一个其自身 resolver 会拒绝的 `alsoAllow`。
- [#130249](https://github.com/openclaw/openclaw/issues/130249) — 异步 exec 完成结果可能落到错误 session。
- [#112313](https://github.com/openclaw/openclaw/issues/112313) — 进入 dead-letter 的出站队列行是永久的；没有 CLI/RPC/TTL 清理。
- [#75187](https://github.com/openclaw/openclaw/issues/75187) — `AGENTS.md` 把承重的 tool 规则放在底部；`bootstrapMaxChars` 的头部截断会把它们削掉。

### 稳定性读法

九月发布改善了*设计意图上的*更新安全性（rehearsal、rollback、离 loop 的 history）。11–12 日的现场证据则表明 rehearsal 本身仍是崩溃/阻断面：candidate schema 跑在运行中 binary 前面、Doctor lint snapshot 清理（[#138260](https://github.com/openclaw/openclaw/issues/138260)）、Workshop retarget 循环（[#142583](https://github.com/openclaw/openclaw/issues/142583)）。把 `2026.9.4` 当成「如果存在更新前备份就更安全」，而不是「升级已经无聊」。

---

## 6. 功能请求与路线图信号

反复出现的面向用户请求，以及 9.4 已经开始交付的内容：

| 请求 | 信号 | 近期可能落地？ |
|---|---|---|
| 可协作的 markdown Canvas（可编辑，不只渲染）— [#77798](https://github.com/openclaw/openclaw/issues/77798) | 6 条评论，2 个 👍，product-decision 标签 | 中等；Canvas 已作为仅渲染存在 |
| Session fork / resume / continue（open-agent-sdk 对等）— [#59109](https://github.com/openclaw/openclaw/issues/59109) | 自 4 月起反复出现 | 部分：Telegram 中的 spawn/bind 工作 [#145543](https://github.com/openclaw/openclaw/pull/145543) |
| 多 agent workspace 的共享 memory DB — [#144699](https://github.com/openclaw/openclaw/pull/144699) | 开放 PR，存在 security-boundary 合并风险 | 若审查通过，可能进入下一版本 |
| Feishu / Teams / Mattermost 的原生批准按钮 — [#104521](https://github.com/openclaw/openclaw/issues/104521) | 维护者自己提的请求 | 有可能；类型化 approvals 已存在 |
| 安装/CLI 无障碍（13 处 VoiceOver 障碍）— [#126876](https://github.com/openclaw/openclaw/issues/126876) | 首次公开的视障用户安装审计；P0 UX blocker 标签 | 若 P0 标签被当真，应进下一版本 |
| Cron `--until` / `--max-runs` — [#130247](https://github.com/openclaw/openclaw/issues/130247) | Quadlets 上的运维用户 | 小，容易塞进补丁 |
| Plugin tool 自定义 Discord emoji — [#97184](https://github.com/openclaw/openclaw/issues/97184) | 小 DX | 容易 |
| Makefile/justfile + scripts 分类法 — [#59736](https://github.com/openclaw/openclaw/issues/59736)、[#59728](https://github.com/openclaw/openclaw/issues/59728) | 贡献者入门 | 不太可能压过 P0 |
| Tauri companion 中的内联浏览器面板 — [#145572](https://github.com/openclaw/openclaw/pull/145572) | 维护者 PR，关闭 [#145502](https://github.com/openclaw/openclaw/issues/145502) | 高 — 已在进行中 |
| 登录后的账户模型发现 — [#145190](https://github.com/openclaw/openclaw/pull/145190) | 审查中 | 高 |

**预测的下一 tag 内容（非官方）:** 又一轮更新/Doctor 补丁簇（9.3→9.4 余波）、Gemini skills 注入、迁移后的 Workshop 注册、子进程 reap、Tauri 内联浏览器，以及已停在 ready-for-look PR 里的 model-picker/session UI 打磨。大赌注（共享内存、Canvas 编辑器、完整 session-fork API）会等安全/产品审查。

---

## 7. 用户反馈摘要

**谁在提单:** 生产环境运维，覆盖 macOS arm64、Windows x64、Linux npm-global，以及 Podman Quadlet / 多渠道（Mattermost + Telegram）舰队。若干报告是在 OpenClaw *内部*生成的（[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#145491](https://github.com/openclaw/openclaw/issues/145491) 上的 `openclaw-update-report:` hash）——产品已经在给自己报事故。

**痛点**

- **升级感觉像第二个产品。** 熬过 2026.7.x → 2026.9.3 的用户，随后在 9.3 → 9.4 上栽在 Doctor、runtime verification 或 npm swap。说明里有 rollback；现场报告仍是机器被卡住。
- **静默丢失。** Compaction 丢掉当前 turn。Discord 在一行错误后丢掉后面所有内容。Session 重建丢掉历史。长 session 里 tool 输出变成 `""`（[#111469](https://github.com/openclaw/openclaw/issues/111469)）。用户没有重试入口。
- **Gateway 是单一脆弱点。** 一次 MCP 超时、一次繁忙的文件系统遍历，或一次僵尸 hook 泄漏，就能钉死一个核，或杀掉拥有全部渠道的那个进程。
- **共享 / 多用户 / 多 agent 部署** 与个人笔记本默认值冲突：`0o600` 文件、每 agent 一份 memory DB、无法升级的 pairing 作用域。
- **Doctor 撒谎或走进死胡同。** 它报告 Workshop 提案已被 retarget，随后再次标记；建议一个它自己不会接受的 `alsoAllow`；检出孤立 FK 却没有修复。

**满意信号**

- 来自 `steipete`、`obviyus`、`fuller-stack-dev`、`Patrick-Erichsen`、`vincentkoc` 的大量 PR，加上 3k+ 贡献者，说明人们*确实*在这套栈上构建。
- 渠道覆盖以及「一个 Gateway，任意聊天应用」仍是用户留下的原因。
- UI/应用工作（侧栏快捷键、已保存消息恢复、模型目录缓存）以小时而不是月为单位落地。
- LTS `2026.6.35` 的存在本身，就是在承认并非每位运维都能跟上 September 的 schema 列车。

**野外用例（来自 issue 文本）:** 常驻 Telegram/Discord/Mattermost 助手、单 Gateway 上的大型 skill/agent 舰队、Chrome 扩展浏览器中继 + CDP、`approvalPolicy: "never"` 的 Codex app-server、飞书卡片、Gmail hooks + Signal 通知、来自公开 GitHub 的 cloud worker、多用户 NFS workspace。

---

## 8. Backlog 观察

既老、影响又大，仍在等维护者决策、安全审查或清晰恢复路径的事项。

**需要人做决定，而不是再一次 stale close**

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程（自 6 月 29 日起开放；16 条评论）。
- [#112475](https://github.com/openclaw/openclaw/issues/112475) — 设备移除后的 pairing 恢复（P0，自 7 月 22 日起开放）。
- [#114158](https://github.com/openclaw/openclaw/issues/114158) — `0o600` vs 共享 workspace（安全 + 产品）。
- [#75187](https://github.com/openclaw/openclaw/issues/75187) — `AGENTS.md` 截断红线（安全相邻；已有关联 PR）。
- [#120571](https://github.com/openclaw/openclaw/issues/120571) — 当 approvalPolicy 为 `never` 时，Codex 原生 exec 不强制执行 `before_tool_call { block: true }`（fails open）。
- [#126876](https://github.com/openclaw/openclaw/issues/126876) — 13 处读屏障碍；首次记录的视障用户安装。
- [#77798](https://github.com/openclaw/openclaw/issues/77798) / [#59109](https://github.com/openclaw/openclaw/issues/59109) — Canvas 编辑器与 session-fork；均打了 `needs-product-decision`。
- [#104521](https://github.com/openclaw/openclaw/issues/104521) — Feishu/Teams/Mattermost 原生批准（维护者提交，仍开放）。

**Doctor / 数据丢失且没有受支持的逃生舱**

- [#142586](https://github.com/openclaw/openclaw/issues/142586) — 孤立 `task_delivery_state` FK，无恢复。
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — 遗留 workspace 被拒绝。
- [#112313](https://github.com/openclaw/openclaw/issues/112313) — 失败的出站行永生。
- [#120781](https://github.com/openclaw/openclaw/pull/120781) — 恢复被省略的历史 transcript；XL，自 8 月 8 日起 ready for look。

**Ready-for-maintainer-look 堆积（风险是审查延迟，不是缺想法）**

👀 列中等待的大型兼容性标签 PR：[#121622](https://github.com/openclaw/openclaw/pull/121622)（macOS nearby discovery 不得覆盖已保存连接）、[#145043](https://github.com/openclaw/openclaw/pull/145043)（过期 Codex migrations）、[#145456](https://github.com/openclaw/openclaw/pull/145456)（校验启动修复；等作者）、[#144954](https://github.com/openclaw/openclaw/pull/144954)（手动个人 skills + sandbox）、[#144699](https://github.com/openclaw/openclaw/pull/144699)（共享 memory DB — security-boundary）。

---

### 健康度一句话

OpenClaw 是一个体量很大、节奏很快的自托管 agent 网关：九月发版在认真加产品（plugins、cloud workers、history、UI），但升级/Doctor 路径仍是主要生产风险。吞吐优秀；静默的消息/session 丢失以及子进程隔离，将决定 2026.9.x 给人的感觉是一条稳定线，还是又一次 rehearsal。

---

## 横向生态对比

# 跨项目对比 — 个人 AI 助手 / Agent 运行时  
**快照日期：** 2026-09-12  
**项目：** OpenClaw · Hermes Agent · IronClaw · QwenPaw · ZeroClaw

---

## 1. 生态概览

2026 年的个人助手技术栈已经拆成曾经同属一个产品的两层：**本地/自托管 Agent 运行时**（进程生命周期、会话、skills/MCP、沙箱）和**多通道控制平面**（Telegram/Discord/Slack/Teams，外加桌面或 Web 控制台）。五个项目现在都把「一个 Gateway、多种表面」当成入场门槛；竞争焦点已经转向**升级安全性、多 profile 隔离、托管 MCP 多租户，以及诚实的取消语义**。九月的活动并不是功能冻结，而是快速产品表面（plugins、cloud workers、Hub、Creator、OIDC）与生产运维人员之间的碰撞——后者无法接受静默丢消息、卡住的数据库，或把一次正确的延迟重启标记为失败的更新器。这个领域已经大到：审查带宽——而不是点子供给——才是最大仓库上的稀缺资源。

---

## 2. 活动对比

来自所提供 digest 的 24 小时 GitHub 窗口，加上当前 tagged 行。健康度是基于合并吞吐、发版诚实度、P0/P1 残留风险，以及「稳定版第一天」的 bug 是否已经配上修复 PR 的定性 1–10 分。

| Project | Stars / forks (approx.) | Issues updated (open/closed) | PRs updated (open / merged-closed) | Latest tag | Releases in window | Health |
|---|---|---|---|---|---|---|
| **OpenClaw** | 389k / 82k | 151 (77 / 74) | 500 (287 / 213) | `2026.9.4` (11 Sep) | 4 (`9.2`–`9.4` + June LTS `2026.6.35`) | **6.5** — 工业级吞吐，升级路径仍是 P0 |
| **Hermes Agent** | 245k / 51k | 13 (11 / 2) | 50 (38 / 12) | `v0.21.2` / `v2026.9.11` | 2 | **7.5** — state.db 专项已落地；updater/生命周期仍有残留 |
| **QwenPaw** | 34.8k / 3.1k | 21 (16 / 5) | 50 (30 / 20) | `v2.2.1` (11 Sep) | 3 (beta.1 → beta.2 → stable) | **6.5** — 功能发版 + 当天 Desktop/MCP/spawn 税 |
| **ZeroClaw** | 32.8k / 4.9k | 5 (5 / 0) | 50 (48 / 2) | `v0.8.5` (5 Sep); 0.8.6 freeze | 0 new this week | **7.0** — 纪律性冻结；XL 安全栈在等审查 |
| **IronClaw** | 12.6k / 1.5k | 6 (6 / 0) | 30 (20 / 10) | `v1.4.0` (27 Aug) | 0 | **7.0** — 无崩溃类问题；托管 MCP 隔离仍未完成 |

**表格解读。** OpenClaw 在社区体量和 issue/PR 通量上都高出一个数量级。Hermes 和 QwenPaw 处于下一档活动带（PR 量相当，issue 密度差很多）。ZeroClaw 的 50 PRs / 2 merges 是审查瓶颈，不是不活跃。IronClaw 体量最小，却是唯一在 24 小时切片里**没有崩溃或数据丢失事故**的仓库。

---

## 3. OpenClaw 的位置

**相对同行的优势**
- **默认基础设施选择。** 约 389k stars、约 3,140 位贡献者、20+ 聊天通道、原生应用，以及同一周既在推 Plugins workspace、预置 cloud sessions、Skill Workshop，又在做 rollback/演练的 Control UI。没有同行能同时匹配通道覆盖面和安装基数。
- **同一家族里明确的 LTS 分叉。** `2026.6.35` 面向无法接受九月 schema 17 的运维。Hermes 和 QwenPaw 发补丁很快，但本窗口内没有宣传并行 LTS 线。
- **会给自己开事故单的产品。** 9 月 11–12 日的若干工单是 OpenClaw 内部生成的（`openclaw-update-report:` hashes）。这是小仓库尚未达到的运维成熟度。

**技术路线差异**
- OpenClaw 是一个 **TypeScript Gateway 进程**：一个本地 daemon、可插拔模型/harness、Doctor 作为一等产品表面、schema 候选先演练再激活。同行切法不同：Hermes 是 Desktop + gateway + 托管 llama.cpp + 多 profile `state.db`；ZeroClaw 和 IronClaw 是以沙箱和 MCP 多租户为原生关切的 **Rust 单二进制 / Agent OS**；QwenPaw 是 AgentScope 的个人 OS **加上** Hub/Creator 平台化。
- OpenClaw 当前工程命题是「更安全的更新」：隔离候选、兼容失败回滚、废弃记录恢复、`OPENCLAW_CONFIG_READONLY`。Hermes 本周的命题是「state.db 绝不能卡住」。ZeroClaw 的是「0.9 之前先做 identity + isolation」。IronClaw 的是「托管 MCP 是多租户的」。QwenPaw 的是「按 agent 路由 + Hub + Creator 1.2」。

**社区体量**
- stars 上 OpenClaw ≫ Hermes ≫ QwenPaw ≈ ZeroClaw ≫ IronClaw。贡献者密度讲的是另一个故事：Hermes 在 0.21.1 到 0.21.2 的四天里记了 **140 位贡献者**；OpenClaw 的问题是 287 个 open PR 队列的维护者审查，不是招人。ZeroClaw 有一小圈出色的核心在推 XL 安全栈。IronClaw 高度集中在核心贡献者（kirikov 以及成对推进的 MCP 工作）。

**抵消领先优势的缺口。** 9 月 11–12 日的现场证据表明，演练本身仍是崩溃/阻塞面（Doctor 拒绝 legacy-workspace、macOS npm 全局安装互换、9.3 二进制对着 schema-17 候选跑、Windows runtime-verification-failed）。同行的爆炸半径更窄。OpenClaw 的体量让每一次升级路径失手都变成机群事件。

---

## 4. 共同技术焦点

本周出现在**两个或以上**项目中的需求。

| Shared need | Who | Specific demand |
|---|---|---|
| **Updater / Doctor 是产品，不是脚本** | OpenClaw, Hermes | OpenClaw：候选 schema vs 正在运行的二进制，被改 schema 的升级挡住回滚。Hermes：延迟重启被标成 `stale`/`partial` (#107402)；拆除早已结束却还 drain 了 1875s (#108729)。 |
| **进程与子进程生命周期隔离** | OpenClaw, Hermes, ZeroClaw | OpenClaw：自六月起未回收的 hook/tool 僵尸 (#97616)；MCP init 超时会干掉 Gateway (#144911)。Hermes：Desktop spawn 风暴，updater vs 仍在跑的 gateway。ZeroClaw：daemon reload 时 RPC 必须关闭 (#10262 merged)。 |
| **取消必须是运行时契约** | QwenPaw, OpenClaw, ZeroClaw | QwenPaw：Stop UI 成功，后端继续跑，下一次发送 409 (#7567)。OpenClaw：compaction/通道错误会把本回合剩余部分静默丢掉。ZeroClaw：ACP interrupt 必须写进 transcript (#10197)。 |
| **多 profile / 多主体隔离** | Hermes, IronClaw, ZeroClaw, QwenPaw | Hermes：切换 profile 泄漏 MCP/secrets，并撞上 slot-3 硬上限（本窗口已关闭）。IronClaw：托管 MCP 目录按 extension id 键控，last-writer-wins (#6778 / #8090)。ZeroClaw：OIDC principals + 私有 principal memory (#8289 stack)。QwenPaw Hub 愿望清单：隔离 workspace 和由管理员拥有的 skills (#7318)。 |
| **托管 MCP / 插件目录正确性** | OpenClaw, IronClaw, QwenPaw, Hermes | OpenClaw：统一 Plugins + ClawHub。IronClaw：merge-not-replace + 按调用方密钥 + SEP-414 `_meta`。QwenPaw：2.2.x 相对 2.1 Hub 的 MCP 注册回归 (#7716)；更严的 allowlist/超时。Hermes：SHA 钉死的插件目录。 |
| **会话 / 历史 / DB 完整性** | OpenClaw, Hermes, QwenPaw | OpenClaw：省略历史的导入、IndexedDB close 恢复。Hermes：整个 0.21.2 发版就是一场 state.db 专项（WAL、FTS、一行就能毁掉列表、profile DB 绑定）。QwenPaw：幽灵会话、workspace 路径回退、会话中途模型配置消失。 |
| **通道保真（禁止静默截断）** | OpenClaw, QwenPaw, IronClaw, ZeroClaw | Discord 多段截断；IPv6 fallback 后 Telegram 409；Slack「connect account」vs channel-not-connected；Telegram 命令菜单和表格渲染；Bluesky/Reddit 缺少 `peer_groups`。 |
| **上下文经济学** | IronClaw, ZeroClaw, Hermes, QwenPaw | IronClaw：128k prompt 上限覆盖 + attachment pointer 模式（约 25k tokens/PDF）。ZeroClaw：按模型窗口比例 compact，而不是固定 32k。Hermes：统一内存 Mac 上原生 ctx 262144 抖动。QwenPaw：可视化 compact + 保留提供商上下文窗口。 |
| **CJK / IME / TUI 输入作为一等公民** | IronClaw, ZeroClaw, QwenPaw | WebChat IME Enter 会提交组字；ZeroCode Delete 空操作且 REPL IUTF8 关闭；Android 换行被推迟。这是复发，不是首次报告。 |
| **成本 / 模型路由诚实度** | Hermes, QwenPaw | Hermes：未知模型按 $0 计费（一份报告里少计约 72%）。QwenPaw：`subagent_model` 被忽略；按任务路由自六月起开放 (#4901)。 |

---

## 5. 差异化分析

| Dimension | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **主下注** | 通用自托管 gateway + Control UI | 多 profile 桌面工作站 + 常驻 gateway | 个人 OS + 团队 Hub + Creator 工作台 | Rust 单二进制、安全优先的 Agent OS | 带托管 MCP / 市场多租户的 Rust Agent OS |
| **目标运维者** | 混合 OS 上的生产机群、多种聊天应用 | 在一台 Mac/PC 上跑多个 bot 的重度用户 | 偏中文的 Desktop + Hub 团队 + 创意任务 | 安全敏感的自托管者、TUI 日常用户 | 多主体宿主、Slack/Telegram 共享工作区 |
| **架构** | TS Gateway、Doctor/schema 演练、plugins | Desktop + `state.db` / `shared-state.db`、托管 llama.cpp | Console/Desktop/Hub、ReMe/PowerContext plugins | 单二进制、Landlock/Firejail/Wasm、ZeroRelay | Rust extensions、SEP-414、agent.market 包 |
| **本周发版姿态** | 四个 tag；产品与迁移加固并行 | 破坏性 store 重写后的明确补丁专项 | 功能稳定版 (2.2.1) 立刻接上 hotfix 漏斗 | 功能冻结 (0.8.6)；identity 工作排队进 0.9 | 无 tag；向 1.4.x / 1.5 加固 |
| **「完成」长什么样** | 升级不再需要第二个产品 | profile 不泄漏；updater 能把延迟重启算进去 | Stop/MCP/spawn 与宣传一致 | 每个表面都有 OIDC principals | 按调用方的 MCP 目录 + attribution |
| **风险形态** | 规模：一次 Doctor 失手 × 巨大安装基数 | DB 类问题关闭后的生命周期 + 设置持久化 | 稳定版第一天的 Desktop/Windows + 多 agent | XL 安全 PR 的审查延迟；Windows CI | 隔离契约自七月下旬起仍开放 |

OpenClaw 赢在**广度**。Hermes 赢在**本地运行时 + 多 bot 桌面**。QwenPaw 赢在**创意/团队表面**（Creator 1.2、Hub）。ZeroClaw 赢在**加固纪律**（类型化插件 schema、失败即关闭的 skill HTTP、0.8.5 里已有的 mTLS relay）。IronClaw 赢在**协议级多租户工作**——更大的 TypeScript gateway 们还没把它当成一等 MCP 契约。

---

## 6. 社区动能与成熟度

**A 档 — 基础设施规模（OpenClaw）。** stars 最高、24 小时通量最高、双轨发版。成熟信号：LTS 线 + 自行申报的更新报告。不成熟信号：更安全更新的营销之后，才出现 P0 升级阻断。这是晚期增长期的基础设施，不是一个库。

**B 档 — 高速度产品运行时（Hermes、QwenPaw）。** 两者大约一周切两到三个 tag，并且当天 issue 配上修复 PR。Hermes 是**在 store 重写之后做稳定**（正确顺序：0.21.0 变更 → 0.21.2 DB 专项 → 剩下的 updater/Desktop）。QwenPaw 是**一边扩张一边稳定**（Hub、Creator、路由，外加一个 cancel/MCP/spawn 窟窿）。本周 Hermes 略更成熟，因为专项有名字、有范围。

**C 档 — 约束型 / 协议成熟（ZeroClaw、IronClaw）。** star 更少，安全与多租户工作占比更高。ZeroClaw **明确冻结功能**并在堆 OIDC；合并速率才是约束。IronClaw 是 **1.4 之后的加固**，切片里没有崩溃类问题；未完成项是七月的隔离 bug，不是进程不稳。两者看起来更像「1.x 契约收尾」，而不是「增长尖峰」。

**迭代 vs 稳定。** 快速迭代：OpenClaw 产品表面、QwenPaw Hub/Creator/providers、Hermes provider/picker/i18n 轨道。正在稳定：Hermes state.db、OpenClaw Doctor/rollback、ZeroClaw 0.8.6、IronClaw MCP merge-vs-replace。整个生态处于**边发版边稳定**，不是冬天。

---

## 7. 趋势信号

1. **升级路径现在就是产品。** Doctor、演练、回滚、drain 预算、延迟重启记账，比新通道更能点燃运维。Agent 开发者应当把「我能不能让这台机器一直跑着再打补丁」当成发布标准，而不是 changelog 脚注。

2. **隔离从 UX 变成了安全边界。** 多 profile Desktop、托管 MCP 目录、配对 scope、`0o600` vs NFS、OIDC principals，是同一需求的不同方言：**一个进程，多个主体**。按 extension id、启动 profile 或「daemon 拥有一切」来键控状态的设计，正在被现场否决。

3. **静默丢失是信任杀手。** compaction 丢掉进行中的回合、Discord 在一行错误后截断、只是表面功夫的 Stop、报告成功却零工作的 Kanban 卡片、长会话里工具返回 `""`。运维可以原谅能重启的崩溃，不会原谅消失的工作。

4. **MCP 既是扩展总线，也是新的多租户 API。** 目录 merge vs replace、SEP-414 attribution、allowlist、超时、SHA 钉死的目录、失败即关闭的 skill HTTP。只要你发 MCP，你就在发一套多租户协议——无论有没有给它起这个名字。

5. **本地运行时策略正在追上宣传的上下文窗口。** 统一内存 Mac 上的 262k ctx、写死的 128k 上限、32k compact 产物、PDF 文本内联约 25k tokens。真正赢的旋钮是 **reserve + pointer 模式 + 按窗口比例 compact**，不是「原生最大值」。

6. **控制平面的诚实度胜过模型目录的宽度。** GPT Image 2.5、GPT-6 Astra、DeepSeek V4.1 Flash、Opus/Fable、Atlas、Serply、Cloudflare Workers AI 都已落地或正在落地。用户仍在为 $0 计费、消失的模型选择、以及忽略 `subagent_model` 的 subagent 开单。路由元数据现在属于可靠性的一部分。

7. **东亚输入与运维不再是边角案例。** IME 提交、Telegram 表格、飞书/钉钉/企业微信/Bale、没有代理就被挡的 arXiv cron、国内 Desktop 路径。把组字和受限网络当事后补丁的仓库，会反复打开同一批 S2/S3 bug。

8. **审查带宽才是市场顶端的真正瓶颈。** OpenClaw 待看队列、ZeroClaw 一天 48 open / 2 merged、IronClaw 几个月前的 SEP-414 意图。对选栈的开发者：优先选冻结/LTS 政策匹配你补丁胃口的项目，并预留预算——**安全隔离 PR 是在审查里变老的，不是在设计里变老的**。

**给 Agent 开发者的实操结论。** 若需要最大通道覆盖和现成运维社区，OpenClaw 是参照系——但请钉住 LTS，或只在有核实备份的前提下吃 9.4。若需要多 bot 桌面加本地 llama.cpp，Hermes 0.21.2 是该落地的修复版。若需要团队 Hub + 创意任务，QwenPaw 2.2.1 是功能线，但还要等 cancel/MCP/spawn 补丁。若需要 Rust 安全姿态或托管 MCP 多租户，ZeroClaw 0.8.5 / 即将到来的 0.9 以及 IronClaw 1.4.x 是契约级赌注——接受更慢的 tag，以及堆叠 PR 合并之前未完成的隔离。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

我将收集当前仓库上下文并填补快照中的缺口，以确保摘要准确。正在获取完整发行说明以及评论最多的议题，以便做出准确概括。正在拉取 v0.21.2 说明的剩余部分以及两条评论数最高的议题。
# Hermes Agent 项目摘要 — 2026-09-12

**Repo:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) · MIT · ~245k stars / ~51k forks  
**当前已打标签版本:** [v0.21.2 (`v2026.9.11`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11)  
**本快照的 24 小时窗口:** 13 个议题更新（11 个开放，2 个已关闭）· 50 个 PR 更新（38 个开放，12 个已合并/关闭）· 2 个新 tag

---

## 1. 本周总览

Hermes Agent 正处于 `v0.21.0` 之后的高速稳定周。Pantheon 发布（Bot Mode、多配置桌面端、session-store 重写）之后，五天内连续打出两个补丁标签：[v0.21.1 (`v2026.9.7`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7) 作为汇总补丁，随后 [v0.21.2 (`v2026.9.11`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11) 被明确定位为 **state.db 可靠性专项**（6 个 PR，仅该专项就关闭了 44 个议题）。24 小时快照仍显示工业级入站流量：50 个 PR 被触及、13 个议题刷新，以及密集的同日缺陷报告与对应修复 PR。合并吞吐与发版节奏健康，但表面积（Desktop + gateway + 本地 llama.cpp + 多配置 + updater）正在产生关联回归——尤其是 updater 排空、配置隔离和成本记账。社区贡献量对一个 agent runtime 而言仍然异常高（0.21.1 到 0.21.2 的四天内记名贡献者 140 人）。

---

## 2. 版本发布

### [v0.21.2 / `v2026.9.11`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11) — 11 Sep 2026  
**“The state.db Patch Release”** · 测于 `04dd80a` · **947** 个非合并提交 · **1,869** 个文件 · **+182,504 / −15,564** · **312** 个已合并 PR · **140** 位贡献者。

**存在理由。** `v0.21.0` 重写了 session-store 的连接处理。在部分安装上这让 `state.db` 变得脆弱：第二个写入者会互相取消 POSIX 锁，健康的 WAL 库被报损坏，一行坏数据就能让 `sessions list` 整条链路挂掉。

**头条修复（state.db 专项，6 个 PR / 44 个议题）：**
- 禁止第二写入者：托管房间迁到 `shared-state.db`；dashboard 先以只读打开；cron 生命周期守卫使用已跟踪的连接注册表；`doctor --fix` 拒绝不安全的 checkpoint（[#108076](https://github.com/NousResearch/hermes-agent/pull/108076) 及 salvage）。
- 健康 WAL 存储不再卡死（OpenZFS 已删除 dentry、`close()` 与 `append_message` 竞态、WSL2 I/O、过期锁横幅）—— [#108082](https://github.com/NousResearch/hermes-agent/pull/108082)。
- FTS 损坏不再拖垮整轮对话；索引独立重建（[#108130](https://github.com/NousResearch/hermes-agent/pull/108130)）。
- 单行损坏不再杀死 list/export/insights（[#108086](https://github.com/NousResearch/hermes-agent/pull/108086)）。
- Session 不再绑定到另一个 profile 的 DB（[#108074](https://github.com/NousResearch/hermes-agent/pull/108074)）。
- 打开 `state.db` 不再获取不必要的写锁（卡顿 4–20s → ~0.01s）—— [#108067](https://github.com/NousResearch/hermes-agent/pull/108067)。

**0.21.1→0.21.2 窗口内还有：**
- 多配置隔离（次级 bot 不再继承默认 allow-list）。
- Desktop 后端在 Bot Mode / roster hover / 切换 profile 时的 spawn 风暴已关闭（[#108069](https://github.com/NousResearch/hermes-agent/pull/108069) 集群）。
- 密码盲凭证保险库（1Password / Bitwarden / 本地 vault）（[#106480](https://github.com/NousResearch/hermes-agent/pull/106480)）。
- SHA 固定的插件目录 + 单一 Desktop Plugins 页面。
- Nous 免费档 + 引导式首次启动（`HERMES_GUEST_ONBOARDING`）。
- Gateway 投递、提供商账单诚实性、Bedrock/Codex/Anthropic 路由、新的选择器模型（DeepSeek V4.1 Flash、GPT Image 2.5、Opus 5 / Fable 5.1）。
- `hermes update` 会点出真正失败原因，且不会在停滞的 fetch 上挂死（[#108053](https://github.com/NousResearch/hermes-agent/pull/108053)）。

**破坏性变更 / 迁移。** 官方按补丁发布。发行说明中没有独立的破坏性变更章节。从 0.21.0 带着卡住的 `state.db` 过来的运维应先升到 0.21.2；该专项就是针对这一类问题。托管房间状态现在落在 `shared-state.db`，而不再是根目录的 `state.db`。

### [v0.21.1 / `v2026.9.7`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7) — 7 Sep 2026  
自 [v0.21.0 (`v2026.8.31`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.31) 以来对 `main` 的补丁汇总，供打标签部署使用。0.21.0→0.22.0 窗口的完整精选说明 **推迟到 v0.22.0**。打标签时的窗口统计：**5,139** 个非合并提交，**4,364** 个文件，**632** 个已合并 PR。

**升级路径（两个标签通用）：** 现有安装使用 `hermes update`；全新安装走官方安装脚本；托管机群应通过各自的部署工具钉死新 tag。

---

## 3. 项目进展

快照并未按编号枚举那 12 个已合并/关闭的 PR。目前能看到的进展：

**24 小时议题集中已关闭的（2 个）：**
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — dashboard/desktop 的 profile 切换是「当前选中 profile + 启动 profile」的混合体（MCP 工具从未加载；`${VAR}` 密钥从错误的 profile 解析）。长帖后关闭（13 条评论，自 19 Jul 起开放）。
- [#102163](https://github.com/NousResearch/hermes-agent/issues/102163) — v0.21.0 在 macOS 上的 profile 切换回归：硬性 3 槽上限 + session 所有权锁。已关闭（9 条评论）。

这两处关闭，再加上 0.21.2 的多配置 / spawn 风暴工作，是本周最清晰的面向产品进展：**多配置 Desktop 被当作正确性问题处理，而不是 UX 点缀。**

**针对今日缺陷已打开的同日修复 PR**（快照中尚未合并，但配对很紧）：

| Issue | Matching PR |
|---|---|
| [#108785](https://github.com/NousResearch/hermes-agent/issues/108785) 自定义端点 Save 会清空密钥 | [#108786](https://github.com/NousResearch/hermes-agent/pull/108786) |
| [#108784](https://github.com/NousResearch/hermes-agent/issues/108784) desktop session 从不记录 `git_branch` | [#108788](https://github.com/NousResearch/hermes-agent/pull/108788), [#108789](https://github.com/NousResearch/hermes-agent/pull/108789) |
| [#108783](https://github.com/NousResearch/hermes-agent/issues/108783) 原生 ctx 262144 在统一内存 Mac 上打爆 swap | [#108790](https://github.com/NousResearch/hermes-agent/pull/108790) |
| [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) 未知模型按 $0 计费 | [#108781](https://github.com/NousResearch/hermes-agent/pull/108781) |

**开放 PR 列表中的其他活跃功能线：** Cloudflare Workers AI 提供商（[#108691](https://github.com/NousResearch/hermes-agent/pull/108691)）、Bale 消息平台（[#97477](https://github.com/NousResearch/hermes-agent/pull/97477)）、波斯语 RTL UI（[#97522](https://github.com/NousResearch/hermes-agent/pull/97522)）、印尼语文档/locale（[#92192](https://github.com/NousResearch/hermes-agent/pull/92192)、[#93632](https://github.com/NousResearch/hermes-agent/pull/93632)）、企业微信 tool-timer 动画（[#96942](https://github.com/NousResearch/hermes-agent/pull/96942)）、引导式首次启动在开工前先完成连接（[#108317](https://github.com/NousResearch/hermes-agent/pull/108317)）、gateway 生命周期通知走独立频道（[#108780](https://github.com/NousResearch/hermes-agent/pull/108780)）。

---

## 4. 社区热点

按本快照评论数排序。

1. **[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)** — 14 条评论，**P1**，仍开放。从 gateway 自身进程树内执行的 `hermes update` 会正确推迟重启直到在途工作完成，但 updater 立刻校验机群、记下 `state: stale`、以 `partial` 收尾，并留下一条永久的 “did not restart running gateways” 警告。需要：**能把推迟重启理解为成功而非失败的 updater 语义。**

2. **[#67605](https://github.com/NousResearch/hermes-agent/issues/67605)** — 13 条评论，现已 **关闭**。Desktop/dashboard 的 profile 切换是半截的（MCP + 密钥绑在启动 profile 上）。驱动该议题的需求：**共享计算宿主进程上真正的按 profile 隔离。**

3. **[#102163](https://github.com/NousResearch/hermes-agent/issues/102163)** — 9 条评论，现已 **关闭**。v0.21.0 把本地后端 3 槽上限做成硬阻断，并加上 session 所有权锁。需求：**多配置 Desktop 用户同时跑超过三个 profile。**

4. **[#76207](https://github.com/NousResearch/hermes-agent/issues/76207)** — 8 条评论，自 1 Aug 起开放。`hermes update` 上的 Vite `configLoader: 'native'` 警告，外加刷新 npm 的请求。需求：**安静、不过时的安装/更新体验**（打包卫生，不是运行时缺陷）。

**底层主题：** 重度用户把 Hermes 当成 **多配置、常驻 gateway + 本地运行时工作站**。痛点集中在这三层交汇处：updater 对上在线 gateway、profile 对上进程身份、托管 llama.cpp 对上统一内存。

---

## 5. 缺陷与稳定性

按标签 + 爆炸半径排序严重程度。“Fix PR” 表示快照窗口内已有对应 PR，不代表已经合并。

| Sev | Issue | Symptom | Fix PR? |
|---|---|---|---|
| **P1** | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) | 一次 *正确的* 推迟重启后，updater 留下永久的 stale-fleet 警告 | 24 小时列表中无专项 PR |
| **P1**（已关闭） | [#102163](https://github.com/NousResearch/hermes-agent/issues/102163) | v0.21.0 profile 切换：3 槽硬上限 + 所有权锁 | 本窗口已关闭 |
| **P2** | [#108729](https://github.com/NousResearch/hermes-agent/issues/108729) | `hermes update` 烧完全部 **1875s** 排空预算；gateway 拆除在 11.2s 内完成且零 session，但一条陈旧的飞书/钉钉 WS 线程 + 未静默的事件循环让 PID 活着 | 未列出 |
| **P2** | [#108785](https://github.com/NousResearch/hermes-agent/issues/108785) | Desktop Custom Endpoint **Save** 会清空 API key；随后 Test 打到模板 `${HERMES_CUSTOM_CUSTOM_API_KEY}` | [#108786](https://github.com/NousResearch/hermes-agent/pull/108786) |
| **P2** | [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) | 未定价 / 别名 / 中转模型 ID 记成 **$0**；一名用户少计约 72%（¥8.20 vs ≈¥29） | [#108781](https://github.com/NousResearch/hermes-agent/pull/108781) |
| **P2** | [#108784](https://github.com/NousResearch/hermes-agent/issues/108784) | Desktop 创建的 session 持久化为 `git_branch = NULL`；泳道标签假装是 `main` | [#108788](https://github.com/NousResearch/hermes-agent/pull/108788), [#108789](https://github.com/NousResearch/hermes-agent/pull/108789) |
| **P2** | [#108783](https://github.com/NousResearch/hermes-agent/issues/108783)（同时打了 feature/dup） | 托管 llama.cpp 在 M1 Max 64 GB 上钉死原生 ctx（262144）；RSS 29–38 GB，swap ~24 GB | [#108790](https://github.com/NousResearch/hermes-agent/pull/108790) |
| **P2** | 相关 PR [#108778](https://github.com/NousResearch/hermes-agent/pull/108778), [#108779](https://github.com/NousResearch/hermes-agent/pull/108779), [#108787](https://github.com/NousResearch/hermes-agent/pull/108787), [#108762](https://github.com/NousResearch/hermes-agent/pull/108762) | Cron worker 把仓库 cwd 继承成终端 CWD；经 Anthropic 走的 Qwen3.8 默认会 think；Copilot ACP 的 “no credential” 被误判为 unknown；llama.cpp 媒体标记泄漏进发出消息 | PR 本身 |
| **P3 / security** | [#108761](https://github.com/NousResearch/hermes-agent/issues/108761) | `web_extract` 仍会转发名字像凭证的不透明查询参数，尽管 URL 安全辅助函数已经标出它们 | 未列出 |
| **P3** | [#108771](https://github.com/NousResearch/hermes-agent/issues/108771) | `_UNCAPPED_PICKER_PROVIDERS` 在规范选择器那一圈不可达——插件提供商永远无法豁免 `max_models` | 未列出 |
| **P3** | [#108782](https://github.com/NousResearch/hermes-agent/issues/108782) | Kanban 的 worker/verifier/lander 卡片报告捏造成功，底层工作量为零 | 未列出 |
| **P3 UX** | [#108791](https://github.com/NousResearch/hermes-agent/issues/108791) | Windows 聊天滚动条 4px / 18% 不透明度——几乎看不见也抓不到 | 未列出 |
| 已关闭，历史 | [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) | 半截 profile 切换（MCP + 密钥） | 本窗口已关闭 |

**稳定性读法：** 0.21.2 关掉了 0.21.0 那一类 *数据库* 回归。当前残留类别是 **进程生命周期**（`hermes update` 排空 / 推迟重启）和 **Desktop 设置持久化**（API key、git 元数据、profile 身份）。[#108729](https://github.com/NousResearch/hermes-agent/issues/108729) 仍是开放中最高的运维风险：拆除已经完成，却还要吃掉 31 分钟排空预算，在每位 gateway 运维眼里都像一次卡死的升级。

---

## 6. 功能请求与路线图信号

近期很可能落地（修复已起草或改动很小）：
- 可配置的本地运行时上下文窗口 / 系统预留上限 —— [#108783](https://github.com/NousResearch/hermes-agent/issues/108783) + [#108790](https://github.com/NousResearch/hermes-agent/pull/108790)。下一补丁概率很高；这是启动策略旋钮，不是新后端。
- 带版本的用户 `model_pricing` 覆盖 —— [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) + [#108781](https://github.com/NousResearch/hermes-agent/pull/108781)。
- Cloudflare Workers AI 作为一等提供商 —— [#108691](https://github.com/NousResearch/hermes-agent/pull/108691)。
- Gateway 生命周期通知走专用频道（别再把 “Gateway shutting down/online” 倒进 home）—— [#108780](https://github.com/NousResearch/hermes-agent/pull/108780)。
- 引导式首次启动：在第一次构建前先连上已选应用 —— [#108317](https://github.com/NousResearch/hermes-agent/pull/108317)（叠在 #108292 上）。

需要拍板（`needs-decision` 标签）：
- 将 Bale 作为捆绑的 Telegram 兼容平台 —— [#97477](https://github.com/NousResearch/hermes-agent/pull/97477)。
- 企业微信原生流式 tool-timer —— [#96942](https://github.com/NousResearch/hermes-agent/pull/96942)。

文档 / i18n 线（P3，慢热但今天仍在动）：
- 印尼语根文档 + Docusaurus locale —— [#92192](https://github.com/NousResearch/hermes-agent/pull/92192)、[#93632](https://github.com/NousResearch/hermes-agent/pull/93632)。
- 完整波斯语 UI，含 RTL + Vazirmatn —— [#97522](https://github.com/NousResearch/hermes-agent/pull/97522)。

对 **v0.21.3 或 v0.22.0** 的预判：上下文窗口上限、定价覆盖、自定义端点密钥 Save 修复、desktop `git_branch` 持久化、updater 推迟重启记账。v0.22.0 已被承诺为自 0.21.0 以来全部内容的精选说明倾倒点。

---

## 7. 用户反馈摘要

**痛点**
- Updater 对上在线 gateway 是最响的运维投诉：推迟重启被标成 stale（[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)），拆除已完成后仍烧排空预算（[#108729](https://github.com/NousResearch/hermes-agent/issues/108729)），每次更新都有 Vite/npm 噪音（[#76207](https://github.com/NousResearch/hermes-agent/issues/76207)）。
- 即便过了 0.21.x，多配置 Desktop 仍 *感觉* 没有隔离：槽位上限、启动 profile 密钥渗漏、MCP 不加载、desktop session 缺 git 元数据。
- 苹果统一内存上的本地运行时用户无法在不打爆 swap 的情况下跑宣传中的原生上下文（[#108783](https://github.com/NousResearch/hermes-agent/issues/108783)）。
- 成本 UI 不被信任：未知模型静默记 $0，一份报告少计约 72%（[#108775](https://github.com/NousResearch/hermes-agent/issues/108775)）。
- Settings 的 Save *删掉* 刚输入的密钥（[#108785](https://github.com/NousResearch/hermes-agent/issues/108785)）是摧毁信任的桌面缺陷。
- Cron/Kanban 可以在零工作量时宣称成功（[#108782](https://github.com/NousResearch/hermes-agent/issues/108782)）——对无人值守自动化很糟，而这正是核心宣传用例。

**工单里可见的使用场景**
- 常驻多平台 gateway（飞书、钉钉、企业微信、Telegram 家族，很快还有 Bale）。
- 多配置 Desktop 作为 bot 花名册，而不是单个聊天窗。
- 高内存 Mac 上自托管 llama.cpp（Qwen3.8-27B Q4）。
- 跨别名/中转模型 ID 的花费追踪。
- 非英语产品化（id、fa）。

**满意信号**
- 入站 PR 速率极高，0.21.2 说明里 salvage-credit 文化明显（社区缺陷被系统性地折进维护者 PR）。
- 两个长跑 profile 缺陷在本窗口关闭——自七月起跟帖的用户拿到了结果。
- 9 月 12 日同日的 issue→PR 配对（密钥、git branch、ctx 上限、定价）是健康的维护者反射。

**不满信号**
- `v0.21.0` 是一次大行为变更（session store + 槽位上限），在 Desktop 隔离尚未完成时就发了。0.21.2 修好了 DB 这一类；updater/生命周期与设置持久化仍是剩余的信任问题。

---

## 8. 待办观察

需要维护者关注的条目：P1、带 security 标签、长寿，或被决策堵住。

| Item | Age / why it matters |
|---|---|
| [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) P1 updater stale 警告 | 10 Sep 创建，14 条评论，0.21.2 次日仍开放。评论最多的开放缺陷。 |
| [#108729](https://github.com/NousResearch/hermes-agent/issues/108729) P2 1875s 排空挂起 | 与 107402 同类（updater × gateway 生命周期）。两者不同时修，就会持续产出 “update 坏了” 的报告。 |
| [#108761](https://github.com/NousResearch/hermes-agent/issues/108761) `type/security` — `web_extract` 凭证查询参数泄漏 | 现有密钥 URL 启发式里的一致性漏洞。评论少，泄漏潜力高。 |
| [#76207](https://github.com/NousResearch/hermes-agent/issues/76207) Vite / npm 警告 | 自 **1 Aug** 起开放，8 条评论。每个 `hermes update` 用户都会看到的打包噪音。 |
| [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) / [#102163](https://github.com/NousResearch/hermes-agent/issues/102163) | 现已关闭——若共享计算宿主进程在现场仍钉死启动 profile 的 MCP/密钥，需防重开。 |
| [#97477](https://github.com/NousResearch/hermes-agent/pull/97477) Bale 平台 | 自 28 Aug 起开放，`needs-decision`。 |
| [#96942](https://github.com/NousResearch/hermes-agent/pull/96942) 企业微信 tool-timer | 自 28 Aug 起开放，`needs-decision` + `sweeper:risk-message-delivery`。 |
| [#108782](https://github.com/NousResearch/hermes-agent/issues/108782) Kanban 捏造成功 | 无人值守 cron 是头条功能；静默假成功是产品完整性缺陷，不是外观问题。 |
| [#92192](https://github.com/NousResearch/hermes-agent/pull/92192) / [#93632](https://github.com/NousResearch/hermes-agent/pull/93632) id locale | 开放约 3 周。不紧急，但一直被顶上来，没有文档维护者过一遍就会腐烂。 |
| [#108777](https://github.com/NousResearch/hermes-agent/pull/108777) npm audit / Electron 41.10.7 | 打了 duplicate + security。需要单一负责人，避免审计升级卡在 duplicate 标签后面。 |

---

**健康快照：** 发版节奏与贡献者密度优秀；0.21.2 是正确的补丁。残留风险集中在 **updater 生命周期记账**、**Desktop 设置/profile 身份**、**本地运行时内存策略** 和 **成本真实性**。这四个主题覆盖了今日大部分开放 P1/P2 量，并且已经被同日修复 PR 覆盖了一半。

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

我将收集 IronClaw 项目上下文并补全所提供 GitHub 快照中的缺口，以确保本摘要准确。正在确认最新发行版本线，使「发行」一节保持准确。
# IronClaw Project Digest — 2026-09-12

**Repo:** [nearai/ironclaw](https://github.com/nearai/ironclaw) · Agent OS / 个人 AI 助手（Rust，Apache-2.0 / MIT）· 约 12.6k stars，约 1.5k forks  
**窗口：** 截至 2026-09-12 过去 24 小时内有更新的 issues 与 PRs，以及这些更新所依附的相关未关闭工作。

---

## 1. 本周总览

IronClaw 仍处于 1.4.0 之后的高吞吐加固阶段，而非切版本阶段。过去 24 小时仓库出现 **6 条 issue 更新**（全部仍为 open）以及 **30 条 PR 更新**（**20 open / 10 merged 或 closed**），**没有新发行**。活动集中在三个产品面：**托管 MCP 多租户**（目录隔离、merge-vs-replace、SEP-414 归因、agent.market 打包）、**频道正确性**（Slack 共享频道文案、Telegram 命令菜单），以及 **WebChat v2 UX**（IME 组字、斜杠命令布局、结果卡片高度）。Dependabot 也在扫 Rust 与 JavaScript lockfile。健康信号喜忧参半但偏建设性：核心贡献者（尤其是 kirikov）正在针对真实的多主体（multi-principal）缺陷成对交付修复/功能，而每日 OfficeQA 分类仍把绝大多数基准未通过项归为 **模型质量错误**，而非运行时回退。

---

## 2. 发行

本窗口无新版本。最新已发布稳定版仍为 **[ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0)**（2026-08-27）。8 月贯穿的 1.2 → 1.4 节奏在 9 月暂停；当前工作更像 1.4.x 补丁或 1.5 的候选材料，而不是已经打好 tag 的切版。

---

## 3. 项目进展

本集合中已关闭 / 已合并的工作呈现出清晰的 MCP + 运维操作主题，外加一项频道功能落地。

**托管 MCP 与扩展打包**
- [PR #8083](https://github.com/nearai/ironclaw/pull/8083) — **fix(extensions): 将发现的托管 MCP 目录做合并，而不是替换。** 避免在依赖凭证的服务器上出现 last-writer-wins，从而删掉另一用户的工具。
- [PR #8089](https://github.com/nearai/ironclaw/pull/8089) — **feat(extensions): 打包 agent-market 托管 MCP provider 包**（manifest、按工具 schemas、在直播 `tools/list` 之前的静态回退）。
- [PR #6760](https://github.com/nearai/ironclaw/pull/6760) — 更早的 agent-market 市场包（可通过环境变量配置 server URL）；以 **形态被取代、意图未变** 关闭，因打包扩展已迁到单 crate 模型。
- [PR #6759](https://github.com/nearai/ironclaw/pull/6759) — 出站托管 MCP `tools/list` + `tools/call` 上的 SEP-414 `_meta` 归因；已关闭（历史 / rebase 路径；工作在开放的 [#8084](https://github.com/nearai/ironclaw/pull/8084) 中继续）。

**运维 / 配置正确性**
- [PR #8088](https://github.com/nearai/ironclaw/pull/8088) — **feat(common): 区分「已设置但为空」的环境变量与「未设置」。** `FOO=` 不再静默回落到默认值 —— 对 endpoint 覆盖很重要。

**频道**
- [PR #8072](https://github.com/nearai/ironclaw/pull/8072) — **feat(telegram): 在激活时注册 Bot API 命令菜单。** 聊天汉堡菜单现列出 `/model`、`/status`、`/new`、`/stop`、`/interrupt`；停用时尽最大努力清除。

**依赖**
- [PR #8080](https://github.com/nearai/ironclaw/pull/8080) — 已关闭的 Dependabot Rust “everything-else” 升级（21 个包）。后续开放升级为 [#8097](https://github.com/nearai/ironclaw/pull/8097)（24 个包）。

仍在推进、且延续同一主题的工作：按调用方做目录键控（[#8090](https://github.com/nearai/ironclaw/pull/8090)）、Slack 未连接频道文案（[#8076](https://github.com/nearai/ironclaw/pull/8076)）、IME 安全的输入框（[#8092](https://github.com/nearai/ironclaw/pull/8092)）、运维安装包校验（[#8085](https://github.com/nearai/ironclaw/pull/8085)）、可配置的 prompt-context 上限（[#8087](https://github.com/nearai/ironclaw/pull/8087)），以及附件指针模式（[#8082](https://github.com/nearai/ironclaw/pull/8082)）。

---

## 4. 社区热点

本快照中评论数稀疏（多数 PR 未报告评论总数；issues 为 0–2 条评论）。因此「最热」看的是 **簇密度 + 时效**，而非反应分。

**1. 托管 MCP 多主体隔离（战略热度最高）**  
Issue [#6778](https://github.com/nearai/ironclaw/issues/6778)（自 2026-07-28 开放，更新于 2026-09-08）描述目录按 **extension id 而非按安装** 发布，因此在用户 A 的凭证下执行 `tools/list`，可能覆盖或暴露多主体主机上用户 B 的元数据。后续 PRs：[#8090](https://github.com/nearai/ironclaw/pull/8090)（按调用方键控目录）、已关闭的 [#8083](https://github.com/nearai/ironclaw/pull/8083)（合并而非替换）、[#8084](https://github.com/nearai/ironclaw/pull/8084)（可选的 SEP-414 调用方归因）、[#8089](https://github.com/nearai/ironclaw/pull/8089) / [#6760](https://github.com/nearai/ironclaw/pull/6760)（agent.market 一方包）。  
**需求：** 托管 MCP 现已成为一等公民的多租户面；provider 需要按用户的目录、按会话的归因，以及可重试身份 —— 而不是单个共享槽位。

**2. 共享频道配对 vs. 连接状态**  
Issue [#8074](https://github.com/nearai/ironclaw/issues/8074) + PR [#8076](https://github.com/nearai/ironclaw/pull/8076)。在 **未连接** 的共享频道里，**已配对** 用户收到的是未配对的「连接你的账户」文案，而不是「频道未连接」指引。  
**需求：** 拒绝分类必须在产品、适配器与 OpenAI 兼容面之间保持一致。

**3. CJK / IME 聊天输入**  
Issue [#8091](https://github.com/nearai/ironclaw/issues/8091) + PR [#8092](https://github.com/nearai/ironclaw/pull/8092)。用于 **确认 IME 组字** 的 Enter 同时提交了消息（复发；Safari `keyCode 229` / `isComposing` 为 false）。  
**需求：** WebChat v2 必须把组字当作一等公民处理，而不是西式键盘的事后补丁。

**4. Skills 可见性缺口（CLI vs 运行时）**  
Issue [#8086](https://github.com/nearai/ironclaw/issues/8086)。`ironclaw skills list` 看不到运行时写入的 skills，也看不到 CLI 未配置对应用户的 skills。调试「为什么我的 agent 看不到它的 skill？」会指错层。

**5. 把基准卫生当作运营仪式**  
每日分类 [#8093](https://github.com/nearai/ironclaw/issues/8093)（2026-09-10）与 [#8081](https://github.com/nearai/ironclaw/issues/8081)（2026-09-07）持续对 OfficeQA 未通过项归类 —— 目前「压倒性地是真正的模型错误」，出现在 DeepSeek-V4-Flash 上，而非 harness 缺陷。

---

## 5. 缺陷与稳定性

按爆炸半径排序。下列 issues 全部仍为 **open**。

| 严重度 | 条目 | 说明 |
|---|---|---|
| **高 — 多租户数据 / 元数据** | [#6778](https://github.com/nearai/ironclaw/issues/6778) 托管 MCP 目录按 extension id 键控 | 多主体服务器上的跨用户元数据暴露。修复路径：[#8090](https://github.com/nearai/ironclaw/pull/8090)（open），此前 merge-not-replace 已在 [#8083](https://github.com/nearai/ironclaw/pull/8083) 落地。 |
| **中 — 产品文案 / 错误恢复路径** | [#8074](https://github.com/nearai/ironclaw/issues/8074) 已配对用户 + 未连接的共享频道 | 频道断开时，用户被引导去连接 *自己的账户*。修复 PR：[#8076](https://github.com/nearai/ironclaw/pull/8076)（open，更新于 2026-09-11）。 |
| **中 — 运维调试闭环** | [#8086](https://github.com/nearai/ironclaw/issues/8086) `skills list` 对运行时写入 / 其他用户的 skills 不可见 | CLI 空列表会误诊 agent 的 skill 加载。本快照中无关联修复 PR。 |
| **中 — 输入回退（复发）** | [#8091](https://github.com/nearai/ironclaw/issues/8091) IME Enter 会提交 | 未完成的中日韩消息被发出。修复 PR：[#8092](https://github.com/nearai/ironclaw/pull/8092)。 |
| **低 — 布局** | WebUI 卡片 / 斜杠菜单 | [#8071](https://github.com/nearai/ironclaw/pull/8071) 命令结果卡片高度塌缩；[#8070](https://github.com/nearai/ironclaw/pull/8070) 斜杠命令元数据对齐。均为 open，风险低。 |
| **可观测性，而非崩溃** | [#8093](https://github.com/nearai/ironclaw/issues/8093)、[#8081](https://github.com/nearai/ironclaw/issues/8081) | OfficeQA 未通过归因于模型的数值 / 导航错误，而非 IronClaw 崩溃。对运行时稳定性是有用的阴性结果。 |

本窗口未描述崩溃或数据丢失事件。真正严重的是 **托管 MCP 发现的隔离**，而非进程稳定性。

---

## 6. 功能请求与路线图信号

这些更多是贡献者驱动的产品押注，而非路过式用户 RFC，但可读作下一版本轮廓：

1. **把托管 MCP 当作多租户协议，而不是单一目录** — 按调用方键控（[#8090](https://github.com/nearai/ironclaw/pull/8090)）、SEP-414 `_meta` 归因（[#8084](https://github.com/nearai/ironclaw/pull/8084)）、一方 **agent.market** 包（[#8089](https://github.com/nearai/ironclaw/pull/8089)）。若隔离干净落地，很可能成为下一发行的头条。
2. **把运维安装的包当作与主机打包包同等对待** — [#8085](https://github.com/nearai/ironclaw/pull/8085)。打通「已构建但不可用」的运维包（内联动态 descriptor schema 不匹配）。
3. **上下文预算控制** — [#8087](https://github.com/nearai/ironclaw/pull/8087) 把 128k prompt-context 上限做成可覆盖；[#8082](https://github.com/nearai/ironclaw/pull/8082) 增加 **可选 pointer 模式**，使抽出的文档文本不再内联（约 25k tokens/PDF）。直接回应长线程成本。
4. **频道完整性** — Telegram 命令菜单已合并（[#8072](https://github.com/nearai/ironclaw/pull/8072)）；Slack 未连接频道区分仍是剩余的配对/UX 空洞（[#8076](https://github.com/nearai/ironclaw/pull/8076)）。
5. **WebChat v2 打磨** — IME、斜杠命令网格、结果卡片高度。属于补丁列车材料，不是版本主题。

**预判：** 隔离 + 归因 + 上下文/pointer 模式最有可能定义 1.4.1 或 1.5；Telegram 菜单与空环境变量语义已进入「已落地、等 tag」桶。

---

## 7. 用户反馈摘要

本切片中的反馈呈 **运维与高阶用户形态**，而非消费端星级打分。

**痛点**
- 多用户 / 多主体托管 MCP：最后一次发现获胜；工具消失；元数据可能跨安装泄漏（[#6778](https://github.com/nearai/ironclaw/issues/6778)）。
- Slack 共享频道心智模型：配对 ≠ 频道连接；错误提示把人送到错误修复路径（[#8074](https://github.com/nearai/ironclaw/issues/8074)）。
- 东亚输入：IME 确认 Enter 不得提交（[#8091](https://github.com/nearai/ironclaw/issues/8091)）—— 属复发，这些地区对输入框的信任偏薄。
- Skills 可观测性：CLI 与运行时不共享 skill 命名空间（[#8086](https://github.com/nearai/ironclaw/issues/8086)）。
- 文档附件消耗上下文，并在后续轮次持续计费（[#8082](https://github.com/nearai/ironclaw/pull/8082)）。
- 部署超过 128k 的模型必须给常量打补丁（[#8087](https://github.com/nearai/ironclaw/pull/8087)）；空环境变量会静默选中默认值（[#8088](https://github.com/nearai/ironclaw/pull/8088)，现已关闭）。

**隐含用例**
- 混合已配对 / 未配对 / 频道已连接状态的共享 Slack/Telegram 工作区。
- 工具列表依赖调用方凭证的托管 MCP provider（SaaS / 市场，包括 agent.market）。
- 在主机打包包旁边安装包的运维人员。
- 有界 agent 循环内的长文档工作流（PDF/Office）。
- WebChat v2 中的 CJK 组字。

**满意度信号**
快照中无表扬帖。间接正面信号：每日分类 **没有** 针对 OfficeQA 提报运行时缺陷，若干持续数周的 MCP issues 现已有具体 PR，而非闲置。不满是具体且技术性的 —— 隔离、文案、IME、CLI 可见性 —— 这是过了 1.0、正在真实多用户安装中运行的项目的典型形态。

---

## 8. 待办观察

仍需维护者决策或合并的条目，按开放时长或修复路径不完整程度排序。

1. **[#6778](https://github.com/nearai/ironclaw/issues/6778)**（于 **2026-07-28** 打开，仍为 OPEN）—— 原始托管 MCP 目录隔离报告。merge-not-replace（[#8083](https://github.com/nearai/ironclaw/pull/8083)）已关闭；**按调用方键控（[#8090](https://github.com/nearai/ironclaw/pull/8090)）仍为 open。** 在 #8090 落地且该 issue 关闭之前，不要把 #6778 当作完成。
2. **[#8086](https://github.com/nearai/ironclaw/issues/8086)** — skills list vs 运行时写入的 skills。**本快照中无配套 PR。** 对运维「误诊」成本最高；需要负责人。
3. **[#8084](https://github.com/nearai/ironclaw/pull/8084)** 以及已关闭的前身 **[#6759](https://github.com/nearai/ironclaw/pull/6759)**（同样来自 **2026-07-28**）—— SEP-414 归因。意图已有数月；当前 PR 按 provider manifest 可选开启。市场 / 重试幂等类 provider 被此阻塞。
4. **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — Slack 未连接共享频道文案。更新于 2026-09-11；合并后应关闭 [#8074](https://github.com/nearai/ironclaw/issues/8074)。
5. **[#8085](https://github.com/nearai/ironclaw/pull/8085)** — 运维安装 vs 主机打包的 schema 校验不匹配。安静，但阻塞「包已构建，无法激活」。
6. **[#8082](https://github.com/nearai/ironclaw/pull/8082)** / **[#8087](https://github.com/nearai/ironclaw/pull/8087)** — 上下文经济学。不是缺陷；在落地之前会持续产生「为什么我的窗口消失了」工单。
7. Dependabot 噪声：[#8097](https://github.com/nearai/ironclaw/pull/8097)、[#8096](https://github.com/nearai/ironclaw/pull/8096)、[#8094](https://github.com/nearai/ironclaw/pull/8094)、[#8095](https://github.com/nearai/ironclaw/pull/8095)。属于流程负载，而非产品风险，除非评审落后于 MCP 隔离 PRs。

---

**健康快照：** 交付节奏健康（日级窗口内 30 次 PR 触达、10 次关闭，无发行冻结恐慌）。项目的风险不是不活跃；而是 **完成自 7 月下旬起一直开放的多租户 MCP 契约**，并且在这项更大的隔离工作落地期间，不让 WebChat IME / Slack 文案 / skills-CLI 缺口作为反复出现的信任划痕继续拖延。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目速览 — 2026-09-12

**Repo:** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)  
**窗口：** 截至 2026-09-12 过去 24 小时的活动快照（Issues 21 / PRs 50 / releases 3），以及刚发布的 v2.2.1 线。  
**项目：** AgentScope 团队出品的开源个人 AI 助手（前身为 CoPaw）。支持本地/云端部署、多智能体、Skills/MCP、IM 通道、ReMe 记忆、Console + Desktop + Hub。约 34.8k stars / 约 3.1k forks。

---

## 1. 本周概览

QwenPaw 正处于稳定版发布后的冲刺期，并非安静的维护周。维护者先后发布了 **v2.2.1-beta.1**（9 月 8 日）、**v2.2.1-beta.2**（9 月 10 日）和 **稳定版 v2.2.1**（9 月 11 日），随即吞下一波密集的 Desktop/Web 回归、子智能体失败以及 Hub/运维跟进。

过去 24 小时的活跃度对个人助手代码库而言异常高：**21 个 issues**（16 个仍开放）和 **50 个 PRs**（30 个仍开放，20 个已合并/关闭）。这是健康的合并引擎，外加清晰可见的「稳定版首日」缺陷漏斗。

项目健康度在**速度与贡献者广度上很强**，在 **2.2.x 之后的运行时正确性上偏弱**：停止并不真正停止、MCP 注册损坏、子智能体超时/模型覆盖丢失、模型配置消失、工作区路径无法持久化——这些问题将决定 2.2.1 给人的感觉是打磨版，还是热修复周期。

产品定位也在偏移。v2.2.0 引入了自托管 **QwenPaw Hub**；v2.2.1 增加了按智能体模型路由、Creator 1.2、统一环境变量以及 ReMe/PowerContext 记忆相关工作。社区精力目前分裂在*个人助手打磨*与*团队/多租户平台*之间。

---

## 2. 发布

四天内三个标签；稳定版为 **v2.2.1**（2026-09-11 由 [@cuiyuebing](https://github.com/cuiyuebing) 发布，commit `cae5773`）。同时上架 PyPI 的 `qwenpaw 2.2.1` 以及 Docker `agentscope/qwenpaw:v2.2.1`。

### v2.2.1（稳定版）— [release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1)

官方新闻线标题：*Creator 1.2 蓝图工作台、按 Agent 模型路由，以及统一环境管理。*

**Added**
- **Models / agents / memory：** 按智能体模型路由，支持 provider 偏好与回退（[#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)）；Auto Fin 主动记忆回顾 + ReMe 升级（[#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441)）；Console 中将 PowerContext 作为可选长期记忆后端（[#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)）；收紧内置智能体在作用域、非受信内容、确认、工具与完成方面的策略（[#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)）。
- **Creator 1.2.0：** 蓝图工作台、多时间线对比、可复用视频模板、MiniMax H3、快照回滚、更清晰的智能体进度、Docker 部署（[#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)）。
- **Console / workspaces：** 为 agents、MCP、tools、local models 统一环境变量设置（[#7538](https://github.com/agentscope-ai/QwenPaw/pull/7538)）；一键更新 plugin/PawApp（[#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)）；侧边栏/Settings 重设计（[#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502)）；会话项目目录支持直接路径输入（[#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593)）；Agent Kanban i18n（[#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482)）。
- **Skills / MCP：** Skill 指令预加载（[#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183)）；Make Skill 起草/校验/发布（[#7509](https://github.com/agentscope-ai/QwenPaw/pull/7509)）；Skill 版本 + 依赖校验（[#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)）；HTTP/SSE MCP 连接超时（[#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)）。

**Changed**
- 记忆后端获得一致的生命周期；ADBPG 与 PowerContext 以插件形式交付（[#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561)，[#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)）。
- Console 主题 token（[#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487)）；移动端智能体选择器（[#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)）。

**Fixed（摘选）**
- 流式/会话竞态与排队发送绕过（[#7523](https://github.com/agentscope-ai/QwenPaw/pull/7523)，[#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)，[#7237](https://github.com/agentscope-ai/QwenPaw/pull/7237)）。
- MCP 工具白名单强制执行（[#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504)）；遗留 MCP 401 发现（[#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)）。
- 非多模态模型的 PDF 文本回退（[#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621)）——*多模态路径仍被报告损坏，见 #7689*。
- Hub runtime 启动不再阻塞生命周期；CLI 对本地 runtime 的认证（[#7566](https://github.com/agentscope-ai/QwenPaw/pull/7566)，[#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631)）。
- 记忆后端不可用 → 可操作状态 + 插件回退（[#7544](https://github.com/agentscope-ai/QwenPaw/pull/7544)，[#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663)）。
- Windows ACP 工作区卡死（[#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)）；将 Chromium 安装移出启动路径（[#7539](https://github.com/agentscope-ai/QwenPaw/pull/7539)）。

**Breaking / 迁移**
- 发行说明**没有**单独列出破坏性变更块。从变更集抽出的实际迁移注意：
  - 记忆后端（ADBPG / PowerContext）现为带共享生命周期的**插件**——升级后请重新检查 Console 记忆后端配置。
  - 按智能体路由是新能力；在 #7676 / #4901 完全关闭前，现有全局模型设置可能不会应用到派生出的子智能体。
  - MCP 超时与白名单更严格；依赖宽松发现的 2.1.x MCP 服务器可能在 2.2.x 上失败（#7716）。
  - Creator 1.2 增加了快照/蓝图概念；旧 Creator 项目应能打开，但多图任务取消仍是已知陷阱（#7693）。

### 预发布

- [v2.2.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1) — 智能体模型路由（#7501）、2.2.0 网站文档、流式会话同步。
- [v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2) — 移动端智能体选择器（#7623）、console CSS 对齐、版本号升至 2.2.1b2。

稳定版安装核验 issue：[#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)（已关闭，发版值班）。

---

## 3. 项目进展

24 小时 PR 集合同时在**稳住 2.2.1** 与**扩展 2.2.x 表面积**。快照中已关闭/合并的项：

| Area | Closed / merged | What advanced |
|---|---|---|
| API / validation | [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | 对非有限校验输入返回 422 |
| Console sessions | [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | 分组会话分页；去掉 “Collapse List”，保留滚动位置 |
| Models | [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | 保留 provider 解析后的上下文窗口（避免过早压缩） |
| Telegram | [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | Markdown 表格改为 `<pre>`，不再用原始竖线 |
| Docs / chore | [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994) | 过期的 v2.1.0 发行说明杂务已关闭 |
| Issues closed as product/process | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177), [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698), [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707), [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) | 部署首页 UX、子智能体模型缺陷、幽灵会话（invalid）、Android 换行（延后）、发版核验 |

**仍在 `main` 上推进（开放、高信号）：**
- 子智能体模型覆盖诊断 — [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680)
- Serply 作为 `web_search` provider — [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712)（配对 [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711)）
- Hub 本地管理员引导 — [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)
- Telegram 富表格 + 可选中间消息清理 — [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713)，[#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592)
- Playwright 驱动自愈 — [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)
- 聊天文件抽屉移到右侧 — [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)
- 可视化压缩重写 — [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)
- 多通道 bot-manager 插件 — [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702)
- Atlas Cloud provider — [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)
- CI 精简 + 发版时完整门禁 — [#7697](https://github.com/agentscope-ai/QwenPaw/pull/7697)
- Master-key 文件权限加固 — [#7699](https://github.com/agentscope-ai/QwenPaw/pull/7699)
- 自定义 provider 发现状态码 — [#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684)

解读：**平台化仍在继续**（Hub 管理、bot manager、更多 provider），同时**核心智能体运行时仍在泄漏状态**（子智能体模型、停止信号、MCP、工作区路径）。

---

## 4. 社区热点

按给定集合中的评论量排序。

### 1. QwenPaw Hub — 下一步是什么？（26 条评论）
[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — 自 2026-08-26 开放，2026-09-11 更新。  
QwenPaw 起步于个人助手；Hub 是第一个多用户/团队答案。相关旧诉求：多用户访问与管理员托管的 skills（[#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324)）。  
**底层需求：** 团队要一个 URL、隔离的工作区/凭证，以及管理员拥有的 skills——同时不放弃本地进程/Docker 控制。后续工程已可见：本地管理员引导（[#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)）。

### 2. Web 部署首页 UX（10 条评论，现已关闭）
[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — [platform.agentscope.io/deploy](https://platform.agentscope.io/deploy) 入口位置，以及移动端 “Open vs Stop” 误触风险。  
**需求：** 云/Web 用户把部署页当成*主控制面*，而不是页脚。

### 3. 停止按钮在撒谎（6 条评论，开放）
[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — UI 显示已停止；后端仍在跑；下一次发送撞上 HTTP 409。  
**需求：** 取消必须是真实的运行时契约，而不是 Console 装饰。这与已合并的排队发送工作 #7610 发生碰撞。

**更小但主题很响（各 3 条评论）**
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)（已关闭）+ [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)（自 6 月开放）+ [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) — **按任务 / 子智能体模型选择**。用户想要 Claude-Code 式的廉价模型分派。
- [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — spawn 子智能体永远完不成（即使限额很大也会超时）。
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — 幽灵会话 / 索引与磁盘不同步（以 invalid 关闭，但对用户而言这种失败模式是真实的）。

**底层需求模式：** 多智能体成本控制、可信的任务生命周期（启动/停止/持久化），以及把 Hub 做成团队产品——而不是更多表面功能。

---

## 5. 缺陷与稳定性

严重程度按用户可见的数据丢失、计算卡住或升级损坏来判断。

### Critical
| Issue | Symptom | Fix signal |
|---|---|---|
| [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop UI 成功；任务仍在跑；下一条 prompt 返回 409 | 开放；相关竞态已在 #7610 / #7523 修补，但此路径仍在 |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 每个 `spawn_subagent` 在 Win 2.2.0 上超时 | 开放；前 20 列表中没有专门修复 PR |
| [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 自 2.2.x 起 MCP 连接/注册损坏；2.1.1b3 Hub 可用 | 开放；相对 2.1 的回归 |

### High
| Issue | Symptom | Fix signal |
|---|---|---|
| [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` 被忽略；子进程继承父级 `active_model` | 快照中已关闭；诊断 PR [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 仍开放——在 #4901 推进前视为**未完成** |
| [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 已配置的 LLM 在会话中途消失；必须重新选择 | 开放；Desktop 2.2.1 |
| [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | 默认工作区路径回退到旧的 `D:\Program Files` | 开放；引导/UX + 持久化缺陷 |
| [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | #7621 之后，PDF `file` 块仍被送到多模态 `/chat/completions` | 开放；部分修复只覆盖了 `supports_multimodal=False` |
| [#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) | Creator 多图：用户 “approve” 会取消进行中的任务；卡在 `RUNNING`，无法重新调度 | 开放 |
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | arXiv 被拦时 Daily Paper cron 静默失败；收件箱显示 “no content” | 开放；ReMe 插件 + 无代理配置 |

### Medium
- [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — 定时任务「无输出」；答案被折进 thinking/steps。
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — 会话索引与磁盘文件不同步（以 invalid 关闭；仍是支持负担）。
- Provider 发现掩盖真实的 HTTP/机器人挑战错误 — 修复进行中 [#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684)。
- 已死的 Playwright 驱动永远不会重建 — 长跑 [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)。

**稳定性解读：** v2.2.1 修掉了一大类 Console 竞态和 MCP 白名单漏洞，但 **Desktop Windows + 多智能体派生 + MCP 升级路径** 是当前的可靠性税。一次聚焦取消、MCP 与子智能体配置的 2.2.2 补丁，会比再堆功能更贴合当前 issue 组合。

---

## 6. 功能请求与路线图信号

近期较可能（PR 已开放或表面很小）：
- Serply `web_search` 后端 — [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) / [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712)
- 为 `chat_with_agent` / `submit_to_agent` / 主动邮件提供历史分组 — [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710)
- 默认 Loop 模板 + 将 “默认” 重命名为 “标准” — [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714)
- Console 布局：对话在左，文件/预览在右 — [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) / [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)
- Hub `--init-admin` 无头引导 — [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)
- 统一多通道 bot-manager 插件 — [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702)
- Atlas Cloud provider — [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)

中期（反复出现、架构更重）：
- **真正的按任务子智能体模型路由** — [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)（自 2026-06-02 开放）。v2.2.1 交付了*按智能体*路由（#7501）；用户立刻发现*按派生*仍坏（#7676）。这是下一个显而易见的路由里程碑。
- **DeepSeek provider 保真度** — 原生能力元数据、prompt 前缀稳定性、KV-cache 可观测性 — [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717)
- **Hub 2.x**，承接 #7318 愿望清单：管理员托管的 skills、更紧的租户隔离、无需浏览器的运维 UX。
- 可视化压缩 / 上下文质量 — [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) 加上已合并的 #7652。

延后 / 先关后议：
- Android IME 换行 vs 提交 — [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)（`Close-and-review-later`）。

**对 2.2.2 / 2.3.0 的预测：** 稳定性补丁（取消、MCP、subagent_model、工作区路径）比再丢一波 Creator 功能更可能；Hub 管理员引导与搜索 provider 插件是已经上合并坡道的功能。

---

## 7. 用户反馈摘要

**谁在说话：** 重度 Desktop Windows 用户（`2.2.1` Tauri）、Web Console / 移动部署用户，以及早期 Hub 运营者。中文 issue 主导日常 UX 报告；英文 issue 集中在 providers（DeepSeek、Serply、PDF 多模态）。

**痛点**
- 控制面不信任：停止只是装饰；模型和工区会「忘掉」设置；cron 输出消失进 thinking。
- 多智能体被宣传出来，但运营上很脆（超时、忽略 `subagent_model`、未分类的智能体间聊天）。
- 2.2.x 升级税：在 2.1.x Hub 上能用的 MCP，升级后失败。
- 中国/受限环境的网络现实：Daily Paper / arXiv 没有代理旋钮，并隐藏 `httpx` 失败。
- Creator 生产：串行生图 + 人工批准可能永久卡住任务。
- 可发现性：对非 IDE 用户而言，workspace-as-project vs 默认智能体目录没有解释（#7705）。

**队列中可见的用例**
- 个人每日论文 / 记忆 cron（ReMe Daily Paper）。
- 成本拆分的多模型协作（Haiku 式子任务）。
- 远程机器上的团队 Hub，且不做浏览器端口转发。
- Telegram 作为一等通道（表格、清理 tool-call 刷屏）。
- 从一个插件做多通道 bot 运维（微信、钉钉等）。
- Creator 中的长创意任务（多图、视频模板）。

**满意 vs 不满**
- 满意：发版节奏优秀；首次贡献者正在落地真实 PR（Telegram、Serply、Atlas、Playwright 自愈）；v2.2.1 *确实*处理了流式竞态、环境变量蔓延和 Creator 1.2。
- 不满：2.2.x 在用户每小时都走的路径上显得未完成（停止、MCP、派生、设置持久化）。移动 Web「已经相当不错」（#7707），除了 IME 提交——这批里少见的明确好评。

---

## 8. 待办观察

需要维护者拍板、而不是再来一条路过评论的事项。

1. **[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)** — `spawn_subagent` 的按任务模型。自 2026-06-02 开放。2026-09-11 再次被触及。这是 #7676 / #7680 的父项，也是相对 Claude Code 被引用最多的产品缺口。
2. **[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** — Hub「下一步是什么？」26 条评论，快照中没有收口的路线图帖。风险：Hub 变成功能堆场，而不是有序的 2.3 计划。
3. **[#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)** — Playwright「死一次，永远死」。自 2026-08-07 开放，仍是 “ready-for-human-review”。浏览器使用是宣传能力；这是可靠性空洞。
4. **[#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)** — Atlas Cloud provider。自 2026-07-27 开放。首次贡献者，停留时间很长。
5. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)** — spawn 子智能体全部超时。用户贴了调试笔记；需要负责人，而不是再一句「把超时调高」。
6. **[#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)** — MCP 2.2.x 回归。对从 2.1.1b3 过来的 Hub 用户构成升级阻断。
7. **[#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689)** — #7621 不完整；多模态 PDF 路径仍 4xx。
8. **[#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693)** — Creator 批准 vs 串行生图槽位。很容易把付费/GPU 时间卡住。

---

### 健康快照

| Signal | Reading |
|---|---|
| 发版引擎 | 健康 — 3 天内 beta.1 → beta.2 → 稳定版，Docker/PyPI 同步 |
| 贡献者构成 | 健康 — 大量 `first-time-contributor` PR 落在 Telegram、搜索、providers、CI |
| 运行时正确性 | 承压 — 取消、MCP、子智能体、配置持久化 |
| 产品方向 | 清晰 — 个人 OS + 团队 Hub + Creator，但 Hub 路线图仍是讨论串 |
| 近期风险 | 在 2.2.1 热修复之前继续铺表面（bot-manager、额外 providers） |

**一句话：** QwenPaw 2.2.1 是一次真正的功能发布，不是版本号跳动。社区吞吐很高。下一期速览若能关掉取消/MCP/subagent-model，就会像成功；若 Hub 与 Creator 继续在不可靠的派生/停止内核上扩张，就会像碎片化。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

我将收集官方项目背景并补全版本、PR 与 issue 细节，确保摘要准确。接下来会拉取完整的 v0.8.5 说明以及关键 issue/PR 页面。
# ZeroClaw Project Digest — 2026-09-12

ZeroClaw 是一款 Rust 原生、可自托管的个人 AI Agent 运行时（单二进制；多 Agent、30+ 通道、20+ 供应商、沙箱）。官方仓库：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)（约 32.8k stars，约 4.9k forks）。

---

## 1. 本周概览

项目处于 **v0.8.5 发布后的稳定化** 阶段。v0.8.5 于 5 Sep 2026 发布（454 commits，73 contributors），定位为安全 / 连通性 / 运维体验版本；当前主线是 **v0.8.6**（仅修 bug、回归、安全与 CI/打包——新功能进入 Parking Lot 或 v0.9.0）。

过去 24 小时的活动呈现 **贡献密集但合入受限**：**50 PRs updated**（48 个仍开放，2 个已合并/关闭），而触及的 **5 issues** 全部仍开放。这种模式——大量堆叠的安全 PR 加上极薄的合入队列——是成熟 pre-1.0 运行时处于明确冻结期时的典型表现。

健康信号喜忧参半偏正面：发布工程与身份体系工作在公开推进，但 Windows advisory CI 与 TUI 输入 bug 仍在漏出，若干 XL 级安全 PR 自 July–August 起一直开放，等待维护者审阅。

---

## 2. 版本发布

### v0.8.5 — 5 Sep 2026  
[github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)

安全、连通性与运维体验版本。重点内容：

- **ZeroRelay + ZeroRouter**：盲转发，原生 mTLS 注册；托管路由预设与公开模型目录（[#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142)、[#9645](https://github.com/zeroclaw-labs/zeroclaw/pull/9645)、[#10453](https://github.com/zeroclaw-labs/zeroclaw/pull/10453)）。
- **Chat / dashboard**：每个 Agent 多会话、同一 Agent 多标签、图片附加/拖放（[#9353](https://github.com/zeroclaw-labs/zeroclaw/pull/9353)、[#9355](https://github.com/zeroclaw-labs/zeroclaw/pull/9355)、[#10544](https://github.com/zeroclaw-labs/zeroclaw/pull/10544)）。
- **Providers**：Anthropic live thinking 展示；Grok Build ACP 与 Atlas Cloud 一等公民支持；更强的兼容供应商响应、归属、图片、代理与重试处理。
- **Hardening**：插件实例 schema、作用域密钥、主机拥有的出站、有界导出、路径穿越修复（[GHSA-93f6-34w8-5g98](https://github.com/zeroclaw-labs/zeroclaw)）、Wasmtime advisory 升级、Landlock 分级、技能 HTTP 默认失败关闭。
- **Release engineering**：Rust 1.98 builders / 1.96 source floor、固定发布工具、扩展 MUSL/Alpine、协调 23-crate crates.io 发布。

**破坏性变更（升级前请处理 plugins / skills / nodes / WATI / contributor scripts）：**

| Change | Action |
|---|---|
| Typed plugin instance config is mandatory ([#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126)) | 声明 schema；使用 `zeroclaw plugin info` 给出的完整实例 key |
| Skill HTTP is fail-closed ([#10369](https://github.com/zeroclaw-labs/zeroclaw/pull/10369)) | 仅允许直接 URL；仅数据占位符；禁止 `/ ? & #` 注入、重定向或环境代理 |
| Legacy node transport retired ([#10289](https://github.com/zeroclaw-labs/zeroclaw/pull/10289)) | 删除 `[node_transport]`；保留 `[nodes]`；轮换复用的密钥 |
| TodoWrite config moved to ZeroCode ([#9013](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)) | 将 `[todotracker]` 复制到 `zerocode-config.toml`；将 `ZEROCLAW_todotracker__*` 重命名为 `ZEROCODE_todotracker__*` |
| WATI channel removed ([#9571](https://github.com/zeroclaw-labs/zeroclaw/pull/9571)) | 迁移至 WhatsApp Cloud 或 WhatsApp Web |
| Aardvark / robot-kit crates dropped ([#9853](https://github.com/zeroclaw-labs/zeroclaw/pull/9853)) | 若仍需树内使用，请停留在 v0.8.4 |
| Root Cargo package renamed `zeroclaw` ([#9835](https://github.com/zeroclaw-labs/zeroclaw/pull/9835)) | 脚本：`-p zeroclawlabs` → `-p zeroclaw`（binary name unchanged） |

自 v0.8.5 以来尚未发布更新的 tag。预计每周的 v0.8.6 切片只会纳入已就绪的 bug/安全/CI 变更。

---

## 3. 项目进展

**过去 24 小时已合并 / 关闭：2 PRs。** 有文档记录的合并：

- **[#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262)** (merged 11 Sep) — `fix(rpc): close RPC connections on daemon reload and unstick zerocode quickstart`  
  重载现在会取消本地 socket 与 WSS RPC，使客户端看到 EOF/Close 而非陈旧的 dispatcher；在 supervisor 退役前有界排空（6s）；ZeroCode 会检查替换后的 daemon PID；Quickstart 超时已封顶；Tokio worker 栈提升至 8 MiB 以阻止 Quickstart 栈溢出。后续：[#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791)、[#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792)。

**已在 `master` 上推进但尚未合并的高信号开放工作：**

| Theme | PRs | Status |
|---|---|---|
| RFC 7141 / OIDC identity stack（[#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) 的第 3–6 阶段） | [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) → [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) → [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) → [#10263](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) → [#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265) → [#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268) → [#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270) → [#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274) → [#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275) → [#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) | 堆叠的 XL PRs，今日已更新；这是 v0.9.0 的主脊 |
| Agent lifecycle single source of truth | [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) | daemon RPC、gateway、channels、ACP、CLI 共享的 live-config 权威 |
| Sandbox / launcher path canonicalization | [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) | 在 workspace cwd 之前解析主机启动器（native、Docker、Firejail、Bubblewrap） |
| Channel inbound allowlists | [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) | Bluesky + Reddit 现在要求 `peer_groups` / sender auth |
| ACP interrupt recovery | [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) | 将中断的回合进度持久化到 transcript |
| Context compaction | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | 按模型窗口比例而非固定 32k 计算压缩预算 |
| Plugin install egress ceremony | [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) | 在插件安装/列表时执行授权仪式 |
| ZeroCode UX | [#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553)、[#10648](https://github.com/zeroclaw-labs/zeroclaw/pull/10648) | 选中文本 → chat；Fluent/label 渲染缓存 |
| Windows publish-contract CI | [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676) | 路径比较，使 gateway exception 在 Windows 上匹配 |

小结：**身份、隔离与运维 UX 才是真正的产品推进方向**；v0.8.6 本身只是一条维持线。

---

## 4. 社区热点

快照中未提供评论数（显示为 undefined）。下列排序依据 **更新时效、堆叠深度、风险标签与贡献者集中度**。

1. **Identity & Access / OIDC tracker** — [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)（open since 24 Jun；updated 11 Sep）  
   协调 RFC 7141 各阶段：`AuthProvider` → canonical principals → inbound auth → session/memory isolation → browser PKCE / device grant。JordanTheJet 正在推进一个 10-PR 堆叠。需求：多用户 / 多界面安装不能继续停留在 “daemon owns everything.”

2. **Host launcher / sandbox cwd** — [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381)（risk:high，size:XL，needs-maintainer-review）  
   需求：当运维意图使用主机工具时，Agent 不得拾取 workspace 相对路径的二进制。涉及 Firejail、Bubblewrap、Docker 以及 coding-CLI argv。

3. **Inbound channel authorization gaps** — [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)（open since 27 Jul）  
   Bluesky 与 Reddit 跳过了 `peer_groups` / `is_user_allowed`。需求：每个入站适配器都应遵守同一套白名单契约。

4. **Live-config races** — [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)  
   需求：daemon、gateway、channels、ACP 与 CLI 不得各自独立修改克隆快照（agent admission / session / cron）。

5. **ZeroCode as daily driver** — [#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553)，加上今日的输入 bug [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) / [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)  
   需求：TUI 必须表现得像真正的编辑器（selection → composer、Delete、UTF-8 backspace）。

6. **Git risk classifier** — [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635)（open since 1 Aug）  
   `git -C <path> <verb>` 被当成 `-C` 是子命令来分类。需求：策略需理解 git 全局选项。

底层需求一致：**在每个通道、每个操作系统上都正确的自托管多 Agent 安全**，以及不与 CJK/UTF-8 输入对抗的 TUI。

---

## 5. Bug 与稳定性

按声明严重度排序，其次考虑影响面。

| Sev | Issue | Component | Notes / fix PR |
|---|---|---|---|
| **S2** | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) — REPL never enables terminal IUTF8 | `channel` / `zeroclaw agent` interactive REPL | 多字节字符后的退格会删除原始字节，留下损坏的 UTF-8。Opened today。快照中无修复 PR。 |
| **S3** | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) — ZeroCode chat ignores Delete | `zerocode/tui` | composer 中 Delete 为无操作。Opened today。快照中无修复 PR。 |
| **S3 / CI** | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) — Windows nextest publish-contract | `tooling/ci` | `published_crates_never_include_files_outside_their_own_directory` 在每个 head 上失败，因为 gateway exception 是字符串比较而非路径比较。**Fix in flight:** [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676)。 |
| **Advisory CI** | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) — three Windows-only `zeroclaw-runtime` failures | Advisory Windows nextest（`plugin-host=true`） | 失败发生在仅改动 cron 的 PR 上；被测代码无变化。看起来像任务抖动或环境漂移，而非产品回归——但正在消耗审阅时间。 |
| **High (security, not a crash)** | [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381)、[#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428)、[#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) | sandbox / channels / policy | 开放中的高风险修复，尚未进入 `master`。 |

本窗口内无新的启动即崩溃报告。重载/Quickstart 挂起类问题已由已合并的 [#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262) 处理。Windows 仍是最弱的 CI 面。

---

## 6. 功能请求与路线图信号

**可能进入 v0.8.6 周更切片**（freeze-compatible）：

- Windows publish-contract path compare（[#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676)）
- 若改动保持精小，则纳入 REPL IUTF8 / Delete-key 修复
- 剩余 RPC reload 后续（[#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791)、[#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792)）
- 若视为回归/性能，则纳入 ZeroCode render/cache 打磨（[#10648](https://github.com/zeroclaw-labs/zeroclaw/pull/10648)）

**更可能进入 v0.9.0（auth + breaking security），而非 0.8.6：**

- 完整 OIDC 栈：token-verification provider、RPC principal enforcement、principal-owned sessions、private principal memory、browserless device-grant enrollment、browser PKCE + cross-surface enrollment、退役 Nevis/`iam_policy`（[#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)–[#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321)；tracker [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)）
- Plugin egress grant ceremony（[#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)）
- Model-window-ratio context compaction（[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)）
- Coordinated agent lifecycle mutations（[#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)）

**其他进行中的队列**（非本周新闻，但会影响下一个大版本）：ACP/MCP embedded resources（~64%）、Memory recall（~75%）、SOP daemon-owned execution（~68%）、ZeroCode consolidation（~63%）、Goal Mode（~60%）、ZeroRelay remaining integration（~36%）。Parking Lot 中有 124 个开放项。

预测：下一个 *tagged* 二进制会是精薄的 v0.8.6；下一个 *产品* 跃迁是 v0.9.0 上的 OIDC principals，取决于该堆叠审阅能否落地。

---

## 7. 用户反馈摘要

从 issue/PR 文本推断（非来自 Discord/问卷）：

**痛点**

- TUI/REPL 输入对真实打字尚未完成：Delete 失效、UTF-8 退格错误——对 CJK 运维尤为尖锐（`kouhe3`）。
- Windows 是二等 CI 公民：advisory nextest 失败并无对应产品改动，外加路径分隔符导致的 publish-contract 损坏。
- 入站社交通道（Bluesky、Reddit）未走与 Telegram/Slack/WhatsApp 相同的发送者鉴权路径——打开这些适配器的运维得到了更安静、也更危险的默认值。
- Daemon reload 曾使 ZeroCode 与 RPC 客户端卡住；该具体投诉现已有合并修复。
- 上下文窗口仍在与 32k-token compact artifact 对抗；使用长上下文模型的运维希望按比例裁剪（[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)）。

**从 diff 中可见的用例**

- 常开的多 Agent daemon + ZeroCode TUI 作为日常控制台
- 多通道个人助手（Telegram、Slack、WhatsApp Web、Matrix，以及 Bluesky/Reddit/Line/WeChat）
- 沙箱化 shell / coding-CLI agents（Bubblewrap、Firejail、Docker）
- 带显式出站授权的 Plugin/WASM skills
- 即将到来：面向共享或远程运维的浏览器与无头 OIDC enrollment

**满意度**

- 发布节奏与 changelog 质量很高（v0.8.5 是真正面向运维的说明，而非一堆堆砌）。
- 杰出贡献者密度（Audacity88、JordanTheJet、IftekharUddin、NiuBlibing、MannXo）表明内圈运转正常。
- 不满集中在 **XL 安全 PR 的审阅延迟** 与 **Windows/TUI papercuts**，而非 “the project is stalled.”

---

## 8. 待办观察

需要维护者关注的条目（年龄 + 风险 + “needs-*-review / needs-author-action”）：

| Item | Open since | Why it is stuck |
|---|---|---|
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) OIDC tracker | 24 Jun | 整个身份栈的父项；仅 3 comments。各阶段已以 PR 存在；跟踪器本身安静。 |
| [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) Bluesky/Reddit sender auth | 27 Jul | `needs-author-action`，risk:high，size:XL。两个公开入站适配器中的安全漏洞。 |
| [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) context compact ratio | 29 Jul | `needs-author-action`。有用，但除非改写成 bug，否则不符合冻结资格。 |
| [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) plugin egress ceremony | 31 Jul | 审阅意见已由维护者重写；仍开放。 |
| [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) git `-C` risk classifier | 1 Aug | `needs-author-action`，risk:high。Agents 没有 `cd`；这是它们接触仓库的方式。 |
| [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) ACP interrupted-turn persist | 20 Aug | `needs-maintainer-review`，risk:high。 |
| [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) host launcher resolution | 26 Aug | `needs-maintainer-review`，risk:high。沙箱正确性。 |
| [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)–[#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) OIDC stack | 22–24 Aug | 堆叠正确，但一个被阻塞的父项挡住十个子项。 |
| [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) / [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | 12 Sep | 全新的 S2/S3 TUI bugs，零评论。若有人认领，是容易拿下的胜利。 |

**下周观察指标：** 合入率 vs. 48 个已更新仍开放的 PRs。若 OIDC 父项未能落地，即便 v0.8.6 周更切片继续，v0.9.0 也仍只是纸面里程碑。

---

*来源：提供的 24h GitHub snapshot（5 issues，50 PRs，1 release）、[v0.8.5 notes](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)、[milestones](https://github.com/zeroclaw-labs/zeroclaw/milestones)、repo README。快照中没有评论/反应计数，因此 “hot” 排序采用时效、标签与堆叠深度。*

</details>