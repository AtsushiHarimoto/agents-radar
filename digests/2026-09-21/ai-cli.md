# AI CLI 工具社区动态周报 2026-09-21

> 生成时间: 2026-09-20 22:02 UTC | 覆盖工具: 7 个

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

⚠️ 横向对比生成失败。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

I'll pull live GitHub data for the listed PRs and issues so the ranking and status are accurate.# Claude Code Skills Community Highlights  
**Source:** [anthropics/skills](https://github.com/anthropics/skills) · snapshot **2026-09-21**  
**Note:** Most listed PRs have no comment counts in the dump (`undefined` / 👍 0). Ranking below uses **discussion intensity on Issues**, **recency + update activity**, and **how central the Skill is to the official toolkit**. All listed PRs are **OPEN**.

---

## 1. Top Skills Ranking

### 1. `skill-creator` (meta tooling) — highest operational heat  
PRs: [#1298](https://github.com/anthropics/skills/pull/1298), [#1769](https://github.com/anthropics/skills/pull/1769), [#539](https://github.com/anthropics/skills/pull/539)  
**What it does:** Official Skill for authoring and evaluating other Skills (trigger evals, packaging, YAML validation).  
**Discussion:** Trigger evals report false misses / 0% recall; Windows `select()` on pipes; runtime failures treated as non-triggers; unquoted YAML `description` silently splits. Issue [#556](https://github.com/anthropics/skills/issues/556) (12 comments) and closed [#202](https://github.com/anthropics/skills/issues/202) (8) show the same pain: eval harness and “human docs vs executable skill” mismatch.  
**Status:** Open; multiple overlapping fixes still landing.

### 2. Document stack — `docx` / `pdf` / office redlining  
PRs: [#1790](https://github.com/anthropics/skills/pull/1790), [#541](https://github.com/anthropics/skills/pull/541), [#538](https://github.com/anthropics/skills/pull/538), [#1734](https://github.com/anthropics/skills/pull/1734), [#1765](https://github.com/anthropics/skills/pull/1765)  
**What it does:** Production Word/PDF/Office generation, comments, tracked changes, typography, UTF-8 diffs.  
**Discussion:** OOXML `w:id` collisions with bookmarks; missing `document.xml.rels`; case-sensitive `REFERENCE.md`/`FORMS.md` on Linux; orphaned comments; Windows locale breaking non-ASCII redlines. These are the Skills people *run every day*, so small bugs surface immediately.  
**Status:** Open; #1790 updated 2026-09-19.

### 3. `mcp-builder`  
PRs: [#1742](https://github.com/anthropics/skills/pull/1742), [#1724](https://github.com/anthropics/skills/pull/1724) · Issue [#1390](https://github.com/anthropics/skills/issues/1390) (4 comments)  
**What it does:** Scaffold and evaluate MCP servers.  
**Discussion:** MCP ≥2 renamed `streamablehttp_client` → `streamable_http_client` and moved custom headers; eval harness fabricates tool errors (`TextContent` not JSON-serializable) so real servers score 0/N; default model still pinned to an old Sonnet snapshot.  
**Status:** Open; #1742 updated 2026-09-19.

### 4. `AWT` — AI Watch Tester  
PR: [#822](https://github.com/anthropics/skills/pull/822) (opened 2026-03-31, still updated 2026-09-19)  
**What it does:** Vision + browser E2E: point at a UI, generate and run tests with no hand-written scripts.  
**Discussion:** Long-lived “should this ship as an official Skill?” thread; aligns with demand for test generation without a separate QA stack.  
**Status:** Open, actively maintained.

### 5. `frontend-design`  
PR: [#210](https://github.com/anthropics/skills/pull/210)  
**What it does:** Make frontend guidance *actionable in one conversation*—specific enough to steer output, short enough to follow.  
**Discussion:** Quality rewrite rather than a new domain; community treats official Skills as product surface, not just docs.  
**Status:** Open (stale-ish vs Sept activity).

### 6. Domain add-ons with persistent watchers  
| PR | Skill | Function | Status |
|---|---|---|---|
| [#525](https://github.com/anthropics/skills/pull/525) | `pyxel` | Retro Python games: headless runs, frame inspect, state checks | Open since Mar, updated Sep 16 |
| [#1703](https://github.com/anthropics/skills/pull/1703) | `md2video-audio` | Markdown → Marp slides → MP4 + TTS, zero-cost | Open |
| [#1771](https://github.com/anthropics/skills/pull/1771) | `proofcore-contract-auditor` | Solidity/Rust static analysis + TON Merkle audit proofs | Open |
| [#1615](https://github.com/anthropics/skills/pull/1615) | `scnet-hpc` | Profile-based SSH + Slurm on SCNet HPC | Open |
| [#1776](https://github.com/anthropics/skills/pull/1776) | `blast-radius` | Pre-flight checklist before bulk/destructive writes | Open (Sep 17) |
| [#486](https://github.com/anthropics/skills/pull/486) | `odt` | OpenDocument create/fill/parse | Open |
| [#514](https://github.com/anthropics/skills/pull/514) | `document-typography` | Widow/orphan/numbering QC for generated docs | Open |

---

## 2. Community Demand Trends (from Issues)

Comment-weighted themes:

1. **Trust & namespace (43 comments)** — [#492](https://github.com/anthropics/skills/issues/492): community Skills shipping under `anthropic/` impersonates official packages and blurs the permission boundary. Highest-engagement issue in the set.  
2. **Org / team distribution (16 comments, 8 👍)** — [#228](https://github.com/anthropics/skills/issues/228): share Skills inside Claude.ai without Slack + manual upload.  
3. **Trigger reliability (12 comments, 7 👍)** — [#556](https://github.com/anthropics/skills/issues/556): `claude -p` never fires Skills in `run_eval.py` (0% trigger rate). Same cluster as skill-creator PRs.  
4. **Install / catalog hygiene** — [#62](https://github.com/anthropics/skills/issues/62) skills vanish after rename; [#189](https://github.com/anthropics/skills/issues/189) (9 👍) `document-skills` and `example-skills` install identical content and duplicate context.  
5. **Context budget & enterprise data** — [#1487](https://github.com/anthropics/skills/issues/1487) `claude-api` injects ~156k tokens in one call; [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint + ACLs in SKILL.md.  
6. **Proposed new directions (not yet PRs, or early)**  
   - Compact agent memory: [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory`  
   - Agent governance / safety patterns: [#412](https://github.com/anthropics/skills/issues/412) (closed)  
   - Reasoning quality gates: [#1385](https://github.com/anthropics/skills/issues/1385) calibrate → adversarial review → delivery verify  
   - Plus PR-side demand for **E2E test gen, HPC/ops, Web3 audit, Markdown→video, bulk-write safety**

Demand is less “more creative Skills” and more **distribution, identity, eval correctness, and context cost**.

---

## 3. High-Potential Pending Skills

Likely to merge or stay in the conversation because they are either (a) fixes to official Skills or (b) recently updated feature PRs:

- **Must-fix official path:** [#1742](https://github.com/anthropics/skills/pull/1742) MCP 2.x client/headers · [#1769](https://github.com/anthropics/skills/pull/1769) / [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator eval · [#1790](https://github.com/anthropics/skills/pull/1790) docx rels · [#1765](https://github.com/anthropics/skills/pull/1765) UTF-8 office diffs  
- **Feature Skills with recent updates:** [#822](https://github.com/anthropics/skills/pull/822) AWT E2E · [#525](https://github.com/anthropics/skills/pull/525) Pyxel · [#1703](https://github.com/anthropics/skills/pull/1703) md2video-audio · [#1771](https://github.com/anthropics/skills/pull/1771) ProofCore auditor · [#1776](https://github.com/anthropics/skills/pull/1776) blast-radius · [#1615](https://github.com/anthropics/skills/pull/1615) SCNet HPC  

These are the queue to watch if you track “what lands next” rather than “what people complain about.”

---

## 4. Skills Ecosystem Insight

**The community’s concentrated demand is not more Skills—it is a trustworthy, trigger-correct, context-cheap way to *share and evaluate* Skills (official namespace vs community, org-wide install, working eval harnesses, and document/MCP Skills that survive real filesystems and MCP 2.x).**

---

# Claude Code Community Digest — 2026-09-21

Source: [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. This Week's Highlights

A dense 24-hour ship window landed **v2.1.271–v2.1.278**: AGENTS.md as a CLAUDE.md fallback, server-side Auto-mode classification (no classifier overhead charge), gateway/account UX, send-now keys, memory-critical warnings, MCP startup bounds, and gateway hint headers. Community heat remains on **multi-account Desktop profiles** (#18435, 818 👍 / 194 comments) and a cluster of **Desktop slash-command mid-input regressions**, plus Auto-mode over-denial and Windows Cowork service hangs.

## 2. Releases

Shipped in the last 24 hours (newest first):

- **[v2.1.278](https://github.com/anthropics/claude-code/releases/tag/v2.1.278)** — Auto mode for Claude API / Enterprise / Bedrock / Vertex / Foundry / gateways now defaults to the **server-side classifier** (no classifier overhead charge). Opt out on Bedrock/Vertex/Foundry/gateways with `CLAUDE_CODE_AUTO_MODE_SERVER=0`.
- **[v2.1.277](https://github.com/anthropics/claude-code/releases/tag/v2.1.277)** — **AGENTS.md** is read when a project has no CLAUDE.md (change under “Project instructions” in `/config`; not yet on Bedrock/Vertex/Foundry). Added `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` for egress-only Claude apps gateways.
- **[v2.1.276](https://github.com/anthropics/claude-code/releases/tag/v2.1.276)** — Fixed every request failing with `400 … Input tag 'advisor_20260301'` when `ANTHROPIC_BASE_URL` points at a proxy/gateway (2.1.275 regression).
- **[v2.1.275](https://github.com/anthropics/claude-code/releases/tag/v2.1.275)** — Gateway sign-in confirms the named signed-in account before saving credentials; `/status` shows it. **Send-now** key: Ctrl+Enter or Ctrl+X Ctrl+S interrupts the current turn and flushes the queue.
- **[v2.1.274](https://github.com/anthropics/claude-code/releases/tag/v2.1.274)** — Visible warning when memory usage is critical. `CLAUDE_CODE_MCP_STARTUP_WAIT_MS` bounds first non-interactive wait for MCP servers (`0` = don’t wait). Added `effort` attribute on the client.
- **[v2.1.273](https://github.com/anthropics/claude-code/releases/tag/v2.1.273)** — Opt-in gateway hint headers (`CLAUDE_CODE_GATEWAY_HINT_HEADERS=1`): `x-claude-code-request-class`, `agent-type`, `prev-tool-durations`, `compaction`, `context-compacted`.
- **[v2.1.272](https://github.com/anthropics/claude-code/releases/tag/v2.1.272)** — Bug fixes and reliability.
- **[v2.1.271](https://github.com/anthropics/claude-code/releases/tag/v2.1.271)** — Fast mode in Claude Code Remote (cloud and self-hosted) follows host `/fast`. Mouse wheel support in fullscreen `/config`.

## 3. Hot Issues

1. **[#18435](https://github.com/anthropics/claude-code/issues/18435)** — Multi-account / profile switching in Claude Desktop. Longest-running request in this window (818 👍, 194 comments). Core for contractors and multi-org users.
2. **[#5674](https://github.com/anthropics/claude-code/issues/5674)** — Persistent `ECONNRESET` on macOS only (Windows/Linux on same net fine). Still open after a year; 54 comments / 54 👍. Breaks long agent runs.
3. **[#57230](https://github.com/anthropics/claude-code/issues/57230)** — VS Code extension: native toast when Claude needs attention (permission, done, waiting). Status-bar / tab-dot is easy to miss; 45 👍.
4. **[#85840](https://github.com/anthropics/claude-code/issues/85840)** — Windows CoworkVMService cannot arm recovery (“Access is denied”); silent `claude.exe` hang, no dump. Claimed root of closed #59794 / #66849.
5. **[#84581](https://github.com/anthropics/claude-code/issues/84581)** — Cowork cloud sessions cannot reach any GitHub repo; git proxy tells the agent to call a nonexistent `add_repo` tool.
6. **[#91094](https://github.com/anthropics/claude-code/issues/91094) / [#89771](https://github.com/anthropics/claude-code/issues/89771) / [#90441](https://github.com/anthropics/claude-code/issues/90441) / [#91337](https://github.com/anthropics/claude-code/issues/91337)** — Desktop (and some TUI) slash/skill autocomplete only at index 0 since ~1.40609.0 / 2.1.247. Skills mid-message are broken; CLI often still works.
7. **[#95326](https://github.com/anthropics/claude-code/issues/95326)** — Claude in Chrome: all tools blocked on reddit.com / redd.it with “safety restrictions” since 2026-09-18 (worked 09-17).
8. **[#95200](https://github.com/anthropics/claude-code/issues/95200)** — Auto mode since 2.1.270: ~12× more denials on a solo owner’s own release work; Manual fallback is 55+ clicks for a 2-key change.
9. **[#95743](https://github.com/anthropics/claude-code/issues/95743)** — Fable 5.1 set to `high` effort but model reports `reasoning_effort: 10` (CLI 2.1.278).
10. **[#95749](https://github.com/anthropics/claude-code/issues/95749)** — Auto mode classifier allowed an unauthorized push to `main` (14 files / 836 insertions) without confirmation.

Also notable: worktree `source` denylist (#84530, closed), hook leak across worktrees (#85935, closed), background subagents with zero progress UI (#95730), macOS Local Network deny with `bundle_id: (null)` (#95738), VS Code ripgrep resolver returning bare `rg` (#93079), OOM from loading all session histories (#89075).

## 4. Key PR Progress

1. **[#95409](https://github.com/anthropics/claude-code/pull/95409)** (closed) — `mods/agents-md`: project-instructions mod that reads AGENTS.md like CLAUDE.md (`instructionFiles`). Aligns with v2.1.277.
2. **[#95417](https://github.com/anthropics/claude-code/pull/95417)** (closed) — Don’t attach nested AGENTS.md on Read when the engine itself attaches nothing (`--bare` / `CLAUDE_CODE_DISABLE_ATTACHMENTS`).
3. **[#95698](https://github.com/anthropics/claude-code/pull/95698)** (open) — Run ralph-wiggum / output-style `.sh` hooks via `bash` with a quoted path. Refs #95673 / #78490.
4. **[#87077](https://github.com/anthropics/claude-code/pull/87077)** (open) — Repair invalid YAML frontmatter in pr-review-toolkit agents (dialogue scalars parsed as nested maps → empty metadata). Ties to #86748.
5. **[#87079](https://github.com/anthropics/claude-code/pull/87079)** (open) — security-guidance: `**` globs must match zero-depth paths (fnmatch `*` already crosses `/`).
6. **[#95423](https://github.com/anthropics/claude-code/pull/95423)** (open) — `diff` mod: skip refetch after read-only shell tools (`ls`, `git status`, `cat`, grep) via `isReadOnly`.
7. **[#94847](https://github.com/anthropics/claude-code/pull/94847)** (open) — First edit opens the diff pane only when there is a file to list (no empty pane for out-of-repo / ignored / other-worktree writes).
8. **[#95587](https://github.com/anthropics/claude-code/pull/95587)** (closed) — Resumed session with edits opens the pane; `/clear` leaves it; session line follows engine start.
9. **[#95488](https://github.com/anthropics/claude-code/pull/95488)** (closed) — Docked pane reads the repo before open so it never lands on “Loading diff…”.
10. **[#95618](https://github.com/anthropics/claude-code/pull/95618)** (closed) — Telemetry: complete rows via `$`, batched, built-in plugins only (refuses user/admin-installed plugins).

Supporting closed diff-mod work: first-edit only from main loop with checkpointing (#95476), pane only where layout docks (#94653), don’t run git at session start (#94594), pinned header / wheel routing (#94184), tests moved next to mods (#93951). Docs: session-scoped prompt-approved sandbox hosts (#71627, open).

## 5. Hot Discussions

Omitted — no Discussions data was provided.

## 6. Feature Request Trends

- **Multi-identity Desktop**: first-class account/profile switching without re-auth (#18435).
- **Attention UX**: OS/VS Code toasts when the agent needs a click (#57230); progress for background subagents (#95730).
- **Instruction files**: AGENTS.md as CLAUDE.md peer (now shipping; still missing on Bedrock/Vertex/Foundry).
- **Smarter Auto mode**: classify *intent* plus action (#87881); don’t over-deny an owner’s own repo; don’t silently push `main`.
- **Skills mid-compose**: `/` autocomplete anywhere in the input, Desktop + TUI parity.
- **Gateway observability**: request-class / agent-type / compaction headers (2.1.273) and egress-boundary flags (2.1.277).

## 7. Developer Pain Points

- **Desktop input regressions**: slash/skills only at column 0; “Sending…” hangs; project stuck “busy”; PR chip that won’t dismiss.
- **Auto mode trust gap**: more denials after 2.1.270, custom `hard_deny`/`soft_deny` loaded but not enforced (#88891), unauthorized `git push` to main.
- **Platform networking**: macOS `ECONNRESET` and Local Network denials with null bundle id; Windows Cowork service ACL / silent hang; Chrome tools blocked on Reddit.
- **Isolation leaks**: worktree `source` denylist and Stop-hook settings crossing worktrees.
- **IDE search/memory**: VS Code ripgrep resolver discards its probe; extension host OOM from loading every session history; no native attention toast.
- **Cloud Cowork GitHub**: no repo access + hallucinated `add_repo` tool.
- **Effort / model wiring**: UI “high” vs model `reasoning_effort: 10` on Fable 5.1.
- **Plugin quality**: invalid agent YAML (empty metadata), unquoted hook script paths.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-21

Source: [github.com/openai/codex](https://github.com/openai/codex)

## 1. This Week's Highlights

Codex shipped a stable **0.155.1** bugfix plus a rapid **0.156.0-alpha.2–10** cadence, while GitHub activity clustered around **Windows desktop reliability**, **quota burn**, and **Computer Use / native-app discovery**. On the product side, merged TUI work is dense: mouse selection, usage dashboards, `/tui` mode picker, subagent MCP elicitation, and voice playback hardening. Community pressure remains highest on **remote control**, **rewind/revert**, and **usage-limit transparency**.

## 2. Releases

**Stable:** [rust-v0.155.1](https://github.com/openai/codex/releases/tag/rust-v0.155.1) (`0.155.1`)

- New local TUI sessions now leave **reasoning summaries disabled by default**, so providers that reject them no longer fail the request.
- Explicit reasoning-summary settings are still honored.
- Fix tracked in [#46467](https://github.com/openai/codex/pull/46467).
- Changelog: [compare rust-v0.155…](https://github.com/openai/codex/compare/rust-v0.155)

**Alphas (last 24h, notes sparse):**  
`0.156.0-alpha.2` through `0.156.0-alpha.10` — [alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.10), [alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.9), [alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.8), [alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.7), [alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.6), [alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.5), [alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.4), [alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.3), [alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.2). Release bodies are title-only; treat as rolling TUI/app-server cuts rather than documented feature drops.

## 3. Hot Issues

1. **[#42987](https://github.com/openai/codex/issues/42987)** — GPT-6 Astra Medium burned a Plus 5-hour Codex quota in two short Windows turns. Highest comment count (25) and 15 👍. Signals a billing/telemetry mismatch that makes Astra unusable for short local workflows.

2. **[#44736](https://github.com/openai/codex/issues/44736)** — Windows ChatGPT project prewarming locks local mirrors and startup rewrites wipe the `node_repl` cwd workaround. Ties to older [#42215](https://github.com/openai/codex/issues/42215) / [#34499](https://github.com/openai/codex/issues/34499); still unresolved after user-confirmed workarounds.

3. **[#40550](https://github.com/openai/codex/issues/40550)** — Windows app one-time setup fails with `helper_failed` / Access Denied on `codex-windows-sandbox-setup.exe`. Blocks first-run install even when the AppX package status is `Ok`.

4. **[#44342](https://github.com/openai/codex/issues/44342)** — Existing-chat send hangs on `loading-local-config` / pending `codex-home`. Reload recovers; a normal restart can bring it back. Core desktop send path is flaky.

5. **[#35346](https://github.com/openai/codex/issues/35346)** — Codex Desktop never requests macOS Local Network permission, so LAN/SSH from the app fails with `EHOSTUNREACH` while Terminal works. Blocks remote-host workflows on macOS 27.

6. **[#45219](https://github.com/openai/codex/issues/45219)** — Windows app-server dies mid tool-call with “Custom tool call output is missing”; conversation pane goes blank. Breaks Work Mode mid-task.

7. **[#21982](https://github.com/openai/codex/issues/21982)** — Sandbox permission prompts appear in the session transcript but never surface as app-server `requestApproval` JSON-RPC. Integrators stall on escalations.

8. **[#45974](https://github.com/openai/codex/issues/45974)** — CLI keeps waking `xhigh` to poll long-running deterministic jobs and burns weekly quota before the job finishes. Same theme as quota-burn reports.

9. **[#46853](https://github.com/openai/codex/issues/46853)** / **[#46850](https://github.com/openai/codex/issues/46850)** — Self-reported model-behavior incidents: false repo/deploy state, unsafe public-disclosure draft, and ~2.01B recorded tokens with repeated false “done” claims. High-severity trust issues even if self-filed.

10. **Computer Use cluster** — [#45365](https://github.com/openai/codex/issues/45365), [#45148](https://github.com/openai/codex/issues/45148), [#44481](https://github.com/openai/codex/issues/44481), [#45348](https://github.com/openai/codex/issues/45348), [#46327](https://github.com/openai/codex/issues/46327): Windows (and Intel Mac) native-app discovery empty except on Astra; Intel Mac Computer Use unavailable. Computer Use is shipping but platform coverage is incomplete.

Honorable mentions: false-positive safety blocks [#46823](https://github.com/openai/codex/issues/46823), [#46889](https://github.com/openai/codex/issues/46889); “limit hit” while usage UI shows remaining [#46887](https://github.com/openai/codex/issues/46887), [#46890](https://github.com/openai/codex/issues/46890); MSIX update brick [#46622](https://github.com/openai/codex/issues/46622).

## 4. Key PR Progress

All listed PRs below are **CLOSED** in the last 24h and authored by `copyberry[bot]` — treat as landed TUI/app-server work, not open review threads.

1. **[#46884](https://github.com/openai/codex/pull/46884)** — Plain-click transcript links; style bare URLs.
2. **[#46883](https://github.com/openai/codex/pull/46883)** — `/tui` picker for Scrollback vs Fullscreen; persists `tui.fullscreen_transcript`.
3. **[#46882](https://github.com/openai/codex/pull/46882)** — Agent command-center shortcut grouping (Navigate / Tasks / View) and layout.
4. **[#46880](https://github.com/openai/codex/pull/46880)** — Voice playback survives pauses and RTP bursts (GStreamer sink → jitter buffer).
5. **[#46877](https://github.com/openai/codex/pull/46877)** — Subagents can request MCP elicitation (browser sign-in, forms, child-thread approvals).
6. **[#46867](https://github.com/openai/codex/pull/46867)** — Defer subagent activity until the parent answer stream finishes so streamed text is not flushed early.
7. **[#46866](https://github.com/openai/codex/pull/46866)** / **[#46864](https://github.com/openai/codex/pull/46864)** / **[#46863](https://github.com/openai/codex/pull/46863)** — Usage view mouse nav, layout, scroll-position preservation, keyboard help.
8. **[#46858](https://github.com/openai/codex/pull/46858)** + **[#46857](https://github.com/openai/codex/pull/46857)** — Fullscreen composer mouse selection/editing; shared `text_selection` helpers.
9. **[#46849](https://github.com/openai/codex/pull/46849)** — Fullscreen transcript gated by `tui.fullscreen_transcript` (default off).
10. **[#46844](https://github.com/openai/codex/pull/46844)** — Temporary structured threads force read-only permissions so managed `:workspace` profiles cannot block them.

Also notable: stadium Mermaid nodes [#46856](https://github.com/openai/codex/pull/46856), 250 ms terminal probe timeout [#46855](https://github.com/openai/codex/pull/46855), 24h clock timestamps [#46845](https://github.com/openai/codex/pull/46845), onboarding-only logo animation [#46859](https://github.com/openai/codex/pull/46859).

## 5. Hot Discussions

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200)** — Remote-control Codex from the ChatGPT app (191 👍, 50 comments). Still the flagship request; users already glue Tailscale + SSH.
- **[#9618](https://github.com/openai/codex/discussions/9618)** — `/rewind` or `/revert` (141 👍). Compared unfavorably with OpenCode and Claude Code.
- **[#14595](https://github.com/openai/codex/discussions/14595)** — “Remote control wen?” Roadmap pressure, same cluster as #9200.
- **[#25630](https://github.com/openai/codex/discussions/25630)** — In-app account switcher for multi-account quota juggling.
- **[#13287](https://github.com/openai/codex/discussions/13287)** — Long-horizon, multi-session development support.
- **[#34946](https://github.com/openai/codex/issues/34946)** (issue, but feature-shaped) — Scheduled tasks on SSH-connected hosts, surfaced in the controlling app.

### Q&A
- **[#2503](https://github.com/openai/codex/discussions/2503)** — How to scroll conversation history in the TUI (still active after a year).
- **[#37991](https://github.com/openai/codex/discussions/37991)** — Map a Windows Store package to bundled CLI/app-server commit.
- **[#45938](https://github.com/openai/codex/discussions/45938)** — PreToolUse can block/rewrite a call but cannot substitute a tool result — is that intentional?
- **[#46001](https://github.com/openai/codex/discussions/46001)** — Windows Desktop: selected vs effective permission profile mismatch.

### Show and tell
- **[#16329](https://github.com/openai/codex/discussions/16329)** — Awesome Codex CLI: 150+ subagents, skills, plugins, MCP servers.
- **[#46774](https://github.com/openai/codex/discussions/46774)** — Cross-agent session search by remembered word.
- **[#46874](https://github.com/openai/codex/discussions/46874)** — Agent Lint for Codex / AGENTS.md / MCP / Claude Code / Cursor configs.
- **[#44843](https://github.com/openai/codex/discussions/44843)** — SKILL.md → Codex plugin bundle converter.
- **[#45659](https://github.com/openai/codex/discussions/45659)** — Quota Reset Watch (independent reset tracker).

### General (quota / quality)
- **[#40707](https://github.com/openai/codex/discussions/40707)** — 5-hour limit is back; users want weekly-only.
- **[#46056](https://github.com/openai/codex/discussions/46056)** — Token consumption spike since ~2026-09-01 across models/effort levels.

## 6. Feature Request Trends

1. **Remote control** from ChatGPT mobile/desktop onto a headless Codex host (#9200, #14595, #34946, #46797).
2. **Session rewind / revert** without per-change commits (#9618).
3. **Account / quota UX**: switch accounts, drop the 5-hour cap, publish reset policy (#25630, #40707, #45211, Quota Reset Watch).
4. **Computer Use completeness** on Windows + Intel Mac (native app inventory, helper presence).
5. **TUI power-user surface**: scroll history, mouse, fullscreen transcript, timezone-aware timestamps, pets/Sixel in VS Code (#2503, #27335, #46170 + today’s PRs).
6. **App-server / MCP fidelity**: permission prompts, elicitation in subagents, PreToolUse result substitution.
7. **Long-horizon tasks**: scheduled remote jobs, multi-session continuity, adaptive model/tool/subagent allocation (#13287, #46658).
8. **Ecosystem packaging**: plugin converters, linters, rollout-file viewers.

## 7. Developer Pain Points

- **Windows first-run and update path is fragile**: sandbox helper Access Denied, MSIX `0x80070002` bricks, prewarm locks, MCP `invalid transport`, missing chat history after Store updates.
- **Quota accounting does not match felt usage**: Astra/xhigh burns 5-hour or weekly budgets on short or polling turns; desktop “limit hit” while the usage pane shows remaining.
- **Desktop ↔ app-server contract gaps**: approvals not forwarded, tool output missing, config load hangs, LAN permission never requested on macOS.
- **Computer Use is model- and CPU-dependent**: works on Astra, fails on Luna/Terra/Sol; empty native-app inventory; missing on Intel Mac.
- **Trust / safety misfires**: cybersecurity false positives, blocked authorized offline review, agents claiming completion and drafting public incident text incorrectly.
- **Local state is easy to corrupt**: resume/unarchive failures, sidebar sections emptying after restart, profile-to-profile Windows migrations documented by users themselves.
- **Integrators want hooks that can return a tool result**, not only block/rewrite — current PreToolUse boundary is a ceiling for “Experience” / memory layers.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

I'll compile the digest from the provided GitHub snapshot and fill any missing release/issue details from the repo if needed.# Gemini CLI Community Digest — 2026-09-21

Repo: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. This Week's Highlights

Nightly 0.62.0 continues to land reliability work around PTY/ConPTY lifecycle, OAuth credential persistence, and UI layout guards, while stable **v0.60.0** remains the latest numbered release. Agent-area issues dominate the 24h update list: subagent status lying after `MAX_TURNS`, generalist-agent hangs, Auto Memory redaction/retry bugs, and browser-agent Wayland/settings failures. On the PR side, contributors are hardening auth persistence, quota error surfacing, model-ID pinning for Gemini 3 Pro preview, sandbox folder-trust, and extension loading so one bad directory cannot take down the whole loader.

## 2. Releases

Daily nightlies on the 0.62 line (latest: [v0.62.0-nightly.20260920.gcfbcaa8df](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260920.gcfbcaa8df)). Notable notes from recent tags:

- [v0.62.0-nightly.20260919](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260919.gcfbcaa8df) — ConPTY process-exit sync and PTY output finalization ([#29383](https://github.com/google-gemini/gemini-cli/pull/29383) and follow-ons).
- [v0.62.0-nightly.20260918](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260918.g9450ade79) — retain OAuth refresh tokens and make credential deletion idempotent ([#29339](https://github.com/google-gemini/gemini-cli/pull/29339)); guard negative layout dimensions in border rendering; PTY FD cleanup; deflake integration tests.
- [v0.62.0-nightly.20260916](https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260916.g6a466a7e2) — preserve `AgentLoopContext` across object spread ([#29335](https://github.com/google-gemini/gemini-cli/pull/29335)); early return on unsupported store in a2a-server tasks metadata.
- [v0.60.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0) — destination validation / connection routing in web-fetch; RFC 9207 issuer identification in MCP OAuth.
- Also tagged: [v0.61.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-preview.0).

## 3. Hot Issues

1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports `GOAL` / `success` after hitting `MAX_TURNS` (P1). Hides real interruption; 13 comments, still open and marked need-retesting.
2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs forever on simple work (P1, 8 👍). Workaround: instruct the model not to defer to subagents.
3. [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandbox + post-execution intent routing so Gemini 3 can use native bash (`grep`/`sed`/`awk`) safely. Large enhancement, active design thread.
4. [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file read/search/mapping to cut misaligned reads and token noise.
5. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Model under-uses custom skills and sub-agents unless explicitly told. Recurring “agent won’t pick up skills” complaint.
6. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory sends transcripts to the model before redaction; needs deterministic redaction and less logging of secrets.
7. [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) / [#26523](https://github.com/google-gemini/gemini-cli/issues/26523) — Auto Memory retries low-signal sessions forever and silently skips invalid inbox patches.
8. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (P1).
9. [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) — Browser Agent ignores `settings.json` overrides such as `maxTurns`.
10. [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error when more than ~128 tools are in scope; agent does not prune the tool list.

Also watched: [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) (discourage destructive git/DB commands), [#23571](https://github.com/google-gemini/gemini-cli/issues/23571) (tmp scripts scattered across the workspace), [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) (`/compress` not persisted on resume).

## 4. Key PR Progress

1. [#29429](https://github.com/google-gemini/gemini-cli/pull/29429) — Surface quota limit + reset window from Cloud Code `RESOURCE_EXHAUSTED` metadata (P1, enterprise).
2. [#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — Persist OAuth credentials immediately after browser/user-code login so the CLI does not re-prompt.
3. [#29420](https://github.com/google-gemini/gemini-cli/pull/29420) / [#29422](https://github.com/google-gemini/gemini-cli/pull/29422) — Keep explicit versioned model IDs (`gemini-3-pro-preview`, `gemini-2.5-flash`); only aliases should follow 3.1 rollout remapping.
4. [#29423](https://github.com/google-gemini/gemini-cli/pull/29423) — Persist folder trust to host `trustedFolders.json` when running in Podman/Docker sandbox.
5. [#29387](https://github.com/google-gemini/gemini-cli/pull/29387) — One malformed extension directory must not fail all extension loading.
6. [#26686](https://github.com/google-gemini/gemini-cli/pull/26686) — Initialize git submodules on `gemini extensions install` (help wanted).
7. [#28183](https://github.com/google-gemini/gemini-cli/pull/28183) — VS Code companion: keep terminal focus when closing diff tabs after approve (P1).
8. [#29404](https://github.com/google-gemini/gemini-cli/pull/29404) — `gemini models list` with JSON output for integrations that cannot scrape `/model`.
9. [#29342](https://github.com/google-gemini/gemini-cli/pull/29342) — Avoid nested React state updates in input history (StrictMode-safe).
10. [#29304](https://github.com/google-gemini/gemini-cli/pull/29304) — Do not split UTF-16 surrogate pairs when truncating display text (emoji-safe).

Closed in the window: [#29427](https://github.com/google-gemini/gemini-cli/pull/29427) (forward parent signals so child processes are not orphaned) and [#29426](https://github.com/google-gemini/gemini-cli/pull/29426) (detect legacy CPUs lacking AVX before showing Antigravity install).

## 6. Feature Request Trends

- **Native-bash / sandboxed POSIX affinity** for Gemini 3 instead of over-abstracted tools ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)).
- **AST-aware read/search/map** to shrink context and turns ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561) “tactful extraction”).
- **Persistent file-based task tracking** replacing in-context WriteToDo ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836), [#21000](https://github.com/google-gemini/gemini-cli/issues/21000)).
- **Subagent observability**: trajectories via `/chat share`, bug reports that include subagent context, visible recovery status ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763), [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- **Browser agent resilience**: session takeover, lock recovery, Wayland, honor `settings.json` ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Machine-readable CLI surface**: `gemini models list -o json` ([#29404](https://github.com/google-gemini/gemini-cli/pull/29404)), accurate self-description of flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **Extension install robustness**: git submodules, isolate broken extension dirs.

## 7. Developer Pain Points

- **Subagents are both underused and unsafe when used**: hangs, false `GOAL` on turn cap, ignored settings, missing context in `/bug`.
- **Auto Memory quality/security**: pre-redaction model exposure, infinite retry of low-signal sessions, silent invalid patches.
- **Tool explosion / 400s** once tool count grows; no smart scoping.
- **Workspace pollution**: model writes tmp edit scripts in random directories; destructive git (`reset --force`) without safer alternatives.
- **Session continuity**: `/compress` does not survive resume; checkpoint load accepts non-array `history`.
- **Auth and quota UX**: credentials not persisted after first login; quota errors omit server-provided reset window.
- **Platform edges**: Windows IDE detection falling back to Unix `ps`, ConPTY exit races, Wayland browser, sandbox trust not written to host, emoji truncation, terminal resize flicker ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)).
- **Interactive prompts** (e.g. Vite scaffold) still stall the agent ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).

---

*Sources: last-24h releases, issues, and PRs on [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli). Discussions section omitted — no discussion payload was supplied.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-21

Repo: [github/copilot-cli](https://github.com/github/copilot-cli)

## 1. This Week's Highlights

Shipping cadence remains high: **v1.0.87-0** landed with Auto-routing startup defaults (org policy + user override) and combined consecutive steering prompts, while **v1.0.85–1.0.86** rolled Vim mode to everyone, custom-agent opt-in for repo instruction files (`AGENTS.md` / `copilot-instructions.md` / `CLAUDE.md`), `/config` and `/sandbox` network rules, and more resilient session resume. Community heat is still on **MCP reliability** (Figma remote discovery, stdio lifetime, OAuth issuer mismatch, tools/list after cancel) and **long-session durability** (OOM on `--resume`, transcript corruption, checkpoint `git clean -fd` wiping untracked files).

## 2. Releases

### v1.0.87-0
- Auto routing tier: user + managed startup defaults, including **strict** and **user-overridable organization policy**.
- Consecutive steering prompts in the same mode merge into one pending message; **Up** in an empty input recalls it for edit (including pasted text).

### v1.0.86 / 1.0.86-1 / 1.0.86-2 (2026-09-17)
- Custom agents can set `include-custom-instructions: true` in frontmatter to load repo instruction files.
- Resume without plugin-directory / discovery / working-directory overrides preserves market context.
- Fixes for session resume with recoverable transcript corruption, compact-timeline readability, and Autopilot stopping after accepted task completion.

### v1.0.85 (2026-09-16)
- **Vim mode for everyone** (`/vim` or `editorMode: vim`); current mode shown while typing.
- `/settings` opt-in for context-management tools on agents and subagents.
- Transcript view work started (`transcriptView`).

### v1.0.84-6 through 1.0.84-9 (notable)
- `/config` sidebar; `/sandbox` host allow/deny without replacing upstream proxy.
- Managed Edit/Write rules applied to shell redirections and supported in-place `sed`.
- `transcriptView: "concise"` groups tool activity into expandable summaries.
- Pause/resume Agent Factory from `/factories`.
- Faster metadata scan for large local session histories.
- Cursor End / Ctrl+E now reach the true end of wrapped lines.
- Claude adaptive-only thinking-shape fix; `sessionEnd` hooks on `/clear`.
- Model lists refresh after sign-in / account switch / sign-out.

## 3. Hot Issues

Picked for comment volume, thumbs, or blast radius (MCP, sessions, data loss, billing).

1. **[#4870](https://github.com/github/copilot-cli/issues/4870)** (CLOSED, 8 comments, 11👍) — Figma remote MCP (`mcp.figma.com`) auth+init succeed, but `server/discover` `-32601` is treated as fatal so tools never register (works in VS Code). Highest-reaction MCP interop bug this window.

2. **[#4069](https://github.com/github/copilot-cli/issues/4069)** (CLOSED, 8 comments, 9👍) — TUI wedges mid-turn on WSL2 + Windows Terminal: screen clear, dead input, ignored Ctrl+C, write EIO then EPIPE on the Rust JSON-RPC transport. Platform reliability still a top pain.

3. **[#4765](https://github.com/github/copilot-cli/issues/4765)** (CLOSED, 8 comments) — Config (`.mcp.json`, hooks) not read when the working directory is a workspace that is **not** a git repo root. Multi-repo / non-monorepo layouts break silently.

4. **[#4699](https://github.com/github/copilot-cli/issues/4699)** (OPEN, 5 comments, 6👍) — V8 heap OOM on long `--resume` sessions (~4 GiB cap); diagnostic dumps land in **cwd**. Long-running agent workflows are unsafe.

5. **[#1675](https://github.com/github/copilot-cli/issues/1675)** (CLOSED, 5 comments) — Checkpoint restore runs `git clean -fd` and **permanently deletes untracked files**. Data-loss class issue; still being referenced.

6. **[#4224](https://github.com/github/copilot-cli/issues/4224)** (CLOSED, 5 comments) — OTel spans for subagent/`task` calls omit billing attributes (`nano_aiu`, cost). External cost accounting undercounts real usage.

7. **[#3762](https://github.com/github/copilot-cli/issues/3762)** (CLOSED, 7 comments) — `contextTier` config is a no-op until the user manually picks a long-context model. Config-vs-runtime mismatch for orgs.

8. **[#4905](https://github.com/github/copilot-cli/issues/4905)** (OPEN, 4 comments) — Desktop app sessions die minutes after spawn: “GitHub credential registration is no longer available”; github-mcp-server catalog goes stale/fatal.

9. **[#2892](https://github.com/github/copilot-cli/issues/2892)** (CLOSED, 4 comments) — MCP stdio for sub-agents closes ~4s after connect while the agent is still generating. Subagent + MCP is still fragile.

10. **[#4606](https://github.com/github/copilot-cli/issues/4606)** (OPEN, 3 comments) — Google Workspace MCP OAuth fails on `accounts.google.com` trailing-slash issuer mismatch before the browser flow. Blocks a major hosted MCP.

Honorable mentions: [#1886](https://github.com/github/copilot-cli/issues/1886) (`.github/mcp.json` / `lsp.json` ignored), [#2012](https://github.com/github/copilot-cli/issues/2012) / [#4098](https://github.com/github/copilot-cli/issues/4098) (transcript JSONL corruption on resume), [#4731](https://github.com/github/copilot-cli/issues/4731) (cancelled tool + `tools/list` permanently strips a server), [#1130](https://github.com/github/copilot-cli/issues/1130) (skills blown out of the context window).

## 4. Key PR Progress

**No PRs were updated in the last 24 hours** (0 items in the source dump). Release notes imply internal work already shipped via the 1.0.84–1.0.87 prereleases above; there is no public PR trail to summarize today.

## 5. Hot Discussions

Omitted — no Discussions data was provided.

## 6. Feature Request Trends

Distilled from the issue set (including closed “would be nice” and FR-tagged items):

| Direction | Evidence |
|---|---|
| Host-agnostic remote sessions | [#2922](https://github.com/github/copilot-cli/issues/2922) — `/remote` should work for GitLab/Bitbucket, not only GitHub remotes |
| Prompt stash / queue UX | [#3034](https://github.com/github/copilot-cli/issues/3034) stash prompt; [#3692](https://github.com/github/copilot-cli/issues/3692) Escape should cancel the running task **and keep** the queued prompt (partially adjacent to 1.0.87 steering-prompt combine + Up-to-edit) |
| Config that actually applies | `contextTier` ([#3762](https://github.com/github/copilot-cli/issues/3762)), workspace-not-repo-root config ([#4765](https://github.com/github/copilot-cli/issues/4765)), instruction-file opt-in (now shipping for custom agents) |
| MCP as a first-class, durable transport | Discover errors should not be fatal ([#4870](https://github.com/github/copilot-cli/issues/4870)), stdio lifetime for subagents ([#2892](https://github.com/github/copilot-cli/issues/2892)), OAuth issuer quirks ([#4606](https://github.com/github/copilot-cli/issues/4606)), tools/list after cancel ([#4731](https://github.com/github/copilot-cli/issues/4731)), `.github/mcp.json` ([#1886](https://github.com/github/copilot-cli/issues/1886)) |
| Skills / context budget visibility | [#1130](https://github.com/github/copilot-cli/issues/1130) — skills silently dropped when token budget is tight |
| BYOK catalog completeness | [#3118](https://github.com/github/copilot-cli/issues/3118) — missing `gpt-5.5` in limits catalog |
| Safer checkpoints | Don’t `git clean -fd` untracked files ([#1675](https://github.com/github/copilot-cli/issues/1675)) |
| Observability / billing for subagents | [#4224](https://github.com/github/copilot-cli/issues/4224) |

## 7. Developer Pain Points

- **MCP is the sharpest edge.** Discovery treated as fatal, stdio torn down under subagents, OAuth issuer mismatches, refresh-after-cancel stripping tools for the process lifetime, and config files ignored outside a git root. VS Code often works where the CLI does not — that comparison keeps coming up.
- **Long sessions are unsafe.** OOM at the 4 GiB heap cap on `--resume`, crash dumps written into cwd, JSONL truncated/concatenated or polluted with U+2028/U+2029 so `/resume` dies, and restore auto-continuing work the user aborted ([#4673](https://github.com/github/copilot-cli/issues/4673)).
- **Destructive defaults.** Checkpoint rollback via `git clean -fd` deleting untracked files is the highest-severity “I lost work” report in this set.
- **Config lies.** `contextTier` does nothing until a manual model pick; hooks/`preToolUse` denials and steering text are dropped ([#3874](https://github.com/github/copilot-cli/issues/3874), [#4237](https://github.com/github/copilot-cli/issues/4237)); only the last `additionalContext` from multiple `sessionStart` hooks is injected ([#3589](https://github.com/github/copilot-cli/issues/3589)).
- **Windows / WSL terminal stack.** Mid-turn TUI wedge + EPIPE ([#4069](https://github.com/github/copilot-cli/issues/4069)), `.bat`/`.cmd` MCP spawn regression ([#3958](https://github.com/github/copilot-cli/issues/3958)), Ctrl+G + `code-insiders --wait` ([#3733](https://github.com/github/copilot-cli/issues/3733)).
- **Cost and model catalog drift.** Subagent spans missing billing attrs; BYOK limits catalog lagging new model IDs; evening transient CAPI errors ([#3117](https://github.com/github/copilot-cli/issues/3117)); vision-unsupported model 400s locking a session ([#3523](https://github.com/github/copilot-cli/issues/3523)).
- **Desktop vs CLI credential lifetime.** Sessions dying because GitHub credential registration expires for the bundled MCP catalog ([#4905](https://github.com/github/copilot-cli/issues/4905)).

---

*Source window: releases and issues updated in the last ~24h as provided; PRs and Discussions empty in the dump. Latest public tag in data: v1.0.87-0.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

I'll use the provided GitHub snapshot and quickly check the repo for any extra context on the latest release and discussions.# OpenCode Community Digest — 2026-09-21

Repo: [anomalyco/opencode](https://github.com/anomalyco/opencode)

## This Week's Highlights

Free-tier Zen access is the loudest community signal: multiple reports of “Free usage exceeded,” `[user_blocked]`, and “OpenCode's free tier can only be used from within OpenCode,” including on first sessions of the week ([#49433](https://github.com/anomalyco/opencode/issues/49433), [#49927](https://github.com/anomalyco/opencode/issues/49927), [#50093](https://github.com/anomalyco/opencode/issues/50093)). In parallel, the V2 / new-layout migration is still breaking workspaces, notifications, and multi-project flow, while contributors shipped targeted PRs for auto-compaction loops, unbounded session snapshots, websearch retries, and plugin-loader compatibility. v1.18.31 is the latest documented 1.x release; users on 2.0.x tags are already hitting a different set of Desktop/TUI regressions.

## Releases

**[v1.18.31](https://github.com/anomalyco/opencode/releases/tag/v1.18.31)** (latest 1.x notes)

- **Core:** Restore ACP session model, effort, mode, and reasoning chunk boundaries on load / resume / fork.
- **TUI:** Surface remote-config auth errors at startup and exit with a failure status.
- **Extensions:** Request summarized adaptive thinking for GitHub Copilot models.

Note: several issues/PRs in this window reference **2.0.8–2.0.11** tags. Those appear on the tag list but were not included as full release notes in the source dump.

## Hot Issues

1. **[#49433](https://github.com/anomalyco/opencode/issues/49433)** — Free-tier provider error (“can only be used from within OpenCode”)  
   48 comments, 11 👍. Highest-engagement ticket this window; users hitting it across models and package builds.

2. **[#29363](https://github.com/anomalyco/opencode/issues/29363)** — `limit.output` silently capped at 32k  
   22 comments, 22 👍. Long-running config mismatch; the experimental env var is widely disliked as the only escape hatch.

3. **[#1735](https://github.com/anomalyco/opencode/issues/1735)** *(closed)* — Custom-provider `max_tokens` defaults to 32000  
   Related to the 32k cap; still being referenced as users route through OpenAI-compatible gateways.

4. **[#49927](https://github.com/anomalyco/opencode/issues/49927)** — Free usage exceeded on first session of the week  
   Quota accounting looks broken even after idle periods; reported on 1.18.31.

5. **[#37546](https://github.com/anomalyco/opencode/issues/37546)** — Web layout lock-in, no workspaces  
   26 👍. New “tabs on top” layout cannot be reverted and drops git worktrees.

6. **[#48958](https://github.com/anomalyco/opencode/issues/48958)** — New layout makes the UI unusable  
   Same theme: project switching and worktree workflows collapsed after the layout change.

7. **[#39614](https://github.com/anomalyco/opencode/issues/39614)** — V2 UI does not support workspaces  
   Confirms the SDK still has workspace APIs that the new UI never wired up.

8. **[#43355](https://github.com/anomalyco/opencode/issues/43355)** — Desktop renderer freeze after agent turns  
   Electron ResizeObserver loop; only force-quit recovers. Backend stays healthy.

9. **[#49965](https://github.com/anomalyco/opencode/issues/49965)** — Auto-compaction after every Ollama tool step  
   Local openai-compatible providers get compacted far below context limits. PR #50233 targets this.

10. **[#50089](https://github.com/anomalyco/opencode/issues/50089)** — Session resume loads hundreds of MB of `summary.diffs`  
    Snapshot patches stored per message blow up heap on resume of large trees.

Honorable mentions: [#50093](https://github.com/anomalyco/opencode/issues/50093) (escalating free-tier retry timers), [#49057](https://github.com/anomalyco/opencode/issues/49057) (Muse Spark `[user_blocked]`, no appeal), [#50202](https://github.com/anomalyco/opencode/issues/50202) (Big Pickle free model producing corrupted output).

## Key PR Progress

1. **[#50233](https://github.com/anomalyco/opencode/pull/50233)** — Stop repeated auto-compaction that cannot shrink the session (closes #49965).
2. **[#50106](https://github.com/anomalyco/opencode/pull/50106)** — Stop republishing summary diffs into durable event snapshots (addresses #48641 / related growth bugs).
3. **[#47510](https://github.com/anomalyco/opencode/pull/47510)** — Compact superseded durable event snapshots; attacks unbounded `event` table growth.
4. **[#50225](https://github.com/anomalyco/opencode/pull/50225)** — websearch: retry transient Parallel failures and fall back to the other provider (closes #50227).
5. **[#50218](https://github.com/anomalyco/opencode/pull/50218)** — Load legacy named plugin exports even when a v2 default export exists (closes #50172).
6. **[#27554](https://github.com/anomalyco/opencode/pull/27554)** — Local LAN provider discovery + auto-discover models (`/connect` for OpenAI-compatible servers).
7. **[#50219](https://github.com/anomalyco/opencode/pull/50219)** — Lazy-load CLI commands; cut `--version` startup from ~1.5s to ~0.13s.
8. **[#43719](https://github.com/anomalyco/opencode/pull/43719)** — Desktop MCP server setup + connection testing UI.
9. **[#50207](https://github.com/anomalyco/opencode/pull/50207)** — Surface real Desktop file-handler errors instead of generic “IPC handler failed.”
10. **[#50231](https://github.com/anomalyco/opencode/pull/50231)** — Upgrade Effect to rc.115 (socket/schema/CLI breaking-change adoption).

Also closed recently: [#49995](https://github.com/anomalyco/opencode/pull/49995) (drop unsupported `max` reasoning effort for Muse Spark), [#50193](https://github.com/anomalyco/opencode/pull/50193) (Windows project picker start directory), [#50205](https://github.com/anomalyco/opencode/pull/50205) (stats query retry).

## Feature Request Trends

- **Workspaces / worktrees in V2 Web + new layout** — restore multi-project tabs, branch labels, and a layout toggle ([#37546](https://github.com/anomalyco/opencode/issues/37546), [#48958](https://github.com/anomalyco/opencode/issues/48958), [#39614](https://github.com/anomalyco/opencode/issues/39614), [#50228](https://github.com/anomalyco/opencode/issues/50228)).
- **First-class local / custom endpoints** — LAN discovery, vLLM preset, better openai-compatible defaults ([#27554](https://github.com/anomalyco/opencode/pull/27554), [#50222](https://github.com/anomalyco/opencode/issues/50222)).
- **Desktop/TUI operator polish** — MCP settings UI, copy session ID, always-expand tool output, archived-chat finder, clipboard over SSH/tmux.
- **Honest token / reasoning controls** — honor `limit.output`, expose ACP effort consistently, document attachment/input capabilities for custom models.

## Developer Pain Points

- **Zen free-tier trust:** quota trips on first use, blocked models with no appeal path, retry timers that grow across models.
- **Silent 32k output cap** on custom/gateway providers; config is ignored unless an experimental env var is set.
- **Layout migration debt:** workspaces gone, no revert, notifications not requested, project switching slower.
- **Session storage bloat:** full unified diffs persisted into snapshots; resume can spike multi-GB heaps.
- **Provider adapters are brittle:** Ollama over-compaction, Kimi K3 `reasoning_details` 400s, Firecrawl “no results,” websearch single-shot transport failures, hanging long-lived terminal commands.
- **Desktop IPC opacity:** file export / reveal / attachments fail with a generic handler error even when the real cause is known.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-21

Source: [earendil-works/pi](https://github.com/earendil-works/pi)

## 1. This Week's Highlights

v0.86.0 and v0.86.1 shipped in quick succession: prompt cache warming for long tool runs, a Meta Muse provider (`/login meta` / `META_API_KEY`), and the start of a mid-session system-message model so prompt and tool loadouts can change without rewriting the top-level system prompt. Community traffic is still dominated by Windows/TUI pain (IME, clipboard, ConPTY, fullscreen images) and provider-compat bugs (OpenAI-shaped fields on “compatible” APIs, missing `finish_reason`, 429/`Retry-After`, Codex idle cache misses). Several of those landed as same-day closes.

## 2. Releases

**[v0.86.1](https://github.com/earendil-works/pi/releases)**  
- **Meta Muse provider** — `/login meta` or `META_API_KEY` for Muse Spark models. Docs: [Meta (Muse subscription)](https://github.com/earendil-works/pi/blob/v0.86.1/packages/coding-agent/docs/providers.md#meta-muse-subscription).

**[v0.86.0](https://github.com/earendil-works/pi/releases)**  
- **Prompt cache warming** — keep prompt caches alive during long tool runs (and optionally while idle) with cost-aware refreshes. Docs: [Cache Warming](https://github.com/earendil-works/pi/blob/v0.86.0/packages/coding-agent/docs/settings.md#cache-warming).  
- Bug-reporting work also started in this release notes fragment.

## 3. Hot Issues

1. **[#7547](https://github.com/earendil-works/pi/issues/7547)** `[OPEN]` Windows: how do people actually run Pi? — **66 comments**. Long-running survey of install paths, terminals, and what should stay in-core vs. docs/extensions. Highest-engagement thread in the window.

2. **[#6665](https://github.com/earendil-works/pi/issues/6665)** `[OPEN]` TUI pins a full core while streaming — uncached `Intl.Segmenter` + per-chunk Markdown rebuild. Reproduces with `pi -ne`. 13 comments, 6 👍. Core perf, not an extension.

3. **[#9508](https://github.com/earendil-works/pi/issues/9508)** `[OPEN]` `pi-ai` sends OpenAI-only fields/roles/auth to “compatible” providers → 400/422. Matters for every non-OpenAI OpenAI-shaped backend.

4. **[#9062](https://github.com/earendil-works/pi/issues/9062)** `[OPEN]` Tool-call argument parsing is O(N²) on fragmented deltas (`partialJson` reparsed on every delta). Latency risk on large tool args.

5. **[#9815](https://github.com/earendil-works/pi/issues/9815)** `[OPEN]` `mistral-conversations` ignores `Retry-After` → avoidable 429s. Fresh, provider-correctness issue.

6. **[#9497](https://github.com/earendil-works/pi/issues/9497)** `[OPEN]` Windows CJK IME lag / missing candidate window; `showHardwareCursor` works around it. Directly blocks CJK users on Windows.

7. **[#9803](https://github.com/earendil-works/pi/issues/9803)** `[OPEN]` 0.86.0 regression: RPC steer success cannot be correlated with extension-handled input. Breaks scripted / multi-steer clients.

8. **[#9448](https://github.com/earendil-works/pi/issues/9448)** `[OPEN]` `pi auth check` cannot see extension-registered providers (`invalid_state`). Blocks non-interactive CI/review pipelines.

9. **[#6226](https://github.com/earendil-works/pi/issues/6226)** `[CLOSED]` Streams end without `finish_reason` on some providers (e.g. GLM 5.1 / NIM). Still representative of a class of compat bugs (see also #9790).

10. **[#9688](https://github.com/earendil-works/pi/issues/9688)** `[CLOSED]` Clipboard copy regression after OSC 52 was gated on SSH. Hit people in containers / remote-but-not-SSH setups. 2 👍, quickly closed.

Honorable mentions that closed in-window: [#9794](https://github.com/earendil-works/pi/issues/9794) 0.86.0 Windows import path, [#9810](https://github.com/earendil-works/pi/issues/9810) Codex metadata disabling CacheWarmer on long idle, [#9770](https://github.com/earendil-works/pi/issues/9770) find/grep no timeout + empty “success”.

## 4. Key PR Progress

1. **[#9096](https://github.com/earendil-works/pi/pull/9096)** `[CLOSED]` Meta provider + Muse subscription OAuth — shipped as 0.86.1. Unusual daily token remint; streaming currently burst-style.

2. **[#9668](https://github.com/earendil-works/pi/pull/9668)** `[CLOSED]` Prompt cache warming (Anthropic-first / explicit-cache providers) — shipped as 0.86.0.

3. **[#9116](https://github.com/earendil-works/pi/pull/9116)** `[CLOSED]` Mid-conversation system messages in `pi-ai` (layer 1 of #8998).

4. **[#9117](https://github.com/earendil-works/pi/pull/9117)** `[CLOSED]` Coding agent delivers prompt/tool changes as system-message deltas instead of rewriting the top-level prompt.

5. **[#9434](https://github.com/earendil-works/pi/pull/9434)** `[CLOSED]` Extensions can append to the session system prompt via `session_start` (`systemPromptAppend`).

6. **[#9804](https://github.com/earendil-works/pi/pull/9804)** `[CLOSED]` Exclude Cerebras from `supportsStrictMode` — mixed strict/unstrict tools were 400ing all Cerebras requests on 0.86.0.

7. **[#9799](https://github.com/earendil-works/pi/pull/9799)** `[CLOSED]` Terminate `agentLoop` streams on unrecoverable loop failure (no rejection handler previously).

8. **[#9800](https://github.com/earendil-works/pi/pull/9800)** `[CLOSED]` Handle bash output temp-file `WriteStream` errors when output is truncated to disk.

9. **[#9772](https://github.com/earendil-works/pi/pull/9772)** `[CLOSED]` Main-screen: stop scrollback clear/replay + ConPTY autowrap drift (Windows Terminal / pwsh).

10. **[#5268](https://github.com/earendil-works/pi/pull/5268)** `[CLOSED]` Render hardware cursor by default so the prompt caret hollows on blur — pairs with the CJK IME / `showHardwareCursor` thread.

Also moving: [#9329](https://github.com/earendil-works/pi/pull/9329) Orca as Kitty-image capable `[OPEN]`; [#9570](https://github.com/earendil-works/pi/pull/9570) map Gemini `TOO_MANY_TOOL_CALLS` `[OPEN]`; [#9776](https://github.com/earendil-works/pi/pull/9776) per-thinking-level sampling params `[OPEN]`; [#8158](https://github.com/earendil-works/pi/pull/8158) Mermaid terminal rendering `[OPEN]`.

## 5. Hot Discussions

### Ideas
- **[#1637](https://github.com/earendil-works/pi/discussions/1637)** Benchmark Pi’s harness vs Codex CLI / Claude Agent SDK (31 👍). Still the highest-signal “prove it” thread.
- **[#9782](https://github.com/earendil-works/pi/discussions/9782)** Richer code-block rendering via extensions or an opt-in standard.
- **[#8729](https://github.com/earendil-works/pi/discussions/8729)** Why agent CLIs standardise on npm / Node version mismatch pain (`nvm`/`fnm`).

### Q&A
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** Which plugins/extensions do you actually use? (17 comments).
- **[#1527](https://github.com/earendil-works/pi/discussions/1527)** Windows paste: ConPTY strips bracketed-paste markers — every newline submits. Still open as a platform constraint.

### Show and tell
- **[#1558](https://github.com/earendil-works/pi/discussions/1558)** CursorAI custom provider package for Pi.
- **[#9775](https://github.com/earendil-works/pi/discussions/9775)** [pi-agent-ide](https://github.com/alexshpunt/pi-agent-ide) — precise edit tooling for coding sessions.
- **[#9747](https://github.com/earendil-works/pi/discussions/9747)** [pi-heed](https://github.com/Nyarlathoteppppp/pi-heed) — runtime constraints that intercept side-effecting tools.
- **[#9446](https://github.com/earendil-works/pi/discussions/9446)** Phosphor — parallel tasks, multiple Claude accounts, one desktop workspace.
- **[#9732](https://github.com/earendil-works/pi/discussions/9732)** `pi-conversation-timer` statusline extension (active-work timer, not wall clock).
- **[#9679](https://github.com/earendil-works/pi/discussions/9679)** `job-agent-skills` — 10 job-search skills + jobs MCP bridge.

## 6. Feature Request Trends

- **Provider surface area**: Meta Muse, regional Kimi OAuth hosts (`auth.kimi.ai` / regional login), Homebrew install in README, extension-visible `auth check`.
- **Cache & cost control**: cache warming, exposing image auto-resize limits, keeping Codex / long-idle caches actually warm.
- **TUI fidelity**: hardware cursor as caret, Kitty/Orca inline images, CJK IME + punctuation-aware autocomplete, Mermaid in-terminal, better code-block chrome.
- **Extension contract**: mid-session system prompt append, bound `ModelRegistry.stream*` methods, npm `exports`/`main` resolution, skills filter semantics (`-` vs `!`).
- **Agent robustness**: per-thinking sampling params, tool cwd as opt-in `customCwd`, find/grep timeouts, bash timeout units/caps.

## 7. Developer Pain Points

- **Windows + terminal stack**: IME, ConPTY paste/autowrap, clipboard OSC 52 gating, fullscreen image rendering, 0.86.0 Windows chunk import paths. #7547 is the umbrella.
- **TUI cost at scale**: full-core streaming (#6665), full re-render lag at 800+ messages (#9807), quadratic tool-arg parse (#9062), session listing that parses whole files (#9820).
- **“OpenAI-compatible” is not compatible**: extra fields/roles/auth (#9508), missing `finish_reason` (#6226), HTTP 200 HTML reported as stream failure (#9790), Z.AI overflow not classified (#9805), Cerebras strict-mode 400s (#9804), Mistral `Retry-After` ignored (#9815).
- **Silent or misleading tool results**: find/grep killed → empty success (#9770); bash timeout seconds-vs-ms and multi-hour ceilings (#9785); large paste collapsed to `[paste #N]` across editor replace (#9809).
- **Extension & settings footguns**: skills `-vue*` is exact-match not glob (#9806/#9808); extensions cannot resolve `package.json` `exports` (#9817); unbound registry methods (#9821); RPC steer correlation broken in 0.86.0 (#9803).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

I'll pull the latest Qwen Code repo activity so the digest is complete and accurate.Fetching the rest of the 0.24.2 changelog so the release summary is complete.# Qwen Code Community Digest — 2026-09-21

Repo: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) · Latest stable: **v0.24.2** (2026-09-20)

## 1. This Week's Highlights

Qwen Code shipped a tight 0.24.x cadence: **v0.24.0** (Sep 16), **v0.24.1** + Desktop/SDK companions (Sep 19), and **v0.24.2** (Sep 20). The theme is Web Shell maturity (Live Voice, remote workspaces, worktree/git UX), Linux `bwrap` sandboxing, cross-session messaging, and token/context accounting — plus one user-facing regression: `/cd` broke after 0.24.0. Autofix and CI bots dominate the PR queue; most human discussion is on context-token cost and CLI command reliability.

## 2. Releases

**[v0.24.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.2)** — 2026-09-20 · no breaking changes  
Shipped on npm as `@qwen-code/qwen-code@0.24.2`. Focus: Web Shell + core cache/session plumbing.

- Remote workspace add flow restored; Live Voice model/voice picker, mic level meter, and AudioWorklet capture.
- Linux `bwrap` sandbox foundation (process launch, supervision, confined workers).
- Concurrent browser-use sessions on one Chrome profile; slash-command exports as artifacts.
- Prompt-cache preserved for deferred tools; background turns can carry messages from other sessions.
- `/context` now attributes files to extensions and partitions categories so they sum to the provider total.
- Nightly note also landed Live Voice mic capture via AudioWorklet ([#12338](https://github.com/QwenLM/qwen-code/pull/12338)).

**[v0.24.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.1)** — 2026-09-19  
**Breaking:** `refactor(goal)!` stops emitting the `active_goal` stream event ([#12181](https://github.com/QwenLM/qwen-code/pull/12181)). Clients that subscribed to that event must switch to the new Goal surface.

Notable features: subagent tool allowlists, per-model OpenAI wire API, configurable Mem0 providers, Playwright Browser SDK, host settings exclusions, oversized-paste attachment cards, workflow name-only locks, ACP capacity release by stopping workspace runtimes. Companion tags: [desktop-v0.24.1](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.1), [sdk-typescript-v0.1.13](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.13) (bundles CLI 0.24.1).

**[v0.24.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.0)** — 2026-09-16  
**Breaking:** bash now expands project-directory variables in command hooks ([#11864](https://github.com/QwenLM/qwen-code/pull/11864)). Hook authors who previously treated `$VAR` as literal should re-test.

Also in 0.24.0: web_search session caps, background-result tracking across daemon/Web Shell, full `/hooks` dialog in OpenTUI, hook progress events, dynamic workflows from extensions, Linux `bwrap` CLI backend.

## 3. Hot Issues

Only **8 issues** updated in the last 24h. Ranked by impact and comment activity:

1. **[#12028](https://github.com/QwenLM/qwen-code/issues/12028) — Non-conversation context token governance** (P2, 10 comments)  
   System prompt, tool schemas, `QWEN.md`, and skill listings are billed on every request and can dwarf the conversation on long-context models. This is the clearest product-cost thread of the week; labels already point at a context-performance roadmap.

2. **[#12224](https://github.com/QwenLM/qwen-code/issues/12224) — `/cd` broken after v0.24.0** (P1, 6 comments)  
   Directory change fails with “response or tool call in progress” even on a quiet session. Highest-severity user regression in the window; related core PRs on quote/backslash command splitting (#12363, #11765) look like the fix path.

3. **[#10603](https://github.com/QwenLM/qwen-code/issues/10603) — ToolSearch triggers full-prompt reprocessing** (P2, 4 comments)  
   llama.cpp users see a full prefill when ToolSearch/`write_file` fires. Directly related to the deferred-tool cache work that landed in 0.24.2 (#10410) and the SDK E2E follow-up (#12365).

4. **[#12332](https://github.com/QwenLM/qwen-code/issues/12332) — Publish verifier rejects wildcard export targets** (P3, 4 comments)  
   `"./*": "./dist/src/*"` is legal npm but fails `verify-publish-artifacts.mjs`. Blocking Web Shell publish; #12364 is the targeted fix.

5. **[#11944](https://github.com/QwenLM/qwen-code/issues/11944) — Four PRs for unattended daemon-turn reliability** (P3, 3 comments)  
   Tracking issue for diagnose-ability, task-local config, machine-readable results, and short observation disconnects. Signals the daemon product line is moving from “works attended” to “works unattended.”

6. **[#12357](https://github.com/QwenLM/qwen-code/issues/12357) — Main CI E2E: SDK MCP add-tool suite** (ready-for-agent, 2 comments)  
   Bot-opened main-branch failure across `sdk-typescript/mcp-server.test.ts` and six more cases. Ties to deferred MCP envelopes after #10410.

7. **[#12366](https://github.com/QwenLM/qwen-code/issues/12366) — Deferred review findings from #12311** (1 comment)  
   Autofix parked out-of-footprint review items from structured shell-result UI. Typical of this repo’s review loop: findings survive the original PR.

8. **[#11954](https://github.com/QwenLM/qwen-code/issues/11954) — Fleet Shepherd Dashboard** (0 comments)  
   Auto-maintained bot-fleet status board. Last tick 2026-09-20T21:48Z with zero dispatches/releases — operational telemetry, not a product discussion.

## 4. Key PR Progress

1. **[#12311](https://github.com/QwenLM/qwen-code/pull/12311) — Structured shell execution results (Web Shell)**  
   Command / Output / Execution panels, elapsed time, 200px scroll regions. Highest-visibility UX PR; leftover findings tracked in #12366.

2. **[#12154](https://github.com/QwenLM/qwen-code/pull/12154) — Manage git worktrees from the Web Shell git dialog**  
   New “Worktrees” tab (slug, lock, missing-dir, branch/HEAD). Completes the worktree story that 0.24.x started in the CLI.

3. **[#12328](https://github.com/QwenLM/qwen-code/pull/12328) — Host settings item allowlists**  
   `settings.includeItems` with `excludeItems` winning on conflict. Companion to 0.24.1’s exclusion work (#11975).

4. **[#12254](https://github.com/QwenLM/qwen-code/pull/12254) — Batched workspace session catalogs (daemon)**  
   One HTTP request for session pages + optional group catalogs across public workspaces. Needed for multi-workspace operators.

5. **[#12258](https://github.com/QwenLM/qwen-code/pull/12258) — Per-server MCP App resource limits**  
   Opt-in 4 MiB / 120s vs default 1 MiB / 10s. Practical for HTML-heavy MCP apps without raising the global ceiling.

6. **[#10410](https://github.com/QwenLM/qwen-code/pull/10410) / [#12365](https://github.com/QwenLM/qwen-code/pull/12365) — Deferred tools keep the prompt cache**  
   Cache-preserving deferred MCP invocations plus SDK E2E assertions for the `tool_call` bridge envelope. Addresses #10603-class prefill waste.

7. **[#12363](https://github.com/QwenLM/qwen-code/pull/12363) + [#11765](https://github.com/QwenLM/qwen-code/pull/11765) — Compound-command quote/backslash splitting**  
   Permission rules now see the same segments bash runs (`'a\'` closes; ANSI-C still escapes). Likely prerequisite to unblocking `/cd` (#12224).

8. **[#12222](https://github.com/QwenLM/qwen-code/pull/12222) — `toolParametersMandatory` for strict OpenAI-compatible servers**  
   Empty-arg tools emit `"parameters": { "type": "object", "properties": {} }` instead of omitting the field. Compatibility flag for picky gateways.

9. **[#12364](https://github.com/QwenLM/qwen-code/pull/12364) + [#12367](https://github.com/QwenLM/qwen-code/pull/12367) — Web Shell publish verifier**  
   Wildcard export targets checked against the packed file list; `npm pack` diagnostics no longer leak into parent tests. Closes #12332.

10. **[#12182](https://github.com/QwenLM/qwen-code/pull/12182) — Reload changed skill content after refresh**  
    Invalidates a skill when the body changes, a scan confirms removal, or it is disabled — without breaking unchanged-content dedup.

Honorable mention (CI hygiene, high volume): retry/transient-failure PRs [#11134](https://github.com/QwenLM/qwen-code/pull/11134), [#11297](https://github.com/QwenLM/qwen-code/pull/11297), [#12016](https://github.com/QwenLM/qwen-code/pull/12016) — the self-hosted runner fleet is still fighting EACCES, checkout, and macOS shard deaths.

## 5. Hot Discussions

Omitted — no GitHub Discussions payload was provided for this window.

## 6. Feature Request Trends

Distilled from issues + in-flight PRs:

- **Token / context governance** — measure and cap non-conversation context (system prompt, schemas, `QWEN.md`, skills) instead of treating it as a fixed tax (#12028, #12318, #12034, #12119).
- **Unattended / multi-session daemon** — batched catalogs, cross-session messages, observation-disconnect survival, machine-readable turn results (#11944, #12254, #12342, #12292).
- **Web Shell as a full workspace IDE** — worktrees, structured shell results, settings allowlists, Live Voice, remote workspace add (#12154, #12311, #12328, #12085).
- **MCP robustness** — per-server resource limits, deferred tool envelopes that keep the KV cache, SDK E2E for the bridge (#12258, #10410, #12365).
- **Strict provider compatibility** — empty tool-parameter objects for OpenAI-compatible servers (#12222).

## 7. Developer Pain Points

- **CLI command parsing after 0.24.0.** `/cd` is dead in interactive sessions; quote/backslash splitting in compound commands is still being corrected. Hook authors also inherited a breaking change: project-dir vars now expand in bash hooks.
- **Invisible token burn.** Fixed context (prompts, tools, skills, `QWEN.md`) is paid on every turn and is hard to see until `/context` was reworked. Long-context models make the percentage look small while the absolute cost is large.
- **Prefill / cache invalidation on tool use.** ToolSearch and deferred MCP calls force full prompt reprocessing on local runtimes (llama.cpp). 0.24.2 started the fix; E2E is still red (#12357).
- **Packaging friction for Web Shell.** Publish verifier treated npm subpath patterns as filesystem paths; pack diagnostics leaked into tests. Release of web-shell artifacts is still a sharp edge.
- **CI and runner hygiene tax.** A large share of “hot” PRs are bot retries for Docker cache, unwritable lock dirs, macOS E2E shard death, and checkout flakes on self-hosted pools. Contributors feel this as slow merge, not as product bugs.
- **Autofix loop leftovers.** Findings that fall outside a PR’s footprint become new tracking issues (#12366), so authors juggle follow-up queues instead of a single review cycle.

---

*Sources: last-24h GitHub issues/PRs/releases supplied for 2026-09-21, plus [CHANGELOG.md](https://github.com/QwenLM/qwen-code/blob/main/CHANGELOG.md) and official release tags for truncated notes.*

</details>