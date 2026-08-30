# AI Infrastructure Digest 2026-08-30

> Generated: 2026-08-30 07:55 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

I'll pull current GitHub activity numbers so the comparison table is grounded in the same 24-hour window as the digests.# AI Infrastructure Cross-Project Comparison — 2026-08-30

Window: vLLM **v0.28.0** (26 Aug) plus 24h repo activity across vLLM, SGLang, llama.cpp, Ollama, LiteLLM, and Unsloth.

---

## 1. Ecosystem Overview

This week the stack is mid-cycle on the same two model families: **Kimi-K3 / DeepSeek-V4** as the production performance target, and **GLM-5.3-Flash / Qwen3.8-Flash-Next** as the day-0 hybrid sparse + linear-attention race. Cluster engines (vLLM, SGLang) shipped or are landing kernel-level wins — combined all-gathers, DCP, fused FlashKDA, HiCache, PD connectors — while local runtimes (llama.cpp, Ollama, Unsloth) are chasing the same architectures on Metal, Vulkan, MLX, and 1-bit GGUF offload. Gateways (LiteLLM) are not competing on kernels; they are absorbing Anthropic `/v1/messages` fidelity, spend correctness, and registry rows for the same Flash models. The operational picture is uneven: **stable pins exist** (vLLM 0.28.0, SGLang 0.5.18, Ollama 0.33.2, LiteLLM 1.98.0), but Flash serving is still recipe/nightly/beta, and GB10 / DGX Spark (sm_121), Ada 4090, and Strix Halo HIP are the sharpest hardware edges. Speculative decode (DSpark / DFlash / MTP / EAGLE) is everywhere and still not production-safe under concurrency or quantization.

---

## 2. Activity Comparison

Exact 24-hour GitHub issue/PR totals are only published for LiteLLM. Other rows use the figures each digest actually reported (release-window commits/PRs, plus 24h release cadence).

| Project | Latest stable | In-window tags | Reported activity | Release posture |
|---|---|---|---|---|
| **vLLM** | [v0.28.0](https://github.com/vllm-project/vllm/releases/tag/v0.28.0) (26 Aug) | + `v0.28.1rc0` (27 Aug) | **584 commits / 270 contributors** (76 first-time) in 0.28.0; day-0 Flash PRs still open | Production pin 0.28.0; Flash models are recipe images, not `main` |
| **SGLang** | [v0.5.18](https://github.com/sgl-project/sglang/releases/tag/v0.5.18) (21 Aug) | No tag in last 24h; nightly `20260829` | **710 PRs / 212 contributors** (61 first-time) in 0.5.18; CI: 2 broken, 8 flaky, 876 recently fixed | Conservative pin 0.5.18; Flash / HiCache on `0.5.19.dev` only with soak |
| **llama.cpp** | [v0.3.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0) (25 Aug) | Nightlies **b10681–b10690** | Backend-heavy nightlies (Metal FA-vec, OpenCL Adreno, SYCL `--fit`, Vulkan `mul_mat_id`) | Pin by backend, not calendar; no public API break |
| **Ollama** | [v0.33.2](https://github.com/ollama/ollama/releases/tag/v0.33.2) (27 Aug) | v0.33.1 (26 Aug) → v0.33.2 (27 Aug) | Two patch releases aimed at desktop / Claude Desktop | Fast consumer cadence; no documented API break |
| **LiteLLM** | [v1.98.0](https://docs.litellm.ai/release_notes/) (22 Aug) | `v1.100.0-rc.1`, `v1.99.0-rc.2`, `v1.100.0-dev.{1,2}` | **93 issues + ~500 PRs** touched in-window | Stay on 1.98.0 for prod; RC only for Anthropic / cache-savings fixes |
| **Unsloth** | `v0.1.804-beta` | 0.1.802–0.1.804-beta | **~170 PRs** in 0.1.803-beta; 100+ chat/reliability/perf changes in 0.1.804 | Beta is the Flash-model floor; older llama.cpp rejects `qwen4exp` |

**Read:** LiteLLM has the highest control-plane churn. vLLM and SGLang have the largest *release-batch* contributor bases. llama.cpp ships the most frequent *binary* cadence. Ollama and Unsloth are productizing the same models for desktop/local rather than competing on cluster kernels.

---

## 3. Model Support Race

Target models this week: **GLM-5.3-Flash**, **Qwen3.8-Flash-Next**, plus residual **Kimi-K3 / DeepSeek-V4** hardening.

| Model / family | vLLM | SGLang | llama.cpp | Ollama | Unsloth | LiteLLM |
|---|---|---|---|---|---|---|
| **GLM-5.3-Flash** | Day-0 PR [#53906](https://github.com/vllm-project/vllm/pull/53906) (open, recipe image `glm53-flash-cu129`); ROCm `gate_score` missing; **no sparse-MLA on Ada sm_89** | Day-0 image exists; **FP8 KV blocked**, GB10 prefill >~40k kills worker | Sparse flash-attn PR in review | Request open [#17741](https://github.com/ollama/ollama/issues/17741); cloud + Claude Code 400s | **Shipped** in 0.1.804-beta (1-bit ~93GB, 1M ctx) | Friendli registry rows + pricing |
| **Qwen3.8-Flash-Next** | Day-0 PR [#53896](https://github.com/vllm-project/vllm/pull/53896) (open); PLE CPU offload deadlocks on TP=1 GB10 | Domino / DFlash V2 path for Qwen3-8B-Domino; Flash-Next not the headline | Qwen4 / Flash-Next indexer + LoRA→GGUF in review | **MLX shipped** in 0.33.1; cloud request closed | **Shipped** (1-bit on 75GB RAM, n-gram mmap) | Routed via registry, not a runtime |
| **Kimi-K3 / DSv4** | **Production story of 0.28.0** (DCP, FlashKDA, shared-expert sharding); Kimi-K2.6 reasoning still garbles | K3 on MI355X **1.37–1.77×** throughput; DSv4 LMHead 320µs → 169µs | Sparse FA + DFlash2 NVFP4 scales in review; HIP corruption on gfx1151 | Not the week's ship | Not the week's ship | Kimi K2.7 Code pricing row |
| **Diffusion / image** | Orthrus speculative decode WIP | FLUX.2 NVFP4 FF fusion, Qwen-Image TP, GLM-Image AR/DiT overlap | Audio-out in mtmd still design-only | — | — | grok-imagine registry; `/images` still flaky |
| **Local 1-bit / GGUF** | N/A (GPU serving) | N/A | Architecture support in flight | MLX + llama.cpp bump | **Ahead** — Dynamic 1-bit GGUF + Studio | N/A |

**Who is ahead**

- **Cluster GPU serving of Flash models:** vLLM and SGLang are tied on *intent*, neither is stable. vLLM has official recipes and Docker tags; SGLang has a named image and more open production blockers (FP8 KV, silent GB10 death).
- **Kimi-K3 / DeepSeek-V4 at scale:** vLLM 0.28.0 is the release you can actually pin. SGLang 0.5.18 already has the AMD and LMHead numbers in a tagged build.
- **Consumer / unified-memory Flash:** Unsloth 0.1.804-beta is first to claim runnable 1-bit Qwen-Flash on 75GB RAM and GLM-Flash on ~102GB combined. Ollama has Qwen-Flash on MLX only. llama.cpp is the backend both wrap, and is still merging indexer / sparse-FA / NVFP4-scale patches.
- **Gateway coverage:** LiteLLM can *route and price* Friendli GLM-5.3 / Flash today; that is not the same as serving them.

Treat Flash as **recipe + soak**, not a fleet default, on every engine except Unsloth’s explicitly beta local path.

---

## 4. Performance Frontier

Optimization is concentrated in five places. They are not the same problem.

**KV cache, prefix reuse, and long context**  
SGLang’s center of gravity is **HiCache / Unified Cache / PD consistency** (decode retraction leak, chunked-prefill radix, write-through still cannot cover a first extend > `chunked_prefill_size`). vLLM enabled **Mamba prefix cache by default**, raised `max_num_batched_tokens` 8k → **16k**, and is fighting hybrid GDN + MTP cache misses plus DFlash2 + YaRN zero-reuse on 1.04M prompts. llama.cpp is still blocked on extending `-c` past the trained window in llama-server. Unsloth made **repeated (“infinite”) compaction** a first-class path.

**Quantization**  
The live formats are **FP8 KV, NVFP4, MXFP4/MXFP8, W4A8, 1-bit Dynamic GGUF**. Wins: vLLM Hopper FP8 group-128 fast path and FlashInfer SM90 MXFP4×FP8 fused MoE; SGLang NVFP4→MXFP4 on AMD; Unsloth 1-bit Flash GGUFs (79–85% smaller than BF16). Cliffs: SGLang MXFP8 slower than BF16 on B200/GB200 for Qwen3-30B-A3B; FlashInfer NVFP4 MoE tile-192 **NaNs** after `0.6.16rc4`; vLLM quantized DFlash drafters can **silently corrupt**; llama.cpp NVFP4 DFlash drafts accept ~0 tokens without scales.

**Speculative decoding**  
Every engine is shipping a variant (DSpark, DFlash/DFlash2, MTP, EAGLE, Ngram, Domino, Orthrus). Measured upside exists — vLLM adaptive spec **~60% better DSpark TTFT** — but the week’s P0/P1 list is dominated by spec+quant and spec+concurrency: vLLM fused-KV `F.linear` on sliced weights; llama.cpp draft-MTP acceptance **0.0** under `-np N`; SGLang `fast_topk_v2` wrong set at k=2048; multi-node DSpark TP deadlock (closed after diagnosis, still a class of failure).

**Distributed serving and disaggregation**  
vLLM: DCP, combined all-gathers **1.5–3×**, shared-expert sharding **~17 GiB/GPU**, NIXL DCP-for-MLA **reverted today**. SGLang: PD protocol unification across Mooncake / NIXL / Mori still open; sticky `failed_sessions` marked closed. This layer is moving faster than its contracts.

**Local kernels and offload**  
llama.cpp: Metal FA-vec tables for M1 Max / M2 / M4 Pro, OpenCL Adreno GEMM, Vulkan `mul_mat_id` K-padding, SYCL peak-VRAM `--fit`. Unsloth claims **5× RAM-offload inference**; community counter-data says the smart `-ot` planner lost to `--fit on` in 40/43 cells on a 6-core desktop. Ollama’s bottleneck is not kernels — it is **MLX prefix-cache RSS** (hard-coded 8 GiB budget) and iGPU/Vulkan alloc.

**Hardware that is failing this week:** GB10 / DGX Spark (sm_121) across vLLM and SGLang; Ada 4090 for GLM-Flash sparse-MLA; Strix Halo HIP (use Vulkan on llama.cpp); FlashInfer version pins on GLM and NVFP4 MoE.

---

## 5. Layer Positioning

```
Training / local FT          Unsloth (QLoRA, incoming GRPO in Studio)
        │
Local runtime                llama.cpp  ←── Ollama (product + MLX + desktop)
        │                    Unsloth Studio (llama.cpp + GGUF + compaction)
        │
Cluster serving engines      vLLM  ·  SGLang
        │
LLM gateway / control plane  LiteLLM  (and Ollama/Claude Desktop as a consumer proxy)
```

| Layer | Projects | Job this week | Do not use them for |
|---|---|---|---|
| **Cluster inference engine** | vLLM, SGLang | Throughput, MoE/MLA kernels, PD, prefix cache at 100k–1M tokens, multi-node | Desktop UX, 1-bit RAM-only Flash, spend/routing |
| **Local runtime / ggml** | llama.cpp | Portable backends (Metal, Vulkan, SYCL, OpenCL, CUDA, HIP), GGUF, nightlies | Fleet autoscaling, Anthropic protocol translation |
| **Local product runtime** | Ollama | One-click models, MLX, Claude Desktop proxy, structured output | Production PD, custom MoE kernels, multi-tenant billing |
| **Local train + serve studio** | Unsloth | Day-0 1-bit Flash GGUF, RAM offload, compaction, Studio agent host, QLoRA/GRPO | Multi-node serving, OpenAI-compat gateway at tenant scale (SQLite deadlocks) |
| **Gateway** | LiteLLM | Provider translation, routing, spend, MCP, guardrails, model registry | Kernels, KV layout, GPU memory planning |

**Complement, don’t substitute.** A typical 2026 stack is Unsloth or llama.cpp for local Flash experiments, vLLM *or* SGLang for the GPU fleet (not both on the same model family until Flash PRs merge), LiteLLM in front for Claude/Codex/MCP, Ollama only on the developer laptop / Claude Desktop path.

---

## 6. Trend Signals

**1. Hybrid sparse + linear-attention Flash is the new day-0 contract.**  
GLM-5.3-Flash and Qwen3.8-Flash-Next appeared in every layer within days of each other. The bottleneck is no longer “does the architecture exist in the engine” — it is **backend selection** (sparse-MLA, FlashMLA, DSA), **PLE / n-gram table placement**, and **which SKU actually runs** (not Ada 4090, not GB10 without caps).

**2. Speculative decoding is a feature and a reliability class.**  
Acceptance is workload-phase dependent. Agentic traffic (short turns, tools, mixed prefixes) is exactly where deep speculation wastes draft/verify or races D2H. Gate MTP/DFlash/DSpark behind acceptance-rate health checks; do not enable quantized drafters without a golden prompt set.

**3. Disaggregated PD and KV connectors are not a stable API.**  
vLLM reverted NIXL DCP-for-MLA in this window. SGLang is still unifying Mooncake / NIXL / Mori failure signals (default NIXL wait 300s). Treat layout RFCs as research contracts.

**4. Memory hierarchy beat raw FLOPs this week.**  
Shared-expert sharding, PLE CPU offload, HiCache write-through limits, Unsloth SSD-mmap n-grams, Ollama’s 8 GiB MLX prefix cache, llama.cpp GPU-resident LRU for host MoE experts — all of these are “where does the working set live,” not “how fast is the GEMM.”

**5. Agent protocol correctness moved to the gateway and the parser.**  
LiteLLM’s P0s are empty-content sanitizer echo, MCP auto-execute stealing Claude Code tools, and dropped streaming `usage`. llama.cpp’s Qwen thinking+tools `peg-native` parser still fails if text precedes `<tool_call>`. Ollama 500s on tool-only histories (`no user query found`). Engines can decode; products break on message shape.

**6. Consumer silicon is a first-class (and failing) target.**  
Apple FA-vec tables, Adreno OpenCL, MLX Flash-Next, Strix Halo Vulkan-vs-HIP, GB10 unified-memory death, Jetson Gemma4 blow-ups. Fleet software is leaking onto laptops and APUs faster than those backends are correct.

### What agent / application developers should watch

1. **Pin by layer.** Fleet: vLLM **0.28.0** or SGLang **0.5.18**. Gateway: LiteLLM **1.98.0**. Laptop: Ollama **0.33.2** or Unsloth **0.1.804-beta** if you need Flash GGUF. Do not promote RCs/nightlies because a model card says “day-0.”
2. **Soak Flash separately.** Use published recipe images (`vllm/vllm-openai:glm53-flash-cu129`, `lmsysorg/sglang:glm-5.3-flash`). Pin FlashInfer **0.6.18** for vLLM GLM; do **not** go past `0.6.16rc4` for SGLang NVFP4 MoE tile-192.
3. **Cap GB10 / Ada.** Prefill well below 40k on SGLang GLM-Flash; skip Ada 4090 for GLM sparse-MLA; avoid `VLLM_PLE_CPU_OFFLOAD=1` on single-GPU GB10 until the warmup deadlock is closed.
4. **Do not trust LoRA, prefix cache, or spec by default.** vLLM LoRA prefix mismatch fails open to the base model. Hybrid GDN+MTP and DFlash2+YaRN can report cache hits they did not get. Assert logits or a canary token in CI.
5. **Split MCP aliases.** Never put `require_approval: "never"` MCP auto-execute on the same LiteLLM model an IDE talks to.
6. **Reconcile cost off-stream.** LiteLLM can drop `cached_tokens` when the last SSE chunk still has `choices`. Bill from `/user/daily/activity` or the provider invoice, not `/v2/user/info.spend`.
7. **On AMD APUs, prefer Vulkan over HIP** in llama.cpp until gfx1151 corruption is closed.
8. **Watch next week’s merge list, not the model announcements:** vLLM Flash PRs #53906 / #53896, Kimi-K2.6 reasoning #42426, LiteLLM Claude placeholder #34822, SGLang FP8 KV #36830, llama.cpp draft-MTP #27572 and DFlash NVFP4 scales #28000, Unsloth SQLite/reaper #9008 / #9997.

The industry is no longer waiting for new model families. It is waiting for **the second implementation** — the one that does not garble reasoning, deadlock on warmup, miss the prefix cache, or bill the uncached rate.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

I'll pull the full v0.28.0 release notes and recent repo activity so the digest is complete and accurate.Fetching the full v0.28.0 notes and the two day-0 model PRs so hardware and breaking-change details are accurate.# vLLM Digest — 2026-08-30

Source: [vllm-project/vllm](https://github.com/vllm-project/vllm). Window covers **v0.28.0** (released 26 Aug) plus issues/PRs updated in the last 24 hours.

## 1. This Week's Highlights

**v0.28.0** shipped with 584 commits from 270 contributors (76 first-time). The release is a Kimi-K3 / DeepSeek-V4 performance cycle: Decode Context Parallel, fused FlashKDA, combined all-gathers (1.5–3× kernel speedup), ~60% better DSpark TTFT, and ~17 GiB/GPU from optional shared-expert sharding.

Day-0 work for two hybrid sparse + linear-attention Flash models landed immediately after: **GLM-5.3-Flash** ([#53906](https://github.com/vllm-project/vllm/pull/53906)) and **Qwen3.8-Flash-Next** ([#53896](https://github.com/vllm-project/vllm/pull/53896)). Both are still open/needs-rebase and are exposing real gaps on ROCm, Ada, GB10/sm_121, and disaggregated PD. Treat them as recipe images, not as stable `main`.

## 2. Releases & Breaking Changes

**[v0.28.0](https://github.com/vllm-project/vllm/releases/tag/v0.28.0)** — 26 Aug 2026 (tag `2cf0a69`). Follow-on tag **[v0.28.1rc0](https://github.com/vllm-project/vllm/releases)** exists (27 Aug); production pin remains 0.28.0.

**Default changes (behavior, not API):**
- `max_num_batched_tokens`: 8192 → **16384** ([#51726](https://github.com/vllm-project/vllm/pull/51726))
- Prefix caching **on by default for Mamba** models ([#50991](https://github.com/vllm-project/vllm/pull/50991))
- Blackwell CUDA-graph capture default raised to **1024** ([#49390](https://github.com/vllm-project/vllm/pull/49390))

**Breaking / migration:**
- **bitsandbytes is out-of-tree** — install the plugin; in-tree BNB is gone ([#43529](https://github.com/vllm-project/vllm/pull/43529))
- **Transformers ≥ 5.15.0** required ([#51668](https://github.com/vllm-project/vllm/pull/51668))
- Removed `calculate_kv_scales` runtime KV-scale path ([#49389](https://github.com/vllm-project/vllm/pull/49389))
- Removed `override_attention_dtype` ([#48684](https://github.com/vllm-project/vllm/pull/48684))
- Client-visible `reasoning_content` output change ([#50624](https://github.com/vllm-project/vllm/pull/50624))
- KV offload metrics renamed `*_block_*` → `*_chunk_*` ([#52812](https://github.com/vllm-project/vllm/pull/52812))
- Legacy MoE code removed ([#51078](https://github.com/vllm-project/vllm/pull/51078))

Examples are switching `torch_dtype` → `dtype` to match Transformers 4.56+/5.x ([#54398](https://github.com/vllm-project/vllm/pull/54398), closed).

## 3. New Model & Hardware Support

**In 0.28.0 (stable):** Muse Glimmer ([#51655](https://github.com/vllm-project/vllm/pull/51655)); Ling 3.0 Flash BF16/MTP/parser + FP8 + hybrid MXFP4 experts ([#51045](https://github.com/vllm-project/vllm/pull/51045), [#51265](https://github.com/vllm-project/vllm/pull/51265), [#52114](https://github.com/vllm-project/vllm/pull/52114)); Dots3 NOTE multimodal ([#51255](https://github.com/vllm-project/vllm/pull/51255)); Interns2mobius ([#51149](https://github.com/vllm-project/vllm/pull/51149)). Qwen3.8 on ROCm ([#50068](https://github.com/vllm-project/vllm/pull/50068)). Transformers backend gained MLA, hardware-agnostic defs, generalized embeddings, logit softcapping.

**Landing now (open PRs, recipe images):**

| Model | PR | Notes |
|---|---|---|
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) (`glm5_next`) | [#53906](https://github.com/vllm-project/vllm/pull/53906) | Needs FlashInfer **0.6.18**. Official recipe: [recipes.vllm.ai/zai-org/GLM-5.3](https://recipes.vllm.ai/zai-org/GLM-5.3). Image `vllm/vllm-openai:glm53-flash-cu129`. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | [#53896](https://github.com/vllm-project/vllm/pull/53896) | 125B / 6B active + 51B N-gram table; 262K native, 1M via YaRN. Image `vllm/vllm-openai:qwen38-flash-next`. Offload table with `VLLM_PLE_CPU_OFFLOAD=1`. |

**Hardware / backends in flight:**
- Kimi-K3 on **ROCm + Model Runner V2** ([#51653](https://github.com/vllm-project/vllm/pull/51653)); DeepSeek-V4 sparse MLA on **gfx11 / gfx950** ([#47017](https://github.com/vllm-project/vllm/pull/47017), [#52212](https://github.com/vllm-project/vllm/pull/52212))
- FlashInfer SM90 MXFP4×FP8 fused MoE (`--moe-backend flashinfer_cutlass_humming`) ([#54032](https://github.com/vllm-project/vllm/pull/54032))
- ROCm dual-stream decode + hipgraphs ([#52033](https://github.com/vllm-project/vllm/pull/52033))
- AMD Quark **NVFP4** for DeepSeek-V4 ([#47972](https://github.com/vllm-project/vllm/pull/47972))
- Orthrus diffusion-mode speculative decode (WIP) ([#53753](https://github.com/vllm-project/vllm/pull/53753))
- P2P NIXL + CPU EC connector ([#47941](https://github.com/vllm-project/vllm/pull/47941))
- GLM-5.3-Flash on ROCm gfx950 still missing `gate_score` in `SparseAttnIndexerKpool.forward_hip()` ([#53943](https://github.com/vllm-project/vllm/issues/53943)); no sparse-MLA path on **Ada sm_89 / RTX 4090** ([#54059](https://github.com/vllm-project/vllm/issues/54059))

Rust frontend remains experimental (`VLLM_USE_RUST_FRONTEND=1`); feature-parity roadmap still open ([#44280](https://github.com/vllm-project/vllm/issues/44280)).

## 4. Performance & Optimization

**Shipped in 0.28.0 (Kimi-K3 / DSv4):**
- Combined all-gathers: **1.5–3×** kernel speedup ([#51070](https://github.com/vllm-project/vllm/pull/51070))
- Adaptive speculative token budget: **~60% better DSpark TTFT** ([#51725](https://github.com/vllm-project/vllm/pull/51725))
- Shared-expert sharding: **~17 GiB/GPU** ([#50912](https://github.com/vllm-project/vllm/pull/50912))
- DCP ([#50484](https://github.com/vllm-project/vllm/pull/50484)); fused FlashKDA decode/prefill ([#50654](https://github.com/vllm-project/vllm/pull/50654), [#51311](https://github.com/vllm-project/vllm/pull/51311), [#52458](https://github.com/vllm-project/vllm/pull/52458))
- DFlash2 (local conv + candidate selector) ([#52816](https://github.com/vllm-project/vllm/pull/52816)); DSpark confidence-scheduled verification ([#47808](https://github.com/vllm-project/vllm/pull/47808))
- Sparse MLA E2E for plain decode, MTP, and DSpark ([#51538](https://github.com/vllm-project/vllm/pull/51538))

**Active this window:**
- Native CUDA AttnRes as SM100 default for Kimi-K3 dense `hidden_size=7168` ([#54261](https://github.com/vllm-project/vllm/pull/54261))
- Hybrid GDN prefix-cache hits under MTP ([#52244](https://github.com/vllm-project/vllm/pull/52244)) — Qwen3.5-122B-A10B currently misses cache when prompt length is a multiple of the hash unit
- Hopper FP8 group-128 quantization fast path (register-resident, `group_size==128`) ([#46541](https://github.com/vllm-project/vllm/pull/46541), closed)
- PTX 9.4 `ldmatrix.s8.s4` for W4A8-INT8 ([#49529](https://github.com/vllm-project/vllm/issues/49529))
- INT8 KV-cache quantization request still open (FP8-only today) ([#33480](https://github.com/vllm-project/vllm/issues/33480), 12 👍)
- Adaptive DSpark bring-up tracker ([#51303](https://github.com/vllm-project/vllm/issues/51303)); RFC for per-request adaptive speculation lengths closed ([#48202](https://github.com/vllm-project/vllm/issues/48202))
- FA3 cascade-attention heuristic refresh ([#15647](https://github.com/vllm-project/vllm/issues/15647))

## 5. Stability & Regressions

Ranked by operational severity. Several are model-family specific (Kimi / GLM-Flash / Qwen-Flash / DFlash).

**P0 — silent corruption / wrong answers**
- **Kimi-K2.6** intermittently emits only `"!!!!!!!!!!"` in `reasoning` with `content: null` on 8×B200 (`--reasoning-parser kimi_k2`). Open since May; 93 comments. [#42426](https://github.com/vllm-project/vllm/issues/42426)
- **Kimi-K3 silent garble in 1P1D NIXL Direct-PD** (MooncakeStore + Nixl MultiConnector). NIXL-only PD is clean — the MultiConnector path is the suspect. [#52627](https://github.com/vllm-project/vllm/issues/52627)
- **DFlash fused-KV projection** calls `F.linear` on a sliced `qkv_proj` weight — breaks or silently corrupts any **weight-quantized drafter**. [#51581](https://github.com/vllm-project/vllm/issues/51581)
- **LoRA adapters with mismatched module-name prefixes** silently fall back to base-model output. [#34186](https://github.com/vllm-project/vllm/issues/34186)

**P1 — hard start / hang / crash**
- `VLLM_PLE_CPU_OFFLOAD=1` **deadlocks at kernel warmup** on TP=1 (Qwen3.8-Flash-Next, GB10/sm_121). Engine init finishes, then silence. [#53960](https://github.com/vllm-project/vllm/issues/53960)
- DeepSeek-V4-Flash startup: SparseAttnIndexer reads global config after model-construction context exits. Fix PR: [#54400](https://github.com/vllm-project/vllm/pull/54400)
- Mamba V2 runner crash on profiling teardown (Kimi-K3 TP8×PP4, 4×B200). Fix merged: [#54044](https://github.com/vllm-project/vllm/pull/54044)
- Mamba-2 Triton **illegal instruction on SM121 (DGX Spark)** unless `CUDA_LAUNCH_BLOCKING=1`. [#37431](https://github.com/vllm-project/vllm/issues/37431)
- GLM-5.3-Flash ROCm gfx950: `forward_hip()` missing `gate_score`. [#53943](https://github.com/vllm-project/vllm/issues/53943)
- Qwen3-VL-Embedding OpenAI embeddings API intermittent multimodal-cache assert. [#33865](https://github.com/vllm-project/vllm/issues/33865)
- Historical: V1 workers die after idle (`EngineDeadError` / `PyCFunction`) — issue closed. [#35104](https://github.com/vllm-project/vllm/issues/35104)

**P2 — correctness / cache / backend selection**
- DFlash2 + YaRN: identical 1.04M prompt gets **zero prefix-cache reuse**; target-only reuses ~1.039M tokens. [#54094](https://github.com/vllm-project/vllm/issues/54094)
- GLM-5.3-Flash: no sparse-MLA on Ada sm_89. [#54059](https://github.com/vllm-project/vllm/issues/54059)
- DeepSeek-R1-0528-NVFP4 on RTX Pro 6000: “No valid attention backend” regression from 0.14.0 era, still open. [#32732](https://github.com/vllm-project/vllm/issues/32732)
- Qwen3-VL-Embedding online vs offline transformers mismatch. [#33167](https://github.com/vllm-project/vllm/issues/33167)
- NIXL DCP-for-MLA reverted today after a gated-assignment regression ([#54386](https://github.com/vllm-project/vllm/pull/54386) reverts [#50611](https://github.com/vllm-project/vllm/pull/50611))
- CohereASR FP16 attention-bias dtype on Turing — fix: [#54399](https://github.com/vllm-project/vllm/pull/54399)

**Platform notes:** GB10 / DGX Spark (sm_121) remains the sharpest edge — MoE router GEMM gates, Mamba Triton, PLE offload, and GDN prefix-cache have all failed there this week. Ada (4090) cannot run GLM-5.3-Flash sparse-MLA yet.

## 6. What This Means for Application Developers

1. **Upgrade to 0.28.0 on a staging fleet first.** Bump Transformers to ≥5.15, drop `override_attention_dtype` / `calculate_kv_scales`, move bitsandbytes to the plugin, and rewrite any dashboards that scrape `kv_offload_tiering_block_*`. Expect higher default batch tokens (16k) and Mamba prefix-cache on — re-tune `gpu_memory_utilization` and max concurrency.

2. **Kimi-K3 is the production story of this release; Kimi-K2.6 reasoning is not.** If you expose a reasoning field to users, gate or retry on the `"!!!!!!!!!!"` / null-content failure ([#42426](https://github.com/vllm-project/vllm/issues/42426)). Do not run Kimi-K3 1P1D through Mooncake+NIXL MultiConnector until [#52627](https://github.com/vllm-project/vllm/issues/52627) is closed.

3. **Flash models (GLM-5.3-Flash, Qwen3.8-Flash-Next) are recipe-only.** Use the published Docker tags and [recipes.vllm.ai](https://recipes.vllm.ai/zai-org/GLM-5.3). Pin FlashInfer 0.6.18 for GLM. On Qwen-Flash-Next, keep the 51B N-gram table in host RAM (`VLLM_PLE_CPU_OFFLOAD=1`) — but not on single-GPU GB10 until the warmup deadlock is fixed. Skip Ada 4090 for GLM-Flash.

4. **Spec decode + quantization is a minefield this week.** Quantized DFlash drafters can corrupt output ([#51581](https://github.com/vllm-project/vllm/issues/51581)). Hybrid GDN + MTP can silently miss prefix cache ([#52244](https://github.com/vllm-project/vllm/pull/52244), [#54094](https://github.com/vllm-project/vllm/issues/54094)). Validate acceptance rates and cache-hit metrics on a golden prompt set before enabling MTP/DSpark/DFlash in prod.

5. **Disaggregation and KV connectors are still moving.** E/P/D is in MRV2 ([#38390](https://github.com/vllm-project/vllm/pull/38390)); NIXL DCP-for-MLA was reverted today. If you run PD or CPU offload, watch connector events ([#54325](https://github.com/vllm-project/vllm/pull/54325)) and treat layout RFCs ([#42082](https://github.com/vllm-project/vllm/issues/42082)) as not-yet-stable contracts.

6. **Agent / tool-calling stacks:** keep `--reasoning-parser` / `--tool-call-parser` on the model-specific parsers (`kimi_k2`, `glm45`/`glm47`). The Anthropic content-block validator ([#47877](https://github.com/vllm-project/vllm/pull/47877)) and Responses-API tokenize path ([#41510](https://github.com/vllm-project/vllm/pull/41510)) are the relevant frontend PRs if you speak Anthropic or `/v1/responses`.

7. **Do not assume LoRA applied.** Mismatched adapter prefixes fail open to the base model ([#34186](https://github.com/vllm-project/vllm/issues/34186)). Assert adapter-altered logits or a canary token in CI.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

I'll pull the latest SGLang repo activity and fill in any gaps so the digest matches the 2026-08-30 snapshot.# SGLang Digest — 2026-08-30

Repo: [sgl-project/sglang](https://github.com/sgl-project/sglang) · Latest stable: [v0.5.18](https://github.com/sgl-project/sglang/releases/tag/v0.5.18) (2026-08-21) · Main is on the **0.5.19.dev** line. No tagged release in the last 24 hours; nightly wheels landed 2026-08-29.

---

## 1. This Week's Highlights

Post-**v0.5.18**, the tree is dominated by **HiCache / Unified Cache / PD-disaggregation correctness**, **GLM-5.3-Flash production blockers**, and **diffusion + speculative-decoding kernel work**. Maintainers closed the long-running [PP + HiCache consistency plan](https://github.com/sgl-project/sglang/issues/22607) and shipped follow-on PRs for decode-path leaks, chunked-prefill radix progress, and external linker device-pool assembly. In parallel, GLM-5.3-Flash is the hottest new model surface: FP8 KV cache cannot select a valid backend when `index_kpool > 1`, `--enable-dp-attention` hangs at warmup, and long prefills on GB10 silently kill the worker. CI on `main` is noisy but improving — the tracker reports **2 broken, 8 flaky, 876 recently fixed**.

---

## 2. Releases & Breaking Changes

No new tagged release in the last 24h.

| Line | Status | Notes |
|---|---|---|
| [v0.5.18](https://github.com/sgl-project/sglang/releases/tag/v0.5.18) | Latest stable (2026-08-21) | New models (Muse Glimmer, Intern-S2-Mobius, several diffusion stacks), overlapped checkpoint staging (up to **2.38×** faster startup), unified `SGLANG_CACHE_DIR`, NVFP4→MXFP4 on AMD, DeepSeek-V4 LMHead all-to-all (**320µs → 169µs**) |
| `0.5.19.dev` / nightly `20260829` | Current `main` | Wheel index updated; treat as pre-release. GLM-5.3-Flash image `lmsysorg/sglang:glm-5.3-flash` is the repro target for several open bugs |

Operational notes from this window (not a formal changelog):

- Compiled kernels (Triton / FlashInfer / Inductor / DeepGEMM) now live under **`SGLANG_CACHE_DIR`** as of 0.5.18 — update cache-volume mounts if you pinned the old paths.
- CI lint actions are moving to current majors (`checkout` / `setup-python` / `setup-node` **v4 → v7**) in [#37099](https://github.com/sgl-project/sglang/pull/37099).
- Streaming OpenAI endpoints may start returning a real **HTTP 400** for pre-stream validation failures instead of an SSE error chunk ([#23821](https://github.com/sgl-project/sglang/pull/23821)) — clients that only parse SSE should handle non-200 before the stream.

---

## 3. New Model & Hardware Support

**In flight on `main` (not all merged):**

- **GLM-5.3-Flash** — day-0 serving exists, but three production gaps are open:
  - FP8 KV cache blocked: `index_kpool > 1` excludes `flashmla_kv`, and no CUDA DSA backend accepts bf16-query × fp8-KV ([#36830](https://github.com/sgl-project/sglang/issues/36830)).
  - `--enable-dp-attention` hangs in warmup (`dsv4` GEMM idle, nothing scheduled) ([#36802](https://github.com/sgl-project/sglang/issues/36802), closed after investigation).
  - GB10 / DGX Spark: prefills ≳40k tokens exhaust unified memory and kill the worker with no traceback ([#36941](https://github.com/sgl-project/sglang/issues/36941)).
- **Cosmos3 Reasoner** added to LLM-only inference ([#33572](https://github.com/sgl-project/sglang/pull/33572)).
- **Qwen3-8B-Domino-b16** via optimized Domino rollout on DFlash V2 ([#36899](https://github.com/sgl-project/sglang/pull/36899)).
- **FLUX.2** NVFP4 FC1→SwiGLU→FC2 fused on SM100 ([#37096](https://github.com/sgl-project/sglang/pull/37096)).
- **Qwen-Image** TP collectives + fused attention ([#36680](https://github.com/sgl-project/sglang/pull/36680)); **GLM-Image** AR/DiT overlap for dynamic batching ([#33971](https://github.com/sgl-project/sglang/pull/33971)).
- **ROCm / MI3xx**: DSA MQA-logits budget cap vs AITER `buffer_store` ([#36960](https://github.com/sgl-project/sglang/pull/36960)); wave-level top-k transform ([#36348](https://github.com/sgl-project/sglang/pull/36348)). AMD cookbook updated 2026-08-30.
- **Apple Silicon / unified memory pool**: `req_pool_idx` moved into `ReqKvInfo` ([#37094](https://github.com/sgl-project/sglang/pull/37094)); unified-pool read path for FA3 / FlashInfer / TRTLLM-MHA / FlashMLA ([#34613](https://github.com/sgl-project/sglang/pull/34613), [#35245](https://github.com/sgl-project/sglang/pull/35245)).
- **openPangu 2.0 Flash** still an open feature request ([#29746](https://github.com/sgl-project/sglang/issues/29746)).
- `/v1/images/edits` for GLM-Image remains closed/inactive ([#25579](https://github.com/sgl-project/sglang/issues/25579)).

Hardware surfaces seeing the most bug traffic this window: **H20 (SM90), H100, B200/GB200, GB10 / DGX Spark, MI300X/MI350X/MI355X, Ascend NPU**.

---

## 4. Performance & Optimization

**Landed or ready-to-review:**

- GLM-Image AR/DiT overlap: 10-prompt / concurrency-4 bench **223.79s → 182.39s (~18.4% E2E)**; off by default ([#33971](https://github.com/sgl-project/sglang/pull/33971)).
- FLUX.2 NVFP4 feed-forward fusion on SM100 CuTe DSL ([#37096](https://github.com/sgl-project/sglang/pull/37096)).
- Qwen-Image: SRT custom-all-reduce for 24 MiB row-parallel outputs + fused small attention kernels ([#36680](https://github.com/sgl-project/sglang/pull/36680)).
- ROCm top-k: 12-bit coarse radix (fixes silent drop on long rows) and **40–53% faster**; dual-pass load batching + wave64 coarse scan ([#36348](https://github.com/sgl-project/sglang/pull/36348)).
- Decode HiCache retraction leak fixed ([#37100](https://github.com/sgl-project/sglang/pull/37100)).
- Unified Cache: device-pool assembly for external linkers + DSA / DeepSeek-V4 pool views ([#37098](https://github.com/sgl-project/sglang/pull/37098)).
- Chunked prefill no longer skips `cache_unfinished_req` when radix insert is skipped — stops re-prefetching the same chunk until OOM ([#37024](https://github.com/sgl-project/sglang/pull/37024), fixes #36855).
- Unified-cache write-through still cannot back up a first extend longer than `chunked_prefill_size` (default 8192) ([#33714](https://github.com/sgl-project/sglang/issues/33714)).
- Adaptive speculative decoding roadmap ([#23705](https://github.com/sgl-project/sglang/issues/23705)) and further Ngram spec support ([#21052](https://github.com/sgl-project/sglang/issues/21052)) remain open design tracks for agentic / mixed-acceptance traffic.
- DFlash V2 + Domino projector for public Qwen3-8B-Domino-b16 ([#36899](https://github.com/sgl-project/sglang/pull/36899)).

**Known perf cliffs (not regressions of the kernel itself):**

- MXFP8 for `Qwen3-30B-A3B-Instruct-2507` is **slower than BF16** on B200 and GB200 at matched accuracy ([#29002](https://github.com/sgl-project/sglang/issues/29002), closed/inactive).
- FlashInfer TRTLLM NVFP4 MoE tile-192 path on SM100/SM103 produces **NaNs**; GSM8K scores 0.0 after FlashInfer > `0.6.16rc4` ([#34629](https://github.com/sgl-project/sglang/issues/34629)).

Context from v0.5.18 that still matters this week: DeepSeek-V4 TP LMHead all-to-all **320µs → 169µs**; Kimi K3 on MI355X **1.37–1.77×** throughput, up to **2.42×** ITL.

---

## 5. Stability & Regressions

Ranked by production impact.

### P0 — cluster / process death

| Issue | Symptom | Status |
|---|---|---|
| [#33289](https://github.com/sgl-project/sglang/issues/33289) | Multi-node TP rank-divergence deadlock: one rank stuck in NCCL proxy append (logits all-gather), peer idle at request broadcast. DeepSeek-V4 + DSpark, 2× DGX Spark (GB10), TP=2 | **Closed** after diagnosis; treat as high-priority if you run multi-node DSpark |
| [#36941](https://github.com/sgl-project/sglang/issues/36941) | GLM-5.3-Flash prefill >~40k tokens on GB10 exhausts unified memory; worker dies with **no traceback / no OOM record**. Cross-stack control still passes at 54k | **Open** |
| [#30314](https://github.com/sgl-project/sglang/issues/30314) | Scheduler event loop blocks on Mamba eviction under large-context load → hang + process kill | **Open** |
| [#36802](https://github.com/sgl-project/sglang/issues/36802) | GLM-5.3-Flash warmup hang with `--enable-dp-attention` | **Closed** |

### P1 — silent wrong answers / correctness

| Issue | Symptom | Status |
|---|---|---|
| [#36807](https://github.com/sgl-project/sglang/issues/36807) | `fast_topk_v2` can return the **wrong top-k set** when a radix threshold bucket overflows the 4096-entry candidate buffer (`k=2048`, long rows) | **Open** |
| [#25790](https://github.com/sgl-project/sglang/issues/25790) | Logprob mismatch prefill vs decode **exactly at index 96** with FP8 KV on H100 | **Open** |
| [#34629](https://github.com/sgl-project/sglang/issues/34629) | NVFP4 MoE tile-192 NaNs on SM100/SM103 | **Open** |
| [#36480](https://github.com/sgl-project/sglang/issues/36480) | Qwen3.5 greedy multimodal outputs differ a lot v0.5.12 vs v0.5.17.dev; v0.5.17.dev36 not self-consistent behind the router | **Closed** |
| [#25587](https://github.com/sgl-project/sglang/issues/25587) | Hybrid-GDN MTP spec decode not lossless on Ascend NPU | **Closed / inactive** |
| [#29748](https://github.com/sgl-project/sglang/issues/29748) | GPTQ `gptq_gemm` data race (uninitialized buffer + multi-block `atomicAdd`) | **Closed / inactive** |

### P1 — serving correctness / leaks

| Issue | Symptom | Status |
|---|---|---|
| [#36333](https://github.com/sgl-project/sglang/issues/36333) | Disconnected streaming client leaves a zombie that decodes to `max_tokens` and floods `state was deleted in TokenizerManager` (regression from #34160 revert) | **Open** |
| [#37100](https://github.com/sgl-project/sglang/pull/37100) | Decode HiCache memory leak on retraction | **Fix PR open** |
| [#36830](https://github.com/sgl-project/sglang/issues/36830) | GLM-5.3-Flash cannot use FP8 KV cache | **Open** |
| [#13054](https://github.com/sgl-project/sglang/issues/13054) | PD disaggregation: `failed_sessions` sticky after a transient KV transfer error → persistent 500s on a healthy P–D pair | **Closed** |
| PD protocol alignment | Shared prefill→decode failure notification + defensive protocol across Mooncake / NIXL / Mori | [#36612](https://github.com/sgl-project/sglang/pull/36612), [#35281](https://github.com/sgl-project/sglang/pull/35281) **open** |

### P2 — platform / CI

- CI tracker [#17050](https://github.com/sgl-project/sglang/issues/17050): **2 broken, 8 flaky, 876 recently fixed** (auto-update 2026-08-30 07:20 UTC). Maintenance-mode issue [#21065](https://github.com/sgl-project/sglang/issues/21065) was touched again.
- Unit-test coverage for core modules (`managers/`, `mem_cache/`, `sampling/`, …) is still a long-running good-first-issue with **107 comments** ([#20865](https://github.com/sgl-project/sglang/issues/20865)).
- Triton version warning in Docker: aiter gluon wants **Triton ≥ 3.6.0**, image ships **3.4.0** ([#35785](https://github.com/sgl-project/sglang/issues/35785)).
- ROCm EAGLE/MTP + CUDA-graph deadlocks / draft-extend crashes remain closed/inactive ([#29347](https://github.com/sgl-project/sglang/issues/29347), [#29785](https://github.com/sgl-project/sglang/issues/29785)); workaround historically `--disable-overlap-schedule`.

---

## 6. What This Means for Application Developers

**If you serve agents / long-prefix workloads**
HiCache is the center of gravity this week. Prefix reuse across tens of thousands of tokens is the design target ([#22607](https://github.com/sgl-project/sglang/issues/22607)), but do not assume write-through covers a first extend larger than `chunked_prefill_size` ([#33714](https://github.com/sgl-project/sglang/issues/33714)). Multi-instance DRAM L2 sharing is still not a supported “just attach storage” story ([#31505](https://github.com/sgl-project/sglang/issues/31505)). Prefer the idle-gated `flush_cache` / attach / detach APIs once [#36869](https://github.com/sgl-project/sglang/pull/36869) lands — today those calls silently no-op under ~20 scheduler conditions.

**If you are adopting GLM-5.3-Flash**
Stay on BF16 KV until [#36830](https://github.com/sgl-project/sglang/issues/36830) has a backend. Do not combine `--enable-dp-attention` with the current Flash image without a soak test. On GB10, cap prefill well below 40k or provision host/unified memory with a hard watchdog — the worker dies silently ([#36941](https://github.com/sgl-project/sglang/issues/36941)).

**If you use speculative decoding (DSpark / EAGLE / MTP / Ngram / Domino)**
Acceptance is workload-phase dependent; the adaptive-spec roadmap ([#23705](https://github.com/sgl-project/sglang/issues/23705)) exists because deep speculation wastes draft/verify on agentic traffic. Multi-node DSpark + DeepSeek-V4 has a real TP deadlock mode ([#33289](https://github.com/sgl-project/sglang/issues/33289)). `fast_topk_v2` at `k=2048` can return the wrong set ([#36807](https://github.com/sgl-project/sglang/issues/36807)) — pin k or wait for the radix-buffer fix before using it in ranking / tool-routing paths.

**If you expose OpenAI-compatible streaming**
Handle client disconnects. A dropped SSE client can keep decoding to `max_tokens` and spam tokenizer-manager logs ([#36333](https://github.com/sgl-project/sglang/issues/36333)). Incoming [#23821](https://github.com/sgl-project/sglang/pull/23821) will turn *pre-stream* validation failures into HTTP 400; update SDKs that assume every error arrives as an SSE chunk.

**If you run PD disaggregation**
NIXL still has no timely prefill→decode failure signal (default wait **300s**). Mooncake/Mori notify, but through incompatible paths — [#36612](https://github.com/sgl-project/sglang/pull/36612) / [#35281](https://github.com/sgl-project/sglang/pull/35281) are the unification. Sticky `failed_sessions` after a transient KV error is marked closed ([#13054](https://github.com/sgl-project/sglang/issues/13054)); verify on your transport before relying on auto-recovery.

**If you deploy quantization / Blackwell / AMD**
Do not assume MXFP8 is a free win vs BF16 ([#29002](https://github.com/sgl-project/sglang/issues/29002)). Pin FlashInfer if you use NVFP4 MoE on SM100 — tile-192 is numerically unsafe past `0.6.16rc4` ([#34629](https://github.com/sgl-project/sglang/issues/34629)). FP8 KV logprobs on H100 are still inconsistent at index 96 ([#25790](https://github.com/sgl-project/sglang/issues/25790)), which matters for any app that thresholds logprobs (RAG abstention, speculative verify, tool-call gating).

**Practical pin recommendation**
- Production, conservative: **v0.5.18**.
- GLM-5.3-Flash / HiCache / diffusion experiments: `main` / `0.5.19.dev` **only** with the issues above on the soak checklist.
- Watch [#17050](https://github.com/sgl-project/sglang/issues/17050) before promoting a nightly; two scheduled jobs on `main` are still red.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

I'll gather the latest llama.cpp release notes, issues, and PRs so the digest is accurate and complete.# llama.cpp Digest — 2026-08-30

Source: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · latest nightly **b10689** (b10690 listed in the 24h window) · last semver cut **[v0.3.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0)** (2026-08-25)

## 1. This Week's Highlights

Nightlies **b10681–b10690** are backend-heavy, not model-API-heavy: Metal flash-attn vector tunings landed for M1 Max / M2 / M4 Pro, OpenCL picked a faster Adreno GEMM path, SYCL `--fit` now tracks real peak VRAM, and Vulkan fixed `mul_mat_id` K-padding. In parallel, the issue tracker is dominated by **AMD APU/ROCm correctness vs Vulkan**, **SYCL multi-GPU DEVICE_LOST**, **Qwen tool-call / thinking parsers**, and a cluster of **MoE + speculative (DFlash / draft-MTP)** work that is still in-flight rather than shipped.

## 2. Releases & Breaking Changes

No semver bump in the last 24h. Nightlies remain the binary channel (`bNNNN`); `v0.3.0` is still the last annotated release (dots3-note multimodal, GLM-4.5-Air MTP, tensor-split / DeepSeek-4 rollback fixes, ggml v0.22.0).

Recent nightlies (newest first):

| Tag | Focus | Link |
|---|---|---|
| b10690 | Guard Hadamard/`k_rot` copy when K-cache buffer is unassigned (context-shift crash on unquantized K) | [#27967](https://github.com/ggml-org/llama.cpp/issues/27967) |
| b10689 | `ggml_graph_optimize` can take alloc dependencies | [b10689](https://github.com/ggml-org/llama.cpp/releases/tag/b10689) · [#27301](https://github.com/ggml-org/llama.cpp/pull/27301) |
| b10688 | Metal FA-vec tunings for M2 | [b10688](https://github.com/ggml-org/llama.cpp/releases/tag/b10688) · [#27940](https://github.com/ggml-org/llama.cpp/pull/27940) |
| b10687 | OpenCL Adreno GEMM path (X2E default + A7X bypass) | [b10687](https://github.com/ggml-org/llama.cpp/releases/tag/b10687) · [#27640](https://github.com/ggml-org/llama.cpp/pull/27640) |
| b10686 | Metal shared-memory padding assert | [#27951](https://github.com/ggml-org/llama.cpp/pull/27951) |
| b10685 | Metal FA-vec tunings for M4 Pro | [#27915](https://github.com/ggml-org/llama.cpp/pull/27915) |
| b10684 | SYCL `--fit` honors `--fit-target` / peak VRAM | [#27629](https://github.com/ggml-org/llama.cpp/pull/27629) |
| b10683 | Vulkan fastdiv cleanup | [#27526](https://github.com/ggml-org/llama.cpp/pull/27526) |
| b10682 | Metal FA-vec tunings for M1 Max | [#27932](https://github.com/ggml-org/llama.cpp/pull/27932) |
| b10681 | Vulkan `mul_mat_id` pads K, not N | [#27925](https://github.com/ggml-org/llama.cpp/pull/27925) |

**Migration notes:** none of these nightlies change public CLI flags or the OpenAI-compatible server schema. Rebuild/redeploy binaries if you ship Metal FA, SYCL `--fit`, OpenCL-on-Adreno, or Vulkan MoE (`mul_mat_id`). Context-shift + unquantized K cache should pick up b10690 to avoid the Hadamard/`k_rot` crash.

## 3. New Model & Hardware Support

**Landed (nightlies)**
- Apple Silicon Metal FA-vec device tables: **M1 Max, M2, M4 Pro** ([#27932](https://github.com/ggml-org/llama.cpp/pull/27932), [#27940](https://github.com/ggml-org/llama.cpp/pull/27940), [#27915](https://github.com/ggml-org/llama.cpp/pull/27915)). M3 Pro tuning is open ([#27963](https://github.com/ggml-org/llama.cpp/pull/27963)).
- **Adreno OpenCL**: default xmem F16×F32 GEMM on X2E; skip the slow tiled F32 path on A7X ([#27640](https://github.com/ggml-org/llama.cpp/pull/27640)).
- **SYCL `--fit`**: peak-VRAM-aware packing for a given context size ([#27629](https://github.com/ggml-org/llama.cpp/pull/27629)).

**In review (not in the 24h binaries)**
- Qwen4 / Qwen3.8-Flash-Next correctness: sequence-copy indexer keys, block fixes ([#27941](https://github.com/ggml-org/llama.cpp/pull/27941), [#27879](https://github.com/ggml-org/llama.cpp/pull/27879)).
- Qwen3.5 / 3.8 multimodal LoRA → GGUF (`Qwen3_5ForConditionalGeneration`) ([#27995](https://github.com/ggml-org/llama.cpp/pull/27995)).
- Sparse flash-attn for DeepSeek-V4 / GLM ([#27970](https://github.com/ggml-org/llama.cpp/pull/27970)).
- STQ1_0 sparse ternary quant + ARM NEON `vec_dot` (Sherry / ACL 2026) ([#22836](https://github.com/ggml-org/llama.cpp/pull/22836)).
- DFlash2: pass missing **NVFP4 scales** into attention ([#28000](https://github.com/ggml-org/llama.cpp/pull/28000)).
- Metal 4.0 tensor API gated to M5+/A19+ ([#27461](https://github.com/ggml-org/llama.cpp/pull/27461)).
- Vulkan int8 coopmat1 MMQ for **RDNA3/RDNA4** (q4_0/1, q5_0/1, q8_0, q3–q6_k, mxfp4, nvfp4, iq4_nl) ([#27952](https://github.com/ggml-org/llama.cpp/pull/27952)).
- llama-ui: HF Hub browse/search, sidecar parse (`mtp` / `dflash` / `mmproj`…), download + compat estimation ([#27947](https://github.com/ggml-org/llama.cpp/pull/27947), [#27946](https://github.com/ggml-org/llama.cpp/pull/27946), [#27959](https://github.com/ggml-org/llama.cpp/pull/27959), [#27957](https://github.com/ggml-org/llama.cpp/pull/27957)).

## 4. Performance & Optimization

**Shipped**
- Metal FA-vec per-SoC tables (M1 Max / M2 / M4 Pro) — decode-path flash-attn on Apple Silicon; pair with the existing community tuning issue [#27668](https://github.com/ggml-org/llama.cpp/issues/27668).
- OpenCL Adreno: `kernel_mul_mm_f16_f32_l4_lm` was the slowest matmul on this backend; X2-90 gpt-oss-20b attention projections were the motivating case ([#27640](https://github.com/ggml-org/llama.cpp/pull/27640)).
- Vulkan `mul_mat_id` no longer wastes N-padding required only by dense `mul_mat` ([#27925](https://github.com/ggml-org/llama.cpp/pull/27925)).
- SYCL `--fit` uses measured peak VRAM for a context size instead of a looser estimate ([#27629](https://github.com/ggml-org/llama.cpp/pull/27629)).
- ggml `graph_optimize` can carry alloc dependencies — relevant for backends that must keep scratch/KV live across optimize passes ([#27301](https://github.com/ggml-org/llama.cpp/pull/27301)).

**Open / measured in issues**
- Metal (macOS) still substantially faster than Vulkan on Asahi Linux for the same Apple Silicon GPU — long-running research thread ([#10982](https://github.com/ggml-org/llama.cpp/issues/10982), 50 comments).
- Vulkan MoE batched decode cliff at **n_tokens = 9** on many-expert models (Qwen3-Coder-Next 30B-A3B, 512 experts): **122.5 t/s @ B=8 → 82.9 t/s @ B=9** on Strix Halo / RADV, blamed on fixed 8-token MMV thresholds ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356)).
- Proposed GPU-resident **LRU cache for host-offloaded MoE experts** so decode is not host-RAM-bandwidth bound every token ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)); related feature ask to DMA experts from pinned host RAM with no H2D copy ([#26448](https://github.com/ggml-org/llama.cpp/issues/26448)).
- Vulkan large `TOP_K` via `ARGSORT` fallback ([#28005](https://github.com/ggml-org/llama.cpp/pull/28005)).
- CUDA f16 flash-attn: move divergent `__syncthreads()` out of a `threadIdx.y` branch ([#27870](https://github.com/ggml-org/llama.cpp/pull/27870), from [#27678](https://github.com/ggml-org/llama.cpp/issues/27678)).

## 5. Stability & Regressions

Ranked by operational severity. “Fix PR” only when one is clearly attached.

**P0 — wrong tokens / hard crash**
- **HIP/ROCm on gfx1151 (Strix Halo) corrupts output**; same weights + flags on Vulkan are clean ([#27579](https://github.com/ggml-org/llama.cpp/issues/27579)). Open.
- **DeepSeek-V4** emitted only repeated `<` across multi-pass prompts with CUDA flash-attn (CPU and `-fa off` clean). Closed after investigation ([#26509](https://github.com/ggml-org/llama.cpp/issues/26509)).
- **SYCL `--split-mode tensor`** `dev2dev_memcpy` **DEVICE_LOST** on dual Arc Pro B70 despite working P2P ([#27198](https://github.com/ggml-org/llama.cpp/issues/27198)). Open.
- **draft-MTP** acceptance drops to **0.0** under `-np N` + multi-ubatch: async `t_h_nextn` D2H race ([#27572](https://github.com/ggml-org/llama.cpp/issues/27572)). Open.
- **llama-server + draft-MTP** `cublasSgemm INVALID_VALUE` under KV saturation ([#26558](https://github.com/ggml-org/llama.cpp/issues/26558)). Closed.
- Context-shift crash when copying Hadamard into `k_rot` with **unquantized K and no buffer** — fixed in b10690 ([#27967](https://github.com/ggml-org/llama.cpp/issues/27967)).
- Server fallback when recurrent-memory rollback fails (hybrid models) ([#28007](https://github.com/ggml-org/llama.cpp/pull/28007)). Open, intended fix.

**P1 — correctness / large perf cliffs**
- Qwen3.5 thinking + tools: `peg-native` parser fails if the model emits text before `<tool_call>` ([#20260](https://github.com/ggml-org/llama.cpp/issues/20260)). Open.
- AMD Strix Halo HIP: input layers pinned on CPU → ~30% CPU and lower GPU util ([#25700](https://github.com/ggml-org/llama.cpp/issues/25700)). Open.
- ROCm 7.14 / gfx1201: VRAM not allocated ([#26208](https://github.com/ggml-org/llama.cpp/issues/26208)). Open.
- Gemma 4 tg128 on RTX 5060 Ti (Blackwell) “abnormally low” vs other arches ([#26674](https://github.com/ggml-org/llama.cpp/issues/26674)). Open.
- DFlash ~2× slower than no-speculation on AMD APU + quantized MoE ([#25117](https://github.com/ggml-org/llama.cpp/issues/25117)); NVFP4 draft accepts ~0 tokens without scales ([#28000](https://github.com/ggml-org/llama.cpp/pull/28000)).
- SYCL `MUL_MAT_ID` prefill wrong on Arc Pro B70 (Battlemage) — garbage on MoE. Closed ([#25455](https://github.com/ggml-org/llama.cpp/issues/25455)).
- Metal `mul_mm_id` all-NaN when activations exceed f16 ([#26223](https://github.com/ggml-org/llama.cpp/pull/26223)). Open.
- Slot save/restore: mmproj flag blocks text-only checkpoints ([#21133](https://github.com/ggml-org/llama.cpp/issues/21133), closed); hybrid/recurrent checkpoints never persist ([#25913](https://github.com/ggml-org/llama.cpp/issues/25913), open).
- Server refuses context > trained window even with RoPE scaling ([#17459](https://github.com/ggml-org/llama.cpp/issues/17459)). Open.

**P2 — platform / packaging**
- SYCL perf regression on newer oneAPI ([#25973](https://github.com/ggml-org/llama.cpp/issues/25973)); SYCL build “program built for 1 device (Iris Xe)” ([#27412](https://github.com/ggml-org/llama.cpp/issues/27412)).
- Windows + AOCL BLAS compile fail (OpenBLAS works) ([#25413](https://github.com/ggml-org/llama.cpp/issues/25413), closed).
- Reported memory leak ([#27725](https://github.com/ggml-org/llama.cpp/issues/27725)). Open.
- RPC `top_k` `GGML_ASSERT(shared_mem <= smpb)` on AMD ([#24177](https://github.com/ggml-org/llama.cpp/issues/24177)). Open.

## 6. What This Means for Application Developers

- **Pin nightlies by backend, not by calendar.** Apple Silicon servers should move to ≥ b10688 for FA-vec tables. Adreno / Snapdragon OpenCL stacks want b10687. SYCL production boxes that use `--fit` need b10684 or the allocator will still over/under-reserve. Vulkan MoE serving should take b10681.
- **Do not treat HIP/ROCm as default on Strix Halo / gfx1151.** Several independent threads show Vulkan as the correct backend on the same machine ([#27579](https://github.com/ggml-org/llama.cpp/issues/27579), [#25700](https://github.com/ggml-org/llama.cpp/issues/25700), [#26702](https://github.com/ggml-org/llama.cpp/issues/26702)). Keep a Vulkan binary in the fallback path.
- **Speculative decoding is not production-safe under concurrency.** `draft-mtp` + `-np N` can silently accept zero drafts ([#27572](https://github.com/ggml-org/llama.cpp/issues/27572)) or crash cuBLAS when the KV cache is full ([#26558](https://github.com/ggml-org/llama.cpp/issues/26558)). Gate MTP/DFlash behind single-slot or add an acceptance-rate health check. NVFP4 DFlash drafts need [#28000](https://github.com/ggml-org/llama.cpp/pull/28000) before you trust them.
- **Tool-calling + reasoning models still need a tolerant parser.** Qwen3.5-class “think then `<tool_call>`” output breaks `peg-native` ([#20260](https://github.com/ggml-org/llama.cpp/issues/20260)). If you front llama-server with an agent runtime, strip preamble or use a fallback grammar.
- **Long-context and slot APIs are the sharp edges for product servers.** Extending `-c` past the trained window is still blocked in llama-server ([#17459](https://github.com/ggml-org/llama.cpp/issues/17459)). Loading `--mmproj` historically poisoned slot checkpointing for text-only chats ([#21133](https://github.com/ggml-org/llama.cpp/issues/21133)); hybrid/recurrent models still drop checkpoints ([#25913](https://github.com/ggml-org/llama.cpp/issues/25913)). Watch [#28007](https://github.com/ggml-org/llama.cpp/pull/28007) if you roll back recurrent state.
- **MoE on small GPUs is the active design front.** Host-resident experts + GPU LRU ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861), [#26448](https://github.com/ggml-org/llama.cpp/issues/26448)) and Vulkan batch-size cliffs at B=9 ([#25356](https://github.com/ggml-org/llama.cpp/issues/25356)) matter if you multiplex many short agent turns on one card. Prefer batch sizes that stay on the fast MMV path until the dispatch thresholds move.
- **UI / model-hub work is landing in llama-ui**, not in the HTTP API. HF search, sidecar detection, and download/compat estimates ([#27947](https://github.com/ggml-org/llama.cpp/pull/27947) et al.) will change the official web UI, not `/v1/chat/completions`.
- **Audio-out in mtmd is design-only** ([#21956](https://github.com/ggml-org/llama.cpp/issues/21956)). Do not schedule product features on it this week.

Binaries and attestations: [releases](https://github.com/ggml-org/llama.cpp/releases) · product site [llama.app](https://llama.app).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

I'll pull the official release notes and a few high-signal issue/PR pages so the digest is accurate and linked.# Ollama Digest — 2026-08-30

Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)

## 1. This Week's Highlights

Ollama shipped **v0.33.1** then **v0.33.2** in quick succession: MLX gained Qwen3.8 Flash Next plus structured output, llama.cpp/MLX were bumped, and the desktop app restored system dark mode while fixing macOS single-instance handoff and Claude Desktop proxy interruption. The 0.33.x line is clearly aimed at agent/Claude Desktop workflows, but the issue tracker is still dominated by **MLX memory growth**, **iGPU/Vulkan load failures**, and **vision/tool-call correctness** on Gemma/Qwen. Community demand for **GLM 5.3** and Qwen-3.8 Flash on cloud remains open.

## 2. Releases & Breaking Changes

**[v0.33.2](https://github.com/ollama/ollama/releases/tag/v0.33.2)** (2026-08-27, current latest)

- Desktop app follows system appearance again (dark mode restored).
- macOS app hands off to an already-running instance instead of spawning a second process.
- Claude Desktop proxy no longer cancels in-flight requests when the model catalog refreshes.

**[v0.33.1](https://github.com/ollama/ollama/releases/tag/v0.33.1)** (2026-08-26)

- MLX: Qwen3.8 Flash Next.
- mlxrunner: structured output; avoid Metal GPU timeouts when loading from slow storage.
- cmake: external compat patches made idempotent.
- MLX + llama.cpp dependency update.

No documented API/schema break in these two patch releases. Note from the prior 0.32.10 line (still relevant for operators): models without an explicit `repeat_penalty` now default to **1.0 (off)** instead of 1.1.

## 3. New Model & Hardware Support

Shipped in 0.33.1:

- **Qwen3.8 Flash Next on MLX** ([release notes](https://github.com/ollama/ollama/releases/tag/v0.33.1)).
- **Structured output** on the MLX runner (parity with llama.cpp `format` / JSON schema path).

Requested / in flight (not in a stable tag yet):

- GLM 5.3 — [Issue #17741](https://github.com/ollama/ollama/issues/17741) (open).
- Add qwen-3.8 Flash Next to **cloud** models — [Issue #18128](https://github.com/ollama/ollama/issues/18128) (closed after request).
- Windows Claude Desktop app toggle — [PR #18104](https://github.com/ollama/ollama/pull/18104) (open; server `/v1/messages` already works).
- GGUF `general.alignment` as `uint32` (parser currently falls back to 32) — [PR #18130](https://github.com/ollama/ollama/pull/18130).
- Direct I/O for integrated Vulkan GPUs (Virtio-GPU/Venus VMs) — [PR #18124](https://github.com/ollama/ollama/pull/18124), targeting the 0.32.9→0.32.10 load regression.

## 4. Performance & Optimization

Landed:

- mlxrunner avoids Metal **GPU timeouts on slow storage** during load ([v0.33.1](https://github.com/ollama/ollama/releases/tag/v0.33.1)).
- Earlier in the week (v0.32.15 context, still the operational baseline for many hosts): model-metadata cache cut TTFT roughly in half (~995 ms → ~524 ms in their bench).

Open / measured in issues:

- **MLX KV / resident growth is the main Apple Silicon story.** Reports cluster around:
  - KV not released between requests; 64 GB Mac, `qwen3.6:35b-mlx`, 24 GB → **75 GB** over 7 requests + 32 GB swap — [Issue #16698](https://github.com/ollama/ollama/issues/16698) (closed).
  - Independent of context/tools: ~**0.147 GiB/request**, plateau ~**28.5 GiB** on 0.32.15 — [Issue #17924](https://github.com/ollama/ollama/issues/17924) (closed).
  - Same class, dense models — [Issue #17875](https://github.com/ollama/ollama/issues/17875) (closed).
  - **Hard-coded 8 GiB MLX prefix-cache budget** drives swap on 32 GB Macs during agent workloads (`qwen3.8:27b-mlx`) — [Issue #18131](https://github.com/ollama/ollama/issues/18131) (open; duplicates #18132/#18133 closed).
- iGPU scheduler treats shared RAM like discrete VRAM (457 MiB `MinimumMemory()` overhead, no RAM-pressure guard, concurrent-model cap missing) — [Issue #14953](https://github.com/ollama/ollama/issues/14953).
- Prefer offloading **layers over KV** when both do not fit VRAM — [Issue #9750](https://github.com/ollama/ollama/issues/9750).
- Vulkan alloc fails at ~900 MB–1 GB with a longer system prompt despite >14 GB free VRAM (CLI `ollama run` works; API path fails) — [Issue #18117](https://github.com/ollama/ollama/issues/18117).

## 5. Stability & Regressions

Ranked by operational impact.

**High**

- Agent integrations hang forever with local Qwen on macOS while raw Ollama / OpenAI-compat API works (streaming, reasoning, tools). Closed but still a reference for gateway timeouts — [Issue #17839](https://github.com/ollama/ollama/issues/17839).
- `qwen 3.8` streaming 500: `no user query found in messages` during tool loops — [Issue #17778](https://github.com/ollama/ollama/issues/17778) (20 👍, open).
- Scheduler restarts `llama-server` with default ctx **4096** immediately after a successful load (Windows, RX 9070 XT, 0.33.2), forcing a second reload — [Issue #18129](https://github.com/ollama/ollama/issues/18129).
- Regression: “timed out waiting for llama-server to start” on virtio-gpu DRM native context after 0.32.9; 0.32.10+ broken. Fix PR: [PR #18124](https://github.com/ollama/ollama/pull/18124) / [Issue #18123](https://github.com/ollama/ollama/issues/18123).
- Gemma4 vision: images accepted but not processed on Windows — [Issue #16532](https://github.com/ollama/ollama/issues/16532) (43 comments, open).
- Gemma4 e2b/e4b memory blow-up on Jetson Orin Nano since 0.32.2 — [Issue #17787](https://github.com/ollama/ollama/issues/17787).
- AMD APU mis-split of gemma4:eXb (CPU/GPU %) — [Issue #15285](https://github.com/ollama/ollama/issues/15285) (closed).

**Medium**

- Claude Desktop integration broken for some 0.33.1 users — [Issue #18073](https://github.com/ollama/ollama/issues/18073); Windows enablement [PR #18104](https://github.com/ollama/ollama/pull/18104).
- GLM5.3-flash cloud + Claude Code 2.1.247 → `400 Input should be a valid string` — [Issue #18059](https://github.com/ollama/ollama/issues/18059).
- `gemma3:12b` structured `format` truncates on double-quoted input tokens — [Issue #18094](https://github.com/ollama/ollama/issues/18094).
- “Restart to update” fails for non-admin Mac accounts — [Issue #11972](https://github.com/ollama/ollama/issues/11972).
- GUI lost dark mode (white-only) after an earlier build; addressed in 0.33.2 — [Issue #18008](https://github.com/ollama/ollama/issues/18008).

**Lower / product**

- Unsent composer draft dropped on chat switch — [Issue #18138](https://github.com/ollama/ollama/issues/18138), fix [PR #18139](https://github.com/ollama/ollama/pull/18139).
- Inline LaTeX not rendered in GUI — [Issue #15310](https://github.com/ollama/ollama/issues/15310).
- Delete models from GUI — [Issue #16345](https://github.com/ollama/ollama/issues/16345).
- Docker layer size (~3 GB, no resume) — [Issue #18127](https://github.com/ollama/ollama/issues/18127).

Several MLX leak tickets (#16698, #17875, #17924) are marked closed; treat **#18131 (8 GiB prefix cache)** as the live follow-up, not a confirmed leak.

## 6. What This Means for Application Developers

- **Pin 0.33.2** for desktop/Claude Desktop: dark mode, single-instance macOS, and catalog updates no longer abort in-flight proxy calls. Windows Claude toggle is still behind [PR #18104](https://github.com/ollama/ollama/pull/18104).
- **Prefer the HTTP API over agent SDKs** when debugging Qwen tool loops. Direct `/api/chat` and OpenAI-compat often succeed while Claude/agent wrappers hang ([#17839](https://github.com/ollama/ollama/issues/17839)) or 500 on “no user query” ([#17778](https://github.com/ollama/ollama/issues/17778)). Keep a user message in the last turn; do not send tool-only histories.
- **Apple Silicon + MLX agents:** budget for prefix-cache growth, not just weights. On 32 GB machines, the fixed **8 GiB** prefix cache can force swap under multi-turn agent load ([#18131](https://github.com/ollama/ollama/issues/18131)). Unload/restart the runner between long sessions until that budget is configurable. Structured output on MLX is now first-class in 0.33.1 — use it instead of prompt-only JSON.
- **Vision and Gemma:** do not assume Windows Gemma4 OCR works ([#16532](https://github.com/ollama/ollama/issues/16532)). Jetson/APU hosts should stay on pre-0.32.2 for small Gemma4 until memory accounting is fixed.
- **Scheduler quirks:** after a successful load, watch for a silent reload at ctx=4096 ([#18129](https://github.com/ollama/ollama/issues/18129)). Set `keep_alive=-1` and assert `load_duration` / context in your own health check; reported load times still vary even when the model is hot ([#12443](https://github.com/ollama/ollama/issues/12443)).
- **Vulkan / VM / iGPU:** if you serve via virtio-gpu or APUs, stay on 0.32.9 or wait for [PR #18124](https://github.com/ollama/ollama/pull/18124). API-only paths can OOM Vulkan buffers that `ollama run` does not ([#18117](https://github.com/ollama/ollama/issues/18117)) — test the exact prompt + system-prompt size you ship.
- **Cloud/Claude Code:** GLM5.3-flash cloud still produces Anthropic-schema 400s ([#18059](https://github.com/ollama/ollama/issues/18059)). Validate tool/content blocks as strings before forwarding.
- **GGUF authors:** alignment metadata may be ignored until [PR #18130](https://github.com/ollama/ollama/pull/18130) lands; do not rely on non-32-byte `general.alignment`.

No breaking client protocol change this window; the risk is **behavioral** (scheduler reloads, MLX RSS, tool-message 500s) rather than API versioning.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

I'll pull the latest LiteLLM release notes and repo activity so the digest matches what's actually shipping today.Release notes for the 24h tags look thin; I'll open the GitHub release pages to confirm what's actually in them.# LiteLLM Digest — 2026-08-30

Repo: [BerriAI/litellm](https://github.com/BerriAI/litellm) (~57.5k stars). Latest **stable** remains **v1.98.0** (22 Aug). The last 24 hours are a pre-release burst: `v1.100.0-rc.1`, `v1.99.0-rc.2`, plus `v1.100.0-dev.{1,2}`. 93 issues and ~500 PRs touched in-window; the working tree is concentrated on Anthropic/`/v1/messages` fidelity, spend/cost correctness, auto-router, MCP, and registry pricing.

## 1. This Week's Highlights

LiteLLM is mid-cutover from the 1.98 stable line into 1.99/1.100. Operators should treat **v1.98.0** as the production pin and use **v1.100.0-rc.1** only if they need the Anthropic empty-thinking / tool-call sanitizer fixes, prompt-cache savings reporting, or the new Friendli/Gemini/xAI registry rows. The live issue board is still dominated by **translation correctness** (Claude empty-content placeholder, MCP auto-execute hijacking client tools, streaming `usage` dropped) and **multi-tenant ops** (unauthenticated `/metrics` PII, spend-dashboard undercount, spend-log index saturation). The matching fix PRs landed the same day: stop injecting `[System: Empty message content sanitised…]` on tool-only turns ([#34822](https://github.com/BerriAI/litellm/pull/34822)), drain spend queues on shutdown ([#38168](https://github.com/BerriAI/litellm/pull/38168)), and resolve fallbacks against the tier a pre-routing hook already selected ([#38882](https://github.com/BerriAI/litellm/pull/38882)).

## 2. Releases & Breaking Changes

| Tag | When | Channel | Notes |
|---|---|---|---|
| [v1.100.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-rc.1) | 30 Aug | RC | Anthropic empty-thinking self-heal, complexity-router cheapest-tier housekeeping, prompt-cache savings split (total vs gateway-attributed), paginated `GET /public/v1/model_hub`, A2A agent semantic search, Lakera v2 skip-message + advisory mode, GPT-5 temp/`top_p` stripped on reasoning models. |
| [v1.99.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.99.0-rc.2) | 30 Aug | RC | Backports only: shadcn UI regressions, Vertex realtime/vision fixtures, Anthropic `tool_result` document blocks on `/v1/messages`. |
| [v1.100.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-dev.2) / [dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-dev.1) | 26–28 Aug | nightly | UI shadcn/react-hook-form, OTEL error mapping, Together `response_format`, Bedrock `reasoning_effort`, Redis credential support. **Breaking in dev.1:** `prompt_token_calculator` deleted. |
| [v1.98.0](https://docs.litellm.ai/release_notes/) | 22 Aug | **stable** | PTU billed as reserved capacity (`ptu_count` × `cost_per_ptu_per_hour`, per-token billing off on that deployment), auto-router shadow evals, callable routing groups. |

All Docker tags are **cosign-signed** with the key introduced in [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Verify before promoting an image:

```bash
cosign verify --key https://raw.githubusercontent.com/BerriAI/litellm/0112e53046018d726492c814b3644b7d376029d0/cosign.pub \
  ghcr.io/berriai/litellm:v1.100.0-rc.1
```

**Migration notes**
- Do not pin production to `*-dev.*`. `prompt_token_calculator` removal in 1.100.0-dev.1 will break custom token estimators.
- `/metrics` auth default flipped earlier this year; scrapers that still 401 need `litellm_settings.require_auth_for_metrics_endpoint: false` — that opt-out is a known multi-tenant leak (see §5).
- Spend semantics: `/v2/user/info.spend` is a **budget counter that zeros on reset**; `/user/daily/activity` is cumulative. Docs PR [#38883](https://github.com/BerriAI/litellm/pull/38883) is the clarification customers have been asking for.
- Master-key rotation previously unblocked every model row and reset audit timestamps; fix in [#38878](https://github.com/BerriAI/litellm/pull/38878). Rotate only after that lands.

## 3. New Model & Hardware Support

No new CUDA/ROCm/Metal/CPU backends this window. LiteLLM remains a gateway; hardware support is whatever the upstream provider or vLLM/OMNI deployment already exposes.

**Registry / pricing additions (last 24h PRs + RC notes):**
- Friendli serverless: `friendliai/zai-org/GLM-5.3` ($1.40 / $4.40 per MTok) and `GLM-5.3-Flash` ($0.15 / $0.50) — [#38881](https://github.com/BerriAI/litellm/pull/38881), [#38880](https://github.com/BerriAI/litellm/pull/38880), catalog auto-sync [#35918](https://github.com/BerriAI/litellm/pull/35918).
- Broader registry sweep in RC: Gemini Omni 1.1 Flash, xAI `grok-imagine` image models, Mistral cache-read pricing, GLM 5.3 Flash + Kimi K2.7 Code, Together catalog sync, Bedrock Mantle GPT-5.5/5.4 272K tiers ([#38560](https://github.com/BerriAI/litellm/pull/38560), [#38615](https://github.com/BerriAI/litellm/pull/38615), [#38694](https://github.com/BerriAI/litellm/pull/38694)).
- Veo 3.1 lite pricing request closed: [issue #33199](https://github.com/BerriAI/litellm/issues/33199).
- xAI `grok-imagine-image` still reported as missing from `/images` healthy deployments on older builds ([#26184](https://github.com/BerriAI/litellm/issues/26184)); RC registry row does not by itself fix routing.

**Auth / provider plumbing in flight**
- Anthropic Workload Identity Federation (OIDC JWT-bearer) — feature [#28607](https://github.com/BerriAI/litellm/issues/28607), internal CI copy [#38818](https://github.com/BerriAI/litellm/pull/38818). Needed for any fleet that cannot mint long-lived Anthropic API keys.
- Bedrock Converse: OpenAI Agents SDK freeform tools (`type: custom`) forwarded as parameterless `toolSpec`s, `custom` field dropped ([#38871](https://github.com/BerriAI/litellm/pull/38871)).
- Azure chat: flatten top-level `anyOf`/`oneOf`/`allOf` on tool schemas before send ([#38870](https://github.com/BerriAI/litellm/pull/38870)).
- vLLM OMNI video passthrough (`/vllm/v1/videos/sync`, MiniMax-H3) discussed in [#38050](https://github.com/BerriAI/litellm/issues/38050) — works as a raw pass-through, not a first-class `/videos` API.

## 4. Performance & Optimization

No kernel/throughput numbers shipped this window. Work is **control-plane and cost-path**, not decode latency.

- **Spend path:** `LiteLLM_SpendLogs` lacked an `(api_key, startTime)` index; budget-window reseed seq-scanned the table and hit Prisma `P2028` on a 2-vCPU RDS box ([#35766](https://github.com/BerriAI/litellm/issues/35766), closed). Pair with shutdown drain [#38168](https://github.com/BerriAI/litellm/pull/38168) so `--max_requests_before_restart` no longer silently drops the in-memory SpendLogs queue.
- **Least-busy routing** still reported as insufficiently aggressive across two identical vLLM replicas ([#37622](https://github.com/BerriAI/litellm/issues/37622)). Complexity/auto-router fallbacks now resolve against the **pre-routing hook’s selected tier**, not the client-facing router name ([#38882](https://github.com/BerriAI/litellm/pull/38882)).
- **Cache savings:** explicit `cache_read_input_token_cost: 0.0` was treated as “unset” and billed at full input rate ([#38865](https://github.com/BerriAI/litellm/pull/38865)). Prompt-cache savings are now split into total vs gateway-attributed in the RC ([#38134](https://github.com/BerriAI/litellm/pull/38134)).
- **Token count fallback** now includes tools, system, and Anthropic image/document blocks ([#38657](https://github.com/BerriAI/litellm/pull/38657)) — matters for pre-call budget checks, not TTFT.
- **LoggingWorker** drops its queue when the event loop identity changes in a thread pool ([#36548](https://github.com/BerriAI/litellm/issues/36548)) — a silent log/cost hole under multi-loop worker pools.
- **PTU** (stable 1.98): reserved-capacity hourly flat cost, per-token billing disabled on that deployment so reserved traffic is not double-charged.

## 5. Stability & Regressions

Ranked by production blast radius. “Fix PR” means an open PR in the last 24h that claims the same root cause — not necessarily merged.

**P0 — wrong answers / hijacked agent loops**
- Claude returns literal `[System: Empty message content sanitised to satisfy protocol]` ([#24498](https://github.com/BerriAI/litellm/issues/24498), 11 comments, still OPEN). Root cause matches [#34822](https://github.com/BerriAI/litellm/pull/34822): empty-content placeholder injected into tool-call-only assistant turns, persisted by Anthropic, then echoed. Workaround until merge: avoid tool-only assistant turns or pin a build that includes that PR.
- MCP `require_approval: "never"` auto-execute steals client-side `tool_use` from Claude Code (Read/Bash/Edit) and fails every non-MCP tool ([#37031](https://github.com/BerriAI/litellm/issues/37031)). Do not put auto-execute MCP tools on the same model alias an agentic IDE talks to.
- Streaming drops upstream `usage` when the final chunk still has a non-empty `choices` array → `cached_tokens` lost, input billed at full rate ([#36168](https://github.com/BerriAI/litellm/issues/36168)). Mirror of the older egress-side #28735.

**P0 — security / multi-tenant isolation**
- `/metrics` still treated as an insecure default by operators on older docs/images; labels carry `hashed_api_key`, `api_key_alias`, `team_alias` (emails), requester IP ([#24530](https://github.com/BerriAI/litellm/issues/24530)). Current main defaults auth **on**; confirm `require_auth_for_metrics_endpoint` is not explicitly false, and scrape via a dedicated key + network policy. Related GHSA crop this month: SSRF via `user_config` and authenticated SSRF/credential exfil (published 26 Aug).
- Immutable safety `user_id` still overridable by teams ([#14505](https://github.com/BerriAI/litellm/issues/14505), P1 enterprise).

**P1 — cost / billing correctness**
- Usage dashboard pagination under-counts spend; failed requests attributed as 0 ([#11929](https://github.com/BerriAI/litellm/issues/11929), 15 comments, closed but still the highest-traffic ticket).
- Anthropic batch costs always $0 — `msgbatch_*` routed to the wrong endpoint ([#27944](https://github.com/BerriAI/litellm/issues/27944), closed).
- Azure Responses streaming 400s on `stream_options.include_usage`, which blocks Codex ([#28553](https://github.com/BerriAI/litellm/issues/28553)).
- Gemini 3.x gets `temperature=1.0` injected when the caller omitted it, against Google’s new contract ([#38663](https://github.com/BerriAI/litellm/issues/38663)).
- GPT-5.x reasoning models incorrectly advertised as accepting `temperature` ([#34301](https://github.com/BerriAI/litellm/issues/34301)); RC strips temp/`top_p` ([#38593](https://github.com/BerriAI/litellm/pull/38593)).
- Anthropic `reasoning_effort` silently dropped when passed as `Reasoning(effort, summary)` dict since v1.85.0 ([#28196](https://github.com/BerriAI/litellm/issues/28196)).
- Responses→Chat lowering drops `input_file` inside `function_call_output.output` on Vertex/Bedrock ([#28232](https://github.com/BerriAI/litellm/issues/28232)).

**P1 — platform / image**
- `v1.83.14-stable` `linux/arm64` manifest contains **amd64 binaries** ([#29382](https://github.com/BerriAI/litellm/issues/29382)). Do not run that tag on Graviton/Apple Silicon under `--platform linux/arm64`.
- `/ui/login` 404 on pip 1.85.1 while `/fallback/login` works ([#29340](https://github.com/BerriAI/litellm/issues/29340)) — usually a missing UI static mount / nginx rule.

**P2 — translation / dashboard paper cuts**
- Fireworks rejects tool schemas with `"default": null` + `"title"`; `drop_params` does not walk nested schemas ([#27821](https://github.com/BerriAI/litellm/issues/27821)).
- Cloudflare Workers AI empty `choices[0].message.content` ([#29353](https://github.com/BerriAI/litellm/issues/29353)).
- Anthropic `/v1/messages` experimental pass-through to OpenAI still has a five-bug cluster ([#23841](https://github.com/BerriAI/litellm/issues/23841)).
- Dashboard Logs pages by **messages** while the view groups by **session** ([#38060](https://github.com/BerriAI/litellm/issues/38060)).
- Guardrails: Lakera v2 ignored `skip_system_message_in_guardrail` ([#34396](https://github.com/BerriAI/litellm/issues/34396), closed; RC re-honors it in [#34940](https://github.com/BerriAI/litellm/pull/34940)). PUT `/guardrails/{id}` returned 200 but never applied on the serving worker ([#38877](https://github.com/BerriAI/litellm/pull/38877)); Gemini `:generateContent` routes skipped guardrails entirely ([#38869](https://github.com/BerriAI/litellm/pull/38869)).
- MCP Gateway `tools/list` cancel-scope `RuntimeError` + schema columns dropped on restart ([#28391](https://github.com/BerriAI/litellm/issues/28391)).

## 6. What This Means for Application Developers

1. **Stay on v1.98.0 for production agents** unless you are blocked by the Claude empty-content echo or GPT-5 temperature 400s. Promote `v1.100.0-rc.1` only after verifying tool-only assistant turns and MCP auto-execute against your own Claude Code / Codex clients.
2. **Do not share a model alias between server-side MCP auto-execute and an agentic IDE.** `require_approval: "never"` will consume the client’s `tool_use` stream. Split aliases: one “proxy-executes-MCP” deployment, one “pass tools through” deployment.
3. **Trust spend numbers from `/user/daily/activity`, not `/v2/user/info.spend`.** The latter is a resettable budget counter. If you bill internal teams off the dashboard, wait for the pagination / failed-request attribution fixes or query SpendLogs directly — and add the `(api_key, startTime)` index if you are still on a pre-#35766 schema.
4. **Streaming cost is still lossy.** If the last chunk has `choices` and `usage`, LiteLLM may drop `cached_tokens`. For cache-heavy Claude/Gemini workloads, reconcile cost from the non-stream usage object or a provider invoice until #36168 is gone.
5. **New models you can route today (once on RC/main):** Friendli GLM-5.3 / GLM-5.3-Flash, Gemini Omni 1.1 Flash, grok-imagine (chat/registry; `/images` still flaky), Kimi K2.7 Code, Bedrock Mantle GPT-5.5/5.4 272K. Price rows ≠ healthy deployments — hit `/health` and `/model/info` before flipping a default.
6. **Guardrails and Gemini-native routes.** If you call `:generateContent` or `/llm_passthrough`, assume guardrails were no-ops until [#38869](https://github.com/BerriAI/litellm/pull/38869) is on the box. PUT-updating a guardrail requires a worker that applies in-memory state ([#38877](https://github.com/BerriAI/litellm/pull/38877)); a 200 is not proof.
7. **Lock down `/metrics` and rotate keys carefully.** Treat Prometheus as a PII surface. After master-key rotation, confirm blocked models stayed blocked ([#38878](https://github.com/BerriAI/litellm/pull/38878)).
8. **ARM images:** skip `v1.83.14-stable` on arm64. Prefer a current signed tag and `cosign verify` in CI.
9. **WIF for Anthropic** is the enterprise auth path to watch; track [#28607](https://github.com/BerriAI/litellm/issues/28607) / [#38818](https://github.com/BerriAI/litellm/pull/38818) if you are retiring static Anthropic secrets.

**Watch next:** merge of [#34822](https://github.com/BerriAI/litellm/pull/34822) (Claude placeholder), [#37031](https://github.com/BerriAI/litellm/issues/37031) (MCP vs Claude Code), 1.99.0 stable cut from rc.2, and whether `/metrics` label sanitization ships rather than remaining an auth-only mitigation.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

I'll pull the latest Unsloth repo details and release notes so the digest matches today's activity.# Unsloth Digest — 2026-08-30
Repo: [unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. This Week's Highlights

**v0.1.804-beta** ships day-zero local serving for **Qwen3.8-Flash-Next** (125B MoE, Qwen4-preview architecture) and **GLM-5.3-Flash / ox-alpha** (320B, 18B active). The headline numbers: Qwen 1-bit Dynamic GGUF on **75GB RAM / unified memory** (no VRAM required), GLM 1-bit on **102GB combined RAM+VRAM**, plus **5× faster RAM-offload inference** and working **repeated (“infinite”) compaction**.

Studio quality-of-life landed in the same window: MLX/Mac runtime fixes, LAN **keyless / password-less** API, XET/HTTP download toggle, disconnect-resilient chats, and clearer pre-load memory estimates. Parallel work on the train/serve path is still hot: GRPO in Studio, multi-GPU `index_select` training, smart-offload vs `--fit`, and a pile of SQLite / generation-reaper reliability PRs.

## 2. Releases & Breaking Changes

| Version | Notes |
|---|---|
| [**v0.1.804-beta**](https://github.com/unslothai/unsloth/releases/tag/v0.1.804-beta) | Qwen3.8-Flash-Next + GLM-5.3-Flash local run; 5× RAM-offload; infinite compaction; 100+ chat/reliability/perf changes. Guides: [Qwen](https://unsloth.ai/docs/models/qwen3.8-next), [GLM](https://unsloth.ai/docs/models/glm-5.3-flash). GGUFs: [unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF), [unsloth/GLM-5.3-Flash-GGUF](https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF). |
| [**v0.1.803-beta**](https://github.com/unslothai/unsloth/releases) / **v0.1.802-beta** | Bug-fix trains (~170 PRs). MLX/Mac runtimes fixed. LAN keyless API + keyboard shortcuts. XET vs HTTP download toggle. AMD-related notes in the changelog. Installer pin bumped to `unsloth>=2026.8.21`. |

**Migration / ops notes**

- Older llama.cpp builds reject Qwen3.8-Flash-Next GGUFs (`architecture 'qwen4exp'`). Studio users who saw “This model is not supported yet” need **0.1.804-beta** (or a llama.cpp that understands `qwen4exp`). See [#9811](https://github.com/unslothai/unsloth/issues/9811).
- Windows in-app update to `0.1.803-beta` / package `2026.8.21` left some machines on a **CPU-only PyTorch** even with working NVIDIA drivers. Track [#9857](https://github.com/unslothai/unsloth/pull/9857) and [#9858](https://github.com/unslothai/unsloth/pull/9858) before rolling desktop updates in production.
- Compaction / rolling context is now a first-class path ([#7472](https://github.com/unslothai/unsloth/issues/7472) closed). Long-lived agent sessions should re-test compaction rather than assuming “new chat only.”
- New operator policy `UNSLOTH_NO_CHAT_HISTORY` ([#9982](https://github.com/unslothai/unsloth/pull/9982)) makes sessions ephemeral — relevant if you treat Studio as a multi-tenant gateway.

## 3. New Model & Hardware Support

**Models**
- **Qwen3.8-Flash-Next** — 125B (≈6B active + 51B n-gram embeddings + MTP). Multimodal, 262K context, reasoning levels None / Low / Medium / Extra High, Preserved Thinking. 1-bit Unsloth Dynamic GGUF is **79% smaller than BF16 (355GB)** and keeps **~80% top-1 accuracy**. N-gram / PLE layers can mmap off SSD.
- **GLM-5.3-Flash (ox-alpha)** — 320B / 18B active, multimodal, up to **1M context**, Low/High/Max reasoning. 1-bit Dynamic GGUF ~93GB, **85% smaller vs BF16 (642GB)**, ~71% top-1 retained; 3-bit (~128GB class) retains ~87%.
- Still requested, not landed as first-class: DeepReinforce **Ornith-1.0** ([#6721](https://github.com/unslothai/unsloth/issues/6721)).

**Backends / devices**
- **Metal / MLX / Mac**: 0.1.803-beta fixed broken MLX/Mac runtimes. Historic “no CUDA on Mac” thread [#685](https://github.com/unslothai/unsloth/issues/685) remains the FAQ pointer; Desktop is the supported path on Apple Silicon.
- **AMD / ROCm**: mixed. gfx1151 (Strix Halo) Qwen3.8-27B V3 crash reports were **not reproduced** on Unsloth’s 20-cell matrix; suspicion sits on llama.cpp context checkpoints ([#9792](https://github.com/unslothai/unsloth/issues/9792)). Still open: unified-memory APU loads capped at system RAM instead of 110GB GPU pool ([#6834](https://github.com/unslothai/unsloth/issues/6834)), Strix Halo llama-server startup crash ([#7380](https://github.com/unslothai/unsloth/issues/7380)), RDNA4 gfx1201 prebuilt `llama-server` segfault ([#7307](https://github.com/unslothai/unsloth/issues/7307)), generic “ROCm can’t load any models” ([#8998](https://github.com/unslothai/unsloth/issues/8998)).
- **CUDA / multi-GPU**: training across planner-split cards dies in `index_select` unless [#9995](https://github.com/unslothai/unsloth/pull/9995) is in your tree. Windows “no visible GPU” after update is a PyTorch/CUDA discovery bug, not missing hardware ([#9858](https://github.com/unslothai/unsloth/pull/9858)).
- **Quant / formats**: Unsloth Dynamic 1-bit / 3-bit GGUF for the two Flash models; local safetensors QLoRA still mis-loads at full BF16/FP16 in Studio ([#5344](https://github.com/unslothai/unsloth/issues/5344)) — GGUF-by-ID remains the reliable Studio path.

## 4. Performance & Optimization

- **5× faster inference under RAM offload** in 0.1.804-beta (release claim; treat as RAM-heavy MoE path, not dense-GPU decode).
- **Smarter GPU+RAM offload planner** + pre-load “will this fit?” estimates. Counter-data from oobabooga: the smart `-ot` planner was **slower than `--fit on` in 40/43 cells** on a 6-core i5-12400F desktop ([#9861](https://github.com/unslothai/unsloth/issues/9861)). Default planner numbers came from 192-core datacenter hosts — consumer boxes should pin `--fit on` until that gap closes.
- Repeated compaction is no longer a one-shot trick; long chats can keep compacting ([#7472](https://github.com/unslothai/unsloth/issues/7472)).
- `GET /v1/models` was 316–621ms vs 13–34ms for the internal catalog; [#9998](https://github.com/unslothai/unsloth/pull/9998) caches the servability scan behind the OpenAI-compatible route.
- Configurable prompt / generation timeouts requested for CPU+GPU partial offload (20× slower tails) — [#5756](https://github.com/unslothai/unsloth/issues/5756).
- Memory-policy toggles are a no-op when weights are fully on a discrete GPU; UI will now say so ([#9571](https://github.com/unslothai/unsloth/pull/9571)). “Don’t reserve system RAM” still fails to release host pages after `-ngl -1` ([#9033](https://github.com/unslothai/unsloth/issues/9033)).
- Studio Train page is gaining **GRPO (RL)** as a first-class method ([#9310](https://github.com/unslothai/unsloth/pull/9310), closes #8777) — previously only SFTTrainer branches.

Community decode datapoint (not official): 1-bit Qwen3.8-Flash-Next with SSD n-gram offload ≈ **30 tok/s** on 5080 + 9950X3D + 96GB RAM, ~4% hit vs in-RAM n-gram.

## 5. Stability & Regressions

Ranked by operational severity.

**P0 — service stops answering**
- Studio **SQLite deadlock**: every thread blocked in `sqlite3.connect()` / `close()`, listen socket still open, curls hang ([#9008](https://github.com/unslothai/unsloth/issues/9008)). Related log storm: one slow writer → 54× `409 ChatMessageProtocol` in four minutes ([#9996](https://github.com/unslothai/unsloth/pull/9996)).
- **Frozen generation with HTTP 200**: durable chat runs stop making progress; UI “disconnects over LAN.” Reaper PR: [#9997](https://github.com/unslothai/unsloth/pull/9997).
- Deep Research freeze on Gemma-4-26B-A4B at “Writing The Report” ([#8483](https://github.com/unslothai/unsloth/issues/8483)).

**P1 — load / train correctness**
- Multi-GPU `FastLanguageModel.from_pretrained` training: tensors split across `cuda:0` / `cuda:1` → `index_select` ([#9995](https://github.com/unslothai/unsloth/pull/9995)).
- Studio loads local **safetensors as full precision** (~15.7GB) instead of 4-bit QLoRA; GGUF ID path is fine ([#5344](https://github.com/unslothai/unsloth/issues/5344)).
- GPU compute used, **VRAM unused**, weights sit in system RAM ([#7449](https://github.com/unslothai/unsloth/issues/7449), [#6855](https://github.com/unslothai/unsloth/issues/6855)).
- Auto-load **ignores custom context length / KV-cache quant** ([#7477](https://github.com/unslothai/unsloth/issues/7477)).
- `save_pretrained_merged` garbage output ([#5410](https://github.com/unslothai/unsloth/issues/5410)).
- Qwen3.5 9B never reaches first train step; Gemma 4 26B-A4B OOM QLoRA batch=1 on 96GB ([#7203](https://github.com/unslothai/unsloth/issues/7203)).
- Windows update → CPU-only PyTorch / “No visible GPU” ([#9857](https://github.com/unslothai/unsloth/pull/9857), [#9858](https://github.com/unslothai/unsloth/pull/9858)).

**P1 — AMD / architecture**
- Qwen3.8-27B **V3 GGUF AMD crash after prefill**; V2 `408fcc1807ab` works. Not reproduced on gfx1151 in Unsloth’s grid ([#9792](https://github.com/unslothai/unsloth/issues/9792)).
- Strix Halo RAM cap / llama-server HIP init crash / RDNA4 segfault / ROCm load failure: [#6834](https://github.com/unslothai/unsloth/issues/6834), [#7380](https://github.com/unslothai/unsloth/issues/7380), [#7307](https://github.com/unslothai/unsloth/issues/7307), [#8998](https://github.com/unslothai/unsloth/issues/8998).

**P2 — product / API**
- Chat send path fails IndexedDB persist on AppImage / Tauri ([#9518](https://github.com/unslothai/unsloth/issues/9518)); regenerate duplicates user turns ([#10000](https://github.com/unslothai/unsloth/pull/10000)).
- Model Hub WebKit SIGABRT (Skia COLRv1) ([#9480](https://github.com/unslothai/unsloth/issues/9480)).
- Project/RAG “list files” tool error; write+edit still missing ([#8854](https://github.com/unslothai/unsloth/issues/8854)).
- Qwen3.8 API serving guide fails HF resolve ([#9428](https://github.com/unslothai/unsloth/issues/9428)); raw JSONL export is not JSONL ([#8733](https://github.com/unslothai/unsloth/issues/8733)).
- Reasoning-effort slider still missing for Qwen 3.8 27B in Studio web ([#8881](https://github.com/unslothai/unsloth/issues/8881)).

**Security / CI hygiene (merged or closing)**
- Fail CI on `exec`/`eval`/`compile` of non-written values ([#9999](https://github.com/unslothai/unsloth/pull/9999), successor to [#9827](https://github.com/unslothai/unsloth/pull/9827)).
- `os.dup2` reverse-shell false positive + zoo URL allowlist ([#9994](https://github.com/unslothai/unsloth/pull/9994)).
- Subprocess-fix dir no longer pollutes shared tempdir ([#9973](https://github.com/unslothai/unsloth/pull/9973)).

## 6. What This Means for Application Developers

1. **Treat 0.1.804-beta as the Flash-model floor.** If you serve Qwen3.8-Flash-Next or GLM-5.3-Flash through Studio or bundled llama-server, older runtimes will hard-fail on `qwen4exp`. Pin Desktop / package `2026.8.21+` and the matching GGUF revision (V3 Qwen3.8-27B is still radioactive on some AMD stacks — keep a V2 pin).

2. **Size boxes by combined memory, not VRAM.** Qwen 1-bit is a **75GB RAM** problem; GLM 1-bit is **~102GB RAM+VRAM**. N-gram/PLE mmap-to-SSD is the lever if you are short on DRAM. Do not assume the smart offload planner beats `--fit on` on 6–16 core workstations ([#9861](https://github.com/unslothai/unsloth/issues/9861)).

3. **Studio is now an agent host, not just a chat UI.** Incoming: durable project memory + Sloth Graphs ([#9987](https://github.com/unslothai/unsloth/pull/9987)), GRPO training in-app ([#9310](https://github.com/unslothai/unsloth/pull/9310)), pre-registered MCP OAuth clients ([#7665](https://github.com/unslothai/unsloth/pull/7665)), `x-api-key` ([#7656](https://github.com/unslothai/unsloth/pull/7656)), keyless LAN, compaction, disconnect resume. Pair that with `UNSLOTH_NO_CHAT_HISTORY` if you expose Studio on a LAN.

4. **Do not put Studio in the critical path without the SQLite/reaper patches.** Deadlocks, 409 write storms, and silent hung generations are the dominant outage mode this week ([#9008](https://github.com/unslothai/unsloth/issues/9008), [#9996](https://github.com/unslothai/unsloth/pull/9996), [#9997](https://github.com/unslothai/unsloth/pull/9997)). Prefer the OpenAI-compatible `/v1/chat/completions` from a process you supervise, and cache `/v1/models` ([#9998](https://github.com/unslothai/unsloth/pull/9998)).

5. **Fine-tune path is still two products.** GGUF inference in Studio is ahead of local-safetensors QLoRA (full-precision load, [#5344](https://github.com/unslothai/unsloth/issues/5344)). Multi-GPU training needs [#9995](https://github.com/unslothai/unsloth/pull/9995). Merged-export correctness is still a known footgun ([#5410](https://github.com/unslothai/unsloth/issues/5410)) — eval the merge before you ship an adapter.

6. **Windows desktop updates can silently drop CUDA.** After any in-app update, assert `nvidia-smi` *and* Studio Settings > System show the same GPUs before starting a train job ([#9857](https://github.com/unslothai/unsloth/pull/9857)).

7. **Agent UX gaps to paper over yourself:** no reasoning-effort control ([#8881](https://github.com/unslothai/unsloth/issues/8881)), RAG file-list/write tools incomplete ([#8854](https://github.com/unslothai/unsloth/issues/8854)), no first-class Codex/Claude-Code/OpenCode auto-detect ([#6841](https://github.com/unslothai/unsloth/issues/6841)). Drive those from your own gateway until Studio catches up.

</details>