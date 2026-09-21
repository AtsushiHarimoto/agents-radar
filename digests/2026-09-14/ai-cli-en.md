# AI CLI Tools Community Digest 2026-09-14

> Generated: 2026-09-13 22:07 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

Gemini CLI digest is missing; I'll check whether a current public snapshot exists so the comparison table stays complete.# AI CLI Tools Cross-Comparison — 2026-09-14

Sources: community digest packs for Claude Code, OpenAI Codex, GitHub Copilot CLI, OpenCode, Pi, and Qwen Code; Gemini CLI digest generation failed, so Gemini is included only from public release/channel state.

## 1. Ecosystem Overview

AI coding CLIs are no longer “chat in a terminal.” They are becoming multi-surface agent runtimes: TUI + Desktop + IDE + remote control + plugin/MCP marketplaces, with effort/reasoning knobs (`max` / `ultra`), Skills, worktrees, and session import/export. Ship cadence is extremely high—Claude Code 2.1.265–270, Codex 0.155.0-alpha.3.x, Copilot CLI 1.0.84-x, Qwen Code 0.23.3, OpenCode 1.18.30 plus early v2 tags—and that speed is colliding with secondary surfaces (Windows/WSL, Desktop auto-update, VS Code, MCP handshake). The shared fight this week is not model quality; it is **session integrity, sandbox/permissions, MCP lifecycle, usage accounting, and long-session TUI/heap survival**. Teams that treat the CLI as a daily driver should pin versions and treat “latest” as a canary, not a default.

## 2. Activity Comparison

Counts below are **this-week digest windows**, not lifetime repo totals. “Hot issues / key PRs” are the items maintainers or digest authors selected. Discussions marked **N/A** where the digest omitted them or the channel was not provided—not treated as inactive.

| Tool | Hot issues (digest) | Key PRs (digest) | Discussions (digest) | Release status this window |
| --- | --- | --- | --- | --- |
| **Claude Code** | 10 + honorable mentions (Desktop relaunch #42776, multi-account #36151) | ~10 listed (plugin eval/tests, hooks, `/diff`) | Not broken out as a channel in digest | **Dense stable patches:** v2.1.265 → v2.1.270 |
| **OpenAI Codex** | 10 + honorable mentions (WSL project lifecycle, quota meta-tracker) | ~10 listed, **all closed** in window | Active Ideas/Q&A/Show-and-tell (remote control 190 👍, `/rewind` 134 👍) | **Rust alphas** 0.155.0-alpha.3–3.10 + **Python SDK 0.154.0** |
| **Gemini CLI** | Digest **failed** — treat issue/PR/discussion counts as **N/A** | **N/A** | **N/A** | Still shipping: stable **v0.59.0** (2026-09-08), preview **v0.60.0-preview.0**, nightlies through **v0.61.0-nightly.20260913**; consumer free tier previously pointed at Antigravity CLI |
| **GitHub Copilot CLI** | 10 listed (Vim closed; MCP/OOM/WSL open) | ~10 in 24h (several bot/docs/security) | Omitted → **N/A** | **v1.0.84-2 … 1.0.84-5** (Vim GA, JSONL import, plugin split commands) |
| **OpenCode** | 10 (clipboard still #1 by 👍; 1.18.30 crash; Zen/Muse errors) | ~10 (context-window fail-fast, tool_choice, image URLs) | Feature requests live in Issues more than a separate digest section | **v1.18.30** latest notes; **v2.0.0–v2.0.3** tags already colliding with users |
| **Pi** | 10 (TUI scale, compaction thinking cap, Codex timeout) | ~10 (Foundry, Muse OAuth, serverTools, mid-conversation system msgs) | Strong Show-and-tell (multiple independent GUIs on `pi --mode rpc`) | **No release in last 24h** |
| **Qwen Code** | 7 updated issues (light 👍; TUI React crash, AUTO approvals) | ~10 product/CI PRs (container subagents, Playwright SDK, structured memory) | Omitted → **N/A** | **v0.23.3** + nightlies, Desktop **v0.3.0**, TS SDK **0.1.12**, CUA driver **v0.20.6** |

## 3. Shared Feature Directions

Requirements that show up in **two or more** communities:

- **Skills / plugins as a platform, not a folder of markdown**  
  Claude Code: `claude plugin eval`, `--plugin-dir`, first-party mods as source. Copilot CLI: `instruction list` / `lsp list` / plugin enable-disable, `disable-model-invocation` still broken. OpenCode/Qwen: slash-skill args and Skill side effects on resume. Cross-surface Skills sync is an explicit Claude request (Desktop ↔ CLI).

- **MCP must be spec-correct and session-safe**  
  Copilot: `server/discover` before `initialize`, OAuth port mismatch, `--resume` killing stdio servers, workspace `.mcp.json` ignored. OpenCode: MCP toggle missing in new UI. Claude: Chrome MCP profile disambiguation. Gemini public notes this week emphasize MCP OAuth SSRF hardening and restricted-mode MCP filtering.

- **Effort / reasoning as a first-class policy**  
  Codex shipped `max` / `ultra`. Claude added `maxEffortLevel` across Bedrock/Vertex/Foundry. Pi is isolating compaction from inherited thinking level so adaptive thinking does not clip `max_tokens`. Users want effort persisted across sessions, not re-prompted.

- **Undo, rewind, session fidelity**  
  Codex discussions demand `/rewind` / `/revert`. Qwen is refactoring rewind by stable prompt identity and restoring Skill hooks on resume. Claude/Codex/OpenCode all report history wipe or “stuck session” after updates. Copilot added semantic JSONL session/memory **import**.

- **Remote / multi-client control**  
  Codex: ChatGPT mobile → headless Codex (190 👍). Claude: Remote Control bridges dropped on Windows auto-update. Pi: RPC disposition events so GUIs know queued vs started. VS Code “stale thread owner” appears in Codex and notification gaps in Claude.

- **Windows / WSL as the default failure cluster**  
  Claude Desktop relaunch lock; Codex WSL project create/remove and sandbox Git HTTPS; Copilot WSL 215% CPU + plugin file locks; OpenCode offline installer missing ripgrep and silent Desktop aborts; Pi Windows Store shell aliases and 2-core redraw saturation.

- **Observability and honest metering**  
  Claude: timestamps, hide inline diffs, `/cost` aligned with gateway pricing. Codex: quota UI vs local logs, third-party limit dashboards. Copilot: HydraFusion/OTel phase credits. OpenCode: fail-fast when fixed prompt overhead already exceeds the window. Pi: startup-time budget vs jcode.

- **Permissions as durable policy**  
  Plan agent ignoring parent `settings.json` (Claude), authorization fatigue / 1-hour auto-approve expiry (Copilot), AUTO mode confirmations not reaching classifier (Qwen), worktree pre-approval, OS secret stores instead of plaintext creds.

## 4. Differentiation Analysis

| Tool | Feature focus this week | Target user | Technical approach |
| --- | --- | --- | --- |
| **Claude Code** | Plugin eval harness, multi-plugin load, gateway pricing/telemetry parity, effort caps, Skills sync debt | Anthropic-stack power users spanning Desktop + CLI + Cowork | Fast CLI patch train; product gaps linger on Desktop/auth; plugins becoming an engineered subsystem with colocated tests |
| **Codex** | Reasoning-effort values, Windows sandbox ownership/cleanup, TUI history/search, command-center sessions | ChatGPT-plan subscribers who want agent + Desktop + VS Code in one account | Rust core + Python SDK; heavy sandbox/worktree work; community filling meters, coordinators, `/rewind` |
| **Gemini CLI** | Security envelope: MCP OAuth SSRF, fail-closed workspace trust, restricted MCP, tool-output provenance | Google-ecosystem / enterprise Code Assist; free consumer path has been redirected to Antigravity | Daily nightlies + weekly stable/preview; digest gap makes community heat harder to score this week |
| **Copilot CLI** | Vim GA, grammar-driven completions, JSONL session import, plugin/LSP listing split | GitHub-native developers already in Copilot/VS Code | Node TUI; enterprise MCP (Atlassian etc.); heap/resume fragility is the tax on long sessions |
| **OpenCode** | Multi-provider lowering (Bedrock ARNs, empty `tool_choice`, image URLs), Astra prompts, v1→v2 layout | Provider-agnostic / OSS-first users, including crypto Pay-Go demand | Aggressive versioning (v1 stable crash + v2 tags); AI payload correctness is the current firefight |
| **Pi** | TUI scale, provider completeness (Azure Foundry, Muse/Antigravity/Cursor Pro OAuth), `serverTools`, RPC for external GUIs | Extension/RPC builders and multi-provider fleets | Relatively quiet release day; energy moving **outward** into independent GUIs rather than a first-party Desktop bet |
| **Qwen Code** | Reasoning presets, containerized subagents, Playwright browser SDK, structured memory, web-shell operator UX | Qwen/Kimi/DeepSeek users and teams that want isolated child agents | Monorepo with CLI + Desktop + TS SDK + CUA driver; CI heap and TUI React loops are the current drag |

## 5. Community Momentum & Maturity

- **Highest product heat:** Claude Code and Codex. Long-lived issues with hundreds of 👍 (multi-account 721 👍; Desktop relaunch 181 comments) plus dense official patches. These look like **category incumbents** whose communities now file *platform* bugs (identity, remote bridges, quota trust), not “please add chat.”
- **Fastest raw iteration:** Claude 2.1.265–270, Codex alpha.3.x burst, Copilot 1.0.84-x, Qwen nightlies. Fast trains are fixing core CLI while IDE/Desktop/WSL lag—explicitly called out in Claude and Codex pain sections.
- **Ecosystem-around-the-core:** Codex (Awesome list, CoCo, Polter, limit dashboards) and Pi (Heao, Phosphor, Pi Manager, Eco Coding on RPC) show maturity via **third-party shells**, which usually means the protocol is useful and the official UX is incomplete.
- **Highest “update is dangerous” risk:** OpenCode 1.18.30 first-prompt crash + Zen `encrypted_content` errors while v2 tags already exist. Claude 2.1.269 WSL dictation paste and Remote Control drop on auto-update. Treat latest-stable as canary.
- **Copilot CLI** is mid-maturity: Vim request closed after long demand, interchange format landing, but MCP handshake and 4 GiB heap OOMs are production blockers for long `--resume` work.
- **Qwen Code** is building the broadest *surface set* (Desktop, SDK, CUA driver, container backends) with lighter public 👍; signal is in CI/TUI correctness, not viral issues.
- **Pi** looks architecturally mature (session tree prune, mid-conversation system messages, provider matrix) but TUI rendering at scale is not yet “done.”
- **Gemini CLI** remains a high-star public project with a disciplined nightly/preview/stable channel, but this week’s missing digest plus the consumer→Antigravity split makes community momentum harder to compare apples-to-apples.

## 6. Trend Signals

1. **The bottleneck moved from “can the model code?” to “can the runtime keep a week-long agent session honest?”** History after upgrade, queued follow-ups, stuck sessions, silent `AbortError`, and resume that drops MCP or Skill hooks are now first-order product bugs.

2. **MCP is the interoperability layer and the sharpest edge.** Spec order (`initialize` vs `discover`), OAuth callback ports, resume vs stdio lifetime, restricted-mode filtering, and SSRF in metadata discovery are the same class of problem across vendors. Teams should budget integration time for handshake, not just tool schemas.

3. **Windows/WSL is still not a first-class agent OS.** Sandbox credentials, Defender on unsigned Computer-Use binaries, file locks from the IDE, TCC/Local Network on macOS, and auto-update dropping remote bridges are structural, not one-off.

4. **Usage meters need cryptographic-grade trust.** Codex users built third-party dashboards because 5-hour bars jump 70%→100% in minutes. Claude is wiring gateway `pricing:` so `/cost` matches the spend meter. Expect procurement and power users to demand token-level reconciliation.

5. **Agent control planes are emerging outside any single vendor.** Planner/worker (ChatGPT + Codex workers), CoCo/Polter supervisors, Pi RPC GUIs, Qwen container backends, Claude plugin eval—developers should design for **orchestrating multiple CLIs**, not marrying one binary.

6. **Practical guidance for decision-makers**
   - Pin patch versions; delay Desktop auto-update on remote/WSL fleets.
   - Prefer tools with explicit session interchange (Copilot JSONL; Qwen rewind-by-prompt-id; Claude plugin eval) if you run long-lived agents.
   - If Windows + sandbox + Git remotes are non-negotiable, treat Codex and Claude Desktop issues as known residual risk this week.
   - If multi-provider and custom GUIs matter more than a polished first-party Desktop, Pi and OpenCode are the extension-friendly bets—OpenCode only after pinning off 1.18.30 if you hit the crash.
   - Budget MCP + permissions policy as a platform workstream, not an afternoon config task.

The market is converging on the same checklist: durable identity, durable sessions, durable permissions, honest cost, and MCP that survives resume. Vendors that only win the model race will still lose daily drivers until those five hold on Windows, WSL, and Desktop—not just in a clean Linux TUI.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

I'll pull the official repo pages so comment counts and PR status are accurate before ranking.# Claude Code Skills Community Highlights  
**Source:** [anthropics/skills](https://github.com/anthropics/skills) · snapshot **2026-09-14**  
PRs are treated as Skill submissions; Issues as demand signals. PR comment counts in the source extract were unset, so ranking below uses **update recency, issue linkage, and thematic weight**.

---

## 1. Top Skills Ranking

**1. skill-creator eval harness (trigger / recall = 0%)**  
[PR #1298](https://github.com/anthropics/skills/pull/1298) · OPEN · updated 2026-09-13  
[Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) · related [PR #1099](https://github.com/anthropics/skills/pull/1099), [Issue #1721](https://github.com/anthropics/skills/issues/1721)  

**Function:** Repair `run_eval.py` so description-optimization is not optimizing against noise. Today every description scores `recall=0%`; Windows pipe reads, trigger detection, and parallel workers are all broken.  
**Why it matters:** This is the official authoring loop. If eval is dead, community Skills cannot be measured or improved. Longest-lived bug cluster in the repo (Mar–Sep).  
**Status:** Open; still being patched as of mid-September.

**2. mcp-builder (MCP ≥2 + evaluation reliability)**  
[PR #1742](https://github.com/anthropics/skills/pull/1742) · OPEN · updated 2026-09-13  
Also [PR #1724](https://github.com/anthropics/skills/pull/1724), [PR #1602](https://github.com/anthropics/skills/pull/1602), [Issue #1390](https://github.com/anthropics/skills/issues/1390)  

**Function:** Keep the Skill that *builds MCP servers* current: `streamable_http_client` rename, custom headers, default model → `claude-sonnet-5`, and stop fabricating tool errors when MCP returns `TextContent`.  
**Why it matters:** MCP is the primary way Skills talk to tools. A broken builder Skill multiplies failure across every new integration.  
**Status:** Open; several stacked fixes, last touch 13 Sep.

**3. document-typography**  
[PR #514](https://github.com/anthropics/skills/pull/514) · OPEN since 2026-03-04  

**Function:** Typographic QC for generated docs — orphan wraps, widow headings, numbering misalignment.  
**Why it matters:** Hits every Claude-produced document; authors argue users never ask for typography, so the Skill must fire unprompted.  
**Status:** Open, stale since March — high conceptual demand, low merge velocity.

**4. frontend-design clarity rewrite**  
[PR #210](https://github.com/anthropics/skills/pull/210) · OPEN  
Official skill was later updated on main ([#1713](https://github.com/anthropics/skills/commit), 3 Sep) to avoid generic design defaults.  

**Function:** Make frontend-design instructions executable in a single conversation instead of essay-like guidance.  
**Why it matters:** One of the highest-visibility official Skills in external rankings; community still wants tighter actionability.  
**Status:** Community PR open; official line already iterating.

**5. Pyxel retro-game Skill**  
[PR #525](https://github.com/anthropics/skills/pull/525) · OPEN · updated 2026-09-13  

**Function:** Workflow for [pyxel-mcp](https://github.com/kitao/pyxel-mcp): write → run_and_capture → inspect → iterate pixel/8-bit games in Python.  
**Why it matters:** Rare “fun + MCP + closed loop” Skill; still receiving updates six months after open.  
**Status:** Open, actively maintained.

**6. Hivemind — zero-cost multi-agent orchestration**  
[PR #1628](https://github.com/anthropics/skills/pull/1628) · OPEN  

**Function:** Claude Code plans/reviews/merges; cheap headless [opencode](https://opencode.ai) workers do mechanical work.  
**Why it matters:** Explicit response to context-as-scarce-resource. Aligns with later `/skill-doctor` work on unused Skill token cost.  
**Status:** Open (Aug 21–24 burst).

**7. self-audit / reasoning quality gate**  
[PR #1367](https://github.com/anthropics/skills/pull/1367) · OPEN  
Paired proposal [Issue #1385](https://github.com/anthropics/skills/issues/1385)  

**Function:** Mechanical file verification first, then a four-dimension reasoning audit ordered by damage severity. Universal, stack-agnostic.  
**Why it matters:** Community is asking for *delivery gates*, not more generators.  
**Status:** Open; v1.3.0 proposed, not merged.

**8. Buffer GraphQL Agent Skill**  
[PR #1627](https://github.com/anthropics/skills/pull/1627) · OPEN · updated 2026-09-05  

**Function:** Portable Skill for Buffer’s GraphQL API — discover channels, schedule (`addToQueue` / `customSchedule`), analyze posts from any agent runtime.  
**Why it matters:** Concrete “Skill as portable API wrapper” pattern beyond Anthropic-only tools.  
**Status:** Open.

Honorable mentions still open: [ODT Skill #486](https://github.com/anthropics/skills/pull/486), [scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615), [docx comment/orphan + bookmark ID fixes #1734 / #541](https://github.com/anthropics/skills/pull/1734), [skill-quality + security analyzers #83](https://github.com/anthropics/skills/pull/83).

---

## 2. Community Demand Trends (from Issues)

| Theme | Signal | Links |
|---|---|---|
| **Trust & namespace** | Highest-comment issue in the set | [#492](https://github.com/anthropics/skills/issues/492) — 43 comments. Community Skills shipping under `anthropic/` impersonate official Skills and inherit elevated trust. |
| **Org-wide sharing** | Product gap, 8 👍 | [#228](https://github.com/anthropics/skills/issues/228) — no Slack-file-and-reupload workflow. |
| **Eval / trigger reliability** | Blocks Skill quality loops | [#556](https://github.com/anthropics/skills/issues/556), [#1721](https://github.com/anthropics/skills/issues/1721), [#1390](https://github.com/anthropics/skills/issues/1390) |
| **Context hygiene** | Skills that inject too much | [#1487](https://github.com/anthropics/skills/issues/1487) (`claude-api` ~156k tokens); duplicates [#189](https://github.com/anthropics/skills/issues/189) |
| **Governance / safety Skills** | Proposed, not shipped as official | [#412](https://github.com/anthropics/skills/issues/412) agent-governance; [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint ACL-in-SKILL.md risk |
| **Compact agent state** | Context compression as a Skill | [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` |
| **Skills ↔ MCP** | Treat a Skill as an MCP surface | [#16](https://github.com/anthropics/skills/issues/16) |
| **Enterprise runtime** | Bedrock / platform gaps | [#29](https://github.com/anthropics/skills/issues/29) |

Anticipated *new Skill directions* (not just bugfixes): **quality/security analyzers**, **reasoning gates**, **memory compaction**, **HPC/Slurm ops**, **social scheduling APIs**, **document formats beyond DOCX/PDF (ODT, typography)**, **org skill libraries**.

---

## 3. High-Potential Pending Skills

Likely to land or keep attracting review because they are still OPEN **and** recently touched, or they unblock other Skills:

| Skill / PR | Why it may land soon |
|---|---|
| [fix skill-creator eval #1298](https://github.com/anthropics/skills/pull/1298) | Unblocks every author; updated yesterday (13 Sep). |
| [mcp-builder mcp≥2 #1742](https://github.com/anthropics/skills/pull/1742) | Compatibility break with current MCP; updated 13 Sep. |
| [Pyxel #525](https://github.com/anthropics/skills/pull/525) | Six-month lifespan, still updated 13 Sep — maintainer is responsive. |
| [Buffer API #1627](https://github.com/anthropics/skills/pull/1627) | Clean portable-API template; touched 5 Sep. |
| [Hivemind #1628](https://github.com/anthropics/skills/pull/1628) | Cost-arbitrage multi-agent pattern; conceptually aligned with official context-audit work. |
| [self-audit #1367](https://github.com/anthropics/skills/pull/1367) + [quality gate #1385](https://github.com/anthropics/skills/issues/1385) | Complements (does not replace) official `/skill-doctor`. |
| [claude-api retired IDs #1607](https://github.com/anthropics/skills/pull/1607) | Small, correct, unblocks model-card drift. |
| [UIZZE partner listing #1595](https://github.com/anthropics/skills/pull/1595) | Marketplace/partner surface, low code risk. |

Stale-but-valuable: typography [#514](https://github.com/anthropics/skills/pull/514), ODT [#486](https://github.com/anthropics/skills/pull/486), analyzers [#83](https://github.com/anthropics/skills/pull/83) — demand is real, review bandwidth is not.

---

## 4. Skills Ecosystem Insight

**The community’s concentrated demand is not “more Skills” — it is trustworthy, measurable, context-cheap Skills: a working eval loop, a clean official-vs-community trust boundary, and gates that stop agents from shipping unverified or bloated output.**

---

# Claude Code Community Digest — 2026-09-14

Source: [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. This Week's Highlights

Claude Code shipped a dense patch train from **v2.1.265 through v2.1.270**, centered on plugins (`claude plugin eval`, multi-plugin `--plugin-dir`), gateway pricing/telemetry alignment, effort-level caps across Bedrock/Vertex/Foundry, and a regression fix for stale git permission prompts. Community heat remains on long-lived product gaps—Windows Desktop relaunch locks, multi-account switching, Desktop/CLI Skills sync—while new 2.1.269+ regressions (dictation paste in VS Code WSL, Remote Control bridges dropped on auto-update) show the release cadence is outrunning some surfaces.

## 2. Releases

**v2.1.270** — Fixed read-only git commands in Bash unexpectedly asking for permission after a long-running session (regression from 2.1.269).  
https://github.com/anthropics/claude-code/releases

**v2.1.269** — Added `claude plugin eval` (scored, reproducible plugin evals with JSON + HTML report). Added `/output-style [name]` to list/switch output styles, including Remote Control and cloud/other surfaces.

**v2.1.268** — Gateway `pricing:` in `gateway.yaml` so signed-in clients get matching rates via managed settings (`/cost` and telemetry align with the spend meter). Startup warning when `access_control.allow_cidrs` is empty.

**v2.1.267** — `maxEffortLevel` (top-level or per model under `modelSettings`) caps effort on every provider including Bedrock, Vertex, and Foundry. `--system-prompt-snapshot off` re-renders the system prompt on every request.

**v2.1.266** — Fixed 2.1.265 gateway/proxy regression: `CLAUDE_CODE_USE_GATEWAY` no longer forces Cloud-gateway sign-in by itself.

**v2.1.265** — Telemetry now includes `user.email` and `user.groups` for Desktop/Cowork via gateway (parity with terminal). `--plugin-dir` can point at a folder of plugins; child folders with manifests load and hot-update.

## 3. Hot Issues

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776)** — Desktop fails to relaunch on Windows (orphaned process file lock). 181 comments, 88 👍. Highest-engagement bug; users still hitting it months after filing.

2. **[#36151](https://github.com/anthropics/claude-code/issues/36151)** — Multi-account switching in Claude Mobile without a shared email. 176 comments, **721 👍**. Dominant auth/product request across personal + work accounts.

3. **[#20697](https://github.com/anthropics/claude-code/issues/20697)** — Sync Skills between Claude Desktop and Claude Code CLI. 44 comments, 154 👍. Core workflow fracture as Skills become first-class.

4. **[#44763](https://github.com/anthropics/claude-code/issues/44763)** — Show timestamps on conversation messages. 37 comments, 88 👍. Needed for long-running / background agent monitoring.

5. **[#76694](https://github.com/anthropics/claude-code/issues/76694)** — Cowork lost “Choose a folder” after Chat/Cowork merge; context menu became upload-only. 24 comments. Breaks multi-folder project setup.

6. **[#37951](https://github.com/anthropics/claude-code/issues/37951)** — Option to hide inline diffs for Edit/Write tool output. 23 comments, 73 👍. TUI noise during high-volume file edits.

7. **[#10906](https://github.com/anthropics/claude-code/issues/10906)** — Built-in Plan agent ignores parent `settings.json` permissions and re-prompts. 20 comments, 46 👍. Persistent agent/permissions mismatch since late 2025.

8. **[#29928](https://github.com/anthropics/claude-code/issues/29928)** — Built-in completion notifications for the VS Code extension. 13 comments, 32 👍. `Notification` / `idle_prompt` does not fire in VS Code.

9. **[#93782](https://github.com/anthropics/claude-code/issues/93782)** — Regression in 2.1.269: dictation-tool paste (clipboard + simulated Ctrl+V) not inserted in VS Code integrated terminal on WSL2. Fresh, has repro; 2.1.268 works.

10. **[#94049](https://github.com/anthropics/claude-code/issues/94049)** — Auto-update silently drops all Remote Control bridges; running sessions cannot reconnect (Windows, 2.1.266→2.1.270). High operational impact for remote sessions.

Honorable mentions: Chrome MCP profile disambiguation ([#74902](https://github.com/anthropics/claude-code/issues/74902)), worktree pre-approval outside `.claude/worktrees/` ([#77069](https://github.com/anthropics/claude-code/issues/77069)), OS secret store for credentials ([#73582](https://github.com/anthropics/claude-code/issues/73582)), OAuth `redirect_uri` reject on 2.1.267 ([#93216](https://github.com/anthropics/claude-code/issues/93216)), macOS TCC / Local Network SSH failures ([#90227](https://github.com/anthropics/claude-code/issues/90227), [#93707](https://github.com/anthropics/claude-code/issues/93707)).

## 4. Key PR Progress

1. **[#93951](https://github.com/anthropics/claude-code/pull/93951)** (OPEN) — Move diff / sec-default / telemetry tests next to the mods; run via `claude plugin test`.

2. **[#93912](https://github.com/anthropics/claude-code/pull/93912)** (CLOSED) — Unit tests for those three mods, typed against plugin declarations, driven through the engine’s `$`.

3. **[#93215](https://github.com/anthropics/claude-code/pull/93215)** (CLOSED) — Publish built-in hooks-module plugins as source: `sec-default`, `diff` (`/diff`), `telemetry`.

4. **[#93244](https://github.com/anthropics/claude-code/pull/93244)** (CLOSED) — Plugin API renames, telemetry tightening, git backend seam for `/diff`.

5. **[#93452](https://github.com/anthropics/claude-code/pull/93452)** (CLOSED) — Align `/diff` mod pane with the built-in diff panel (hunks, close control, empty state, resize).

6. **[#93932](https://github.com/anthropics/claude-code/pull/93932)** (CLOSED) — Telemetry `types` path made `./`-relative to match the manifest schema.

7. **[#89404](https://github.com/anthropics/claude-code/pull/89404)** (OPEN) — `validate-agent.sh` no longer aborts on first warning; stops false-flagging valid agents (`set -e` + arithmetic).

8. **[#79148](https://github.com/anthropics/claude-code/pull/79148)** (OPEN) — Require `hookify.` prefix on example rule filenames so shipped examples actually load.

9. **[#61716](https://github.com/anthropics/claude-code/pull/61716)** (OPEN) — Docs: false “usage limit” is often context overflow after `/compact` fails on 1M models.

10. **[#39043](https://github.com/anthropics/claude-code/pull/39043)** (OPEN) — Remove “retro-futuristic” recommendation from the Frontend Design Skill.

Also notable: closed build/installer work ([#41621](https://github.com/anthropics/claude-code/pull/41621), [#26175](https://github.com/anthropics/claude-code/pull/26175)), hookify matcher trim ([#42205](https://github.com/anthropics/claude-code/pull/42205)), stale/autoclose window 14→90 days ([#63686](https://github.com/anthropics/claude-code/pull/63686)).

## 6. Feature Request Trends

- **Cross-surface identity and assets**: multi-account switch without shared email; Skills sync Desktop ↔ CLI; community plugin marketplaces on Cowork / claude.ai.
- **Observability in the TUI/IDE**: message timestamps, hide inline diffs, persistent active-model indicator in VS Code, reliable “agent finished” notifications.
- **Permissions as policy, not prompts**: Plan agent honors parent `settings.json`; pre-approve `EnterWorktree` outside default paths; persist `ultracode`/`max` effort across sessions (related to new `maxEffortLevel`).
- **Plugin / mods platform**: eval harness, folder-of-plugins load, first-party mods published as source with colocated tests.
- **Credential and execution hygiene**: OS secret store instead of plaintext under `~/.claude/`; visible Local vs Remote execution mode per Cowork project.

## 7. Developer Pain Points

- **Release regressions on secondary surfaces**: WSL+VS Code paste, Remote Control bridges dropped on Windows auto-update, OAuth callback rejection, gateway env-var forcing sign-in. Fast patch trains are fixing core CLI while IDE/Desktop/remote lag.
- **macOS TCC / sandbox attribution**: stale audit tokens, Documents access loss, SSH “No route to host” because subprocesses lack Local Network permission.
- **Cowork project model after Chat merge**: “Choose a folder” gone; one-folder bind; docs still describe multi-folder behavior.
- **Agent permission loops**: Plan agent and worktree entry keep re-prompting despite allow-lists.
- **Opaque failures**: Stop-hook “JSON validation failed” masking real evaluator errors; Workflow name silently resolving to built-in over local `.claude/workflows/`; classifiers triggering on vocabulary not intent.
- **Windows Desktop lifecycle**: orphaned lock file blocking relaunch remains the longest-running high-comment bug.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-14

Source: [github.com/openai/codex](https://github.com/openai/codex)

## 1. This Week's Highlights

Codex shipped a dense burst of **0.155.0-alpha.3.x Rust builds** plus **Python SDK 0.154.0**, including new `max` / `ultra` reasoning-effort values. Community heat is concentrated on **Windows sandbox and WSL project lifecycle failures**, **quota/usage accounting that does not match local logs**, and **Desktop/app-server thread state** (queued follow-ups, history wiped after updates). Internal PRs show heavy work on Windows sandbox ownership/cleanup, TUI history/search, and command-center session UX.

## 2. Releases

**Rust alphas (last 24h):** `0.155.0-alpha.3` through `0.155.0-alpha.3.10`, plus `0.155.0-alpha.2` / `.2.3` and `0.154.0-alpha.6.2`. Release notes in the dump are thin (tag-only).

**Python SDK 0.154.0:** `pip install --upgrade openai-codex==0.154.0` (Python 3.10+), paired with `openai-codex-cli-bin==0.154.0`.

Notable product notes attached to this wave:
- Add `max` and `ultra` reasoning-effort values — [#39662](https://github.com/openai/codex/pull/39662)
- Add `ExternalMessage` to synchronous APIs (note truncated in source)
- CI-only **Cygwin voice** build inputs (`voice-cygwin-108b38cf…`) — not shipped in user packages

## 3. Hot Issues

1. **[#41290](https://github.com/openai/codex/issues/41290)** — Windows + WSL: project create/remove fail after switching Agent Environment to WSL (62 comments, 49 👍). Highest-engagement Windows workflow break; blocks project management after env switch.

2. **[#41220](https://github.com/openai/codex/issues/41220)** — Meta tracker for abnormal quota drain / usage-accounting mismatches (41 comments). Cross-cuts Plus/Pro/Max reports; users say credits fall faster than token logs predict.

3. **[#30918](https://github.com/openai/codex/issues/30918)** — Plus 5-hour limit: 70% → 100% in ~6 minutes (26 comments). Concrete log-backed instance of the quota family; still open after two months of updates.

4. **[#44781](https://github.com/openai/codex/issues/44781)** — Desktop: edit/resend queued message → “App-server queued follow-up no longer exists” (21 comments, 26 👍). Breaks iterative chat on Windows Desktop 26.903 + CLI 0.153.4.

5. **[#31073](https://github.com/openai/codex/issues/31073)** — Native Windows sandbox: Git HTTPS remotes fail/crash; local Git works (23 comments). Isolates sandbox credential/network path as the failure surface.

6. **[#37856](https://github.com/openai/codex/issues/37856)** — VS Code extension: stale thread owner after Web renderer reload (“open in another application”) (13 comments). Multi-client ownership is sticky; UI has no recovery path.

7. **[#42088](https://github.com/openai/codex/issues/42088)** — `function_call_output` emitted without `call_id` → 400 on strict `/responses` upstreams (11 comments). Breaks resume on custom/OpenAI-compatible backends (e.g. DeepSeek).

8. **[#31419](https://github.com/openai/codex/issues/31419)** — Windows Defender flags unsigned `codex-computer-use.exe` as Trojan:Win32/ClickFix (9 comments, 7 👍). Unsigned Computer Use binary vs enterprise AV.

9. **[#45119](https://github.com/openai/codex/issues/45119)** — macOS 14.2 sandbox startup: unbound variable `TIOCSTI` (8 comments). Sandbox ruleset bug present on `main` as of the report.

10. **[#40452](https://github.com/openai/codex/issues/40452)** / related **[#45203](https://github.com/openai/codex/issues/45203)** — After Desktop update, paginated thread history collapses to one interrupted first turn or empty items. Data-loss class UX after upgrades.

Honorable mentions: Windows setup `helper_failed` ([#40550](https://github.com/openai/codex/issues/40550), [#45003](https://github.com/openai/codex/issues/45003)), follow-ups never send ([#45069](https://github.com/openai/codex/issues/45069)), MCP Messages/Computer History startup on CLI 0.154.0 ([#44458](https://github.com/openai/codex/issues/44458)).

## 4. Key PR Progress

All listed PRs are **CLOSED** as of 2026-09-13; most authored by `copyberry[bot]`.

1. **[#45276](https://github.com/openai/codex/pull/45276)** — Worktree session create from agents overview (`w`), using cached default branch / remote HEAD.

2. **[#45271](https://github.com/openai/codex/pull/45271)** — Preserve TUI scrollback when the viewport grows (newline strategy instead of `CSI S` that dropped history in QTermWidget/xterm.js).

3. **[#45262](https://github.com/openai/codex/pull/45262)** — Route paste into active `Ctrl+R` history-search query.

4. **[#45255](https://github.com/openai/codex/pull/45255)** — Command center: open new sessions from a session list (`n`) without sending an initial turn.

5. **[#45248](https://github.com/openai/codex/pull/45248)** — Request metadata and tool hooks use *captured step* model/reasoning settings, not the turn’s initial values.

6. **[#45224](https://github.com/openai/codex/pull/45224)** — Register Windows Desktop uninstall ownership *before* sandbox setup (covers unsigned-in installs).

7. **[#45182](https://github.com/openai/codex/pull/45182)** / **[#45178](https://github.com/openai/codex/pull/45178)** / **[#45169](https://github.com/openai/codex/pull/45169)** — Windows sandbox hardening: validate token groups before SID copy; split cleanup into prepare/finish; move setup + install storage into `codex-windows-sandbox`.

8. **[#45176](https://github.com/openai/codex/pull/45176)** — Wire Windows **MXC** sandbox into command execution (backend identity, violation classification).

9. **[#45135](https://github.com/openai/codex/pull/45135)** — TUI: preview streaming prose before a newline so long single-line replies are visible live.

10. **[#45094](https://github.com/openai/codex/pull/45094)** — Estimate history tokens from content, not serialized envelopes (IDs/metadata no longer inflate budgets).

Also notable: OpenSSL 3.6.4 for musl ([#45149](https://github.com/openai/codex/pull/45149)), remove Astra sparkle animation ([#45137](https://github.com/openai/codex/pull/45137)), async user-message feature flag ([#45124](https://github.com/openai/codex/pull/45124)).

## 5. Hot Discussions

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200)** — Remote-control Codex from the ChatGPT mobile app (headless/daemon). 190 👍, 46 comments; users already stitch Tailscale + SSH.
- **[#9618](https://github.com/openai/codex/discussions/9618)** — `/rewind` or `/revert` (OpenCode / Claude Code parity). 134 👍; framed as “almost unusable” without it.
- **[#12567](https://github.com/openai/codex/discussions/12567)** — Official memories design survey (how aggressively to cite prior threads).
- **[#41716](https://github.com/openai/codex/discussions/41716)** — ChatGPT as planner, Codex as worker orchestration layer.
- **[#45284](https://github.com/openai/codex/discussions/45284)** — Optional persistent Codex session per GitHub PR (avoid fragmenting review context).

### Q&A
- **[#40385](https://github.com/openai/codex/discussions/40385)** — Windows: “control other devices” / remote connections missing from UI.
- **[#42503](https://github.com/openai/codex/discussions/42503)** — When is Astra landing in Codex?
- **[#43257](https://github.com/openai/codex/discussions/43257)** — How experimental context / history lookup counts against usage limits.

### Show and tell
- **[#16329](https://github.com/openai/codex/discussions/16329)** — Awesome Codex CLI: 150+ subagents, skills, plugins, MCP servers.
- **[#41157](https://github.com/openai/codex/discussions/41157)** / **[#44641](https://github.com/openai/codex/discussions/44641)** — Community rate-limit dashboards (CodexFuse Windows; Codex Limits CLI/TUI).
- **[#44643](https://github.com/openai/codex/discussions/44643)** — CoCo: coordinator for parallel Codex work across terminals/repos.
- **[#45278](https://github.com/openai/codex/discussions/45278)** — Polter: one Codex supervising other AI CLIs.

## 6. Feature Request Trends

1. **Undo / rewind / revert** of agent edits without per-change commits.
2. **First-class remote control** (mobile ChatGPT → headless desktop Codex; Windows “control other devices”).
3. **Persistent cross-device / per-PR sessions** so history and remote work chats stay in sync.
4. **Memories + long-horizon context** with explicit citation and token-accounting rules.
5. **Transparent usage meters** (5h / weekly, reset credits) — community built multiple third-party dashboards.
6. **Worktree / multi-session command center** (already landing in PRs).
7. **Reference gitignored files** via `@`.
8. **Planner/worker orchestration** across ChatGPT and one or more Codex workers.

## 7. Developer Pain Points

- **Windows is the failure cluster:** WSL project lifecycle, sandbox Git HTTPS / credentials (`SEC_E_NO_CREDENTIALS`), setup `helper_failed` / `helper_sandbox_lock_failed`, Defender on Computer Use, follow-up send, IAB route disappearing.
- **Quota accounting trust gap:** limits drop in minutes; local tokens and UI disagree; Astra vs Luna effort does not feel priced consistently.
- **Thread/session integrity after updates:** history pagination replaced by a single interrupted turn; remote chats missing on phone; stale VS Code thread ownership.
- **Sandbox + MCP boot fragility** on both Windows and macOS 14.2 (`TIOCSTI`); CLI 0.154.0 experimental caps break bundled Messages / Computer History MCP.
- **Custom `/responses` compatibility:** missing `call_id` on `function_call_output` fails strict upstreams.
- **Instruction-following / orchestration blowouts** that burn weekly quota while “preventing” the same failures ([#43193](https://github.com/openai/codex/issues/43193)).
- Ecosystem response: users ship local dashboards, coordinators, stop-hooks (`isitdone`), session exporters, and SKILL.md → plugin converters rather than waiting on first-party UX.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-14

Source: [github/copilot-cli](https://github.com/github/copilot-cli)

## 1. This Week's Highlights

The CLI shipped a tight 1.0.84 patch train: Vim mode is now generally available, plugin/instruction/LSP listing is being split into first-class commands with JSON output, and session/memory import landed for the semantic JSONL interchange format. Completions now come from the same grammar the CLI parses, so `copilot <TAB>` is consistent with real flags and subcommands. Community heat is still concentrated on MCP lifecycle correctness (OAuth, `server/discover`, resume timeouts), Windows/WSL stability (CPU spin, plugin file locks, sandbox support), and heap OOMs on long `--resume` sessions.

## 2. Releases

Four prerelease tags landed in the last 24 hours:

- **[v1.0.84-5](https://github.com/github/copilot-cli/releases)** — Session and memory **import** commands for the semantic JSONL interchange format. Shell completions are generated from the same grammar the CLI parses, so root flags appear next to subcommands and each subcommand only offers its own options.
- **[v1.0.84-4](https://github.com/github/copilot-cli/releases)** — `copilot instruction list` and `copilot lsp list` replace `copilot plugins list --kind …`. `--json` added to plugin list / marketplace list / browse. `enable` / `disable` added to `copilot plugin`.
- **[v1.0.84-3](https://github.com/github/copilot-cli/releases)** — `/copy` includes task completion messages when available. OAuth-authenticated MCP servers connect more reliably at session startup.
- **[v1.0.84-2](https://github.com/github/copilot-cli/releases)** — **Vim mode for everyone** (`/vim` or `editorMode: vim`); current mode is shown while typing. On supported Windows sandbox policies, interactive shell commands now record blocked accesses.

## 3. Hot Issues

1. **[#13 — CLI vi/vim input mode](https://github.com/github/copilot-cli/issues/13)** (CLOSED, 12 comments, 76 👍)  
   Long-running request for modal editing. Closed against the 1.0.84-2 GA of Vim mode — highest community signal in this window.

2. **[#4438 — `disable-model-invocation: true` makes a skill unreachable](https://github.com/github/copilot-cli/issues/4438)** (OPEN, 5 comments)  
   Project skills marked “manual only” disappear from the model’s `skill()` tool (`Skill not found`) even on explicit invocation. Breaks the intended “list but don’t auto-call” contract.

3. **[#4035 — Voice installer hits private Azure Artifacts (401)](https://github.com/github/copilot-cli/issues/4035)** (OPEN, 5 comments)  
   Voice runtime tries `Microsoft.AI.Foundry.Local.Core` from a private feed instead of nuget.org. Blocks voice setup for anyone without Azure DevOps creds.

4. **[#4725 — Frequent JS heap OOM on Linux](https://github.com/github/copilot-cli/issues/4725)** (OPEN, 4 comments)  
   Mark-Compact at ~4 GiB every few minutes. Same class of failure as long-resume OOMs below.

5. **[#4753 — Session resume cancels in-flight stdio MCP (~1s vs ~16s)](https://github.com/github/copilot-cli/issues/4753)** (OPEN, 4 comments)  
   Foreground handover on `--resume` kills MCP servers still initializing. Silent “server missing for the whole session.”

6. **[#3700 — WSL2 MainThread ~215% CPU, TUI frozen](https://github.com/github/copilot-cli/issues/3700)** (OPEN, 4 comments, high severity)  
   Regression of #2208: idle spin, streamed output never paints until restart. Hits every fresh session after reboot.

7. **[#1168 — Authorization fatigue](https://github.com/github/copilot-cli/issues/1168)** (OPEN, 4 comments)  
   One high-level request (e.g. “fix PR 727”) can trigger a dozen permission prompts. Related: #4764 auto-approval dying after ~1 hour.

8. **[#4795 — Atlassian MCP OAuth callback URL mismatch](https://github.com/github/copilot-cli/issues/4795)** (OPEN, 3 comments)  
   Random listen port vs registered `33418`. Reproduced on 1.0.83 and 1.0.84-3 (WSL).

9. **[#4095 — Windows plugin update “Access is denied” while VS Code is open](https://github.com/github/copilot-cli/issues/4095)** (OPEN, 2 comments, 21 👍)  
   Copilot desktop/extension holds watchers on `installed-plugins`. Highest 👍 among recent Windows bugs.

10. **[#4699 — OOM on long `--resume`; crash dumps in cwd](https://github.com/github/copilot-cli/issues/4699)** (OPEN, 3 comments, 5 👍)  
    Repeated 4 GiB V8 OOMs; Node diagnostic reports land in the user’s working directory.

Honorable mentions: [#4370](https://github.com/github/copilot-cli/issues/4370) / [#4809](https://github.com/github/copilot-cli/issues/4809) (`server/discover` before `initialize`), [#4026](https://github.com/github/copilot-cli/issues/4026) (Windows native crashes since May), [#4832](https://github.com/github/copilot-cli/issues/4832) (workspace `.mcp.json` never loaded in 1.0.83), [#4829](https://github.com/github/copilot-cli/issues/4829) (subagent tool storms break prompt cache).

## 4. Key PR Progress

1. **[#4770 — Document WebSocket responses opt-out](https://github.com/github/copilot-cli/pull/4770)** (OPEN)  
   Documents the escape hatch for `400 input item ID does not belong to this connection` (#2147) and networks that block WebSockets.

2. **[#4746 — Experimental next-action extension prototype](https://github.com/github/copilot-cli/pull/4746)** (OPEN)  
   Opt-in SDK example under `examples/next-best-action/`; joins the foreground session, no auto-discovery, no change to the installed CLI.

3. **[#4761](https://github.com/github/copilot-cli/pull/4761) / [#4762](https://github.com/github/copilot-cli/pull/4762) — Installer reports unsupported OS** (CLOSED)  
   FreeBSD no longer falls through to “Windows detected but winget not found.”

4. **[#4808 — Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)** (CLOSED)  
   Supply-chain hygiene: 3 action refs pinned.

5. **[#4827](https://github.com/github/copilot-cli/pull/4827) / [#4828](https://github.com/github/copilot-cli/pull/4828) — Dependabot bumps** (CLOSED)  
   `actions/stale` 9.1.0 → 11.0.0, `actions/github-script` 7.1.0 → 9.0.0.

6. **[#4786 — Revise third-party services notice](https://github.com/github/copilot-cli/pull/4786)** (CLOSED)  
   Clarifies access requirements and terms for third-party services.

7. **[#4748 — Add joke cli](https://github.com/github/copilot-cli/pull/4748)** (OPEN)  
   Low-signal novelty PR; listed only because it is in the 24h update set.

8. **[#4100](https://github.com/github/copilot-cli/pull/4100)** (CLOSED)  
   Sparse “安全性” PR from an external account; treat as noise unless maintainers comment.

*(Only 10 PRs were in the 24h window; several are bot/security/docs rather than product features. Product movement is mostly in the 1.0.84-x release notes above.)*

## 5. Hot Discussions

Omitted — no Discussions data was provided.

## 6. Feature Request Trends

- **Modal / keyboard-first editing** — Vim mode shipped; remaining demand is polish (mode indicator, bindings parity).
- **Skills as a first-class surface** — list/enable/disable, `disable-model-invocation` that still allows slash invoke, no duplicate “Skill not found” lookups (#4438, #4637).
- **MCP as a reliable substrate** — spec-compliant lifecycle (no pre-`initialize` `server/discover`), stable OAuth callback ports, resume that does not cancel in-flight stdio servers, workspace `.mcp.json` actually loaded.
- **Agent observability** — live progress for background sub-agents (#2254), HydraFusion per-phase model/verdict/credits on OpenTelemetry (#4825).
- **Session memory portability** — import/export of semantic JSONL (now in 1.0.84-5) and cross-session context query (#2436).
- **Permission UX** — fewer prompts per request, durable assisted auto-approval, `/remove-dir` to revoke access without restart (#4830).
- **Prompt queueing** — `ctrl-t` enqueue that actually drains after the current turn (#4824).

## 7. Developer Pain Points

- **MCP is the sharpest edge.** Spec violations (`server/discover`), OAuth port mismatch, resume killing initializing servers, extra config dropped during startup reconciliation, workspace `.mcp.json` ignored. Teams building FastMCP / Atlassian / custom stdio servers are burning time on handshake, not tools.
- **Long sessions die at the 4 GiB heap.** Linux idle OOMs and `--resume` OOMs dump Node reports into `cwd`. Subagents that run hundreds of tool calls in one turn also blow prompt cache and token budget (#4829).
- **Windows / WSL is still a second-class runtime.** Idle 215% CPU + frozen TUI, plugin updates blocked by VS Code file watchers, sandbox “not supported on this host” on 25H2, native crashes spanning many versions, voice installer on a private feed.
- **Permissions and policy drift mid-session.** Authorization fatigue on a single task; assisted mode expires after ~1 hour; no way to shrink allowed directories without restart.
- **Multimodal and voice are fragile.** One pasted image can cap later `view` calls at 1 image (#4831). Voice mode can `SIGABRT` in ONNX/Nemotron ASR on Linux (#4833).
- **Transport surprises.** Default WebSocket responses path produces `CAIP 400: input item ID does not belong to this connection`; the opt-out exists but was undocumented until #4770.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

I'll pull the latest OpenCode release notes and discussion activity so the digest matches today's repo state.# OpenCode Community Digest — 2026-09-14

Source: [anomalyco/opencode](https://github.com/anomalyco/opencode)

## This Week's Highlights

v1.18.30 shipped Astra system prompts for GPT-6 plus provider SDK/ID fixes, while v2 work is already colliding with production: users report prompt crashes on 1.18.30, Zen/`encrypted_content` failures on Muse Spark, and Desktop/TUI regressions around layout, MCP, and session lifecycle. Maintainers are landing tight AI-layer PRs (image URLs, empty tool choice, context-window fail-fast) at the same time the community is still arguing over clipboard, crypto payments, and a forced new UI that hid MCP controls.

## Releases

**[v1.18.30](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)** (2026-09-09, current latest release)

- **Improvements:** Astra system prompt for GPT-6 models.
- **Bugfixes:** Preserve Bedrock DeepSeek model IDs including ARN-based IDs; Azure and OpenAI provider SDK updates; reasoning-effort variants for supported GitLab GPT and Claude models.
- **Community:** @YeEmrick, @far-ouq, @heimoshuiyu.
- Note: tags also include **v2.0.0–v2.0.3** (Sep 11–12). Those are not in the official “latest” release notes yet, but several issues/PRs already treat v2 as live (config env var, layout, Zen).

## Hot Issues

1. **[#4283 Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** — Still open after months; 133 comments / 124 👍. Highest-engagement UX bug in the tracker; TUI selection still fails for many users.
2. **[#23153 Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)** — 51 👍, 22 comments. Persistent billing request for OpenCode Go; demand is commercial, not just hobbyist.
3. **[#48741 Opencode Zen critical errors on Muse Spark](https://github.com/anomalyco/opencode/issues/48741)** — New (Sep 13), already 21 comments. `encrypted_content` / `invalid_request_error` when Muse Spark gets an image or tool call; blocks Zen users immediately.
4. **[#48645 Regression in 1.18.30: every prompt crashes (`a.name`)](https://github.com/anomalyco/opencode/issues/48645)** — Fresh install / first message dies with `SystemPrompt.environment` TypeError; 1.18.18 is the known-good pin. High severity because it lands on the latest stable tag.
5. **[#43277 Sessions permanently stuck across reboots](https://github.com/anomalyco/opencode/issues/43277)** — Sessions refuse new messages and survive full restarts. Data-loss class reliability issue.
6. **[#48850 Desktop randomly marks running turn as interrupted](https://github.com/anomalyco/opencode/issues/48850)** — Silent `AbortError` on Windows Desktop; no UI error, no retry. Undermines trust in long turns.
7. **[#34442 Windows Desktop installer broken offline](https://github.com/anomalyco/opencode/issues/34442)** — ripgrep not bundled; `grep` / `glob` / `skill` and `customize-opencode` fail air-gapped. 4 👍, still open since June.
8. **[#46426 / #48859 MCP toggle missing in New UI](https://github.com/anomalyco/opencode/issues/46426)** — Configured MCP servers cannot be enabled from the new layout; toggle only exists in Legacy UI. Same complaint filed in Russian (#48859).
9. **[#39835 New users can't switch back from the new layout](https://github.com/anomalyco/opencode/issues/39835)** — Forced layout with no toggle. Ties directly to MCP/settings discoverability.
10. **[#48848 Snapshot git transactions race / stale index.lock](https://github.com/anomalyco/opencode/issues/48848)** — Multi-process snapshot git races wedge the worktree. Dangerous for anyone running several OpenCode instances on one repo.

Honorable mentions: [#48864](https://github.com/anomalyco/opencode/issues/48864) same `encrypted_content` provider error; [#38529](https://github.com/anomalyco/opencode/issues/38529) session list mixing unrelated non-git dirs; [#48851](https://github.com/anomalyco/opencode/issues/48851) TUI scroll desync; [#48847](https://github.com/anomalyco/opencode/issues/48847) context-window fail-fast (paired with a merged PR).

## Key PR Progress

1. **[#48852 fail fast when fixed request overhead exceeds usable window](https://github.com/anomalyco/opencode/pull/48852)** (CLOSED) — Follow-up to compaction loop-guard work. Stops infinite compact/retry when system prompt + tools already overflow the model window.
2. **[#48857 omit OpenAI tool_choice when tools are empty](https://github.com/anomalyco/opencode/pull/48857)** (CLOSED) — Avoids invalid OpenAI Chat/Responses payloads after tool lists go empty.
3. **[#48854 keep Windows ConPTY / zellij pane alive on exit](https://github.com/anomalyco/opencode/pull/48854)** (CLOSED) — Exiting OpenCode no longer kills the parent Alacritty+zellij pane.
4. **[#48860 restrict reflective access](https://github.com/anomalyco/opencode/pull/48860)** (CLOSED) — Oxlint baseline + ban unsanctioned `Reflect` usage; hardening pass.
5. **[#48862 preserve OpenAI Chat image URLs](https://github.com/anomalyco/opencode/pull/48862)** (OPEN, rekram1-node) — Stop treating HTTPS image URLs as raw base64; also covers tool-returned remote images.
6. **[#48863 serialize undefined historical tool input](https://github.com/anomalyco/opencode/pull/48863)** (OPEN) — Emit `{}` for explicit `undefined` tool input so replay/history doesn’t break OpenAI lowering.
7. **[#48858 Resolve config from OPENCODE_CONFIG](https://github.com/anomalyco/opencode/pull/48858)** (OPEN) — Restores v1 env-var config path after the v2 regression in [#48853](https://github.com/anomalyco/opencode/issues/48853).
8. **[#48770 refactor(codemode): materialize interpreter failures once](https://github.com/anomalyco/opencode/pull/48770)** (OPEN) — Single `PendingThrow` → one Error at the call boundary; cleaner Code Mode traces.
9. **[#48733 preserve slash skill arguments](https://github.com/anomalyco/opencode/pull/48733)** (OPEN) — Trailing text after a slash skill now submits as the user prompt with the skill attached.
10. **[#48856 RTL header for Hebrew and Arabic Windows](https://github.com/anomalyco/opencode/pull/48856)** (OPEN) — Native caption-button layout for RTL desktop users.

Cleanup batch still moving: older automated PRs (#42169 project_id remap, #31980 Windows code page, #31809 misleading Read-before-Write docs, #31645 upgrade progress, #31644 `/compact` `/summarize` visibility).

## Feature Request Trends

- **Billing flexibility:** crypto / Pay-Go for OpenCode Go (#23153).
- **Layout control:** opt out of the new Desktop layout; restore MCP and other settings that lived in Legacy UI (#39835, #46426, #48859).
- **MCP as a first-class client:** toggle in new UI; surface custom server→client notifications (progress, wake-up) into the session (#48855).
- **Agent/tool plumbing:** bash `env` injection for plugins (#11065, closed but directionally relevant); slash-skill argument preservation.
- **Housekeeping UX:** clear recent-folder history (#19546, closed); animate new-session wordmark (#48841, closed).
- **Context-window honesty:** fail fast instead of looping compaction when fixed overhead already exceeds the usable window (#48847).

## Developer Pain Points

- **Latest stable can be unusable.** 1.18.30 first-prompt crash (#48645) plus Zen/Muse Spark `encrypted_content` errors (#48741, #48864) make “just update” risky.
- **v2 config/layout break muscle memory.** `OPENCODE_CONFIG` ignored (#48853 / PR #48858); MCP toggle gone; no layout switch for new users.
- **Session integrity is fragile.** Permanently stuck sessions (#43277), silent Desktop abort (#48850), snapshot `index.lock` races (#48848), mixed session lists from non-git dirs (#38529).
- **Windows / offline / terminal stacks still second-class.** Missing bundled ripgrep (#34442), ConPTY pane death (fixed in #48854), clipboard (#4283), TUI scroll desync (#48851).
- **Provider payload edge cases keep leaking.** Empty tools + `tool_choice`, undefined historical tool input, image URLs treated as base64, reasoning IDs/ARNs — the AI lowering layer is where most of today’s hot fixes land.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-14
Source: [earendil-works/pi](https://github.com/earendil-works/pi)

## This Week's Highlights
Activity is concentrated on TUI reliability (large diffs, long transcripts, redraw storms), session/model restore correctness, and provider surface area (Azure Foundry, Codex attribution, subscription OAuth, server-side tools). Community energy is also shifting outward: several independent GUIs and RPC-based shells landed in Discussions, while Issues keep pressing startup latency, compaction thinking budgets, and OAuth token races.

## Releases
None in the last 24 hours.

## Hot Issues
1. **[#7739](https://github.com/earendil-works/pi/issues/7739) — Startup-time budget vs jcode** (OPEN, 8 comments)  
   Asks for an explicit latency/memory budget so Pi matches jcode’s interactive PTY benchmark. Matters because cold start is becoming a competitive metric, not just a polish item.

2. **[#8036](https://github.com/earendil-works/pi/issues/8036) — Edit tool crashes TUI on large diffs** (OPEN, 8 comments)  
   A ~14.5 MB HTML diff completed but crashed the interactive TUI on render and again on resume. High-severity for anyone editing generated or minified assets.

3. **[#9311](https://github.com/earendil-works/pi/issues/9311) — Fullscreen mouse selection survives session switch** (OPEN, 6 comments)  
   Selection state leaks across sessions in fullscreen TUI. Small bug, high “feels broken” cost; proposed fix is clear-on-switch.

4. **[#9255](https://github.com/earendil-works/pi/issues/9255) — Full-screen redraw storm on long transcripts** (OPEN, 4 comments)  
   `TuiMainScreen.doRender()` takes the full-render path almost every frame when a streaming thinking tail sits above the viewport. Violent jumps / doubled text on long sessions.

5. **[#9075](https://github.com/earendil-works/pi/issues/9075) — Compaction hits output cap on adaptive thinking** (OPEN, 3 comments, 3 👍)  
   Compaction inherits session thinking level; thinking tokens count against `max_tokens`, so high-effort Anthropic adaptive models deterministically clip. Direct quality hit on long sessions.

6. **[#9474](https://github.com/earendil-works/pi/issues/9474) — Codex transport has no non-resetting deadline** (OPEN, 3 comments)  
   Heartbeats/partial deltas reset idle timeout, so a stalled SSE/WebSocket can hang forever. Needed for production headless fleets.

7. **[#9243](https://github.com/earendil-works/pi/issues/9243) — Resume restores echoed model name, not routed id** (OPEN, 3 comments)  
   Last assistant message overwrites `model`, so provider echo ≠ routed id after resume. Breaks “I thought I was still on X.”

8. **[#9098](https://github.com/earendil-works/pi/issues/9098) — Expose prompt disposition in RPC** (OPEN, 4 comments)  
   RPC `prompt` success does not distinguish handled / queued / started. Blocks status UIs and extension orchestration.

9. **[#9565](https://github.com/earendil-works/pi/issues/9565) — Unwritable jiti cache slows every launch** (CLOSED)  
   Multi-user Linux `/tmp/jiti` symlink into another user’s `0700` home forces TS extension recompile on every start. Operational footgun.

10. **[#9549](https://github.com/earendil-works/pi/issues/9549) — Large transcripts re-render every frame (Windows, 1 core saturated)** (CLOSED)  
    Same family as #9255, measured on 2-core Windows Terminal. Confirms fullscreen/long-transcript rendering is a cross-platform hotspot.

## Key PR Progress
1. **[#9548](https://github.com/earendil-works/pi/pull/9548) — Mid-conversation system messages** (OPEN, mitsuhiko)  
   Puts system-prompt and tool-set changes into the transcript so resume/branching can restore instructions and keep cached prefixes.

2. **[#9488](https://github.com/earendil-works/pi/pull/9488) — Canonical Codex turn attribution** (OPEN)  
   Adds provider-neutral `requestIdentity` so Codex can attribute tool continuations, retries, steering, and compaction recovery to one user turn.

3. **[#9096](https://github.com/earendil-works/pi/pull/9096) — Meta Muse subscription OAuth** (OPEN)  
   New subscription provider; unusual daily identity-token remint and burst-style “fake” streaming.

4. **[#9531](https://github.com/earendil-works/pi/pull/9531) — Permanent branch deletion from session tree** (CLOSED)  
   `SessionManager.pruneBranch` + Shift+D in `/tree`; protects active path, re-chains labels, re-points surviving compactions.

5. **[#9558](https://github.com/earendil-works/pi/pull/9558) — Azure Foundry v3 / Anthropic on Azure** (CLOSED)  
   Provider + test-matrix coverage (stream, abort, overflow, tools, images, handoff).

6. **[#9556](https://github.com/earendil-works/pi/pull/9556) — `serverTools` in model config** (CLOSED)  
   Lets models.json declare provider-native server-side tools (OpenAI/Zhipu `web_search`, Anthropic web_search) appended verbatim.

7. **[#9529](https://github.com/earendil-works/pi/pull/9529) — Google Antigravity + Cursor Pro OAuth** (CLOSED)  
   Browser OAuth subscription providers, no API keys; pairs with issue #9530.

8. **[#9517](https://github.com/earendil-works/pi/pull/9517) — Group long tool-call runs in TUI** (CLOSED)  
   Collapses 6+ consecutive tool calls into one expandable row; keeps failures visible.

9. **[#9523](https://github.com/earendil-works/pi/pull/9523) — Emit ui_prompt_start/end for built-in selectors** (CLOSED)  
   Status integrations no longer miss model picker / settings / resume / tree and report “running” while blocked.

10. **[#9504](https://github.com/earendil-works/pi/pull/9504) / [#9501](https://github.com/earendil-works/pi/pull/9501) — Windows Store shells + install-dir resolution** (OPEN / OPEN)  
    Fixes `existsSync` EACCES on Store aliases and unifies Windows binary discovery so shells actually launch.

Honorable mentions: [#9543](https://github.com/earendil-works/pi/pull/9543) model-side `exit` tool; [#9539](https://github.com/earendil-works/pi/pull/9539) loop-guard example extension; [#8635](https://github.com/earendil-works/pi/pull/8635) preserve aborted stop reason during lazy setup.

## Hot Discussions

**Show and tell**
- **[#9552](https://github.com/earendil-works/pi/discussions/9552) — Pi Heao GUI** — Windows desktop client on pi-agent-studio chat UI.  
- **[#9446](https://github.com/earendil-works/pi/discussions/9446) — Phosphor** — Desktop surface: chat, diffs, files, terminal, artifacts over `pi --mode rpc`.  
- **[#9427](https://github.com/earendil-works/pi/discussions/9427) — Pi Manager** — Local control plane for providers/models/`~/.pi/agent` without forking Pi.  
- **[#9327](https://github.com/earendil-works/pi/discussions/9327) — Eco Coding** — Desktop GUI with vision split, teams, browser, computer use, mobile.  
- **[#9373](https://github.com/earendil-works/pi/discussions/9373) — pi-agent-views** — Concurrent sub-agents rendered by Pi itself.  
- **[#9525](https://github.com/earendil-works/pi/discussions/9525) — web-agent thank-you** — Phone dashboard + Siri/Matrix bridges on one persistent RPC session.

**Ideas**
- **[#3373](https://github.com/earendil-works/pi/discussions/3373) — Favorite plugins/extensions** (16 comments, 9 👍) — Longest-running community inventory of what people actually keep loaded.  
- **[#8420](https://github.com/earendil-works/pi/discussions/8420) — Official Web UI base?** — Contrast with DSH’s UI-plugin boom; argues Pi’s extension story is CLI-heavy.  
- **[#8803](https://github.com/earendil-works/pi/discussions/8803) — pi-verdict** — One-file allow/ask/deny permission gate (Claude Code auto-mode analog).  
- **[#9312](https://github.com/earendil-works/pi/discussions/9312) — Pi Context Memory** — Trace compacted decisions back to the original turn.  
- **[#9516](https://github.com/earendil-works/pi/discussions/9516) — Tool-result images dropped by compatible gateways** — Responses encoding vs Completions string-only `role: tool`.

## Feature Request Trends
- **Official / first-party surfaces beyond TUI**: Web UI base, desktop shells, session viewers, RPC status events (`disposition`, `ui_prompt_*`).
- **Provider completeness without API keys**: Antigravity, Cursor Pro, Meta Muse, Azure Foundry, Commandcode, Copilot refresh, llama.cpp live catalog for subagents.
- **Session semantics**: inherit model/effort on `/new`, restore from `model_change` not echo, mid-conversation system messages, tree branch delete, view another live session.
- **Model-native capabilities**: `serverTools`, exit tool, prompt disposition, permission gates.
- **Startup and long-session hygiene**: jcode-class budget, writable jiti cache, compaction thinking isolation.

## Developer Pain Points
- **TUI rendering at scale**: large diffs crash; long transcripts full-redraw every frame; compaction_end wipes the visible history; first thinking token doubles; ScrollView swallows mouse events; selection leaks across sessions.
- **Auth and multi-session fleets**: Copilot 403 via undici; keychain rewrite wipes silent-read grants; concurrent sessions race Slack-style rotating refresh tokens.
- **Model/protocol mismatches**: GLM-5.3-flash CoT dumped into `content`; Anthropic adapter drops root JSON Schema keywords; llama.cpp empty catalog until `/llama`; length-truncated mega-tool-call walls flood context (14k error results).
- **Windows / multi-user ops**: Store shell aliases, install-dir lookup, 2-core redraw saturation, shared `/tmp/jiti`.
- **Timeouts that lie**: Codex keep-alives defeat idle timeout with no hard per-request deadline.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

**Qwen Code Community Digest — 2026-09-14**  
Repo: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)

### 1. This Week's Highlights
Nightly and stable lines both landed around **v0.23.3**, with reasoning-preset expansion (Kimi / Qwen / DeepSeek), Desktop **v0.3.0**, TypeScript SDK **v0.1.12**, and a new **CUA driver** binary drop. Day-to-day work is dominated by CI reliability (Windows live monitor, `tsc` heap OOM), TUI/React crash loops after background tasks, session/approval correctness, and web-shell UX (scheduled tasks, cockpit capture, command-explanation language).

### 2. Releases
- **[v0.23.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3)** — Feature highlight: expand Kimi, Qwen, and DeepSeek reasoning presets ([#11349](https://github.com/QwenLM/qwen-code/pull/11349)). No advertised breaking changes.
- **Nightlies** `v0.23.3-nightly.20260910` through `20260913` — Repeated changelog includes DingTalk background-response cleanup ([#11570](https://github.com/QwenLM/qwen-code/pull/11570)) and a channels-related breaking change (`feat(channels)!: remove me`).
- **[v0.23.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2)** — Web-shell split-view session navigation ([#11250](https://github.com/QwenLM/qwen-code/pull/11250)).
- **[sdk-typescript-v0.1.12](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.12)** — Bundles CLI 0.23.3 (notes also mention 0.23.2 as the prior bundle).
- **[desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0)** / **[desktop-v0.3.0-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0-preview.0)** — Scheduled desktop packaging CI ([#11519](https://github.com/QwenLM/qwen-code/pull/11519)); preview does **not** move the `desktop-latest` updater feed off 0.2.2.
- **[cua-driver-rs-v0.20.6](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.6)** — Prebuilt CUA driver binaries (macOS notarized universal + app; Linux/Windows unsigned multi-arch).

### 3. Hot Issues
Only seven issues were updated in the window; all are listed.

| Issue | Why it matters |
| --- | --- |
| [#11783](https://github.com/QwenLM/qwen-code/issues/11783) TUI React #185 (max update depth) after background `run_shell_command` | P1 UI crash; interactive session dies seconds after a background task. 3 comments. |
| [#11019](https://github.com/QwenLM/qwen-code/issues/11019) AUTO mode: approvals never reach classifier; mode reverts on session rebuild | P2 security / session-management: user said “yes” three times and tool calls still blocked; harness/API hosts are affected. |
| [#11791](https://github.com/QwenLM/qwen-code/issues/11791) Web-shell “Command explanation” language hardcoded EN/zh-CN | P3 i18n gap: explanation panel ignores conversation language. |
| [#11790](https://github.com/QwenLM/qwen-code/issues/11790) Main CI failed on `faa395885e` (macOS install deps) | Bot-tracked main-branch red; spawned follow-up PR #11792. |
| [#11780](https://github.com/QwenLM/qwen-code/issues/11780) `tsc --build` OOM at 3072 MB (CLOSED) | CLI package peaks ~3.14 GB; CI coin-flip under load. Closed after heap-cap bump. |
| [#11587](https://github.com/QwenLM/qwen-code/issues/11587) Deferred review findings from PR #11562 | Autofix leftovers: one-shot system reminders leaking into the user message. 6 comments. |
| [#7167](https://github.com/QwenLM/qwen-code/issues/7167) Fleet Shepherd Dashboard | Long-lived bot fleet status board (need-information / CI-CD); last tick 2026-09-13. |

Community reaction in this dump is light (0 👍 across the set); signal is in comment volume on the deferred-review and crash issues.

### 4. Key PR Progress
Picked for product surface area, CI stability, or session correctness.

1. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711)** `feat(core): add container execution for subagents` — Docker/Podman backend for ordinary child agents (`QWEN_AGENT_EXECUTION_BACKEND`, per-agent `executionBackend: container`).
2. **[#11241](https://github.com/QwenLM/qwen-code/pull/11241)** `feat(browser-use): Playwright Browser SDK` — Model-facing SDK in the persistent Node REPL (semantic locators, DOM snapshots, coordinates).
3. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183)** `feat(memory): structured on-demand recall` — Two-level ref/title tree + query-focused metadata + dedicated recall tool (replaces flat auto-memory dump).
4. **[#11635](https://github.com/QwenLM/qwen-code/pull/11635)** `feat(web-shell): show fixed scheduled tasks in session sidebar` — Fixed-session controllers appear in the Tasks list with structured run cards.
5. **[#11692](https://github.com/QwenLM/qwen-code/pull/11692)** `feat(core): configurable web_search budget` — `tools.webSearch.timeoutMs` / `WEB_SEARCH_TIMEOUT_MS`, default 120s, bounded extractor fallback.
6. **[#11280](https://github.com/QwenLM/qwen-code/pull/11280)** `fix(skills): re-apply Skill side effects on resume` — Restore `allowedTools` and `hooks:` on `--continue` / `--resume`, not just instructions.
7. **[#9466](https://github.com/QwenLM/qwen-code/pull/9466)** `refactor: rewind mapping by stable prompt identity` — Survives resume, headless `-p --resume`, and turn renumbering.
8. **[#11792](https://github.com/QwenLM/qwen-code/pull/11792)** `fix(live): monitor debug store on Windows` — Fixes #11790: Windows `stat` mode bits were failing the privacy check.
9. **[#11781](https://github.com/QwenLM/qwen-code/pull/11781)** `fix(ci): raise build heap cap 3072 → 4096 MB` (CLOSED) — Direct fix for #11780; test lanes stay at 3072.
10. **[#11783](https://github.com/QwenLM/qwen-code/issues/11783)-adjacent stability:** [#11742](https://github.com/QwenLM/qwen-code/pull/11742) (CLOSED) reaps monitors on uncaught exception; [#11788](https://github.com/QwenLM/qwen-code/pull/11788) treats write-side PTY `EIO` as a benign teardown race.

Honorable mentions: [#11218](https://github.com/QwenLM/qwen-code/pull/11218) headless JSON now reports terminal model errors as failures; [#11786](https://github.com/QwenLM/qwen-code/pull/11786) deterministic web-shell cockpit screenshots; [#10455](https://github.com/QwenLM/qwen-code/pull/10455) no startup crash when output-language file is unwritable.

### 5. Hot Discussions
Omitted — no Discussions data was provided.

### 6. Feature Request Trends
- **Isolated / containerized subagent execution** (#11711).
- **First-class browser control** for the model (Playwright SDK, #11241).
- **Structured, queryable memory** instead of dumping the whole corpus (#10183).
- **Web-shell operator UX**: scheduled tasks in the sidebar, bilingual command explanations, deterministic cockpit visuals (#11635, #11791, #11786).
- **Configurable tool budgets** (web search timeout / extractor fallback, #11692).
- **Session fidelity**: rewind by prompt identity, Skill side effects on resume, approval mode that survives rebuild (#9466, #11280, #11019).

### 7. Developer Pain Points
- **CI fragility**: `tsc` heap OOM on the CLI package, macOS install-deps flakes, Windows live-monitor privacy checks, coin-flip build lanes (#11780, #11790, #11792, #11134).
- **TUI / React loop crashes** when background shell tasks register (#11783); related PTY teardown races and monitor leak on uncaught exception (#11788, #11742).
- **Approval / AUTO-mode semantics** in non-TUI harnesses — user confirmations do not override blocks, and AUTO comes back after session rebuild (#11019).
- **i18n holes** in web-shell explanation copy (#11791).
- **Resume inconsistency** — Skills restore text but drop allow-rules and hooks unless #11280 lands.
- **Autofix debt** — deferred review items and takeover PRs (#11587, many `autofix/takeover` / `needs-human` labels) mean humans still have to close the last mile.

</details>