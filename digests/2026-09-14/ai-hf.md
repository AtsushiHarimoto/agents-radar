# Hugging Face 热门模型周报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-13 22:07 UTC

---

我会先拉取几份模型卡片，确保摘要准确，然后再写这份周报。
# Hugging Face 热门模型周报
**Week of 2026-09-14** · 按周点赞统计的 30 个模型

## 1. 本周看点

榜单被一分为二：一边是新的旗舰效率叙事，一边是 Qwen3.8 生态大爆发。**DeepSeek-V4.1-Flash** 于周中上线，是一款 552B MoE 多模态模型，采用 Causal Encoder–Decoder 设计（prefill 激活 8B，decode 激活 16B），KV cache 被大幅压缩——DeepSeek 已把生产流量切到它上面。**Qwen3.8-27B** 与 **Qwen3.8-Flash-Next** 同时霸榜点赞和下载，Unsloth 与 ISTA-DASLab 的 GGUF/GSQ 量化包单周下载达到数百万。生成侧，**MiniMax-H3**（原生立体声视频+音频，最高 2K / 15s）和 **Lightricks LTX-2.5** 继续撑起视频管线，而 **YuE2-3B** 是本周意外的音乐发布：歌词到歌曲，带一层可编辑 ABC 乐谱，团队声称在 WildSongBench 上超过 Suno v5。小型端侧模型（**MiniCPM5-2B**、**Spark-X2.5-4B**）以及偏智能体的 Qwen3.5-MoE 衍生版（**Nex-N2.5**、**Edge0-35B-A3B**）填满了本地推理赛道。

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,334 | 150,110 | Apache-2.0 的 2.5B 稠密 Llama 风格端侧 LLM，128K 上下文，面向本地助手、编程与工具调用。走红是因为 OpenBMB 宣称其达到 2B 级 SOTA（均分 53.9），并在数学与智能体基准上超过多个 4B 基线。 |
| [Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 987 | 3,552 | 以 MLX 为先的 Qwen3.5 MoE 预览版（35B-A3B），面向端侧推理打包。相对下载量而言点赞偏高，因为它瞄准的是 Apple silicon / 本地 MoE 部署，而非数据中心吞吐。 |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,152 | 21,336 | 紧凑 4B 通用模型，混合全注意力 + 滑动窗口注意力，原生 1M-token 窗口，覆盖 200+ 种语言。凭借智能体/工具基准（τ³、MCP-Atlas）相对同尺寸 Qwen/Gemma 基线的表现往上爬。 |
| [gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,030 | 15,158,496 | 原始 124M GPT-2 权重，仍是默认的教学与管线基线。周下载量来自基础设施惯性，并非新发布。 |
| [Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 138 | 474 | Agnes 系列小型图文到文本对话模型。下载量不高，但周点赞足以让这个实验性对话检查点露脸。 |
| [NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,736 | 7,979 | 4B Qwen3.5-text 衍生模型，标注面向智能体文本生成。点赞/下载比很高，说明社区更看好它作为紧凑智能体底座，而非已有生产流量。 |

### 🎨 多模态与生成（图像、视频、音频、text-to-X）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,191 | 244,457 | 原生多模态 552B MoE（CED 架构），1M 上下文；输入激活 8B、输出激活 16B，KV cache 压缩至 V4-Flash SSD 占用的约 1/8。作为 DeepSeek 新的默认 Flash SKU 走红，实验室称其在成本/速度上已超过 V4-Pro。 |
| [Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 754 | 3,970 | 基于 Qwen3.5-35B-A3B 的多模态智能体模型，聚焦电脑操作、浏览与视觉接地工具。Mini 是 Mini/Pro/Max 家族里便宜、高吞吐的 SKU，在 OSWorld 与编程智能体指标上有竞争力。 |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,960 | 7,768,964 | 官方 27B 多模态 Qwen3.8 稠密模型（图文到文本、对话）。本榜点赞最高的官方权重，也是本周最大 GGUF 包的母模型。 |
| [Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | 更大的 Nex-N2.5 多模态智能体（同一条 Qwen3.5 MoE 线），SWE-Bench Pro / OSWorld-Verified 分数强于 Mini。下载量已超过 Mini，因此 Pro 才是实际部署目标。 |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 397 | 3,707 | 3B 歌词到歌曲模型：先写出可编辑的 ABC 旋律/和弦方案，再渲染 48 kHz 立体声人声 + 伴奏。WildSongBench best-of-8 均分 6.9632 是团队表格里把它摆在 Suno v5 之上的依据。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,731 | 1,548,442 | Lightricks 扩散视频栈，覆盖 T2V、I2V、V2V 以及图文到视频。持续百万级下载使其成为本周默认的 ComfyUI / 本地视频后端。 |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 369 | 123,491 | 社区 MiniMax-H3 视频检查点（T2V / I2V / V2V）。搭上官方 H3 开源权重浪潮，推理流量可观。 |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,236 | 4,819,845 | 官方全模态视频模型：文本/图像/视频/音频输入，输出视频 + 原生立体声音频，最高 2K、15 秒（含 FL2VA 与 Ref2VA 变体）。本榜下载量最大的开源视频发布。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,161 | 624,390 | 125B-main + 51B n-gram 多模态 MoE（约 6B 激活），预告 Qwen4（Gated DeltaNet + Gated Attention）。在编程与办公智能体任务上，是 GLM-5.3-Flash 的快速本地/API 竞品。 |
| [AuK](https://huggingface.co/tencent/AuK) | tencent | 185 | 1,202 | 腾讯零样本 TTS / 声音克隆检查点。点赞尚处早期；吸引力来自标签组合（zero-shot TTS），而非当前下载量。 |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,302 | 1,576,209 | Z.ai 总参 320B / 激活 18B 的多模态 Flash 模型，MIT 许可，原生 1M 上下文。强劲的编程/工具调用基准加上线上 API，构成了本周 Flash 对决的另一半。 |
| [Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | 4B Qwen 视觉语言模型，专攻自动驾驶感知与运动规划。虽属小众但是官方出品，也是热门榜上少有的驾驶栈权重。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google 第三代预训练时序基础模型的 PyTorch 版。高下载量反映预测管线正在接入新的官方 TimesFM 版本。 |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 429 | 30,310 | abliterated / 去拒绝的 GLM-5.3 MoE，专攻网络安全工作流，以 FP8 发布。走红于「无审查领域专家」小众，而非通用对话模型。 |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,926 | 252,928,721 | 22M 参数的句向量主力。仍是本榜下载量断层第一——RAG 与搜索默认栈还没从它身上挪开。 |
| [bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,300 | 46,513,338 | 经典 110M BERT 编码器。持续的 fill-mask / 特征提取流量，并非 2026 年的研究事件。 |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 526 | 12,880 | Meta Massively Multilingual Speech 的 300M wav2vec2 预训练。作为多语言 ASR/语音编码器底座，关注度稳定。 |
| [distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,433 | 7,325,282 | 蒸馏版 BERT 编码器，仍被用作廉价分类器与 NER 骨干。与 BERT、MiniLM 同属「常青基础设施」模式。 |
| [clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,499 | 21,331,361 | 原始 CLIP ViT-B/32 零样本图文模型。在大量应用中仍是默认的检索/分类编码器。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 966 | 769,557 | 官方 Qwen3.8-27B 的混合精度 GSQ + RCO GGUF。研究级量化，却有生产级下载量。 |
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,007 | 11,005,880 | Unsloth 出品的 Qwen3.8-27B 官方线 GGUF 包。本周单一最大的 Qwen3.8 下载汇——本地 llama.cpp / Ollama 需求都集中在这个仓库。 |
| [Qwen3.8-27B-TURBO-Fable-Cold-Fusion-…-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 630 | 750,591 | Qwen3.8-27B 的无审查 / “heretic” + 偏编程向融合 GGUF，带 MTP 向打包。高下载量说明无审查编程融合这个细分仍有商业价值。 |
| [MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 215 | 99,716 | MiniCPM5-2B 的官方 GGUF，面向 llama.cpp 一类运行时。说明这款 2B 端侧模型正在被本地消费，而不只是 safetensors。 |
| [Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI) | Alissonerdx | 139 | 11,860 | 基于 MiniMax-H3 的 ComfyUI LoRA / 辅助包。点赞不多，但大量本地 H3 视频工作流实际是靠它加载的。 |

## 3. 生态信号

**Qwen3.8 是引力中心。** 官方 **Qwen3.8-27B** 与 **Qwen3.8-Flash-Next**，再加上 Unsloth 与 ISTA-DASLab 衍生包，占据了大量点赞与下载。Flash-Next 被明确定位为 Qwen4 架构预览（混合 Gated DeltaNet + Gated Attention、Muon 优化器、n-gram embeddings），因此社区既把它当研究检查点，也当本地编程智能体。

**DeepSeek 与 Z.ai 在同一套 “Flash” 产品形态上对打：** 超大稀疏骨干、少量激活参数、百万 token 上下文、多模态输入，并以 KV-cache 压缩作为成本杠杆。DeepSeek-V4.1-Flash 的 CED 拆分（8B prefill / 16B decode）是本榜最具辨识度的新架构。

**除了最老的嵌入/ASR 基线，开源权重仍是默认选项。** MiniMax 开源了 H3（仍有两个模块仅 API），YuE2 放出 CC-BY-NC 音乐权重，在公开基准上挑战闭源音乐龙头；连驾驶（Qwen-Drive）和网络安全（abliterated GLM-5.3）都以开源检查点现身。

**量化与本地打包已是一等公民发布，而非事后补丁。** 仅 Unsloth 的 Qwen3.8-27B GGUF 下载就超过 11M；ISTA-DASLab 的 GSQ-RCO 与 DavidAU 的无审查融合各自突破 750K。MiniCPM5 与 MiniMax-H3 都在基座发布后数日内就有官方或社区运行时包（GGUF、ComfyUI、MLX）。赢家模式是：官方多模态/MoE 基座 → 同一新闻周期内出现 GGUF/MLX/ComfyUI。

**常青基础设施并未离开榜单。** MiniLM、BERT、DistilBERT、CLIP 和 GPT-2 仍打出海量下载。热门「研究」与热门「生产嵌入栈」是共享同一块排行榜的两个市场。

## 4. 值得关注

1. **[DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)** — 本周最有「架构论文」气质的发布。CED + 激进 KV 压缩，瞄准输入重、cache-hit 昂贵的智能体负载。若你在跑长上下文多模态智能体，这是对标 GLM-5.3-Flash 与 Qwen3.8-Flash-Next 的检查点。

2. **[YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B)** — 少见的开源音乐模型：既对打闭源商业 SOTA，又公开可编辑的符号规划层。智能体式编辑闭环（乐谱 → 反馈 → 修订乐谱）比又一个 lyrics-to-wav demo 更有意思。单张 24GB GPU 就能跑。

3. **[MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)**（外加 [GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF)）——若 2B 打赢 4B 的评测表在独立复现中站得住，它就是新的默认超小本地助手。Apache-2.0、128K 上下文，已有 MLX/GGUF，成本低到可以和更大的 Qwen3.8/DeepSeek Flash 搭配做路由或草稿模型。

---