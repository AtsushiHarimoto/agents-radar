# OpenClaw 生态周报 2026-09-21

> Issues: 103 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-20 22:02 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

I'll pull the latest OpenClaw release notes, issue/PR activity, and repo context so the digest is accurate and current.Release notes and a couple of high-severity issues will fill in the changelog and stability picture.# OpenClaw Project Digest — 2026-09-21

**Repo:** [openclaw/openclaw](https://github.com/openclaw/openclaw) · ~390k stars · MIT · stewarded by the OpenClaw Foundation  
**Window:** issues/PRs updated in the last 24 hours, plus the v2026.9.5 ship (18–19 Sep)  
**Snapshot activity:** 103 issues touched (77 open / 26 closed) · 500 PRs touched (293 open / 207 merged or closed) · 2 new release tags

---

## 1. This Week's Overview

OpenClaw remains one of the highest-velocity open-source agent runtimes: a local Gateway that talks to 20+ chat channels, native apps, and swappable model plugins (Claude Code / Codex / Bedrock / local). v2026.9.5 landed with advertised product work — atomic updates, plugin hot-reload, conversation sharing, GPT Live, shared browser pages, conversation archives, and guided multi-agent setup — but the **upgrade path is the weak link**, not the feature set. Independent field tracking (ClawStat.us, assessed 20 Sep) rates the release **“update with care”** and still recommends staying on **v2026.9.1** if that install is healthy.

The last 24 hours look like a post-release fire drill: dozens of Doctor / npm-update failures, gateway start/hang/OOM reports on large fleets, and a dense queue of maintainer PRs that move SQLite and plugin work off the event loop. Health is mixed — contribution volume and response speed are excellent; production stability after 9.5 is not yet settled.

---

## 2. Releases

### v2026.9.5 — published ~18–19 Sep 2026
- Tag: [v2026.9.5](https://github.com/openclaw/openclaw/releases/tag/v2026.9.5)  
- Claimed batch: **64 direct commits · 4,179 PRs · 503 contributors**  
- Also tagged: **linux-stable** companion — [AppImage](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.AppImage) / [`.deb`](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.deb)  
- npm: `openclaw@2026.9.5` is both `latest` and `beta`  
- Docs: [release notes](https://docs.openclaw.ai/releases/2026.9.5) · [changelog](https://raw.githubusercontent.com/openclaw/openclaw/main/CHANGELOG/2026.9.5.md)

**Intended product changes** (from the project’s own 9.5 announcement):

| Area | What shipped |
|---|---|
| Atomic Updates | Candidate is rehearsed against a private copy while the live Gateway stays up; switch + verify; rollback if data/config remain compatible |
| Plugin hot-reload | Install/enable many plugins without a full Gateway restart (bundled rebuilds and experimental native plugin UI still need restart) |
| Conversation sharing | Read-only share of selected conversation groups to another paired install |
| GPT Live | Audio-only agent consult in supported meetings/calls (`gpt-realtime-2.1` for camera) |
| Shared browser pages | Agent + user on a local OpenClaw-managed browser (not personal cookies; remote/paired-node browsers unsupported) |
| Archives | Optional compression of inactive history after ~30 days; searchable; off by default |
| Guided team setup | Web UI “New agent” flow for specialist teams |

**Operational caveats (not listed as formal breaking changes, but they dominate field reports):**
- Candidate Doctor / schema migration rehearsal often dies at a hard ~300s canary budget.
- Plugin source captures in `/tmp` (`openclaw-plugin-build-*`, hundreds of MB each) are reported as unreclaimed.
- Plugin-state migrations can deadlock on the parent’s own install-records lease.
- ClawStat.us: 13–15 credible blocking issues on 9.5, concentrated on Windows / macOS / Linux upgrade and Gateway start — **none yet classified as widespread**.

**Migration note for operators:** if 9.4 (or 9.1) is stable, wait. If you must move, treat Doctor failures as first-class: do not force-delete retained agent DBs or plugin captures without a backup of `~/.openclaw`.

---

## 3. Project Progress

The 207 merged/closed PRs in this window are mostly **reliability, test cost, and thread-offload**, not new surface area. Maintainer `steipete` and bots (`roboclaw-bot`) own the bulk.

**Stability / runtime (direction of travel on `main`):**
- Move plugin blob DB and execution-binding writes off the calling thread — [#151175](https://github.com/openclaw/openclaw/pull/151175), [#153649](https://github.com/openclaw/openclaw/pull/153649)
- Compact agent storage and session FTS maintenance — [#153683](https://github.com/openclaw/openclaw/pull/153683)
- Keep ACP harness model IDs out of native provider calls — [#153756](https://github.com/openclaw/openclaw/pull/153756)
- Stop late “Exec failed” replies for canceled background commands — [#153795](https://github.com/openclaw/openclaw/pull/153795)
- Preserve config intent/ownership on writes; first-hop update config tests — [#147440](https://github.com/openclaw/openclaw/pull/147440), [#147821](https://github.com/openclaw/openclaw/pull/147821)
- Adopt `fs-safe` 0.17 for archive extract / complete I/O — [#153919](https://github.com/openclaw/openclaw/pull/153919) (closed)
- Telegram control commands no longer stall behind active conversations — [#153829](https://github.com/openclaw/openclaw/pull/153829)

**Clients / UX:**
- iOS: unfreeze chat after attaching a photo — [#154082](https://github.com/openclaw/openclaw/pull/154082)
- WebUI: distinguish known-zero cost from missing pricing — [#143033](https://github.com/openclaw/openclaw/pull/143033)
- WebUI: Markdown preview for automation (cron) prompts — [#154106](https://github.com/openclaw/openclaw/pull/154106)
- Reports: link team activity to work sessions — [#154020](https://github.com/openclaw/openclaw/pull/154020)
- Labs settings apply without Gateway restart (in flight) — [#153975](https://github.com/openclaw/openclaw/pull/153975)

**CI / test economics (necessary at this volume):**
- Overlap independent TTS / CI-watcher / Workboard cases; avoid cold-start pretag flakes; tier Windows CI — [#154080](https://github.com/openclaw/openclaw/pull/154080), [#154018](https://github.com/openclaw/openclaw/pull/154018), [#154103](https://github.com/openclaw/openclaw/pull/154103), [#153950](https://github.com/openclaw/openclaw/pull/153950), [#154030](https://github.com/openclaw/openclaw/pull/154030)

Closed in-window product bugs of note: memory-core “dreaming” narrative drop ([#153682](https://github.com/openclaw/openclaw/issues/153682)), WhatsApp after-delivery ENOENT from plugin reload ([#153290](https://github.com/openclaw/openclaw/issues/153290)), nested scope dropping `operator.write` read authority ([#141799](https://github.com/openclaw/openclaw/issues/141799)).

---

## 4. Community Hot Topics

Ranked by comment volume in the provided snapshot.

| # | Item | Why it is hot | Need underneath |
|---|---|---|---|
| 31 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — unreaped hook/tool children → zombies | Open since Jun; still accumulating | Long-lived Gateway process hygiene |
| 29 | [#91588](https://github.com/openclaw/openclaw/issues/91588) — Gateway RSS 350 MB → 15.5 GB, OOM loop | Same class; days-long soak | Memory ownership of sessions / plugins / catalogs |
| 20 | [#149538](https://github.com/openclaw/openclaw/issues/149538) — 632-agent fleet: “ready” but `/health` starves | Fleet operators, not hobby installs | Event-loop fairness at hundreds of agents |
| 11 | [#153704](https://github.com/openclaw/openclaw/issues/153704) — 9.5 Doctor dies at ~299s in agent-db integrity | Fresh 9.5 pain | Atomic-update rehearsal budget vs real DB size |
| 10 | [#144809](https://github.com/openclaw/openclaw/issues/144809) — long `claude-cli` turns lose the entire reply | Subscription Claude users | Stale-takeover vs multi-minute generations |
| 9 | [#152884](https://github.com/openclaw/openclaw/issues/152884) — update deadlock (SQLite session migration) | “I just ran update” | Safe schema migration under a live service |
| 8 | [#153706](https://github.com/openclaw/openclaw/issues/153706) — closed ACP sessions assert implicit Codex runtime | ACP / Codex hybrid users | Honest runtime identity after session close |

**Underlying demand is consistent:** *keep the Gateway up for days on a laptop or a 400–600 agent fleet, survive an in-place update, and do not drop a long model turn.* Features announced in 9.5 (hot-reload, atomic update) are exactly the surfaces now generating the tickets.

---

## 5. Bugs & Stability

Ranked by severity using the project’s own P0/P1 + impact tags.

### P0 / release-blocking

| Issue | Symptom | Fix PR visible in snapshot? |
|---|---|---|
| [#153704](https://github.com/openclaw/openclaw/issues/153704) | 9.5 candidate Doctor dies at ~299s in `[state/agent-db]` pre-migration | No dedicated fix PR listed |
| [#152884](https://github.com/openclaw/openclaw/issues/152884) | Update deadlock on session SQLite migration | No |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | Self-upgrade deadlock + rollback cron fail (v6.33 → v9.4) | No |
| [#153882](https://github.com/openclaw/openclaw/issues/153882) | Plugin migrations defer on parent install-records lease → Doctor abort, Gateway parked | No |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Fleet Gateway “ready” but event loop starved; RSS climbs | No |
| [#153619](https://github.com/openclaw/openclaw/issues/153619) | 9.5 blocked by `retained_plugin_source_conflict`; recovery is a no-op | No |
| [#151295](https://github.com/openclaw/openclaw/issues/151295) | 480-agent fleet cannot leave 9.4: Doctor blows 300s canary, writes a marker the installed runtime rejects | Closed after maintainer work; pattern still repeating on 9.5 |
| [#153720](https://github.com/openclaw/openclaw/issues/153720) | Plugin source captures never reclaimed; ~5 GB `/tmp` leak on normal paths | Closed, but reporters say #150580 did not fix the live path |
| Auto-filed update reports | [#154077](https://github.com/openclaw/openclaw/issues/154077), [#154019](https://github.com/openclaw/openclaw/issues/154019), [#153990](https://github.com/openclaw/openclaw/issues/153990), [#153985](https://github.com/openclaw/openclaw/issues/153985), [#153541](https://github.com/openclaw/openclaw/issues/153541) — `global-install-failed` / `managed-service-preflight` / `doctor-failed` | Mix of open/closed; high volume of templated reports |

### P1 — crash, message loss, auth

| Issue | Notes |
|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Zombie hook/tool children; runtime degradation |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Multi-day RSS leak → OOM → launchd restart loop |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | Long Claude turns discarded (`no active tool authority snapshot`) |
| [#138042](https://github.com/openclaw/openclaw/issues/138042) | Gateway control/health stalls 2–5 minutes with CPU/RAM free |
| [#94716](https://github.com/openclaw/openclaw/issues/94716) | `claude-cli` sends stale user-agent → bearer auth fails |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | `agents.list[].tools.deny` **not enforced** on `claude-cli` (exec/write stay on) — security |
| [#153899](https://github.com/openclaw/openclaw/issues/153899) | Drain waits full `TimeoutStopSec`; timers fire on closed resources |
| [#152965](https://github.com/openclaw/openclaw/issues/152965) | Hot-reload of a non-channel plugin disposes channel plugins → dropped inbound |
| [#154016](https://github.com/openclaw/openclaw/issues/154016) | `claude-fable-5-1` HTTP 400 on native Anthropic path (closed) |
| [#153971](https://github.com/openclaw/openclaw/issues/153971) | Bedrock ignores rotated STS creds until Gateway restart (duplicate `@smithy/core`) |
| [#154066](https://github.com/openclaw/openclaw/issues/154066) | `plugins.allow` regenerated every start; silently drops `browser` |

### P2 / regressions worth watching
[#153859](https://github.com/openclaw/openclaw/issues/153859) double wake on one ACP `sessions_spawn`; [#153955](https://github.com/openclaw/openclaw/issues/153955) severe chat/composer lag on iOS + WebUI vs 9.5; [#153016](https://github.com/openclaw/openclaw/issues/153016) Control UI Memory page says plugin unavailable when a third-party memory plugin is filling the slot; [#99659](https://github.com/openclaw/openclaw/issues/99659) OOM after companion app connect.

**Pattern:** 9.5’s atomic-update and plugin-capture machinery is creating a new failure class (Doctor timeout, lease deadlock, `/tmp` growth) on top of the older soak-class bugs (RSS, zombies, event-loop starvation).

---

## 6. Feature Requests & Roadmap Signals

Likely to land soon (PRs already open, maintainer-owned, or small/clear):

- Markdown-rendered automation prompts — request [#154036](https://github.com/openclaw/openclaw/issues/154036), PR [#154106](https://github.com/openclaw/openclaw/pull/154106)
- Labs settings without restart — [#153975](https://github.com/openclaw/openclaw/pull/153975)
- Code Mode executes JS only (drop TS compiler in the hot path) — [#154001](https://github.com/openclaw/openclaw/pull/154001)
- Refresh in-progress work cards without a chat message — [#154044](https://github.com/openclaw/openclaw/pull/154044)
- Team reports → work sessions — [#154020](https://github.com/openclaw/openclaw/pull/154020)
- Crabbox: native CUA on macOS/Windows cloud desktops — [#152060](https://github.com/openclaw/openclaw/pull/152060)
- TTS speaks an answer that includes a picture — [#142190](https://github.com/openclaw/openclaw/pull/142190)
- Plugin-owned cancel of a host-bound current-turn delivery — [#145021](https://github.com/openclaw/openclaw/issues/145021)

Product-decision backlog (will not ship without an explicit call):

- Human-readable Telegram topic names in the session dropdown — [#7406](https://github.com/openclaw/openclaw/issues/7406) (open since Feb)
- Wire `adoptionStallTimeoutMs` into Slack channel config — [#116547](https://github.com/openclaw/openclaw/issues/116547)
- Turn off `gateway.controlUi.allowInsecureAuth` after onboard — [#78855](https://github.com/openclaw/openclaw/issues/78855)
- Bound `session.maintenance` so thread/channel rows cannot grow past `maxEntries` / `maxDiskBytes` — [#112638](https://github.com/openclaw/openclaw/issues/112638)

**Prediction for the next point release (9.6 or a 9.5.x):** Doctor canary budget / plugin-capture reclaim / install-records lease, not new end-user features. The advertised 9.5 headline features will stay, but the updater has to stop parking Gateways.

---

## 7. User Feedback Summary

**What people are trying to do**
- Run one Gateway for months as a personal assistant across Telegram / WhatsApp / Discord / iOS / WebUI.
- Run **hundreds of agents** (reports cite 480 and 632) as a team control plane.
- Stay on Anthropic via `claude-cli` subscription auth, or Bedrock with rotating STS.
- Update in place with `npm` / managed service and keep sessions, memory, and plugins.

**Pain**
- “Update” is the most feared verb this week. Failures cluster at Doctor rehearsal, global npm install, and `managed-service-preflight`.
- Long conversations and long model turns are unsafe: replies vanish after `RUN_STALE_TAKEOVER_MS`; Slack follow-ups dead-letter after a 5-minute ingress stall.
- Soak reliability on a single box is still unsolved (zombies, 15 GB RSS, `/tmp` plugin builds).
- Security config is easy to get wrong: `tools.deny` ignored on `claude-cli`; `allowInsecureAuth` left `true` after wizard.
- 9.5 UX regressions: composer lag, Memory page “plugin unavailable”, `plugins.allow` reshuffled on every boot.

**Satisfaction**
- The 9.5 *feature* list (atomic updates, hot-reload, sharing, GPT Live, archives) is well received in public channels when the install actually comes up.
- Maintainers are visibly in the queue the same day (steipete PRs, maintainer-labeled issues, auto-filed update reports with hashes).
- Closed-the-same-day bugs (dreaming diary clamp, WhatsApp ENOENT mix-up, scope narrowing) show the triage machine works when the shape is clear.

---

## 8. Backlog Watch

These are old, high-impact, or still labeled `needs-maintainer-review` / `needs-product-decision` / `no-new-fix-pr`:

1. [#97616](https://github.com/openclaw/openclaw/issues/97616) — zombie children (opened 29 Jun, 31 comments)  
2. [#91588](https://github.com/openclaw/openclaw/issues/91588) — Gateway RSS leak (opened 9 Jun, 29 comments)  
3. [#94716](https://github.com/openclaw/openclaw/issues/94716) — stale `claude-cli` user-agent / auth (opened 19 Jun)  
4. [#132303](https://github.com/openclaw/openclaw/issues/132303) — `tools.deny` not enforced on `claude-cli` (**security**)  
5. [#78855](https://github.com/openclaw/openclaw/issues/78855) — `allowInsecureAuth` remains true after setup (**security**, opened 7 May)  
6. [#7406](https://github.com/openclaw/openclaw/issues/7406) — Telegram topic names (opened 2 Feb)  
7. [#112638](https://github.com/openclaw/openclaw/issues/112638) — session maintenance does not bound thread/channel rows  
8. [#113983](https://github.com/openclaw/openclaw/issues/113983) — gateway lock loop + Signal plugin never loads after update (Jul)  
9. [#116547](https://github.com/openclaw/openclaw/issues/116547) — Slack 5-minute ingress stall dead-letters follow-ups  
10. [#141700](https://github.com/openclaw/openclaw/issues/141700) — docs still point at an Android APK that latest GitHub Releases do not ship  
11. [#149429](https://github.com/openclaw/openclaw/issues/149429) — WSL2 browser control: “local listener owner could not be verified”

---

### Health one-liner

**Shipping capacity is elite; 9.5 production soak is not.** Treat v2026.9.5 as a feature-complete candidate that still fails its own updater on non-trivial state, and keep large fleets and “it just works” personal installs on a known-good older build until Doctor rehearsal, plugin-capture reclaim, and Gateway memory/event-loop issues have merged fixes in a follow-up tag.

---

## 横向生态对比

⚠️ 横向对比生成失败。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

I'll gather current Hermes Agent release notes, issue/PR activity, and project context so the digest is accurate and complete.Pulling a few more issue and release details so the digest can rank severity and roadmap signals accurately.# Hermes Agent Project Digest — 2026-09-21

**Repo:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)  
**Latest tag:** [v0.21.3 / v2026.9.14](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14) (14 Sep 2026)  
**Snapshot window:** issues/PRs updated in the last ~24h, plus the current release cycle  
**Scale context:** ~247k stars, ~52k forks, `main` still receiving commits on 20 Sep 2026.

---

## 1. This Week's Overview

Hermes Agent remains in a high-throughput post-`v0.21` stabilization phase. After the 31 Aug “Pantheon” feature drop (Bot Mode, cron memory, live subagent steering, MCP command center) and two follow-up patch tags (`v0.21.2` on 11 Sep, `v0.21.3` on 14 Sep), the 20 Sep snapshot shows **2 open issues touched** and **50 PRs updated in 24 hours** (49 still open, 1 merged/closed). That is not a quiet week: it is a salvage/hardening wave, largely authored or re-landed by `teknium1`, covering compression, session-state cost accounting, Kanban completion gates, gateway slash-command leakage, Desktop model/hold-message bugs, MCP env handling, and CLI profile boot.

Project health is mixed in a productive way. Velocity and maintainer presence are excellent; the issue surface in this window is small. The risk is the opposite of neglect: a very large open-PR queue of same-day “salvage” fixes sitting unmerged, plus two user-visible cost-tracking issues that have now been open for days to months. The 14 Sep tag already rolled up **338 merged PRs / 1,036 non-merge commits / 2,642 files** since `v0.21.2`, so downstream Docker/Cloud consumers are on a stable pin while `main` continues to absorb the next patch batch.

---

## 2. Releases

### [v0.21.3 (v2026.9.14)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14) — latest, 14 Sep 2026

**Type:** Patch / rollup tag for Docker, Hermes Cloud, and hosted deployments (Cloud agents auto-update to the newest tag).  
**Purpose called out in notes:** ship remote-gateway sign-in fixes that only reach Cloud once tagged.

**Documented user-facing fixes**
- Remote dashboard sessions no longer expire on Desktop wake / refresh bursts ([#110061](https://github.com/NousResearch/hermes-agent/pull/110061), fixes [#55712](https://github.com/NousResearch/hermes-agent/issues/55712)). Concurrent refresh tokens are coalesced; refresh runs off the event loop so a slow IdP no longer freezes `/api/status`. Pairs with Portal change `hermes-portal#1209`.
- Long-lived processes stop leaking duplicate `state.db` writer handles ([#110934](https://github.com/NousResearch/hermes-agent/pull/110934), fixes [#100896](https://github.com/NousResearch/hermes-agent/issues/100896), [#103339](https://github.com/NousResearch/hermes-agent/issues/103339)).

**Also in the `v0.21.2` → `v0.21.3` window (called out but not fully itemized):** server→client JSON-RPC + Pydantic wire-contract registry with generated TS/OpenRPC; reasoning-effort on every model picker; OpenRouter OAuth PKCE; HEIF/HEIC/AVIF decode; Honcho peer-model rework; MCP OAuth refresh bound to issuer; daily MCP re-auth nudge; FAL model additions (Wan 3.0, Kling 3.0 / Kling Image v3, MiniMax H3 Max Turbo, Gemini Omni Flash 1.1, Meta Muse).

**Breaking changes / migration**
- None stated. Notes say “nothing in this window is skipped.”
- Update path: `hermes update` (git installs) or re-run the installer; Docker/Cloud image `nousresearch/hermes-agent:v2026.9.14`.
- Compare: [v2026.9.11...v2026.9.14](https://github.com/NousResearch/hermes-agent/compare/v2026.9.11...v2026.9.14).

**Prior tags in the same cycle (context, not new today)**
- [v0.21.2 / v2026.9.11](https://github.com/NousResearch/hermes-agent/releases) — “state.db patch”: WAL/FTS/corrupt-row/profile isolation after the v0.21.0 rewrite.
- [v0.21.1 / v2026.9.7](https://github.com/NousResearch/hermes-agent/releases) — rollup; full notes deferred to v0.22.0.
- [v0.21.0 / v2026.8.31](https://github.com/NousResearch/hermes-agent/releases) — Pantheon: Bot Mode in Desktop, cron memory, live subagent steering, MCP command center.

No newer tag than `v2026.9.14` appears as of this digest date.

---

## 3. Project Progress

The 24h PR list is almost entirely **open fix/feat PRs**, not merges. Progress should be read as “next patch contents queued,” not as already shipped on the tag.

**Stability / session & compression**
- [#105537](https://github.com/NousResearch/hermes-agent/pull/105537) — project whole-lineage spend onto compression tips; include children in usage totals (fix for [#105535](https://github.com/NousResearch/hermes-agent/issues/105535)).
- [#117571](https://github.com/NousResearch/hermes-agent/pull/117571) — detached stale compression attempt can no longer overwrite the fallback attempt’s summary.
- [#117637](https://github.com/NousResearch/hermes-agent/pull/117637) — bound successful compaction frequency (pause after 3 rewrites / 10 minutes).

**Kanban / agent work-tracking**
- [#117649](https://github.com/NousResearch/hermes-agent/pull/117649) — refuse empty completions; emit `completion_blocked_empty_result`.
- [#117564](https://github.com/NousResearch/hermes-agent/pull/117564) — preserve unpublished source / `implementation.patch` before completion and reclamation.
- [#117624](https://github.com/NousResearch/hermes-agent/pull/117624) — typed `kanban block` can classify an untyped breaker-parked card.

**Gateway, Desktop, CLI, profiles**
- [#117629](https://github.com/NousResearch/hermes-agent/pull/117629) — operators can override/silence non-admin slash refusal instead of leaking `allow_admin_from` / `user_allowed_commands`.
- [#117534](https://github.com/NousResearch/hermes-agent/pull/117534) — Bot Mode: deliver held messages on resume; add hold-detection toggle.
- [#117648](https://github.com/NousResearch/hermes-agent/pull/117648) — model pill shows “xAI Grok” instead of internal `xai-oauth` route id.
- [#117643](https://github.com/NousResearch/hermes-agent/pull/117643) — `hermes -p PROFILE` boots the interface selected by that profile’s `config.yaml`.
- [#117641](https://github.com/NousResearch/hermes-agent/pull/117641) — dashboard under a scrubbed unit env attributed to owner’s home.
- [#117639](https://github.com/NousResearch/hermes-agent/pull/117639) — plain-text token banner silent in default keychain-off posture; platform-aware advice.
- [#117642](https://github.com/NousResearch/hermes-agent/pull/117642) — CLI mixin split: `cli.py` 4,835 → 3,959 lines (no behavior change).
- [#117570](https://github.com/NousResearch/hermes-agent/pull/117570) — parked non-profile dirs no longer listed as Bot Mode teammates.

**Integrations / models / plugins**
- [#117647](https://github.com/NousResearch/hermes-agent/pull/117647) — MCP catalog install: secrets stay in `.env`, non-secrets go to `config.yaml`.
- [#117646](https://github.com/NousResearch/hermes-agent/pull/117646) — DeepSeek picker drops retired ids; labels V4.1 Flash.
- [#117644](https://github.com/NousResearch/hermes-agent/pull/117644) — Bedrock Marketplace endpoint discovery.
- [#117638](https://github.com/NousResearch/hermes-agent/pull/117638) — community plugin: [hermes-prompt-tray](https://github.com/aydnOktay/hermes-prompt-tray).
- [#117645](https://github.com/NousResearch/hermes-agent/pull/117645) — wake-word pause/stop returns promptly on a wedged microphone stream.
- [#117640](https://github.com/NousResearch/hermes-agent/pull/117640) — browser orphan reaper no longer kills recycled PIDs that only mention the socket-dir basename.

**Read of the merge pattern:** many titles carry `salvage #NNNNN`. Combined with the early-September self-refactor (1,393 subagents, 34.4% non-test Python reduction), this looks like an agentic sweep + human salvage pipeline rather than a conventional review queue. That explains both the volume and why so many PRs are still open on the same calendar day.

---

## 4. Community Hot Topics

Comment/reaction counts in this snapshot are sparse (most listed PRs show no comments). Activity is better measured by **update recency, P2 labels, and paired issue+fix**.

| Item | Why it is hot | Underlying need |
|---|---|---|
| [#105535](https://github.com/NousResearch/hermes-agent/issues/105535) + [#105537](https://github.com/NousResearch/hermes-agent/pull/105537) | Only P2 cost/session bug updated 20 Sep; issue open since 8 Sep; companion fix still open | Users treat `/compress` as a routine long-session tool; cost UI and profile totals must survive lineage rotation |
| [#47991](https://github.com/NousResearch/hermes-agent/issues/47991) | Feature request from 17 Jun, bumped 20 Sep | Non-US operators (CNY / EUR / JPY) cannot use `/usage` or the status bar without mental FX conversion |
| [#117534](https://github.com/NousResearch/hermes-agent/pull/117534) | Bot Mode group-chat correctness | Held members currently lose the triggering message and intervening traffic on resume |
| [#117629](https://github.com/NousResearch/hermes-agent/pull/117629) | Gateway operator UX / information leak | End users see internal allowlist config keys in slash-command refusals |
| [#117649](https://github.com/NousResearch/hermes-agent/pull/117649) / [#117564](https://github.com/NousResearch/hermes-agent/pull/117564) | Kanban as the agent’s work ledger | Completions without evidence, and cleanup that drops unpublished source, break auditability |
| [#117647](https://github.com/NousResearch/hermes-agent/pull/117647) | MCP catalog install | `.env` mixed secrets with client IDs/hostnames; dashboard re-prompts on non-TTY |

**Need pattern:** operators want *durable session economics*, *safe multi-agent/Kanban bookkeeping*, and *gateway/Desktop copy that does not leak internals*. Feature heat is secondary to “the meter and the ledger must be true after compress/hold/complete.”

---

## 5. Bugs & Stability

Ranked by severity from this window only.

### P2 / user-visible correctness

1. **Compressed conversation cost freeze** — [#105535](https://github.com/NousResearch/hermes-agent/issues/105535) (open, updated 20 Sep)  
   After `/compress` rotates root → tip via `parent_session_id`, sidebar cost stays frozen at rotation and profile usage excludes post-compression spend.  
   **Fix PR exists:** [#105537](https://github.com/NousResearch/hermes-agent/pull/105537) (open, no reviews listed). Companion Desktop work referenced as `#105508`.

2. **Bot Mode hold swallows messages** — [#117534](https://github.com/NousResearch/hermes-agent/pull/117534) (open)  
   Putting a member on hold permanently dropped the triggering message and any messages that arrived before resume. Adds a room-level hold-detection toggle.

3. **Stale compression attempt races fallback** — [#117571](https://github.com/NousResearch/hermes-agent/pull/117571) (open)  
   A timed-out primary compress can still publish a late summary, arm a failure cooldown, or roll `_previous_summary` over the fallback that now owns `ContextCompressor`.

4. **Gateway slash refusal leaks config keys** — [#117629](https://github.com/NousResearch/hermes-agent/pull/117629) (open)  
   Non-admin users see `allow_admin_from` / `user_allowed_commands` in the refusal string.

### P2–P3 / operational reliability

5. **Compaction storm** — [#117637](https://github.com/NousResearch/hermes-agent/pull/117637): unbounded successful rewrites; proposed 3-in-10-min pause.  
6. **Wedged wake-word mic hang** — [#117645](https://github.com/NousResearch/hermes-agent/pull/117645): pause/stop blocked on dead PortAudio/ALSA/PipeWire stream.  
7. **Browser orphan reaper false-kill** — [#117640](https://github.com/NousResearch/hermes-agent/pull/117640): recycled PID matching only the socket-dir basename.  
8. **Empty Kanban complete** — [#117649](https://github.com/NousResearch/hermes-agent/pull/117649): completion with no result/summary accepted.  
9. **Unpublished code discarded on complete/reclaim** — [#117564](https://github.com/NousResearch/hermes-agent/pull/117564).  
10. **Dashboard owner mis-attribution under systemd-scrubbed env** — [#117641](https://github.com/NousResearch/hermes-agent/pull/117641).  
11. **xAI OAuth model pill shows internal route id** — [#117648](https://github.com/NousResearch/hermes-agent/pull/117648).  
12. **Profile `-p` boots the wrong TUI/CLI** — [#117643](https://github.com/NousResearch/hermes-agent/pull/117643).

No new crash-on-launch or data-loss reports appear in the two updated issues. The live risk is **incorrect spend/session projection** and **message loss in Bot Mode**, both with fix PRs already written.

---

## 6. Feature Requests & Roadmap Signals

**Explicit request in this window**
- Local-currency cost display (CNY / EUR / JPY, etc.) — [#47991](https://github.com/NousResearch/hermes-agent/issues/47991), P3, `area/usage-cost`. Open since 17 Jun, refreshed 20 Sep. Fits naturally next to the lineage-cost work in `#105537`; likely a small follow-on if FX rates/config land, not a v0.22 headline.

**Signals from open PRs (probable next-tag contents)**
- Bedrock Marketplace discovery — [#117644](https://github.com/NousResearch/hermes-agent/pull/117644).
- DeepSeek catalog hygiene (live ids only, V4.1 Flash label) — [#117646](https://github.com/NousResearch/hermes-agent/pull/117646).
- Community prompt-tray plugin in the catalog — [#117638](https://github.com/NousResearch/hermes-agent/pull/117638).
- MCP install secrets/config split — [#117647](https://github.com/NousResearch/hermes-agent/pull/117647).
- Compression frequency governor — [#117637](https://github.com/NousResearch/hermes-agent/pull/117637).
- Further CLI modularization after the September self-refactor.

**v0.22.0 signal:** `v0.21.1` notes explicitly deferred full changelog to **v0.22.0**. Expect that major to bundle the Pantheon aftershock: JSON-RPC wire contract, reasoning-effort UX, OAuth/MCP auth, model catalog, and this week’s session/Kanban/gateway salvage — not a new product category.

**Prediction for next tagged build (patch or 0.22):** `#105537` cost lineage, Bot Mode hold delivery, gateway refusal copy, MCP `.env` split, and Kanban empty-complete gate are the highest-probability landings. Local-currency usage is optional and still P3.

---

## 7. User Feedback Summary

**Pain points (from issues + PR problem statements)**
- Cost UI lies after `/compress`: sidebar frozen, profile totals under-count. That breaks trust for anyone running long, expensive sessions.
- USD-only `/usage` and status bar: recurring tax on non-US users (explicitly CNY/EUR/JPY).
- Bot Mode group chats: hold is not a pause; it is a message sink.
- Gateway talking to end users in operator-config dialect.
- MCP catalog install pollutes `.env` and re-prompts on headless/dashboard installs.
- Kanban completion can be empty or can throw away unpublished work.
- Voice wake-word stop can hang the process on a dead capture stream.
- Multi-profile / systemd / Desktop edge cases: wrong interface on `hermes -p`, wrong home for dashboard stop, misleading provider labels.

**Use cases implied**
- Long-running personal or team agents with compression as a normal operation.
- Bot Mode multi-agent rooms and Kanban-driven delegated work.
- Self-hosted gateway + Desktop + Cloud, including systemd units without `HOME`.
- MCP catalog users who want secrets isolated from client IDs.
- Multi-provider Desktop (xAI OAuth, DeepSeek, Bedrock Marketplace).

**Satisfaction vs dissatisfaction**
- Satisfaction is indirect: 247k-star project, Cloud/Docker pin cadence every few days, and maintainers turning user bugs into same-week salvage PRs.
- Dissatisfaction is concentrated in **metering, message delivery, and operator-facing copy** — not in “the agent cannot work.” The product is being used hard enough that compression lineage, hold semantics, and Kanban evidence now matter.

---

## 8. Backlog Watch

Items that need a maintainer pass even though the repo is noisy.

| Priority | Item | Age / status | Why it needs attention |
|---|---|---|---|
| High | [#105535](https://github.com/NousResearch/hermes-agent/issues/105535) / [#105537](https://github.com/NousResearch/hermes-agent/pull/105537) | Issue since 8 Sep; fix open, **no reviews listed** | P2 money/UX bug with a complete-looking patch sitting beside 49 other same-day PRs |
| Medium | [#47991](https://github.com/NousResearch/hermes-agent/issues/47991) | Open since **17 Jun**, 1 comment, bumped 20 Sep | Clear internationalization request; easy to starve next to salvage PRs |
| Medium | Same-day salvage stack (~#117629–#117649) | Created 20 Sep, almost all still open | Review bandwidth is the bottleneck, not idea generation |
| Watch | v0.22.0 deferred notes from [v0.21.1](https://github.com/NousResearch/hermes-agent/releases) | Since 7 Sep | Users and downstream packagers need a real 0.22 changelog, not only patch rollups |
| Watch | Compression + usage-cost label cluster (`sweeper:risk-session-state`) | Recurring across `#105535`, `#117571`, `#117637` | Session rotation is still a systemic risk area after v0.21.0’s state.db rewrite |

**Maintainer attention recommendation:** land or reject `#105537` before the next Cloud tag, then drain the 20 Sep salvage batch in dependency order (compression → session cost → Bot Mode hold → Kanban gates → gateway copy). Leave `#47991` scheduled as a small P3 after the lineage totals are correct; converting frozen USD into CNY on a wrong number would not help.

---

**Bottom line:** Hermes Agent is operationally healthy and unusually active. The 14 Sep tag gave Cloud/Docker a stable pin; 20 Sep development is a dense correctness pass on compression economics, Bot Mode delivery, Kanban evidence, and gateway/Desktop polish. The health risk is review lag on an already-written P2 cost fix, not lack of engineering motion.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

I'll gather IronClaw repo context and fill any gaps in the provided 24h snapshot so the digest is accurate.Pulling a few issue and PR pages for comments, dates, and merge status so the digest stays precise.# IronClaw Project Digest — 2026-09-21

**Repo:** [nearai/ironclaw](https://github.com/nearai/ironclaw) · Agent OS (Rust) focused on privacy, security, and extensibility · ~12.6k stars / ~1.5k forks · latest stable **[ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0)** (2026-08-27)

Window covered by the supplied snapshot: roughly the last 24 hours of GitHub activity, with a few older items that were touched in that window.

---

## 1. This Week's Overview

IronClaw is in a **maintenance-and-hardening** phase, not a release sprint. There were **no new releases**; current stable remains **1.4.0** from 27 August. In the last 24 hours the repo saw **3 open issues** (0 closed) and **10 PRs updated** (8 still open, 2 closed). Most of that PR volume is Dependabot: Rust crates, GitHub Actions, Wasmtime, and Tokio-ecosystem bumps. Product work that did move is concentrated on **operator correctness and security seams** — Google OAuth activation when credentials come from the Web UI, Reborn durable-storage tenancy, MCP leak-diagnostic classification, and a host-mediated IdentyClaw Passport for processless agents. Daily OfficeQA taxonomies attribute most benchmark misses to **DeepSeek-V4-Flash model quality**, not runtime regressions. Health read: active maintainers, healthy automation, thin user-facing commentary, and a growing gap since the last tag.

---

## 2. Releases

**None in this window.** Latest published tag is still **[ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0)** (2026-08-27), a stable promotion of `1.4.0-rc.1` covering 81 commits since 1.3.0 (durable notification inbox, background subagents, persistent sandbox containers, managed sandbox egress). No migration notes apply to this digest period.

---

## 3. Project Progress

Closed / superseded in the snapshot (both Dependabot, both closed 2026-09-20 as newer group PRs replaced them):

| PR | What moved | Status |
|---|---|---|
| [#8099](https://github.com/nearai/ironclaw/pull/8099) | `everything-else` Cargo group, 25 updates (`uuid` 1.24.0→1.26.1, `base64`, `rust_decimal`, …) | Closed, superseded by #8104 |
| [#8079](https://github.com/nearai/ironclaw/pull/8079) | GitHub Actions group, 6 updates (`anthropics/claude-code-action`, `actions/setup-node` 4.0.2→7.0.0, …) | Closed, superseded by #8103 |

Open work that advanced but did **not** land:

- **[#8102](https://github.com/nearai/ironclaw/pull/8102)** `fix(extensions): resolve provider-instance readiness live, administrator configuration first` (henrypark133, 2026-09-18) — Gmail / Google Calendar activation failed after a successful OAuth flow when the Google client was configured in the **Web UI** rather than env vars.
- **[#7456](https://github.com/nearai/ironclaw/pull/7456)** `fix(reborn): make durable storage profile-agnostic` (henrypark133; XL, medium risk; updated 2026-09-18) — roots Reborn profiles at `IRONCLAW_REBORN_HOME` with shared `state/`, `system/`, `workspaces/`, `runtime/`, `logs/`, `cache/`, `tmp/` namespaces and a typed security envelope so restart-only profile switches cannot weaken tenancy.
- **[#7499](https://github.com/nearai/ironclaw/pull/7499)** `feat(identyclaw): host-mediated Passport for practitioners` (discernible-io; XL, low risk, new contributor; updated 2026-09-19) — `builtin.idcp` host seam plus a practitioner kit under `deploy/identyclaw/` so processless agents can call IdentyClaw Passport without a shell or installable extension.
- **[#8077](https://github.com/nearai/ironclaw/pull/8077)** `fix(mcp): classify response leak diagnostics` (linhongyu510; updated 2026-09-14) — closes #8009; centralizes `response_leak_blocked` and keeps host leak-blocking while exposing a distinct MCP-visible reason.
- Dependabot still open: **[#8104](https://github.com/nearai/ironclaw/pull/8104)** (29 crate updates), **[#8103](https://github.com/nearai/ironclaw/pull/8103)** (8 Actions updates), **[#7834](https://github.com/nearai/ironclaw/pull/7834)** (Wasmtime / WASI / wit-parser, open since 2026-08-23), **[#8078](https://github.com/nearai/ironclaw/pull/8078)** (`tower-http` 0.7.0→0.7.1, `tokio-tungstenite`).

Net: **no user-visible feature merged this window**. Progress is CI/deps hygiene plus three substantial open fix/feature branches.

---

## 4. Community Hot Topics

Comment and reaction counts in the snapshot are low (the only issue with comments is #7537 with **2**). Activity is therefore better read as *what maintainers keep touching* than as a public discussion spike.

1. **Per-request thinking / effort control** — [Issue #7537](https://github.com/nearai/ironclaw/issues/7537)  
   Author serrrfirat, opened 2026-08-12, last updated 2026-09-18, labels `enhancement` / `scope: llm`. Trigger: DeepSeek V4 Flash via NEAR AI (0731 checkpoint) became overly verbose. Request is a **generic thinking/effort level** on the LLM request path, with per-request and per-model defaults mapped to each provider’s native knob (including DeepSeek `chat_template_kwargs`). Underlying need: operators want cost/latency/verbosity control that is not DeepSeek-specific.

2. **Benchmark failure taxonomies as an operating ritual** — [#8101](https://github.com/nearai/ironclaw/issues/8101) (2026-09-17) and [#8100](https://github.com/nearai/ironclaw/issues/8100) (2026-09-14)  
   Author pranavraja99. OfficeQA runs with 35 and 43 non-pass tasks are classified as **almost entirely genuine model-quality errors** on DeepSeek-V4-Flash (navigation / task completion), not IronClaw harness bugs. Underlying need: keep agent-runtime regressions separable from model drift while the default cloud model is still moving.

3. **Identity without a process** — [#7499](https://github.com/nearai/ironclaw/pull/7499)  
   Practitioners want Passport/IdentyClaw available to processless / hosted agents. Signals demand for a first-class identity plane that does not require shell or an extra extension.

4. **Admin-UI vs env-var config parity** — [#8102](https://github.com/nearai/ironclaw/pull/8102)  
   Cloud / Agent Hub operators configure OAuth in the Web UI; readiness checks still assumed env vars. That is the recurring “hosted vs local config dual-path” problem.

---

## 5. Bugs & Stability

Ranked by operational severity from the snapshot. No crash or data-loss reports appear in this window.

| Severity | Item | Notes | Fix PR? |
|---|---|---|---|
| **High (activation blocker)** | Gmail / Google Calendar cannot be activated when Google OAuth client is set via **administrator Web UI** | OAuth completes (consent → code → token); activation then fails with a provider-instance readiness error. Affects any deployment not using env vars. | Yes — [#8102](https://github.com/nearai/ironclaw/pull/8102) (open) |
| **High (isolation / tenancy)** | Reborn durable storage coupled to profile layout | Restart-only profile transitions could weaken tenancy or workspace isolation. | Yes — [#7456](https://github.com/nearai/ironclaw/pull/7456) (open, XL) |
| **Medium (security diagnostics)** | MCP egress leak-blocking reason was not distinctly classified | Host must keep blocking leaks; MCP clients need a dedicated reason code (`response_leak_blocked`). Closes #8009. | Yes — [#8077](https://github.com/nearai/ironclaw/pull/8077) (open; last touch 2026-09-14) |
| **Low (quality, not runtime)** | OfficeQA non-pass clusters on 2026-09-14 (43) and 2026-09-17 (35) | Maintainers explicitly call these **model-quality** misses on DeepSeek-V4-Flash, not IronClaw defects. | No runtime fix implied; tracked in [#8100](https://github.com/nearai/ironclaw/issues/8100), [#8101](https://github.com/nearai/ironclaw/issues/8101) |

No new crash, panic, or regression issue was filed in the 24h set.

---

## 6. Feature Requests & Roadmap Signals

Likely next-version candidates, inferred from open work that already has code:

1. **Generic thinking / effort control** — [#7537](https://github.com/nearai/ironclaw/issues/7537). Provider-native mapping (DeepSeek first, then others) is the cleanest LLM-layer feature in the queue and matches current default-model pain.
2. **Host-mediated IdentyClaw Passport** — [#7499](https://github.com/nearai/ironclaw/pull/7499). Fits the Agent Hub / processless deployment story; XL but labeled low risk.
3. **Profile-agnostic Reborn storage** — [#7456](https://github.com/nearai/ironclaw/pull/7456). Infrastructure prerequisite for safer multi-profile / hosted restarts; more “must land before next stable” than a user-facing feature.
4. **Admin-config-first provider readiness** — [#8102](https://github.com/nearai/ironclaw/pull/8102). Small surface, high operator impact; good 1.4.x patch material.
5. **MCP leak diagnostic taxonomy** — [#8077](https://github.com/nearai/ironclaw/pull/8077). Security-correctness, not a feature, but belongs in the next patch train.

Prediction: the next tag (1.4.1 or 1.5.0-rc) is more likely to ship **config/readiness + storage isolation + MCP diagnostics** than a large product feature. Thinking-level control and Passport are the two items that would actually change the user/API surface.

---

## 7. User Feedback Summary

Direct end-user comments are scarce in this snapshot (0 reactions on listed items; 2 comments only on #7537). Pain and use cases have to be read from issue/PR statements:

**Pain points**
- Default cloud model (DeepSeek-V4-Flash) is **too verbose / navigationally weak** on OfficeQA-style work; operators want a first-class effort knob rather than provider-specific hacks.
- **Web UI administrator configuration is a second-class citizen** versus env vars — OAuth can succeed and the extension still will not activate.
- Hosted / processless agents still lack a clean path to identity (Passport) without a shell.
- MCP clients need leak-block reasons that are distinguishable from generic host failures.

**Use cases in view**
- Personal / practitioner agents on Agent Hub and local binaries, with Gmail and Google Calendar as day-one tools.
- Benchmark-driven quality control (OfficeQA) as part of the project’s own operating loop.
- WASM / MCP tool hosts that must not leak secrets, including through MCP response channels.

**Satisfaction / dissatisfaction**
- No praise or complaint threads in this window. The failure taxonomies are notable for *defending the runtime*: maintainers are willing to say “this is the model, not us,” which is a mature posture but also flags that default-model quality is now a product issue, not only an infra one.

---

## 8. Backlog Watch

Items that are large, old relative to the window, or still waiting on review:

| Item | Age / last touch | Why it needs attention |
|---|---|---|
| [#7456](https://github.com/nearai/ironclaw/pull/7456) Reborn profile-agnostic storage | Opened **2026-08-10**, updated 2026-09-18 · XL / medium risk / core contributor | Tenancy and workspace isolation; sitting open for ~6 weeks. |
| [#7499](https://github.com/nearai/ironclaw/pull/7499) IdentyClaw Passport host seam | Opened **2026-08-11**, updated 2026-09-19 · XL / new contributor | External contributor PR of this size stalls without a named reviewer. |
| [#7537](https://github.com/nearai/ironclaw/issues/7537) Generic thinking/effort control | Opened **2026-08-12**, updated 2026-09-18 · 2 comments, 0 👍 | Still an issue, not a PR; the DeepSeek verbosity problem is now also showing up in daily taxonomies. |
| [#7834](https://github.com/nearai/ironclaw/pull/7834) Wasmtime / WASI / wit-* bump | Opened **2026-08-23**, updated 2026-09-20 · L / medium risk | Wasmtime upgrades are the sandbox runtime; leaving this parked next to other dep PRs raises merge-conflict and CVE lag risk. |
| [#8077](https://github.com/nearai/ironclaw/pull/8077) MCP leak diagnostics | Opened 2026-09-06, **last update 2026-09-14** | Quiet for a week; security-path PRs should not idle. |
| [#8100](https://github.com/nearai/ironclaw/issues/8100) / [#8101](https://github.com/nearai/ironclaw/issues/8101) daily taxonomies | 0 comments each | Fine as logs, but they will become noise unless someone owns “promote recurring model failures into #7537 / eval gates.” |

---

**Health snapshot:** automation is working (Dependabot groups, daily eval taxonomies). Core contributors (henrypark133 and others) are focused on hosted-config parity and isolation rather than new surface area. The main risk is not instability — it is **review lag on XL security/storage PRs** and **no release in 25 days** while default-model behavior is already driving operator feature requests.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>