# AI 基础设施周报 2026-08-30

> 生成时间: 2026-08-30 07:55 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# AI 基础设施跨项目对比 — 2026-08-30

窗口：vLLM **v0.28.0**（26 Aug）以及 vLLM、SGLang、llama.cpp、Ollama、LiteLLM 和 Unsloth 的 24 小时仓库活动。

---

## 1. 生态概览

本周技术栈处于同一批两个模型家族的中期节奏：**Kimi-K3 / DeepSeek-V4** 是生产性能目标，**GLM-5.3-Flash / Qwen3.8-Flash-Next** 则是 day-0 混合稀疏 + 线性注意力竞赛。集群引擎（vLLM、SGLang）已发布或正在落地内核级成果——合并 all-gather、DCP、融合 FlashKDA、HiCache、PD 连接器——而本地运行时（llama.cpp、Ollama、Unsloth）则在 Metal、Vulkan、MLX 以及 1-bit GGUF 卸载上追逐同一批架构。网关（LiteLLM）并不在内核上竞争；它们在吸收 Anthropic `/v1/messages` 保真度、计费正确性，以及同一批 Flash 模型的注册表行。运维图景并不均匀：**稳定钉扎版本存在**（vLLM 0.28.0、SGLang 0.5.18、Ollama 0.33.2、LiteLLM 1.98.0），但 Flash 服务仍是 recipe / nightly / beta，而 GB10 / DGX Spark（sm_121）、Ada 4090 和 Strix Halo HIP 是最尖锐的硬件边缘。投机解码（DSpark / DFlash / MTP / EAGLE）无处不在，在并发或量化下仍未达到生产安全。

---

## 2. 活动对比

精确的 24 小时 GitHub issue/PR 总量仅对 LiteLLM 公开发布。其余行使用各 digest 实际报告的数字（发布窗口内的 commits/PRs，外加 24 小时发布节奏）。

| Project | Latest stable | In-window tags | Reported activity | Release posture |
|---|---|---|---|---|
| **vLLM** | [v0.28.0](https://github.com/vllm-project/vllm/releases/tag/v0.28.0) (26 Aug) | + `v0.28.1rc0` (27 Aug) | **584 commits / 270 contributors**（76 first-time）in 0.28.0；day-0 Flash PRs 仍开放 | 生产钉扎 0.28.0；Flash 模型是 recipe 镜像，不是 `main` |
| **SGLang** | [v0.5.18](https://github.com/sgl-project/sglang/releases/tag/v0.5.18) (21 Aug) | 过去 24h 无 tag；nightly `20260829` | **710 PRs / 212 contributors**（61 first-time）in 0.5.18；CI：2 broken，8 flaky，876 recently fixed | 保守钉扎 0.5.18；Flash / HiCache 仅在 `0.5.19.dev` 且需 soak |
| **llama.cpp** | [v0.3.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0) (25 Aug) | Nightlies **b10681–b10690** | 后端向 nightlies（Metal FA-vec、OpenCL Adreno、SYCL `--fit`、Vulkan `mul_mat_id`） | 按后端钉扎，不按日历；无公开 API break |
| **Ollama** | [v0.33.2](https://github.com/ollama/ollama/releases/tag/v0.33.2) (27 Aug) | v0.33.1 (26 Aug) → v0.33.2 (27 Aug) | 两次面向 desktop / Claude Desktop 的补丁发布 | 消费端节奏快；无文档化 API break |
| **LiteLLM** | [v1.98.0](https://docs.litellm.ai/release_notes/) (22 Aug) | `v1.100.0-rc.1`、`v1.99.0-rc.2`、`v1.100.0-dev.{1,2}` | **93 issues + ~500 PRs** 在窗口内被触及 | 生产停留 1.98.0；RC 仅用于 Anthropic / cache-savings 修复 |
| **Unsloth** | `v0.1.804-beta` | 0.1.802–0.1.804-beta | **~170 PRs** in 0.1.803-beta；0.1.804 中 100+ chat/可靠性/性能改动 | Beta 是 Flash 模型底线；更旧的 llama.cpp 拒绝 `qwen4exp` |

**读法：** LiteLLM 的控制面 churn 最高。vLLM 和 SGLang 拥有最大的 *发布批次* 贡献者基数。llama.cpp 的 *二进制* 节奏最密。Ollama 和 Unsloth 是在把同一批模型产品化到桌面/本地，而不是在集群内核上竞争。

---

## 3. 模型支持竞赛

本周目标模型：**GLM-5.3-Flash**、**Qwen3.8-Flash-Next**，外加残余的 **Kimi-K3 / DeepSeek-V4** 加固。

| Model / family | vLLM | SGLang | llama.cpp | Ollama | Unsloth | LiteLLM |
|---|---|---|---|---|---|---|
| **GLM-5.3-Flash** | Day-0 PR [#53906](https://github.com/vllm-project/vllm/pull/53906)（open，recipe 镜像 `glm53-flash-cu129`）；ROCm `gate_score` 缺失；**Ada sm_89 上无 sparse-MLA** | Day-0 镜像存在；**FP8 KV 被挡住**，GB10 prefill >~40k 会打死 worker | Sparse flash-attn PR 评审中 | 请求开放 [#17741](https://github.com/ollama/ollama/issues/17741)；cloud + Claude Code 400s | **已随** 0.1.804-beta 发布（1-bit ~93GB，1M ctx） | Friendli 注册表行 + 定价 |
| **Qwen3.8-Flash-Next** | Day-0 PR [#53896](https://github.com/vllm-project/vllm/pull/53896)（open）；PLE CPU offload 在 TP=1 GB10 上死锁 | Qwen3-8B-Domino 的 Domino / DFlash V2 路径；Flash-Next 不是头条 | Qwen4 / Flash-Next indexer + LoRA→GGUF 评审中 | **MLX 已随** 0.33.1 发布；cloud 请求已关闭 | **已发布**（1-bit 跑在 75GB RAM，n-gram mmap） | 经注册表路由，不是运行时 |
| **Kimi-K3 / DSv4** | **0.28.0 的生产故事**（DCP、FlashKDA、shared-expert sharding）；Kimi-K2.6 reasoning 仍会乱码 | MI355X 上 K3 **1.37–1.77×** 吞吐；DSv4 LMHead 320µs → 169µs | Sparse FA + DFlash2 NVFP4 scales 评审中；gfx1151 上 HIP 损坏 | 不是本周出货重点 | 不是本周出货重点 | Kimi K2.7 Code 定价行 |
| **Diffusion / image** | Orthrus speculative decode WIP | FLUX.2 NVFP4 FF fusion、Qwen-Image TP、GLM-Image AR/DiT overlap | mtmd 的 audio-out 仍仅停留在设计 | — | — | grok-imagine 注册表；`/images` 仍 flaky |
| **Local 1-bit / GGUF** | N/A（GPU serving） | N/A | 架构支持进行中 | MLX + llama.cpp bump | **领先** — Dynamic 1-bit GGUF + Studio | N/A |

**谁领先**

- **集群 GPU 上的 Flash 模型服务：** vLLM 与 SGLang 在 *意图* 上打平，两边都不稳定。vLLM 有官方 recipe 和 Docker tag；SGLang 有具名镜像，以及更多开放的生产阻塞项（FP8 KV、GB10 静默死亡）。
- **规模化的 Kimi-K3 / DeepSeek-V4：** vLLM 0.28.0 是你可以真正钉扎的发布。SGLang 0.5.18 已在带 tag 的构建里给出 AMD 和 LMHead 数字。
- **消费端 / 统一内存 Flash：** Unsloth 0.1.804-beta 最先宣称能在 75GB RAM 上跑 1-bit Qwen-Flash、在约 102GB 合计内存上跑 GLM-Flash。Ollama 仅在 MLX 上有 Qwen-Flash。llama.cpp 是两者共同封装的后端，仍在合并 indexer / sparse-FA / NVFP4-scale 补丁。
- **网关覆盖：** LiteLLM 今天就能 *路由并定价* Friendli GLM-5.3 / Flash；这并不等于由它来 serving。

除 Unsloth 明确标为 beta 的本地路径外，把 Flash 一律当作 **recipe + soak**，而不是机群默认。

---

## 4. 性能前沿

优化集中在五处。它们不是同一个问题。

**KV cache、前缀复用与长上下文**  
SGLang 的重心是 **HiCache / Unified Cache / PD consistency**（decode retraction leak、chunked-prefill radix、write-through 仍覆盖不了第一次 extend > `chunked_prefill_size`）。vLLM 默认启用了 **Mamba prefix cache**，把 `max_num_batched_tokens` 从 8k 提到 **16k**，同时在打 hybrid GDN + MTP 的 cache miss，以及 DFlash2 + YaRN 在 1.04M prompt 上的零复用。llama.cpp 在 llama-server 里把 `-c` 扩到训练窗口之外仍被挡住。Unsloth 把 **重复（“无限”）compaction** 做成了一等公民路径。

**量化**  
当前活着的格式是 **FP8 KV、NVFP4、MXFP4/MXFP8、W4A8、1-bit Dynamic GGUF**。赢面：vLLM Hopper FP8 group-128 快路径以及 FlashInfer SM90 MXFP4×FP8 融合 MoE；SGLang 在 AMD 上 NVFP4→MXFP4；Unsloth 的 1-bit Flash GGUF（比 BF16 小 79–85%）。悬崖：SGLang 的 MXFP8 在 B200/GB200 上跑 Qwen3-30B-A3B 比 BF16 更慢；FlashInfer NVFP4 MoE tile-192 在 `0.6.16rc4` 之后出现 **NaNs**；vLLM 量化 DFlash drafter 可能 **静默损坏**；llama.cpp 的 NVFP4 DFlash draft 在没有 scales 时接受约 0 tokens。

**投机解码**  
每个引擎都在出变体（DSpark、DFlash/DFlash2、MTP、EAGLE、Ngram、Domino、Orthrus）。可测到的上行存在——vLLM adaptive spec **约 60% 更好的 DSpark TTFT**——但本周 P0/P1 清单被 spec+quant 与 spec+concurrency 主导：vLLM 在切片权重上的 fused-KV `F.linear`；llama.cpp 在 `-np N` 下 draft-MTP acceptance **0.0**；SGLang `fast_topk_v2` 在 k=2048 时集合错误；多节点 DSpark TP 死锁（诊断后已关闭，仍是一类故障）。

**分布式 serving 与解聚合**  
vLLM：DCP、合并 all-gather **1.5–3×**、shared-expert sharding **~17 GiB/GPU**、NIXL DCP-for-MLA **今天回滚**。SGLang：跨 Mooncake / NIXL / Mori 的 PD 协议统一仍开放；粘滞的 `failed_sessions` 被标为已关闭。这一层比它的契约走得更快。

**本地内核与卸载**  
llama.cpp：面向 M1 Max / M2 / M4 Pro 的 Metal FA-vec 表、OpenCL Adreno GEMM、Vulkan `mul_mat_id` K-padding、SYCL 峰值显存 `--fit`。Unsloth 宣称 **5× RAM-offload inference**；社区反证说智能 `-ot` planner 在 6 核桌面上 40/43 个格子输给了 `--fit on`。Ollama 的瓶颈不在内核——是 **MLX prefix-cache RSS**（硬编码 8 GiB 预算）以及 iGPU/Vulkan 分配。

**本周正在失败的硬件：** vLLM 与 SGLang 上的 GB10 / DGX Spark（sm_121）；GLM-Flash sparse-MLA 上的 Ada 4090；Strix Halo HIP（llama.cpp 请用 Vulkan）；GLM 与 NVFP4 MoE 上的 FlashInfer 版本钉扎。

---

## 5. 分层定位

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
| **Cluster inference engine** | vLLM, SGLang | 吞吐、MoE/MLA 内核、PD、100k–1M tokens 的 prefix cache、多节点 | 桌面 UX、仅 RAM 的 1-bit Flash、计费/路由 |
| **Local runtime / ggml** | llama.cpp | 可移植后端（Metal、Vulkan、SYCL、OpenCL、CUDA、HIP）、GGUF、nightlies | 机群自动扩缩、Anthropic 协议翻译 |
| **Local product runtime** | Ollama | 一键模型、MLX、Claude Desktop 代理、结构化输出 | 生产 PD、自定义 MoE 内核、多租户计费 |
| **Local train + serve studio** | Unsloth | Day-0 1-bit Flash GGUF、RAM 卸载、compaction、Studio agent host、QLoRA/GRPO | 多节点 serving、租户规模的 OpenAI 兼容网关（SQLite 死锁） |
| **Gateway** | LiteLLM | Provider 翻译、路由、花费、MCP、护栏、模型注册表 | 内核、KV 布局、GPU 内存规划 |

**互补，不要互相替代。** 典型的 2026 技术栈是：用 Unsloth 或 llama.cpp 做本地 Flash 实验，用 vLLM *或* SGLang 跑 GPU 机群（同一模型家族在 Flash PR 合并前不要两边一起上），前面用 LiteLLM 接 Claude/Codex/MCP，Ollama 只放在开发者笔记本 / Claude Desktop 路径上。

---

## 6. 趋势信号

**1. 混合稀疏 + 线性注意力 Flash 是新的 day-0 契约。**  
GLM-5.3-Flash 和 Qwen3.8-Flash-Next 在几天内出现在每一层。瓶颈不再是「架构是否存在于引擎中」——而是 **注意力选择**（sparse-MLA、FlashMLA、DSA）、**PLE / n-gram 表放置**，以及 **哪张 SKU 真正能跑**（不是 Ada 4090，也不是不加上限的 GB10）。

**2. 投机解码既是功能，也是一类可靠性问题。**  
接受率依赖工作负载阶段。Agent 流量（短轮次、工具、混合前缀）恰恰是深度投机浪费 draft/verify 或与 D2H 竞态的地方。把 MTP/DFlash/DSpark 挡在接受率健康检查后面；没有 golden prompt 集就不要开量化 drafter。

**3. 解聚合 PD 与 KV 连接器不是稳定 API。**  
vLLM 在本窗口回滚了 NIXL DCP-for-MLA。SGLang 仍在统一 Mooncake / NIXL / Mori 的失败信号（默认 NIXL 等待 300s）。把布局 RFC 当成研究契约。

**4. 本周内存层级打败了原始 FLOPs。**  
shared-expert sharding、PLE CPU offload、HiCache write-through 上限、Unsloth SSD-mmap n-grams、Ollama 的 8 GiB MLX prefix cache、llama.cpp 为 host MoE experts 做的 GPU-resident LRU——这些全是「工作集住在哪」，不是「GEMM 有多快」。

**5. Agent 协议正确性挪到了网关和解析器。**  
LiteLLM 的 P0 是 empty-content sanitizer 回声、MCP auto-execute 偷走 Claude Code 工具，以及丢掉的流式 `usage`。llama.cpp 的 Qwen thinking+tools `peg-native` 解析器在文本出现在 `<tool_call>` 之前时仍会失败。Ollama 在仅工具历史（`no user query found`）上打 500。引擎能解码；产品死在消息形态上。

**6. 消费级硅片是一等（且正在失败的）目标。**  
Apple FA-vec 表、Adreno OpenCL、MLX Flash-Next、Strix Halo Vulkan-vs-HIP、GB10 统一内存死亡、Jetson Gemma4 炸机。机群软件渗到笔记本和 APU 的速度，快过这些后端变正确的速度。

### Agent / 应用开发者该盯什么

1. **按层钉扎。** 机群：vLLM **0.28.0** 或 SGLang **0.5.18**。网关：LiteLLM **1.98.0**。笔记本：Ollama **0.33.2**，或需要 Flash GGUF 时用 Unsloth **0.1.804-beta**。不要因为模型卡写着 “day-0” 就晋升 RC/nightly。
2. **Flash 单独 soak。** 使用已发布的 recipe 镜像（`vllm/vllm-openai:glm53-flash-cu129`、`lmsysorg/sglang:glm-5.3-flash`）。vLLM GLM 钉扎 FlashInfer **0.6.18**；SGLang NVFP4 MoE tile-192 **不要超过** `0.6.16rc4`。
3. **给 GB10 / Ada 设上限。** SGLang GLM-Flash 的 prefill 远低于 40k；GLM sparse-MLA 跳过 Ada 4090；单卡 GB10 上在 warmup 死锁关闭前避免 `VLLM_PLE_CPU_OFFLOAD=1`。
4. **默认不要信任 LoRA、prefix cache 或 spec。** vLLM LoRA 前缀不匹配会 fail-open 到基座模型。Hybrid GDN+MTP 与 DFlash2+YaRN 可能报告它们并没有拿到的 cache hit。在 CI 里断言 logits 或 canary token。
5. **拆开 MCP 别名。** 永远不要把 `require_approval: "never"` 的 MCP auto-execute 放在 IDE 对话的同一个 LiteLLM 模型上。
6. **在流外对账成本。** LiteLLM 可能在最后一块仍带 `choices` 的 SSE chunk 上丢掉 `cached_tokens`。按 `/user/daily/activity` 或供应商账单计费，不要按 `/v2/user/info.spend`。
7. **在 AMD APU 上，llama.cpp 优先 Vulkan 而不是 HIP**，直到 gfx1151 损坏关闭。
8. **盯下周的合并清单，而不是模型官宣：** vLLM Flash PRs #53906 / #53896、Kimi-K2.6 reasoning #42426、LiteLLM Claude placeholder #34822、SGLang FP8 KV #36830、llama.cpp draft-MTP #27572 与 DFlash NVFP4 scales #28000、Unsloth SQLite/reaper #9008 / #9997。

行业不再等待新的模型家族。它在等待 **第二种实现**——那种不会把 reasoning 搞乱码、不会在 warmup 死锁、不会错过 prefix cache、也不会按未缓存费率计费的实现。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

我会拉取完整的 v0.28.0 发行说明和近期仓库动态，以确保摘要完整准确。
正在获取完整的 v0.28.0 说明以及两个 day-0 模型 PR，以确保硬件与破坏性变更细节准确。
# vLLM Digest — 2026-08-30

来源：[vllm-project/vllm](https://github.com/vllm-project/vllm)。覆盖窗口为 **v0.28.0**（released 26 Aug）以及过去 24 hours 内更新的 issues/PRs。

## 1. This Week's Highlights

**v0.28.0** 合入了来自 270 位贡献者（其中 76 位首次贡献）的 584 个 commits。本次发布是一轮 Kimi-K3 / DeepSeek-V4 性能周期：Decode Context Parallel、fused FlashKDA、combined all-gathers（kernel 加速 1.5–3×）、DSpark TTFT 提升约 60%，以及可选 shared-expert sharding 带来的约 17 GiB/GPU。

两个混合稀疏 + 线性注意力 Flash 模型的 Day-0 工作紧随其后落地：**GLM-5.3-Flash** ([#53906](https://github.com/vllm-project/vllm/pull/53906)) 与 **Qwen3.8-Flash-Next** ([#53896](https://github.com/vllm-project/vllm/pull/53896))。二者仍处于 open/needs-rebase，并暴露出 ROCm、Ada、GB10/sm_121 以及分离式 PD 上的真实缺口。请将它们视为 recipe images，而非稳定的 `main`。

## 2. Releases & Breaking Changes

**[v0.28.0](https://github.com/vllm-project/vllm/releases/tag/v0.28.0)** — 26 Aug 2026（tag `2cf0a69`）。后续 tag **[v0.28.1rc0](https://github.com/vllm-project/vllm/releases)** 已存在（27 Aug）；生产环境仍应钉在 0.28.0。

**默认变更（行为，非 API）：**
- `max_num_batched_tokens`: 8192 → **16384** ([#51726](https://github.com/vllm-project/vllm/pull/51726))
- Prefix caching 对 **Mamba** 模型**默认开启** ([#50991](https://github.com/vllm-project/vllm/pull/50991))
- Blackwell CUDA-graph capture 默认值提升至 **1024** ([#49390](https://github.com/vllm-project/vllm/pull/49390))

**破坏性变更 / 迁移：**
- **bitsandbytes 已移出树内** — 请安装 plugin；in-tree BNB 已移除 ([#43529](https://github.com/vllm-project/vllm/pull/43529))
- 要求 **Transformers ≥ 5.15.0** ([#51668](https://github.com/vllm-project/vllm/pull/51668))
- 移除 `calculate_kv_scales` 运行时 KV-scale 路径 ([#49389](https://github.com/vllm-project/vllm/pull/49389))
- 移除 `override_attention_dtype` ([#48684](https://github.com/vllm-project/vllm/pull/48684))
- 客户端可见的 `reasoning_content` 输出发生变更 ([#50624](https://github.com/vllm-project/vllm/pull/50624))
- KV offload 指标由 `*_block_*` 重命名为 `*_chunk_*` ([#52812](https://github.com/vllm-project/vllm/pull/52812))
- 移除遗留 MoE 代码 ([#51078](https://github.com/vllm-project/vllm/pull/51078))

示例正在将 `torch_dtype` 切换为 `dtype`，以对齐 Transformers 4.56+/5.x ([#54398](https://github.com/vllm-project/vllm/pull/54398)，closed)。

## 3. New Model & Hardware Support

**已进入 0.28.0（稳定）：** Muse Glimmer ([#51655](https://github.com/vllm-project/vllm/pull/51655))；Ling 3.0 Flash BF16/MTP/parser + FP8 + hybrid MXFP4 experts ([#51045](https://github.com/vllm-project/vllm/pull/51045)，[#51265](https://github.com/vllm-project/vllm/pull/51265)，[#52114](https://github.com/vllm-project/vllm/pull/52114))；Dots3 NOTE multimodal ([#51255](https://github.com/vllm-project/vllm/pull/51255))；Interns2mobius ([#51149](https://github.com/vllm-project/vllm/pull/51149))。Qwen3.8 on ROCm ([#50068](https://github.com/vllm-project/vllm/pull/50068))。Transformers backend 新增 MLA、hardware-agnostic defs、generalized embeddings、logit softcapping。

**正在落地（开放 PR，recipe images）：**

| Model | PR | Notes |
|---|---|---|
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) (`glm5_next`) | [#53906](https://github.com/vllm-project/vllm/pull/53906) | 需要 FlashInfer **0.6.18**。官方 recipe：[recipes.vllm.ai/zai-org/GLM-5.3](https://recipes.vllm.ai/zai-org/GLM-5.3)。镜像 `vllm/vllm-openai:glm53-flash-cu129`。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | [#53896](https://github.com/vllm-project/vllm/pull/53896) | 125B / 6B active + 51B N-gram table；原生 262K，经 YaRN 可达 1M。镜像 `vllm/vllm-openai:qwen38-flash-next`。用 `VLLM_PLE_CPU_OFFLOAD=1` offload table。 |

**进行中的硬件 / 后端：**
- Kimi-K3 on **ROCm + Model Runner V2** ([#51653](https://github.com/vllm-project/vllm/pull/51653))；DeepSeek-V4 sparse MLA on **gfx11 / gfx950** ([#47017](https://github.com/vllm-project/vllm/pull/47017)，[#52212](https://github.com/vllm-project/vllm/pull/52212))
- FlashInfer SM90 MXFP4×FP8 fused MoE (`--moe-backend flashinfer_cutlass_humming`) ([#54032](https://github.com/vllm-project/vllm/pull/54032))
- ROCm dual-stream decode + hipgraphs ([#52033](https://github.com/vllm-project/vllm/pull/52033))
- AMD Quark **NVFP4** for DeepSeek-V4 ([#47972](https://github.com/vllm-project/vllm/pull/47972))
- Orthrus diffusion-mode speculative decode（WIP）([#53753](https://github.com/vllm-project/vllm/pull/53753))
- P2P NIXL + CPU EC connector ([#47941](https://github.com/vllm-project/vllm/pull/47941))
- GLM-5.3-Flash on ROCm gfx950 仍缺少 `SparseAttnIndexerKpool.forward_hip()` 中的 `gate_score` ([#53943](https://github.com/vllm-project/vllm/issues/53943))；**Ada sm_89 / RTX 4090** 上尚无 sparse-MLA 路径 ([#54059](https://github.com/vllm-project/vllm/issues/54059))

Rust frontend 仍为实验性（`VLLM_USE_RUST_FRONTEND=1`）；功能对等路线图仍开放 ([#44280](https://github.com/vllm-project/vllm/issues/44280))。

## 4. Performance & Optimization

**已随 0.28.0 发布（Kimi-K3 / DSv4）：**
- Combined all-gathers：**1.5–3×** kernel 加速 ([#51070](https://github.com/vllm-project/vllm/pull/51070))
- Adaptive speculative token budget：DSpark TTFT 提升 **约 60%** ([#51725](https://github.com/vllm-project/vllm/pull/51725))
- Shared-expert sharding：**约 17 GiB/GPU** ([#50912](https://github.com/vllm-project/vllm/pull/50912))
- DCP ([#50484](https://github.com/vllm-project/vllm/pull/50484))；fused FlashKDA decode/prefill ([#50654](https://github.com/vllm-project/vllm/pull/50654)，[#51311](https://github.com/vllm-project/vllm/pull/51311)，[#52458](https://github.com/vllm-project/vllm/pull/52458))
- DFlash2（local conv + candidate selector）([#52816](https://github.com/vllm-project/vllm/pull/52816))；DSpark confidence-scheduled verification ([#47808](https://github.com/vllm-project/vllm/pull/47808))
- Sparse MLA E2E，覆盖 plain decode、MTP 与 DSpark ([#51538](https://github.com/vllm-project/vllm/pull/51538))

**本窗口内进行中：**
- Native CUDA AttnRes 作为 Kimi-K3 dense `hidden_size=7168` 的 SM100 默认实现 ([#54261](https://github.com/vllm-project/vllm/pull/54261))
- Hybrid GDN 在 MTP 下的 prefix-cache hits ([#52244](https://github.com/vllm-project/vllm/pull/52244)) — Qwen3.5-122B-A10B 在 prompt 长度为 hash unit 整数倍时目前会 miss cache
- Hopper FP8 group-128 quantization fast path（register-resident，`group_size==128`）([#46541](https://github.com/vllm-project/vllm/pull/46541)，closed)
- PTX 9.4 `ldmatrix.s8.s4` for W4A8-INT8 ([#49529](https://github.com/vllm-project/vllm/issues/49529))
- INT8 KV-cache quantization 请求仍开放（目前仅 FP8）([#33480](https://github.com/vllm-project/vllm/issues/33480)，12 👍)
- Adaptive DSpark bring-up tracker ([#51303](https://github.com/vllm-project/vllm/issues/51303))；per-request adaptive speculation lengths 的 RFC 已关闭 ([#48202](https://github.com/vllm-project/vllm/issues/48202))
- FA3 cascade-attention heuristic refresh ([#15647](https://github.com/vllm-project/vllm/issues/15647))

## 5. Stability & Regressions

按运维严重程度排序。部分问题特定于模型族（Kimi / GLM-Flash / Qwen-Flash / DFlash）。

**P0 — 静默损坏 / 错误答案**
- **Kimi-K2.6** 在 8×B200 上间歇性地只输出 `"!!!!!!!!!!"`（`reasoning` 字段，`content: null`，`--reasoning-parser kimi_k2`）。自 May 起开放；93 条评论。[#42426](https://github.com/vllm-project/vllm/issues/42426)
- **Kimi-K3 在 1P1D NIXL Direct-PD 中静默乱码**（MooncakeStore + Nixl MultiConnector）。纯 NIXL PD 是干净的 — 嫌疑在 MultiConnector 路径。[#52627](https://github.com/vllm-project/vllm/issues/52627)
- **DFlash fused-KV projection** 对切片后的 `qkv_proj` weight 调用 `F.linear` — 会破坏或静默损坏任何 **weight-quantized drafter**。[#51581](https://github.com/vllm-project/vllm/issues/51581)
- **LoRA adapters 模块名前缀不匹配**时会静默回退到基座模型输出。[#34186](https://github.com/vllm-project/vllm/issues/34186)

**P1 — 无法启动 / 挂起 / 崩溃**
- `VLLM_PLE_CPU_OFFLOAD=1` 在 TP=1 上于 **kernel warmup 阶段死锁**（Qwen3.8-Flash-Next，GB10/sm_121）。Engine init 完成后陷入沉默。[#53960](https://github.com/vllm-project/vllm/issues/53960)
- DeepSeek-V4-Flash 启动：SparseAttnIndexer 在 model-construction context 退出后读取 global config。修复 PR：[#54400](https://github.com/vllm-project/vllm/pull/54400)
- Mamba V2 runner 在 profiling teardown 时崩溃（Kimi-K3 TP8×PP4，4×B200）。修复已合入：[#54044](https://github.com/vllm-project/vllm/pull/54044)
- Mamba-2 Triton 在 SM121（DGX Spark）上出现 **illegal instruction**，除非设置 `CUDA_LAUNCH_BLOCKING=1`。[#37431](https://github.com/vllm-project/vllm/issues/37431)
- GLM-5.3-Flash ROCm gfx950：`forward_hip()` 缺少 `gate_score`。[#53943](https://github.com/vllm-project/vllm/issues/53943)
- Qwen3-VL-Embedding OpenAI embeddings API 间歇性 multimodal-cache assert。[#33865](https://github.com/vllm-project/vllm/issues/33865)
- 历史问题：V1 workers 空闲后死亡（`EngineDeadError` / `PyCFunction`）— issue 已关闭。[#35104](https://github.com/vllm-project/vllm/issues/35104)

**P2 — 正确性 / 缓存 / 后端选择**
- DFlash2 + YaRN：相同的 1.04M prompt **零 prefix-cache reuse**；仅 target 能 reuse 约 1.039M tokens。[#54094](https://github.com/vllm-project/vllm/issues/54094)
- GLM-5.3-Flash：Ada sm_89 上无 sparse-MLA。[#54059](https://github.com/vllm-project/vllm/issues/54059)
- DeepSeek-R1-0528-NVFP4 on RTX Pro 6000：“No valid attention backend” 回归，源自 0.14.0 时代，仍开放。[#32732](https://github.com/vllm-project/vllm/issues/32732)
- Qwen3-VL-Embedding online vs offline transformers 不一致。[#33167](https://github.com/vllm-project/vllm/issues/33167)
- NIXL DCP-for-MLA 今日因 gated-assignment 回归被回滚（[#54386](https://github.com/vllm-project/vllm/pull/54386) 回滚 [#50611](https://github.com/vllm-project/vllm/pull/50611)）
- CohereASR FP16 attention-bias dtype on Turing — 修复：[#54399](https://github.com/vllm-project/vllm/pull/54399)

**平台说明：** GB10 / DGX Spark（sm_121）仍是最锋利的边缘 — MoE router GEMM gates、Mamba Triton、PLE offload 以及 GDN prefix-cache 本周都在该平台上失败过。Ada（4090）目前还跑不了 GLM-5.3-Flash sparse-MLA。

## 6. What This Means for Application Developers

1. **先在预发集群升级到 0.28.0。** 将 Transformers 升到 ≥5.15，去掉 `override_attention_dtype` / `calculate_kv_scales`，把 bitsandbytes 迁到 plugin，并改写任何抓取 `kv_offload_tiering_block_*` 的看板。默认 batch tokens 更高（16k），且 Mamba prefix-cache 默认开启 — 请重新调 `gpu_memory_utilization` 与最大并发。

2. **Kimi-K3 才是本版本的生产主线；Kimi-K2.6 reasoning 不是。** 若向用户暴露 reasoning 字段，请对 `"!!!!!!!!!!"` / null-content 失败做门控或重试（[#42426](https://github.com/vllm-project/vllm/issues/42426)）。在 [#52627](https://github.com/vllm-project/vllm/issues/52627) 关闭前，不要把 Kimi-K3 1P1D 跑在 Mooncake+NIXL MultiConnector 上。

3. **Flash 模型（GLM-5.3-Flash、Qwen3.8-Flash-Next）仅作 recipe。** 使用已发布的 Docker tags 和 [recipes.vllm.ai](https://recipes.vllm.ai/zai-org/GLM-5.3)。GLM 请钉 FlashInfer 0.6.18。Qwen-Flash-Next 请把 51B N-gram table 留在 host RAM（`VLLM_PLE_CPU_OFFLOAD=1`）— 但在 warmup 死锁修复前，不要在单卡 GB10 上这么做。GLM-Flash 跳过 Ada 4090。

4. **Spec decode + quantization 本周是雷区。** 量化后的 DFlash drafter 可能污染输出（[#51581](https://github.com/vllm-project/vllm/issues/51581)）。Hybrid GDN + MTP 可能静默 miss prefix cache（[#52244](https://github.com/vllm-project/vllm/pull/52244)，[#54094](https://github.com/vllm-project/vllm/issues/54094)）。在生产开启 MTP/DSpark/DFlash 前，用黄金 prompt 集校验 acceptance rates 与 cache-hit 指标。

5. **分离式部署与 KV connectors 仍在变动。** E/P/D 在 MRV2 中（[#38390](https://github.com/vllm-project/vllm/pull/38390)）；NIXL DCP-for-MLA 今日被回滚。若你在跑 PD 或 CPU offload，请关注 connector events（[#54325](https://github.com/vllm-project/vllm/pull/54325)），并将 layout RFC（[#42082](https://github.com/vllm-project/vllm/issues/42082)）视为尚未稳定的契约。

6. **Agent / tool-calling 栈：** 继续为模型使用对应的 `--reasoning-parser` / `--tool-call-parser`（`kimi_k2`、`glm45`/`glm47`）。若对接 Anthropic 或 `/v1/responses`，相关前端 PR 是 Anthropic content-block validator（[#47877](https://github.com/vllm-project/vllm/pull/47877)）与 Responses-API tokenize path（[#41510](https://github.com/vllm-project/vllm/pull/41510)）。

7. **不要假设 LoRA 已生效。** adapter 前缀不匹配会失败开放并回退到基座模型（[#34186](https://github.com/vllm-project/vllm/issues/34186)）。在 CI 中断言 adapter 改变了 logits，或放入 canary token。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

先核对仓库在 2026-08-30 的最新活动，再按你的规则把 digest 译成简体中文。# SGLang Digest — 2026-08-30

Repo: [sgl-project/sglang](https://github.com/sgl-project/sglang) · 最新稳定版：[v0.5.18](https://github.com/sgl-project/sglang/releases/tag/v0.5.18) (2026-08-21) · main 处于 **0.5.19.dev** 线。过去 24 小时无打标签发布；nightly wheel 已于 2026-08-29 落地。

---

## 1. 本周要点

**v0.5.18** 之后，主干几乎被 **HiCache / Unified Cache / PD-disaggregation 正确性**、**GLM-5.3-Flash 生产阻塞项**，以及 **diffusion + speculative-decoding kernel** 工作主导。维护者关闭了长期推进的 [PP + HiCache consistency plan](https://github.com/sgl-project/sglang/issues/22607)，并合入后续 PR：decode 路径泄漏、chunked-prefill radix 进度、external linker 的 device-pool 组装。并行地，GLM-5.3-Flash 是最热的新模型接入面：当 `index_kpool > 1` 时 FP8 KV cache 选不到合法 backend，`--enable-dp-attention` 会在 warmup 挂死，GB10 上的长 prefill 会静默干掉 worker。`main` 上的 CI 仍较嘈杂但在好转 — tracker 报告 **2 broken、8 flaky、876 recently fixed**。

---

## 2. 发布与破坏性变更

过去 24 小时无新打标签发布。

| Line | Status | Notes |
|---|---|---|
| [v0.5.18](https://github.com/sgl-project/sglang/releases/tag/v0.5.18) | 最新稳定版 (2026-08-21) | 新模型（Muse Glimmer、Intern-S2-Mobius，以及若干 diffusion 栈）、overlapped checkpoint staging（启动最高可快 **2.38×**）、统一 `SGLANG_CACHE_DIR`、AMD 上 NVFP4→MXFP4、DeepSeek-V4 LMHead all-to-all（**320µs → 169µs**） |
| `0.5.19.dev` / nightly `20260829` | 当前 `main` | Wheel index 已更新；按预发布对待。若干未关闭 bug 的复现目标镜像为 GLM-5.3-Flash 镜像 `lmsysorg/sglang:glm-5.3-flash` |

本窗口运维备忘（非正式 changelog）：

- 自 0.5.18 起，编译后的 kernel（Triton / FlashInfer / Inductor / DeepGEMM）统一落在 **`SGLANG_CACHE_DIR`** — 若你钉死了旧路径，请更新 cache volume 挂载。
- CI lint action 正迁到当前大版本（`checkout` / `setup-python` / `setup-node` **v4 → v7**），见 [#37099](https://github.com/sgl-project/sglang/pull/37099)。
- Streaming OpenAI 端点在流开始前的校验失败时，可能开始返回真正的 **HTTP 400**，而不再塞进 SSE error chunk（[#23821](https://github.com/sgl-project/sglang/pull/23821)）— 只解析 SSE 的客户端需要在开流前处理非 200。

---

## 3. 新模型与硬件支持

**正在 `main` 上推进（尚未全部合入）：**

- **GLM-5.3-Flash** — day-0 serving 已有，但仍有三项生产缺口未关：
  - FP8 KV cache 被挡住：`index_kpool > 1` 会排除 `flashmla_kv`，且没有 CUDA DSA backend 能接受 bf16-query × fp8-KV（[#36830](https://github.com/sgl-project/sglang/issues/36830)）。
  - `--enable-dp-attention` 在 warmup 挂死（`dsv4` GEMM 空转，没有任何调度）（[#36802](https://github.com/sgl-project/sglang/issues/36802)，排查后已关闭）。
  - GB10 / DGX Spark：prefill ≳40k tokens 会耗尽 unified memory，worker 无 traceback 直接死亡（[#36941](https://github.com/sgl-project/sglang/issues/36941)）。
- **Cosmos3 Reasoner** 已加入 LLM-only inference（[#33572](https://github.com/sgl-project/sglang/pull/33572)）。
- **Qwen3-8B-Domino-b16** 通过 DFlash V2 上优化后的 Domino rollout（[#36899](https://github.com/sgl-project/sglang/pull/36899)）。
- **FLUX.2** 在 SM100 上将 NVFP4 FC1→SwiGLU→FC2 融合（[#37096](https://github.com/sgl-project/sglang/pull/37096)）。
- **Qwen-Image** TP collectives + fused attention（[#36680](https://github.com/sgl-project/sglang/pull/36680)）；**GLM-Image** 为动态 batching 做 AR/DiT overlap（[#33971](https://github.com/sgl-project/sglang/pull/33971)）。
- **ROCm / MI3xx**：DSA MQA-logits budget cap vs AITER `buffer_store`（[#36960](https://github.com/sgl-project/sglang/pull/36960)）；wave-level top-k transform（[#36348](https://github.com/sgl-project/sglang/pull/36348)）。AMD cookbook 已于 2026-08-30 更新。
- **Apple Silicon / unified memory pool**：`req_pool_idx` 迁入 `ReqKvInfo`（[#37094](https://github.com/sgl-project/sglang/pull/37094)）；FA3 / FlashInfer / TRTLLM-MHA / FlashMLA 的 unified-pool 读路径（[#34613](https://github.com/sgl-project/sglang/pull/34613)，[#35245](https://github.com/sgl-project/sglang/pull/35245)）。
- **openPangu 2.0 Flash** 仍是开放中的功能请求（[#29746](https://github.com/sgl-project/sglang/issues/29746)）。
- GLM-Image 的 `/v1/images/edits` 仍为 closed/inactive（[#25579](https://github.com/sgl-project/sglang/issues/25579)）。

本窗口 bug 流量最高的硬件面：**H20 (SM90)、H100、B200/GB200、GB10 / DGX Spark、MI300X/MI350X/MI355X、Ascend NPU**。

---

## 4. 性能与优化

**已合入或可审：**

- GLM-Image AR/DiT overlap：10-prompt / concurrency-4 bench **223.79s → 182.39s（约 18.4% E2E）**；默认关闭（[#33971](https://github.com/sgl-project/sglang/pull/33971)）。
- FLUX.2 在 SM100 上用 CuTe DSL 做 NVFP4 feed-forward fusion（[#37096](https://github.com/sgl-project/sglang/pull/37096)）。
- Qwen-Image：针对 24 MiB row-parallel 输出的 SRT custom-all-reduce + 融合后的小 attention kernel（[#36680](https://github.com/sgl-project/sglang/pull/36680)）。
- ROCm top-k：12-bit coarse radix（修复长行上的静默丢弃），并快 **40–53%**；dual-pass load batching + wave64 coarse scan（[#36348](https://github.com/sgl-project/sglang/pull/36348)）。
- Decode HiCache retraction leak 已修（[#37100](https://github.com/sgl-project/sglang/pull/37100)）。
- Unified Cache：为 external linker 做 device-pool 组装，以及 DSA / DeepSeek-V4 的 pool view（[#37098](https://github.com/sgl-project/sglang/pull/37098)）。
- Chunked prefill 在跳过 radix insert 时不再跳过 `cache_unfinished_req` — 避免同一 chunk 被反复 prefetch 直到 OOM（[#37024](https://github.com/sgl-project/sglang/pull/37024)，修复 #36855）。
- Unified-cache write-through 仍无法备份第一次 extend 超过 `chunked_prefill_size`（默认 8192）的情况（[#33714](https://github.com/sgl-project/sglang/issues/33714)）。
- Adaptive speculative decoding 路线图（[#23705](https://github.com/sgl-project/sglang/issues/23705)）以及进一步的 Ngram spec 支持（[#21052](https://github.com/sgl-project/sglang/issues/21052)）仍是面向 agentic / mixed-acceptance 流量的开放设计轨道。
- 面向公开 Qwen3-8B-Domino-b16 的 DFlash V2 + Domino projector（[#36899](https://github.com/sgl-project/sglang/pull/36899)）。

**已知性能悬崖（并非 kernel 本身回退）：**

- `Qwen3-30B-A3B-Instruct-2507` 的 MXFP8 在同等精度下，于 B200 和 GB200 上 **慢于 BF16**（[#29002](https://github.com/sgl-project/sglang/issues/29002)，closed/inactive）。
- FlashInfer TRTLLM NVFP4 MoE 在 SM100/SM103 上的 tile-192 路径会产生 **NaN**；FlashInfer > `0.6.16rc4` 后 GSM8K 分数为 0.0（[#34629](https://github.com/sgl-project/sglang/issues/34629)）。

来自 v0.5.18、本周仍相关的背景：DeepSeek-V4 TP LMHead all-to-all **320µs → 169µs**；Kimi K3 在 MI355X 上吞吐 **1.37–1.77×**，ITL 最高 **2.42×**。

---

## 5. 稳定性与回归

按生产影响排序。

### P0 — 集群 / 进程死亡

| Issue | Symptom | Status |
|---|---|---|
| [#33289](https://github.com/sgl-project/sglang/issues/33289) | 多节点 TP rank 发散死锁：一个 rank 卡在 NCCL proxy append（logits all-gather），对端在 request broadcast 空转。DeepSeek-V4 + DSpark，2× DGX Spark (GB10)，TP=2 | 诊断后 **Closed**；若跑多节点 DSpark，仍应按高优先级对待 |
| [#36941](https://github.com/sgl-project/sglang/issues/36941) | GLM-5.3-Flash 在 GB10 上 prefill >~40k tokens 耗尽 unified memory；worker 死亡且 **无 traceback / 无 OOM 记录**。跨栈控制在 54k 仍能通过 | **Open** |
| [#30314](https://github.com/sgl-project/sglang/issues/30314) | 大上下文负载下 scheduler event loop 阻塞在 Mamba eviction → hang + 进程被杀 | **Open** |
| [#36802](https://github.com/sgl-project/sglang/issues/36802) | GLM-5.3-Flash 搭配 `--enable-dp-attention` 时 warmup hang | **Closed** |

### P1 — 静默错答 / 正确性

| Issue | Symptom | Status |
|---|---|---|
| [#36807](https://github.com/sgl-project/sglang/issues/36807) | 当 radix threshold bucket 溢出 4096 条候选缓冲时，`fast_topk_v2` 可能返回 **错误的 top-k 集合**（`k=2048`，长行） | **Open** |
| [#25790](https://github.com/sgl-project/sglang/issues/25790) | H100 上 FP8 KV 的 logprob 在 prefill vs decode **恰好于 index 96** 不一致 | **Open** |
| [#34629](https://github.com/sgl-project/sglang/issues/34629) | SM100/SM103 上 NVFP4 MoE tile-192 出现 NaN | **Open** |
| [#36480](https://github.com/sgl-project/sglang/issues/36480) | Qwen3.5 greedy 多模态输出在 v0.5.12 与 v0.5.17.dev 差异很大；v0.5.17.dev36 在 router 后也不自洽 | **Closed** |
| [#25587](https://github.com/sgl-project/sglang/issues/25587) | Hybrid-GDN MTP spec decode 在 Ascend NPU 上非无损 | **Closed / inactive** |
| [#29748](https://github.com/sgl-project/sglang/issues/29748) | GPTQ `gptq_gemm` 数据竞争（未初始化 buffer + 多 block `atomicAdd`） | **Closed / inactive** |

### P1 — serving 正确性 / 泄漏

| Issue | Symptom | Status |
|---|---|---|
| [#36333](https://github.com/sgl-project/sglang/issues/36333) | 断开的 streaming 客户端会留下 zombie，一直 decode 到 `max_tokens`，并刷屏 `state was deleted in TokenizerManager`（#34160 revert 引入的回归） | **Open** |
| [#37100](https://github.com/sgl-project/sglang/pull/37100) | Decode HiCache 在 retraction 时内存泄漏 | **Fix PR open** |
| [#36830](https://github.com/sgl-project/sglang/issues/36830) | GLM-5.3-Flash 无法使用 FP8 KV cache | **Open** |
| [#13054](https://github.com/sgl-project/sglang/issues/13054) | PD disaggregation：一次瞬时 KV transfer 错误后 `failed_sessions` 粘住 → 健康的 P–D 对持续 500 | **Closed** |
| PD 协议对齐 | 共享的 prefill→decode 失败通知 + 覆盖 Mooncake / NIXL / Mori 的防御性协议 | [#36612](https://github.com/sgl-project/sglang/pull/36612)、[#35281](https://github.com/sgl-project/sglang/pull/35281) **open** |

### P2 — 平台 / CI

- CI tracker [#17050](https://github.com/sgl-project/sglang/issues/17050)：**2 broken、8 flaky、876 recently fixed**（自动更新 2026-08-30 07:20 UTC）。维护模式 issue [#21065](https://github.com/sgl-project/sglang/issues/21065) 再次被触碰。
- 核心模块（`managers/`、`mem_cache/`、`sampling/` 等）的单测覆盖仍是长期 good-first-issue，已有 **107 条评论**（[#20865](https://github.com/sgl-project/sglang/issues/20865)）。
- Docker 中的 Triton 版本告警：aiter gluon 要求 **Triton ≥ 3.6.0**，镜像自带 **3.4.0**（[#35785](https://github.com/sgl-project/sglang/issues/35785)）。
- ROCm EAGLE/MTP + CUDA-graph 死锁 / draft-extend 崩溃仍为 closed/inactive（[#29347](https://github.com/sgl-project/sglang/issues/29347)，[#29785](https://github.com/sgl-project/sglang/issues/29785)）；历史 workaround 为 `--disable-overlap-schedule`。

---

## 6. 对应用开发者意味着什么

**若你在服务 agent / 长前缀负载**
本周重心是 HiCache。跨数万 token 的前缀复用是设计目标（[#22607](https://github.com/sgl-project/sglang/issues/22607)），但不要假设 write-through 能覆盖第一次 extend 大于 `chunked_prefill_size` 的情况（[#33714](https://github.com/sgl-project/sglang/issues/33714)）。多实例 DRAM L2 共享仍不是「挂上存储就能用」的故事（[#31505](https://github.com/sgl-project/sglang/issues/31505)）。等 [#36869](https://github.com/sgl-project/sglang/pull/36869) 落地后，优先用 idle-gated 的 `flush_cache` / attach / detach API — 今天这些调用在约 20 种 scheduler 条件下会静默 no-op。

**若你在接入 GLM-5.3-Flash**
在 [#36830](https://github.com/sgl-project/sglang/issues/36830) 有 backend 之前，先留在 BF16 KV。不要把 `--enable-dp-attention` 和当前 Flash 镜像直接叠在一起而不做 soak test。在 GB10 上，把 prefill 压到远低于 40k，或给 host/unified memory 配硬 watchdog — worker 会静默死亡（[#36941](https://github.com/sgl-project/sglang/issues/36941)）。

**若你使用 speculative decoding（DSpark / EAGLE / MTP / Ngram / Domino）**
接受率随负载阶段变化；之所以有 adaptive-spec 路线图（[#23705](https://github.com/sgl-project/sglang/issues/23705)），是因为深度投机会在 agentic 流量上浪费 draft/verify。多节点 DSpark + DeepSeek-V4 存在真实的 TP 死锁模式（[#33289](https://github.com/sgl-project/sglang/issues/33289)）。`fast_topk_v2` 在 `k=2048` 时可能返回错误集合（[#36807](https://github.com/sgl-project/sglang/issues/36807)）— 在用于 ranking / tool-routing 路径前，先钉死 k，或等 radix-buffer 修复。

**若你对外暴露 OpenAI 兼容 streaming**
要处理客户端断开。丢掉的 SSE 客户端会继续 decode 到 `max_tokens`，并刷 tokenizer-manager 日志（[#36333](https://github.com/sgl-project/sglang/issues/36333)）。即将合入的 [#23821](https://github.com/sgl-project/sglang/pull/23821) 会把 *pre-stream* 校验失败变成 HTTP 400；请更新那些假定所有错误都以 SSE chunk 到来的 SDK。

**若你跑 PD disaggregation**
NIXL 仍没有及时的 prefill→decode 失败信号（默认等待 **300s**）。Mooncake/Mori 会通知，但路径不兼容 — [#36612](https://github.com/sgl-project/sglang/pull/36612) / [#35281](https://github.com/sgl-project/sglang/pull/35281) 是统一方案。瞬时 KV 错误后粘住的 `failed_sessions` 已标为 closed（[#13054](https://github.com/sgl-project/sglang/issues/13054)）；在依赖自动恢复前，请在你自己的 transport 上验证。

**若你部署量化 / Blackwell / AMD**
不要假设 MXFP8 相对 BF16 是免费赢面（[#29002](https://github.com/sgl-project/sglang/issues/29002)）。若在 SM100 上用 NVFP4 MoE，请钉死 FlashInfer — tile-192 在 `0.6.16rc4` 之后数值不安全（[#34629](https://github.com/sgl-project/sglang/issues/34629)）。H100 上 FP8 KV 的 logprob 在 index 96 仍不一致（[#25790](https://github.com/sgl-project/sglang/issues/25790)），这对任何按 logprob 设阈值的应用都重要（RAG abstention、speculative verify、tool-call gating）。

**实用钉版本建议**
- 生产、偏保守：**v0.5.18**。
- GLM-5.3-Flash / HiCache / diffusion 实验：仅在把上述 issue 放进 soak checklist 的前提下使用 `main` / `0.5.19.dev`。
- 提升 nightly 前先看 [#17050](https://github.com/sgl-project/sglang/issues/17050)；`main` 上仍有两个定时任务是红的。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

我会收集最新的 llama.cpp 发行说明、Issues 和 PR，以确保本摘要准确完整。
# llama.cpp Digest — 2026-08-30

来源：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · 最新 nightly **b10689**（24 小时窗口内还列出了 b10690）· 最近一次 semver 发布 **[v0.3.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0)**（2026-08-25）

## 1. 本周要点

Nightly **b10681–b10690** 以后端为主，而非模型 API：Metal flash-attn 向量路径已为 M1 Max / M2 / M4 Pro 落地调优，OpenCL 选用了更快的 Adreno GEMM 路径，SYCL `--fit` 现在会跟踪真实峰值显存，Vulkan 修复了 `mul_mat_id` 的 K 维 padding。与此同时，issue 区主要集中在 **AMD APU/ROCm 正确性对比 Vulkan**、**SYCL 多 GPU DEVICE_LOST**、**Qwen 工具调用 / thinking 解析器**，以及一批仍在进行、尚未合入的 **MoE + 推测解码（DFlash / draft-MTP）** 工作。

## 2. 发布与破坏性变更

过去 24 小时没有 semver 升级。二进制渠道仍是 nightly（`bNNNN`）；`v0.3.0` 仍是最近一次带标注的正式发布（dots3-note 多模态、GLM-4.5-Air MTP、tensor-split / DeepSeek-4 回滚修复、ggml v0.22.0）。

近期 nightly（由新到旧）：

| Tag | Focus | Link |
|---|---|---|
| b10690 | 当 K-cache 缓冲区未分配时保护 Hadamard/`k_rot` 拷贝（未量化 K 上的 context-shift 崩溃） | [#27967](https://github.com/ggml-org/llama.cpp/issues/27967) |
| b10689 | `ggml_graph_optimize` 可携带 alloc 依赖 | [b10689](https://github.com/ggml-org/llama.cpp/releases/tag/b10689) · [#27301](https://github.com/ggml-org/llama.cpp/pull/27301) |
| b10688 | Metal FA-vec：针对 M2 的调优 | [b10688](https://github.com/ggml-org/llama.cpp/releases/tag/b10688) · [#27940](https://github.com/ggml-org/llama.cpp/pull/27940) |
| b10687 | OpenCL Adreno GEMM 路径（X2E 默认 + A7X 旁路） | [b10687](https://github.com/ggml-org/llama.cpp/releases/tag/b10687) · [#27640](https://github.com/ggml-org/llama.cpp/pull/27640) |
| b10686 | Metal 共享内存 padding assert | [#27951](https://github.com/ggml-org/llama.cpp/pull/27951) |
| b10685 | Metal FA-vec：针对 M4 Pro 的调优 | [#27915](https://github.com/ggml-org/llama.cpp/pull/27915) |
| b10684 | SYCL `--fit` 遵守 `--fit-target` / 峰值显存 | [#27629](https://github.com/ggml-org/llama.cpp/pull/27629) |
| b10683 | Vulkan fastdiv 清理 | [#27526](https://github.com/ggml-org/llama.cpp/pull/27526) |
| b10682 | Metal FA-vec：针对 M1 Max 的调优 | [#27932](https://github.com/ggml-org/llama.cpp/pull/27932) |
| b10681 | Vulkan `mul_mat_id` 对 K 做 padding，而非 N | [#27925](https://github.com/ggml-org/llama.cpp/pull/27925) |

**迁移说明：** 这些 nightly 均未改动公开 CLI 参数或 OpenAI 兼容 server schema。若你交付 Metal FA、SYCL `--fit`、Adreno 上的 OpenCL，或 Vulkan MoE（`mul_mat_id`），请重新构建/部署二进制。使用 context-shift + 未量化 K cache 的场景应升级到 b10690，以避免 Hadamard/`k_rot` 崩溃。

## 3. 新模型与硬件支持

**已合入（nightly）**
- Apple Silicon Metal FA-vec 设备表：**M1 Max、M2、M4 Pro**（[#27932](https://github.com/ggml-org/llama.cpp/pull/27932)、[#27940](https://github.com/ggml-org/llama.cpp/pull/27940)、[#27915](https://github.com/ggml-org/llama.cpp/pull/27915)）。M3 Pro 调优仍开放（[#27963](https://github.com/ggml-org/llama.cpp/pull/27963)）。
- **Adreno OpenCL**：X2E 默认走 xmem F16×F32 GEMM；A7X 跳过较慢的 tiled F32 路径（[#27640](https://github.com/ggml-org/llama.cpp/pull/27640)）。
- **SYCL `--fit`**：按给定上下文长度做峰值显存感知打包（[#27629](https://github.com/ggml-org/llama.cpp/pull/27629)）。

**审阅中（未进入 24 小时二进制）**
- Qwen4 / Qwen3.8-Flash-Next 正确性：sequence-copy indexer keys、block 修复（[#27941](https://github.com/ggml-org/llama.cpp/pull/27941)、[#27879](https://github.com/ggml-org/llama.cpp/pull/27879)）。
- Qwen3.5 / 3.8 多模态 LoRA → GGUF（`Qwen3_5ForConditionalGeneration`）（[#27995](https://github.com/ggml-org/llama.cpp/pull/27995)）。
- DeepSeek-V4 / GLM 的稀疏 flash-attn（[#27970](https://github.com/ggml-org/llama.cpp/pull/27970)）。
- STQ1_0 稀疏三值量化 + ARM NEON `vec_dot`（Sherry / ACL 2026）（[#22836](https://github.com/ggml-org/llama.cpp/pull/22836)）。
- DFlash2：把缺失的 **NVFP4 scales** 传入 attention（[#28000](https://github.com/ggml-org/llama.cpp/pull/28000)）。
- Metal 4.0 tensor API 仅对 M5+/A19+ 开放（[#27461](https://github.com/ggml-org/llama.cpp/pull/27461)）。
- Vulkan int8 coopmat1 MMQ，面向 **RDNA3/RDNA4**（q4_0/1、q5_0/1、q8_0、q3–q6_k、mxfp4、nvfp4、iq4_nl）（[#27952](https://github.com/ggml-org/llama.cpp/pull/27952)）。
- llama-ui：HF Hub 浏览/搜索、sidecar 解析（`mtp` / `dflash` / `mmproj`…）、下载与兼容性估算（[#27947](https://github.com/ggml-org/llama.cpp/pull/27947)、[#27946](https://github.com/ggml-org/llama.cpp/pull/27946)、[#27959](https://github.com/ggml-org/llama.cpp/pull/27959)、[#27957](https://github.com/ggml-org/llama.cpp/pull/27957)）。

## 4. 性能与优化

**已合入**
- Metal FA-vec 按 SoC 分表（M1 Max / M2 / M4 Pro）—— Apple Silicon 上的 decode 路径 flash-attn；可与现有社区调优 issue [#27668](https://github.com/ggml-org/llama.cpp/issues/27668) 对照。
- OpenCL Adreno：`kernel_mul_mm_f16_f32_l4_lm` 是该后端最慢的 matmul；动机用例是 X2-90 上 gpt-oss-20b 的 attention 投影（[#27640](https://github.com/ggml-org/llama.cpp/pull/27640)）。
- Vulkan `mul_mat_id` 不再浪费仅 dense `mul_mat` 才需要的 N 维 padding（[#27925](https://github.com/ggml-org/llama.cpp/pull/27925)）。
- SYCL `--fit` 按实测峰值显存（给定上下文长度）分配，而不再用更松的估算（[#27629](https://github.com/ggml-org/llama.cpp/pull/27629)）。
- ggml `graph_optimize` 可携带 alloc 依赖——对必须在 optimize 过程中保持 scratch/KV 存活的后端有意义（[#27301](https://github.com/ggml-org/llama.cpp/pull/27301)）。

**开放 / 在 issue 中有实测**
- 同一颗 Apple Silicon GPU 上，Metal（macOS）仍显著快于 Asahi Linux 上的 Vulkan——长期研究帖（[#10982](https://github.com/ggml-org/llama.cpp/issues/10982)，50 条评论）。
- 多专家模型上 Vulkan MoE 批量 decode 在 **n_tokens = 9** 出现断崖（Qwen3-Coder-Next 30B-A3B，512 experts）：Strix Halo / RADV 上 **122.5 t/s @ B=8 → 82.9 t/s @ B=9**，归咎于固定的 8-token MMV 阈值（[#25356](https://github.com/ggml-org/llama.cpp/issues/25356)）。
- 提议为 host offload 的 MoE experts 做 GPU 常驻 **LRU cache**，避免 decode 每 token 都受 host RAM 带宽限制（[#27861](https://github.com/ggml-org/llama.cpp/pull/27861)）；相关需求是从 pinned host RAM DMA experts、不做 H2D copy（[#26448](https://github.com/ggml-org/llama.cpp/issues/26448)）。
- Vulkan 大 `TOP_K` 走 `ARGSORT` 回退（[#28005](https://github.com/ggml-org/llama.cpp/pull/28005)）。
- CUDA f16 flash-attn：把发散的 `__syncthreads()` 移出 `threadIdx.y` 分支（[#27870](https://github.com/ggml-org/llama.cpp/pull/27870)，源自 [#27678](https://github.com/ggml-org/llama.cpp/issues/27678)）。

## 5. 稳定性与回归

按运维严重程度排序。「修复 PR」仅在明确挂接时标注。

**P0 — 错误 token / 硬崩溃**
- **gfx1151（Strix Halo）上的 HIP/ROCm 输出损坏**；同样权重和参数在 Vulkan 上干净（[#27579](https://github.com/ggml-org/llama.cpp/issues/27579)）。仍开放。
- **DeepSeek-V4** 在 CUDA flash-attn 下多轮 prompt 只反复输出 `<`（CPU 与 `-fa off` 正常）。调查后已关闭（[#26509](https://github.com/ggml-org/llama.cpp/issues/26509)）。
- **SYCL `--split-mode tensor`** 的 `dev2dev_memcpy` 在双卡 Arc Pro B70 上出现 **DEVICE_LOST**，尽管 P2P 可用（[#27198](https://github.com/ggml-org/llama.cpp/issues/27198)）。仍开放。
- **draft-MTP** 在 `-np N` + multi-ubatch 下接受率掉到 **0.0**：异步 `t_h_nextn` D2H 竞态（[#27572](https://github.com/ggml-org/llama.cpp/issues/27572)）。仍开放。
- **llama-server + draft-MTP** 在 KV 饱和时出现 `cublasSgemm INVALID_VALUE`（[#26558](https://github.com/ggml-org/llama.cpp/issues/26558)）。已关闭。
- 在 **未量化 K 且无缓冲区** 时把 Hadamard 拷进 `k_rot` 导致 context-shift 崩溃——已在 b10690 修复（[#27967](https://github.com/ggml-org/llama.cpp/issues/27967)）。
- 循环内存回滚失败时的 server 回退（混合模型）（[#28007](https://github.com/ggml-org/llama.cpp/pull/28007)）。仍开放，拟作为修复。

**P1 — 正确性 / 大幅性能断崖**
- Qwen3.5 thinking + tools：若模型在 `<tool_call>` 之前先吐文本，`peg-native` 解析失败（[#20260](https://github.com/ggml-org/llama.cpp/issues/20260)）。仍开放。
- AMD Strix Halo HIP：输入层钉在 CPU 上 → 约 30% CPU、GPU 利用率偏低（[#25700](https://github.com/ggml-org/llama.cpp/issues/25700)）。仍开放。
- ROCm 7.14 / gfx1201：显存未分配（[#26208](https://github.com/ggml-org/llama.cpp/issues/26208)）。仍开放。
- Gemma 4 tg128 在 RTX 5060 Ti（Blackwell）上相对其他架构「异常偏低」（[#26674](https://github.com/ggml-org/llama.cpp/issues/26674)）。仍开放。
- AMD APU + 量化 MoE 上 DFlash 比无推测大约慢 2×（[#25117](https://github.com/ggml-org/llama.cpp/issues/25117)）；缺少 scales 时 NVFP4 draft 几乎接受 0 token（[#28000](https://github.com/ggml-org/llama.cpp/pull/28000)）。
- SYCL `MUL_MAT_ID` 在 Arc Pro B70（Battlemage）上 prefill 错误——MoE 输出垃圾。已关闭（[#25455](https://github.com/ggml-org/llama.cpp/issues/25455)）。
- Metal `mul_mm_id` 在激活超出 f16 时全 NaN（[#26223](https://github.com/ggml-org/llama.cpp/pull/26223)）。仍开放。
- Slot 保存/恢复：mmproj 标志会阻断纯文本 checkpoint（[#21133](https://github.com/ggml-org/llama.cpp/issues/21133)，已关闭）；混合/循环模型的 checkpoint 从未持久化（[#25913](https://github.com/ggml-org/llama.cpp/issues/25913)，仍开放）。
- 即使启用 RoPE scaling，server 仍拒绝超过训练窗口的上下文（[#17459](https://github.com/ggml-org/llama.cpp/issues/17459)）。仍开放。

**P2 — 平台 / 打包**
- 较新 oneAPI 上的 SYCL 性能回归（[#25973](https://github.com/ggml-org/llama.cpp/issues/25973)）；SYCL 构建提示 “program built for 1 device (Iris Xe)”（[#27412](https://github.com/ggml-org/llama.cpp/issues/27412)）。
- Windows + AOCL BLAS 编译失败（OpenBLAS 可用）（[#25413](https://github.com/ggml-org/llama.cpp/issues/25413)，已关闭）。
- 报告的内存泄漏（[#27725](https://github.com/ggml-org/llama.cpp/issues/27725)）。仍开放。
- AMD 上 RPC `top_k` 触发 `GGML_ASSERT(shared_mem <= smpb)`（[#24177](https://github.com/ggml-org/llama.cpp/issues/24177)）。仍开放。

## 6. 对应用开发者的含义

- **按后端钉 nightly，而不是按日历。** Apple Silicon 服务端应升到 ≥ b10688 以拿到 FA-vec 表。Adreno / Snapdragon OpenCL 栈需要 b10687。生产环境用 SYCL `--fit` 的机器至少要 b10684，否则分配器仍会过度/不足预留。Vulkan MoE 服务应采用 b10681。
- **不要把 HIP/ROCm 当作 Strix Halo / gfx1151 的默认后端。** 多条独立讨论表明，同一台机器上 Vulkan 才是正确后端（[#27579](https://github.com/ggml-org/llama.cpp/issues/27579)、[#25700](https://github.com/ggml-org/llama.cpp/issues/25700)、[#26702](https://github.com/ggml-org/llama.cpp/issues/26702)）。回退路径里请保留一份 Vulkan 二进制。
- **并发下的推测解码尚不安全上生产。** `draft-mtp` + `-np N` 可能静默接受零 draft（[#27572](https://github.com/ggml-org/llama.cpp/issues/27572)），或在 KV cache 满时打崩 cuBLAS（[#26558](https://github.com/ggml-org/llama.cpp/issues/26558)）。把 MTP/DFlash 限制在单 slot，或加上接受率健康检查。NVFP4 DFlash draft 在合入 [#28000](https://github.com/ggml-org/llama.cpp/pull/28000) 之前不要信任。
- **工具调用 + 推理模型仍需要更宽容的解析器。** Qwen3.5 一类「先 think 再 `<tool_call>`」的输出会打爆 `peg-native`（[#20260](https://github.com/ggml-org/llama.cpp/issues/20260)）。若在 llama-server 前接 agent 运行时，请剥离前导文本或改用回退 grammar。
- **长上下文和 slot API 仍是产品级 server 的锋利边缘。** llama-server 仍阻止把 `-c` 扩到训练窗口之外（[#17459](https://github.com/ggml-org/llama.cpp/issues/17459)）。历史上加载 `--mmproj` 会污染纯文本聊天的 slot checkpoint（[#21133](https://github.com/ggml-org/llama.cpp/issues/21133)）；混合/循环模型仍会丢 checkpoint（[#25913](https://github.com/ggml-org/llama.cpp/issues/25913)）。若你回滚循环状态，请关注 [#28007](https://github.com/ggml-org/llama.cpp/pull/28007)。
- **小显卡上的 MoE 是当前活跃的设计前线。** host 常驻 experts + GPU LRU（[#27861](https://github.com/ggml-org/llama.cpp/pull/27861)、[#26448](https://github.com/ggml-org/llama.cpp/issues/26448)）以及 Vulkan 在 B=9 的批大小断崖（[#25356](https://github.com/ggml-org/llama.cpp/issues/25356)），对在一张卡上复用大量短 agent 轮次的场景很关键。在调度阈值调整之前，尽量把 batch 留在快速 MMV 路径上。
- **UI / 模型中心相关工作落在 llama-ui，而不是 HTTP API。** HF 搜索、sidecar 检测、下载/兼容性估算（[#27947](https://github.com/ggml-org/llama.cpp/pull/27947) 等）会改官方 web UI，而不会改 `/v1/chat/completions`。
- **mtmd 的音频输出仍停留在设计阶段**（[#21956](https://github.com/ggml-org/llama.cpp/issues/21956)）。本周不要据此排期产品功能。

二进制与证明文件：[releases](https://github.com/ggml-org/llama.cpp/releases) · 产品站点 [llama.app](https://llama.app)。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-08-30

Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)

## 1. 本周要点

Ollama 连续发布了 **v0.33.1** 与 **v0.33.2**：MLX 新增 Qwen3.8 Flash Next 及结构化输出，llama.cpp/MLX 依赖已升级，桌面应用恢复跟随系统外观（深色模式回归），同时修复了 macOS 单实例交接，以及 Claude Desktop 代理在目录刷新时中断进行中请求的问题。0.33.x 系列明显面向 agent / Claude Desktop 工作流，但 issue 追踪器仍由 **MLX 内存增长**、**iGPU/Vulkan 加载失败**，以及 Gemma/Qwen 上的 **视觉 / tool-call 正确性** 主导。社区对云端 **GLM 5.3** 与 Qwen-3.8 Flash 的需求仍未落地。

## 2. 版本发布与破坏性变更

**[v0.33.2](https://github.com/ollama/ollama/releases/tag/v0.33.2)**（2026-08-27，当前最新）

- 桌面应用再次跟随系统外观（深色模式已恢复）。
- macOS 应用会把请求交给已在运行的实例，而不再拉起第二个进程。
- Claude Desktop 代理在模型目录刷新时不再取消进行中的请求。

**[v0.33.1](https://github.com/ollama/ollama/releases/tag/v0.33.1)**（2026-08-26）

- MLX：Qwen3.8 Flash Next。
- mlxrunner：结构化输出；从慢速存储加载时避免 Metal GPU 超时。
- cmake：外部兼容补丁改为幂等。
- MLX + llama.cpp 依赖更新。

这两个补丁版本没有文档化的 API/schema 破坏性变更。来自上一轮 0.32.10 的说明（对运维仍有效）：未显式指定 `repeat_penalty` 的模型现在默认 **1.0（关闭）**，而不再是 1.1。

## 3. 新模型与硬件支持

已随 0.33.1 落地：

- **MLX 上的 Qwen3.8 Flash Next**（[release notes](https://github.com/ollama/ollama/releases/tag/v0.33.1)）。
- MLX runner 上的 **结构化输出**（与 llama.cpp 的 `format` / JSON schema 路径对齐）。

已提出 / 进行中（尚未进入稳定 tag）：

- GLM 5.3 — [Issue #17741](https://github.com/ollama/ollama/issues/17741)（open）。
- 将 qwen-3.8 Flash Next 加入 **cloud** 模型 — [Issue #18128](https://github.com/ollama/ollama/issues/18128)（提出后已 closed）。
- Windows Claude Desktop 应用开关 — [PR #18104](https://github.com/ollama/ollama/pull/18104)（open；服务端 `/v1/messages` 已可用）。
- GGUF `general.alignment` 作为 `uint32`（解析器目前回退为 32）— [PR #18130](https://github.com/ollama/ollama/pull/18130)。
- 集成 Vulkan GPU（Virtio-GPU/Venus 虚拟机）的 Direct I/O — [PR #18124](https://github.com/ollama/ollama/pull/18124)，针对 0.32.9→0.32.10 的加载回归。

## 4. 性能与优化

已合入：

- mlxrunner 在从慢速存储加载时避免 Metal **GPU 超时**（[v0.33.1](https://github.com/ollama/ollama/releases/tag/v0.33.1)）。
- 本周早些时候（v0.32.15 语境，仍是许多主机的运行基线）：模型元数据缓存将 TTFT 大约砍半（基准约 995 ms → ~524 ms）。

开放 / issue 中实测：

- **MLX KV / 常驻内存增长是 Apple Silicon 上的主线问题。** 报告集中在：
  - 请求之间 KV 未释放；64 GB Mac，`qwen3.6:35b-mlx`，24 GB → 7 次请求后 **75 GB** + 32 GB swap — [Issue #16698](https://github.com/ollama/ollama/issues/16698)（closed）。
  - 与 context/tools 无关：约 **0.147 GiB/request**，在 0.32.15 上平台约 **28.5 GiB** — [Issue #17924](https://github.com/ollama/ollama/issues/17924)（closed）。
  - 同类问题，稠密模型 — [Issue #17875](https://github.com/ollama/ollama/issues/17875)（closed）。
  - **硬编码的 8 GiB MLX prefix-cache 预算** 会在 32 GB Mac 上的 agent 负载中逼出 swap（`qwen3.8:27b-mlx`）— [Issue #18131](https://github.com/ollama/ollama/issues/18131)（open；重复项 #18132/#18133 已 closed）。
- iGPU 调度器把共享内存当成独显 VRAM 处理（457 MiB `MinimumMemory()` 开销、无内存压力保护、缺少并发模型上限）— [Issue #14953](https://github.com/ollama/ollama/issues/14953)。
- 当 layer 与 KV 无法同时放入 VRAM 时，优先卸载 **layer 而不是 KV** — [Issue #9750](https://github.com/ollama/ollama/issues/9750)。
- 系统提示更长时，Vulkan 在约 900 MB–1 GB 处分配失败，尽管仍有 >14 GB 空闲 VRAM（CLI `ollama run` 可用；API 路径失败）— [Issue #18117](https://github.com/ollama/ollama/issues/18117)。

## 5. 稳定性与回归

按运维影响排序。

**高**

- 在 macOS 上，本地 Qwen 的 agent 集成会永久挂起，而原始 Ollama / OpenAI-compat API 正常（streaming、reasoning、tools）。已 closed，但仍可作为网关超时的参考 — [Issue #17839](https://github.com/ollama/ollama/issues/17839)。
- `qwen 3.8` streaming 500：tool loop 期间 `no user query found in messages` — [Issue #17778](https://github.com/ollama/ollama/issues/17778)（20 👍，open）。
- 调度器在成功加载后立刻用默认 ctx **4096** 重启 `llama-server`（Windows，RX 9070 XT，0.33.2），迫使二次重载 — [Issue #18129](https://github.com/ollama/ollama/issues/18129)。
- 回归：0.32.9 之后在 virtio-gpu DRM native context 上出现 “timed out waiting for llama-server to start”；0.32.10+ 损坏。修复 PR：[PR #18124](https://github.com/ollama/ollama/pull/18124) / [Issue #18123](https://github.com/ollama/ollama/issues/18123)。
- Gemma4 vision：Windows 上图片被接受但不处理 — [Issue #16532](https://github.com/ollama/ollama/issues/16532)（43 条评论，open）。
- Gemma4 e2b/e4b 自 0.32.2 起在 Jetson Orin Nano 上内存爆炸 — [Issue #17787](https://github.com/ollama/ollama/issues/17787)。
- AMD APU 对 gemma4:eXb 的 CPU/GPU 比例切分错误 — [Issue #15285](https://github.com/ollama/ollama/issues/15285)（closed）。

**中**

- 部分 0.33.1 用户的 Claude Desktop 集成损坏 — [Issue #18073](https://github.com/ollama/ollama/issues/18073)；Windows 启用 [PR #18104](https://github.com/ollama/ollama/pull/18104)。
- GLM5.3-flash cloud + Claude Code 2.1.247 → `400 Input should be a valid string` — [Issue #18059](https://github.com/ollama/ollama/issues/18059)。
- `gemma3:12b` 结构化 `format` 在双引号输入 token 上截断 — [Issue #18094](https://github.com/ollama/ollama/issues/18094)。
- 非管理员 Mac 账户无法完成 “Restart to update” — [Issue #11972](https://github.com/ollama/ollama/issues/11972)。
- GUI 在更早构建中丢失深色模式（仅白色）；已在 0.33.2 处理 — [Issue #18008](https://github.com/ollama/ollama/issues/18008)。

**较低 / 产品向**

- 切换聊天时未发送的 composer 草稿丢失 — [Issue #18138](https://github.com/ollama/ollama/issues/18138)，修复 [PR #18139](https://github.com/ollama/ollama/pull/18139)。
- GUI 不渲染行内 LaTeX — [Issue #15310](https://github.com/ollama/ollama/issues/15310)。
- 从 GUI 删除模型 — [Issue #16345](https://github.com/ollama/ollama/issues/16345)。
- Docker 层体积（约 3 GB，不可续传）— [Issue #18127](https://github.com/ollama/ollama/issues/18127)。

若干 MLX 泄漏工单（#16698、#17875、#17924）已标为 closed；请把 **#18131（8 GiB prefix cache）** 当作当前跟进项，而不是已确认的泄漏。

## 6. 对应用开发者的含义

- **桌面 / Claude Desktop 请钉在 0.33.2**：深色模式、macOS 单实例，以及目录更新不再中止进行中的代理调用。Windows Claude 开关仍在 [PR #18104](https://github.com/ollama/ollama/pull/18104) 之后。
- **调试 Qwen tool loop 时优先用 HTTP API，而不是 agent SDK。** 直接 `/api/chat` 与 OpenAI-compat 往往成功，而 Claude/agent 包装层会挂起（[#17839](https://github.com/ollama/ollama/issues/17839)）或在 “no user query” 上报 500（[#17778](https://github.com/ollama/ollama/issues/17778)）。最后一轮务必保留一条 user message；不要只发送纯 tool 历史。
- **Apple Silicon + MLX agent：** 预算要覆盖 prefix-cache 增长，而不只是权重。32 GB 机器上，固定的 **8 GiB** prefix cache 会在多轮 agent 负载下逼出 swap（[#18131](https://github.com/ollama/ollama/issues/18131)）。在该预算可配置之前，长会话之间卸载 / 重启 runner。MLX 结构化输出在 0.33.1 已是一等能力——用它，而不是只靠提示词拼 JSON。
- **Vision 与 Gemma：** 不要假设 Windows 上 Gemma4 OCR 可用（[#16532](https://github.com/ollama/ollama/issues/16532)）。Jetson/APU 主机在小尺寸 Gemma4 的内存记账修好之前，应停留在 0.32.2 之前的版本。
- **调度器怪癖：** 成功加载后留意是否会静默以 ctx=4096 再载一次（[#18129](https://github.com/ollama/ollama/issues/18129)）。设置 `keep_alive=-1`，并在自建健康检查中断言 `load_duration` / context；即便模型已热，报告的加载时间仍会波动（[#12443](https://github.com/ollama/ollama/issues/12443)）。
- **Vulkan / VM / iGPU：** 若通过 virtio-gpu 或 APU 提供服务，请停留在 0.32.9，或等待 [PR #18124](https://github.com/ollama/ollama/pull/18124)。仅走 API 的路径可能把 `ollama run` 不会打爆的 Vulkan buffer OOM（[#18117](https://github.com/ollama/ollama/issues/18117)）——用你实际上线的 prompt + system-prompt 尺寸做测试。
- **Cloud / Claude Code：** GLM5.3-flash cloud 仍会打出 Anthropic-schema 400（[#18059](https://github.com/ollama/ollama/issues/18059)）。转发前把 tool/content 块校验成字符串。
- **GGUF 作者：** 在 [PR #18130](https://github.com/ollama/ollama/pull/18130) 落地前，alignment 元数据可能被忽略；不要依赖非 32 字节的 `general.alignment`。

本窗口没有客户端协议破坏性变更；风险在 **行为层**（调度器重载、MLX RSS、tool-message 500），而不是 API 版本号。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

我会拉取最新的 LiteLLM 发行说明和仓库动态，确保摘要与当前实际发布内容一致。过去 24 小时的标签发行说明内容偏少；我会打开 GitHub 发行页面核对实际包含的内容。
# LiteLLM Digest — 2026-08-30

仓库：[BerriAI/litellm](https://github.com/BerriAI/litellm)（约 57.5k stars）。当前最新 **stable** 仍为 **v1.98.0**（22 Aug）。过去 24 小时是一波预发布扎堆：`v1.100.0-rc.1`、`v1.99.0-rc.2`，外加 `v1.100.0-dev.{1,2}`。该窗口内触及 93 个 issue、约 500 个 PR；工作树集中在 Anthropic/`/v1/messages` 保真度、spend/cost 正确性、auto-router、MCP 以及 registry 定价。

## 1. 本周要点

LiteLLM 正从 1.98 stable 线切到 1.99/1.100。运维应将 **v1.98.0** 作为生产钉住版本，仅在需要 Anthropic empty-thinking / tool-call sanitizer 修复、prompt-cache 节省报表，或新的 Friendli/Gemini/xAI registry 行时，再使用 **v1.100.0-rc.1**。当前 issue 看板仍由 **协议转译正确性**（Claude 空内容占位符、MCP auto-execute 劫持客户端工具、流式 `usage` 丢失）和 **多租户运维**（未鉴权 `/metrics` 泄露 PII、spend 看板少计、spend-log 索引饱和）主导。对应修复 PR 于同日落地：在仅 tool 的轮次停止注入 `[System: Empty message content sanitised…]`（[#34822](https://github.com/BerriAI/litellm/pull/34822)），关闭时排空 spend 队列（[#38168](https://github.com/BerriAI/litellm/pull/38168)），以及按预路由 hook 已选定的档位解析 fallback（[#38882](https://github.com/BerriAI/litellm/pull/38882)）。

## 2. 发行与破坏性变更

| Tag | When | Channel | Notes |
|---|---|---|---|
| [v1.100.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-rc.1) | 30 Aug | RC | Anthropic empty-thinking 自愈、complexity-router 最低档位整理、prompt-cache 节省拆分（总额 vs 网关归因）、分页 `GET /public/v1/model_hub`、A2A agent 语义搜索、Lakera v2 skip-message + advisory 模式、在 reasoning 模型上剥离 GPT-5 的 temp/`top_p`。 |
| [v1.99.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.99.0-rc.2) | 30 Aug | RC | 仅回移植：shadcn UI 回归、Vertex realtime/vision fixtures、`/v1/messages` 上的 Anthropic `tool_result` document blocks。 |
| [v1.100.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-dev.2) / [dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.0-dev.1) | 26–28 Aug | nightly | UI shadcn/react-hook-form、OTEL 错误映射、Together `response_format`、Bedrock `reasoning_effort`、Redis 凭证支持。**dev.1 破坏性变更：** 删除 `prompt_token_calculator`。 |
| [v1.98.0](https://docs.litellm.ai/release_notes/) | 22 Aug | **stable** | PTU 按预留容量计费（`ptu_count` × `cost_per_ptu_per_hour`，该部署关闭按 token 计费）、auto-router 影子评估、可调用 routing groups。 |

所有 Docker 标签均使用 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 引入的密钥进行 **cosign 签名**。提升镜像前请先校验：

```bash
cosign verify --key https://raw.githubusercontent.com/BerriAI/litellm/0112e53046018d726492c814b3644b7d376029d0/cosign.pub \
  ghcr.io/berriai/litellm:v1.100.0-rc.1
```

**迁移说明**
- 不要把生产钉在 `*-dev.*`。1.100.0-dev.1 删除 `prompt_token_calculator` 会打断自定义 token 估算器。
- `/metrics` 鉴权默认值已在今年早些时候翻转；仍收到 401 的采集器需要 `litellm_settings.require_auth_for_metrics_endpoint: false` —— 该退出开关是已知的多租户泄漏（见 §5）。
- Spend 语义：`/v2/user/info.spend` 是**重置时归零的预算计数器**；`/user/daily/activity` 是累计值。文档 PR [#38883](https://github.com/BerriAI/litellm/pull/38883) 是客户一直在要的澄清。
- Master-key 轮换此前会解禁每一条 model 并重置审计时间戳；修复见 [#38878](https://github.com/BerriAI/litellm/pull/38878)。等该修复落地后再轮换。

## 3. 新模型与硬件支持

本窗口无新的 CUDA/ROCm/Metal/CPU 后端。LiteLLM 仍是网关；硬件支持取决于上游提供商或 vLLM/OMNI 部署已经暴露的能力。

**Registry / 定价新增（过去 24 小时 PR + RC 说明）：**
- Friendli serverless：`friendliai/zai-org/GLM-5.3`（$1.40 / $4.40 per MTok）和 `GLM-5.3-Flash`（$0.15 / $0.50）—— [#38881](https://github.com/BerriAI/litellm/pull/38881)、[#38880](https://github.com/BerriAI/litellm/pull/38880)，catalog 自动同步 [#35918](https://github.com/BerriAI/litellm/pull/35918)。
- RC 中更广的 registry 扫荡：Gemini Omni 1.1 Flash、xAI `grok-imagine` 图像模型、Mistral cache-read 定价、GLM 5.3 Flash + Kimi K2.7 Code、Together catalog 同步、Bedrock Mantle GPT-5.5/5.4 272K 档位（[#38560](https://github.com/BerriAI/litellm/pull/38560)、[#38615](https://github.com/BerriAI/litellm/pull/38615)、[#38694](https://github.com/BerriAI/litellm/pull/38694)）。
- Veo 3.1 lite 定价请求已关闭：[issue #33199](https://github.com/BerriAI/litellm/issues/33199)。
- 较旧构建上仍有报告称 xAI `grok-imagine-image` 未出现在 `/images` 健康部署中（[#26184](https://github.com/BerriAI/litellm/issues/26184)）；RC 的 registry 行本身并不能修复路由。

**进行中的鉴权 / 提供商管道**
- Anthropic Workload Identity Federation（OIDC JWT-bearer）—— 功能 [#28607](https://github.com/BerriAI/litellm/issues/28607)，内部 CI 副本 [#38818](https://github.com/BerriAI/litellm/pull/38818)。适用于无法签发长期 Anthropic API key 的集群。
- Bedrock Converse：OpenAI Agents SDK 自由形式工具（`type: custom`）作为无参数 `toolSpec` 转发，`custom` 字段被丢弃（[#38871](https://github.com/BerriAI/litellm/pull/38871)）。
- Azure chat：发送前展平 tool schema 顶层的 `anyOf`/`oneOf`/`allOf`（[#38870](https://github.com/BerriAI/litellm/pull/38870)）。
- vLLM OMNI 视频透传（`/vllm/v1/videos/sync`，MiniMax-H3）在 [#38050](https://github.com/BerriAI/litellm/issues/38050) 讨论 —— 作为原始透传可用，并非一等公民 `/videos` API。

## 4. 性能与优化

本窗口未发布 kernel/吞吐数字。工作集中在 **控制面与成本路径**，而非 decode 延迟。

- **Spend 路径：** `LiteLLM_SpendLogs` 缺少 `(api_key, startTime)` 索引；预算窗口重播种会对整表顺序扫描，并在 2-vCPU RDS 上触发 Prisma `P2028`（[#35766](https://github.com/BerriAI/litellm/issues/35766)，已关闭）。搭配关闭排空 [#38168](https://github.com/BerriAI/litellm/pull/38168)，这样 `--max_requests_before_restart` 不再静默丢弃内存中的 SpendLogs 队列。
- **Least-busy 路由** 在两台相同 vLLM 副本上仍被报告不够激进（[#37622](https://github.com/BerriAI/litellm/issues/37622)）。Complexity/auto-router 的 fallback 现在按 **预路由 hook 已选定的档位** 解析，而不是客户端可见的 router 名称（[#38882](https://github.com/BerriAI/litellm/pull/38882)）。
- **缓存节省：** 显式 `cache_read_input_token_cost: 0.0` 被当成“未设置”，按完整 input 费率计费（[#38865](https://github.com/BerriAI/litellm/pull/38865)）。RC 中 prompt-cache 节省已拆成总额 vs 网关归因（[#38134](https://github.com/BerriAI/litellm/pull/38134)）。
- **Token 计数回退** 现在包含 tools、system 以及 Anthropic image/document blocks（[#38657](https://github.com/BerriAI/litellm/pull/38657)）—— 影响调用前预算检查，与 TTFT 无关。
- **LoggingWorker** 在线程池中 event loop 身份变化时会丢弃队列（[#36548](https://github.com/BerriAI/litellm/issues/36548)）—— 多 loop worker 池下的静默日志/成本空洞。
- **PTU**（stable 1.98）：预留容量按小时一口价，该部署关闭按 token 计费，避免预留流量被双重计费。

## 5. 稳定性与回归

按生产爆炸半径排序。“修复 PR”指过去 24 小时内声称同一根因的未关闭 PR —— 不一定已合并。

**P0 — 错误答案 / 被劫持的 agent 循环**
- Claude 原样返回 `[System: Empty message content sanitised to satisfy protocol]`（[#24498](https://github.com/BerriAI/litellm/issues/24498)，11 条评论，仍为 OPEN）。根因与 [#34822](https://github.com/BerriAI/litellm/pull/34822) 吻合：空内容占位符被注入仅含 tool-call 的 assistant 轮次，经 Anthropic 持久化后再回显。合并前的权宜之计：避免仅 tool 的 assistant 轮次，或钉住包含该 PR 的构建。
- MCP `require_approval: "never"` 自动执行会从 Claude Code（Read/Bash/Edit）偷走客户端 `tool_use`，并使所有非 MCP 工具失败（[#37031](https://github.com/BerriAI/litellm/issues/37031)）。不要把自动执行的 MCP 工具放在 agentic IDE 所连接的同一个 model alias 上。
- 当最后一个 chunk 仍带非空 `choices` 数组时，流式会丢弃上游 `usage` → `cached_tokens` 丢失，input 按全价计费（[#36168](https://github.com/BerriAI/litellm/issues/36168)）。与更早的出口侧 #28735 互为镜像。

**P0 — 安全 / 多租户隔离**
- 使用较旧文档/镜像的运维仍把 `/metrics` 当成默认不安全端点；label 携带 `hashed_api_key`、`api_key_alias`、`team_alias`（邮箱）、请求方 IP（[#24530](https://github.com/BerriAI/litellm/issues/24530)）。当前 main 默认鉴权为 **开**；确认 `require_auth_for_metrics_endpoint` 未被显式设为 false，并用专用 key + 网络策略采集。本月相关 GHSA：经 `user_config` 的 SSRF，以及已鉴权 SSRF/凭证外泄（26 Aug 公布）。
- 本应不可变的安全 `user_id` 仍可被 teams 覆盖（[#14505](https://github.com/BerriAI/litellm/issues/14505)，P1 企业版）。

**P1 — 成本 / 计费正确性**
- Usage 看板分页少计 spend；失败请求被记为 0（[#11929](https://github.com/BerriAI/litellm/issues/11929)，15 条评论，已关闭但仍是流量最高的工单）。
- Anthropic batch 成本始终为 $0 —— `msgbatch_*` 被路由到错误端点（[#27944](https://github.com/BerriAI/litellm/issues/27944)，已关闭）。
- Azure Responses 流式在 `stream_options.include_usage` 上返回 400，从而卡住 Codex（[#28553](https://github.com/BerriAI/litellm/issues/28553)）。
- 调用方未指定时，Gemini 3.x 会被注入 `temperature=1.0`，违反 Google 的新契约（[#38663](https://github.com/BerriAI/litellm/issues/38663)）。
- GPT-5.x reasoning 模型被错误宣传为接受 `temperature`（[#34301](https://github.com/BerriAI/litellm/issues/34301)）；RC 会剥离 temp/`top_p`（[#38593](https://github.com/BerriAI/litellm/pull/38593)）。
- 自 v1.85.0 起，以 `Reasoning(effort, summary)` dict 传入的 Anthropic `reasoning_effort` 会被静默丢弃（[#28196](https://github.com/BerriAI/litellm/issues/28196)）。
- Responses→Chat 降级会在 Vertex/Bedrock 上丢弃 `function_call_output.output` 内的 `input_file`（[#28232](https://github.com/BerriAI/litellm/issues/28232)）。

**P1 — 平台 / 镜像**
- `v1.83.14-stable` 的 `linux/arm64` manifest 包含 **amd64 二进制**（[#29382](https://github.com/BerriAI/litellm/issues/29382)）。不要在 Graviton/Apple Silicon 上以 `--platform linux/arm64` 运行该标签。
- pip 1.85.1 上 `/ui/login` 返回 404，而 `/fallback/login` 可用（[#29340](https://github.com/BerriAI/litellm/issues/29340)）—— 通常是缺少 UI 静态挂载 / nginx 规则。

**P2 — 转译 / 看板小毛病**
- Fireworks 拒绝带 `"default": null` + `"title"` 的 tool schema；`drop_params` 不会遍历嵌套 schema（[#27821](https://github.com/BerriAI/litellm/issues/27821)）。
- Cloudflare Workers AI 空的 `choices[0].message.content`（[#29353](https://github.com/BerriAI/litellm/issues/29353)）。
- Anthropic `/v1/messages` 到 OpenAI 的实验性透传仍有一组五连 bug（[#23841](https://github.com/BerriAI/litellm/issues/23841)）。
- 看板 Logs 按 **messages** 分页，而视图按 **session** 分组（[#38060](https://github.com/BerriAI/litellm/issues/38060)）。
- Guardrails：Lakera v2 忽略 `skip_system_message_in_guardrail`（[#34396](https://github.com/BerriAI/litellm/issues/34396)，已关闭；RC 在 [#34940](https://github.com/BerriAI/litellm/pull/34940) 重新遵守）。PUT `/guardrails/{id}` 返回 200 但从未在服务 worker 上生效（[#38877](https://github.com/BerriAI/litellm/pull/38877)）；Gemini `:generateContent` 路由完全跳过 guardrails（[#38869](https://github.com/BerriAI/litellm/pull/38869)）。
- MCP Gateway `tools/list` 的 cancel-scope `RuntimeError` + 重启时 schema 列被丢弃（[#28391](https://github.com/BerriAI/litellm/issues/28391)）。

## 6. 对应用开发者意味着什么

1. **生产 agent 继续钉在 v1.98.0**，除非被 Claude 空内容回显或 GPT-5 temperature 400 挡住。只有在用自己的 Claude Code / Codex 客户端验证仅 tool 的 assistant 轮次和 MCP 自动执行之后，再提升到 `v1.100.0-rc.1`。
2. **不要在服务端 MCP 自动执行和 agentic IDE 之间共用同一个 model alias。** `require_approval: "never"` 会吃掉客户端的 `tool_use` 流。拆开 alias：一套“代理执行 MCP”部署，一套“工具透传”部署。
3. **相信 `/user/daily/activity` 的 spend 数字，而不是 `/v2/user/info.spend`。** 后者是可重置的预算计数器。若按看板给内部团队计费，请等待分页 / 失败请求归因修复，或直接查 SpendLogs —— 若仍在 #35766 之前的 schema 上，请加上 `(api_key, startTime)` 索引。
4. **流式成本仍然会丢。** 若最后一个 chunk 同时有 `choices` 和 `usage`，LiteLLM 可能丢掉 `cached_tokens`。对缓存密集的 Claude/Gemini 负载，在 #36168 消失前，请用非流式 usage 对象或提供商账单对账。
5. **今天就能路由的新模型（上到 RC/main 之后）：** Friendli GLM-5.3 / GLM-5.3-Flash、Gemini Omni 1.1 Flash、grok-imagine（chat/registry；`/images` 仍不稳）、Kimi K2.7 Code、Bedrock Mantle GPT-5.5/5.4 272K。定价行 ≠ 健康部署 —— 切换默认前先打 `/health` 和 `/model/info`。
6. **Guardrails 与 Gemini 原生路由。** 若调用 `:generateContent` 或 `/llm_passthrough`，在 [#38869](https://github.com/BerriAI/litellm/pull/38869) 上到机器前，假定 guardrails 是空操作。PUT 更新 guardrail 需要会应用内存状态的 worker（[#38877](https://github.com/BerriAI/litellm/pull/38877)）；返回 200 并不能证明已生效。
7. **锁紧 `/metrics`，谨慎轮换 key。** 把 Prometheus 当成 PII 暴露面。master-key 轮换后，确认被封禁的模型仍被封禁（[#38878](https://github.com/BerriAI/litellm/pull/38878)）。
8. **ARM 镜像：** arm64 上跳过 `v1.83.14-stable`。优先使用当前已签名标签，并在 CI 里做 `cosign verify`。
9. **Anthropic 的 WIF** 是值得关注的企业鉴权路径；若正在淘汰静态 Anthropic 密钥，请跟踪 [#28607](https://github.com/BerriAI/litellm/issues/28607) / [#38818](https://github.com/BerriAI/litellm/pull/38818)。

**接下来关注：** [#34822](https://github.com/BerriAI/litellm/pull/34822)（Claude 占位符）是否合并、[#37031](https://github.com/BerriAI/litellm/issues/37031)（MCP vs Claude Code）、从 rc.2 切出 1.99.0 stable，以及 `/metrics` 的 label 脱敏是真正随版本发布，还是继续只靠鉴权缓解。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

先核对 Unsloth 仓库今日的最新发布与 changelog，再按你的规则出简体中文译文。# Unsloth Digest — 2026-08-30
Repo: [unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. 本周要点

**v0.1.804-beta** 为首发提供 **Qwen3.8-Flash-Next**（125B MoE，Qwen4-preview 架构）与 **GLM-5.3-Flash / ox-alpha**（320B，18B 激活）的本地推理。核心数字：Qwen 的 1-bit Dynamic GGUF 可在 **75GB RAM / 统一内存** 上运行（无需 VRAM），GLM 的 1-bit 需要 **102GB 合计 RAM+VRAM**；同时带来 **RAM 卸载推理提速 5×**，以及可用的 **重复（“无限”）compaction**。

同一窗口还落地了一批 Studio 体验优化：MLX/Mac 运行时修复、局域网 **免密钥 / 免密码** API、XET/HTTP 下载切换、断线可恢复对话，以及更清晰的加载前内存估算。训练/推理路径上的并行工作仍很密集：Studio 中的 GRPO、多 GPU `index_select` 训练、smart-offload 与 `--fit` 的对比，以及一堆 SQLite / generation-reaper 可靠性 PR。

## 2. 版本与破坏性变更

| Version | Notes |
|---|---|
| [**v0.1.804-beta**](https://github.com/unslothai/unsloth/releases/tag/v0.1.804-beta) | Qwen3.8-Flash-Next + GLM-5.3-Flash 本地运行；5× RAM-offload；infinite compaction；100+ 项聊天/可靠性/性能改动。指南：[Qwen](https://unsloth.ai/docs/models/qwen3.8-next)、[GLM](https://unsloth.ai/docs/models/glm-5.3-flash)。GGUF：[unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF)、[unsloth/GLM-5.3-Flash-GGUF](https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF)。 |
| [**v0.1.803-beta**](https://github.com/unslothai/unsloth/releases) / **v0.1.802-beta** | 修 bug 的列车（约 170 个 PR）。修复 MLX/Mac 运行时。局域网免密钥 API + 键盘快捷键。XET vs HTTP 下载切换。changelog 中有 AMD 相关说明。安装器版本钉到 `unsloth>=2026.8.21`。 |

**迁移 / 运维说明**

- 较旧的 llama.cpp 构建会拒绝 Qwen3.8-Flash-Next GGUF（`architecture 'qwen4exp'`）。Studio 用户若看到 “This model is not supported yet”，需要 **0.1.804-beta**（或能识别 `qwen4exp` 的 llama.cpp）。见 [#9811](https://github.com/unslothai/unsloth/issues/9811)。
- Windows 应用内更新到 `0.1.803-beta` / 包版本 `2026.8.21` 后，部分机器即使 NVIDIA 驱动正常，也会落到 **仅 CPU 的 PyTorch**。生产环境滚动桌面更新前请跟踪 [#9857](https://github.com/unslothai/unsloth/pull/9857) 与 [#9858](https://github.com/unslothai/unsloth/pull/9858)。
- Compaction / rolling context 现已成为一等路径（[#7472](https://github.com/unslothai/unsloth/issues/7472) 已关闭）。长生命周期 agent 会话应重新测试 compaction，而不是默认“只能新开聊天”。
- 新的运维策略 `UNSLOTH_NO_CHAT_HISTORY`（[#9982](https://github.com/unslothai/unsloth/pull/9982)）让会话变为临时无历史——若把 Studio 当多租户网关，这一点很关键。

## 3. 新模型与硬件支持

**Models**
- **Qwen3.8-Flash-Next** — 125B（≈6B 激活 + 51B n-gram embeddings + MTP）。多模态，262K 上下文，推理档位 None / Low / Medium / Extra High，Preserved Thinking。1-bit Unsloth Dynamic GGUF 比 **BF16（355GB）小 79%**，并保持 **约 80% top-1 准确率**。N-gram / PLE 层可 mmap 到 SSD。
- **GLM-5.3-Flash (ox-alpha)** — 320B / 18B 激活，多模态，最高 **1M 上下文**，Low/High/Max 推理档。1-bit Dynamic GGUF 约 93GB，**相对 BF16（642GB）小 85%**，保留约 71% top-1；3-bit（约 128GB 档）保留约 87%。
- 仍被点名、尚未作为一等支持落地：DeepReinforce **Ornith-1.0**（[#6721](https://github.com/unslothai/unsloth/issues/6721)）。

**Backends / devices**
- **Metal / MLX / Mac**：0.1.803-beta 修复了损坏的 MLX/Mac 运行时。历史帖 “no CUDA on Mac” [#685](https://github.com/unslothai/unsloth/issues/685) 仍是 FAQ 入口；Apple Silicon 上支持路径是 Desktop。
- **AMD / ROCm**：情况混杂。gfx1151（Strix Halo）上 Qwen3.8-27B V3 崩溃报告在 Unsloth 的 20 格矩阵中 **未能复现**；嫌疑落在 llama.cpp 的 context checkpoint（[#9792](https://github.com/unslothai/unsloth/issues/9792)）。仍开放：统一内存 APU 加载被限制在系统 RAM，而不是 110GB GPU 池（[#6834](https://github.com/unslothai/unsloth/issues/6834)）、Strix Halo llama-server 启动崩溃（[#7380](https://github.com/unslothai/unsloth/issues/7380)）、RDNA4 gfx1201 预编译 `llama-server` segfault（[#7307](https://github.com/unslothai/unsloth/issues/7307)）、泛化的 “ROCm can’t load any models”（[#8998](https://github.com/unslothai/unsloth/issues/8998)）。
- **CUDA / multi-GPU**：跨 planner 切分的多卡训练会在 `index_select` 处挂掉，除非你的树里已有 [#9995](https://github.com/unslothai/unsloth/pull/9995)。Windows 更新后 “no visible GPU” 是 PyTorch/CUDA 发现 bug，不是硬件消失（[#9858](https://github.com/unslothai/unsloth/pull/9858)）。
- **Quant / formats**：两款 Flash 模型提供 Unsloth Dynamic 1-bit / 3-bit GGUF；Studio 里本地 safetensors QLoRA 仍会按完整 BF16/FP16 误加载（[#5344](https://github.com/unslothai/unsloth/issues/5344)）——按 ID 走 GGUF 仍是 Studio 上可靠路径。

## 4. 性能与优化

- **0.1.804-beta 在 RAM offload 下推理提速 5×**（发行说明中的宣称；按偏 RAM 的 MoE 路径理解，不是稠密 GPU decode）。
- **更聪明的 GPU+RAM offload planner** + 加载前 “装得下吗？” 估算。oobabooga 的反例：在 6 核 i5-12400F 桌面上，智能 `-ot` planner 在 **43 格中有 40 格慢于 `--fit on`**（[#9861](https://github.com/unslothai/unsloth/issues/9861)）。默认 planner 数字来自 192 核数据中心主机——消费级机器在差距收窄前应钉死 `--fit on`。
- 重复 compaction 不再是一次性技巧；长对话可以持续 compact（[#7472](https://github.com/unslothai/unsloth/issues/7472)）。
- `GET /v1/models` 耗时 316–621ms，内部目录只需 13–34ms；[#9998](https://github.com/unslothai/unsloth/pull/9998) 把可服务性扫描缓存在 OpenAI 兼容路由后面。
- 有人请求为 CPU+GPU 部分卸载配置 prompt / generation 超时（尾部可慢 20×）——[#5756](https://github.com/unslothai/unsloth/issues/5756)。
- 权重完全在独立 GPU 上时，内存策略开关是空操作；UI 现在会明示这一点（[#9571](https://github.com/unslothai/unsloth/pull/9571)）。“Don’t reserve system RAM” 在 `-ngl -1` 之后仍无法释放宿主页（[#9033](https://github.com/unslothai/unsloth/issues/9033)）。
- Studio Train 页正在把 **GRPO（RL）** 做成一等方法（[#9310](https://github.com/unslothai/unsloth/pull/9310)，关闭 #8777）——此前只有 SFTTrainer 分支。

社区 decode 数据点（非官方）：1-bit Qwen3.8-Flash-Next 配合 SSD n-gram offload，在 5080 + 9950X3D + 96GB RAM 上约 **30 tok/s**，相对内存内 n-gram 大约慢 4%。

## 5. 稳定性与回归

按运维严重程度排序。

**P0 — 服务停止应答**
- Studio **SQLite 死锁**：所有线程堵在 `sqlite3.connect()` / `close()`，监听套接字仍开着，curl 挂起（[#9008](https://github.com/unslothai/unsloth/issues/9008)）。相关日志风暴：一个慢写入 → 四分钟内 54× `409 ChatMessageProtocol`（[#9996](https://github.com/unslothai/unsloth/pull/9996)）。
- **生成冻结但 HTTP 200**：持久聊天不再推进；UI “disconnects over LAN”。Reaper PR：[#9997](https://github.com/unslothai/unsloth/pull/9997)。
- Deep Research 在 Gemma-4-26B-A4B 上卡在 “Writing The Report”（[#8483](https://github.com/unslothai/unsloth/issues/8483)）。

**P1 — 加载 / 训练正确性**
- 多 GPU `FastLanguageModel.from_pretrained` 训练：张量拆到 `cuda:0` / `cuda:1` → `index_select`（[#9995](https://github.com/unslothai/unsloth/pull/9995)）。
- Studio 把本地 **safetensors 按全精度加载**（约 15.7GB）而不是 4-bit QLoRA；GGUF ID 路径正常（[#5344](https://github.com/unslothai/unsloth/issues/5344)）。
- 用了 GPU 算力，**VRAM 闲置**，权重量在系统 RAM（[#7449](https://github.com/unslothai/unsloth/issues/7449)，[#6855](https://github.com/unslothai/unsloth/issues/6855)）。
- 自动加载 **忽略自定义上下文长度 / KV-cache quant**（[#7477](https://github.com/unslothai/unsloth/issues/7477)）。
- `save_pretrained_merged` 输出垃圾（[#5410](https://github.com/unslothai/unsloth/issues/5410)）。
- Qwen3.5 9B 永远走不到第一步训练；Gemma 4 26B-A4B 在 96GB 上 QLoRA batch=1 OOM（[#7203](https://github.com/unslothai/unsloth/issues/7203)）。
- Windows 更新 → 仅 CPU 的 PyTorch / “No visible GPU”（[#9857](https://github.com/unslothai/unsloth/pull/9857)，[#9858](https://github.com/unslothai/unsloth/pull/9858)）。

**P1 — AMD / 架构**
- Qwen3.8-27B **V3 GGUF 在 AMD 上 prefill 后崩溃**；V2 `408fcc1807ab` 可用。Unsloth 网格里 gfx1151 未能复现（[#9792](https://github.com/unslothai/unsloth/issues/9792)）。
- Strix Halo RAM 上限 / llama-server HIP 初始化崩溃 / RDNA4 segfault / ROCm 加载失败：[#6834](https://github.com/unslothai/unsloth/issues/6834)、[#7380](https://github.com/unslothai/unsloth/issues/7380)、[#7307](https://github.com/unslothai/unsloth/issues/7307)、[#8998](https://github.com/unslothai/unsloth/issues/8998)。

**P2 — 产品 / API**
- 聊天发送路径在 AppImage / Tauri 上 IndexedDB 持久化失败（[#9518](https://github.com/unslothai/unsloth/issues/9518)）；重新生成会复制用户轮次（[#10000](https://github.com/unslothai/unsloth/pull/10000)）。
- Model Hub WebKit SIGABRT（Skia COLRv1）（[#9480](https://github.com/unslothai/unsloth/issues/9480)）。
- Project/RAG “list files” 工具报错；write+edit 仍缺失（[#8854](https://github.com/unslothai/unsloth/issues/8854)）。
- Qwen3.8 API serving 指南无法完成 HF resolve（[#9428](https://github.com/unslothai/unsloth/issues/9428)）；所谓 raw JSONL 导出并不是 JSONL（[#8733](https://github.com/unslothai/unsloth/issues/8733)）。
- Studio web 里 Qwen 3.8 27B 仍缺少 reasoning-effort 滑条（[#8881](https://github.com/unslothai/unsloth/issues/8881)）。

**Security / CI hygiene（已合并或接近关闭）**
- 对非写入值执行 `exec`/`eval`/`compile` 时让 CI 失败（[#9999](https://github.com/unslothai/unsloth/pull/9999)，接替 [#9827](https://github.com/unslothai/unsloth/pull/9827)）。
- `os.dup2` 反弹 shell 误报 + zoo URL 白名单（[#9994](https://github.com/unslothai/unsloth/pull/9994)）。
- Subprocess-fix 目录不再污染共享 tempdir（[#9973](https://github.com/unslothai/unsloth/pull/9973)）。

## 6. 对应用开发者意味着什么

1. **把 0.1.804-beta 当作 Flash 模型的地板版本。** 若通过 Studio 或捆绑的 llama-server 提供 Qwen3.8-Flash-Next 或 GLM-5.3-Flash，旧运行时会在 `qwen4exp` 上硬失败。钉死 Desktop / 包版本 `2026.8.21+` 以及对应的 GGUF revision（V3 Qwen3.8-27B 在部分 AMD 栈上仍不稳定——保留 V2 pin）。

2. **按合计内存选型，而不是只看 VRAM。** Qwen 1-bit 是 **75GB RAM** 问题；GLM 1-bit 是 **约 102GB RAM+VRAM**。DRAM 不够时，N-gram/PLE mmap 到 SSD 是杠杆。不要默认智能 offload planner 在 6–16 核工作站上能打过 `--fit on`（[#9861](https://github.com/unslothai/unsloth/issues/9861)）。

3. **Studio 正在变成 agent 宿主，而不只是聊天 UI。** 即将到来：持久项目记忆 + Sloth Graphs（[#9987](https://github.com/unslothai/unsloth/pull/9987)）、应用内 GRPO 训练（[#9310](https://github.com/unslothai/unsloth/pull/9310)）、预注册 MCP OAuth 客户端（[#7665](https://github.com/unslothai/unsloth/pull/7665)）、`x-api-key`（[#7656](https://github.com/unslothai/unsloth/pull/7656)）、免密钥局域网、compaction、断线续传。若把 Studio 暴露在局域网，请搭配 `UNSLOTH_NO_CHAT_HISTORY`。

4. **没有 SQLite/reaper 补丁就不要把 Studio 放进关键路径。** 死锁、409 写入风暴、以及静默挂死的生成，是本周主导的宕机模式（[#9008](https://github.com/unslothai/unsloth/issues/9008)、[#9996](https://github.com/unslothai/unsloth/pull/9996)、[#9997](https://github.com/unslothai/unsloth/pull/9997)）。更稳妥的是由你自己监管的进程提供 OpenAI 兼容的 `/v1/chat/completions`，并缓存 `/v1/models`（[#9998](https://github.com/unslothai/unsloth/pull/9998)）。

5. **微调路径仍然是两套产品。** Studio 里的 GGUF 推理领先于本地 safetensors QLoRA（全精度加载，[#5344](https://github.com/unslothai/unsloth/issues/5344)）。多 GPU 训练需要 [#9995](https://github.com/unslothai/unsloth/pull/9995)。合并导出正确性仍是已知坑（[#5410](https://github.com/unslothai/unsloth/issues/5410)）——发 adapter 之前先评估 merge。

6. **Windows 桌面更新可能悄悄丢掉 CUDA。** 任何应用内更新后，先确认 `nvidia-smi` *以及* Studio Settings > System 看到同一组 GPU，再开训练任务（[#9857](https://github.com/unslothai/unsloth/pull/9857)）。

7. **需要自己补上的 Agent UX 缺口：** 没有 reasoning-effort 控制（[#8881](https://github.com/unslothai/unsloth/issues/8881)）、RAG 文件列表/写入工具不完整（[#8854](https://github.com/unslothai/unsloth/issues/8854)）、没有一等的 Codex/Claude-Code/OpenCode 自动检测（[#6841](https://github.com/unslothai/unsloth/issues/6841)）。在 Studio 追上之前，先从你自己的网关驱动这些能力。

---

</details>