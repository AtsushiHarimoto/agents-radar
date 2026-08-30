# Hugging Face 热门模型周报 2026-08-30

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-08-30 07:55 UTC

---

# Hugging Face 热门模型周报  
**Week of 2026-08-30** · 按周点赞数排名

## 1. 本周亮点

Qwen 的 **Qwen3.8** 系列主导了 Hub 热度：全新的 **Qwen3.8-Flash-Next**（125B 量级稀疏 MoE，约 6B 激活，Qwen4 架构预览，262K 上下文，带视觉）是本周最热的官方发布；更早的 **Qwen3.8-27B** 稠密 VLM 仍领跑累计点赞，并成为社区默认的本地多模态主力。Z.ai 立刻跟进 **GLM-5.3-Flash**（320B / 18B 激活，GLM-5 系列首个原生多模态，混合稀疏 + 线性注意力，最高约 1M 上下文）以及更大的 **GLM-5.3**。视频生成是另一极：**MiniMax-H3** 与 **Lightricks/LTX-2.5** 在点赞和下载上均名列前茅，ControlNet / LoRA / 4-step distill 等配套紧随其后。榜单上很大一部分根本不是新基座——而是 Unsloth 的 GGUF、MLX/FP8 移植，以及 “abliterated / uncensored” 的 Qwen3.8-27B 分叉。这最清楚地说明：本地推理与更少限制的对话，和旗舰论文一样在拉动 Hub 流量。

## 2. 热门模型

### 🧠 语言模型

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 1,643 | 189,793 | GLM-5 系列首个原生多模态模型：总参数 320B / 激活 18B 的 MoE，混合稀疏 + 线性注意力，宣称约 1M 上下文。走红是因为 Z.ai 将其定位为以远低于旗舰的部署成本，达到 GLM-5.2 级别（甚至更好）的编程与智能体分数。 |
| [GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,296 | 8,804 | 完整的 GLM-5.3 旗舰（MoE + DSA tags），面向对话文本生成。它是 Flash 的「质量」兄弟款，被拿来把 Z.ai 新一代与 Kimi K3、Qwen3.8 Max 做对比的团队所关注。 |
| [Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 291 | 1,394 | 腾讯混元新作：770B / 49B 激活 MoE，1M-token 窗口，gated DSA，Apache 风格开源。本周新上，面向编程、办公与研究工作流；早期内部盲测在工程任务上略优于 GLM-5.3 和 Kimi K3。 |
| [Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 500 | 106,562 | Qwen3.5-MoE 风格的 35B-A3B 多模态文本模型。作为中等规模开源替代走红：单一 checkpoint 同时覆盖视觉与对话，无需 27B 稠密或 100B+ MoE 的体量。 |
| [Thomson-1.0-Small](https://huggingface.co/thomsonreuters/Thomson-1.0-Small) | thomsonreuters | 152 | 831 | Thomson Reuters 推出的紧凑 Qwen3.5-MoE 对话 VLM。关注点不在点赞绝对值，而在于企业级出版商罕见地开源图文对话权重。 |
| [phonellm-alpha-1](https://huggingface.co/pipecat-ai/phonellm-alpha-1) | pipecat-ai | 138 | 2,668 | 基于 Nemotron-H 的文本模型，出自 Pipecat 实时语音技术栈。上榜是因为语音智能体开发者需要小而面向电话场景的 LLM，而不是通用聊天巨兽。 |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,811 | 4,330,482 | 同一套 284B / 约 13B 激活的 V4-Flash 架构，July 31 训练后刷新让智能体分数大幅跳升（例如 Terminal Bench 2.1 61.8 → 82.7）。仍是下载量最高的开源聊天模型之一：便宜、快，而且现在编程智能体强得多。 |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 11,083 | 2,701,014 | Moonshot 的 2.8T 量级 MoE（约 104B 激活）多模态旗舰——目前被广泛引用的最大开源权重模型。仍是 Hub 常客，因为各实验室把它当作长上下文推理与智能体任务上要超越的开源天花板。 |

### 🎨 多模态与生成

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,316 | 52,341 | 官方 Qwen4 架构预览：约 125B MoE + 51B n-gram embeddings，**6B active**，262K 上下文，text/image/video-in → text-out。本周爆款，因其宣称在编程/办公上优于 Qwen3.7-Plus，训练与推理成本约仅为其 1/9，并且已有 Unsloth 本地配方。 |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 13,283 | 4,028,839 | 稠密 27B 原生 VLM（文本 + 图像 + 长视频，原生 262K 上下文，thinking/instruct 可切换）。本榜点赞最高，在 OSWorld / AndroidWorld / LiveCodeBench 上成绩亮眼后，成为默认的「单机就能跑」多模态模型。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,162 | 1,044,661 | 开放的 image/text/video-to-video 技术栈，原生 4K，支持本地 LoRA。作为 MiniMax H3 的完全开源、可商用替代方案走红，适合需要本地视频生成的团队。 |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,631 | 5,018,833 | 通用多模态生成器：文本/图像/视频/音频输入，最高 15s 2K 视频并带原生立体声音频。本周视频模型下载量最高；生态 LoRA 与 ControlNet 已在其上叠加。 |
| [Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 193 | 1,017 | Breeze 系列新的开源 TTS checkpoint。在几乎被 VLM 与视频占据的榜单上，是一个虽小但清晰的音频生成信号。 |
| [MiniMax-H3-Fun-Controlnet-Union](https://huggingface.co/alibaba-pai/MiniMax-H3-Fun-Controlnet-Union) | alibaba-pai | 162 | 4,250 | 面向 MiniMax-H3 的 VideoX-Fun ControlNet union（video-to-video / text-to-video / image-text-to-video）。走红是因为 H3 用户需要空间与运动控制，而不只是文本提示。 |
| [FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree](https://huggingface.co/FastVideo/FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree) | FastVideo | 160 | 0 | 面向 data-free / VSA 快速采样的 4-step 蒸馏 H3 预览。早期研究发布；点赞反映的是速度优先的视频推理需求，甚至先于下载量出现。 |
| [MiniMax-H3-Acc-LoRAs](https://huggingface.co/alibaba-pai/MiniMax-H3-Acc-LoRAs) | alibaba-pai | 147 | 13,767 | MiniMax-H3 的加速 LoRA（VideoX-Fun）。与 ControlNet union 配套——社区已把 H3 当平台，而不只是单个 checkpoint。 |

### 🔧 专用模型

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Tiel-Coder-35B-A3B-GGUF](https://huggingface.co/peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF) | peculiar-ragdoll | 129 | 47,817 | 35B-A3B Qwen3.5-MoE 编程模型的 llama.cpp GGUF，带 imatrix 量化。上榜是因为它是面向编程的专用权重，而不是通用的 uncensored 聊天分叉。 |

### 📦 微调与量化

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 578 | 188,061 | Flash-Next 的 Day-zero Unsloth GGUF；文档称极限量化可在约 75GB 统一内存中运行。大多数人实际会用这条路径在本地体验 Qwen4 预览。 |
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,192 | 8,363,481 | 27B VLM 的 Unsloth GGUF——**全榜下载量最高**。Qwen3.8-27B 的默认 llama.cpp / 桌面路径。 |
| [Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 929 | 645,554 | MLX / safetensors / GGUF 格式的 abliterated Qwen3.8-27B。受欢迎是因为它保留 27B 多模态基座，同时去掉拒绝行为。 |
| [GLM-5.3-Flash-GGUF](https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF) | unsloth | 276 | 27,288 | GLM-5.3-Flash 的 Unsloth GGUF。再次印证与 Qwen 相同的模式：官方 MoE 一出 → 本地量化立刻跟上。 |
| [Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 1,220 | 97,508 | 面向 Apple silicon 的 uncensored / abliterated 27B MLX 移植。受到想在没有 CUDA 机器上跑视觉模型的 Mac 用户追捧。 |
| [Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 756 | 1,061,687 | 27B VLM 的激进 uncensored + MTP GGUF。社区分叉下载量极高——MTP speculative decoding 是卖点。 |
| [Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 1,264 | 290,216 | 同一套 uncensored 27B 的 FP8 transformers 构建。面向高吞吐 GPU 推理，而非 llama.cpp。 |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 562 | 215,892 | OrcaRouter uncensored 27B 系列的 GGUF 兄弟款。补齐同一社区配方的 MLX / FP8 / GGUF 覆盖。 |
| [Qwen3.8-Flash-Next-FP8](https://huggingface.co/Qwen/Qwen3.8-Flash-Next-FP8) | Qwen | 155 | 44,281 | Flash-Next 官方 FP8（experts block-quantized）。给不想等社区 GGUF 的人用的生产推理 checkpoint。 |
| [Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 442 | 1,485,837 | 又一个高下载量的 abliterated 27B GGUF。Huihui 的品牌已形成「数日内出 uncensored Qwen」的可靠模式。 |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 830 | 1,843,237 | 面向 llama.cpp / MTP 的 uncensored 27B GGUF，下载量极大。与 Huihui、HauhauCS 在同一基座上直接竞争。 |
| [Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,519 | 0 | 面向 Qwen3.5/3.8 的 Jinja / MLX chat-template 包。高点赞、零权重下载——这是基础设施而非模型，但每次 Qwen 模板改坏后，本地 UI 都需要它。 |
| [Qwen3.8-27B-Uncensored](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored) | orcarouter | 212 | 42,987 | 全精度 / safetensors 的 uncensored 27B，FP8、MLX 与 GGUF 变体都从它衍生。本周整个社区家族的基座。 |

## 3. 生态信号

**Qwen3.8 是引力中心。** 官方 Flash-Next 与 27B，加上十几个 GGUF/MLX/FP8/abliterated 子模型，约占半壁江山。这不只是「一次热门发布」——而是不到一周就成型的完整本地运行时生态：Unsloth 提供吃内存友好的 GGUF，OrcaRouter/Huihui/HauhauCS/JonathanColetti 提供去掉拒绝的多模态对话，froggeric 则修补模板好让前端继续能用。

**中国实验室在并行、而非串行地开源旗舰。** 短时间内 Hub 上同时出现 Qwen3.8（Alibaba）、GLM-5.3 / Flash（Z.ai）、Kimi-K3（Moonshot，2.8T-class）、DeepSeek-V4-Flash-0731（训练后刷新，下载量巨大）、Hy4-preview（Tencent，770B/49B）以及 MiniMax-H3（视频）。开源权重已是默认竞争动作；专有 API 在延迟/价格上仍重要，但「必须下载」的产物几乎全是开源或有条件开源。

**稀疏 MoE + 便宜的长上下文，是共同的架构叙事。** Flash-Next（6B active）、GLM-5.3-Flash（18B active，混合线性/稀疏）、Hy4（49B active，gated DSA）、Kimi-K3 与 DeepSeek-V4-Flash 卖的是同一笔账：接近前沿的质量、却不用稠密旗舰的 FLOPs，外加 256K–1M 窗口。

**视频是第二平台。** MiniMax-H3 的下载量，以及立刻跟上的 Alibaba-PAI ControlNet/LoRA 和 FastVideo 4-step distill，说明社区已把 H3 当成当年的 Stable Diffusion：一个用来微调的基座。LTX-2.5 则是对需要更少许可/地域限制、以及原生 4K 的团队的对冲。

**量化速度才是真正的采用指标。** Unsloth 的 Qwen3.8-27B-GGUF 下载量达 **8,363,481**，远超多数官方仓库。本地 27B VLM + uncensored 变体，才是从业者真正花时间的地方。

## 4. 值得关注

1. **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)** — 最新架构预览（Qwen4 hybrid attention，6B active，视觉 + 262K）。若想研究 Qwen 的下一步，而不只是「3090 上现在能跑什么」，这是最好的单一 checkpoint。可搭配官方 FP8 或 Unsloth GGUF。

2. **[zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)** — 本周最强的「新面孔」：编程/智能体 + 原生多模态，作为 Qwen 的替代。混合注意力与 18B-active / 1M-context 的卖点，使其适合与 Flash-Next、DeepSeek-V4-Flash-0731 做 A/B。

3. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)**（若更在意许可/地域或 4K/on-prem，则看 **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**）—— H3 是 Hub 已经在分叉的视频基座；LTX-2.5 是更干净的开源权重路径。二者合在一起，比本榜任何单一 LLM 都更能定义当前的开源视频栈。

**本地推荐默认：** [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) ——如果你的目标是今天下午就跑起来一个够用的多模态模型，而不是去评测 100B+ MoE。

---