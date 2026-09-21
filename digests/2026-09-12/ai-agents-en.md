# OpenClaw Ecosystem Digest 2026-09-12

> Issues: 151 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-12 03:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

I'll pull current OpenClaw repo details and recent activity so the digest matches the 2026-09-12 snapshot.Next I’ll pull the full 2026.9.x release notes and the current issues/PR pages so the digest can rank severity accurately.# OpenClaw Project Digest — 2026-09-12

**Repo:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)  
**Scope:** activity window centered on the last 24 hours plus the 2026.9.x / June LTS release cluster  
**Snapshot size:** 151 issues updated (77 still open / 74 closed), 500 PRs updated (287 open / 213 merged or closed), 4 new releases  
**Project size context:** ~389k stars, ~82k forks, 3,140 contributors, MIT, TypeScript; stewarded by the OpenClaw Foundation.

OpenClaw is a self-hosted personal/team AI assistant gateway: one local Gateway process, many chat channels (Discord, Telegram, Slack, Teams, WhatsApp, iMessage, and 20+ others), native apps, pluggable models/harnesses, and on-device state.

---

## 1. This Week's Overview

OpenClaw is in a high-throughput September cadence: four tagged releases landed in about a week (`2026.9.2` → `2026.9.4`, plus the final June LTS `2026.6.35`), while the last 24 hours alone moved 151 issues and 500 PRs. That volume is consistent with a project that has become infrastructure for self-hosted agents rather than a quiet library.

Health is mixed but directionally improving. Product surface is expanding (unified Plugins workspace, prepared cloud sessions, Skill Workshop, Control UI polish, GPT Image 2.5 / GPT-6 Astra). At the same time, **update/migration reliability is the dominant live incident class**: Doctor refusals, schema-17 candidate mismatches, macOS npm “global install swap” failures, and runtime-verification failures are being filed against `2026.9.3` → `2026.9.4` as those releases ship. Maintainers are treating this as first-class work—rollback, rehearsal, and ownership-safe probes are the headline of `2026.9.4`—but operators on mixed 2026.7.x → 2026.9.x paths are still hitting P0 blockers.

Community signal is also clear: process leaks, session-state loss, channel truncation (Discord/Telegram), and Doctor/schema repair paths generate the most comments. The project is not starved for contributors; it is starved for maintainer review bandwidth on a large ready-for-look queue.

---

## 2. Releases

Four releases in the provided window. Latest stable is **`2026.9.4`** (11 Sep). June LTS closed with **`2026.6.35`**.

### `v2026.9.4` — latest stable ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4))

Shipped ~11 Sep. Highlights:

- **Rollback of compatible failed updates.** Keep the previous package and restore prior config/service when schema + config checks say rollback is safe. Database migrations still require a verified pre-update backup. ([#140339](https://github.com/openclaw/openclaw/pull/140339))
- **Unified Plugins workspace.** Discover bundled + ClawHub plugins, install and configure them from Control UI. ([#135839](https://github.com/openclaw/openclaw/pull/135839) and related)
- **Prepared cloud sessions.** Start eligible Linux sessions from prepared local projects or public GitHub repos; build reusable snapshots in Control UI. Ready workers incur provider charges until deleted.
- Terminal question prompts (keyboard / free-text / multi-question) in Gateway and local TUI.
- GPT Image 2.5 Flare / Sunburst via OpenAI or fal.
- Stronger conversation-history recovery after interrupted streams and chat→history handoff.
- Voice path returns subagent results after multi-round delegation.
- `OPENCLAW_CONFIG_READONLY=1` for externally managed config.

**Migration notes:** automatic rollback is blocked by schema-changing upgrades, incompatible new DBs, or operator config edits after the candidate started. Use a [verified backup](https://docs.openclaw.ai/install/updating/rollback-and-recovery) before migration-bearing upgrades. Node floor remains **24.16+ or 26.1+**.

### `v2026.9.3` ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3))

- Safer updates: rehearse core/plugin changes in isolated candidate state before activation; recover abandoned update records without stopping a healthy matching Gateway.
- Related: [#136997](https://github.com/openclaw/openclaw/issues/136997), [#138839](https://github.com/openclaw/openclaw/pull/138839), [#141109](https://github.com/openclaw/openclaw/pull/141109).

This is the version many current P0 update bugs are reported *from*.

### `v2026.9.2` ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.9.2))

- Faster chat/dashboards/session UI while long transcripts and disk work run off the Gateway event loop; durable history reads; direct dashboard lookup. ([#136862](https://github.com/openclaw/openclaw/issues/136862), [#138](https://github.com/openclaw/openclaw) cluster)

### `v2026.6.35` — final June 2026 Extended Stable / LTS ([release](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35))

- Safer provider/channel boundaries: bound untrusted response bodies, reject oversized inputs before expensive work, preserve safe recovery when transports fail.
- Intended as the last 2026.6 LTS line; operators who cannot take September schema work should stay here until a verified backup + Doctor path exists.

No explicit “breaking API” banner in the 9.4 notes, but **schema 17 candidate rehearsal** and Doctor attestation/workspace migration are de-facto breaking for upgrades that skip backups.

---

## 3. Project Progress

The last 24 hours closed or merged **213 PRs** and closed **74 issues**. That is not a feature freeze; it is a dual track of product surface + update-path hardening.

**Shipped or advancing in 2026.9.x**

| Area | What moved |
|---|---|
| Updates / Doctor | Isolated candidate rehearsal, compatible-failure rollback, abandoned-record recovery, ownership-safe capability probes |
| Plugins / Skills | Unified Plugins UI, ClawHub discovery, Skill Workshop migration, workspace-only personal skill reads |
| Control UI / apps | History recovery after IndexedDB close, settings nav sharing, sidebar at default desktop size, model-picker cache, native Gateway shortcuts |
| Sessions / chat | Off-event-loop transcript work, omitted-history import in Doctor, preserve final answers after failed streamed blocks |
| Cloud / workers | Prepared workers from local Git or public GitHub; snapshot-before-chat |
| Models / media | GPT-6 Astra (9.2), GPT Image 2.5 (9.4), longer voice-note transcription (remove 1,200s decoder cap) |
| Ops | Read-only config mode, Prometheus log-overhead cut, repository checkpoint latency |

**Active maintainer-authored / maintainer-ready PRs (12 Sep)** show the same themes: Doctor copy reduction ([#145577](https://github.com/openclaw/openclaw/pull/145577)), update settlement honesty ([#145321](https://github.com/openclaw/openclaw/pull/145321)), candidate probe without state migration ([#145547](https://github.com/openclaw/openclaw/pull/145547)), stale Codex migrations ([#145043](https://github.com/openclaw/openclaw/pull/145043)), UI recovery ([#145545](https://github.com/openclaw/openclaw/pull/145545)).

Progress is real. The gap is that several of the week’s *user-facing* P0s (Doctor legacy workspace refusal, npm swap on macOS, 9.3→9.4 candidate running the old binary against schema 17) were filed *after* the safer-update marketing landed.

---

## 4. Community Hot Topics

Ranked by comment count in the provided 24h issue slice, then by what the thread is actually about.

### Process / runtime integrity

1. **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — *OpenClaw leaks unreaped hook/tool child processes* (OPEN, 16 comments, P1, message-loss + crash-loop). Zombie `openclaw-hooks` / `bash` / `codex` children under the main process. Longest-lived high-comment bug in this set (opened 2026-06-29, still moving on 12 Sep).
2. **[#144911](https://github.com/openclaw/openclaw/issues/144911)** — MCP init timeout crashes the whole Gateway via unhandled rejection `service child cleanup identity lost` (OPEN, 7 comments, P1, diamond-lobster). Directly adjacent to child-process hygiene.

**Need:** a single child-lifecycle owner (reap, identity, timeout) that cannot take down the Gateway.

### Upgrade / Doctor as a product surface

3. **[#142585](https://github.com/openclaw/openclaw/issues/142585)** — `2026.9.3` Doctor refuses valid legacy workspace + attestation import when canonical rows are absent (OPEN, 15 comments, P0, gold-shrimp, UX release blocker).
4. Fresh 12 Sep update-failure reports: **[#145510](https://github.com/openclaw/openclaw/issues/145510)** runtime-verification-failed (win32), **[#145491](https://github.com/openclaw/openclaw/issues/145491)** doctor-failed (darwin), **[#144739](https://github.com/openclaw/openclaw/issues/144739)** 9.3 npm update runs 9.3 against schema-17 candidate state.

**Need:** Doctor that can import pre-canonical state, and an updater that never executes the *old* binary against the *new* schema.

### Channel fidelity (message-loss class)

5. **[#96007](https://github.com/openclaw/openclaw/issues/96007)** — Discord multi-part replies truncate after an inline error line (CLOSED, 10 comments).
6. **[#89954](https://github.com/openclaw/openclaw/issues/89954)** — Telegram `getUpdates` 409 cascade after IPv6→IPv4 fallback; rebuild loop does not cancel in-flight long-polls (CLOSED, 7 comments, P1).
7. **[#59662](https://github.com/openclaw/openclaw/issues/59662)** — Anthropic Max usage-alert text blocks delivered as assistant messages (CLOSED, 7 comments).

**Need:** channel adapters that isolate provider/system text from user-visible assistant content, and that do not drop the rest of a multi-part payload on the first error line.

### Session / compaction / security leftovers

- **[#59618](https://github.com/openclaw/openclaw/issues/59618)** auto-compaction silently abandons the in-flight turn (CLOSED, 7 comments).
- **[#112475](https://github.com/openclaw/openclaw/issues/112475)** device pairing recovery fails after removal (OPEN, 6 comments, P0).
- **[#114158](https://github.com/openclaw/openclaw/issues/114158)** `@openclaw/fs-safe` hardcodes `0o600`, ignoring umask — breaks NFS/SMB shared workspaces (OPEN, 6 comments).

Hot PRs on the 12 Sep board are less “discussed” (comment counts often unset) than “ready for maintainer look”: update-path PRs from `fuller-stack-dev` / `steipete`, UI recovery from `steipete` / `obviyus`, memory dreaming reports ([#145458](https://github.com/openclaw/openclaw/pull/145458)), historical transcript recovery ([#120781](https://github.com/openclaw/openclaw/pull/120781)).

---

## 5. Bugs & Stability

Severity ranking uses the project’s own labels (`P0` / crash-loop / ux-release-blocker / data-loss) plus whether a fix PR is visible in the provided slice.

### P0 / release-blocker

| Issue | Symptom | Status | Fix PR visible? |
|---|---|---|---|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Doctor refuses valid legacy workspace/attestation when canonical rows missing | OPEN | Not in top PR list |
| [#145072](https://github.com/openclaw/openclaw/issues/145072) | macOS npm update fails at “global install swap”; launcher fingerprint includes symlink mode; shim backup never chmod’d | CLOSED (filed 11 Sep) | Treated as queueable/source-repro; likely absorbed into 9.4 rollback work |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | Update 9.3→9.4 `runtime-verification-failed` (Windows) | OPEN | Related: [#145547](https://github.com/openclaw/openclaw/pull/145547), [#145321](https://github.com/openclaw/openclaw/pull/145321) |
| [#145491](https://github.com/openclaw/openclaw/issues/145491) | Update `doctor-failed` (darwin/arm64) | OPEN | Same update cluster |
| [#144739](https://github.com/openclaw/openclaw/issues/144739) | 9.3→9.4 npm update runs 9.3 against schema-17 candidate | OPEN | Same cluster |
| [#142586](https://github.com/openclaw/openclaw/issues/142586) | Doctor finds orphan `task_delivery_state` FKs, no supported recovery | OPEN | No |
| [#144672](https://github.com/openclaw/openclaw/issues/144672) | App shows no actionable error after wrong Control Port | OPEN | No |
| [#112475](https://github.com/openclaw/openclaw/issues/112475) | Device pairing recovery after removal | OPEN | No |

### P1 / crash-loop / process

| Issue | Symptom | Status | Notes |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Unreaped hook/tool children → zombies, degradation | OPEN since Jun | Highest-comment open bug |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP init timeout → unhandled rejection → Gateway down | OPEN | Clear fix shape |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | Gateway pegs one CPU core in filesystem discovery after 2026.8.1 with a large skill/agent fleet | OPEN | Needs maintainer + more info |

### P1–P2 message-loss / session-state (many closed as stale, still diagnostic)

Closed-but-updated threads ([#96007](https://github.com/openclaw/openclaw/issues/96007), [#59618](https://github.com/openclaw/openclaw/issues/59618), [#89954](https://github.com/openclaw/openclaw/issues/89954), [#59563](https://github.com/openclaw/openclaw/issues/59563), [#97163](https://github.com/openclaw/openclaw/issues/97163)) show a durable pattern: compaction, channel errors, or session rebuild drop work *silently*. Open cousins still live:

- [#145562](https://github.com/openclaw/openclaw/issues/145562) — `available_skills` missing from native Gemini `systemInstruction` despite the report saying it is included.
- [#145503](https://github.com/openclaw/openclaw/issues/145503) — `skill_workshop` not registered after 9.3 Workshop migration; `doctor --fix` recommends an `alsoAllow` its own resolver rejects.
- [#130249](https://github.com/openclaw/openclaw/issues/130249) — async exec completions can land in the wrong session.
- [#112313](https://github.com/openclaw/openclaw/issues/112313) — dead-lettered outbound queue rows are permanent; no CLI/RPC/TTL clear.
- [#75187](https://github.com/openclaw/openclaw/issues/75187) — `AGENTS.md` puts load-bearing tool rules at the bottom; `bootstrapMaxChars` head-truncation strips them.

### Stability read

September releases improved *intended* update safety (rehearsal, rollback, off-loop history). Field evidence on 11–12 Sep says the rehearsal itself is still a crash/block surface: candidate schema ahead of the running binary, Doctor lint snapshot cleanup ([#138260](https://github.com/openclaw/openclaw/issues/138260)), Workshop retarget loops ([#142583](https://github.com/openclaw/openclaw/issues/142583)). Treat `2026.9.4` as “safer if the pre-update backup exists,” not as “upgrades are boring.”

---

## 6. Feature Requests & Roadmap Signals

User-facing requests that keep resurfacing, plus what 9.4 already started shipping:

| Request | Signal | Likely near-term? |
|---|---|---|
| Collaborative markdown Canvas (edit, not just render) — [#77798](https://github.com/openclaw/openclaw/issues/77798) | 6 comments, 2 👍, product-decision tag | Medium; Canvas already exists as render-only |
| Session fork / resume / continue (open-agent-sdk parity) — [#59109](https://github.com/openclaw/openclaw/issues/59109) | Recurring since April | Partial: spawn/bind work in Telegram [#145543](https://github.com/openclaw/openclaw/pull/145543) |
| Shared memory DB for multi-agent workspaces — [#144699](https://github.com/openclaw/openclaw/pull/144699) | Open PR, security-boundary merge risk | Next-version candidate if review passes |
| Native approval buttons for Feishu / Teams / Mattermost — [#104521](https://github.com/openclaw/openclaw/issues/104521) | Maintainer-authored request | Plausible; typed approvals already exist |
| Accessibility of setup/CLI (13 VoiceOver barriers) — [#126876](https://github.com/openclaw/openclaw/issues/126876) | First public blind-user install audit; P0 UX blocker tag | Should be next-version if the P0 label is honored |
| Cron `--until` / `--max-runs` — [#130247](https://github.com/openclaw/openclaw/issues/130247) | Ops users on Quadlets | Small, easy to slip into a patch |
| Plugin tool custom Discord emoji — [#97184](https://github.com/openclaw/openclaw/issues/97184) | Small DX | Easy |
| Makefile/justfile + scripts taxonomy — [#59736](https://github.com/openclaw/openclaw/issues/59736), [#59728](https://github.com/openclaw/openclaw/issues/59728) | Contributor onboarding | Unlikely to beat P0s |
| Inline browser panels in Tauri companion — [#145572](https://github.com/openclaw/openclaw/pull/145572) | Maintainer PR, closes [#145502](https://github.com/openclaw/openclaw/issues/145502) | High — already in flight |
| Account model discovery after sign-in — [#145190](https://github.com/openclaw/openclaw/pull/145190) | In review | High |

**Predicted next-tag contents (not official):** another update/Doctor patch cluster (9.3→9.4 fallout), Gemini skills injection, Workshop registration after migration, child-process reap, Tauri inline browser, and model-picker/session UI polish already sitting in ready-for-look PRs. Large bets (shared memory, Canvas editor, full session-fork API) will wait on security/product review.

---

## 7. User Feedback Summary

**Who is filing:** production operators on macOS arm64, Windows x64, Linux npm-global, and Podman Quadlet / multi-channel (Mattermost + Telegram) fleets. Several reports are generated *inside* OpenClaw (`openclaw-update-report:` hashes on [#145510](https://github.com/openclaw/openclaw/issues/145510), [#145491](https://github.com/openclaw/openclaw/issues/145491)) — the product is now filing its own incidents.

**Pain points**

- **Upgrades feel like a second product.** Users who survived 2026.7.x → 2026.9.3 then fail 9.3 → 9.4 on Doctor, runtime verification, or npm swap. Rollback exists in notes; field reports still show blocked machines.
- **Silent loss.** Compaction drops the turn. Discord drops everything after an error line. Session rebuild drops history. Tool output becomes `""` in long sessions ([#111469](https://github.com/openclaw/openclaw/issues/111469)). Users do not get a retry affordance.
- **Gateway as a single point of fragility.** One MCP timeout, one busy filesystem walk, or a zombie-hook leak can pin a core or kill the process that owns every channel.
- **Shared / multi-user / multi-agent deployments** collide with personal-laptop defaults: `0o600` files, per-agent memory DBs, pairing scopes that cannot be upgraded.
- **Doctor lies or dead-ends.** It reports Workshop proposals retargeted then flags them again; recommends an `alsoAllow` it will not accept; detects orphan FKs with no repair.

**Satisfaction signals**

- Volume of incoming PRs from `steipete`, `obviyus`, `fuller-stack-dev`, `Patrick-Erichsen`, `vincentkoc` plus 3k+ contributors means people *are* building on this stack.
- Channel coverage and “one Gateway, any chat app” remain the reason users stay.
- UI/app work (sidebar shortcuts, saved-message recovery, model catalog caching) is landing in hours, not months.
- LTS `2026.6.35` existing at all is an acknowledgment that not every operator can ride the September schema train.

**Use cases in the wild (from issue text):** always-on Telegram/Discord/Mattermost assistants, large skill/agent fleets on a single Gateway, Chrome-extension browser relay + CDP, Codex app-server with `approvalPolicy: "never"`, Feishu cards, Gmail hooks + Signal notifications, cloud workers from public GitHub, multi-user NFS workspaces.

---

## 8. Backlog Watch

Items that are old, high-impact, and still waiting on a maintainer decision, security review, or a clear recovery path.

**Needs a human decision, not another stale close**

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — zombie children (open since 29 Jun; 16 comments).
- [#112475](https://github.com/openclaw/openclaw/issues/112475) — pairing recovery after device removal (P0, open since 22 Jul).
- [#114158](https://github.com/openclaw/openclaw/issues/114158) — `0o600` vs shared workspaces (security + product).
- [#75187](https://github.com/openclaw/openclaw/issues/75187) — `AGENTS.md` truncation of red-lines (security-adjacent; linked PR exists).
- [#120571](https://github.com/openclaw/openclaw/issues/120571) — `before_tool_call { block: true }` unenforced for Codex-native exec when approvalPolicy is `never` (fails open).
- [#126876](https://github.com/openclaw/openclaw/issues/126876) — 13 screen-reader barriers; first documented blind-user install.
- [#77798](https://github.com/openclaw/openclaw/issues/77798) / [#59109](https://github.com/openclaw/openclaw/issues/59109) — Canvas editor and session-fork; both tagged `needs-product-decision`.
- [#104521](https://github.com/openclaw/openclaw/issues/104521) — native approvals on Feishu/Teams/Mattermost (maintainer-filed, still open).

**Doctor / data-loss with no supported escape hatch**

- [#142586](https://github.com/openclaw/openclaw/issues/142586) — orphan `task_delivery_state` FKs, no recovery.
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — legacy workspace refused.
- [#112313](https://github.com/openclaw/openclaw/issues/112313) — failed outbound rows are immortal.
- [#120781](https://github.com/openclaw/openclaw/pull/120781) — recover omitted historical transcripts; XL, ready for look since 8 Aug.

**Ready-for-maintainer-look pile (risk: review latency, not idea shortage)**

Large compatibility-tagged PRs waiting in the 👀 column: [#121622](https://github.com/openclaw/openclaw/pull/121622) (macOS nearby discovery must not overwrite saved connections), [#145043](https://github.com/openclaw/openclaw/pull/145043) (stale Codex migrations), [#145456](https://github.com/openclaw/openclaw/pull/145456) (verify startup repair; waiting on author), [#144954](https://github.com/openclaw/openclaw/pull/144954) (manual personal skills + sandbox), [#144699](https://github.com/openclaw/openclaw/pull/144699) (shared memory DB — security-boundary).

---

### Health one-liner

OpenClaw is a very large, very fast self-hosted agent gateway whose September releases are adding real product (plugins, cloud workers, history, UI) while the upgrade/Doctor path is still the main production risk. Throughput is excellent; silent message/session loss and child-process isolation are the issues that will define whether 2026.9.x feels like a stable line or another rehearsal.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison — Personal AI Assistant / Agent Runtimes  
**Snapshot date:** 2026-09-12  
**Projects:** OpenClaw · Hermes Agent · IronClaw · QwenPaw · ZeroClaw

---

## 1. Ecosystem Overview

The 2026 personal-assistant stack has split into two layers that used to be one product: a **local/self-hosted agent runtime** (process lifecycle, sessions, skills/MCP, sandbox) and a **multi-channel control plane** (Telegram/Discord/Slack/Teams plus a desktop or web console). All five projects now treat “one Gateway, many surfaces” as table stakes; the competitive work has moved to **upgrade safety, multi-profile isolation, hosted-MCP tenancy, and honest cancellation**. September activity is not a feature freeze. It is a collision between rapid product surface (plugins, cloud workers, Hub, Creator, OIDC) and production operators who will not accept silent message loss, wedged databases, or an updater that marks a correct deferred restart as failure. The field is large enough that review bandwidth—not idea supply—is the scarce resource on the biggest repos.

---

## 2. Activity Comparison

24-hour GitHub window from the provided digests, plus current tagged line. Health is a qualitative 1–10 based on merge throughput, release honesty, P0/P1 residual risk, and whether day-one-of-stable bugs are already paired with fix PRs.

| Project | Stars / forks (approx.) | Issues updated (open/closed) | PRs updated (open / merged-closed) | Latest tag | Releases in window | Health |
|---|---|---|---|---|---|---|
| **OpenClaw** | 389k / 82k | 151 (77 / 74) | 500 (287 / 213) | `2026.9.4` (11 Sep) | 4 (`9.2`–`9.4` + June LTS `2026.6.35`) | **6.5** — industrial throughput, upgrade path still P0 |
| **Hermes Agent** | 245k / 51k | 13 (11 / 2) | 50 (38 / 12) | `v0.21.2` / `v2026.9.11` | 2 | **7.5** — state.db campaign landed; updater/lifecycle residual |
| **QwenPaw** | 34.8k / 3.1k | 21 (16 / 5) | 50 (30 / 20) | `v2.2.1` (11 Sep) | 3 (beta.1 → beta.2 → stable) | **6.5** — feature release + same-day Desktop/MCP/spawn tax |
| **ZeroClaw** | 32.8k / 4.9k | 5 (5 / 0) | 50 (48 / 2) | `v0.8.5` (5 Sep); 0.8.6 freeze | 0 new this week | **7.0** — disciplined freeze; XL security stack waiting on review |
| **IronClaw** | 12.6k / 1.5k | 6 (6 / 0) | 30 (20 / 10) | `v1.4.0` (27 Aug) | 0 | **7.0** — no crash class; hosted-MCP isolation still unfinished |

**Read of the table.** OpenClaw is an order of magnitude larger in both community and issue/PR flux. Hermes and QwenPaw are the next activity band (same PR volume, very different issue density). ZeroClaw’s 50 PRs / 2 merges is a review bottleneck, not inactivity. IronClaw is the smallest but the only repo whose 24h slice contains **no crash or data-loss incident**.

---

## 3. OpenClaw's Position

**Advantages vs peers**
- **Default infrastructure choice.** ~389k stars, ~3,140 contributors, 20+ chat channels, native apps, and a Control UI that is shipping Plugins workspace, prepared cloud sessions, and Skill Workshop in the same week as rollback/rehearsal work. No peer matches channel coverage plus install base.
- **Explicit LTS fork in the same family.** `2026.6.35` exists for operators who cannot take September schema 17. Hermes and QwenPaw ship fast patches; they do not advertise a parallel LTS line in this window.
- **Self-incidenting product.** Several 11–12 Sep tickets are generated inside OpenClaw (`openclaw-update-report:` hashes). That is operational maturity the smaller repos have not reached.

**Technical approach differences**
- OpenClaw is a **TypeScript Gateway process**: one local daemon, pluggable models/harnesses, Doctor as a first-class product surface, schema-candidate rehearsal before activation. Peers split differently: Hermes is Desktop + gateway + managed llama.cpp + multi-profile `state.db`; ZeroClaw and IronClaw are **Rust single-binary / Agent OS** with sandbox and MCP tenancy as native concerns; QwenPaw is AgentScope’s personal OS **plus** Hub/Creator platformization.
- OpenClaw’s current engineering thesis is “safer updates”: isolated candidates, compatible-failure rollback, abandoned-record recovery, `OPENCLAW_CONFIG_READONLY`. Hermes’ thesis this week is “state.db must not wedge.” ZeroClaw’s is “identity + isolation before 0.9.” IronClaw’s is “hosted MCP is multi-tenant.” QwenPaw’s is “per-agent routing + Hub + Creator 1.2.”

**Community size**
- OpenClaw ≫ Hermes ≫ QwenPaw ≈ ZeroClaw ≫ IronClaw on stars. Contributor density tells a different story: Hermes credited **140 contributors in four days** between 0.21.1 and 0.21.2; OpenClaw’s problem is maintainer review of a 287-open PR queue, not recruitment. ZeroClaw has a small distinguished inner circle driving XL security stacks. IronClaw is core-contributor concentrated (kirikov and coordinated MCP pairs).

**The gap that offsets the lead.** Field evidence on 11–12 Sep says rehearsal itself is still a crash/block surface (Doctor legacy-workspace refusal, macOS npm global-install swap, 9.3 binary running against schema-17 candidate, Windows runtime-verification-failed). Peers have narrower blast radii. OpenClaw’s size makes every upgrade-path miss a fleet event.

---

## 4. Shared Technical Focus Areas

Requirements that appear in **two or more** projects this week.

| Shared need | Who | Specific demand |
|---|---|---|
| **Updater / Doctor as a product, not a script** | OpenClaw, Hermes | OpenClaw: candidate schema vs running binary, rollback blocked by schema-changing upgrades. Hermes: deferred restart marked `stale`/`partial` (#107402); 1875s drain after teardown already finished (#108729). |
| **Process & child lifecycle isolation** | OpenClaw, Hermes, ZeroClaw | OpenClaw: unreaped hook/tool zombies since June (#97616); MCP init timeout kills Gateway (#144911). Hermes: Desktop spawn-storms, updater vs live gateway. ZeroClaw: RPC must close on daemon reload (#10262 merged). |
| **Cancellation that is a runtime contract** | QwenPaw, OpenClaw, ZeroClaw | QwenPaw: Stop UI succeeds, backend keeps running, next send 409 (#7567). OpenClaw: compaction/channel errors drop the rest of the turn silently. ZeroClaw: ACP interrupt must persist into the transcript (#10197). |
| **Multi-profile / multi-principal isolation** | Hermes, IronClaw, ZeroClaw, QwenPaw | Hermes: profile switch leaked MCP/secrets and hit a slot-3 hard limit (closed this window). IronClaw: hosted-MCP catalogs keyed by extension id, last-writer-wins (#6778 / #8090). ZeroClaw: OIDC principals + private principal memory (#8289 stack). QwenPaw Hub wishlist: isolated workspaces and admin-owned skills (#7318). |
| **Hosted MCP / plugin catalog correctness** | OpenClaw, IronClaw, QwenPaw, Hermes | OpenClaw: unified Plugins + ClawHub. IronClaw: merge-not-replace + per-caller keys + SEP-414 `_meta`. QwenPaw: 2.2.x MCP register regression vs 2.1 Hub (#7716); stricter allowlists/timeouts. Hermes: SHA-pinned plugin catalog. |
| **Session / history / DB integrity** | OpenClaw, Hermes, QwenPaw | OpenClaw: omitted-history import, IndexedDB close recovery. Hermes: entire 0.21.2 release is a state.db campaign (WAL, FTS, one-row-kills-list, profile DB bind). QwenPaw: ghost sessions, workspace path revert, model config vanishing mid-session. |
| **Channel fidelity (no silent truncation)** | OpenClaw, QwenPaw, IronClaw, ZeroClaw | Discord multi-part truncate; Telegram 409 after IPv6 fallback; Slack “connect account” vs channel-not-connected; Telegram command menu and table rendering; Bluesky/Reddit missing `peer_groups`. |
| **Context economics** | IronClaw, ZeroClaw, Hermes, QwenPaw | IronClaw: 128k prompt cap override + attachment pointer mode (~25k tokens/PDF). ZeroClaw: compact from model-window ratio, not fixed 32k. Hermes: native ctx 262144 thrash on unified-memory Macs. QwenPaw: visual compaction + preserve provider context windows. |
| **CJK / IME / TUI input as first-class** | IronClaw, ZeroClaw, QwenPaw | WebChat IME Enter submits composition; ZeroCode Delete no-op and REPL IUTF8 off; Android newline deferred. Recurrence, not a first report. |
| **Cost / model-routing honesty** | Hermes, QwenPaw | Hermes: unknown models billed $0 (~72% under-count in one report). QwenPaw: `subagent_model` ignored; per-task routing open since June (#4901). |

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **Primary bet** | Universal self-hosted gateway + Control UI | Multi-profile desktop workstation + always-on gateway | Personal OS + team Hub + Creator workbench | Rust single-binary, security-first Agent OS | Rust Agent OS with hosted-MCP / marketplace tenancy |
| **Target operator** | Production fleets on mixed OS, many chat apps | Power users running several bots on one Mac/PC | CN-heavy Desktop + Hub teams + creative jobs | Security-conscious self-hosters, TUI daily drivers | Multi-principal hosts, Slack/Telegram shared workspaces |
| **Architecture** | TS Gateway, Doctor/schema rehearsal, plugins | Desktop + `state.db` / `shared-state.db`, managed llama.cpp | Console/Desktop/Hub, ReMe/PowerContext plugins | Single binary, Landlock/Firejail/Wasm, ZeroRelay | Rust extensions, SEP-414, agent.market package |
| **Release posture this week** | Four tags; product + migration hardening in parallel | Explicit patch campaign after a breaking store rewrite | Feature stable (2.2.1) immediately followed by hotfix funnel | Feature freeze (0.8.6); identity work queued for 0.9 | No tag; hardening toward 1.4.x / 1.5 |
| **What “done” looks like** | Upgrade that does not need a second product | Profiles that do not leak; updater that accounts deferred restart | Stop/MCP/spawn that match the marketing | OIDC principals on every surface | Per-caller MCP catalogs + attribution |
| **Risk shape** | Scale: one Doctor miss × large install base | Lifecycle + settings persistence after DB class closed | Day-one-of-stable Desktop/Windows + multi-agent | Review latency on XL security PRs; Windows CI | Isolation contract open since late July |

OpenClaw wins **breadth**. Hermes wins **local-runtime + multi-bot desktop**. QwenPaw wins **creative/team surface** (Creator 1.2, Hub). ZeroClaw wins **hardening discipline** (typed plugin schemas, fail-closed skill HTTP, mTLS relay already in 0.8.5). IronClaw wins **protocol-level multi-tenancy work** that the larger TypeScript gateways have not yet treated as a first-class MCP contract.

---

## 6. Community Momentum & Maturity

**Tier A — infrastructure scale (OpenClaw).** Highest stars, highest 24h flux, dual-track shipping. Maturity signal: LTS line + self-filed update reports. Immaturity signal: P0 upgrade blockers filed *after* safer-update marketing. This is late-growth infrastructure, not a library.

**Tier B — high-velocity product runtimes (Hermes, QwenPaw).** Both cut two-to-three tags in about a week and pair same-day issues with fix PRs. Hermes is **stabilizing after a store rewrite** (correct sequence: 0.21.0 change → 0.21.2 DB campaign → leftover updater/Desktop). QwenPaw is **expanding and stabilizing at once** (Hub, Creator, routing, and a cancel/MCP/spawn hole). Hermes is slightly more mature this week because the campaign is named and scoped.

**Tier C — constrained / protocol-mature (ZeroClaw, IronClaw).** Lower star counts, higher proportion of security and tenancy work. ZeroClaw is **explicitly freezing features** and stacking OIDC; merge rate is the constraint. IronClaw is **post-1.4 hardening** with no crash class in the slice; the unfinished item is a July isolation bug, not process instability. Both look more “1.x contract completion” than “growth spike.”

**Iteration vs stabilize.** Rapidly iterating: OpenClaw product surface, QwenPaw Hub/Creator/providers, Hermes provider/picker/i18n tracks. Stabilizing: Hermes state.db, OpenClaw Doctor/rollback, ZeroClaw 0.8.6, IronClaw MCP merge-vs-replace. The ecosystem as a whole is in **stabilize-while-shipping**, not a winter.

---

## 7. Trend Signals

1. **The upgrade path is now a product.** Doctor, rehearsal, rollback, drain budgets, and deferred-restart accounting generate more operator heat than new channels. Agent developers should treat “can I leave this box running and patch it” as a launch criterion, not a changelog footnote.

2. **Isolation moved from UX to security boundary.** Multi-profile Desktop, hosted-MCP catalogs, pairing scopes, `0o600` vs NFS, and OIDC principals are the same requirement in different dialects: **one process, many principals**. Designs that key state by extension id, launch profile, or “daemon owns everything” are being rejected in the field.

3. **Silent loss is the trust-killer.** Compaction dropping the in-flight turn, Discord truncating after an error line, Stop that is cosmetic, Kanban cards that report success with zero work, tools returning `""` in long sessions. Operators will forgive a crash they can restart. They will not forgive work that vanishes.

4. **MCP is the extension bus and the new multi-tenant API.** Catalog merge vs replace, SEP-414 attribution, allowlists, timeouts, SHA-pinned catalogs, fail-closed skill HTTP. If you ship MCP, you are shipping a tenancy protocol whether you named it that or not.

5. **Local runtime policy is catching up to advertised context windows.** 262k ctx on unified-memory Macs, 128k hardcoded caps, 32k compact artifacts, PDF text inlined at ~25k tokens. The winning knob is **reserve + pointer mode + window-ratio compact**, not “native max.”

6. **Control-plane honesty beats model catalog breadth.** GPT Image 2.5, GPT-6 Astra, DeepSeek V4.1 Flash, Opus/Fable, Atlas, Serply, Cloudflare Workers AI all landed or are landing. Users still file tickets about $0 billing, vanished model picks, and subagents that ignore `subagent_model`. Routing metadata is now part of reliability.

7. **East-Asian input and ops are no longer edge cases.** IME submit, Telegram tables, Feishu/DingTalk/WeCom/Bale, arXiv-blocked cron with no proxy, CN Desktop paths. Repos that treat composition and restricted networks as afterthoughts will keep reopening the same S2/S3 bugs.

8. **Review bandwidth is the real bottleneck at the top of the market.** OpenClaw’s ready-for-look pile, ZeroClaw’s 48-open / 2-merged day, IronClaw’s months-old SEP-414 intent. For developers choosing a stack: prefer projects whose freeze/LTS policy matches your patch appetite, and budget for the fact that **security isolation PRs age in review, not in design**.

**Practical takeaway for agent developers.** If you need maximum channel coverage and an existing operator community, OpenClaw is the reference—but pin LTS or take 9.4 only with a verified backup. If you need a multi-bot desktop plus local llama.cpp, Hermes 0.21.2 is the repair release to land on. If you need team Hub + creative jobs, QwenPaw 2.2.1 is the feature line, pending a cancel/MCP/spawn patch. If you need a Rust security posture or hosted-MCP tenancy, ZeroClaw 0.8.5 / upcoming 0.9 and IronClaw 1.4.x are the contract-level bets—accept slower tags and unfinished isolation until the stacked PRs merge.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

I'll gather current repo context and fill gaps in the snapshot so the digest is accurate.Fetching full release notes and the most-commented issues for accurate summaries.Pulling the rest of the v0.21.2 notes and the two highest-comment issues.# Hermes Agent Project Digest — 2026-09-12

**Repo:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) · MIT · ~245k stars / ~51k forks  
**Current tagged release:** [v0.21.2 (`v2026.9.11`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11)  
**24h window in this snapshot:** 13 issues updated (11 open, 2 closed) · 50 PRs updated (38 open, 12 merged/closed) · 2 new tags

---

## 1. This Week's Overview

Hermes Agent is in a high-velocity post-`v0.21.0` stabilization week. After the Pantheon release (Bot Mode, multi-profile desktop, session-store rewrite), two patch tags shipped in five days: [v0.21.1 (`v2026.9.7`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7) as a rollup, then [v0.21.2 (`v2026.9.11`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11) as an explicit **state.db reliability campaign** (six PRs, 44 issues closed in that campaign alone). The 24h snapshot still shows industrial-scale inbound traffic: 50 PRs touched, 13 issues refreshed, and a dense cluster of same-day bug reports plus matching fix PRs. Project health is strong on merge throughput and release cadence, but the surface area (Desktop + gateway + local llama.cpp + multi-profile + updater) is generating correlated regressions—especially updater drain, profile isolation, and cost accounting. Community contribution volume remains unusually high for an agent runtime (140 contributors credited in the four days between 0.21.1 and 0.21.2).

---

## 2. Releases

### [v0.21.2 / `v2026.9.11`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11) — 11 Sep 2026  
**“The state.db Patch Release”** · measured at `04dd80a` · **947** non-merge commits · **1,869** files · **+182,504 / −15,564** · **312** merged PRs · **140** contributors.

**Why it exists.** `v0.21.0` rewrote session-store connection handling. On some installs that made `state.db` fragile: second writers cancelled each other’s POSIX locks, healthy WAL DBs were reported corrupt, and one bad row could kill `sessions list`.

**Headline fixes (state.db campaign, 6 PRs / 44 issues):**
- No second writers: hosted rooms moved to `shared-state.db`; dashboard opens read-only first; cron lifecycle guard uses the tracked connection registry; `doctor --fix` refuses unsafe checkpoints ([#108076](https://github.com/NousResearch/hermes-agent/pull/108076) and salvages).
- Healthy WAL stores stop wedging (OpenZFS deleted dentries, `close()` vs `append_message` race, WSL2 I/O, stale lock banners) — [#108082](https://github.com/NousResearch/hermes-agent/pull/108082).
- FTS damage no longer fails the whole turn; index rebuilds independently ([#108130](https://github.com/NousResearch/hermes-agent/pull/108130)).
- One corrupt row no longer kills list/export/insights ([#108086](https://github.com/NousResearch/hermes-agent/pull/108086)).
- Sessions no longer bind to another profile’s DB ([#108074](https://github.com/NousResearch/hermes-agent/pull/108074)).
- Opening `state.db` no longer takes an unnecessary write lock (stall 4–20s → ~0.01s) — [#108067](https://github.com/NousResearch/hermes-agent/pull/108067).

**Also in the 0.21.1→0.21.2 window:**
- Multi-profile isolation (secondary bots no longer inherit default allow-lists).
- Desktop backend spawn-storms on Bot Mode / roster hover / profile switch shut down ([#108069](https://github.com/NousResearch/hermes-agent/pull/108069) cluster).
- Password-blind credential vault (1Password / Bitwarden / local vault) ([#106480](https://github.com/NousResearch/hermes-agent/pull/106480)).
- SHA-pinned plugin catalog + one Desktop Plugins page.
- Nous free-tier + guided first launch (`HERMES_GUEST_ONBOARDING`).
- Gateway delivery, provider billing honesty, Bedrock/Codex/Anthropic routing, new picker models (DeepSeek V4.1 Flash, GPT Image 2.5, Opus 5 / Fable 5.1).
- `hermes update` names the real failure and cannot hang on a stalled fetch ([#108053](https://github.com/NousResearch/hermes-agent/pull/108053)).

**Breaking / migration.** This is billed as a patch. No dedicated breaking-change section in the notes. Operators coming from 0.21.0 with a wedged `state.db` should update to 0.21.2 first; the campaign is specifically for that class. Hosted-room state now lives in `shared-state.db` rather than the root `state.db`.

### [v0.21.1 / `v2026.9.7`](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7) — 7 Sep 2026  
Patch rollup of `main` since [v0.21.0 (`v2026.8.31`)](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.8.31) for tagged deploys. Full curated notes for the 0.21.0→0.22.0 window are **deferred to v0.22.0**. Window stats at tag time: **5,139** non-merge commits, **4,364** files, **632** merged PRs.

**Upgrade path (both tags):** existing install `hermes update`; fresh install via the official install script; managed fleets should pin the new tag through their deploy tooling.

---

## 3. Project Progress

The snapshot does not enumerate the 12 merged/closed PRs by number. Progress that *is* visible:

**Closed in the 24h issue set (2):**
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — dashboard/desktop profile switch was a hybrid of selected profile + launch-profile (MCP tools never loaded; `${VAR}` secrets resolved from the wrong profile). Closed after a long thread (13 comments, open since 19 Jul).
- [#102163](https://github.com/NousResearch/hermes-agent/issues/102163) — v0.21.0 profile-switch regression on macOS: hard slot limit of 3 + session ownership lock. Closed (9 comments).

These two closures, plus the 0.21.2 multi-profile / spawn-storm work, are the week’s clearest product-facing progress: **multi-profile Desktop is being treated as a correctness problem, not a UX nicety.**

**Same-day fix PRs already opened against today’s bugs** (not yet merged in the snapshot, but the pairing is tight):

| Issue | Matching PR |
|---|---|
| [#108785](https://github.com/NousResearch/hermes-agent/issues/108785) custom endpoint Save blanks the key | [#108786](https://github.com/NousResearch/hermes-agent/pull/108786) |
| [#108784](https://github.com/NousResearch/hermes-agent/issues/108784) desktop sessions never record `git_branch` | [#108788](https://github.com/NousResearch/hermes-agent/pull/108788), [#108789](https://github.com/NousResearch/hermes-agent/pull/108789) |
| [#108783](https://github.com/NousResearch/hermes-agent/issues/108783) native ctx 262144 thrashes swap on unified-memory Macs | [#108790](https://github.com/NousResearch/hermes-agent/pull/108790) |
| [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) unknown models billed as $0 | [#108781](https://github.com/NousResearch/hermes-agent/pull/108781) |

**Other active feature tracks in the open PR list:** Cloudflare Workers AI provider ([#108691](https://github.com/NousResearch/hermes-agent/pull/108691)), Bale messaging platform ([#97477](https://github.com/NousResearch/hermes-agent/pull/97477)), Persian RTL UI ([#97522](https://github.com/NousResearch/hermes-agent/pull/97522)), Indonesian docs/locale ([#92192](https://github.com/NousResearch/hermes-agent/pull/92192), [#93632](https://github.com/NousResearch/hermes-agent/pull/93632)), WeCom tool-timer animation ([#96942](https://github.com/NousResearch/hermes-agent/pull/96942)), guided first-launch connect-before-start ([#108317](https://github.com/NousResearch/hermes-agent/pull/108317)), gateway lifecycle notices on their own channel ([#108780](https://github.com/NousResearch/hermes-agent/pull/108780)).

---

## 4. Community Hot Topics

Ranked by comment count in this snapshot.

1. **[#107402](https://github.com/NousResearch/hermes-agent/issues/107402)** — 14 comments, **P1**, still open. `hermes update` run from inside the gateway’s own process tree correctly defers restart until in-flight work finishes, but the updater immediately verifies the fleet, records `state: stale`, ends `partial`, and leaves a permanent “did not restart running gateways” warning. Need: **updater semantics that understand deferred restart as success, not failure.**

2. **[#67605](https://github.com/NousResearch/hermes-agent/issues/67605)** — 13 comments, now **closed**. Profile switch in Desktop/dashboard was partial (MCP + secrets bound to launch profile). Need that drove it: **true per-profile isolation on a shared compute-host process.**

3. **[#102163](https://github.com/NousResearch/hermes-agent/issues/102163)** — 9 comments, now **closed**. v0.21.0 made the local backend slot limit of 3 a hard block and added a session ownership lock. Need: **multi-profile Desktop users running more than three concurrent profiles.**

4. **[#76207](https://github.com/NousResearch/hermes-agent/issues/76207)** — 8 comments, open since 1 Aug. Vite `configLoader: 'native'` warning on `hermes update` plus an ask to refresh npm. Need: **quiet, current install/update UX** (packaging hygiene, not a runtime bug).

**Underlying theme:** power users treat Hermes as a **multi-profile, always-on gateway + local-runtime workstation**. Pain concentrates where those three planes meet: updater vs live gateway, profile vs process identity, and managed llama.cpp vs unified memory.

---

## 5. Bugs & Stability

Ranked by severity using labels + blast radius. “Fix PR” means a same-window PR exists in the snapshot, not that it has merged.

| Sev | Issue | Symptom | Fix PR? |
|---|---|---|---|
| **P1** | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) | Updater leaves permanent stale-fleet warning after a *correct* deferred restart | No dedicated PR in the 24h list |
| **P1** (closed) | [#102163](https://github.com/NousResearch/hermes-agent/issues/102163) | v0.21.0 profile-switch: slot-3 hard limit + ownership lock | Closed this window |
| **P2** | [#108729](https://github.com/NousResearch/hermes-agent/issues/108729) | `hermes update` burns the full **1875s** drain budget; gateway teardown finished in 11.2s with zero sessions, but a stale Feishu/DingTalk WS thread + non-quiesced event loop kept PID alive | None listed |
| **P2** | [#108785](https://github.com/NousResearch/hermes-agent/issues/108785) | Desktop Custom Endpoint **Save** blanks the API key; Test then hits the template `${HERMES_CUSTOM_CUSTOM_API_KEY}` | [#108786](https://github.com/NousResearch/hermes-agent/pull/108786) |
| **P2** | [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) | Unpriced / alias / transit model IDs recorded as **$0**; one user under-counted ~72% (¥8.20 vs ≈¥29) | [#108781](https://github.com/NousResearch/hermes-agent/pull/108781) |
| **P2** | [#108784](https://github.com/NousResearch/hermes-agent/issues/108784) | Desktop-created sessions persist `git_branch = NULL`; lane labels fake `main` | [#108788](https://github.com/NousResearch/hermes-agent/pull/108788), [#108789](https://github.com/NousResearch/hermes-agent/pull/108789) |
| **P2** | [#108783](https://github.com/NousResearch/hermes-agent/issues/108783) (also tagged feature/dup) | Managed llama.cpp pins native ctx (262144) on M1 Max 64 GB; RSS 29–38 GB, swap ~24 GB | [#108790](https://github.com/NousResearch/hermes-agent/pull/108790) |
| **P2** | related PRs [#108778](https://github.com/NousResearch/hermes-agent/pull/108778), [#108779](https://github.com/NousResearch/hermes-agent/pull/108779), [#108787](https://github.com/NousResearch/hermes-agent/pull/108787), [#108762](https://github.com/NousResearch/hermes-agent/pull/108762) | Cron worker inherits repo cwd as terminal CWD; Qwen3.8-via-Anthropic thinks by default; Copilot ACP “no credential” misclassified as unknown; llama.cpp media markers leak into outgoing messages | PRs themselves |
| **P3 / security** | [#108761](https://github.com/NousResearch/hermes-agent/issues/108761) | `web_extract` forwards opaque credential-named query params even though the URL-safety helper already flags them | None listed |
| **P3** | [#108771](https://github.com/NousResearch/hermes-agent/issues/108771) | `_UNCAPPED_PICKER_PROVIDERS` unreachable on the canonical picker lap — plugin providers can never be exempted from `max_models` | None listed |
| **P3** | [#108782](https://github.com/NousResearch/hermes-agent/issues/108782) | Kanban worker/verifier/lander cards report fabricated success with **zero underlying work** | None listed |
| **P3 UX** | [#108791](https://github.com/NousResearch/hermes-agent/issues/108791) | Windows chat scrollbar 4px / 18% opacity — hard to see or grab | None listed |
| closed, historical | [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) | Partial profile switch (MCP + secrets) | Closed this window |

**Stability read:** 0.21.2 closed the *database* class of 0.21.0 regressions. The live residual class is **process lifecycle** (`hermes update` drain / deferred restart) and **Desktop settings persistence** (API keys, git metadata, profile identity). [#108729](https://github.com/NousResearch/hermes-agent/issues/108729) is the highest operational risk still open: a completed teardown that still consumes a 31-minute drain budget will look like a hung upgrade to every gateway operator.

---

## 6. Feature Requests & Roadmap Signals

Likely near-term (fix already drafted or trivial):
- Configurable local-runtime context-window / system-reserve cap — [#108783](https://github.com/NousResearch/hermes-agent/issues/108783) + [#108790](https://github.com/NousResearch/hermes-agent/pull/108790). High probability for next patch; it is a launch-policy knob, not a new backend.
- Versioned user `model_pricing` overrides — [#108775](https://github.com/NousResearch/hermes-agent/issues/108775) + [#108781](https://github.com/NousResearch/hermes-agent/pull/108781).
- Cloudflare Workers AI as a first-class provider — [#108691](https://github.com/NousResearch/hermes-agent/pull/108691).
- Gateway lifecycle notices on a dedicated channel (stop dumping “Gateway shutting down/online” into home) — [#108780](https://github.com/NousResearch/hermes-agent/pull/108780).
- Guided first launch that connects picked apps *before* the first build — [#108317](https://github.com/NousResearch/hermes-agent/pull/108317) (stacked on #108292).

Needs a decision (`needs-decision` label):
- Bale as a bundled Telegram-compatible platform — [#97477](https://github.com/NousResearch/hermes-agent/pull/97477).
- WeCom native stream tool-timer — [#96942](https://github.com/NousResearch/hermes-agent/pull/96942).

Docs / i18n track (P3, slow-burn but active today):
- Indonesian root docs + Docusaurus locale — [#92192](https://github.com/NousResearch/hermes-agent/pull/92192), [#93632](https://github.com/NousResearch/hermes-agent/pull/93632).
- Complete Persian UI with RTL + Vazirmatn — [#97522](https://github.com/NousResearch/hermes-agent/pull/97522).

Predict for **v0.21.3 or v0.22.0**: context-window cap, pricing overrides, custom-endpoint key Save fix, desktop `git_branch` persistence, updater deferred-restart accounting. v0.22.0 is already promised as the curated notes dump for everything since 0.21.0.

---

## 7. User Feedback Summary

**Pain**
- Updater vs live gateway is the loudest operator complaint: deferred restart marked stale ([#107402](https://github.com/NousResearch/hermes-agent/issues/107402)), drain budget burned after teardown already finished ([#108729](https://github.com/NousResearch/hermes-agent/issues/108729)), Vite/npm noise on every update ([#76207](https://github.com/NousResearch/hermes-agent/issues/76207)).
- Multi-profile Desktop still does not *feel* isolated even after 0.21.x: slot limits, launch-profile secret bleed, MCP not loading, desktop sessions missing git metadata.
- Local-runtime users on Apple unified memory cannot run the advertised native context without swap thrash ([#108783](https://github.com/NousResearch/hermes-agent/issues/108783)).
- Cost UI is not trusted: unknown models silent-$0, ~72% under-count in one report ([#108775](https://github.com/NousResearch/hermes-agent/issues/108775)).
- Settings Save that *deletes* the key just entered ([#108785](https://github.com/NousResearch/hermes-agent/issues/108785)) is a trust-destroying desktop defect.
- Cron/Kanban can claim success with no work ([#108782](https://github.com/NousResearch/hermes-agent/issues/108782)) — bad for unattended automation, which is a core advertised use case.

**Use cases visible in the tickets**
- Always-on multi-platform gateway (Feishu, DingTalk, WeCom, Telegram-family, soon Bale).
- Multi-profile Desktop as a roster of bots, not a single chat window.
- Self-hosted llama.cpp on high-RAM Macs (Qwen3.8-27B Q4).
- Spend tracking across alias/transit model IDs.
- Non-English productization (id, fa).

**Satisfaction signal**
- Extremely high inbound PR rate and salvage-credit culture in 0.21.2 notes (community bugs systematically folded into maintainer PRs).
- Two long-running profile bugs closed in this window — users who stayed on the thread since July are getting resolution.
- Rapid same-day issue→PR pairing on 12 Sep (keys, git branch, ctx cap, pricing) is a healthy maintainer reflex.

**Dissatisfaction signal**
- `v0.21.0` was a large behavioral change (session store + slot limits) that shipped ahead of Desktop isolation being complete. 0.21.2 repaired the DB class; updater/lifecycle and settings persistence are the remaining trust issues.

---

## 8. Backlog Watch

Items that need maintainer attention because they are either P1, security-tagged, long-lived, or decision-blocked.

| Item | Age / why it matters |
|---|---|
| [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) P1 updater stale warning | Created 10 Sep, 14 comments, still open the day after 0.21.2. Highest-comment open bug. |
| [#108729](https://github.com/NousResearch/hermes-agent/issues/108729) P2 1875s drain hang | Same class as 107402 (updater × gateway lifecycle). Will keep generating “update is broken” reports until both are fixed together. |
| [#108761](https://github.com/NousResearch/hermes-agent/issues/108761) `type/security` — `web_extract` credential query-param leak | Consistency hole in an existing secret-URL heuristic. Low comment count, high leak potential. |
| [#76207](https://github.com/NousResearch/hermes-agent/issues/76207) Vite / npm warning | Open since **1 Aug**, 8 comments. Packaging noise that every `hermes update` user sees. |
| [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) / [#102163](https://github.com/NousResearch/hermes-agent/issues/102163) | Now closed — watch for reopen if the shared compute-host process still pins launch-profile MCP/secrets in the field. |
| [#97477](https://github.com/NousResearch/hermes-agent/pull/97477) Bale platform | Open since 28 Aug, `needs-decision`. |
| [#96942](https://github.com/NousResearch/hermes-agent/pull/96942) WeCom tool-timer | Open since 28 Aug, `needs-decision` + `sweeper:risk-message-delivery`. |
| [#108782](https://github.com/NousResearch/hermes-agent/issues/108782) Kanban fabricated success | Unattended cron is a headline feature; silent false-success is a product-integrity bug, not a cosmetic one. |
| [#92192](https://github.com/NousResearch/hermes-agent/pull/92192) / [#93632](https://github.com/NousResearch/hermes-agent/pull/93632) id locale | Open ~3 weeks. Not urgent, but they keep getting bumped and will rot without a docs maintainer pass. |
| [#108777](https://github.com/NousResearch/hermes-agent/pull/108777) npm audit / Electron 41.10.7 | Tagged duplicate + security. Needs a single owner so the audit bump does not stall behind the duplicate label. |

---

**Health snapshot:** shipping cadence and contributor density are excellent; 0.21.2 was the right patch. Residual risk is concentrated in **updater lifecycle accounting**, **Desktop settings/profile identity**, **local-runtime memory policy**, and **cost truthfulness**. Those four themes account for most of today’s open P1/P2 volume and are already half-covered by same-day fix PRs.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

I'll gather IronClaw project context and fill gaps in the provided GitHub snapshot so the digest is accurate.Confirming the latest release line so the Releases section stays accurate.# IronClaw Project Digest — 2026-09-12

**Repo:** [nearai/ironclaw](https://github.com/nearai/ironclaw) · Agent OS / personal AI assistant (Rust, Apache-2.0 / MIT) · ~12.6k stars, ~1.5k forks  
**Window:** issues and PRs updated in the last 24 hours as of 2026-09-12, plus related open work those updates sit on.

---

## 1. This Week's Overview

IronClaw remains in a high-throughput post-1.4.0 hardening phase rather than a release-cut phase. In the last 24 hours the repo saw **6 issue updates** (all still open) and **30 PR updates** (**20 open / 10 merged or closed**), with **no new release**. Activity is concentrated in three product surfaces: **hosted MCP multi-tenancy** (catalog isolation, merge-vs-replace, SEP-414 attribution, agent.market bundling), **channel correctness** (Slack shared-channel copy, Telegram command menu), and **WebChat v2 UX** (IME composition, slash-command layout, result-card height). Dependabot is also sweeping Rust and JavaScript lockfiles. Health signal is mixed-but-constructive: core contributors (especially kirikov) are shipping coordinated fix/feature pairs against real multi-principal bugs, while daily OfficeQA taxonomies continue to classify most benchmark misses as **model-quality errors**, not runtime regressions.

---

## 2. Releases

No new versions in this window. Latest published stable remains **[ironclaw-v1.4.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.0)** (2026-08-27). The 1.2 → 1.4 cadence through August has paused in September; current work looks like candidate material for a 1.4.x patch or 1.5 rather than a cut already tagged.

---

## 3. Project Progress

Closed / merged work in the provided set shows a clear MCP + operator-ops theme, plus one channel feature landing.

**Hosted MCP and extension packaging**
- [PR #8083](https://github.com/nearai/ironclaw/pull/8083) — **fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them.** Stops last-writer-wins deletion of another user’s tools on credential-dependent servers.
- [PR #8089](https://github.com/nearai/ironclaw/pull/8089) — **feat(extensions): bundle the agent-market hosted-MCP provider package** (manifest, per-tool schemas, static fallback until live `tools/list`).
- [PR #6760](https://github.com/nearai/ironclaw/pull/6760) — earlier agent-market marketplace bundle (env-configurable server URL); closed as **superseded in shape, not intent** after bundled extensions moved to a single-crate model.
- [PR #6759](https://github.com/nearai/ironclaw/pull/6759) — SEP-414 `_meta` attribution on outbound hosted-MCP `tools/list` + `tools/call`; closed (historical / rebase path; work continues in open [#8084](https://github.com/nearai/ironclaw/pull/8084)).

**Operator / config correctness**
- [PR #8088](https://github.com/nearai/ironclaw/pull/8088) — **feat(common): distinguish a set-but-empty env var from an unset one.** `FOO=` no longer silently falls through to the default — important for endpoint overrides.

**Channels**
- [PR #8072](https://github.com/nearai/ironclaw/pull/8072) — **feat(telegram): register the Bot API command menu at activation.** Chat hamburger now lists `/model`, `/status`, `/new`, `/stop`, `/interrupt`; cleared best-effort on deactivation.

**Dependencies**
- [PR #8080](https://github.com/nearai/ironclaw/pull/8080) — closed Dependabot Rust “everything-else” bump (21 packages). A follow-on open bump is [#8097](https://github.com/nearai/ironclaw/pull/8097) (24 packages).

Still in flight and advancing the same themes: catalog keying per caller ([#8090](https://github.com/nearai/ironclaw/pull/8090)), Slack disconnected-channel copy ([#8076](https://github.com/nearai/ironclaw/pull/8076)), IME-safe composer ([#8092](https://github.com/nearai/ironclaw/pull/8092)), operator-installed package validation ([#8085](https://github.com/nearai/ironclaw/pull/8085)), configurable prompt-context limit ([#8087](https://github.com/nearai/ironclaw/pull/8087)), and attachment pointer mode ([#8082](https://github.com/nearai/ironclaw/pull/8082)).

---

## 4. Community Hot Topics

Comment counts in this snapshot are sparse (most PRs report no comment total; issues have 0–2 comments). “Hottest” is therefore **cluster density + recency**, not reaction score.

**1. Hosted-MCP multi-principal isolation (highest strategic heat)**  
Issue [#6778](https://github.com/nearai/ironclaw/issues/6778) (open since 2026-07-28, updated 2026-09-08) describes catalogs published **per extension id, not per installation**, so `tools/list` under user A’s credential can overwrite or expose metadata for user B on a multi-principal host. Follow-on PRs: [#8090](https://github.com/nearai/ironclaw/pull/8090) (key catalogs per caller), closed [#8083](https://github.com/nearai/ironclaw/pull/8083) (merge instead of replace), [#8084](https://github.com/nearai/ironclaw/pull/8084) (opt-in SEP-414 caller attribution), [#8089](https://github.com/nearai/ironclaw/pull/8089) / [#6760](https://github.com/nearai/ironclaw/pull/6760) (agent.market first-party package).  
**Need:** hosted MCP is now a first-class multi-tenant surface; providers need per-user catalogs, per-conversation attribution, and retry identity — not a single shared slot.

**2. Shared-channel pairing vs. connection state**  
Issue [#8074](https://github.com/nearai/ironclaw/issues/8074) + PR [#8076](https://github.com/nearai/ironclaw/pull/8076). A **paired** user in a **not-connected** shared channel gets unpaired “connect your account” copy instead of channel-not-connected guidance.  
**Need:** rejection taxonomy must be consistent across product, adapter, and OpenAI-compatible surfaces.

**3. CJK / IME chat input**  
Issue [#8091](https://github.com/nearai/ironclaw/issues/8091) + PR [#8092](https://github.com/nearai/ironclaw/pull/8092). Enter that **confirms IME composition** also submits the message (recurrence; Safari `keyCode 229` / `isComposing` false).  
**Need:** WebChat v2 must treat composition as first-class, not as a Western-keyboard afterthought.

**4. Skills visibility gap (CLI vs runtime)**  
Issue [#8086](https://github.com/nearai/ironclaw/issues/8086). `ironclaw skills list` cannot see skills the runtime writes, nor skills belonging to a user the CLI was not configured with. Debugging “why can’t my agent see its skill?” points at the wrong layer.

**5. Benchmark hygiene as an operating ritual**  
Daily taxonomies [#8093](https://github.com/nearai/ironclaw/issues/8093) (2026-09-10) and [#8081](https://github.com/nearai/ironclaw/issues/8081) (2026-09-07) keep OfficeQA non-passes classified — currently “overwhelmingly genuine model errors” on DeepSeek-V4-Flash rather than harness bugs.

---

## 5. Bugs & Stability

Ranked by blast radius. All listed issues are still **open**.

| Severity | Item | Notes |
|---|---|---|
| **High — multi-tenant data / metadata** | [#6778](https://github.com/nearai/ironclaw/issues/6778) hosted-MCP catalogs keyed by extension id | Cross-user metadata exposure on multi-principal servers. Fix path: [#8090](https://github.com/nearai/ironclaw/pull/8090) (open) after merge-not-replace landed in [#8083](https://github.com/nearai/ironclaw/pull/8083). |
| **Medium — product copy / wrong recovery path** | [#8074](https://github.com/nearai/ironclaw/issues/8074) paired user + disconnected shared channel | Users are told to connect *their account* when the *channel* is disconnected. Fix PR: [#8076](https://github.com/nearai/ironclaw/pull/8076) (open, updated 2026-09-11). |
| **Medium — operator debug loop** | [#8086](https://github.com/nearai/ironclaw/issues/8086) `skills list` blind to runtime-written / other-user skills | Empty CLI list misdiagnoses agent skill loading. No linked fix PR in this snapshot. |
| **Medium — input regression (recurrence)** | [#8091](https://github.com/nearai/ironclaw/issues/8091) IME Enter submits | Unfinished CJK/Japanese/Korean messages fire. Fix PR: [#8092](https://github.com/nearai/ironclaw/pull/8092). |
| **Low — layout** | WebUI cards / slash menu | [#8071](https://github.com/nearai/ironclaw/pull/8071) command-result card height collapse; [#8070](https://github.com/nearai/ironclaw/pull/8070) slash-command metadata alignment. Both open, low risk. |
| **Observability, not a crash** | [#8093](https://github.com/nearai/ironclaw/issues/8093), [#8081](https://github.com/nearai/ironclaw/issues/8081) | OfficeQA misses attributed to model numeric / navigation errors, not IronClaw crashes. Useful negative result for runtime stability. |

No crash or data-loss incident is described in this window. The serious item is **isolation of hosted-MCP discovery**, not process stability.

---

## 6. Feature Requests & Roadmap Signals

These are contributor-driven product bets more than drive-by user RFCs, but they read as the next-version outline:

1. **Hosted MCP as a multi-tenant protocol, not a single catalog** — per-caller keys ([#8090](https://github.com/nearai/ironclaw/pull/8090)), SEP-414 `_meta` attribution ([#8084](https://github.com/nearai/ironclaw/pull/8084)), first-party **agent.market** package ([#8089](https://github.com/nearai/ironclaw/pull/8089)). Likely next-release headline if isolation lands cleanly.
2. **Operator-installed packages treated like host-bundled ones** — [#8085](https://github.com/nearai/ironclaw/pull/8085). Unblocks “built but not usable” operator packages (inline dynamic descriptor schema mismatch).
3. **Context-budget controls** — [#8087](https://github.com/nearai/ironclaw/pull/8087) makes the 128k prompt-context limit an override; [#8082](https://github.com/nearai/ironclaw/pull/8082) adds **opt-in pointer mode** so extracted document text is not inlined (~25k tokens/PDF). Direct response to long-thread cost.
4. **Channel completeness** — Telegram command menu already merged ([#8072](https://github.com/nearai/ironclaw/pull/8072)); Slack disconnected-channel distinction is the remaining pairing/UX hole ([#8076](https://github.com/nearai/ironclaw/pull/8076)).
5. **WebChat v2 polish** — IME, slash-command grid, result-card height. Patch-train material, not a version theme.

**Prediction:** isolation + attribution + context/pointer mode are the features most likely to define 1.4.1 or 1.5; Telegram menu and env-empty-string semantics are already in the “landed, wait for tag” bucket.

---

## 7. User Feedback Summary

Feedback in this slice is **operator- and power-user shaped**, not consumer-star ratings.

**Pain points**
- Multi-user / multi-principal hosted MCP: last discovery wins; tools vanish; metadata can leak across installations ([#6778](https://github.com/nearai/ironclaw/issues/6778)).
- Slack shared-channel mental model: pairing ≠ channel connection; wrong notice sends people to the wrong fix ([#8074](https://github.com/nearai/ironclaw/issues/8074)).
- East-Asian input: IME confirm-Enter must not submit ([#8091](https://github.com/nearai/ironclaw/issues/8091)) — a recurrence, so trust in the composer is thin for those locales.
- Skills observability: CLI and runtime do not share a skill namespace ([#8086](https://github.com/nearai/ironclaw/issues/8086)).
- Document attachments burn context and keep costing on later turns ([#8082](https://github.com/nearai/ironclaw/pull/8082)).
- Deployments with >128k models must patch a constant ([#8087](https://github.com/nearai/ironclaw/pull/8087)); empty env vars silently select defaults ([#8088](https://github.com/nearai/ironclaw/pull/8088), now closed).

**Use cases implied**
- Shared Slack/Telegram workspaces with mixed paired / unpaired / channel-connected states.
- Hosted MCP providers whose tool list depends on the caller credential (SaaS / marketplace, including agent.market).
- Operators installing packages beside host-bundled ones.
- Long document workflows (PDF/Office) inside a bounded agent loop.
- CJK composition in WebChat v2.

**Satisfaction signal**
No praise threads in the snapshot. Indirect positive: daily taxonomies are **not** filing runtime bugs against OfficeQA, and several multi-week MCP issues now have concrete PRs rather than sitting idle. Dissatisfaction is specific and technical — isolation, copy, IME, CLI visibility — which is typical of a project past 1.0 that is being run in real multi-user installs.

---

## 8. Backlog Watch

Items that still need a maintainer decision or merge, ordered by how long they have been open or how incomplete the fix path is.

1. **[#6778](https://github.com/nearai/ironclaw/issues/6778)** (opened **2026-07-28**, still OPEN) — original hosted-MCP catalog isolation report. Merge-not-replace ([#8083](https://github.com/nearai/ironclaw/pull/8083)) is closed; **per-caller keying ([#8090](https://github.com/nearai/ironclaw/pull/8090)) is still open.** Do not treat #6778 as done until #8090 lands and the issue is closed.
2. **[#8086](https://github.com/nearai/ironclaw/issues/8086)** — skills list vs runtime-written skills. **No companion PR in this snapshot.** Highest “wrong diagnosis” cost for operators; needs an owner.
3. **[#8084](https://github.com/nearai/ironclaw/pull/8084)** and closed predecessor **[#6759](https://github.com/nearai/ironclaw/pull/6759)** (also from **2026-07-28**) — SEP-414 attribution. Intent is months old; current PR is opt-in per provider manifest. Marketplace / retry-idempotency providers are blocked on this.
4. **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — Slack disconnected shared-channel copy. Updated 2026-09-11; should close [#8074](https://github.com/nearai/ironclaw/issues/8074) when merged.
5. **[#8085](https://github.com/nearai/ironclaw/pull/8085)** — operator-installed vs host-bundled schema validation mismatch. Quiet but blocks “package built, cannot activate.”
6. **[#8082](https://github.com/nearai/ironclaw/pull/8082)** / **[#8087](https://github.com/nearai/ironclaw/pull/8087)** — context economics. Not bugs; they will keep generating “why did my window vanish” tickets until shipped.
7. Dependabot noise: [#8097](https://github.com/nearai/ironclaw/pull/8097), [#8096](https://github.com/nearai/ironclaw/pull/8096), [#8094](https://github.com/nearai/ironclaw/pull/8094), [#8095](https://github.com/nearai/ironclaw/pull/8095). Process load, not product risk, unless review lags behind the MCP isolation PRs.

---

**Health snapshot:** shipping cadence is healthy (30 PR touches / day-scale window, 10 closures, no release freeze panic). The project’s risk is not inactivity; it is **finishing the multi-tenant MCP contract** that has been open since late July, and not letting WebChat IME / Slack copy / skills-CLI gaps linger as recurring trust nicks while that larger isolation work lands.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

I'll pull the official repo pages and release notes so the digest matches the live project rather than only the truncated snapshot.Fetching the full v2.2.1 notes and the Hub discussion so the digest can list what actually shipped versus what users still want.# QwenPaw Project Digest — 2026-09-12

**Repo:** [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)  
**Window:** activity snapshot for the last 24 hours as of 2026-09-12 (Issues 21 / PRs 50 / releases 3), plus the just-shipped v2.2.1 line.  
**Project:** open-source personal AI assistant from the AgentScope team (formerly CoPaw). Local/cloud deploy, multi-agent, Skills/MCP, IM channels, ReMe memory, Console + Desktop + Hub. ~34.8k stars / ~3.1k forks.

---

## 1. This Week's Overview

QwenPaw is in a post-stable-release surge, not a quiet maintenance week. Maintainers published **v2.2.1-beta.1** (Sep 8), **v2.2.1-beta.2** (Sep 10), and **stable v2.2.1** (Sep 11), then immediately absorbed a dense wave of Desktop/Web regressions, subagent failures, and Hub/ops follow-ups.

Activity in the last 24 hours is unusually high for a personal-assistant codebase: **21 issues** (16 still open) and **50 PRs** (30 still open, 20 merged/closed). That is a healthy merge engine plus a visible “day-one of stable” bug funnel.

Project health is **strong on velocity and contributor breadth**, weaker on **runtime correctness after 2.2.x**: stop-does-not-stop, MCP registration breakage, subagent timeouts/model-override drop, disappearing model configs, and workspace-path persistence are the issues that will decide whether 2.2.1 feels like a polish release or a hot-fix cycle.

The product thesis is also shifting. v2.2.0 introduced self-hosted **QwenPaw Hub**; v2.2.1 added per-agent model routing, Creator 1.2, unified env vars, and ReMe/PowerContext memory work. Community energy is now split between *personal assistant polish* and *team/multi-tenant platform*.

---

## 2. Releases

Three tags in four days; stable is **v2.2.1** (published 2026-09-11 by [@cuiyuebing](https://github.com/cuiyuebing), commit `cae5773`). Also on PyPI as `qwenpaw 2.2.1` and Docker `agentscope/qwenpaw:v2.2.1`.

### v2.2.1 (stable) — [release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1)

Headline from the official news line: *Creator 1.2 blueprint workbench, per-Agent model routing, and unified environment management.*

**Added**
- **Models / agents / memory:** per-agent model routing with provider prefs and fallback ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)); Auto Fin proactive memory review + ReMe upgrade ([#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441)); PowerContext as optional long-term memory backend in Console ([#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080)); tighter built-in agent policy on scope, untrusted content, confirmations, tools, completion ([#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)).
- **Creator 1.2.0:** blueprint workbench, multi-timeline compare, reusable video templates, MiniMax H3, snapshot rollback, clearer agent progress, Docker deploy ([#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)).
- **Console / workspaces:** unified env-var settings for agents, MCP, tools, local models ([#7538](https://github.com/agentscope-ai/QwenPaw/pull/7538)); one-click plugin/PawApp updates ([#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)); sidebar/Settings redesign ([#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502)); direct path entry for session project dirs ([#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593)); Agent Kanban i18n ([#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482)).
- **Skills / MCP:** Skill instruction preload ([#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183)); Make Skill drafting/validation/publish ([#7509](https://github.com/agentscope-ai/QwenPaw/pull/7509)); Skill versions + dependency validation ([#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)); HTTP/SSE MCP connection timeouts ([#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)).

**Changed**
- Memory backends get a consistent lifecycle; ADBPG and PowerContext ship as plugins ([#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561), [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)).
- Console theme tokens ([#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487)); mobile agent selector ([#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)).

**Fixed (selected)**
- Streaming/session races and queued-send bypass ([#7523](https://github.com/agentscope-ai/QwenPaw/pull/7523), [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610), [#7237](https://github.com/agentscope-ai/QwenPaw/pull/7237)).
- MCP tool allowlist enforcement ([#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504)); legacy MCP 401 discovery ([#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)).
- PDF text fallback for non-multimodal models ([#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621)) — *multimodal path still reported broken, see #7689*.
- Hub runtime start no longer blocks lifecycle; CLI auth to local runtime ([#7566](https://github.com/agentscope-ai/QwenPaw/pull/7566), [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631)).
- Memory backend unavailable → actionable status + plugin fallback ([#7544](https://github.com/agentscope-ai/QwenPaw/pull/7544), [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663)).
- Windows ACP workspace stall ([#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)); Chromium install off the startup path ([#7539](https://github.com/agentscope-ai/QwenPaw/pull/7539)).

**Breaking / migration**
- Release notes do **not** list a breaking-change block. Practical migration notes from the change set:
  - Memory backends (ADBPG / PowerContext) are now **plugins** with a shared lifecycle — re-check Console memory backend config after upgrade.
  - Per-agent routing is new; existing global model settings may not apply to spawned subagents until #7676 / #4901 are fully closed.
  - MCP timeouts and allowlists are stricter; 2.1.x MCP servers that relied on loose discovery can fail on 2.2.x (#7716).
  - Creator 1.2 adds snapshot/blueprint concepts; old Creator projects should open, but multi-image job cancellation is still a known trap (#7693).

### Pre-releases

- [v2.2.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1) — agent model routing (#7501), website docs for 2.2.0, streaming session sync.
- [v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2) — mobile agent selector (#7623), console CSS alignment, version bump to 2.2.1b2.

Installation verification issue for stable: [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) (closed, release-duty).

---

## 3. Project Progress

The 24h PR set is split between **stabilizing 2.2.1** and **extending 2.2.x surface area**. Closed/merged items in the snapshot:

| Area | Closed / merged | What advanced |
|---|---|---|
| API / validation | [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | Return 422 for non-finite validation inputs |
| Console sessions | [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | Grouped session pagination; drop “Collapse List”, keep scroll position |
| Models | [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | Preserve provider-resolved context windows (avoid premature compaction) |
| Telegram | [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | Markdown tables as `<pre>` instead of raw pipes |
| Docs / chore | [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994) | Stale v2.1.0 release-notes chore closed |
| Issues closed as product/process | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177), [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698), [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707), [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) | Deploy homepage UX, subagent model bug, ghost sessions (invalid), Android newline (defer), release verification |

**Still moving on `main` (open, high-signal):**
- Subagent model-override diagnosis — [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680)
- Serply as `web_search` provider — [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) (pairs with [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711))
- Hub local admin bootstrap — [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)
- Telegram rich tables + optional intermediate-message cleanup — [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713), [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592)
- Playwright driver self-heal — [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)
- Chat files drawer to the right — [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)
- Visual compaction rewrite — [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)
- Multi-channel bot-manager plugin — [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702)
- Atlas Cloud provider — [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)
- CI slim + release-time full gate — [#7697](https://github.com/agentscope-ai/QwenPaw/pull/7697)
- Master-key file permission harden — [#7699](https://github.com/agentscope-ai/QwenPaw/pull/7699)
- Custom-provider discovery status codes — [#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684)

Read: **platformization continues** (Hub admin, bot manager, more providers) while **core agent runtime is still leaking state** (subagent model, stop signal, MCP, workspace path).

---

## 4. Community Hot Topics

Ranked by comment volume in the supplied set.

### 1. QwenPaw Hub — what next? (26 comments)
[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — open since 2026-08-26, updated 2026-09-11.  
QwenPaw started as a personal assistant; Hub is the first multi-user/team answer. Related older ask: multi-user access and admin-managed skills ([#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324)).  
**Need underneath:** teams want one URL, isolated workspaces/credentials, and admin-owned skills — without giving up local-process/Docker control. Follow-on engineering already visible: local admin bootstrap ([#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)).

### 2. Web deploy homepage UX (10 comments, now closed)
[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — [platform.agentscope.io/deploy](https://platform.agentscope.io/deploy) entry placement and mobile “Open vs Stop” mis-tap risk.  
**Need:** cloud/web users treat the deploy page as the *primary control surface*, not a footer.

### 3. Stop button lies (6 comments, open)
[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — UI shows stopped; backend keeps running; next send hits HTTP 409.  
**Need:** cancellation must be a real runtime contract, not a Console decoration. This collides with queued-send work already merged in #7610.

### Smaller but thematically loud (3 comments each)
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) (closed) + [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) (open since June) + [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) — **per-task / subagent model selection**. Users want Claude-Code-style cheap-model dispatch.
- [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — spawn subagent never finishes (timeout even with huge limits).
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — ghost sessions / index vs disk desync (closed invalid, but the failure mode is real to users).

**Underlying demand pattern:** multi-agent cost control, trustworthy task lifecycle (start/stop/persist), and Hub as a team product — not more surface features.

---

## 5. Bugs & Stability

Severity is judged by user-visible data loss, stuck compute, or upgrade breakage.

### Critical
| Issue | Symptom | Fix signal |
|---|---|---|
| [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | Stop UI succeeds; task still runs; 409 on next prompt | Open; related races were patched in #7610 / #7523 but this path remains |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | Every `spawn_subagent` times out on Win 2.2.0 | Open; no dedicated fix PR in the top-20 list |
| [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | MCP connect/register broken since 2.2.x; 2.1.1b3 Hub worked | Open; regression vs 2.1 |

### High
| Issue | Symptom | Fix signal |
|---|---|---|
| [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` ignored; child inherits parent `active_model` | Closed in snapshot; diagnostic PR [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) still open — treat as **not fully done** until #4901 moves |
| [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | Configured LLM vanishes mid-session; must reselect | Open; Desktop 2.2.1 |
| [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | Default workspace path reverts to old `D:\Program Files` | Open; onboarding/UX + persistence bug |
| [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | PDF `file` blocks still sent to multimodal `/chat/completions` after #7621 | Open; partial fix only covered `supports_multimodal=False` |
| [#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) | Creator multi-image: user “approve” cancels in-flight job; stuck `RUNNING`, no reschedule | Open |
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper cron fails silently when arXiv is blocked; inbox says “no content” | Open; ReMe plugin + no proxy config |

### Medium
- [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — scheduled jobs “no output”; answer folded into thinking/steps.
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — session index vs disk file desync (closed invalid; still a support load).
- Provider discovery masking real HTTP/bot-challenge errors — fix in flight [#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684).
- Dead Playwright driver never rebuilds — long-running [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776).

**Stability read:** v2.2.1 fixed a large class of Console races and MCP allowlist holes, but **Desktop Windows + multi-agent spawn + MCP upgrade path** are the current reliability tax. A 2.2.2 patch focused on cancel, MCP, and subagent config would match the issue mix better than more features.

---

## 6. Feature Requests & Roadmap Signals

Likely near-term (PRs already open or tiny surface):
- Serply `web_search` backend — [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) / [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712)
- History groups for `chat_with_agent` / `submit_to_agent` / proactive mail — [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710)
- Default Loop template + rename “默认” → “标准” — [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714)
- Console layout: conversation left, files/preview right — [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) / [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)
- Hub `--init-admin` headless bootstrap — [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)
- Unified multi-channel bot-manager plugin — [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702)
- Atlas Cloud provider — [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)

Medium-term (repeated, architecturally heavier):
- **True per-task model routing for subagents** — [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) (open since 2026-06-02). v2.2.1 shipped *per-agent* routing (#7501); users immediately found *per-spawn* still broken (#7676). This is the next obvious routing milestone.
- **DeepSeek provider fidelity** — native capability metadata, prompt-prefix stability, KV-cache observability — [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717)
- **Hub 2.x** after the #7318 wishlist: admin-managed skills, tighter tenant isolation, operator UX without a browser.
- Visual compaction / context quality — [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) plus #7652 already merged.

Deferred / closed-for-later:
- Android IME newline vs submit — [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707) (`Close-and-review-later`).

**Prediction for 2.2.2 / 2.3.0:** a stability patch (cancel, MCP, subagent_model, workspace path) is more likely than another Creator feature drop; Hub admin bootstrap and search-provider plugins are the features already on the merge ramp.

---

## 7. User Feedback Summary

**Who is talking:** heavy Desktop Windows users (`2.2.1` Tauri), Web Console / mobile deploy users, and early Hub operators. Chinese-language issues dominate day-to-day UX reports; English issues cluster on providers (DeepSeek, Serply, PDF multimodal).

**Pain points**
- Control plane distrust: stop is cosmetic; models and workspaces “forget” settings; cron output disappears into thinking.
- Multi-agent is marketed but operationally fragile (timeouts, ignored `subagent_model`, uncategorized inter-agent chats).
- 2.2.x upgrade tax: MCP that worked on 2.1.x Hub fails after upgrade.
- Network reality in CN/restricted environments: Daily Paper / arXiv has no proxy knob and hides `httpx` failures.
- Creator production: serial image gen + human approval can permanently wedge jobs.
- Discoverability: workspace-as-project vs default agent dir is unexplained for non-IDE users (#7705).

**Use cases visible in the queue**
- Personal daily paper / memory cron (ReMe Daily Paper).
- Cost-split multi-model collaboration (Haiku-style subtasks).
- Team Hub on a remote box with no browser port-forward.
- Telegram as a first-class channel (tables, cleanup of tool-call spam).
- Multi-channel bot ops (WeChat, DingTalk, etc.) from one plugin.
- Long creative jobs in Creator (multi-image, video templates).

**Satisfaction vs dissatisfaction**
- Satisfaction: release cadence is excellent; first-time contributors are landing real PRs (Telegram, Serply, Atlas, Playwright heal); v2.2.1 *did* address streaming races, env-var sprawl, and Creator 1.2.
- Dissatisfaction: 2.2.x feels unfinished on the paths users use every hour (stop, MCP, spawn, settings persistence). Mobile web is “already pretty good” (#7707) except IME submit — a rare explicit compliment in this batch.

---

## 8. Backlog Watch

Items that need a maintainer decision, not another drive-by comment.

1. **[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)** — per-task model for `spawn_subagent`. Open since 2026-06-02. Touched again 2026-09-11. This is the parent of #7676 / #7680 and the most cited product gap versus Claude Code.
2. **[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)** — Hub “what next?” 26 comments, no closed-out roadmap post in the snapshot. Risk: Hub becomes a feature dump instead of a sequenced 2.3 plan.
3. **[#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)** — Playwright “die once, dead forever.” Open since 2026-08-07, still “ready-for-human-review.” Browser-use is a advertised capability; this is a reliability hole.
4. **[#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)** — Atlas Cloud provider. Open since 2026-07-27. First-time contributor, long dwell time.
5. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)** — spawn subagent all-timeout. User pasted debug notes; needs an owner, not another “set timeout higher.”
6. **[#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)** — MCP 2.2.x regression. Upgrade-blocking for Hub users coming from 2.1.1b3.
7. **[#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689)** — #7621 incomplete; multimodal PDF path still 4xx.
8. **[#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693)** — Creator approval vs serial image slot. Easy to strand paid/GPU time.

---

### Health snapshot

| Signal | Reading |
|---|---|
| Release engine | Healthy — beta.1 → beta.2 → stable in 3 days, Docker/PyPI in sync |
| Contributor mix | Healthy — many `first-time-contributor` PRs in Telegram, search, providers, CI |
| Runtime correctness | Stressed — cancel, MCP, subagent, config persistence |
| Product direction | Clear — personal OS + team Hub + Creator, but Hub roadmap still a discussion thread |
| Near-term risk | Shipping more surface (bot-manager, extra providers) before 2.2.1 hotfixes |

**Bottom line:** QwenPaw 2.2.1 is a real feature release, not a version bump. Community throughput is high. The next digest will look like a success if cancel/MCP/subagent-model are closed; it will look like fragmentation if Hub and Creator keep expanding on top of an unreliable spawn/stop core.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

I'll gather official project context and fill in release, PR, and issue details so the digest is accurate.Fetching the full v0.8.5 notes and the key issue/PR pages next.# ZeroClaw Project Digest — 2026-09-12

ZeroClaw is a Rust-native, self-hosted personal AI agent runtime (single binary; multi-agent, 30+ channels, 20+ providers, sandboxing). Official repo: [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw) (~32.8k stars, ~4.9k forks).

---

## 1. This Week's Overview

The project is in a **post-v0.8.5 stabilization** phase. v0.8.5 shipped on 5 Sep 2026 (454 commits, 73 contributors) as a security / connectivity / operator-experience cut; the active line is now **v0.8.6** (bugs, regressions, security, CI/packaging only — new features go to Parking Lot or v0.9.0).

Activity in the last 24 hours is **contribution-heavy but merge-constrained**: **50 PRs updated** (48 still open, 2 merged/closed) versus only **5 issues** touched (all still open). That pattern — large stacked security PRs plus a thin merge queue — is typical of a mature pre-1.0 runtime under an explicit freeze.

Health signal is mixed-positive: release engineering and identity work are advancing in public, but Windows advisory CI and TUI input bugs are leaking through, and several XL security PRs have been open since July–August awaiting maintainer review.

---

## 2. Releases

### v0.8.5 — 5 Sep 2026  
[github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)

Security, connectivity, and operator-experience release. Headline items:

- **ZeroRelay + ZeroRouter**: blind forwarding with native mTLS enrollment; hosted routing preset and public model catalog ([#10142](https://github.com/zeroclaw-labs/zeroclaw/pull/10142), [#9645](https://github.com/zeroclaw-labs/zeroclaw/pull/9645), [#10453](https://github.com/zeroclaw-labs/zeroclaw/pull/10453)).
- **Chat / dashboard**: multiple conversations per agent, multi-tab same agent, image attach/drop ([#9353](https://github.com/zeroclaw-labs/zeroclaw/pull/9353), [#9355](https://github.com/zeroclaw-labs/zeroclaw/pull/9355), [#10544](https://github.com/zeroclaw-labs/zeroclaw/pull/10544)).
- **Providers**: Anthropic live thinking display; Grok Build ACP and Atlas Cloud first-class; stronger compatible-provider response, attribution, image, proxy, and retry handling.
- **Hardening**: plugin instance schemas, scoped secrets, host-owned egress, bounded exports, path-traversal fix ([GHSA-93f6-34w8-5g98](https://github.com/zeroclaw-labs/zeroclaw)), Wasmtime advisory upgrades, Landlock tiers, fail-closed skill HTTP.
- **Release engineering**: Rust 1.98 builders / 1.96 source floor, pinned release tools, expanded MUSL/Alpine, coordinated 23-crate crates.io publication.

**Breaking changes (upgrade before plugins / skills / nodes / WATI / contributor scripts):**

| Change | Action |
|---|---|
| Typed plugin instance config is mandatory ([#9126](https://github.com/zeroclaw-labs/zeroclaw/pull/9126)) | Declare a schema; use the full instance key from `zeroclaw plugin info` |
| Skill HTTP is fail-closed ([#10369](https://github.com/zeroclaw-labs/zeroclaw/pull/10369)) | Direct URLs only; data-only placeholders; no `/ ? & #` injection, redirects, or ambient proxy |
| Legacy node transport retired ([#10289](https://github.com/zeroclaw-labs/zeroclaw/pull/10289)) | Delete `[node_transport]`; keep `[nodes]`; rotate reused secrets |
| TodoWrite config moved to ZeroCode ([#9013](https://github.com/zeroclaw-labs/zeroclaw/pull/9013)) | Copy `[todotracker]` into `zerocode-config.toml`; rename `ZEROCLAW_todotracker__*` → `ZEROCODE_todotracker__*` |
| WATI channel removed ([#9571](https://github.com/zeroclaw-labs/zeroclaw/pull/9571)) | Move to WhatsApp Cloud or WhatsApp Web |
| Aardvark / robot-kit crates dropped ([#9853](https://github.com/zeroclaw-labs/zeroclaw/pull/9853)) | Stay on v0.8.4 if still needed in-tree |
| Root Cargo package renamed `zeroclaw` ([#9835](https://github.com/zeroclaw-labs/zeroclaw/pull/9835)) | Scripts: `-p zeroclawlabs` → `-p zeroclaw` (binary name unchanged) |

No newer tag has shipped since v0.8.5. Weekly v0.8.6 cuts are expected to take only ready bug/security/CI slices.

---

## 3. Project Progress

**Merged / closed in the last 24h: 2 PRs.** Documented merge:

- **[#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262)** (merged 11 Sep) — `fix(rpc): close RPC connections on daemon reload and unstick zerocode quickstart`  
  Reload now cancels local-socket and WSS RPC so clients see EOF/Close instead of a stale dispatcher; bounded drain (6s) before supervisor retirement; ZeroCode checks replacement daemon PID; Quickstart timeouts capped; Tokio worker stacks raised to 8 MiB to stop Quickstart stack overflows. Follow-ups: [#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791), [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792).

**What is advancing on `master` but not merged yet (high-signal open work):**

| Theme | PRs | Status |
|---|---|---|
| RFC 7141 / OIDC identity stack (stages 3–6 of [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)) | [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) → [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) → [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) → [#10263](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) → [#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265) → [#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268) → [#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270) → [#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274) → [#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275) → [#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) | Stacked XL PRs, updated today; this is the v0.9.0 spine |
| Agent lifecycle single source of truth | [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) | Shared live-config authority for daemon RPC, gateway, channels, ACP, CLI |
| Sandbox / launcher path canonicalization | [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) | Resolve host launchers before workspace cwd (native, Docker, Firejail, Bubblewrap) |
| Channel inbound allowlists | [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) | Bluesky + Reddit now require `peer_groups` / sender auth |
| ACP interrupt recovery | [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) | Persist interrupted turn progress into the transcript |
| Context compaction | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) | Compact budget from model window ratio, not a fixed 32k |
| Plugin install egress ceremony | [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) | Grant ceremony on plugin install/list |
| ZeroCode UX | [#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553), [#10648](https://github.com/zeroclaw-labs/zeroclaw/pull/10648) | Selected text → chat; Fluent/label render cache |
| Windows publish-contract CI | [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676) | Path comparison so gateway exception matches on Windows |

Net: **identity, isolation, and operator UX are the real product motion**; v0.8.6 itself is a holding line.

---

## 4. Community Hot Topics

Comment counts were not supplied in the snapshot (listed as undefined). Ranking below uses **update recency, stack depth, risk labels, and contributor concentration**.

1. **Identity & Access / OIDC tracker** — [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) (open since 24 Jun; updated 11 Sep)  
   Coordinates RFC 7141 stages: `AuthProvider` → canonical principals → inbound auth → session/memory isolation → browser PKCE / device grant. JordanTheJet is driving a 10-PR stack. Need: multi-user / multi-surface installs cannot stay on “daemon owns everything.”

2. **Host launcher / sandbox cwd** — [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) (risk:high, size:XL, needs-maintainer-review)  
   Need: agents must not pick up a workspace-relative binary when the operator meant a host tool. Touches Firejail, Bubblewrap, Docker, and coding-CLI argv.

3. **Inbound channel authorization gaps** — [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) (open since 27 Jul)  
   Bluesky and Reddit skipped `peer_groups` / `is_user_allowed`. Need: every inbound adapter on the same allowlist contract.

4. **Live-config races** — [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)  
   Need: daemon, gateway, channels, ACP, and CLI must not mutate cloned snapshots independently (agent admission / session / cron).

5. **ZeroCode as daily driver** — [#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553), plus today’s input bugs [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) / [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)  
   Need: the TUI has to behave like a real editor (selection → composer, Delete, UTF-8 backspace).

6. **Git risk classifier** — [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) (open since 1 Aug)  
   `git -C <path> <verb>` was classified as if `-C` were the subcommand. Need: policy that understands global git options.

Underlying demand is consistent: **self-hosted multi-agent security that is correct on every channel and every OS**, plus a TUI that does not fight CJK/UTF-8 input.

---

## 5. Bugs & Stability

Ranked by stated severity, then blast radius.

| Sev | Issue | Component | Notes / fix PR |
|---|---|---|---|
| **S2** | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) — REPL never enables terminal IUTF8 | `channel` / `zeroclaw agent` interactive REPL | Backspace after multi-byte chars deletes raw bytes, leaving broken UTF-8. Opened today. No fix PR in the snapshot. |
| **S3** | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) — ZeroCode chat ignores Delete | `zerocode/tui` | Delete is a no-op in the composer. Opened today. No fix PR in the snapshot. |
| **S3 / CI** | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) — Windows nextest publish-contract | `tooling/ci` | `published_crates_never_include_files_outside_their_own_directory` fails on every head because the gateway exception is string-compared, not path-compared. **Fix in flight:** [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676). |
| **Advisory CI** | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) — three Windows-only `zeroclaw-runtime` failures | Advisory Windows nextest (`plugin-host=true`) | Failed on a PR that only touched cron; no code-under-test change. Looks like job flake or environment drift, not a product regression — but it is burning review time. |
| **High (security, not a crash)** | [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381), [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428), [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) | sandbox / channels / policy | Open high-risk fixes, not yet on `master`. |

No new crash-on-start reports in this window. The reload/Quickstart hang class was addressed by merged [#10262](https://github.com/zeroclaw-labs/zeroclaw/pull/10262). Windows remains the weakest CI surface.

---

## 6. Feature Requests & Roadmap Signals

**Likely in a v0.8.6 weekly cut** (freeze-compatible):

- Windows publish-contract path compare ([#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676))
- REPL IUTF8 / Delete-key fixes if they stay small
- Residual RPC reload follow-ups ([#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791), [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792))
- ZeroCode render/cache polish ([#10648](https://github.com/zeroclaw-labs/zeroclaw/pull/10648)) if treated as regression/perf

**Likely v0.9.0 (auth + breaking security), not 0.8.6:**

- Full OIDC stack: token-verification provider, RPC principal enforcement, principal-owned sessions, private principal memory, browserless device-grant enrollment, browser PKCE + cross-surface enrollment, Nevis/`iam_policy` retirement ([#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)–[#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321); tracker [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289))
- Plugin egress grant ceremony ([#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584))
- Model-window-ratio context compaction ([#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535))
- Coordinated agent lifecycle mutations ([#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621))

**Other live cohorts** (not this week’s news, but they shape the next major): ACP/MCP embedded resources (~64%), Memory recall (~75%), SOP daemon-owned execution (~68%), ZeroCode consolidation (~63%), Goal Mode (~60%), ZeroRelay remaining integration (~36%). Parking Lot holds 124 open items.

Prediction: the next *tagged* binary is a thin v0.8.6; the next *product* jump is OIDC principals on v0.9.0, gated on that stacked review.

---

## 7. User Feedback Summary

Inferred from issue/PR text (not from Discord/surveys):

**Pain**

- TUI/REPL input is unfinished for real typing: Delete dead, UTF-8 backspace wrong — acute for CJK operators (`kouhe3`).
- Windows is a second-class CI citizen: advisory nextest failures with no corresponding product change, plus path-separator publish-contract breakage.
- Inbound social channels (Bluesky, Reddit) were not on the same sender-auth path as Telegram/Slack/WhatsApp — operators who turned on those adapters got a quieter, riskier default.
- Daemon reload used to leave ZeroCode and RPC clients stuck; that specific complaint now has a merged fix.
- Context windows still fight a 32k-token compact artifact; operators with long-context models want ratio-based trim ([#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)).

**Use cases visible in the diff**

- Always-on multi-agent daemon + ZeroCode TUI as the daily console
- Multi-channel personal assistant (Telegram, Slack, WhatsApp Web, Matrix, plus Bluesky/Reddit/Line/WeChat)
- Sandboxed shell / coding-CLI agents (Bubblewrap, Firejail, Docker)
- Plugin/WASM skills with explicit egress grants
- Upcoming: browser and headless OIDC enrollment for shared or remote operators

**Satisfaction**

- Release cadence and changelog quality are high (v0.8.5 is a real operator-facing note, not a dump).
- Distinguished-contributor density (Audacity88, JordanTheJet, IftekharUddin, NiuBlibing, MannXo) shows a functioning inner circle.
- Dissatisfaction clusters on **review latency for XL security PRs** and **Windows/TUI papercuts**, not on “the project is stalled.”

---

## 8. Backlog Watch

Items that need maintainer attention (age + risk + “needs-*-review / needs-author-action”):

| Item | Open since | Why it is stuck |
|---|---|---|
| [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) OIDC tracker | 24 Jun | Parent of the whole identity stack; 3 comments only. Stages exist as PRs; the tracker itself is quiet. |
| [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) Bluesky/Reddit sender auth | 27 Jul | `needs-author-action`, risk:high, size:XL. Security hole in two public inbound adapters. |
| [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) context compact ratio | 29 Jul | `needs-author-action`. Useful, but freeze-ineligible unless reframed as a bug. |
| [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) plugin egress ceremony | 31 Jul | Review notes already rewritten by a maintainer; still open. |
| [#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) git `-C` risk classifier | 1 Aug | `needs-author-action`, risk:high. Agents have no `cd`; this is how they touch repos. |
| [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) ACP interrupted-turn persist | 20 Aug | `needs-maintainer-review`, risk:high. |
| [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) host launcher resolution | 26 Aug | `needs-maintainer-review`, risk:high. Sandbox correctness. |
| [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)–[#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) OIDC stack | 22–24 Aug | Correctly stacked, but one blocked parent blocks ten children. |
| [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) / [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | 12 Sep | Fresh S2/S3 TUI bugs with zero comments. Easy wins if claimed. |

**Watch metric for next week:** merge rate vs. 48 open updated PRs. If the OIDC parent does not land, v0.9.0 stays a paper milestone even while v0.8.6 weekly cuts continue.

---

*Sources: provided 24h GitHub snapshot (5 issues, 50 PRs, 1 release), [v0.8.5 notes](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5), [milestones](https://github.com/zeroclaw-labs/zeroclaw/milestones), repo README. Comment/reaction counts were not present in the snapshot, so “hot” ranking used recency, labels, and stack depth.*

</details>