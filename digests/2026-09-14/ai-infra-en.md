# AI Infrastructure Digest 2026-09-14

> Generated: 2026-09-13 22:07 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

I'll fill the missing vLLM snapshot and then write the cross-project comparison.# AI Infrastructure Cross-Project Digest — 2026-09-14

Window: last ~24h activity plus current stable/preview tags. vLLM’s per-issue digest failed; release and model-support facts below are taken from public tags (`v0.29.0` / `v0.29.1rc0`) and are marked as such.

## 1. Ecosystem Overview

This week is a **model-landing week, not a release week**. DeepSeek-V4.1 / V4.1-Flash, Kimi-K3, Qwen3.8 / Qwen3-Coder, Gemma 4, GLM-5.2, and Nemotron-H are the contested architectures; engines are racing on sparse MLA, hybrid SWA/Mamba, Engram host offload, and MTP/speculative decode rather than cutting new stables. SGLang is the most explicit V4.1 preview path (`dev-dsv41`); vLLM already shipped several of those families in `v0.29.0` (8 Sep) and is on `v0.29.1rc0`; llama.cpp still has V4.1 and Kimi-K3 conversion PRs open. At the same time, **agent/tool-calling correctness is the operational tax**: reasoning flags ignored, Responses `output[]` empty, tool parsers dropping user turns, silent speculative-decode acceptance collapse. Production posture across stacks is the same: pin last stable, treat preview images as non-interchangeable, and put a supervisor in front of the worker.

## 2. Activity Comparison

| Project | Issues (window) | PRs (window) | Latest stable | This-window release | Notes |
|---|---|---|---|---|---|
| **vLLM** | Digest failed | Digest failed | **v0.29.0** (8 Sep) | **v0.29.1rc0** (12 Sep); nightlies `0.29.1.dev*` | 594 commits / 277 authors in 0.29.0; MRV2 default |
| **SGLang** | **53** updated / 24h | **~500** touched / 24h | **v0.5.19** (4 Sep) | None; nightlies `0.5.20.dev` | V4.1 umbrella still CI-blocked |
| **llama.cpp** | Not quantified | Multiple nightlies/day | Rolling **b10948** (13 Sep) | b10934 → b10948 in ~1 day | No semver; pin a `b` tag |
| **Ollama** | High (agent/parser) | Companion fix PRs landing | **v0.34.0** (9 Sep) | None in 24h | Built-in CLI agent removed |
| **LiteLLM** | High (gateway correctness) | 1.102 track + hotfixes | **v1.100.1** (10 Sep) | **v1.102.0-rc.1** (13 Sep) | Cosign-signed GHCR |
| **Unsloth** | Studio + train bugs | Multi-resident GGUF, MCP images | **v0.1.808-beta** (9 Sep) | 807/808-beta family | Vulkan-default AMD; PyTorch 2.11 |

SGLang is the noisiest single repo this window (500 PRs touched). llama.cpp ships the most frequent binaries. LiteLLM and Ollama are quieter on version bumps but denser on API-compat regressions.

## 3. Model Support Race

**Who is ahead on the contested 2026-Q3 families**

| Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---|---|---|---|---|---|---|
| **DeepSeek V4.1 / Flash** | In 0.29 line (perf + shared-expert MegaMoE) | **Day-0 preview** (`dev-dsv41`); umbrella [#38798] still open | Converter **open** [#28696] | Cloud tags exist; local incomplete | Fireworks cost map for V4.1 Flash | Serving via llama.cpp/vLLM sidecar |
| **Kimi-K3** | NVFP4 + DSpark/DCP in 0.29.0 | Tracking / PD issues (PP8 TTFT floor) | Hybrid KDA+MLA PR **not merged** | `kimi-k3:cloud` image-in-tool 500 | Provider map only | Via GGUF when conversion lands |
| **Qwen3.8 / Qwen3-Coder** | Qwen3.8-Flash-Next + MTP in 0.29.0 | Serving assumed on stable | Parser + schema IR landed (b10934–36) | **Parser/tool bugs are the week’s theme** | Registry / reasoning fallback | QLoRA OOM on Next-Base 80B class |
| **Gemma 4** | Prior line + SWA variants | — | SWA “forget” + load bugs still open | Unified vision PR still open; Jetson OOM | — | Training/eval residual issues |
| **GLM-5.2** | — | ROCm fused DSA indexer; Ascend cookbook draft | — | — | — | — |
| **Nemotron-H / MTP** | Omni Reasoning V3 + MTP in 0.29.0 | — | Expert-FFN zero-divisor guard (b10947) | — | — | Attention handling still open |
| **Hy4 / SenseNova / Mercury** | Hy4-preview in 0.29.0 | SenseNova-U1 tracking | HY_V4 excluded from WebGPU tests | Hy4 request closed | Mercury 2.5 cost-map in flight | — |

**Score:** vLLM is ahead on *merged production kernels* for V4 / K3 / Qwen3.8-Flash / Hy4. SGLang is ahead on *public V4.1-Flash serving + LMSYS numbers* (but preview-only). llama.cpp is conversion-gated. Ollama is library/UX gated and currently losing on tool/schema fidelity. Gateways (LiteLLM) follow provider maps, not kernels. Unsloth is a train+Studio layer, not a first-party frontier-model engine.

## 4. Performance Frontier

Optimization is concentrated in five places:

1. **Sparse / hybrid attention kernels** — SGLang: GLM-5.2 DSA 12→4 fused HIP kernels, MLA q-absorb+RoPE fusion on gfx950, Triton sparse MLA CUDA-graph-safe workspaces. vLLM 0.29: K3 Mamba metadata 6.6–7.6×, Hopper/SM100 GEMM, MLA gate into QKV-A, MegaMoE shared-expert fuse. llama.cpp: Vulkan queue-submit mutex (correctness tax), OpenCL row-align for more quants, RDNA4 FA PP regression still live.
2. **KV / PD / unified memory** — SGLang’s biggest structural bet: unified-pool PD for MHA/MLA/SWA/Mamba + Mooncake, shared byte budget for hybrid-SWA, opt-in KV checksum, HiCache rank consensus. vLLM: MRV2 CUDA-graph KV auto-sizing, DCP partial prefix hits. llama.cpp: `/slots` still drops hybrid/vision checkpoints; disk-streamed MoE still open. Unsloth: quantized MLX KV −74% prompt memory; Studio does not release host RAM after full-VRAM GGUF load.
3. **Speculative decode / MTP** — All three engines. Silent failure is the pattern: SGLang quantized DFlash2 ~0% acceptance; ROCm EAGLE ignored temperature; llama.cpp draft-mtp diverges on quantized greedy targets; vLLM has extract_hidden_states speculation and DP-sync skip before EAGLE/MTP.
4. **MoE / quantization** — DeepGEMM deterministic path (SGLang, batch-size logprob invariance); MegaMoE fuse shared+routed; MXFP4 / NVFP4 / FlashInfer routed-MoE. Unsloth: diffusion INT8/FP8 1.2–1.7×; AMD Vulkan ~20% vs ROCm.
5. **Gateway hot path (not kernels)** — LiteLLM: auth/spend collapsed to MGET+pipeline, Redis circuit-breaker quiet-on-open, Rust tiktoken admission, incremental Bedrock stream spend. Ollama: prefix-cache misses from unsorted tool-schema keys; F16 blob leak after `create --quantize`.

Published numbers this week worth bookmarking: SGLang LMSYS V4.1 **+1.56× prefill on 8×H200**, **+1.37× on 4×GB300**, Engram **+36% KV capacity**; Unsloth Strix Halo **+23% PP / +8% gen** on Vulkan.

## 5. Layer Positioning

```
Training / LoRA     Unsloth (Studio + kernels + GGUF export)
        ↓
Local runtime       llama.cpp  ←  Ollama (productized llama.cpp + library + cloud)
        ↓
Cluster serving     vLLM  ·  SGLang     (paged/PD, DP attention, MoE EP, router)
        ↓
LLM gateway         LiteLLM             (multi-provider, spend, guardrails, MCP)
```

- **vLLM** — default cluster engine. Model Runner V2 is now the default; scope is throughput, TP/DP/EP, new model day-0 on NVIDIA/ROCm/XPU. Adjacent repos (`semantic-router`, `agentic-api`, `tpu-inference`, `vllm-metal`) show the project spreading *above and beside* the engine.
- **SGLang** — same layer as vLLM, differentiated on structured generation, radix cache, PD/HiCache, and DeepSeek-family day-0 (sparse indexer, Engram, 1M ctx). Higher operational sharpness this week (engine-wide crash on client disconnect).
- **llama.cpp** — portable runtime and conversion hub. Wins on backend breadth (Vulkan/SYCL/OpenCL/s390x/WebGPU) and nightly cadence; loses on hybrid checkpointing and giant-model drop-in.
- **Ollama** — distribution and local product surface on top of llama.cpp. This week’s work is parsers, Responses/Codex, quantize hygiene — not kernels.
- **LiteLLM** — control plane. OCR adapters, MCP/guardrails, spend MGET, Responses translation. Failures here are policy bypass and billing/index bugs, not tokens/s.
- **Unsloth** — fine-tune + desktop Studio. Vulkan AMD default and signed Windows binaries move it toward a multi-backend local gateway, but HF-token isolation and multi-GPU QLoRA are still sharp edges.

Do not treat Ollama tags, SGLang nightlies, and vLLM stables as one compatibility matrix for the same model name.

## 6. Trend Signals

**Industry**

- **Hybrid architectures are the new default** (MLA + SWA + Mamba + latent MoE + MTP). Every engine is paying a correctness tax on cache handoff, checkpoint restore, and draft acceptance.
- **Preview images beat pip wheels** for frontier models (SGLang `dev-dsv41`, vLLM rc). “`pip install` and serve V4.1” is explicitly false this week.
- **OpenAI Responses + Anthropic Messages + MCP** are the interoperability surface. Bugs cluster there: empty terminal `output[]`, `include_reasoning` ignored, tools invisible to guardrails, `previous_response_id` empty replay.
- **Quiet wrong answers > loud crashes.** Spec decode at ~1.0 acceptance, SWA attaching the wrong Mamba checkpoint, embedding `index` reuse, reasoning leaked after `include_reasoning: false`.
- **AMD path is splitting:** SGLang doubles down on ROCm kernel fusion; Unsloth and llama.cpp treat Vulkan as the practical default. RDNA4 FA PP regression remains unresolved.
- **Agent traffic changes cache geometry.** DP attention without a stable `routing_key` dropped SGLang radix hits 86% → 54%. Ollama misses cache when tool JSON key order shuffles.

**What agent / application developers should watch**

1. Pin **vLLM 0.29.0** or **SGLang 0.5.19** for production; isolate V4.1-Flash on the named preview image with a digest pin.
2. Do not trust `include_reasoning: false`, Responses terminal events, or Anthropic-path guardrails until the cited PRs are on *your* tag (SGLang #39113, LiteLLM #41014 / #41011).
3. Send a stable **routing_key** (or canonicalize tool JSON) on multi-turn / RL / DP-attention deployments.
4. Log **speculative acceptance**. If it trends to 1.0, disable the drafter — do not scale replicas.
5. Put a **process supervisor** in front of SGLang; a single cancelled stream can kill the worker (#39216).
6. Do not use llama.cpp `/slots` as a session store for vision/hybrid graphs.
7. On Ollama, treat cloud vs local family tags as different products; inspect leftover F16 blobs after quantize.
8. Next merge watch: SGLang #38798 + FlashMLA #39171 + unified PD #37506; llama.cpp DeepSeek V4.1 / Kimi-K3 converters; LiteLLM 1.102.0; Unsloth multi-resident GGUF + HF-token isolation.

*vLLM issue-level digest was unavailable for this window; treat its row as release-accurate, not 24h-issue-accurate.*

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

I'll pull the current SGLang release status and a few high-signal issues/PRs so the digest is accurate rather than just a restatement of the raw lists.# SGLang Digest — 2026-09-14

Source: [sgl-project/sglang](https://github.com/sgl-project/sglang). Window: issues/PRs updated in the last 24h (53 issues, 500 PRs touched). No tagged release in this window.

## 1. This Week's Highlights

The repo is in a **DeepSeek-V4.1 landing week**, not a release week. Day-0 serving and RL for V4.1-Flash is public via the LMSYS write-up and a preview image (`lmsysorg/sglang:dev-dsv41`); the umbrella PR is still open and CI-blocked. In parallel, maintainers are pushing **unified-memory PD**, HiCache correctness, and ROCm kernel fusion for GLM-5.2 / sparse MLA. Operationally, the highest-severity reports this window are **engine-wide crashes on client disconnect**, PD circuit-breaker deadlocks, and silent speculative-decode failures.

## 2. Releases & Breaking Changes

- **No new GitHub release in the last 24h.** Latest stable tag remains **[v0.5.19](https://github.com/sgl-project/sglang/releases/tag/v0.5.19)** (2026-09-04). Nightlies are on **0.5.20.dev** (e.g. `0.5.20.dev20260913+g23bc4c6ed9`).
- **DeepSeek-V4.1-Flash is not on a stable pip wheel.** Docs explicitly say a stock `pip install sglang` cannot serve it; use `lmsysorg/sglang:dev-dsv41` (NVIDIA) or `lmsysorg/sglang:dev-dsv41-mi35x` (MI350X).
- **API surface still incomplete for reasoning models:** `include_reasoning: false` is ignored on chat/completions ([#39103](https://github.com/sgl-project/sglang/issues/39103)); fix PR [#39113](https://github.com/sgl-project/sglang/pull/39113) is open.
- **Determinism risk on DeepGEMM 0.2:** default BF16 path via cuBLASLt is batch-size-dependent. [#39319](https://github.com/sgl-project/sglang/pull/39319) forces DeepGEMM’s deterministic kernel so logprobs stay invariant across batch sizes.
- **CI health:** tracking issue [#17050](https://github.com/sgl-project/sglang/issues/17050) last auto-update 2026-09-13 21:29 UTC — **6 broken, 11 flaky, 991 recently fixed**. Large PRs (including V4.1) are waiting on `run-ci`.

## 3. New Model & Hardware Support

| Track | Status | Link |
|---|---|---|
| **DeepSeek-V4.1 / V4.1-Flash** (`dsv4` backend: sparse indexer, cross-layer compressed KV, Engram, DSpark, native multimodal, 1M ctx) | Open umbrella + kernel bump | [#38798](https://github.com/sgl-project/sglang/pull/38798), FlashMLA rebase [#39171](https://github.com/sgl-project/sglang/pull/39171) |
| **SenseNova-U1 / U1.5** feature & perf tracking | Open | [#37742](https://github.com/sgl-project/sglang/issues/37742) |
| **Ascend NPU (Atlas 800I A3)** GLM-5.2 cookbook | Draft PR, hardware verify pending | [#39321](https://github.com/sgl-project/sglang/pull/39321) |
| **Intel CPU 2026Q2 roadmap** (small/mid LLM serving, hetero PD with host CPU) | Closed / inactive | [#24921](https://github.com/sgl-project/sglang/issues/24921) |
| **Ngram speculative decoding** further support | Open roadmap | [#21052](https://github.com/sgl-project/sglang/issues/21052) |
| **FlashInfer MXFP4 routed-MoE** on SM120/SM121 (serialized static-FP8) | Closed feature request | [#31235](https://github.com/sgl-project/sglang/issues/31235) |
| **DeepSeek V4 on Ascend** | Closed “does latest support it?” | [#29599](https://github.com/sgl-project/sglang/issues/29599) |

Related V4.1 bugs already filed against the preview branch: image-placeholder token treated as a hard 400 ([#39274](https://github.com/sgl-project/sglang/issues/39274)), Engram + compact ragged verify dying in CUDA-graph capture ([#39173](https://github.com/sgl-project/sglang/issues/39173)).

## 4. Performance & Optimization

**Kernels / ROCm (gfx950)**
- GLM-5.2 DSA indexer decode: 12 kernels/layer → **4 fused HIP kernels** (78 DSA layers + MTP draft). [#38583](https://github.com/sgl-project/sglang/pull/38583)
- Fuse MLA q-absorb into RoPE + KV-write on gfx950 (one grid instead of two under-occupied launches). [#38340](https://github.com/sgl-project/sglang/pull/38340)
- Triton sparse MLA: split-K / reduction geometry tuned; workspaces made CUDA-graph-safe. [#39059](https://github.com/sgl-project/sglang/pull/39059)
- ROCm EAGLE verify was silently `argmax` (ignored `temperature` / `top_p` → repetition loops). [#37134](https://github.com/sgl-project/sglang/pull/37134)

**MoE / DeepGEMM**
- Fuse shared + routed experts in MegaMoE DeepGEMM ([#39313](https://github.com/sgl-project/sglang/pull/39313), WIP for [#38700](https://github.com/sgl-project/sglang/issues/38700)).
- Deferred MoE finalize **unreachable** for models that bring their own routing (`FLASHINFER_TRTLLM_ROUTED`). [#39299](https://github.com/sgl-project/sglang/issues/39299)

**Memory, cache, PD**
- Unified-pool PD for MHA / MLA / SWA / full+SWA+Mamba (Mooncake transfers, page-envelope register, no relocate while in flight). Stack 1/3: [#37506](https://github.com/sgl-project/sglang/pull/37506)
- Shared byte budget for hybrid-SWA instead of static per-pool caps. [#36729](https://github.com/sgl-project/sglang/pull/36729)
- Opt-in KV checksum on PD handoff (today only `bootstrap_room` is checked). [#39229](https://github.com/sgl-project/sglang/pull/39229)
- HiCache: `@rank_consensus` on more paths ([#37425](https://github.com/sgl-project/sglang/pull/37425)); prefetch state scoped to request *attempt*, not request id ([#39318](https://github.com/sgl-project/sglang/pull/39318)); buffer prefetch lock release on storage cleanup ([#38483](https://github.com/sgl-project/sglang/pull/38483), closed).

**Serving / DP**
- `routing_key` load-balance for multi-turn / RL rollouts under DP attention (reported radix-cache hit **86% → 54%** when round-robin split turns across ranks). [#37543](https://github.com/sgl-project/sglang/pull/37543)

**Published V4.1 numbers (LMSYS, not this 24h PR set):** decoder-side replay **+1.56× prefill on 8×H200**, **+1.37× on 4×GB300**; Engram host offload **+36% KV capacity** on 4×GB300 with comparable decode/TTFT.

**Open perf bugs still in the queue**
- PP8 disaggregated prefill on Kimi-K3: load-independent **~30 s TTFT floor**. [#34815](https://github.com/sgl-project/sglang/issues/34815)
- Unified-cache default flip regresses long-prefix decode on Spark/Thor (closed). [#36131](https://github.com/sgl-project/sglang/issues/36131)
- Qwen3.5-4B large regression on RTX 5090 (closed/inactive). [#31120](https://github.com/sgl-project/sglang/issues/31120)

## 5. Stability & Regressions

Ranked by production impact. Several older GLM / KV-transfer bugs were marked `[inactive]` in this window; treat those as archived unless you are still on the cited nightlies.

**P0 — process death / cluster poison**
- Client disconnect during an active request raises uncaught `asyncio.CancelledError` and **kills the whole engine** (4× RTX 6000D / Blackwell, DeepSeek image). [#39216](https://github.com/sgl-project/sglang/issues/39216)
- sgl-router PD: open circuit breaker still sends work to decode → **permanent fake-dead prefill**. [#31206](https://github.com/sgl-project/sglang/issues/31206)
- `/health` timeout does not cancel the scheduler request → orphan health checks pile up and crash paged-prefill batching. [#35884](https://github.com/sgl-project/sglang/issues/35884)

**P1 — silent wrong answers / wasted compute**
- Quantized DFlash2 draft loads and serves with **~0% acceptance**, no error/warning (acceptance ~3.7 → ~1.0; slower than no drafter). Pair of [#36599](https://github.com/sgl-project/sglang/issues/36599). [#39087](https://github.com/sgl-project/sglang/issues/39087)
- `include_reasoning: false` still emits reasoning on chat + completions. [#39103](https://github.com/sgl-project/sglang/issues/39103) / fix [#39113](https://github.com/sgl-project/sglang/pull/39113)
- SWA branching attaches a **later Mamba checkpoint to an earlier prefix** (high-priority). [#38815](https://github.com/sgl-project/sglang/issues/38815)
- HiCacheFile reports unrestorable hybrid prefixes as hits. [#39147](https://github.com/sgl-project/sglang/issues/39147)
- Grammar token sync creates a **singleton NCCL group under DP attention**. [#35826](https://github.com/sgl-project/sglang/issues/35826)

**P2 — hardware / kernel correctness**
- `is_fa3_supported()` accepts **sm_89** but no cubin ships; `ver` ignored → raw CUDA error on RTX 4080 SUPER. [#38980](https://github.com/sgl-project/sglang/issues/38980)
- DeepSeek-V4.1 Engram profiled SPS table dies in CUDA-graph capture. [#39173](https://github.com/sgl-project/sglang/issues/39173)
- DeepSeek-V4.1 user text containing the image placeholder token is rejected 400. [#39274](https://github.com/sgl-project/sglang/issues/39274)
- Prometheus `avg_request_queue_latency` still not collected (good-first-issue, open since 2025). [#6357](https://github.com/sgl-project/sglang/issues/6357)

**Recently closed / inactive (do not re-open unless you hit them on current main)**
- GLM-5.2 PD `KVTransferError` [#30609](https://github.com/sgl-project/sglang/issues/30609), GLM-5.2 NVFP4+EAGLE illegal access on graph capture [#31093](https://github.com/sgl-project/sglang/issues/31093), GLM-5.1 TP8 EAGLE hang near-full KV [#26399](https://github.com/sgl-project/sglang/issues/26399), LongCat-2.0 second-attn RoPE crash under EP MoE [#31000](https://github.com/sgl-project/sglang/issues/31000), custom all-reduce V2 deadlock across two CUDA streams [#31117](https://github.com/sgl-project/sglang/issues/31117), HiCacheFile flat-dir ENOSPC [#28653](https://github.com/sgl-project/sglang/issues/28653).

## 6. What This Means for Application Developers

1. **Stay on v0.5.19 for production.** V4.1-Flash is preview-only (`dev-dsv41`). Pin the image digest; do not assume nightlies are interchangeable with 0.5.19.
2. **If you serve reasoning models behind an OpenAI-compatible gateway**, do not trust `include_reasoning: false` until [#39113](https://github.com/sgl-project/sglang/pull/39113) lands. Filter `reasoning_content` in the proxy.
3. **Agent / multi-turn / RL clients should send a stable `routing_key`** once [#37543](https://github.com/sgl-project/sglang/pull/37543) is available; without it, DP attention shards the radix cache and prefix-hit rate collapses.
4. **Put a process supervisor in front of the engine.** [#39216](https://github.com/sgl-project/sglang/issues/39216) means a single cancelled HTTP stream can take down the worker. Health checks ([#35884](https://github.com/sgl-project/sglang/issues/35884)) can do the same if the timeout path is used as liveness.
5. **PD + router deployments:** treat an open circuit breaker as unsafe until [#31206](https://github.com/sgl-project/sglang/issues/31206) is fixed; enable the new KV checksum ([#39229](https://github.com/sgl-project/sglang/pull/39229)) in staging before trusting Mooncake handoff on unified pools.
6. **Speculative decoding:** quantized DFlash2 and ROCm EAGLE can fail *quietly*. Log acceptance rate; a drop toward 1.0 means disable the drafter, do not scale replicas.
7. **Multimodal V4.1 clients:** strip or escape the DeepSeek image placeholder token from user text ([#39274](https://github.com/sgl-project/sglang/issues/39274)). Session image-append position bugs are being fixed in [#39145](https://github.com/sgl-project/sglang/pull/39145).
8. **Observability gap:** `avg_request_queue_latency` is still dark ([#6357](https://github.com/sgl-project/sglang/issues/6357)). Measure queueing from the gateway, not from SGLang Prometheus alone.

---

*Next watch items: merge of [#38798](https://github.com/sgl-project/sglang/pull/38798) + FlashMLA [#39171](https://github.com/sgl-project/sglang/pull/39171), unified-memory PD stack [#37506](https://github.com/sgl-project/sglang/pull/37506), and whether v0.5.20 cuts a release around the V4.1 preview rather than leaving it on `dev-dsv41`.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

I'll pull a bit more context from the llama.cpp repo so the digest is accurate and current.# llama.cpp Digest — 2026-09-14

Source: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · latest nightly **[b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948)** (13 Sep 2026) · site: [llama.app](https://llama.app)

## 1. This Week's Highlights

Nightlies moved from **b10934 → b10948** in about a day, mostly hardening rather than a single feature drop: Nemotron-H expert-FFN fallback is guarded against a zero divisor ([#28779](https://github.com/ggml-org/llama.cpp/pull/28779) / [b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947)), Vulkan got a mutex around `vkQueueSubmit` to paper over an NVIDIA multi-queue driver bug ([#28830](https://github.com/ggml-org/llama.cpp/pull/28830) / [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938)), and SYCL memory-query / Level Zero detection was cleaned up ([#28227](https://github.com/ggml-org/llama.cpp/pull/28227) / [b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944)). On the product surface, chat/schema work continues: Qwen3-Coder parser handling of complex types ([#28742](https://github.com/ggml-org/llama.cpp/pull/28742)), plus `common_schema` as an internal IR for JSON schemas ([#28736](https://github.com/ggml-org/llama.cpp/pull/28736)). Large model PRs (Kimi-K3, DeepSeek V4.1) remain open, not merged.

## 2. Releases & Breaking Changes

No semver cut this window. The project still ships **bNNNN nightlies** (assets attached) several times a day; `releases/latest` tracks the newest `b` tag.

| Tag | Date | Headline commit |
|---|---|---|
| [b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948) | 13 Sep | tests: exclude `HY_V4` from WebGPU `test-llama-archs` ([#28855](https://github.com/ggml-org/llama.cpp/pull/28855)) |
| [b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947) | 13 Sep | Nemotron-H expert FFN size fallback guard ([#28779](https://github.com/ggml-org/llama.cpp/pull/28779)) |
| [b10946](https://github.com/ggml-org/llama.cpp/releases/tag/b10946) | 13 Sep | s390x: guard VXE-only CPU repack helpers ([#28775](https://github.com/ggml-org/llama.cpp/pull/28775)) |
| [b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944) | 13 Sep | SYCL `get mem` / Level Zero SDK detect ([#28227](https://github.com/ggml-org/llama.cpp/pull/28227)) |
| [b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) | 13 Sep | smaller FlashAttention unit tests ([#28842](https://github.com/ggml-org/llama.cpp/pull/28842)) |
| [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) | 13 Sep | Vulkan NV `queuesubmit` workaround ([#28830](https://github.com/ggml-org/llama.cpp/pull/28830)) |
| [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) | 13 Sep | OpenCL noshuffle row-align for `q4_K`/`q5_K`/`q8_0` ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)) |
| [b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936) | 13 Sep | Qwen3-Coder complex-type parsing ([#28742](https://github.com/ggml-org/llama.cpp/pull/28742)) |
| [b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935) | 12 Sep | `LOG_JSON` structured logging ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) |
| [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) | 12 Sep | `common_schema` IR + JSON-schema optimizer ([#28736](https://github.com/ggml-org/llama.cpp/pull/28736)) |

**Migration notes:** none announced as API-breaking. Schema work in [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) refactors `json-schema-to-grammar` onto `common_schema` — expect grammar/tool-call edge cases to change behavior, not the HTTP surface. Binary matrices still include CPU / Vulkan / ROCm 10 / OpenVINO / SYCL FP16+FP32 / Android / Windows / s390x; KleidiAI macOS builds remain marked DISABLED on several tags.

## 3. New Model & Hardware Support

**Landed (nightlies):**
- **Nemotron-H / NextN-MTP:** safer expert FFN size when `expert_feed_forward_length` is absent ([#28779](https://github.com/ggml-org/llama.cpp/issues/28779)).
- **Qwen3-Coder** chat parser: better complex / schema types ([#28742](https://github.com/ggml-org/llama.cpp/pull/28742)).
- **OpenCL:** noshuffle row-alignment now applies to `q4_K`, `q5_K`, `q8_0` (not only `q6_K`) ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)).
- **s390x CPU:** VXE-only helpers gated so non-VXE builds do not call them ([#28775](https://github.com/ggml-org/llama.cpp/pull/28775)); CI expansion for `-DGGML_VXE=OFF` in [#28776](https://github.com/ggml-org/llama.cpp/pull/28776).
- **WebGPU:** `HY_V4` excluded from arch tests after CI failures ([#28855](https://github.com/ggml-org/llama.cpp/pull/28855)).
- Vocab/conversion in flight: Fraunhofer `elmod-2.7b-it` pre-tokenizer ([#28845](https://github.com/ggml-org/llama.cpp/pull/28845)), UGM byte-fallback ([#28864](https://github.com/ggml-org/llama.cpp/pull/28864)), MiMo V2 SWA pattern load ([#28865](https://github.com/ggml-org/llama.cpp/pull/28865)), `get_key_or_arr` misuse fixes ([#28868](https://github.com/ggml-org/llama.cpp/pull/28868)).

**Not merged (watchlist):**
- **Kimi-K3** hybrid KDA + MLA + latent MoE + situ + MXFP4 conversion — [#26185](https://github.com/ggml-org/llama.cpp/pull/26185) (closed in the 24h list but still the reference PR; related rollback work [#28466](https://github.com/ggml-org/llama.cpp/pull/28466)).
- **DeepSeek V4.1** (`DeepseekV41ForCausalLM`) converter — [#28696](https://github.com/ggml-org/llama.cpp/pull/28696).
- Disk-streamed MoE routed experts (models larger than RAM) — [#25294](https://github.com/ggml-org/llama.cpp/pull/25294).
- Apple **ANE** backend remains a long-running research item ([#10453](https://github.com/ggml-org/llama.cpp/issues/10453), 44 👍).
- CUDA BF16 fallback for pre-RDNA3 / pre-CDNA AMD (no native BF16 MMA) — [#28846](https://github.com/ggml-org/llama.cpp/pull/28846) (closed).
- ARM NEON/I8MM Q1_0 repack for Bonsai-class models — [#23492](https://github.com/ggml-org/llama.cpp/pull/23492).

## 4. Performance & Optimization

- **Vulkan / NVIDIA:** mutex around concurrent `vkQueueSubmit` on the same device ([#28830](https://github.com/ggml-org/llama.cpp/pull/28830)). Correctness first; expect a small multi-queue serialize cost until the driver is fixed.
- **Grammars:** in-house engine single-lookup + fewer copies claimed **1.2–1.3×** ([#26885](https://github.com/ggml-org/llama.cpp/pull/26885), closed). `llguidance` remains the fast path.
- **CUDA MMVQ:** dynamic `nwarps` for narrow MoE expert matrices — still open ([#20831](https://github.com/ggml-org/llama.cpp/pull/20831)); addresses TG regression from raising `nwarps` to 8 on RDNA3/4.
- **Speculative decode:** respect safe draft caps before block decode ([#26575](https://github.com/ggml-org/llama.cpp/pull/26575)).
- **SYCL graphs:** record/replay port of CUDA graphs ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)).
- **ROCm / RDNA4 (`gfx1201`):** native MMA FlashAttention after rocWMMA removal reported **up to 2× slower prompt processing at depth**; decode unchanged or slightly faster ([#26220](https://github.com/ggml-org/llama.cpp/issues/26220)).
- **RTX 5090 (`sm_120`) / Qwen3.5 hybrid:** TG ~76% of roofline on native Linux with MTP ~1.7×; Windows/Ollama path **1.5–1.6× slower** at every draft depth ([#28196](https://github.com/ggml-org/llama.cpp/issues/28196)).
- **OpenCL** alignment change should reduce misaligned row penalties on `q4_K`/`q5_K`/`q8_0` ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)).
- **FA tests** shrunk to keep CI cheap ([#28842](https://github.com/ggml-org/llama.cpp/pull/28842)).

## 5. Stability & Regressions

Ranked by operational impact.

**High — correctness / silent data loss**
- Speculative decoding (`draft-mtp` / `draft-dspark`): greedy output **diverges from vanilla on quantized targets**; BF16 target matches. N-gram speculation on the same Q target is fine ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)).
- `/slots` save/restore **silently drops prompt reuse** on hybrid/recurrent models — checkpoints never persist ([#25913](https://github.com/ggml-org/llama.cpp/issues/25913)). Related: KV save via `/slots/3?action=save` broken for **vision** models ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466), 38 comments).
- Gemma 4 SWA “forgets” key details ([#25751](https://github.com/ggml-org/llama.cpp/issues/25751)); Gemma 4 load/`Gemma4Assistant` context init failures ([#24343](https://github.com/ggml-org/llama.cpp/issues/24343), 32 👍); scheduler assert `n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS` ([#24132](https://github.com/ggml-org/llama.cpp/issues/24132)).

**High — platform / build**
- ROCm 7.14: VRAM not allocated on `gfx1201` ([#26208](https://github.com/ggml-org/llama.cpp/issues/26208), closed); `libhipblas.so.3` missing ([#25807](https://github.com/ggml-org/llama.cpp/issues/25807)).
- SYCL `GGML_SYCL_DEVICE_ARCH=xe2` segfault ([#25808](https://github.com/ggml-org/llama.cpp/issues/25808), closed).
- Metal: `ggml_metal_synchronize` / `kIOGPUCommandBufferCallbackErrorInnocentVictim` crash on M4 Pro + Tahoe ([#20141](https://github.com/ggml-org/llama.cpp/issues/20141), closed).
- Vulkan + Intel B70: crash on Qwen3.6 MoE ([#23769](https://github.com/ggml-org/llama.cpp/issues/23769)).
- OpenVINO cannot load gemma-4-12B on CPU/GPU/NPU ([#24415](https://github.com/ggml-org/llama.cpp/issues/24415)).
- RPC + AMD: `top_k` sampling hits `GGML_ASSERT(shared_mem <= smpb)` in `argsort.cu` ([#24177](https://github.com/ggml-org/llama.cpp/issues/24177), closed).

**Medium**
- SYCL/xe Battlemage: `-cb` pins GPU at `gt-c0`, no idle power save ([#24946](https://github.com/ggml-org/llama.cpp/issues/24946)).
- ROCm vs Vulkan TG gap on RX 7900 XTX ([#20934](https://github.com/ggml-org/llama.cpp/issues/20934), closed).
- Qwen 3.5 “weird behavior” eval ([#21239](https://github.com/ggml-org/llama.cpp/issues/21239), closed); Qwen3.5 thinking+tools parser when text precedes `<tool_call>` ([#20260](https://github.com/ggml-org/llama.cpp/issues/20260), closed).
- llama-ui reasoning-level menu broken on desktop ([#27981](https://github.com/ggml-org/llama.cpp/issues/27981)).
- Server preset names changed / some presets ignored ([#25150](https://github.com/ggml-org/llama.cpp/issues/25150)).

Many of the closed items were tagged stale/unconfirmed — treat “CLOSED” as *not reproduced lately*, not necessarily *fixed in b10948*.

## 6. What This Means for Application Developers

1. **Pin a `b` tag in production.** Head moves multiple times per day. For hybrid MoE + MTP (Nemotron-H, Qwen3.5/3.6, DeepSeek-V4 family) prefer **≥ b10947** for the expert-FFN divisor guard.
2. **Do not trust `/slots` checkpointing** for multimodal, hybrid, or recurrent graphs. Rebuild context or keep the session process-local until [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) / [#19466](https://github.com/ggml-org/llama.cpp/issues/19466) land. Disk offload (`--cache-disk`, [#20697](https://github.com/ggml-org/llama.cpp/issues/20697), 49 👍) is still a request, not a feature.
3. **Speculative decoding + quantized targets is unsafe under greedy.** If you need bit-stable agent traces, disable draft-mtp/dspark or run BF16 targets ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)).
4. **Responses API is usable but incomplete.** `/v1/responses` exists and is documented on [llama.app](https://llama.app/docs/api); full OpenAI parity (tools, images in `function_call_output`) is still being filled — see [#19138](https://github.com/ggml-org/llama.cpp/issues/19138) and open [#28847](https://github.com/ggml-org/llama.cpp/pull/28847) (`input_image` in tool outputs). Codex-style clients that return images from tools will fail until that merges.
5. **Structured output is being rewritten under you.** `common_schema` + Qwen3-Coder parser work will change grammar compilation. Re-test tool-calling fixtures after upgrading past b10934–b10936. `LOG_JSON` ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) is the hook to pipe structured events into your gateway.
6. **Backend pick still matters more than model pick.** RDNA4 FA PP regression, 5090 Windows TG gap, ROCm 7.14 library/VRAM issues, and Intel B70 Vulkan/SYCL idle bugs are all live. If you ship multi-backend images, keep a Vulkan fallback next to ROCm and do not assume SYCL graph replay ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)) is production-ready.
7. **Server topology requests that keep coming back:** cache listing/deletion ([#16393](https://github.com/ggml-org/llama.cpp/issues/16393)), router-mode multi-preset on one load ([#23704](https://github.com/ggml-org/llama.cpp/issues/23704)), independent `-ns` vs `-np` ([#22921](https://github.com/ggml-org/llama.cpp/issues/22921)), missing backend ops ([#14909](https://github.com/ggml-org/llama.cpp/issues/14909)). Plan around current limits rather than waiting on them this sprint.
8. **Giant-model path is conversion-first.** Kimi-K3 / DeepSeek V4.1 are not drop-in nightlies yet; if you need them, track the conversion PRs and MXFP4/MoE streaming work rather than expecting `llama-cli -hf …` tomorrow.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

I'll pull current Ollama release and issue context so the digest matches today's GitHub state.# Ollama Digest — 2026-09-14

Source: [github.com/ollama/ollama](https://github.com/ollama/ollama). Window: issues and PRs updated in the last ~24h. Current stable: **v0.34.0** (2026-09-09). No new release in the last 24 hours.

## 1. This Week's Highlights

Agent and tool-calling correctness is the main theme, not a new binary. Multiple reports target Qwen3.8 / Qwen3-Coder parsers, Gemma 4 multimodal loading, cloud JSON/`format` schemas, and the OpenAI-compatible Responses path (web_search + Codex follow-ups). Maintainers are already landing companion PRs: preserve the last user message on context overflow ([#17894](https://github.com/ollama/ollama/pull/17894)), keep tool numbers outside int64 ([#18422](https://github.com/ollama/ollama/pull/18422)), finish reasoning before client tool calls ([#18413](https://github.com/ollama/ollama/pull/18413)), and delete leftover F16 blobs after `ollama create --quantize` ([#18424](https://github.com/ollama/ollama/pull/18424)).

## 2. Releases & Breaking Changes

No release in the last 24 hours.

**Current line:** [v0.34.0](https://github.com/ollama/ollama/releases/tag/v0.34.0) (stable, 2026-09-09). Highlights from that cut: ChatGPT Desktop integration (macOS app), better structured output on Apple Silicon, OpenAI-compatible client tool search and response compaction. Related notes circulating with 0.34: flash attention for Gemma 4 on compatible GPUs; `/save` fix for safetensors architectures.

**Operational notes (not a version bump):**
- Built-in CLI agent was removed and the old chat UI restored ([#18393](https://github.com/ollama/ollama/pull/18393), closed).
- Some library models (e.g. `qwen3.8:27b`) have undocumented minimum Ollama versions ([#18414](https://github.com/ollama/ollama/issues/18414)).
- Windows uninstall still leaves a user PATH entry in some builds; fix re-opened as [#18409](https://github.com/ollama/ollama/pull/18409).

## 3. New Model & Hardware Support

Nothing merged as a new official library tag in this window. Demand and partial work:

| Item | Status | Link |
|---|---|---|
| SARVAM-30b / 105b | Request | [#14319](https://github.com/ollama/ollama/issues/14319) |
| Gnani Evon-v3.3 30B-A3B | Request | [#18427](https://github.com/ollama/ollama/issues/18427) |
| Tencent Hy4 preview | Closed request | [#18287](https://github.com/ollama/ollama/issues/18287) |
| IQ3_S on `Qwen3.8-27B-GSQ-RCO-GGUF` | Empty `content` after `done` | [#18297](https://github.com/ollama/ollama/issues/18297) |
| Gemma 4 unified vision (GGUF metadata / mmproj) | Open PR | [#16879](https://github.com/ollama/ollama/pull/16879) |
| Windows image generation (MLX patches) | Closed PR | [#13806](https://github.com/ollama/ollama/pull/13806) |
| Jetson Orin Nano 8GB + Gemma 4 E4B mmproj | Host OOM | [#18396](https://github.com/ollama/ollama/issues/18396) |
| Linux hybrid iGPU + RTX 4080 | `llama-server` SIGABRT on device load | [#18412](https://github.com/ollama/ollama/issues/18412) |
| Integrated Vulkan (Virtio-GPU/Venus) | Direct I/O, matching CUDA/ROCm | [#18124](https://github.com/ollama/ollama/pull/18124) (closed) |

## 4. Performance & Optimization

- **Prompt cache misses on identical tool requests.** Extra tool-schema keys for `qwen3-coder` render in random order, so two identical `/api/chat` or `/v1/chat/completions` calls miss prefix cache ([#18430](https://github.com/ollama/ollama/issues/18430)).
- **Quantize disk leak.** `ollama create --quantize` from safetensors leaves an unreferenced F16 blob (~50 GB per 26B import). One reporter hit 830 GB of orphans vs 188 GB listed. Cleanup PR: [#18424](https://github.com/ollama/ollama/pull/18424); related import-digest work: [#18407](https://github.com/ollama/ollama/pull/18407), report [#18416](https://github.com/ollama/ollama/issues/18416).
- **Thinking budget.** `think` is still on/off only; models that loop in the reasoning block consume the full window and return empty text. Token-budget proposal: [#17566](https://github.com/ollama/ollama/pull/17566).
- **Vulkan iGPU load timeouts** after the llama.cpp bump were addressed by using direct I/O, same as CUDA/ROCm ([#18124](https://github.com/ollama/ollama/pull/18124)).
- **v0.34.0 (prior cut):** structured-output improvements on Apple Silicon; Gemma 4 flash attention on compatible GPUs.

No new tokens/s or TTFT numbers in this 24h set.

## 5. Stability & Regressions

Ranked by operational impact. Fix PRs noted where they exist.

**High**
- **Qwen3.8 tool loops → HTTP 500 `no user query found in messages`.** Context truncation drops the last user turn. [#17778](https://github.com/ollama/ollama/issues/17778) · fix [#17894](https://github.com/ollama/ollama/pull/17894).
- **`kimi-k3:cloud` HTTP 500 on image content in tool-role messages** (kimi-k2.6 and glm-5.3-flash work). [#18426](https://github.com/ollama/ollama/issues/18426).
- **Linux hybrid graphics SIGABRT** during backend/device load. [#18412](https://github.com/ollama/ollama/issues/18412).
- **Jetson 8GB OOM** loading Gemma 4 E4B multimodal projector. [#18396](https://github.com/ollama/ollama/issues/18396).
- **Cloud / structured JSON ignored** on `qwen3-coder:480b-cloud`; local 30b follows schema. [#12362](https://github.com/ollama/ollama/issues/12362).
- **Responses + `web_search`:** function_call emitted before reasoning completes; shared `output_index` breaks Codex replay. [#18411](https://github.com/ollama/ollama/issues/18411) · fix [#18413](https://github.com/ollama/ollama/pull/18413).
- **`/api/codex/v1/responses`:** `previous_response_id` + `function_call_output` returns 200 with empty `output_text` and zero tokens. [#18419](https://github.com/ollama/ollama/issues/18419).

**Medium**
- Gemma 4 / vision: images not processed on Windows ([#16532](https://github.com/ollama/ollama/issues/16532)); EXIF orientation ignored so models “see” rotated frames ([#18418](https://github.com/ollama/ollama/issues/18418)); unified Gemma4 vision PR still open ([#16879](https://github.com/ollama/ollama/pull/16879)).
- `gemma3:12b` `format` truncates on double-quoted source terms ([#18094](https://github.com/ollama/ollama/issues/18094)).
- Qwen3.6 tool-call template drift → qwen3.5 parser 500 ([#16383](https://github.com/ollama/ollama/issues/16383)).
- Qwen3-Coder parser clamps `number` args outside int64 (e.g. `1e20` → `9223372036854775807` on macOS/ARM64). [#18421](https://github.com/ollama/ollama/issues/18421) · [#18422](https://github.com/ollama/ollama/pull/18422).
- IQ3_S Qwen3.8 GGUF returns empty content ([#18297](https://github.com/ollama/ollama/issues/18297)).
- Coding-agent trio on Gemma 4 / Qwen: repetition guard, truncated tool calls, dropped tool call on a missing brace ([#17562](https://github.com/ollama/ollama/issues/17562)).
- TOC-style input with many ellipses → `cancel task` ([#18387](https://github.com/ollama/ollama/issues/18387)).
- Zero embeddings still returned as HTTP 200; validation PR [#18406](https://github.com/ollama/ollama/pull/18406).
- Chat UI hides failed/incomplete streams; surface errors [#18408](https://github.com/ollama/ollama/pull/18408).

**Lower / compliance / UX**
- Release artifacts still omit third-party copyright notices (llama.cpp MIT). Long-running [#3185](https://github.com/ollama/ollama/issues/3185) (275 👍, 58 comments).
- Windows 10 desktop 0.34.0 flashes a PowerShell window on launch ([#18415](https://github.com/ollama/ollama/issues/18415)).
- Community integration PRs only: Genie, Clips Kitty, SlopShield, AI Arena Lite ([#18428](https://github.com/ollama/ollama/pull/18428), [#18423](https://github.com/ollama/ollama/pull/18423), [#18420](https://github.com/ollama/ollama/pull/18420), [#18410](https://github.com/ollama/ollama/pull/18410)). Docker SBX agent request: [#18425](https://github.com/ollama/ollama/issues/18425).

## 6. What This Means for Application Developers

- **Pin runtime + model together.** Cloud and local tags with the same family name do not share schema or multimodal behavior (`qwen3-coder:30b` vs `480b-cloud`; kimi-k3 vs k2.6). Treat cloud as a separate compatibility matrix.
- **Do not trust tool parsers on Qwen 3.5/3.6/3.8 and Qwen3-Coder** until [#17894](https://github.com/ollama/ollama/pull/17894) and [#18422](https://github.com/ollama/ollama/pull/18422) land in a release. Normalize numeric tool args yourself; keep the latest user turn short enough that truncation cannot drop it; retry 500s that mention “no user query”.
- **Canonicalize tool JSON** (sorted keys, no extra schema fields) before send if you care about prompt cache on `qwen3-coder` ([#18430](https://github.com/ollama/ollama/issues/18430)).
- **Responses / Codex / web_search users:** expect item-order bugs on 0.34.0. Prefer `/api/chat` until [#18413](https://github.com/ollama/ollama/pull/18413) ships; do not use `previous_response_id` follow-ups as a source of truth ([#18419](https://github.com/ollama/ollama/issues/18419)).
- **Structured output (`format`)** still fails on quoted source text and on some cloud models. Validate JSON client-side; do not assume `done_reason: stop` means a complete object.
- **Multimodal Gemma 4** is unfinished on Windows, Jetson 8GB, and EXIF-rotated images. Pre-orient images and prefer CPU projector or non-mmproj tags on small unified-memory boards.
- **Import hygiene:** after `ollama create --quantize`, inspect `~/.ollama/models/blobs` for unreferenced F16 files until [#18424](https://github.com/ollama/ollama/pull/18424) is released. `ollama rm` will not reclaim them.
- **Embeddings:** check for all-zero vectors even on HTTP 200 until [#18406](https://github.com/ollama/ollama/pull/18406) merges.
- **Compliance:** binary redistributors still need to attach llama.cpp and other notices themselves ([#3185](https://github.com/ollama/ollama/issues/3185)).

Watch list for the next cut after 0.34.0: [#17894](https://github.com/ollama/ollama/pull/17894), [#18422](https://github.com/ollama/ollama/pull/18422), [#18413](https://github.com/ollama/ollama/pull/18413), [#18424](https://github.com/ollama/ollama/pull/18424), [#16879](https://github.com/ollama/ollama/pull/16879), [#18406](https://github.com/ollama/ollama/pull/18406).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

I'll pull the latest LiteLLM release notes, issues, and PRs so the digest is accurate rather than relying only on the truncated summaries.The 1.102 pre-release changelog is truncated; I'll pull the full notes and the highest-severity issues next.# LiteLLM Digest — 2026-09-14

Repo: [BerriAI/litellm](https://github.com/BerriAI/litellm)

## 1. This Week's Highlights

Stable remains **v1.100.1** (10 Sep). The 1.102 line moved to **v1.102.0-rc.1** (13 Sep) after two dev cuts, with a large OCR-adapter wave, Redis/auth spend-path performance work, and MCP/guardrail hardening. The last 24 hours of issues and PRs concentrate on **Responses-API translation correctness** (`chatgpt/` / `gpt-5.6-sol` empty `output[]`), **embedding cache index bugs**, and **Anthropic `/v1/messages` guardrails missing MCP tools**.

## 2. Releases & Breaking Changes

| Tag | Channel | When | Notes |
|---|---|---|---|
| [v1.102.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1) | pre-release | 13 Sep | Compare `v1.102.0-dev.2...v1.102.0-rc.1`. Cosign-signed GHCR images. No explicit breaking-change banner. |
| [v1.102.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2) / [v1.102.0-dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1) | dev | 13 Sep window | Same cosign verify block as rc.1. |
| [v1.101.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2) | pre-release | 13 Sep window | 1.101 still on the rc track; not current stable. |
| [v1.100.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.1) | **stable** | 10 Sep | Patch on `stable/1.100.x`. |

**v1.100.1 contents** ([#40176](https://github.com/BerriAI/litellm/pull/40176), [#40455](https://github.com/BerriAI/litellm/pull/40455), [#40495](https://github.com/BerriAI/litellm/pull/40495)):

- Backport of spend-tracking joinability after the v1.99 provenance gate, then **reverted** the spend-attribution backports from this stable line.
- Router fix: retry breadcrumbs no longer retain every earlier request (memory/correctness leak on retries).

**Config / ops notes from the 1.102 track (not yet stable):**

- In-memory management cache capacity is now configurable — [PR #40725](https://github.com/BerriAI/litellm/pull/40725).
- Operators on older proxies still have a hard-coded **30s** deployment/credential DB reload in `proxy_server.py`; [Issue #40972](https://github.com/BerriAI/litellm/issues/40972) asks for a tunable interval when DB queries exceed that window.
- Docker images for every listed tag are signed with the same cosign key from commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Verify with the pinned public key, not a floating tag.

No new documented API-breaking change in the last 24 hours. The MCP-toolset-enforcement break from **v1.100.0** (6 Sep) is already on stable if you jumped from ≤1.99.

## 3. New Model & Hardware Support

Not a CUDA/ROCm/Metal release. Changes are provider maps, OCR backends, and cost-map completeness.

**Landed or landing on the 1.102 line**

- **OCR adapters** (Azure Mistral + native auth, Azure Document Intelligence, Vertex Mistral, Vertex DeepSeek; Reducto legacy + v3). Legacy OCR pipeline removed with the Vertex DeepSeek adapter — [PRs #40502](https://github.com/BerriAI/litellm/pull/40502), [#40507](https://github.com/BerriAI/litellm/pull/40507), [#40509](https://github.com/BerriAI/litellm/pull/40509), [#40533](https://github.com/BerriAI/litellm/pull/40533), [#40534](https://github.com/BerriAI/litellm/pull/40534), [#40535](https://github.com/BerriAI/litellm/pull/40535).
- **DeepSeek V4.1 Flash on Fireworks** in the cost map — [PR #40812](https://github.com/BerriAI/litellm/pull/40812).
- **OpenAI reasoning-family fallback generalization** in the registry — [PR #40902](https://github.com/BerriAI/litellm/pull/40902).
- **Meta Muse Voice** transcription support (rc.1 theme list).
- **Conduct Guard** guardrail integration — [PR #40785](https://github.com/BerriAI/litellm/pull/40785).
- Customer-managed KMS keys for virtual keys in AWS Secrets Manager — [PR #40475](https://github.com/BerriAI/litellm/pull/40475).

**In progress (issues/PRs updated in the last 24h)**

- `inception/mercury-2.5` needs full cost-map + prompt-caching flags (`cache_read_input_token_cost`, `supports_prompt_caching`) — [Issue #40746](https://github.com/BerriAI/litellm/issues/40746), [PR #41016](https://github.com/BerriAI/litellm/pull/41016). Provider list price is $0.20 / $0.75 per 1M (launch promo $0.04 / $0.15; cache read $0.02 / promo $0.004); 260K context.
- Versioned Vertex Claude IDs silently defaulted to 4096 `max_tokens`; [PR #41015](https://github.com/BerriAI/litellm/pull/41015) (closed) rebases the map fix (8192 → 64k-class values from earlier PRs).
- ChatGPT-subscription provider `chatgpt/` + model id `gpt-5.6-sol` is live against `chatgpt.com/backend-api/codex/responses` but the Responses bridge is still mishandling the terminal event (see Stability).

## 4. Performance & Optimization

Concrete work on the 1.102 track (rc.1 / adjacent PRs):

- **Auth hot path:** one MGET + one DB query + one pipeline for user, team, membership, org, project, and spend counters — [PR #40834](https://github.com/BerriAI/litellm/pull/40834).
- **Post-call spend:** one MGET + one pipeline; no team/user/org refetch on the response path — [PR #40841](https://github.com/BerriAI/litellm/pull/40841).
- **Startup:** lazy-load provider passthrough routes; register liveness + core inference routes first — [PRs #40691](https://github.com/BerriAI/litellm/pull/40691), [#40687](https://github.com/BerriAI/litellm/pull/40687).
- **Redis:** keep an open circuit breaker open and quiet on sync read and spend-counter paths (stops retry storms after Redis is already known-down) — [PR #40624](https://github.com/BerriAI/litellm/pull/40624).
- **Policy engine:** single-pass attachment dedup after sort — [PR #40883](https://github.com/BerriAI/litellm/pull/40883).
- **Token accounting:** Rust path for tiktoken `cl100k_base` admission tokens — [PR #40777](https://github.com/BerriAI/litellm/pull/40777).
- **Bedrock passthrough:** incremental stream spend instead of buffering the full response — [PR #40724](https://github.com/BerriAI/litellm/pull/40724).

No published req/s or p99 numbers in these notes. Operator-visible pressure point: the 30s credential/deployment reload loop ([#40972](https://github.com/BerriAI/litellm/issues/40972)) on busy Postgres.

## 5. Stability & Regressions

Ranked by blast radius for production gateways. Most items updated 2026-09-13.

### P1 — correctness / security policy bypass

1. **Guardrails cannot see MCP tools on Anthropic `/v1/messages`**  
   `custom_code` and `tool_permission` in `pre_call` ignore tools that are not Chat Completions-shaped. Deny rules never fire for `/v1/messages` or `/v1/responses`.  
   [Issue #40583](https://github.com/BerriAI/litellm/issues/40583) (open, 5 comments).  
   Fix PR: [**#41011**](https://github.com/BerriAI/litellm/pull/41011) — shared Anthropic tool-name reader in pre_call.

2. **`chatgpt/` `gpt-5.6-sol`: `response.completed` has empty `output[]`**  
   Streamed content is fine; the terminal event is empty, so the Responses→completion bridge raises `Unknown items in responses API response: []`.  
   [Issue #41009](https://github.com/BerriAI/litellm/issues/41009) (open), duplicate/close twin [#41017](https://github.com/BerriAI/litellm/issues/41017).  
   Fix PRs: [**#41014**](https://github.com/BerriAI/litellm/pull/41014) (rebuild `output[]` from `output_item.done`), long-running [**#31332**](https://github.com/BerriAI/litellm/pull/31332).

3. **Internal LiteLLM params leak into provider bodies**  
   GPT-5.4 chat + function tools 400s with `Unknown parameter: 'model_alias_map'`.  
   Backport PR: [**#41018**](https://github.com/BerriAI/litellm/pull/41018) (`all_litellm_params` registration). Related: [PR #38266](https://github.com/BerriAI/litellm/pull/38266) (`ssl_verify` was also leaking into `extra_body`).

4. **SSRF controls missing from custom-code HTTP primitives** after RestrictedPython migration.  
   [PR #36983](https://github.com/BerriAI/litellm/pull/36983) restores `_validate_url_for_ssrf()` + `follow_redirects=False`. Treat as open until merged to the line you run.

### P2 — billing / cache / index correctness

5. **`/v1/embeddings` duplicate `index` when a batch mixes cached and uncached inputs** — HTTP 200, right vector count, wrong indices. OpenAI-compatible clients that key on `data[i].index` will attach embeddings to the wrong input.  
   [Issue #41002](https://github.com/BerriAI/litellm/issues/41002).

6. **`cache_params.supported_call_types` does not disable embedding cache** — removing `embedding` / `aembedding` is accepted and ignored.  
   [Issue #41003](https://github.com/BerriAI/litellm/issues/41003).

7. **Valkey semantic cache** forwards `**kwargs` instead of `metadata` on two `_get_async_embedding()` calls.  
   [Issue #32324](https://github.com/BerriAI/litellm/issues/32324) (related #31610).

8. **Vertex rerank billing / id reuse** — `search_units` billed from a truncated response; hardcoded response id collapsed spend logs.  
   [PR #35180](https://github.com/BerriAI/litellm/pull/35180).

9. **Virtual key RPM above team RPM is accepted silently** and can never take effect (most-restrictive-wins).  
   [Issue #40866](https://github.com/BerriAI/litellm/issues/40866).

10. **Spend log `session_id` ignores caller `litellm_session_id`.**  
    [PR #40856](https://github.com/BerriAI/litellm/pull/40856) (fixes #40851).

### P3 — provider / install / observability

11. **Ollama custom prompt template** omitting `initial_prompt_value` / `final_prompt_value` → `KeyError` on every request.  
    [Issue #39759](https://github.com/BerriAI/litellm/issues/39759).

12. **Self-hosted install fails on `prisma generate`** (`schema.prisma`). Stale but still open; 7 comments, 4 👍.  
    [Issue #26097](https://github.com/BerriAI/litellm/issues/26097). Related guard: [PR #35458](https://github.com/BerriAI/litellm/pull/35458) (optional prisma import in DB exception classifiers).

13. **Unknown-key 401 leaked table name + full SHA-256 of the submitted key.**  
    [PR #39787](https://github.com/BerriAI/litellm/pull/39787) — generic `"Invalid API key provided."`

14. **User-Agent tag extraction is case-sensitive** in `_get_user_agent_tags`.  
    [Issue #40979](https://github.com/BerriAI/litellm/issues/40979).

15. **MCP gateway:** `x-litellm-tags` ignored on `tools/list` and `tools/call` ([PR #35777](https://github.com/BerriAI/litellm/pull/35777)); mid-stream MCP `/v1/responses` `AttributeError` hides the real error and blocks fallbacks ([PR #35425](https://github.com/BerriAI/litellm/pull/35425)); protocol-level JSON-RPC rejections missing from standard logging ([PR #31572](https://github.com/BerriAI/litellm/pull/31572)).

16. **Responses API forwards unsupported `reasoning.effort`** without the GPT-5 capability checks used by chat completions.  
    [PR #38897](https://github.com/BerriAI/litellm/pull/38897) (fixes #38530).

17. **Generic guardrail API drops rewritten `tool_calls`**, so Responses warns “no tool calls”.  
    [PR #41013](https://github.com/BerriAI/litellm/pull/41013).

18. **Requested kill switch** `LITELLM_DISABLE_RESPONSES_WEBSOCKET=true` for `/v1/responses` and `/responses` WS.  
    [Issue #40591](https://github.com/BerriAI/litellm/issues/40591).

19. **asqav audit-log callback** (merged PR #30238, 23 Jun) never reached a release.  
    [Issue #38383](https://github.com/BerriAI/litellm/issues/38383).

CI on `litellm_internal_staging` was also red (Postgres auth-prefetch vs 5s in-memory TTL, TQ003 lint, UI types) — [PR #41019](https://github.com/BerriAI/litellm/pull/41019).

## 6. What This Means for Application Developers

**Stay on v1.100.1 for production** unless you need 1.102 OCR adapters or the auth/spend MGET work. Pin `ghcr.io/berriai/litellm:v1.100.1` or `pip install 'litellm[proxy]==1.100.1'` and verify the cosign signature. Do not track `main-stable`; that tag is retired.

**If you front Claude Code / Anthropic `/v1/messages` or MCP tools through LiteLLM guardrails**, assume `tool_permission` is not enforcing until #41011 is on your image. Use a network or MCP-gateway allowlist as a second control.

**If you call `chatgpt/gpt-5.6-sol` (or any Responses provider that emits empty terminal `output[]`) via `litellm.completion()`**, expect a hard exception after a successful stream. Prefer raw `/v1/responses` streaming, or wait for #41014 / #31332. Same class of bug: mid-stream MCP errors can raise `AttributeError` and skip fallbacks (#35425).

**Embedding clients:** do not trust `data[i].index` on mixed cache-hit batches (#41002), and do not trust `supported_call_types` to turn embedding cache off (#41003). Split cached vs uncached inputs, or disable the embedding cache at the cache backend until those land.

**Agent / tool apps:** strip assumptions that LiteLLM-only keys (`model_alias_map`, `ssl_verify`, session ids) never leave the proxy. #41018 and #38266 exist because they did. On the way out, set `x-litellm-tags` only if your MCP path actually honors it (it does not on gateway `tools/*` until #35777).

**Cost and routing:** Mercury 2.5 cached-input tokens will be mis-billed until #41016 merges. Vertex rerank spend logs can collapse to a single id (#35180). Auto-router savings headers and Claude Code / Codex gateway-key CLI setup are in rc.1 ([#40792](https://github.com/BerriAI/litellm/pull/40792), [#40829](https://github.com/BerriAI/litellm/pull/40829), [#40330](https://github.com/BerriAI/litellm/pull/40330)) if you are evaluating the pre-release.

**Operators:** watch Redis circuit-breaker behavior after #40624, raise the management-cache cap if key cardinality is high (#40725), and treat the 30s DB reload as a known load generator (#40972). Self-hosted Prisma generate (#26097) is still a cold-start footgun.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-14

Source: [unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. This Week's Highlights

Unsloth shipped **v0.1.807-beta** and **v0.1.808-beta**, a large performance-and-reliability drop: AMD inference now defaults to **Vulkan** (~20% vs ROCm), diffusion is **1.2–1.7×** faster, Windows binaries are signed to cut SAC/AV false positives, and the team claims **250+ fixes** plus **~60% smaller** Python/package binaries.

Studio work is the other center of gravity: multi-resident GGUF processes, MCP image attachments, OpenAI-shaped `video_url` / MLX video, stop-text on transformers backends, HF-token isolation for API keys, and faster `studio update` (skip unchanged dependency steps, offline-safe installs). Apple Silicon remains the longest-running open request ([#4](https://github.com/unslothai/unsloth/issues/4), 644 👍) even as MLX training/KV-cache work landed in the beta notes.

## 2. Releases & Breaking Changes

| Version | Date | Notes |
|---|---|---|
| [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta) | 2026-09-09 | Latest. Diffusion 1.2–1.7×; Vulkan AMD default; signed Windows `llama-server.exe`; PyTorch **2.11** default (2.14 coming); new Docker images; Codex default **gpt-6-astra**. |
| [v0.1.807-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta) | 2026-09-08 | Same family: Vulkan-by-default on AMD; AMD Strix/iGPU gibberish reported upstream; Windows signing to reduce SAC false positives. |

**Migration / ops notes**

- Installers now pin **PyTorch 2.11**; Windows reinstalls keep a supported torch rather than silently upgrading. Extra tags: `cu126` / `cu128` / `cu130` + `torch2110` + xformers 0.0.35 ([#6955](https://github.com/unslothai/unsloth/pull/6955), [#7256](https://github.com/unslothai/unsloth/pull/7256)).
- Official images: [hub.docker.com/r/unsloth/unsloth](https://hub.docker.com/r/unsloth/unsloth) (NVIDIA Turing→Blackwell; native amd64/arm64). ARM64 **CPU-only** image is still a PR ([#10766](https://github.com/unslothai/unsloth/pull/10766)).
- Wheel-only PyPI publish (no sdist) ([#10202](https://github.com/unslothai/unsloth/pull/10202)); package size cut ~60%.
- Codex / OpenAI path: default login model **gpt-6-astra**; better `/v1` streaming and audio input. Responses-API Codex + local llama.cpp docs were reported stale ([#5141](https://github.com/unslothai/unsloth/issues/5141), closed).
- Not a hard API break, but behavior change: AMD hosts that previously sat on ROCm (or fell through to CPU) now take Vulkan unless you pin ROCm.

## 3. New Model & Hardware Support

**Backends / silicon**

- **AMD**: Vulkan default for Strix Halo / Strix Point and Linux iGPUs without ROCm; claimed **20%** prefill+decode vs ROCm; Strix Halo **+23% prompt / +8% gen**; BIOS iGPU VRAM popup → up to **3×** if more VRAM is assigned. Historical OOM-on-unified-memory ([#6834](https://github.com/unslothai/unsloth/issues/6834)) and “installer says AMD, runtime is CPU” ([#8473](https://github.com/unslothai/unsloth/issues/8473)) are closed.
- **Windows**: signed `llama-server.exe`; clearer code-integrity errors when model load is blocked.
- **Apple / MLX**: DoRA + more DPO losses; batched generation streams per chat; quantized MLX KV cache **−74%** prompt memory; gated-delta training **up to 25%** faster; self-heal/update no longer tanks inf+train. Full Apple Silicon training path is still “on roadmap” ([#4](https://github.com/unslothai/unsloth/issues/4)).
- **Intel Arc B580**: import crash on `torch.xpu.memory.mem_get_info()` ([#3533](https://github.com/unslothai/unsloth/issues/3533)) closed.
- **Docker**: NVIDIA images Turing→Blackwell; ARM64 GPU images exist; CPU-only ARM64 proposed ([#10766](https://github.com/unslothai/unsloth/pull/10766)).

**Models / modalities (Studio + core)**

- Hermes detection; Blender MCP; multimodal fine-tune from text-only datasets (MLX).
- Open PRs: MLX video clips ([#10480](https://github.com/unslothai/unsloth/pull/10480)), OpenAI `video_url` parts on `/v1/chat/completions` ([#10439](https://github.com/unslothai/unsloth/pull/10439)), MCP approved image attachments ([#10871](https://github.com/unslothai/unsloth/pull/10871)).
- Q-GaLore options passed to bitsandbytes **by name** (fixes frozen projected params on bnb 0.50.2) ([#10874](https://github.com/unslothai/unsloth/pull/10874)).
- Still noisy in issues: Qwen3-Coder-Next-Base QLoRA OOM on 2×A100 ([#4040](https://github.com/unslothai/unsloth/issues/4040), closed/fixing), Nemotron attention ([#7527](https://github.com/unslothai/unsloth/issues/7527), open), Qwen3.8 GGUF long-chat prefill after reload ([#9037](https://github.com/unslothai/unsloth/issues/9037)).

## 4. Performance & Optimization

Concrete numbers from [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta):

- Diffusion INT8/FP8: **1.2–1.7×**
- AMD vs ROCm (Vulkan): **~20%**
- Strix Halo: **+23%** prompt processing, **+8%** generation
- Apple gated-delta train: **up to +25%**
- Quantized MLX KV: **up to −74%** prompt memory
- `studio update`: advertised **~2×**; skip-if-evidence-holds dependency pass ([#10649](https://github.com/unslothai/unsloth/pull/10649)); skip re-validating llama.cpp / whisper.cpp / Node when markers match ([#10648](https://github.com/unslothai/unsloth/pull/10648)); keep verified install when PyPI is down + `UV_OFFLINE` ([#10651](https://github.com/unslothai/unsloth/pull/10651))
- Package/binaries: **~60%** smaller
- Diffusion host-RAM leak on offload fixed ([#10184](https://github.com/unslothai/unsloth/pull/10184))

**In flight (perf / serving)**

- Multiple resident GGUF models, each with its own `llama-server` ([#10876](https://github.com/unslothai/unsloth/pull/10876))
- `--tensor-split` ignored ([#10355](https://github.com/unslothai/unsloth/issues/10355), open)
- Compaction / rolling context already previewed earlier; request closed ([#7472](https://github.com/unslothai/unsloth/issues/7472))
- Multi-GPU fine-tune still a long-standing request ([#1707](https://github.com/unslothai/unsloth/issues/1707), closed historically; official DDP still “preliminary” in older notes)

## 5. Stability & Regressions

Ranked by operational impact. Many older bugs were closed in the 807/808 sweep; several Studio serving bugs remain open.

**High**

- AMD unified-memory / CPU-fallback class bugs closed in this release family ([#6834](https://github.com/unslothai/unsloth/issues/6834), [#8473](https://github.com/unslothai/unsloth/issues/8473), [#5807](https://github.com/unslothai/unsloth/issues/5807)). Re-test Vulkan path; gibberish on Strix/iGPU was reported to AMD.
- Qwen3-Coder-Next-Base **OOM on 2×A100 QLoRA** ([#4040](https://github.com/unslothai/unsloth/issues/4040)) — closed as “currently fixing”; do not assume multi-GPU QLoRA is safe on 80B-class MoE.
- Studio: system RAM not released after full-VRAM GGUF load even with “don’t reserve system RAM” ([#9033](https://github.com/unslothai/unsloth/issues/9033), open).
- Studio + vLLM: `min_p` / `logit_bias` rejected on Desktop 0.1.807-beta ([#10573](https://github.com/unslothai/unsloth/issues/10573), open).

**Medium**

- Long GGUF chats lose reusable prompt state after reload → **~11 min full prefill** ([#9037](https://github.com/unslothai/unsloth/issues/9037)).
- Tool-approval wait holds a serving slot and blocks queued chats ([#10671](https://github.com/unslothai/unsloth/issues/10671)).
- `--tensor-split` ignored ([#10355](https://github.com/unslothai/unsloth/issues/10355)).
- Nemotron attention handling ([#7527](https://github.com/unslothai/unsloth/issues/7527)).
- API key can inherit the **server’s Hugging Face login** for private models — fix PR open ([#10809](https://github.com/unslothai/unsloth/pull/10809)). Treat as a tenancy bug if you expose Studio behind shared API keys.
- Transformers backends ignored `stop` sequences — fix PR ([#10812](https://github.com/unslothai/unsloth/pull/10812)).
- Agent skipped a command after editing a file (duplicate-call cache) — fix PR ([#10810](https://github.com/unslothai/unsloth/pull/10810)).
- Multi-turn determinism smoke was flaky on merge base ([#10004](https://github.com/unslothai/unsloth/issues/10004), closed); probe pinned to a deterministic backend ([#10234](https://github.com/unslothai/unsloth/pull/10234)).

**Lower / training correctness (mostly closed this window)**

- `slice_indices` NameError on Qwen2/Kaggle ([#3450](https://github.com/unslothai/unsloth/issues/3450))
- Gemma 3n recursion depth ([#3650](https://github.com/unslothai/unsloth/issues/3650))
- prompt-completion datasets vs TRL ([#3399](https://github.com/unslothai/unsloth/issues/3399))
- `fetch_video` NameError on VLM video ([#3086](https://github.com/unslothai/unsloth/issues/3086))
- All-labels `-100` / ZeroDivision on Phi-3.5/4 ([#2364](https://github.com/unslothai/unsloth/issues/2364), [#2497](https://github.com/unslothai/unsloth/issues/2497))
- Eval loss stuck constant ([#1067](https://github.com/unslothai/unsloth/issues/1067), still open)
- Single-token / binary classification loss → 0 ([#946](https://github.com/unslothai/unsloth/issues/946), open, good first issue)
- GGUF export failures in Studio ([#4845](https://github.com/unslothai/unsloth/issues/4845), closed)
- Desktop SPA 404 on loopback in `api-only` + `tunnel_only` — fix PR ([#10847](https://github.com/unslothai/unsloth/pull/10847))

## 6. What This Means for Application Developers

1. **Upgrade Studio/Desktop to 0.1.808-beta** if you are on AMD or Windows. Vulkan-default and signed binaries change both speed and “why is this on CPU / why did SAC quarantine llama-server” support load. Re-benchmark; do not assume old ROCm flags still apply.
2. **Treat Studio as a multi-backend gateway, not a thin llama.cpp wrapper.** Incoming PRs add resident multi-model routing ([#10876](https://github.com/unslothai/unsloth/pull/10876)), OpenAI `video_url`, MLX video, MCP images, and proper `stop` on transformers. If you speak OpenAI `/v1/chat/completions`, pin a build after those PRs merge or keep a compatibility layer.
3. **Do not share one Studio process across untrusted API keys** until [#10809](https://github.com/unslothai/unsloth/pull/10809) is in a release. Keys can train on the host HF login.
4. **Long-context / agent stacks:** compaction exists as preview, but reload still blows prompt cache ([#9037](https://github.com/unslothai/unsloth/issues/9037)) and tool-approval can stall the whole queue ([#10671](https://github.com/unslothai/unsloth/issues/10671)). Keep an external session store; do not rely on in-process KV reuse across model reloads.
5. **Fine-tune path:** PyTorch 2.11 + smaller wheel is the new baseline. Multi-GPU and 80B-class QLoRA remain sharp edges ([#1707](https://github.com/unslothai/unsloth/issues/1707), [#4040](https://github.com/unslothai/unsloth/issues/4040)). Prefer single-GPU QLoRA or wait for explicit DDP guidance. Q-GaLore users should pull [#10874](https://github.com/unslothai/unsloth/pull/10874) before trusting bnb 0.50.2.
6. **Serving topology:** if you need tensor-parallel GGUF, verify `--tensor-split` yourself ([#10355](https://github.com/unslothai/unsloth/issues/10355)). For vLLM sidecars, expect sampling-param mismatches until [#10573](https://github.com/unslothai/unsloth/issues/10573) lands.
7. **CI / air-gap:** use `UV_OFFLINE` + the skip-if-verified installer PRs ([#10651](https://github.com/unslothai/unsloth/pull/10651), [#10649](https://github.com/unslothai/unsloth/pull/10649)) so `studio update` does not thrash PyPI. New Docker tags are the cleanest path for Turing–Blackwell training boxes.

**Watch next:** merge of multi-resident GGUF, MCP image inputs, and the HF-token isolation PR; confirmation that Vulkan AMD is correct on Strix Halo 128 GB unified memory; any follow-up on Qwen3-Next 80B QLoRA OOM.

</details>