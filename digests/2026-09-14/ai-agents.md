# OpenClaw 生态周报 2026-09-14

> Issues: 97 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-13 22:07 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-14

**Repo:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  
**是什么：** 自托管的个人/团队 AI 助手。本地 Gateway 对接各类聊天应用（Telegram、Discord、Slack、iMessage、WhatsApp、Teams、Signal 以及另外 20 多种）以及原生 macOS / iOS / Android / Windows / Linux 客户端。状态与凭据留在运营者本机。由 OpenClaw Foundation 托管。约 39 万 star。

**覆盖窗口：** 约过去 24 小时内的活动更新（issues/PRs 截至 2026-09-13），以及最近发布的三个 tag。

---

## 1. 本周总览

OpenClaw 正以极高吞吐运转：单日触及 **97 个 issue** 和 **500 个 PR**，其中 **263 个 PR 已合并或关闭**，**237 个仍开放**。这不是安静的维护周——而是贡献者修复、维护者性能工作以及发版后事故报告的消防水带。九月中旬的产品主线，是**更安全的托管更新**（隔离候选预演、Doctor/迁移恢复）与 **2026.9.2 → 2026.9.3/9.4 路径上的现场故障**相撞，尤其集中在 npm 全局安装、Windows Scheduled Task 交接，以及在线 v1 handoff lease。

核心产品工作并行推进：subagent 完成路由、memory search 行为、Anthropic prompt-cache 布局、MCP OAuth 安全、Control UI 打磨，以及 Windows/macOS daemon 可靠性。健康度喜忧参半但并未停摆——项目仍以高节奏发布已签名的多平台产物，并有明确的升级可靠性协调 issue（[#145252](https://github.com/openclaw/openclaw/issues/145252)），但 9.3/9.4 上的运营者仍在撞上 P0 级更新与重启中断。社区压力集中在**消息丢失、subagent 静默失败、凭据残留，以及 “Doctor --fix 过于激进。”**

---

## 2. 发布

本窗口落地三个 tag。

### v2026.9.4 — 当前稳定版（2026-09-11）

[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4) · [Docs notes](https://docs.openclaw.ai/releases/2026.9.4)

- tag 上点出的规模：**20 次直接提交、1,558 个 PR、294 位贡献者**。已签名源码、npm core + 90 个插件 + companion 包、Docker、macOS DMG/ZIP、Linux AppImage/Debian。
- 产品亮点：接入 ClawHub 的 skill/plugin 搜索；Skill Workshop 可将历史对话做成可复用 skill；**GPT Image 2.5**；更紧的 cloud-session 控制；交互式终端提问（含掩码密钥）；messaging/memory/update 修复。
- 值得注意的移除 / 行为变化：
  - 捆绑的 **`video-frames` skill 已退役**（改用 ffmpeg 或独立 skill；不再自动转换）。
  - 新的 xAI 配置默认 **Grok 4.6**；已退役的 “Auto” 模型选择需要 `openclaw doctor --fix` 或手动指定。
  - 自定义 provider 端点需要**显式模型列表**。
  - IPv4-mapped 网络规则现覆盖完整区间（可能信任比运营者预期更多的地址）。
- 迁移：升级后运行 `openclaw doctor --fix`；Mac+Bun 的 memory search 需要系统 SQLite（`brew install sqlite` / `OPENCLAW_SQLITE_LIBRARY`）；不兼容的 embedding 模型需要 `openclaw memory index --force`。本线上对 cloud-worker 做 inspect/stop 前，需要 Crabbox **0.55.0+**。

### v2026.9.3 — 上一当前版（2026-09-08）

[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3) · [Docs notes](https://docs.openclaw.ai/releases/2026.9.3)

正是这个版本定义了本周的可靠性叙事。

- **更安全的更新：** 在隔离候选状态中预演 core/plugin 变更；支持符合条件的 9.2 迁移；恢复被遗弃的更新记录，且不杀掉健康且匹配的 Gateway（[#136997](https://github.com/openclaw/openclaw/issues/136997) 系列；notes 中引用的 PR 包括 #138839、#141109、#141175）。
- 其他亮点：温热 prompt cache / 减少冷会话开销；持久化、由 agent 持有的 Skill Workshop；live/native 浏览器标签页；Models 设置中的 provider-account 管理；可撤销的公开会话链接；可搜索的会议库；可选 Team Reports。
- **破坏性变更 — Node runtime：** 24.x 需 Node **24.16.0+**，或 **26.1.0+**（推荐 26）。Node 22、25 以及更旧的 24/26 构建因 SQLite 文本截断被弃用。Plugin SDK 的 execution-policy、approval、search/directory callback 以及 Workshop 所有权契约也有变更。Doctor 会迁移已验证的遗留 Workshop skill。

### v2026.6.35 — 2026 年 6 月线最终 Extended Stable / LTS（2026-09-10）

[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35)

- LTS 线加固：约束不可信的 provider/channel body，在昂贵工作前拒绝过大输入，传输失败时保留恢复能力，限制响应以防内存耗尽，刷新 Plugin SDK 基线。
- 这是给不应在 9.x 上、等待 update/Doctor 回归收敛的运营者准备的保守轨道。

---

## 3. 项目进展

过去 24 小时的 PR 集合以**可靠性与正确性**为主，而非净新增表面。维护者（`steipete`、`roboclaw-bot`、`vincentkoc`）与大量贡献者正在落地：

**Update / Doctor / daemon**

- 隔离候选更新与 Doctor 恢复是官方 9.3/9.4 主题，但现场报告显示 candidate-Doctor 仍拒绝在线 v1 handoff lease（[#145192](https://github.com/openclaw/openclaw/issues/145192)），以及全局安装 / finalize:doctor 失败（[#147160](https://github.com/openclaw/openclaw/issues/147160)、[#146879](https://github.com/openclaw/openclaw/issues/146879)、[#147369](https://github.com/openclaw/openclaw/issues/147369)、[#147351](https://github.com/openclaw/openclaw/issues/147351)）。
- Windows 重启路径正在积极修复：重定向 `gateway.cmd` stdout（[#137374](https://github.com/openclaw/openclaw/pull/137374) 对应 [#137362](https://github.com/openclaw/openclaw/issues/137362)）；Scheduled Task `IgnoreNew` 假成功（[#147437](https://github.com/openclaw/openclaw/pull/147437) 对应 [#138833](https://github.com/openclaw/openclaw/issues/138833)）；nvm 升级后的 Node-prefix 不匹配（[#145335](https://github.com/openclaw/openclaw/pull/145335)）。
- Doctor：只读探测时保留 MCP OAuth（[#147454](https://github.com/openclaw/openclaw/pull/147454) → [#147449](https://github.com/openclaw/openclaw/issues/147449)）；配置修复时保留转义后的环境引用（[#147453](https://github.com/openclaw/openclaw/pull/147453)）；对超大 transcript 跳过无效工作（[#147464](https://github.com/openclaw/openclaw/pull/147464)）。

**Agents / subagents / sessions**

- `maxConcurrent=1` 时的 system-expert 死锁已有就绪修复 PR（[#147468](https://github.com/openclaw/openclaw/pull/147468) → [#147264](https://github.com/openclaw/openclaw/issues/147264)）。
- Swarm collector 的 `sessions_yield` 卡住 `agents_wait`（[#146716](https://github.com/openclaw/openclaw/pull/146716)）。
- 私有父会话完成交接（[#147206](https://github.com/openclaw/openclaw/pull/147206)）。
- 直发文本 announce 回退路径上的完成媒体（[#142852](https://github.com/openclaw/openclaw/pull/142852)）。
- 子会话被阻止检查 automation run（[#147008](https://github.com/openclaw/openclaw/pull/147008)）。

**性能（维护者专项）**

[#145679](https://github.com/openclaw/openclaw/issues/145679) 重新打开了端到端负载/启动基线。已落地或排队：减少 session-PR 刷新时的 Git 工作（[#147443](https://github.com/openclaw/openclaw/pull/147443)），跳过 artifact 目录的插件状态探测（[#147467](https://github.com/openclaw/openclaw/pull/147467)），加载历史时保持 Gateway 可响应（[#147363](https://github.com/openclaw/openclaw/pull/147363)），工作区检查与取消重叠（[#147470](https://github.com/openclaw/openclaw/pull/147470)），测量固定工作负载下的 Gateway 总 CPU（[#147430](https://github.com/openclaw/openclaw/issues/147430)）。

**UI / clients**

- web/macOS activity 中的 subagent 显示名（[#147458](https://github.com/openclaw/openclaw/pull/147458)）。
- 阅读历史时折叠任务进度（[#147295](https://github.com/openclaw/openclaw/pull/147295)）。
- 自定义 SVG 会话图标（[#147442](https://github.com/openclaw/openclaw/pull/147442)）。
- 创建会话后清理残留 composer 草稿（[#147413](https://github.com/openclaw/openclaw/pull/147413)）。
- 图片更靠近 prompt 气泡（[#147448](https://github.com/openclaw/openclaw/pull/147448)）。

**窗口内关闭示例：** Windows 在 181 秒后因 “stale process” 杀掉 gateway（[#140162](https://github.com/openclaw/openclaw/issues/140162)），`memory_search` 对外宣称已禁用的 sessions corpus（[#147258](https://github.com/openclaw/openclaw/issues/147258)），以及若干自动提交的更新失败报告。

---

## 4. 社区热点

按评论量与运营爆炸半径排序。

| 条目 | 信号 | 底层需求 |
|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) — 工具调用之间的文本泄漏到 Slack/iMessage 等 | **40 条评论**，自 2 月开放，P1，diamond，security+session-state | 运营者需要在*内部旁白*与*用户可见频道文本*之间做硬切割。这是本集合中持续时间最长的 UX/安全投诉。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — 未回收的 hook/tool 子进程 → zombie | **30 条评论**，回归，P1 | 长生命周期 Gateway 主机在数日内退化。hook/tool 的进程生命周期仍未闭合。 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) — subagent 完成结果静默丢失 | **28 条评论**，P1，数据/消息丢失 | Swarm/subagent 用户无法信任 “done”。超时无重试、无通知、无自动重启。 |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) — 9.3/9.4 更新/升级/恢复跟踪 | 维护者索引，P0 | 发版列车本身就是事故。 |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) — 9.2→9.4 candidate-Doctor 拒绝在线 v1 handoff lease | P0，UX 发版阻塞 | 托管更新无法在健康的 Mac 安装上完成。 |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows 重启杀掉正在启动/已就绪的 gateway | P0，现已关闭 | Windows daemon 监督在慢启动下不安全。 |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) — context 溢出 / compaction 死亡螺旋 | P1 | 多步工具倾倒仍会撑爆窗口；compaction 无法恢复。 |
| [#126315](https://github.com/openclaw/openclaw/issues/126315) — Apple 原生聊天未通过路由守卫（`unowned`） | P1，diamond | iOS/macOS 客户端用 display ID 重建会话所有权；Gateway 判定为 unowned。 |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) — 人类可读的 Telegram topic 名称 | P2，自 2 月开放 | 论坛用户下拉菜单里仍看到原始 session key。 |

**需求模式：** 用户把 OpenClaw 当 24/7 消息工人。他们能容忍缺功能；不能容忍**静默丢失**（回复、subagent 结果、待投递）或**破坏性自动修复**。

---

## 5. 缺陷与稳定性

按严重度排序。“Fix PR” 表示提供集合中已链接或明显对应的 PR。

### P0 / 发版阻塞

1. **托管更新失败簇（9.3 / 9.4）** — candidate-Doctor 对上在线 handoff lease（[#145192](https://github.com/openclaw/openclaw/issues/145192)）；finalize:doctor（[#147160](https://github.com/openclaw/openclaw/issues/147160)）；not-git-install（[#146879](https://github.com/openclaw/openclaw/issues/146879)，已关闭）；win32 与 darwin 上的 global-install-failed（[#147369](https://github.com/openclaw/openclaw/issues/147369)、[#147351](https://github.com/openclaw/openclaw/issues/147351)）；update-executor-settlement-failed（[#147461](https://github.com/openclaw/openclaw/issues/147461)，已关闭）。统一协调于 [#145252](https://github.com/openclaw/openclaw/issues/145252)。相关 PR：[#145335](https://github.com/openclaw/openclaw/pull/145335)、[#147440](https://github.com/openclaw/openclaw/pull/147440)、[#147453](https://github.com/openclaw/openclaw/pull/147453)。
2. **Windows gateway 重启** — 181 秒后杀掉已就绪/慢启动进程（[#140162](https://github.com/openclaw/openclaw/issues/140162)，已关闭）；Scheduled Task 空操作重启（[#138833](https://github.com/openclaw/openclaw/issues/138833)，PR [#147437](https://github.com/openclaw/openclaw/pull/147437)）；重定向启动器 “port still busy”（[#137362](https://github.com/openclaw/openclaw/issues/137362)，PR [#137374](https://github.com/openclaw/openclaw/pull/137374)）。
3. **macOS 前端挂起** — 八个线程阻塞在 `AppleEventPermissionProbe`（[#146030](https://github.com/openclaw/openclaw/issues/146030)）；Control UI 在 WebSocket 消息上卡在 JavaScriptCore RegExp（[#143713](https://github.com/openclaw/openclaw/issues/143713)）。
4. **Auth/安全 P0** — 登出后明文密钥留在 `plugin-model-catalog` 缓存；`doctor --fix` 会把它们救活（[#142421](https://github.com/openclaw/openclaw/issues/142421)）；Doctor 只读 MCP 探测会消耗轮换中的 OAuth refresh token（[#147449](https://github.com/openclaw/openclaw/issues/147449)，PR [#147454](https://github.com/openclaw/openclaw/pull/147454)）；Matrix 一次性密钥可能在私有状态落盘前就发布（[#147450](https://github.com/openclaw/openclaw/issues/147450)）。
5. **长时间 429 + 重启后 Telegram 回复丢失**（[#141959](https://github.com/openclaw/openclaw/issues/141959)）— 9.1+ 不会重放投递；与 pending-delivery drain 相关（[#144370](https://github.com/openclaw/openclaw/issues/144370)）。

### P1 — 消息丢失 / 死锁 / 会话完整性

- 工具调用间文本泄漏到频道（[#25592](https://github.com/openclaw/openclaw/issues/25592)）。
- subagent 完成结果静默丢失（[#44925](https://github.com/openclaw/openclaw/issues/44925)）。
- hook/tool 子进程变成 zombie（[#97616](https://github.com/openclaw/openclaw/issues/97616)）。
- context 溢出死亡循环（[#113701](https://github.com/openclaw/openclaw/issues/113701)，[#146724](https://github.com/openclaw/openclaw/issues/146724) 出现在 `openai/gpt-5.6-sol`、20–26 条消息时）。
- `maxConcurrent=1` 时 system-expert 嵌套推理死锁（[#147264](https://github.com/openclaw/openclaw/issues/147264)，PR [#147468](https://github.com/openclaw/openclaw/pull/147468)）。
- `computer` 执行从未释放 → 永久 `COMPUTER_HOST_BUSY`（[#147420](https://github.com/openclaw/openclaw/issues/147420)）。
- 调用方 run 结束后 `sessions_send` A2A announce 被丢弃（[#145865](https://github.com/openclaw/openclaw/issues/145865)）。
- exec-completion 唤醒成功，但 WebChat/Companion 回复被丢（[#147387](https://github.com/openclaw/openclaw/issues/147387)）。
- 可见的 subagent exec 完成会额外打心跳（[#147326](https://github.com/openclaw/openclaw/issues/147326)）。
- Apple 原生 unowned-session 路由（[#126315](https://github.com/openclaw/openclaw/issues/126315)）。
- 畸形 JSON 工具参数在两次已合并修复后仍出现在 9.4（[#147040](https://github.com/openclaw/openclaw/issues/147040)）。
- Signal 上静默自动升级到 Sonnet + HIGH thinking（约 $25 惊吓）（[#147344](https://github.com/openclaw/openclaw/issues/147344)）。

### P2 — 尖锐边角，仍对用户可见

- Anthropic 传输把 3/4 的 `cache_control` 断点烧在 OAuth system header 上（[#147168](https://github.com/openclaw/openclaw/issues/147168)）。
- `doctor --fix` 仅凭 env 就绪度就禁用健康 skill（[#147346](https://github.com/openclaw/openclaw/issues/147346)）。
- `richMessages:true` 时 Telegram 进度草稿从未创建（[#147260](https://github.com/openclaw/openclaw/issues/147260)）。
- 重启恢复会静默剥掉有副作用的工具且不告知模型（[#145029](https://github.com/openclaw/openclaw/issues/145029)）。
- `openclaw logs` 在 “只读” 修复后仍写入 SQLite WAL/SHM（[#147259](https://github.com/openclaw/openclaw/issues/147259)）。
- 空的 `allow: []` 等于全部允许，且无校验警告（[#147342](https://github.com/openclaw/openclaw/issues/147342)）。
- `secrets audit` 报告 `unresolved=0`，同时跳过 exec 引用（[#147341](https://github.com/openclaw/openclaw/issues/147341)，PR [#147466](https://github.com/openclaw/openclaw/pull/147466)）。
- Control UI 多标签 live stream 冻结（[#147447](https://github.com/openclaw/openclaw/issues/147447)）；pair-device 弹窗溢出（[#147401](https://github.com/openclaw/openclaw/issues/147401)）。
- Discord `message.read` 拒绝已加入允许列表的 1:1 DM（[#90499](https://github.com/openclaw/openclaw/issues/90499)）。
- Web UI 隐藏由子会话拉起的 subagent 会话（[#95295](https://github.com/openclaw/openclaw/issues/95295)）。

---

## 6. 功能请求与路线信号

近期较可能落地（PR 已提交，或与 9.4 主题对齐）：

- **私有父会话完成交接**，使子输出在 `NO_REPLY` 后不再发布（[#147206](https://github.com/openclaw/openclaw/pull/147206)）。
- **memory_search 弃权** — `strictMinScore` / 低于阈值时返回空（[#147349](https://github.com/openclaw/openclaw/issues/147349)）。当前该工具从不返回空。
- **人类可读的 Telegram topic 名称**（[#7406](https://github.com/openclaw/openclaw/issues/7406)）— 小、反复被要，仍开放。
- **每个 Gateway 多个 Microsoft Teams bot 账号**（[#112811](https://github.com/openclaw/openclaw/pull/112811)）— 体量大，带兼容性 + 安全边界标志，仍需 proof。
- **Android 接管 Cloudflare Access 浏览器准入**（[#147305](https://github.com/openclaw/openclaw/pull/147305)）。
- **自定义 SVG 会话图标** 以及感知历史的任务进度折叠（PR 已在审）。
- **跨重启 drain 持久化并重试待投递频道消息**（[#144370](https://github.com/openclaw/openclaw/issues/144370)）— 这是消息丢失一类问题的功能形态修复。

预测下一个 tag（9.5 或 9.4.x）：**先修更新路径**，然后是 subagent 完成投递、Doctor 非破坏性，以及 Windows/macOS daemon 交接。在 [#145252](https://github.com/openclaw/openclaw/issues/145252) 降温之前，净新增表面将保持次要。

---

## 7. 用户反馈摘要

**痛点**

- “我点了 Update，Gateway 死了，或回滚到半迁移状态。” 来自 darwin/x64、win32/x64 和 linux/x64 的自动更新报告，在同一 24 小时内全部打在 9.3/9.4 上。
- “agent 做完了活，但我从没看到”——Telegram 429 + 重启、WebChat exec 完成、调用方 run 结束后的 A2A announce、超时且无通知的 subagent。
- “Doctor 把我修得更糟”——健康 skill 被禁用、明文密钥被救活、破坏性的 Workshop/skill 就绪启发式。
- 费用惊吓：Signal 会话从 Haiku 静默跳到 Sonnet HIGH thinking（[#147344](https://github.com/openclaw/openclaw/issues/147344)）。
- 在长、工具密集的回合上，compaction 不是安全网（GPT-5.6 Sol 约 20 条消息就溢出）。
- 安全 UX 陷阱：空允许列表、未读完的 secrets audit、Matrix 密钥上传竞态。

**工单里可见的用例**

- 全天候 Telegram 论坛机器人，以及 Discord/Slack 运营台。
- 带 collector 与 `sessions_yield` 的多 agent swarm。
- 以 macOS/iOS 原生聊天为日常入口，以 Windows Scheduled Task 作为服务端安装。
- MCP + OAuth 工具服务器，Anthropic prompt caching 作为成本控制。
- Memory-core / Active Memory 作为长期大脑——搜索谎报 corpus 或从不弃权时，用户会察觉。

**满意度**

暗示而非直引：人们仍在同一天提交高质量复现与“长得像修复”的 PR。吞吐如此之高，只会发生在产品已进入日常生产使用时。切出 LTS 2026.6.35，明确承认本周并非人人都该乘坐 9.x 列车。

---

## 8. 待办观察

这些事项重要、仍开放，且要么很老，要么卡在维护者 / 产品 / 安全评审（`clawsweeper:needs-maintainer-review` / `needs-product-decision` / `needs-security-review`）。

| Issue | 年龄 / 为何重要 |
|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) 工具调用旁白泄漏到频道 | 自 **2026-02-24** 开放，40 条评论，安全 + UX。需要产品规则，而不是又一个局部补丁。 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) subagent 静默丢失 | 自 **2026-03-13** 开放。核心编排信任。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) zombie 子进程 | 自 **2026-06-29** 开放。生产主机在腐烂。 |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) Telegram topic 显示名 | 自 **2026-02-02** 开放。便宜 UX，仍等产品决策。 |
| [#90499](https://github.com/openclaw/openclaw/issues/90499) Discord DM `message.read` 允许列表 | 自 **2026-06-05** 开放。所有者读不了自己的 DM 历史。 |
| [#95295](https://github.com/openclaw/openclaw/issues/95295) Web UI 隐藏子会话 | 自 **2026-06-20** 开放。Swarm 用户找不到自己的 worker。 |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) compaction vs 巨大工具输出 | 自 **2026-07-25** 开放。会持续在 9.x 上克隆出如 [#146724](https://github.com/openclaw/openclaw/issues/146724) 的工单。 |
| [#126315](https://github.com/openclaw/openclaw/issues/126315) Apple `unowned` 路由 | 需要产品决定：会话所有权契约 vs display ID。 |
| [#142421](https://github.com/openclaw/openclaw/issues/142421) 登出 + Doctor 救活 API key | 仍打着安全评审标签。 |
| [#143937](https://github.com/openclaw/openclaw/pull/143937) 对已持久化掩码的 redaction 重放 | XL PR，会话状态 + 安全边界，仍是 `needs proof`。 |
| [#112811](https://github.com/openclaw/openclaw/pull/112811) 多账号 MS Teams | 自 7 月开放，XL，dirty-candidate 分诊。 |

---

**结论：** OpenClaw 是一个体量很大、节奏很快的 agent 运行时，九月中旬的瓶颈不是功能——而是**让 2026.9.3/9.4 的升级与重启，和它们装上的 Gateway 一样可信**。在该跟踪 issue 安静之前，理性的运营者分流是：不能承受中断的生产主机留在 **2026.6.35 LTS**；只有在能手动跑 Doctor 并容忍回滚时，才使用 **2026.9.4**。

---

## 横向生态对比

# 个人 AI 助手 / Agent OS 对比 — 2026-09-14

快照窗口：社区活动截至 **2026-09-13**，外加最新已发布 tags。下方计数除非另有说明，均为 **约 24 小时内被触及**。Star/fork 数字为当前 GitHub 头条数据。

---

## 1. 生态概览

2026 年 9 月中旬的个人 Agent 市场，已经不再是「能不能在 Telegram 里聊天」的比赛。本集合中的五个项目，竞争的是 **自托管 Agent 操作系统**：本地网关、多通道投递、插件/MCP 扩展、持久记忆，以及多智能体编排。产品表面已经很丰富；共同约束是 **运维真相**——更新要真正完成、停止要真正停下、会话要扛过重启、子智能体要回报完成、登出后密钥必须彻底失效。

两大引力井主导关注度。**OpenClaw**（~390k stars）和 **Hermes Agent**（~245k stars）吸收了大部分社区热度与生产工单。第二梯队——**QwenPaw**（~35k）、**ZeroClaw**（~33k）、**IronClaw**（~13k）——体量更小但架构鲜明：Qwen 作为记忆/Creator OS，两个 Rust 运行时则是安全与租户优先的 Agent OS。

行业模式一致：先放出一波大功能（OpenClaw 9.3/9.4 托管更新、Hermes Pantheon + `state.db`、QwenPaw 2.2.1 routing/Creator、IronClaw 1.4.0、ZeroClaw 0.8.5），然后用接下来一周偿还可靠性税。

---

## 2. 活跃度对比

Health 是 1–10 的综合分，纳入发版节奏、合并吞吐 vs 评审拥堵、P0 爆炸半径，以及运维能否信任升级/重启。它 **不是** star 排名。

| Project | ~24h issues | ~24h PRs | Latest release | Community size | Health | Read |
|---|---:|---:|---|---|---:|---|
| **OpenClaw** | 97 touched | 500 touched (263 merged/closed, 237 open) | **v2026.9.4** (11 Sep) + LTS **2026.6.35** (10 Sep) | ~390k ★ / ~82k forks | **6.5** | 极高吞吐；P0 升级/重启簇 |
| **Hermes Agent** | 12 (7 open / 5 closed) | 50 (17 open / 33 closed) | **v0.21.2 / v2026.9.11** (11 Sep), after v0.21.1 (7 Sep) | ~245k ★ / ~51k forks | **7.5** | 最佳「修复上一版」节奏 |
| **QwenPaw** | 28 (22 open / 6 closed) | 50 (31 open / 19 closed) | **v2.2.1** (11 Sep) + two betas | ~35k ★ / ~3.1k forks | **6.0** | 功能密集发版；控制面 P0 |
| **IronClaw** | 5 (all open) | 27 (18 open / 9 closed) | **1.4.0** (27–28 Aug); no tag this window | ~13k ★ / ~1.5k forks | **7.0** | 安静加固；隔离仍未收口 |
| **ZeroClaw** | 2 open | 50 open, **0 merged** | **v0.8.5** (5 Sep); no tag this window | ~33k ★ / ~4.9k forks | **5.5** | 卡在评审；一个 S1 provider 兼容 bug |

**如何读这张表。** OpenClaw 的原始量级高出同行一个数量级，还包含签名的多平台产物以及明确的 LTS 分叉——这是工业级规模，不是业余噪音。ZeroClaw 的 50 open / 0 merged 则是相反信号：想法在动，二进制没有落地。Hermes 是唯一一个最新 tag 明确写成 **根因级存储补丁**、而不是功能打包的项目。

---

## 3. OpenClaw 的位置

**相对同行的优势**

- **分发与通道覆盖。** macOS / iOS / Android / Windows / Linux 原生客户端，外加 20+ 聊天后端。本集合中没有谁能匹配这套安装矩阵。基金会托管（OpenClaw Foundation、签名发版）在这个体量上也是独一份。
- **贡献者密度。** v2026.9.4 引用 20 次直接提交，**1,558 PRs, 294 contributors**。Hermes 的 v0.21.2 汇总同样是工业级（自 0.21.1 起 312 merged PRs / 140 contributors），但 OpenClaw 的日常消防水龙无人能及。
- **运维分轨明确。** 同一周同时发出 **2026.6.35 LTS** 和 9.4，是成熟让步：不是每台生产主机都该跟当前列车。同行只有「上一个 tag」，没有命名的保守线。
- **产品表面已越过「助手」。** ClawHub skill 搜索、从历史对话生成的 Skill Workshop、GPT Image 2.5、云会话控制、Doctor/迁移预演、prompt-cache 工作。

**技术路径**

OpenClaw 是 **TypeScript/Node Gateway**（9.3+ 要求 Node 24.16+ / 26.1+），带大型插件 SDK、SQLite 记忆、MCP + OAuth，以及托管的隔离候选更新。这与 IronClaw/ZeroClaw 的 Rust fail-closed 运行时相反，也比 Hermes 以 Python 为主的「跟着你一起长的 agent」循环更宽。Node + 插件模型的代价本周已经兑现：SQLite 文本截断逼出了运行时下限，全局 npm 安装弄坏 finalize:doctor，Windows Scheduled Tasks 谎报重启成功，Doctor *过于积极*（健康 skill 被关掉，明文密钥被复活）。

**社区体量**

按 star 和工单量，OpenClaw 是品类默认选项。这既是护城河也是负债：P0 会在同一 24 小时内于 darwin/x64、win32/x64、linux/x64 上被复现。长期投诉（#25592 自 2 月起的 tool-narration 泄漏、#44925 自 3 月起的静默子智能体丢失、#97616 自 6 月起的僵尸进程）能活下来，是因为产品在 24/7 生产使用，不是因为项目闲着。

**本周净定位。** OpenClaw 在覆盖面和节奏上领先。它 **目前并不** 在升级可信度上领先。在 [#145252](https://github.com/openclaw/openclaw/issues/145252) 降温之前，其自身 digest 里的理性生产建议仍然成立：不能承受中断的主机用 LTS；9.4 仅在能手跑 Doctor 并容忍回滚时使用。

---

## 4. 共同技术焦点

这些需求出现在 **两个或更多** tracker 里。它们才是真正的行业 backlog。

**1. 升级 / 守护进程 / 安装真相**  
OpenClaw（9.3/9.4 candidate-Doctor vs 在线交接租约，npm global finalize，Windows Scheduled Task）。Hermes（`hermes update` 以 exit 1 退出，但 LaunchAgent 其实已经重启；0.21.2 后残留 WAL）。QwenPaw（Desktop model card + session 索引在插件重部署后蒸发）。  
*需求：* 幂等更新，报告的是运维眼睛能看见的状态。

**2. 消息与完成投递**  
OpenClaw（Telegram 429 + 重启丢件，调用方结束后才发的 A2A announce，子智能体超时无通知，工具间文本泄漏到 Slack/iMessage）。Hermes（几个月前的网关通知打捞终于落地；IM 转写剥离 ANSI/原始 stdout）。QwenPaw（停止按钮是装饰；下一次发送 HTTP 409）。  
*需求：* 待投递通道消息要持久化并可重放；内部旁白与用户可见文本必须硬拆开。

**3. 多智能体 / 子智能体契约**  
OpenClaw（静默子智能体丢失，swarm `sessions_yield` 把 `agents_wait` 搁浅，私有父级完成交接）。Hermes（Kanban worker 消失，`--triage` 死胡同，worker 用裸 sqlite 写 `kanban.db`）。QwenPaw（`subagent_model` 被忽略；子进程继承父模型）。IronClaw（后台子智能体已在 1.4.0 落地；hosted-MCP 目录仍按 extension id 索引）。  
*需求：* 带类型的生命周期（spawn / refuse / complete / park），外加给苦力活用的廉价模型。

**4. MCP / 协议现实主义**  
OpenClaw（Doctor 只读探测消耗 OAuth refresh tokens）。QwenPaw（2.2.x 弄坏了 2.1 还能用的 Hub MCP；Java SDK `jsonRpcError` / HTTP 500 杀死 Driver 构建；A2A 写了文档但未实现）。IronClaw（多主体目录互相覆盖 #6778；SEP-414 调用方归属）。ZeroClaw（插件出站授权仪式、精确字节 WASM 准入）。  
*需求：* 把脏乱的真实服务器当一等公民；目录按调用方作用域隔离，而不是按扩展。

**5. 持久化隔离**  
Hermes（profile 钉死的 `state.db`，禁止第二写者，FTS 损坏与转写存储隔离）。OpenClaw（Mac+Bun 想要系统 SQLite；embedding 模型强制重建索引）。QwenPaw（侧栏索引 ≠ 磁盘 sessions）。IronClaw（按用户沙箱已发货；CLI `skills list` 仍不是运行时清单）。  
*需求：* 一个 profile 不能绑定另一个 profile 的 DB；搜索降级不得拖垮 list/export。

**6. 成本与上下文控制**  
OpenClaw（Signal 上静默 Haiku → Sonnet HIGH，约 $25 惊吓；Anthropic cache_control 烧在 OAuth header 上；约 20 条工具密集消息后的压缩死亡螺旋）。Hermes（未标价模型记成 $0；约 72% 花费被低估）。QwenPaw（旗舰模型烧在 ReMe/dream/summarize 上；要求单独的记忆写入模型）。IronClaw（prompt-context 上限作为覆盖项；可选文档指针模式）。ZeroClaw（按模型窗口比例压缩，仍未合并）。  
*需求：* 按任务路由模型、诚实的计费 UI、不会变成死亡循环的压缩。

**7. 能扛过「修复」的安全边界**  
OpenClaw（`doctor --fix` 把登出残留复活；空的 `allow: []` = 全放行；Matrix 一次性密钥竞态）。Hermes（`config.yaml` / shell rc 上的终端脱敏跳过——当天关闭）。QwenPaw（kimi-code Write `_paths` 沙箱绕过）。ZeroClaw / IronClaw（git allowed-roots、WASM 准入、hosted-MCP 元数据泄漏）。  
*需求：* Doctor/修复必须非破坏；允许列表 fail closed；插件不能重新打开磁盘或环境套接字。

---

## 5. 差异化分析

| | OpenClaw | Hermes | QwenPaw | IronClaw | ZeroClaw |
|---|---|---|---|---|---|
| **核心定位** | 每个聊天应用里的个人/团队 Gateway | 自我改进的个人 agent | Agent OS + Creator / Hub | 隐私优先的 Rust Agent OS | 小而可任意替换的 Rust 运行时 |
| **默认用户** | 常开运维（Telegram 论坛、Slack 工位、原生 Apple 聊天） | 家庭 / 团队网关 + 编码工厂 | Desktop Windows + Docker 自托管 + 国内 IM | 多租户 / hosted-MCP 运维 | 自托管 + 不可信 WASM 插件 |
| **技术栈** | Node/TS, plugin SDK, ClawHub | Python + TS Desktop, SQLite `state.db` | Python + Console + Creator | Rust + wasmtime + WebChat v2 | Rust workspace, ZeroRelay/Router |
| **记忆叙事** | Memory search + Active Memory；9.4 embedding 重建索引 | 跨会话学习循环，从经验生成 skills | ReMe / Auto Fin / PowerContext | 持久的按用户沙箱 | 按 agent 记忆 + session 附件（排队中） |
| **多智能体** | Swarms、collectors、Skill Workshop | Kanban implementer/reviewer + Bot Mode | 按 agent 路由、ACP runners | 后台子智能体（1.4.0 已发） | 每个 daemon 的具名 agents（0.8.0+） |
| **本周重心** | 更安全的托管更新 vs 现场 P0 | `state.db` 真相 + Kanban 生命周期 | Routing/Creator 发版 vs stop/session/RAM | Hosted-MCP 租户 + IME/Telegram | 安全/插件栈重排，0 次合并 |
| **保守路径** | 命名 LTS 2026.6.35 | 停在 0.21.2；若 WAL 损坏则跑 `doctor` | 2.2.1 后核验 MCP + Desktop sessions | 留在 1.4.0 | 留在 0.8.5；在 #10603 之前避开 OpenCode Go |

**值得据此做选择的架构分叉。** JS/Python 网关（OpenClaw、Hermes、QwenPaw）产品表面迭代最快，也吞下消费级安装多样性。Rust 运行时（IronClaw、ZeroClaw）把一周花在隔离、WASM 准入和政策上——终端用户工单更少，可见发版更慢。两类都还没解决 **投递 + 升级诚实性**。

---

## 6. 社区动能与成熟度

**第一档——品类默认选择（快速迭代、生产负载）**  
**OpenClaw, Hermes。** 两者都能在 bug 出现当天合上真实缺陷，并变基旧的社区工作。两者也会 *因为* 自己是日常基础设施而制造 P0。OpenClaw 是更响、更宽的默认项；Hermes 是本周更干净的「功能之后再修」故事（v0.21.2 真正点名根因：第二写者、WAL generation、一行坏数据、跨 profile 绑定）。

**第二档——功能发版 + 可靠性税**  
**QwenPaw。** v2.2.1 是一次 Agent OS 扩张（routing、PowerContext、Creator 1.2.0、一键插件更新），紧接着就是 RAM 爬升、阻塞事件循环的文件监视、装饰性 Stop，以及 Desktop session 丢失。贡献者响应健康（当天就有 MCP/ACP/watch PRs）。成熟度缺口在控制面所有权，不在想法流量。

**第三档——加固 / 卡评审**  
**IronClaw。** 1.4.0 之后的维护：Telegram 命令菜单已合并，MCP 隔离和 IME 修复在飞，Dependabot 把 PR 数撑大。最健康的信号是「运行时已经稳到 OfficeQA 失手会被怪到模型头上」。风险是 #6778 这类租户问题还开着，列表却被依赖升级主导。  
**ZeroClaw。** 相反的拥堵：50 个重排 PR，大量 XL / `risk:high` / `do-not-merge`，零合并。贡献者连续性是真的；合并权才是瓶颈。tag 发出后 v0.8.5 tracker 仍在被戳——流程味道不对。

**稳定 vs 迭代（各一行）**  
- OpenClaw：在迭代发版列车本身。  
- Hermes：在 Pantheon 之后稳定存储。  
- QwenPaw：在迭代产品；控制面尚未稳定。  
- IronClaw：在稳定租户与 composer。  
- ZeroClaw：在迭代安全设计；还没落地。

---

## 7. 趋势信号

**1. 瓶颈已从「agent 能力」挪到「运维契约」。**  
用户能容忍缺功能。他们不能容忍静默丢失、装饰性 Stop，或把机器搞得更糟的 Doctor。任何新的 agent 运行时，都该把待投递日志、非破坏修复、诚实状态当作 P0 产品，而不是杂务。

**2. 托管更新现在就是产品表面。**  
OpenClaw 的隔离候选预演设计是对的，现场仍然失败（在线 v1 交接租约、全局 npm、Windows tasks）。Hermes 的「更新失败但已经重启」是同一类 bug。每次打 tag 之后，安装/更新是第一条命令；那里的 exit-1 比缺一个 skill 更能放大支持负载。

**3. 多智能体正在离开演示件。**  
Kanban 工厂（Hermes）、swarm collectors（OpenClaw）、按 agent 路由（QwenPaw）、后台子智能体（IronClaw）已在生产里。缺的原语是带 **拒绝原因的状态机**，不是又一个 spawn API。给 grep/记忆/摘要用的廉价副模型是经济要求，不是锦上添花（QwenPaw 的 #4901 从 6 月起就在；OpenClaw 的 $25 Signal 惊吓）。

**4. MCP 既是互操作层，也是事故层。**  
只读探测烧掉 OAuth token、Java SDK 信封、最后写入者获胜的目录、写了文档却不存在的 A2A——协议工作不再是可选抛光。从第一天起就要按敌对/脏乱服务器和多主体目录来设计。

**5. 记忆后端正在与聊天日志分家。**  
Hermes 把 FTS 损坏从转写存储里隔开。QwenPaw 把 ReMe/PowerContext/ADBPG 插件化，立刻撞上按路径作用域的工作记忆 bug（开发树 vs 运行时树）。OpenClaw 运维会注意到 `memory_search` 在推销已禁用语料，或从不拒答。把搜索、session 索引和工作目录当成三个不同的一致性域。

**6. Rust Agent OS vs JS Gateway 是真分叉，不是品牌话术。**  
IronClaw/ZeroClaw 把数周花在 WASM 准入、git roots 和按调用方键控的 MCP 上。OpenClaw/Hermes/QwenPaw 把数天花在 Desktop IME、Telegram markdown 和 Doctor 启发式上。选底座的团队应挑选自己能配得起人的失败模式：政策评审队列，或消费级安装多样性。

**7. LTS / 保守轨道会变成入场券。**  
OpenClaw 已经在 9.x 燃烧时切出 2026.6.35。预期同行会抄一条「别坐这周这班车」的线。对构建者：一旦升级里同时有 daemon + SQLite + 插件迁移，就立刻保留一条延长稳定分支。

**给 Agent 开发者的实践结论**

- 若你现在就需要 **通道覆盖和原生客户端**，OpenClaw 仍是默认项——本周生产主机钉死 **2026.6.35**。  
- 若你需要 **持久学习 + Desktop + 刚打过补丁的存储**，Hermes **0.21.2** 是当前最强二进制。  
- 若你需要 **Qwen 生态的记忆/Creator，并能在升级后核验 sessions**，选 QwenPaw 2.2.1，把 watch/MCP/stop 放进短名单。  
- 若你需要 **多租户 MCP 和更安静的运行时**，IronClaw 1.4.0；在 #8090/#8084 落地前，不要把托管目录当成已隔离。  
- 若你需要 **Rust 里 fail-closed 的插件**，看 ZeroClaw 的合并率，而不是 star 数；在 #10603 发出前，v0.8.5 加 OpenCode Go 是暴露组合。

下个季度胜出的项目，不会是再加一个模型选择器的那些。会是 **update、stop、deliver、remember** 这些动词与 UI 对得上的那些。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-14

**仓库：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) · MIT · 约 245k stars / 约 51k forks  
**窗口：** 过去约 24 小时的 issues/PRs（按提供数据），以及官方标签 **v2026.9.7** 与 **v2026.9.11**  
**快照活跃度：** 触及 12 个 issues（7 个仍开放，5 个已关闭）· 触及 50 个 PRs（17 个开放，33 个已合并/关闭）· 2 个新发布

---

## 1. 本周总览

Hermes Agent 正处在 `v0.21.0` 之后的高节奏稳定化周期。Pantheon 功能波（Bot Mode、peer DMs、实时子代理引导）落地后，维护者在四天内打出两个补丁标签：**v0.21.1**（整合 / 约 34% 瘦身）与 **v0.21.2**（`state.db` 可靠性专项——6 个 PRs，关闭 44 个相关 issues）。官方 `v0.21.2` 说明单独宣称：自 `v0.21.1` 以来有 **947 次非合并提交、1,869 个文件、312 个已合并 PRs、140 位贡献者**，对个人代理代码库而言已是工业级吞吐。

过去 24 小时更像这次发布的“余震”：运维侧仍在撞 SQLite WAL / 配置隔离边界问题，而合并队列主要由 **Kanban/cron 生命周期正确性**、**网关通知卫生**（含对 4–6 月旧 PR 的 salvage）、**MCP session-state** 以及 **Desktop Bot Mode** 主导。健康信号喜忧参半但总体偏强：0.21.0 的核心存储缺陷正在架构层被关掉，但多 profile 的 macOS LaunchAgent 与长生命周期网关的生产用户仍在提交 P2/P3 残留。社区贡献风格很鲜明——大量 PRs 是核心作者（如 `teknium1`）把较旧贡献者工作 rebase 到当前 `main` 上的 “salvage”。

---

## 2. 发布

### v0.21.2 / `v2026.9.11` — “The state.db Patch Release”（2026 年 9 月 11 日）
**标签：** [github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11)

**为何存在。** `v0.21.0` 重写了 session-store 连接处理。在部分安装上这让 `state.db` 变得脆弱：第二写者取消 POSIX 锁、健康的 WAL DB 被报损坏、一行坏记录拖垮 `sessions list`。

**修复（根因，而非创可贴）：**
- 不再出现第二写者：hosted rooms 迁到 `shared-state.db`；dashboard 先以只读打开；cron 生命周期守卫使用已跟踪的连接注册表；`doctor --fix` 拒绝不安全的 checkpoint。([#108076](https://github.com/NousResearch/hermes-agent/pull/108076))
- 健康 WAL 存储不再卡死（`DeletedWalGenerationError`、WSL2 瞬时 I/O、过期的 “locked” 横幅）。([#108082](https://github.com/NousResearch/hermes-agent/pull/108082))
- FTS 索引损坏现归为 `fts_index`（搜索降级；transcript store 存活）。([#108130](https://github.com/NousResearch/hermes-agent/pull/108130))
- 一行损坏记录不再杀死 list/export/insights。([#108086](https://github.com/NousResearch/hermes-agent/pull/108086))
- Sessions 永不绑定/读取另一个 profile 的 DB。([#108074](https://github.com/NousResearch/hermes-agent/pull/108074))
- 打开 `state.db` 在无需写入时不再抢写锁（卡住 4–20s → 约 0.01s）。([#108067](https://github.com/NousResearch/hermes-agent/pull/108067))

**一并纳入的 rollup：** 密码盲填凭证（1Password / Bitwarden / 本地保险库——代理永远看不到密钥）；SHA 钉死的插件目录 + 统一 Desktop Plugins 页；端到端多 profile 隔离（allow-lists、MCP stdio secrets、`MEDIA:` 附件、webhook 路由）；去掉 Desktop 后端 spawn-storm。

**破坏性变更：** 未声明。

**迁移 / 恢复**
- 已有安装：`hermes update`
- 全新安装：`curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`
- 若 `state.db` 已在 0.21.0/0.21.1 中受损：先跑 `hermes doctor`（现可区分结构性损坏与索引损坏），若重建不够，再跑 `hermes sessions recover --inspect-only`（按 profile 钉死）。

### v0.21.1 / `v2026.9.7` — 整合 rollup（2026 年 9 月 7 日）
**标签：** [github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7)

自 `v0.21.0` 以来对 `main` 的补丁 rollup，面向打标签/下游消费者。社区说明描述：约 34% 代码库瘦身，宣称行为零变化；`delegate_task` 可流式传回子结果，并能把后台进程交还父进程；无头主机上的 MCP device-code 认证；按模型的 OpenRouter pins + 20 分钟选择器刷新；原生 ripgrep `search_files`（最高约 6×）；compaction 在重建时保留 prefix cache；cron 在静默 tick 间保持连续性，并暴露错过触发的延迟。无明确破坏性变更。

---

## 3. 项目进展

本 24 小时窗口内已关闭/合并工作聚成四条线。

**网关消息投递（数月 salvage，现已落地）。**  
[#110332](https://github.com/NousResearch/hermes-agent/pull/110332)（已关闭）让后台进程聊天通知在所有模式下对人可见——salvage 自 [#54266](https://github.com/NousResearch/hermes-agent/pull/54266)。相关已关闭谱系：[#49953](https://github.com/NousResearch/hermes-agent/pull/49953)、[#37952](https://github.com/NousResearch/hermes-agent/pull/37952)、[#13122](https://github.com/NousResearch/hermes-agent/pull/13122)（从 Telegram/Discord/Slack/Desktop transcripts 中剥离 ANSI / 省略原始 stdout）。对把 Hermes 当消息机器人跑的人来说，这是实打实的产品体验提升。

**Kanban / cron worker 生命周期。** 一批开放但目标清晰的 PRs，正在把 “worker 消失 / 卡片卡住” 变成可诊断状态：
- 无终端 kanban 调用时，停放干净的 `rc=0` 退出 ([#110322](https://github.com/NousResearch/hermes-agent/pull/110322))
- 报告 `kanban complete` *为何*被拒绝 ([#110330](https://github.com/NousResearch/hermes-agent/pull/110330), [#110323](https://github.com/NousResearch/hermes-agent/pull/110323))
- 在 `changes_requested` 之后恢复 implementer ([#110342](https://github.com/NousResearch/hermes-agent/pull/110342))
- 在 spawn-budget 上限处记录调度拒绝 ([#110340](https://github.com/NousResearch/hermes-agent/pull/110340))
- 当 `current_run_id` 为 NULL 时关闭孤立的 `task_runs` ([#110328](https://github.com/NousResearch/hermes-agent/pull/110328))

**Agent / MCP / sessions。** 已关闭：仅推理的最终答案走空响应阶梯 ([#109205](https://github.com/NousResearch/hermes-agent/issues/109205))；MCP reload 只刷新发起请求的 session ([#109382](https://github.com/NousResearch/hermes-agent/issues/109382))；cron 网关存活误报 ([#109360](https://github.com/NousResearch/hermes-agent/issues/109360))；`/status` 显示数周前的模型 ([#109282](https://github.com/NousResearch/hermes-agent/issues/109282))。开放跟进：compaction 后稳定的消息 ID ([#110329](https://github.com/NousResearch/hermes-agent/pull/110329))。

**Desktop / TTS / ops。** 已关闭 lint autofix ([#110324](https://github.com/NousResearch/hermes-agent/pull/110324))。开放：Bot Screen 流式 Xfce 接管 ([#108914](https://github.com/NousResearch/hermes-agent/pull/108914))、Bot Chat 清空 ([#110338](https://github.com/NousResearch/hermes-agent/pull/110338))、运维通知路由 ([#110337](https://github.com/NousResearch/hermes-agent/pull/110337))、TTS 双重回放 ([#110326](https://github.com/NousResearch/hermes-agent/pull/110326)) 与 command-provider 句子流式 ([#110327](https://github.com/NousResearch/hermes-agent/pull/110327))、Signal SSE 重连时关闭 ([#110331](https://github.com/NousResearch/hermes-agent/pull/110331))。

---

## 4. 社区热点

所提供 PR 列表的评论数为缺失（`undefined`）；下列排序依据 **issue 评论量 + 主题反复出现**。

| 条目 | 状态 | 为何热 | 底层需求 |
|---|---|---|---|
| [#109360](https://github.com/NousResearch/hermes-agent/issues/109360) cron 网关存活 / `HERMES_HOME`（4 条评论） | 已关闭 | 任务其实在跑，却误报 “gateway not running” | 定时自动化必须信任自己的健康检查；home 路径解析是反复出现的多 profile 坑 |
| [#109205](https://github.com/NousResearch/hermes-agent/issues/109205) 仅推理的干净停止（3 条评论） | 已关闭 | 最终响应路径忽略了 `extract_content_or_reasoning()` | 推理优先模型（以及 “内容为空、答案在 reasoning 里”）现已一等公民，不再只是压缩器技巧 |
| [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) 未标价模型记为 $0（2 条评论） | **开放** | 报告者测到约 72% 花费低估（¥8.20 vs ≈¥29） | 成本可观测性 + 用户对别名 / 中转 ID 的价格覆盖 |
| [#109362](https://github.com/NousResearch/hermes-agent/issues/109362) `redact_terminal_output` 密钥泄漏（2 条评论） | 已关闭 | 对 `config.yaml` / shell rc 的 `grep`/`cat` 跳过了赋值脱敏 | 终端工具 + 配置即密钥是安全边界主题（`sweeper:risk-security-boundary`） |
| [#109282](https://github.com/NousResearch/hermes-agent/issues/109282) `/status` 过期模型（2 条评论） | 已关闭 | 长生命周期网关会话把数周前的模型宣传为 *当前* | 运维需要可信的 “此刻在服务的是什么” 信号，尤其是跨周进程 |
| [#108914](https://github.com/NousResearch/hermes-agent/pull/108914) Bot Screen（teknium1，相关 #92524） | **开放** | 维护者亲写；把每个 bot 的 Xfce 桌面流进 Hermes Desktop，用于 2FA / 登录接管 | 无头 Linux bots 没有 “接管 / 交还” 循环就完不成需要人闸的认证 |

**需求模式：** 用户已不再问 “能不能跑起来”。他们要的是 **诚实的状态、诚实的花费、密钥安全的终端，以及对无人值守 bots 的人在环控制**。Kanban issues（#110080、#110339）显示出第二类用户：把 Hermes 当 **多智能体软件工厂** 跑，并在 workers 即兴发挥时与看板状态机搏斗（`sqlite3` 直写、`--triage` 死胡同）。

---

## 5. 缺陷与稳定性

按可能爆炸半径排序。“已有修复 PR” 仅在所供数据或 issue 线程有指示时标注。

| 严重度 | Issue | 备注 | 修复 |
|---|---|---|---|
| **P1 邻近 / 数据完整性** | [#110335](https://github.com/NousResearch/hermes-agent/issues/110335) SQLite WAL generation 冲突 | 在 v0.21.2 *之后*仍开放。运维想要恢复 + 一条命令检查，**且不改 Hermes 源码**。暗示部分 profiles（`fichub`）仍有残留 WAL-generation 竞态。 | 24h 列表中无产品 PR；偏恢复向 issue |
| **P2 / 安装-更新** | [#110333](https://github.com/NousResearch/hermes-agent/issues/110333) `hermes update` 以 1 退出，留下 `fleet_restart_pending` | macOS root-home LaunchAgent + 粘滞的 *具名* `active_profile`。重启其实成功；CLI 却报失败。对 “就帮我更新一下” 的用户极易混淆。 | 开放，未列配对 PR |
| **P2 / 钱** | [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) 未标价模型 = $0 | 静默低估；无用户覆盖；内置表缺别名/中转 ID。 | 开放 |
| **P2 / 请求正确性** | [#110341](https://github.com/NousResearch/hermes-agent/issues/110341) `tool_search` 延迟工具被重新注入 | `inject_memory_provider_tools()` 在 deferral *之后*运行，仍把完整工具列表发出去——烧上下文并废掉桥接。 | 开放 |
| **P2 / MCP 实时 sessions** | [#109382](https://github.com/NousResearch/hermes-agent/issues/109382) `reload.mcp` 只刷新一个 session | 进程全局池 vs 每代理快照。 | 已关闭（同一窗口） |
| **P2 / UX 正确性** | [#109205](https://github.com/NousResearch/hermes-agent/issues/109205) 仅推理答案走空响应阶梯 | 额外延迟 / 看起来像空回合。 | 已关闭 |
| **P2 / CLI-desktop** | [#110333](https://github.com/NousResearch/hermes-agent/issues/110333) 打标 `sweeper:risk-compatibility` | 见上。 | 开放 |
| **P3 / 安全（已关闭）** | [#109362](https://github.com/NousResearch/hermes-agent/issues/109362) 对 `config.yaml` / rc 跳过脱敏 | 命令输出里的密钥。关闭很快——反应健康。 | 已关闭 |
| **P3 / cron 误报** | [#109360](https://github.com/NousResearch/hermes-agent/issues/109360) | 噪音，不是漏跑任务。 | 已关闭 |
| **P3 / 状态撒谎** | [#109282](https://github.com/NousResearch/hermes-agent/issues/109282) 过期的当前模型 | 已关闭；标为 sessions/usage-cost 簇的重复。 | 已关闭 |
| **P3 / Kanban 完整性** | [#110080](https://github.com/NousResearch/hermes-agent/issues/110080) worker 用原始 `sqlite3` 写 `kanban.db` | 策略缺口：“任何 profile 都不得直接写看板状态。” | 开放；相关 PRs #110322/#110330/#110342 |
| **P3 / Kanban 死胡同** | [#110339](https://github.com/NousResearch/hermes-agent/issues/110339) `--triage` 没有出口 | `promote` 拒绝 triage；`claim` 要 `ready`；dispatcher 跳过 triage。 | 开放 |
| **P3 / Desktop UX** | [#110336](https://github.com/NousResearch/hermes-agent/issues/110336) Mermaid 查看器 100% 缩放跑出画布 | 打包 Desktop `v0.21.2` 在 Linux/X11 上；大型 ERD 看起来像 “没渲染”。 | 开放 |

本 24h 集合中未见崩溃循环或 RCE 报告。残留风险是 **持久化 + 多 profile + 更新编排**，不是模型推理。

---

## 6. 功能请求与路线图信号

下一标签的可能候选（已在飞，或被 Pantheon 余波反复暗示）：

1. **Bot Screen** — [PR #108914](https://github.com/NousResearch/hermes-agent/pull/108914)（teknium1）。把每个 bot 的 Xfce 桌面流进 Hermes Desktop；接管做 2FA，再交还。相关 #92524。这是最强的 “会出现在具名发布里” 信号，因为由维护者持有且产品形态清晰。
2. **运维通知路由** — [PR #110337](https://github.com/NousResearch/hermes-agent/pull/110337)：`gateway.notices.{session_reset,provider_error,fallback_switch}` → `chat` / `admin_dm` / `log`。
3. **规范的 Bot Chat 清空** — [PR #110338](https://github.com/NousResearch/hermes-agent/pull/110338)。
4. **钩子驱动的审批升级** — [PR #110325](https://github.com/NousResearch/hermes-agent/pull/110325)：`pre_tool_call` shell hooks 可向既有人工审批闸发出 `action: approve`（默认失败关闭，保留阻断优先）。打了重复标签，因此更可能作为小钩子扩展落地，而非头条功能。
5. **`type: command` 提供方的 TTS 流式**（如 sanoTTS 等本地引擎）— [PR #110327](https://github.com/NousResearch/hermes-agent/pull/110327) + 双重回放修复 [#110326](https://github.com/NousResearch/hermes-agent/pull/110326)。
6. **把 Kanban 做成真正的工作流产品** — triage 出口、拒绝原因、spawn-budget 日志、干净退出停放。若这些合并，预计 `v0.21.3` / `v0.22.0` 说明里会出现 “Kanban 可靠性” 小节。
7. **用户自填模型价格** — [#108775](https://github.com/NousResearch/hermes-agent/issues/108775)。本窗口尚未开工；用户价值高、范围适中。

预测：下一个 *打标签* 的投放更可能是又一次 **补丁**（Kanban + update/LaunchAgent + 定价 + Mermaid），而不是 Pantheon 规模的次版本，除非 Bot Screen 被宣布完成。

---

## 7. 用户反馈摘要

**痛点**
- 即便打过补丁，经历过 0.21.0 的重度用户仍觉得 session store 危险（#110335）。
- macOS 多 profile 上的更新/重启从用户视角并不幂等（#110333）。
- 成本看板对非目录或别名模型 ID 不可信（#108775）。
- Kanban “看起来像 Jira，却把卡片困住”（`--triage` 黑洞；`kanban_complete` 被拒时 workers 直接打 SQLite）。
- Desktop 图表预览在大图上不可用（#110336）。
- 长生命周期网关对当前模型撒谎，直到今天也对 MCP 工具新鲜度撒谎。

**野外用例（由报告推断，非营销）**
- 7×24 消息网关（Telegram/Discord/Slack/Signal），带后台进程监视。
- macOS LaunchAgent 与 Linux 无头上的多 profile 家庭 / 团队网关。
- 自主编码工厂：Kanban 看板 + implementer/reviewer workers + spawn budgets。
- 仍需人过 2FA 的无头 bot 集群（Bot Screen）。
- Desktop 上的本地 TTS 对话循环。

**满意**
- 安全与通知问题当天出现当天关（#109362、网关 ANSI/原始输出簇）。
- 维护者选择 rebase 数月前的社区 PRs 而不是丢掉——这不常见，salvage 提交信息里普遍评价正面。
- 发布说明点名 `hermes doctor` / `sessions recover`，等于承认 0.21.0 伤过部分安装，这比沉默更健康。

**不满**
- 静默的 `$0` 定价，以及 “更新失败但其实已重启”，是信任型缺陷：产品把活干了，却讲错了故事。

---

## 8. 待办观察

需要维护者拍板、或若一直停在 “昨天刚发现还活着” 就会腐烂的条目：

1. **[#108775](https://github.com/NousResearch/hermes-agent/issues/108775)** — 未标价模型 / 无覆盖。开放 P2，usage-cost 区域，本窗口无修复 PR。每天低估都在训练用户忽略账单 UI。
2. **[#108914](https://github.com/NousResearch/hermes-agent/pull/108914)** — Bot Screen。表面积大（CLI、工具、TUI、浏览器、认证、Desktop、dashboard），并打标 `sweeper:risk-security-boundary`。需要评审聚焦，否则会作为巨型 PR 卡死。
3. **[#110335](https://github.com/NousResearch/hermes-agent/issues/110335)** — 不改源码的 WAL generation 恢复。若 v0.21.2 没覆盖这个 profile，要么在 `doctor` 里文档化一条命令仪式，要么接受后续存储 PR。
4. **[#110333](https://github.com/NousResearch/hermes-agent/issues/110333)** — `hermes update` + 具名 profile + root-home LaunchAgent。安装/更新是补丁标签后新老用户第一件会跑的事；这里 exit-1 会放大支持负担。
5. **[#110339](https://github.com/NousResearch/hermes-agent/issues/110339)** + **[#110080](https://github.com/NousResearch/hermes-agent/issues/110080)** — Kanban 状态机漏洞。Workers 已经发现可以用 `sqlite3` 绕过闸门；除非 CLI 长出官方 triage→ready 路径和更响的拒绝原因（PRs #110330/#110323 方向正确），这会变成民间传说。
6. **[#110341](https://github.com/NousResearch/hermes-agent/issues/110341)** — 延迟工具被重新追加。静悄悄地很贵；会以 “为什么我的工具列表又巨大了” 的形式出现。
7. **陈旧但现已关闭的 salvage 栈**（[#13122](https://github.com/NousResearch/hermes-agent/pull/13122) 4 月 20 日开启，9 月 13 日关闭）提醒：**消息投递类 P3 可以躺五个月**。类似的 `sweeper:risk-message-delivery` / Signal SSE [#110331](https://github.com/NousResearch/hermes-agent/pull/110331) 不该再等那么久。

---

**健康一句话：** 发布节奏与贡献密度都很好；项目眼下的任务是在 Pantheon 功能浪潮之后，让 **存储、更新、成本、Kanban** 说真话。`v0.21.2` 是对的补丁。9 月 14 日这份快照，是清场小队。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

我将拉取最新的 IronClaw GitHub 活动，使摘要与仓库一致，而不仅依赖所给快照。接下来会打开仓库的 issues、PRs 和 release 页面，补全活动与评论数。此处 GitHub HTML 信息很薄；我将查询公开 API 获取 issue/PR 详情与评论数。
IronClaw ([nearai/ironclaw](https://github.com/nearai/ironclaw)) 仍是高可见度的 Rust Agent OS：**12,619 stars**，**1,480 forks**，最近一次推送 **2026-09-13**。最新稳定版仍是 **1.4.0**（2026-08-27）。围绕 **2026-09-14** 的窗口里 PR 很忙、release 很静，工作集中在托管 MCP 多租户、WebChat IME、频道以及依赖抖动。

## 1. This Week's Overview

本周活动**偏基础设施，而非发版**。最近 24 小时切片里，项目记录了 **5 个更新的 issues**（全部仍开放）和 **27 个更新的 PRs**（**18 个开放**，**9 个已合并/关闭**），**没有新 release**。这是 1.4.0 之后健康的维护节奏，并非功能冻结：核心贡献者（`kirikov`、`huiq777`、`thisisjoshford`、`pranavraja99`）正在落地或迭代 MCP 隔离、Telegram 命令注册、WebChat 输入框行为，以及基准分类法。PR 量中很大一块来自 Dependabot（Rust、wasmtime、Actions、前端测试依赖），因此原始 PR 数量会夸大产品变更。项目健康度是**运维活跃且注重安全**，有一个长期未关的多租户 MCP issue，整体 issue 积压仍很大（含 PRs 约 1.5k 个开放项）。

## 2. Releases

本窗口没有发布新版本。生产仍停留在 **[ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0)**（发布于 2026-08-28），是对 `1.4.0-rc.1` 的稳定晋级，覆盖自 1.3.0 以来的 81 个 commits。该版本加入了持久通知收件箱、后台子智能体、按用户持久沙箱、托管出口代理、立即运行自动化、Google Docs 语义编辑，以及可选的 in-worker SSH，**无需从 1.3.0 迁移**。下一版工作可见于开放 PRs（托管 MCP 目录隔离、IME 输入框、上下文上限覆盖），而不是已打 tag 的 RC。

## 3. Project Progress

本簇已确认合并：

- **[PR #8072](https://github.com/nearai/ironclaw/pull/8072)** — `feat(telegram): register the Bot API command menu at activation`，作者 `thisisjoshford`，**于 2026-09-10 合并**（7 条评论）。Telegram 聊天菜单现在会在激活时通过 `setMyCommands` 列出 `/model`、`/status`、`/new`、`/stop`、`/interrupt`，停用时尽最大努力调用 `deleteMyCommands`。这是本周最清晰的面向用户频道改进。

已关闭（并非全部合并；若干被取代或替换）：

- **[PR #8083](https://github.com/nearai/ironclaw/pull/8083)** — 合并发现到的托管 MCP 目录，而不是整体替换（解决 last-writer-wins 工具列表问题）。
- **[PR #8089](https://github.com/nearai/ironclaw/pull/8089)** — 打包第一方 **agent.market** 托管 MCP provider 包（manifest + 静态工具回退，直到实时 `tools/list`）。
- **[PR #8088](https://github.com/nearai/ironclaw/pull/8088)** — 将“已设置但为空”的环境变量与未设置区分开（`FOO=` 不再静默变成默认值）。
- **[PR #8076](https://github.com/nearai/ironclaw/pull/8076)** — 区分已配对用户的*已断开*共享频道与未配对账号（已关闭，API 快照中未合并）。
- Dependabot 关闭项：**[#8097](https://github.com/nearai/ironclaw/pull/8097)**、**[#8080](https://github.com/nearai/ironclaw/pull/8080)**（Rust “everything-else” 组），通常被更新的 bump 替换。

仍通过开放 PRs 在 `main` 上推进：

- MCP 正确性：**[#8090](https://github.com/nearai/ironclaw/pull/8090)** 按调用方为目录加键；**[#8084](https://github.com/nearai/ironclaw/pull/8084)** 可选 SEP-414 调用方归因；**[#8085](https://github.com/nearai/ironclaw/pull/8085)** 将运营商安装的包视同宿主捆绑包。
- 运行时/配置：**[#8087](https://github.com/nearai/ironclaw/pull/8087)** 将 prompt 上下文上限改为可覆盖（默认仍为 128k）；**[#8098](https://github.com/nearai/ironclaw/pull/8098)** 固定 `TurnRunState` 快照中 turn lineage 元数据的丢弃。
- WebUI：**[#8092](https://github.com/nearai/ironclaw/pull/8092)** 在输入框中保留 IME 组合状态。

净效果：产品主线是频道 UX 与托管 MCP 多主体隔离；大部分关闭量是依赖卫生。

## 4. Community Hot Topics

评论量不大（典型 0–7 条）。热点是*多用户与 CJK 输入下的正确性*，而不是病毒式功能争论。

| Item | Why it matters | Link |
| --- | --- | --- |
| Telegram command menu | 近期产品 PR 中评论最多（7）；运营商希望频道命令能在原生客户端中被发现 | [PR #8072](https://github.com/nearai/ironclaw/pull/8072) |
| Hosted-MCP catalog keyed by extension id | 多主体服务器上的跨用户工具元数据；最后一次发现会覆盖共享槽位 | [Issue #6778](https://github.com/nearai/ironclaw/issues/6778), [PR #8090](https://github.com/nearai/ironclaw/pull/8090) |
| IME Enter submits chat | WebChat v2 CJK 组合 bug 复发 | [Issue #8091](https://github.com/nearai/ironclaw/issues/8091), [PR #8092](https://github.com/nearai/ironclaw/pull/8092) |
| Skills CLI vs runtime | `ironclaw skills list` 看不到运行时写入的 skills，也看不到其他用户的 skills | [Issue #8086](https://github.com/nearai/ironclaw/issues/8086) |
| Daily OfficeQA taxonomy | 维护者发布 harness-vs-model 失败拆分 | [Issue #8093](https://github.com/nearai/ironclaw/issues/8093), [Issue #8081](https://github.com/nearai/ironclaw/issues/8081) |

底层需求：**托管 MCP 的租户隔离**、**与浏览器 IME 一致的输入框行为**、**CLI/运行时 skill 清单一致性**，以及**频道对等**（Telegram 菜单、Slack/共享频道状态）。更早的相关 PRs **[#6760](https://github.com/nearai/ironclaw/pull/6760)**（9 条评论）和 **[#6759](https://github.com/nearai/ironclaw/pull/6759)**（6 条评论）表明 MCP/marketplace 这条线自七月下旬就一直开着。

## 5. Bugs & Stability

按本周可见项的严重程度排序：

1. **High — 多主体托管 MCP 目录泄漏 / 覆盖**  
   [Issue #6778](https://github.com/nearai/ironclaw/issues/6778)（自 **2026-07-28** 开放，2026-09-08 更新，2 条评论）。发现以激活用户身份运行，然后**仅按 extension id** 发布。安装是按用户的；发布的目录不是。影响：用户可以互相覆盖工具列表；一个主体的元数据可能出现在另一个主体已发布的包中。修复 PRs 已有：[#8090](https://github.com/nearai/ironclaw/pull/8090)（开放，按调用方加键），[#8083](https://github.com/nearai/ironclaw/pull/8083)（已关闭，合并而非替换）。作为产品问题尚未完全关闭。

2. **Medium — WebChat v2 IME 组合时按 Enter 会提交**  
   [Issue #8091](https://github.com/nearai/ironclaw/issues/8091)，作者 `supermomonga`。确认 IME 转换也会发送消息（包括 Safari `keyCode 229` / `isComposing` false）。此前已见过的用户可见 bug 复发。修复 PR：[#8092](https://github.com/nearai/ironclaw/pull/8092)（开放）。

3. **Medium — CLI/运行时 skill 清单分裂**  
   [Issue #8086](https://github.com/nearai/ironclaw/issues/8086)。`ironclaw skills list` 漏掉智能体运行时安装的 skills，以及任何 CLI 未配置成的用户所拥有的 skills。调试“agent 看不到 skill”会指错层。

4. **Low–medium — 共享频道状态文案**  
   [Issue #8074](https://github.com/nearai/ironclaw/issues/8074) / [PR #8076](https://github.com/nearai/ironclaw/pull/8076)：已配对用户处于已断开共享频道时，拿到的是配对通知文案，而不是频道特定指引。

5. **可观测性，而非产品崩溃** — 每日分类 [#8093](https://github.com/nearai/ironclaw/issues/8093) 与 [#8081](https://github.com/nearai/ironclaw/issues/8081) 报告 OfficeQA 约 42 个未通过任务**大多是模型质量的数值错误**（DeepSeek-V4-Flash），不是 harness 回退。稳定性信号：*运行时*被认为足够稳定，失败被归因于模型。

本 24 小时 issue 集合中没有新的崩溃循环或数据丢失报告。Dependabot wasm bump **[#7834](https://github.com/nearai/ironclaw/pull/7834)** 标为 `risk: medium` / `size: L`，自 2026-08-23 起一直开放。

## 6. Feature Requests & Roadmap Signals

看起来像 1.4.x / 1.5 候选的信号：

- **将托管 MCP 做成一等公民的多租户底座** — 按调用方的目录（[#8090](https://github.com/nearai/ironclaw/pull/8090)）、SEP-414 归因以便 provider 区分会话与重试（[#8084](https://github.com/nearai/ironclaw/pull/8084)）、捆绑的 agent.market 包（[#8089](https://github.com/nearai/ironclaw/pull/8089)）。若隔离测试通过，落地概率最高。
- **运营商/部署旋钮** — prompt 上下文上限作为覆盖而非常量（[#8087](https://github.com/nearai/ironclaw/pull/8087)）；空 env 与未设置 env（[#8088](https://github.com/nearai/ironclaw/pull/8088)）；运营商安装的包按宿主捆绑包同样校验（[#8085](https://github.com/nearai/ironclaw/pull/8085)）。
- **频道完整性** — Telegram 原生命令菜单已合并；共享频道“已断开 vs 未配对”仍在飞行中。
- **输入框 / CJK** — IME 安全的 Enter 很可能是下一刀里的小 WebUI 补丁。
- **上下文/附件策略** — [PR #8082](https://github.com/nearai/ironclaw/pull/8082) 文档文本的可选 pointer 模式（成本控制）。
- **沙箱默认** — [PR #8075](https://github.com/nearai/ironclaw/pull/8075) 将嵌入式 Pi sandbox 循环作为启动默认（4 条评论）。

预测：下一个 tag 更可能是 **1.4.1 级正确性 + MCP 隔离** 投放，而不是大型功能发版，除非 marketplace 捆绑与 SEP-414 一起上船。

## 7. User Feedback Summary

本切片里直接终端用户报告不多，但很具体：

- **CJK / IME 用户**无法在不发送的情况下完成组合（[#8091](https://github.com/nearai/ironclaw/issues/8091)）。痛点在 WebChat v2 里即时可见；修复 PR 已经存在。
- **运营商与智能体作者**不能把 `ironclaw skills list` 当作运行时已安装内容的真相源（[#8086](https://github.com/nearai/ironclaw/issues/8086)）。这会造成假阴性调试。
- **多用户 / 托管 MCP 运营商**需要目录与归因按调用方和会话作用域，而不是 extension id（[#6778](https://github.com/nearai/ironclaw/issues/6778)，[#8084](https://github.com/nearai/ironclaw/pull/8084)）。这是平台信任问题，不是表面问题。
- **Telegram 用户**希望命令出现在客户端汉堡菜单里 — 现已由已合并的 [#8072](https://github.com/nearai/ironclaw/pull/8072) 处理。
- 维护者对基准的评论将 OfficeQA 未命中框成模型数学/导航错误，这对 harness 稳定性是温和的**正面**信号，也提醒头条智能体分数仍会随基座模型摇摆。

满意度读法：贡献者在交付范围很紧的修复；不满集中在**隔离、CLI 可见性、输入法打磨**，而不是“助手什么都不干”。

## 8. Backlog Watch

比再堆 Dependabot PRs 更需要维护者注意力的事项：

1. **[Issue #6778](https://github.com/nearai/ironclaw/issues/6778)** — 已开放约 7 周。安全相邻的多主体托管 MCP 跨用户元数据。不应排在例行依赖 bump 后面。
2. **[PR #8090](https://github.com/nearai/ironclaw/pull/8090)** + **[PR #8084](https://github.com/nearai/ironclaw/pull/8084)** — 真正的隔离/归因修复；评审/合并路径才是关掉 #6778 的办法。
3. **[Issue #8086](https://github.com/nearai/ironclaw/issues/8086)** — CLI/运行时 skill 列表分裂；所给 24 小时集合中没有关联修复。
4. **[Issue #8091](https://github.com/nearai/ironclaw/issues/8091)** / **[PR #8092](https://github.com/nearai/ironclaw/pull/8092)** — 小 UX 回退且补丁已就绪；容易关掉。
5. **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)** — wasmtime/wasm-tools 组 bump，自 2026-08-23 开放，标为中等风险 / 大体量。这种体量的陈旧依赖 PR 容易腐烂。
6. WebUI 打磨栈仍开放：[#8071](https://github.com/nearai/ironclaw/pull/8071)、[#8070](https://github.com/nearai/ironclaw/pull/8070)、[#8069](https://github.com/nearai/ironclaw/pull/8069)、[#8068](https://github.com/nearai/ironclaw/pull/8068)（`italic-jinxin`）— command-card 高度、slash-command 元数据、关闭动作、活动命令可见性。
7. 结构性积压：**约 1,523 个开放 issues+PRs**。每日分类 issues（#8081、#8093）有用，但若不关闭或滚进仪表盘就会堆积。

**健康快照：** 1.4.0 之后的 IronClaw 处于**加固冲刺** — MCP 租户、频道 UX、输入框正确性、部署旋钮 — 机器人驱动的依赖卫生很强，公开讨论量偏弱。主要风险不是不活跃；而是让 **#6778 级隔离**一直开着，同时 Dependabot 主导 PR 列表。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

我会拉取最新的 QwenPaw GitHub 动态，让这份摘要与仓库实际状态一致，而不只是快照。正在获取 v2.2.1 发行说明以及若干高信号议题，以确保摘要准确。
# QwenPaw 项目摘要 — 2026-09-14

**仓库：** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) · 约 34.9k stars / 3.1k forks · Apache-2.0  
**窗口：** 活动集中在 **v2.2.1 稳定版发布**（2026-09-11）至 2026-09-14  
**快照计数：** 28 个议题被触及（22 个开放 / 6 个已关闭）· 50 个 PR 被触及（31 个开放 / 19 个已合并或关闭）· 3 个发行版

---

## 1. 本周总览

QwenPaw 正处于**发版后的冲刺期**，而非安静的补丁窗口。稳定版 **v2.2.1** 在三天内连续两个 beta 之后于 9 月 11 日落地，议题跟踪器立刻被 Desktop/Windows 回归、MCP 兼容性断裂、会话/模型持久化失败，以及围绕 memory 与 subagent 的成本控制诉求填满。贡献侧速度高且健康：最新一批 PR 中有不少是首次贡献，专门针对 2.2.x 线上的具体缺陷。健康信号是这类规模的个人 Agent OS 的典型混合态——产品表层（按 Agent 路由、ReMe/PowerContext、Creator 1.2.0、插件一键更新）推进很快，而**会话真实性、停止/取消、MCP Driver 构建以及长时运行资源占用**则是这种速度的可靠性税。维护者在同一窗口内关闭了若干功能/无效工单，说明分诊仍在进行，尽管若干高严重度缺陷仍处于开放状态。

---

## 2. 发行版

### v2.2.1（稳定版）— 2026-09-11  
https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1  

在 2.2.0 之上的功能密集补丁，不是小热修。发行说明里没有明确的破坏性变更横幅；但对使用自定义 MCP、ACP、memory 后端或 Desktop 的人来说，仍是一次**行为敏感的升级**。

**新增（高信号）**  
- 按 Agent 的 **model routing**（provider 偏好 + fallback）— [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)  
- **Auto Fin** 主动 memory 复盘 + ReMe 可靠性工作 — [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441)  
- **PowerContext** 作为可选长期 memory 后端 — [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)  
- 更强的默认 Agent 策略（scope、不受信任内容、确认、完成）— [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)  
- **Creator 1.2.0**：blueprint 工作台、多时间线对比、视频模板、MiniMax H3、快照回滚、Docker — [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)  
- 跨 Agents / MCP / tools / 本地模型的统一环境变量设置 — [#7538](https://github.com/agentscope-ai/QwenPaw/pull/7538)  
- 插件 / PawApp 一键更新检测 — [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)  
- Skill 预加载、带版本的 Skills + 依赖检查、MCP HTTP/SSE 超时 — [#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183)、[#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)、[#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)

**变更**  
- Memory 后端获得一致的生命周期；ADBPG 与 PowerContext 以插件形式交付 — [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561)、[#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)  
- Console 主题 / 侧边栏 / 移动端 Agent 选择器打磨 — [#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487)、[#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)

**修复（摘选）**  
- 流式 / 会话切换 / 排队发送竞态 — [#7523](https://github.com/agentscope-ai/QwenPaw/pull/7523)、[#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)  
- 运行时路径上的 MCP tool allowlist；遗留 MCP HTTP 401 发现 — [#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504)、[#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)  
- 已消费 thinking 块的上下文折叠 — [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)  
- Windows ACP workspace 启动卡住 — [#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)

**同一列车上的 Beta**  
- [v2.2.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1)（08 Sep）— 路由 + docs/website + 流式会话同步  
- [v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2)（10 Sep）— 移动端选择器、CSS 对齐、版本号上调  

**迁移说明（推断，非官方）：** 把 2.2.x 的 MCP Driver 构建以及磁盘上的 session 当作**升级后必须核验**的项。已有用户报告 Desktop 2.2.1 上 model card 消失、会话整段不见。桌面端重启后请重新选择模型；不要假设侧边栏会话索引等于磁盘上的 session 文件。插件商店 UX 是 2.2.1 的目标（一键更新），但目录离线回退与安装流刷新仍有后续缺陷。

---

## 3. 项目进展

**2.2.1 已落地、社区已在其上继续建设的部分**

| 主题 | 推进了什么 | 证据 |
|---|---|---|
| 多模型 Agent | 按 Agent 路由已落地；subagent 覆盖仍不完整 | [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)；后续 [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)、[#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680)、[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) |
| Memory 成本与后端 | ReMe 升级、Auto Fin、PowerContext、插件化后端 | [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441)、[#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)、[#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) |
| Console / 插件 | 一键更新、侧边栏、env 页 | [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)；相关诉求 [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) 在发版后关闭 |
| 协议表层 | MCP 超时 + 401 兼容；A2A 仍仅文档 | [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)、[#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) |
| i18n | pt-BR 语言包完成并修复 | [#4009](https://github.com/agentscope-ai/QwenPaw/pull/4009) 已关闭；修复 [#7734](https://github.com/agentscope-ai/QwenPaw/pull/7734) |
| 渠道 | Telegram 表格 / markdown / 清理 | [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) 已关闭；[#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713)、[#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718)、[#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) 开放 |

**本快照内已关闭（6 个议题）**  
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — `subagent_model` 被忽略（缺陷已确认；路由工作继续通过 PR 推进）  
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — 幽灵会话 / 索引 vs 磁盘 — 以 **invalid** 关闭（同一症状族仍活在 [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)）  
- [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) — 插件商店点击税 / 缺少批量更新  
- [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) — 单独的 RemeLight memory 模型（实现 PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) 仍开放）  
- [#3429](https://github.com/agentscope-ai/QwenPaw/issues/3429) — 在 Docker 中预装 `himalaya` 及常见 CLI 工具（2026 年 4 月开立，9 月 13 日关闭）  
- [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) — v2.2.1 安装核验值班工单  

**推进下一拍、快照内尚未合并的开放 PR 主题**  
MCP Java 信封 + HTTP 错误保留（[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)、[#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)），ACP 权限 `kind` 匹配（[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)），非阻塞 workspace 文件监视（[#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)），DeepSeek V4 Flash 能力（[#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736)），Serply 搜索（[#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712)），Atlas Cloud provider（[#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)），Playwright driver 自愈（[#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)）。

---

## 4. 社区热点

本转储里评论量不大（1–6），因此这里的「热」指**重复报告人 + 主题簇**，而不是病毒式反应计数。

1. **停止 / 取消是谎言** — [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)（6 条评论）  
   UI 显示已停止；进程仍在跑；下一次发送撞上 HTTP 409。对任何长工具循环都是信任破坏点。

2. **Memory 待不住** — [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)（4 条评论）  
   高阶用户的插件工作流（开发路径 A → Agent 路径 B → 运行时路径 C）。Agent「忘记」写入位置规则，开始在运行时树里写代码；部署脚本随后覆盖成果。底层需求：**持久、按路径作用域的工作 memory**，而不只是对话向的 ReMe。

3. **Desktop 会话 + 模型配置蒸发** — [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)、[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)（各 3 条评论），同一作者  
   插件重部署 / 关机后，即使还能重新选模型，model card 和整段对话也会从 Console 消失。需求：把会话索引和 provider 配置做成崩溃安全的持久状态。

4. **文档里的 Driver 路径上的 A2A** — [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484)（3 条评论，自 02 Sep 开放）  
   架构文本承诺 MCP / A2A / ACP 走同一套 Driver；真正落地的只有 MCP。需求：公开一个 A2A 日期，或诚实写上「不在 2.2」。

5. **脏活用便宜模型 / memory 写入** — [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)（自 02 Jun 开放，11 Sep 仍被戳），[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)、[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)  
   Claude Code 式的「Haiku 做 grep，Opus 做推理」，以及「别拿旗舰模型烧夜间 dream/summarize」。这是跟踪器里最强的*经济*主题。

6. **2.2.x 之后的协议互操作** — [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)、[#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)  
   Hub MCP 在 2.1.1b3 能用，到 2.2.x 坏了；Java MCP SDK 返回 HTTP 500 + 非标准 `jsonRpcError`。需求：把脏乱的真实世界服务器当作一等公民来做 Driver 发现。

**压缩后的底层需求：** 诚实的控制面（停止、会话、模型）、更便宜的次级模型、协议现实主义（Java MCP、ACP option ID、A2A），以及工作区规模的运行时（文件监视、memory 上限）。

---

## 5. 缺陷与稳定性

按爆炸半径排序。「修复 PR」= 转储中已链接或明显对应的开放 PR，并非已确认合并。

| 严重度 | 议题 | 症状 | 修复 PR？ |
|---|---|---|---|
| **P0** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 容器 RAM 以约 1 MB/s 上涨，来自无界 stream buffer + keep-alive 叠加 + doom-loop 门控逃逸 → 挂起/OOM | 相关：[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)（console `stream_one` 静默失败）— 不是完整的内存修复 |
| **P0** | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | Files 面板 SSE `/api/workspace/watch` + `watchfiles.awatch` 同步基线扫描在大型仓库上**堵住整个事件循环**；WebUI + 飞书/QQ 一起死 | **有** [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)（线程化轮询） |
| **P0** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 停止按钮说谎；任务继续；下一条 prompt 409 | 转储中无专门 PR |
| **P0** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) / [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | Desktop 2.2.1 上会话 + 已配置 LLM 消失 | 无专门 PR；[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) 以 invalid 关闭 |
| **P1** | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 自 2.2.x 起 MCP 连接/注册损坏 | **有** [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) |
| **P1** | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | Java MCP `server/discover` HTTP 500 + `jsonRpcError` 杀死 Driver 构建 | **有** [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) |
| **P1** | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | 工作区外写入硬拦截对 kimi-code Write `_paths` 视而不见 — **沙箱绕过** | 转储中无 PR |
| **P1** | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ACP `trusted: true` 仍弹确认；`_pick_allow_option` 只匹配 `allow_*` ID | **有** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) |
| **P2** | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | arxiv.org 不可达时 ReMe Daily Paper 失败；收件箱显示「无内容」 | 无 PR |
| **P2** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Cron / 普通回复把真正答案藏进 thinking/steps | 无 PR |
| **P2** | [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720) | Creator 1.2.0 storyboard 路径卡在 `BLOCKED / GATED`，没有 accept-image 控制 | 无 PR |
| **P2** | [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) | 插件目录 CDN 闪断 → 500，而不是文档所述的空目录回退 | 无 PR |
| **P2** | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` 被忽略；子 Agent 继承父级 `active_model` | 已关闭；诊断 [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 仍开放 |

**回归模式：** 2.2.x 收紧了 Driver、ACP 和 memory 插件，随后生产客户端（Java MCP SDK、kimi-code ACP、Desktop 会话存储、大型 Docker workspace）掉出快乐路径。其中若干当天就有修复 PR，维护者响应时间不错。

---

## 6. 功能请求与路线信号

很可能进入 **2.2.2 / 2.3** 的候选：它们已有 PR，或坐在刚落地的原语上：

| 请求 | 信号 | 为什么可能很快落地 |
|---|---|---|
| 单独的 memory 写入模型 | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) 已关闭 + [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | ReMe/Auto Fin 之后的直接成本收益 |
| 按任务 / subagent 模型 | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)、[#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | 路由已有；覆盖是缺的那一半 |
| DeepSeek 原生能力 | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717)、[#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) | 仅目录变更，风险低 |
| Serply `web_search` | [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711)、[#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | 可选 BYOK，形态与 AnySearch 相同 |
| 按 `kind` 的 ACP 权限 | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)、[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) | 受信任会话的正确性修复 |
| Workspace watch 重写 | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721)、[#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) | 可用性修复；不该再等 |
| Agent 间 / 主动历史分组 | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | 多 Agent 流量上来后的 Console 信息架构 |
| 自定义默认 Loop 模板 | [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714) | UX 很小，日常摩擦很高 |
| Files 面板显示点文件开关 | [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) | 小改，开发者在要 |
| Agent 自主的上下文驱逐 | [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) | 战略性；比补丁更大的设计 |
| 官方 A2A | [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | 已写入文档、未实现 — **路线图项，不是 2.2.2 稳进项** |
| Atlas Cloud provider | [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | 自 7 月开放；若不评审可能滑期 |

**预测：** 下一个 tag 更可能是一次**稳定性 + 成本控制**发版（watch 重写、MCP/ACP 互操作、memory_model、subagent 模型诊断），而不是又一轮 Creator/Hub 功能投放。

---

## 7. 用户反馈摘要

**谁在提：** 重度 Desktop Windows 用户、Docker 自托管者、跨越三套文件系统根的插件作者、接入 Java/Kotlin MCP 与 kimi-code ACP 的人、Telegram 渠道运营者，以及成本敏感的 ReMe 用户。

**他们拿它做什么**  
- 跨多台机器、带大量插件的个人「运维管家」  
- 源码 / Agent / 运行时树分离的插件/PawApp 开发  
- 定时 memory 任务（Daily Paper、dream/summarize、Auto Fin）  
- 把 ACP runner 委派出去的多 Agent 编程  
- 把 IM 渠道当真正 UI（Telegram 的 markdown/表格反复出现）

**痛点**  
- 控制面说谎：停止不是停止，会话列表不是磁盘，模型设置会消失  
- 2.2.x 的 MCP 升级弄坏了能用的 2.1 配置  
- 后台 memory 与幼稚的 subagent 拉起在烧旗舰模型 token  
- 大型 workspace 能把**整个**进程拖死  
- Cron/Creator 表层把真实错误藏在「completed / GATED / 无内容」后面  
- 即使讲了一键更新，插件市场仍觉得点击重

**满意度（间接）**  
人们没有弃用产品；他们当天就在写详细复现和首次 PR。这是把项目当基础设施用的画像。[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) 被标 invalid 关闭、同一报告人的 [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 仍开放，是主要的满意度风险——会话丢失故事需要一个负责人，而不是「invalid 关掉 + 双胞胎工单」。

---

## 8. 待观察积压

需要维护者拍板或合并，而不是更多用户评论。

| 项 | 年龄 / 状态 | 为什么重要 |
|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) 按任务的 subagent 模型 | 自 **2026-06-02** 开放，仍被 2.2.1 缺陷引用 | 核心成本架构；只发路由不发这项等于功能做一半 |
| [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) A2A 时间线 | 自 02 Sep 开放；架构文档已经点名 | 预期债务。哪怕写「不早于 2.3」也能降噪 |
| [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) 停止只是外观 | 开放 10 天，6 条评论，**无修复 PR** | 本转储里最高的 UX 诚信缺陷，且没有负责人 |
| [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) / [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 模型 + 会话丢失 | 重复的 Desktop 报告人 | 数据丢失级；不该停在「重新选一下模型」 |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 三条路径的内存泄漏 | 有受控复现 + 建议的最小修复 | 会打官方镜像的运维值班 |
| [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) 经 kimi-code 的越界写入 | 安全边界漏洞，无 PR | File Guard 是对外宣传的支柱 |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) Playwright driver 自愈 | 自 **07 Aug** 开放，标记 ready-for-human-review | 「死一次就永远死」的浏览器后端 |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) Atlas Cloud | 自 **27 Jul** 开放 | 首次贡献者已等约 7 周 |
| [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) Agent 自主压缩 | 新（13 Sep）但设计很重 | 若被忽略，长任务会反复带着失忆醒来 |

---

**健康一句话：** v2.2.1 把 QwenPaw 从「带插件的助手」推向了 **Agent OS**（路由、memory 后端、Creator、Hub）。社区正用补丁匹配这份野心；下一步健康动作是打一个短稳定性 tag，让停止、会话、MCP 发现和工作区 I/O 先变真，再加下一种协议。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

我将收集仓库当前状态并补全所提供快照中的缺口，以确保摘要准确。正在获取两个活跃 issue 以及若干高信号 PR 的评论、标签与评审状态。
# ZeroClaw Project Digest — 2026-09-14

**Repo:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) · Rust 个人智能体运行时 · 约 32.8k stars / 约 4.9k forks · 最新已发布标签 **v0.8.5** (2026-09-05)

所提供快照覆盖的窗口：过去 24 小时内更新的 issues/PRs（截至 2026-09-13）。

---

## 1. 本周概览

ZeroClaw 正处于 **v0.8.5 发布后的集成排队期**，而非发版周。过去 24 小时显示 **2 个开放 issue 被触及，50 个开放 PR 被重新堆叠或刷新，零合并、零新版本发布**。这一模式与大型 Rust 工作区在 454 次提交的发版之后相符：贡献者将安全、插件、提供商与运行时相关工作变基到当前 `master`，但没有任何内容合入。

项目健康状况看起来 **活跃但拥堵**。许多最热门的 PR 体量为 XL，标有 `risk:high` / `domain:security`，并带有 `needs-author-action`、`needs-maintainer-review`、`status:blocked` 或 `do-not-merge`。因此吞吐量受限于评审，而非点子。该窗口内唯一明确面向用户的事件是一个 S1 级提供商缺陷，可能导致 OpenCode Go 模型不可用并有账号被标记的风险。

---

## 2. 版本发布

本周期无新版本。当前最新仍为 **[v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)** (2026-09-05)：ZeroRelay/ZeroRouter、更严格的插件与技能边界、更广的提供商覆盖，以及聊天与频道侧的运维体验改进。

跟踪器 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)（v0.8.5 有限期周稳定化线路）在 2026-09-13 仍有更新，尽管标签已发布；应将其视为遗留里程碑线程，而非进行中的发版切割。

---

## 3. 项目进展

**所提供 24 小时窗口内已合并 / 已关闭：0。** 进展仅体现为 `master` 上仍在推进的开放工作：

| Theme | What advanced (still unmerged) | Representative PRs |
|---|---|---|
| Security / policy | Shell V1 权限策略（RFC #7155 Phase 0+1）；OIDC 令牌验证提供商；git allowed-roots；频道插件出站；入站认证 ADR | [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610), [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255), [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#10750](https://github.com/zeroclaw-labs/zeroclaw/pull/10750), [#10831](https://github.com/zeroclaw-labs/zeroclaw/pull/10831) |
| Plugins / WASM | 精确字节准入、宿主中介 WebSocket、命名 TLS profiles、插件加载校验、install/list 出站授权仪式 | [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134), [#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142), [#10752](https://github.com/zeroclaw-labs/zeroclaw/pull/10752), [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) |
| Runtime / sessions | 智能体生命周期协调、ACP 转录分页、按模型窗口比例做上下文压缩、持久化会话 prompt 附件 | [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621), [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596), [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535), [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) |
| Providers | 每个 profile 多模型、Hailo-Ollama 原生、像素级图像校验、媒体标记降级 | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109), [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819), [#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838) |
| Connectivity | 由中继终止的浏览器注册前门（phase 1） | [#10525](https://github.com/zeroclaw-labs/zeroclaw/pull/10525) |
| Skills | 声明式自动激活 + 提供商切换 / 图像轮次工具拦截 | [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) |

队列由少数杰出/核心贡献者（JordanTheJet、NiuBlibing、Audacity88、vrurg）主导，他们在重新堆叠叠放的草稿。这是健康的贡献者连续性；但并不等同于已交付进展。

---

## 4. 社区热点

大多数所列 PR 的评论数未提供（`undefined`）。按快照中的 **显式互动 + 严重性标签** 排序：

1. **[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)** — `[Bug] OpenCode providers never send x-opencode-session`  
   作者 JordanTheJet · 打开于 2026-09-03 · 更新于 2026-09-13 · **3 comments, 3 👍** · 标签 `priority:p1`、`risk:high`、`status:in-progress`、`domain:security`。  
   **需求：** OpenCode Go 需要稳定的按会话 `x-opencode-session`（以及真实的 User-Agent）用于路由/prompt-cache；缺少这些头会弄坏 Go 模型，并可能看起来像滥用客户端流量。这与其他智能体运行时在 2026-09-05/06 前后碰到的行业级契约变更相同。

2. **[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)** — v0.8.5 稳定化跟踪器  
   在 2026-09-13 仍被戳了一下。**需求：** 在 intake freeze 之后，需要单一事实来源说明 0.8.5 里到底合入了什么、没合入什么。

3. **安全策略栈** — [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610)（shell V1 / RFC #7155）、[#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)（git allowed roots）、[#10750](https://github.com/zeroclaw-labs/zeroclaw/pull/10750)（频道插件出站）、[#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)（插件安装出站授权仪式）。  
   **需求：** 为 shell、git、插件与网络出站提供一套权限模型，而不是按工具各自开例外。

4. **运维级运行时** — [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)（协调智能体生命周期变更）、[#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596)（分页 ACP 转录）、[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)（按模型窗口比例压缩）。  
   **需求：** 长生命周期的多频道 / ACP 会话，避免快照漂移或全量历史物化。

5. **WASM 插件平台** — 自 7 月起的长栈仍在被重新堆叠（[#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863)、[#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134)、[#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142)、[#10752](https://github.com/zeroclaw-labs/zeroclaw/pull/10752)）。  
   **需求：** 插件不能重新打开磁盘产物、不能拿走环境套接字，并且安装后可被校验。

底层需求始终一致：**自托管智能体 + 不可信插件 + 付费第三方模型中继**，默认失败关闭。

---

## 5. 缺陷与稳定性

按 24 小时 issue 集合加上带 bug 标签的 PR 排序。快照中除此之外没有崩溃/回归报告。

| Sev | Item | Status | Fix PR? |
|---|---|---|---|
| **S1 / P1** | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode 系列从不发送 `x-opencode-session`；弄坏 Go 模型；存在账号被标记风险 | 开放，`in-progress` | 快照中未列出。视为本窗口内唯一阻塞工作流的缺陷。 |
| **High** | [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — `git_operations` 未绑定到已授权 roots（Fixes #10334） | 开放 PR，`needs-author-action`，体量 XL | 是 — 即此 PR |
| **High** | [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — 损坏 / 截断的图像能通过头部嗅探，稍后在提供商处失败 | 开放 PR，`needs-author-action` | 是 — 即此 PR |
| **Medium–high** | [#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838) — 纯文本路径把媒体标记改写为 `[media attachment]`，而频道契约仍告诉模型发出 `[IMAGE:...]` | 开放 PR，体量 S，更新于 2026-09-13 | 是 — 即此 PR |
| **High, blocked** | [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) — 插件适配器重新打开 `wasm_path`，而不是使用已准入字节 | 开放，`status:blocked`，`do-not-merge` | 是 — 即此 PR，尚不可合并 |
| **High, blocked** | [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — Hailo-Ollama 原生提供商 | 开放，`status:blocked`，`do-not-merge` | 功能项，并非用户报告的崩溃 |

没有新版本意味着以上内容都尚未进入带标签的二进制。使用 OpenCode Go 的 v0.8.5 运维者是 #10603 的暴露人群。

---

## 6. 功能请求与路线图信号

信号来自开放的 enhancement PR（并非已发布的 0.8.6/0.9 路线图）：

**若评审解堵，较可能进入下一刀：**
- 统一的 shell / 工具权限策略 — [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610)（明确“已接受”的 RFC #7155 Phase 0+1）
- 智能体生命周期的共享实时配置权威 — [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)
- 每个提供商 profile 多模型 — [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)
- 上下文压缩作为所选模型窗口的比例 — [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)
- ACP 转录分页 — [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596)
- 插件 install/list 出站授权仪式 + 加载校验 — [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584), [#10752](https://github.com/zeroclaw-labs/zeroclaw/pull/10752)
- 持久化会话 prompt 附件 — [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)
- OIDC `oidc.<alias>` 令牌验证 — [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)
- ZeroRelay 浏览器注册前门（phase 1） — [#10525](https://github.com/zeroclaw-labs/zeroclaw/pull/10525)
- 入站认证主体 ADR — [#10831](https://github.com/zeroclaw-labs/zeroclaw/pull/10831)（仅文档，低风险）

**已提出但结构上被阻塞 / 叠放：**
- 原生 Hailo-Ollama — [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)
- 宿主中介插件 WebSocket + 命名 TLS profiles — [#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142)
- Skills 声明式自动激活 — [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)

预测：下一个标签更可能是一次 **安全 + 运行时协调** 切割，而不是功能秀。Hailo、WebSocket 插件和技能激活看起来需要先把插件/安全底座合入。

---

## 7. 用户反馈摘要

该快照以维护者/贡献者为主；过去 24 小时几乎没有终端用户 issue 量（2 个 issue，其中一个是发版跟踪器）。能看见的痛点：

- **付费中继兼容很脆。** OpenCode Go 现在是会话头协议，而不再是普通的 OpenAI 兼容 URL。把兼容提供商指向 `opencode.ai` 的用户可能丢掉模型，或看起来像行为异常的客户端（#10603）。
- **工作区 / git / 插件信任仍在边缘路径泄漏。** git 的 allowed-roots、精确 WASM 准入、以及频道插件出站，不断以 XL 安全 PR 的形式被重新发现。打开了插件或 git 工具的运维者最能感受到这一点。
- **长会话与多模态轮次在运维上很贵。** 绑定固定 32k 预算的压缩、未分页的 ACP 转录、以及媒体标记不匹配，都属于“智能体能工作，直到上下文或图像路径变得怪异”。
- **硬件 / 边缘提供商被需要，但被闸住。** Hailo-Ollama 支持以大型 PR 形式存在，并被明确阻止合并。
- **满意度信号（间接）：** v0.8.5 由大批贡献者交付（73 人 / 454 次提交），同一批人仍在推下一刀。不满信号：许多 PR 在重新堆叠后停在 `needs-author-action`，通常意味着评审意见的速度超过了作者时间。

PR 组合所暗示的用例：自托管多频道助手、IDE/ACP 嵌入、WASM 第三方频道、OIDC 门控网关，以及端侧 / 加速器推理（Ollama、Hailo）。

---

## 8. 积压观察

已开放很久、高风险、且在 2026-09-13 仍需要被 bump 的条目 — 这些需要维护者排程，而不是更多设计：

| Age | Item | Why it is stuck |
|---|---|---|
| Since 2026-07-08 | [#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863) 宿主中介插件 WebSocket | 叠放（`Depends on #8923`），`needs-author-action`，XL，secrets/WASM |
| Since 2026-07-11 | [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) skills 自动激活 | 在 #9563 之后重新堆叠；仍为 `needs-author-action` |
| Since 2026-07-17 | [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) Hailo-Ollama | `status:blocked`，`do-not-merge` |
| Since 2026-07-18 | [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) 准入精确 WASM 字节 | `status:blocked`，`do-not-merge`，`needs-author-action` |
| Since 2026-07-18 | [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142) 命名 TLS profiles | 叠放在未合并的 #9137 上 |
| Since 2026-07-27 | [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 0.8.5 跟踪器 | 版本已于 2026-09-05 发布；跟踪器应关闭或改指向 |
| Since 2026-07-29 | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) 上下文压缩比例 | XL，`needs-author-action` |
| Since 2026-07-31 | [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) 插件出站授权仪式 | XL 安全项，进展仅限重新堆叠 |
| Since 2026-08-07 | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) | 均为 `needs-author-action` |
| Since 2026-08-25 / 08-27 | [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) | XL + `needs-author-action` |
| Fresh but high leverage | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | 唯一 P1 面向用户缺陷；不应排在 7 月插件栈后面等 |

**维护者关注顺序：** 关闭或改指向 #9459 → 合入或明确推迟 #10603 → 为插件/安全底座选定合入顺序（#9134 / #9584 / #10750 / #10610），好让 7 月那一栈停止原地变基。

---

**健康一句话：** 受欢迎、人力充足的 Rust 智能体运行时；v0.8.5 已发布；24 小时脉搏是一大串未合并的安全/运行时队列，外加一起真实的提供商兼容事件。接下来几天更应关注合入速率，而非 star 数。

</details>