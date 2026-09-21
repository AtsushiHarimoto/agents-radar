# AI Infrastructure Digest 2026-09-12

> Generated: 2026-09-12 03:47 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

I'll pull current GitHub activity numbers so the comparison table is grounded, then write the cross-project report from the digests.# Cross-Project Comparison — AI Infrastructure Digest  
**Window:** week of 2026-09-12 · Projects: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

## 1. Ecosystem Overview

This week the stack is in a **ship-and-harden** phase, not a greenfield architecture phase. The flagship cluster engines (vLLM 0.29.0, SGLang 0.5.19 / 0.5.20.dev) are racing the same model families — DeepSeek-V4 / V4.1-Flash, DFlash/DSpark speculative paths, hybrid Mamba/SWA MoE, Qwen3.8, GLM-5.3, Hy4, Kimi K3 — while simultaneously flipping defaults that change production VRAM and routing (vLLM Model Runner V2 as default; FlashInfer all-reduce on; SGLang PD-disaggregation + HiCache + DCP `fi_a2a`). Local runtimes (llama.cpp daily tags around b10919, Ollama 0.34.0, Unsloth 0.1.808-beta) are catching up on MTP KV sizing, vision+speculation, AMD RDNA4/Vulkan, and tool-call parsers. Gateways (LiteLLM 1.100.1) are absorbing agent-protocol load: MCP deny-by-default toolsets, Claude Code / Codex / Anthropic Messages bridges, and budget math. The operational story is consistent across layers: **new silicon and new spec-decode graphs land faster than correctness**, especially on ROCm MI350/MI355, Blackwell SM120, structured output / xgrammar, and tool-call JSON.

## 2. Activity Comparison

Exact live issue/PR totals move hourly; the table below is **this-window activity as reported in the project digests**, plus GitHub release cadence.

| Project | Latest tag | Release status this window | Volume / cadence signal | Tracker heat |
|---|---|---|---|---|
| **vLLM** | **v0.29.0** (2026-09-09) | Major stable; CUDA 13.0 default image | **594 commits, 277 contributors (91 first-time)** in the tag; ~5.4k open PRs on the repo snapshot | High: MRV2 gaps, DS-V4 / DFlash correctness, ROCm accuracy |
| **SGLang** | **v0.5.19** (2026-09-04); main = **0.5.20.dev** | No new tag in last 24h; nightlies active | Last stable: **786 PRs / 214 contributors**; **564 commits on main since tag**; CI: 1 broken / 11 flaky | High: PD+spec crashes, grammar DFA, health-check vs DP |
| **llama.cpp** | **b10919** … **b10901** | Continuous daily tags (~19 tags in ~24h band) | Backend + server PRs (Metal fusion, HIP FA, MTP KV, WebGPU Dawn) | High on quantized speculation, RDNA4, Intel Vulkan/SYCL |
| **Ollama** | **v0.34.0** | Current stable | Feature release (ChatGPT Desktop, structured-output AS, OpenAI tool search) + parser/cloud-hang issue storm | P0 cloud hang; P1 silent tool-call drops |
| **LiteLLM** | **v1.100.1** stable; **v1.102.0-dev.2** / **1.101.0-rc.\*** | Patch on 1.100 + daily pre-release grind | Catalog: 242 models in 1.100.0; 218-model price sync in flight | Supply-chain hangover + ReDoS + Claude Code↔vLLM gap |
| **Unsloth** | **v0.1.808-beta** (2026-09-09) after **0.1.807-beta** | Dual beta wave | Perf/reliability release + Studio agent-workspace rebuild; 51 commits to main since tag | AMD VRAM accounting, Studio prefill cache, Windows RAM toggle |

**Read:** vLLM shipped the only *large* production serving cut this week. llama.cpp still has the fastest *tag cadence*. SGLang is doing the most *in-flight architecture* work on `main`. LiteLLM and Ollama are hottest on *API contract / agent client* bugs. Unsloth is the only project moving training + local Studio agent runtime in the same cut.

## 3. Model Support Race

| Family / feature | vLLM 0.29.0 | SGLang 0.5.19 / main | llama.cpp b109xx | Ollama 0.34.0 | Unsloth 0.1.808 |
|---|---|---|---|---|---|
| **Hy4-preview** (Tencent 770B / 49B-active, GDSA, MTP) | **Shipped** | — | Requested (Ollama #18287) | Requested | Listed in product matrix |
| **Qwen3.8-Flash-Next** (BF16/FP8/NVFP4 + MTP) | **Shipped** | Qwen3.8 family already in 0.5.19; Flash-Next/DFlash still noisy | Thinking+tools parser history | Tool-loop 500s / empty content | Long-GGUF prefill-cache loss after reload |
| **DeepSeek-V4 / V4.1-Flash + DFlash/DSpark** | Landed + **open SM90 assert, SM120 page/indexer mismatch, ROCm accuracy** | Packed FP4 KV, FlashMLA rebase, MegaMoE fuse — **in flight on main** | MTP KV sizing fixed for DeepSeek2 | Local GGUF still a request (#18379) | Product lists V4; not the serving-correctness race |
| **GLM-5.3 / Flash** | ROCm GSM8K collapse under MRV1 force | SM120 qualification + **disagg+spec crash** | MTP KV for GLM-4-MoE | `:cloud` unbounded reasoning vs Z.AI | Product lists GLM-5.3-Flash |
| **Kimi K3 NVFP4** | Checkpoints shipped | Already a first-class DCP/PD citizen; comm-backend default expanding | — | — | Product lists K3 |
| **Granite SWA / NemotronH Omni V3 + MTP** | **Shipped** | Granite 4.2 already in 0.5.19 | — | — | — |
| **SenseNova-U1 / VDN-H3 / Qwen-Image-Layered** | — | **SGLang lead** (tracking + closed/open PRs) | — | — | Diffusion 1.2–1.7× this beta |
| **Maple 20B-A1B ternary MoE / STQ1_0** | — | — | **llama.cpp lead** (in-flight PRs) | — | — |
| **Consumer / odd silicon** | CUDA 13.0 default; Rubin/13.4 pins on main; T4 Triton SHMEM still old | gfx950 Instinct-first; RDNA3/4 tracking only; Ascend DSV4 + DFlash | Metal fusion table; HIP gfx1201 FA; OpenCL Q4_0; WebGPU Dawn | gfx1200 Tensile miss; Jetson 8GB Gemma4 OOM | **Vulkan default** for Strix / ROCm-less iGPU |

**Who is ahead**
- **Day-0 / exotic cluster models:** vLLM and SGLang split the lead. vLLM *released* Hy4-preview, Qwen3.8-Flash-Next, GraniteSWA, NemotronH Omni V3, Kimi K3 NVFP4. SGLang *owns the unfinished frontier* on V4.1 packed FP4, GLM-5.3-Flash SM120, SenseNova, diffusion/image, Ascend, gfx950 PD.
- **Local GGUF / edge architectures:** llama.cpp (ternary MoE, MTP KV, OpenCL, WebGPU, Hexagon row-split).
- **“It runs on my laptop / Studio”:** Ollama for ChatGPT Desktop integration; Unsloth for AMD Vulkan + diffusion + fine-tune export. Neither is winning the V4-Flash *correctness* race.

**Practical call:** if the model is a 2026 MoE + MTP + Flash/DSpark graph on NVIDIA/AMD cluster GPUs, start with **vLLM 0.29.0 pinned** or **SGLang 0.5.19** and treat `main` as a lab. If it is GGUF on mixed client GPUs, **llama.cpp b10907+** (MTP) / **b10906+** (vision+spec).

## 4. Performance Frontier

Optimization is no longer “faster GEMM on Llama-3.” It concentrates in five places:

**1. Speculative decode graphs (MTP / EAGLE / DFlash / DSpark)**  
vLLM: spec-decode CUDA-graph paths, padded FULL graphs, DP-sync skip before draft prefill, per-request acceptance metrics. SGLang: FlashMLA V4.1 rebase, DFlash on NPU, Gemma EAGLE3 hidden-state capture. llama.cpp: speculation-after-image position fix; quantized-target divergence still open. This is the highest *risk-adjusted* perf work — gains are real, silent quality breaks are also real.

**2. MoE memory topology**  
vLLM: batch-sharded sampling (logits ÷ TP), shared experts into MegaMoE, incremental expert offload + `--moe-expert-pool-rows`, FlashInfer AR default. SGLang: fuse shared→sparse experts, packed FP4 main KV, DCP `fi_a2a` cluster-wide. llama.cpp: two-tier GPU+RAM expert cache (closed request) and disk KV (`--cache-disk`, 48 👍, not shipped). Unsloth: quantized MLX KV (−74% prompt memory).

**3. Hybrid attention + prefix cache**  
Mamba/GDN/SWA + MTP prefix-cache misses (vLLM #53504; SGLang HiCache false hits #39147). vLLM Mamba prefix-cache checkpoints: **9–25% TTFT**. Hybrid models are now a *cache-correctness* problem, not just a kernel problem.

**4. Cross-vendor kernels**  
NVIDIA: SM100 reuse of Hopper GEMM, SM120 DeepGEMM / page-size fights, CUDA 13.0→13.4. AMD: vLLM ROCm MXFP8 dequant, MI355X DS-V4.1 numbers (≈35.9 tok/s total / 9 tok/s/GPU at conc=1 — device still under-used); llama.cpp gfx1201 MMA FA vs earlier ~2× PP regression; Unsloth **Vulkan ~20% vs ROCm**, Strix Halo +23% PP / +8% gen. Apple: Ollama structured-output latency; Unsloth gated-delta train up to 25%, MLX self-heal.

**5. Serving control plane, not kernels**  
vLLM admission `--max-num-queued-reqs/tokens`, deterministic prefix hash (no `PYTHONHASHSEED`). SGLang SessionAware router, runtime P↔D role switch, health-check poisoning DP. LiteLLM retry-breadcrumb OOM fix, spend-counter coalescing, 5-minute prompt-cache TTL still wrong for 1-hour caches. This is where capacity and *cost* actually move for operators.

**Numbers worth keeping (from this window, not a bake-off):**  
vLLM Kimi-K3 fused MXFP4 top-k ~**5% E2E**; Mamba metadata Triton **6.6–7.6×** kernel; `eh_proj` **12.9–25.2%**. Unsloth diffusion **1.2–1.7×**. Do not copy 0.28 `max_num_seqs` onto 0.29.

## 5. Layer Positioning

```
Training / adaptation     Unsloth (QLoRA/DoRA/DPO/GRPO + Studio agent workspace)
        ↓ export GGUF / FP8 / NVFP4
Local runtime             llama.cpp  ←── Ollama (product + library + cloud proxy + Desktop)
        ↓ OpenAI-ish HTTP
Cluster serving           vLLM  ‖  SGLang     (overlapping, not interchangeable)
        ↓ unified API, keys, MCP, budgets
Gateway                   LiteLLM
        ↓
Agents / IDEs             Claude Code, Codex, ChatGPT Desktop, openai-agents
```

| Layer | Role this week | Do not use it as |
|---|---|---|
| **vLLM** | Default *NVIDIA-first* production engine. MRV2 is now the product. CUDA 13.0 artifact. Best documented breaking-change list. | A quiet patch. Sequence parallelism / DBO / elastic EP / custom logits still force **MRV1 fallback** until ~v0.32. |
| **SGLang** | *Disaggregated + agentic KV* engine. HiCache, PD role switch, SessionAware router, multi-vendor (Blackwell, gfx950, Ascend). Faster on unfinished model graphs. | A drop-in for v0.5.19 production if you need V4.1 / GLM-5.3-Flash / gfx950 PD today — those live on noisy `main`. |
| **llama.cpp** | Portable inference *library* + server. Widest backend surface (Metal, HIP, Vulkan, OpenCL, SYCL, WebGPU). Architecture lab (ternary, MTP). | Multi-tenant control plane (presets, cached-model lifecycle, disk KV still DIY). |
| **Ollama** | Local *product* on top of llama.cpp + MLX + optional `:cloud`. ChatGPT Desktop is the distribution win. | A reliable tool-call or cloud-proxy runtime on 0.34.0 without client deadlines and raw-trace logging. |
| **LiteLLM** | *Governance* layer: keys, MCP toolsets, spend, auto-router, 242-model catalog. 1.100.1 is the first 1.100.x build that should sit behind a LB. | A transparent pipe for Claude Code → hosted vLLM (#30043 still open). Not a kernel. |
| **Unsloth** | *Train + run + agent-edit* loop on one box. Vulkan AMD default, official Docker, Studio becoming a durable coding-agent runtime. | A cluster scheduler. OpenAI-compat is backend-specific (`min_p` / `logit_bias` / tensor-split gaps). |

**Overlap to budget for:** vLLM ↔ SGLang (same models, different PD/KV/spec contracts); llama.cpp ↔ Ollama ↔ Unsloth Studio (three opinions on the same GGUF); LiteLLM in front of all of them (translation bugs look like model bugs).

## 6. Trend Signals

**Industry**
1. **Hybrid + speculative models are the new default workload**, not dense Llama. Every engine is paying cache, graph, and FSM tax for Mamba/SWA + MTP + DFlash.
2. **Prefill/decode disaggregation and multi-tier KV** (GPU hot cache, host, disk, expert offload) are graduating from RFC to flags. Capacity planning is now a *pool topology* problem.
3. **Silicon fragmentation is back.** CUDA 13.0/13.4, SM120 page-size vs indexer, MI355X under-utilization, gfx1201 FA retune, Vulkan-as-AMD-default, Ascend DSV4 — one checkpoint no longer has one fast path.
4. **The client is an IDE/agent, not a chat box.** ChatGPT Desktop + local Ollama, LiteLLM `lite configure` for Claude Code and Codex, Unsloth Studio worktrees/hooks, MCP toolsets that now *fail closed*. Protocol bugs (tool JSON, `include_reasoning`, inline `system`, `tool_choice: required`) are production incidents.
5. **Security and supply chain sit on the serving path.** LiteLLM PyPI 1.82.x incident still dominates operator chat; ReDoS in redaction and in SGLang PythonicDetector; grammar DFA as DoS; cosign on LiteLLM images. Constrained decoding is a trust boundary.

**What agent / application developers should watch**

| Watch item | Why |
|---|---|
| Pin **vLLM 0.29.0** and re-profile; do not reuse 0.28 KV / `max_num_seqs`. Keep MRV1 fallback list next to the deploy doc. | Defaults changed (FlashInfer AR, MRV2, admission, prefix hash). |
| Treat **DFlash / DSpark / MTP on V4.1 and Qwen3.8 thinking** as experimental on every engine. Keep `--enforce-eager` and a non-spec baseline in CI. | SM90 asserts, SM120 page mismatch, ROCm accuracy collapse, llama.cpp quantized-target divergence, Ollama empty generations. |
| **Log raw tool-call traces.** Empty `tool_calls` + `finish_reason=stop` is often a parser drop (Ollama Qwen/Gemma, LiteLLM concat JSON, SGLang DSML wrapper, vLLM Qwen3 `tool_choice`). | Agent loops will “succeed” and do nothing. |
| Do not put **Claude Code → LiteLLM → vLLM** in production until #30043 has a named stable route. | Two broken translations, not one. |
| If you use **SGLang HiCache + PD**, health checks can poison DP routing; hybrid pools can report unrestorable prefix hits. | Silent quality/latency, requests still “complete.” |
| **llama.cpp ≥ b10906** for vision+spec; **≥ b10907** for DeepSeek2 / GLM-4-MoE / Cohere2-MoE MTP KV. Recycle processes on Qwen3.6-MTP if outputs drift. | Position vs token-count; inter-request MTP state. |
| Ollama **`:cloud` on 0.34.0** needs client deadlines (or stay on 0.33.1). Bind evals to **manifest digest**, not tag. | 45-min wedge; official low-bit library quants that score 0. |
| LiteLLM: **1.100.1 + cosign**; audit MCP toolsets before upgrade (fail-closed); migrate spend scrapers to `/spend/logs/v2`; cap exception size until ReDoS is gone. | OOM, vanished tools, truncated logs, event-loop death. |
| Unsloth: pin **0.1.808-beta + Torch 2.11**; measure AMD/Windows VRAM yourself; don’t assume Studio prefix cache survives model reload. | Vulkan default changes accounting; 11-min cold prefill reports. |

**Next 2–3 weeks (from the trackers):** vLLM MRV2 remaining TODOs and MRV1 removal clock (target v0.32); DS-V4 warmup PRs; expert-pool offload. SGLang P↔D role switch and DCP backend default flip. Whether GLM-5.3 / DS-V4 ROCm accuracy is fixed on the V2 path before fallbacks disappear. LiteLLM 1.102 MCP/OAuth vs the still-open Claude Code↔vLLM hole.

**Bottom line for decision-makers:** 0.29.0 / 0.5.19 / 0.34.0 / 1.100.1 / 0.1.808-beta are all *usable pins*, but they are not interchangeable and they are not quiet. Pick the layer you actually need (cluster engine vs local runtime vs gateway vs train loop), pin the tag, and add CI for **spec-decode equality, tool-call parse, and prefix-cache hit validity** — those three are where this week’s throughput work is leaking correctness.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

I'll pull the full v0.29.0 release notes and a few high-signal issue/PR pages so the digest is accurate.# vLLM Digest — 2026-09-12

Source: [vllm-project/vllm](https://github.com/vllm-project/vllm) · release [v0.29.0](https://github.com/vllm-project/vllm/releases/tag/v0.29.0) (tagged 2026-09-09)

## 1. This Week's Highlights

**Model Runner V2 is now the default for all models** ([#53183](https://github.com/vllm-project/vllm/pull/53183)), finishing the rollout that started with pooling models. The same release lands CUDA-graph memory profiling for KV auto-sizing, batch-sharded sampling (logits memory cut by `1/TP`), prompt embeds, and several spec-decode graph paths. MRV1 is officially on a deprecation clock (target removal in **v0.32**) and is kept only as a fallback for ROCm gaps and a short list of missing features ([#47172](https://github.com/vllm-project/vllm/issues/47172)).

The other dominant thread is **DeepSeek-V4 / DFlash / hybrid MoE serving**: Hy4-preview and Qwen3.8-Flash-Next land in 0.29.0, while main still has open correctness and hardware issues on SM90/SM120 and ROCm MI350/MI355 (accuracy collapse, CUDA asserts, cache-page mismatches). MoE expert offload and a shared GPU expert pool are moving from RFC into PRs.

## 2. Releases & Breaking Changes

**[v0.29.0](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)** — 594 commits, 277 contributors (91 first-time).

**Defaults that change production behavior**
- FlashInfer all-reduce is **on** for TP CUDA groups; opt out with `VLLM_ALLREDUCE_USE_FLASHINFER=0` ([#52998](https://github.com/vllm-project/vllm/pull/52998)).
- Prefix-cache `NONE_HASH` is deterministic; distributed KV users no longer need `PYTHONHASHSEED` ([#51875](https://github.com/vllm-project/vllm/pull/51875)).
- New admission-control flags: `--max-num-queued-reqs` / `--max-num-queued-tokens` ([#49445](https://github.com/vllm-project/vllm/pull/49445)).
- `prefix_cache_retention_interval` is a CLI flag (default `0`); hybrid + EAGLE/MTP automatically restore dense retention ([#52216](https://github.com/vllm-project/vllm/pull/52216), [#55760](https://github.com/vllm-project/vllm/pull/55760), [#55861](https://github.com/vllm-project/vllm/pull/55861)).

**Breaking / removed**
- Ten deprecated model architectures removed ([#53608](https://github.com/vllm-project/vllm/pull/53608)).
- FlexOlmo, Olmo3, Hunyuan V1/VL moved to the Transformers modeling backend ([#53615](https://github.com/vllm-project/vllm/pull/53615)).
- PyAV video decoder backend removed ([#54231](https://github.com/vllm-project/vllm/pull/54231)).
- `python -m vllm.entrypoints.openai.api_server` deprecated in favor of `vllm serve` ([#52131](https://github.com/vllm-project/vllm/pull/52131)).
- Env vars removed: `VLLM_TEST_FORCE_FP8_MARLIN`, `VLLM_ROCM_USE_AITER_FP4_ASM_GEMM`.

**Install snapshot**
- Default PyPI / Docker is **CUDA 13.0** (`vllm/vllm-openai:v0.29.0`). CUDA 12.9, ROCm, CPU, and XPU images/wheels are published on the same tag.

**MRV2 gaps that still force MRV1 fallback:** sequence parallelism, dual-batch overlap, elastic expert parallelism, custom logits processors, and some speculative methods. Those gaps are tracked as “close in 2–3 weeks,” not as a long-term dual stack.

## 3. New Model & Hardware Support

Landed in 0.29.0:
- **Hy4-preview** — Tencent 770B / 49B-active MoE, Gated DeepSeek Sparse Attention, native MTP ([#54160](https://github.com/vllm-project/vllm/pull/54160)).
- **Qwen3.8-Flash-Next** — BF16 / FP8 / NVFP4 + MTP ([#53896](https://github.com/vllm-project/vllm/pull/53896)).
- **GraniteSWA / GraniteMoeSWA** ([#52706](https://github.com/vllm-project/vllm/pull/52706)).
- **NemotronH_Omni_Reasoning_V3** with MTP ([#52929](https://github.com/vllm-project/vllm/pull/52929), [#53121](https://github.com/vllm-project/vllm/pull/53121)).
- **Kimi K3 NVFP4** checkpoints ([#53132](https://github.com/vllm-project/vllm/pull/53132)).
- FP8 ModernBERT, bidirectional attention for DeepSeek-backbone embeddings, LoRA on DeepSeek V4 and Qwen3-Omni.

Hardware / backend work still in flight on `main`:
- NVIDIA **Rubin / CUDA 13.4** public pins (FlashInfer 0.6.18.post1, NIXL 1.4.1, Quack 0.6.5) — [PR #56545](https://github.com/vllm-project/vllm/pull/56545).
- DeepSeek-V4.1-Flash on **SM120/SM121 (GB10)** blocked by SWA cache block 32 vs decode page 64 and indexer `block_kv` vs DeepGEMM SM120 limits — [#56461](https://github.com/vllm-project/vllm/issues/56461).
- Transformers **v5** upgrade is a living tracker, not done — [#38379](https://github.com/vllm-project/vllm/issues/38379).
- ROCm nightly DI CI still wants the production router instead of the toy proxy — [#51057](https://github.com/vllm-project/vllm/issues/51057).

## 4. Performance & Optimization

**Shipped in 0.29.0 (selected, with numbers from the release notes)**
- Batch-sharded sampling: per-step logits memory ÷ TP ([#50465](https://github.com/vllm-project/vllm/pull/50465)).
- Kimi-K3: fused MXFP4 top-k finalization (~**5% E2E**), Mamba metadata in one Triton launch (**6.6–7.6×** kernel), Hopper low-latency GEMM reused on SM100, `eh_proj` **12.9–25.2%** kernel speedup.
- Mamba prefix-cache internal checkpoints: **9–25% TTFT**.
- DeepSeek V4: shared experts into MegaMoE, adaptive top-k width, native SwiGLU clamp for Humming MoE, opt-in FlashInfer `moe_ep`.

**Active this window**
- Incremental MoE expert offload (CPU pinned weights + GPU hot cache, LFRU) — RFC [#38256](https://github.com/vllm-project/vllm/issues/38256), related pool PR [#56177](https://github.com/vllm-project/vllm/pull/56177) (`--moe-expert-pool-rows`).
- ROCm MXFP8: dequantize once when `dot_scaled` cannot run (`K % 128 != 0`) — [PR #56560](https://github.com/vllm-project/vllm/pull/56560).
- DSv4.1 skip candidate sort when all blocks fit — [PR #56558](https://github.com/vllm-project/vllm/pull/56558).
- PCP: restore only sampled final rows after prefill — [PR #49756](https://github.com/vllm-project/vllm/pull/49756); PCP+DCP on sparse-MLA — [PR #56157](https://github.com/vllm-project/vllm/pull/56157).
- Extensible KV cache productization — [PR #56492](https://github.com/vllm-project/vllm/pull/56492).
- DeepSeek-V4.1-Flash on **8× MI355X**, TP4, MXFP4 MoE + DSpark MTP: concurrency 1 ≈ **35.9 tok/s** total / **9 tok/s/GPU**, TTFT p50 **0.90 s** — RFC [#56506](https://github.com/vllm-project/vllm/issues/56506) (authors say the device is still under-used).
- AWQ CUDA GEMM on RTX 3070 Ti reported as heavily L1/memory bound — [#55462](https://github.com/vllm-project/vllm/issues/55462).
- Historical structured-output decode regression (~**2×**) from `apply_grammar_bitmask` staging in #45424 — [#49013](https://github.com/vllm-project/vllm/issues/49013) (closed but still a calibration point for guided-JSON).

## 5. Stability & Regressions

Ranked by operational impact. Links are issues unless noted.

**High — correctness / silent capacity loss**
- GLM-5.3 on ROCm: GSM8K **91.6% → 14.9%** after #53155 forces MRV1 — [#54924](https://github.com/vllm-project/vllm/issues/54924).
- DeepSeek V4 accuracy drop with MRV2 on MI350/MI355 when `FULL_DECODE_ONLY` graph — [#52644](https://github.com/vllm-project/vllm/issues/52644).
- NIXL connector silently disabled HMA and **halved KV capacity** (closed; default-HMA discussion) — [#42024](https://github.com/vllm-project/vllm/issues/42024).
- Hybrid Mamba/GDN + MTP: first identical-prompt replay **misses prefix cache entirely** — [#53504](https://github.com/vllm-project/vllm/issues/53504); fix attempt [PR #52244](https://github.com/vllm-project/vllm/pull/52244).
- DFlash2 changes greedy Qwen3.8 thinking output at token 30 even with `K=1` and `--enforce-eager` — [#54928](https://github.com/vllm-project/vllm/issues/54928).

**High — hard fails on new models / silicon**
- DSv4.1-Flash + DSpark: CUDA device-side assert in `map_draft_to_target` on SM90 (H200) + Marlin MXFP4 — [#56443](https://github.com/vllm-project/vllm/issues/56443).
- DSv4.1-Flash cannot serve on SM120/SM121 (page/indexer vs DeepGEMM mismatch) — [#56461](https://github.com/vllm-project/vllm/issues/56461).
- DFlash2 + xgrammar `json_object`: deterministic “Failed to advance FSM” — [#53777](https://github.com/vllm-project/vllm/issues/53777); related fallback for multi-branch `allOf` — [PR #56557](https://github.com/vllm-project/vllm/pull/56557).

**Medium — API / serving contract**
- `qwen3_coder` / `qwen3_xml` parser ignores `tool_choice: "required"` and named functions — [#54808](https://github.com/vllm-project/vllm/issues/54808).
- Beam search ignored `skip_special_tokens` (leaked control tokens) — [PR #56211](https://github.com/vllm-project/vllm/pull/56211).
- Anthropic-style inline `system` messages broke prefix cache on encoder tokenizers — [PR #56520](https://github.com/vllm-project/vllm/pull/56520).

**Medium / older but still moving**
- Tesla T4 Triton shared-memory OOM (81 280 vs 65 536) — [#36802](https://github.com/vllm-project/vllm/issues/36802).
- Scheduler deadlock when prompt exceeds `max_model_len` by 1 (closed) — [#42381](https://github.com/vllm-project/vllm/issues/42381).
- Nightly image `nixl_ep` / missing `libcudart.so.12` import (closed, watch images) — [#42525](https://github.com/vllm-project/vllm/issues/42525).

Long-running tracker still collecting work: batch-invariant inference [#27433](https://github.com/vllm-project/vllm/issues/27433) (92 comments).

## 6. What This Means for Application Developers

1. **Treat 0.29.0 as an MRV2 release, not a quiet patch.** Pin `v0.29.0` (or a known-good nightly) and run your hybrid / spec-decode / ROCm models before flipping production. If you rely on sequence parallelism, DBO, elastic EP, or custom logits processors, you are still on the MRV1 fallback path until those TODOs close ([#47172](https://github.com/vllm-project/vllm/issues/47172)).
2. **DeepSeek-V4.1-Flash and DFlash2 are not “just enable spec decode.”** SM90 Marlin + DSpark, SM120 page size, ROCm FULL graphs, and xgrammar FSM failures are all open this week. Keep `--enforce-eager` and disable DFlash for structured-output and thinking models until the assert/FSM issues land.
3. **Tool-calling and client protocols need explicit tests.** Qwen3 parsers still treat `tool_choice: required` as auto. Claude Code / Anthropic clients that inject `role: system` inside `messages` need the encoder-tokenizer prefix-cache fix. Beam-search users should confirm `skip_special_tokens`.
4. **Capacity and cost knobs actually moved.** FlashInfer AR on by default, deterministic prefix hashes, queued-req/token admission, and (soon) `--moe-expert-pool-rows` change how you size KV and MoE VRAM. Re-profile `max_num_seqs` / cache utilization; do not copy 0.28 numbers.
5. **CUDA 13.0 is the default artifact.** Stay on the `cu129` image only if the rest of the stack is frozen. Rubin/13.4 dependency bumps are already on `main`.
6. **For agents:** `--per-request-spec-decode-metrics` is the hook to log acceptance per request. Streaming engine-state RFC [#43643](https://github.com/vllm-project/vllm/issues/43643) is still open if you build your own router.

---

**Watch next:** MRV2 remaining TODOs, DSv4 warmup PRs ([#53566](https://github.com/vllm-project/vllm/pull/53566), [#56323](https://github.com/vllm-project/vllm/pull/56323)), expert-pool offload, and whether GLM-5.3 / DS-V4 ROCm accuracy gets an MRV2-path fix before the MRV1 removal window.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

I'll pull a bit more context from the repo and recent activity so the digest is accurate.# SGLang Digest — 2026-09-12

Source: [sgl-project/sglang](https://github.com/sgl-project/sglang). Latest stable tag remains **v0.5.19** (2026-09-04); main is on **0.5.20.dev** nightlies. No official release in the last 24 hours.

## 1. This Week's Highlights

Activity is concentrated on **DeepSeek-V4 / V4.1**, **PD disaggregation + HiCache**, and **cross-vendor kernels** (NVIDIA Blackwell SM120, AMD gfx950, Ascend NPU). The long-running distributed KVCache roadmap for agentic workloads ([#21846](https://github.com/sgl-project/sglang/issues/21846)) and the SessionAware router ([#25760](https://github.com/sgl-project/sglang/issues/25760)) continue to drive architecture work, while CI is noisy: tracker [#17050](https://github.com/sgl-project/sglang/issues/17050) reports **1 broken / 11 flaky** on main as of 2026-09-12 03:17 UTC. Several high-severity serving bugs landed this window (health-check vs DP routing, GLM-5.3 crash on disagg+spec decode, grammar DFA blow-up).

## 2. Releases & Breaking Changes

No tagged release in the last 24h. Current line:

- Stable: [v0.5.19](https://github.com/sgl-project/sglang/releases/tag/v0.5.19) (2026-09-04)
- Dev: `0.5.20.dev` nightlies via [sgl-project/whl](https://github.com/sgl-project/whl/releases)

Watch these in-flight config/API shifts (not yet released):

- `--dcp-comm-backend` defaulting to `fi_a2a`/`a2a` for **all** DCP models, not only Kimi-K3 — [PR #39165](https://github.com/sgl-project/sglang/pull/39165)
- Weight-loading RFC (165 model files, each with its own loader) — closed as inactive but still the intended direction: [#24703](https://github.com/sgl-project/sglang/issues/24703)
- Runtime prefill↔decode role switching (today roles are pinned at launch) — [PR #28403](https://github.com/sgl-project/sglang/pull/28403)

## 3. New Model & Hardware Support

**Models / families in active tracking or PRs**

| Work | Status | Link |
|---|---|---|
| SenseNova-U1 / U1.5 feature & perf tracking | Open tracking | [#37742](https://github.com/sgl-project/sglang/issues/37742) |
| GLM-5.3-Flash on SM120 (2× RTX PRO 6000, TP2, W4A16 routed experts, FP8 KV, vision, native MTP) | Tracking | [#37813](https://github.com/sgl-project/sglang/issues/37813) |
| DeepSeek-V4.1 C1/C2 main KV in packed FP4 on Hopper | Feature | [#38902](https://github.com/sgl-project/sglang/issues/38902) |
| FlashMLA bump to V4.1 kernel rebase | Open PR | [#38942](https://github.com/sgl-project/sglang/pull/38942) |
| VDN-H3 (MiniMax-H3 hybrid window + Video Delta LA, 8-NFE distill) | Closed PR | [#37903](https://github.com/sgl-project/sglang/pull/37903) |
| Qwen-Image-Layered multi-output + CFG2 rounding | Open PR | [#38549](https://github.com/sgl-project/sglang/pull/38549) |
| Setwise scoring on Score API | Open PR | [#38965](https://github.com/sgl-project/sglang/pull/38965) |
| MiMo-V2.5-Pro DFlash speculative decode (mxfp4) on NPU | Open PR | [#37565](https://github.com/sgl-project/sglang/pull/37565) |

**Hardware / backends**

- **AMD Instinct gfx950**: FP8 two-pool unified KV ([#37413](https://github.com/sgl-project/sglang/pull/37413)); PD-disagg + FP8 unified_kv ([#37413](https://github.com/sgl-project/sglang/pull/37413) / [#39166](https://github.com/sgl-project/sglang/pull/39166)); packed DCP1→DCP-N KV via MORI ([#38317](https://github.com/sgl-project/sglang/pull/38317))
- **Consumer Radeon RDNA3/RDNA4** (`gfx1100`/`gfx1201`): still tracking only; ROCm path remains Instinct-first — [#30599](https://github.com/sgl-project/sglang/issues/30599)
- **Ascend NPU**: DSV4 host-memory cache ([#37382](https://github.com/sgl-project/sglang/pull/37382)); DSV4 prefill context parallelism (interleave + zigzag) ([#38251](https://github.com/sgl-project/sglang/pull/38251)); DFlash for MiMo-V2.5-Pro ([#37565](https://github.com/sgl-project/sglang/pull/37565))
- **Blackwell / SM120**: GLM-5.3-Flash qualification ([#37813](https://github.com/sgl-project/sglang/issues/37813)); DeepGEMM sanitizer + Blackwell test timeouts ([#39163](https://github.com/sgl-project/sglang/pull/39163))

## 4. Performance & Optimization

In progress (no new published tok/s numbers in this 24h window):

- **Fuse shared→sparse experts** in DSV4 DeepGEMM MegaMoE — [#38700](https://github.com/sgl-project/sglang/issues/38700)
- **FP8 KV-cache decode**: unfused K/V quant + per-layer Q conversion overhead — [#30815](https://github.com/sgl-project/sglang/issues/30815)
- **TRTLLM MLA** target verification missing fused FP8 KV/Q prep in `forward_extend` — [#39107](https://github.com/sgl-project/sglang/issues/39107)
- **Packed FP4** storage for DeepSeek-V4.1 C1/C2 main KV on Hopper — [#38902](https://github.com/sgl-project/sglang/issues/38902)
- **DCP default comm backend** → `fi_a2a` cluster-wide — [#39165](https://github.com/sgl-project/sglang/pull/39165)
- **Constrained decoding overhead under TP** (good first issue) — [#13809](https://github.com/sgl-project/sglang/issues/13809)
- Diffusion: measure attention backend instead of dead `allow_cudnn_sdp` path ([#38689](https://github.com/sgl-project/sglang/pull/38689)); O_DIRECT mapped-layer reads when host cannot cache ([#39022](https://github.com/sgl-project/sglang/pull/39022))
- HiCache + LoRA: simplify decode offload hash inputs — [#39162](https://github.com/sgl-project/sglang/pull/39162)
- Gemma speculative decoding: preserve full hidden-state + residual captures (EAGLE3 acceptance) — [#39161](https://github.com/sgl-project/sglang/pull/39161)
- PD: runtime P↔D role switch ([#28403](https://github.com/sgl-project/sglang/pull/28403)); SessionAware bucket router ([#25760](https://github.com/sgl-project/sglang/issues/25760))
- Agentic KV roadmap (HiCache + PD bottlenecks under hybrid models) — [#21846](https://github.com/sgl-project/sglang/issues/21846)

## 5. Stability & Regressions

Ranked by operational severity.

| Sev | Issue | Notes |
|---|---|---|
| **High** | Generation health checks perturb DP routing and collapse long-prefill throughput — [#35241](https://github.com/sgl-project/sglang/issues/35241) | Reproducible scheduler/perf-stability bug; requests still complete |
| **High** | GLM-5.3 crash on disagg decode + dp-attention + spec decode — [#39072](https://github.com/sgl-project/sglang/issues/39072) | Opened 2026-09-11 |
| **High** | JSON Schema grammar: DFA explosion / CPU thread hang on deep or cyclic schemas — [#39125](https://github.com/sgl-project/sglang/issues/39125) | Treat untrusted schemas as a DoS vector |
| **High** | ReDoS in `PythonicDetector` — fix PR [#18397](https://github.com/sgl-project/sglang/pull/18397) | Still open; replace nested `.*` regex with O(n) matcher |
| **Med** | Encoder-decoder KV: shared boundary page double-freed when `page_size > 1` — [#38840](https://github.com/sgl-project/sglang/issues/38840) | |
| **Med** | HiCacheFile reports unrestorable prefix as hit on hybrid cache pools — [#39147](https://github.com/sgl-project/sglang/issues/39147) | Wrong prefix restore → silent quality/latency hit |
| **Med** | `include_reasoning=false` still emits reasoning in responses / chat / completions — [#39103](https://github.com/sgl-project/sglang/issues/39103) | API contract break for clients |
| **Med** | DeepSeek V4/V3.2 DSML tool-call parser wraps args in spurious `"arguments"`/`"input"` — [#38924](https://github.com/sgl-project/sglang/issues/38924) | Breaks tool routers |
| **Med** | Session + multimodal: text positions wrong after image in session continuation — fix PR [#39144](https://github.com/sgl-project/sglang/pull/39144) | Can emit control tokens instead of answers |
| **Low / infra** | CUDA coredump auto-tracker — [#26340](https://github.com/sgl-project/sglang/issues/26340) (298 comments) | CI signal, not a product feature |
| **Low / infra** | CI tracker: 1 broken, 11 flaky, 990 recently fixed — [#17050](https://github.com/sgl-project/sglang/issues/17050); AMD PR-test extra job import crash — [#37451](https://github.com/sgl-project/sglang/issues/37451) | |

Recently closed / inactive in this window (not current blockers): weight-loader RFC [#24703](https://github.com/sgl-project/sglang/issues/24703), DFlash Mamba checkpoint miss [#37817](https://github.com/sgl-project/sglang/issues/37817), CP size > 8 [#30991](https://github.com/sgl-project/sglang/issues/30991), glm-5.2-w4afp8 on 0.5.15 [#31045](https://github.com/sgl-project/sglang/issues/31045).

## 6. What This Means for Application Developers

- **Stay on v0.5.19 for production.** DeepSeek-V4.1, GLM-5.3-Flash, SenseNova-U1, and gfx950/NPU PD paths are still landing on `main` / 0.5.20.dev. Pin a nightly only if you need those models and can absorb CI flake.
- **Agent / multi-turn stacks using HiCache + PD:** treat [#21846](https://github.com/sgl-project/sglang/issues/21846), [#39147](https://github.com/sgl-project/sglang/issues/39147), and [#35241](https://github.com/sgl-project/sglang/issues/35241) as known risk. Health-check traffic can poison DP routing under long prefill. Hybrid cache pools can claim a prefix hit that cannot be restored.
- **Tool-calling / structured output:** do not trust DeepSeek DSML argument JSON as-is ([#38924](https://github.com/sgl-project/sglang/issues/38924)). Cap or sanitize client-supplied JSON Schema depth ([#39125](https://github.com/sgl-project/sglang/issues/39125)). Do not assume `include_reasoning=false` is honored ([#39103](https://github.com/sgl-project/sglang/issues/39103)).
- **Disaggregated serving:** runtime P↔D role switch ([#28403](https://github.com/sgl-project/sglang/pull/28403)) and DCP `fi_a2a` default ([#39165](https://github.com/sgl-project/sglang/pull/39165)) will change how you size and reconnect P/D pools. Plan for a comm-backend default flip on non-Kimi models.
- **Multimodal / session APIs:** if you append text after an image in a session, wait for [#39144](https://github.com/sgl-project/sglang/pull/39144) before relying on position continuity.
- **Security:** keep an eye on [#18397](https://github.com/sgl-project/sglang/pull/18397) (ReDoS) and [#39125](https://github.com/sgl-project/sglang/issues/39125) (grammar DoS) before exposing constrained decoding or Pythonic tool parsers to untrusted clients.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-12

Source: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · latest tags around **b10919**. Site: [llama.app](https://llama.app)

## 1. This Week's Highlights

Backend work is the center of gravity: Metal fusion was unified into a single table, HIP/CUDA Flash Attention was retuned for RDNA4 (`gfx1201`), Vulkan and OpenCL picked up correctness and kernel coverage, and WebGPU moved onto a newer Dawn. Model-side, MTP KV-cache allocation was fixed for DeepSeek2 / GLM-4-MoE / Cohere2-MoE, and the server no longer breaks speculation after an image. On the issue tracker, speculative decoding vs quantized targets, ROCm 7.14 / RDNA4 VRAM and FA regressions, SYCL/Vulkan Intel Arc crashes, and long-running requests for disk KV offload, router presets, and an XDNA backend remain the loudest operational themes.

## 2. Releases & Breaking Changes

Recent tags (last ~24h): [b10919](https://github.com/ggml-org/llama.cpp/releases/tag/b10919) through [b10901](https://github.com/ggml-org/llama.cpp/releases/tag/b10901).

| Tag | Change | Notes |
|---|---|---|
| [b10919](https://github.com/ggml-org/llama.cpp/releases/tag/b10919) | WebGPU Dawn bump ([#28683](https://github.com/ggml-org/llama.cpp/pull/28683)) | Needed for `wasi:webgpu` / `webgpu_upstream` without native-only Dawn features |
| [b10917](https://github.com/ggml-org/llama.cpp/releases/tag/b10917) | CMake: skip PCH for `llama-server` on MSVC ([#28763](https://github.com/ggml-org/llama.cpp/pull/28763)) | Fixes a build break introduced with PCH/unity ([#28091](https://github.com/ggml-org/llama.cpp/pull/28091)) |
| [b10909](https://github.com/ggml-org/llama.cpp/releases/tag/b10909) | Metal fusion table rewrite ([#28164](https://github.com/ggml-org/llama.cpp/pull/28164)) | Single source of truth for fusable ops; debug path reworked |
| [b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906) | Server: speculation after images ([#28715](https://github.com/ggml-org/llama.cpp/pull/28715)) | Drafter now gets real position, not token count; `n_past` renamed to `pos0` internally |
| [b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907) | MTP KV cache sizing ([#28630](https://github.com/ggml-org/llama.cpp/pull/28630)) | Affects DeepSeek2, GLM-4-MoE, Cohere2-MoE |

No documented public `libllama` API break in this window; the standing changelog issue remains [#9289](https://github.com/ggml-org/llama.cpp/issues/9289). MSVC + PCH builders should pull **b10917+**. Multimodal + speculative serving needs **b10906+**.

## 3. New Model & Hardware Support

**Landed**
- MTP context KV allocation for **DeepSeek2, GLM-4-MoE, Cohere2-MoE** — [b10907 / #28630](https://github.com/ggml-org/llama.cpp/pull/28630)
- **OpenCL**: A8 **Q4_0** matmul binary kernel — [b10902 / #28268](https://github.com/ggml-org/llama.cpp/pull/28268)
- **WebGPU**: current Dawn; WASI path without Dawn-native features — [b10919](https://github.com/ggml-org/llama.cpp/releases/tag/b10919), [#27069](https://github.com/ggml-org/llama.cpp/pull/27069)
- **HIP/RDNA4 (`gfx1201`)**: MMA Flash Attention for head size 256, grid vs stream-k policy — [b10905 / #28102](https://github.com/ggml-org/llama.cpp/pull/28102)

**In flight**
- Maple **20B-A1B ternary MoE** (TQ1_0/TQ2_0, 256 experts / 8 active, SWA+global) — [#27000](https://github.com/ggml-org/llama.cpp/pull/27000)
- **STQ1_0** sparse ternary + ARM NEON `vec_dot` (Sherry / ACL 2026) — [#22836](https://github.com/ggml-org/llama.cpp/pull/22836)
- CUDA FAttn vector kernels for **K=Q8_0, V=Q4_0** — [#27269](https://github.com/ggml-org/llama.cpp/pull/27269)
- Hexagon **row-split** multi-NPU (`--split-mode row`) — [#28589](https://github.com/ggml-org/llama.cpp/pull/28589) (closed, merge-ready earlier)
- Dedicated **Ling 3.0 / Bailing V3** chat parser (pre-opened `<think>` + tools) — [#28682](https://github.com/ggml-org/llama.cpp/pull/28682)
- Feature asks still open: **XDNA backend** ([#21725](https://github.com/ggml-org/llama.cpp/issues/21725), 32 👍), **RDMA RPC** ([#9493](https://github.com/ggml-org/llama.cpp/issues/9493)), OpenVINO Gemma-4 load ([#24415](https://github.com/ggml-org/llama.cpp/issues/24415))

## 4. Performance & Optimization

- **Metal**: idle-thread fix in remaining IQ `mul_mv` kernels when `ne00 < 1024` (iq1_s/m and siblings) — [b10908 / #28692](https://github.com/ggml-org/llama.cpp/pull/28692). Fusion patterns now one table consumed by optimizer + runtime — [#28164](https://github.com/ggml-org/llama.cpp/pull/28164).
- **HIP FA on gfx1201**: enable MMA FA at head 256; prefer whole-tile grids over stream-k on AMD WMMA — [#28102](https://github.com/ggml-org/llama.cpp/pull/28102). Counterpoint: after rocWMMA removal, native `fattn-mma-f16` was reported **up to ~2× slower on prompt processing at depth** on RDNA4; decode unchanged or slightly faster — [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) (closed after the tuning work).
- **Vulkan**: idle-context copies use CPU writes — [b10901 / #28618](https://github.com/ggml-org/llama.cpp/pull/28618).
- **SYCL**: graph record/replay port of CUDA graphs — [#28725](https://github.com/ggml-org/llama.cpp/pull/28725); scratchpad / >4GB iGPU alloc — [#27689](https://github.com/ggml-org/llama.cpp/pull/27689); oneDNN scratchpad pool order — [#28704](https://github.com/ggml-org/llama.cpp/pull/28704).
- **CUDA**: missing AMD GCN MMQ wave64 configs (avoid RDNA2 fallback) — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841); optional `dp4a` via `dp2a` — [#24616](https://github.com/ggml-org/llama.cpp/issues/24616).
- Capacity ideas with traction: disk KV checkpoint offload `--cache-disk` ([#20697](https://github.com/ggml-org/llama.cpp/issues/20697), 48 👍); two-tier GPU+RAM MoE expert cache ([#20757](https://github.com/ggml-org/llama.cpp/issues/20757), closed).

## 5. Stability & Regressions

Ranked by operational severity.

**High — wrong or divergent outputs**
- Speculative decoding (draft-MTP / draft-dspark) **diverges from greedy vanilla on quantized targets**; bf16 targets match; ngram speculation OK — [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)
- MTP **retains inter-request state** → non-deterministic / degrading Qwen3.6-35B-A3B-MTP — [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)
- Parallel `tool_calls` mangled/hung on Qwen with large optional-param tools — [#28522](https://github.com/ggml-org/llama.cpp/issues/28522) (closed)
- Qwen3.5 thinking + tools: parser fails if text precedes `<tool_call>` (`peg-native`) — [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) (closed, 34 comments)
- Speculation timeout (Vulkan / Qwen3.6) — [#23268](https://github.com/ggml-org/llama.cpp/issues/23268) (closed)

**High — won’t start / won’t allocate**
- ROCm 7.14 + gfx1201: VRAM not allocated — [#26208](https://github.com/ggml-org/llama.cpp/issues/26208) (closed)
- ROCm 7.14: missing `libhipblas.so.3` — [#25807](https://github.com/ggml-org/llama.cpp/issues/25807)
- SYCL garbage on **second** prompt — [#26845](https://github.com/ggml-org/llama.cpp/issues/26845) (closed)
- Vulkan Intel Arc A770 assert `wg0 > maxComputeWorkGroupCount` on Qwen 3.8 flash — [#28247](https://github.com/ggml-org/llama.cpp/issues/28247) (closed)
- Vulkan Intel B70 MoE crash — [#23769](https://github.com/ggml-org/llama.cpp/issues/23769)
- Gemma-4-E4B CUDA scheduler assert `n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS` — [#24132](https://github.com/ggml-org/llama.cpp/issues/24132)
- RPC + AMD `top_k` sampling: `GGML_ASSERT(shared_mem <= smpb)` in `argsort.cu` — [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) (closed). Related Vulkan argsort race/OOB fixed in [b10903 / #28705](https://github.com/ggml-org/llama.cpp/pull/28705)

**Medium — power, buffers, parsers**
- SYCL `-cb` pins Battlemage at `gt-c0` / boost, no idle savings — [#24946](https://github.com/ggml-org/llama.cpp/issues/24946)
- Mixed-GPU Qwen-Next Flash compute-buffer over-allocation — [#27953](https://github.com/ggml-org/llama.cpp/issues/27953)
- Server `response_format.json_schema` ignores non-wrapped schema — [#28697](https://github.com/ggml-org/llama.cpp/pull/28697)
- Preset name / ignore bugs in server — [#25150](https://github.com/ggml-org/llama.cpp/issues/25150)
- RPC weight-cache hashing activations (partial cache) — [#28789](https://github.com/ggml-org/llama.cpp/pull/28789)

## 6. What This Means for Application Developers

- **Ship b10906+ if you do vision + speculative decoding.** Position, not token count, is now passed to every drafter; older servers can silently mis-speculate after an image.
- **Treat quantized-target speculation as unverified.** Greedy draft-MTP on Q4/Q8 can diverge from the non-speculative path ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)). Keep a non-spec baseline in CI, or pin bf16 targets for exact match.
- **MTP models need the KV-cache fix and a process-lifetime hygiene check.** DeepSeek2 / GLM-4-MoE / Cohere2-MoE should be on **b10907+**. If you reuse a server process across chats on Qwen3.6-MTP, watch [#26425](https://github.com/ggml-org/llama.cpp/issues/26425) — recycle the slot/process if outputs drift.
- **Tool-calling parsers are still model-template specific.** Qwen thinking models that emit prose before `<tool_call>`, and Ling 3.0’s pre-opened `<think>`, need dedicated parsers ([#20260](https://github.com/ggml-org/llama.cpp/issues/20260), [#28682](https://github.com/ggml-org/llama.cpp/pull/28682)). Don’t assume generic `peg-native` is enough for agent loops.
- **RDNA4 / ROCm 7.14 is in flux.** FA prompt-processing regression and VRAM/`libhipblas` issues landed and were partly addressed in [#28102](https://github.com/ggml-org/llama.cpp/pull/28102) / [#26208](https://github.com/ggml-org/llama.cpp/issues/26208). Benchmark PP vs TG separately before promoting gfx1201 boxes.
- **Intel Arc (Vulkan/SYCL) is the fragile edge.** Work-group limits, MoE crashes, second-prompt garbage, and `-cb` power pinning are all live. Prefer CUDA/Metal for production agents unless you are tracking those issues.
- **Server product gaps that matter for multi-tenant apps:** multiple presets on one loaded model ([#23704](https://github.com/ggml-org/llama.cpp/issues/23704)), web UI on non-native backends ([#22531](https://github.com/ggml-org/llama.cpp/issues/22531)), cached-model list/delete ([#16393](https://github.com/ggml-org/llama.cpp/issues/16393)), disk context checkpoints ([#20697](https://github.com/ggml-org/llama.cpp/issues/20697)). Plan those in your own control plane for now.
- **JSON schema on `/v1/chat/completions`:** if you send `response_format.schema` as the README shows (not nested under `json_schema.schema`), current master can drop the schema until [#28697](https://github.com/ggml-org/llama.cpp/pull/28697) lands. Use the nested OpenAI wrapper form.

Attestations for recent builds: [46774832](https://github.com/ggml-org/llama.cpp/attestations/46774832) (b10919-era), [46709648](https://github.com/ggml-org/llama.cpp/attestations/46709648).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

I'll pull the official v0.34.0 notes and a few high-signal issues so the digest is accurate.# Ollama Digest — 2026-09-12

Source: [github.com/ollama/ollama](https://github.com/ollama/ollama) · latest stable [v0.34.0](https://github.com/ollama/ollama/releases/tag/v0.34.0)

## 1. This Week's Highlights

v0.34.0 is the current stable line: local Ollama models can be used from ChatGPT Desktop (macOS app setup), structured-output latency on Apple Silicon is improved, and the OpenAI-compatible surface gained client tool search plus response compaction.

The 24h issue/PR stream is dominated by **tool-call parsing correctness** (Qwen3 / Qwen3.8 / Gemma 4 / Anthropic `/v1/messages`), **cloud proxy hangs on 0.34.0**, and **model-load regressions** on large GGUF and AMD gfx1200. Community PRs also push MLX import, parallel Qwen3.5 scheduling, and cloud TTFB timeouts.

## 2. Releases & Breaking Changes

**v0.34.0** ([release](https://github.com/ollama/ollama/releases/tag/v0.34.0), tag `d8ab4b4`, changelog [v0.33.3…v0.34.0](https://github.com/ollama/ollama/compare/v0.33.3...v0.34.0))

- ChatGPT Desktop integration (macOS Ollama app). Related docs/UI work: [#18377](https://github.com/ollama/ollama/pull/18377), [#18372](https://github.com/ollama/ollama/pull/18372), [#18383](https://github.com/ollama/ollama/pull/18383).
- Faster structured output on Apple Silicon.
- OpenAI-compat: client **tool search** and **response compaction**; RC trail also added standalone named function outputs ([#18348](https://github.com/ollama/ollama/commit/d8ab4b4)), Codex plaintext agent messages, and web-search response finalization.
- No advertised API version bump. Closed [#18393](https://github.com/ollama/ollama/pull/18393) **removes the built-in CLI agent** and restores the previous chat UI — treat as a CLI behavior revert if you scripted the agent.

Cloud-only models (`:cloud`) remain first-class; several users still request downloadable GGUF for GLM-5.1 / DeepSeek-v4.1-flash ([#15412](https://github.com/ollama/ollama/issues/15412) closed as request, [#18379](https://github.com/ollama/ollama/issues/18379) open).

## 3. New Model & Hardware Support

| Item | Status | Link |
|---|---|---|
| ChatGPT Desktop as a local-model client | Shipped in 0.34.0 | [release](https://github.com/ollama/ollama/releases/tag/v0.34.0) |
| MLX engine bump | Open | [#18235](https://github.com/ollama/ollama/pull/18235) |
| Server-side MLX safetensors import; GGUF create limited to wrap-only | Open | [#14969](https://github.com/ollama/ollama/pull/14969) |
| Hy4 preview GGUF | Requested | [#18287](https://github.com/ollama/ollama/issues/18287) |
| DeepSeek-v4.1-flash local files | Requested | [#18379](https://github.com/ollama/ollama/issues/18379) |
| IQ3_S for Qwen3.8-27B-GSQ-RCO-GGUF | **Broken** — empty `content`, `done_reason: stop` | [#18297](https://github.com/ollama/ollama/issues/18297) |
| Qwen2.5-Coder-3B official q2_K / q3_K_* library artifacts | **Functionally broken** (0/15 code tasks) | [#18252](https://github.com/ollama/ollama/issues/18252) |
| ppc64le | Still open since 2023 | [#796](https://github.com/ollama/ollama/issues/796) |
| AMD RX 9060 XT (gfx1200) ROCm Tensile library | Load failure | [#17782](https://github.com/ollama/ollama/issues/17782) |
| Jetson Orin Nano 8GB + Gemma 4 E4B multimodal projector | Host OOM on 0.34.0 | [#18396](https://github.com/ollama/ollama/issues/18396) |
| Gemma3n projector forced off CPU (silent bad embeddings) | Closed | [#18376](https://github.com/ollama/ollama/pull/18376) |
| Keep MM projector offload on integrated ROCm APUs | Open | [#16767](https://github.com/ollama/ollama/pull/16767) |

## 4. Performance & Optimization

- **Structured output on Apple Silicon** improved in 0.34.0 ([notes](https://github.com/ollama/ollama/releases/tag/v0.34.0)).
- **Qwen3.5 / Qwen3.5-MoE parallel serving**: hardcoded `numParallel = 1` in `server/sched.go` can be lifted now that the llama.cpp crash is fixed upstream (2026-03-08). PR: [#17144](https://github.com/ollama/ollama/pull/17144).
- **Load-time regression**: Qwen3.5 122B on Strix Halo 61s → 116s from 0.24 → 0.30.4; prompt processing ~40% faster after load ([#16501](https://github.com/ollama/ollama/issues/16501)). Separate report: GPT-OSS:120b and “all models” slower to load after 0.23.4 / still present through 0.30+ ([#18373](https://github.com/ollama/ollama/issues/18373)).
- **Cloud proxy**: unbounded `http.DefaultClient` → wedge after ~45 min on 0.34.0 (works on 0.33.1). Timeout PR: [#18382](https://github.com/ollama/ollama/pull/18382); report: [#18381](https://github.com/ollama/ollama/issues/18381).
- **Windows embed storm**: `/api/embed` with keep-alive disabled exhausts loopback ports ([#18392](https://github.com/ollama/ollama/issues/18392)).
- **Manifest-list / runner-specific tags** (prep to drop llama-server compat patch): [#16590](https://github.com/ollama/ollama/pull/16590). Related eval need: include served manifest digest in `/api/chat` ([#18394](https://github.com/ollama/ollama/issues/18394)).

## 5. Stability & Regressions

Ranked by operational severity.

**P0 — Cloud hang / no recovery (0.34.0)**  
`*:cloud` wedges after ~45 min; 502 with no structured error. 0.33.1 is a workaround. [#18381](https://github.com/ollama/ollama/issues/18381), fix attempt [#18382](https://github.com/ollama/ollama/pull/18382). GLM-5.3:cloud also enters unbounded reasoning and aborts vs official Z.AI ([#18193](https://github.com/ollama/ollama/issues/18193)).

**P1 — Tool calls silently dropped**  
Parser failures return empty `content`, no `tool_calls`, `finish_reason: stop`:

- Generic parse-fail discard: [#17274](https://github.com/ollama/ollama/issues/17274)
- Qwen3 `/api/chat` `tools` param malformed defs + thinking switch: [#14601](https://github.com/ollama/ollama/issues/14601)
- Qwen3.8 “no user query found in messages” 500 during tool loop (25 👍, 28 comments): [#17778](https://github.com/ollama/ollama/issues/17778)
- Gemma 4 object keys with spaces unquoted → whole call dropped: [#18390](https://github.com/ollama/ollama/issues/18390)
- Gemma3nTools emits `<tool_call>` but `/v1` returns neither tools nor text: [#18357](https://github.com/ollama/ollama/issues/18357)
- Anthropic `/v1/messages` + complex schemas → tool call as literal text: [#18346](https://github.com/ollama/ollama/issues/18346)
- Parser PRs in flight: render tools as JSON [#18391](https://github.com/ollama/ollama/pull/18391), accept `args` field [#18388](https://github.com/ollama/ollama/pull/18388)

**P1 — Wrong / empty generation**  
IQ3_S Qwen3.8 empty output [#18297](https://github.com/ollama/ollama/issues/18297); official Qwen2.5-Coder-3B low-bit library quants 0% on code tasks [#18252](https://github.com/ollama/ollama/issues/18252).

**P2 — Hardware / load**  
gfx1200 Tensile miss [#17782](https://github.com/ollama/ollama/issues/17782); Jetson Gemma4 projector OOM [#18396](https://github.com/ollama/ollama/issues/18396); load-time regressions [#18373](https://github.com/ollama/ollama/issues/18373), [#16501](https://github.com/ollama/ollama/issues/16501). Gemma3n CPU projector corruption addressed in closed [#18376](https://github.com/ollama/ollama/pull/18376).

**P3 / noise**  
TOC ellipses cancel task [#18387](https://github.com/ollama/ollama/issues/18387). FD-leak [#18344](https://github.com/ollama/ollama/issues/18344) **withdrawn** (bad `lsof` scope).

## 6. What This Means for Application Developers

1. **Pin cloud vs local carefully.** If you use `*:cloud` on 0.34.0, add client-side deadlines now and watch [#18382](https://github.com/ollama/ollama/pull/18382). Long agent sessions should stay on 0.33.1 until the proxy timeout lands.
2. **Do not trust empty `tool_calls` as “the model declined.”** On Qwen3/3.8, Gemma 4, and Anthropic-compat, empty content + `stop` often means a **parse drop**. Log raw server traces; prefer simpler tool JSON (no spaces in keys); consider embedding tools in the system prompt until [#14601](https://github.com/ollama/ollama/issues/14601) / [#18391](https://github.com/ollama/ollama/pull/18391) / [#18388](https://github.com/ollama/ollama/pull/18388) land.
3. **Validate official library quants.** Qwen2.5-Coder-3B q2/q3 library files look fluent and score 0 on functional tests ([#18252](https://github.com/ollama/ollama/issues/18252)). IQ3_S community GGUF may complete with empty strings ([#18297](https://github.com/ollama/ollama/issues/18297)). Bind eval scores to a **manifest digest**, not a tag ([#18394](https://github.com/ollama/ollama/issues/18394), [#16590](https://github.com/ollama/ollama/pull/16590)).
4. **Desktop is now a first-class client.** ChatGPT Desktop + existing Claude Desktop paths mean local models show up in closed apps. Gate cloud recommendation UX is being tightened ([#18383](https://github.com/ollama/ollama/pull/18383)).
5. **Hardware footnotes:** AMD RDNA4 (gfx1200) and Jetson 8GB multimodal are unsafe on current 0.34.0; ROCm APU projector offload still incorrectly disabled ([#16767](https://github.com/ollama/ollama/pull/16767)). Qwen3.5 parallel decode is blocked only by a leftover scheduler denylist ([#17144](https://github.com/ollama/ollama/pull/17144)).
6. **Metadata gap for routers.** `/api/show` and `/v1/models` still omit per-model `reasoning_effort`, max output tokens, and explicit context ([#18385](https://github.com/ollama/ollama/issues/18385)). Gateways should keep their own capability table.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

I'll pull the latest LiteLLM release notes and issue/PR context from GitHub so the digest is accurate, not just the truncated titles.The official v1.100.0 notes have the breaking-change and model-support details I need; pulling those next.# LiteLLM Digest — 2026-09-12

Repo: [BerriAI/litellm](https://github.com/BerriAI/litellm) · ~58.5k stars

## 1. This Week's Highlights

Stable **v1.100.1** (10 Sep) is the current recommended tag: it backports the v1.100.0 retry-breadcrumb leak so failed attempts no longer retain every prior request body until the proxy OOM-kills. That sits on **v1.100.0** (6 Sep), which shipped shared access-group budgets, a Together AI endpoint/pricing overhaul, operator-defined auto-router tiers, MCP session hardening, and day-0 coverage for **242 models**.

The 24h window is otherwise a pre-release grind: **v1.102.0-dev.2** and **v1.101.0-rc.\*** land MCP OAuth/discovery fixes, per-model key-budget enforcement across aliases, Responses-API completeness reasons, and a 218-model price sync. The hottest still-open thread remains the March PyPI compromise (#24518, 119 comments / 136 👍) — contained, but operators keep asking for verification steps.

## 2. Releases & Breaking Changes

| Tag | Date | Channel | Notes |
|---|---|---|---|
| [v1.102.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2) | 11 Sep | pre-release | MCP logging/auth coverage, spend-log session aliases, percentile TTFT routing, hosted-vLLM image edit |
| [v1.100.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.1) | 10 Sep | **stable patch** | Backports [#39491](https://github.com/BerriAI/litellm/pull/39491) (retry breadcrumbs); **reverts** spend-attribution backports from `stable/1.100.x` ([#40495](https://github.com/BerriAI/litellm/pull/40495)) |
| [v1.102.0-dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1) | 9 Sep | pre-release | Streaming post-call guardrail pipelines, MCP OAuth relay, Bedrock GovCloud prices |
| [v1.101.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2) / [rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1) | 10 / ~9 Sep | RC | Mongo sidecar, tenant traces, team-admin callbacks |
| [v1.100.0](https://github.com/BerriAI/litellm/releases/tag/v1.100.0) | 6 Sep | **stable** | Feature release; docs: [release notes](https://docs.litellm.ai/release_notes/v1.100.0/v1-100-0) |

Deploy image: `docker.litellm.ai/berriai/litellm:1.100.0` (or `:v1.100.1`). PyPI for 1.100.0 was built from `10631eb`, Docker from `e4f2526` — team says functionally equivalent. All images are **cosign-signed** with the key introduced in [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0).

**v1.100.0 breaking changes** (do not skip if you run MCP, spend APIs, or the complexity router):

- **MCP toolsets on team / org / internal user are now enforced** ([#38488](https://github.com/BerriAI/litellm/pull/38488)). Previously they failed open. A team that relied on that will lose tools not named in the toolset — widen the toolset to restore access.
- **`GET /spend/logs` is hard-capped at 10,000 rows** ([#38420](https://github.com/BerriAI/litellm/pull/38420)). Truncation is signaled by `x-litellm-spend-logs-truncated: true`. Use paginated `GET /spend/logs/v2`.
- **`prompt_token_calculator` removed from `litellm.utils`** ([#38132](https://github.com/BerriAI/litellm/pull/38132)) → `ImportError`. Use `litellm.token_counter(model=..., text=...)`.
- **Complexity-router knobs outside `complexity_router_config` are rejected** (43 settings) ([#38570](https://github.com/BerriAI/litellm/pull/38570)). Misplaced `tier_boundaries` etc. now fail `/model/new`, `/model/update`, and config load.
- **Cerebras via Router defaults to `max_retries=0`** ([#36601](https://github.com/BerriAI/litellm/pull/36601)). The old drop-through used the SDK default of 2.
- **`router_model_name` stripped from auto-routed bodies** ([#38429](https://github.com/BerriAI/litellm/pull/38429)). Use `return_raw_model_name: true`.
- **`litellm_settings.autorouter_savings_baseline_model` deleted** ([#38700](https://github.com/BerriAI/litellm/pull/38700)). Each complexity router uses its own hardest tier as counterfactual; leftover YAML keys are ignored and **reported savings will change**.

## 3. New Model & Hardware Support

**Shipped in v1.100.0 (242 models)** — not a CUDA/ROCm/Metal change; this is gateway catalog + translation:

- **Gemini / Vertex:** `gemini-3.5-transcribe`, `gemini-3.5-transcribe-live`, `veo-3.1-lite-generate-001`, Gemma 4 instruct variants, live native-audio.
- **xAI:** `grok-4.20` family (reasoning / non-reasoning / multi-agent) and `grok-imagine` image line.
- **Mistral (24 ids):** Voxtral audio/realtime/TTS, Ministral 3B/14B, OCR 3/4, Code + Vibe CLI.
- **Video / search:** RunwayML `gen4.5`, Seedance 2, Grounding with Bing Search as a search provider.
- **Databricks / Bedrock Mantle:** Claude Fable 5 / Opus 4.7–5 / Sonnet 5, GLM-5.x, `bedrock_mantle/openai.gpt-5.6-cyber`.

**In the last 24h (not yet stable):**

- Price sync **218 models, 26 new** across Anthropic, Fireworks, Gemini, OpenAI, Together — [PR #40832](https://github.com/BerriAI/litellm/pull/40832) (open).
- Native **Prism** provider (Chat Completions + Responses + Messages) — [PR #40782](https://github.com/BerriAI/litellm/pull/40782).
- **Meta Muse Voice** realtime transcription (`meta/muse-voice-transcribe-1.0`) — [PR #39395](https://github.com/BerriAI/litellm/pull/39395).
- Together catalog gap still open: add `Kimi-K2.6` pricing — [#27450](https://github.com/BerriAI/litellm/issues/27450).
- Hosted-vLLM **image edit** and Mistral **`/v1/audio/speech`** landed on the 1.102.dev line.

No new kernel backends or quantization formats this window. Hardware story is still “talk to vLLM / Ollama / Bedrock / hosted GPUs through the proxy.”

## 4. Performance & Optimization

Concrete work, not marketing:

- **Retry-breadcrumb leak (stable).** Every failed attempt copied the full request; proxies grew until OOM. Backported to 1.100.1 ([#40455](https://github.com/BerriAI/litellm/pull/40455) / [#39491](https://github.com/BerriAI/litellm/pull/39491)). A new e2e memory regression test is on the release gate — [PR #40773](https://github.com/BerriAI/litellm/pull/40773) (closed).
- **Spend-counter coalescing** on 1.102.dev: one Redis call per request instead of per-increment; per-worker SGR upserts collapsed to one statement per flush.
- **Health-check OOM at scale** (closed): background checks loaded the entire unbounded `LiteLLM_HealthCheckTable` into every worker each cycle — [#37611](https://github.com/BerriAI/litellm/issues/37611).
- **Prompt-cache routing TTL is still hardcoded at 5 minutes**, which breaks 1-hour ephemeral cache affinity — [#28427](https://github.com/BerriAI/litellm/issues/28427) (open). Related: estimate cache-rebuild cost on model switch — [PR #40804](https://github.com/BerriAI/litellm/pull/40804).
- **vLLM `cached_tokens` not credited** in the cost calculator — [#22984](https://github.com/BerriAI/litellm/issues/22984) (open, 5 comments).
- Adaptive/quality router now records savings baseline + conversation shape — [PR #38859](https://github.com/BerriAI/litellm/pull/38859).
- Product-side: auto-router harness-aware classification for Claude Code / Codex (blog, 10 Sep) and a claimed **46% cost cut** on subtask-specific routing (7 Sep engineering posts). Treat the 46% as vendor-reported, not independently measured here.

## 5. Stability & Regressions

Ranked by blast radius. Status as of 12 Sep 12:52 JST.

### Critical / high

1. **Supply-chain incident (contained, still the loudest issue).** [#24518](https://github.com/BerriAI/litellm/issues/24518) — PyPI `1.82.7` / `1.82.8` compromised via poisoned Trivy in CI (24 Mar). Packages deleted; current releases clean; Docker path was never on those wheels. Cosign-verify every image. Townhall: [docs.litellm.ai/blog/security-townhall-updates](https://docs.litellm.ai/blog/security-townhall-updates).
2. **ReDoS in `secret_redaction.redact_string()`** — catastrophic backtracking on large exception strings blocks the event loop for minutes, kills liveness probes, crash-loops the proxy. [#32353](https://github.com/BerriAI/litellm/issues/32353) **OPEN**.
3. **End-user budget reset hits PostgreSQL’s 32,767 bind-variable limit and never completes** when many customers share one budget. [#40564](https://github.com/BerriAI/litellm/issues/40564) **CLOSED** (fix landed; confirm on 1.102.dev before promoting).
4. **False “Budget has been exceeded” on `/v1/messages` (Claude Code)** — enforced cost ≫ recorded spend (`111.29` vs `max_budget=100`). [#40050](https://github.com/BerriAI/litellm/issues/40050) **CLOSED**.
5. **No stable Claude Code → LiteLLM → vLLM path.** `hosted_vllm` corrupts Anthropic Messages streaming; `anthropic` provider has a different break. [#30043](https://github.com/BerriAI/litellm/issues/30043) **OPEN** — treat as a production blocker for that topology.

### Medium (translation / spend / MCP)

- Bedrock Converse rejects agent follow-up turns that carry tool history but omit `tools=` — [#40735](https://github.com/BerriAI/litellm/issues/40735) **OPEN**.
- Qwen3.8 tool results not consumed on **native Ollama**; OpenAI-compat `/v1` works — [#40575](https://github.com/BerriAI/litellm/issues/40575) **OPEN**.
- `parse_tool_call_arguments` drops concatenated JSON tool args (`split_concatenated_json_objects` exists but unused) — [#40582](https://github.com/BerriAI/litellm/issues/40582) **OPEN**.
- Streaming vs non-stream **fallback inconsistency** on key-level `router_settings` — [#25843](https://github.com/BerriAI/litellm/issues/25843) **OPEN**.
- Responses-API bridge drops SpendLogs for non-streaming `/v1/chat/completions` — [#36426](https://github.com/BerriAI/litellm/issues/36426) **OPEN**.
- A/B traffic mirroring documented but not firing — [#31888](https://github.com/BerriAI/litellm/issues/31888) **OPEN**.
- `/metrics` empty after 307 redirect post-1.88.0 — [#30079](https://github.com/BerriAI/litellm/issues/30079) **OPEN**.
- `max_budget` ignored after monthly reset — [#27300](https://github.com/BerriAI/litellm/issues/27300) **CLOSED**.
- `ResetBudgetJob` global crash when `budget_limits` is a list not JSON-serialized — [#27171](https://github.com/BerriAI/litellm/issues/27171) **CLOSED**.
- Clean EOF with no `finish_reason` no longer counted as success; raises `MidStreamFallbackError` so fallback can fire — [PR #40353](https://github.com/BerriAI/litellm/pull/40353) **CLOSED** (fixes #40260).

### MCP / auth (active PR burst)

Closed in the last day: gateway auth for root discovery ([#40791](https://github.com/BerriAI/litellm/pull/40791)), per-server OAuth issuer match ([#40808](https://github.com/BerriAI/litellm/pull/40808)), cache upstream discovery lists ([#40790](https://github.com/BerriAI/litellm/pull/40790)). Related older bug (temp OAuth server not inheriting URLs) [#20495](https://github.com/BerriAI/litellm/issues/20495) is **CLOSED**.

## 6. What This Means for Application Developers

**Pin 1.100.1, not `main-latest`.** The 1.102.dev / 1.101-rc trains are moving MCP, budget, and Responses semantics daily. Cosign-verify the digest before promoting an image.

**If you front Claude Code, Codex, or openai-agents:**  
- Budget math on `/v1/messages` has been lying high — re-check virtual-key spend after #40050.  
- GPT-5.4 + `reasoning_effort` + tools through openai-agents still failed historically ([#23156](https://github.com/BerriAI/litellm/issues/23156)).  
- Bedrock Mantle + Codex: `reasoning.summary` other than `auto` 400s; gated on the OpenAI Responses path — [PR #40798](https://github.com/BerriAI/litellm/pull/40798).  
- Hosted Claude web-search coming back as a client function (`unsupported call: web_search`) is being fixed by preserving native `web_search_call` items — [PR #40828](https://github.com/BerriAI/litellm/pull/40828).  
- New CLI path: `lite configure` can write Claude Code **and** Codex against one gateway key — [PR #40829](https://github.com/BerriAI/litellm/pull/40829).  
- **Do not** put Claude Code → vLLM in production through LiteLLM until #30043 has a named stable route.

**MCP / agent platforms:** toolsets are now deny-by-default at team/org/user. Audit every attached toolset before upgrading past 1.100.0 or tools vanish. Microsoft Agent 365 pre-exec guardrail for MCP is in flight ([#38241](https://github.com/BerriAI/litellm/pull/38241)). NeMo Guardrails still a feature request ([#25255](https://github.com/BerriAI/litellm/issues/25255)).

**Cost / routing:** access-group shared budgets + optional rollover are the reason to upgrade if you bill by team. Per-model key budgets now honor aliases ([#40819](https://github.com/BerriAI/litellm/pull/40819) closed). vLLM prompt-cache hits are still over-billed (#22984). Prompt-cache affinity dies at 5 minutes (#28427). Fake-streaming is still not a first-class toggle (#30208).

**Observability:** `/spend/logs` will truncate; migrate scrapers to `/spend/logs/v2`. Prometheus `/metrics` 307 empty-body is still open on some 1.88+ deploys. Internal users still don’t see prompt bodies on `/spend/logs/ui` even with `store_prompts_in_spend_logs=true` (#34099). Don’t paste the raw `model` string into error text — that leaked prompts into spend logs ([#40820](https://github.com/BerriAI/litellm/pull/40820)).

**Operational hygiene:** if exception strings can be large (tool dumps, raw provider bodies), #32353 can take the event loop down. Cap what you log into redaction until that regex is replaced. Budget-reset jobs that `IN (...)` tens of thousands of user IDs need the batched fix from #40564.

**Bottom line:** 1.100.1 is the first 1.100.x build I would put behind a load balancer. Keep 1.102.dev for MCP/OAuth and Responses-bridge work only. Treat Claude-Code-on-vLLM and ReDoS redaction as open production risks.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

I'll pull the official Unsloth repo pages and recent release notes so the digest is accurate.# Unsloth Digest — 2026-09-12

Repo: [github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. This Week's Highlights

Unsloth shipped **v0.1.807-beta** (Sep 8) and **v0.1.808-beta** (Sep 9) as a combined performance and reliability wave: diffusion 1.2–1.7× faster, AMD Vulkan default (~20% vs ROCm), PyTorch 2.11 default, ~60% smaller Python package, and a new official Docker image. Studio is simultaneously being rebuilt around Codex-style project workspaces (durable agent turns, sandboxed edits, Git worktrees, verification, hooks). Long-standing hardware pain on AMD Strix / iGPUs and Windows AV false positives is explicitly called out as fixed in these betas.

## 2. Releases & Breaking Changes

| Version | Date | Notes |
|---|---|---|
| [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta) | 2026-09-09 | Current latest. Large perf + reliability. PyTorch **2.11** default (2.14 “soon”). Wheel-only PyPI publish (no sdist). New Docker: [hub.docker.com/r/unsloth/unsloth](https://hub.docker.com/r/unsloth/unsloth). |
| [v0.1.807-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta) | 2026-09-08 | AMD **Vulkan by default**. Signed Windows `llama-server.exe` (fewer SAC/AV false positives). AMD Strix / iGPU gibberish fixes (also reported upstream to AMD). |

**Migration notes**

- Installers now pin `unsloth>=2026.9.2` and Torch 2.11 extras (`cu126` / `cu128` / `cu130` + xformers 0.0.35). Reinstalls on Windows keep a supported Torch rather than silently upgrading into breakage.  
- AMD inference path change: **Vulkan is the default** for Strix Halo / Strix Point and for AMD iGPUs without ROCm on Linux. Expect different kernel behavior and VRAM accounting vs ROCm.  
- AppImage toolchain is pinned; previous laggy AppImage builds should be replaced, not patched in place.  
- Studio Codex default login model is now **gpt-6-astra**. OpenAI-compatible streaming / audio / model-load handling changed with it.  
- Package layout: PyPI publishes **wheel only** ([#10202](https://github.com/unslothai/unsloth/pull/10202)); source installs should go through Git or the official install scripts.

## 3. New Model & Hardware Support

- **AMD / Vulkan**: default backend for Strix Halo, Strix Point, and ROCm-less AMD iGPUs. Strix iGPU BIOS popup called out — more iGPU VRAM can yield ~3× inference. [v0.1.808 notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta)  
- **Apple Silicon / MLX**: self-heal/update path no longer tanks infer + train; DoRA and additional DPO losses; batched MLX generation streams per chat; more VLMs fine-tunable from text-only data; gated-delta training up to 25% faster. Certification work for agent workspaces on real MLX: [#10823](https://github.com/unslothai/unsloth/pull/10823).  
- **Windows**: signed llama.cpp binaries; clearer code-integrity errors when model load is blocked.  
- **Docker**: native AMD64 + ARM64 images; NVIDIA images from Turing through Blackwell.  
- **Studio integrations**: Blender MCP, Hermes detection, GPT-6 Astra Codex logins.  
- **Still open / incomplete**: Apple Silicon as a first-class training target remains a long-running roadmap item ([#4](https://github.com/unslothai/unsloth/issues/4), 644 👍). Intel Arc B580 import still historically broken via `torch.xpu.memory.mem_get_info()` ([#3533](https://github.com/unslothai/unsloth/issues/3533)). Multi-GPU fine-tune remains a frequent request ([#1707](https://github.com/unslothai/unsloth/issues/1707)).

## 4. Performance & Optimization

From [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta):

- Diffusion INT8/FP8: **1.2–1.7×** faster (all listed diffusion models).  
- AMD vs ROCm via Vulkan: **~20%** prefill + decode.  
- Strix Halo: **+23%** prompt processing, **+8%** generation.  
- Gated-delta training on Apple Silicon: up to **25%** faster.  
- Quantized MLX KV cache: up to **74%** less prompt memory.  
- Installer/update path: **~2×** faster updates; Python package **>60%** smaller.  
- Diffusion host-RAM leak on offload: [#10184](https://github.com/unslothai/unsloth/pull/10184).  
- llama.cpp prefill no longer times out while still advancing: [#10172](https://github.com/unslothai/unsloth/pull/10172).  
- Audio models can load into CPU RAM instead of forcing GPU: [#10054](https://github.com/unslothai/unsloth/pull/10054).

Related product work (compaction / rolling context) is still a live feature request ([#7472](https://github.com/unslothai/unsloth/issues/7472)); auto-compaction itself shipped earlier in the 0.1.801 line.

## 5. Stability & Regressions

Ranked by operational impact. Many older issues were touched on 2026-09-09 (bulk close/update), so treat “CLOSED” as *claimed fixed pending confirmation* unless a release note names the fix.

**High**

- AMD GPU advertised but Studio runs CPU-only / VRAM `--` ([#8473](https://github.com/unslothai/unsloth/issues/8473), closed). Same class as Strix Halo loading against system RAM instead of 110 GB unified GPU memory ([#6834](https://github.com/unslothai/unsloth/issues/6834)). 807/808 Vulkan + memory-accounting work is the intended fix; verify on device.  
- Studio “Don’t reserve system RAM” ignored on Windows even when the GGUF fits in VRAM ([#9033](https://github.com/unslothai/unsloth/issues/9033), **open**).  
- Long Qwen3.8 GGUF chats lose reusable prompt state after reload → ~11 min full prefill ([#9037](https://github.com/unslothai/unsloth/issues/9037), **open**).  
- IPv6 bind blackhole kills Studio backend health check ([#10803](https://github.com/unslothai/unsloth/pull/10803), **open**).  
- `--tensor-split` ignored ([#10355](https://github.com/unslothai/unsloth/issues/10355), **open**).

**Medium**

- vLLM backend from Desktop 0.1.807: `min_p` and `logit_bias` not supported ([#10573](https://github.com/unslothai/unsloth/issues/10573), **open**).  
- Studio CI multi-turn determinism smoke flakes on merge base ([#10004](https://github.com/unslothai/unsloth/issues/10004)).  
- Qwen3-Coder-Next-Base QLoRA OOM on 2×A100 ([#4040](https://github.com/unslothai/unsloth/issues/4040)).  
- Gemma 3n recursion depth ([#3650](https://github.com/unslothai/unsloth/issues/3650)); Qwen2 Kaggle `slice_indices` NameError ([#3450](https://github.com/unslothai/unsloth/issues/3450)).  
- Training correctness: all-labels-`-100` ZeroDivision on Phi-3.5/4 ([#2364](https://github.com/unslothai/unsloth/issues/2364)); prompt-completion dataset mismatch vs TRL ([#3399](https://github.com/unslothai/unsloth/issues/3399)); vision `fetch_video` NameError ([#3086](https://github.com/unslothai/unsloth/issues/3086)).

**Lower / docs / Studio UX**

- Codex + local llama.cpp + Responses API docs stale ([#5141](https://github.com/unslothai/unsloth/issues/5141)).  
- Data Recipes missing dataset download / extra nodes ([#10637](https://github.com/unslothai/unsloth/issues/10637)).  
- GGUF export failures after successful Studio fine-tunes ([#4845](https://github.com/unslothai/unsloth/issues/4845)).  
- Persistent “always picks CPU after reboot” ([#5807](https://github.com/unslothai/unsloth/issues/5807)).

## 6. What This Means for Application Developers

- **Pin 0.1.808-beta + Torch 2.11** for new Studio/Desktop and Docker deploys. Do not assume ROCm is still the AMD fast path.  
- **Treat Studio as an agent runtime, not just a fine-tune UI.** The last 24h of PRs ([#10365](https://github.com/unslothai/unsloth/pull/10365), [#9673](https://github.com/unslothai/unsloth/pull/9673), [#10577](https://github.com/unslothai/unsloth/pull/10577), [#10594](https://github.com/unslothai/unsloth/pull/10594), [#10636](https://github.com/unslothai/unsloth/pull/10636), [#10658](https://github.com/unslothai/unsloth/pull/10658)) add durable tool loops, sandboxed file edits, owned Git worktrees, hooks, and verification evidence. If you embed Studio as a coding agent, plan for tab-close recovery and approval-gated tool cards.  
- **OpenAI-compat is not drop-in across backends.** Codex Responses docs, vLLM `min_p`/`logit_bias`, and tensor-split are active gaps. Probe sampling params per backend.  
- **Prefill cache is not durable across Studio model reload** for long Qwen3.8 GGUF sessions. Budget cold-prefill or keep the process warm.  
- **Memory accounting on APUs and “model fits in VRAM” toggles is still untrustworthy** on Windows/AMD. Measure RSS + VRAM yourself before promising single-box serving.  
- **Training API surface still lags TRL** on prompt-completion datasets and some vision collators. Keep a TRL-only fallback for those formats.  
- **Ops**: prefer the official Docker image over ad-hoc pip extras; watch IPv6 bind and signed-binary/AV behavior on Windows CI agents.

Core update path remains `pip install --upgrade unsloth unsloth_zoo` or the Desktop in-app updater ([docs](https://unsloth.ai/docs/get-started/install/updating)).

</details>