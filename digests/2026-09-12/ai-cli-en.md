# AI CLI Tools Community Digest 2026-09-12

> Generated: 2026-09-12 03:47 UTC | Tools covered: 7

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

I’ll synthesize the provided 2026-09-12 digests into a decision-maker comparison and only fill gaps where counts or release status need a quick check.# AI CLI Tools Cross-Comparison — 2026-09-12

Source window: community digest summaries for Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, and Qwen Code. Counts below are **digest-window highlighted activity**, not full-repo open totals.

## 1. Ecosystem Overview

By mid-September 2026 the AI CLI market is no longer a “which model sits in a TTY” contest. Every serious product is a **harness**: session lifecycle, sandbox, MCP, skills/hooks, remote control, and multi-surface identity (CLI + Desktop + IDE + phone). First-party labs (Anthropic, OpenAI, Google, GitHub/Microsoft, Alibaba/Qwen) ship daily or near-daily patches; independent harnesses (OpenCode, Pi) compete on provider-agnostic APIs and plugin surfaces. The shared bottleneck is not “can the model edit code?” — it is **Windows/WSL reliability, process hygiene, quota honesty, remote/session survival, and an extension model that does not silently break skills or MCP**. New frontier models (GPT-6 Astra and siblings) are already exposing compaction, `invalid_prompt`, and protocol-adjacency bugs across several CLIs at once.

## 2. Activity Comparison

| Tool | Issues (digest window) | PRs (digest window) | Discussions | Release status (this cut) |
|---|---|---|---|---|
| **Claude Code** | High-signal cluster; top thread #91870 Function Hooks (161 comments). ~10 named hot issues + honorable mentions | ~10 named product PRs (hooks/mods, installer, security-guidance) | Omitted in source dump | **Very hot:** 6 tags in 24h (`v2.1.263`–`v2.1.269`) |
| **OpenAI Codex** | Dense Windows/auth/model cluster; #42215 leads (31 comments). ~10+ watched | Heavy merge traffic (voice, sandbox via app server, personality retirement, command center) | **Active:** Ideas + Q&A + Show-and-tell (remote control #9200: 190 👍) | **Hot alpha:** Rust `0.155.0-alpha.3.x` burst + Python SDK `0.154.0` |
| **Gemini CLI** | Reliability/security mix; MAX_TURNS false success, auth loop, hangs | Security/sandbox/policy PRs shipping into nightly | **Active:** roadmap, abuse/traffic (~930+), Antigravity transition | Nightly `v0.61.0-nightly.20260912`; preview `0.60.0`; stable `v0.59.0` |
| **GitHub Copilot CLI** | Windows/WSL/MCP/skills; Vim request closed after ship | Thin last-24h set (~9 PRs; mostly docs/security/examples) | Omitted / not provided | Patch train **`v1.0.84-2`–`1.0.84-5`** (Vim GA, JSONL import) |
| **OpenCode** | Mix of closed feature wins (`/loop`) and open Desktop/serve leaks | Active 2.0 line: cgroup isolation, `/visualize`, RTL TUI, plugin API | Not separately tabulated in dump | **`v1.18.30`** (Astra system prompt + provider compat) |
| **Pi** | Windows meta-thread #7547 (62 comments) dominates | Shell discovery, mid-session system deltas, Bedrock/Codex attribution | **Active Ideas + Show-and-tell** (Phosphor, Pi Manager, Eco Coding) | **`v0.85.1`** (2026-09-05); Astra in, follow-up crash reports already open |
| **Qwen Code** | Sparse last-24h issue updates (6), but P1 TUI death on multi-agent complete | Large feature/fix queue (Responses adjacency, memory recall, Web Shell) | Omitted in source dump | Stable **`v0.23.3`** (10 Sep) + Desktop `0.3.0` + TS SDK `0.1.12` + nightly |

Notes: treat “Omitted” as **data not in the digest**, not “inactive.” Gemini and Codex are the only ones with clearly documented high-volume Discussions this window. Copilot CLI’s issue #13 (Vim) is the rare case of a long-running request actually closing because it shipped.

## 3. Shared Feature Directions

**Hooks / plugins as a real extension model**  
Claude Code (function hooks + first-party `diff`/`telemetry`/`sec-default` mods, `claude plugin eval`), Copilot (`plugin enable/disable`, JSONL session import), OpenCode (plugin session forms / global event stream), Pi (mid-conversation system-message deltas, deferred `/reload`). Demand is the same: load a folder of plugins, evaluate them, and do not hide a skill just because auto-invoke is off (Claude #78523, Copilot #4438).

**Multi-session / multi-agent orchestration**  
Claude inter-session comms (#24798, still cited after close), Codex planner/worker + CoCo/agent-watch community tools, Gemini honest subagent termination + `/chat share`, Qwen ACP hand-off of a turn to Claude Code, OpenCode `/loop` + visualize. Users want iteration as a primitive, not a paragraph of “try again.”

**Remote control that survives death**  
Claude Remote Control drops after Desktop auto-update; Codex Ideas #9200 (headless from ChatGPT app, 190 👍) and thread sync #14067; Gemini individual-tier move to Antigravity while Enterprise stays on Gemini CLI. Headless + phone + restore-after-update is now table stakes.

**Quota, cost, and model routing transparency**  
Claude gateway `pricing:` parity with `/cost`, `maxEffortLevel`; Codex local limit dashboards (Codex Limits, CodexFuse); Qwen reasoning presets + `/model --compaction` + Web Shell role pickers; Gemini pin-Flash-version fights (`gemini-2.5-flash` rewritten to 3.5). Operators want *which model does which job* and *what this turn actually cost*.

**Windows as a first-class runtime (still unmet)**  
Every digest except Gemini’s security-heavy cut is loud on Windows: Claude always-on-top + Plan9/KB5124008 + MSIX; Codex project-context sync, `git ls-files` pool growth, API-key vs ChatGPT auth for browser control; Copilot WSL clipboard/tmux/CPU spin; Pi “how do you even run this on Windows?” (#7547); Qwen ConPTY / PTY worker leaks. This is the industry’s shared tax.

**MCP + OAuth correctness**  
Gemini RFC 9207 issuer + SSRF fixes; Copilot resume killing stdio MCP and pre-`initialize` `server/discover`; OpenCode OAuth refresh missing `resource`; Pi/Qwen provider-adapter stretch. Spec compliance is now a product feature.

**Compaction / memory that cannot fail closed**  
Claude `/compact` hangs; Pi Astra max-reasoning compaction cap; Qwen structured on-demand recall vs dump; Codex experimental context-management billing questions. Long sessions are the unit of work; summarization bugs are session-killers.

## 4. Differentiation Analysis

| | Feature focus | Target users | Technical approach |
|---|---|---|---|
| **Claude Code** | Plugin-power story of the month (hooks, eval harness, output styles, effort caps) | Power users and plugin authors on Anthropic models; Desktop/Cowork | Fast patch cadence; first-party hook modules gated on the upcoming function-hooks API; gateway as enterprise control plane |
| **Codex** | Voice packaging, Computer Use, agent command center, app-server sandbox on Windows | ChatGPT-plan developers; multi-device (app, CLI, iOS, Android Remote) | Rust CLI + Python SDK dual track; personality UX retired in favor of baked-in instructions; community filling observability gaps |
| **Gemini CLI** | Security hardening (injection via build files, sandbox FS isolation, MCP OAuth) | Google-ecosystem + free/Pro individuals; Enterprise/API users anxious about Antigravity split | Nightly security train; fail-closed trust; policy-as-data (`--yolo` → `allowedTools: ["*"]`); AST-aware nav still an epic |
| **Copilot CLI** | Editor-adjacent CLI: Vim GA, grammar completions, instruction/LSP list, enterprise org agents | GitHub-org developers who already live in VS Code + Copilot | Incremental 1.0.84.x polish; session interchange (semantic JSONL); enterprise discovery still broken (`{org}/.github-private`) |
| **OpenCode** | Provider-agnostic 2.0: serve isolation, visualize, RTL TUI, plugin API | BYOK / multi-provider / i18n / self-hosted | Client/server `serve`; Desktop SQLite migrations are the maturity tax; community-driven `/loop` already closed as shipped intent |
| **Pi** | Thin CLI + extension ecosystem; third-party GUIs filling the official desktop hole | Tinkerers, multi-provider, RPC-desktop authors | Mid-session system deltas as extension architecture; Windows still “bring your own working combo”; auto-close policy burying crash reports |
| **Qwen Code** | Multi-surface session bus (CLI, Web Shell, VS Code, Desktop, ACP, channels) | CN cloud (DashScope/ModelStudio) + cross-agent operators | Responses-API fidelity, ACP delegation to Claude Code, 256 workspaces, Desktop + CUA driver packaging |

Claude and Codex remain the **closed-model heavyweights**. Gemini is the **security + free-tier harness**. Copilot is the **GitHub-admin / IDE-native CLI**. OpenCode and Pi are the **ownership / BYOK / plugin** camp. Qwen is the **multi-surface + ACP interoperability** play, not only a Qwen-model wrapper.

## 5. Community Momentum & Maturity

**Highest iteration velocity:** Claude Code (six tags in a day) and Codex (stacked Rust alphas + SDK). That speed also produces the noisiest regressions (gateway sign-in force, Remote Control after idle update, Astra `invalid_prompt`).

**Highest discussion/ecosystem energy:** Codex (remote-control and rewind threads with triple-digit 👍; Awesome Codex CLI, CoCo, isitdone hooks) and Pi (four independent desktop surfaces in one week: Phosphor, Pi Manager, Eco Coding, pi-agent-views). When official Desktop lags, the community ships one.

**Most security-mature cut this week:** Gemini CLI. The nightly is almost entirely injection, sandbox isolation, OAuth issuer, NTFS 8.3, and fail-closed MCP allowlists. Reliability (hangs, false GOAL) still lags the security story.

**Most “product surface expanding faster than TUI robustness”:** Qwen Code. v0.23.3 is a real feature release (Responses generator, ACP delegation, Web Shell), immediately shadowed by a P1 silent TUI death when multiple background agents finish.

**Most “shipped the thing people asked for”:** Copilot CLI Vim mode. Lowest last-24h PR volume among the set; momentum is polish and enterprise gaps, not a new architecture.

**Maturity warning lights:** Windows second-class status across the board; Desktop/SQLite schema drift (OpenCode); process leaks (stdio MCP orphans, Computer Use zombies, `serve` instances never disposed); quota UX that communities rebuild themselves.

## 6. Trend Signals

1. **The unit of competition is the harness, not the model.** Astra landed in Codex, OpenCode, and Pi in the same week and immediately produced prompt-invalid, compaction-cap, and adapter bugs. Model drops are now load tests for protocol code.

2. **Extension APIs are consolidating on hooks + eval + folder-of-plugins.** Teams choosing a CLI in Q4 2026 should ask: can we version, test, and disable auto-invoke without hiding the skill?

3. **Observability is being crowdsourced.** Limit dashboards, stop-hooks, agent-watch, coordinators exist because first-party quota and multi-agent status are still incomplete. That is a buying criterion, not a nice-to-have.

4. **Windows is the enterprise gate.** Plan9/KB breakage, MSIX, WSL clipboard, NTFS short names, and sandbox ACLs will decide whether these tools leave enthusiast machines.

5. **Session identity is going multi-surface.** Qwen’s unified session registry, Codex thread sync requests, Claude Remote Control restore, Copilot JSONL import — expect “one session object, many clients” to be the 2026 H2 default architecture.

6. **Honest agent lifecycle beats more tools.** False `GOAL` at `MAX_TURNS`, skills unused unless prompted, tool-count HTTP 400, scheduled prompts re-entering context as user text — developers are disabling sub-agents to stay productive. Visibility and termination reasons matter more than another MCP server.

7. **Lineage risk for Google-stack individuals.** The Antigravity transition plus delayed model IDs is already a trust issue for people who were told Gemini CLI remains supported. Pin versions; do not assume nightly security fixes imply product-line stability.

**Practical takeaway for decision-makers:** pick Claude Code or Codex if you want the strongest daily-driven agent and can absorb patch-train regressions; Gemini CLI if security policy and Google auth matter more than hang-free multi-agent; Copilot CLI if the org already standardizes on GitHub agents; OpenCode/Pi if provider lock-in is unacceptable and you will run community GUIs; Qwen Code if you need ACP/Web Shell as a bus across agents and Chinese cloud providers. In all cases, budget engineering time for Windows, MCP OAuth, and session restore — those are the issues that actually stop work this week.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

I'll pull the official Skills repo and a few high-traffic PRs/issues so the ranking and status reflect current GitHub data.# Claude Code Skills Community Highlights  
**Source:** [anthropics/skills](https://github.com/anthropics/skills) · snapshot **2026-09-12**  
**Note:** Many open PRs in this dump have no comment count (`undefined`). Ranking below combines **issue discussion volume**, **recency / last-updated activity**, and **how often a skill appears across PRs**.

---

## 1. Top Skills Ranking

**1. skill-creator (eval / Windows / description loop)** — still the hottest official skill  
Related: [PR #1298](https://github.com/anthropics/skills/pull/1298) · [PR #1099](https://github.com/anthropics/skills/pull/1099) · [PR #1050](https://github.com/anthropics/skills/pull/1050) · [PR #539](https://github.com/anthropics/skills/pull/539) · [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments) · [Issue #202](https://github.com/anthropics/skills/issues/202) (closed, 8 comments)

- **What it does:** Meta-skill for authoring and iterating Skills (`run_eval.py`, `run_loop.py`, description optimization).
- **Discussion:** `run_eval.py` reports **0% recall** on every description; `claude -p` never triggers the skill under test. Windows pipe / `claude.cmd` / encoding bugs make the loop unusable. Contributors also want YAML validation (unquoted `description` with `:`).
- **Status:** Multiple **OPEN** PRs through **2026-09-11**. This is the longest-running reliability thread in the repo.

**2. mcp-builder** — MCP generation + evaluation harness  
Related: [PR #1742](https://github.com/anthropics/skills/pull/1742) · [PR #1724](https://github.com/anthropics/skills/pull/1724) · [PR #1602](https://github.com/anthropics/skills/pull/1602) · [Issue #1390](https://github.com/anthropics/skills/issues/1390) (4 comments)

- **What it does:** Build and evaluate MCP servers from a Skill workflow.
- **Discussion:** MCP SDK ≥2 rename (`streamable_http_client`), custom headers, evaluation default model still pinned to an old Sonnet snapshot, `TextContent` not JSON-serializable so eval scores **0/N** against real servers.
- **Status:** **OPEN**, last updated **2026-09-11**. High merge likelihood if the import + serialization patches land together.

**3. pdf / docx (document-skills reliability)**  
Related: [PR #538](https://github.com/anthropics/skills/pull/538) · [PR #541](https://github.com/anthropics/skills/pull/541) · [PR #1734](https://github.com/anthropics/skills/pull/1734) · [PR #514](https://github.com/anthropics/skills/pull/514) · [PR #486](https://github.com/anthropics/skills/pull/486)

- **What they do:** Official document pipeline (PDF, DOCX; proposed ODT and typography QC).
- **Discussion:** Case-sensitive `REFERENCE.md` / `FORMS.md` breaks Linux; `w:id` collisions corrupt tracked-change DOCX; orphaned comments; typography (widows/orphans, numbering).
- **Status:** All listed PRs **OPEN**. Document skills remain the most “production used, still leaking edge cases” cluster.

**4. claude-api** — official API reference skill  
Related: [PR #1607](https://github.com/anthropics/skills/pull/1607) · [Issue #1487](https://github.com/anthropics/skills/issues/1487) (4 comments)

- **What it does:** Model catalog and API guidance bundled with Claude Code.
- **Discussion:** Retired model IDs still listed as active/legacy; skill **eager-loads ~156k tokens** and can exhaust the context window in one tool call.
- **Status:** Model-ID PR **OPEN** (updated 2026-09-01). Context-bloat issue still **OPEN**.

**5. self-audit / reasoning quality gate**  
Related: [PR #1367](https://github.com/anthropics/skills/pull/1367) · [Issue #1385](https://github.com/anthropics/skills/issues/1385)

- **What it does:** Pre-delivery audit: mechanical file existence check, then four-dimension reasoning review by damage severity.
- **Discussion:** Community wants a reusable quality gate (calibrate → adversarial review → verify), not just more domain skills.
- **Status:** **OPEN** (last PR activity mid-2026). Conceptual sibling of agent-governance.

**6. Hivemind (zero-cost multi-agent orchestration)**  
[PR #1628](https://github.com/anthropics/skills/pull/1628)

- **What it does:** Claude Code plans/reviews/merges; cheap headless [opencode](https://opencode.ai) workers do mechanical work.
- **Discussion:** Frames expensive-model **context**, not intelligence, as the scarce resource.
- **Status:** **OPEN** (created 2026-08-21).

**7. Buffer API agent skill**  
[PR #1627](https://github.com/anthropics/skills/pull/1627)

- **What it does:** Portable GraphQL skill for Buffer: accounts, channels, `addToQueue` / custom schedule; intended for Claude, Cursor, Codex, OpenClaw, n8n.
- **Status:** **OPEN**, updated **2026-09-05**.

**8. Meta / marketplace skills (quality-analyzer, security-analyzer, UIZZE, frontend-design)**  
[PR #83](https://github.com/anthropics/skills/pull/83) · [PR #1595](https://github.com/anthropics/skills/pull/1595) · [PR #210](https://github.com/anthropics/skills/pull/210)

- **What they do:** Analyze other skills (structure, security), partner UI direction (UIZZE), tighter frontend-design instructions.
- **Status:** **OPEN**. Signals demand for **skill-about-skills** and design-system partners.

---

## 2. Community Demand Trends (from Issues)

| Demand | Evidence | Signal |
|---|---|---|
| **Trust & namespace hygiene** | [#492](https://github.com/anthropics/skills/issues/492) — **43 comments**, 👍2 | Highest-comment issue. Community skills installed under `anthropic/` impersonate official skills; some request Bash + hooks. |
| **Org-wide / team sharing** | [#228](https://github.com/anthropics/skills/issues/228) — 16 comments, 👍8 | Highest 👍. Users reject “download `.skill` → Slack → Settings upload.” |
| **Skill-creator that actually evaluates** | [#556](https://github.com/anthropics/skills/issues/556) — 12 comments, 👍7 | Eval harness is noise; description optimization cannot work. |
| **Install / plugin hygiene** | [#189](https://github.com/anthropics/skills/issues/189) — 6 comments, 👍9; [#62](https://github.com/anthropics/skills/issues/62) | Duplicate skills from `document-skills` + `example-skills`; skills vanish after local rename. |
| **Context discipline** | [#1487](https://github.com/anthropics/skills/issues/1487); compact-memory [#1329](https://github.com/anthropics/skills/issues/1329) | Skills that dump 100k+ tokens, or prose memory, are seen as hostile. |
| **Governance / safety patterns** | [#412](https://github.com/anthropics/skills/issues/412) (closed); [#1175](https://github.com/anthropics/skills/issues/1175) | Agent policy, audit trails, SharePoint ACL-in-SKILL.md concerns. |
| **Platform interop** | [#29](https://github.com/anthropics/skills/issues/29) Bedrock; [#16](https://github.com/anthropics/skills/issues/16) “expose Skills as MCPs” | Skills should be portable APIs, not Claude-only folders. |
| **HPC / social / workflow verticals** | PRs: [scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615), Buffer #1627, Hivemind #1628 | New skills are shifting from docs to **ops + orchestration**. |

Anticipated *new* skill directions (not just bugfixes): **org skill libraries**, **namespace/security scanners**, **compact memory**, **agent governance**, **MCP eval that works**, **quality gates**, **social/scheduling APIs**, **HPC/Slurm**.

---

## 3. High-Potential Pending Skills

Likely to land or stay in active review (open + recently updated):

| PR | Why it may land soon |
|---|---|
| [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder MCP≥2 + headers | Fixes a hard break against current SDK; updated 2026-09-11. |
| [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator eval recall | Addresses #556 reproductions; updated 2026-09-11. |
| [#1734](https://github.com/anthropics/skills/pull/1734) orphaned DOCX comments | Narrow, concrete docx fix; updated 2026-09-11. |
| [#1724](https://github.com/anthropics/skills/pull/1724) mcp-builder default model | One-file model ID bump to `claude-sonnet-5`. |
| [#1607](https://github.com/anthropics/skills/pull/1607) claude-api retired IDs | Docs correctness vs. live API. |
| [#1627](https://github.com/anthropics/skills/pull/1627) Buffer API | Complete portable vertical skill; still receiving updates into September. |
| [#1628](https://github.com/anthropics/skills/pull/1628) Hivemind | Clear product thesis; depends on maintainer appetite for multi-runtime skills. |
| [#514](https://github.com/anthropics/skills/pull/514) document-typography | Broad user-visible quality for every generated doc. |

Lower urgency but still open: [ODT #486](https://github.com/anthropics/skills/pull/486), [scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615), [self-audit #1367](https://github.com/anthropics/skills/pull/1367).

---

## 4. Skills Ecosystem Insight

**The community’s concentrated demand is not “more Skills,” but trustworthy, cheap-to-load Skills: correct official provenance, working eval/MCP harnesses, and org-shareable libraries that do not blow the context window.**

---

# Claude Code Community Digest — 2026-09-12

Source: [anthropics/claude-code](https://github.com/anthropics/claude-code)

## 1. This Week's Highlights

Function hooks are the community’s center of gravity: Anthropic committed to shipping them “in weeks, not days,” and #91870 is the most-commented open thread. Product surface area expanded quickly in patch releases (plugin eval, output styles, gateway pricing parity, `maxEffortLevel`). Windows remains the noisiest platform cluster—Desktop always-on-top, Cowork Plan9 mounts after KB5124008, installer package state, and Remote Control dying after auto-update.

## 2. Releases

Six tags landed in the last 24 hours (2.1.263–2.1.269):

- **[v2.1.269](https://github.com/anthropics/claude-code/releases/tag/v2.1.269)** — `claude plugin eval` (JSON + HTML scored reports); `/output-style [name]` including Remote Control / cloud.
- **[v2.1.268](https://github.com/anthropics/claude-code/releases/tag/v2.1.268)** — Gateway `pricing:` in `gateway.yaml` so signed-in clients share rates with `/cost` and telemetry; warning when `access_control.allow_cidrs` is empty.
- **[v2.1.267](https://github.com/anthropics/claude-code/releases/tag/v2.1.267)** — `maxEffortLevel` (global or per-model, including Bedrock/Vertex/Foundry); `--system-prompt-snapshot off`.
- **[v2.1.266](https://github.com/anthropics/claude-code/releases/tag/v2.1.266)** — Regression fix: `CLAUDE_CODE_USE_GATEWAY` no longer forces Cloud sign-in by itself.
- **[v2.1.265](https://github.com/anthropics/claude-code/releases/tag/v2.1.265)** — `user.email` / `user.groups` on Desktop/Cowork telemetry; `--plugin-dir` can point at a folder of plugins.
- **[v2.1.263](https://github.com/anthropics/claude-code/releases/tag/v2.1.263)** — Bug fixes and reliability.

## 3. Hot Issues

1. **[#91870 Function Hooks](https://github.com/anthropics/claude-code/issues/91870)** — 161 comments, 95 👍. Official “shipping in N weeks” update; high-signal design feedback is shaping the API. This is the plugin-power story of the month.
2. **[#85891 Desktop always-on-top (Win11)](https://github.com/anthropics/claude-code/issues/85891)** — 99 comments, 236 👍. Window stays topmost with no toggle; Windows counterpart of macOS #66516. Highest reaction count in the set.
3. **[#92984 Cowork Plan9 mount fails after KB5124008](https://github.com/anthropics/claude-code/issues/92984)** — 99 comments. All Plan9 shares fail (`invalid argument`); uninstalling the KB is the only workaround. Blocks Windows Cowork after a routine Windows update.
4. **[#24798 Inter-session communication](https://github.com/anthropics/claude-code/issues/24798)** — Closed enhancement, 84 comments. Multi-Claude orchestration across siloed sessions; still cited as the missing primitive for large-project workflows.
5. **[#49917 Windows installer HRESULT 0x80073CF6](https://github.com/anthropics/claude-code/issues/49917)** — 42 comments. Second install after a “successful” first install leaves MSIX in a bad state.
6. **[#93525 Cowork egress allowlist collapse](https://github.com/anthropics/claude-code/issues/93525)** — Closed as duplicate. Sandbox allowlist shrinks to ~5 hosts despite “All domains.” Regression + networking + Cowork.
7. **[#79773 Max 20x not reflected in weekly limits](https://github.com/anthropics/claude-code/issues/79773)** — Billing/quota mismatch since a July upgrade; still open and draining at 5x (or worse).
8. **[#58996 `/compact` stuck at 95%](https://github.com/anthropics/claude-code/issues/58996)** — Closed. Long-running compaction hang on macOS; classic “session becomes unusable” report.
9. **[#87959 Worktree Bash guard rejects compound commands](https://github.com/anthropics/claude-code/issues/87959)** — Isolation checker refuses `&&`, `;`, heredocs even when nothing touches git.
10. **[#78523 `disable-model-invocation` hides `/skill-name`](https://github.com/anthropics/claude-code/issues/78523)** — Skills opted out of auto-invoke also vanish from explicit slash invocation.

Honorable mentions: orphaned stdio MCP servers ([#93087](https://github.com/anthropics/claude-code/issues/93087)), Design window OOM on Apple Silicon ([#93679](https://github.com/anthropics/claude-code/issues/93679)), Remote Control lost after idle auto-update ([#91915](https://github.com/anthropics/claude-code/issues/91915), [#80969](https://github.com/anthropics/claude-code/issues/80969), [#93288](https://github.com/anthropics/claude-code/issues/93288)), and skill docs that live-execute `` !`cmd` `` ([#93748](https://github.com/anthropics/claude-code/issues/93748)).

## 4. Key PR Progress

1. **[#93215 mods: sec-default, diff, telemetry](https://github.com/anthropics/claude-code/pull/93215)** (closed) — First-party hook modules published as source; gated on function hooks.
2. **[#93452 mods/diff match built-in /diff](https://github.com/anthropics/claude-code/pull/93452)** (open) — Visual/UX parity with the native diff panel.
3. **[#93244 mods API renames + diff backend seam](https://github.com/anthropics/claude-code/pull/93244)** (closed) — Plugin API naming, telemetry hygiene, git as default VCS backend.
4. **[#89404 validate-agent.sh don’t abort on first warning](https://github.com/anthropics/claude-code/pull/89404)** (open) — Fixes `set -e` + arithmetic increment killing plugin-dev’s own agents ([#83803](https://github.com/anthropics/claude-code/issues/83803)).
5. **[#42205 hookify matcher trim/normalize](https://github.com/anthropics/claude-code/pull/42205)** (closed) — `"Edit or Write"` style matchers no longer fail on spaces.
6. **[#87079 `**` globs match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)** (open) — Security-guidance patterns were silently skipping top-level files.
7. **[#68689 block symlink escape in security-guidance](https://github.com/anthropics/claude-code/pull/68689)** (closed) — Stops `.claude/claude-security-guidance.md` as a symlink to `~/.ssh/id_rsa`.
8. **[#68786 / #68785 plugin-dev hook script hardening](https://github.com/anthropics/claude-code/pull/68786)** (closed) — stdin redirection instead of shell interpolation; hook JSON to stdout; CI/JSON injection fixes in examples.
9. **[#26175 replace broken native installer bootstrap](https://github.com/anthropics/claude-code/pull/26175)** (closed) — `install.sh` no longer deletes a working npm install after failing to write `~/.local/bin/claude`.
10. **[#63686 stale/autoclose 14 → 90 days](https://github.com/anthropics/claude-code/pull/63686)** (closed) — Issue bot less aggressive on long-running design threads.

Also notable: Windows path/CRLF/python-stub fixes across hookify and security-guidance ([#68699](https://github.com/anthropics/claude-code/pull/68699), [#68694](https://github.com/anthropics/claude-code/pull/68694), [#68701](https://github.com/anthropics/claude-code/pull/68701)); `/bug` reporter plugin ([#68707](https://github.com/anthropics/claude-code/pull/68707)).

## 5. Hot Discussions

Omitted — no Discussions payload was provided.

## 6. Feature Request Trends

- **Function / plugin hooks as a real extension model** — eval harness, first-party mods (`diff`, `telemetry`, `sec-default`), folder-of-plugins loading.
- **Multi-session / multi-agent orchestration** — inter-session messaging, ScheduleWakeup loops that actually fire, provenance for self-authored wake prompts.
- **Remote Control that survives process death** — reconnect after Desktop update, idle relaunch, restored sessions, mobile revive, capacity-full “new session” behavior.
- **Output and cost control** — output styles, effort caps per provider, gateway pricing parity with `/cost`.
- **Desktop/IDE polish** — always-on-top toggle, mic shortcut, copy-to-clipboard on VS Code responses, path-vs-slash-command parsing.

## 7. Developer Pain Points

- **Windows as a second-class runtime**: always-on-top Desktop, Plan9/Cowork broken by a cumulative KB, MSIX leftover state, non-ASCII project slug collisions, browser-pane permission prompts that never persist off localhost.
- **Remote Control is brittle on headless / long-lived machines**: auto-update and restore paths drop the bridge and never re-arm (`isFirstTurn` gating).
- **Lifecycle leaks**: stdio MCP servers orphaned at session end; Design renderer unbounded memory; `/compact` hangs.
- **Quota and auth surprises**: Max 20x not applied to weekly caps; gateway env-var regression forcing Cloud sign-in.
- **Skill/hook footguns**: `disable-model-invocation` also kills explicit `/skill`; documentation examples with `` !`cmd` `` execute on load; worktree Bash guard treats any compound command as out-of-tree.
- **Agent authority confusion**: scheduled-prompt / compaction text re-entering context as if the user said it; no provenance across ScheduleWakeup hops.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

**OpenAI Codex Community Digest — 2026-09-12**  
Source: [github.com/openai/codex](https://github.com/openai/codex)

### 1. This Week's Highlights
Codex shipped a burst of **0.155.0-alpha.3.x Rust** tags plus **Python SDK 0.154.0**, while desktop/Windows reliability stayed the loudest community theme: project context sync, sandbox/exec helpers, Computer Use, and API-key browser control. Product direction on the merge side is equally busy—voice packaging, Windows sandbox routed through the app server, personality retirement, and agent-command-center grouping. GPT-6 Astra “invalid prompt” / fallback reports and usage-limit confusion continue to sit next to long-running requests for remote control, rewind, and cross-device thread sync.

### 2. Releases
- **Rust alphas:** `0.155.0-alpha.3` through `0.155.0-alpha.3.10`, plus `0.155.0-alpha.2` / `.2.3` and `0.154.0-alpha.6.2`. Rapid iteration; notes in-repo are mostly tag-only.
- **Python SDK 0.154.0:** `pip install --upgrade openai-codex==0.154.0` (Python 3.10+), paired with `openai-codex-cli-bin==0.154.0`.
- **Notable product notes in the release set:**
  - `max` and `ultra` reasoning-effort values ([#39662](https://github.com/openai/codex/pull/39662))
  - `ExternalMessage` added to the synchronous path
- **Voice / Windows packaging:** Cygwin build inputs (`voice-cygwin-…`) for native Windows voice CI; not part of user packages. Related PRs bundle native voice runtimes and clarify the VC++ runtime notice.

### 3. Hot Issues
1. **[#42215](https://github.com/openai/codex/issues/42215)** — Windows ChatGPT Work: local chat fails at filesystem project-context sync (23-file project). Highest comment volume (31). Blocks “Work inside an existing Project.”
2. **[#43410](https://github.com/openai/codex/issues/43410)** — Windows browser control dies on API-key auth (`unsupported Codex auth method: apikey`). 24 comments, 13 👍. Hits Edge plugin + native host after a successful connect.
3. **[#25744](https://github.com/openai/codex/issues/25744)** — macOS Computer Use / MCP helpers leak and leave zombies; HID lag and WindowServer/TCC stalls. Long-lived (opened June), still updating.
4. **[#16786](https://github.com/openai/codex/issues/16786)** — Windows app repeatedly runs `git ls-files --others --exclude-standard -z`; `ntfs.sys` nonpaged pool grows. Classic resource-leak report still open since April.
5. **[#40596](https://github.com/openai/codex/issues/40596)** — Windows unified exec: `helper_unknown_error: setup refresh had errors`. Same family as other sandbox-setup failures.
6. **[#37856](https://github.com/openai/codex/issues/37856)** — VS Code: stale thread owner after Web renderer reload → “open in another application.” 8 👍; multi-client ownership bug.
7. **[#42214](https://github.com/openai/codex/issues/42214)** — Windows Computer Use cannot drive native apps (`cua.getApp is not a function`).
8. **[#43237](https://github.com/openai/codex/issues/43237)** + **[#44649](https://github.com/openai/codex/issues/44649)** + **[#44700](https://github.com/openai/codex/issues/44700)** — GPT-6 Astra rejects trivial prompts (`hi` / `你好`) with `invalid_prompt` and falls back to GPT-5.6 Sol. Reproduced across CLI and app.
9. **[#28340](https://github.com/openai/codex/issues/28340)** — iOS intermittently cannot open running task conversations (13 👍).
10. **[#44963](https://github.com/openai/codex/issues/44963)** / **[#43632](https://github.com/openai/codex/issues/43632)** — Windows scheduled tasks wake, ACK, then stop; heartbeats answer *older* turns in long threads. Fresh same-day reports.

Also watched: sandbox lock / `SetNamedSecurityInfoW` ([#36475](https://github.com/openai/codex/issues/36475)), workspace-write rename denied on macOS ([#40565](https://github.com/openai/codex/issues/40565)), Android Remote omitting agent-created threads ([#43017](https://github.com/openai/codex/issues/43017)), queue SQLite corruption on macOS ([#44955](https://github.com/openai/codex/issues/44955)).

### 4. Key PR Progress
Most of the day’s merged traffic is **copyberry[bot]** plus one older lifecycle PR. Ten that define the current product surface:

1. **[#44957](https://github.com/openai/codex/pull/44957)** — Agent command center: group tasks by project / status / **model** (`Ctrl+S`).
2. **[#44952](https://github.com/openai/codex/pull/44952)** / **[#44928](https://github.com/openai/codex/pull/44928)** / **[#44925](https://github.com/openai/codex/pull/44925)** / **[#44924](https://github.com/openai/codex/pull/44924)** — Voice captions stay visible across speaker updates; meters keep history through quiet samples; audio accepted before captions; speaker format refreshed after Bluetooth mic changes.
3. **[#44922](https://github.com/openai/codex/pull/44922)** / **[#44942](https://github.com/openai/codex/pull/44942)** — Bundle native Windows voice runtimes; clarify `vcruntime140.dll` redistributable notice.
4. **[#44945](https://github.com/openai/codex/pull/44945)** / **[#44939](https://github.com/openai/codex/pull/44939)** — Windows TUI sandbox setup goes through the app server (`windowsSandbox/setupStart`); respect execution hosts (no remote-executor sandbox from local TUI).
5. **[#44946](https://github.com/openai/codex/pull/44946)** / **[#44935](https://github.com/openai/codex/pull/44935)** / **[#44930](https://github.com/openai/codex/pull/44930)** — Retire Friendly/Pragmatic personality UX; embed fixed friendly instructions in GPT-5.4/5.5; drop `/personality` from TUI.
6. **[#44944](https://github.com/openai/codex/pull/44944)** — Re-check managed provider requirements on *existing* app-server threads.
7. **[#44948](https://github.com/openai/codex/pull/44948)** / **[#44932](https://github.com/openai/codex/pull/44932)** / **[#44934](https://github.com/openai/codex/pull/44934)** — Context snapshots for async user questions, plugin refresh, remote compaction, and Code Mode tools; unify snapshot windows.
8. **[#44938](https://github.com/openai/codex/pull/44938)** — Detect connector auth failure even without an install URL.
9. **[#44933](https://github.com/openai/codex/pull/44933)** — Remove Windows world-writable scans/warnings from TUI startup.
10. **[#25383](https://github.com/openai/codex/pull/25383)** — App-server account session lifecycle for Desktop multi-account profile switch (`accountSession/login|add|list|switch|logout`).

### 5. Hot Discussions

**Ideas**
- **[#9200](https://github.com/openai/codex/discussions/9200)** (46 comments, 190 👍) — Remote-control a headless Codex from the ChatGPT app (people already hack this with Tailscale + SSH).
- **[#9618](https://github.com/openai/codex/discussions/9618)** (23 / 132) — `/rewind` or `/revert`; OpenCode and Claude Code are the comparison points.
- **[#14067](https://github.com/openai/codex/discussions/14067)** (10 / 62) — Sync threads and session context across machines.
- **[#12567](https://github.com/openai/codex/discussions/12567)** — Official “Memories in Codex” design thread (citation vs. silent use).
- **[#41716](https://github.com/openai/codex/discussions/41716)** — ChatGPT as planner, Codex as worker orchestration.
- **[#7366](https://github.com/openai/codex/discussions/7366)** — `@`-reference gitignored files.

**Q&A**
- **[#40385](https://github.com/openai/codex/discussions/40385)** — Windows “control other devices” / Remote Connections missing from UI.
- **[#42503](https://github.com/openai/codex/discussions/42503)** — When does Astra land in Codex?
- **[#43257](https://github.com/openai/codex/discussions/43257)** — Does experimental context management bill history lookups?
- **[#40707](https://github.com/openai/codex/discussions/40707)** / **[#42983](https://github.com/openai/codex/discussions/42983)** — 5-hour cap is back; Luna-low vs Astra-high burn rate feels inconsistent.

**Show and tell**
- **[#16329](https://github.com/openai/codex/discussions/16329)** — Awesome Codex CLI (150+ ecosystem tools).
- **[#44641](https://github.com/openai/codex/discussions/44641)** — Codex Limits CLI/TUI for usage/reset/credits.
- **[#41157](https://github.com/openai/codex/discussions/41157)** — CodexFuse 1.2.0 Windows rate-limit dashboard.
- **[#44643](https://github.com/openai/codex/discussions/44643)** — CoCo: coordinator for parallel Codex work.
- **[#42041](https://github.com/openai/codex/discussions/42041)** — agent-watch for background `codex exec` (DONE / FAILED / STALL).
- **[#44153](https://github.com/openai/codex/discussions/44153)** — isitdone Stop hook: block “done” until tests/lint pass.

### 6. Feature Request Trends
- **Remote + multi-device:** headless daemon, phone/app remote control, thread/session sync, Android Remote completeness.
- **Undo / navigation:** rewind/revert, jump-to-user-message, in-thread prompt navigator.
- **Memory & orchestration:** cite-or-silent memories, planner/worker split, AGENTS.md guidance maps, parallel-agent coordinators.
- **Limits transparency:** local dashboards and CLIs for remaining quota, reset time, and credit behavior.
- **Platform parity:** Computer Use on Intel macOS and native Windows apps; gitignore-aware `@` refs; Shift+Enter newlines in CLI.

### 7. Developer Pain Points
- **Windows is the reliability hotspot:** project-context FS sync, sandbox setup (`helper_unknown_error`, lock / ACL errors), `git ls-files` pool growth, API-key vs ChatGPT-login auth split for browser control, scheduled-task / heartbeat misfires.
- **Process hygiene:** unreaped MCP / Computer Use children on macOS; marketplace staging dirs left in `.tmp`.
- **Model-facing friction:** GPT-6 Astra `invalid_prompt` on trivial input; opaque 5h vs weekly limit accounting; personality knobs being removed while users still debug provider/thread inheritance.
- **Client ownership bugs:** VS Code “open in another application,” composer vanishing, SQLite queue corruption, Remote thread lists dropping agent-spawned chats.
- **Workaround culture:** community is shipping quota UIs, stop-hooks, replay tools, and coordinators because first-party observability and multi-session control are still incomplete.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

I'll pull the repo page and discussions so the digest isn't missing community threads.# Gemini CLI Community Digest — 2026-09-12

Repo: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. This Week's Highlights

Security hardening is the main theme of the current nightly line. `v0.61.0-nightly.20260912` ships prompt-injection defenses around build files and untrusted flags, plus tighter sandbox filesystem isolation. Stable `v0.59.0` and preview `v0.60.0-preview.0` continue the same track: MCP OAuth SSRF/issuer checks, workspace-trust fail-closed behavior, NTFS short-name path mitigations, and sandbox settings isolation. Agent reliability remains the loudest community thread—hangs, false “GOAL success” after `MAX_TURNS`, auth loops, and Auto Memory quality—while PRs focus on policy consistency, model-pin preservation, and Windows sandbox command validation.

## 2. Releases

**Latest nightly:** [v0.61.0-nightly.20260912.g9c1b0a610](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260912.g9c1b0a610)

- [PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250) — block indirect prompt injection via build-file edits and untrusted flags.
- [PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214) — harden sandbox FS boundaries and isolate runtime state.

**Recent related nightlies / preview**

- [v0.61.0-nightly.20260909](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260909.ged2ac40df): NTFS 8.3 short-name path mitigation ([#29116](https://github.com/google-gemini/gemini-cli/pull/29116)); isolate settings dir in sandbox containers ([#29216](https://github.com/google-gemini/gemini-cli/pull/29216)); envelope provenance for untrusted tool output; keep explicit versioned Flash model IDs ([#29252](https://github.com/google-gemini/gemini-cli/pull/29252)).
- [v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0): safer web-fetch routing ([#29120](https://github.com/google-gemini/gemini-cli/pull/29120)); RFC 9207 issuer ID in MCP OAuth ([#29117](https://github.com/google-gemini/gemini-cli/pull/29117)); Seatbelt temp-dir isolation; extension path/boundary hardening; CrUX key sanitization; stricter system-config ownership checks.
- **Stable latest:** [v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0) — MCP OAuth SSRF fix ([#29081](https://github.com/google-gemini/gemini-cli/pull/29081)); fail-closed workspace trust and MCP server filtering in restricted mode ([#29099](https://github.com/google-gemini/gemini-cli/pull/29099)).

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — Subagent hits `MAX_TURNS` but reports `status: success` / `Termination Reason: GOAL`. P1 agent bug; 13 comments. Hides real interruptions from `codebase_investigator`.
2. **[#29267](https://github.com/google-gemini/gemini-cli/issues/29267)** — Auth loop on login (Pro user). 10 comments in 3 days. Blocks first-run entirely.
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — Zero-dependency OS sandbox + post-execution intent routing so Gemini 3 can stay on native POSIX tools. Large enhancement; still active after months.
4. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — Generalist agent hangs forever (even on mkdir). 8 👍. Workaround: ban sub-agents. Highest community signal among hang bugs.
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — EPIC: AST-aware read/search/map to cut misaligned reads and token noise.
6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — Model under-uses skills and sub-agents unless explicitly told. Undermines the agent architecture.
7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** / **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** / **[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)** — Auto Memory cluster: secrets reach the model before redaction; low-signal sessions retry forever; invalid inbox patches are silent. Security + quality.
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — Shell stays “Waiting input” after the command already finished. P1 core hang; 3 👍.
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — Browser subagent fails on Wayland.
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — 400 error when tool count exceeds ~128. Agent does not prune tool scope.

Also watched: [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) (discourage destructive git/DB ops), [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) (`/compress` not persisted), [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) (get-shit-done hook crash).

## 4. Key PR Progress

1. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250)** (merged) — Workspace-boundary checks on build files and untrusted flags; shipped in today’s nightly.
2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** / **[#29283](https://github.com/google-gemini/gemini-cli/pull/29283)** (merged) — Sandbox FS isolation across Docker/Podman/runsc/LXC/Seatbelt; read-only config, ephemeral runtime state.
3. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201)** — Preserve approved shell commands across confirmation retries (fixes infinite allow loops in multi-`!{}` TOML commands).
4. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217)** — Stop rewriting explicit `gemini-2.5-flash` to 3.5 Flash. Users who pin 2.5 stay pinned.
5. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200)** — MCP allowlist is case-insensitive/trimmed; empty `mcp.allowed` is fail-closed.
6. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205)** — Submit MCP prompt text raw, not JSON-encoded (quotes/newlines survive).
7. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282)** — Persist OAuth credentials immediately after browser/user-code login (directly relevant to #29267).
8. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184)** — Windows sandbox: validate git args so `git diff --output=` cannot silently truncate files.
9. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203)** — `stripShellWrapper` now handles extra flags so policy re-checks the inner command.
10. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287)** (merged) — Map `--yolo` to `allowedTools: ["*"]` and drop `ApprovalMode.YOLO` as a special state.

Honorable mentions: [#29211](https://github.com/google-gemini/gemini-cli/pull/29211) (nested React state updates), [#29208](https://github.com/google-gemini/gemini-cli/pull/29208) (malformed `agents.json` no longer crashes), [#29118](https://github.com/google-gemini/gemini-cli/pull/29118) (only strip trailing `.git`).

## 5. Hot Discussions

### Announcements
- [Public Roadmap for Gemini CLI v1](https://github.com/google-gemini/gemini-cli/discussions) (pinned)
- [Service update: mitigating abuse and prioritizing traffic](https://github.com/google-gemini/gemini-cli/discussions) — high engagement (~930+)
- [Transitioning Gemini CLI to Antigravity CLI](https://github.com/google-gemini/gemini-cli/discussions) — still referenced; Enterprise/API users told they stay on Gemini CLI

### Ideas / product direction
- [#14181](https://github.com/google-gemini/gemini-cli/discussions/14181) — Aider-style single-turn UX: pin `@files`/`@folders` across `/clear`
- [#28685](https://github.com/google-gemini/gemini-cli/discussions/28685) — Gemini 3.6 Flash support; debate over whether the CLI is abandoned for individuals

### Q&A / feedback
- [#24725](https://github.com/google-gemini/gemini-cli/discussions/24725) — Pro subscriber: hangs, Ctrl+C loops, PowerShell-corrupting comments
- [#25448](https://github.com/google-gemini/gemini-cli/discussions/25448) — Consolidated performance/OAuth slowness feedback
- Checkpoint coverage for shell-driven file changes (Q&A, Aug 25)

### Show and tell
- Sumlyzer (npm workspace feedback)
- agent-watch — DONE / FAILED / STALL detection for background agents
- 15 engineering-workflow skills in SKILL.md format
- WorkPaper MCP, Semble hooks

## 6. Feature Request Trends

- **Native bash + cheap sandboxing** so the model can use `grep`/`sed`/`awk` without a heavy tool surface (#19873).
- **AST-aware navigation** to replace firehose file reads (#22745, #22746, #19561 “tactful extraction”).
- **Honest agent lifecycle**: visible subagent trajectories (`/chat share`, #22598), accurate termination reasons, session takeover for locked browser profiles (#22232).
- **Self-awareness**: correct flags, hotkeys, and “how to run myself” (#21432).
- **Persistent session hygiene**: `/compress` across resume (#21335); pinned files that survive `/clear`.
- **Policy as data**: `--yolo` as wildcard allowlist; consistent MCP allow/deny at runtime.
- **Newer Gemini models** in the CLI for Enterprise/API users who were told they still get model updates.

## 7. Developer Pain Points

- **Hangs and false success.** Generalist agent deadlock (#21409), shell “Waiting input” after exit (#25166), `MAX_TURNS` reported as GOAL (#22323). Users disable sub-agents to stay productive.
- **Auth and credential persistence.** Login loops (#29267); OAuth mode slower than API keys; credentials not written until too late (#29282).
- **Security vs. convenience.** Indirect injection via build files, Windows `git diff --output`, NTFS 8.3 paths, MCP SSRF, secrets entering Auto Memory before redaction.
- **Tool-surface blowups.** >128 tools → HTTP 400; skills/sub-agents unused unless prompted; tmp scripts scattered across the tree (#23571).
- **Platform gaps.** Wayland browser agent, Windows sandbox read-only classification, sandbox settings leaking to the host.
- **Trust in the product line.** Individual-tier migration to Antigravity plus delayed model IDs leave Enterprise/API users asking whether “still supported” includes new Flash/Pro SKUs.

---

*Generated from last-24h GitHub activity on 2026-09-12 plus current Discussions listings. Nightlies are pre-release; pin models and review sandbox/policy diffs before rolling them into production agents.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-12

Repo: [github/copilot-cli](https://github.com/github/copilot-cli)

## 1. This Week's Highlights

A rapid 1.0.84.x patch train shipped session/memory import for semantic JSONL, grammar-backed shell completions, dedicated `instruction`/`lsp` list commands, plugin enable/disable + `--json`, and **Vim mode for everyone**. Community heat is still on Windows/WSL/tmux input and clipboard bugs, MCP lifecycle (OAuth, `server/discover`, resume timeouts), skills with `disable-model-invocation`, and enterprise org-level agents that never appear in the CLI.

## 2. Releases

**v1.0.84-5** — Session and memory **import** commands for the semantic JSONL interchange format. Completions now come from the same grammar the CLI parses, so `copilot <TAB>` shows root flags plus subcommands, and each subcommand only offers its own options.

**v1.0.84-4** — `copilot instruction list` and `copilot lsp list` replace `copilot plugins list --kind …`. `--json` on plugin list / marketplace list / browse. `copilot plugin enable` / `disable`.

**v1.0.84-3** — `/copy` includes task completion messages when available. OAuth-authenticated MCP servers connect more reliably at session startup.

**v1.0.84-2** — Vim mode is generally available (`/vim` or `editorMode: vim`); mode indicator while typing. On supported Windows sandbox policies, interactive shell commands record blocked accesses.

## 3. Hot Issues

1. **[#13](https://github.com/github/copilot-cli/issues/13) — Vim/Vi input mode** (CLOSED, 12 comments, 76 👍)  
   Long-running request for modal editing. Closed after Vim mode shipped to everyone in 1.0.84-2 — the highest-engagement issue in this window.

2. **[#1285](https://github.com/github/copilot-cli/issues/1285) — Org-level Agent not showing up** (OPEN, 9 comments)  
   Agents in `{org}/.github-private` never appear in CLI or VS Code. Blocks enterprise rollout.

3. **[#3260](https://github.com/github/copilot-cli/issues/3260) — Copy/paste broken over SSH + tmux → Windows Server 2025** (OPEN, 7 comments)  
   Regression after v1.0.47. Remote Windows + tmux is a common ops path.

4. **[#3534](https://github.com/github/copilot-cli/issues/3534) — WSL2 ARM64 `/copy` fails (`clip.exe` quoting)** (OPEN, 6 comments)  
   `cmd.exe` wrapper quoting breaks clipboard on aarch64 WSL2.

5. **[#4438](https://github.com/github/copilot-cli/issues/4438) — `disable-model-invocation: true` makes skills unreachable** (OPEN, 5 comments, 7 👍)  
   Skill listed but `skill()` returns “Skill not found.” Manual-only skills are unusable.

6. **[#4035](https://github.com/github/copilot-cli/issues/4035) — Voice installer hits private Azure Artifacts (401)** (OPEN, 5 comments)  
   Installer should pull `Microsoft.AI.Foundry.Local.Core` from nuget.org, not a private feed.

7. **[#4753](https://github.com/github/copilot-cli/issues/4753) — Session resume cancels in-flight stdio MCP (~1s vs ~16s)** (OPEN, 4 comments)  
   Resume handover kills MCP servers still initializing; they stay gone for the session.

8. **[#3700](https://github.com/github/copilot-cli/issues/3700) — WSL2 idle MainThread ~215% CPU, TUI frozen** (OPEN, 4 comments)  
   High-severity regression of #2208; live output never paints until restart.

9. **[#1168](https://github.com/github/copilot-cli/issues/1168) — Authorization fatigue** (OPEN, 4 comments)  
   One high-level request can trigger a dozen permission prompts.

10. **[#4095](https://github.com/github/copilot-cli/issues/4095) — Windows plugin update “Access is denied” while VS Code is open** (OPEN, 2 comments, 21 👍)  
    Copilot extension holds watchers on `installed-plugins`. Highest 👍 among open bugs this cycle.

**Also watched:** [#4764](https://github.com/github/copilot-cli/issues/4764) assisted permissions die after ~1 hour; [#4795](https://github.com/github/copilot-cli/issues/4795) Atlassian MCP OAuth callback port mismatch; [#4699](https://github.com/github/copilot-cli/issues/4699) OOM on long `--resume` plus crash dumps in cwd; [#4809](https://github.com/github/copilot-cli/issues/4809) (CLOSED) non-spec `server/discover` before `initialize`.

## 4. Key PR Progress

Only **9** PRs updated in the last 24h (not 10). Notable ones:

1. **[#4808](https://github.com/github/copilot-cli/pull/4808)** (OPEN) — Pin GitHub Actions to commit SHAs (security bot). Supply-chain hygiene.

2. **[#4786](https://github.com/github/copilot-cli/pull/4786)** (CLOSED) — Clarify third-party services notice / access terms.

3. **[#4770](https://github.com/github/copilot-cli/pull/4770)** (OPEN) — Document WebSocket responses opt-out (network blocks / `400 input item ID` failures).

4. **[#4761](https://github.com/github/copilot-cli/pull/4761)** / **[#4762](https://github.com/github/copilot-cli/pull/4762)** (CLOSED) — Installer reports unsupported OS instead of “Windows detected but winget not found” on FreeBSD.

5. **[#4746](https://github.com/github/copilot-cli/pull/4746)** (OPEN) — Experimental next-action SDK extension prototype under `examples/next-best-action/` (`joinSession()`, no-tools UI).

6. **[#4739](https://github.com/github/copilot-cli/pull/4739)** (OPEN) — Docs + MIT example for terminal-owned macOS notifications (click-to-focus problem).

7. **[#4748](https://github.com/github/copilot-cli/pull/4748)** (OPEN) — “Add joke cli” — low-signal / novelty PR.

8. **[#4100](https://github.com/github/copilot-cli/pull/4100)** (CLOSED) — Minimal “安全性” PR; not a product change.

## 5. Hot Discussions

Omitted — no Discussions data was provided.

## 6. Feature Request Trends

- **Modal / keyboard-first editing** — Vim shipped; users still want polish and parity with classic vi motions ([#13](https://github.com/github/copilot-cli/issues/13)).
- **Multi-account switching** without re-auth ([#367](https://github.com/github/copilot-cli/issues/367), closed pending more info).
- **Cross-session context** — query another session’s memory instead of starting cold ([#2436](https://github.com/github/copilot-cli/issues/2436)).
- **Enterprise agent discovery** from org `.github-private` ([#1285](https://github.com/github/copilot-cli/issues/1285)).
- **Skills UX** — readable `/skills list` ([#4823](https://github.com/github/copilot-cli/issues/4823)); slash-invoked skills with `disable-model-invocation` must still resolve ([#4438](https://github.com/github/copilot-cli/issues/4438), [#4637](https://github.com/github/copilot-cli/issues/4637)).
- **Observability** — HydraFusion per-phase model/verdict/credits on OpenTelemetry ([#4825](https://github.com/github/copilot-cli/issues/4825)).
- **Prompt queue** — `ctrl-t` enqueue should run after the current turn ([#4824](https://github.com/github/copilot-cli/issues/4824)).
- **Session interchange** — JSONL import just landed; demand for portable session/memory continues.

## 7. Developer Pain Points

- **Windows / WSL / remote terminal stack:** clipboard (`/copy`, `clip.exe` quoting), SSH+tmux paste, sandbox “not supported on this host” on Windows 25H2, plugin update file locks while VS Code is running, native runtime crashes since May.
- **MCP reliability:** pre-`initialize` `server/discover` breaking spec-compliant servers; FastMCP `-32602`; resume killing in-flight stdio; `--additional-mcp-config` servers stripped on second reconciliation; Atlassian OAuth callback port vs registered 33418; tools/list refresh into a just-cancelled server permanently dropping tools.
- **Permissions UX:** repeated auth prompts in one request; assisted auto-approval dying after ~1 hour.
- **Long sessions:** V8 heap OOM at 4 GiB on `--resume`; crash dumps written into cwd.
- **Config not honored:** `settings.json` `model` ignored at startup (falls back to `claude-sonnet-5`).
- **Instruction discovery:** `AGENTS.md` follows resolved symlinks and walks all ancestors across repo boundaries ([#4822](https://github.com/github/copilot-cli/issues/4822)).
- **Over-aggressive exfiltration filters** blocking legitimate spec content (env-var tokens in YAML).
- **TUI glitches:** `/ask` and `/btw` answers blank while the dialog stays open; idle CPU spin freezing output.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

I'll pull the complete v1.18.30 release notes and confirm whether discussions exist so the digest stays accurate.# OpenCode Community Digest — 2026-09-12

Repo: [anomalyco/opencode](https://github.com/anomalyco/opencode)

## This Week's Highlights

v1.18.30 landed with GPT-6 Astra system-prompt support plus Bedrock/Azure/OpenAI provider compatibility fixes. On the 2.0 line, activity concentrated on managed `serve` process isolation, MCP instance leaks, Desktop/SQLite session migrations, and native TUI RTL/bidi work. Feature energy remains high around agent loop/visualize/plugin APIs, while reliability issues (Desktop schema drift, history bloat, OAuth refresh, Windows permissions) keep dominating issue traffic.

## Releases

**[v1.18.30](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)** (latest)

Core improvements
- Added the Astra system prompt for GPT-6 models.

Bugfixes
- Preserved Bedrock DeepSeek model IDs, including ARN-based IDs, so they resolve correctly (@YeEmrick).
- Updated Azure and OpenAI provider SDKs for compatibility.
- Added reasoning-effort variants for supported GitLab GPT and Claude models (@far-ouq).

Community contributions also landed console usage/tier fixes and GitLab reasoning variants.

## Hot Issues

1. **[#18001](https://github.com/anomalyco/opencode/issues/18001) [CLOSED] `/loop` for automated iterative tasks** — 12 comments, 43 👍. Highest-engagement feature in the window; community wants first-class iteration instead of long natural-language retry prompts.
2. **[#27328](https://github.com/anomalyco/opencode/issues/27328) [CLOSED] Local server crashes during use** — 9 comments. Sidecar dies after permission grant; session survives but UI freezes. Core reliability complaint for local-server workflows.
3. **[#42170](https://github.com/anomalyco/opencode/issues/42170) [OPEN] Desktop: `no such column: project_id`** — 6 comments. Desktop 1.18.17 fails session load after schema remap; blocks upgrades for existing profiles.
4. **[#36539](https://github.com/anomalyco/opencode/issues/36539) [CLOSED] v2 child repos ignore shared workspace config** — 5 comments. `OPENCODE_CONFIG_DIR` is visible in the shell but not applied inside child git repos. Hurts monorepo / shared-workspace users.
5. **[#34592](https://github.com/anomalyco/opencode/issues/34592) [CLOSED] MCP OAuth refresh omits `resource`** — 4 comments. Atlassian (and RFC 9728-style servers) return 401 on refresh. MCP auth is still a sharp edge.
6. **[#47727](https://github.com/anomalyco/opencode/issues/47727) [OPEN] `serve`: per-request instances never disposed** — 3 comments. MCP child processes accumulate until OOM under multi-directory polling clients.
7. **[#34215](https://github.com/anomalyco/opencode/issues/34215) [CLOSED] Desktop hang from 179MB+ `opencode.global.dat`** — 3 comments, 6 👍. Base64 PDF attachments in history cause multi-minute freezes and multi-GB I/O.
8. **[#32567](https://github.com/anomalyco/opencode/issues/32567) [CLOSED] Context-percentage usage alert** — 3 comments, 2 👍. Users want a visual cue before context is exhausted.
9. **[#36690](https://github.com/anomalyco/opencode/issues/36690) [CLOSED] Permissions case-sensitive on Windows** — 3 comments. Windows cmdlets + case-sensitive permission keys break expected config.
10. **[#48588](https://github.com/anomalyco/opencode/issues/48588) [OPEN] Managed serve stays in client cgroup** — 1 comment, filed today. Shared `serve --service` inherits client memory limits and gets watchdog-killed. Paired with a same-day fix PR.

Honorable mentions: [#36675](https://github.com/anomalyco/opencode/issues/36675) Copilot model selection after auth, [#36709](https://github.com/anomalyco/opencode/issues/36709) SQLite migration schema mismatch, [#35884](https://github.com/anomalyco/opencode/issues/35884) AltGr symbols in TUI.

## Key PR Progress

1. **[#48591](https://github.com/anomalyco/opencode/pull/48591) [OPEN] Spawn managed serve in its own systemd scope** — Fixes #48588. Moves detached `serve` out of the client cgroup so shared servers are not starved.
2. **[#48586](https://github.com/anomalyco/opencode/pull/48586) [OPEN] Interactive `/visualize` command** — Adds `/visualize` plus `opencode visualize` with a confirmation step (closes #48585).
3. **[#48587](https://github.com/anomalyco/opencode/pull/48587) / [#48589](https://github.com/anomalyco/opencode/pull/48589) / [#48590](https://github.com/anomalyco/opencode/pull/48590) [OPEN] Native TUI Arabic/RTL (bidi)** — UAX #9 layout via bidi-js, isolation for URLs/paths/code; landing on both `dev` and `opencode2` beta.
4. **[#48582](https://github.com/anomalyco/opencode/pull/48582) [CLOSED] Omit empty Bedrock tool descriptions** — Prevents Bedrock Converse HTTP 400 on empty `toolSpec.description`.
5. **[#48575](https://github.com/anomalyco/opencode/pull/48575) [CLOSED] Render home prompt before plugins settle** — Faster TUI first paint; plugin chrome fills in without remounting the focused prompt.
6. **[#48570](https://github.com/anomalyco/opencode/pull/48570) [CLOSED] Defer named-theme palette detection** — Named themes no longer block startup on terminal palette discovery.
7. **[#48559](https://github.com/anomalyco/opencode/pull/48559) [CLOSED] Codemode errors get real JS prototypes** — Third step of the value-model rewrite; interpreter failures now look like native JS errors.
8. **[#48568](https://github.com/anomalyco/opencode/pull/48568) [CLOSED] Omit Node CLI from `latest`** — Experimental Node CLI stays off official latest; dev/beta unchanged.
9. **[#48576](https://github.com/anomalyco/opencode/pull/48576) [CLOSED] Docs: use stable V2 packages** — Install/SDK/plugin examples switch from `@beta` to `@opencode/*`.
10. **[#46690](https://github.com/anomalyco/opencode/pull/46690) [OPEN] Plugin API: session forms, session list, global event stream** — Broader plugin surface for bots and custom UIs.

Also watch: [#48435](https://github.com/anomalyco/opencode/pull/48435) timeline-row reconciliation perf, [#43460](https://github.com/anomalyco/opencode/pull/43460) plugin tool-input decode across Effect versions, [#47555](https://github.com/anomalyco/opencode/pull/47555) `--continue` dummy session fetch, [#42223](https://github.com/anomalyco/opencode/pull/42223) continue-session working directory.

## Feature Request Trends

- **Agent control loops**: `/loop` (#18001), agent-managed reminders (#36676), dynamic session persistence (#36635).
- **Visualization & status UX**: interactive `/visualize` (#48585/#48586), plugin status-bar/sidebar API (#36625), context-usage alerts (#32567).
- **Config & docs hygiene**: AGENTS.md inheritance rules + disable switch (#36699), documented `OPENCODE_CONFIG` precedence (#36663), linter commands for agent files (#36719).
- **Serve / multi-project ops**: `--dir` for `opencode serve` (#36658), persist web open-projects server-side (#48592).
- **I18n / media in TUI**: native RTL (#48587+), inline images via terminal protocols (#36630), Persian README (#47783).
- **Reasoning-effort persistence** across agents and sessions (#36703, #36651, #36638).

## Developer Pain Points

- **Desktop + SQLite migrations**: `project_id` missing, upgrade schema ≠ fresh schema, huge `opencode.global.dat` from embedded attachments.
- **Process lifetime on `serve`**: leaked per-request Instances/MCP children, managed server trapped in client cgroups, local sidecar crashes after permission prompts.
- **Provider/auth edges**: MCP OAuth missing `resource`, Copilot authorization not unlocking models, Bedrock empty tool descriptions, Ollama-cloud `think` not forwarded.
- **Windows / keyboard / multiplexer friction**: case-sensitive permissions, AltGr symbols swallowed in TUI, `/exit` and Ctrl+C killing whole Zellij sessions.
- **Config precedence is still surprising**: env-var config overridden by global agent markdown; child repos not combining shared workspace config.
- **History and shell output quality**: carriage-return progress frames retained in tool results; session data only flushed on clean exit.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

I'll pull the full v0.85.1 release notes so the digest isn't truncated.# Pi Community Digest — 2026-09-12

Source: [earendil-works/pi](https://github.com/earendil-works/pi)

## 1. This Week's Highlights

Windows remains the loudest support surface: a long-running “how do you actually run Pi on Windows?” thread still leads comment volume, while new PRs harden Store aliases, shell discovery, PowerShell path lookup, and Git-bash timeout kill. Provider plumbing is the other axis — GPT-6 Astra shipped in **v0.85.1**, mid-conversation system-message deltas landed, and a cluster of OpenAI-compatible / Codex / Bedrock / Vertex issues shows the catalog is stretching faster than the request adapters. Extensions and third-party UIs (Phosphor, Eco Coding, Pi Manager, pi-agent-views) keep filling the “official desktop surface” gap the community keeps asking for.

## 2. Releases

**[v0.85.1](https://github.com/earendil-works/pi/releases/tag/v0.85.1)** (latest; tagged 2026-09-05)

- **GPT-6 Astra** via OpenAI API keys and OpenAI Codex subscriptions.
- Fullscreen TUI: Alt + mouse wheel scrolls 5× faster ([#9166](https://github.com/earendil-works/pi/pull/9166)).
- Fixes: model/thinking selector save keybindings; 0.85.0 SDK import breakage from unpublished experimental paths; hover-recenter click-miss in autocomplete/settings; GPT-5.6+ Responses prompt-cache TTL (`prompt_cache_options.ttl: "30m"` instead of 24h retention).

Note: several 0.85.1-era issues already report Astra compaction caps, SIGILL on a bundled native addon, and OpenAI Responses stream termination — expect a follow-up patch cycle.

## 3. Hot Issues

1. **[#7547](https://github.com/earendil-works/pi/issues/7547)** — *How do you use Pi on Windows?* (62 comments, 👍2)  
   Meta-thread on WSL vs native vs Store vs Git-bash. Highest-signal issue for prioritizing docs vs core fixes.

2. **[#9052](https://github.com/earendil-works/pi/issues/9052)** — Fullscreen wheel scroll ~3× slower (9 comments, 👍4)  
   Users want the pinned input box *and* regular-mode scroll speed. Partial relief shipped (Alt-fast-scroll in 0.85.1); still open.

3. **[#9323](https://github.com/earendil-works/pi/issues/9323)** — Fireworks-specific config (14 comments)  
   Provider config still too generic; community is debugging model-family quirks in the open.

4. **[#5323](https://github.com/earendil-works/pi/issues/5323)** — Vertex + GCP metadata server (9 comments)  
   Sync `existsSync` on ADC files is a poor proxy for “is Vertex authed?” on GCE/Cloud Run.

5. **[#8928](https://github.com/earendil-works/pi/issues/8928)** — Parallel startup reports “No API key” for ~48s  
   Expired OAuth for *another* provider blocks the active one. Hurts multi-process / CI setups.

6. **[#7321](https://github.com/earendil-works/pi/issues/7321)** — Multi-line paste broken without bracketed paste (Termux)  
   First `\r` submits instead of inserting. Mobile/Android users are stuck.

7. **[#9262](https://github.com/earendil-works/pi/issues/9262)** — `find` glob with `\` silently returns nothing  
   Windows path separators produce empty results with no error — agents conclude files don’t exist.

8. **[#9129](https://github.com/earendil-works/pi/issues/9129)** — Windows bash timeout leaves pipeline orphans  
   `taskkill` on MSYS2 bash PID does not kill pipeline stages.

9. **[#9512](https://github.com/earendil-works/pi/issues/9512)** — Compaction hits token cap with GPT-6 Astra at max reasoning (closed, untriaged)  
   New model + inherited session reasoning overflows summarization. Related: [#8371](https://github.com/earendil-works/pi/issues/8371) unbounded compaction input.

10. **[#9500](https://github.com/earendil-works/pi/issues/9500)** / **[#9507](https://github.com/earendil-works/pi/issues/9507)** — SIGILL in 0.85.1 and Windows RPC `libuv` assertion on shutdown  
    Native/runtime faults on fresh release; auto-closed by new-contributor policy, so they need maintainer pickup.

Also watch: [#7658](https://github.com/earendil-works/pi/issues/7658) (extension API cannot persist `auth.json` keys), [#9462](https://github.com/earendil-works/pi/issues/9462) (`ctx.ui.notify` last-wins), [#9510](https://github.com/earendil-works/pi/issues/9510)/[#9509](https://github.com/earendil-works/pi/issues/9509) Alt+letter dead on non-Latin layouts.

## 4. Key PR Progress

1. **[#9116](https://github.com/earendil-works/pi/pull/9116)** + **[#9117](https://github.com/earendil-works/pi/pull/9117)** *(closed)* — Mid-conversation system messages; prompt/tool changes as system deltas instead of rewriting the top-level prompt. Core architecture for extensions that mutate tools mid-session.

2. **[#9501](https://github.com/earendil-works/pi/pull/9501)** *(open)* + **[#9504](https://github.com/earendil-works/pi/pull/9504)** *(open)* — Unify Windows shell discovery; accept Windows Store aliases (`accessSync` vs `existsSync` EACCES). Direct response to #7547.

3. **[#9505](https://github.com/earendil-works/pi/pull/9505)** *(closed)* — Honor `models.json` `samplingParams` on the openai-completions *tool* stream path (was only applied in `streamSimple`).

4. **[#9488](https://github.com/earendil-works/pi/pull/9488)** *(open)* — Canonical Codex turn attribution (`requestIdentity` across retries, tools, compaction).

5. **[#9442](https://github.com/earendil-works/pi/pull/9442)** *(open)* — `compat.supportsPromptCacheKey` so OpenAI-compatible proxies can receive session cache keys.

6. **[#8572](https://github.com/earendil-works/pi/pull/8572)** *(open, WIP)* — Amazon Bedrock Mantle surface (GPT-family models that fail on Converse).

7. **[#8627](https://github.com/earendil-works/pi/pull/8627)** + **[#9483](https://github.com/earendil-works/pi/pull/9483)** *(closed)* — Tools resolve against `ctx.cwd`; then made opt-in via `customCwd` for back-compat.

8. **[#9468](https://github.com/earendil-works/pi/pull/9468)** *(closed)* — Deferred extension reload (`requestReload`, coalesced at settle) so `/reload` is not mid-turn.

9. **[#9478](https://github.com/earendil-works/pi/pull/9478)** *(closed)* — Cap per-message chars in compaction token estimate (huge `web_fetch` JSON was triggering instant re-compact).

10. **[#9489](https://github.com/earendil-works/pi/pull/9489)** *(closed)* — Bedrock Converse: normalize gross vs net `usage.inputTokens` per model family.

Honorable mentions: [#9491](https://github.com/earendil-works/pi/pull/9491) customization-doc evals; [#9467](https://github.com/earendil-works/pi/pull/9467) setup-phase aborts classified as aborted; [#8708](https://github.com/earendil-works/pi/pull/8708) fd/rg version resolve without GitHub API quota.

## 5. Hot Discussions

### Ideas
- **[#8420](https://github.com/earendil-works/pi/discussions/8420)** — Official Web UI base? DSH’s plugin ecosystem produced many UI plugins; Pi’s stay CLI/TUI-centric.
- **[#9207](https://github.com/earendil-works/pi/discussions/9207)** — Drop the “Available tools” section from the system message (token waste).
- **[#9146](https://github.com/earendil-works/pi/discussions/9146)** — Per-repo API-key override that ignores global `auth.json` (1Password / OpenRouter workflows).
- **[#9312](https://github.com/earendil-works/pi/discussions/9312)** — Pi Context Memory: recover *why* a compacted decision was made.

### Q&A
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** — Which plugins/extensions do you actually use? (16 comments, 👍9) Still the sticky community catalog.

### Show and tell
- **[#9446](https://github.com/earendil-works/pi/discussions/9446)** — **Phosphor**: desktop surface over `pi --mode rpc` (chat, diffs, files, terminal).
- **[#9427](https://github.com/earendil-works/pi/discussions/9427)** — **Pi Manager**: local control plane for providers/models/`~/.pi/agent`.
- **[#9327](https://github.com/earendil-works/pi/discussions/9327)** — **Eco Coding**: desktop GUI (vision split, teams, browser, computer use).
- **[#9373](https://github.com/earendil-works/pi/discussions/9373)** — **pi-agent-views**: concurrent sub-agents rendered inside Pi.
- **[#8803](https://github.com/earendil-works/pi/discussions/8803)** — **pi-verdict**: one-file allow/ask/deny permission gate.
- **[#9213](https://github.com/earendil-works/pi/discussions/9213)** — Agent-Friendly Score badge (Pi scored 86.2).

## 6. Feature Request Trends

1. **First-class Windows** — shell discovery, Store aliases, non-C: installs, Git-bash process trees, keyboard layouts, path separators.
2. **Official (or blessed) GUI / RPC clients** — multiple independent desktops appeared in one week; discussion #8420 asks for a base rather than N forks.
3. **Provider fidelity** — Vertex ADC, Fireworks, Bedrock Mantle, Codex attribution, prompt-cache keys on proxies, stop sending OpenAI-only fields to “compatible” endpoints.
4. **Extension platform completeness** — persist credentials, export hook types, non-racy UI notify, public OAuth HTML helpers, deferred reload, mid-session system deltas.
5. **Compaction that cannot fail closed** — bound summarization input, handle Astra max-reasoning caps, cheaper session search ([#9267](https://github.com/earendil-works/pi/issues/9267)).
6. **Auth scoped by project** — per-repo keys, ignore global `auth.json`, don’t block provider A because provider B’s OAuth expired.

## 7. Developer Pain Points

- **Windows is still “bring your own working combination.”** Hardcoded `C:\` PowerShell, Store alias `EACCES`, orphaned bash pipelines, Alt+letter dead on ЙЦУКЕН, RPC libuv crash on session resume.
- **Silent empty results beat loud errors.** Windows globs, missing keys during parallel start, dropped `samplingParams` — agents infer the wrong world state.
- **New-contributor auto-close** is burying 0.85.1 crash/compat reports (`SIGILL`, Responses SSE drop, `TOO_MANY_TOOL_CALLS` type error) until daily review.
- **Compaction + huge tool payloads** still misfire (6.6 MB `web_fetch` JSON; Astra output cap). Long sessions can become uncompactable.
- **Extension authors hit API ceilings:** no `auth.json` write path, last-wins `notify`, incomplete exported types, `/reload` re-running dependency side effects in the release binary ([#6108](https://github.com/earendil-works/pi/issues/6108)).
- **OpenAI-compatible is not OpenAI.** Extra roles/fields/auth headers and missing cache-key opt-in keep breaking relays (ModelScope, new-api, local bridges).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

I'll pull the live GitHub pages so the digest matches current releases, issues, and PRs rather than the truncated dump.Next I’ll grab the full changelog plus the issue and PR pages so the digest can cite real titles and links.# Qwen Code Community Digest — 2026-09-12

Repo: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) · window: last 24h of GitHub activity (plus the stable/nightly tags shipped immediately before this snapshot).

## 1. This Week's Highlights

Stable **v0.23.3** landed on 10 Sep with no advertised breaking changes: expanded Kimi/Qwen/DeepSeek reasoning presets, a first-class OpenAI Responses content generator, ACP hand-off of a subagent turn to an external agent (Claude Code first), and a denser Web Shell session surface (unified sources, clickable URLs, configurable branding). Around that cut, the project also shipped **Desktop v0.3.0**, TypeScript SDK **v0.1.12** (bundling CLI 0.23.3), CUA driver **v0.20.5**, and a 11 Sep nightly. The live fire is reliability: a P1 TUI death when several background agents finish at once, Responses-pipeline adjacency bugs that break reasoning+tool-call pairing, and DashScope cache misses from historical image reattachment.

## 2. Releases

| Tag | When | Notes |
| --- | --- | --- |
| [v0.23.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3) | 10 Sep | Stable CLI. Features: reasoning presets ([#11349](https://github.com/QwenLM/qwen-code/pull/11349)), OpenAI Responses generator ([#8169](https://github.com/QwenLM/qwen-code/pull/8169)), ACP external-agent delegation ([#11003](https://github.com/QwenLM/qwen-code/pull/11003)), session registry/wire contract ([#11463](https://github.com/QwenLM/qwen-code/pull/11463)), Web Shell session overview + unified sources + clickable links ([#11238](https://github.com/QwenLM/qwen-code/pull/11238), [#11262](https://github.com/QwenLM/qwen-code/pull/11262), [#11464](https://github.com/QwenLM/qwen-code/pull/11464)), 256 workspaces by default ([#11515](https://github.com/QwenLM/qwen-code/pull/11515)). Fixes include Windows ConPTY hosting ([#11497](https://github.com/QwenLM/qwen-code/pull/11497)), SSE reconnect ([#11467](https://github.com/QwenLM/qwen-code/pull/11467)), reasoning-signature preservation ([#8260](https://github.com/QwenLM/qwen-code/pull/8260)), pending permission/question across session loads ([#11468](https://github.com/QwenLM/qwen-code/pull/11468)). |
| [v0.23.3-nightly.20260911.aaa6a32aae](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260911.aaa6a32aae) | 11 Sep | Nightly on top of 0.23.3. Notable: DingTalk background-aggregation removal ([#11570](https://github.com/QwenLM/qwen-code/pull/11570)), `feat(channels)!:` message-prefix-filter removal ([#11571](https://github.com/QwenLM/qwen-code/pull/11571) — flagged breaking in the nightly notes even though the stable 0.23.3 notes say “no known breaking changes”). |
| [v0.23.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2) | 9 Sep | Split-view session navigation ([#11250](https://github.com/QwenLM/qwen-code/pull/11250)), remote one-command start with token/QR ([#11172](https://github.com/QwenLM/qwen-code/pull/11172)), built-in `web_search` on ModelStudio Standard/Token Plan ([#11348](https://github.com/QwenLM/qwen-code/pull/11348)), GPT-5/6 reasoning-effort config ([#11295](https://github.com/QwenLM/qwen-code/pull/11295)), Plan vs execution permission split in Web Shell ([#11423](https://github.com/QwenLM/qwen-code/pull/11423)). |
| [desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0) | 10 Sep | Desktop packaging CI on a schedule ([#11519](https://github.com/QwenLM/qwen-code/pull/11519)), pending permission/question retained across session refresh, VS Code pre-cutover history restore, Windows PTY worker cleanup. Preview tag `desktop-v0.3.0-preview.0` still leaves the `desktop-latest` updater on 0.2.2 — install deliberately. |
| [sdk-typescript-v0.1.12](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.12) | 10 Sep | Bundles CLI **0.23.3**. |
| [cua-driver-rs-v0.20.5](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.5) | 9 Sep | Prebuilt CUA driver: notarized universal macOS + `QwenCuaDriver.app`; unsigned Linux (x86_64/arm64, glibc 2.31+) and Windows UIAccess/SDK payloads. |

npm `@qwen-code/qwen-code` is on **0.23.3**.

## 3. Hot Issues

Only **six** issues were updated in the last 24h. Ranked by severity and user impact (not by thumbs — all sit at 0 👍 in this dump):

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI dies silently (React #185) when several background agents finish**  
   **Open · P1 · UI/rendering · 7 comments.** Ink `useBoxMetrics` layout listener enters a `setState` loop; the process drops to the shell with no on-screen error, and resume reports a dirty previous session. Highest-severity user-facing bug in the window: multi-agent is a first-class product path, and a silent TUI death is a session-loss event.

2. **[#11665](https://github.com/QwenLM/qwen-code/issues/11665) — Responses cleanup can break reasoning / tool-call adjacency**  
   **Open · P2 · core / content-generation · ready-for-human · 4 comments.** Replay cleanup treats a `reasoning` item and its `function_call` independently, violating the OpenAI Responses adjacency invariant. Directly threatens the new Responses generator shipped in 0.23.3. Counterpart fix is already up as [#11684](https://github.com/QwenLM/qwen-code/pull/11684).

3. **[#11627](https://github.com/QwenLM/qwen-code/issues/11627) — DashScope: repeated image reattachment may prevent prompt-cache reuse**  
   **Closed · P2 · performance/caching · 2 comments.** Historical images are re-appended after the cache breakpoint; the next turn inserts new assistant/tool messages *before* those images and invalidates the prefix. Closed in-window — treat as a known DashScope multimodal tax, not an open fire.

4. **[#11617](https://github.com/QwenLM/qwen-code/issues/11617) — Deferred review findings from PR #11241 (Playwright Browser SDK)**  
   **Open · bot-filed.** Follow-up surface for `feat(browser-use)` that did not fit the original PR footprint. Signals that browser-use is landing in slices, with review debt parked rather than blocked.

5. **[#11685](https://github.com/QwenLM/qwen-code/issues/11685) — Deferred review findings from PR #11679 (Windows monitor debug dirs)**  
   **Open · created today.** Same autofix-deferred pattern on a live Windows path. Windows PTY/monitor work is moving, but leftover review comments are becoming their own issue stream.

6. **[#7167](https://github.com/QwenLM/qwen-code/issues/7167) — Fleet Shepherd Dashboard**  
   **Open · bot-maintained.** Ops heartbeat (`Last tick: 2026-09-12T03:41:17Z`). Not a product bug; useful only as a pulse that the bot fleet is scanning (PR #11679 called out as “checks in flight”).

## 4. Key PR Progress

Picked for product impact, not comment count (the dump marks comment counts as `undefined`).

1. **[#11684](https://github.com/QwenLM/qwen-code/pull/11684) — `fix(core): keep reasoning and function_call items adjacent through Responses cleanup`** (`he-yufeng`, opened today)  
   Treats a replayed reasoning item and its function call as one unit. Orphaned calls drop their preceding reasoning item with them. This is the in-flight patch for #11665 and the load-bearing correctness fix for the new Responses path.

2. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — `feat(memory): add structured on-demand recall`** (`ZijianZhang989`, autofix/takeover)  
   Replaces flat auto-memory dumps with a two-level ref/title tree, a query-focused metadata subtree, and an explicit recall tool. Largest memory-architecture change in the queue.

3. **[#10410](https://github.com/QwenLM/qwen-code/pull/10410) — `feat(core): preserve prompt cache for deferred tools`** (`DragonnZhang`, autofix/takeover)  
   Stable two-step bridge: `tool_search` inspects a deferred schema without mutating the declared tool list; `tool_call` executes through the existing pipeline. Aimed at cache-hit rate when tools are revealed late.

4. **[#11342](https://github.com/QwenLM/qwen-code/pull/11342) — `feat(web-shell): add model role and context window configuration`** (`wenshao`)  
   Advisor/image models get endpoint-aware pickers; voice uses workspace transcription models; custom setup covers conversation, image gen, and transcription. Makes Web Shell a real multi-model console.

5. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — `feat(web-shell): show shell and monitor task output`** (`BZ-D`)  
   Persist Monitor stdout/stderr next to Shell capture; daemon exposes a live-session-owner-scoped sanitized tail. Closes the “I started a task and cannot see it” gap.

6. **[#6019](https://github.com/QwenLM/qwen-code/pull/6019) — `feat(cli): add /model --compaction`** (`Rajeshwaran-R`)  
   Dedicated compaction model, separate from the chat model. Long-running request; still open after two months, which itself is a signal that compression cost/quality is unresolved.

7. **[#11291](https://github.com/QwenLM/qwen-code/pull/11291) — `fix(core): retry status-less upstream errors instead of ending the turn`** (`wenshao`)  
   Gateways that push an error object into an already-200 SSE stream currently kill the turn. Classifies those as retryable. Pairs with [#10347](https://github.com/QwenLM/qwen-code/pull/10347) (EOF / wrapped 4xx as transport errors).

8. **[#11584](https://github.com/QwenLM/qwen-code/pull/11584) — `fix(vscode): list all workspace sessions in the panel history`** (`yiliang114`)  
   Drops the `sourceType` filter so VS Code, terminal, Web Shell, and unattributed sessions share one history. Matches the “unified session sources” theme in 0.23.3.

9. **[#11659](https://github.com/QwenLM/qwen-code/pull/11659) — `fix(cli): keep the expanded OpenTUI confirmation dialog on screen`** (bot, #11655)  
   OpenTUI E2E has been red since `518f6795f9`: confirmation payload is rendered twice and overflows the fixed alt-screen. Blocks the OpenTUI renderer lane.

10. **[#11647](https://github.com/QwenLM/qwen-code/pull/11647) — `fix(cli): resolve ACP core settings against the active target dir`** (`yiliang114`)  
    `qwen/settings/getCore` and `setCoreValue` no longer fall back to `process.cwd()` when the client omits `cwd`; they use `config.getTargetDir()`. Required for correct ACP multi-workspace behavior.

Honorable mentions still moving: [#9305](https://github.com/QwenLM/qwen-code/pull/9305) (bottom-align short VP content), [#10455](https://github.com/QwenLM/qwen-code/pull/10455) (don’t crash when the output-language file is unwritable), [#11562](https://github.com/QwenLM/qwen-code/pull/11562) (keep one-shot system reminders out of the user’s own message), [#10963](https://github.com/QwenLM/qwen-code/pull/10963) (fire active-todo reminders at delegation boundaries), [#11289](https://github.com/QwenLM/qwen-code/pull/11289) (keep mid-turn messages the daemon rejects at idle).

## 5. Hot Discussions

Omitted — no Discussions data was provided in the source dump.

## 6. Feature Request Trends

Inferred from open PRs + the 0.23.2/0.23.3 feature list (no Discussions corpus):

- **Multi-surface session identity.** Unified session sources, VS Code history without `sourceType` filter, session registry + wire contract, ACP sessions that can send peer messages. The product is converging on one session object reachable from CLI, Web Shell, VS Code, Desktop, and channels.
- **Model routing as a first-class setting.** Reasoning presets (Kimi/Qwen/DeepSeek), GPT-5/6 reasoning effort, Web Shell role + context-window pickers, `/model --compaction`. Users want *which model does which job*, not a single global model.
- **Cross-agent / ACP interoperability.** Delegate a subagent turn to Claude Code over ACP ([#11003](https://github.com/QwenLM/qwen-code/pull/11003)); Playwright Browser SDK follow-ups ([#11617](https://github.com/QwenLM/qwen-code/issues/11617) / PR #11241). Qwen Code is being used as a bus, not only as an agent.
- **Memory that is pull, not dump.** Structured on-demand recall ([#10183](https://github.com/QwenLM/qwen-code/pull/10183)) and deferred-tool schema search without busting the prompt cache ([#10410](https://github.com/QwenLM/qwen-code/pull/10410)).
- **Observable long-running work.** Shell/Monitor tails in Web Shell, workflow visualization from the 10 Sep weekly post, Goal checkpoint retry instead of stall. Operators want to *watch* subagents, not just launch them.

## 7. Developer Pain Points

- **TUI robustness under fan-out.** Multi-agent completion can take down the interactive process with an uncaught React max-update-depth error and no rendered diagnostics (#11500). Same family: OpenTUI confirmation overflow (#11659), short-viewport top-alignment blank gap (#9305), mid-turn send rejected as a hard failure (#11289).
- **Provider protocol invariants.** Responses cleanup splits reasoning from its tool call (#11665 / #11684). DashScope cache breakpoints sit after reattached images (#11627). Status-less SSE error objects end the turn instead of retrying (#11291). These are not cosmetic — they waste cache and drop tool episodes.
- **Windows runtime debt.** Bundled ConPTY to stop orphan `conhost.exe` (shipped in 0.23.3), `node-pty` conout worker leaks, monitor debug directories on Windows (#11679 / #11685). Desktop and CUA binaries are now shipping, so this path is no longer optional.
- **Startup / environment brittleness.** Unwritable global config dir crashes CLI boot (#10455). ACP settings resolve against `cwd` instead of the target workspace (#11647). One-shot system reminders leak into the user’s own transcript and ↑-recall history (#11562).
- **CI and autofix noise.** macOS E2E shard death needs a budget-gated retry (#11134); PTY test cleanup races (#11001); a large fraction of the “hot” PR list is bot-owned `autofix/needs-human` or `autofix/takeover`. Review findings that miss the original PR footprint are being filed as new issues (#11617, #11685) rather than closed in-place — the human review queue is the bottleneck, not idea supply.
- **Prompt-cache hygiene.** Deferred tools, historical image reattachment, and late schema revelation all punch holes in prefix cache. #10410 and the closed #11627 are two sides of the same cost problem.

</details>