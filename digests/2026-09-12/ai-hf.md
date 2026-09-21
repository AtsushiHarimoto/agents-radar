# Hugging Face 热门模型周报 2026-09-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-12 03:47 UTC

---

先核对几张关键模型卡与术语，再按原 Markdown 结构译成通顺的简体技术文风。# Hugging Face 热门模型周报
**Week of 2026-09-12** · 按周点赞数收录 30 个模型

## 1. This Week’s Highlights

本周主线是高效多模态 **Flash** 模型，以及第二波 **Qwen3.8** 社区封装。DeepSeek 刚上线的 **V4.1-Flash**（552B MoE，激活 8B/16B，1M 上下文，原生视觉）是最新旗舰；阿里的 **Qwen3.8-27B** 与 **Qwen3.8-Flash-Next**（Qwen4 架构预览，激活 6B）仍是 Hub 上的流量发动机，仅 Unsloth GGUF 下载就已突破 **1100 万**。另一条轴是视频：官方 **MiniMax-H3**、**Lightricks LTX-2.5** 与社区 H3 融合版（Singularity）、角色替换 **Viggle-Animate** 并列。小模型一端，**MiniCPM5-2B** 与 **Spark-X2.5-4B** 正在重写 4B 以下端侧 Agent 的帕累托前沿。

## 2. Trending Models

### 🧠 Language Models（LLM、对话模型、指令微调）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,199 | 67,550 | 约 2.5B 的稠密 Llama 架构推理模型（131K 上下文，Apache 2.0），面向端侧助手、编码 Agent 与工具调用。走红原因：在 2B 档开源 SOTA（均分 53.9），经 SFT→RL→on-policy 蒸馏后，在 Agent 评测上领跑 4B 以下模型。 |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,108 | 17,712 | 紧凑通用 4B 对话模型，混合全注意力 + 滑动窗口注意力，原生 1M 上下文，支持 200+ 语言。作为 Qwen3.5-4B/9B 的实用本地替代，在 Agent、MCP 与多语工作负载上持续爬榜。 |
| [Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 694 | 3,121 | Nex-AGI 新一代 N2.5 Agent 家族中的小尺寸、具备多模态能力的成员（Qwen3.5-MoE 谱系）。因电脑操作、浏览与视觉接地 Agent 分数相对体量偏高，对照 Claude/GPT/Qwen 基线受到关注。 |
| [Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 597 | 12,260 | N2.5 中档 Agent 模型，Terminal-Bench / SWE-Bench Pro / OSWorld 强于 mini。作为面向网页、桌面与多模态工具循环的家族里，最实用的「日常主力」尺寸正在走红。 |
| [K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 282 | 5,192 | 稀疏 MoE + Mixture-of-Values 注意力：存储 36B、激活 4B，原生 512K 上下文，Apache 2.0。因宣称以 4B 激活达到前沿级 Agent/编码分数，并承诺开放数据与中间 checkpoint，吸引研究关注。 |
| [gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,943 | 15,074,191 | 原始 124M GPT-2 checkpoint，仍是 Transformers、TF、JAX、TFLite 上的默认基线与教程模型。高点赞/下载来自常青的教学与 embedding 管线需求，并非新发布。 |

### 🎨 Multimodal & Generation（图像、视频、音频、text-to-X）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 1,810 | 75,774 | 新的 552B 多模态 MoE，Causal Encoder–Decoder（prefill 激活 8B / decode 激活 16B），1M 上下文，激进 KV-cache 压缩。本周最热新作：API `deepseek-flash`，技术报告称在质量、成本与延迟上超过已下线的 V4-Pro。 |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,768 | 7,563,763 | 官方稠密多模态 Qwen3.8 主力（文本/图像/视频输入、文本输出，262K–1M 上下文，Apache 2.0）。本周 Hub 流量冠军：24GB 档本地默认选择，也是多数 GGUF/无审查分叉的父模型。 |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,506 | 1,669,564 | 开源权重视频基础模型，支持 T2V / I2V / V2V，原生多镜头、更强提示词跟随，本地可快速出 10 秒片段。作为闭源 Veo/Kling/Seedance 栈的可自托管替代正在走红。 |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 301 | 103,178 | MiniMax-H3 的社区融合 + 高步数微调，面向 ComfyUI 的 T2V/I2V/Ref2V/V2V。以 HDR 清晰度、中段人脸塌陷更少、相对原版 H3 更干净的「去油光」观感受欢迎。 |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,158 | 4,970,363 | 官方全模态视频系统：文本/图像/视频/音频输入，输出视频 + 原生立体声音频（最高 2K / 约 15s）。本周开源视频骨干；Viggle 与 Singularity 都建立在它之上。 |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,108 | 586,040 | Qwen4 架构预览：125B MoE + 51B N-gram embeddings，激活 6B，混合 GDN + Qwen Sparse Attention。社区把它当廉价长上下文多模态 Agent 来跑（Flash 成本下 SWE / office / OSWorld 表现强）。 |
| [DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 864 | 443,954 | V4-Flash 的实验性视觉姊妹模型，官方 API 现已路由到 V4.1-Flash。在团队迁移栈期间，仍作为独立多模态 checkpoint 被下载。 |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,253 | 1,173,520 | Z.ai 首个原生多模态 GLM-5：320B / 激活 18B，混合稀疏 + 线性注意力，1M 上下文。因在 Flash 定价下相对 GLM-5.2 的编码/Agent 提升走红，1-bit GGUF 约 100GB 内存可跑。 |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 230 | 971 | 约 3.6B 的统一符号 + 音频音乐模型：先规划可编辑乐谱，再渲染人声与伴奏。新看点是宣称 SongBench 可与 Suno v5/v6 竞争，并支持 Agent 式翻唱/编辑。 |
| [Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 181 | 0 | 基于 MiniMax-H3 ref2va 的 33.1B 全量微调，DMD 蒸馏到 3 次前向。用一张重绘帧替换角色并保持运动/镜头；官方对比中约比 Wan2.2-Animate-14B 快 6 倍。 |

### 🔧 Specialized Models（代码、数学、医疗、向量）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 384 | 28,328 | 去拒绝（abliterated）的 FP8 GLM MoE，偏向网络安全与「crack」风格工具调用。主要在红队与无审查 Agent 圈子流传，而非通用对话默认。 |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 734 | 633,239 | Google Research 的 Time Series Foundation Model 3.0（PyTorch）：多元预测、灵活协变量、stacked mixing Transformer。在 fev-bench、TIME Benchmark、GIFT-Eval 的基础预测模型中排名第一。 |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,826 | 254,035,929 | 经典 22M 句向量模型（PyTorch/TF/ONNX/Rust）。仍是默认 RAG/相似度主力；下载量来自基础设施需求，而非新架构。 |
| [VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 203 | 2,279 | 来自 Microsoft VibeVoice 家族的流式 ASR：长语音转写，带说话人、时间戳与内容结构。随整套 VibeVoice TTS/ASR 栈一起走红，面向小时级转写。 |
| [Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 169 | 3,271 | 驾驶 VLM：未改动的 Qwen3.5-4B + BEV 感知头 + flow-matching 规划专家（SFT 与 RL 变体）。首个统一 3D 感知、VQA 与运动规划的开源 Qwen 基础模型。 |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 455 | 12,081 | Meta Massively Multilingual Speech 300M wav2vec2 预训练。仍作为低资源 ASR/TTS 管线里的语音骨干使用。 |

### 📦 Fine-tunes & Quantizations（社区微调、GGUF、AWQ）

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 838 | 682,187 | Qwen3.8-27B 的学术混合精度 GGUF，采用 GSQ + RCO 量化。受欢迎点在于可复现的压缩配方，而不是泛泛的 Q4。 |
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,900 | 11,339,637 | Unsloth 官方风格的 Qwen3.8-27B GGUF 包。本周下载怪兽——llama.cpp / LM Studio / Ollama 跑这颗 27B 多模态模型的默认路径。 |
| [Qwen3.8-27B-TURBO-Fable-Cold-Fusion-…-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 484 | 606,200 | 社区「heretic / uncensored / NEO-CODER / MTP」GGUF 融合，基于 Qwen3.8-27B。典型 DavidAU 配方：创作 + 编码偏向，并带推测解码钩子。 |
| [Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 203 | 78,737 | NVIDIA ModelOpt 对 Qwen3.8-Flash-Next 的 NVFP4 量化。面向 TensorRT-LLM / Blackwell 级上服务这颗 125B 档 Flash 预览。 |
| [MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 169 | 70,755 | MiniCPM5-2B 官方 GGUF，面向 llama.cpp 类运行时。让这颗新 2B SOTA checkpoint 可直接丢进 Ollama 与边缘盒子。 |
| [Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 1,103 | 1,999,181 | Qwen3.8-27B 的激进无审查 + MTP GGUF，保留视觉标签。本周社区 27B 分叉里下载量第二高。 |
| [Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 205 | 231,831 | 打上 “Qwopus” 品牌的 llama.cpp GGUF 重混，目标是让 27B 多模态 checkpoint 接近 Flash 式服务。 |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 899 | 320,537 | 来自 Orca Router 的去拒绝 Qwen3.8-27B GGUF。又一份高流量无审查包，与 Unsloth 并列成为本地默认选项。 |

## 3. Ecosystem Signal

**Qwen3.8 是 Hub 的引力井。** 官方 27B 与 Flash-Next 权重，再加上 Unsloth、ISTA-DASLab、NVIDIA NVFP4，以及一簇无审查/MTP GGUF，占掉很大一部分点赞和原始下载。这与 Llama-3 / Qwen2.5 时代同一套路：一个开源家族成为量化与去拒绝的底盘。

**「Flash」现在是架构品类，而不再只是一个 SKU。** DeepSeek-V4.1-Flash（非对称 CED、极小 KV）、Qwen3.8-Flash-Next（激活 6B + 驻留内存的 N-gram + QSA）、GLM-5.3-Flash（320B/18B，混合稀疏-线性注意力）都在优化*激活*参数和 cache 字节，而不是headline 参数量。开源实验室比拼的是每美元 token 数和 100K–1M 的 Agent 上下文，而不是在单一 MMLU 式分数上击败闭源 API。

**视频再次拥有开源栈。** MiniMax-H3 是新的基座；LTX-2.5 是可自托管的基础模型对手；Viggle-Animate 与 Singularity 说明 ComfyUI 微调经济能在数周内挂上。音频（YuE2、VibeVoice ASR）与垂直 VLM（Qwen-Drive）已经出现，但相对对话和视频仍属小众。

**开源权重 vs 闭源：** 本周所有亮点都可下载。闭源视频 API 仍是质量/延迟参照，但 Hub 能量集中在可量化、可去拒绝、可在 24GB–DGX-Spark 盒子上服务的模型。社区增值几乎一边倒是 **GGUF + 无审查 + MTP**，而不是新预训练——例外是 MiniCPM5、Spark-X2.5、Nex-N2.5 和 K2-Horizon，说明小 Agent 赛道仍在交出原创权重。

## 4. Worth Exploring

1. **[DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)** — 本榜最新的架构故事（CED、CSA2、约 890 B/token 全局 KV、1M 上下文、原生视觉）。若关心 2026 年实验室如何在不淹没 HBM 的前提下服务长程多模态 Agent，这是最值得单点研读的模型。

2. **[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) + [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — 实用 ROI 最高：Apache-2.0 多模态稠密模型，本地工具链已成熟，GGUF 拉取超过 1100 万。看能力读官方模型卡，真要跑用 Unsloth。

3. **[MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)** — 最干净的小模型惊喜。若需要 3B 以下的端侧或单卡编码/工具 Agent，先拿它对照 Spark-X2.5-4B 与 Qwen3.5-4B 做评测，再考虑上 27B GGUF。

---