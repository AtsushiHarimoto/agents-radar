# OpenClaw Ecosystem Digest 2026-09-14

> Issues: 97 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-13 22:07 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

I'll pull the official repo, release notes, and a bit more context so the digest is accurate rather than just restating the dump.Release notes on GitHub look truncated in the dump; I'll fetch the official pages next.# OpenClaw Project Digest — 2026-09-14

**Repo:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  
**What it is:** Self-hosted personal/team AI assistant. A local Gateway talks to chat apps (Telegram, Discord, Slack, iMessage, WhatsApp, Teams, Signal, and 20+ more) and native macOS / iOS / Android / Windows / Linux clients. State and credentials stay on the operator’s machine. Stewarded by the OpenClaw Foundation. ~390k stars.

**Window covered:** activity updated in the last ~24 hours (issues/PRs through 2026-09-13) plus the three latest published tags.

---

## 1. This Week's Overview

OpenClaw is operating at extreme throughput: **97 issues** and **500 PRs** touched in a single day, with **263 PRs merged or closed** and **237 still open**. That is not a quiet maintenance week — it is a firehose of contributor fixes, maintainer performance work, and post-release incident reports. The product theme of mid-September is **safer managed updates** (isolated candidate rehearsal, Doctor/migration recovery) colliding with **field failures on the 2026.9.2 → 2026.9.3/9.4 path**, especially npm global installs, Windows Scheduled Task handoff, and live v1 handoff leases.

Core product work continues in parallel: subagent completion routing, memory search behavior, Anthropic prompt-cache layout, MCP OAuth safety, Control UI polish, and Windows/macOS daemon reliability. Health is mixed but not stalled — the project ships signed multi-platform artifacts at high cadence and has an explicit coordination issue for upgrade reliability ([#145252](https://github.com/openclaw/openclaw/issues/145252)), but operators on 9.3/9.4 are still hitting P0 update and restart outages. Community pressure is concentrated on **message loss, silent subagent failure, credential leftovers, and “Doctor --fix is too eager.”**

---

## 2. Releases

Three tags landed in this window.

### v2026.9.4 — current stable (2026-09-11)

[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4) · [Docs notes](https://docs.openclaw.ai/releases/2026.9.4)

- Scale called out on the tag: **20 direct commits, 1,558 PRs, 294 contributors**. Signed source, npm core + 90 plugins + companion packages, Docker, macOS DMG/ZIP, Linux AppImage/Debian.
- Product highlights: ClawHub-integrated skill/plugin search; Skill Workshop can turn past chats into reusable skills; **GPT Image 2.5**; tighter cloud-session control; interactive terminal questions (including masked secrets); messaging/memory/update fixes.
- Notable removals / behavior changes:
  - Bundled **`video-frames` skill retired** (use ffmpeg or a separate skill; no auto-conversion).
  - New xAI setups default to **Grok 4.6**; retired “Auto” model choice needs `openclaw doctor --fix` or a manual pick.
  - Custom provider endpoints need **explicit model lists**.
  - IPv4-mapped network rules now cover the full range (can trust more addresses than operators expect).
- Migration: run `openclaw doctor --fix` after upgrade; Mac+Bun memory search wants system SQLite (`brew install sqlite` / `OPENCLAW_SQLITE_LIBRARY`); incompatible embedding models need `openclaw memory index --force`. Crabbox **0.55.0+** is required before cloud-worker inspect/stop on this line.

### v2026.9.3 — previous current (2026-09-08)

[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3) · [Docs notes](https://docs.openclaw.ai/releases/2026.9.3)

This is the release that defined the week’s reliability story.

- **Safer updates:** rehearse core/plugin changes in isolated candidate state; support eligible 9.2 migrations; recover abandoned update records without killing a healthy matching Gateway ([#136997](https://github.com/openclaw/openclaw/issues/136997) family; PRs cited in notes include #138839, #141109, #141175).
- Other highlights: warm prompt caches / less cold-session work; persistent agent-owned Skill Workshop; live/native browser tabs; provider-account management in Models settings; revocable public conversation links; searchable meeting library; optional Team Reports.
- **Breaking — Node runtime:** Node **24.16.0+** on 24.x or **26.1.0+** (26 recommended). Node 22, 25, and older 24/26 builds dropped because of SQLite text truncation. Plugin SDK execution-policy, approval, search/directory callback, and Workshop ownership contracts also changed. Doctor migrates proven legacy Workshop skills.

### v2026.6.35 — final June 2026 Extended Stable / LTS (2026-09-10)

[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35)

- LTS-line hardening: bound untrusted provider/channel bodies, reject oversized inputs before expensive work, preserve recovery on transport failure, cap responses against memory exhaustion, refresh Plugin SDK baseline.
- This is the conservative track for operators who should not be on 9.x while update/Doctor regressions settle.

---

## 3. Project Progress

The last 24 hours’ PR set is mostly **reliability and correctness**, not net-new surface. Maintainers (`steipete`, `roboclaw-bot`, `vincentkoc`) and a large contributor pool are landing:

**Update / Doctor / daemon**

- Isolated-candidate updates and Doctor recovery are the official 9.3/9.4 theme, but field reports show candidate-Doctor still refuses live v1 handoff leases ([#145192](https://github.com/openclaw/openclaw/issues/145192)) and global-install / finalize:doctor failures ([#147160](https://github.com/openclaw/openclaw/issues/147160), [#146879](https://github.com/openclaw/openclaw/issues/146879), [#147369](https://github.com/openclaw/openclaw/issues/147369), [#147351](https://github.com/openclaw/openclaw/issues/147351)).
- Windows restart path is under active repair: redirected `gateway.cmd` stdout ([#137374](https://github.com/openclaw/openclaw/pull/137374) for [#137362](https://github.com/openclaw/openclaw/issues/137362)); Scheduled Task `IgnoreNew` false-success ([#147437](https://github.com/openclaw/openclaw/pull/147437) for [#138833](https://github.com/openclaw/openclaw/issues/138833)); Node-prefix mismatch after nvm upgrades ([#145335](https://github.com/openclaw/openclaw/pull/145335)).
- Doctor: preserve MCP OAuth during read-only probes ([#147454](https://github.com/openclaw/openclaw/pull/147454) → [#147449](https://github.com/openclaw/openclaw/issues/147449)); preserve escaped env refs through config repair ([#147453](https://github.com/openclaw/openclaw/pull/147453)); skip wasted work on huge transcripts ([#147464](https://github.com/openclaw/openclaw/pull/147464)).

**Agents / subagents / sessions**

- System-expert deadlock at `maxConcurrent=1` has a ready fix PR ([#147468](https://github.com/openclaw/openclaw/pull/147468) → [#147264](https://github.com/openclaw/openclaw/issues/147264)).
- Swarm collector `sessions_yield` stranding `agents_wait` ([#146716](https://github.com/openclaw/openclaw/pull/146716)).
- Private parent completion handoffs ([#147206](https://github.com/openclaw/openclaw/pull/147206)).
- Completion media on the direct-text announce fallback ([#142852](https://github.com/openclaw/openclaw/pull/142852)).
- Child sessions blocked from inspecting automation runs ([#147008](https://github.com/openclaw/openclaw/pull/147008)).

**Performance (maintainer campaign)**

[#145679](https://github.com/openclaw/openclaw/issues/145679) reopened an end-to-end load/startup baseline. Landed or queued: less Git work on session-PR refresh ([#147443](https://github.com/openclaw/openclaw/pull/147443)), skip plugin state probes for artifact dirs ([#147467](https://github.com/openclaw/openclaw/pull/147467)), keep Gateway responsive while loading history ([#147363](https://github.com/openclaw/openclaw/pull/147363)), overlap workspace inspection with cancellation ([#147470](https://github.com/openclaw/openclaw/pull/147470)), measure total Gateway CPU for fixed workloads ([#147430](https://github.com/openclaw/openclaw/issues/147430)).

**UI / clients**

- Subagent display names in web/macOS activity ([#147458](https://github.com/openclaw/openclaw/pull/147458)).
- Collapse task progress while reading history ([#147295](https://github.com/openclaw/openclaw/pull/147295)).
- Custom SVG session icons ([#147442](https://github.com/openclaw/openclaw/pull/147442)).
- Clear leftover composer drafts after session create ([#147413](https://github.com/openclaw/openclaw/pull/147413)).
- Images closer to prompt bubbles ([#147448](https://github.com/openclaw/openclaw/pull/147448)).

**Closed in-window examples:** Windows “stale process” gateway kill after 181s ([#140162](https://github.com/openclaw/openclaw/issues/140162)), `memory_search` advertising a disabled sessions corpus ([#147258](https://github.com/openclaw/openclaw/issues/147258)), several auto-filed update-failure reports.

---

## 4. Community Hot Topics

Ranked by comment volume and operational blast radius.

| Item | Signal | Underlying need |
|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) — text between tool calls leaks to Slack/iMessage/etc. | **40 comments**, open since Feb, P1, diamond, security+session-state | Operators need a hard split between *internal narration* and *user-visible channel text*. This is the longest-running UX/security complaint in the set. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — unreaped hook/tool child processes → zombies | **30 comments**, regression, P1 | Long-lived Gateway hosts degrade over days. Process lifecycle for hooks/tools is still not closed. |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) — subagent completion silently lost | **28 comments**, P1, data/message loss | Swarm/subagent users cannot trust “done.” No retry, no notify, no auto-restart on timeout. |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) — 9.3/9.4 update/upgrade/recovery tracking | Maintainer index, P0 | The release train itself is the incident. |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) — 9.2→9.4 candidate-Doctor refuses live v1 handoff lease | P0, UX release blocker | Managed update cannot complete on a healthy Mac install. |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows restart kills a booting/ready gateway | P0, now closed | Windows daemon supervision was unsafe under slow boot. |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) — context overflow / compaction death spiral | P1 | Multi-step tool dumps still blow the window; compaction cannot recover. |
| [#126315](https://github.com/openclaw/openclaw/issues/126315) — Apple native chats fail routing guard (`unowned`) | P1, diamond | iOS/macOS clients reconstruct session ownership from display IDs; Gateway says unowned. |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) — human-readable Telegram topic names | P2, open since Feb | Forum users still see raw session keys in the dropdown. |

**Need pattern:** users treat OpenClaw as a 24/7 messaging worker. They will tolerate missing features; they will not tolerate **silent loss** (replies, subagent results, pending deliveries) or **destructive auto-repair**.

---

## 5. Bugs & Stability

Ranked by severity. “Fix PR” means a linked or clearly corresponding PR in the provided set.

### P0 / release-blocker

1. **Managed update failure cluster (9.3 / 9.4)** — candidate-Doctor vs live handoff lease ([#145192](https://github.com/openclaw/openclaw/issues/145192)); finalize:doctor ([#147160](https://github.com/openclaw/openclaw/issues/147160)); not-git-install ([#146879](https://github.com/openclaw/openclaw/issues/146879), closed); global-install-failed on win32 and darwin ([#147369](https://github.com/openclaw/openclaw/issues/147369), [#147351](https://github.com/openclaw/openclaw/issues/147351)); update-executor-settlement-failed ([#147461](https://github.com/openclaw/openclaw/issues/147461), closed). Coordinated under [#145252](https://github.com/openclaw/openclaw/issues/145252). Related PRs: [#145335](https://github.com/openclaw/openclaw/pull/145335), [#147440](https://github.com/openclaw/openclaw/pull/147440), [#147453](https://github.com/openclaw/openclaw/pull/147453).
2. **Windows gateway restart** — kills ready/slow-booting process after 181s ([#140162](https://github.com/openclaw/openclaw/issues/140162), closed); Scheduled Task no-op restart ([#138833](https://github.com/openclaw/openclaw/issues/138833), PR [#147437](https://github.com/openclaw/openclaw/pull/147437)); redirected launcher “port still busy” ([#137362](https://github.com/openclaw/openclaw/issues/137362), PR [#137374](https://github.com/openclaw/openclaw/pull/137374)).
3. **macOS frontend hangs** — eight threads blocked in `AppleEventPermissionProbe` ([#146030](https://github.com/openclaw/openclaw/issues/146030)); Control UI hang in JavaScriptCore RegExp on WebSocket messages ([#143713](https://github.com/openclaw/openclaw/issues/143713)).
4. **Auth/security P0s** — logout leaves plaintext keys in `plugin-model-catalog` cache; `doctor --fix` resurrects them ([#142421](https://github.com/openclaw/openclaw/issues/142421)); Doctor read-only MCP probes consume rotating OAuth refresh tokens ([#147449](https://github.com/openclaw/openclaw/issues/147449), PR [#147454](https://github.com/openclaw/openclaw/pull/147454)); Matrix one-time keys can publish before private state is durable ([#147450](https://github.com/openclaw/openclaw/issues/147450)).
5. **Telegram replies lost after long 429 + restart** ([#141959](https://github.com/openclaw/openclaw/issues/141959)) — delivery not replayed on 9.1+; related to pending-delivery drain ([#144370](https://github.com/openclaw/openclaw/issues/144370)).

### P1 — message loss / deadlock / session integrity

- Inter-tool text leaked to channels ([#25592](https://github.com/openclaw/openclaw/issues/25592)).
- Subagent completion silent loss ([#44925](https://github.com/openclaw/openclaw/issues/44925)).
- Zombie hook/tool children ([#97616](https://github.com/openclaw/openclaw/issues/97616)).
- Context overflow death loop ([#113701](https://github.com/openclaw/openclaw/issues/113701), [#146724](https://github.com/openclaw/openclaw/issues/146724) on `openai/gpt-5.6-sol` at 20–26 messages).
- System-expert nested inference deadlock at `maxConcurrent=1` ([#147264](https://github.com/openclaw/openclaw/issues/147264), PR [#147468](https://github.com/openclaw/openclaw/pull/147468)).
- `computer` execution never released → permanent `COMPUTER_HOST_BUSY` ([#147420](https://github.com/openclaw/openclaw/issues/147420)).
- `sessions_send` A2A announce dropped after caller run ends ([#145865](https://github.com/openclaw/openclaw/issues/145865)).
- Exec-completion wake succeeds but WebChat/Companion reply dropped ([#147387](https://github.com/openclaw/openclaw/issues/147387)).
- Visible subagent exec completions fire extra heartbeats ([#147326](https://github.com/openclaw/openclaw/issues/147326)).
- Apple native unowned-session routing ([#126315](https://github.com/openclaw/openclaw/issues/126315)).
- Malformed JSON tool arguments still on 9.4 after two merged fixes ([#147040](https://github.com/openclaw/openclaw/issues/147040)).
- Silent auto-escalation to Sonnet + HIGH thinking on Signal (~$25 surprise) ([#147344](https://github.com/openclaw/openclaw/issues/147344)).

### P2 — sharp edges, still user-visible

- Anthropic transport burns 3/4 `cache_control` breakpoints on the OAuth system header ([#147168](https://github.com/openclaw/openclaw/issues/147168)).
- `doctor --fix` disables healthy skills on env-only readiness ([#147346](https://github.com/openclaw/openclaw/issues/147346)).
- Telegram progress drafts never created with `richMessages:true` ([#147260](https://github.com/openclaw/openclaw/issues/147260)).
- Restart recovery silently strips side-effecting tools and does not tell the model ([#145029](https://github.com/openclaw/openclaw/issues/145029)).
- `openclaw logs` still writes SQLite WAL/SHM after a “read-only” fix ([#147259](https://github.com/openclaw/openclaw/issues/147259)).
- Empty `allow: []` is allow-all with no validate warning ([#147342](https://github.com/openclaw/openclaw/issues/147342)).
- `secrets audit` reports `unresolved=0` while skipping exec refs ([#147341](https://github.com/openclaw/openclaw/issues/147341), PR [#147466](https://github.com/openclaw/openclaw/pull/147466)).
- Control UI multi-tab live stream freeze ([#147447](https://github.com/openclaw/openclaw/issues/147447)); pair-device modal overflow ([#147401](https://github.com/openclaw/openclaw/issues/147401)).
- Discord `message.read` rejects allowlisted 1:1 DMs ([#90499](https://github.com/openclaw/openclaw/issues/90499)).
- Web UI hides child-spawned subagent sessions ([#95295](https://github.com/openclaw/openclaw/issues/95295)).

---

## 6. Feature Requests & Roadmap Signals

Likely near-term (PRs already up or aligned with 9.4 themes):

- **Private parent completion handoffs** so child output is not published after `NO_REPLY` ([#147206](https://github.com/openclaw/openclaw/pull/147206)).
- **memory_search abstention** — `strictMinScore` / empty-when-below-threshold ([#147349](https://github.com/openclaw/openclaw/issues/147349)). Today the tool never returns empty.
- **Human-readable Telegram topic names** ([#7406](https://github.com/openclaw/openclaw/issues/7406)) — small, repeatedly requested, still open.
- **Multiple Microsoft Teams bot accounts per Gateway** ([#112811](https://github.com/openclaw/openclaw/pull/112811)) — large, compatibility + security-boundary flags, still needs proof.
- **Android owns Cloudflare Access browser admission** ([#147305](https://github.com/openclaw/openclaw/pull/147305)).
- **Custom SVG session icons** and history-aware task-progress collapse (PRs already in review).
- **Persist and retry pending channel deliveries across restart drain** ([#144370](https://github.com/openclaw/openclaw/issues/144370)) — this is the feature-shaped fix for the message-loss class.

Predict next tag (9.5 or a 9.4.x): **update-path repairs first**, then subagent completion delivery, Doctor non-destructiveness, and Windows/macOS daemon handoff. Net-new surface will stay secondary until [#145252](https://github.com/openclaw/openclaw/issues/145252) cools down.

---

## 7. User Feedback Summary

**Pain**

- “I clicked Update and my Gateway is dead or rolled back onto a half-migrated state.” Auto-filed update reports from darwin/x64, win32/x64, and linux/x64 all hit 9.3/9.4 in the same 24 hours.
- “The agent finished the work but I never saw it” — Telegram 429 + restart, WebChat exec completions, A2A announce after the caller run ended, subagent timeout with no notify.
- “Doctor fixed me into a worse place” — healthy skills disabled, plaintext keys resurrected, destructive Workshop/skill readiness heuristics.
- Cost surprise: Signal session silently jumped Haiku → Sonnet HIGH thinking ([#147344](https://github.com/openclaw/openclaw/issues/147344)).
- Compaction is not a safety net on long tool-heavy turns (GPT-5.6 Sol overflowing at ~20 messages).
- Security UX traps: empty allow-lists, unread secrets audits, Matrix key-upload race.

**Use cases visible in tickets**

- Always-on Telegram forum bots and Discord/Slack operator desks.
- Multi-agent swarms with collectors and `sessions_yield`.
- macOS/iOS native chat as the daily driver, Windows Scheduled Task as the server install.
- MCP + OAuth tool servers, Anthropic prompt caching as a cost control.
- Memory-core / Active Memory as the long-term brain — users notice when search lies about corpora or never abstains.

**Satisfaction**

Implied, not quoted: people keep filing high-quality reproductions and fix-shaped PRs on the same day. Volume this high only happens when the product is in daily production use. The LTS 2026.6.35 cut is a clear concession that not everyone should ride the 9.x train this week.

---

## 8. Backlog Watch

These are important, still open, and either old or blocked on maintainer / product / security review (`clawsweeper:needs-maintainer-review` / `needs-product-decision` / `needs-security-review`).

| Issue | Age / why it matters |
|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) tool-call narration leaking to channels | Open since **2026-02-24**, 40 comments, security + UX. Needs a product rule, not another local patch. |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) silent subagent loss | Open since **2026-03-13**. Core orchestration trust. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) zombie children | Open since **2026-06-29**. Hosts rot in production. |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) Telegram topic display names | Open since **2026-02-02**. Cheap UX, still waiting on product decision. |
| [#90499](https://github.com/openclaw/openclaw/issues/90499) Discord DM `message.read` allowlist | Open since **2026-06-05**. Owner cannot read their own DM history. |
| [#95295](https://github.com/openclaw/openclaw/issues/95295) Web UI hides child sessions | Open since **2026-06-20**. Swarm users cannot find their workers. |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) compaction vs huge tool output | Open since **2026-07-25**. Will keep generating 9.x clones like [#146724](https://github.com/openclaw/openclaw/issues/146724). |
| [#126315](https://github.com/openclaw/openclaw/issues/126315) Apple `unowned` routing | Needs product decision on session-ownership contract vs display IDs. |
| [#142421](https://github.com/openclaw/openclaw/issues/142421) logout + Doctor resurrecting API keys | Security review still tagged. |
| [#143937](https://github.com/openclaw/openclaw/pull/143937) redaction replay of persisted masks | XL PR, session-state + security-boundary, still `needs proof`. |
| [#112811](https://github.com/openclaw/openclaw/pull/112811) multi-account MS Teams | Open since July, XL, dirty-candidate triage. |

---

**Bottom line:** OpenClaw is a very large, very fast-moving agent runtime whose mid-September bottleneck is not features — it is **making 2026.9.3/9.4 upgrades and restarts as trustworthy as the Gateway they install**. Until that tracking issue is quiet, the rational operator split is: stay on **2026.6.35 LTS** for production hosts that cannot take an outage; use **2026.9.4** only if you can run Doctor manually and tolerate a rollback.

---

## Cross-Ecosystem Comparison

I'll verify a few headline repo stats so the comparison table stays grounded, then write the cross-project report from the digests.# Personal AI Assistant / Agent OS Comparison — 2026-09-14

Snapshot window: community activity through **2026-09-13**, plus the latest published tags. Counts below are **touched in ~24h** unless noted. Star/fork figures are current GitHub headlines.

---

## 1. Ecosystem Overview

The mid-September 2026 personal-agent market is no longer a “can it chat in Telegram?” contest. The five projects in this set are competing as **self-hosted agent operating systems**: a local gateway, multi-channel delivery, plugin/MCP extensibility, persistent memory, and multi-agent orchestration. Product surface is already rich; the shared constraint is **operational truth** — updates that finish, stops that stop, sessions that survive restart, subagents that report done, and secrets that stay dead after logout.

Two gravity wells dominate attention. **OpenClaw** (~390k stars) and **Hermes Agent** (~245k stars) absorb most community heat and production tickets. A second tier — **QwenPaw** (~35k), **ZeroClaw** (~33k), **IronClaw** (~13k) — is smaller but architecturally distinct: Qwen as a memory/Creator OS, the two Rust runtimes as security- and tenancy-first Agent OSes.

The industry pattern is consistent: ship a large feature wave (OpenClaw 9.3/9.4 managed updates, Hermes Pantheon + `state.db`, QwenPaw 2.2.1 routing/Creator, IronClaw 1.4.0, ZeroClaw 0.8.5), then spend the next week paying the reliability tax.

---

## 2. Activity Comparison

Health is a 1–10 composite of shipping cadence, merge throughput vs. review congestion, P0 blast radius, and whether operators can trust upgrade/restart. It is **not** a star ranking.

| Project | ~24h issues | ~24h PRs | Latest release | Community size | Health | Read |
|---|---:|---:|---|---|---:|---|
| **OpenClaw** | 97 touched | 500 touched (263 merged/closed, 237 open) | **v2026.9.4** (11 Sep) + LTS **2026.6.35** (10 Sep) | ~390k ★ / ~82k forks | **6.5** | Extreme velocity; P0 upgrade/restart cluster |
| **Hermes Agent** | 12 (7 open / 5 closed) | 50 (17 open / 33 closed) | **v0.21.2 / v2026.9.11** (11 Sep), after v0.21.1 (7 Sep) | ~245k ★ / ~51k forks | **7.5** | Best “fix the last release” cycle |
| **QwenPaw** | 28 (22 open / 6 closed) | 50 (31 open / 19 closed) | **v2.2.1** (11 Sep) + two betas | ~35k ★ / ~3.1k forks | **6.0** | Feature-dense ship; control-plane P0s |
| **IronClaw** | 5 (all open) | 27 (18 open / 9 closed) | **1.4.0** (27–28 Aug); no tag this window | ~13k ★ / ~1.5k forks | **7.0** | Quiet hardening; isolation still open |
| **ZeroClaw** | 2 open | 50 open, **0 merged** | **v0.8.5** (5 Sep); no tag this window | ~33k ★ / ~4.9k forks | **5.5** | Review-bound; one S1 provider-compat bug |

**How to read the table.** OpenClaw’s raw volume is an order of magnitude above peers and includes signed multi-platform artifacts plus an explicit LTS fork — that is industrial scale, not hobby noise. ZeroClaw’s 50 open / 0 merged day is the opposite signal: ideas are moving, binaries are not. Hermes is the only project whose latest tag is explicitly a **root-cause storage patch** rather than a feature rollup.

---

## 3. OpenClaw's Position

**Advantages vs peers**

- **Distribution and channel coverage.** Native clients on macOS / iOS / Android / Windows / Linux plus 20+ chat backends. Nobody else in this set matches that install matrix. Foundation stewardship (OpenClaw Foundation, signed releases) is also unique at this scale.
- **Contributor density.** v2026.9.4 cites 20 direct commits, **1,558 PRs, 294 contributors**. Hermes’s v0.21.2 rollup is also industrial (312 merged PRs / 140 contributors since 0.21.1), but OpenClaw’s daily firehose is unmatched.
- **Operator split is explicit.** Shipping **2026.6.35 LTS** in the same week as 9.4 is a mature concession: not every production host should ride the current train. Peers have “previous tag,” not a named conservative line.
- **Product surface already past “assistant.”** ClawHub skill search, Skill Workshop from past chats, GPT Image 2.5, cloud-session control, Doctor/migration rehearsal, prompt-cache work.

**Technical approach**

OpenClaw is a **TypeScript/Node Gateway** (Node 24.16+ / 26.1+ on 9.3+) with a large plugin SDK, SQLite-backed memory, MCP + OAuth, and managed isolated-candidate updates. That is the opposite of IronClaw/ZeroClaw’s Rust fail-closed runtime, and broader than Hermes’s Python-first “agent that grows with you” loop. The cost of the Node + plugin model showed up this week: SQLite text-truncation forced a runtime floor, global npm installs broke finalize:doctor, Windows Scheduled Tasks lied about restart success, and Doctor was *too eager* (healthy skills disabled, plaintext keys resurrected).

**Community size**

OpenClaw is the category default by stars and by ticket volume. That is both moat and liability: P0s get reproduced on darwin/x64, win32/x64, and linux/x64 in the same 24 hours. Long-running complaints (#25592 tool-narration leak since Feb, #44925 silent subagent loss since March, #97616 zombies since June) survive because the product is in 24/7 production use, not because the project is idle.

**Net position this week.** OpenClaw leads on reach and cadence. It does **not** currently lead on upgrade trust. Until [#145252](https://github.com/openclaw/openclaw/issues/145252) cools, the rational production recommendation in its own digest stands: LTS for hosts that cannot take an outage; 9.4 only with manual Doctor and rollback tolerance.

---

## 4. Shared Technical Focus Areas

These needs appear in **two or more** trackers. They are the real industry backlog.

**1. Upgrade / daemon / install truth**  
OpenClaw (9.3/9.4 candidate-Doctor vs live handoff lease, npm global finalize, Windows Scheduled Task). Hermes (`hermes update` exit 1 while LaunchAgent actually restarted; residual WAL after 0.21.2). QwenPaw (Desktop model card + session index evaporate after plugin redeploy).  
*Need:* idempotent update that reports the state the operator can see.

**2. Message and completion delivery**  
OpenClaw (Telegram 429 + restart drop, A2A announce after caller ends, subagent timeout with no notify, inter-tool text leaked to Slack/iMessage). Hermes (months-old gateway notice salvage finally landing; ANSI/raw stdout stripped from IM transcripts). QwenPaw (stop button cosmetic; next send HTTP 409).  
*Need:* persist-and-replay pending channel deliveries; hard split between internal narration and user-visible text.

**3. Multi-agent / subagent contract**  
OpenClaw (silent subagent loss, swarm `sessions_yield` stranding `agents_wait`, private parent completion handoffs). Hermes (Kanban worker vanish, `--triage` dead-end, workers writing `kanban.db` via raw sqlite). QwenPaw (`subagent_model` ignored; children inherit parent model). IronClaw (background subagents already in 1.4.0; hosted-MCP catalog still keyed by extension id).  
*Need:* typed lifecycle (spawn / refuse / complete / park) plus a cheap model for grunt work.

**4. MCP / protocol realism**  
OpenClaw (Doctor read-only probes consuming OAuth refresh tokens). QwenPaw (2.2.x broke Hub MCP that worked on 2.1; Java SDK `jsonRpcError` / HTTP 500 kills Driver build; A2A documented but unimplemented). IronClaw (multi-principal catalog overwrite #6778; SEP-414 caller attribution). ZeroClaw (plugin egress-grant ceremony, exact-byte WASM admission).  
*Need:* messy real-world servers as first-class; catalogs scoped to caller, not extension.

**5. Persistence isolation**  
Hermes (profile-pinned `state.db`, no second writers, FTS damage isolated from transcript store). OpenClaw (Mac+Bun wants system SQLite; embedding-model force-reindex). QwenPaw (sidebar index ≠ disk sessions). IronClaw (per-user sandboxes already shipped; CLI `skills list` still not the runtime inventory).  
*Need:* one profile cannot bind another profile’s DB; search degradation must not take down list/export.

**6. Cost and context control**  
OpenClaw (silent Haiku → Sonnet HIGH on Signal, ~$25 surprise; Anthropic cache_control burned on OAuth header; compaction death spiral ~20 tool-heavy messages). Hermes (unpriced models recorded as $0; ~72% spend under-count). QwenPaw (flagship burned on ReMe/dream/summarize; request for separate memory-write model). IronClaw (prompt-context limit as override; opt-in document pointer mode). ZeroClaw (compact by model-window ratio, still unmerged).  
*Need:* per-task model routing, honest billing UI, compaction that is not a death loop.

**7. Security boundaries that survive “repair”**  
OpenClaw (logout leftovers resurrected by `doctor --fix`; empty `allow: []` = allow-all; Matrix one-time key race). Hermes (terminal redaction skip on `config.yaml` / shell rc — closed same day). QwenPaw (kimi-code Write `_paths` sandbox bypass). ZeroClaw / IronClaw (git allowed-roots, WASM admission, hosted-MCP metadata leak).  
*Need:* Doctor/repair must be non-destructive; allow-lists fail closed; plugins cannot reopen disk or ambient sockets.

---

## 5. Differentiation Analysis

| | OpenClaw | Hermes | QwenPaw | IronClaw | ZeroClaw |
|---|---|---|---|---|---|
| **Primary identity** | Personal/team Gateway in every chat app | Self-improving personal agent | Agent OS + Creator / Hub | Privacy-first Rust Agent OS | Small, swap-anything Rust runtime |
| **Default user** | Always-on operator (Telegram forums, Slack desks, native Apple chat) | Household / team gateway + coding factory | Desktop Windows + Docker self-host + CN IM | Multi-tenant / hosted-MCP operators | Self-hosted + untrusted WASM plugins |
| **Stack** | Node/TS, plugin SDK, ClawHub | Python + TS Desktop, SQLite `state.db` | Python + Console + Creator | Rust + wasmtime + WebChat v2 | Rust workspace, ZeroRelay/Router |
| **Memory story** | Memory search + Active Memory; 9.4 embedding reindex | Cross-session learning loop, skills from experience | ReMe / Auto Fin / PowerContext | Persistent per-user sandboxes | Per-agent memory + session attachments (in queue) |
| **Multi-agent** | Swarms, collectors, Skill Workshop | Kanban implementer/reviewer + Bot Mode | Per-agent routing, ACP runners | Background subagents (shipped 1.4.0) | Named agents per daemon (0.8.0+) |
| **This week’s center of gravity** | Safer managed updates vs field P0s | `state.db` truth + Kanban lifecycle | Routing/Creator ship vs stop/session/RAM | Hosted-MCP tenancy + IME/Telegram | Security/plugin stack restack, 0 merges |
| **Conservative path** | Named LTS 2026.6.35 | Stay on 0.21.2; run `doctor` if WAL-damaged | Verify MCP + Desktop sessions after 2.2.1 | Remain on 1.4.0 | Remain on 0.8.5; avoid OpenCode Go until #10603 |

**Architecture split worth acting on.** JS/Python gateways (OpenClaw, Hermes, QwenPaw) iterate product surface fastest and absorb consumer install diversity. Rust runtimes (IronClaw, ZeroClaw) spend the week on isolation, WASM admission, and policy — fewer end-user tickets, slower visible shipping. Neither class has solved **delivery + upgrade honesty**.

---

## 6. Community Momentum & Maturity

**Tier A — category defaults (rapid iteration, production load)**  
**OpenClaw, Hermes.** Both close real bugs the same day they appear and rebase old community work. Both also generate P0s *because* they are daily infrastructure. OpenClaw is the louder, wider default; Hermes is the cleaner post-feature repair story this week (v0.21.2 actually names root causes: second writers, WAL generation, one bad row, cross-profile bind).

**Tier B — feature ship + reliability tax**  
**QwenPaw.** v2.2.1 is an agent-OS expansion (routing, PowerContext, Creator 1.2.0, one-click plugin update), followed immediately by RAM climb, event-loop-blocking file watch, cosmetic Stop, and Desktop session loss. Contributor response is healthy (same-day MCP/ACP/watch PRs). Maturity gap is control-plane ownership, not idea flow.

**Tier C — hardening / review-bound**  
**IronClaw.** Post-1.4.0 maintenance: Telegram command menu merged, MCP isolation and IME fixes in flight, Dependabot inflating PR count. Healthiest “runtime is stable enough that OfficeQA misses are blamed on the model” signal. Risk is leaving #6778-class tenancy open while dep bumps dominate the list.  
**ZeroClaw.** Opposite congestion: 50 restacked PRs, many XL / `risk:high` / `do-not-merge`, zero merges. Contributor continuity is real; merge authority is the bottleneck. v0.8.5 tracker still being poked after the tag shipped — process smell.

**Stabilizing vs iterating (one line each)**  
- OpenClaw: iterating the release train itself.  
- Hermes: stabilizing storage after Pantheon.  
- QwenPaw: iterating product; not yet stabilizing control plane.  
- IronClaw: stabilizing tenancy and composer.  
- ZeroClaw: iterating security design; not landing it.

---

## 7. Trend Signals

**1. The bottleneck moved from “agent capability” to “operator contract.”**  
Users tolerate missing features. They do not tolerate silent loss, cosmetic Stop, or Doctor that makes the machine worse. Any new agent runtime should treat pending-delivery journals, non-destructive repair, and honest status as P0 product, not chores.

**2. Managed update is now a product surface.**  
OpenClaw’s isolated-candidate rehearsal is the right design and still failing in the field (live v1 handoff leases, global npm, Windows tasks). Hermes’s “update failed but restarted” is the same bug class. Install/update is the first command after every tag; an exit-1 there multiplies support load more than a missing skill.

**3. Multi-agent is leaving demo-ware.**  
Kanban factories (Hermes), swarm collectors (OpenClaw), per-agent routing (QwenPaw), background subagents (IronClaw) are in production. The missing primitive is a **state machine with refusal reasons**, not another spawn API. Cheap secondary models for grep/memory/summarize are an economic requirement, not a nicety (#4901 on QwenPaw since June; OpenClaw’s $25 Signal surprise).

**4. MCP is the interop layer and the incident layer.**  
OAuth token burn on read-only probes, Java SDK envelopes, last-writer-wins catalogs, A2A documented-but-absent — protocol work is no longer optional polish. Design for hostile/messy servers and multi-principal catalogs from day one.

**5. Memory backends are splitting from chat logs.**  
Hermes isolated FTS damage from the transcript store. QwenPaw pluginized ReMe/PowerContext/ADBPG and immediately hit path-scoped working-memory bugs (dev tree vs runtime tree). OpenClaw operators notice when `memory_search` advertises a disabled corpus or never abstains. Treat search, session index, and working directory as three different consistency domains.

**6. Rust Agent OS vs JS Gateway is a real fork, not branding.**  
IronClaw/ZeroClaw spend weeks on WASM admission, git roots, and caller-keyed MCP. OpenClaw/Hermes/QwenPaw spend days on Desktop IME, Telegram markdown, and Doctor heuristics. Teams choosing a base should pick the failure mode they can staff: policy review queues, or consumer install diversity.

**7. LTS / conservative tracks will become table stakes.**  
OpenClaw already cut 2026.6.35 while 9.x burns. Expect peers to copy a “don’t ride this week’s train” line. For builders: keep an extended-stable branch the moment you have daemon + SQLite + plugin migration in one upgrade.

**Practical takeaway for agent developers**

- If you need **channel coverage and native clients today**, OpenClaw is still the default — pin **2026.6.35** for production hosts this week.  
- If you need **persistent learning + Desktop + a just-patched store**, Hermes **0.21.2** is the strongest current binary.  
- If you need **Qwen-ecosystem memory/Creator and can verify sessions after upgrade**, QwenPaw 2.2.1, with watch/MCP/stop on the short list.  
- If you need **multi-tenant MCP and a quieter runtime**, IronClaw 1.4.0; do not treat hosted catalogs as isolated until #8090/#8084 land.  
- If you need **fail-closed plugins in Rust**, watch ZeroClaw’s merge rate, not its star count; v0.8.5 plus OpenCode Go is the exposed combo until #10603 ships.

The projects that win the next quarter will not be the ones that add another model picker. They will be the ones whose **update, stop, deliver, and remember** verbs match the UI.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

I'll pull current Hermes Agent repo activity so the digest matches the 2026-09-14 snapshot.Fetching full release notes and the most active issue/PR threads next.# Hermes Agent Project Digest — 2026-09-14

**Repo:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) · MIT · ~245k stars / ~51k forks  
**Window:** last ~24h issues/PRs as supplied, plus official tags **v2026.9.7** and **v2026.9.11**  
**Snapshot activity:** 12 issues touched (7 still open, 5 closed) · 50 PRs touched (17 open, 33 merged/closed) · 2 new releases

---

## 1. This Week's Overview

Hermes Agent is in a high-velocity post-`v0.21.0` stabilization cycle. After the Pantheon feature wave (Bot Mode, peer DMs, live subagent steering), maintainers shipped two patch tags in four days: **v0.21.1** (consolidation / ~34% slimming) and **v0.21.2** (the `state.db` reliability campaign — six PRs, 44 related issues closed). The official `v0.21.2` notes alone claim **947 non-merge commits, 1,869 files, 312 merged PRs, and 140 contributors** since `v0.21.1`, which is industrial-scale throughput for a personal-agent codebase.

The last 24 hours look like the “aftershock” of that release: operators are still hitting SQLite WAL / profile-isolation edge cases, while the merge queue is dominated by **Kanban/cron lifecycle correctness**, **gateway notification hygiene** (including salvage of April–June PRs), **MCP session-state**, and **Desktop Bot Mode**. Health signal is mixed-but-strong: core storage bugs from 0.21.0 are being closed at the architectural level, but production users on multi-profile macOS LaunchAgent and long-lived gateways are still filing P2/P3 residuals. Community contribution style is distinctive — many PRs are “salvage” of older contributor work rebased onto current `main` by core authors such as `teknium1`.

---

## 2. Releases

### v0.21.2 / `v2026.9.11` — “The state.db Patch Release” (11 Sep 2026)
**Tag:** [github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11)

**Why it exists.** `v0.21.0` rewrote session-store connection handling. On some installs that made `state.db` fragile: second writers cancelling POSIX locks, healthy WAL DBs reported corrupt, one bad row taking down `sessions list`.

**Fixes (root cause, not bandage):**
- No more second writers: hosted rooms moved to `shared-state.db`; dashboard opens read-only first; cron lifecycle guard uses the tracked connection registry; `doctor --fix` refuses an unsafe checkpoint. ([#108076](https://github.com/NousResearch/hermes-agent/pull/108076))
- Healthy WAL stores stop wedging (`DeletedWalGenerationError`, WSL2 transient I/O, stale “locked” banners). ([#108082](https://github.com/NousResearch/hermes-agent/pull/108082))
- FTS index damage is now `fts_index` (search degrades; transcript store survives). ([#108130](https://github.com/NousResearch/hermes-agent/pull/108130))
- One corrupt row no longer kills list/export/insights. ([#108086](https://github.com/NousResearch/hermes-agent/pull/108086))
- Sessions never bind/read another profile’s DB. ([#108074](https://github.com/NousResearch/hermes-agent/pull/108074))
- Opening `state.db` no longer takes the write lock when nothing needs writing (stall 4–20s → ~0.01s). ([#108067](https://github.com/NousResearch/hermes-agent/pull/108067))

**Also in the rollup:** password-blind credential fill (1Password / Bitwarden / local vault — agent never sees the secret); SHA-pinned plugin catalog + unified Desktop Plugins page; end-to-end multi-profile isolation (allow-lists, MCP stdio secrets, `MEDIA:` attachments, webhook routing); Desktop backend spawn-storm removed.

**Breaking changes:** none declared.

**Migration / recovery**
- Existing: `hermes update`
- Fresh: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`
- If `state.db` was already damaged by 0.21.0/0.21.1: run `hermes doctor` first (now distinguishes structural vs index damage), then `hermes sessions recover --inspect-only` (profile-pinned) if a rebuild is not enough.

### v0.21.1 / `v2026.9.7` — consolidation rollup (7 Sep 2026)
**Tag:** [github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7)

Patch rollup of `main` since `v0.21.0` for tagged/downstream consumers. Community notes describe: ~34% codebase slimming with claimed zero behavior change; `delegate_task` streams child results and can hand background processes back to the parent; MCP device-code auth on headless hosts; per-model OpenRouter pins + 20-minute picker refresh; native ripgrep `search_files` (up to ~6×); compaction keeps prefix cache across rebuilds; cron continuity across silent ticks with missed-fire lateness surfaced. No explicit breaking changes.

---

## 3. Project Progress

Closed/merged work in this 24h window clusters into four tracks.

**Gateway message delivery (multi-month salvage, now landing).**  
[#110332](https://github.com/NousResearch/hermes-agent/pull/110332) (closed) makes background-process chat notices human-facing in every mode — salvage of [#54266](https://github.com/NousResearch/hermes-agent/pull/54266). Related closed lineage: [#49953](https://github.com/NousResearch/hermes-agent/pull/49953), [#37952](https://github.com/NousResearch/hermes-agent/pull/37952), [#13122](https://github.com/NousResearch/hermes-agent/pull/13122) (ANSI strip / omit raw stdout from Telegram/Discord/Slack/Desktop transcripts). This is a real product-quality win for anyone running Hermes as a messaging bot.

**Kanban / cron worker lifecycle.** A burst of open-but-focused PRs is turning “worker vanished / card stuck” into diagnosable states:
- park clean `rc=0` exits without a terminal kanban call ([#110322](https://github.com/NousResearch/hermes-agent/pull/110322))
- report *why* `kanban complete` refused ([#110330](https://github.com/NousResearch/hermes-agent/pull/110330), [#110323](https://github.com/NousResearch/hermes-agent/pull/110323))
- resume implementer after `changes_requested` ([#110342](https://github.com/NousResearch/hermes-agent/pull/110342))
- log dispatch refusals at spawn-budget cap ([#110340](https://github.com/NousResearch/hermes-agent/pull/110340))
- close orphaned `task_runs` when `current_run_id` is NULL ([#110328](https://github.com/NousResearch/hermes-agent/pull/110328))

**Agent / MCP / sessions.** Closed: reasoning-only final answer walking the empty-response ladder ([#109205](https://github.com/NousResearch/hermes-agent/issues/109205)); MCP reload only refreshing the requesting session ([#109382](https://github.com/NousResearch/hermes-agent/issues/109382)); cron gateway-liveness false negative ([#109360](https://github.com/NousResearch/hermes-agent/issues/109360)); `/status` showing a weeks-old model ([#109282](https://github.com/NousResearch/hermes-agent/issues/109282)). Open follow-through: stable message IDs across compaction ([#110329](https://github.com/NousResearch/hermes-agent/pull/110329)).

**Desktop / TTS / ops.** Closed lint autofix ([#110324](https://github.com/NousResearch/hermes-agent/pull/110324)). Open: Bot Screen streamed Xfce takeover ([#108914](https://github.com/NousResearch/hermes-agent/pull/108914)), Bot Chat clear ([#110338](https://github.com/NousResearch/hermes-agent/pull/110338)), operator-notice routing ([#110337](https://github.com/NousResearch/hermes-agent/pull/110337)), TTS double-replay ([#110326](https://github.com/NousResearch/hermes-agent/pull/110326)) and command-provider sentence streaming ([#110327](https://github.com/NousResearch/hermes-agent/pull/110327)), Signal SSE close-on-reconnect ([#110331](https://github.com/NousResearch/hermes-agent/pull/110331)).

---

## 4. Community Hot Topics

Comment counts on the supplied PR list are missing (`undefined`); ranking below uses **issue comment volume + thematic recurrence**.

| Item | Status | Why it is hot | Underlying need |
|---|---|---|---|
| [#109360](https://github.com/NousResearch/hermes-agent/issues/109360) cron gateway-liveness / `HERMES_HOME` (4 comments) | Closed | False “gateway not running” while jobs *are* firing | Scheduled automation must trust its own health check; home-path resolution is a recurring multi-profile footgun |
| [#109205](https://github.com/NousResearch/hermes-agent/issues/109205) reasoning-only clean stop (3 comments) | Closed | Final-response path ignored `extract_content_or_reasoning()` | Reasoning-first models (and “empty content, answer in reasoning”) are now first-class, not a compressor-only trick |
| [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) unpriced models recorded as $0 (2 comments) | **Open** | Reporter measured ~72% spend under-count (¥8.20 vs ≈¥29) | Cost observability + user price overrides for aliases / transit IDs |
| [#109362](https://github.com/NousResearch/hermes-agent/issues/109362) `redact_terminal_output` secret leak (2 comments) | Closed | `grep`/`cat` of `config.yaml` / shell rc skipped assignment redaction | Terminal tool + config-as-secret is a security-boundary theme (`sweeper:risk-security-boundary`) |
| [#109282](https://github.com/NousResearch/hermes-agent/issues/109282) `/status` stale model (2 comments) | Closed | Long gateway sessions advertise a weeks-old model as *current* | Operators need a trustworthy “what is serving *now*” signal on multi-week processes |
| [#108914](https://github.com/NousResearch/hermes-agent/pull/108914) Bot Screen (teknium1, related #92524) | **Open** | Maintainer-authored; streams a per-bot Xfce desktop into Hermes Desktop for 2FA / login takeover | Headless Linux bots cannot finish human-gated auth without a “take over / hand back” loop |

**Need pattern:** users are no longer asking “can it run.” They are asking for **honest status, honest spend, secret-safe terminals, and human-in-the-loop control of unattended bots**. Kanban issues (#110080, #110339) show a second constituency: people running Hermes as a **multi-agent software factory**, and fighting the board state machine when workers improvise (`sqlite3` writes, `--triage` dead-ends).

---

## 5. Bugs & Stability

Ranked by likely blast radius. “Fix PR exists” is noted only when the supplied data or issue thread indicates one.

| Sev | Issue | Notes | Fix |
|---|---|---|---|
| **P1-adjacent / data integrity** | [#110335](https://github.com/NousResearch/hermes-agent/issues/110335) SQLite WAL generation conflict | Open *after* v0.21.2. Operator wants recovery + a one-command check **without modifying Hermes source**. Implies residual WAL-generation races on some profiles (`fichub`). | No product PR in the 24h list; recovery-oriented issue |
| **P2 / install-update** | [#110333](https://github.com/NousResearch/hermes-agent/issues/110333) `hermes update` exits 1, leaves `fleet_restart_pending` | macOS root-home LaunchAgent + sticky *named* `active_profile`. Restart actually succeeds; the CLI reports failure. High confusion for “just update me” users. | Open, no paired PR listed |
| **P2 / money** | [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) unpriced models = $0 | Silent under-count; no user override; alias/transit IDs missing from built-in table. | Open |
| **P2 / request correctness** | [#110341](https://github.com/NousResearch/hermes-agent/issues/110341) `tool_search`-deferred tools re-injected | `inject_memory_provider_tools()` runs *after* deferral and ships the full tool list anyway — burns context and defeats the bridge. | Open |
| **P2 / MCP live sessions** | [#109382](https://github.com/NousResearch/hermes-agent/issues/109382) `reload.mcp` refreshes one session | Process-global pool vs per-agent snapshots. | Closed (same window) |
| **P2 / UX-correctness** | [#109205](https://github.com/NousResearch/hermes-agent/issues/109205) reasoning-only answer walks empty-response ladder | Extra latency / empty-looking turns. | Closed |
| **P2 / CLI-desktop** | [#110333](https://github.com/NousResearch/hermes-agent/issues/110333) tagged `sweeper:risk-compatibility` | See above. | Open |
| **P3 / security (closed)** | [#109362](https://github.com/NousResearch/hermes-agent/issues/109362) redaction skip on `config.yaml` / rc | Secrets in command output. Closed quickly — good reflex. | Closed |
| **P3 / cron false alarm** | [#109360](https://github.com/NousResearch/hermes-agent/issues/109360) | Noise, not a missed job. | Closed |
| **P3 / status lie** | [#109282](https://github.com/NousResearch/hermes-agent/issues/109282) stale current model | Closed; labeled duplicate of a sessions/usage-cost cluster. | Closed |
| **P3 / Kanban integrity** | [#110080](https://github.com/NousResearch/hermes-agent/issues/110080) worker wrote `kanban.db` via raw `sqlite3` | Policy gap: “no profile may write board state directly.” | Open; related PRs #110322/#110330/#110342 |
| **P3 / Kanban dead-end** | [#110339](https://github.com/NousResearch/hermes-agent/issues/110339) `--triage` has no exit path | `promote` refuses triage; `claim` wants `ready`; dispatcher skips triage. | Open |
| **P3 / Desktop UX** | [#110336](https://github.com/NousResearch/hermes-agent/issues/110336) Mermaid viewer 100% zoom off-canvas | Packaged Desktop `v0.21.2` on Linux/X11; large ERDs look “unrendered.” | Open |

No crash-loop or RCE reports appear in this 24h set. The residual risk is **persistence + multi-profile + update orchestration**, not model inference.

---

## 6. Feature Requests & Roadmap Signals

Likely next-tag candidates (already in flight, or repeatedly implied by Pantheon leftovers):

1. **Bot Screen** — [PR #108914](https://github.com/NousResearch/hermes-agent/pull/108914) (teknium1). Per-bot Xfce desktop streamed into Hermes Desktop; take over for 2FA, hand back. Related #92524. This is the strongest “will be in a named release” signal because it is maintainer-owned and product-shaped.
2. **Operator notice routing** — [PR #110337](https://github.com/NousResearch/hermes-agent/pull/110337): `gateway.notices.{session_reset,provider_error,fallback_switch}` → `chat` / `admin_dm` / `log`.
3. **Canonical Bot Chat clear** — [PR #110338](https://github.com/NousResearch/hermes-agent/pull/110338).
4. **Hook-driven approval escalation** — [PR #110325](https://github.com/NousResearch/hermes-agent/pull/110325): `pre_tool_call` shell hooks may emit `action: approve` into the existing human-approval gate (fail-closed, block precedence kept). Duplicate-tagged, so it may land as a small hook extension rather than a headline.
5. **TTS streaming for `type: command` providers** (local engines such as sanoTTS) — [PR #110327](https://github.com/NousResearch/hermes-agent/pull/110327) + double-replay fix [#110326](https://github.com/NousResearch/hermes-agent/pull/110326).
6. **Kanban as a real workflow product** — triage exit path, refusal reasons, spawn-budget logs, clean-exit parking. If these merge, expect a “Kanban reliability” subsection in `v0.21.3` / `v0.22.0` notes.
7. **User-supplied model prices** — [#108775](https://github.com/NousResearch/hermes-agent/issues/108775). Not started in this window; high user value, modest scope.

Prediction: the next *tagged* drop is more likely another **patch** (Kanban + update/LaunchAgent + pricing + Mermaid) than a Pantheon-scale minor, unless Bot Screen is declared done.

---

## 7. User Feedback Summary

**Pain**
- Session store still feels dangerous to power users who lived through 0.21.0, even after the patch (#110335).
- Update/restart on macOS multi-profile is not idempotent from the user’s point of view (#110333).
- Cost dashboard cannot be trusted for non-catalog or aliased model IDs (#108775).
- Kanban “looks like Jira but traps cards” (`--triage` black hole; workers punching SQLite when `kanban_complete` is refused).
- Desktop diagram preview is unusable on large graphs (#110336).
- Long-lived gateways lie about the active model and, until today, about MCP tool freshness.

**Use cases in the wild (inferred from reports, not marketing)**
- 24/7 messaging gateway (Telegram/Discord/Slack/Signal) with background process watchers.
- Multi-profile household / team gateway on macOS LaunchAgent and Linux headless.
- Autonomous coding factory: Kanban board + implementer/reviewer workers + spawn budgets.
- Headless bot farms that still need a human to pass 2FA (Bot Screen).
- Local TTS conversation loop on Desktop.

**Satisfaction**
- Security and notification issues are being closed the same day they appear (#109362, gateway ANSI/raw-output cluster).
- Maintainers are rebasing months-old community PRs instead of discarding them — that is unusual and generally well received in salvage commit messages.
- `hermes doctor` / `sessions recover` being called out in release notes is an explicit concession that 0.21.0 hurt some installs, which is healthier than silence.

**Dissatisfaction**
- Silent `$0` pricing and “update failed but actually restarted” are trust bugs: the product did the work, then reported the wrong story.

---

## 8. Backlog Watch

Items that need a maintainer decision or will rot if left in “found live yesterday” state:

1. **[#108775](https://github.com/NousResearch/hermes-agent/issues/108775)** — unpriced models / no override. Open P2, usage-cost area, no fix PR in this window. Every day of under-count trains users to ignore billing UI.
2. **[#108914](https://github.com/NousResearch/hermes-agent/pull/108914)** — Bot Screen. Large surface (CLI, tools, TUI, browser, auth, Desktop, dashboard) and tagged `sweeper:risk-security-boundary`. Needs review focus or it will stall as a mega-PR.
3. **[#110335](https://github.com/NousResearch/hermes-agent/issues/110335)** — WAL generation recovery *without* a source change. If v0.21.2 did not cover this profile, either document the one-command ritual in `doctor` or accept a follow-up storage PR.
4. **[#110333](https://github.com/NousResearch/hermes-agent/issues/110333)** — `hermes update` + named profile + root-home LaunchAgent. Install/update is the first thing new and old users run after a patch tag; an exit-1 here multiplies support load.
5. **[#110339](https://github.com/NousResearch/hermes-agent/issues/110339)** + **[#110080](https://github.com/NousResearch/hermes-agent/issues/110080)** — Kanban state-machine holes. Workers have already discovered they can `sqlite3` around the gates; that will become folklore unless the CLI grows an official triage→ready path and louder refusal reasons (PRs #110330/#110323 are the right direction).
6. **[#110341](https://github.com/NousResearch/hermes-agent/issues/110341)** — deferred tools re-appended. Quietly expensive; will show up as “why is my tool list huge again.”
7. **Stale-but-now-closed salvage stack** ([#13122](https://github.com/NousResearch/hermes-agent/pull/13122) opened 20 Apr, closed 13 Sep) is a reminder that **message-delivery P3s can sit for five months**. Similar `sweeper:risk-message-delivery` / Signal SSE [#110331](https://github.com/NousResearch/hermes-agent/pull/110331) should not wait that long.

---

**Health one-liner:** shipping cadence and contributor density are excellent; the project’s current job is to make **storage, updates, cost, and Kanban** tell the truth after the Pantheon feature surge. `v0.21.2` was the right patch. The 14 Sep snapshot is the cleanup crew.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

I'll pull the latest IronClaw GitHub activity so the digest matches the repo rather than only the provided snapshot.I'll open the repo's issues, PRs, and release pages next to fill in activity and comment counts.GitHub HTML is thin here; I'll query the public API for issue/PR details and comment counts.IronClaw ([nearai/ironclaw](https://github.com/nearai/ironclaw)) remains a high-visibility Rust Agent OS: **12,619 stars**, **1,480 forks**, last push **2026-09-13**. Latest stable is still **1.4.0** (2026-08-27). The window around **2026-09-14** is busy on PRs, quiet on releases, and concentrated on hosted-MCP tenancy, WebChat IME, channels, and dependency churn.

## 1. This Week's Overview

Activity is **infra-heavy rather than release-heavy**. In the latest 24-hour slice the project logged **5 updated issues** (all still open) and **27 updated PRs** (**18 open**, **9 merged/closed**), with **no new release**. That is healthy maintenance velocity after 1.4.0, not a feature freeze: core contributors (`kirikov`, `huiq777`, `thisisjoshford`, `pranavraja99`) are landing or iterating MCP isolation, Telegram command registration, WebChat composer behavior, and benchmark taxonomies. A large share of PR volume is Dependabot (Rust, wasmtime, Actions, frontend test deps), so raw PR count overstates product change. Project health is **operationally active and security-conscious**, with one long-running multi-tenant MCP issue still open and a large overall issue backlog (~1.5k open items including PRs).

## 2. Releases

No new version shipped in this window. Production remains **[ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0)** (published 2026-08-28), a stable promotion of `1.4.0-rc.1` covering 81 commits since 1.3.0. That release added a durable notification inbox, background subagents, persistent per-user sandboxes, managed egress proxy, run-now automations, Google Docs semantic editing, and opt-in in-worker SSH, with **no migration from 1.3.0**. Next-version work is visible in open PRs (hosted-MCP catalog isolation, IME composer, context-limit override) rather than in a tagged RC.

## 3. Project Progress

Confirmed merge in this cluster:

- **[PR #8072](https://github.com/nearai/ironclaw/pull/8072)** — `feat(telegram): register the Bot API command menu at activation` by `thisisjoshford`, **merged 2026-09-10** (7 comments). Telegram’s chat menu now lists `/model`, `/status`, `/new`, `/stop`, `/interrupt` via `setMyCommands` on activation and best-effort `deleteMyCommands` on deactivation. This is the clearest user-facing channel improvement of the week.

Closed (not all merged; several were superseded or replaced):

- **[PR #8083](https://github.com/nearai/ironclaw/pull/8083)** — merge discovered hosted-MCP catalogs instead of replacing them (addresses last-writer-wins tool lists).
- **[PR #8089](https://github.com/nearai/ironclaw/pull/8089)** — bundle a first-party **agent.market** hosted-MCP provider package (manifest + static tool fallback until live `tools/list`).
- **[PR #8088](https://github.com/nearai/ironclaw/pull/8088)** — treat a set-but-empty env var as distinct from unset (`FOO=` no longer silently becomes the default).
- **[PR #8076](https://github.com/nearai/ironclaw/pull/8076)** — distinguish a paired user’s *disconnected* shared channel from an unpaired account (closed, not merged in API snapshot).
- Dependabot closures: **[#8097](https://github.com/nearai/ironclaw/pull/8097)**, **[#8080](https://github.com/nearai/ironclaw/pull/8080)** (Rust “everything-else” group), typically replaced by a newer bump.

Still advancing on `main` via open PRs:

- MCP correctness: **[#8090](https://github.com/nearai/ironclaw/pull/8090)** key catalogs per caller; **[#8084](https://github.com/nearai/ironclaw/pull/8084)** opt-in SEP-414 caller attribution; **[#8085](https://github.com/nearai/ironclaw/pull/8085)** treat operator-installed packages like host-bundled ones.
- Runtime/config: **[#8087](https://github.com/nearai/ironclaw/pull/8087)** make prompt-context limit an override (default still 128k); **[#8098](https://github.com/nearai/ironclaw/pull/8098)** pin turn lineage metadata drop in `TurnRunState` snapshots.
- WebUI: **[#8092](https://github.com/nearai/ironclaw/pull/8092)** preserve IME composition in the composer.

Net: channel UX and hosted-MCP multi-principal isolation are the product threads; most closed volume is dependency hygiene.

## 4. Community Hot Topics

Comment volume is modest (typical 0–7). Heat is about *correctness under multi-user and CJK input*, not viral feature debate.

| Item | Why it matters | Link |
| --- | --- | --- |
| Telegram command menu | Highest comment count among recent product PRs (7); operators want channel commands discoverable in the native client | [PR #8072](https://github.com/nearai/ironclaw/pull/8072) |
| Hosted-MCP catalog keyed by extension id | Cross-user tool metadata on multi-principal servers; last discovery overwrites the shared slot | [Issue #6778](https://github.com/nearai/ironclaw/issues/6778), [PR #8090](https://github.com/nearai/ironclaw/pull/8090) |
| IME Enter submits chat | Recurrence of a WebChat v2 CJK composition bug | [Issue #8091](https://github.com/nearai/ironclaw/issues/8091), [PR #8092](https://github.com/nearai/ironclaw/pull/8092) |
| Skills CLI vs runtime | `ironclaw skills list` cannot see skills the runtime wrote, or other users’ skills | [Issue #8086](https://github.com/nearai/ironclaw/issues/8086) |
| Daily OfficeQA taxonomy | Maintainers publishing harness-vs-model failure splits | [Issue #8093](https://github.com/nearai/ironclaw/issues/8093), [Issue #8081](https://github.com/nearai/ironclaw/issues/8081) |

Underlying needs: **tenant isolation for hosted MCP**, **composer behavior that matches browser IME**, **CLI/runtime skill inventory consistency**, and **channel parity** (Telegram menu, Slack/shared-channel state). Older related PRs **[#6760](https://github.com/nearai/ironclaw/pull/6760)** (9 comments) and **[#6759](https://github.com/nearai/ironclaw/pull/6759)** (6 comments) show the MCP/marketplace thread has been open since late July.

## 5. Bugs & Stability

Ranked by severity from this week’s visible items:

1. **High — multi-principal hosted-MCP catalog leak / overwrite**  
   [Issue #6778](https://github.com/nearai/ironclaw/issues/6778) (open since **2026-07-28**, updated 2026-09-08, 2 comments). Discovery runs as the activating user, then publishes under **extension id only**. Installations are per-user; the published catalog is not. Impact: users can overwrite each other’s tool lists; metadata from one principal can appear in another’s published package. Fix PRs exist: [#8090](https://github.com/nearai/ironclaw/pull/8090) (open, per-caller key), [#8083](https://github.com/nearai/ironclaw/pull/8083) (closed, merge-instead-of-replace). Not fully closed as a product issue.

2. **Medium — WebChat v2 IME composition submits on Enter**  
   [Issue #8091](https://github.com/nearai/ironclaw/issues/8091) by `supermomonga`. Confirming an IME conversion also sends the message (including Safari `keyCode 229` / `isComposing` false). Recurrence of a previously seen user-visible bug. Fix PR: [#8092](https://github.com/nearai/ironclaw/pull/8092) (open).

3. **Medium — CLI/runtime skill inventory split**  
   [Issue #8086](https://github.com/nearai/ironclaw/issues/8086). `ironclaw skills list` misses skills the agent runtime installed and skills belonging to any user the CLI was not configured as. Debugging “agent can’t see skill” points at the wrong layer.

4. **Low–medium — shared-channel state copy**  
   [Issue #8074](https://github.com/nearai/ironclaw/issues/8074) / [PR #8076](https://github.com/nearai/ironclaw/pull/8076): paired user in a disconnected shared channel gets pairing-notice copy instead of channel-specific guidance.

5. **Observability, not product crash** — daily taxonomies [#8093](https://github.com/nearai/ironclaw/issues/8093) and [#8081](https://github.com/nearai/ironclaw/issues/8081) report OfficeQA ~42 non-pass tasks as **mostly model-quality numeric errors** (DeepSeek-V4-Flash), not harness regressions. Stability signal: the *runtime* is being treated as stable enough that failures are attributed to the model.

No new crash-loop or data-loss report appears in this 24h issue set. Dependabot wasm bump **[#7834](https://github.com/nearai/ironclaw/pull/7834)** is labeled `risk: medium` / `size: L` and has been open since 2026-08-23.

## 6. Feature Requests & Roadmap Signals

Signals that look like 1.4.x / 1.5 candidates:

- **Hosted MCP as a first-class multi-tenant substrate** — per-caller catalogs ([#8090](https://github.com/nearai/ironclaw/pull/8090)), SEP-414 attribution so providers can tell conversation vs retry ([#8084](https://github.com/nearai/ironclaw/pull/8084)), bundled agent.market package ([#8089](https://github.com/nearai/ironclaw/pull/8089)). Highest odds of landing next if isolation tests pass.
- **Operator/deploy knobs** — prompt-context limit as override not constant ([#8087](https://github.com/nearai/ironclaw/pull/8087)); empty vs unset env ([#8088](https://github.com/nearai/ironclaw/pull/8088)); operator-installed packages validated like host-bundled ([#8085](https://github.com/nearai/ironclaw/pull/8085)).
- **Channel completeness** — Telegram native command menu already merged; shared-channel disconnected vs unpaired still in flight.
- **Composer / CJK** — IME-safe Enter is a likely small WebUI patch in the next cut.
- **Context/attachment policy** — [PR #8082](https://github.com/nearai/ironclaw/pull/8082) opt-in pointer mode for document text (cost control).
- **Sandbox default** — [PR #8075](https://github.com/nearai/ironclaw/pull/8075) make embedded Pi sandbox loop the startup default (4 comments).

Prediction: next tag is more likely a **1.4.1-class correctness + MCP isolation** drop than a large feature release, unless marketplace bundling and SEP-414 ship together.

## 7. User Feedback Summary

Direct end-user reports in this slice are few but specific:

- **CJK / IME users** cannot finish composition without sending ([#8091](https://github.com/nearai/ironclaw/issues/8091)). Pain is immediate and visible in WebChat v2; a fix PR already exists.
- **Operators and agent authors** cannot trust `ironclaw skills list` as the source of truth for what the runtime installed ([#8086](https://github.com/nearai/ironclaw/issues/8086)). That creates false-negative debugging.
- **Multi-user / hosted MCP operators** need catalogs and attribution scoped to caller and conversation, not extension id ([#6778](https://github.com/nearai/ironclaw/issues/6778), [#8084](https://github.com/nearai/ironclaw/pull/8084)). This is a platform-trust issue, not a cosmetic one.
- **Telegram users** want commands in the client hamburger menu — now addressed in merged [#8072](https://github.com/nearai/ironclaw/pull/8072).
- Benchmark commentary from maintainers frames OfficeQA misses as model math/navigation errors, which is a mild **positive** on harness stability and a reminder that headline agent scores still swing with the base model.

Satisfaction read: contributors are shipping tightly scoped fixes; dissatisfaction clusters on **isolation, CLI visibility, and input-method polish**, not on “the assistant does nothing.”

## 8. Backlog Watch

Items that need maintainer attention more than they need more Dependabot PRs:

1. **[Issue #6778](https://github.com/nearai/ironclaw/issues/6778)** — open ~7 weeks. Security-adjacent cross-user metadata on multi-principal hosted-MCP. Should not sit behind routine dep bumps.
2. **[PR #8090](https://github.com/nearai/ironclaw/pull/8090)** + **[PR #8084](https://github.com/nearai/ironclaw/pull/8084)** — the actual isolation/attribution fixes; review/merge path is the way to retire #6778.
3. **[Issue #8086](https://github.com/nearai/ironclaw/issues/8086)** — CLI/runtime skill list split; no linked fix in the provided 24h set.
4. **[Issue #8091](https://github.com/nearai/ironclaw/issues/8091)** / **[PR #8092](https://github.com/nearai/ironclaw/pull/8092)** — small UX regression with a patch ready; easy close.
5. **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)** — wasmtime/wasm-tools group bump, open since 2026-08-23, labeled medium risk / large. Stale dep PRs of this size tend to bit-rot.
6. WebUI polish stack still open: [#8071](https://github.com/nearai/ironclaw/pull/8071), [#8070](https://github.com/nearai/ironclaw/pull/8070), [#8069](https://github.com/nearai/ironclaw/pull/8069), [#8068](https://github.com/nearai/ironclaw/pull/8068) (`italic-jinxin`) — command-card height, slash-command metadata, dismiss actions, active command visibility.
7. Structural backlog: **~1,523 open issues+PRs**. Daily taxonomy issues (#8081, #8093) are useful but will accumulate unless closed or rolled into a dashboard.

**Health snapshot:** IronClaw after 1.4.0 is in a **hardening sprint** — MCP tenancy, channel UX, composer correctness, deploy knobs — with strong bot-driven dependency hygiene and weak public discussion volume. The main risk is not inactivity; it is leaving **#6778-class isolation** open while Dependabot dominates the PR list.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

I'll pull the latest QwenPaw GitHub activity so the digest matches the repo, not just the snapshot.Fetching the v2.2.1 release notes and a few high-signal issues so the digest is accurate.# QwenPaw Project Digest — 2026-09-14

**Repo:** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) · ~34.9k stars / 3.1k forks · Apache-2.0  
**Window:** activity clustered around the **v2.2.1 stable ship** (2026-09-11) through 2026-09-14  
**Snapshot counts:** 28 issues touched (22 open / 6 closed) · 50 PRs touched (31 open / 19 merged or closed) · 3 releases

---

## 1. This Week's Overview

QwenPaw is in a **post-release surge**, not a quiet patch window. Stable **v2.2.1** landed on 11 Sep after two betas in three days, and the tracker immediately filled with Desktop/Windows regressions, MCP compatibility breaks, session/model persistence failures, and cost-control requests around memory and subagents. Velocity is high and healthy on the contributor side: many of the newest PRs are first-time contributions targeting concrete bugs from the 2.2.x line. Health signal is mixed in a typical way for a personal-agent OS at this scale — product surface (per-agent routing, ReMe/PowerContext, Creator 1.2.0, plugin one-click update) is moving fast, while **session truthfulness, stop/cancel, MCP Driver construction, and long-running resource use** are the reliability tax of that speed. Maintainers closed several feature/invalid tickets during the same window, which suggests triage is active even if several high-severity bugs remain open.

---

## 2. Releases

### v2.2.1 (stable) — 2026-09-11  
https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1  

Feature-dense patch on top of 2.2.0, not a tiny hotfix. No explicit breaking-change banner in the notes; still a **behavior-sensitive upgrade** for anyone on custom MCP, ACP, memory backends, or Desktop.

**Added (high-signal)**  
- Per-agent **model routing** (provider preference + fallback) — [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)  
- **Auto Fin** proactive memory review + ReMe reliability work — [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441)  
- **PowerContext** as optional long-term memory backend — [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)  
- Stronger default agent policy (scope, untrusted content, confirmations, completion) — [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)  
- **Creator 1.2.0**: blueprint workbench, multi-timeline compare, video templates, MiniMax H3, snapshot rollback, Docker — [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)  
- Unified env-var settings across Agents / MCP / tools / local models — [#7538](https://github.com/agentscope-ai/QwenPaw/pull/7538)  
- One-click plugin / PawApp update detection — [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)  
- Skill preload, versioned Skills + dependency checks, MCP HTTP/SSE timeouts — [#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183), [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609), [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)

**Changed**  
- Memory backends get a consistent lifecycle; ADBPG and PowerContext shipped as plugins — [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561), [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)  
- Console theme/sidebar/mobile agent selector polish — [#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487), [#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)

**Fixed (selected)**  
- Streaming / session-switch / queued-send races — [#7523](https://github.com/agentscope-ai/QwenPaw/pull/7523), [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)  
- MCP tool allowlist on the runtime path; legacy MCP HTTP 401 discovery — [#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504), [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)  
- Context folding of consumed thinking blocks — [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)  
- Windows ACP workspace startup stall — [#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)

**Betas in the same train**  
- [v2.2.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1) (08 Sep) — routing + docs/website + streaming session sync  
- [v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2) (10 Sep) — mobile selector, CSS alignment, version bump  

**Migration notes (inferred, not official):** treat 2.2.x MCP Driver construction and session-on-disk as **verify-after-upgrade** items. Users already report model cards vanishing and sessions disappearing on Desktop 2.2.1. Re-select the model after a desktop restart; do not assume sidebar session index == disk session files. Plugin-store UX was a 2.2.1 goal (one-click update) but catalog offline fallback and install-flow refresh still have follow-up bugs.

---

## 3. Project Progress

**Shipped in 2.2.1 that the community is already building on**

| Theme | What moved | Evidence |
|---|---|---|
| Multi-model agents | Per-agent routing landed; subagent override still incomplete | [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501); follow-ups [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680), [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) |
| Memory cost & backends | ReMe upgrade, Auto Fin, PowerContext, pluginized backends | [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441), [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080), [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) |
| Console / plugins | One-click updates, sidebar, env page | [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605); related request [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) closed after the release |
| Protocol surface | MCP timeouts + 401 compat; A2A still docs-only | [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649), [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) |
| i18n | pt-BR locale completed and repaired | [#4009](https://github.com/agentscope-ai/QwenPaw/pull/4009) closed; repair [#7734](https://github.com/agentscope-ai/QwenPaw/pull/7734) |
| Channels | Telegram tables / markdown / cleanup | [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) closed; [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713), [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718), [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) open |

**Closed in this snapshot (6 issues)**  
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — `subagent_model` ignored (bug acknowledged; routing work continues via PRs)  
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — ghost sessions / index vs disk — closed **invalid** (symptom family is still live in [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724))  
- [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) — plugin store click-tax / missing bulk update  
- [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) — separate RemeLight memory model (implementation PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) is open)  
- [#3429](https://github.com/agentscope-ai/QwenPaw/issues/3429) — preinstall `himalaya` and common CLI tools in Docker (opened Apr 2026, closed 13 Sep)  
- [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) — v2.2.1 installation verification duty ticket  

**Open PR themes advancing next (not yet merged in the snapshot)**  
MCP Java envelope + HTTP error preservation ([#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729), [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)), ACP permission `kind` matching ([#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)), non-blocking workspace file watch ([#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)), DeepSeek V4 Flash capabilities ([#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736)), Serply search ([#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712)), Atlas Cloud provider ([#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)), Playwright driver self-heal ([#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)).

---

## 4. Community Hot Topics

Comment volume in this dump is modest (1–6), so “hot” here means **repeat reporters + clustered themes**, not viral reaction counts.

1. **Stop / cancel is a lie** — [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) (6 comments)  
   UI shows stopped; process keeps running; next send hits HTTP 409. This is a trust-breaker for any long tool loop.

2. **Memory does not stay put** — [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) (4 comments)  
   Power-user plugin workflow (dev path A → agent path B → runtime path C). Agent “forgets” write-location rules and starts coding in the runtime tree; deploy scripts then overwrite work. Underlying need: **durable, path-scoped working memory**, not only conversational ReMe.

3. **Desktop session + model config evaporates** — [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724), [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) (3 comments each), same author  
   After plugin redeploy / shutdown, model card and whole conversations vanish from Console even when the user can re-pick a model. Need: session index and provider config as crash-safe durable state.

4. **A2A on the documented Driver path** — [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) (3 comments, open since 02 Sep)  
   Architecture text promises MCP / A2A / ACP behind one Driver; only MCP is real. Need: a public A2A date or an honest “not in 2.2” note.

5. **Cheap model for grunt work / memory writes** — [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) (open since 02 Jun, still poked 11 Sep), [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)  
   Claude Code–style “Haiku for grep, Opus for reason” and “don’t burn the flagship model on nightly dream/summarize.” This is the strongest *economic* theme in the tracker.

6. **Protocol interop after 2.2.x** — [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716), [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)  
   Hub MCP worked on 2.1.1b3 and broke on 2.2.x; Java MCP SDK returns HTTP 500 + non-standard `jsonRpcError`. Need: Driver discovery that treats messy real-world servers as first-class.

**Underlying needs, compressed:** truthful control plane (stop, session, model), cheaper secondary models, protocol realism (Java MCP, ACP option IDs, A2A), and workspace-scale runtime (file watch, memory caps).

---

## 5. Bugs & Stability

Ranked by blast radius. “Fix PR” = a linked or clearly corresponding open PR in the dump, not a confirmed merge.

| Sev | Issue | Symptom | Fix PR? |
|---|---|---|---|
| **P0** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | Container RAM climbs ~1 MB/s via unbounded stream buffers + keep-alive stacking + doom-loop gate evasion → hang/OOM | Related: [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) (console `stream_one` silent failure) — not a full memory fix |
| **P0** | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | Files panel SSE `/api/workspace/watch` + `watchfiles.awatch` sync baseline scan **blocks the whole event loop** on large repos; WebUI + Feishu/QQ die | **Yes** [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) (threaded polling) |
| **P0** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop button lies; task continues; 409 on next prompt | No dedicated PR in dump |
| **P0** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) / [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | Session + configured LLM disappear on Desktop 2.2.1 | No dedicated PR; [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) closed invalid |
| **P1** | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | MCP connect/register broken since 2.2.x | **Yes** [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) |
| **P1** | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | Java MCP `server/discover` HTTP 500 + `jsonRpcError` kills Driver build | **Yes** [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) |
| **P1** | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | Out-of-workspace write hard-block blind to kimi-code Write `_paths` — **sandbox bypass** | No PR in dump |
| **P1** | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ACP `trusted: true` still prompts; `_pick_allow_option` only matches `allow_*` IDs | **Yes** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) |
| **P2** | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | ReMe Daily Paper fails when arxiv.org is unreachable; inbox says “no content” | No PR |
| **P2** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | Cron / normal replies hide the actual answer inside thinking/steps | No PR |
| **P2** | [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720) | Creator 1.2.0 storyboard path stuck on `BLOCKED / GATED` with no accept-image control | No PR |
| **P2** | [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) | Plugin catalog CDN blip → 500 instead of documented empty-catalog fallback | No PR |
| **P2** | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` ignored; children inherit parent `active_model` | Closed; diagnostic [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) still open |

**Regression pattern:** 2.2.x tightened Drivers, ACP, and memory plugins, then production clients (Java MCP SDK, kimi-code ACP, Desktop session store, large Docker workspaces) fell off the happy path. Several of those already have same-day fix PRs, which is a good maintainer response time.

---

## 6. Feature Requests & Roadmap Signals

Likely **2.2.2 / 2.3** candidates because they already have PRs or sit on a just-shipped primitive:

| Request | Signal | Why it might land soon |
|---|---|---|
| Separate memory-write model | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) closed + [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | Direct cost win after ReMe/Auto Fin |
| Per-task / subagent model | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901), [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | Routing exists; override is the missing half |
| DeepSeek native capabilities | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717), [#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) | Catalog-only change, low risk |
| Serply `web_search` | [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711), [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | Opt-in BYOK, same shape as AnySearch |
| ACP permission by `kind` | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726), [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) | Correctness fix for trusted sessions |
| Workspace watch rewrite | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721), [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) | Availability fix; should not wait |
| Inter-agent / proactive history groups | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | Console IA after multi-agent traffic grew |
| Custom default Loop template | [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714) | Small UX, high daily-friction |
| Files panel show-dotfiles toggle | [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) | Small, requested by developers |
| Agent-owned context eviction | [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) | Strategic; larger design than a patch |
| Official A2A | [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | Documented, unimplemented — **roadmap item, not a 2.2.2 shoe-in** |
| Atlas Cloud provider | [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | Open since July; may slip unless reviewed |

**Prediction:** the next tag is more likely a **stability + cost-control** release (watch rewrite, MCP/ACP interop, memory_model, subagent model diagnostics) than another Creator/Hub feature drop.

---

## 7. User Feedback Summary

**Who is filing:** heavy Desktop Windows users, Docker self-hosters, plugin authors spanning three filesystem roots, people wiring Java/Kotlin MCP and kimi-code ACP, Telegram channel operators, and cost-sensitive ReMe users.

**What they use it for**  
- Personal “maintenance butler” across several machines with many plugins  
- Plugin/PawApp development with separate source / agent / runtime trees  
- Scheduled memory jobs (Daily Paper, dream/summarize, Auto Fin)  
- Multi-agent coding with delegated ACP runners  
- IM channels as the real UI (Telegram markdown/tables keep coming back)

**Pain**  
- Control plane lies: stop isn’t stop, session list isn’t disk, model settings vanish  
- 2.2.x MCP upgrade broke working 2.1 setups  
- Flagship-model token burn on background memory and naive subagent spawn  
- Large workspaces can take the **entire** process down  
- Cron/Creator surfaces hide the real error behind “completed / GATED / no content”  
- Plugin market still feels click-heavy even after the one-click update story

**Satisfaction (indirect)**  
People are not abandoning the product; they are writing detailed repros and first-time PRs the same day. That is the profile of a project users treat as infrastructure. Closed “invalid” on [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) while the same reporter still has [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) open is the main satisfaction risk — the session-loss story needs one owner, not a closed-as-invalid plus a twin ticket.

---

## 8. Backlog Watch

Needs a maintainer decision or merge, not more user comments.

| Item | Age / state | Why it matters |
|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) per-task subagent model | Open since **2026-06-02**, still referenced by 2.2.1 bugs | Core cost architecture; shipping routing without this leaves the feature half-done |
| [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) A2A timeline | Open since 02 Sep; architecture docs already name it | Expectation debt. Even “not before 2.3” would reduce noise |
| [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) stop is cosmetic | Open 10 days, 6 comments, **no fix PR** | Highest UX-integrity bug without an owner in this dump |
| [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) / [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) model + session loss | Repeat Desktop reporter | Data-loss class; should not sit behind “reselect the model” |
| [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) three-path memory leak | Has a controlled repro + proposed minimal fixes | Will page operators of the official image |
| [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) OOB write via kimi-code | Security boundary hole, no PR | File Guard is a marketed pillar |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) Playwright driver self-heal | Open since **07 Aug**, marked ready-for-human-review | “Die once, dead forever” browser backend |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) Atlas Cloud | Open since **27 Jul** | First-time contributor waiting ~7 weeks |
| [#7733](https://github.com/agentscope-ai/QwenPaw/issues/7733) agent-autonomous compaction | New (13 Sep) but design-heavy | If ignored, long missions will keep waking up amnesiac |

---

**Health one-liner:** v2.2.1 expanded QwenPaw from “assistant with plugins” toward an **agent OS** (routing, memory backends, Creator, Hub). The community is matching that ambition with patches; the next healthy move is a short stability tag that makes stop, sessions, MCP discovery, and workspace I/O true before adding another protocol.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

I'll gather the repo's current state and fill gaps in the provided snapshot so the digest is accurate.Fetching the two active issues and a few high-signal PRs for comments, labels, and review status.# ZeroClaw Project Digest — 2026-09-14

**Repo:** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) · Rust personal-agent runtime · ~32.8k stars / ~4.9k forks · latest shipped tag **v0.8.5** (2026-09-05)

Window covered by the supplied snapshot: issues/PRs updated in the last 24 hours (through 2026-09-13).

---

## 1. This Week's Overview

ZeroClaw is in a **post-v0.8.5 integration queue**, not a ship week. The last 24 hours show **2 open issues touched and 50 open PRs restacked or refreshed, with zero merges and zero new releases**. That pattern is consistent with a large Rust workspace after a 454-commit release: contributors rebase security, plugin, provider, and runtime work onto current `master`, but nothing is landing.

Project health looks **active but congested**. Many of the hottest PRs are size XL, labeled `risk:high` / `domain:security`, and carry `needs-author-action`, `needs-maintainer-review`, `status:blocked`, or `do-not-merge`. Throughput is therefore review-bound rather than idea-bound. The only clearly user-facing incident in the window is an S1 provider bug that can break OpenCode Go models and risk account flags.

---

## 2. Releases

No new version in this period. Current latest remains **[v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)** (2026-09-05): ZeroRelay/ZeroRouter, tighter plugin and skill boundaries, broader providers, and operator-experience work across chat and channels.

Tracker [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) (v0.8.5 finite weekly stabilization line) was still updated on 2026-09-13 even though the tag already shipped; treat it as a leftover milestone thread, not a live cut.

---

## 3. Project Progress

**Merged / closed in the provided 24h window: 0.** Progress is visible only as open work moving forward on `master`:

| Theme | What advanced (still unmerged) | Representative PRs |
|---|---|---|
| Security / policy | Shell V1 permission policy (RFC #7155 Phase 0+1); OIDC token-verification provider; git allowed-roots; channel-plugin egress; inbound-auth ADR | [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610), [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255), [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#10750](https://github.com/zeroclaw-labs/zeroclaw/pull/10750), [#10831](https://github.com/zeroclaw-labs/zeroclaw/pull/10831) |
| Plugins / WASM | Exact-byte admission, host-mediated WebSocket, named TLS profiles, plugin load verification, install/list egress-grant ceremony | [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134), [#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142), [#10752](https://github.com/zeroclaw-labs/zeroclaw/pull/10752), [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) |
| Runtime / sessions | Agent lifecycle coordination, ACP transcript pagination, context compaction by model-window ratio, persistent session prompt attachments | [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621), [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596), [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535), [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) |
| Providers | Multi-model-per-profile, Hailo-Ollama native, pixel-level image validation, media-marker degradation | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109), [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819), [#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838) |
| Connectivity | Relay-terminated browser enrollment frontdoor (phase 1) | [#10525](https://github.com/zeroclaw-labs/zeroclaw/pull/10525) |
| Skills | Declarative auto-activation + provider switch / image-turn tool blocking | [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) |

The queue is dominated by a small set of distinguished/principal contributors (JordanTheJet, NiuBlibing, Audacity88, vrurg) restacking stacked drafts. That is healthy contributor continuity; it is not the same as shipped progress.

---

## 4. Community Hot Topics

Comment counts on most listed PRs were not supplied (`undefined`). Ranked by **explicit engagement + severity labels** in the snapshot:

1. **[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)** — `[Bug] OpenCode providers never send x-opencode-session`  
   Author JordanTheJet · opened 2026-09-03 · updated 2026-09-13 · **3 comments, 3 👍** · labels `priority:p1`, `risk:high`, `status:in-progress`, `domain:security`.  
   **Need:** OpenCode Go requires a stable per-conversation `x-opencode-session` (and a real User-Agent) for routing/prompt-cache; missing headers break Go models and can look like abusive client traffic. This is the same industry-wide contract change other agent runtimes hit around 2026-09-05/06.

2. **[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)** — v0.8.5 stabilization tracker  
   Still poked on 2026-09-13. **Need:** a single source of truth for what did / did not land in 0.8.5 after intake freeze.

3. **Security-policy stack** — [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) (shell V1 / RFC #7155), [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) (git allowed roots), [#10750](https://github.com/zeroclaw-labs/zeroclaw/pull/10750) (channel plugin egress), [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) (plugin install egress-grant ceremony).  
   **Need:** one permission model for shell, git, plugins, and network egress instead of per-tool exceptions.

4. **Operator-scale runtime** — [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) (coordinate agent lifecycle mutations), [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) (paginate ACP transcripts), [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) (compact by model window ratio).  
   **Need:** long-lived multi-channel / ACP sessions without snapshot drift or full-history materialization.

5. **WASM plugin platform** — long-running stack from July still being restacked ([#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863), [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142), [#10752](https://github.com/zeroclaw-labs/zeroclaw/pull/10752)).  
   **Need:** plugins that cannot reopen disk artifacts, cannot take ambient sockets, and can be verified after install.

Underlying demand is consistent: **self-hosted agent + untrusted plugins + paid third-party model relays**, with fail-closed defaults.

---

## 5. Bugs & Stability

Ranked from the 24h issue set plus bug-labeled PRs. No crash/regression reports beyond these were in the snapshot.

| Sev | Item | Status | Fix PR? |
|---|---|---|---|
| **S1 / P1** | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode family never sends `x-opencode-session`; breaks Go models; account-flag risk | Open, `in-progress` | Not listed in the snapshot. Treat as the only workflow-blocking bug this window. |
| **High** | [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — `git_operations` not bound to authorized roots (Fixes #10334) | Open PR, `needs-author-action`, size XL | Yes — this PR |
| **High** | [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — corrupt / truncated images pass header sniff and fail later at the provider | Open PR, `needs-author-action` | Yes — this PR |
| **Medium–high** | [#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838) — text-only path rewrites media markers to `[media attachment]` while the channel contract still tells the model to emit `[IMAGE:...]` | Open PR, size S, updated 2026-09-13 | Yes — this PR |
| **High, blocked** | [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) — plugin adapters reopen `wasm_path` instead of using admitted bytes | Open, `status:blocked`, `do-not-merge` | Yes — this PR, not mergeable yet |
| **High, blocked** | [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — Hailo-Ollama native provider | Open, `status:blocked`, `do-not-merge` | Feature, not a user-reported crash |

No new release means none of the above is in a tagged binary yet. Operators on v0.8.5 who use OpenCode Go are the exposed population for #10603.

---

## 6. Feature Requests & Roadmap Signals

Signals from open enhancement PRs (not a published 0.8.6/0.9 roadmap):

**Likely next-cut if review unblocks:**
- Unified shell / tool permission policy — [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) (explicitly “accepted” RFC #7155 Phase 0+1)
- Shared live-config authority for agent lifecycle — [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)
- Multi-model per provider profile — [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)
- Context compaction as a ratio of the selected model window — [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)
- ACP transcript pagination — [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596)
- Plugin install/list egress-grant ceremony + load verification — [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584), [#10752](https://github.com/zeroclaw-labs/zeroclaw/pull/10752)
- Persistent session prompt attachments — [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)
- OIDC `oidc.<alias>` token verification — [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)
- ZeroRelay browser enrollment frontdoor (phase 1) — [#10525](https://github.com/zeroclaw-labs/zeroclaw/pull/10525)
- Inbound auth principal ADR — [#10831](https://github.com/zeroclaw-labs/zeroclaw/pull/10831) (docs-only, low risk)

**Requested but structurally blocked / stacked:**
- Native Hailo-Ollama — [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)
- Host-mediated plugin WebSocket + named TLS profiles — [#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863), [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142)
- Skills declarative auto-activation — [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)

Prediction: the next tag is more likely a **security + runtime coordination** cut than a feature splash. Hailo, WebSocket plugins, and skills activation look like they need the plugin/security base to merge first.

---

## 7. User Feedback Summary

The snapshot is maintainer/contributor-heavy; there is almost no end-user issue volume in the last 24 hours (2 issues, one of them a release tracker). Pain points that *are* visible:

- **Paid-relay compatibility is brittle.** OpenCode Go is now a session-header protocol, not a plain OpenAI-compatible URL. Users who pointed a compatible provider at `opencode.ai` can lose models or look like a misbehaving client (#10603).
- **Workspace / git / plugin trust still leaks in edge paths.** Allowed-roots for git, exact WASM admission, and channel-plugin egress keep getting rediscovered as XL security PRs. Operators who turned on plugins or git tools are the ones who feel this.
- **Long sessions and multimodal turns are operationally expensive.** Compaction tied to a fixed 32k budget, unpaginated ACP transcripts, and media-marker mismatch are all “the agent works until the context or image path gets weird.”
- **Hardware / edge providers are desired but gated.** Hailo-Ollama support exists as a large PR and is explicitly blocked from merge.
- **Satisfaction signal (indirect):** v0.8.5 shipped a large contributor set (73 people / 454 commits) and the same people are still pushing the next line. Dissatisfaction signal: many PRs sit on `needs-author-action` after restack, which usually means review comments are outrunning author time.

Use cases implied by the PR mix: self-hosted multi-channel assistant, IDE/ACP embedding, WASM third-party channels, OIDC-gated gateways, and on-device / accelerator inference (Ollama, Hailo).

---

## 8. Backlog Watch

Items that have been open a long time, are high-risk, and still needed a 2026-09-13 bump — these need maintainer sequencing, not more design:

| Age | Item | Why it is stuck |
|---|---|---|
| Since 2026-07-08 | [#8863](https://github.com/zeroclaw-labs/zeroclaw/pull/8863) host-mediated plugin WebSocket | Stacked (`Depends on #8923`), `needs-author-action`, XL, secrets/WASM |
| Since 2026-07-11 | [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) skills auto-activation | Restacked after #9563; still `needs-author-action` |
| Since 2026-07-17 | [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) Hailo-Ollama | `status:blocked`, `do-not-merge` |
| Since 2026-07-18 | [#9134](https://github.com/zeroclaw-labs/zeroclaw/pull/9134) admit exact WASM bytes | `status:blocked`, `do-not-merge`, `needs-author-action` |
| Since 2026-07-18 | [#9142](https://github.com/zeroclaw-labs/zeroclaw/pull/9142) named TLS profiles | Stacked on unmerged #9137 |
| Since 2026-07-27 | [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 0.8.5 tracker | Release already shipped 2026-09-05; tracker should be closed or retargeted |
| Since 2026-07-29 | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) context compact ratio | XL, `needs-author-action` |
| Since 2026-07-31 | [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) plugin egress-grant ceremony | XL security, restack-only progress |
| Since 2026-08-07 | [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) | Both `needs-author-action` |
| Since 2026-08-25 / 08-27 | [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) | XL + `needs-author-action` |
| Fresh but high leverage | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | Only P1 user-facing bug; should not wait behind the July plugin stack |

**Maintainer attention, in order:** close or retarget #9459 → land or explicitly defer #10603 → pick a merge order for the plugin/security base (#9134 / #9584 / #10750 / #10610) so the July stack stops rebasing in place.

---

**Health one-liner:** popular, well-staffed Rust agent runtime; v0.8.5 is out; the 24h pulse is a large unmerged security/runtime queue plus one real provider-compat incident. Watch merge rate over the next few days more than star count.

</details>