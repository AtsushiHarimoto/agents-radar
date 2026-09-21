# AI 基础设施周报 2026-09-12

> 生成时间: 2026-09-12 03:47 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

我会拉取当前 GitHub 活跃度数字，让对比表有据可依，再根据各项目摘要撰写跨项目报告。
# 跨项目对比 — AI 基础设施摘要  
**窗口：** week of 2026-09-12 · 项目：vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

## 1. 生态总览

本周整条栈处于 **发布并加固** 阶段，而不是从零搭建架构的阶段。旗舰集群引擎（vLLM 0.29.0、SGLang 0.5.19 / 0.5.20.dev）正在同一批模型家族上赛跑——DeepSeek-V4 / V4.1-Flash、DFlash/DSpark 投机路径、hybrid Mamba/SWA MoE、Qwen3.8、GLM-5.3、Hy4、Kimi K3——同时翻转会改变生产显存与路由的默认项（vLLM Model Runner V2 成为默认；FlashInfer all-reduce 开启；SGLang PD-disaggregation + HiCache + DCP `fi_a2a`）。本地运行时（llama.cpp 日更标签约 b10919、Ollama 0.34.0、Unsloth 0.1.808-beta）正在补齐 MTP KV 尺寸、视觉+投机、AMD RDNA4/Vulkan，以及 tool-call 解析器。网关（LiteLLM 1.100.1）在承接智能体协议负载：MCP 默认拒绝的工具集、Claude Code / Codex / Anthropic Messages 桥接，以及预算计算。各层运维主线一致：**新硅片和新投机解码图落地速度快于正确性**，尤其是在 ROCm MI350/MI355、Blackwell SM120、structured output / xgrammar，以及 tool-call JSON 上。

## 2. 活跃度对比

实时 issue/PR 总数每小时都在变；下表是 **本窗口内各项目摘要所报活跃度**，外加 GitHub 发版节奏。

| Project | Latest tag | Release status this window | Volume / cadence signal | Tracker heat |
|---|---|---|---|---|
| **vLLM** | **v0.29.0** (2026-09-09) | 重大稳定版；CUDA 13.0 默认镜像 | 该 tag 内 **594 commits, 277 contributors (91 first-time)**；仓库快照约 ~5.4k 未关闭 PR | 高：MRV2 缺口、DS-V4 / DFlash 正确性、ROCm 精度 |
| **SGLang** | **v0.5.19** (2026-09-04)；main = **0.5.20.dev** | 过去 24h 无新 tag；nightly 活跃 | 上一稳定版：**786 PRs / 214 contributors**；**自 tag 起 main 上 564 commits**；CI：1 broken / 11 flaky | 高：PD+spec 崩溃、grammar DFA、health-check vs DP |
| **llama.cpp** | **b10919** … **b10901** | 连续日更 tag（约 24h 波段内 ~19 个 tag） | Backend + server PR（Metal fusion、HIP FA、MTP KV、WebGPU Dawn） | 量化投机、RDNA4、Intel Vulkan/SYCL 热度高 |
| **Ollama** | **v0.34.0** | 当前稳定版 | 功能发布（ChatGPT Desktop、structured-output AS、OpenAI tool search）+ 解析器/cloud hang 问题风暴 | P0 cloud hang；P1 静默 tool-call 丢弃 |
| **LiteLLM** | **v1.100.1** 稳定；**v1.102.0-dev.2** / **1.101.0-rc.\*** | 1.100 补丁 + 每日预发布研磨 | Catalog：1.100.0 中 242 models；218-model 价格同步进行中 | 供应链余波 + ReDoS + Claude Code↔vLLM 缺口 |
| **Unsloth** | **v0.1.808-beta** (2026-09-09)，此前为 **0.1.807-beta** | 双 beta 波次 | 性能/可靠性发布 + Studio agent-workspace 重建；自 tag 起 main 51 commits | AMD VRAM 核算、Studio prefill cache、Windows RAM 开关 |

**读法：** vLLM 本周交出了唯一一次 *大型* 生产 serving 切割。llama.cpp 仍是 *tag 节奏* 最快的。SGLang 在 `main` 上做的 *在途架构* 工作最多。LiteLLM 与 Ollama 在 *API 契约 / 智能体客户端* 类 bug 上最烫。Unsloth 是唯一在同一切割里同时推进训练 + 本地 Studio agent 运行时的项目。

## 3. 模型支持竞赛

| Family / feature | vLLM 0.29.0 | SGLang 0.5.19 / main | llama.cpp b109xx | Ollama 0.34.0 | Unsloth 0.1.808 |
|---|---|---|---|---|---|
| **Hy4-preview** (Tencent 770B / 49B-active, GDSA, MTP) | **已发布** | — | 已有请求（Ollama #18287） | 已有请求 | 产品矩阵中已列出 |
| **Qwen3.8-Flash-Next** (BF16/FP8/NVFP4 + MTP) | **已发布** | Qwen3.8 家族已在 0.5.19；Flash-Next/DFlash 仍嘈杂 | Thinking+tools 解析器历史 | Tool-loop 500s / 空 content | 重载后 Long-GGUF prefill-cache 丢失 |
| **DeepSeek-V4 / V4.1-Flash + DFlash/DSpark** | 已落地 + **未关闭的 SM90 assert、SM120 page/indexer 不匹配、ROCm 精度** | Packed FP4 KV、FlashMLA rebase、MegaMoE fuse — **在 main 上飞行中** | DeepSeek2 的 MTP KV 尺寸已修 | 本地 GGUF 仍是请求（#18379） | 产品列出 V4；不在 serving 正确性竞赛里 |
| **GLM-5.3 / Flash** | 强制 MRV1 时 ROCm GSM8K 崩塌 | SM120 资格认证 + **disagg+spec 崩溃** | GLM-4-MoE 的 MTP KV | `:cloud` 相对 Z.AI 的无界 reasoning | 产品列出 GLM-5.3-Flash |
| **Kimi K3 NVFP4** | Checkpoints 已发布 | 已是一等公民级 DCP/PD；comm-backend 默认在扩展 | — | — | 产品列出 K3 |
| **Granite SWA / NemotronH Omni V3 + MTP** | **已发布** | Granite 4.2 已在 0.5.19 | — | — | — |
| **SenseNova-U1 / VDN-H3 / Qwen-Image-Layered** | — | **SGLang 领先**（跟踪 + 已关闭/未关闭 PR） | — | — | 本 beta 扩散 1.2–1.7× |
| **Maple 20B-A1B ternary MoE / STQ1_0** | — | — | **llama.cpp 领先**（在途 PR） | — | — |
| **Consumer / odd silicon** | CUDA 13.0 默认；main 上 Rubin/13.4 pin；T4 Triton SHMEM 仍旧 | gfx950 Instinct 优先；RDNA3/4 仅跟踪；Ascend DSV4 + DFlash | Metal fusion 表；HIP gfx1201 FA；OpenCL Q4_0；WebGPU Dawn | gfx1200 Tensile miss；Jetson 8GB Gemma4 OOM | **Vulkan 默认** 用于 Strix / 无 ROCm 的 iGPU |

**谁领先**
- **Day-0 / 集群侧冷门模型：** vLLM 与 SGLang 平分领先。vLLM *已发布* Hy4-preview、Qwen3.8-Flash-Next、GraniteSWA、NemotronH Omni V3、Kimi K3 NVFP4。SGLang *掌握未完成的前沿*：V4.1 packed FP4、GLM-5.3-Flash SM120、SenseNova、diffusion/image、Ascend、gfx950 PD。
- **本地 GGUF / 边缘架构：** llama.cpp（ternary MoE、MTP KV、OpenCL、WebGPU、Hexagon row-split）。
- **「笔记本 / Studio 上能跑」：** Ollama 赢在 ChatGPT Desktop 集成；Unsloth 赢在 AMD Vulkan + 扩散 + 微调导出。两者都没赢下 V4-Flash 的 *正确性* 竞赛。

**落地建议：** 若模型是 2026 年的 MoE + MTP + Flash/DSpark 图、跑在 NVIDIA/AMD 集群 GPU 上，从 **vLLM 0.29.0 钉死** 或 **SGLang 0.5.19** 起步，把 `main` 当实验室。若是混合客户端 GPU 上的 GGUF，用 **llama.cpp b10907+**（MTP）/ **b10906+**（vision+spec）。

## 4. 性能前沿

优化不再是「把 Llama-3 的 GEMM 再快一点」。它集中在五个地方：

**1. 投机解码图（MTP / EAGLE / DFlash / DSpark）**  
vLLM：spec-decode CUDA-graph 路径、padded FULL graphs、draft prefill 前跳过 DP-sync、按请求 acceptance 指标。SGLang：FlashMLA V4.1 rebase、NPU 上的 DFlash、Gemma EAGLE3 hidden-state 捕获。llama.cpp：图像后投机的位置修复；量化 target 发散仍未关。这是风险调整后收益最高的性能工作——增益是真的，静默质量断裂也是真的。

**2. MoE 内存拓扑**  
vLLM：batch-sharded sampling（logits ÷ TP）、shared experts 并入 MegaMoE、增量 expert offload + `--moe-expert-pool-rows`、FlashInfer AR 默认。SGLang：fuse shared→sparse experts、packed FP4 main KV、集群级 DCP `fi_a2a`。llama.cpp：两层 GPU+RAM expert cache（请求已关）以及 disk KV（`--cache-disk`，48 👍，尚未发布）。Unsloth：量化 MLX KV（prompt 内存 −74%）。

**3. 混合注意力 + 前缀缓存**  
Mamba/GDN/SWA + MTP 前缀缓存未命中（vLLM #53504；SGLang HiCache 假命中 #39147）。vLLM Mamba 前缀缓存检查点：**9–25% TTFT**。混合模型现在首先是 *缓存正确性* 问题，而不只是 kernel 问题。

**4. 跨厂商 kernel**  
NVIDIA：SM100 复用 Hopper GEMM、SM120 DeepGEMM / page-size 拉锯、CUDA 13.0→13.4。AMD：vLLM ROCm MXFP8 dequant、MI355X DS-V4.1 数字（conc=1 时约 ≈35.9 tok/s total / 9 tok/s/GPU——设备仍未吃满）；llama.cpp gfx1201 MMA FA 相对更早约 ~2× PP 回退；Unsloth **Vulkan 相对 ROCm 约 ~20%**，Strix Halo +23% PP / +8% gen。Apple：Ollama structured-output 延迟；Unsloth gated-delta 训练最高 25%，MLX 自愈。

**5. Serving 控制面，而不是 kernel**  
vLLM 准入 `--max-num-queued-reqs/tokens`、确定性前缀哈希（无 `PYTHONHASHSEED`）。SGLang SessionAware router、运行时 P↔D 角色切换、health-check 污染 DP。LiteLLM retry-breadcrumb OOM 修复、spend-counter 合并、5-minute prompt-cache TTL 对 1-hour 缓存仍然错误。容量和 *成本* 真正在这里对运维人员发生移动。

**值得记下的数字（来自本窗口，不是同台烘焙对比）：**  
vLLM Kimi-K3 fused MXFP4 top-k 约 **5% E2E**；Mamba metadata Triton **6.6–7.6×** kernel；`eh_proj` **12.9–25.2%**。Unsloth 扩散 **1.2–1.7×**。不要把 0.28 的 `max_num_seqs` 原样抄到 0.29。

## 5. 分层定位

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

| Layer | 本周角色 | 不要把它当 |
|---|---|---|
| **vLLM** | 默认的 *NVIDIA 优先* 生产引擎。MRV2 现在就是产品。CUDA 13.0 artifact。破坏性变更清单文档最好。 | 一次安静补丁。Sequence parallelism / DBO / elastic EP / custom logits 在约 ~v0.32 之前仍会强制 **MRV1 fallback**。 |
| **SGLang** | *解聚 + 智能体 KV* 引擎。HiCache、PD 角色切换、SessionAware router、多厂商（Blackwell、gfx950、Ascend）。在未完成的模型图上更快。 | 若你今天就需要 V4.1 / GLM-5.3-Flash / gfx950 PD，把它当 v0.5.19 生产的即插即用替代——那些活在嘈杂的 `main` 上。 |
| **llama.cpp** | 可移植推理 *库* + server。最宽的 backend 面（Metal、HIP、Vulkan、OpenCL、SYCL、WebGPU）。架构实验室（ternary、MTP）。 | 多租户控制面（presets、cached-model 生命周期、disk KV 仍是 DIY）。 |
| **Ollama** | 叠在 llama.cpp + MLX + 可选 `:cloud` 上的本地 *产品*。ChatGPT Desktop 是分发上的赢点。 | 在 0.34.0 上、没有客户端 deadline 和 raw-trace 日志时，把它当可靠的 tool-call 或 cloud-proxy 运行时。 |
| **LiteLLM** | *治理* 层：keys、MCP toolsets、spend、auto-router、242-model catalog。1.100.1 是第一份应当放在 LB 后面的 1.100.x 构建。 | Claude Code → 托管 vLLM 的透明管道（#30043 仍开着）。不是 kernel。 |
| **Unsloth** | 单机上的 *训练 + 运行 + agent 编辑* 闭环。Vulkan AMD 默认、官方 Docker、Studio 正在变成可持久的 coding-agent 运行时。 | 集群调度器。OpenAI 兼容是 backend 相关的（`min_p` / `logit_bias` / tensor-split 缺口）。 |

**需要预留预算的重叠：** vLLM ↔ SGLang（同一批模型，不同的 PD/KV/spec 契约）；llama.cpp ↔ Ollama ↔ Unsloth Studio（对同一份 GGUF 的三种意见）；LiteLLM 挡在所有这些前面（翻译 bug 看起来像模型 bug）。

## 6. 趋势信号

**行业**
1. **混合 + 投机模型才是新的默认负载**，而不是稠密 Llama。每个引擎都在为 Mamba/SWA + MTP + DFlash 支付缓存、计算图和 FSM 税。
2. **Prefill/decode 解聚与多层 KV**（GPU 热缓存、host、disk、expert offload）正从 RFC 毕业成 flags。容量规划现在是 *池拓扑* 问题。
3. **硅片碎片化回来了。** CUDA 13.0/13.4、SM120 page-size vs indexer、MI355X 利用率不足、gfx1201 FA 重调、Vulkan-as-AMD-default、Ascend DSV4——一份 checkpoint 不再只有一条快路径。
4. **客户端是 IDE/智能体，不是聊天框。** ChatGPT Desktop + 本地 Ollama、LiteLLM `lite configure` 对接 Claude Code 与 Codex、Unsloth Studio worktrees/hooks、现在 *失败即关闭* 的 MCP toolsets。协议 bug（tool JSON、`include_reasoning`、inline `system`、`tool_choice: required`）就是生产事故。
5. **安全与供应链坐在 serving 路径上。** LiteLLM PyPI 1.82.x 事件仍主导运维群聊；redaction 与 SGLang PythonicDetector 中的 ReDoS；grammar DFA 作为 DoS；LiteLLM 镜像上的 cosign。约束解码是一条信任边界。

**智能体 / 应用开发者应盯的事项**

| Watch item | Why |
|---|---|
| 钉死 **vLLM 0.29.0** 并重新画像；不要复用 0.28 的 KV / `max_num_seqs`。把 MRV1 fallback 清单放在部署文档旁边。 | 默认变了（FlashInfer AR、MRV2、准入、前缀哈希）。 |
| 把 **V4.1 与 Qwen3.8 thinking 上的 DFlash / DSpark / MTP** 在每个引擎上都当实验特性。CI 里保留 `--enforce-eager` 和非投机基线。 | SM90 asserts、SM120 page 不匹配、ROCm 精度崩塌、llama.cpp 量化 target 发散、Ollama 空生成。 |
| **记录原始 tool-call 轨迹。** 空的 `tool_calls` + `finish_reason=stop` 常常是解析器丢弃（Ollama Qwen/Gemma、LiteLLM concat JSON、SGLang DSML wrapper、vLLM Qwen3 `tool_choice`）。 | Agent 循环会「成功」然后什么都不做。 |
| 在 #30043 有命名稳定路由之前，不要把 **Claude Code → LiteLLM → vLLM** 放进生产。 | 是两处坏翻译，不是一处。 |
| 若使用 **SGLang HiCache + PD**，health check 可能污染 DP 路由；混合池可能报告不可恢复的前缀命中。 | 静默的质量/延迟，请求仍「完成」。 |
| 视觉+投机用 **llama.cpp ≥ b10906**；DeepSeek2 / GLM-4-MoE / Cohere2-MoE MTP KV 用 **≥ b10907**。若 Qwen3.6-MTP 输出漂移，回收进程。 | 位置 vs token 计数；跨请求 MTP 状态。 |
| Ollama **0.34.0 上的 `:cloud`** 需要客户端 deadline（否则留在 0.33.1）。评测绑定 **manifest digest**，不要绑 tag。 | 45 分钟楔死；官方低比特库量化得分 0。 |
| LiteLLM：**1.100.1 + cosign**；升级前审计 MCP toolsets（失败即关闭）；把 spend 抓取迁到 `/spend/logs/v2`；在 ReDoS 消失前限制 exception 体积。 | OOM、工具消失、日志截断、事件循环死亡。 |
| Unsloth：钉死 **0.1.808-beta + Torch 2.11**；自己量 AMD/Windows VRAM；不要假设 Studio 前缀缓存能熬过模型重载。 | Vulkan 默认改变核算；有 11 分钟冷 prefill 报告。 |

**接下来 2–3 周（来自跟踪器）：** vLLM MRV2 剩余 TODO 与 MRV1 拆除时钟（目标 v0.32）；DS-V4 warmup PR；expert-pool offload。SGLang P↔D 角色切换与 DCP backend 默认翻转。GLM-5.3 / DS-V4 的 ROCm 精度能否在 fallback 消失前于 V2 路径上修好。LiteLLM 1.102 MCP/OAuth 对上仍未关闭的 Claude Code↔vLLM 空洞。

**给决策者的底线：** 0.29.0 / 0.5.19 / 0.34.0 / 1.100.1 / 0.1.808-beta 都是 *可用的钉点*，但它们不可互换，也不安静。选你真正需要的那一层（集群引擎 vs 本地运行时 vs 网关 vs 训练闭环），钉死 tag，并给 **投机解码等价性、tool-call 解析、前缀缓存命中有效性** 加上 CI——本周吞吐工作漏正确性的，就是这三处。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-12

Source: [vllm-project/vllm](https://github.com/vllm-project/vllm) · release [v0.29.0](https://github.com/vllm-project/vllm/releases/tag/v0.29.0) (tagged 2026-09-09)

## 1. 本周要点

**Model Runner V2 现已成为所有模型的默认路径**（[#53183](https://github.com/vllm-project/vllm/pull/53183)），完成了从 pooling 模型开始的全量切换。同一版本还落地了用于 KV 自动 sizing 的 CUDA Graph 显存 profiling、batch-sharded sampling（logits 显存降至 `1/TP`）、prompt embeds，以及多条 spec-decode 的 graph 路径。MRV1 已正式进入弃用倒计时（目标在 **v0.32** 移除），仅作为 ROCm 缺口与一小份缺失功能的回退保留（[#47172](https://github.com/vllm-project/vllm/issues/47172)）。

另一条主线是 **DeepSeek-V4 / DFlash / hybrid MoE serving**：Hy4-preview 与 Qwen3.8-Flash-Next 已进入 0.29.0，但 `main` 上 SM90/SM120 以及 ROCm MI350/MI355 仍有正确性与硬件问题未关（精度崩塌、CUDA assert、cache page 不匹配）。MoE expert offload 与共享 GPU expert pool 正在从 RFC 推进到 PR。

## 2. 版本与破坏性变更

**[v0.29.0](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)** — 594 次提交，277 位贡献者（91 位首次贡献）。

**会改变生产行为的默认值**
- FlashInfer all-reduce 对 TP CUDA group **默认开启**；可用 `VLLM_ALLREDUCE_USE_FLASHINFER=0` 关闭（[#52998](https://github.com/vllm-project/vllm/pull/52998)）。
- Prefix-cache 的 `NONE_HASH` 变为确定性；分布式 KV 用户不再需要设置 `PYTHONHASHSEED`（[#51875](https://github.com/vllm-project/vllm/pull/51875)）。
- 新增准入控制标志：`--max-num-queued-reqs` / `--max-num-queued-tokens`（[#49445](https://github.com/vllm-project/vllm/pull/49445)）。
- `prefix_cache_retention_interval` 成为 CLI 标志（默认 `0`）；hybrid + EAGLE/MTP 会自动恢复 dense retention（[#52216](https://github.com/vllm-project/vllm/pull/52216)、[#55760](https://github.com/vllm-project/vllm/pull/55760)、[#55861](https://github.com/vllm-project/vllm/pull/55861)）。

**破坏性变更 / 已移除**
- 移除十个已弃用的模型架构（[#53608](https://github.com/vllm-project/vllm/pull/53608)）。
- FlexOlmo、Olmo3、Hunyuan V1/VL 改走 Transformers modeling backend（[#53615](https://github.com/vllm-project/vllm/pull/53615)）。
- 移除 PyAV video decoder backend（[#54231](https://github.com/vllm-project/vllm/pull/54231)）。
- `python -m vllm.entrypoints.openai.api_server` 已弃用，请改用 `vllm serve`（[#52131](https://github.com/vllm-project/vllm/pull/52131)）。
- 移除环境变量：`VLLM_TEST_FORCE_FP8_MARLIN`、`VLLM_ROCM_USE_AITER_FP4_ASM_GEMM`。

**安装快照**
- 默认 PyPI / Docker 为 **CUDA 13.0**（`vllm/vllm-openai:v0.29.0`）。同一 tag 同时发布 CUDA 12.9、ROCm、CPU 与 XPU 镜像/wheel。

**仍会强制回退到 MRV1 的 MRV2 缺口：** sequence parallelism、dual-batch overlap、elastic expert parallelism、custom logits processors，以及部分 speculative 方法。这些缺口被跟踪为「2–3 周内关闭」，而不是长期双栈。

## 3. 新模型与硬件支持

已合入 0.29.0：
- **Hy4-preview** — 腾讯 770B / 49B-active MoE，Gated DeepSeek Sparse Attention，原生 MTP（[#54160](https://github.com/vllm-project/vllm/pull/54160)）。
- **Qwen3.8-Flash-Next** — BF16 / FP8 / NVFP4 + MTP（[#53896](https://github.com/vllm-project/vllm/pull/53896)）。
- **GraniteSWA / GraniteMoeSWA**（[#52706](https://github.com/vllm-project/vllm/pull/52706)）。
- **NemotronH_Omni_Reasoning_V3**，带 MTP（[#52929](https://github.com/vllm-project/vllm/pull/52929)、[#53121](https://github.com/vllm-project/vllm/pull/53121)）。
- **Kimi K3 NVFP4** checkpoints（[#53132](https://github.com/vllm-project/vllm/pull/53132)）。
- FP8 ModernBERT、DeepSeek-backbone embeddings 的双向注意力、DeepSeek V4 与 Qwen3-Omni 的 LoRA。

仍在 `main` 上推进的硬件 / backend 工作：
- NVIDIA **Rubin / CUDA 13.4** 公开依赖钉死（FlashInfer 0.6.18.post1、NIXL 1.4.1、Quack 0.6.5）— [PR #56545](https://github.com/vllm-project/vllm/pull/56545)。
- DeepSeek-V4.1-Flash 在 **SM120/SM121 (GB10)** 被 SWA cache block 32 vs decode page 64，以及 indexer `block_kv` vs DeepGEMM SM120 上限卡住 — [#56461](https://github.com/vllm-project/vllm/issues/56461)。
- Transformers **v5** 升级仍是活文档，尚未完成 — [#38379](https://github.com/vllm-project/vllm/issues/38379)。
- ROCm nightly DI CI 仍希望用生产 router，而不是 toy proxy — [#51057](https://github.com/vllm-project/vllm/issues/51057)。

## 4. 性能与优化

**已随 0.29.0 发布（精选，数字来自 release notes）**
- Batch-sharded sampling：每步 logits 显存 ÷ TP（[#50465](https://github.com/vllm-project/vllm/pull/50465)）。
- Kimi-K3：fused MXFP4 top-k finalization（约 **5% E2E**），Mamba metadata 一次 Triton launch（**6.6–7.6×** kernel），Hopper low-latency GEMM 复用到 SM100，`eh_proj` **12.9–25.2%** kernel 加速。
- Mamba prefix-cache 内部 checkpoint：**9–25% TTFT**。
- DeepSeek V4：shared experts 并入 MegaMoE、adaptive top-k width、Humming MoE 的原生 SwiGLU clamp、可选开启 FlashInfer `moe_ep`。

**本窗口仍在推进**
- 增量式 MoE expert offload（CPU pinned weights + GPU hot cache，LFRU）— RFC [#38256](https://github.com/vllm-project/vllm/issues/38256)，相关 pool PR [#56177](https://github.com/vllm-project/vllm/pull/56177)（`--moe-expert-pool-rows`）。
- ROCm MXFP8：当 `dot_scaled` 无法运行（`K % 128 != 0`）时只反量化一次 — [PR #56560](https://github.com/vllm-project/vllm/pull/56560)。
- DSv4.1：当所有 block 都能放下时跳过 candidate sort — [PR #56558](https://github.com/vllm-project/vllm/pull/56558)。
- PCP：prefill 之后只恢复被采样的最终行 — [PR #49756](https://github.com/vllm-project/vllm/pull/49756)；PCP+DCP 用于 sparse-MLA — [PR #56157](https://github.com/vllm-project/vllm/pull/56157)。
- 可扩展 KV cache 产品化 — [PR #56492](https://github.com/vllm-project/vllm/pull/56492)。
- DeepSeek-V4.1-Flash 在 **8× MI355X**、TP4、MXFP4 MoE + DSpark MTP：concurrency 1 ≈ **35.9 tok/s** 总计 / **9 tok/s/GPU**，TTFT p50 **0.90 s** — RFC [#56506](https://github.com/vllm-project/vllm/issues/56506)（作者认为设备仍未吃满）。
- RTX 3070 Ti 上的 AWQ CUDA GEMM 被反馈为严重受 L1/内存瓶颈 — [#55462](https://github.com/vllm-project/vllm/issues/55462)。
- 历史 structured-output decode 回退（约 **2×**），源自 #45424 中的 `apply_grammar_bitmask` staging — [#49013](https://github.com/vllm-project/vllm/issues/49013)（已关闭，但仍是 guided-JSON 的校准点）。

## 5. 稳定性与回归

按运维影响排序。未特别注明的链接均为 issue。

**高 — 正确性 / 静默容量损失**
- GLM-5.3 on ROCm：#53155 强制 MRV1 后，GSM8K **91.6% → 14.9%** — [#54924](https://github.com/vllm-project/vllm/issues/54924)。
- DeepSeek V4 在 MI350/MI355 上走 MRV2 且使用 `FULL_DECODE_ONLY` graph 时精度下降 — [#52644](https://github.com/vllm-project/vllm/issues/52644)。
- NIXL connector 静默关闭 HMA，**KV 容量减半**（已关闭；默认 HMA 讨论仍在）— [#42024](https://github.com/vllm-project/vllm/issues/42024)。
- Hybrid Mamba/GDN + MTP：首次相同 prompt 重放 **完全 miss prefix cache** — [#53504](https://github.com/vllm-project/vllm/issues/53504)；修复尝试 [PR #52244](https://github.com/vllm-project/vllm/pull/52244)。
- DFlash2 会在 token 30 处改变 greedy Qwen3.8 thinking 输出，即使 `K=1` 且 `--enforce-eager` — [#54928](https://github.com/vllm-project/vllm/issues/54928)。

**高 — 新模型 / 新硅片硬失败**
- DSv4.1-Flash + DSpark：SM90（H200）+ Marlin MXFP4 上 `map_draft_to_target` 发生 CUDA device-side assert — [#56443](https://github.com/vllm-project/vllm/issues/56443)。
- DSv4.1-Flash 无法在 SM120/SM121 上 serving（page/indexer vs DeepGEMM 不匹配）— [#56461](https://github.com/vllm-project/vllm/issues/56461)。
- DFlash2 + xgrammar `json_object`：确定性 “Failed to advance FSM” — [#53777](https://github.com/vllm-project/vllm/issues/53777)；多分支 `allOf` 的相关 fallback — [PR #56557](https://github.com/vllm-project/vllm/pull/56557)。

**中 — API / serving 契约**
- `qwen3_coder` / `qwen3_xml` parser 忽略 `tool_choice: "required"` 以及具名 function — [#54808](https://github.com/vllm-project/vllm/issues/54808)。
- Beam search 忽略 `skip_special_tokens`（泄漏 control token）— [PR #56211](https://github.com/vllm-project/vllm/pull/56211)。
- Anthropic 风格的内联 `system` message 会破坏 encoder tokenizer 上的 prefix cache — [PR #56520](https://github.com/vllm-project/vllm/pull/56520)。

**中 / 较旧但仍在动**
- Tesla T4 Triton shared-memory OOM（81 280 vs 65 536）— [#36802](https://github.com/vllm-project/vllm/issues/36802)。
- prompt 比 `max_model_len` 多 1 时 scheduler 死锁（已关闭）— [#42381](https://github.com/vllm-project/vllm/issues/42381)。
- Nightly 镜像 `nixl_ep` / 缺少 `libcudart.so.12` import（已关闭，继续盯镜像）— [#42525](https://github.com/vllm-project/vllm/issues/42525)。

仍在收集工作的长期 tracker：batch-invariant inference [#27433](https://github.com/vllm-project/vllm/issues/27433)（92 条评论）。

## 6. 对应用开发者意味着什么

1. **把 0.29.0 当成一次 MRV2 发版，而不是安静的小补丁。** 钉死 `v0.29.0`（或已知可用的 nightly），先在 hybrid / spec-decode / ROCm 模型上跑通再切生产。若依赖 sequence parallelism、DBO、elastic EP 或 custom logits processors，在这些 TODO 关闭前你仍走 MRV1 回退路径（[#47172](https://github.com/vllm-project/vllm/issues/47172)）。
2. **DeepSeek-V4.1-Flash 和 DFlash2 不是「打开 spec decode 就完事」。** SM90 Marlin + DSpark、SM120 page size、ROCm FULL graph，以及 xgrammar FSM 失败本周都还开着。在 assert/FSM 修复落地前，对 structured-output 与 thinking 模型继续 `--enforce-eager` 并关掉 DFlash。
3. **Tool-calling 与客户端协议需要显式测试。** Qwen3 parser 仍把 `tool_choice: required` 当 auto。会在 `messages` 里注入 `role: system` 的 Claude Code / Anthropic 客户端，需要 encoder-tokenizer 的 prefix-cache 修复。Beam-search 用户应确认 `skip_special_tokens`。
4. **容量与成本旋钮确实动了。** FlashInfer AR 默认开启、确定性 prefix hash、queued-req/token 准入，以及（即将到来的）`--moe-expert-pool-rows`，都会改变你怎么给 KV 和 MoE VRAM 做 sizing。请重新 profile `max_num_seqs` / cache utilization，不要照搬 0.28 的数字。
5. **CUDA 13.0 是默认产物。** 只有整条栈都冻住时才继续用 `cu129` 镜像。Rubin/13.4 的依赖上调已经在 `main` 上。
6. **给 agent 用：** `--per-request-spec-decode-metrics` 是按请求记录 acceptance 的钩子。若你自建 router，streaming engine-state RFC [#43643](https://github.com/vllm-project/vllm/issues/43643) 仍未关闭。

---

**下一步关注：** MRV2 剩余 TODO、DSv4 warmup PR（[#53566](https://github.com/vllm-project/vllm/pull/53566)、[#56323](https://github.com/vllm-project/vllm/pull/56323)）、expert-pool offload，以及 GLM-5.3 / DS-V4 的 ROCm 精度能否在 MRV1 移除窗口前走出一条 MRV2 修复路径。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

我会再从仓库和近期活动中补充一些上下文，以保证摘要准确。
# SGLang Digest — 2026-09-12

来源：[sgl-project/sglang](https://github.com/sgl-project/sglang)。最新稳定标签仍为 **v0.5.19**（2026-09-04）；main 处于 **0.5.20.dev** nightly。过去 24 小时内无正式发布。

## 1. 本周要点

本周活动集中在 **DeepSeek-V4 / V4.1**、**PD 分离 + HiCache**，以及**跨厂商内核**（NVIDIA Blackwell SM120、AMD gfx950、Ascend NPU）。面向 agentic 工作负载的长期分布式 KVCache 路线图（[#21846](https://github.com/sgl-project/sglang/issues/21846)）与 SessionAware 路由器（[#25760](https://github.com/sgl-project/sglang/issues/25760)）仍在推动架构演进，同时 CI 噪音较大：tracker [#17050](https://github.com/sgl-project/sglang/issues/17050) 截至 2026-09-12 03:17 UTC 报告 main 上 **1 broken / 11 flaky**。本窗口内还落地了若干高严重度 serving bug（health-check 干扰 DP 路由、disagg+spec decode 下 GLM-5.3 崩溃、grammar DFA 爆炸）。

## 2. 发布与破坏性变更

过去 24 小时无 tagged release。当前产品线：

- 稳定版：[v0.5.19](https://github.com/sgl-project/sglang/releases/tag/v0.5.19)（2026-09-04）
- 开发版：`0.5.20.dev` nightlies，见 [sgl-project/whl](https://github.com/sgl-project/whl/releases)

关注这些尚未发布的进行中配置/API 变更：

- `--dcp-comm-backend` 默认对**所有** DCP 模型改为 `fi_a2a`/`a2a`，不再仅限 Kimi-K3 — [PR #39165](https://github.com/sgl-project/sglang/pull/39165)
- Weight-loading RFC（165 个模型文件，各自独立 loader）— 因 inactive 关闭，但仍是既定方向：[#24703](https://github.com/sgl-project/sglang/issues/24703)
- 运行时 prefill↔decode 角色切换（目前角色在启动时固定）— [PR #28403](https://github.com/sgl-project/sglang/pull/28403)

## 3. 新模型与硬件支持

**处于活跃跟踪或 PR 中的模型 / 系列**

| 工作 | 状态 | 链接 |
|---|---|---|
| SenseNova-U1 / U1.5 功能与性能跟踪 | 开放跟踪 | [#37742](https://github.com/sgl-project/sglang/issues/37742) |
| GLM-5.3-Flash on SM120（2× RTX PRO 6000，TP2，W4A16 routed experts，FP8 KV，vision，native MTP） | 跟踪中 | [#37813](https://github.com/sgl-project/sglang/issues/37813) |
| DeepSeek-V4.1 C1/C2 主 KV 以 packed FP4 存放于 Hopper | 功能开发 | [#38902](https://github.com/sgl-project/sglang/issues/38902) |
| FlashMLA 升级至 V4.1 kernel rebase | 开放 PR | [#38942](https://github.com/sgl-project/sglang/pull/38942) |
| VDN-H3（MiniMax-H3 hybrid window + Video Delta LA，8-NFE distill） | 已关闭 PR | [#37903](https://github.com/sgl-project/sglang/pull/37903) |
| Qwen-Image-Layered 多输出 + CFG2 rounding | 开放 PR | [#38549](https://github.com/sgl-project/sglang/pull/38549) |
| Score API 上的 Setwise scoring | 开放 PR | [#38965](https://github.com/sgl-project/sglang/pull/38965) |
| MiMo-V2.5-Pro DFlash speculative decode（mxfp4）on NPU | 开放 PR | [#37565](https://github.com/sgl-project/sglang/pull/37565) |

**硬件 / 后端**

- **AMD Instinct gfx950**：FP8 two-pool unified KV（[#37413](https://github.com/sgl-project/sglang/pull/37413)）；PD-disagg + FP8 unified_kv（[#37413](https://github.com/sgl-project/sglang/pull/37413) / [#39166](https://github.com/sgl-project/sglang/pull/39166)）；经 MORI 的 packed DCP1→DCP-N KV（[#38317](https://github.com/sgl-project/sglang/pull/38317)）
- **消费级 Radeon RDNA3/RDNA4**（`gfx1100`/`gfx1201`）：仍仅跟踪；ROCm 路径仍以 Instinct 为先 — [#30599](https://github.com/sgl-project/sglang/issues/30599)
- **Ascend NPU**：DSV4 host-memory cache（[#37382](https://github.com/sgl-project/sglang/pull/37382)）；DSV4 prefill context parallelism（interleave + zigzag）（[#38251](https://github.com/sgl-project/sglang/pull/38251)）；MiMo-V2.5-Pro 的 DFlash（[#37565](https://github.com/sgl-project/sglang/pull/37565)）
- **Blackwell / SM120**：GLM-5.3-Flash 资格验证（[#37813](https://github.com/sgl-project/sglang/issues/37813)）；DeepGEMM sanitizer + Blackwell 测试超时（[#39163](https://github.com/sgl-project/sglang/pull/39163)）

## 4. 性能与优化

进行中（本 24 小时窗口无新公布的 tok/s 数字）：

- **Fuse shared→sparse experts** in DSV4 DeepGEMM MegaMoE — [#38700](https://github.com/sgl-project/sglang/issues/38700)
- **FP8 KV-cache decode**：未融合的 K/V quant + 逐层 Q conversion 开销 — [#30815](https://github.com/sgl-project/sglang/issues/30815)
- **TRTLLM MLA** target verification 在 `forward_extend` 中缺少融合的 FP8 KV/Q prep — [#39107](https://github.com/sgl-project/sglang/issues/39107)
- **Packed FP4** 存储，用于 Hopper 上的 DeepSeek-V4.1 C1/C2 主 KV — [#38902](https://github.com/sgl-project/sglang/issues/38902)
- **DCP 默认通信后端** → 全集群 `fi_a2a` — [#39165](https://github.com/sgl-project/sglang/pull/39165)
- **TP 下约束解码开销**（good first issue）— [#13809](https://github.com/sgl-project/sglang/issues/13809)
- Diffusion：测量 attention backend，而非已失效的 `allow_cudnn_sdp` 路径（[#38689](https://github.com/sgl-project/sglang/pull/38689)）；host 无法缓存时用 O_DIRECT 读取 mapped-layer（[#39022](https://github.com/sgl-project/sglang/pull/39022)）
- HiCache + LoRA：简化 decode offload 的 hash 输入 — [#39162](https://github.com/sgl-project/sglang/pull/39162)
- Gemma speculative decoding：保留完整 hidden-state + residual captures（EAGLE3 acceptance）— [#39161](https://github.com/sgl-project/sglang/pull/39161)
- PD：运行时 P↔D 角色切换（[#28403](https://github.com/sgl-project/sglang/pull/28403)）；SessionAware bucket router（[#25760](https://github.com/sgl-project/sglang/issues/25760)）
- Agentic KV 路线图（混合模型下 HiCache + PD 瓶颈）— [#21846](https://github.com/sgl-project/sglang/issues/21846)

## 5. 稳定性与回归

按运维严重度排序。

| 严重度 | 问题 | 说明 |
|---|---|---|
| **高** | Generation health checks 扰动 DP 路由，压垮长 prefill 吞吐 — [#35241](https://github.com/sgl-project/sglang/issues/35241) | 可复现的调度/性能稳定性问题；请求仍能完成 |
| **高** | GLM-5.3 在 disagg decode + dp-attention + spec decode 下崩溃 — [#39072](https://github.com/sgl-project/sglang/issues/39072) | 2026-09-11 开启 |
| **高** | JSON Schema grammar：深层或循环 schema 导致 DFA 爆炸 / CPU 线程挂起 — [#39125](https://github.com/sgl-project/sglang/issues/39125) | 将不可信 schema 视为 DoS 向量 |
| **高** | `PythonicDetector` 中的 ReDoS — 修复 PR [#18397](https://github.com/sgl-project/sglang/pull/18397) | 仍开放；用 O(n) matcher 替换嵌套 `.*` 正则 |
| **中** | Encoder-decoder KV：当 `page_size > 1` 时共享边界 page 被双重释放 — [#38840](https://github.com/sgl-project/sglang/issues/38840) | |
| **中** | HiCacheFile 在 hybrid cache pools 上将无法恢复的前缀报告为命中 — [#39147](https://github.com/sgl-project/sglang/issues/39147) | 错误的前缀恢复 → 静默的质量/延迟损失 |
| **中** | `include_reasoning=false` 仍在 responses / chat / completions 中输出 reasoning — [#39103](https://github.com/sgl-project/sglang/issues/39103) | 对客户端构成 API 契约破坏 |
| **中** | DeepSeek V4/V3.2 DSML tool-call parser 给参数包上多余的 `"arguments"`/`"input"` — [#38924](https://github.com/sgl-project/sglang/issues/38924) | 会打断 tool routers |
| **中** | Session + multimodal：session 续写时图像后的文本位置错误 — 修复 PR [#39144](https://github.com/sgl-project/sglang/pull/39144) | 可能输出控制 token 而非答案 |
| **低 / 基础设施** | CUDA coredump 自动跟踪 — [#26340](https://github.com/sgl-project/sglang/issues/26340)（298 条评论） | CI 信号，非产品功能 |
| **低 / 基础设施** | CI tracker：1 broken，11 flaky，990 近期已修复 — [#17050](https://github.com/sgl-project/sglang/issues/17050)；AMD PR-test extra job import 崩溃 — [#37451](https://github.com/sgl-project/sglang/issues/37451) | |

本窗口内近期关闭 / 已不活跃（当前非阻塞项）：weight-loader RFC [#24703](https://github.com/sgl-project/sglang/issues/24703)、DFlash Mamba checkpoint miss [#37817](https://github.com/sgl-project/sglang/issues/37817)、CP size > 8 [#30991](https://github.com/sgl-project/sglang/issues/30991)、glm-5.2-w4afp8 on 0.5.15 [#31045](https://github.com/sgl-project/sglang/issues/31045)。

## 6. 对应用开发者意味着什么

- **生产环境请继续停留在 v0.5.19。** DeepSeek-V4.1、GLM-5.3-Flash、SenseNova-U1 以及 gfx950/NPU PD 路径仍在 `main` / 0.5.20.dev 落地。只有在确实需要这些模型、且能承受 CI flake 时，才 pin nightly。
- **使用 HiCache + PD 的 Agent / 多轮栈：** 将 [#21846](https://github.com/sgl-project/sglang/issues/21846)、[#39147](https://github.com/sgl-project/sglang/issues/39147) 和 [#35241](https://github.com/sgl-project/sglang/issues/35241) 视为已知风险。Health-check 流量可在长 prefill 下污染 DP 路由。Hybrid cache pools 可能声称命中一个无法恢复的前缀。
- **Tool-calling / 结构化输出：** 不要直接信任 DeepSeek DSML 的参数 JSON（[#38924](https://github.com/sgl-project/sglang/issues/38924)）。限制或清洗客户端提供的 JSON Schema 深度（[#39125](https://github.com/sgl-project/sglang/issues/39125)）。不要假设 `include_reasoning=false` 一定生效（[#39103](https://github.com/sgl-project/sglang/issues/39103)）。
- **分离式 serving：** 运行时 P↔D 角色切换（[#28403](https://github.com/sgl-project/sglang/pull/28403)）以及 DCP `fi_a2a` 默认值（[#39165](https://github.com/sgl-project/sglang/pull/39165)）将改变你如何扩缩和重连 P/D 池。请为非 Kimi 模型上的通信后端默认翻转做好准备。
- **Multimodal / session API：** 若在 session 中于图像后追加文本，请等 [#39144](https://github.com/sgl-project/sglang/pull/39144) 落地后再依赖位置连续性。
- **安全：** 在向不可信客户端开放约束解码或 Pythonic tool parser 之前，持续关注 [#18397](https://github.com/sgl-project/sglang/pull/18397)（ReDoS）和 [#39125](https://github.com/sgl-project/sglang/issues/39125)（grammar DoS）。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-12

来源：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · 近期标签约 **b10919**。站点：[llama.app](https://llama.app)

## 1. 本周要点

后端是本周重心：Metal fusion 已统一到一张表；HIP/CUDA Flash Attention 针对 RDNA4（`gfx1201`）重新调参；Vulkan 与 OpenCL 补上正确性与 kernel 覆盖；WebGPU 切到更新的 Dawn。模型侧，MTP 的 KV-cache 分配已修复（DeepSeek2 / GLM-4-MoE / Cohere2-MoE），server 在图像之后也不再把投机解码打断。Issue 追踪上，量化目标上的 speculative decoding、ROCm 7.14 / RDNA4 的显存与 FA 回退、SYCL/Vulkan 在 Intel Arc 上的崩溃，以及长期呼声——磁盘 KV offload、router presets、XDNA backend——仍是最响的运维主题。

## 2. 发布与破坏性变更

近期标签（约过去 24 小时）：[b10919](https://github.com/ggml-org/llama.cpp/releases/tag/b10919) 至 [b10901](https://github.com/ggml-org/llama.cpp/releases/tag/b10901)。

| Tag | Change | Notes |
|---|---|---|
| [b10919](https://github.com/ggml-org/llama.cpp/releases/tag/b10919) | WebGPU Dawn bump ([#28683](https://github.com/ggml-org/llama.cpp/pull/28683)) | 为 `wasi:webgpu` / `webgpu_upstream` 所需，避免依赖仅原生可用的 Dawn 特性 |
| [b10917](https://github.com/ggml-org/llama.cpp/releases/tag/b10917) | CMake: skip PCH for `llama-server` on MSVC ([#28763](https://github.com/ggml-org/llama.cpp/pull/28763)) | 修复 PCH/unity 引入的编译中断（[#28091](https://github.com/ggml-org/llama.cpp/pull/28091)） |
| [b10909](https://github.com/ggml-org/llama.cpp/releases/tag/b10909) | Metal fusion table rewrite ([#28164](https://github.com/ggml-org/llama.cpp/pull/28164)) | 可融合算子的单一事实来源；debug 路径重做 |
| [b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906) | Server: speculation after images ([#28715](https://github.com/ggml-org/llama.cpp/pull/28715)) | Drafter 现在拿到真实 position，而不是 token 计数；内部将 `n_past` 重命名为 `pos0` |
| [b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907) | MTP KV cache sizing ([#28630](https://github.com/ggml-org/llama.cpp/pull/28630)) | 影响 DeepSeek2、GLM-4-MoE、Cohere2-MoE |

本窗口内无公开记录的 `libllama` API 破坏；长期 changelog issue 仍是 [#9289](https://github.com/ggml-org/llama.cpp/issues/9289)。MSVC + PCH 构建请拉 **b10917+**。多模态 + 投机推理服务需要 **b10906+**。

## 3. 新模型与硬件支持

**已落地**
- **DeepSeek2、GLM-4-MoE、Cohere2-MoE** 的 MTP 上下文 KV 分配 — [b10907 / #28630](https://github.com/ggml-org/llama.cpp/pull/28630)
- **OpenCL**：A8 **Q4_0** matmul binary kernel — [b10902 / #28268](https://github.com/ggml-org/llama.cpp/pull/28268)
- **WebGPU**：当前 Dawn；不依赖 Dawn 原生特性的 WASI 路径 — [b10919](https://github.com/ggml-org/llama.cpp/releases/tag/b10919)，[#27069](https://github.com/ggml-org/llama.cpp/pull/27069)
- **HIP/RDNA4（`gfx1201`）**：head size 256 的 MMA Flash Attention，grid vs stream-k 策略 — [b10905 / #28102](https://github.com/ggml-org/llama.cpp/pull/28102)

**进行中**
- Maple **20B-A1B ternary MoE**（TQ1_0/TQ2_0，256 experts / 8 active，SWA+global）— [#27000](https://github.com/ggml-org/llama.cpp/pull/27000)
- **STQ1_0** 稀疏三值 + ARM NEON `vec_dot`（Sherry / ACL 2026）— [#22836](https://github.com/ggml-org/llama.cpp/pull/22836)
- CUDA FAttn vector kernels：**K=Q8_0, V=Q4_0** — [#27269](https://github.com/ggml-org/llama.cpp/pull/27269)
- Hexagon **row-split** 多 NPU（`--split-mode row`）— [#28589](https://github.com/ggml-org/llama.cpp/pull/28589)（已关闭，此前已接近可合入）
- 专用 **Ling 3.0 / Bailing V3** chat parser（预打开的 `<think>` + tools）— [#28682](https://github.com/ggml-org/llama.cpp/pull/28682)
- 仍开放的功能请求：**XDNA backend**（[#21725](https://github.com/ggml-org/llama.cpp/issues/21725)，32 👍）、**RDMA RPC**（[#9493](https://github.com/ggml-org/llama.cpp/issues/9493)）、OpenVINO Gemma-4 加载（[#24415](https://github.com/ggml-org/llama.cpp/issues/24415)）

## 4. 性能与优化

- **Metal**：剩余 IQ `mul_mv` kernels 在 `ne00 < 1024` 时的空闲线程修复（iq1_s/m 及同类）— [b10908 / #28692](https://github.com/ggml-org/llama.cpp/pull/28692)。Fusion 模式现为优化器与运行时共用的一张表 — [#28164](https://github.com/ggml-org/llama.cpp/pull/28164)。
- **HIP FA on gfx1201**：在 head 256 启用 MMA FA；在 AMD WMMA 上优先整 tile grid 而非 stream-k — [#28102](https://github.com/ggml-org/llama.cpp/pull/28102)。另一面：rocWMMA 移除后，原生 `fattn-mma-f16` 在 RDNA4 上被报告 **prompt processing 在较大 depth 时最多约慢 2×**；decode 不变或略快 — [#26220](https://github.com/ggml-org/llama.cpp/issues/26220)（调参后已关闭）。
- **Vulkan**：idle-context 拷贝改用 CPU 写入 — [b10901 / #28618](https://github.com/ggml-org/llama.cpp/pull/28618)。
- **SYCL**：CUDA graphs 的 graph record/replay 移植 — [#28725](https://github.com/ggml-org/llama.cpp/pull/28725)；scratchpad / >4GB iGPU 分配 — [#27689](https://github.com/ggml-org/llama.cpp/pull/27689)；oneDNN scratchpad 池顺序 — [#28704](https://github.com/ggml-org/llama.cpp/pull/28704)。
- **CUDA**：补上缺失的 AMD GCN MMQ wave64 配置（避免回退到 RDNA2）— [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)；可选经 `dp2a` 走 `dp4a` — [#24616](https://github.com/ggml-org/llama.cpp/issues/24616)。
- 有热度的容量方向：磁盘 KV checkpoint offload `--cache-disk`（[#20697](https://github.com/ggml-org/llama.cpp/issues/20697)，48 👍）；双层 GPU+RAM MoE expert cache（[#20757](https://github.com/ggml-org/llama.cpp/issues/20757)，已关闭）。

## 5. 稳定性与回归

按运维严重程度排序。

**高 — 输出错误或分叉**
- Speculative decoding（draft-MTP / draft-dspark）在**量化目标上与 greedy vanilla 分叉**；bf16 目标一致；ngram speculation 正常 — [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)
- MTP **跨请求残留状态** → Qwen3.6-35B-A3B-MTP 非确定性 / 质量下滑 — [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)
- 并行 `tool_calls` 在带大量可选参数 tools 的 Qwen 上被弄乱/卡住 — [#28522](https://github.com/ggml-org/llama.cpp/issues/28522)（已关闭）
- Qwen3.5 thinking + tools：若文本出现在 `<tool_call>` 之前，parser 失败（`peg-native`）— [#20260](https://github.com/ggml-org/llama.cpp/issues/20260)（已关闭，34 条评论）
- Speculation timeout（Vulkan / Qwen3.6）— [#23268](https://github.com/ggml-org/llama.cpp/issues/23268)（已关闭）

**高 — 起不来 / 分配失败**
- ROCm 7.14 + gfx1201：VRAM 未分配 — [#26208](https://github.com/ggml-org/llama.cpp/issues/26208)（已关闭）
- ROCm 7.14：缺少 `libhipblas.so.3` — [#25807](https://github.com/ggml-org/llama.cpp/issues/25807)
- SYCL 第二条 prompt 出现垃圾输出 — [#26845](https://github.com/ggml-org/llama.cpp/issues/26845)（已关闭）
- Vulkan Intel Arc A770 在 Qwen 3.8 flash 上 assert `wg0 > maxComputeWorkGroupCount` — [#28247](https://github.com/ggml-org/llama.cpp/issues/28247)（已关闭）
- Vulkan Intel B70 MoE 崩溃 — [#23769](https://github.com/ggml-org/llama.cpp/issues/23769)
- Gemma-4-E4B CUDA scheduler assert `n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS` — [#24132](https://github.com/ggml-org/llama.cpp/issues/24132)
- RPC + AMD `top_k` sampling：`argsort.cu` 中 `GGML_ASSERT(shared_mem <= smpb)` — [#24177](https://github.com/ggml-org/llama.cpp/issues/24177)（已关闭）。相关 Vulkan argsort race/OOB 已在 [b10903 / #28705](https://github.com/ggml-org/llama.cpp/pull/28705) 修复

**中 — 功耗、buffer、parser**
- SYCL `-cb` 把 Battlemage 钉在 `gt-c0` / boost，无空闲节能 — [#24946](https://github.com/ggml-org/llama.cpp/issues/24946)
- 混合 GPU 上 Qwen-Next Flash compute-buffer 过度分配 — [#27953](https://github.com/ggml-org/llama.cpp/issues/27953)
- Server `response_format.json_schema` 忽略未包装的 schema — [#28697](https://github.com/ggml-org/llama.cpp/pull/28697)
- Server 中 preset 名称 / ignore 相关 bug — [#25150](https://github.com/ggml-org/llama.cpp/issues/25150)
- RPC weight-cache 对 activation 做哈希（部分缓存）— [#28789](https://github.com/ggml-org/llama.cpp/pull/28789)

## 6. 对应用开发者意味着什么

- **做视觉 + speculative decoding 请发 b10906+。** 现在传给每个 drafter 的是 position 而非 token 计数；旧 server 在图像之后可能静默误投机。
- **把量化目标上的 speculation 当作未验证。** Q4/Q8 上的 greedy draft-MTP 可能与非投机路径分叉（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）。CI 里保留非投机基线，或把目标钉在 bf16 以保证精确匹配。
- **MTP 模型需要 KV-cache 修复，并检查进程生命周期卫生。** DeepSeek2 / GLM-4-MoE / Cohere2-MoE 应使用 **b10907+**。若在 Qwen3.6-MTP 上跨会话复用同一 server 进程，关注 [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)——输出漂移时回收 slot/进程。
- **Tool-calling parser 仍与模型模板绑定。** 在 `<tool_call>` 前先吐散文的 Qwen thinking 模型，以及 Ling 3.0 预打开的 `<think>`，需要专用 parser（[#20260](https://github.com/ggml-org/llama.cpp/issues/20260)，[#28682](https://github.com/ggml-org/llama.cpp/pull/28682)）。不要假设通用 `peg-native` 足以支撑 agent 循环。
- **RDNA4 / ROCm 7.14 仍在变动。** FA prompt-processing 回退以及 VRAM/`libhipblas` 问题已出现，并在 [#28102](https://github.com/ggml-org/llama.cpp/pull/28102) / [#26208](https://github.com/ggml-org/llama.cpp/issues/26208) 中部分处理。将 gfx1201 机器升级前，请分别对 PP 与 TG 做基准。
- **Intel Arc（Vulkan/SYCL）是脆弱边缘。** work-group 上限、MoE 崩溃、第二条 prompt 垃圾、`-cb` 功耗钉死都还在。生产 agent 优先 CUDA/Metal，除非你在跟踪这些 issue。
- **对多租户应用仍关键的 server 产品缺口：** 同一已加载模型上的多套 presets（[#23704](https://github.com/ggml-org/llama.cpp/issues/23704)）、非原生后端上的 web UI（[#22531](https://github.com/ggml-org/llama.cpp/issues/22531)）、缓存模型列表/删除（[#16393](https://github.com/ggml-org/llama.cpp/issues/16393)）、磁盘上下文 checkpoint（[#20697](https://github.com/ggml-org/llama.cpp/issues/20697)）。现阶段请在自有控制面规划这些能力。
- **`/v1/chat/completions` 上的 JSON schema：** 若按 README 发送 `response_format.schema`（而不是嵌在 `json_schema.schema` 下），当前 master 可能丢掉 schema，直到 [#28697](https://github.com/ggml-org/llama.cpp/pull/28697) 合入。请使用嵌套的 OpenAI wrapper 形式。

近期构建的 attestations：[46774832](https://github.com/ggml-org/llama.cpp/attestations/46774832)（b10919 时代）、[46709648](https://github.com/ggml-org/llama.cpp/attestations/46709648)。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

我会拉取官方 v0.34.0 发行说明以及若干高信号 issue，以确保本摘要准确。
# Ollama Digest — 2026-09-12

Source: [github.com/ollama/ollama](https://github.com/ollama/ollama) · latest stable [v0.34.0](https://github.com/ollama/ollama/releases/tag/v0.34.0)

## 1. 本周要点

v0.34.0 是当前稳定线：可在 ChatGPT Desktop（macOS 应用配置）中使用本地 Ollama 模型，Apple Silicon 上的结构化输出延迟有所改善，OpenAI 兼容接口新增客户端 tool search 以及 response compaction。

近 24 小时的 issue/PR 流主要集中在 **tool-call 解析正确性**（Qwen3 / Qwen3.8 / Gemma 4 / Anthropic `/v1/messages`）、**0.34.0 上的 cloud proxy 挂起**，以及大体积 GGUF 与 AMD gfx1200 上的 **模型加载回归**。社区 PR 还在推进 MLX 导入、Qwen3.5 并行调度，以及 cloud TTFB 超时。

## 2. 发布与破坏性变更

**v0.34.0** ([release](https://github.com/ollama/ollama/releases/tag/v0.34.0), tag `d8ab4b4`, changelog [v0.33.3…v0.34.0](https://github.com/ollama/ollama/compare/v0.33.3...v0.34.0))

- ChatGPT Desktop 集成（macOS Ollama 应用）。相关文档/UI 工作：[#18377](https://github.com/ollama/ollama/pull/18377)、[#18372](https://github.com/ollama/ollama/pull/18372)、[#18383](https://github.com/ollama/ollama/pull/18383)。
- Apple Silicon 上结构化输出更快。
- OpenAI-compat：客户端 **tool search** 与 **response compaction**；RC 期间还加入了独立的 named function outputs（[#18348](https://github.com/ollama/ollama/commit/d8ab4b4)）、Codex 纯文本 agent 消息，以及 web-search 响应收尾。
- 未宣布 API 版本升级。已关闭的 [#18393](https://github.com/ollama/ollama/pull/18393) **移除内置 CLI agent** 并恢复先前的聊天 UI —— 若你脚本化了该 agent，应视为 CLI 行为回退。

仅云端模型（`:cloud`）仍是一等公民；仍有用户请求可下载的 GLM-5.1 / DeepSeek-v4.1-flash GGUF（[#15412](https://github.com/ollama/ollama/issues/15412) 已作为 request 关闭，[#18379](https://github.com/ollama/ollama/issues/18379) 仍开放）。

## 3. 新模型与硬件支持

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

## 4. 性能与优化

- **Apple Silicon 上的结构化输出** 在 0.34.0 中得到改善（[notes](https://github.com/ollama/ollama/releases/tag/v0.34.0)）。
- **Qwen3.5 / Qwen3.5-MoE 并行服务**：`server/sched.go` 中硬编码的 `numParallel = 1` 现在可以放开，因为 llama.cpp 崩溃已在上游修复（2026-03-08）。PR：[#17144](https://github.com/ollama/ollama/pull/17144)。
- **加载时间回归**：Qwen3.5 122B 在 Strix Halo 上从 0.24 → 0.30.4 由 61s 变为 116s；加载完成后 prompt processing 约快 40%（[#16501](https://github.com/ollama/ollama/issues/16501)）。另有报告：GPT-OSS:120b 以及“所有模型”在 0.23.4 之后加载变慢，并持续到 0.30+（[#18373](https://github.com/ollama/ollama/issues/18373)）。
- **Cloud proxy**：无界的 `http.DefaultClient` → 在 0.34.0 上约 45 分钟后卡住（0.33.1 正常）。超时 PR：[#18382](https://github.com/ollama/ollama/pull/18382)；报告：[#18381](https://github.com/ollama/ollama/issues/18381)。
- **Windows embed 风暴**：禁用 keep-alive 时 `/api/embed` 会耗尽 loopback 端口（[#18392](https://github.com/ollama/ollama/issues/18392)）。
- **Manifest-list / runner-specific tags**（为去掉 llama-server 兼容补丁做准备）：[#16590](https://github.com/ollama/ollama/pull/16590)。相关评测需求：在 `/api/chat` 中包含已服务的 manifest digest（[#18394](https://github.com/ollama/ollama/issues/18394)）。

## 5. 稳定性与回归

按运维严重程度排序。

**P0 — Cloud 挂起 / 无法恢复（0.34.0）**  
`*:cloud` 约 45 分钟后卡住；返回 502 且无结构化错误。变通方案是 0.33.1。[#18381](https://github.com/ollama/ollama/issues/18381)，修复尝试 [#18382](https://github.com/ollama/ollama/pull/18382)。GLM-5.3:cloud 还会进入无界 reasoning 并中止，与官方 Z.AI 行为不一致（[#18193](https://github.com/ollama/ollama/issues/18193)）。

**P1 — Tool calls 被静默丢弃**  
解析失败会返回空 `content`、没有 `tool_calls`、`finish_reason: stop`：

- 通用解析失败直接丢弃：[#17274](https://github.com/ollama/ollama/issues/17274)
- Qwen3 `/api/chat` 的 `tools` 参数定义畸形 + thinking 开关：[#14601](https://github.com/ollama/ollama/issues/14601)
- Qwen3.8 在 tool loop 中报 “no user query found in messages” 500（25 👍，28 条评论）：[#17778](https://github.com/ollama/ollama/issues/17778)
- Gemma 4 带空格的 object key 未加引号 → 整次调用被丢弃：[#18390](https://github.com/ollama/ollama/issues/18390)
- Gemma3nTools 发出 `<tool_call>`，但 `/v1` 既不返回 tools 也不返回文本：[#18357](https://github.com/ollama/ollama/issues/18357)
- Anthropic `/v1/messages` + 复杂 schema → tool call 变成字面文本：[#18346](https://github.com/ollama/ollama/issues/18346)
- 进行中的解析器 PR：将 tools 渲染为 JSON [#18391](https://github.com/ollama/ollama/pull/18391)，接受 `args` 字段 [#18388](https://github.com/ollama/ollama/pull/18388)

**P1 — 错误 / 空生成**  
IQ3_S Qwen3.8 空输出 [#18297](https://github.com/ollama/ollama/issues/18297)；官方 Qwen2.5-Coder-3B 低比特 library quant 在代码任务上 0 分 [#18252](https://github.com/ollama/ollama/issues/18252)。

**P2 — 硬件 / 加载**  
gfx1200 Tensile 缺失 [#17782](https://github.com/ollama/ollama/issues/17782)；Jetson Gemma4 projector OOM [#18396](https://github.com/ollama/ollama/issues/18396)；加载时间回归 [#18373](https://github.com/ollama/ollama/issues/18373)、[#16501](https://github.com/ollama/ollama/issues/16501)。Gemma3n CPU projector 损坏已在关闭的 [#18376](https://github.com/ollama/ollama/pull/18376) 中处理。

**P3 / 噪音**  
TOC 省略号会取消任务 [#18387](https://github.com/ollama/ollama/issues/18387)。FD-leak [#18344](https://github.com/ollama/ollama/issues/18344) **已撤回**（`lsof` 作用域有误）。

## 6. 对应用开发者的含义

1. **谨慎钉死 cloud 与 local。** 若在 0.34.0 上使用 `*:cloud`，现在就加上客户端截止时间，并关注 [#18382](https://github.com/ollama/ollama/pull/18382)。长 agent 会话应停留在 0.33.1，直到 proxy 超时落地。
2. **不要把空的 `tool_calls` 当成“模型拒绝了”。** 在 Qwen3/3.8、Gemma 4 以及 Anthropic-compat 上，空 content + `stop` 往往意味着 **解析丢弃**。记录原始服务端追踪；优先使用更简单的 tool JSON（key 中不要有空格）；在 [#14601](https://github.com/ollama/ollama/issues/14601) / [#18391](https://github.com/ollama/ollama/pull/18391) / [#18388](https://github.com/ollama/ollama/pull/18388) 落地前，可考虑把 tools 写进 system prompt。
3. **校验官方 library quant。** Qwen2.5-Coder-3B 的 q2/q3 library 文件看起来流畅，但功能测试得分为 0（[#18252](https://github.com/ollama/ollama/issues/18252)）。社区 IQ3_S GGUF 可能以空字符串完成（[#18297](https://github.com/ollama/ollama/issues/18297)）。评测分数应绑定 **manifest digest**，而不是 tag（[#18394](https://github.com/ollama/ollama/issues/18394)、[#16590](https://github.com/ollama/ollama/pull/16590)）。
4. **Desktop 现已成为一等客户端。** ChatGPT Desktop 加上既有的 Claude Desktop 路径，意味着本地模型会出现在封闭应用中。Cloud 推荐 UX 的闸门正在收紧（[#18383](https://github.com/ollama/ollama/pull/18383)）。
5. **硬件脚注：** AMD RDNA4（gfx1200）与 Jetson 8GB 多模态在当前 0.34.0 上不安全；ROCm APU 的 projector offload 仍被错误禁用（[#16767](https://github.com/ollama/ollama/pull/16767)）。Qwen3.5 并行 decode 目前只被调度器里残留的 denylist 挡住（[#17144](https://github.com/ollama/ollama/pull/17144)）。
6. **路由侧的元数据缺口。** `/api/show` 与 `/v1/models` 仍缺少按模型的 `reasoning_effort`、最大输出 token 以及显式 context（[#18385](https://github.com/ollama/ollama/issues/18385)）。网关应维护自己的能力表。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

我将拉取 GitHub 上最新的 LiteLLM 发行说明与 issue/PR 上下文，确保本摘要准确，而不是只看被截断的标题。官方 v1.100.0 说明里有我需要的破坏性变更与模型支持细节；接下来会拉取这些内容。
# LiteLLM Digest — 2026-09-12

Repo: [BerriAI/litellm](https://github.com/BerriAI/litellm) · ~58.5k stars

## 1. 本周要点

当前推荐标签是稳定版 **v1.100.1**（9 月 10 日）：它回移植了 v1.100.0 的重试面包屑泄漏修复，失败尝试不再一直保留此前每一次请求体，直到代理被 OOM 杀掉。该版本建立在 **v1.100.0**（9 月 6 日）之上，后者带来了共享 access-group 预算、Together AI 端点/定价重构、由运维定义的自动路由档位、MCP 会话加固，以及对 **242 个模型** 的 day-0 覆盖。

过去 24 小时其余工作基本是预发布打磨：**v1.102.0-dev.2** 与 **v1.101.0-rc.\*** 落地了 MCP OAuth/发现修复、跨别名的按模型 key 预算强制、Responses-API 的 completeness reasons，以及 218 个模型的价格同步。目前最热、仍未关闭的讨论仍是 3 月的 PyPI 供应链事件（#24518，119 条评论 / 136 个 👍）——已得到控制，但运维仍在追问核验步骤。

## 2. 发行与破坏性变更

| Tag | Date | Channel | Notes |
|---|---|---|---|
| [v1.102.0-dev.2](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2) | 11 Sep | pre-release | MCP logging/auth 覆盖、spend-log session 别名、percentile TTFT 路由、hosted-vLLM image edit |
| [v1.100.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.1) | 10 Sep | **stable patch** | 回移植 [#39491](https://github.com/BerriAI/litellm/pull/39491)（retry breadcrumbs）；**回滚** 来自 `stable/1.100.x` 的 spend-attribution 回移植（[#40495](https://github.com/BerriAI/litellm/pull/40495)） |
| [v1.102.0-dev.1](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1) | 9 Sep | pre-release | 流式 post-call guardrail 管道、MCP OAuth relay、Bedrock GovCloud 价格 |
| [v1.101.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2) / [rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1) | 10 / ~9 Sep | RC | Mongo sidecar、tenant traces、team-admin callbacks |
| [v1.100.0](https://github.com/BerriAI/litellm/releases/tag/v1.100.0) | 6 Sep | **stable** | 功能发行；文档：[release notes](https://docs.litellm.ai/release_notes/v1.100.0/v1-100-0) |

部署镜像：`docker.litellm.ai/berriai/litellm:1.100.0`（或 `:v1.100.1`）。1.100.0 的 PyPI 包从 `10631eb` 构建，Docker 从 `e4f2526` 构建——团队称功能等价。所有镜像均使用 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 引入的密钥做 **cosign 签名**。

**v1.100.0 破坏性变更**（若你在跑 MCP、spend API 或 complexity router，不要跳过）：

- **团队 / 组织 / 内部用户上的 MCP toolsets 现在会被强制执行**（[#38488](https://github.com/BerriAI/litellm/pull/38488)）。此前是 fail-open。依赖旧行为的团队会失去未写入 toolset 的工具——扩大 toolset 才能恢复访问。
- **`GET /spend/logs` 硬上限为 10,000 行**（[#38420](https://github.com/BerriAI/litellm/pull/38420)）。截断由 `x-litellm-spend-logs-truncated: true` 指示。请改用分页的 `GET /spend/logs/v2`。
- **`prompt_token_calculator` 已从 `litellm.utils` 移除**（[#38132](https://github.com/BerriAI/litellm/pull/38132)）→ `ImportError`。改用 `litellm.token_counter(model=..., text=...)`。
- **写在 `complexity_router_config` 之外的 complexity-router 旋钮会被拒绝**（43 项设置）（[#38570](https://github.com/BerriAI/litellm/pull/38570)）。放错位置的 `tier_boundaries` 等现在会让 `/model/new`、`/model/update` 以及配置加载失败。
- **经 Router 走 Cerebras 时默认 `max_retries=0`**（[#36601](https://github.com/BerriAI/litellm/pull/36601)）。旧的下落路径使用 SDK 默认值 2。
- **自动路由请求体中会剥离 `router_model_name`**（[#38429](https://github.com/BerriAI/litellm/pull/38429)）。请使用 `return_raw_model_name: true`。
- **`litellm_settings.autorouter_savings_baseline_model` 已删除**（[#38700](https://github.com/BerriAI/litellm/pull/38700)）。每个 complexity router 用自己最难的档位作为反事实基线；残留 YAML 键会被忽略，**报告的节省金额会变化**。

## 3. 新模型与硬件支持

**已随 v1.100.0 发布（242 个模型）**——不是 CUDA/ROCm/Metal 层面的变化；这是网关目录 + 协议翻译：

- **Gemini / Vertex：** `gemini-3.5-transcribe`、`gemini-3.5-transcribe-live`、`veo-3.1-lite-generate-001`、Gemma 4 instruct 变体、live native-audio。
- **xAI：** `grok-4.20` 系列（reasoning / non-reasoning / multi-agent）以及 `grok-imagine` 图像产品线。
- **Mistral（24 个 id）：** Voxtral audio/realtime/TTS、Ministral 3B/14B、OCR 3/4、Code + Vibe CLI。
- **视频 / 搜索：** RunwayML `gen4.5`、Seedance 2、Grounding with Bing Search 作为搜索提供方。
- **Databricks / Bedrock Mantle：** Claude Fable 5 / Opus 4.7–5 / Sonnet 5、GLM-5.x、`bedrock_mantle/openai.gpt-5.6-cyber`。

**过去 24 小时（尚未进入稳定版）：**

- 价格同步 **218 个模型，26 个新增**，覆盖 Anthropic、Fireworks、Gemini、OpenAI、Together —— [PR #40832](https://github.com/BerriAI/litellm/pull/40832)（open）。
- 原生 **Prism** provider（Chat Completions + Responses + Messages）—— [PR #40782](https://github.com/BerriAI/litellm/pull/40782)。
- **Meta Muse Voice** 实时转写（`meta/muse-voice-transcribe-1.0`）—— [PR #39395](https://github.com/BerriAI/litellm/pull/39395)。
- Together 目录缺口仍在：补上 `Kimi-K2.6` 定价 —— [#27450](https://github.com/BerriAI/litellm/issues/27450)。
- Hosted-vLLM **image edit** 与 Mistral **`/v1/audio/speech`** 已进入 1.102.dev 线。

本窗口没有新的内核后端或量化格式。硬件故事仍是「通过代理对接 vLLM / Ollama / Bedrock / 托管 GPU」。

## 4. 性能与优化

是具体工程，不是营销话术：

- **重试面包屑泄漏（稳定版）。** 每次失败尝试都会复制完整请求；代理内存持续增长直至 OOM。已回移植到 1.100.1（[#40455](https://github.com/BerriAI/litellm/pull/40455) / [#39491](https://github.com/BerriAI/litellm/pull/39491)）。发行门禁上新增了端到端内存回归测试 —— [PR #40773](https://github.com/BerriAI/litellm/pull/40773)（closed）。
- **1.102.dev 上的 spend-counter 合并：** 每个请求一次 Redis 调用，而不是每次递增一次；每 worker 的 SGR upsert 收束为每次 flush 一条语句。
- **大规模健康检查 OOM（已关闭）：** 后台检查每个周期把整张无界的 `LiteLLM_HealthCheckTable` 加载进每个 worker —— [#37611](https://github.com/BerriAI/litellm/issues/37611)。
- **Prompt-cache 路由 TTL 仍硬编码为 5 分钟**，会打断 1 小时临时缓存亲和性 —— [#28427](https://github.com/BerriAI/litellm/issues/28427)（open）。相关：模型切换时估算缓存重建成本 —— [PR #40804](https://github.com/BerriAI/litellm/pull/40804)。
- **vLLM `cached_tokens` 未计入成本计算器** —— [#22984](https://github.com/BerriAI/litellm/issues/22984)（open，5 条评论）。
- Adaptive/quality router 现在会记录节省基线 + 对话形态 —— [PR #38859](https://github.com/BerriAI/litellm/pull/38859)。
- 产品侧：面向 Claude Code / Codex 的自动路由 harness-aware 分类（博客，9 月 10 日），以及按子任务路由宣称 **46% 成本下降**（9 月 7 日工程博文）。把 46% 当作厂商自报，这里未独立复测。

## 5. 稳定性与回归

按爆炸半径排序。状态截至 12 Sep 12:52 JST。

### 严重 / 高

1. **供应链事件（已控制，仍是最吵的 issue）。** [#24518](https://github.com/BerriAI/litellm/issues/24518) —— PyPI `1.82.7` / `1.82.8` 因 CI 中被投毒的 Trivy 被入侵（3 月 24 日）。包已删除；当前发行干净；Docker 路径从未用过那些 wheel。请对每张镜像做 Cosign 校验。Townhall：[docs.litellm.ai/blog/security-townhall-updates](https://docs.litellm.ai/blog/security-townhall-updates)。
2. **`secret_redaction.redact_string()` 中的 ReDoS** —— 大型异常字符串上的灾难性回溯会把事件循环卡住数分钟，打挂存活探针，让代理进入崩溃循环。[#32353](https://github.com/BerriAI/litellm/issues/32353) **OPEN**。
3. **终端用户预算重置会撞上 PostgreSQL 的 32,767 绑定变量上限，永远完不成**，当大量客户共享同一预算时。[#40564](https://github.com/BerriAI/litellm/issues/40564) **CLOSED**（修复已合入；提升到生产前请在 1.102.dev 上确认）。
4. **`/v1/messages`（Claude Code）上的虚假 “Budget has been exceeded”** —— 强制成本远大于已记录消费（`111.29` vs `max_budget=100`）。[#40050](https://github.com/BerriAI/litellm/issues/40050) **CLOSED**。
5. **没有稳定的 Claude Code → LiteLLM → vLLM 路径。** `hosted_vllm` 会破坏 Anthropic Messages 流式；`anthropic` provider 是另一种断裂。[#30043](https://github.com/BerriAI/litellm/issues/30043) **OPEN** —— 对该拓扑视为生产阻断项。

### 中等（协议翻译 / spend / MCP）

- Bedrock Converse 拒绝携带 tool history 但省略 `tools=` 的 agent 后续轮次 —— [#40735](https://github.com/BerriAI/litellm/issues/40735) **OPEN**。
- Qwen3.8 的 tool results 在 **原生 Ollama** 上不被消费；OpenAI 兼容 `/v1` 可以 —— [#40575](https://github.com/BerriAI/litellm/issues/40575) **OPEN**。
- `parse_tool_call_arguments` 会丢掉拼接起来的 JSON tool args（`split_concatenated_json_objects` 存在但未使用）—— [#40582](https://github.com/BerriAI/litellm/issues/40582) **OPEN**。
- 流式 vs 非流式在 key 级 `router_settings` 上的 **fallback 不一致** —— [#25843](https://github.com/BerriAI/litellm/issues/25843) **OPEN**。
- Responses-API 桥接会丢掉非流式 `/v1/chat/completions` 的 SpendLogs —— [#36426](https://github.com/BerriAI/litellm/issues/36426) **OPEN**。
- A/B 流量镜像已文档化但未实际触发 —— [#31888](https://github.com/BerriAI/litellm/issues/31888) **OPEN**。
- 1.88.0 之后 307 重定向导致 `/metrics` 为空 —— [#30079](https://github.com/BerriAI/litellm/issues/30079) **OPEN**。
- 月度重置后 `max_budget` 被忽略 —— [#27300](https://github.com/BerriAI/litellm/issues/27300) **CLOSED**。
- 当 `budget_limits` 是 list 而未做 JSON 序列化时，`ResetBudgetJob` 全局崩溃 —— [#27171](https://github.com/BerriAI/litellm/issues/27171) **CLOSED**。
- 干净 EOF 且没有 `finish_reason` 不再计为成功；改为抛出 `MidStreamFallbackError` 以便 fallback 能触发 —— [PR #40353](https://github.com/BerriAI/litellm/pull/40353) **CLOSED**（修复 #40260）。

### MCP / auth（活跃 PR 爆发）

过去一天已关闭：根发现的网关鉴权（[#40791](https://github.com/BerriAI/litellm/pull/40791)）、按 server 的 OAuth issuer 匹配（[#40808](https://github.com/BerriAI/litellm/pull/40808)）、缓存上游 discovery 列表（[#40790](https://github.com/BerriAI/litellm/pull/40790)）。相关旧 bug（临时 OAuth server 不继承 URL）[#20495](https://github.com/BerriAI/litellm/issues/20495) 已 **CLOSED**。

## 6. 对应用开发者意味着什么

**钉死 1.100.1，不要跟 `main-latest`。** 1.102.dev / 1.101-rc 列车每天都在改 MCP、预算和 Responses 语义。提升镜像前先 Cosign 校验 digest。

**如果你在前面接 Claude Code、Codex 或 openai-agents：**  
- `/v1/messages` 上的预算计算曾经偏高——#40050 之后请重新核对 virtual-key 消费。  
- 经 openai-agents 走 GPT-5.4 + `reasoning_effort` + tools 历史上仍会失败（[#23156](https://github.com/BerriAI/litellm/issues/23156)）。  
- Bedrock Mantle + Codex：`reasoning.summary` 不是 `auto` 会 400；卡在 OpenAI Responses 路径上 —— [PR #40798](https://github.com/BerriAI/litellm/pull/40798)。  
- Hosted Claude 网页搜索以客户端函数形式回传（`unsupported call: web_search`），正在通过保留原生 `web_search_call` items 修复 —— [PR #40828](https://github.com/BerriAI/litellm/pull/40828)。  
- 新 CLI 路径：`lite configure` 可以用同一把网关 key 同时写入 Claude Code **和** Codex —— [PR #40829](https://github.com/BerriAI/litellm/pull/40829)。  
- **不要** 在生产里把 Claude Code → vLLM 经 LiteLLM 串起来，直到 #30043 有一条具名的稳定路由。

**MCP / agent 平台：** toolsets 在 team/org/user 上现在默认拒绝。升过 1.100.0 之前审计每一个挂上的 toolset，否则工具会消失。面向 MCP 的 Microsoft Agent 365 预执行 guardrail 正在推进（[#38241](https://github.com/BerriAI/litellm/pull/38241)）。NeMo Guardrails 仍是功能请求（[#25255](https://github.com/BerriAI/litellm/issues/25255)）。

**成本 / 路由：** access-group 共享预算 + 可选结转，是按团队计费时值得升级的原因。按模型的 key 预算现在会尊重别名（[#40819](https://github.com/BerriAI/litellm/pull/40819) closed）。vLLM prompt-cache 命中仍会被多计费（#22984）。Prompt-cache 亲和性在 5 分钟后失效（#28427）。Fake-streaming 仍不是一等公民开关（#30208）。

**可观测性：** `/spend/logs` 会被截断；抓取器请迁移到 `/spend/logs/v2`。部分 1.88+ 部署上 Prometheus `/metrics` 的 307 空 body 仍未关。即使 `store_prompts_in_spend_logs=true`，内部用户在 `/spend/logs/ui` 上仍看不到 prompt body（#34099）。不要把原始 `model` 字符串贴进错误文本——那会把 prompt 泄漏进 spend logs（[#40820](https://github.com/BerriAI/litellm/pull/40820)）。

**运维卫生：** 如果异常字符串可能很大（工具转储、原始 provider body），#32353 可以把事件循环打挂。在那条正则被替换之前，限制写入 redaction 的内容。对成千上万 user ID 做 `IN (...)` 的预算重置任务，需要 #40564 的分批修复。

**结论：** 1.100.1 是我会放在负载均衡后面的第一个 1.100.x 构建。把 1.102.dev 只留给 MCP/OAuth 和 Responses-bridge 工作。把 Claude-Code-on-vLLM 和 ReDoS redaction 视为未关闭的生产风险。

---

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

先核对官方仓库与近期发布说明，确保译文对应真实版本与变更。# Unsloth 周报 — 2026-09-12

仓库：[github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. 本周要点

Unsloth 连续发布 **v0.1.807-beta**（9 月 8 日）与 **v0.1.808-beta**（9 月 9 日），构成一轮性能与稳定性合集：扩散模型加速 1.2–1.7×，AMD 默认走 Vulkan（相对 ROCm 约 20%），默认 PyTorch 升级到 2.11，Python 包体积缩小约 60%，并推出官方 Docker 镜像。与此同时，Studio 正按 Codex 风格的项目工作区重构（持久化 agent 回合、沙箱内编辑、Git worktree、校验与 hooks）。AMD Strix / iGPU 上的长期硬件问题，以及 Windows 杀毒误报，在这两次 beta 中被明确标为已修复。

## 2. 版本发布与破坏性变更

| Version | Date | Notes |
|---|---|---|
| [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta) | 2026-09-09 | 当前最新。大幅性能 + 稳定性。默认 PyTorch **2.11**（2.14「很快」）。PyPI 仅发 wheel（无 sdist）。新 Docker：[hub.docker.com/r/unsloth/unsloth](https://hub.docker.com/r/unsloth/unsloth)。 |
| [v0.1.807-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta) | 2026-09-08 | AMD **默认 Vulkan**。已签名的 Windows `llama-server.exe`（减少 SAC/杀毒误报）。修复 AMD Strix / iGPU 乱码（已同步上报 AMD）。 |

**迁移说明**

- 安装器现在固定 `unsloth>=2026.9.2`，以及 Torch 2.11 extras（`cu126` / `cu128` / `cu130` + xformers 0.0.35）。Windows 上重装会保留受支持的 Torch，而不会静默升到会踩坑的版本。  
- AMD 推理路径变更：**Vulkan 为默认**，覆盖 Strix Halo / Strix Point，以及 Linux 上没有 ROCm 的 AMD iGPU。内核行为与显存记账会与 ROCm 不同。  
- AppImage 工具链已钉死；此前卡顿的 AppImage 应整包替换，不要原地打补丁。  
- Studio 的 Codex 默认登录模型改为 **gpt-6-astra**。配套的 OpenAI 兼容流式输出 / 音频 / 模型加载处理一并调整。  
- 包布局：PyPI **只发 wheel**（[#10202](https://github.com/unslothai/unsloth/pull/10202)）；源码安装请走 Git 或官方安装脚本。

## 3. 新增模型与硬件支持

- **AMD / Vulkan**：Strix Halo、Strix Point，以及无 ROCm 的 AMD iGPU 的默认后端。特别点名 Strix iGPU 的 BIOS 弹窗——给 iGPU 分到更多显存，推理可到约 3×。[v0.1.808 notes](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta)  
- **Apple Silicon / MLX**：自愈/更新路径不再拖垮推理 + 训练；支持 DoRA 以及更多 DPO loss；MLX 批量生成按会话流式输出；更多 VLM 可用纯文本数据微调；gated-delta 训练最高快 25%。面向真实 MLX 的 agent 工作区认证工作：[#10823](https://github.com/unslothai/unsloth/pull/10823)。  
- **Windows**：已签名的 llama.cpp 二进制；模型加载被拦截时给出更清晰的代码完整性错误。  
- **Docker**：原生 AMD64 + ARM64 镜像；NVIDIA 镜像覆盖 Turing 到 Blackwell。  
- **Studio 集成**：Blender MCP、Hermes 检测、GPT-6 Astra Codex 登录。  
- **仍未完成 / 未闭环**：Apple Silicon 作为一等训练目标仍是长期路线图项（[#4](https://github.com/unslothai/unsloth/issues/4)，644 👍）。Intel Arc B580 导入仍会因历史问题卡在 `torch.xpu.memory.mem_get_info()`（[#3533](https://github.com/unslothai/unsloth/issues/3533)）。多卡微调仍是高频诉求（[#1707](https://github.com/unslothai/unsloth/issues/1707)）。

## 4. 性能与优化

来自 [v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta)：

- Diffusion INT8/FP8：**1.2–1.7×** 加速（所列全部扩散模型）。  
- AMD 经 Vulkan 对比 ROCm：prefill + decode **约 20%**。  
- Strix Halo：prompt 处理 **+23%**，生成 **+8%**。  
- Apple Silicon 上的 gated-delta 训练：最高 **25%** 加速。  
- 量化 MLX KV cache：prompt 内存最高少 **74%**。  
- 安装/更新路径：更新约 **2×** 更快；Python 包体积缩小 **>60%**。  
- Diffusion offload 时的主机内存泄漏：[#10184](https://github.com/unslothai/unsloth/pull/10184)。  
- llama.cpp prefill 不再在仍在推进时超时：[#10172](https://github.com/unslothai/unsloth/pull/10172)。  
- 音频模型可加载到 CPU RAM，不必强行上 GPU：[#10054](https://github.com/unslothai/unsloth/pull/10054)。

相关产品能力（compaction / 滚动上下文）仍是进行中的功能请求（[#7472](https://github.com/unslothai/unsloth/issues/7472)）；自动 compaction 本身已在更早的 0.1.801 系列落地。

## 5. 稳定性与回归

按运维影响排序。大量旧 issue 在 2026-09-09 被批量关闭/更新，因此除非发布说明点名修复，否则将 “CLOSED” 视为*声称已修、待实机确认*。

**高**

- 系统识别到 AMD GPU，但 Studio 仍走 CPU / 显存显示 `--`（[#8473](https://github.com/unslothai/unsloth/issues/8473)，已关闭）。同类问题：Strix Halo 把模型打到系统内存，而不是 110 GB 统一 GPU 内存（[#6834](https://github.com/unslothai/unsloth/issues/6834)）。807/808 的 Vulkan + 显存记账是预期修复路径，请在实机验证。  
- Windows 上即使 GGUF 能装进显存，Studio 的 “Don’t reserve system RAM” 仍被忽略（[#9033](https://github.com/unslothai/unsloth/issues/9033)，**open**）。  
- 较长的 Qwen3.8 GGUF 对话在重载后丢失可复用 prompt 状态 → 约 11 分钟完整 prefill（[#9037](https://github.com/unslothai/unsloth/issues/9037)，**open**）。  
- IPv6 bind 黑洞导致 Studio 后端健康检查失败（[#10803](https://github.com/unslothai/unsloth/pull/10803)，**open**）。  
- `--tensor-split` 被忽略（[#10355](https://github.com/unslothai/unsloth/issues/10355)，**open**）。

**中**

- Desktop 0.1.807 的 vLLM 后端：不支持 `min_p` 与 `logit_bias`（[#10573](https://github.com/unslothai/unsloth/issues/10573)，**open**）。  
- Studio CI 多轮确定性冒烟在 merge base 上偶发失败（[#10004](https://github.com/unslothai/unsloth/issues/10004)）。  
- Qwen3-Coder-Next-Base QLoRA 在 2×A100 上 OOM（[#4040](https://github.com/unslothai/unsloth/issues/4040)）。  
- Gemma 3n 递归深度（[#3650](https://github.com/unslothai/unsloth/issues/3650)）；Qwen2 Kaggle `slice_indices` NameError（[#3450](https://github.com/unslothai/unsloth/issues/3450)）。  
- 训练正确性：Phi-3.5/4 上全标签为 `-100` 触发 ZeroDivision（[#2364](https://github.com/unslothai/unsloth/issues/2364)）；prompt-completion 数据集与 TRL 不一致（[#3399](https://github.com/unslothai/unsloth/issues/3399)）；视觉路径 `fetch_video` NameError（[#3086](https://github.com/unslothai/unsloth/issues/3086)）。

**较低 / 文档 / Studio UX**

- Codex + 本地 llama.cpp + Responses API 文档过时（[#5141](https://github.com/unslothai/unsloth/issues/5141)）。  
- Data Recipes 缺少数据集下载 / 额外节点（[#10637](https://github.com/unslothai/unsloth/issues/10637)）。  
- Studio 微调成功后 GGUF 导出失败（[#4845](https://github.com/unslothai/unsloth/issues/4845)）。  
- 重启后「永远选中 CPU」持续复现（[#5807](https://github.com/unslothai/unsloth/issues/5807)）。

## 6. 对应用开发者意味着什么

- **新 Studio/Desktop 与 Docker 部署请钉死 0.1.808-beta + Torch 2.11**。不要再默认 ROCm 是 AMD 快路径。  
- **把 Studio 当成 agent 运行时，而不只是微调 UI。** 过去 24 小时的 PR（[#10365](https://github.com/unslothai/unsloth/pull/10365)、[#9673](https://github.com/unslothai/unsloth/pull/9673)、[#10577](https://github.com/unslothai/unsloth/pull/10577)、[#10594](https://github.com/unslothai/unsloth/pull/10594)、[#10636](https://github.com/unslothai/unsloth/pull/10636)、[#10658](https://github.com/unslothai/unsloth/pull/10658)）补上了持久化工具循环、沙箱文件编辑、归属明确的 Git worktree、hooks，以及校验证据。若把 Studio 嵌成编码 agent，需要规划关 tab 恢复，以及需审批的工具卡片。  
- **OpenAI 兼容层不能跨后端当即插即用。** Codex Responses 文档、vLLM 的 `min_p`/`logit_bias`，以及 tensor-split 仍是缺口。采样参数要按后端实测。  
- **Studio 重载模型后，长 Qwen3.8 GGUF 会话的 prefill cache 并不持久。** 预留冷 prefill 预算，或保持进程常驻。  
- **APU 上的显存记账，以及「模型能塞进显存」开关，在 Windows/AMD 上仍不可信。** 承诺单机 serving 前，自己量 RSS + 显存。  
- **训练 API 面仍落后于 TRL**，尤其是 prompt-completion 数据集和部分视觉 collator。这些格式请保留 TRL-only 回退。  
- **运维**：优先用官方 Docker 镜像，而不是临时拼 pip extras；关注 IPv6 bind，以及 Windows CI 机器上的签名二进制/杀毒行为。

核心更新路径仍是 `pip install --upgrade unsloth unsloth_zoo`，或 Desktop 应用内更新器（[docs](https://unsloth.ai/docs/get-started/install/updating)）。

---

</details>