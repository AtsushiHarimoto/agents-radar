# AI 基础设施周报 2026-09-14

> 生成时间: 2026-09-13 22:07 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

先核对各项目近 24 小时的公开标签与动态，再补上缺失的 vLLM 快照并完成全文翻译。# AI Infrastructure 跨项目摘要 — 2026-09-14

窗口：近约 24 小时动态，叠加当前 stable / preview 标签。vLLM 的按 issue 摘要失败；下文发布与模型支持事实取自公开标签（`v0.29.0` / `v0.29.1rc0`），并已标明出处。

## 1. 生态总览

本周是**模型落地周，不是发版周**。DeepSeek-V4.1 / V4.1-Flash、Kimi-K3、Qwen3.8 / Qwen3-Coder、Gemma 4、GLM-5.2、Nemotron-H 是争夺焦点架构；各引擎在拼的是稀疏 MLA、混合 SWA/Mamba、Engram host offload，以及 MTP / speculative decode，而不是切新的 stable。SGLang 是最明确的 V4.1 preview 路径（`dev-dsv41`）；vLLM 已在 `v0.29.0`（9 月 8 日）落地其中若干家族，并推进到 `v0.29.1rc0`；llama.cpp 的 V4.1 与 Kimi-K3 转换 PR 仍未合入。与此同时，**agent / tool-calling 正确性是运维税**：reasoning 标志被忽略、Responses `output[]` 为空、tool parser 丢掉用户轮次、speculative decode 静默接受率崩塌。各栈的生产姿态一致：钉死上一稳定版，把 preview 镜像当不可互换产物，并在 worker 前面加 supervisor。

## 2. 活跃度对比

| Project | Issues (window) | PRs (window) | Latest stable | This-window release | Notes |
|---|---|---|---|---|---|
| **vLLM** | Digest failed | Digest failed | **v0.29.0** (8 Sep) | **v0.29.1rc0** (12 Sep)；nightlies `0.29.1.dev*` | 0.29.0 含 594 commits / 277 authors；MRV2 默认 |
| **SGLang** | **53** updated / 24h | **~500** touched / 24h | **v0.5.19** (4 Sep) | None；nightlies `0.5.20.dev` | V4.1 umbrella 仍被 CI 挡住 |
| **llama.cpp** | Not quantified | Multiple nightlies/day | Rolling **b10948** (13 Sep) | b10934 → b10948，约 1 天 | 无 semver；钉某个 `b` 标签 |
| **Ollama** | High（agent/parser） | Companion fix PRs landing | **v0.34.0** (9 Sep) | 24h 内无发版 | 内置 CLI agent 已移除 |
| **LiteLLM** | High（gateway 正确性） | 1.102 track + hotfixes | **v1.100.1** (10 Sep) | **v1.102.0-rc.1** (13 Sep) | Cosign 签名的 GHCR |
| **Unsloth** | Studio + train bugs | Multi-resident GGUF、MCP images | **v0.1.808-beta** (9 Sep) | 807/808-beta 家族 | AMD 默认走 Vulkan；PyTorch 2.11 |

本窗口最吵的单仓是 SGLang（触及约 500 个 PR）。llama.cpp 的二进制发布最密。LiteLLM 与 Ollama 版本号 bump 更安静，但 API 兼容回归更密。

## 3. 模型支持竞赛

**2026-Q3 争夺家族上，谁领先**

| Architecture | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---|---|---|---|---|---|---|
| **DeepSeek V4.1 / Flash** | 已在 0.29 线（perf + shared-expert MegaMoE） | **Day-0 preview**（`dev-dsv41`）；umbrella [#38798] 仍开着 | Converter **open** [#28696] | Cloud tags 已有；本地不完整 | Fireworks 的 V4.1 Flash 成本图 | 经 llama.cpp/vLLM sidecar 提供服务 |
| **Kimi-K3** | 0.29.0 含 NVFP4 + DSpark/DCP | Tracking / PD issues（PP8 TTFT 下限） | Hybrid KDA+MLA PR **未合入** | `kimi-k3:cloud` image-in-tool 500 | 仅 provider map | 等 conversion 落地后走 GGUF |
| **Qwen3.8 / Qwen3-Coder** | 0.29.0 含 Qwen3.8-Flash-Next + MTP | 稳定版上默认可 serve | Parser + schema IR 已落地（b10934–36） | **Parser/tool bugs 是本周主线** | Registry / reasoning fallback | Next-Base 80B 级 QLoRA OOM |
| **Gemma 4** | 前一线 + SWA 变体 | — | SWA “forget” + load bugs 仍开着 | Unified vision PR 仍开着；Jetson OOM | — | Training/eval 残留问题 |
| **GLM-5.2** | — | ROCm fused DSA indexer；Ascend cookbook 草稿 | — | — | — | — |
| **Nemotron-H / MTP** | 0.29.0 含 Omni Reasoning V3 + MTP | — | Expert-FFN zero-divisor guard（b10947） | — | — | Attention handling 仍开着 |
| **Hy4 / SenseNova / Mercury** | 0.29.0 含 Hy4-preview | SenseNova-U1 tracking | HY_V4 被排除出 WebGPU tests | Hy4 request 已关 | Mercury 2.5 cost-map 进行中 | — |

**评分：** vLLM 在 V4 / K3 / Qwen3.8-Flash / Hy4 的*已合入生产内核*上领先。SGLang 在*公开 V4.1-Flash serving + LMSYS 数字*上领先（但仅 preview）。llama.cpp 被 conversion 卡住。Ollama 被 library/UX 卡住，本周在 tool/schema 保真度上落后。网关（LiteLLM）跟的是 provider map，不是内核。Unsloth 是 train+Studio 层，不是一线前沿模型引擎。

## 4. 性能前沿

优化集中在五处：

1. **稀疏 / 混合 attention kernels** — SGLang：GLM-5.2 DSA 12→4 fused HIP kernels，gfx950 上 MLA q-absorb+RoPE fusion，Triton sparse MLA 的 CUDA-graph-safe workspaces。vLLM 0.29：K3 Mamba metadata 6.6–7.6×，Hopper/SM100 GEMM，MLA gate 并入 QKV-A，MegaMoE shared-expert fuse。llama.cpp：Vulkan queue-submit mutex（正确性税），OpenCL row-align 覆盖更多 quant，RDNA4 FA PP 回归仍在。
2. **KV / PD / unified memory** — SGLang 最大的结构性押注：MHA/MLA/SWA/Mamba + Mooncake 的 unified-pool PD，hybrid-SWA 共享 byte budget，opt-in KV checksum，HiCache rank consensus。vLLM：MRV2 CUDA-graph KV 自动 sizing，DCP 部分 prefix hit。llama.cpp：`/slots` 仍会丢掉 hybrid/vision checkpoint；disk-streamed MoE 仍开着。Unsloth：量化 MLX KV 提示词内存 −74%；Studio 在满 VRAM 加载 GGUF 后不释放 host RAM。
3. **Speculative decode / MTP** — 三大引擎都有。静默失败是主模式：SGLang 量化 DFlash2 接受率约 0%；ROCm EAGLE 忽略 temperature；llama.cpp draft-mtp 在量化 greedy target 上发散；vLLM 有 extract_hidden_states speculation，以及 EAGLE/MTP 前的 DP-sync skip。
4. **MoE / quantization** — DeepGEMM 确定性路径（SGLang，batch-size logprob 不变）；MegaMoE fuse shared+routed；MXFP4 / NVFP4 / FlashInfer routed-MoE。Unsloth：diffusion INT8/FP8 1.2–1.7×；AMD Vulkan 相对 ROCm 约 20%。
5. **网关热路径（不是内核）** — LiteLLM：auth/spend 收成 MGET+pipeline，Redis circuit-breaker quiet-on-open，Rust tiktoken admission，增量 Bedrock stream spend。Ollama：tool-schema key 未排序导致 prefix-cache miss；`create --quantize` 后 F16 blob 泄漏。

本周值得收藏的公开数字：SGLang LMSYS V4.1 **8×H200 上 prefill +1.56×**，**4×GB300 上 +1.37×**，Engram **KV 容量 +36%**；Unsloth Strix Halo 在 Vulkan 上 **PP +23% / gen +8%**。

## 5. 层级定位

```
Training / LoRA     Unsloth (Studio + kernels + GGUF export)
        ↓
Local runtime       llama.cpp  ←  Ollama (productized llama.cpp + library + cloud)
        ↓
Cluster serving     vLLM  ·  SGLang     (paged/PD, DP attention, MoE EP, router)
        ↓
LLM gateway         LiteLLM             (multi-provider, spend, guardrails, MCP)
```

- **vLLM** — 默认集群引擎。Model Runner V2 现已默认；范围是吞吐、TP/DP/EP，以及 NVIDIA/ROCm/XPU 上的新模型 day-0。相邻仓库（`semantic-router`、`agentic-api`、`tpu-inference`、`vllm-metal`）显示项目正在引擎*之上与两侧*铺开。
- **SGLang** — 与 vLLM 同层，差异化在 structured generation、radix cache、PD/HiCache，以及 DeepSeek 家族 day-0（sparse indexer、Engram、1M ctx）。本周运维锐度更高（客户端断开可导致引擎级崩溃）。
- **llama.cpp** — 可移植运行时与转换枢纽。赢在后端广度（Vulkan/SYCL/OpenCL/s390x/WebGPU）和 nightly 节奏；输在 hybrid checkpointing 和巨型模型即插即用。
- **Ollama** — 叠在 llama.cpp 之上的分发与本地产品面。本周工作是 parsers、Responses/Codex、quantize 卫生——不是内核。
- **LiteLLM** — 控制面。OCR adapters、MCP/guardrails、spend MGET、Responses 转译。这里的故障是策略绕过和计费/索引 bug，不是 tokens/s。
- **Unsloth** — 微调 + 桌面 Studio。Vulkan AMD 默认与签名 Windows 二进制把它往多后端本地网关推，但 HF-token 隔离和多卡 QLoRA 仍是利刃。

不要把 Ollama 标签、SGLang nightly 和 vLLM stable 当成同一模型名下的一张兼容矩阵。

## 6. 趋势信号

**行业**

- **混合架构成为新默认**（MLA + SWA + Mamba + latent MoE + MTP）。每个引擎都在为 cache 交接、checkpoint 恢复和 draft 接受率付正确性税。
- **前沿模型上，preview 镜像胜过 pip wheel**（SGLang `dev-dsv41`，vLLM rc）。本周「`pip install` 就能 serve V4.1」明确为假。
- **OpenAI Responses + Anthropic Messages + MCP** 是互操作表面。Bug 集中在此：终端 `output[]` 为空、`include_reasoning` 被忽略、tools 对 guardrails 不可见、`previous_response_id` 空回放。
- **安静的错答 > 大声的崩溃。** spec decode 接受率贴近 1.0、SWA 挂上错误的 Mamba checkpoint、embedding `index` 复用、`include_reasoning: false` 后仍泄漏 reasoning。
- **AMD 路径在分裂：** SGLang 加码 ROCm kernel fusion；Unsloth 与 llama.cpp 把 Vulkan 当实用默认。RDNA4 FA PP 回归仍未解。
- **Agent 流量改写 cache 几何。** 没有稳定 `routing_key` 的 DP attention 把 SGLang radix hit 从 86% 打到 54%。Ollama 在 tool JSON key 顺序打乱时 miss cache。

**Agent / 应用开发者该盯什么**

1. 生产环境钉 **vLLM 0.29.0** 或 **SGLang 0.5.19**；把 V4.1-Flash 隔离到带 digest pin 的具名 preview 镜像。
2. 在所引 PR 进到*你的*标签之前，不要信任 `include_reasoning: false`、Responses 终端事件，或 Anthropic 路径上的 guardrails（SGLang #39113，LiteLLM #41014 / #41011）。
3. 在多轮 / RL / DP-attention 部署上发送稳定的 **routing_key**（或规范化 tool JSON）。
4. 记录 **speculative acceptance**。若趋势走向 1.0，关掉 drafter——不要扩副本。
5. 在 SGLang 前面放 **process supervisor**；单条被取消的 stream 就能干掉 worker（#39216）。
6. 不要把 llama.cpp `/slots` 当 vision/hybrid 图的 session store。
7. 在 Ollama 上，把 cloud 与 local 家族标签当不同产品；quantize 后检查残留 F16 blob。
8. 下一波合入观察：SGLang #38798 + FlashMLA #39171 + unified PD #37506；llama.cpp DeepSeek V4.1 / Kimi-K3 converters；LiteLLM 1.102.0；Unsloth multi-resident GGUF + HF-token isolation。

*本窗口无法取得 vLLM 的 issue 级摘要；其行按发布事实准确，不按 24 小时 issue 准确。*

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

我会拉取当前 SGLang 的发布状态以及若干高信号 issue/PR，确保这份摘要准确，而不是对原始列表的简单复述。
# SGLang 摘要 — 2026-09-14

来源：[sgl-project/sglang](https://github.com/sgl-project/sglang)。窗口：过去 24 小时内更新的 issue/PR（53 个 issue，500 个 PR 被触及）。本窗口内无打标签的 release。

## 1. 本周要点

仓库正处于 **DeepSeek-V4.1 落地周**，而非发版周。V4.1-Flash 的 Day-0 服务与强化学习已通过 LMSYS 技术文章和预览镜像（`lmsysorg/sglang:dev-dsv41`）公开；总 PR 仍处于打开状态且被 CI 阻塞。与此同时，维护者正在推进 **统一内存 PD**、HiCache 正确性，以及面向 GLM-5.2 / sparse MLA 的 ROCm 算子融合。运维层面，本窗口内最高严重度的报告是：**客户端断开导致整引擎崩溃**、PD 熔断器死锁，以及投机解码静默失败。

## 2. 发布与破坏性变更

- **过去 24 小时内没有新的 GitHub release。** 最新稳定标签仍为 **[v0.5.19](https://github.com/sgl-project/sglang/releases/tag/v0.5.19)** (2026-09-04)。Nightly 位于 **0.5.20.dev**（例如 `0.5.20.dev20260913+g23bc4c6ed9`）。
- **DeepSeek-V4.1-Flash 尚未进入稳定 pip wheel。** 文档明确指出标准 `pip install sglang` 无法提供该模型服务；请使用 `lmsysorg/sglang:dev-dsv41`（NVIDIA）或 `lmsysorg/sglang:dev-dsv41-mi35x`（MI350X）。
- **面向 reasoning 模型的 API 表面仍不完整：** chat/completions 上 `include_reasoning: false` 会被忽略（[#39103](https://github.com/sgl-project/sglang/issues/39103)）；修复 PR [#39113](https://github.com/sgl-project/sglang/pull/39113) 仍打开。
- **DeepGEMM 0.2 存在确定性风险：** 默认经 cuBLASLt 的 BF16 路径会随 batch size 变化。[#39319](https://github.com/sgl-project/sglang/pull/39319) 强制使用 DeepGEMM 的确定性 kernel，使 logprobs 在不同 batch size 下保持不变。
- **CI 健康度：** 跟踪 issue [#17050](https://github.com/sgl-project/sglang/issues/17050) 最近一次自动更新为 2026-09-13 21:29 UTC — **6 broken，11 flaky，991 recently fixed**。大型 PR（含 V4.1）正在等待 `run-ci`。

## 3. 新模型与硬件支持

| 方向 | 状态 | 链接 |
|---|---|---|
| **DeepSeek-V4.1 / V4.1-Flash**（`dsv4` backend：sparse indexer、跨层压缩 KV、Engram、DSpark、原生多模态、1M ctx） | 总 PR 打开 + kernel 升级 | [#38798](https://github.com/sgl-project/sglang/pull/38798)，FlashMLA rebase [#39171](https://github.com/sgl-project/sglang/pull/39171) |
| **SenseNova-U1 / U1.5** 功能与性能跟踪 | 打开 | [#37742](https://github.com/sgl-project/sglang/issues/37742) |
| **Ascend NPU（Atlas 800I A3）** GLM-5.2 cookbook | Draft PR，硬件验证待完成 | [#39321](https://github.com/sgl-project/sglang/pull/39321) |
| **Intel CPU 2026Q2 roadmap**（中小 LLM 服务、与 host CPU 的异构 PD） | 已关闭 / inactive | [#24921](https://github.com/sgl-project/sglang/issues/24921) |
| **Ngram speculative decoding** 进一步支持 | 打开的路线图 | [#21052](https://github.com/sgl-project/sglang/issues/21052) |
| **FlashInfer MXFP4 routed-MoE**，面向 SM120/SM121（序列化 static-FP8） | 已关闭的功能请求 | [#31235](https://github.com/sgl-project/sglang/issues/31235) |
| **DeepSeek V4 on Ascend** | 已关闭「最新版是否支持？」 | [#29599](https://github.com/sgl-project/sglang/issues/29599) |

已针对预览分支提交的相关 V4.1 bug：image-placeholder token 被当作硬 400（[#39274](https://github.com/sgl-project/sglang/issues/39274)），Engram + compact ragged verify 在 CUDA-graph capture 中崩溃（[#39173](https://github.com/sgl-project/sglang/issues/39173)）。

## 4. 性能与优化

**Kernels / ROCm（gfx950）**
- GLM-5.2 DSA indexer decode：每层 12 个 kernel → **4 个融合 HIP kernel**（78 层 DSA + MTP draft）。[#38583](https://github.com/sgl-project/sglang/pull/38583)
- 在 gfx950 上将 MLA q-absorb 融合进 RoPE + KV-write（一次 grid 启动，替代两次占用不足的 launch）。[#38340](https://github.com/sgl-project/sglang/pull/38340)
- Triton sparse MLA：调优 split-K / reduction 几何；workspace 改为 CUDA-graph 安全。[#39059](https://github.com/sgl-project/sglang/pull/39059)
- ROCm EAGLE verify 静默走了 `argmax`（忽略 `temperature` / `top_p` → 重复循环）。[#37134](https://github.com/sgl-project/sglang/pull/37134)

**MoE / DeepGEMM**
- 在 MegaMoE DeepGEMM 中融合 shared + routed experts（[#39313](https://github.com/sgl-project/sglang/pull/39313)，[#38700](https://github.com/sgl-project/sglang/issues/38700) 的 WIP）。
- 自带 routing 的模型（`FLASHINFER_TRTLLM_ROUTED`）无法走到 deferred MoE finalize。[#39299](https://github.com/sgl-project/sglang/issues/39299)

**内存、缓存、PD**
- 面向 MHA / MLA / SWA / full+SWA+Mamba 的统一池 PD（Mooncake 传输、page-envelope 注册、飞行中不 relocate）。Stack 1/3：[#37506](https://github.com/sgl-project/sglang/pull/37506)
- hybrid-SWA 改用共享字节预算，取代静态 per-pool 上限。[#36729](https://github.com/sgl-project/sglang/pull/36729)
- PD 交接可选开启 KV checksum（目前只校验 `bootstrap_room`）。[#39229](https://github.com/sgl-project/sglang/pull/39229)
- HiCache：更多路径加上 `@rank_consensus`（[#37425](https://github.com/sgl-project/sglang/pull/37425)）；prefetch 状态按 request *attempt* 作用域，而非 request id（[#39318](https://github.com/sgl-project/sglang/pull/39318)）；storage 清理时释放 buffer prefetch 锁（[#38483](https://github.com/sgl-project/sglang/pull/38483)，已关闭）。

**Serving / DP**
- DP attention 下多轮 / RL rollout 的 `routing_key` 负载均衡（报告称 round-robin 把各轮拆到不同 rank 时，radix-cache 命中率 **86% → 54%**）。[#37543](https://github.com/sgl-project/sglang/pull/37543)

**已公布的 V4.1 数字（LMSYS，非本 24h PR 集合）：** decoder-side replay 在 8×H200 上 **prefill +1.56×**，在 4×GB300 上 **+1.37×**；Engram host offload 在 4×GB300 上 **KV 容量 +36%**，decode/TTFT 相当。

**队列中仍开放的性能 bug**
- Kimi-K3 上 PP8 分离式 prefill：与负载无关的 **约 30 s TTFT 下限**。[#34815](https://github.com/sgl-project/sglang/issues/34815)
- unified-cache 默认切换导致 Spark/Thor 上长前缀 decode 回退（已关闭）。[#36131](https://github.com/sgl-project/sglang/issues/36131)
- Qwen3.5-4B 在 RTX 5090 上大幅回退（已关闭/inactive）。[#31120](https://github.com/sgl-project/sglang/issues/31120)

## 5. 稳定性与回归

按生产影响排序。本窗口内若干较旧的 GLM / KV-transfer bug 被标为 `[inactive]`；除非你仍在使用所引用的 nightly，否则视为已归档。

**P0 — 进程死亡 / 集群污染**
- 请求进行中客户端断开，抛出未捕获的 `asyncio.CancelledError` 并 **杀死整个引擎**（4× RTX 6000D / Blackwell，DeepSeek 镜像）。[#39216](https://github.com/sgl-project/sglang/issues/39216)
- sgl-router PD：熔断器已打开仍向 decode 派活 → **prefill 永久假死**。[#31206](https://github.com/sgl-project/sglang/issues/31206)
- `/health` 超时不会取消 scheduler 请求 → 孤儿健康检查堆积，打崩 paged-prefill 批处理。[#35884](https://github.com/sgl-project/sglang/issues/35884)

**P1 — 静默错误结果 / 算力浪费**
- 量化 DFlash2 draft 能加载并提供服务，但 **接受率约 0%**，无错误/警告（接受率 ~3.7 → ~1.0；比不用 drafter 更慢）。相关一对 [#36599](https://github.com/sgl-project/sglang/issues/36599)。[#39087](https://github.com/sgl-project/sglang/issues/39087)
- chat + completions 上 `include_reasoning: false` 仍会输出 reasoning。[#39103](https://github.com/sgl-project/sglang/issues/39103) / 修复 [#39113](https://github.com/sgl-project/sglang/pull/39113)
- SWA 分支把 **更晚的 Mamba checkpoint 挂到更早的前缀上**（高优先级）。[#38815](https://github.com/sgl-project/sglang/issues/38815)
- HiCacheFile 把无法恢复的 hybrid 前缀报告为命中。[#39147](https://github.com/sgl-project/sglang/issues/39147)
- Grammar token 同步在 DP attention 下创建了 **单例 NCCL group**。[#35826](https://github.com/sgl-project/sglang/issues/35826)

**P2 — 硬件 / kernel 正确性**
- `is_fa3_supported()` 接受 **sm_89** 但未随包提供 cubin；`ver` 被忽略 → RTX 4080 SUPER 上出现原始 CUDA 错误。[#38980](https://github.com/sgl-project/sglang/issues/38980)
- DeepSeek-V4.1 Engram 的 profiled SPS 表在 CUDA-graph capture 中崩溃。[#39173](https://github.com/sgl-project/sglang/issues/39173)
- DeepSeek-V4.1 用户文本若包含 image placeholder token 会被 400 拒绝。[#39274](https://github.com/sgl-project/sglang/issues/39274)
- Prometheus `avg_request_queue_latency` 仍未采集（good-first-issue，自 2025 年起打开）。[#6357](https://github.com/sgl-project/sglang/issues/6357)

**近期已关闭 / inactive（除非在当前 main 上复现，否则不要重开）**
- GLM-5.2 PD `KVTransferError` [#30609](https://github.com/sgl-project/sglang/issues/30609)，GLM-5.2 NVFP4+EAGLE 在 graph capture 上非法访问 [#31093](https://github.com/sgl-project/sglang/issues/31093)，GLM-5.1 TP8 EAGLE 在 KV 接近打满时挂起 [#26399](https://github.com/sgl-project/sglang/issues/26399)，LongCat-2.0 在 EP MoE 下第二路 attn RoPE 崩溃 [#31000](https://github.com/sgl-project/sglang/issues/31000)，custom all-reduce V2 跨两条 CUDA stream 死锁 [#31117](https://github.com/sgl-project/sglang/issues/31117)，HiCacheFile 扁平目录 ENOSPC [#28653](https://github.com/sgl-project/sglang/issues/28653)。

## 6. 对应用开发者的含义

1. **生产环境继续使用 v0.5.19。** V4.1-Flash 仅为预览（`dev-dsv41`）。请固定镜像 digest；不要假设 nightly 与 0.5.19 可互换。
2. **若通过 OpenAI 兼容网关服务 reasoning 模型**，在 [#39113](https://github.com/sgl-project/sglang/pull/39113) 合入前不要信任 `include_reasoning: false`。在代理层过滤 `reasoning_content`。
3. **Agent / 多轮 / RL 客户端应发送稳定的 `routing_key`**（待 [#37543](https://github.com/sgl-project/sglang/pull/37543) 可用）；否则 DP attention 会打散 radix cache，前缀命中率崩塌。
4. **在引擎前放置进程监督器。** [#39216](https://github.com/sgl-project/sglang/issues/39216) 意味着单条被取消的 HTTP 流就能打掉 worker。若把超时路径当 liveness 用，健康检查（[#35884](https://github.com/sgl-project/sglang/issues/35884)）同样可以。
5. **PD + router 部署：** 在 [#31206](https://github.com/sgl-project/sglang/issues/31206) 修复前，将已打开的熔断器视为不安全；在信任统一池上的 Mooncake 交接前，先在 staging 启用新的 KV checksum（[#39229](https://github.com/sgl-project/sglang/pull/39229)）。
6. **投机解码：** 量化 DFlash2 和 ROCm EAGLE 可能 *静默* 失败。记录接受率；若掉到接近 1.0，应关闭 drafter，而不是扩副本。
7. **多模态 V4.1 客户端：** 从用户文本中剥离或转义 DeepSeek image placeholder token（[#39274](https://github.com/sgl-project/sglang/issues/39274)）。会话 image-append 位置问题正在 [#39145](https://github.com/sgl-project/sglang/pull/39145) 中修复。
8. **可观测性缺口：** `avg_request_queue_latency` 仍然是黑的（[#6357](https://github.com/sgl-project/sglang/issues/6357)）。从网关侧测量排队，不要只依赖 SGLang Prometheus。

---

*后续关注：[#38798](https://github.com/sgl-project/sglang/pull/38798) 与 FlashMLA [#39171](https://github.com/sgl-project/sglang/pull/39171) 的合入、统一内存 PD 栈 [#37506](https://github.com/sgl-project/sglang/pull/37506)，以及 v0.5.20 是否会围绕 V4.1 预览切一版 release，而不是继续留在 `dev-dsv41`。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 周报 — 2026-09-14

来源：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · 最新 nightly **[b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948)** (13 Sep 2026) · 站点：[llama.app](https://llama.app)

## 1. 本周要点

Nightly 在大约一天内从 **b10934 → b10948**，以加固为主，并非单点功能落地：Nemotron-H 的 expert-FFN 回退增加了除零保护（[#28779](https://github.com/ggml-org/llama.cpp/pull/28779) / [b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947)），Vulkan 在 `vkQueueSubmit` 外包了 mutex，用来绕过 NVIDIA 多队列驱动缺陷（[#28830](https://github.com/ggml-org/llama.cpp/pull/28830) / [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938)），SYCL 的内存查询 / Level Zero 检测也做了清理（[#28227](https://github.com/ggml-org/llama.cpp/pull/28227) / [b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944)）。产品面上，chat/schema 工作仍在推进：Qwen3-Coder 解析器对复杂类型的处理（[#28742](https://github.com/ggml-org/llama.cpp/pull/28742)），以及把 `common_schema` 作为 JSON schema 的内部 IR（[#28736](https://github.com/ggml-org/llama.cpp/pull/28736)）。大型模型相关 PR（Kimi-K3、DeepSeek V4.1）仍开放，尚未合入。

## 2. 发布与破坏性变更

本窗口没有切 semver 版本。项目仍按 **bNNNN nightly**（附带构建产物）每天多次发布；`releases/latest` 指向最新的 `b` tag。

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

**迁移说明：** 未宣布任何 API 破坏性变更。[b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) 的 schema 工作把 `json-schema-to-grammar` 重构到 `common_schema` 上——预期 grammar / tool-call 的边角行为会变，HTTP 表面不变。二进制矩阵仍包含 CPU / Vulkan / ROCm 10 / OpenVINO / SYCL FP16+FP32 / Android / Windows / s390x；若干 tag 上 KleidiAI 的 macOS 构建仍标记为 DISABLED。

## 3. 新模型与硬件支持

**已合入（nightly）：**
- **Nemotron-H / NextN-MTP：** 在缺少 `expert_feed_forward_length` 时，expert FFN 尺寸回退更安全（[#28779](https://github.com/ggml-org/llama.cpp/issues/28779)）。
- **Qwen3-Coder** chat 解析器：对复杂 / schema 类型处理更好（[#28742](https://github.com/ggml-org/llama.cpp/pull/28742)）。
- **OpenCL：** noshuffle 行对齐现已覆盖 `q4_K`、`q5_K`、`q8_0`（不再仅限 `q6_K`）（[#28575](https://github.com/ggml-org/llama.cpp/pull/28575)）。
- **s390x CPU：** VXE-only helper 已加门控，非 VXE 构建不会调用它们（[#28775](https://github.com/ggml-org/llama.cpp/pull/28775)）；CI 对 `-DGGML_VXE=OFF` 的覆盖在 [#28776](https://github.com/ggml-org/llama.cpp/pull/28776) 中扩展。
- **WebGPU：** 因 CI 失败，从架构测试中排除 `HY_V4`（[#28855](https://github.com/ggml-org/llama.cpp/pull/28855)）。
- 词表/转换进行中：Fraunhofer `elmod-2.7b-it` 预分词器（[#28845](https://github.com/ggml-org/llama.cpp/pull/28845)）、UGM byte-fallback（[#28864](https://github.com/ggml-org/llama.cpp/pull/28864)）、MiMo V2 SWA pattern 加载（[#28865](https://github.com/ggml-org/llama.cpp/pull/28865)）、`get_key_or_arr` 误用修复（[#28868](https://github.com/ggml-org/llama.cpp/pull/28868)）。

**尚未合入（观察清单）：**
- **Kimi-K3** hybrid KDA + MLA + latent MoE + situ + MXFP4 转换 — [#26185](https://github.com/ggml-org/llama.cpp/pull/26185)（出现在 24h 列表中已关闭，但仍是参考 PR；相关回滚工作 [#28466](https://github.com/ggml-org/llama.cpp/pull/28466)）。
- **DeepSeek V4.1**（`DeepseekV41ForCausalLM`）转换器 — [#28696](https://github.com/ggml-org/llama.cpp/pull/28696)。
- 磁盘流式 MoE routed experts（模型大于内存）— [#25294](https://github.com/ggml-org/llama.cpp/pull/25294)。
- Apple **ANE** backend 仍是长期研究项（[#10453](https://github.com/ggml-org/llama.cpp/issues/10453)，44 👍）。
- 针对无原生 BF16 MMA 的 pre-RDNA3 / pre-CDNA AMD 的 CUDA BF16 回退 — [#28846](https://github.com/ggml-org/llama.cpp/pull/28846)（已关闭）。
- 面向 Bonsai 类模型的 ARM NEON/I8MM Q1_0 repack — [#23492](https://github.com/ggml-org/llama.cpp/pull/23492)。

## 4. 性能与优化

- **Vulkan / NVIDIA：** 同一设备上并发 `vkQueueSubmit` 外包 mutex（[#28830](https://github.com/ggml-org/llama.cpp/pull/28830)）。正确性优先；在驱动修好前，多队列会有一点串行化开销。
- **Grammars：** 自研引擎单次查找 + 减少拷贝，号称 **1.2–1.3×**（[#26885](https://github.com/ggml-org/llama.cpp/pull/26885)，已关闭）。`llguidance` 仍是快路径。
- **CUDA MMVQ：** 针对窄 MoE expert 矩阵的动态 `nwarps` — 仍开放（[#20831](https://github.com/ggml-org/llama.cpp/pull/20831)）；用来应对 RDNA3/4 上把 `nwarps` 提到 8 后的 TG 回退。
- **Speculative decode：** 在 block decode 前遵守安全 draft 上限（[#26575](https://github.com/ggml-org/llama.cpp/pull/26575)）。
- **SYCL graphs：** CUDA graphs 的 record/replay 移植（[#28725](https://github.com/ggml-org/llama.cpp/pull/28725)）。
- **ROCm / RDNA4（`gfx1201`）：** 移除 rocWMMA 后的原生 MMA FlashAttention，反馈 **深层 prompt processing 最多慢约 2×**；decode 不变或略快（[#26220](https://github.com/ggml-org/llama.cpp/issues/26220)）。
- **RTX 5090（`sm_120`） / Qwen3.5 hybrid：** 原生 Linux 上 TG 约达 roofline 的 76%，MTP 约 1.7×；Windows/Ollama 路径在各 draft 深度上 **慢 1.5–1.6×**（[#28196](https://github.com/ggml-org/llama.cpp/issues/28196)）。
- **OpenCL** 对齐改动应能减轻 `q4_K`/`q5_K`/`q8_0` 上的未对齐行惩罚（[#28575](https://github.com/ggml-org/llama.cpp/pull/28575)）。
- **FA tests** 缩小规模，降低 CI 成本（[#28842](https://github.com/ggml-org/llama.cpp/pull/28842)）。

## 5. 稳定性与回归

按运维影响排序。

**高 — 正确性 / 静默丢数据**
- Speculative decoding（`draft-mtp` / `draft-dspark`）：在量化 target 上 greedy 输出 **与 vanilla 分叉**；BF16 target 一致。同一 Q target 上的 N-gram speculation 正常（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）。
- `/slots` 保存/恢复会在 hybrid/recurrent 模型上 **静默丢掉 prompt reuse** — checkpoint 从不持久化（[#25913](https://github.com/ggml-org/llama.cpp/issues/25913)）。相关：经 `/slots/3?action=save` 的 KV 保存对 **vision** 模型损坏（[#19466](https://github.com/ggml-org/llama.cpp/issues/19466)，38 条评论）。
- Gemma 4 SWA 会“忘掉”关键细节（[#25751](https://github.com/ggml-org/llama.cpp/issues/25751)）；Gemma 4 加载 / `Gemma4Assistant` 上下文初始化失败（[#24343](https://github.com/ggml-org/llama.cpp/issues/24343)，32 👍）；调度器断言 `n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS`（[#24132](https://github.com/ggml-org/llama.cpp/issues/24132)）。

**高 — 平台 / 构建**
- ROCm 7.14：`gfx1201` 上未分配 VRAM（[#26208](https://github.com/ggml-org/llama.cpp/issues/26208)，已关闭）；缺少 `libhipblas.so.3`（[#25807](https://github.com/ggml-org/llama.cpp/issues/25807)）。
- SYCL `GGML_SYCL_DEVICE_ARCH=xe2` 段错误（[#25808](https://github.com/ggml-org/llama.cpp/issues/25808)，已关闭）。
- Metal：M4 Pro + Tahoe 上 `ggml_metal_synchronize` / `kIOGPUCommandBufferCallbackErrorInnocentVictim` 崩溃（[#20141](https://github.com/ggml-org/llama.cpp/issues/20141)，已关闭）。
- Vulkan + Intel B70：Qwen3.6 MoE 崩溃（[#23769](https://github.com/ggml-org/llama.cpp/issues/23769)）。
- OpenVINO 无法在 CPU/GPU/NPU 上加载 gemma-4-12B（[#24415](https://github.com/ggml-org/llama.cpp/issues/24415)）。
- RPC + AMD：`top_k` 采样在 `argsort.cu` 触发 `GGML_ASSERT(shared_mem <= smpb)`（[#24177](https://github.com/ggml-org/llama.cpp/issues/24177)，已关闭）。

**中**
- SYCL/xe Battlemage：`-cb` 把 GPU 钉在 `gt-c0`，无法闲时降功耗（[#24946](https://github.com/ggml-org/llama.cpp/issues/24946)）。
- RX 7900 XTX 上 ROCm vs Vulkan 的 TG 差距（[#20934](https://github.com/ggml-org/llama.cpp/issues/20934)，已关闭）。
- Qwen 3.5 “weird behavior” 评测（[#21239](https://github.com/ggml-org/llama.cpp/issues/21239)，已关闭）；Qwen3.5 thinking+tools 解析器在文本出现在 `<tool_call>` 之前时的问题（[#20260](https://github.com/ggml-org/llama.cpp/issues/20260)，已关闭）。
- llama-ui 桌面端 reasoning-level 菜单损坏（[#27981](https://github.com/ggml-org/llama.cpp/issues/27981)）。
- Server preset 名称变更 / 部分 preset 被忽略（[#25150](https://github.com/ggml-org/llama.cpp/issues/25150)）。

许多已关闭条目被标为 stale/unconfirmed —— 把 “CLOSED” 理解为 *近期未能复现*，不等于 *已在 b10948 修好*。

## 6. 对应用开发者意味着什么

1. **生产环境请钉死某个 `b` tag。** HEAD 一天会动多次。对 hybrid MoE + MTP（Nemotron-H、Qwen3.5/3.6、DeepSeek-V4 系列），优先 **≥ b10947**，以拿到 expert-FFN 除零保护。
2. **不要信任 `/slots` checkpoint** 用于 multimodal、hybrid 或 recurrent 图。在 [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) / [#19466](https://github.com/ggml-org/llama.cpp/issues/19466) 落地前，重建上下文，或把会话留在进程内。磁盘卸载（`--cache-disk`，[#20697](https://github.com/ggml-org/llama.cpp/issues/20697)，49 👍）仍是需求，不是功能。
3. **Speculative decoding + 量化 target 在 greedy 下不安全。** 若需要 bit-stable 的 agent trace，关掉 draft-mtp/dspark，或改用 BF16 target（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）。
4. **Responses API 能用但不完整。** `/v1/responses` 已存在，并在 [llama.app](https://llama.app/docs/api) 有文档；完整 OpenAI 对等（tools、`function_call_output` 中的图片）仍在补齐 —— 见 [#19138](https://github.com/ggml-org/llama.cpp/issues/19138) 以及开放中的 [#28847](https://github.com/ggml-org/llama.cpp/pull/28847)（tool 输出里的 `input_image`）。从 tool 返回图片的 Codex 风格客户端，在该 PR 合入前会失败。
5. **结构化输出正在你脚下重写。** `common_schema` + Qwen3-Coder 解析器会改变 grammar 编译。升过 b10934–b10936 后请重测 tool-calling fixture。`LOG_JSON`（[#28586](https://github.com/ggml-org/llama.cpp/pull/28586)）是把结构化事件接到网关的钩子。
6. **选 backend 仍比选模型更关键。** RDNA4 FA PP 回退、5090 Windows TG 差距、ROCm 7.14 库/显存问题、Intel B70 Vulkan/SYCL 闲时 bug 都还在。若要发多 backend 镜像，ROCm 旁边保留 Vulkan 回退，且不要假设 SYCL graph replay（[#28725](https://github.com/ggml-org/llama.cpp/pull/28725)）已可上生产。
7. **反复出现的 server 拓扑需求：** cache 列表/删除（[#16393](https://github.com/ggml-org/llama.cpp/issues/16393)）、单次加载上的 router-mode 多 preset（[#23704](https://github.com/ggml-org/llama.cpp/issues/23704)）、独立的 `-ns` vs `-np`（[#22921](https://github.com/ggml-org/llama.cpp/issues/22921)）、缺失的 backend ops（[#14909](https://github.com/ggml-org/llama.cpp/issues/14909)）。本迭代按现有限制规划，别等它们落地。
8. **超大模型路径仍是转换优先。** Kimi-K3 / DeepSeek V4.1 还不是即开即用的 nightly；若需要它们，跟踪转换 PR 以及 MXFP4/MoE streaming 工作，别指望明天就能 `llama-cli -hf …`。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-14

来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)。窗口：过去约 24 小时内更新的 issues 与 PRs。当前稳定版：**v0.34.0**（2026-09-09）。过去 24 小时内无新版本发布。

## 1. 本周要点

主线是 Agent 与工具调用的正确性，而不是新的二进制发布。多份报告集中在 Qwen3.8 / Qwen3-Coder 解析器、Gemma 4 多模态加载、云端 JSON/`format` schema，以及 OpenAI 兼容的 Responses 路径（web_search + Codex 后续调用）。维护者已在合入配套 PR：上下文溢出时保留最后一条用户消息（[#17894](https://github.com/ollama/ollama/pull/17894)）、工具参数中超出 int64 的数字保持原样（[#18422](https://github.com/ollama/ollama/pull/18422)）、在客户端工具调用前完成推理（[#18413](https://github.com/ollama/ollama/pull/18413)），以及在 `ollama create --quantize` 后删除残留的 F16 blob（[#18424](https://github.com/ollama/ollama/pull/18424)）。

## 2. 版本发布与破坏性变更

过去 24 小时内无新版本发布。

**当前主线：** [v0.34.0](https://github.com/ollama/ollama/releases/tag/v0.34.0)（稳定版，2026-09-09）。该版本要点：ChatGPT Desktop 集成（macOS 应用）、Apple Silicon 上更稳的结构化输出、OpenAI 兼容客户端的工具搜索与响应压缩。随 0.34 一并流传的说明：兼容 GPU 上 Gemma 4 的 flash attention；safetensors 架构的 `/save` 修复。

**运维备注（非版本 bump）：**
- 内置 CLI agent 已移除，旧版聊天 UI 已恢复（[#18393](https://github.com/ollama/ollama/pull/18393)，已关闭）。
- 部分库模型（例如 `qwen3.8:27b`）有未文档化的最低 Ollama 版本要求（[#18414](https://github.com/ollama/ollama/issues/18414)）。
- 部分构建中，Windows 卸载后仍会留下用户 PATH 条目；修复已重新打开为 [#18409](https://github.com/ollama/ollama/pull/18409)。

## 3. 新模型与硬件支持

本窗口内没有合入新的官方 library tag。需求与部分进展：

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

## 4. 性能与优化

- **相同工具请求出现 prompt cache miss。** `qwen3-coder` 的额外 tool-schema 键会以随机顺序渲染，因此两次完全相同的 `/api/chat` 或 `/v1/chat/completions` 调用会打不中前缀缓存（[#18430](https://github.com/ollama/ollama/issues/18430)）。
- **量化磁盘泄漏。** 从 safetensors 执行 `ollama create --quantize` 会留下未被引用的 F16 blob（每个 26B 导入约 50 GB）。有报告称孤儿文件达 830 GB，而列表中仅 188 GB。清理 PR：[#18424](https://github.com/ollama/ollama/pull/18424)；相关 import-digest 工作：[#18407](https://github.com/ollama/ollama/pull/18407)，报告 [#18416](https://github.com/ollama/ollama/issues/18416)。
- **Thinking budget。** `think` 仍只有开/关；在推理块中循环的模型会吃满整个窗口并返回空文本。token-budget 提案：[#17566](https://github.com/ollama/ollama/pull/17566)。
- **Vulkan iGPU 加载超时**（llama.cpp bump 之后）已通过改用 direct I/O 处理，与 CUDA/ROCm 一致（[#18124](https://github.com/ollama/ollama/pull/18124)）。
- **v0.34.0（上一刀）：** Apple Silicon 上的结构化输出改进；兼容 GPU 上 Gemma 4 的 flash attention。

本 24 小时集合中没有新的 tokens/s 或 TTFT 数字。

## 5. 稳定性与回归

按运维影响排序。已有修复 PR 的会注明。

**高**
- **Qwen3.8 工具循环 → HTTP 500 `no user query found in messages`。** 上下文截断丢掉了最后一轮用户消息。[#17778](https://github.com/ollama/ollama/issues/17778) · 修复 [#17894](https://github.com/ollama/ollama/pull/17894)。
- **`kimi-k3:cloud` 在 tool-role 消息含图像内容时 HTTP 500**（kimi-k2.6 与 glm-5.3-flash 正常）。[#18426](https://github.com/ollama/ollama/issues/18426)。
- **Linux 混合显卡在 backend/device 加载时 SIGABRT。** [#18412](https://github.com/ollama/ollama/issues/18412)。
- **Jetson 8GB 加载 Gemma 4 E4B 多模态 projector 时 Host OOM。** [#18396](https://github.com/ollama/ollama/issues/18396)。
- **云端 / 结构化 JSON 被忽略**，发生在 `qwen3-coder:480b-cloud`；本地 30b 会遵循 schema。[#12362](https://github.com/ollama/ollama/issues/12362)。
- **Responses + `web_search`：** reasoning 尚未完成就发出 function_call；共享的 `output_index` 会破坏 Codex 回放。[#18411](https://github.com/ollama/ollama/issues/18411) · 修复 [#18413](https://github.com/ollama/ollama/pull/18413)。
- **`/api/codex/v1/responses`：** `previous_response_id` + `function_call_output` 返回 200，但 `output_text` 为空且 token 数为零。[#18419](https://github.com/ollama/ollama/issues/18419)。

**中**
- Gemma 4 / vision：Windows 上图像不被处理（[#16532](https://github.com/ollama/ollama/issues/16532)）；忽略 EXIF 方向，模型会“看到”旋转后的画面（[#18418](https://github.com/ollama/ollama/issues/18418)）；统一 Gemma4 vision PR 仍未合入（[#16879](https://github.com/ollama/ollama/pull/16879)）。
- `gemma3:12b` 的 `format` 在双引号源词处被截断（[#18094](https://github.com/ollama/ollama/issues/18094)）。
- Qwen3.6 工具调用模板漂移 → qwen3.5 解析器 500（[#16383](https://github.com/ollama/ollama/issues/16383)）。
- Qwen3-Coder 解析器会把超出 int64 的 `number` 参数钳位（例如 `1e20` 在 macOS/ARM64 上变成 `9223372036854775807`）。[#18421](https://github.com/ollama/ollama/issues/18421) · [#18422](https://github.com/ollama/ollama/pull/18422)。
- IQ3_S Qwen3.8 GGUF 返回空 content（[#18297](https://github.com/ollama/ollama/issues/18297)）。
- Gemma 4 / Qwen 上的 coding-agent 三联问题：重复守卫、工具调用被截断、缺一个花括号就丢掉 tool call（[#17562](https://github.com/ollama/ollama/issues/17562)）。
- 含大量省略号的 TOC 风格输入 → `cancel task`（[#18387](https://github.com/ollama/ollama/issues/18387)）。
- 全零 embeddings 仍以 HTTP 200 返回；校验 PR [#18406](https://github.com/ollama/ollama/pull/18406)。
- Chat UI 会隐藏失败/不完整的流；错误应被暴露出来 [#18408](https://github.com/ollama/ollama/pull/18408)。

**较低 / 合规 / UX**
- 发行产物仍未附带第三方版权声明（llama.cpp MIT）。长期 issue [#3185](https://github.com/ollama/ollama/issues/3185)（275 👍，58 条评论）。
- Windows 10 桌面版 0.34.0 启动时会闪一下 PowerShell 窗口（[#18415](https://github.com/ollama/ollama/issues/18415)）。
- 仅社区集成 PR：Genie、Clips Kitty、SlopShield、AI Arena Lite（[#18428](https://github.com/ollama/ollama/pull/18428)、[#18423](https://github.com/ollama/ollama/pull/18423)、[#18420](https://github.com/ollama/ollama/pull/18420)、[#18410](https://github.com/ollama/ollama/pull/18410)）。Docker SBX agent 请求：[#18425](https://github.com/ollama/ollama/issues/18425)。

## 6. 对应用开发者的含义

- **运行时与模型要一起钉死。** 同族名的云端与本地 tag 并不共享 schema 或多模态行为（`qwen3-coder:30b` vs `480b-cloud`；kimi-k3 vs k2.6）。把云端当作另一套兼容性矩阵。
- **在 [#17894](https://github.com/ollama/ollama/pull/17894) 与 [#18422](https://github.com/ollama/ollama/pull/18422) 进入正式版本之前，不要信任 Qwen 3.5/3.6/3.8 以及 Qwen3-Coder 的工具解析器。** 数值型工具参数自行规范化；把最近一轮用户消息保持足够短，避免截断把它丢掉；对提到 “no user query” 的 500 做重试。
- **若在意 `qwen3-coder` 的 prompt cache，发送前先把工具 JSON 规范化**（键排序、去掉多余 schema 字段）（[#18430](https://github.com/ollama/ollama/issues/18430)）。
- **Responses / Codex / web_search 用户：** 0.34.0 上会遇到条目顺序问题。在 [#18413](https://github.com/ollama/ollama/pull/18413) 落地前优先用 `/api/chat`；不要把 `previous_response_id` 后续调用当作可信源（[#18419](https://github.com/ollama/ollama/issues/18419)）。
- **结构化输出（`format`）** 在带引号的源文本以及部分云端模型上仍会失败。客户端自行校验 JSON；不要假设 `done_reason: stop` 就等于完整对象。
- **多模态 Gemma 4** 在 Windows、Jetson 8GB 以及带 EXIF 旋转的图像上尚未完成。预先矫正图像方向；在小容量统一内存板上优先用 CPU projector 或非 mmproj tag。
- **导入卫生：** `ollama create --quantize` 之后，在 [#18424](https://github.com/ollama/ollama/pull/18424) 发布前检查 `~/.ollama/models/blobs` 是否有未被引用的 F16 文件。`ollama rm` 收不回它们。
- **Embeddings：** 在 [#18406](https://github.com/ollama/ollama/pull/18406) 合入前，即使 HTTP 200 也要检查是否全零向量。
- **合规：** 二进制再分发方仍需自行附上 llama.cpp 及其他声明（[#3185](https://github.com/ollama/ollama/issues/3185)）。

0.34.0 之后下一刀的关注列表：[#17894](https://github.com/ollama/ollama/pull/17894)、[#18422](https://github.com/ollama/ollama/pull/18422)、[#18413](https://github.com/ollama/ollama/pull/18413)、[#18424](https://github.com/ollama/ollama/pull/18424)、[#16879](https://github.com/ollama/ollama/pull/16879)、[#18406](https://github.com/ollama/ollama/pull/18406)。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

我将拉取最新的 LiteLLM 发行说明、issues 与 PRs，使本期摘要基于完整信息，而不是只依赖被截断的摘要。
1.102 预发布 changelog 是截断的；接下来我会拉取完整说明以及最高严重级别的 issues。
# LiteLLM Digest — 2026-09-14

Repo: [BerriAI/litellm](https://github.com/BerriAI/litellm)

## 1. 本周要点

稳定版仍是 **v1.100.1**（9 月 10 日）。1.102 线在两次 dev 裁剪后推进到 **v1.102.0-rc.1**（9 月 13 日），包含一轮较大的 OCR adapter 改动、Redis/鉴权 spend 路径的性能工作，以及 MCP/guardrail 加固。过去 24 小时的 issues 与 PRs 主要集中在 **Responses-API 转译正确性**（`chatgpt/` / `gpt-5.6-sol` 空的 `output[]`）、**embedding 缓存 index 错误**，以及 **Anthropic `/v1/messages` guardrails 看不到 MCP tools**。

## 2. 发行与破坏性变更

| Tag | Channel | When | Notes |
|---|---|---|---|
| [v1.102.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1) | pre-release | 13 Sep | Compare `v1.102.0-dev.2...v1.102.0-rc.1`。Cosign 签名的 GHCR 镜像。没有显式 breaking-change 横幅。 |
| [v1.102.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2) / [v1.102.0-dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1) | dev | 13 Sep window | 与 rc.1 相同的 cosign 校验块。 |
| [v1.101.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2) | pre-release | 13 Sep window | 1.101 仍在 rc 轨道；不是当前稳定版。 |
| [v1.100.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.1) | **stable** | 10 Sep | `stable/1.100.x` 上的补丁。 |

**v1.100.1 内容**（[#40176](https://github.com/BerriAI/litellm/pull/40176)、[#40455](https://github.com/BerriAI/litellm/pull/40455)、[#40495](https://github.com/BerriAI/litellm/pull/40495)）：

- 在 v1.99 provenance 门控之后回移植 spend-tracking 的可 join 性，随后又从这条稳定线 **撤回** 了 spend-attribution 回移植。
- Router 修复：retry breadcrumbs 不再保留每一次更早的请求（重试上的内存/正确性泄漏）。

**来自 1.102 轨道的配置 / 运维说明（尚未进入稳定版）：**

- 内存中的 management cache 容量现在可配置 — [PR #40725](https://github.com/BerriAI/litellm/pull/40725)。
- 较旧 proxy 上的运维人员在 `proxy_server.py` 里仍面对硬编码的 **30s** deployment/credential DB 重载；[Issue #40972](https://github.com/BerriAI/litellm/issues/40972) 希望在 DB 查询超过该窗口时提供可调间隔。
- 上述每个 tag 的 Docker 镜像都用同一把 cosign 密钥签名，密钥来自 commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)。请用钉死的公钥校验，不要用浮动 tag。

过去 24 小时没有新的已文档化 API 破坏性变更。来自 **v1.100.0**（9 月 6 日）的 MCP-toolset-enforcement 破坏，如果你是从 ≤1.99 跳上来的，已经在稳定版上。

## 3. 新模型与硬件支持

这不是一次 CUDA/ROCm/Metal 发行。变更集中在 provider maps、OCR backends，以及 cost-map 完备性。

**已合入或即将合入 1.102 线**

- **OCR adapters**（Azure Mistral + native auth、Azure Document Intelligence、Vertex Mistral、Vertex DeepSeek；Reducto legacy + v3）。引入 Vertex DeepSeek adapter 后移除了 legacy OCR pipeline — [PRs #40502](https://github.com/BerriAI/litellm/pull/40502)、[#40507](https://github.com/BerriAI/litellm/pull/40507)、[#40509](https://github.com/BerriAI/litellm/pull/40509)、[#40533](https://github.com/BerriAI/litellm/pull/40533)、[#40534](https://github.com/BerriAI/litellm/pull/40534)、[#40535](https://github.com/BerriAI/litellm/pull/40535)。
- **DeepSeek V4.1 Flash on Fireworks** 进入 cost map — [PR #40812](https://github.com/BerriAI/litellm/pull/40812)。
- **OpenAI reasoning-family fallback** 在 registry 中泛化 — [PR #40902](https://github.com/BerriAI/litellm/pull/40902)。
- **Meta Muse Voice** 转写支持（rc.1 theme list）。
- **Conduct Guard** guardrail 集成 — [PR #40785](https://github.com/BerriAI/litellm/pull/40785)。
- AWS Secrets Manager 中 virtual keys 的客户自管 KMS keys — [PR #40475](https://github.com/BerriAI/litellm/pull/40475)。

**进行中（过去 24 小时有更新的 issues/PRs）**

- `inception/mercury-2.5` 需要完整的 cost-map + prompt-caching 标志（`cache_read_input_token_cost`、`supports_prompt_caching`）— [Issue #40746](https://github.com/BerriAI/litellm/issues/40746)、[PR #41016](https://github.com/BerriAI/litellm/pull/41016)。Provider 标价为每 1M $0.20 / $0.75（上线促销 $0.04 / $0.15；cache read $0.02 / 促销 $0.004）；260K context。
- 带版本的 Vertex Claude IDs 会静默默认到 4096 `max_tokens`；[PR #41015](https://github.com/BerriAI/litellm/pull/41015)（已关闭）把 map 修复 rebase 回去（从更早 PRs 的 8192 → 64k 级取值）。
- ChatGPT-subscription provider `chatgpt/` + model id `gpt-5.6-sol` 已对接 `chatgpt.com/backend-api/codex/responses`，但 Responses 桥接仍错误处理终端事件（见 Stability）。

## 4. 性能与优化

1.102 轨道上的具体工作（rc.1 / 相邻 PRs）：

- **鉴权热路径：** 一次 MGET + 一次 DB 查询 + 一次 pipeline，覆盖 user、team、membership、org、project 以及 spend counters — [PR #40834](https://github.com/BerriAI/litellm/pull/40834)。
- **调用后 spend：** 一次 MGET + 一次 pipeline；响应路径上不再回查 team/user/org — [PR #40841](https://github.com/BerriAI/litellm/pull/40841)。
- **启动：** 惰性加载 provider passthrough routes；先注册 liveness + 核心推理 routes — [PRs #40691](https://github.com/BerriAI/litellm/pull/40691)、[#40687](https://github.com/BerriAI/litellm/pull/40687)。
- **Redis：** 在 sync read 与 spend-counter 路径上保持开路的 circuit breaker 打开且安静（Redis 已知宕机后不再引发重试风暴）— [PR #40624](https://github.com/BerriAI/litellm/pull/40624)。
- **Policy engine：** 排序后单次扫描做 attachment 去重 — [PR #40883](https://github.com/BerriAI/litellm/pull/40883)。
- **Token accounting：** tiktoken `cl100k_base` admission tokens 走 Rust 路径 — [PR #40777](https://github.com/BerriAI/litellm/pull/40777)。
- **Bedrock passthrough：** 增量流式记账，而不是缓冲完整响应 — [PR #40724](https://github.com/BerriAI/litellm/pull/40724)。

这些说明里没有公布 req/s 或 p99 数字。运维可见的压力点：繁忙 Postgres 上 30s 的 credential/deployment 重载循环（[#40972](https://github.com/BerriAI/litellm/issues/40972)）。

## 5. 稳定性与回归

按生产网关的爆炸半径排序。多数条目更新于 2026-09-13。

### P1 — 正确性 / 安全策略绕过

1. **Guardrails 在 Anthropic `/v1/messages` 上看不到 MCP tools**  
   `pre_call` 中的 `custom_code` 与 `tool_permission` 会忽略非 Chat Completions 形态的 tools。Deny rules 对 `/v1/messages` 或 `/v1/responses` 永远不会触发。  
   [Issue #40583](https://github.com/BerriAI/litellm/issues/40583)（open，5 条评论）。  
   修复 PR：[**#41011**](https://github.com/BerriAI/litellm/pull/41011) — 在 pre_call 中共享 Anthropic tool-name reader。

2. **`chatgpt/` `gpt-5.6-sol`：`response.completed` 的 `output[]` 为空**  
   流式内容正常；终端事件为空，因此 Responses→completion 桥接抛出 `Unknown items in responses API response: []`。  
   [Issue #41009](https://github.com/BerriAI/litellm/issues/41009)（open），重复/关闭孪生 [#41017](https://github.com/BerriAI/litellm/issues/41017)。  
   修复 PRs：[**#41014**](https://github.com/BerriAI/litellm/pull/41014)（从 `output_item.done` 重建 `output[]`）、长期进行的 [**#31332**](https://github.com/BerriAI/litellm/pull/31332)。

3. **内部 LiteLLM 参数泄漏进 provider bodies**  
   GPT-5.4 chat + function tools 以 `Unknown parameter: 'model_alias_map'` 返回 400。  
   回移植 PR：[**#41018**](https://github.com/BerriAI/litellm/pull/41018)（`all_litellm_params` 注册）。相关：[PR #38266](https://github.com/BerriAI/litellm/pull/38266)（`ssl_verify` 也曾泄漏进 `extra_body`）。

4. **RestrictedPython 迁移后，custom-code HTTP 原语缺少 SSRF 控制。**  
   [PR #36983](https://github.com/BerriAI/litellm/pull/36983) 恢复 `_validate_url_for_ssrf()` + `follow_redirects=False`。在合入你所运行的分支之前，按未修复处理。

### P2 — 计费 / 缓存 / 索引正确性

5. **`/v1/embeddings` 在同一批次混有缓存与未缓存输入时出现重复 `index`** — HTTP 200，向量数量正确，索引错误。按 `data[i].index` 取数的 OpenAI 兼容客户端会把 embeddings 贴到错误输入上。  
   [Issue #41002](https://github.com/BerriAI/litellm/issues/41002)。

6. **`cache_params.supported_call_types` 无法关闭 embedding cache** — 去掉 `embedding` / `aembedding` 会被接受，但实际被忽略。  
   [Issue #41003](https://github.com/BerriAI/litellm/issues/41003)。

7. **Valkey semantic cache** 在两处 `_get_async_embedding()` 调用上转发的是 `**kwargs` 而不是 `metadata`。  
   [Issue #32324](https://github.com/BerriAI/litellm/issues/32324)（相关 #31610）。

8. **Vertex rerank 计费 / id 复用** — `search_units` 按截断响应计费；硬编码 response id 把 spend logs 折叠到一起。  
   [PR #35180](https://github.com/BerriAI/litellm/pull/35180)。

9. **Virtual key RPM 高于 team RPM 会被静默接受**，且永远不会生效（most-restrictive-wins）。  
   [Issue #40866](https://github.com/BerriAI/litellm/issues/40866)。

10. **Spend log 的 `session_id` 忽略调用方传入的 `litellm_session_id`。**  
    [PR #40856](https://github.com/BerriAI/litellm/pull/40856)（修复 #40851）。

### P3 — provider / 安装 / 可观测性

11. **Ollama custom prompt template** 省略 `initial_prompt_value` / `final_prompt_value` → 每个请求都 `KeyError`。  
    [Issue #39759](https://github.com/BerriAI/litellm/issues/39759)。

12. **自托管安装在 `prisma generate` 上失败**（`schema.prisma`）。虽旧但仍 open；7 条评论，4 个 👍。  
    [Issue #26097](https://github.com/BerriAI/litellm/issues/26097)。相关防护：[PR #35458](https://github.com/BerriAI/litellm/pull/35458)（DB 异常分类器中可选 prisma import）。

13. **未知 key 的 401 泄漏了表名以及所提交 key 的完整 SHA-256。**  
    [PR #39787](https://github.com/BerriAI/litellm/pull/39787) — 改为通用 `"Invalid API key provided."`

14. **`_get_user_agent_tags` 中的 User-Agent tag 提取区分大小写。**  
    [Issue #40979](https://github.com/BerriAI/litellm/issues/40979)。

15. **MCP gateway：** `x-litellm-tags` 在 `tools/list` 与 `tools/call` 上被忽略（[PR #35777](https://github.com/BerriAI/litellm/pull/35777)）；流中途 MCP `/v1/responses` 的 `AttributeError` 会掩盖真实错误并阻断 fallback（[PR #35425](https://github.com/BerriAI/litellm/pull/35425)）；协议层 JSON-RPC 拒绝未进入标准日志（[PR #31572](https://github.com/BerriAI/litellm/pull/31572)）。

16. **Responses API 转发不支持的 `reasoning.effort`**，且没有 chat completions 那套 GPT-5 capability checks。  
    [PR #38897](https://github.com/BerriAI/litellm/pull/38897)（修复 #38530）。

17. **通用 guardrail API 丢掉改写后的 `tool_calls`**，于是 Responses 警告 “no tool calls”。  
    [PR #41013](https://github.com/BerriAI/litellm/pull/41013)。

18. **请求的 kill switch** `LITELLM_DISABLE_RESPONSES_WEBSOCKET=true`，用于 `/v1/responses` 与 `/responses` WS。  
    [Issue #40591](https://github.com/BerriAI/litellm/issues/40591)。

19. **asqav audit-log callback**（已合并 PR #30238，6 月 23 日）从未进入任何发行。  
    [Issue #38383](https://github.com/BerriAI/litellm/issues/38383)。

`litellm_internal_staging` 上的 CI 也是红的（Postgres auth-prefetch vs 5s in-memory TTL、TQ003 lint、UI types）— [PR #41019](https://github.com/BerriAI/litellm/pull/41019)。

## 6. 对应用开发者意味着什么

**生产环境继续留在 v1.100.1**，除非你需要 1.102 的 OCR adapters 或鉴权/spend 的 MGET 工作。钉死 `ghcr.io/berriai/litellm:v1.100.1` 或 `pip install 'litellm[proxy]==1.100.1'`，并校验 cosign 签名。不要跟踪 `main-stable`；该 tag 已退役。

**如果你通过 LiteLLM guardrails 前置 Claude Code / Anthropic `/v1/messages` 或 MCP tools**，在 #41011 进入你的镜像之前，假定 `tool_permission` 并未真正生效。用网络层或 MCP-gateway 白名单作为第二道控制。

**如果你通过 `litellm.completion()` 调用 `chatgpt/gpt-5.6-sol`（或任何终端 `output[]` 为空的 Responses provider）**，成功流式之后仍会硬异常。优先走原始 `/v1/responses` 流式，或等待 #41014 / #31332。同类问题：流中途 MCP 错误可能抛 `AttributeError` 并跳过 fallbacks（#35425）。

**Embedding 客户端：** 不要在混合 cache-hit 批次上信任 `data[i].index`（#41002），也不要信任 `supported_call_types` 能关掉 embedding cache（#41003）。把缓存与未缓存输入拆开，或在这些修复落地前在 cache backend 侧关闭 embedding cache。

**Agent / tool 应用：** 不要假设仅 LiteLLM 使用的键（`model_alias_map`、`ssl_verify`、session ids）永远不会离开 proxy。#41018 与 #38266 的存在就是因为它们离开过。出站时，只有当你的 MCP 路径真正尊重 `x-litellm-tags` 时才设置它（在 gateway `tools/*` 上，直到 #35777 之前并不尊重）。

**成本与路由：** Mercury 2.5 的 cached-input tokens 在 #41016 合入前会错账。Vertex rerank 的 spend logs 可能塌缩成单一 id（#35180）。Auto-router savings headers 以及 Claude Code / Codex gateway-key CLI 配置在 rc.1 中（[#40792](https://github.com/BerriAI/litellm/pull/40792)、[#40829](https://github.com/BerriAI/litellm/pull/40829)、[#40330](https://github.com/BerriAI/litellm/pull/40330)），供你评估预发布版。

**运维：** 关注 #40624 之后的 Redis circuit-breaker 行为；key 基数高时提高 management-cache 上限（#40725）；把 30s DB 重载视为已知的负载发生器（#40972）。自托管 Prisma generate（#26097）仍是冷启动地雷。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-14

来源：[unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. 本周亮点

Unsloth 发布了 **v0.1.807-beta** 与 **v0.1.808-beta**，这是一次偏性能与稳定性的大版本：AMD 推理默认改走 **Vulkan**（相对 ROCm 约快 20%），diffusion 加速 **1.2–1.7×**，Windows 二进制已签名以减少 SAC/杀毒误报，团队称累计 **250+ 项修复**，Python/安装包体积缩小约 **60%**。

另一条主线是 Studio：多驻留 GGUF 进程、MCP 图片附件、OpenAI 形态的 `video_url` / MLX video、transformers 后端的 stop-text、API key 的 HF-token 隔离，以及更快的 `studio update`（跳过未变更依赖步骤、支持离线安装）。即便 beta 说明里已经落地 MLX 训练 / KV-cache 相关工作，Apple Silicon 仍是历时最久的开放需求（[#4](https://github.com/unslothai/unsloth/issues/4)，644 👍）。

## 2. 发布与破坏性变更

| Version | Date | Notes |
|---|---|---|
| [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta) | 2026-09-09 | 最新。Diffusion 1.2–1.7×；AMD 默认 Vulkan；已签名 Windows `llama-server.exe`；默认 PyTorch **2.11**（2.14 即将到来）；新 Docker 镜像；Codex 默认 **gpt-6-astra**。 |
| [v0.1.807-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta) | 2026-09-08 | 同一系列：AMD 默认 Vulkan；Strix/iGPU 乱码问题已向上游反馈；Windows 签名以减少 SAC 误报。 |

**迁移 / 运维说明**

- 安装器现已锁定 **PyTorch 2.11**；Windows 重装会保留受支持的 torch，而不会静默升级。额外标签：`cu126` / `cu128` / `cu130` + `torch2110` + xformers 0.0.35（[#6955](https://github.com/unslothai/unsloth/pull/6955)，[#7256](https://github.com/unslothai/unsloth/pull/7256)）。
- 官方镜像：[hub.docker.com/r/unsloth/unsloth](https://hub.docker.com/r/unsloth/unsloth)（NVIDIA Turing→Blackwell；原生 amd64/arm64）。ARM64 **仅 CPU** 镜像仍是 PR（[#10766](https://github.com/unslothai/unsloth/pull/10766)）。
- PyPI 仅发布 wheel（无 sdist）（[#10202](https://github.com/unslothai/unsloth/pull/10202)）；包体积缩小约 60%。
- Codex / OpenAI 路径：默认登录模型 **gpt-6-astra**；`/v1` 流式与音频输入有改进。Responses-API Codex + 本地 llama.cpp 文档被反馈过时（[#5141](https://github.com/unslothai/unsloth/issues/5141)，已关闭）。
- 并非硬性 API 破坏，但是行为变化：此前走 ROCm（或回退到 CPU）的 AMD 主机，现在会走 Vulkan，除非你显式锁定 ROCm。

## 3. 新模型与硬件支持

**后端 / 芯片**

- **AMD**：Strix Halo / Strix Point 以及无 ROCm 的 Linux iGPU 默认走 Vulkan；相对 ROCm，prefill+decode 号称快 **20%**；Strix Halo **prompt +23% / gen +8%**；BIOS 里给 iGPU 分配更多显存后，最高可达 **3×**。历史上的统一内存 OOM（[#6834](https://github.com/unslothai/unsloth/issues/6834)）以及「安装器显示 AMD、运行时却是 CPU」（[#8473](https://github.com/unslothai/unsloth/issues/8473)）已关闭。
- **Windows**：已签名 `llama-server.exe`；模型加载被拦截时，代码完整性报错更清晰。
- **Apple / MLX**：DoRA 以及更多 DPO loss；按对话分路的 batched generation 流式输出；量化 MLX KV cache 使 prompt 内存 **−74%**；gated-delta 训练最高快 **25%**；自愈 / 更新不再拖垮推理+训练。完整 Apple Silicon 训练路径仍在「路线图」上（[#4](https://github.com/unslothai/unsloth/issues/4)）。
- **Intel Arc B580**：`torch.xpu.memory.mem_get_info()` 导入崩溃（[#3533](https://github.com/unslothai/unsloth/issues/3533)）已关闭。
- **Docker**：NVIDIA 镜像覆盖 Turing→Blackwell；已有 ARM64 GPU 镜像；仅 CPU 的 ARM64 仍在提案中（[#10766](https://github.com/unslothai/unsloth/pull/10766)）。

**模型 / 模态（Studio + 核心）**

- Hermes 检测；Blender MCP；用纯文本数据集做多模态微调（MLX）。
- 开放中的 PR：MLX 视频片段（[#10480](https://github.com/unslothai/unsloth/pull/10480)）、`/v1/chat/completions` 上的 OpenAI `video_url` 部件（[#10439](https://github.com/unslothai/unsloth/pull/10439)）、MCP 已批准图片附件（[#10871](https://github.com/unslothai/unsloth/pull/10871)）。
- Q-GaLore 选项按 **名称** 传给 bitsandbytes（修复 bnb 0.50.2 上被冻结的投影参数）（[#10874](https://github.com/unslothai/unsloth/pull/10874)）。
- Issue 里仍较吵的问题：Qwen3-Coder-Next-Base 在 2×A100 上 QLoRA OOM（[#4040](https://github.com/unslothai/unsloth/issues/4040)，已关闭/修复中）、Nemotron attention（[#7527](https://github.com/unslothai/unsloth/issues/7527)，开放）、Qwen3.8 GGUF 重载后长对话 prefill（[#9037](https://github.com/unslothai/unsloth/issues/9037)）。

## 4. 性能与优化

来自 [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta) 的具体数字：

- Diffusion INT8/FP8：**1.2–1.7×**
- AMD vs ROCm（Vulkan）：**约 20%**
- Strix Halo：prompt 处理 **+23%**，生成 **+8%**
- Apple gated-delta 训练：最高 **+25%**
- 量化 MLX KV：prompt 内存最高 **−74%**
- `studio update`：宣传约 **2×**；依赖步骤在证据仍有效时跳过（[#10649](https://github.com/unslothai/unsloth/pull/10649)）；标记匹配时跳过对 llama.cpp / whisper.cpp / Node 的再校验（[#10648](https://github.com/unslothai/unsloth/pull/10648)）；PyPI 不可用时配合 `UV_OFFLINE` 保留已校验安装（[#10651](https://github.com/unslothai/unsloth/pull/10651)）
- 包 / 二进制：缩小约 **60%**
- 卸载时的 diffusion 主机 RAM 泄漏已修复（[#10184](https://github.com/unslothai/unsloth/pull/10184)）

**进行中（性能 / 服务）**

- 多个驻留 GGUF 模型，各自独立 `llama-server`（[#10876](https://github.com/unslothai/unsloth/pull/10876)）
- `--tensor-split` 被忽略（[#10355](https://github.com/unslothai/unsloth/issues/10355)，开放）
- Compaction / rolling context 此前已预览；请求已关闭（[#7472](https://github.com/unslothai/unsloth/issues/7472)）
- 多 GPU 微调仍是长期需求（[#1707](https://github.com/unslothai/unsloth/issues/1707)，历史上已关闭；官方 DDP 在旧说明里仍标「初步」）

## 5. 稳定性与回归

按运维影响排序。807/808 这一波关掉了大量老 bug；若干 Studio 服务问题仍开放。

**高**

- AMD 统一内存 / CPU 回退一类问题在本系列版本中已关闭（[#6834](https://github.com/unslothai/unsloth/issues/6834)，[#8473](https://github.com/unslothai/unsloth/issues/8473)，[#5807](https://github.com/unslothai/unsloth/issues/5807)）。请重测 Vulkan 路径；Strix/iGPU 乱码已向 AMD 反馈。
- Qwen3-Coder-Next-Base **在 2×A100 上 QLoRA OOM**（[#4040](https://github.com/unslothai/unsloth/issues/4040)）——已关闭，状态为「正在修复」；不要假设 80B 级 MoE 上的多 GPU QLoRA 已经安全。
- Studio：即便勾选「不要预留系统内存」，满显存加载 GGUF 后系统 RAM 仍不释放（[#9033](https://github.com/unslothai/unsloth/issues/9033)，开放）。
- Studio + vLLM：Desktop 0.1.807-beta 上拒绝 `min_p` / `logit_bias`（[#10573](https://github.com/unslothai/unsloth/issues/10573)，开放）。

**中**

- 长 GGUF 对话在重载后丢失可复用 prompt 状态 → **完整 prefill 约 11 分钟**（[#9037](https://github.com/unslothai/unsloth/issues/9037)）。
- 工具批准等待会占住一个服务槽位，堵住排队中的对话（[#10671](https://github.com/unslothai/unsloth/issues/10671)）。
- `--tensor-split` 被忽略（[#10355](https://github.com/unslothai/unsloth/issues/10355)）。
- Nemotron attention 处理（[#7527](https://github.com/unslothai/unsloth/issues/7527)）。
- API key 可能继承 **服务器的 Hugging Face 登录** 去拉私有模型——修复 PR 开放中（[#10809](https://github.com/unslothai/unsloth/pull/10809)）。若用共享 API key 对外暴露 Studio，按租户隔离缺陷处理。
- Transformers 后端忽略 `stop` 序列——修复 PR（[#10812](https://github.com/unslothai/unsloth/pull/10812)）。
- Agent 在编辑文件后跳过一条命令（重复调用缓存）——修复 PR（[#10810](https://github.com/unslothai/unsloth/pull/10810)）。
- 多轮确定性冒烟在 merge base 上不稳定（[#10004](https://github.com/unslothai/unsloth/issues/10004)，已关闭）；探测已钉到确定性后端（[#10234](https://github.com/unslothai/unsloth/pull/10234)）。

**较低 / 训练正确性（本窗口内大多已关闭）**

- Qwen2/Kaggle 上的 `slice_indices` NameError（[#3450](https://github.com/unslothai/unsloth/issues/3450)）
- Gemma 3n 递归深度（[#3650](https://github.com/unslothai/unsloth/issues/3650)）
- prompt-completion 数据集 vs TRL（[#3399](https://github.com/unslothai/unsloth/issues/3399)）
- VLM 视频上的 `fetch_video` NameError（[#3086](https://github.com/unslothai/unsloth/issues/3086)）
- Phi-3.5/4 上全标签 `-100` / ZeroDivision（[#2364](https://github.com/unslothai/unsloth/issues/2364)，[#2497](https://github.com/unslothai/unsloth/issues/2497)）
- Eval loss 卡住不变（[#1067](https://github.com/unslothai/unsloth/issues/1067)，仍开放）
- 单 token / 二分类 loss → 0（[#946](https://github.com/unslothai/unsloth/issues/946)，开放，适合新手）
- Studio 中 GGUF 导出失败（[#4845](https://github.com/unslothai/unsloth/issues/4845)，已关闭）
- `api-only` + `tunnel_only` 下 Desktop SPA 在 loopback 上 404——修复 PR（[#10847](https://github.com/unslothai/unsloth/pull/10847)）

## 6. 对应用开发者意味着什么

1. **若你在 AMD 或 Windows 上，把 Studio/Desktop 升到 0.1.808-beta。** Vulkan 默认与签名二进制会同时改变速度，以及「为什么跑在 CPU / 为什么 SAC 隔离了 llama-server」这类支持负担。请重新打基准；不要假设旧的 ROCm 标志仍然生效。
2. **把 Studio 当成多后端网关，而不是薄薄一层 llama.cpp 封装。** 即将合入的 PR 会加入驻留多模型路由（[#10876](https://github.com/unslothai/unsloth/pull/10876)）、OpenAI `video_url`、MLX video、MCP 图片，以及 transformers 上正确的 `stop`。如果你走 OpenAI `/v1/chat/completions`，等这些 PR 合入后再钉版本，或自己保留兼容层。
3. **在 [#10809](https://github.com/unslothai/unsloth/pull/10809) 进正式版本之前，不要让不受信任的 API key 共用同一个 Studio 进程。** Key 可能挂到主机的 HF 登录上去训练。
4. **长上下文 / Agent 栈：** compaction 已有预览，但重载仍会打爆 prompt cache（[#9037](https://github.com/unslothai/unsloth/issues/9037)），工具批准也可能堵住整条队列（[#10671](https://github.com/unslothai/unsloth/issues/10671)）。请自备外部会话存储；不要依赖进程内 KV 在模型重载后继续复用。
5. **微调路径：** PyTorch 2.11 + 更小的 wheel 是新基线。多 GPU 与 80B 级 QLoRA 仍是尖角（[#1707](https://github.com/unslothai/unsloth/issues/1707)，[#4040](https://github.com/unslothai/unsloth/issues/4040)）。优先单卡 QLoRA，或等明确的 DDP 指引。Q-GaLore 用户在信任 bnb 0.50.2 之前应先拉 [#10874](https://github.com/unslothai/unsloth/pull/10874)。
6. **服务拓扑：** 若需要张量并行 GGUF，请自行验证 `--tensor-split`（[#10355](https://github.com/unslothai/unsloth/issues/10355)）。对 vLLM sidecar，在 [#10573](https://github.com/unslothai/unsloth/issues/10573) 落地前，预期会有采样参数不匹配。
7. **CI / 离线环境：** 使用 `UV_OFFLINE` 以及「已校验则跳过」的安装器 PR（[#10651](https://github.com/unslothai/unsloth/pull/10651)，[#10649](https://github.com/unslothai/unsloth/pull/10649)），避免 `studio update` 反复打 PyPI。Turing–Blackwell 训练机最干净的路径是新的 Docker tag。

**下一步关注：** 多驻留 GGUF、MCP 图片输入、HF-token 隔离 PR 的合入；确认 Vulkan AMD 在 Strix Halo 128 GB 统一内存上是否正确；以及 Qwen3-Next 80B QLoRA OOM 的后续跟进。

---

</details>