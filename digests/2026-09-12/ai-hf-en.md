# Hugging Face Trending Models Weekly 2026-09-12

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-12 03:47 UTC

---

I'll research the key model cards so the digest summaries are accurate, then organize them by category.# Hugging Face Trending Models Digest
**Week of 2026-09-12** · 30 models by weekly likes

## 1. This Week’s Highlights

The week is dominated by **efficient multimodal “Flash” models** and a second wave of **Qwen3.8 community packaging**. DeepSeek’s just-shipped **V4.1-Flash** (552B MoE, 8B/16B active, 1M context, native vision) is the newest flagship drop; Alibaba’s **Qwen3.8-27B** and **Qwen3.8-Flash-Next** (Qwen4 architecture preview, 6B active) remain the Hub’s volume engines, with Unsloth GGUFs alone past **11 million** downloads. Video is the other axis: official **MiniMax-H3** and **Lightricks LTX-2.5** sit alongside community H3 fusions (Singularity) and **Viggle-Animate** character replacement. At the small end, **MiniCPM5-2B** and **Spark-X2.5-4B** are resetting the sub-4B Pareto frontier for on-device agents.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,199 | 67,550 | Dense ~2.5B Llama-arch reasoner (131K context, Apache 2.0) built for on-device assistants, coding agents, and tool use. Trending because it posts 2B-class open SOTA (avg 53.9) and leads sub-4B models on agentic evals after SFT→RL→on-policy distillation. |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,108 | 17,712 | Compact general-purpose 4B chat model with hybrid full + sliding-window attention, native 1M context, and 200+ languages. Climbing the board as a practical local alternative to Qwen3.5-4B/9B on agent, MCP, and multilingual workloads. |
| [Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 694 | 3,121 | Small multimodal-capable member of Nex-AGI’s new N2.5 agent family (Qwen3.5-MoE lineage). Watched for computer-use, browsing, and visually grounded agent scores that punch above its size versus Claude/GPT/Qwen baselines. |
| [Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 597 | 12,260 | Mid-tier N2.5 agent model with stronger Terminal-Bench / SWE-Bench Pro / OSWorld numbers than mini. Trending as the practical “daily driver” size in a family aimed at web, desktop, and multimodal tool loops. |
| [K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 282 | 5,192 | Sparse MoE with Mixture-of-Values attention: 36B stored, 4B active, 512K native context, Apache 2.0. Attracting research interest because it claims frontier-class agent/coding scores at 4B active and promises open data plus intermediate checkpoints. |
| [gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,943 | 15,074,191 | The original 124M GPT-2 checkpoint, still a default baseline and tutorial model across Transformers, TF, JAX, and TFLite. High likes/downloads reflect evergreen educational and embedding-pipeline use, not a new release. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 1,810 | 75,774 | New 552B multimodal MoE with Causal Encoder–Decoder (8B prefill / 16B decode active), 1M context, and aggressive KV-cache compression. Hottest fresh release: API `deepseek-flash` plus a tech report claiming it beats retired V4-Pro on quality, cost, and latency. |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,768 | 7,563,763 | Official dense multimodal Qwen3.8 workhorse (text/image/video in, text out, 262K–1M context, Apache 2.0). Hub volume leader this week because it is the local 24GB-class default and the parent of most GGUF/uncensored forks. |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,506 | 1,669,564 | Open-weights video foundation model for T2V / I2V / V2V with native multi-shot, stronger prompt adherence, and fast on-prem 10s clips. Trending as the self-host alternative to closed Veo/Kling/Seedance stacks. |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 301 | 103,178 | Community fusion + high-step fine-tune of MiniMax-H3 for ComfyUI T2V/I2V/Ref2V/V2V. Popular for HDR clarity, less mid-shot face collapse, and a cleaner “de-oiled” look versus stock H3. |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,158 | 4,970,363 | Official omni video system: text/image/video/audio in, video + native stereo audio out (up to 2K / ~15s). The open video backbone of the week; Viggle and Singularity both build on it. |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,108 | 586,040 | Qwen4-architecture preview: 125B MoE + 51B N-gram embeddings, 6B active, hybrid GDN + Qwen Sparse Attention. Community is running it as the cheap long-context multimodal agent (strong SWE / office / OSWorld numbers at Flash cost). |
| [DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 864 | 443,954 | Experimental vision sibling of V4-Flash, now routed to V4.1-Flash in the official API. Still downloaded as a standalone multimodal checkpoint while teams migrate stacks. |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,253 | 1,173,520 | Z.ai’s first native-multimodal GLM-5: 320B / 18B active, hybrid sparse + linear attention, 1M context. Trending for coding/agent gains over GLM-5.2 at Flash pricing, with 1-bit GGUFs runnable around 100GB RAM. |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 230 | 971 | ~3.6B unified symbolic + audio music model: plan an editable score, then render vocals and accompaniment. New because it claims SongBench scores competitive with Suno v5/v6 plus agentic cover/edit. |
| [Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 181 | 0 | 33.1B full fine-tune of MiniMax-H3 ref2va, DMD-distilled to 3 forward passes. Replaces a character from one repainted frame while keeping motion/camera; ~6× faster than Wan2.2-Animate-14B in their bake-off. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 384 | 28,328 | Abliterated / refusal-removed FP8 GLM MoE tuned toward cybersecurity and “crack” style tool use. Circulating in red-team and uncensored-agent circles rather than as a general chat default. |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 734 | 633,239 | Google Research’s Time Series Foundation Model 3.0 (PyTorch): multivariate forecasts, flexible covariates, stacked mixing Transformer. Ranked #1 on fev-bench, TIME Benchmark, and GIFT-Eval among foundation forecasters. |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,826 | 254,035,929 | Classic 22M sentence embedding model (PyTorch/TF/ONNX/Rust). Still the default RAG/similarity workhorse; download count is infrastructure demand, not a new architecture. |
| [VibeVoice-ASR-Streaming-7B](https://huggingface.co/microsoft/VibeVoice-ASR-Streaming-7B) | microsoft | 203 | 2,279 | Streaming ASR from Microsoft’s VibeVoice family: long-form speech-to-text with speaker, timestamp, and content structure. Trending with the broader VibeVoice TTS/ASR stack for hour-scale transcription. |
| [Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 169 | 3,271 | Driving VLM on untouched Qwen3.5-4B plus a BEV perception head and flow-matching planning expert (SFT and RL variants). First open Qwen foundation model that unifies 3D perception, VQA, and motion planning. |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 455 | 12,081 | Meta Massively Multilingual Speech 300M wav2vec2 pretrain. Still used as a speech backbone across low-resource ASR/TTS pipelines. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 838 | 682,187 | Academic mixed-precision GGUF of Qwen3.8-27B using GSQ + RCO quantization. Popular with users who want a researched compression recipe rather than a generic Q4. |
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,900 | 11,339,637 | Unsloth’s official-style GGUF pack of Qwen3.8-27B. The week’s download monster — default llama.cpp / LM Studio / Ollama path for the 27B multimodal model. |
| [Qwen3.8-27B-TURBO-Fable-Cold-Fusion-…-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 484 | 606,200 | Community “heretic / uncensored / NEO-CODER / MTP” GGUF merge on Qwen3.8-27B. Typical DavidAU stack: creative + coding bias with speculative decoding hooks. |
| [Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 203 | 78,737 | NVIDIA ModelOpt NVFP4 quantization of Qwen3.8-Flash-Next. Aimed at TensorRT-LLM / Blackwell-class serving of the 125B-class Flash preview. |
| [MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 169 | 70,755 | Official GGUF of MiniCPM5-2B for llama.cpp-class runtimes. Makes the new 2B SOTA checkpoint drop-in for Ollama and edge boxes. |
| [Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 1,103 | 1,999,181 | Aggressive uncensored + MTP GGUF of Qwen3.8-27B with vision tags retained. Second-highest download among community 27B forks this week. |
| [Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 205 | 231,831 | llama.cpp GGUF remix branded “Qwopus,” targeting Flash-like serving of the 27B multimodal checkpoint. |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 899 | 320,537 | Abliterated Qwen3.8-27B GGUF from Orca Router. Another high-traffic uncensored pack sitting next to Unsloth as a local default. |

## 3. Ecosystem Signal

**Qwen3.8 is the Hub’s gravity well.** Official 27B and Flash-Next weights, plus Unsloth, ISTA-DASLab, NVIDIA NVFP4, and a cluster of uncensored/MTP GGUFs, account for a large share of both likes and raw downloads. That is the same pattern as Llama-3 / Qwen2.5 eras: one open family becomes the quantization and refusal-removal substrate.

**“Flash” is now an architecture class, not a SKU.** DeepSeek-V4.1-Flash (asymmetric CED, tiny KV), Qwen3.8-Flash-Next (6B active + RAM-resident N-grams + QSA), and GLM-5.3-Flash (320B/18B, hybrid sparse-linear attention) all optimize *active* params and cache bytes, not headline parameter count. Open-weight labs are competing on tokens-per-dollar and 100K–1M agent context, not on beating closed APIs on a single MMLU-style number.

**Video has an open stack again.** MiniMax-H3 is the new base model; LTX-2.5 is the self-host foundation competitor; Viggle-Animate and Singularity show the ComfyUI fine-tune economy attaching within weeks. Audio (YuE2, VibeVoice ASR) and vertical VLMs (Qwen-Drive) are present but still niche versus chat and video.

**Open-weight vs proprietary:** every highlight this week is downloadable. Closed video APIs remain quality/latency references, but Hub energy is on models you can quantize, abliterate, and serve on 24GB–DGX-Spark boxes. Community value-add is overwhelmingly **GGUF + uncensored + MTP**, not new pretrains — except MiniCPM5, Spark-X2.5, Nex-N2.5, and K2-Horizon, which show the small-agent niche is still shipping original weights.

## 4. Worth Exploring

1. **[DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)** — Newest architecture story on the list (CED, CSA2, ~890 B/token global KV, 1M context, native vision). Best single model to study if you care how 2026 labs will serve long-horizon multimodal agents without drowning in HBM.

2. **[Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) + [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF)** — Highest practical ROI: Apache-2.0 multimodal dense model that already has a mature local toolchain and 11M+ GGUF pulls. Use the official card for capabilities; use Unsloth to actually run it.

3. **[MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)** — Cleanest small-model surprise. If you need an on-device or single-GPU coding/tool agent under 3B, this is the checkpoint to bench against Spark-X2.5-4B and Qwen3.5-4B before reaching for a 27B GGUF.