# AI CLI Tools Community Digest 2026-08-30

> Generated: 2026-08-30 07:55 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison — 2026-08-30

## 1. Ecosystem Overview

Late-August 2026 AI CLIs are no longer competing on “can it edit a file.” They are competing on **governed multi-agent runtimes**: MCP/hooks as a platform, restricted/eval-safe modes, remote-control surfaces, and honest cost/quota telemetry. Product teams are shipping restriction flags, model-switch hooks, MCP result interceptors, and fail-closed trust; communities are still blocked on **Windows/desktop completeness**, **subagent honesty**, **long-session stability**, and **meters that match local evidence**. The center of gravity has shifted from prompt quality to **process isolation, policy, and session lifecycle**. First-party office docs, secrets vaults, and product-surface integration (Projects, ChatGPT remote, Web Shell) remain the gap between “agent that codes” and “agent that can run unattended in a company.”

## 2. Activity Comparison

Counts below follow the digest windows (mostly last-24h GitHub activity on 2026-08-30). Where a channel was omitted or not quantified, that is marked **N/A / not in snapshot**, not “inactive.”

| Tool | Issues (window) | PRs (window) | Discussions (window) | Latest release |
|---|---|---|---|---|
| **Claude Code** | High volume (10+ hot issues; #2511 still 399 👍) | ~10 notable open/closed | N/A (payload omitted) | **v2.1.251** (28 Aug) |
| **OpenAI Codex** | **48** updated / 24h | **50** updated / 24h | **42** updated / 24h | **rust-v0.151.0** (29 Aug); 0.152.0-alpha.1 in flight |
| **Gemini CLI** | Active P1 cluster (roadmap #4191 = 99 👍) | Dense nightly merges (trust/SSRF/sandbox) | Active (roadmap, capacity, ideas) | Stable **v0.57.0** (25 Aug); nightly **v0.59.0** (30 Aug) |
| **GitHub Copilot CLI** | Stability cluster (FileWatch, OOM, TUI freeze) | **6** updated / 24h (thin public PR stream) | N/A (not in snapshot) | **v1.0.82** (29 Aug); 1.0.81 = last feature train |
| **OpenCode** | Billing + CPU + MCP leak cluster | Dense core/TUI/MCP fixes | N/A (payload omitted) | **v1.18.25** (patch train 1.18.22–25) |
| **Pi** | TUI/layout + long-session CPU | Full-parity web GUI + providers closed | Active (harness benchmarks, plugins) | **v0.84.4** (28 Aug) |
| **Qwen Code** | **5** updated / 24h (ops/CI-heavy) | High merge velocity (daemon/auth/review) | N/A (payload omitted) | **v0.22.3**; 2026-08-30 nightly **failed CI** |

**Read of the table:** Codex is the only repo with a complete three-channel 24h census and is the noisiest public tracker. Claude and Gemini look mature-product noisy (long-lived north-star issues + release trains). Copilot’s public PR surface is quiet while release trains carry the product. Qwen’s tracker is operator/CI-shaped rather than end-user-shaped this window.

## 3. Shared Feature Directions

These needs appear in **two or more** communities, with concrete examples:

- **MCP / hooks as a real API, not a sidecar**  
  Codex 0.151.0: discovery grace, inspect/replace MCP results, plugin catalogs. Claude: `PreModelSwitch` / `PostModelSwitch`, hook load-from-wrong-root. Copilot: MCP 2026-07-28 + OTel-aware hooks; Atlassian/ADO OAuth breakage. Gemini: MCP filter in restricted mode + SSRF fix on OAuth discovery. OpenCode/Pi: plugin intercept of slash commands, prompt transforms, UI prompt events.

- **Restricted / eval-safe / fail-closed runtimes**  
  Claude `--restricted` (v2.1.248). Gemini fail-closed workspace trust + MCP filter (nightly). Codex remote sandbox using real home/OS/paths. Qwen: trusted-loopback operator API + hook trust-boundary holes.

- **Subagent observability and honesty**  
  Claude: sibling scratchpad sharing; depth-2 notifications dropped. Gemini: MAX_TURNS reported as GOAL; generalist hangs; unused skills. Codex: nested subagent tokens now count toward root budgets; stale subagents resurrect. Copilot: TUI dies when parallel subagents spawn. OpenCode: live subagent sidebar request; mimo-v2.5 infinite thinking. Pi: fork/retry must settle the active turn.

- **Quota, cache, and billing that match local evidence**  
  Claude: `/cost` cache line; `/compact` re-billed as cold write. Codex: weekly limit “feels like the old 5-hour cap”; meta tracker #41220; Chronicle burns quota idle. OpenCode: paid Zen still hits free caps; catalog 200 + inference 401. Plus users want **policy choice** (burst vs sustain), not just a dashboard.

- **Remote control + desktop completeness**  
  Codex: ChatGPT-app remote (#9200, 190 👍) + missing Windows “Control other devices.” Claude: Remote Control live-streams foreground subagent tools. Copilot/Pi/OpenCode: Windows resume, headless post-update, PowerShell/console, always-on-top.

- **Long-session / resume reliability**  
  Copilot: FileWatch 13 GB log, heap OOM on resume. Pi: full JSONL parse before first prompt; macOS 50–110% CPU. OpenCode: MCP children leak on `serve` reconnect. Claude: background Bash false exit 0. Gemini: shell stuck on “Waiting input.”

- **Secrets, auth, and enterprise IdP**  
  Claude #29910 first-party vault. Copilot: Entra/WAM for remote MCP; GHEC 401 in `-p` mode. OpenCode: Azure CLI / Entra without Bun. Qwen: loopback vs bearer split brain. Codex: Advanced Account Security login loop.

## 4. Differentiation Analysis

| Tool | Feature focus this window | Implied target user | Technical approach |
|---|---|---|---|
| **Claude Code** | Governed model switch, `--restricted`, cost/cache surfaces, Remote Control streaming | Enterprise + eval harnesses + power CLI users who already live in Claude.ai | Hook events as control plane; strip tools rather than add them; telemetry honesty after billing surprises |
| **Codex** | MCP platform, sandbox path realism, nested budget accounting | ChatGPT-plan users who want desktop + phone + CLI as one product | Rust core + app-server; product heat is **metering + Windows client**, not the CLI core |
| **Gemini CLI** | Public v1 roadmap, Seatbelt/Docker isolation, write-policy checkers, AST/bash-native debate | Google-ecosystem + security-conscious local users | Nightly trust hardening; open roadmap as the community contract |
| **Copilot CLI** | Plugins dashboard for everyone, MCP 2026-07-28, OTel hooks, Entra/WAM | GitHub/Enterprise + IDE-adjacent CLI | Release-train over public PRs; pain is **runtime isolation** (FileWatch, event store, resume heap) |
| **OpenCode** | Multi-provider correctness (Azure, Bedrock, CF Gateway), TUI plugin power, Zen billing | Provider-agnostic power users and self-hosters | Fast patch train on provider contracts; community wants TUI as an extension host |
| **Pi** | Extension UI events, web GUI with TUI parity, in-tree providers (Tencent, DeepSeek V4 Flash Vision) | Harness builders and extension authors | Session runtime shared by TUI and web; “build your own permission UI” stance |
| **Qwen Code** | Named sessions in Channels, daemon/Web Shell, review-pipeline automation | Teams running a local daemon + web operator console | Productizing `qwen serve`: hot-reload models, trusted loopback, git/worktree in the shell |

**Short version:** Anthropic and Google are tightening **policy**. OpenAI is tightening **platform MCP** while users fight the **meter and Windows app**. GitHub is tightening **enterprise MCP login** while sessions melt. OpenCode/Pi/Qwen are tightening **provider + daemon + extension** surfaces for people who will not standardize on one lab.

## 5. Community Momentum & Maturity

- **Highest public tracker heat:** Codex (48/50/42 in 24h) and Claude (14-month #2511 still the north star; dense 2.1.245–251 train). These look like **mature products with unfinished product-surface integration**.
- **Fastest raw iteration:** Claude patch train (six versions in days), OpenCode four patches in the window, Qwen 0.22.2→0.22.3 plus nightlies (one nightly **failed**), Gemini stable/preview/nightly three-track.
- **Most “ops, not vibes” tracker:** Qwen — five issues, all daemon/CI/review. Momentum is maintainer-pipeline, not end-user debate.
- **Most extension-native energy:** Pi (web GUI parity PR closed, plugin catalog discussions, pi-verdict) and OpenCode (prompt coordinator, slash intercept, live subagents).
- **Most fragile at the edges:** Copilot long sessions and Windows; Codex Windows remote + quota trust; Claude background Bash and `[cyber]`/Fable 5 false positives; Gemini subagent hangs.

Maturity ranking by “can I leave this running all day on a shared box” is still **not** the same as star count or release cadence. Restricted modes and fail-closed trust are shipping; background subprocess APIs and Windows clients are not yet trustworthy.

## 6. Trend Signals

1. **The agent is becoming an OS, so isolation is the product.** Sibling scratchpads, shared MCP processes, FileWatch storms, and reconnect leaks are the 2026 failure mode. Teams evaluating CLIs should test **multi-agent + resume + idle overnight**, not hello-world edits.

2. **Hooks beat extra slash commands.** Model-switch gates, MCP result rewrite, OTel context, UI prompt start/end, and fail-closed MCP filter are the shared architecture. If you build internal agents, invest in hook contracts now; flag-only CLIs are already behind.

3. **Meters need a policy UI, not another percentage.** Claude’s `/cost` cache line, Codex’s weekly-vs-5-hour fight, Chronicle background drain, and OpenCode Zen/free mismatch all say the same thing: users will adopt third-party trackers until official accounting is inspectable **and** choosable (burst vs sustain).

4. **Windows + remote is the enterprise gate.** Missing “Control other devices,” Store headless launches, Git Bash backslash halving, PowerShell stderr-as-failure, Entra/WAM, GHEC tenant endpoints — labs that treat Windows as second-class will lose the seat that pays.

5. **Safety filters vs defensive security work is a market risk.** Claude `[cyber]`/Fable 5 on CVP-approved orgs, Gemini tightening trust while users want parent-dir reads, Codex Browser Use dying after a successful tab claim. Unattended agents need an **allow-listed security-work path**, or security teams will ban the tool.

6. **Reference value for builders**
   - Eval / shared CI box → Claude `--restricted` + Gemini fail-closed nightly.
   - MCP platform + ChatGPT-adjacent workflow → Codex 0.151.0, watch quota dashboards.
   - GitHub Enterprise + IdP → Copilot 1.0.81/82, but cap session length until FileWatch/OOM is fixed.
   - Multi-provider / self-host → OpenCode or Pi.
   - Daemon + web operator console + named long-running tasks → Qwen Channels / `qwen serve`.
   - Do not assume office binaries, secrets vaults, or Projects/RAG backends exist; those are still the highest-signal unmet requests across the category.

**Net for 2026-08-30:** the CLI layer is professionalizing around **hooks, restriction, MCP, and cost surfaces**. Community temperature is set by **trust in the meter, trust in background processes, and trust in Windows/remote** — not by the next model name in `/model`.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

I'll pull current GitHub details on the highest-attention PRs and issues so the ranking and status are accurate.# Claude Code Skills Community Highlights
**Source:** [anthropics/skills](https://github.com/anthropics/skills) · snapshot as of **2026-08-30**  
**Repo scale:** ~172.5k stars, ~20.5k forks. Official collection; community PRs are the submission path, Issues are proposals and defect reports.

PR comment counts in the provided snapshot are mostly unset, so ranking below mixes **Issue comment volume**, **cross-linked defect threads**, **review activity**, and **recency**. All listed PRs were still **OPEN** unless noted.

---

## 1. Top Skills Ranking

### 1. `skill-creator` eval harness (highest technical heat)
**PRs:** [#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050)  
**Issue:** [#556](https://github.com/anthropics/skills/issues/556) — 12 comments, 7 👍 · **OPEN**

`skill-creator` is the meta-skill for authoring other skills. `run_eval.py` (and `run_loop.py` / `improve_description.py`) was reporting **0% recall on every description**, so the description-optimization loop was fitting noise.

Discussion highlights: four independent root causes — eval artifact installed as a *command* (never enters the model-facing skills list), Windows `select.select()` / `claude.cmd` failures, trigger detector treating `TodoWrite`/`Glob`/`Bash` as a miss, and parallel workers racing on UUID copies. [#1298](https://github.com/anthropics/skills/pull/1298) is the most complete fix (real skill artifact, portable stream readers, shared artifact, `--max-turns`). Status: **open**, with several overlapping partial Windows fixes still open.

### 2. Namespace / trust-boundary security
**Issue:** [#492](https://github.com/anthropics/skills/issues/492) — **43 comments, 2 👍** · **OPEN**  
Highest-comment item in the snapshot.

Community skills were landing under `~/.claude/skills/anthropic/` with `Bash` and settings-write permissions. Users treat `anthropic/` as official provenance. Attack path called out: hook-builder writes `PostToolUse` hooks → arbitrary command after every tool use. Demand is for **namespace isolation, signed official skills, and marketplace provenance**, not a new domain skill.

### 3. Org-wide skill sharing
**Issue:** [#228](https://github.com/anthropics/skills/issues/228) — 16 comments, **8 👍** · **OPEN**

Highest thumbs-up product request: share skills inside an org without Slack + manual Settings upload. Signals that Skills have outgrown single-user install UX.

### 4. Document stack quality (`docx` / `pdf` / typography / ODT)
**PRs:** typography [#514](https://github.com/anthropics/skills/pull/514), PDF case-sensitivity [#538](https://github.com/anthropics/skills/pull/538), DOCX `w:id` collision [#541](https://github.com/anthropics/skills/pull/541), ODT [#486](https://github.com/anthropics/skills/pull/486)  
**Issue:** whitespace corruption [#12](https://github.com/anthropics/skills/issues/12) — still open after ~10 months.

Function: production document generation. Heat is **correctness**, not new features — widows/orphans, case-sensitive refs on Linux, OOXML ID collisions with bookmarks, Word-breaking whitespace. ODT is the only net-new format in this cluster.

### 5. Quality gates and meta-skills
**PRs:** self-audit [#1367](https://github.com/anthropics/skills/pull/1367), quality/security analyzers [#83](https://github.com/anthropics/skills/pull/83)  
**Issues:** reasoning-gate pipeline [#1385](https://github.com/anthropics/skills/issues/1385); skill-creator best-practice rewrite [#202](https://github.com/anthropics/skills/issues/202) (closed)

Direction: Skills that **audit other Skills and model output** — mechanical file existence first, then severity-ordered reasoning review. Community wants Skills as a QA layer, not only as task recipes.

### 6. Multi-agent orchestration — Hivemind
**PR:** [#1628](https://github.com/anthropics/skills/pull/1628) · **OPEN** (active review Aug 21–24)

Delegates grunt work to headless [opencode](https://opencode.ai) workers (scout / coder / tester) while Claude Code stays planner, reviewer, and merger. Workers return one JSON line so raw streams never enter the expensive context. Reviewers called the protocol strong; blocking nits (license frontmatter, `LICENSE.txt`, path under `skills/`) were addressed. Third-party free-model dependency is disclosed and is the remaining product question.

### 7. Platform / enterprise skills
**PRs:** ServiceNow [#568](https://github.com/anthropics/skills/pull/568) (open since March, last update Aug 12), SCNet HPC [#1615](https://github.com/anthropics/skills/pull/1615), testing-patterns [#723](https://github.com/anthropics/skills/pull/723), Pyxel retro games [#525](https://github.com/anthropics/skills/pull/525), frontend-design rewrite [#210](https://github.com/anthropics/skills/pull/210)

ServiceNow is the broadest “platform assistant” submission (ITSM through IntegrationHub). HPC and testing-patterns show the same pattern: **vertical runbooks**, not generic prompts.

### 8. Tooling reliability around official skills
**PRs:** mcp-builder eval serialization [#1602](https://github.com/anthropics/skills/pull/1602); claude-api retired model IDs [#1607](https://github.com/anthropics/skills/pull/1607)  
**Issues:** mcp-builder 0/N scores [#1390](https://github.com/anthropics/skills/issues/1390); `claude-api` injecting ~156k tokens [#1487](https://github.com/anthropics/skills/issues/1487); plugin duplicate skills [#189](https://github.com/anthropics/skills/issues/189) (9 👍)

Same theme as `skill-creator`: official helper skills that **do not work or blow the context window** get more attention than new creative skills.

---

## 2. Community Demand Trends (from Issues)

| Demand | Evidence | What people want |
|---|---|---|
| **Provenance & security** | [#492](https://github.com/anthropics/skills/issues/492) (43 comments), [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint ACL-in-SKILL.md | Namespace guarantees, no fake `anthropic/` paths, caution putting authz logic only in markdown |
| **Distribution / org library** | [#228](https://github.com/anthropics/skills/issues/228) (8 👍), [#189](https://github.com/anthropics/skills/issues/189) duplicates | First-class share links; stop shipping identical skills in two plugins |
| **Eval that actually measures trigger rate** | [#556](https://github.com/anthropics/skills/issues/556) + three PRs | A working description-optimization loop |
| **Output quality gates** | [#1385](https://github.com/anthropics/skills/issues/1385), [#1367](https://github.com/anthropics/skills/pull/1367), compact-memory [#1329](https://github.com/anthropics/skills/issues/1329) | Pre-task calibration → adversarial review → delivery verification; cheaper agent state |
| **Context-window hygiene** | [#1487](https://github.com/anthropics/skills/issues/1487) 156k-token inject | Lazy / progressive skill loading |
| **MCP as the skill API surface** | [#16](https://github.com/anthropics/skills/issues/16), mcp-builder [#1390](https://github.com/anthropics/skills/issues/1390) | Skills exposed as typed MCP tools; eval that talks to real servers |
| **Enterprise connectors** | ServiceNow [#568](https://github.com/anthropics/skills/pull/568), HPC [#1615](https://github.com/anthropics/skills/pull/1615), Bedrock [#29](https://github.com/anthropics/skills/issues/29) | Runbooks for existing platforms, not greenfield toys |
| **Document fidelity** | [#12](https://github.com/anthropics/skills/issues/12), [#514](https://github.com/anthropics/skills/pull/514), [#541](https://github.com/anthropics/skills/pull/541) | Generated Office files that Word will open |

Not prominent in this snapshot: generic “write more tests” or “write more docs” as standalone skills. Testing-patterns [#723](https://github.com/anthropics/skills/pull/723) exists, but the louder ask is **verify the agent’s own work**.

---

## 3. High-Potential Pending Skills

Likely to land or stay in active review:

1. **[#1298 skill-creator eval](https://github.com/anthropics/skills/pull/1298)** — unblocks every description-tuning workflow; fixes a 10+ reproduction bug. Highest leverage merge in the queue.
2. **[#1628 Hivemind](https://github.com/anthropics/skills/pull/1628)** — review already past blocking items; only policy question is third-party opencode workers.
3. **[#1602 / #1390 mcp-builder](https://github.com/anthropics/skills/pull/1602)** — eval harness currently scores 0/N against real MCP servers (`TextContent` not JSON-serializable). Same “harness is lying” class as #556.
4. **[#1607 claude-api retired IDs](https://github.com/anthropics/skills/pull/1607)** — small, correct, recently updated (Aug 26); easy merge.
5. **[#1367 self-audit](https://github.com/anthropics/skills/pull/1367)** + **[#1385](https://github.com/anthropics/skills/issues/1385)** — quality-gate family; complements Hivemind (plan/review vs. post-hoc audit).
6. **[#568 ServiceNow](https://github.com/anthropics/skills/pull/568)** — long-lived, still updating in August; if maintainers want an enterprise flagship, this is the candidate.
7. **[#1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615)** and **[#1595 UIZZE partner listing](https://github.com/anthropics/skills/pull/1595)** — narrow, recent (Aug 17–29), low merge risk if they match Partner Skills format.
8. **Document correctness trio** [#538](https://github.com/anthropics/skills/pull/538) / [#541](https://github.com/anthropics/skills/pull/541) / [#514](https://github.com/anthropics/skills/pull/514) — production bugs in bundled document skills; should ship independently of new-skill debate.

Less likely soon: [#486 ODT](https://github.com/anthropics/skills/pull/486) and [#525 Pyxel](https://github.com/anthropics/skills/pull/525) (niche), [#83 marketplace analyzers](https://github.com/anthropics/skills/pull/83) (stale since Jan).

---

## 4. Skills Ecosystem Insight

**The community’s concentrated demand is not “more task recipes” — it is a trustworthy Skill runtime: correct trigger/eval loops, provenance that cannot impersonate `anthropic/`, lazy context loading, and skills that orchestrate or audit other agents rather than only teaching one-shot procedures.**

---

I'll pull a bit more context from the repo and recent community chatter so the digest is accurate, then write the structured English summary from the data you provided.# Claude Code Community Digest — 2026-08-30

Repo: [anthropics/claude-code](https://github.com/anthropics/claude-code) · latest tag **v2.1.251** (28 Aug 2026)

## 1. This Week's Highlights

Anthropic shipped a dense late-August train through **v2.1.245–v2.1.251**: enterprise-safe **`--restricted`**, first-class **model-switch hooks**, richer **Remote Control** visibility for foreground subagents, and cost/cache surfaces (`/usage`, `/cost`). Community heat is still concentrated on a 14-month-old request to bind Claude Code to **claude.ai Projects knowledge bases** (#2511, 399 👍), while new reports pile up around **[cyber]/Fable 5 false positives**, **background Bash reliability**, and **Windows/macOS desktop window behavior**.

## 2. Releases

**[v2.1.251](https://github.com/anthropics/claude-code/releases/tag/v2.1.251)** (28 Aug) — latest  
- New hook events **`PreModelSwitch` / `PostModelSwitch`**: block, confirm, or annotate a model change. `SessionStart` resume hooks now receive **session staleness** and **estimated re-cache cost**.  
- **Live streaming** of a foreground subagent’s tool calls and results to Remote Control clients (background subagents still status-only).  
- Spend-limit bar on `/usage` plus `rate_limits.spend_limit` for Claude apps gateway.  
- Per-session **prompt-cache** line on `/cost` (hit ratio, misses, tokens re-cached, warm/cold).  
- `attach`, `logs`, `stop`, `respawn`, `rm` added to `claude --help`.  
- Security fixes: post-check **symlink swap** on file tools, plugin path traversal, project settings leaking beta tracing / raw API bodies, Workflow `scriptPath` read-before-permission.

**[v2.1.250](https://github.com/anthropics/claude-code/releases/tag/v2.1.250)** — bug fixes and reliability only.

**[v2.1.248](https://github.com/anthropics/claude-code/releases/tag/v2.1.248)** — **`--restricted`** / `CLAUDE_CODE_RESTRICTED=1`: strips command/code tools and `WebFetch` (unless named in `--tools`), confines file tools to the working directory, refuses `bypassPermissions`, ignores user/project/local settings. Aimed at eval harnesses and shared machines.

**[v2.1.247](https://github.com/anthropics/claude-code/releases/tag/v2.1.247)** — **`SendFeedback`** tool: Claude can draft a report for `/feedback` (`feedbackDrafts` to disable); richer `spinnerTipsOverride` schema.

**[v2.1.246](https://github.com/anthropics/claude-code/releases/tag/v2.1.246)** — startup warning for Bash allow rules with a wildcard *before* the subcommand (e.g. `Bash(git * main)`); Auto mode tab in `/permissions`.

**[v2.1.245](https://github.com/anthropics/claude-code/releases/tag/v2.1.245)** — startup crash on **glibc 2.44** (Arch, CachyOS, Fedora Rawhide).

## 3. Hot Issues

1. **[#2511 — Connect Claude Code to Claude.ai Projects](https://github.com/anthropics/claude-code/issues/2511)** · OPEN · 49 comments · 399 👍  
   Longest-running product request in the tracker: reuse Project knowledge bases (specs, docs, RAG) inside the CLI/Desktop agent. Still the community’s north-star integration; activity continues through 2026-08-30.

2. **[#65632 — Inline KaTeX `$...$` no longer renders](https://github.com/anthropics/claude-code/issues/65632)** · OPEN · 28 comments · 75 👍  
   Regression: only block `$$...$$` works. Painful for math-heavy and research workflows; high comment volume for a rendering bug.

3. **[#9631 — Microsoft Word `.docx` editing with track changes](https://github.com/anthropics/claude-code/issues/9631)** · OPEN · 26 comments · 31 👍  
   Legal/finance users cannot read, edit, or preserve Word revisions. Recurring “office-document first-class citizen” theme.

4. **[#29910 — Built-in secrets management](https://github.com/anthropics/claude-code/issues/29910)** · OPEN · 15 comments · 35 👍  
   No first-party vault; optional 1Password/Vault/cloud-secret integrations requested. Security-minded teams treat this as a blocker for unattended agents.

5. **[#15597 — Pass image file paths as strings, don’t embed](https://github.com/anthropics/claude-code/issues/15597)** · OPEN · 16 comments · 19 👍  
   Pasting a path auto-embeds the image. Users who want Claude to *operate on the path* (pipelines, vision-off, large assets) need a workaround.

6. **[#88093 — Windows Desktop always-on-top](https://github.com/anthropics/claude-code/issues/88093)** · OPEN · 11 comments · 19 👍  
   Sibling of closed macOS [#66516](https://github.com/anthropics/claude-code/issues/66516). Window manager fight is now a cross-platform Desktop complaint.

7. **[#84689 — CVP-approved org still blocked by cyber safeguards](https://github.com/anthropics/claude-code/issues/84689)** · OPEN · 17 comments  
   Org ID matches, appeal form empty. Same cluster as same-day [#90680](https://github.com/anthropics/claude-code/issues/90680) and [#90693](https://github.com/anthropics/claude-code/issues/90693): Fable 5 / `[cyber]` false positives on *defensive* security work.

8. **[#88755 — `/compact` re-bills the whole conversation as a cache write](https://github.com/anthropics/claude-code/issues/88755)** · OPEN · 6 comments  
   Advisor omitted from internal fork requests → compact billed as cold cache. Direct wallet impact; pairs with the new `/cost` cache line in 2.1.251.

9. **[#90659 — Background Bash reports exit 0 on failure](https://github.com/anthropics/claude-code/issues/90659)** · OPEN · created 29 Aug  
   `run_in_background: true` can lie about success. Dangerous for CI-style and multi-agent orchestration. Related: idle kill [#88071](https://github.com/anthropics/claude-code/issues/88071), Linux memory reaper [#78674](https://github.com/anthropics/claude-code/issues/78674).

10. **[#90450 — Auto Mode Bash-first silently disables nested `CLAUDE.md`](https://github.com/anthropics/claude-code/issues/90450)** · OPEN  
    Auto mode’s Bash-first instruction drops nested / path-scoped rules. Agents ignore project conventions without a visible error — a silent-policy class of bug.

**Also watched:** [#64615](https://github.com/anthropics/claude-code/issues/64615) `/rewind` default is destructive (closed, still searched); [#85856](https://github.com/anthropics/claude-code/issues/85856) Git Bash halves backslashes on Windows; [#87243](https://github.com/anthropics/claude-code/issues/87243) sibling subagents share one scratchpad; [#90683](https://github.com/anthropics/claude-code/issues/90683) hooks missing when project root ≠ repo root (closed same day).

## 4. Key PR Progress

1. **[#61720](https://github.com/anthropics/claude-code/pull/61720)** · OPEN · docs  
   Troubleshooting for Cowork queue delivering a message but spawning no follow-up turn (race vs rate-limit handler). Closes #61718.

2. **[#87079](https://github.com/anthropics/claude-code/pull/87079)** · OPEN · security  
   `**` glob patterns failed to match zero-depth / top-level files in `security-patterns.json` because `fnmatch` already treats `*` as crossing `/`. Silent non-coverage of security rules.

3. **[#89404](https://github.com/anthropics/claude-code/pull/89404)** · OPEN · plugin-dev  
   `validate-agent.sh` aborted on the first warning (`set -e` + `((x++))`) and false-flagged valid agents. Fixes #83803.

4. **[#13437](https://github.com/anthropics/claude-code/pull/13437)** · OPEN · hookify  
   Absolute `from hookify.core...` imports break because `PLUGIN_ROOT` already *is* the package root. Switch to relative imports.

5. **[#83374](https://github.com/anthropics/claude-code/pull/83374)** · OPEN · docs  
   Documents **`MessageDisplay`** streaming semantics in the bundled plugin-dev / Hook Development skill (missing from trigger table and event guidance).

6. **[#75252](https://github.com/anthropics/claude-code/pull/75252)** · CLOSED · docs  
   Clarifies plugin `mcpServers` is for *bundled* MCP definitions and is not the user-level allow/deny list in `~/.claude.json`.

7. **[#79898](https://github.com/anthropics/claude-code/pull/79898)** · CLOSED  
   Reference **Claude apps gateway on AWS + Bedrock** assets under `examples/gateway/aws/`, sibling to the existing GCP example.

8. **[#69226](https://github.com/anthropics/claude-code/pull/69226)** · CLOSED  
   Updates the frontend-design skill and bumps plugin version to 1.1.0 so installed copies pick up the change.

9. **[#83890](https://github.com/anthropics/claude-code/pull/83890)** · OPEN  
   Adds `pylint.yml` CI — small hygiene PR, still open.

10. **[#58673](https://github.com/anthropics/claude-code/pull/58673)** · OPEN  
    Title/body are a stub (`s`). Noise in the 24h update window; not actionable.

## 5. Hot Discussions

Omitted — no GitHub Discussions payload was provided.

## 6. Feature Request Trends

| Direction | Signal | Examples |
|---|---|---|
| **Claude.ai Projects as a knowledge backend** | Dominant (399 👍, 14 months open) | #2511 |
| **First-class office / binary docs** | Recurring enterprise ask | #9631 `.docx` + track changes |
| **Secrets as a platform primitive** | Security + unattended agents | #29910 |
| **Path-not-blob multimodal input** | Vision vs toolchain split | #15597 |
| **Remote / multi-host session provenance** | Ops for Remote Control | #73343 hostname in session UI |
| **Desktop session awareness** | Sidebar + context chrome | #83699, #85437 |
| **Governed model switching** | Now shipping as hooks | v2.1.251 `PreModelSwitch` / `PostModelSwitch` |
| **Eval-safe / locked-down runtime** | Now shipping | v2.1.248 `--restricted` |

Net: the product is adding **hooks, restriction modes, and cost telemetry**; the community still wants **product-surface integration** (Projects, Word, secrets) more than another CLI flag.

## 7. Developer Pain Points

- **Safety filters vs legitimate security work.** CVP-approved orgs and in-repo regression tests still trip `[cyber]` / Fable 5; recovery UI can **silently downgrade the model** (#84689, #90680, #90693).  
- **Background Bash is not a reliable subprocess API.** False exit 0, idle kills without `TaskStop`, and a Linux reaper that keys off `MemFree` instead of `MemAvailable` (#90659, #88071, #78674).  
- **Windows encoding + permissions.** Git Bash silently halves backslashes (#85856); scheduled tasks ignore “unattended” framing and ask every tool (#89632); Auto Mode drops nested `CLAUDE.md` (#90450).  
- **Cost accounting surprises.** `/compact` can rewrite the whole thread as a cache miss (#88755). 2.1.251’s cache line on `/cost` is the first honest counter.  
- **Agent isolation is weaker than the prompt claims.** Sibling subagents share one scratchpad (#87243); depth-2 completion notifications route to the root and get dropped on 2.1.250 (#90256).  
- **Hooks and settings load from “project root,” not `cwd`.** Start one directory above the repo and every hook is silently absent (#90683).  
- **Desktop polish debt.** Always-on-top (Win + historical macOS), freeze-then-vanish with no dump (#89679), context indicator bound to the wrong chat (#85437), Linux Cowork hang on `O_DIRECT` + ext4 `EINVAL` (#90359).  
- **macOS keychain loop.** “Claude Code-credentials” rewrite creates a partition mismatch; “Always Allow” never sticks (#87348).  
- **Destructive defaults.** `/rewind` (Esc Esc) restoring code *and* conversation without confirm remains a searched-for footgun even after #64615 closed.

**Upgrade note:** if you run rolling Linux (glibc 2.44), stay on **≥ 2.1.245**. If you drive Claude from an eval harness or shared box, start sessions with **`--restricted`**. If you automate model routing, wire **`PreModelSwitch`** before relying on `/model` or auto-fallback.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

I'll pull the latest Codex repo details so the digest matches what's actually shipping today.# OpenAI Codex Community Digest — 2026-08-30

Source: [github.com/openai/codex](https://github.com/openai/codex) · 48 issues, 50 PRs, and 42 discussions updated in the last 24 hours.

## 1. This Week's Highlights

Stable **Codex CLI 0.151.0** landed on Aug 29 with MCP-focused platform work: configurable discovery grace for optional servers, extension hooks that can inspect or replace MCP tool results before they reach the model, and plugin catalogs that merge per-repo config without dropping valid plugins when a marketplace is invalid.

On the product side, the community is louder about **quota accounting** and **Windows desktop reliability** than about new features. Weekly limits are being compared to the old 5-hour cap, a meta tracker now groups “quota vanished faster than local evidence” reports, and Windows users are still hitting missing Remote Connections UI, frozen thread history, headless post-update launches, and SSH/pairing failures.

## 2. Releases

**[rust-v0.151.0](https://github.com/openai/codex/releases/tag/rust-v0.151.0)** — latest stable (Aug 29)

New features
- Configurable grace period for discovering tools from optional MCP servers ([#41199](https://github.com/openai/codex/pull/41199))
- Extensions can inspect or replace MCP tool results before they reach the model ([#41202](https://github.com/openai/codex/pull/41202))
- Plugin catalogs combine per-repository configuration and report invalid project marketplaces without hiding valid plugins ([#41208](https://github.com/openai/codex/pull/41208))

Bug fixes
- Restored permission profiles survive TUI turns; `/cd` no longer weakens sandbox restrictions ([#41192](https://github.com/openai/codex/pull/41192))
- Tool availability and reasoning effort stay correct across model switches/fallbacks ([#41195](https://github.com/openai/codex/pull/41195), [#41206](https://github.com/openai/codex/pull/41206))
- Remote sandbox enforcement now uses the executor’s real home directory, OS, and path conventions ([#41196](https://github.com/openai/codex/pull/41196), [#41204](https://github.com/openai/codex/pull/41204), [#41207](https://github.com/openai/codex/pull/41207), [#41209](https://github.com/openai/codex/pull/41209))
- Structured MCP tool/resource errors preserved in app-server responses
- Nested subagent token usage counts toward root goal budgets ([#41183](https://github.com/openai/codex/pull/41183))
- Stale Guardian classifications no longer authorize actions after permission changes

**[rust-v0.150.1](https://github.com/openai/codex/releases/tag/rust-v0.150.1)**
- Remote compaction now counts retained images toward its token budget by default and trims older images as needed ([#41003](https://github.com/openai/codex/pull/41003))

Also shipped in the window: a dense alpha train (`0.151.0-alpha.7` through `alpha.12`, plus **[0.152.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.1)**). Those tags are thin release notes; the meaningful product surface is in 0.151.0.

## 3. Hot Issues

1. **[#28919](https://github.com/openai/codex/issues/28919) — Windows app missing “Control other devices”**  
   48 comments / 46 👍. Highest-engagement bug of the window. Pro users on Windows 10/11 cannot find Remote Connections in Settings, which blocks the phone-to-desktop workflow that already exists on other platforms. Same symptom is echoed in discussion [#40385](https://github.com/openai/codex/discussions/40385).

2. **[#33685](https://github.com/openai/codex/issues/33685) — Weekly limit drains like the old 5-hour cap**  
   29 comments / 17 👍. Users on GPT-5.5 High report that after the 5-hour meter disappeared, weekly quota falls at roughly the same cadence as the old short window. This is the clearest “limits feel worse, not better” thread.

3. **[#41220](https://github.com/openai/codex/issues/41220) — Meta tracker: abnormal quota depletion**  
   Cross-report hub for “used more than local tokens / dashboard / credits would predict.” Ties together Plus, Pro, Business Premium, CLI, Desktop, and Bedrock reports. New same-day examples: [#41468](https://github.com/openai/codex/issues/41468) (GPT-5.6 Sol High burned ~60% of a Plus 5-hour window in ~6 minutes) and [#41625](https://github.com/openai/codex/issues/41625) (`v0.151.0`, Business Premium, “usage gone very fast”).

4. **[#39280](https://github.com/openai/codex/issues/39280) — macOS Chrome tabs claimable, every real action fails policy**  
   Browser Use can list profiles and claim tabs, then rejects every real-page action on policy verification. Browser automation is advertised; this makes the macOS path look half-wired.

5. **[#40611](https://github.com/openai/codex/issues/40611) — Login/logout loop after Advanced Account Security**  
   20x Pro user enrolled in Advanced Account Security (to keep Daybreak Blue) and the desktop app became unusable. Auth regressions that lock paying users out of the app rank above ordinary UI bugs.

6. **[#41079](https://github.com/openai/codex/issues/41079) / [#41566](https://github.com/openai/codex/issues/41566) — Paginated thread history freezes on duplicate ordinal**  
   Windows Desktop shows a stale snapshot while the canonical rollout JSONL is complete. [#41566](https://github.com/openai/codex/issues/41566) describes the same family: a duplicate ordinal after an unfinished turn permanently stalls history projection. Data is not deleted; the UI just stops catching up.

7. **[#30639](https://github.com/openai/codex/issues/30639) — Chronicle background screen summaries drain plan limits**  
   macOS Chronicle / `SkyComputerUseService` records and summarizes the screen every ~10 minutes. Disabling the feature does not immediately stop capture. Silent background compute is now treated as a quota bug, not a “nice extra.”

8. **[#22965](https://github.com/openai/codex/issues/22965) — Remote SSH to native Windows still needs hidden CLI/Bash setup**  
   Long-running remote-host issue (opened May). Desktop Remote SSH to a Windows host still fails at the app-server proxy even after unofficial CLI bootstrap. Related: [#37925](https://github.com/openai/codex/issues/37925) Android pairing fails after unlinking a phone.

9. **[#41540](https://github.com/openai/codex/issues/41540) / [#41523](https://github.com/openai/codex/issues/41523) — Windows post-update headless launch**  
   Store build `26.825.5331.0`: Application Protected `node_repl.exe` relocation failure (`0x80071770`) starts the app headless; auto-update can leave `MainWindowHandle=0`. First-launch-after-update is broken on multiple machines.

10. **[#40524](https://github.com/openai/codex/issues/40524) — Let Plus users choose how weekly quota is consumed**  
    9 👍 enhancement. Users want to pick burst-vs-sustain (restore 5-hour, stay weekly-only, or split). This is the constructive counterpart to the quota-drain bugs: even if accounting is fixed, people want a policy control.

Honorable mentions: Windows hooks never fire `PreToolUse` ([#24453](https://github.com/openai/codex/issues/24453)); `PostToolUse` has no failure signal and `PostToolUseFailure` never fires ([#34289](https://github.com/openai/codex/issues/34289)); Linux seccomp `sendto` deny still breaks asyncio / connected Unix sockets ([#24933](https://github.com/openai/codex/issues/24933), [#33793](https://github.com/openai/codex/issues/33793)); floating pets go click-through ([#41513](https://github.com/openai/codex/issues/41513)); DWM compositor stutter survives app close ([#40531](https://github.com/openai/codex/issues/40531)).

## 4. Key PR Progress

Almost all high-velocity PRs in the last 24h are closed `copyberry[bot]` landings on the Rust core / TUI / app-server. Ten that change product behavior:

1. **[#41630](https://github.com/openai/codex/pull/41630) — `update_plan` default-on tests**  
   Covers enabled / disabled / default states and keeps prompt tool lists stable when custom base/developer instructions are set.

2. **[#41586](https://github.com/openai/codex/pull/41586) + [#41613](https://github.com/openai/codex/pull/41613) — Vim search motions in the composer**  
   Draft-local `/` and `?`, wrapped `n`/`N`, and search-after-delete/change/yank. Tests moved next to the history-search module.

3. **[#41567](https://github.com/openai/codex/pull/41567) — Restore thread cwd from owned settings snapshots**  
   Resume without an explicit `cwd` now restores that thread’s latest retained setting, instead of inheriting a forked or compacted neighbor.

4. **[#41562](https://github.com/openai/codex/pull/41562) — Preserve turn lineage across goal continuations**  
   Automatic goal continuations stay attributed to the turn that created the goal, even when hooks or later edits muddy metadata.

5. **[#41467](https://github.com/openai/codex/pull/41467) — Refresh TUI model picker from the app server**  
   Picker no longer opens on a stale startup catalog; it fetches the live account model list while showing cached choices.

6. **[#41457](https://github.com/openai/codex/pull/41457) + [#41461](https://github.com/openai/codex/pull/41461) — Model-catalog-sourced agent copy**  
   Proactive multi-agent instructions and async user-message descriptions now come from the active model catalog, with built-in fallbacks.

7. **[#41456](https://github.com/openai/codex/pull/41456) — App targets in executor plugin hooks**  
   Curated remote Browser plugin `Stop` / `SubagentStop` hooks are admitted when `browser.turn_ended` matches policy.

8. **[#41454](https://github.com/openai/codex/pull/41454) — Block goals after repeated exec-host failures**  
   Three qualifying failed `exec` turns block the goal; any successful tool resets the streak.

9. **[#41447](https://github.com/openai/codex/pull/41447) — `openai/elicitation` form requests**  
   Clients that declare an object-valued `form` capability get first-class elicitation forms, not a derived `openai/form` leftover.

10. **[#41436](https://github.com/openai/codex/pull/41436) — Answer terminal queries from TTY subprocesses**  
    Device-status, window-size, cursor-position, and DEC private-mode queries from PTY children get bounded replies so tools stop hanging on terminal probes.

Also worth tracking: diagnostic upload hardening ([#41569](https://github.com/openai/codex/pull/41569)), permission-preserving session metadata updates ([#41464](https://github.com/openai/codex/pull/41464)), code-mode host duration metrics ([#41452](https://github.com/openai/codex/pull/41452)), and Bazel/`rules_rs` release-platform cleanup ([#41476](https://github.com/openai/codex/pull/41476), [#41477](https://github.com/openai/codex/pull/41477)).

## 5. Hot Discussions

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200) — Remote-control Codex from the ChatGPT app** (45 comments / 190 👍)  
  Still the highest-signal product request in the repo: headless daemon on the workstation, first-class mobile control, without Tailscale + SSH as the official path. Directly maps onto the Windows “Control other devices” outage.

- **[#12567](https://github.com/openai/codex/discussions/12567) — Memories in Codex**  
  OpenAI-adjacent thread asking how aggressively Codex should cite prior threads. Related user proposal: persistent transferable experience memory ([#38021](https://github.com/openai/codex/discussions/38021)).

- **[#40291](https://github.com/openai/codex/discussions/40291) — Fixed-price high-usage individual plan**  
  Power users want a fair-use unlimited tier so they stop planning work around meters. Same cluster as “5-hour limit is back” ([#40707](https://github.com/openai/codex/discussions/40707)) and Plus quota-choice [#40524](https://github.com/openai/codex/issues/40524).

- **[#40384](https://github.com/openai/codex/discussions/40384) — Prompt queue / drafts that do not steer**  
  Queue follow-ups while a turn is running without injecting them as steer messages. Pairs with issue [#16681](https://github.com/openai/codex/issues/16681) (edit/remove pending steers).

- **[#25630](https://github.com/openai/codex/discussions/25630) — Switch accounts in-app**  
  Small UX request with outsized operational value for people who rotate accounts when credits run out.

### Q&A
- **[#31522](https://github.com/openai/codex/discussions/31522) — Does toggling Fast Speed invalidate prompt cache?**  
  Practical cost question for skills-heavy workflows.

- **[#8338](https://github.com/openai/codex/discussions/8338) — Forking CLI + “Sign in with ChatGPT” ToS**  
  Still open: can a personal UX fork keep ChatGPT auth?

- **[#40385](https://github.com/openai/codex/discussions/40385) — Windows Connections tab missing**  
  User-facing duplicate of #28919.

- **[#41623](https://github.com/openai/codex/discussions/41623) — Bedrock GPT-5.6 Sol usage underreported**  
  Filed as a discussion because issue creation is restricted; asks maintainers to promote it to a bug. Another telemetry-trust data point.

### Show and tell
Community tooling is clustering around **usage visibility**, **workspace hygiene**, and **multi-agent coordination**:
- [Enkidu for macOS](https://github.com/openai/codex/discussions/40272) — verified usage tracking and work planning
- [CodexFuse 1.2.0](https://github.com/openai/codex/discussions/41157) — local Windows rate-limit dashboard
- [Codex Command Center](https://github.com/openai/codex/discussions/41555) — Windows workspace for projects/sessions/Git
- [WorkGround2](https://github.com/openai/codex/discussions/41033) — local-first workbench over the official CLI
- [LikeMinds](https://github.com/openai/codex/discussions/40840) — coordinate separate Codex agents without the human as the bus
- [Click](https://github.com/openai/codex/discussions/41319) — plugin that stops repeated planning / over-verification
- [CtxWise](https://github.com/openai/codex/discussions/39516) and [Harness Lens](https://github.com/openai/codex/discussions/40309) — audit which rules, skills, hooks, and memory will actually bind a workspace

## 6. Feature Request Trends

1. **First-class remote control** — daemon mode + ChatGPT mobile as the remote, plus a visible Windows “Control other devices” surface. [#9200](https://github.com/openai/codex/discussions/9200), [#28919](https://github.com/openai/codex/issues/28919)
2. **Predictable, user-controlled quotas** — choose 5-hour vs weekly spend, a high-usage flat plan, and dashboards that match local token evidence. [#40524](https://github.com/openai/codex/issues/40524), [#40291](https://github.com/openai/codex/discussions/40291)
3. **Session memory that is inspectable** — cite prior threads, transfer experience across projects, lock acceptance criteria across ChatGPT↔Codex handoffs. [#12567](https://github.com/openai/codex/discussions/12567), [#38021](https://github.com/openai/codex/discussions/38021), [#40290](https://github.com/openai/codex/discussions/40290)
4. **Steer/prompt queueing** — draft the next instruction without applying it, and edit/delete pending steers. [#40384](https://github.com/openai/codex/discussions/40384), [#16681](https://github.com/openai/codex/issues/16681)
5. **Account and session ergonomics** — in-app account switch, named sessions that `--resume` can create ([#41619](https://github.com/openai/codex/discussions/41619)), restore “Open with Code Editor.”
6. **Hook completeness** — Windows `PreToolUse`, failure discriminators on `PostToolUse`, and `PostToolUseFailure` that actually fires.

## 7. Developer Pain Points

- **Quota is not trusted.** Local rollouts, cached-token mixes, Bedrock telemetry, Chronicle, and ambient desktop suggestions all disagree with the meter. Users now keep third-party trackers (Enkidu, CodexFuse) because the official percentage is not actionable.
- **Windows is the weak client.** Missing remote-control UI, headless launches after Store updates, frozen paginated history, click-through pets, DWM stutter, SSH to native Windows, Android re-pairing, and hooks that never emit. Several of these are months old and still open.
- **Background features spend like foreground work.** Chronicle screen summaries and desktop “suggestions” consume weekly quota even when the user is idle or thinks the feature is off.
- **Remote / multi-agent state machines leak.** Stale subagents resurrect as Running ([#37876](https://github.com/openai/codex/issues/37876), [#35209](https://github.com/openai/codex/issues/35209)); mobile continuation can downgrade a full-access desktop session ([#30485](https://github.com/openai/codex/issues/30485)); thread projection stalls on duplicate ordinals.
- **Sandbox still surprises systems programmers.** Restricted Linux seccomp denying `sendto` breaks connected Unix sockets and Python asyncio wakeups — a class of failure that looks like “my program hung” rather than a policy miss.
- **Auth and policy gates fail closed in opaque ways.** Advanced Account Security login loops; macOS Browser Use dies on policy verification after a successful tab claim.

**Net:** the CLI core is shipping real MCP/extension/sandbox hardening in 0.151.0, but the community temperature on 2026-08-30 is set by **metering trust** and **Windows/remote desktop completeness**, not by the release notes.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

I'll pull the latest repo activity and discussions so the digest matches today's GitHub state.# Gemini CLI Community Digest — 2026-08-30

Repo: [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · Latest stable: [v0.57.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0) · Latest nightly: [v0.59.0-nightly.20260830](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260830.g0bd1d4397)

## 1. This Week's Highlights

Security and trust hardening landed on the nightly line: fail-closed workspace trust with MCP server filtering in restricted mode, plus an SSRF fix in MCP OAuth metadata discovery. Stable **v0.57.0** and preview **v0.58.0-preview.0** focused on IDE/OAuth reliability, sandbox isolation on macOS, write-policy safety checkers, and history/retry behavior. Community heat remains on subagents (hangs, MAX_TURNS reported as GOAL success, unused skills) and the living public roadmap.

## 2. Releases

**Stable — [v0.57.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0)** (2026-08-25)  
Cloud Workstations OAuth redirect URI fix, IDE directory-mismatch repair, capacity-error retries with availability TTL, multi-turn rollback on abort, git env / workspace-state normalization, plus a large SSR-agent issue sweep (TUI hang timeouts, subagent handoff tokens, privacy copy, `/clear` docs). Eval tooling gained validation and tool-call failure summaries. Changelog: [v0.56.0…v0.57.0](https://github.com/google-gemini/gemini-cli/compare/v0.56.0...v0.57.0).

**Preview — [v0.58.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0-preview.0)**  
Consistent symlink evaluation in ignore paths; Docker/container sockets isolated in macOS Seatbelt; A2A stale cancellation cleared on new turns; top-level write-policy safety checkers; history rollback / retry-nudge optimizations. Notes: [geminicli.com preview changelog](https://geminicli.com/docs/changelogs/preview/).

**Nightly (v0.59.0 line)**  
- [20260827](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260827.g3c311beac): prevent SSRF in MCP OAuth metadata discovery ([#29081](https://github.com/google-gemini/gemini-cli/pull/29081)).  
- [20260829](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260829.g0bd1d4397): fail-closed workspace trust; filter `mcpServers` in restricted mode ([#29099](https://github.com/google-gemini/gemini-cli/pull/29099)).  
- [20260830](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260830.g0bd1d4397): automated nightly bump ([#29129](https://github.com/google-gemini/gemini-cli/pull/29129)).

## 3. Hot Issues

1. **[#4191 Public Roadmap](https://github.com/google-gemini/gemini-cli/issues/4191)** — 20 comments, 99 👍. Living contribution map; still the highest-engagement tracker.  
2. **[#22323 Subagent MAX_TURNS reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1. `codebase_investigator` claims success after hitting turn limits, hiding interruptions.  
3. **[#21409 Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1. Deferring to the generalist agent can hang indefinitely; workaround is “don’t use subagents.”  
4. **[#19873 Zero-dep OS sandbox + bash affinity](https://github.com/google-gemini/gemini-cli/issues/19873)** — Design for Gemini-as-native-bash-user without giving up security.  
5. **[#22745 AST-aware file read/search/map](https://github.com/google-gemini/gemini-cli/issues/22745)** — Epic on whether AST tools cut turns and token noise.  
6. **[#21968 Skills/sub-agents underused](https://github.com/google-gemini/gemini-cli/issues/21968)** — Model rarely invokes custom skills unless explicitly told.  
7. **[#26525 Deterministic redaction / Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** — Transcripts reach the model before redaction; logging surface is too wide.  
8. **[#25166 Shell stuck on “Waiting input”](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1. Finished commands stay marked active.  
9. **[#21983 Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** — Linux desktop users blocked.  
10. **[#24246 400 error with >128 tools](https://github.com/google-gemini/gemini-cli/issues/24246)** — Tool-set size is not scoped before the API call.

Also active: Auto Memory inbox/retry bugs ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)), browser agent settings ignored ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), and agent self-awareness of flags/hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).

## 4. Key PR Progress

1. **[#29099](https://github.com/google-gemini/gemini-cli/pull/29099)** *(merged into nightly)* — Fail-closed workspace trust; filter MCP servers in restricted mode.  
2. **[#29081](https://github.com/google-gemini/gemini-cli/pull/29081)** *(merged)* — SSRF prevention on MCP OAuth discovery.  
3. **[#28915](https://github.com/google-gemini/gemini-cli/pull/28915)** — Consistent symlink evaluation in ignore paths.  
4. **[#28935](https://github.com/google-gemini/gemini-cli/pull/28935)** — Isolate Docker/runtime sockets in macOS Seatbelt.  
5. **[#28961](https://github.com/google-gemini/gemini-cli/pull/28961)** — Top-level write-policy safety checkers.  
6. **[#29125](https://github.com/google-gemini/gemini-cli/pull/29125)** — Hook timeout: Claude seconds → Gemini milliseconds (fixes [#29122](https://github.com/google-gemini/gemini-cli/issues/29122)).  
7. **[#29124](https://github.com/google-gemini/gemini-cli/pull/29124)** — Correct `SubagentStop` key in hooks migration (fixes [#29123](https://github.com/google-gemini/gemini-cli/issues/29123)).  
8. **[#29110](https://github.com/google-gemini/gemini-cli/pull/29110)** — Route `read_file` through `FileSystemService` for ACP remote FS.  
9. **[#29120](https://github.com/google-gemini/gemini-cli/pull/29120)** — Web-fetch destination validation + Undici bind-to-resolved-address.  
10. **[#28967](https://github.com/google-gemini/gemini-cli/pull/28967)** — Stop `clearTerminal` from wiping scrollback on static refresh (Linux).

Related: Claude-hooks parity, excludeTools docs ([#28966](https://github.com/google-gemini/gemini-cli/pull/28966)), skill-dir symlink dedupe ([#28968](https://github.com/google-gemini/gemini-cli/pull/28968)), eval suites for trackers/security bounds ([#28822](https://github.com/google-gemini/gemini-cli/pull/28822)–[#28824](https://github.com/google-gemini/gemini-cli/pull/28824)), silent preview-model substitution warning ([#28828](https://github.com/google-gemini/gemini-cli/pull/28828)).

## 5. Hot Discussions

### Announcements
- [Public Roadmap for Gemini CLI v1](https://github.com/google-gemini/gemini-cli/discussions) (pinned) — official v1 planning surface.  
- [Service update: mitigating abuse and prioritizing traffic](https://github.com/google-gemini/gemini-cli/discussions) (pinned, high vote count) — capacity / anti-abuse policy.

### Q&A / Support
- [Gemini 3.6 Flash Support](https://github.com/google-gemini/gemini-cli/discussions) — demand for newer Flash SKUs.  
- [How to give read_file access to parent folder?](https://github.com/google-gemini/gemini-cli/discussions) — workspace-trust vs. parent-dir reads.  
- [OAuth mode hangs on “Thinking…” while API key works](https://github.com/google-gemini/gemini-cli/discussions) — auth-path performance split.

### Ideas / Feedback
- [Better single-turn Aider-inspired features](https://github.com/google-gemini/gemini-cli/discussions/14181) — pin `@files`/`@folders` across `/clear`.  
- [Complaints from a Google AI Pro subscriber](https://github.com/google-gemini/gemini-cli/discussions/24725) and [A Feedback to Google Thread](https://github.com/google-gemini/gemini-cli/discussions/25448) — stalls, silent model downgrades, paid-tier reliability.  
- Capacity / “Server Limit Exceeded” threads remain a recurring theme ([#21075](https://github.com/google-gemini/gemini-cli/discussions/21075)).

### Show and tell
- WorkPaper MCP, Semble hooks / semantic code search, SPAE as a lighter CONDUCTOR alternative — community extensions clustering around MCP and prompt-context injection.

## 6. Feature Request Trends

- **Subagent observability and honesty** — surface trajectories (`/chat share`), include subagent context in `/bug`, stop labeling MAX_TURNS as GOAL.  
- **Native-tool / AST / bash-first workflows** — OS sandbox + POSIX chaining; AST-aware read/search/map.  
- **Skills & local agents** — auto-invoke skills; treat symlinked `~/.gemini/agents/*.md` as first-class; Claude-hooks migration fidelity.  
- **Safer I/O policy** — write-policy checkers, excludeTools by exact name, parent-folder reads under trust, ACP `FileSystemService` for remote clients.  
- **Session UX** — pinned files (Aider-style), flicker-free resize, don’t clear terminal scrollback, visible preview-model substitution.  
- **Memory hygiene** — deterministic redaction before model context; quarantine invalid inbox patches; stop retrying low-signal sessions.

## 7. Developer Pain Points

- **Hangs and false success** — generalist/browser agents freeze; shell stays on “Awaiting user input”; turn limits reported as completed goals.  
- **Interactive / platform friction** — Vite-style prompts stall the agent; Wayland browser agent; terminal flicker/scrollback wipes on Linux.  
- **Auth and capacity** — OAuth slower than API keys; 429 / “no capacity”; silent fallback from preview models.  
- **Tool-surface explosion** — 128+ tools → HTTP 400; skills not used unless prompted; tmp scripts scattered across the tree.  
- **Trust vs. power** — users want parent-dir reads and MCP, maintainers are tightening fail-closed trust, SSRF, and sandbox sockets.  
- **Migration gaps** — Claude hook event names and timeout units drop or mis-scale during `gemini hooks migrate`.

---

*Sources: [Releases](https://github.com/google-gemini/gemini-cli/releases), issue/PR activity in the last 24h, [Discussions](https://github.com/google-gemini/gemini-cli/discussions), [preview changelog](https://geminicli.com/docs/changelogs/preview/).*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

I'll pull a bit of live repo context so the digest matches current Copilot CLI activity, then write the structured summary from the data you provided.# GitHub Copilot CLI Community Digest — 2026-08-30

Source: [github/copilot-cli](https://github.com/github/copilot-cli)

## 1. This Week's Highlights

v1.0.82 shipped after a dense 1.0.81 cycle that opened the plugins dashboard to everyone, landed MCP 2026-07-28 support, added OpenTelemetry-aware hooks, and improved Windows Entra ID / WAM login for remote MCP. The new patch release is smaller and more surgical: worktree/move no longer drops a typed message mid-switch, plan approval can be re-expanded with Ctrl+E, and auth failures now surface the real error (for example `401 Bad credentials`) instead of a generic `/login` prompt. Community heat is concentrated on long-session stability (FileWatch loops, heap OOM on resume), TUI freezes when parallel subagents spawn, and MCP/OAuth regressions after 1.0.79–1.0.81.

## 2. Releases

**[v1.0.82](https://github.com/github/copilot-cli/releases/tag/v1.0.82)** (2026-08-29) — current latest

- A message typed while `/worktree` or `/move` is preparing the worktree no longer breaks the switch into it.
- Ctrl+E expands the plan approval card to show the full plan again.
- Authentication failures now show the specific error (such as `401 Bad credentials`) instead of only the `/login` prompt.

Related prereleases in the last 24h: [v1.0.82-2](https://github.com/github/copilot-cli/releases/tag/v1.0.82-2), [v1.0.82-1](https://github.com/github/copilot-cli/releases/tag/v1.0.82-1), [v1.0.82-0](https://github.com/github/copilot-cli/releases/tag/v1.0.82-0) staged the same fixes.

**[v1.0.81](https://github.com/github/copilot-cli/releases/tag/v1.0.81)** (2026-08-27) — still the feature-heavy baseline

- Plugins dashboard is available to everyone via `/plugin`, `/mcp`, or `/skills` (`PLUGINS_DASHBOARD=false` to opt out).
- MCP 2026-07-28 support across CLI, SDK, IDE, and in-memory clients.
- Hooks can receive current OpenTelemetry context (`traceparent` / `tracestate`) and emit correlated spans.
- Windows remote MCP servers behind Microsoft Entra ID can sign in through the OS WAM broker.
- Large-session resume shows recent history first; `/model` now surfaces data-retention warnings; enterprise-blocked MCP servers appear as blocked instead of spinning forever.

## 3. Hot Issues

1. **[#4612 Runaway FileWatch loop freezes TUI and grows debug log to 13 GB](https://github.com/github/copilot-cli/issues/4612)** — Open, 7 comments. Long-running or resumed sessions can enter a tight `FileWatch` host-event loop. The TUI dies while the debug log explodes; this is the highest-severity stability report of the window.

2. **[#4480 Atlassian MCP OAuth fails with RFC 8414 issuer mismatch on 1.0.79+](https://github.com/github/copilot-cli/issues/4480)** — Closed, 7 comments, 6 👍. Regression from 1.0.71; remote Atlassian MCP OAuth discovery rejects the advertised issuer. Closed after investigation, but it remains the most-reacted MCP auth thread.

3. **[#4535 `store_memory` fails in 1.0.81 prereleases: `Instance id is required`](https://github.com/github/copilot-cli/issues/4535)** — Open, 7 comments. Native memory writer is invoked without an instance ID, so memory persistence is broken on the prerelease channel.

4. **[#4165 `copilot --resume` hangs at “Resuming session” on Windows cold start](https://github.com/github/copilot-cli/issues/4165)** — Open, 4 comments. PowerShell cold start never becomes interactive; the same session resumes if opened another way. Still active as of 2026-08-29.

5. **[#4533 TUI stops consuming events when a turn launches parallel subagents](https://github.com/github/copilot-cli/issues/4533)** — Open, 4 comments. Input and scroll go dead while the Rust runtime keeps running. Breaks trust in multi-agent turns.

6. **[#4027 Tool `str_replace` does not exist](https://github.com/github/copilot-cli/issues/4027)** — Open, 13 👍. Highest reaction count in this set. Java edits frequently print a missing-tool error then fall back to another edit path.

7. **[#2369 Unable to scroll long results](https://github.com/github/copilot-cli/issues/2369)** — Closed, 4 👍. Classic TUI complaint (mouse, touchpad, no scrollbar). Updated again on 2026-08-30, so the pain is still visible even after close.

8. **[#1392 OmniSharp LSP initialize timeout on large C# solutions](https://github.com/github/copilot-cli/issues/1392)** — Open, 5 👍. Default LSP init timeout is too short; users want a configurable `initializeTimeout`.

9. **[#4527 `copilot -p` 401 on GHEC data residency since 1.0.81-1](https://github.com/github/copilot-cli/issues/4527)** — Open, 4 👍. Prompt mode fetches the model catalog from `api.githubcopilot.com` instead of the tenant endpoint. Interactive mode works; headless/CI does not.

10. **[#4664 Heap OOM when resuming a long-standing session](https://github.com/github/copilot-cli/issues/4664)** / **[#4639 Event-storage exhaustion retry storm → GC loop and Node OOM](https://github.com/github/copilot-cli/issues/4639)** — Both open, filed in the last few days. Together they describe the same class of failure: large sessions plus remote event storage blow up memory before the user can keep working.

Honorable mentions updated in-window: [#4647 chroma-mcp broken on 1.0.81](https://github.com/github/copilot-cli/issues/4647), [#4660 ADO remote MCP OAuth fails under the new WAM path](https://github.com/github/copilot-cli/issues/4660), [#4655 Agent Plugins 1.0 custom agents not discovered](https://github.com/github/copilot-cli/issues/4655), [#2930 local auto-memory without remote storage](https://github.com/github/copilot-cli/issues/2930).

## 4. Key PR Progress

Only six PRs were updated in the last 24 hours; several are low-signal. The meaningful ones:

1. **[#2381 install: add fish shell support for PATH configuration](https://github.com/github/copilot-cli/pull/2381)** — Closed. Fish users were written into `~/.profile` with POSIX `export` syntax, which Fish neither sources nor understands. Real installer fix for a silent onboarding failure.

2. **[#4497 Handle fork PR associations in invalid-label writer](https://github.com/github/copilot-cli/pull/4497)** — Closed. Trusted invalid-label writer now recovers when GitHub omits the PR association on fork workflow runs, requiring exactly one matching open PR.

3. **[#4607 Prepare public prerelease v1.0.81-11](https://github.com/github/copilot-cli/pull/4607)** — Closed. Release-train housekeeping before publishing 1.0.81-11 (WAM MCP login and resume/telemetry fixes landed in that train).

4. **[#4659 Initial commit with exported changes from codespace](https://github.com/github/copilot-cli/pull/4659)** — Open. Unscoped codespace dump; treat as noise unless maintainers request changes.

5. **[#4610 Update README.md](https://github.com/github/copilot-cli/pull/4610)** — Open. Empty summary; low-signal docs PR.

6. **[#4573 Rename README.md to README.mdmain](https://github.com/github/copilot-cli/pull/4573)** — Open. Unlikely to merge; looks accidental.

There were not 10 substantive PRs in the 24h window. Product movement is happening in the release train, not in public feature PRs.

## 6. Feature Request Trends

- **Local / private memory.** [#2930](https://github.com/github/copilot-cli/issues/2930) and the broken `store_memory` path in [#4535](https://github.com/github/copilot-cli/issues/4535) show demand for agent-initiated memory that does not depend on remote Copilot Memory.
- **Folder-level `.agents` discovery.** [#4204](https://github.com/github/copilot-cli/issues/4204) wants instructions, agents, and hooks discovered in any opened folder, not only Git repos.
- **Plugin and custom-agent discovery that actually works.** [#4655](https://github.com/github/copilot-cli/issues/4655) and [#4556](https://github.com/github/copilot-cli/issues/4556) ask for Agent Plugins 1.0 agents and server-managed marketplaces to register instead of failing silently.
- **Enterprise / GHEC correctness in headless mode.** [#4527](https://github.com/github/copilot-cli/issues/4527) and [#4666](https://github.com/github/copilot-cli/issues/4666) want tenant endpoints and hostname-aware account footers.
- **Configurable LSP timeouts** for large solutions ([#1392](https://github.com/github/copilot-cli/issues/1392)).
- **Permission UX that matches documented intent.** `/allow-all` still prompting for bash ([#2955](https://github.com/github/copilot-cli/issues/2955)) and edit-permission timeouts ([#4486](https://github.com/github/copilot-cli/issues/4486)).

## 7. Developer Pain Points

- **Long sessions are fragile.** FileWatch event storms, event-storage retry loops, and V8 heap OOM on resume are the dominant reliability theme. Users who leave Copilot CLI running all day are the ones hitting it.
- **TUI and Windows remain the sharp edges.** Frozen input during parallel subagents, contrast failures mid-session ([#4648](https://github.com/github/copilot-cli/issues/4648)), resume hangs, sandbox “unsupported host” on Windows 25H2 ([#4652](https://github.com/github/copilot-cli/issues/4652)), and historical stdio/`npx` spawn issues.
- **MCP auth is still a moving target.** Atlassian issuer mismatch, ADO + WAM failures, chroma-mcp breakage on 1.0.81, and enterprise-blocked servers that used to spin forever.
- **Tooling contract drift.** Models call `str_replace` when the tool is not present; hook `sessionStart` additionalContext is duplicated every turn and leaked into subagents ([#4665](https://github.com/github/copilot-cli/issues/4665)).
- **Context cost reporting is misleading.** `/context` “MCP Tools” still reports undeferred schema footprint rather than what the model actually receives ([#4189](https://github.com/github/copilot-cli/issues/4189)).

**Net read for maintainers:** ship the 1.0.82 UX/auth polish, then prioritize session-runtime isolation (FileWatch, event export, resume memory) and MCP OAuth compatibility. Those two buckets are generating more comments than new feature requests.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

I'll pull a few official pages so the digest matches current release notes and issue context.# OpenCode Community Digest — 2026-08-30

Source: [anomalyco/opencode](https://github.com/anomalyco/opencode)

## 1. This Week's Highlights

OpenCode shipped four patch releases through **v1.18.25**, focused on provider correctness: Azure CLI / Entra ID login without Bun, Bedrock reasoning cache replay, Cloudflare AI Gateway routing, and OpenAI-compatible payload hygiene. Community heat remains on **billing/auth mismatches** (paid Zen still hitting free limits, `INFERENCE_ACCESS_BLOCKED` with a positive balance), **CPU/MCP process blow-ups** on long sessions and `serve` reconnects, and **TUI plugin power** (prompt control, slash-command intercept, live subagents). Maintainers and contributors also landed a dense set of v2 protocol and session-recovery fixes.

## 2. Releases

Four core patches landed in the last 24h window of provided data:

- **[v1.18.25](https://github.com/anomalyco/opencode/releases/tag/v1.18.25)** — Azure CLI sign-in no longer requires Bun.
- **[v1.18.24](https://github.com/anomalyco/opencode/releases/tag/v1.18.24)** — Bedrock reasoning no longer caches into unreplayable empty messages; Azure Entra ID via Azure CLI; V1 reads supported V2 config fields; Desktop immediately drops archived sessions from Home.
- **[v1.18.23](https://github.com/anomalyco/opencode/releases/tag/v1.18.23)** — Cloudflare AI Gateway REST routing for third-party models; Anthropic dotted IDs mapped to dashed slugs; parent session IDs in headers; GitHub auth for immutable OIDC tokens.
- **[v1.18.22](https://github.com/anomalyco/opencode/releases/tag/v1.18.22)** — Removed outdated Go first-month discount copy; device-login links with relative URLs / base paths; stop sending `textVerbosity` to providers that reject it; Bedrock compatibility; Desktop model-picker headers stay visible while scrolling.

## 3. Hot Issues

1. **[OpenCode is heavily CPU-bound (#21470)](https://github.com/anomalyco/opencode/issues/21470)** — Open, 16 comments, 17 👍. Long Gemini sessions spend most wall time inside OpenCode itself (1.5+ CPU hours cited), not waiting on APIs. Highest-signal performance thread; still active months after filing.

2. **[credit card declined (#33264)](https://github.com/anomalyco/opencode/issues/33264)** — Closed, 20 comments, 5 👍. Highest comment count in the window. Billing friction remains a community magnet even after close.

3. **[Xcode 27 ACP ignores opencode.json / TUI model (#34743)](https://github.com/anomalyco/opencode/issues/34743)** — Open, 16 comments. ACP from Xcode 27 beta always falls back to `big-pickle` instead of LM Studio / Ollama config. Blocks IDE-native workflows.

4. **[Zen paid balance still hits FreeUsageLimitError (#33318)](https://github.com/anomalyco/opencode/issues/33318)** — Open, 11 comments. Paid credits do not lift the daily free cap. Recurring billing-trust issue.

5. **[Plugins intercept slash commands + custom dialogs (#28292)](https://github.com/anomalyco/opencode/issues/28292)** — Open, 10 comments. Asks for deterministic plugin command handling that skips the LLM. Core extensibility request.

6. **[Unlimited usage exploit via IP/VPN (#34344)](https://github.com/anomalyco/opencode/issues/34344)** — Open, 6 comments. Free-model limits keyed to IP can be reset with VPN rotation. Abuse + fairness risk for Zen/free tiers.

7. **[Live Subagents sidebar in TUI (#41249)](https://github.com/anomalyco/opencode/issues/41249)** — Open, 6 comments. Author already shipped an npm plugin; wants first-class TUI surface for spawned agents.

8. **[serve MCP children leak until OOM (#46035)](https://github.com/anomalyco/opencode/issues/46035)** — Open, 5 comments, filed against **1.18.25**. Web-client reconnects accumulate MCP subprocesses under systemd. Production-headless reliability bug.

9. **[mimo-v2.5 subagent infinite thinking loop (#42923)](https://github.com/anomalyco/opencode/issues/42923)** — Open, 4 comments. Subagents never finish, drain credits. Direct 2.0 multi-agent cost risk.

10. **[API inference blocked while catalog works (#46219)](https://github.com/anomalyco/opencode/issues/46219)** — Open, 3 comments, same-day. Valid keys + positive balance still get `INFERENCE_ACCESS_BLOCKED` / HTTP 401. Authz split between catalog and inference.

Also watched: TUI freeze / Tree-sitter crash ([#46203](https://github.com/anomalyco/opencode/issues/46203)), duplicated `system-reminder` blow-up ([#46217](https://github.com/anomalyco/opencode/issues/46217), [#46208](https://github.com/anomalyco/opencode/issues/46208)), Muse endpoint unavailable ([#43477](https://github.com/anomalyco/opencode/issues/43477)), China-hosted model opt-in 403 ([#46228](https://github.com/anomalyco/opencode/issues/46228)).

## 4. Key PR Progress

1. **[feat(tui): prompt transform coordinator (#46233)](https://github.com/anomalyco/opencode/pull/46233)** — Open. Host-owned deterministic prompt transforms; part of [#38962](https://github.com/anomalyco/opencode/issues/38962) (plugins cannot read/drive the prompt).

2. **[fix(app): global permission:allow in Settings toggle (#46226)](https://github.com/anomalyco/opencode/pull/46226)** — Open. Settings auto-accept now reflects `"permission": "allow"`.

3. **[feat(plugin): native Fireworks AI login (#46223)](https://github.com/anomalyco/opencode/pull/46223)** — Open. Built-in Fireworks Connect for `auth login` / `/connect`.

4. **[fix(app): encode server credentials as UTF-8 (#46225)](https://github.com/anomalyco/opencode/pull/46225)** — Open. Fixes `btoa()` breakage on non-ASCII server creds.

5. **[fix(core): bound ProjectCopy.refresh concurrency (#46214)](https://github.com/anomalyco/opencode/pull/46214)** — Closed. Stops unbounded git/stat fan-out on large repos (CPU thrash).

6. **[fix(core): defer FFF init on cold location (#46211)](https://github.com/anomalyco/opencode/pull/46211)** — Closed. Fast File Finder no longer blocks location acquire for 50s+ on monorepos.

7. **[fix(mcp): share identical MCP subprocesses across Locations (#46210)](https://github.com/anomalyco/opencode/pull/46210)** — Closed. Global MCP process pool; directly related to reconnect/OOM reports.

8. **[fix(ai): preserve forced reasoning signature (#46218)](https://github.com/anomalyco/opencode/pull/46218)** + **[preserve Responses reasoning state (#43362)](https://github.com/anomalyco/opencode/pull/43362)** — Closed. Reasoning continuation / replay-safe provider metadata.

9. **[fix(ai): fail malformed Bedrock Converse output (#46193)](https://github.com/anomalyco/opencode/pull/46193)** — Closed. Treat `malformed_model_output` / `malformed_tool_use` as errors instead of successful finish.

10. **[fix(app): recover sessions with unavailable locations (#46215)](https://github.com/anomalyco/opencode/pull/46215)** — Closed. Desktop/web get TUI-style location-recovery UI instead of a dead composer.

Other notable merges: reasoning-effort variants scoped per agent ([#46202](https://github.com/anomalyco/opencode/pull/46202)), shared timeline tool headers ([#46205](https://github.com/anomalyco/opencode/pull/46205)), desktop signing/terminal entitlement fix ([#46212](https://github.com/anomalyco/opencode/pull/46212)), Go/Hy3 docs cleanup ([#46221](https://github.com/anomalyco/opencode/pull/46221), [#46213](https://github.com/anomalyco/opencode/pull/46213)).

## 6. Feature Request Trends

- **TUI plugin runtime as a real API**: read/edit prompt, intercept slash commands without an LLM round-trip, register dialogs, live subagent sidebar ([#38962](https://github.com/anomalyco/opencode/issues/38962), [#28292](https://github.com/anomalyco/opencode/issues/28292), [#41249](https://github.com/anomalyco/opencode/issues/41249), [#46233](https://github.com/anomalyco/opencode/pull/46233), [#46220](https://github.com/anomalyco/opencode/issues/46220)).
- **Per-model / per-agent control**: compaction thresholds and compaction model selection ([#43703](https://github.com/anomalyco/opencode/issues/43703), [#44094](https://github.com/anomalyco/opencode/issues/44094)); reasoning-effort pinned on the agent, not the model ([#46202](https://github.com/anomalyco/opencode/pull/46202)).
- **Session-scoped terminals + model-visible terminal context** ([#43758](https://github.com/anomalyco/opencode/issues/43758)).
- **Ecosystem connectors**: Fireworks login, Telegram remote control, GitHub project-icon discovery ([#46223](https://github.com/anomalyco/opencode/pull/46223), [#46227](https://github.com/anomalyco/opencode/pull/46227), [#46229](https://github.com/anomalyco/opencode/issues/46229)).
- **IDE/ACP fidelity**: honor `opencode.json` and TUI-selected models when launched from Xcode ([#34743](https://github.com/anomalyco/opencode/issues/34743)).

## 7. Developer Pain Points

- **Billing vs. runtime authz drift**: paid Zen still capped as free; catalog 200 + inference 401; payment receipts that still show “No payment method”; regional model 403s that surprise users already in-region.
- **Process and CPU explosion**: FFF/git unbounded concurrency, MCP subprocesses multiplied per Location and per web reconnect, TUI/Tree-sitter freezes, mouse-as-keyboard console corruption on 1.18.25.
- **Context hygiene**: full `AGENTS.md` / `system-reminder` re-injected on every tool result until the window is thousands of duplicate blocks.
- **Agent loops that spend money**: mimo-v2.5 thinking never terminates; malformed provider XML hangs session reload; Muse upstream “endpoint unavailable.”
- **Windows / Desktop event backlog**: stale session-error toasts + sound replay on every launch.
- **Rate-limit design**: IP-keyed free-tier limits are trivially rotatable, undermining both product economics and fair-use enforcement.

No GitHub Discussions dataset was provided, so the Discussions section is omitted.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

I'll quickly verify the repo and latest release notes so the digest links and summaries are accurate.# Pi Community Digest — 2026-08-30
Source: [earendil-works/pi](https://github.com/earendil-works/pi)

## 1. This Week's Highlights
Pi shipped **v0.84.3** and **v0.84.4** in quick succession: Windows PowerShell execution, safer staged updates, terminal capability overrides, extension UI prompt events, and experimental DeepSeek V4 Flash Vision. The issue tracker is dominated by TUI streaming/layout regressions and long-session resource use, while PRs push provider coverage, session correctness, and a full-parity web GUI. Community energy is split between harness benchmarking and extension-first permission/provider workflows.

## 2. Releases
**[v0.84.4](https://github.com/earendil-works/pi/releases/tag/v0.84.4)** (2026-08-28)
- Terminal capability overrides for hyperlink / image / truecolor detection
- Extension `ui_prompt_start` / `ui_prompt_end` events so hosts can separate agent work from UI waits
- RPC `clear_queue` for steering and follow-up messages
- Fullscreen selection copy controls (`Ctrl+X`; optional disable auto-copy)
- Experimental DeepSeek V4 Flash Vision via the built-in DeepSeek provider
- Fixes: thinking-toggle wiping live Bash output, Windows abort crash when `taskkill.exe` is missing, JSONL resume corruption when files lack a trailing newline

**[v0.84.3](https://github.com/earendil-works/pi/releases/tag/v0.84.3)** (2026-08-24)
- Optional native **PowerShell tool** on Windows
- Safer managed updates (stage → verify → atomic activate)
- Follow-on Windows issues already appearing against the new PowerShell path (stderr-as-failure, console window flash)

## 3. Hot Issues
1. **[#8584](https://github.com/earendil-works/pi/issues/8584)** — TUI row corruption after long tool output (25 comments, 9 👍, OPEN)  
   Assistant text streams one word per line after wide tool dumps. Highest-engagement bug of the window; users hit it after `sed`/`cat` on large files.

2. **[#7730](https://github.com/earendil-works/pi/issues/7730)** — High CPU on macOS in long sessions (13 comments, 9 👍, OPEN)  
   50–110% CPU with 600–800 MB RSS; anecdotally tied to session length / context size. Serious for all-day agent use.

3. **[#3200](https://github.com/earendil-works/pi/issues/3200)** — Video/audio in `prompt` RPC (10 comments, 6 👍, OPEN)  
   Images already work; multimodal users want the same for video/audio so Gemma 4 / GPT-4o-class models can ingest media.

4. **[#8061](https://github.com/earendil-works/pi/issues/8061)** — Context budget ignores `maxTokens` reservation (3 comments, 2 👍, OPEN, in progress)  
   Requests fail at ~78% of a 1M window; compact-and-retry then fails the same way. Core reliability for huge-context models.

5. **[#8753](https://github.com/earendil-works/pi/issues/8753)** — 0.84.3 reasoning_details echo breaks Venice GLM (CLOSED)  
   Deterministic reasoning degeneration after `preservedReasoningDetails` started echoing. Regression report against a just-shipped release.

6. **[#8643](https://github.com/earendil-works/pi/issues/8643)** — Bedrock OpenAI models reject images in `toolResult.content` (OPEN)  
   Needs the same image-hoist already done for openai-completions. Blocks multimodal tool loops on Bedrock.

7. **[#3966](https://github.com/earendil-works/pi/issues/3966)** — Built-in `--profile` for isolated state (CLOSED)  
   Work / personal / local-LLM setups currently collide in one `PI_CODING_AGENT_DIR`. Recurring isolation request.

8. **[#8847](https://github.com/earendil-works/pi/issues/8847)** — TUI crash: git diff footer not truncated (CLOSED, filed 2026-08-30)  
   Narrow terminals (≤33 cols) crash on resume. Same family as other width/truncation bugs.

9. **[#8843](https://github.com/earendil-works/pi/issues/8843)** — Lazy session resume: ~10s before first prompt (CLOSED)  
   Full JSONL parse on startup; cost scales with session age. Users should not have to compact just to resume.

10. **[#8842](https://github.com/earendil-works/pi/issues/8842)** / **[#8846](https://github.com/earendil-works/pi/issues/8846)** — Windows PowerShell/console fallout from 0.84.3  
    PS 5.1 treats stderr progress as failure; `windowsHide:true` flashes conhost for every native child. New platform surface, immediate breakage.

Honorable mentions: [#6907](https://github.com/earendil-works/pi/issues/6907) README install section; [#8713](https://github.com/earendil-works/pi/issues/8713) LM Studio image reads disabled; [#8831](https://github.com/earendil-works/pi/issues/8831) NVDA inconsistency vs `pi -p`.

## 4. Key PR Progress
1. **[#8840](https://github.com/earendil-works/pi/pull/8840)** `feat: pi web GUI with full TUI parity` (CLOSED)  
   Token-gated local HTTP + WebSocket GUI on the same `AgentSessionRuntime` as the TUI. Largest surface expansion in the set.

2. **[#8844](https://github.com/earendil-works/pi/pull/8844)** Tencent Token Plan Individual provider (CLOSED)  
   Adds tc-code-latest, DeepSeek V4 Flash/Pro, GLM-5.2, MiniMax M2.7 via `TENCENT_TOKEN_PLAN_API_KEY`.

3. **[#8818](https://github.com/earendil-works/pi/pull/8818)** omit Responses `tool_choice` when no tools (CLOSED)  
   Fixes xAI 400s during compaction; pairs with issue [#8820](https://github.com/earendil-works/pi/issues/8820).

4. **[#8725](https://github.com/earendil-works/pi/pull/8725)** settle active turn before in-memory fork (CLOSED)  
   Prevents outgoing `toolResult` / `dispose()` from landing on the replacement session.

5. **[#8297](https://github.com/earendil-works/pi/pull/8297)** exclude superseded retry attempts from restored context (CLOSED)  
   Keeps failed retries in JSONL/UI but out of provider context, compaction, and token budgets.

6. **[#8812](https://github.com/earendil-works/pi/pull/8812)** flush extension provider registrations before model resolution (CLOSED)  
   Stops first-turn model selection from ignoring providers registered during extension load.

7. **[#8805](https://github.com/earendil-works/pi/pull/8805)** adaptive truncate instead of crash on narrow terminals (CLOSED)  
   Replaces hard-throw on over-wide render lines; directly relevant to [#8847](https://github.com/earendil-works/pi/issues/8847).

8. **[#8811](https://github.com/earendil-works/pi/pull/8811)** startup composer (CLOSED)  
   Accepts input during startup and carries state into interactive mode, including trust/selection dialogs.

9. **[#8828](https://github.com/earendil-works/pi/pull/8828)** detect Zed terminal capabilities (OPEN)  
   Treats Zed’s Alacritty core as hyperlink + truecolor, no images; documents default Pi hotkeys.

10. **[#8262](https://github.com/earendil-works/pi/pull/8262)** dispatch hooks on every turn-start path (OPEN)  
    `sendCustomMessage(triggerTurn: true)` currently skips `input` / `before_agent_start`. Needed for cancellable preflight.

Also active: TUI polish cluster [#8800](https://github.com/earendil-works/pi/pull/8800) / [#8799](https://github.com/earendil-works/pi/pull/8799) / [#8801](https://github.com/earendil-works/pi/pull/8801) / [#8678](https://github.com/earendil-works/pi/pull/8678); Bedrock Mantle [#8572](https://github.com/earendil-works/pi/pull/8572); pnpm/jiti realpath [#8112](https://github.com/earendil-works/pi/pull/8112); artifact verification gate [#8795](https://github.com/earendil-works/pi/pull/8795).

## 5. Hot Discussions
### Ideas
- **[#1637](https://github.com/earendil-works/pi/discussions/1637)** Benchmarking Pi’s harness (31 👍) — Interest in head-to-head vs Codex CLI and Claude Agent SDK before teams switch internals.
- **[#6646](https://github.com/earendil-works/pi/discussions/6646)** Pi vs OpenCode vs Codex on tokens, cache, MCP, and cost — Concrete overhead comparison, not just hello-prompt size.
- **[#4445](https://github.com/earendil-works/pi/discussions/4445)** Changing system prompt — Want overridden prompts to still receive injected tool lists and other dynamic sources.

### Show and tell
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** Favorite plugins / extensions (14 comments, 8 👍) — Living catalog of what people actually run.
- **[#1558](https://github.com/earendil-works/pi/discussions/1558)** CursorAI Agent CLI custom provider — Published `@netandreus/pi-cursor-provider`.
- **[#8803](https://github.com/earendil-works/pi/discussions/8803)** pi-verdict — Zero-dep allow/ask/deny gate matching the “no permission popups; build your own” README stance.
- **[#5951](https://github.com/earendil-works/pi/discussions/5951)** Thanks — Sentiment + versatility shout-out.

### Q&A
- **[#8729](https://github.com/earendil-works/pi/discussions/8729)** Why agent teams love npm — Node 18 vs 22/24 + nvm/fnm makes the CLI vanish after version switches.
- **[#8563](https://github.com/earendil-works/pi/discussions/8563)** Local llama-server API key — Onboarding friction for keyless local OpenAI-compatible servers.

## 6. Feature Request Trends
- **More providers in-tree**: Tencent Token Plan, Command Code, DeepSeek `/responses`, Bedrock Mantle, Cursor custom provider.
- **True multimodal I/O**: video/audio on `prompt`, Bedrock/OpenAI image hoist from tool results, LM Studio image path, DeepSeek V4 Flash Vision.
- **Session isolation & lifecycle**: `--profile`, lazy JSONL resume, fork/retry context hygiene, extension reload/`session_start` correctness.
- **Host/extension APIs**: UI prompt events, skill visibility/namespace, footer status packing, turn-start hooks, artifact verification gates, permission extensions (pi-verdict).
- **TUI/web parity**: web GUI, Zed capabilities, search/spinner/scrollbar polish, selectable-prompt editing, capability overrides.
- **Windows-native execution**: PowerShell tool is wanted, but needs stderr/exit-code and console-window correctness.

## 7. Developer Pain Points
- **TUI layout is fragile**: word-per-line streaming, thinking-trail wraps, markdown soft-break vs hard-break, `NO_COLOR` SGR leaks, footer overflow crashes on narrow terminals.
- **Long sessions hurt**: macOS CPU spin, full JSONL parse before first prompt, context budget that does not reserve output tokens so compact-retry loops fail.
- **Provider contract drift**: xAI `tool_choice` 400s, Venice reasoning echo degeneration, Codex cache misses inside the advertised TTL, Bedrock image placement, OAuth token exchange ignoring `HTTP_PROXY`.
- **Windows still second-class after 0.84.3**: PowerShell NativeCommandError, flashing conhost, unnormalized backslashes in system-prompt paths confusing small local models.
- **Onboarding gaps**: no README install section, local servers demanding API keys, Node version managers breaking the global CLI, mixed project/personal state without profiles.
- **Extension SDK sharp edges**: spread-copy drops prototype methods on class UIs; `reload()` skips replacement lifecycle when bindings are empty; provider registrations miss initial model resolve.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

I'll pull the latest Qwen Code GitHub activity so the digest reflects current releases, issues, and PRs.# Qwen Code Community Digest — 2026-08-30

Repo: [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) (~27.5k stars). Source window is last-24h GitHub activity as provided.

## 1. This Week's Highlights

The 0.22.x line is shipping fast: **v0.22.3** landed with owner-scoped named sessions in Channels (up to eight persistent tasks per chat) and safer daemon Extension installs; **v0.22.2** split the persistent Node REPL into a standalone MCP server (breaking). Work is clustered around Web Shell / daemon hardening (trusted loopback API, runtime model hot-reload, dirty-tree git updates), review-pipeline automation, and CI reliability after a failed nightly (`v0.22.3-nightly.20260830`).

## 2. Releases

| Version | Notes |
|---|---|
| [**v0.22.3**](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.3) | Named sessions in Channels ([#10198](https://github.com/QwenLM/qwen-code/pull/10198)); daemon Extension installs accept **absolute** local paths only. |
| [**v0.22.3-nightly.20260829.e5cb60ad48**](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.3-nightly.20260829.e5cb60ad48) | Web Shell git-state hints beside branch picker ([#10397](https://github.com/QwenLM/qwen-code/pull/10397)); review “St…” emit work (notes truncated). |
| [**v0.22.2**](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.2) | **Breaking:** Node REPL delivered as standalone MCP server ([#9499](https://github.com/QwenLM/qwen-code/pull/9499) by @LaZzyMan). |
| [**v0.22.2-nightly / preview.1**](https://github.com/QwenLM/qwen-code/releases) | Session-diff restore in Web Shell; DingTalk rich-text preservation; continuation-prompt contract ([#9834](https://github.com/QwenLM/qwen-code/pull/9834)). |
| [**desktop-v0.2.2**](https://github.com/QwenLM/qwen-code/releases) | Desktop tracks the same goal/continuation and core auth-gate work. |
| [**cua-driver-rs-v0.20.1 / v0.20.2**](https://github.com/QwenLM/qwen-code/releases) | Prebuilt CUA binaries (macOS notarized universal + app; Linux/Windows unsigned x86_64+arm64). |

A later nightly tag `v0.22.3-nightly.20260830.413b6d15d3` **failed** in CI (`integration_none`) — see [#10535](https://github.com/QwenLM/qwen-code/issues/10535).

## 3. Hot Issues

Only **five** issues were updated in the last 24 hours. All five are listed.

1. **[#10535](https://github.com/QwenLM/qwen-code/issues/10535)** — *Release Failed for v0.22.3-nightly.20260830* (OPEN, bot)  
   Nightly release job failed (`integration_none`). Blocks the 0.22.3 nightly train; two comments already on the run.

2. **[#7167](https://github.com/QwenLM/qwen-code/issues/7167)** — *Fleet Shepherd Dashboard* (OPEN, need-info / CI-CD)  
   Auto-maintained fleet status for agent PRs (checks in flight on #10532). Operational heartbeat for the self-review/autofix loop.

3. **[#10401](https://github.com/QwenLM/qwen-code/issues/10401)** — *Trust tokenless loopback for full operator API* (CLOSED)  
   `qwen serve` mixed tokenless loopback with 401 on operator routes. Closed after the matching PR; this is the auth-model discussion for local daemons.

4. **[#10184](https://github.com/QwenLM/qwen-code/issues/10184)** — *Runtime-added model cannot be set current until restart* (CLOSED)  
   Web Shell “+ Add model” listed the model but `POST /session/:id/model` rejected it until daemon restart. Closed alongside hot-reload work.

5. **[#10549](https://github.com/QwenLM/qwen-code/issues/10549)** — *Deferred review findings from PR #10347* (OPEN)  
   Autofix parked out-of-scope review items from the network-EOF retry PR. Follow-up queue for maintainers / ready-for-agent.

Community reaction in this window is thin (0 👍 on all five; 0–3 comments). Signal is **ops + daemon correctness**, not user-facing feature debate.

## 4. Key PR Progress

1. **[#10403](https://github.com/QwenLM/qwen-code/pull/10403)** *(CLOSED)* — Trusted-loopback full operator API when bound to loopback, no bearer, no `--require-auth`. Closes the #10401 auth inconsistency.

2. **[#10269](https://github.com/QwenLM/qwen-code/pull/10269)** *(CLOSED)* — Hot-reload runtime model providers so ACP children pick up add/delete without a full daemon restart. Pairs with #10184.

3. **[#10116](https://github.com/QwenLM/qwen-code/pull/10116)** *(CLOSED)* — Skip automatic review rounds when a `synchronize` only refreshes the base. Cuts wasted review compute.

4. **[#10542](https://github.com/QwenLM/qwen-code/pull/10542)** — Keep the cross-session peer inbox reachable and surface failures instead of failing silent (transport hardening, #8724 step 4a).

5. **[#10390](https://github.com/QwenLM/qwen-code/pull/10390)** — Web Shell “Update Project” no longer dead-ends on a dirty tree; branch picker offers a resolution panel.

6. **[#10283](https://github.com/QwenLM/qwen-code/pull/10283)** — Select output style via `general.outputStyle` or `--output-style` (`Concise` / `Proactive` / `Explanatory`, case-insensitive). First user-facing control for #9565 styles.

7. **[#10427](https://github.com/QwenLM/qwen-code/pull/10427)** — Close four hook trust-boundary holes (HTTP redirect, repo-controlled config → exec/egress). Reopen of #8396 on current main.

8. **[#10543](https://github.com/QwenLM/qwen-code/pull/10543)** — `model.goalTokenBudget` to size or disable the autonomous Goal spend window from #9891.

9. **[#10221](https://github.com/QwenLM/qwen-code/pull/10221)** — Adds prose-execution + counter-frame review audits from the #9655 post-mortem (replaces #9717).

10. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347)** — Treat wrapped network EOF / peer-close 4xx as retryable transport errors so bounded auto-retry works where Ctrl+Y is unavailable (channels/daemon). Deferred leftovers tracked in #10549.

Honorable CI/UX: [#10517](https://github.com/QwenLM/qwen-code/pull/10517) (disk samples during `npm ci`), [#10548](https://github.com/QwenLM/qwen-code/pull/10548) (skip product tests for ECS updater), [#10500](https://github.com/QwenLM/qwen-code/pull/10500) (preserve startup banner on short dialogs), [#10423](https://github.com/QwenLM/qwen-code/pull/10423) (prebuild review worktree before agents run).

## 5. Hot Discussions

Omitted — no Discussions data was provided for this window.

## 6. Feature Request Trends

From issues + PR titles in this slice:

- **Daemon as a first-class product**: tokenless-but-trusted loopback, runtime model/provider sync, standalone Web Shell session UI ([#10514](https://github.com/QwenLM/qwen-code/pull/10514) plan for PR6).
- **Session lifecycle control**: named persistent tasks (#10198), `sessionRotation` bounds ([#8927](https://github.com/QwenLM/qwen-code/pull/8927)), Goal token budgets.
- **Review system as product**: extra audit lenses, thread-aware finding replies ([#9940](https://github.com/QwenLM/qwen-code/pull/9940)), prebuild, skip-on-base-refresh.
- **Git / worktree UX in Web Shell**: dirty-tree update paths, optional worktrees ([#10226](https://github.com/QwenLM/qwen-code/pull/10226)), git-state hints.
- **Operator-tunable agent behavior**: output styles, Goal spend caps, hook security defaults.

## 7. Developer Pain Points

- **Daemon restart tax** — adding a model in Web Shell did not become selectable until restart (#10184); operators want live provider/model mutation.
- **Auth semantics are easy to get wrong** — tokenless loopback vs strict operator routes (#10401) created a split brain for local `qwen serve`.
- **Fragile CI / release path** — nightly 20260830 failed; disk pressure during `npm ci` is being instrumented (#10517); product tests over-run on infra-only PRs (#10548).
- **Trust boundaries in hooks** — repo-controlled config can still reach exec/network; #10427 is a security-sensitive reopen.
- **Silent transport failure** — peer inbox and EOF-wrapped 4xx failed closed without a retry path or user-visible reason (#10542, #10347).
- **CLI robustness on odd machines** — unwritable global config dir crashed startup (#10455); short dialogs ate the banner (#10500); VP mode left a gap above the composer (#9305).
- **Review compute waste** — base-only synchronizes and late worktree builds burned agent rounds; pipeline is being gated and prebuilt.

---

*Generated from the supplied 24h GitHub snapshot for 2026-08-30. Discussion board not included. Several release notes and PR bodies in the source were truncated; treat those items as directional, not complete changelogs.*

</details>