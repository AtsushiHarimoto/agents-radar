# OpenClaw Ecosystem Digest 2026-08-30

> Issues: 148 | PRs: 500 | Projects covered: 5 | Generated: 2026-08-30 07:55 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

I'll pull the live OpenClaw repo, releases, and hottest issues/PRs so the digest is accurate rather than relying only on the truncated snapshot.Release notes are truncated in the snapshot; I’ll fetch the GitHub releases and changelog next.# OpenClaw Project Digest — 2026-08-30

**Repo:** [openclaw/openclaw](https://github.com/openclaw/openclaw)  
**Positioning:** Self-hosted personal/team AI assistant gateway — models, tools, and messaging channels behind one local control plane.  
**Scale (as of 2026-08-30):** ~388k stars, ~81.5k forks, ~23.4k org followers. Updated today.

---

## 1. This Week's Overview

OpenClaw is in a high-velocity reliability phase, not a greenfield feature phase. In the last 24 hours alone the tracker moved **148 issues** (127 still open/active, 21 closed) and **500 PRs** (349 still open, 151 merged or closed), with two beta tags landing: `v2026.8.1-beta.3` (24 Aug) and `v2026.9.1-beta.1` (28 Aug). That volume, plus a ClawSweeper triage bot that labels almost every ticket, is consistent with a project that has outgrown casual review and is running an industrial intake pipeline.

The product surface is already wide (Gateway, Control UI, Codex runtime, Telegram/WhatsApp/Feishu/LINE/Teams/Discord, plugins, Swarm/subagents, memory). The live pain is narrower: **turns that work internally but never reach a terminal user-visible reply**, **session state that desyncs across restart/compaction/auth boundaries**, and **channel adapters that drop receipts or wedge lanes**. Maintainers (notably @steipete) are shipping large, targeted fixes on those paths while community PRs pile up waiting for review.

Health read: community energy and contributor depth are excellent; operational reliability of “the agent answers me on Telegram/WhatsApp” is still the binding constraint. That mismatch is the week’s story.

---

## 2. Releases

Two new pre-releases. No breaking-change section in either notes set. Latest stable line remains the 2026.7.1-x / 2026.6.34 family; 2026.8/9 are still beta.

### [v2026.9.1-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.9.1-beta.1) — 28 Aug 2026

Focus: **survive Gateway restarts and keep work visible**.

- **Gateway restart recovery** — admitted turns survive repeated Gateway restarts, continue through checkpoints, and still deliver a final response ([#130491](https://github.com/openclaw/openclaw/pull/130491), @jalehman).
- **Config-write reliability** — committed config writes stay pending across watcher handoff so `config.patch` does not fail mid-reload ([#131515](https://github.com/openclaw/openclaw/pull/131515), fixes [#131405](https://github.com/openclaw/openclaw/issues/131405)).
- **Codex managed runtime 0.150.1** across Linux/macOS/Windows ([#130685](https://github.com/openclaw/openclaw/pull/130685), @vincentkoc).
- **Linux installer** pins Node 24 LTS / NodeSource so RPM installs cannot pick an incompatible Node prerelease ([#130369](https://github.com/openclaw/openclaw/pull/130369)).
- **Worker recovery** — re-arm admission-deadline launches, terminalize dead-worker turns, defer debris cleanup ([#130446](https://github.com/openclaw/openclaw/pull/130446)).
- Control UI: safer overlapping file saves ([#130468](https://github.com/openclaw/openclaw/pull/130468)); model discovery survives plugin activation ([#130481](https://github.com/openclaw/openclaw/pull/130481)); appearance prefs are per-profile ([#130340](https://github.com/openclaw/openclaw/pull/130340)).
- Also: audit decisions at the real execution boundary; configurable model-selection scopes.

Migration: none stated. npm: `openclaw@2026.9.1-beta.1`.

### [v2026.8.1-beta.3](https://github.com/openclaw/openclaw/releases/tag/v2026.8.1-beta.3) — 24 Aug 2026

Focus: **models + first-run + browser + lifecycle**.

- GPT-5.6 Sol / Terra / Luna / Ultra reasoning across OpenClaw and the Codex runtime.
- Control UI first-run continues verified model setup into Custodian and optional channel setup.
- Puppeteer-compatible CDP relay for paired Chrome sessions.
- Explicit external Gateway lifecycle supervision with restart handoff.
- Compact SQLite backup/restore.
- Shared durable ingress monitors for channel plugins.

Preceding 8.1-beta.2 (15 Aug) already added secret-egress host binding, channel ingress monitors, SQLite snapshots, macOS app profiles, and plugin-provenance warnings. The 8.x/9.x line is a reliability + operator-tooling train on top of 7.2-beta’s larger product surface (session rewind/branch, MCP Apps, Talk/meetings, Wear OS).

---

## 3. Project Progress

The 24h window closed **21 issues** and **151 PRs**. That is merge throughput of a large product org, not a typical open-source weekend.

**What is actually advancing (from merged/closed + ready maintainer PRs):**

| Theme | Evidence |
|---|---|
| Restart-safe runs & Gateway lifecycle | Shipped in 9.1-beta.1; follow-on PRs [#133178](https://github.com/openclaw/openclaw/pull/133178) (retry failed observer prep), [#130706](https://github.com/openclaw/openclaw/pull/130706) (multi-workspace Gateway stalls) |
| Channel delivery correctness | [#126818](https://github.com/openclaw/openclaw/pull/126818) release rejected webhooks after answering; [#132136](https://github.com/openclaw/openclaw/pull/132136) LINE multi-image as one turn; [#133103](https://github.com/openclaw/openclaw/pull/133103) empty HTML → Markdown junk; [#125190](https://github.com/openclaw/openclaw/pull/125190) Telegram plugin approvals stay in topics |
| Agent/Swarm lifecycle | [#133076](https://github.com/openclaw/openclaw/pull/133076) stop Swarm collectors with parent; [#129729](https://github.com/openclaw/openclaw/pull/129729) requester continuation after settle |
| Control UI / operator UX | [#133052](https://github.com/openclaw/openclaw/pull/133052) large attachment batches; [#123535](https://github.com/openclaw/openclaw/pull/123535) session catalog refresh storms (closed); [#133117](https://github.com/openclaw/openclaw/issues/133117) browser voice after mic loss (closed) |
| Plugins / install integrity | [#103398](https://github.com/openclaw/openclaw/pull/103398) reject hollow plugin installs |
| Observability / cost | [#132453](https://github.com/openclaw/openclaw/pull/132453) + [#132454](https://github.com/openclaw/openclaw/pull/132454) per-account provider usage |

Closed this window that matter for operators:

- [#93917](https://github.com/openclaw/openclaw/issues/93917) — `genericRepeat` circuit-breaker never fired when exec results varied slightly (crash-loop risk).
- [#119884](https://github.com/openclaw/openclaw/issues/119884) — session DB migration skipped `ANALYZE` → 15s session ops and 30–57s event-loop starvation on large stores.
- [#111358](https://github.com/openclaw/openclaw/issues/111358) — `sessions_send` silently delivered as webchat when the target had no channel binding.
- [#121958](https://github.com/openclaw/openclaw/issues/121958) — correction-release containers embedded the base version and showed a permanent “update available” banner.
- [#118667](https://github.com/openclaw/openclaw/issues/118667) — strict `ModelCompatSchema` rejected valid compat keys.

Net: the merge queue is biased toward **delivery, restart, session DB, and UI storm** fixes. Feature PRs (dashboard restyle, Teams multi-bot, per-account usage UI) are moving, but they sit behind reliability PRs in maintainer attention.

---

## 4. Community Hot Topics

Ranked by comment activity in the provided 24h set.

1. **[Issue #48788](https://github.com/openclaw/openclaw/issues/48788)** — 19 comments — centralized filename encoding for `Content-Disposition` across Feishu and every channel adapter (UTF-8 / Shift-JIS / EUC-KR / GB18030). Need: East-Asia filename correctness as a platform primitive, not a one-channel patch.

2. **[Issue #102175](https://github.com/openclaw/openclaw/issues/102175)** — 18 comments — embedded prompt cache breaks across room-event, policy, and Responses boundaries. Need: cache reuse that survives the real session lifecycle, not just happy-path consecutive turns. Security/auth-provider impact tagged.

3. **[Issue #87744](https://github.com/openclaw/openclaw/issues/87744)** — 17 comments, 4 👍 — Codex-backed Telegram turns time out waiting for `turn/completed` since 2026.5.27. Need: a terminal event that matches work already done. This is the canonical “agent worked, user got silence” ticket.

4. **[Issue #96834](https://github.com/openclaw/openclaw/issues/96834)** — 14 comments — WhatsApp 1:1 inbound image wedges the main lane ~3 minutes before processing. Need: multimodal ingress that does not starve the reply lane.

5. **[Issue #87561](https://github.com/openclaw/openclaw/issues/87561)** — 12 comments — define durable **final fallback delivery semantics** across channels. Need: if the runtime produced a sanitized fallback, the user must see *something*. This is the product-policy ticket behind several channel bugs.

6. **[Issue #98435](https://github.com/openclaw/openclaw/issues/98435)** — 10 comments — MCP loopback does not auto-reconnect after Gateway restart; `recovered=1` is misleading.

7. **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)** — 9 comments — unreaped hook/tool child processes → zombies and runtime degradation.

8. **[Issue #99586](https://github.com/openclaw/openclaw/issues/99586)** — 7 comments, 2 👍 — tool surface returns a blank body after gateway-touching ops until container restart.

**Underlying demand (one sentence):** operators want a Gateway that can restart, compact, authorize, and change tools *without* losing the user’s last message, the model’s cache, or the channel’s delivery receipt.

Highest-signal meta-ticket: **[#90974](https://github.com/openclaw/openclaw/issues/90974)** (“Stop shipping features. Start shipping a product that works.”) — only 3 comments / 2 👍, but it names the same cluster the high-comment bugs describe.

Ready-for-maintainer PRs that match those topics: [#130706](https://github.com/openclaw/openclaw/pull/130706), [#133076](https://github.com/openclaw/openclaw/pull/133076), [#133052](https://github.com/openclaw/openclaw/pull/133052), [#126818](https://github.com/openclaw/openclaw/pull/126818).

---

## 5. Bugs & Stability

Ranked by severity using labels (`impact:message-loss`, `impact:crash-loop`, `impact:session-state`, `impact:security`) plus comment heat. Many carry `clawsweeper:no-new-fix-pr` — reported, not yet claimed.

### P0 / P1 — message loss, wedges, crash loops

| Issue | Problem | Fix PR? |
|---|---|---|
| [#87744](https://github.com/openclaw/openclaw/issues/87744) P1 | Codex Telegram turns never emit `turn/completed` | no dedicated new fix PR flagged |
| [#96834](https://github.com/openclaw/openclaw/issues/96834) P1 | WhatsApp image wedges main lane ~3 min | needs live repro |
| [#87561](https://github.com/openclaw/openclaw/issues/87561) P1 | Fallback/error produced internally, user sees silence | product decision still open |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) P1 | Unreaped hook/tool children, zombies | needs-info |
| [#99586](https://github.com/openclaw/openclaw/issues/99586) P1 | Tool surface blank after gateway-touching ops | needs-info |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) P1 | Telegram durable update tombstoned before transport settles | source-repro |
| [#133058](https://github.com/openclaw/openclaw/issues/133058) P1 *filed today* | Succeeded-but-delivery-failed subagent tasks never surfaced | queueable-fix, shape clear |
| [#133170](https://github.com/openclaw/openclaw/issues/133170) P1 *today* | `chat.abort` drops streamed partial from transcript | queueable-fix |
| [#133166](https://github.com/openclaw/openclaw/issues/133166) P1 *today* | Retryable Telegram ingress retries forever, blocks shared lane | queueable-fix |
| [#42803](https://github.com/openclaw/openclaw/issues/42803) P1 | Feishu `/stop` `/new` `/status` no longer bypass queue (3.8 regression) | linked PR open |
| [#128637](https://github.com/openclaw/openclaw/issues/128637) P1 | Multi-agent `AgentSelectionRequiredError` on ambient ops | source-repro |
| [#122073](https://github.com/openclaw/openclaw/issues/122073) P1 | WhatsApp group `@LID` mentions never resolved | bulk-filed |
| [#111496](https://github.com/openclaw/openclaw/issues/111496) P1 | Workboard cleanup can delete declared local artifacts (`impact:data-loss`) | linked PR open |

### P1/P2 — session state / security / cache

| Issue | Problem | Notes |
|---|---|---|
| [#102175](https://github.com/openclaw/openclaw/issues/102175) P2 | Embedded prompt cache breaks across room-event / policy / Responses | `impact:security`, `impact:auth-provider`, needs security review |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) P2 | MCP loopback not re-handshaked after Gateway restart | `recovered=1` lies |
| [#88077](https://github.com/openclaw/openclaw/issues/88077) P2 | Active Memory recall uses full OpenClaw prompt envelope (~30k) | linked PR |
| [#125139](https://github.com/openclaw/openclaw/issues/125139) P2 | memory-wiki unsafe-local re-imports its own vault | linked PR |
| [#133051](https://github.com/openclaw/openclaw/issues/133051) P2 *today* | Telegram delivery succeeds; missing receipt marks Control UI session failed | — |
| [#133171](https://github.com/openclaw/openclaw/issues/133171) P2 *today* | Session observer re-bills utility model on unpersistable sessions | queueable-fix |

### P2 performance / UX that becomes stability

- [#84037](https://github.com/openclaw/openclaw/issues/84037) — Codex app-server steady-state CPU + helper-process overhead.
- [#125360](https://github.com/openclaw/openclaw/issues/125360) — Codex Computer Use polls `plugin/list` for 60s when plugins are disabled.
- [#125312](https://github.com/openclaw/openclaw/issues/125312) — `terminal read` dumps full buffer every poll; automations cannot wait/inspect in one call.
- [#128875](https://github.com/openclaw/openclaw/issues/128875) — WhatsApp blue ticks only after agent reply, not on receipt.

**Pattern:** new 2026-08-30 bugs ([#133058](https://github.com/openclaw/openclaw/issues/133058), [#133166](https://github.com/openclaw/openclaw/issues/133166), [#133170](https://github.com/openclaw/openclaw/issues/133170), [#133051](https://github.com/openclaw/openclaw/issues/133051)) are sharper and already tagged `fix-shape-clear` / `queueable-fix`. Older P1s from May–July still sit on `needs-maintainer-review` + `needs-product-decision`. Intake is faster than closure on the oldest delivery bugs.

---

## 6. Feature Requests & Roadmap Signals

VISION.md already ranks **security, bug fixes, setup reliability** above new surface area. Community requests this week mostly reinforce that, with a few product bets.

**Likely near-term (clear shape, or already in 8.1/9.1 betas):**

- Durable final-fallback delivery semantics — [#87561](https://github.com/openclaw/openclaw/issues/87561)
- Silence watchdog + delivery confirmation — [#47591](https://github.com/openclaw/openclaw/issues/47591)
- Telegram default outbound topic/thread binding — [#53890](https://github.com/openclaw/openclaw/issues/53890)
- Feishu mention rules split by topic vs group — [#76010](https://github.com/openclaw/openclaw/issues/76010)
- Telegram progress-line clipping — PR [#132530](https://github.com/openclaw/openclaw/pull/132530)
- Per-account provider usage in API + UI — PRs [#132453](https://github.com/openclaw/openclaw/pull/132453), [#132454](https://github.com/openclaw/openclaw/pull/132454)
- CDP / Browser Use as a first-class path — issue [#53763](https://github.com/openclaw/openclaw/issues/53763), docs PR [#124188](https://github.com/openclaw/openclaw/pull/124188); 8.1-beta.3 already added Puppeteer-compatible CDP relay
- Control UI dashboard modernization — [#111965](https://github.com/openclaw/openclaw/pull/111965)
- Teams multi-bot accounts — [#112811](https://github.com/openclaw/openclaw/pull/112811)
- Model request rate limiting — [#129366](https://github.com/openclaw/openclaw/issues/129366)
- WebChat conversation management / multi-AI collab — [#27526](https://github.com/openclaw/openclaw/issues/27526) (open since Feb, still P3)

**Predict next tagged version (9.1.x or 8.1 stable) will prioritize:** restart-safe turns (already in 9.1-beta.1), Swarm parent/child stop, attachment-batch UI, webhook connection release, Telegram receipt/approval/topic fixes, and per-account usage — not WebChat redesign or a bundled Chromium.

**Unlikely to land next** without a product decision: centralized multi-encoding filename util ([#48788](https://github.com/openclaw/openclaw/issues/48788)), global model rate limiter, “stop shipping features” scope freeze.

---

## 7. User Feedback Summary

**What people use OpenClaw for (inferred from tickets):** a always-on Gateway on a laptop or small server, talked to from Telegram / WhatsApp / Feishu / LINE, often with Codex as the coding runtime, plugins, cron/subagents, and a Control UI for ops. Multi-agent and multi-workspace deployments are no longer edge cases.

**Pain points, in user language:**

- “The model did the work; Telegram never got `turn/completed`.”
- “I sent an image on WhatsApp and waited three minutes before anything started.”
- “Gateway restarted, UI said recovered, Claude Code MCP was dead.”
- “After I patched config / restarted HA / SSH’d a guest, every tool returned a blank body.”
- “Feishu `/stop` sits behind the current run.”
- “My agent replies, but WhatsApp blue ticks only appear then — it looks like a bot.”
- “You keep adding Parallel search / Matrix voice / plugin packages. I need the agent to answer.” ([#90974](https://github.com/openclaw/openclaw/issues/90974))

**Satisfaction signals:**

- Contributors keep sending high-quality, source-repro PRs the same day as the bug (30 Aug cluster).
- East-Asia channel users (Feishu, LINE, Telegram topics, CJK filenames) are invested enough to design platform-level fixes, not just one-off patches.
- Beta uptake is real: tickets cite 2026.5.27, 2026.6.10, 2026.7.1, 2026.7.2-beta.7 specifically.

**Dissatisfaction is about trust, not missing features.** Delivery semantics, restart honesty, and lane fairness are the reputation risk.

---

## 8. Backlog Watch

These have been open long enough, or are labeled in a way that means they will not move without a maintainer/product owner.

**Need a product decision (not just a patch):**

- [#87561](https://github.com/openclaw/openclaw/issues/87561) — durable final fallback delivery (May 28, P1, 12 comments)
- [#48788](https://github.com/openclaw/openclaw/issues/48788) — centralized filename encoding (Mar 17, 19 comments)
- [#53890](https://github.com/openclaw/openclaw/issues/53890) — Telegram default outbound topic (Mar 24)
- [#76010](https://github.com/openclaw/openclaw/issues/76010) — Feishu mention split topic vs group (May 2)
- [#47591](https://github.com/openclaw/openclaw/issues/47591) — silence watchdog + delivery confirmation (Mar 15)
- [#53763](https://github.com/openclaw/openclaw/issues/53763) — bundled headless browser (Mar 24)
- [#90974](https://github.com/openclaw/openclaw/issues/90974) — “ship a product that works” (Jun 6)
- [#129366](https://github.com/openclaw/openclaw/issues/129366) — model rate limiting (Aug 25)

**Need maintainer review / security review:**

- [#102175](https://github.com/openclaw/openclaw/issues/102175) — prompt-cache boundary breaks (Jul 8, security tag)
- [#87744](https://github.com/openclaw/openclaw/issues/87744) — Telegram Codex timeout (May 28)
- [#96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp image lane wedge (Jun 25)
- [#42803](https://github.com/openclaw/openclaw/issues/42803) — Feishu command-bypass regression (Mar 11)
- [#84037](https://github.com/openclaw/openclaw/issues/84037) — Codex CPU overhead (May 19)

**Old platform bugs still open:**

- [#47273](https://github.com/openclaw/openclaw/issues/47273) — memory detection skipped on macOS (Mar 15)
- [#41966](https://github.com/openclaw/openclaw/issues/41966) — `MEDIA:` tokens inside markdown fences ignored (Mar 10)
- [#27526](https://github.com/openclaw/openclaw/issues/27526) — WebChat conversation management (Feb 26)

**Housekeeping that will bit-rot:**

- [#114414](https://github.com/openclaw/openclaw/issues/114414) — dated TODO sweep (doctor deprecations overdue since 2026-07-26)

**Large PRs waiting in the ready/proof queue** (risk of stalling the reliability train if they rot):

- [#130706](https://github.com/openclaw/openclaw/pull/130706) XL — Gateway stalls with multiple workspaces (P1, ready)
- [#133052](https://github.com/openclaw/openclaw/pull/133052) XL — large attachment batches (P1, ready; coordinates with unmerged [#133067](https://github.com/openclaw/openclaw/pull/133067) session-identity repair)
- [#133076](https://github.com/openclaw/openclaw/pull/133076) XL — stop Swarm collectors with parent (P1, ready)
- [#103398](https://github.com/openclaw/openclaw/pull/103398) XL — reject hollow plugin installs (P1, ready)
- [#126818](https://github.com/openclaw/openclaw/pull/126818) XL — release rejected webhook connections (P1, ready)
- [#132136](https://github.com/openclaw/openclaw/pull/132136) XL — LINE multi-image one turn (P1, waiting on author)
- [#112811](https://github.com/openclaw/openclaw/pull/112811) XL — Teams multi-bot (needs proof)
- [#115184](https://github.com/openclaw/openclaw/pull/115184) XL — ACP session recover on reset timeout (needs proof)

---

**Bottom line:** OpenClaw is one of the largest open-source personal-agent codebases by star count and by daily PR volume. The 8.1/9.1 betas are pointed at the right problem (restart, delivery, worker settlement). The risk is process, not ambition: 349 open PRs and a stack of May–July P1 delivery bugs labeled `needs-product-decision` will keep producing “the agent worked, I saw nothing” reports until fallback semantics and channel receipts are treated as a single contract, not per-adapter patches.

---

## Cross-Ecosystem Comparison

# Personal AI Assistant Ecosystem — Cross-Project Comparison  
**As of 2026-08-30** · Sources: community digest windows for OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The open-source personal-agent stack has left the “does the agent exist?” phase. The five projects in this window are all **always-on control planes**: a local or self-hosted gateway, model/runtime adapters, tool/MCP surfaces, and messaging channels (Telegram, WhatsApp, Feishu, Slack, Discord, LINE). Scale is no longer the differentiator — OpenClaw (~388k stars) and Hermes (~238k) already operate at industrial intake volume — **delivery honesty, restart semantics, and cost of a turn** are.

Across the set, 2026-08-30 looks like a **reliability-and-boundary week**, not a greenfield-feature week. OpenClaw and QwenPaw are still shipping betas against channel/session bugs; Hermes is rolling a patch tag plus a credential-vault security wave; IronClaw just cut stable 1.4.0 and immediately turned to tool-payload projection; ZeroClaw is in freeze-week close-out. The shared product promise is the same: *the work the model already did must reach the user, survive a restart, and not cost four times the underlying API.*

---

## 2. Activity Comparison

Figures are **last ~24 hours** unless noted. Health score is a 1–10 operator-readiness judgment from this window (shipping cadence × severity mix × whether the binding constraint is being worked).

| Project | 24h issues | 24h PRs | Latest release | Stars / forks (digest) | Health |
|---|---:|---:|---|---|---|
| **OpenClaw** | 148 touched (21 closed / 127 still active) | **500** touched (151 merged-or-closed / 349 still open) | `v2026.9.1-beta.1` (28 Aug); `v2026.8.1-beta.3` (24 Aug). Stable still 2026.7.x | ~388k / ~81.5k | **6.5** — unmatched throughput; P1 “worked / user saw silence” still open |
| **Hermes Agent** | 5 bumped, **0 closed** | 50 touched (4 merged / 46 open) | **v0.20.6** (`v2026.8.27`, 27 Aug) patch rollup; v0.21.0 promised as curated notes | ~238k / ~48.5k | **7.5** — tagged line for operators; Windows / WAF / pin contracts lag the feature drop |
| **IronClaw** | 14 touched (11 open) | 50 touched (**28 merged** / 22 open) | **1.4.0 stable** (27 Aug) from RC.1 (26 Aug); no migration | ~12.6k / ~1.5k | **8.0** — clean cut + measured traces; economic-loop risk still open |
| **QwenPaw** | 28 touched (12 closed / 16 open) | 50 touched (24 merged / 26 open) | Stable **v2.1.0** (13 Aug); five 2.2.0 / 2.1.1 **betas** this window | ~34.6k / ~3k | **6.5** — coherent 2.2 story (Hub + MCP 2026); packaged TLS and channel config integrity lag |
| **ZeroClaw** | 9 touched (2 closed / 7 open) | 50 touched (6 merged / 44 open) | **v0.8.4** (2 Aug); **v0.8.5 freeze due today** (~70% closed: 462/657). No tag this weekend | ~32.7k | **7.0** — freeze discipline holding; ZeroCode/local-runtime honesty still the user-visible gap |

**Read of the table.** OpenClaw is an order of magnitude larger on *intake* (500 PRs/day). IronClaw has the best *merge-to-intake* ratio in this slice (28/50). Hermes and QwenPaw are mid-size product orgs with a named next narrative release. ZeroClaw is deliberately not opening surface area.

---

## 3. OpenClaw's Position

**Advantages vs peers**

- **Default control plane for multi-channel personal/team use.** Gateway + Control UI + Codex runtime + Telegram/WhatsApp/Feishu/LINE/Teams/Discord + Swarm/subagents is the widest *shipped* surface in this set.
- **Community depth at industrial scale.** ~388k stars, ~81.5k forks, ClawSweeper triage, 151 PRs closed in a day — closer to a product org than a weekend OSS repo.
- **The 8.1 / 9.1 betas are aimed at the right problem** (restart-safe turns, worker settlement, config-write across watcher handoff, shared ingress monitors) rather than another channel logo.

**Technical approach vs peers**

- OpenClaw is a **Node-centered gateway** with a managed Codex runtime, plugin provenance, session DB, and per-channel adapters. Reliability work is *path-level* (turn completed events, receipt/tombstone, lane fairness).
- Hermes is a **Python/desktop + gateway** product emphasizing provider catalog, browser/vault trust boundaries, and `hermes update` as a daily ritual.
- IronClaw is a **Rust + WASM sandbox Agent OS**: privacy-first, persistent Docker sandboxes, notification inbox — now blocked on *context projection*, not channel count.
- QwenPaw is an **AgentScope 2.0 product** (CN channels, Hub multi-tenant, third-party harnesses including Codex/Qoder, Claude Code “coming soon”).
- ZeroClaw is a **policy-heavy runtime** (Landlock, audit chain, risk-labeled merges, ACP/ZeroCode) in freeze, with v0.9 reserved for identity isolation.

**Community size.** OpenClaw is ~1.6× Hermes and ~10–30× the three smaller projects by stars. That scale is also the risk: 349 open PRs and May–July P1s labeled `needs-product-decision` mean *process*, not ambition, is the constraint. IronClaw’s 12.6k-star community is core-heavy (measured production traces, almost no drive-by threads). QwenPaw and ZeroClaw sit in the same 30k-star band but pull different regions (CN team/Hub vs local-first + ZeroCode TUI).

**One-line position:** OpenClaw is the reference *gateway product*; it is not yet the reference *delivery contract*. Peers are either more disciplined on cost (IronClaw), more explicit on secrets (Hermes vault), more team-native (QwenPaw Hub), or more freeze-honest (ZeroClaw).

---

## 4. Shared Technical Focus Areas

Requirements that appear in **two or more** projects this week:

| Shared need | Who | Concrete form |
|---|---|---|
| **Restart / reconnect honesty** | OpenClaw, Hermes, QwenPaw | Gateway restart must keep admitted turns and MCP loopback (`recovered=1` must not lie); MCP Streamable-HTTP session recovery after remote server restart; updaters that pause gateways over a control socket instead of tree-killing them |
| **“Work happened, user saw silence”** | OpenClaw, QwenPaw, ZeroClaw | Missing `turn/completed`, fallback produced internally but not delivered, Feishu mute-after-first, ZeroCode pane stuck on `Processing` after dropped terminal events |
| **Channel as a product, not glue** | OpenClaw, QwenPaw, Hermes, ZeroClaw | WhatsApp image wedges the main lane; Feishu `/stop` no longer bypasses queue; Feishu config wipe; DingTalk stale streams after sleep/VPN; WhatsApp per-contact tool allowlists; webhook dispatch unification across 30+ transports |
| **Tool / MCP payload must not own the context window** | IronClaw, QwenPaw, Hermes | Unprojected Gmail MIME → 19.7s inference; GitHub `list_repos` → 64 calls / 519 KB; MCP dumps parked as workspace artifacts; lean-tail compression now default on Hermes |
| **Long-session prompt / cache correctness** | OpenClaw, Hermes, IronClaw | Embedded prompt cache breaks across room-event/policy/Responses; system prompt must rebuild at compaction commit; PinchBench full-thread replay ~4× tokens vs old shell |
| **Local / custom provider as production** | Hermes, ZeroClaw, QwenPaw | Ollama/GLM stop→length salvage loops; WAF 403 on SDK User-Agent; `local_small` 8k prompt ceiling; custom OpenAI-compatible discovery picker empty then fixed |
| **Windows / packaged-runtime last mile** | Hermes, QwenPaw, ZeroClaw, OpenClaw | Cloud Files hydration, Desktop/shim update skew, OpenSSL 3.0 + carrier DPI, PowerShell `PSModulePath` drop, Linux installer pinning Node 24 LTS |
| **Secret / trust boundaries** | Hermes, IronClaw, ZeroClaw, OpenClaw | Model-blind credential vault; sandbox egress proxy so secrets never enter guest code; Landlock `allowed_roots`; operator-tier skill taps; prompt-cache tagged `impact:security` |
| **Subagent / swarm lifecycle** | OpenClaw, IronClaw | Stop collectors with parent; orphan healing; succeeded-but-delivery-failed child tasks must surface |
| **Operator cost / usage telemetry** | OpenClaw, IronClaw, ZeroClaw | Per-account provider usage API+UI; tenant-scoped BI on filesystem only; cost-summary period math |

The meta-requirement, stated in OpenClaw #90974 and visible everywhere: **stop treating fallback, receipt, and restart as per-adapter patches. They are one contract.**

---

## 5. Differentiation Analysis

| Axis | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Primary user** | Power operator of a 24/7 multi-channel gateway (laptop or small server) | Daily-driver personal + family gateway; Desktop-first | Privacy-sensitive personal/work agent on local Docker | CN team + personal; Feishu/DingTalk/Telegram; soon Hub tenants | Local-first operator; ZeroCode/ACP as the day-long surface |
| **Feature bet this window** | Restart-safe turns, channel receipts, Swarm stop, usage UI | Encrypted vault fill the model never sees; real-profile browse; MCP catalog ≥50 | Notification inbox, background subagents, persistent sandboxes — then **projection** | Hub multi-tenant, MCP 2026-07-28 dual-stack, third-party harnesses (Codex/Qoder; Claude Code soon) | Freeze: ZeroCode hang, ACP session visibility, audit rotation, `local_small` budget |
| **Architecture** | JS/Node gateway + Codex managed runtime + plugins + session SQLite | Python agent + Desktop + gateway; pluggable terminals; OS keychain | Rust Agent OS, WASM sandbox, libSQL, Docker Exec | AgentScope 2.0; Tauri desktop / Docker; Console + Hub | Policy/runtime + ZeroCode TUI + ACP; Landlock; risk-gated merges |
| **Coding runtime stance** | Codex is first-class (and a source of Telegram timeout tickets) | Provider-picker (GLM-5.3-Flash, MiniMax, Ollama) | Extension tools (Gmail, GitHub) inside a bounded loop | Harness registry; Plan Mode / `/btw` requested as Claude Code parity | ACP Code sessions must be visible to session tools |
| **Security story** | Plugin provenance, secret-egress host binding, cache/auth review still open | Vault + per-contact WhatsApp toolsets + four-eyes kanban | Secrets stay out of sandbox via egress proxy; fail-closed output ownership | Hub isolation still being proven; TLS stack is the current hole | Audit-chain across rotation; two Core Team approvals for `risk:high` |
| **What “done” means this month** | User-visible reply after restart/compaction/auth | `hermes update` does not break memory/Windows/WAF | A two-email or list-repos turn costs API-scale tokens, not 20s / $10 | Hub launches without wiping Feishu config or poisoning Ark history | v0.8.5 ships the ready subset; identity isolation waits for v0.9 |

**Architecture punchline.** OpenClaw and QwenPaw optimize *surface area and channels*. Hermes optimizes *operator ritual and secret blindness*. IronClaw optimizes *sandbox + token economy*. ZeroClaw optimizes *policy and local-model honesty*. Those are four different products that happen to share Telegram.

---

## 6. Community Momentum & Maturity

**Tier A — industrial intake (must professionalize review)**  
**OpenClaw.** 148 issues + 500 PRs in 24 hours is product-org volume. Maturity is *uneven*: betas target the right failures, but oldest P1 delivery bugs still sit on `needs-product-decision`. Community energy is excellent; trust is the reputation risk.

**Tier B — rapid product iteration with a named next release**  
**Hermes** (v0.21.0 curated notes; 525 PRs rolled into 0.20.6 in six days) and **QwenPaw** (five tags in the window; Hub + MCP 2026 as the 2.2 narrative). Both have first-time contributors and same-day maintainer merges. Both accrue last-mile debt (pins, TLS, WAF UA, channel persistence) faster than release notes can absorb it.

**Tier C — smaller, sharper, shipping stable**  
**IronClaw.** 1.4.0 in two days from RC, zero migration, notification epic closed. Throughput is core-team dense rather than star-count dense. Maturity signal: they file traces with millisecond and token counts, not emoji.

**Tier D — freeze / stabilize**  
**ZeroClaw.** Intake frozen 4 Aug; 30 Aug is close-out, not discovery. Milestone language already says ship the ready subset and park the rest. That is more mature process than several larger repos.

**Stabilizing vs iterating**

- Stabilizing now: ZeroClaw (explicit), IronClaw (post-1.4.0 performance architecture), OpenClaw 8.x/9.x betas (reliability train on top of 7.2 surface).
- Still iterating product narrative: Hermes vault + long-session rebuild; QwenPaw Hub + harnesses.

---

## 7. Trend Signals

What this week’s tickets say about the industry, and what agent developers should take from it.

1. **Delivery is the product.** Users do not file “add Matrix voice.” They file “Codex finished; Telegram never got `turn/completed`.” A terminal event + a channel receipt + a durable fallback is now table stakes. Treat it as one contract across adapters.

2. **Restart is a first-class runtime event.** Gateway bounce, MCP remote restart, HA patch, SSH guest, compaction commit — all must re-handshake tools and keep the last user turn. `recovered=1` that leaves Claude-Code MCP dead is worse than a crash.

3. **Context is a scarce resource, not a log.** IronClaw’s 19.7s Gmail turn and 4× PinchBench regression, QwenPaw’s artifact-parking of huge MCP lines, Hermes defaulting lean-tail — the winning design is *projection + result-by-reference + bounded compaction*, not “dump the REST body into the prompt.”

4. **Local and proxied models are production.** WAF-blocked SDK User-Agents, Ollama stop-reason loops, `local_small` prompt ceilings, custom OpenAI-compatible pickers. Cloud-SDK assumptions are now bugs.

5. **Trust is moving from “the agent has my password” to “the model never sees the password.”** Hermes vault-fill, IronClaw sandbox egress proxy, ZeroClaw Landlock + audit chain, OpenClaw plugin provenance. Expect this to become a buyer question in 2026 H2.

6. **Team/multi-tenant is the next personal-assistant fork.** QwenPaw Hub, Hermes per-contact toolsets, OpenClaw multi-workspace Gateway stalls, ZeroClaw v0.9 per-principal isolation. Isolation bugs (wrong-agent routing, config wipe) will decide whether Hub is a product or extra login fields.

7. **Packaged runtimes lag the networks users sit on.** Node prereleases on RPM, OpenSSL 3.0 vs carrier DPI, Windows Cloud Files, WebView2, PowerShell module path. Install/update/doctor is part of the agent loop.

8. **Process is now a feature.** ClawSweeper, Hermes four-eyes kanban, ZeroClaw two-approver `risk:high` CI, IronClaw fail-closed output-ownership tests. At this PR volume, unlabeled intake *is* the outage.

**Value for developers building on or competing with this stack**

- Implement **turn lifecycle** (admit → checkpoint → terminalize → deliver → ack) before another channel.
- Put a **projection seam** on every vendor tool on day one; raw MIME/REST in context is a cost incident waiting to be measured.
- Make **update** pin-safe and restart-honest; that is how daily drivers stay daily drivers.
- If you target East Asia, filename encoding, Feishu/DingTalk/LINE topic semantics, and CJK delivery are platform primitives, not plugins.
- If you target coding agents, harness parity (plan-before-act, mid-turn steer, session tools that see what the UI sees) is how users compare you to Claude Code / Codex — not star count.

---

**Bottom line for decision-makers.** OpenClaw is the scale and surface-area leader and the right core reference — provided you budget for delivery-contract work that the May–July P1s show is still unfinished. Hermes is the strongest “I run this on my desktop every day” line if vault + Windows land. IronClaw is the one to watch for **token economics and sandbox architecture**. QwenPaw is the CN team-assistant bet, gated on Hub integrity and packaged TLS. ZeroClaw is the policy-and-local-runtime specialist, correctly refusing to add surface during freeze. The ecosystem’s 2026-08-30 consensus is unusually clear: **features are cheap; a turn that arrives, survives restart, and does not burn the context window is the scarce asset.**

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

I'll gather current Hermes Agent repo context and fill gaps in the provided snapshot so the digest is accurate.Fetching the full v0.20.6 notes and a few high-signal issues so the digest can rank bugs and roadmap signals accurately.# Hermes Agent Project Digest — 2026-08-30

Source window: GitHub activity supplied for the last 24 hours on [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent), plus the **v0.20.6 (v2026.8.27)** release that landed three days earlier. Repo scale at digest time: ~238k stars / ~48.5k forks.

---

## 1. This Week's Overview

Hermes Agent remains a high-velocity, maintainer-plus-community project: a **patch tag on Aug 27** rolled up **~525 merged PRs / ~1,313 commits / ~1,557 files** since v0.20.5 (Aug 21), while **Aug 30 itself is still a flood day** — 50 PRs touched in 24 hours (46 still open, 4 merged/closed) and 5 issues bumped, all still open.

That mix is healthy rather than chaotic: the tagged line is meant for Docker/hosted/fresh-install consumers, while `main` keeps absorbing Windows, Ollama/GLM, MCP auth, memory-provider, gateway, and security-boundary work. Project posture is “continuous rollup toward **v0.21.0**,” which is explicitly promised as the first *curated* notes covering everything since v0.20.0. No outage-class incident appears in the 24-hour issue set; the live pain is **platform/provider edge cases** (Windows Cloud Files, MCP OAuth ports, WAF User-Agent 403s, local vision routing) plus a large in-flight **credential-vault / trust-boundary** feature wave.

---

## 2. Releases

**v0.20.6 (tag `v2026.8.27`)** — released **27 Aug 2026** by teknium1.  
Link: [github.com/NousResearch/hermes-agent/releases/tag/v2026.8.27](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.27)

Positioning: **patch / rollup**, not a feature-major. It exists so downstream images and new installs stop floating on an unmarked `main`. Official notes defer the full curated changelog and contributor credits to **v0.21.0**; nothing in the window is described as dropped.

**Headline changes in the 0.20.5 → 0.20.6 window**

- Consent-gated **real-profile browsing** (default Chromium profile snapshot; Windows close-with-approval).
- Desktop Browser in its **own OS window**; managed **SSH remote-update** engine + fleet profile rail.
- Remote **MCP catalog ≥50** live-verified vendor servers (Cloudflare, Grafana Cloud, Better Stack, Railway, and others).
- TTL cache for `web_search` / `web_extract`; **lean-tail compression is now the default**.
- Multi-query `tool_search` with stemming.
- Opt-in **OS-keychain encryption** for stored secrets (cuts per-launch macOS Keychain prompts).
- Updaters **pause gateways over the control socket** instead of tree-killing them; image/package-managed installs refuse unsafe in-place updates (#91277 Phase 3).
- Cron durable-incident acks; Slack link-unfurl controls; shared Docker container identities; pluggable terminal backends.
- Picker additions: **GLM-5.3-Flash**, **MiniMax M3 free**, **MiniMax H3 Max** (video).

**Breaking changes:** none declared on the tag. Behavioral defaults that *will* surprise some operators:

- Lean-tail compression applies if `agent.compression.tail_mode` is unset.
- Keychain opt-in can rewrite stored secret blobs on first toggle (`connection.json`, `connections.json`, `native-oauth-tokens.json`).

**Migration / update**

```text
hermes update
# or preview first
hermes update --plan
hermes doctor
hermes gateway   # restart after upgrade
```

Fresh install still uses the official install script in the release body. Compare: [v2026.8.19...v2026.8.27](https://github.com/NousResearch/hermes-agent/compare/v2026.8.19...v2026.8.27).

Community reaction on the GitHub release is positive (thumbs-up / hooray / heart / rocket in the dozens), consistent with “keep shipping stable tags even when notes are deferred.”

---

## 3. Project Progress

**Last 24 hours (data window):** 50 PRs updated, **4 merged/closed**, **46 still open**. That is an inbound-review day, not a merge-party day.

**Closed in the snapshot**

- [#97013](https://github.com/NousResearch/hermes-agent/pull/97013) — `feat(desktop): manage the credential vault from Settings, with agent deep-link prefill` (**CLOSED**). Desktop Settings UI for the encrypted, model-blind vault; stacked on [#96988](https://github.com/NousResearch/hermes-agent/pull/96988). This is the visible productization of “agent can log into sites without ever seeing the password.”

**Features advancing on `main` (open, high-signal)**

| Theme | PR | What it moves |
|---|---|---|
| Secret-blind browser login | [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) | Encrypted local vault → opaque handle → server-side fill; CLI + browser + Desktop |
| Messaging trust | [#97934](https://github.com/NousResearch/hermes-agent/pull/97934) | WhatsApp `contact_toolsets` — per-contact tool allowlists instead of one platform-wide set |
| Messaging UX | [#98419](https://github.com/NousResearch/hermes-agent/pull/98419) | Telegram STT echoes collapsed into expandable HTML quotes |
| Messaging admin | [#98427](https://github.com/NousResearch/hermes-agent/pull/98427) | Discord private channel creation + permission overwrites |
| Long-session correctness | [#98426](https://github.com/NousResearch/hermes-agent/pull/98426) | System prompt **rebuilds at compaction commit** so prompt-side upgrades reach live sessions |
| API / goals | [#98309](https://github.com/NousResearch/hermes-agent/pull/98309) | Native persistent goals on `/v1/runs` + lifecycle events |
| Plugin UX | [#98197](https://github.com/NousResearch/hermes-agent/pull/98197) | Deferred plugin questions (SQLite queue, idle-session delivery) |
| Process / four-eyes | [#98305](https://github.com/NousResearch/hermes-agent/pull/98305) | Kanban review cannot be approved by the implementer profile |
| i18n | [#92336](https://github.com/NousResearch/hermes-agent/pull/92336) | Full Indonesian (`id`) locale for CLI, gateway, Desktop |
| Skills supply chain | [#98423](https://github.com/NousResearch/hermes-agent/pull/98423) | Operator-added skill taps get an `operator` trust tier |

**Fixes advancing (open)**

- Windows update/Desktop skew: [#97380](https://github.com/NousResearch/hermes-agent/pull/97380)
- Windows Cloud Files / OneDrive-iCloud search: [#98425](https://github.com/NousResearch/hermes-agent/pull/98425) (pairs with issue #97898)
- Ollama/GLM stop→length salvage loops: [#98410](https://github.com/NousResearch/hermes-agent/pull/98410), [#98415](https://github.com/NousResearch/hermes-agent/pull/98415)
- Terminal guard false positives on `&`: [#98429](https://github.com/NousResearch/hermes-agent/pull/98429)
- mem0 entity-id contract: [#97935](https://github.com/NousResearch/hermes-agent/pull/97935)
- Auxiliary fallback chain actually walks the full list: [#98422](https://github.com/NousResearch/hermes-agent/pull/98422)
- Dashboard Portal `client_id` missing now WARNs: [#98418](https://github.com/NousResearch/hermes-agent/pull/98418)

**Read of progress:** post-0.20.6 energy is concentrated on **(a)** making Windows and local-model backends less sharp-edged, **(b)** tightening security boundaries (vault, WhatsApp toolsets, skill taps, kanban four-eyes), and **(c)** making long-lived gateway/API sessions honor live config (compaction prompt rebuild, native goals). That is a maturity wave, not a greenfield-feature wave.

---

## 4. Community Hot Topics

Comment volume in this 24-hour slice is modest; “hot” here means **updated + discussed**, not viral reaction counts (👍 on all listed items is 0). Ranked by comments in the provided issue set:

1. **[#73997](https://github.com/NousResearch/hermes-agent/issues/73997)** — 6 comments, open since **2026-07-29**, bumped 2026-08-30.  
   `hermes mcp login` retry binds the same pinned `oauth.redirect_port` while the first listener still holds it → `Errno 98`, which **hides the real credential error**. Need: OAuth retry must allocate a fresh port or tear down the first listener; operators need the *actual* auth failure, not a bind collision.

2. **[#24293](https://github.com/NousResearch/hermes-agent/issues/24293)** — 6 comments, open since **2026-05-12**, `needs-decision`.  
   Custom providers behind Cloudflare (or similar WAF) 403 because the Anthropic/OpenAI **SDK User-Agent** is blocked. Need: configurable / spoofable / stripped UA for `custom_providers`. This is the longest-lived decision in the set and signals how many users run Hermes through **third-party relays / GLM proxies**.

3. **[#95855](https://github.com/NousResearch/hermes-agent/issues/95855)** — 4 comments, opened 2026-08-26.  
   After `hermes update`, Hindsight `local_embedded` memory dies: **fastmcp wants mcp 1.x, pyproject pins `mcp==2.0.0`** → `request_ctx` missing. Need: internally consistent dependency pins so `hermes update` is not a memory-provider lottery.

4. **[#97898](https://github.com/NousResearch/hermes-agent/issues/97898)** — 2 comments, opened 2026-08-29 on **v0.20.6 / Windows 11**.  
   Directory walks `stat` iCloud/OneDrive Cloud Files placeholders and **hydrate them from the cloud**. Companion PR [#98425](https://github.com/NousResearch/hermes-agent/pull/98425). Need: Windows file tools must treat sync roots as non-traversable by default.

5. **[#98428](https://github.com/NousResearch/hermes-agent/issues/98428)** — 0 comments, filed **today**.  
   Text-routed (non-vision) models re-call `vision_analyze` with a bare `path:` pseudo-scheme and fail. Need: vision tool must accept the cache path the router itself injected.

**Underlying demand pattern:** users are running Hermes as a **daily driver** (MCP logins, custom LLM proxies, Windows home directories, local Ollama/GLM, memory plugins). They are no longer asking “does the agent exist?” — they are asking “does the 50th integration survive an update and a WAF?”

---

## 5. Bugs & Stability

Ranked by severity / blast radius from the 24-hour issue set. All five issues are **still OPEN**; closed-issue count in the window is **0**.

| Rank | Issue | Sev | Symptom | Fix PR? |
|---|---|---|---|---|
| 1 | [#24293](https://github.com/NousResearch/hermes-agent/issues/24293) custom provider 403 via SDK UA | P2, `needs-decision` | All calls through Cloudflare-fronted relays fail | No (decision blocked) |
| 2 | [#73997](https://github.com/NousResearch/hermes-agent/issues/73997) MCP login port collision | P2 | Auth failures mis-reported as `Errno 98` | Not in snapshot |
| 3 | [#97898](https://github.com/NousResearch/hermes-agent/issues/97898) Windows Cloud Files hydration | P2, Windows | Agent file walks pull iCloud/OneDrive placeholders from cloud | **Yes — [#98425](https://github.com/NousResearch/hermes-agent/pull/98425)** |
| 4 | [#98428](https://github.com/NousResearch/hermes-agent/issues/98428) `vision_analyze` `path:` scheme | P2 | Local/text-routed vision path breaks | Not yet |
| 5 | [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) mcp 2.0 vs fastmcp 1.x pin | P3 | Hindsight memory “not available” after every update | Not in snapshot; related hygiene in [#97935](https://github.com/NousResearch/hermes-agent/pull/97935) (mem0 ids) |

**Related open fix PRs (not yet issues, but stability-critical):**

- [#97380](https://github.com/NousResearch/hermes-agent/pull/97380) — Windows shim hand-off can report success while **Desktop stays stale** (P1 on the PR).
- [#98410](https://github.com/NousResearch/hermes-agent/pull/98410) / [#98415](https://github.com/NousResearch/hermes-agent/pull/98415) — Ollama GLM `stop` rewritten to `length` → continuation loops; `:cloud` models wrongly classified as local GLM.
- [#98429](https://github.com/NousResearch/hermes-agent/pull/98429) — terminal guards block benign commands containing `&` (heredocs, etc.).
- [#98422](https://github.com/NousResearch/hermes-agent/pull/98422) — auxiliary fallback chain stops after the first constructible client (402s never reach later entries).

**Stability read:** no crash-loop of the core agent is in this slice. The risk profile is **Windows + local-model + plugin-dependency**. The P1 updater/Desktop skew PR is the item most worth merging before the next consumer tag.

---

## 6. Feature Requests & Roadmap Signals

Explicit “feature” PRs in the 24-hour set, treated as the live roadmap (v0.21.0 is the named next narrative release):

**Likely near-term (stacked, maintainer-touched, or closing a documented gap)**

1. **Credential vault end-to-end** — [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) still open; Desktop half already closed in [#97013](https://github.com/NousResearch/hermes-agent/pull/97013). Highest product signal of the week: “agent signs into sites from an encrypted vault the model never sees.”
2. **Compaction always rebuilds the system prompt** — [#98426](https://github.com/NousResearch/hermes-agent/pull/98426), labeled maintainer-directed (#95681 arc). Unblocks prompt improvements on weeks-old sessions.
3. **Native persistent goals on the API server** — [#98309](https://github.com/NousResearch/hermes-agent/pull/98309). Needed by hosted / OpenAI-compatible `/v1/runs` consumers.
4. **WhatsApp per-contact toolsets** — [#97934](https://github.com/NousResearch/hermes-agent/pull/97934). Security-boundary feature for gateway operators who must admit low-trust contacts.
5. **Operator-trusted skill taps** — [#98423](https://github.com/NousResearch/hermes-agent/pull/98423) (`needs-decision` but concrete).

**Possible next-tag, slightly further out**

- Discord private channels — [#98427](https://github.com/NousResearch/hermes-agent/pull/98427)
- Deferred plugin questions — [#98197](https://github.com/NousResearch/hermes-agent/pull/98197) (`needs-decision`)
- Indonesian locale — [#92336](https://github.com/NousResearch/hermes-agent/pull/92336) (i18n-only, open since Aug 22)
- Telegram STT quote collapse — [#98419](https://github.com/NousResearch/hermes-agent/pull/98419)
- Kanban four-eyes — [#98305](https://github.com/NousResearch/hermes-agent/pull/98305)

**Prediction:** v0.21.0 will package the 0.20.x rollup *story* (real-profile browse, MCP catalog, lean-tail, keychain, Desktop browser window) **plus** vault-fill and long-session prompt rebuild if those two land. i18n and per-platform messaging polish will ride along if review bandwidth exists; they are not the release’s reason to exist.

---

## 7. User Feedback Summary

The 24-hour corpus is bug reports and implementation PRs, not praise threads. Inferred pain and use cases:

**Pain points**

- **“Update broke my memory plugin.”** `#95855` — `hermes update` is trusted as a daily ritual; an inconsistent `mcp` pin violates that trust.
- **“My proxy is my real API.”** `#24293` — custom Cloudflare-fronted providers are first-class in user architecture, second-class in SDK assumptions.
- **“Windows home directories are not POSIX trees.”** `#97898` / `#97380` — iCloud/OneDrive placeholders and Desktop/shim update skew.
- **“Local / Ollama / GLM is production.”** `#98410`, `#98415`, `#98428` — stop-reason heuristics and vision path injection assume cloud-vision behavior.
- **“MCP login failed, but the error is a port bind.”** `#73997` — auth UX still leaks internals.

**Use cases visible in the PRs**

- Personal + family/gateway operator on WhatsApp/Telegram/Discord with **unequal trust** per contact.
- Desktop-first users who will not manage a vault from a terminal.
- Hosted API-server deployments that need **goals** and event streams, not only CLI sessions.
- Multi-profile / fleet Windows installs that must update Desktop and CLI together.
- Long-lived sessions that should pick up new system-prompt guidance after compaction.

**Satisfaction vs dissatisfaction**

- Satisfaction is implicit in volume: 50 PRs in a day and a 525-PR patch tag three days ago means contributors treat `main` as a living product.
- Dissatisfaction clusters on **compatibility contracts** (User-Agent, mcp pin, Windows Cloud Files, Ollama stop semantics) — i.e. the last mile after the 0.20.6 feature drop. Release reactions on v0.20.6 itself are net-positive.

---

## 8. Backlog Watch

Items that need a maintainer decision or have gone stale relative to their impact:

| Item | Age / state | Why it needs attention |
|---|---|---|
| [#24293](https://github.com/NousResearch/hermes-agent/issues/24293) WAF / SDK User-Agent 403 | Open **since 12 May 2026**, `needs-decision`, 6 comments, re-touched today | Oldest decision in the set. Blocks a common custom-provider deployment. Either allow UA override or document “unsupported behind WAF.” |
| [#73997](https://github.com/NousResearch/hermes-agent/issues/73997) MCP OAuth port collision | Open **since 29 Jul 2026**, 6 comments | Retry logic actively *masks* the real auth error. Relatively small code fix, high support-cost. |
| [#92336](https://github.com/NousResearch/hermes-agent/pull/92336) Indonesian locale | Open since **22 Aug**, i18n-only, no logic risk | Easy merge if the locale files pass review; otherwise it will bit-rot. |
| [#96988](https://github.com/NousResearch/hermes-agent/pull/96988) browser vault fill | Open; Desktop sibling already closed | Feature is half-landed. Leaving CLI/browser fill unmerged while Settings UI exists will fork the security story. |
| [#98197](https://github.com/NousResearch/hermes-agent/pull/98197) deferred plugin questions | `needs-decision` | Touches session state + message delivery. Needs an explicit yes/no on the SQLite queue design. |
| [#98423](https://github.com/NousResearch/hermes-agent/pull/98423) trust operator skill taps | `needs-decision` | Security-boundary change. Quarantine vs operator-tier is a policy call, not just a patch. |
| [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) mcp 1.x vs 2.0 pin | 4 days old but **regresses on every update** | Dependency SSOT issue; belongs in the next patch tag if Hindsight is a supported memory provider. |

---

**Health snapshot:** shipping cadence is excellent; tagged releases exist for operators; v0.21.0 is the acknowledged documentation debt. The next quality bar is not more features — it is **closing the May-era WAF decision, making `hermes update` pin-safe, and landing the Windows + vault PRs** so 0.20.6’s feature surface is actually usable on the platforms people already run.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

I'll gather the current IronClaw repo state, recent releases, and the hottest issues/PRs so the digest is accurate.Fetching full 1.4.0 notes and the most-commented issues next.# IronClaw Project Digest — 2026-08-30

**Repo:** [nearai/ironclaw](https://github.com/nearai/ironclaw) · Agent OS / personal AI assistant (Rust, WASM sandbox, privacy-first) · ~12.6k stars, ~1.5k forks · Apache-2.0 / MIT

---

## 1. This Week's Overview

IronClaw is in a post-1.4.0 stabilization sprint with unusually high core-team throughput. In the last 24 hours alone the tracker shows **14 issues touched** (11 still open) and **50 PRs updated** (22 open, 28 merged/closed), plus two tagged releases (`1.4.0-rc.1` on 2026-08-26 and stable **1.4.0** on 2026-08-27). Health looks strong on shipping cadence and CI discipline; the binding constraint is not contributor idle time but **token/latency waste from unprojected tool payloads and unbounded agent loops**. Production traces cited in issues (19.7s turns on two Gmail fetches; 64 tool calls / 3m01s to list GitHub repos; a 593-call / 70-minute runaway) show the same failure mode: raw REST/MIME bodies entering the model context without a projection or reference seam. 1.4.0 landed the durable notification inbox, background subagents, and persistent Docker sandboxes; the open queue is now performance architecture (context projection, result-by-reference, compaction bounds) plus lifecycle hooks and a persistent executor spike.

---

## 2. Releases

### [ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0) — 2026-08-27 (stable)

Promotion of `1.4.0-rc.1`. **81 commits** since `ironclaw-v1.3.0`. **No breaking changes. No migration from 1.3.0.** 1.2.x install state is accepted, so skipped-1.3 deployments can jump directly.

**Added**
- Durable per-user **notification inbox** (run outcomes + actionable gates; WebUI notification center so approvals/auth prompts survive a missed session).
- **Background subagents**: parent turns spawn children with their own delivery, activation provenance, autonomous-wake cap, and orphan healing.
- **Persistent per-user sandbox containers** on the local-Docker profile (Docker Exec; installs/state survive between commands). Railway preview remains ephemeral-per-command.
- Managed sandbox **egress proxy** with manifest-declared credential bindings so secrets never enter sandboxed code.
- Run-now for automations; exact run capability facts.
- Durable backend suggestions over the user’s no-approval, read-only tools, gated on connected extensions.
- Google Docs semantic editing tools; run timing evidence in downloadable conversation artifacts.
- Opt-in in-worker SSH in the runtime image.

**Fixed**
- Bounded structured finalization stalls; preserve OpenAI-compatible reasoning-only responses.
- Provider/auth failures reach the model as readable context.
- libSQL write-lane starvation no longer surfaces as unrelated tool failures.
- Telegram: workspace-bot pairing vs personal device linking; Slack: private unlinked-user connect nudge.
- Incremental compaction summary context preserved.

**Operator notes (not user-facing breaking):** `IRONCLAW_REBORN_SSH_PUBLIC_KEY` enables public-key SSH as user `agent` on container port 2222 (same uid 1000 as the runtime — treat the key as shell access). New knobs: `IRONCLAW_REBORN_SANDBOX_PROXY_IMAGE`, `IRONCLAW_SANDBOX_EXTRA_ALLOWED_DOMAINS`. Neither `IRONCLAW_REBORN_WORKSPACE_ROOT` nor `IRONCLAW_REBORN_HOME` may be `/`.

### [ironclaw-v1.4.0-rc.1](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0-rc.1) — 2026-08-26

Same feature scope as 1.4.0; first candidate covering the 81-commit window.

---

## 3. Project Progress

Closed/merged work in this window clusters around **notifications shipping**, **tool-loop hygiene**, **CI topology**, and **WebUI design debt**.

**Notifications (1.4.0 surface, issues now closed)**
- [#7873](https://github.com/nearai/ironclaw/issues/7873) / [#7899](https://github.com/nearai/ironclaw/pull/7899) — durable `RunFailed` inbox items for automation pre-run failures (config/input/setup), not transient errors.
- [#7875](https://github.com/nearai/ironclaw/issues/7875) / [#7901](https://github.com/nearai/ironclaw/pull/7901) — persist `AuthenticationRequired` gates **before** enrichment so an auth-backend outage cannot hide the recovery item.
- [#7874](https://github.com/nearai/ironclaw/issues/7874) — `RunBlocked` for resource limits, exhausted budgets, and policy blocks.

**Tool / inference correctness**
- [#7982](https://github.com/nearai/ironclaw/pull/7982) — `builtin.result_read` no longer sends the model after a budget it cannot reach (production thread retried `max_bytes: 400` five times).
- [#7965](https://github.com/nearai/ironclaw/pull/7965) — `tool_search` no longer ranks tools that share a single incidental BM25 term (false-positive “the tool exists”).
- [#7979](https://github.com/nearai/ironclaw/pull/7979) — fail-closed gate: every encoded/encrypted/binary/header/JSON-RPC output boundary must name an owner.

**CI / contributor platform**
- [#7980](https://github.com/nearai/ironclaw/pull/7980) — validate Cargo integration-group topology before tests run.
- [#7992](https://github.com/nearai/ironclaw/pull/7992) (open, XL) — one `cargo nextest` with a four-test concurrency ceiling for PR + merge-queue integration.

**WebUI design (long-running, closed this week)**
- [#5563](https://github.com/nearai/ironclaw/pull/5563) — design-system tokens + `/playground`.
- [#5084](https://github.com/nearai/ironclaw/pull/5084) — Automations page redesign against that system.

**Still in flight (likely 1.4.x / 1.5)**
- Loop terminator + interactive wall-clock cap — [#7977](https://github.com/nearai/ironclaw/pull/7977) (593 tool calls / 70 min production run after the old digest terminator was removed).
- Compaction input bound — [#7978](https://github.com/nearai/ironclaw/pull/7978).
- Shared post-run learning review router — [#7958](https://github.com/nearai/ironclaw/pull/7958).
- Tenant-scoped BI telemetry (filesystem-only, no extra DB driver) — [#7961](https://github.com/nearai/ironclaw/pull/7961).
- Companion/native client surface demo — [#7983](https://github.com/nearai/ironclaw/pull/7983) (explicitly not for merge).
- DX: macOS pre-push hook — [#7991](https://github.com/nearai/ironclaw/pull/7991); clearer `list_dir` / memory / tool-disclosure error kinds — [#7989](https://github.com/nearai/ironclaw/pull/7989), [#7985](https://github.com/nearai/ironclaw/pull/7985), [#7990](https://github.com/nearai/ironclaw/pull/7990).

---

## 4. Community Hot Topics

Comment volume is concentrated on a few core-authored performance issues rather than drive-by user threads. Underlying need: **stop paying inference for bytes the model did not ask for**.

| Item | Activity | Need |
|---|---|---|
| [#7891](https://github.com/nearai/ironclaw/issues/7891) `perf(extensions)`: unprojected MIME + 24 KiB head-slice | **10 comments**, updated 2026-08-28 | Two `gmail.get_message` calls (274–290 ms) produced a **19.7s turn / 19.2s inference** because **49,152 bytes of raw MIME headers** were pushed unasked. |
| [#7824](https://github.com/nearai/ironclaw/issues/7824) Context projection / Pi-style compaction | **5 comments**, updated 2026-08-29 | Full-thread replay on PinchBench: **227.7M input tokens / $10.31** vs old-shell **55.1M / $2.52**. Cost, not quality, is the regression. |
| [#7770](https://github.com/nearai/ironclaw/issues/7770) Epic: agent lifecycle hooks | **4 comments**, updated 2026-08-29 | after-turn / before-turn / compaction / tool-result seams so features become hook registrations instead of core edits. |
| [#7981](https://github.com/nearai/ironclaw/issues/7981) GitHub `list_repos` + `result_read` | **3 comments** | “list my github repos” → **64 tool calls, 3m01s**; answer was complete after call #1. Payload: **519,551 bytes / 98 repos × 81 raw REST fields**. Pair with [#7986](https://github.com/nearai/ironclaw/issues/7986). |
| [#7903](https://github.com/nearai/ironclaw/issues/7903) Persistent per-user sandboxed executor | **2 comments**, risk: high | Decision spike: keep the canonical loop on the trusted host vs move more of the executor into the sandbox so every new CLI does not need host plumbing. |

Related open PRs on the same theme: [#7930](https://github.com/nearai/ironclaw/issues/7930) (cite a prior tool result by reference instead of re-emitting it), [#7984](https://github.com/nearai/ironclaw/pull/7984) (size `tool_search` to the first-look envelope), [#7978](https://github.com/nearai/ironclaw/pull/7978) (bound summarizer input).

---

## 5. Bugs & Stability

Ranked by production impact. All are engineering-filed with measured traces; none look like unauthenticated crash reports from end users.

**P0 / high — unbounded cost or runaway loops**
1. **[#7891](https://github.com/nearai/ironclaw/issues/7891)** — unprojected Gmail MIME in prompt (~20s inference for two emails). Open. Same class as #7986/#7981.
2. **[#7981](https://github.com/nearai/ironclaw/issues/7981) + [#7986](https://github.com/nearai/ironclaw/issues/7986)** — `github.list_repos` ships 81 raw fields; bounded JSON view refuses to inline; model then issues 61 `result_read`s. Package already has an unused projection seam. Open.
3. **[#7977](https://github.com/nearai/ironclaw/pull/7977)** (fix in flight) — after PR #7531 removed the digest terminator, nothing ends a non-progressing default loop. Production: **593 calls / 70 minutes**. Fix: terminate on dominant repeated output + cap interactive wall clock.

**P1 — silent correctness / wasted tokens**
4. **[#7987](https://github.com/nearai/ironclaw/issues/7987)** — `flatten_top_level` rebuilds tool schemas from a whitelist and **silently drops every non-forbidden top-level constraint**. Providers never see author-written keywords. No warning, no test.
5. **[#7930](https://github.com/nearai/ironclaw/issues/7930)** — no “use prior result by reference”; models must re-emit large payloads as JSON arguments (serial output tokens).
6. **[#7982](https://github.com/nearai/ironclaw/pull/7982)** — **fixed**: `result_read` budget message pointed the model the wrong way.

**P2 — classification / DX (wrong failure kind, not data loss)**
7. Unresolvable tool name stamped as `InputEncode` — fix [#7990](https://github.com/nearai/ironclaw/pull/7990).
8. Missing memory document reported as malformed input — fix [#7985](https://github.com/nearai/ironclaw/pull/7985).
9. `list_dir` on a missing path does not name the path — fix [#7989](https://github.com/nearai/ironclaw/pull/7989).
10. macOS pre-push gate cannot complete, so developers bypass it — [#7991](https://github.com/nearai/ironclaw/pull/7991).

No user-facing crash/regression wave is visible in this 24h sample. Stability risk is **economic and latency**: loops that do not stop and tools that dump raw vendor payloads.

---

## 6. Feature Requests & Roadmap Signals

Likely **1.4.x patch** (already in PR or small, fail-closed):
- Loop terminator + wall-clock cap ([#7977](https://github.com/nearai/ironclaw/pull/7977)).
- Compaction cumulative-input bound ([#7978](https://github.com/nearai/ironclaw/pull/7978)).
- GitHub / Gmail / generic capability **projection** and `result_read` first-look sizing ([#7984](https://github.com/nearai/ironclaw/pull/7984), #7891, #7986).
- Tool-result-by-reference ([#7930](https://github.com/nearai/ironclaw/issues/7930)).
- Preserve and render **NEAR AI model modalities / capability tags** in discovery + WebUI ([#7969](https://github.com/nearai/ironclaw/issues/7969), [#7970](https://github.com/nearai/ironclaw/issues/7970), [#7971](https://github.com/nearai/ironclaw/issues/7971)).

Likely **1.5 / next minor** (epics and spikes):
- Agent lifecycle hooks epic ([#7770](https://github.com/nearai/ironclaw/issues/7770)) — the architectural way to add “when X, do Y” without editing the engine.
- Pi-style context projection + structured summaries + overflow recovery ([#7824](https://github.com/nearai/ironclaw/issues/7824)) — required if PinchBench token burn is to stay competitive.
- Persistent sandboxed executor behind the trusted host kernel ([#7903](https://github.com/nearai/ironclaw/issues/7903), risk: high).
- Shared learning review router ([#7958](https://github.com/nearai/ironclaw/pull/7958)).
- Scoped tenant BI telemetry ([#7961](https://github.com/nearai/ironclaw/pull/7961)) — privacy-bounded, `ScopedFilesystem` only.
- Native companion client (`/approvals/pending`, `/session/tokens`) — [#7983](https://github.com/nearai/ironclaw/pull/7983) is a demo branch, not merge.

---

## 7. User Feedback Summary

This slice is **almost entirely core/experienced contributors** (`henrypark133`, `serrrfirat`, `italic-jinxin`, `standardtoaster`) filing measured production traces, not forum-style satisfaction scores. Inferred pain from those traces:

**Pain**
- Everyday connected-app tasks (read two emails, list my repos) are **orders of magnitude more expensive than the underlying API**.
- The model cannot stop or recover when `result_read` / schema flattening / BM25 search lie to it.
- Long threads are replayed in full; PinchBench cost ~**4× tokens and ~4× dollars** versus an older shell baseline.
- After a terminator was removed to avoid false positives, a live run ran for **70 minutes**.
- Mac contributors cannot run the pre-push hook and disable it.

**Use cases in the traces**
- Gmail + GitHub as first-class extensions for a personal/work agent.
- Automations that must notify on durable failure / auth expiry / policy block (now in 1.4.0).
- Multi-channel (Slack/Telegram) pairing and WebUI model selection that should show vision vs text-only.
- Local-Docker persistent sandbox vs Railway ephemeral workers.

**Satisfaction signals**
- 1.4.0 shipped with **zero migration** and explicit 1.2.x install-state compatibility — operational friendliness.
- Design-system and Automations redesign PRs closed, suggesting WebUI v2 is leaving “spec in isolation” and entering product surfaces.
- Fail-closed CI and output-ownership tests indicate the project is treating extension/security boundaries as merge gates, consistent with the README security stance.

There is no public reaction count of note (👍 = 0 on the listed issues), so community heat is discussion depth, not emoji.

---

## 8. Backlog Watch

Items that need a maintainer decision or are large enough to stall if left as conversation-only:

1. **[#7824](https://github.com/nearai/ironclaw/issues/7824)** — context projection. Open since 2026-08-22; still the clearest cost-regression ticket. Compaction PR #7978 is a slice, not the Pi-style barrier.
2. **[#7770](https://github.com/nearai/ironclaw/issues/7770)** — lifecycle-hooks epic. Phased by design; without named phase owners it will accumulate “just edit core” PRs.
3. **[#7903](https://github.com/nearai/ironclaw/issues/7903)** — persistent sandboxed executor. High-risk architecture fork; needs an explicit go/no-go, not more comments.
4. **[#7891](https://github.com/nearai/ironclaw/issues/7891) / [#7986](https://github.com/nearai/ironclaw/issues/7986) / [#7981](https://github.com/nearai/ironclaw/issues/7981)** — three tickets, one bug class (unused projection seam + raw vendor payloads). Should be one owned workstream.
5. **[#7987](https://github.com/nearai/ironclaw/issues/7987)** — silent schema-constraint drop. Zero comments; easy to miss and hard to debug at a provider.
6. **[#7930](https://github.com/nearai/ironclaw/issues/7930)** — result-by-reference. P1 perf; no comments after filing.
7. **[#7983](https://github.com/nearai/ironclaw/pull/7983)** — companion client demo branch. Fine as preview; needs a follow-up product PR so it does not rot as the only native-client contract.
8. **[#7992](https://github.com/nearai/ironclaw/pull/7992)** — XL CI unification, opened **today**. High leverage for merge-queue reliability; should not sit behind feature PRs.

---

**Health snapshot:** shipping velocity and release hygiene are excellent (1.4.0 in two days from RC, no migration tax, notification epic closed). The project’s current risk is not inactivity or community collapse; it is **whether 1.4.x lands projection + loop bounds before production traces keep showing multi-minute, multi-dollar turns for single-list and two-email tasks.**

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

I'll pull the latest repo details and fill gaps in the provided snapshot so the digest is accurate.Fetching the latest release notes and the Hub discussion so the digest stays current.# QwenPaw Project Digest — 2026-08-30

**Repo:** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) · Personal AI assistant (local/cloud) on AgentScope 2.0  
**Scale:** ~34.6k stars / ~3k forks · stable **v2.1.0** (2026-08-13) · active line **v2.2.0-beta.1–3**  
**Window:** issues/PRs/releases updated in the last ~24 hours (plus adjacent beta-cycle context)

---

## 1. This Week's Overview

QwenPaw is in a high-velocity pre-2.2.0 cycle. In the last day alone the repo saw **28 issue updates** (16 still open, 12 closed), **50 PR updates** (26 open, 24 merged/closed), and **five tagged releases**. That is release-train throughput, not a maintenance lull.

The 2.2.0 betas are landing two strategic themes at once: **protocol modernization** (MCP Streamable-HTTP dual-stack + session recovery) and **team-scale productization** (self-hosted multi-user Hub, third-party agent harnesses). Maintainers are shipping daily, with automated “release duty” install-verification issues on each beta.

Health is mixed but constructive. Core loops (MCP reconnect, custom-provider discovery, DingTalk streams, context overflow) are getting real fixes. At the same time, channel config loss, TLS/carrier DPI on Desktop+Docker, Feishu delivery, and Console agent-routing bugs show the product is stretching across too many surfaces at once. Community energy is high and first-time contributors are present; the risk is stability debt accumulating faster than the Hub/roadmap narrative can absorb it.

---

## 2. Releases

Stable **Latest** remains **[v2.1.0](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0)** (13 Aug). The five new tags in this window are all **pre-releases**. No official breaking-change or migration guide is attached to the beta notes.

### v2.2.0-beta.3 — 28 Aug ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.3))
- **feat(mcp)** Streamable-HTTP dual-protocol client with handshake-era fallback — [#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330)
- **fix(mcp)** abort hung session RPCs on teardown; recover stale `list_tools` — [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329)
- **fix(dingtalk)** stale stream detection + bounded SDK requests — [#7381](https://github.com/agentscope-ai/QwenPaw/pull/7381)
- **fix(providers)** migrate discovered model output limits — [#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386)
- **fix(providers)** restore model discovery for custom OpenAI-compatible providers — [#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320)

This is the MCP 2026-07-28 (stateless) compatibility drop with a one-shot fallback to 2025 handshake clients. Operators on remote `streamable_http` MCP should retest reconnect-after-server-restart; that is the explicit target of [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329) / closed [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524).

### v2.2.0-beta.2 — 28 Aug ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.2))
- Workspace startup-failure cleanup made cancellation-safe — [#7194](https://github.com/agentscope-ai/QwenPaw/pull/7194)
- E2E console coverage: 23 targeted cases + extended assertions — [#7327](https://github.com/agentscope-ai/QwenPaw/pull/7327)
- Adjacent notes in the same train: prompt-cache observability, auto-fold assistant messages, tool-stop cancellation, mobile composer, cron calendar, file-guard hardening.

### v2.2.0-beta.1 — 27 Aug ([release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.1))
- DashScope tool-schema sanitization for strict models — [#7284](https://github.com/agentscope-ai/QwenPaw/pull/7284)
- Docs: scroll context manager blog — [#7300](https://github.com/agentscope-ai/QwenPaw/pull/7300)
- Broader train: Volcengine Agent Plan & MiMo V2.5 providers, image resize-by-pixel-limit, DingTalk shared group-session context.

### v2.1.1-beta.3 / v2.1.1-beta.2 (25 / 24 Aug)
Patch train on the 2.1 line: pin `@agentscope-ai/chat` 1.1.72 ([#7257](https://github.com/agentscope-ai/QwenPaw/pull/7257)), artifacts on assistant cards ([#7161](https://github.com/agentscope-ai/QwenPaw/pull/7161)), OpenAI Responses API video tool-results ([#7061](https://github.com/agentscope-ai/QwenPaw/pull/7061)), unread-session indicators, Hub already present from earlier 2.1.1 work.

**Migration notes (inferred, not official):**
- MCP clients: prefer 2026-07-28 Streamable-HTTP; legacy handshake still works once.
- Custom OpenAI-compatible providers: model lists should now persist after discovery ([#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320)); report if picker is still empty.
- `discovered_models.max_tokens` is migrated; encrypted provider snapshots should still load ([#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386)).
- Desktop/Docker still ship a Python 3.11 / OpenSSL 3.0.x TLS stack — see Bugs.

---

## 3. Project Progress

Closed/merged work in this window clusters into five tracks.

**MCP reliability (highest merge density)**  
[#7330](https://github.com/agentscope-ai/QwenPaw/pull/7330) dual-protocol client and [#7329](https://github.com/agentscope-ai/QwenPaw/pull/7329) hung-RPC abort close the loop on [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) and the protocol question in [#6761](https://github.com/agentscope-ai/QwenPaw/issues/6761). This is the most complete feature+fix pair of the week.

**Provider correctness**  
[#7320](https://github.com/agentscope-ai/QwenPaw/pull/7320) fixes “discovery succeeds, picker stays empty” ([#7305](https://github.com/agentscope-ai/QwenPaw/issues/7305)). [#7386](https://github.com/agentscope-ai/QwenPaw/pull/7386) migrates output limits without dropping encrypted credentials. [#7284](https://github.com/agentscope-ai/QwenPaw/pull/7284) sanitizes DashScope tool schemas. [#7388](https://github.com/agentscope-ai/QwenPaw/pull/7388) sends ACP limits as `max_completion_tokens`.

**Context / tool-result overflow**  
[#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331) bounds oversized single-line tool results, parks the full payload as a workspace artifact, and keeps recovery metadata. Directly answers enterprise MCP dumps overflowing the model ([#7288](https://github.com/agentscope-ai/QwenPaw/issues/7288)) and the older shell-truncation request ([#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512)).

**Channels**  
[#7381](https://github.com/agentscope-ai/QwenPaw/pull/7381) treats DingTalk Stream sockets that look alive after sleep/VPN as dead. Feishu “first message works, later silent” ([#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757)) is marked closed after a long thread (15 comments) — treat as fixed on current builds until the new config-wipe report ([#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408)) is triaged.

**Console / desktop / test infra**  
Artifacts on response cards, e2e console coverage, workspace cleanup cancellation-safety, WebView2 crash [#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427) and ReMe editable-install leak [#6124](https://github.com/agentscope-ai/QwenPaw/issues/6124) closed. Chrome tab lifetime [#6770](https://github.com/agentscope-ai/QwenPaw/issues/6770) also closed.

**Still open and moving (not merged):** chat scroll lock [#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356), tool-call visibility toggle [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357), chat history virtualization [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361), MCP tool-call timeout [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874), PowerContext memory backend [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080), scoped embedding reindex [#7133](https://github.com/agentscope-ai/QwenPaw/pull/7133), dedicated fallback-model settings [#7392](https://github.com/agentscope-ai/QwenPaw/pull/7392), Windows ACP bootstrap stall [#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401).

---

## 4. Community Hot Topics

Ranked by comment volume in the provided snapshot.

| Item | Comments | Why it is hot |
|---|---|---|
| [\#5757 Feishu stops replying after first message](https://github.com/agentscope-ai/QwenPaw/issues/5757) | 15 | Channel is a primary CN surface; silent-after-ack is trust-breaking. Now closed. |
| [\#7318 Hub multi-tenant — what next?](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 14 | Official roadmap thread. Hub is the answer to years of multi-user asks ([#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324) and related). |
| [\#7298 OpenSSL 3.0 / Python 3.11 TLS + carrier DPI](https://github.com/agentscope-ai/QwenPaw/issues/7298) | 9 | Desktop has no workaround; Docker same stack. Blocks users on inspected mobile/carrier networks. |
| [\#6524 MCP session dead after remote restart](https://github.com/agentscope-ai/QwenPaw/issues/6524) | 6 | Now addressed in beta.3. Pattern: remote tools are production-critical, reconnect was not. |
| [\#6770 / \#6512 Chrome tab lifetime & huge shell output](https://github.com/agentscope-ai/QwenPaw/issues/6770) · [\#6512](https://github.com/agentscope-ai/QwenPaw/issues/6512) | 4 each | Agent-as-analyst: long browser sessions and multi-10k-char tool output. |

**Underlying needs**
1. **Team, not just personal** — isolation, admin-managed skills, allowlists (Telegram GUI [#7389](https://github.com/agentscope-ai/QwenPaw/issues/7389)).
2. **Agent harness parity with Claude Code / Codex** — Plan Mode back ([#7405](https://github.com/agentscope-ai/QwenPaw/issues/7405)), `/btw` side questions ([#7398](https://github.com/agentscope-ai/QwenPaw/issues/7398)), mid-turn steer ([#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775)), Claude Code harness status ([#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395), [#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)).
3. **Channel + TLS as product, not glue** — Feishu/DingTalk/Telegram must survive restarts, sleep, DPI, and config writes.
4. **Context as a first-class resource** — scroll compaction vs giant MCP/shell payloads; users want inspectability without blowing the window.

---

## 5. Bugs & Stability

Severity is operational impact, not emoji count.

### P0 — production stop / data-path poison
- **[\#7408](https://github.com/agentscope-ai/QwenPaw/issues/7408)** Feishu channel config wiped (`enabled=false`, empty `app_id`) → cron `KeyError('channel not found: feishu')`. Open, created today. No linked fix PR in the snapshot. Highest operational risk on CN deployments.
- **[\#7402](https://github.com/agentscope-ai/QwenPaw/issues/7402)** Empty assistant `output_text` persisted in history → Ark Responses API 400 on every later turn. One bad message poisons the session. Open.
- **[\#7301](https://github.com/agentscope-ai/QwenPaw/issues/7301)** MCP legacy migration leaves empty-env clients with a dangling credential ref → `CredentialNotFoundError` on every new session. Open.

### P1 — install / network / desktop unusable
- **[\#7298](https://github.com/agentscope-ai/QwenPaw/issues/7298)** Desktop + official Docker ship OpenSSL 3.0.x; carrier DPI resets TLS. Desktop has no user workaround. Open, 9 comments.
- **[\#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)** Windows ACP agent stalls for minutes during workspace bootstrap (`bootstrap_plugins()` on the event loop). Open PR exists.
- **[\#6427](https://github.com/agentscope-ai/QwenPaw/issues/6427)** WebView2 renderer crash ~7s after start on v2.0.0+post.4 (`msedge.dll`, 0x80000003). Closed — treat as fixed unless it reappears on 2.2 betas.

### P1 — agent correctness
- **[\#7407](https://github.com/agentscope-ai/QwenPaw/issues/7407)** Console messages silently land on the wrong agent. Open, filed today.
- **[\#7397](https://github.com/agentscope-ai/QwenPaw/issues/7397)** Browser SDK opens a new tab-group on every `present()`/`open()`; pages cannot share a group. Open on 2.2.0b3.
- **[\#7288](https://github.com/agentscope-ai/QwenPaw/issues/7288)** Large MCP results bypass scroll compaction and overflow context. Closed; mitigated by [#7331](https://github.com/agentscope-ai/QwenPaw/pull/7331).

### P2 — closed or contained
- [#5757](https://github.com/agentscope-ai/QwenPaw/issues/5757) Feishu no-reply, [#6524](https://github.com/agentscope-ai/QwenPaw/issues/6524) MCP reconnect, [#6124](https://github.com/agentscope-ai/QwenPaw/issues/6124) ReMe 48GB leak on editable install, [#7305](https://github.com/agentscope-ai/QwenPaw/issues/7305) custom-provider picker — all closed, with matching PRs where noted.
- [#7400](https://github.com/agentscope-ai/QwenPaw/issues/7400) invalid (“搞错”).
- [#7399](https://github.com/agentscope-ai/QwenPaw/issues/7399) `daily_users` “UTC” is naive local time by AgentScope `Msg` design, not a clock bug.

---

## 6. Feature Requests & Roadmap Signals

**Committed in 2.2.0 messaging**
- **QwenPaw Hub (multi-tenant / self-hosted multi-user)** — announced for 2.2.0; discussion at [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318). Code already landed earlier via Hub PR [#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112) (cited on the 2.1.1/2.2 train). Expect polish, not a greenfield start.
- **MCP 2026-07-28** — shipped in beta.3 with fallback; likely default in 2.2.0 final.
- **Third-party harnesses** — Codex and Qoder live in console; **Claude Code is explicitly “Coming soon”** (`harnesses/registry.py`, `coming_soon=True`). Two duplicate status threads: [#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395) (closed), [#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396) (open). High probability for 2.2.0 or an immediate point release if the harness framework is already generic.

**Likely next if maintainers keep matching Claude Code UX**
- Plan Mode restored as a visible plan-before-act surface — [#7405](https://github.com/agentscope-ai/QwenPaw/issues/7405)
- `/btw` side-question that does not consume scroll/history — [#7398](https://github.com/agentscope-ai/QwenPaw/issues/7398)
- Mid-execution steer / attach — [#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775) (open since March, “good first issue”, only 2 comments this week)

**Console UX already in review (merge-ready if tests pass)**
- Scroll lock [#7356](https://github.com/agentscope-ai/QwenPaw/pull/7356), hide tool cards [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357), virtualized long transcripts [#7361](https://github.com/agentscope-ai/QwenPaw/pull/7361), fallback-model settings page [#7392](https://github.com/agentscope-ai/QwenPaw/pull/7392), `card_auto_layout` in DingTalk console settings [#7404](https://github.com/agentscope-ai/QwenPaw/issues/7404)

**Platform completeness**
- Official theming (accent/font/spacing) — [#7406](https://github.com/agentscope-ai/QwenPaw/issues/7406)
- Telegram allowlist fields in Desktop GUI — [#7389](https://github.com/agentscope-ai/QwenPaw/issues/7389)
- Configurable MCP `tool_call_timeout` — [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)
- Optional PowerContext long-term memory — [#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)
- Pixel-limit reject for oversized images — [#7220](https://github.com/agentscope-ai/QwenPaw/pull/7220)

Prediction: 2.2.0 final will market **Hub + MCP 2026 + harnesses**. Console ergonomics and Claude Code parity are the community tax that will decide whether Hub feels like a product or a preview.

---

## 7. User Feedback Summary

**Pain**
- Channels are the daily driver and the weakest reliability story: Feishu mute, Feishu config clobber, DingTalk stale sockets, Telegram access-control missing from GUI, cron delivery assuming a channel that just vanished.
- Packaged runtimes (Tauri desktop, bookworm Docker, Python 3.11 TLS) lag the networks users actually sit on.
- Agent control is still “launch and hope”: users want a visible plan, a way to nudge mid-turn, and a side channel that does not pollute memory.
- Power users (ops analytics, multi-stock reports, bulk logs) hit hard limits: truncated shell, MCP payloads that skip compaction, empty Ark text blocks that permanently break a thread.
- Multi-agent console routing and Browser tab-groups leak isolation — fatal once Hub invites more than one persona/user.

**Use cases visible in tickets**
- Team assistant on Feishu / DingTalk / Telegram with cron jobs.
- Enterprise MCP over telemetry and reports.
- Custom OpenAI-compatible / Volcengine Ark / DashScope / Aliyun Coding Plan model mixes.
- Desktop-first personal install on Windows + WebView2.
- Coding-agent workflow that people compare line-by-line with Claude Code and Codex.

**Satisfaction**
- Volume of first-time-contributor PRs and same-day maintainer merges says the project feels approachable.
- Users treat Hub and third-party harnesses as real, not vapor — they file follow-ups instead of abandoning the thread.
- Closed long-running bugs (Feishu silence, MCP restart, provider discovery, WebView2, ReMe leak) are being retired rather than ignored.

**Dissatisfaction**
- Beta cadence is faster than packaged TLS, channel persistence, and session-history hygiene. “Works in the PR, breaks in Docker/Desktop/Feishu” is the recurring pattern.
- Duplicate Claude Code questions ([#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395)/[#7396](https://github.com/agentscope-ai/QwenPaw/issues/7396)) show the public roadmap is not visible enough.

---

## 8. Backlog Watch

Needs a maintainer reply or a linked PR; several are already old relative to the ship clock.

1. **[\#1775 Steer / message-attach mid-run](https://github.com/agentscope-ai/QwenPaw/issues/1775)** — opened 2026-03-18, labeled good first issue, still open. Direct competitor feature. Updated this week but not owned.
2. **[\#7298 TLS / OpenSSL 3.0 on Desktop+Docker](https://github.com/agentscope-ai/QwenPaw/issues/7298)** — no fix PR in the snapshot; cannot be papered over in release notes.
3. **[\#7408 Feishu config wiped](https://github.com/agentscope-ai/QwenPaw/issues/7408)** and **[\#7407 wrong-agent message drift](https://github.com/agentscope-ai/QwenPaw/issues/7407)** — both filed 2026-08-30; should be same-day triage given Hub’s multi-tenant claim.
4. **[\#7301 dangling MCP credential after migration](https://github.com/agentscope-ai/QwenPaw/issues/7301)** — upgrade footgun; every new session fails.
5. **[\#7402 empty Ark `output_text` poisons history](https://github.com/agentscope-ai/QwenPaw/issues/7402)** — one-line persistence guard would stop a class of 400s.
6. **[\#7396 Claude Code harness status](https://github.com/agentscope-ai/QwenPaw/issues/7396)** — give a dated answer so [#7395](https://github.com/agentscope-ai/QwenPaw/issues/7395) does not keep cloning.
7. **[\#7080 PowerContext memory](https://github.com/agentscope-ai/QwenPaw/pull/7080)** and **[\#7133 explicit embedding reindex](https://github.com/agentscope-ai/QwenPaw/pull/7133)** — memory backends are Hub-adjacent; leaving them “Under Review” while Hub is announced creates a capability gap.
8. **[\#6874 MCP tool_call_timeout](https://github.com/agentscope-ai/QwenPaw/pull/6874)** — open since 10 Aug, still Under Review; pairs with this week’s hung-RPC work.
9. **[\#7361 chat virtualization](https://github.com/agentscope-ai/QwenPaw/pull/7361)** — backend pagination already exists; frontend is the freeze users feel.
10. Docs hygiene: **[\#7391](https://github.com/agentscope-ai/QwenPaw/pull/7391)** documents a non-existent `QWENPAW_MEMORY_COMPACT_THRESHOLD`. Small, should not survive into 2.2.0 final.

---

**Health snapshot:** ship velocity and contributor breadth are strong; 2.2.0 has a coherent story (Hub, modern MCP, external harnesses). The constraint is not ideas — it is packaged-runtime TLS, channel config integrity, and session-history invariants. Those three decide whether Hub launches as a team product or as another personal-assistant beta with extra login fields.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

I'll gather current ZeroClaw repo context so the digest matches today's activity rather than only the snapshot.Fetching releases and a few high-signal issues so the digest can separate freeze-week stabilization from open work.# ZeroClaw Project Digest — 2026-08-30

Source window: last 24 hours on [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw). Snapshot: **9 issues updated** (7 open / 2 closed), **50 PRs updated** (44 open / 6 merged or closed), **0 new releases**. Current published line remains **v0.8.4**. The **v0.8.5** stabilization milestone is due today (~70% closed: 462 / 657).

---

## 1. This Week's Overview

ZeroClaw is in a **freeze-week stabilization sprint**, not a feature-ship week. Intake for v0.8.5 froze on 4 August; the remaining queue is bugs, regressions, security, CI/policy, tests, docs, and packaging. Activity on 30 August is unusually dense for a freeze: 50 PR updates in 24 hours, almost all against `master`, with maintainer **Audacity88** driving a large same-day batch (risk-approval CI, `local_small` prompt budget, ACP session visibility, ZeroCode “Processing” hang, memory snapshot hydration, audit-log rotation, PowerShell module path, cost-summary periods). That volume is a **healthy close-out signal**, not a chaotic intake spike: labels cluster on `risk:medium`/`risk:high`, `status:in-progress`, `zerocode`, `runtime`, `channel:core`, and `domain:security`. The project is still large and operationally hot (~32.7k stars, last push within hours), but the product posture is “land the ready subset and move unfinished work,” not “open new surface area.”

No tagged cut landed today. If a final August weekly cut ships, it will be assembled from the ready freeze subset rather than from waiting for every open v0.8.5 item.

---

## 2. Releases

**No new GitHub releases on 2026-08-29 or 2026-08-30.**

Latest published release remains **[v0.8.4](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.4)** (2 August 2026): maintenance/hardening after the v0.8.3 SOP/WASM/desktop wave. Official site still lists v0.8.4. The due-today **[v0.8.5 milestone](https://github.com/zeroclaw-labs/zeroclaw/milestone)** is a finite non-breaking stabilization line; unfinished work is expected to move to Parking Lot or **[v0.9.0](https://github.com/zeroclaw-labs/zeroclaw/milestones)** (authn/authz, per-principal isolation, unauthenticated-WSS closure).

---

## 3. Project Progress

The 24-hour closed set is small but aligned with freeze goals.

**Closed issues**
- [#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001) — Provider turn failures no longer supposed to hide cause-specific diagnostics under a generic `All model_providers/models failed` retry envelope (S2, `provider:reliable`). Closed 2026-08-30.
- [#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086) — ZeroCode Logs pane text made selectable/copyable. Closed 2026-08-30.

**Six PRs merged or closed** in the window (titles not in the provided top-20 open list). The open PR set shows what is *advancing* even if not yet merged:

| Theme | Evidence | Link |
|---|---|---|
| Release governance | Report-only risk classifier + two Core Team approvals for `risk:high` / `domain:security` | [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461) implements tracker [#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185) |
| Local-first runtime | Compact `local_small` profile, 8k system-prompt ceiling, compact skill metadata | [#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465) → [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) |
| ACP / Code sessions | Session tools get an alias-scoped view of owned Code sessions | [#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468) → [#10292](https://github.com/zeroclaw-labs/zeroclaw/issues/10292) |
| ZeroCode TUI stability | `session/prompt` used as a completion fence so dropped terminal events cannot leave `Processing` | [#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) → [#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302) |
| Memory integrity | Snapshot export fails closed on undecodable SQLite rows; cold-boot hydration is transactional | [#10469](https://github.com/zeroclaw-labs/zeroclaw/pull/10469) |
| Audit / security | Preserve audit chain across log rotation (stacked, `risk:high`) | [#10463](https://github.com/zeroclaw-labs/zeroclaw/pull/10463) |
| Channels / voice | Opt-in VoiceHost WebSocket bridge for FunASR/SenseVoice | [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740) |
| Sandbox policy | Landlock honors `allowed_roots` read/write tiers | [#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100) |
| First-run quality | Hermetic Quickstart adapter serialization test | [#10460](https://github.com/zeroclaw-labs/zeroclaw/pull/10460) toward [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766) |

Also in the same-day batch: PowerShell `PSModulePath` preservation ([#10464](https://github.com/zeroclaw-labs/zeroclaw/pull/10464)), cost-summary period correction ([#10462](https://github.com/zeroclaw-labs/zeroclaw/pull/10462)), MCP persistent SSE event-boundary handling ([#10459](https://github.com/zeroclaw-labs/zeroclaw/pull/10459)), WebSocket dependency gating ([#10467](https://github.com/zeroclaw-labs/zeroclaw/pull/10467)).

Net: **runtime correctness, ZeroCode operability, local-model prompt hygiene, and review-policy calibration** moved farthest today. New product surface (VoiceHost, richer channel cards) is still open and mostly gated by `needs-author-action` or `risk:high`.

---

## 4. Community Hot Topics

Comment counts on the provided PR list are unavailable (`undefined`). Issue discussion is the usable heat signal.

**Most discussed issues**
1. **[#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)** — *refactor(gateway): centralize webhook channel message dispatch* — **9 comments**, open since 2026-07-01, still `in-progress`. Need: one webhook-to-channel ingress helper so webhook-backed channels keep transport-specific parse + fast ACK, but share autosave, agent dispatch, reply/error delivery, and quickstart handling. Underlying demand is **channel architecture consistency** as 30+ transports accumulate one-off lifecycle bugs.
2. **[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287)** — *compact `local_small` runtime profile and prompt-budget contract* — **7 comments, 2 👍**, open since 2026-04-04. Need: shrink prompt bloat for local models, disable permissive fallback parsing, stop leaking tool/system instructions into user-visible output. This is the clearest **local-first user pain** in the window, and it now has an implementation PR ([#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)).

**Highest-velocity PR themes (updated today, many XL)**
- Governance: [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461)
- Voice channel: [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740)
- ACP tools: [#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)
- Audit chain: [#10463](https://github.com/zeroclaw-labs/zeroclaw/pull/10463)

**Need analysis.** Operators want three things at once: (1) **local small models that stay on-budget and don’t leak internals**, (2) **ZeroCode/ACP session tools that match what the UI already shows**, (3) **channel/gateway ingress that is shared rather than per-transport**. Maintainers are simultaneously raising the bar on **who can merge `risk:high` / `domain:security` work**. That pairing—user-facing reliability plus review calibration—is the real conversation of 30 August.

---

## 5. Bugs & Stability

Ranked by stated severity and operational blast radius. All listed items were updated in this 24-hour window.

| Rank | Severity | Issue | Status | Fix PR |
|---|---|---|---|---|
| 1 | S2 / high operational cost | [#10292](https://github.com/zeroclaw-labs/zeroclaw/issues/10292) — ACP session tools cannot list or inspect Code sessions (`sessions_list` omits recent Code sessions visible in the sidebar) | OPEN, in-progress | [#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468) |
| 2 | S2 | [#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302) — ZeroCode Code pane stays `Processing` while browsing history and keeps CPU elevated | OPEN, in-progress | [#10466](https://github.com/zeroclaw-labs/zeroclaw/pull/10466) |
| 3 | S2 (closed today) | [#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001) — provider failures buried under a generic retry envelope (LM Studio / Ollama and other distinct causes look the same) | CLOSED | related attribution work still open in [#10415](https://github.com/zeroclaw-labs/zeroclaw/pull/10415) |
| 4 | Degraded RPC | Disconnects leave pending JSON-RPC calls hanging | OPEN PR | [#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260) (`needs-author-action`) |
| 5 | False-healthy channels | `/health` reported `ok` for a channel that never connected (listener future ≠ connected) | OPEN PR | [#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005) |
| 6 | Memory integrity | Snapshot hydration could silently drop undecodable SQLite rows | OPEN PR | [#10469](https://github.com/zeroclaw-labs/zeroclaw/pull/10469) |
| 7 | Windows runtime | Sanitized shell env dropped `PSModulePath`, breaking safe PowerShell pipelines | OPEN PR | [#10464](https://github.com/zeroclaw-labs/zeroclaw/pull/10464) |
| 8 | Cost observability | `daily_cost_usd` / `monthly_cost_usd` period math wrong vs all-time `session_cost_usd` | OPEN PR | [#10462](https://github.com/zeroclaw-labs/zeroclaw/pull/10462) |
| 9 | MCP transport | Persistent SSE event boundaries not preserved when payload exceeds `max_response_bytes` | OPEN PR | [#10459](https://github.com/zeroclaw-labs/zeroclaw/pull/10459) |
| 10 | Clipboard / TUI | Clipboard cleanup failures not surfaced; temp attachments must stay owned by the active turn | OPEN PR | [#10443](https://github.com/zeroclaw-labs/zeroclaw/pull/10443) |

No crash-class (S0/S1) items appear in this snapshot. The live risk is **degraded operator UX and incorrect telemetry**, concentrated in ZeroCode, ACP session tools, provider error attribution, and channel health.

Related high-risk correctness PRs still open: cron owner-qualified triggers ([#10414](https://github.com/zeroclaw-labs/zeroclaw/pull/10414)), post-save provider probe after model-routing updates ([#10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034)), approval-card batch position ([#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004)).

---

## 6. Feature Requests & Roadmap Signals

**Active requests in this window**
- Compact local runtime / prompt-budget contract — [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) + [#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)
- Shared webhook channel dispatch — [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586)
- First-run / quickstart user-behavior E2E — [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766) + [#10460](https://github.com/zeroclaw-labs/zeroclaw/pull/10460)
- Explicit ZeroCode keybinding collision reporting — [#10458](https://github.com/zeroclaw-labs/zeroclaw/issues/10458) (opened today)
- VoiceHost WebSocket bridge — [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740)
- Landlock `allowed_roots` tiers — [#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100)
- Tool-call batch position on approval cards — [#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004)
- PR risk/security approval calibration — [#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185) + [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461)
- Selectable ZeroCode logs — [#10086](https://github.com/zeroclaw-labs/zeroclaw/issues/10086) (**done**)

**Likely near-term (v0.8.5 final cut, if it ships)**  
Bug/regression/security/CI items only: ZeroCode Processing hang, ACP session listing, provider diagnostic envelope, memory snapshot fail-closed, cost-period fix, PowerShell env, risk-approval report-only CI, first-run test coverage. `local_small` may land if reviewers treat it as freeze-compatible runtime hardening rather than a new feature.

**Likely next line (v0.9.0 / later named milestones)**  
VoiceHost, Landlock root tiers, webhook dispatch unification, keybinding collision UX, approval-card batch metadata, and the headline v0.9.0 auth stack (OIDC / ssh-key / peercred / native in front of RPC/WSS, per-user × per-agent authorization, per-principal memory isolation). Identity & Access is only **17% closed** (5 / 28) and is the structural successor, not a 30 August deliverable.

---

## 7. User Feedback Summary

The issue text is operator-written, not social-media sentiment. Recurring pain:

- **Local models are second-class in prompt shape.** Users running Ollama / LM Studio hit prompt bloat, leaky system/tool text, and generic “all providers failed” envelopes that hide “daemon not running” vs “model missing.” ([#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287), [#9001](https://github.com/zeroclaw-labs/zeroclaw/issues/9001))
- **ZeroCode lies about state.** History browse can stay in `Processing`, burn CPU, drop prompt-complete notifications, and hide Code sessions from agent tools even when the sidebar shows them. ([#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302), [#10292](https://github.com/zeroclaw-labs/zeroclaw/issues/10292), [#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260))
- **First-run still produces plausible-but-wrong configs.** #8505 already showed a first-run path that looked fine and was not; #8766 asks for user-behavior E2E across quickstart, ZeroCode onboarding, doctor, and runtime wiring.
- **TUI papercuts compound distrust.** Logs were not selectable until today; keybindings can be accepted then silently unreachable ([#10458](https://github.com/zeroclaw-labs/zeroclaw/issues/10458)).
- **Channel health and approvals are hard to operate at multi-tool volume.** Health can be green before connect ([#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005)); stacked approval cards are indistinguishable ([#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004)).

Satisfaction signal is indirect: contributors keep sending XL hardening PRs on freeze day, and two user-visible papercuts closed (#9001, #10086). Dissatisfaction is concentrated in **local-runtime honesty** and **ZeroCode/ACP session fidelity**—the surfaces people stare at all day.

---

## 8. Backlog Watch

Items that are important, old, or blocked on a human rather than on code volume.

**Long-open accepted work**
- [#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) — opened **2026-04-04**, still accepted / in-progress / `risk:high`. Implementation finally exists ([#10465](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)); needs a freeze-policy call: land now or slip to v0.9.0.
- [#8586](https://github.com/zeroclaw-labs/zeroclaw/issues/8586) — opened **2026-07-01**, 9 comments, architecture follow-up still open.
- [#8766](https://github.com/zeroclaw-labs/zeroclaw/issues/8766) — opened **2026-07-06**, `priority:p1`, `risk:high`, first-run E2E still in-progress.

**PRs waiting on author or maintainer**
- `needs-author-action`: [#9740](https://github.com/zeroclaw-labs/zeroclaw/pull/9740) VoiceHost, [#10260](https://github.com/zeroclaw-labs/zeroclaw/pull/10260) RPC disconnect, [#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005) channel health, [#10415](https://github.com/zeroclaw-labs/zeroclaw/pull/10415) reliable stream attribution, [#10004](https://github.com/zeroclaw-labs/zeroclaw/pull/10004) approval-card batch index, [#10414](https://github.com/zeroclaw-labs/zeroclaw/pull/10414) cron owner guards.
- `needs-maintainer-review`: [#10100](https://github.com/zeroclaw-labs/zeroclaw/pull/10100) Landlock roots (`domain:security`, `risk:high`), [#10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034) provider probe after routing update (`risk:high`).

**Process watch**
- [#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185) / [#10461](https://github.com/zeroclaw-labs/zeroclaw/pull/10461) must land **before** automatic risk-label mutation (#9345). Reviewers should treat this as release infrastructure, not optional docs/CI.
- Stacked PRs [#10463](https://github.com/zeroclaw-labs/zeroclaw/pull/10463) (audit rotation) and [#10467](https://github.com/zeroclaw-labs/zeroclaw/pull/10467) (WebSocket deps) will produce noisy diffs until parents merge; they need explicit “owned range” review, not whole-diff review.

**v0.8.5 closeout risk.** Milestone due date is today with ~195 items still open. Policy already says weekly cuts ship the ready subset and unfinished work moves. The backlog to watch is not “can 195 issues close today”—it is whether **ACP session visibility, ZeroCode Processing, provider diagnostics, and risk-approval CI** make the cut, and whether `local_small` is classified as freeze-legal hardening.

---

**Health read:** throughput is high, ownership is concentrated, severity mix is S2-not-S0, and the milestone language matches the PR mix. Project health for 30 August is **operationally intense and directionally disciplined**: freeze discipline is holding at the label layer, while ZeroCode + local-runtime honesty remain the user-visible weak points that will decide whether the last v0.8.5 cut feels finished.

</details>