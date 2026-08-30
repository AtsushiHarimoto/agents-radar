# Hugging Face Trending Models Weekly 2026-08-30

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-08-30 07:55 UTC

---

I'll pull a few model cards so the summaries stay accurate rather than guessing from tags alone.# Hugging Face Trending Models Digest  
**Week of 2026-08-30** · ranked by weekly likes

## 1. This Week’s Highlights

Qwen’s **Qwen3.8** line dominates Hub activity: the new **Qwen3.8-Flash-Next** (125B-class sparse MoE, ~6B active, Qwen4-architecture preview, 262K context, vision) is the week’s hottest official drop, while the earlier **Qwen3.8-27B** dense VLM still leads lifetime likes and is the community’s default local multimodal workhorse. Z.ai answered immediately with **GLM-5.3-Flash** (320B / 18B active, first native-multimodal GLM-5, hybrid sparse + linear attention, up to 1M context) plus the larger **GLM-5.3**. Video generation is the other pole: **MiniMax-H3** and **Lightricks/LTX-2.5** sit high on both likes and downloads, with ControlNet / LoRA / 4-step distill add-ons climbing behind them. A large share of the board is not new bases at all—it is Unsloth GGUFs, MLX/FP8 ports, and “abliterated / uncensored” Qwen3.8-27B forks, which is the clearest signal that local inference and less-restricted chat are driving Hub traffic as much as the flagship papers.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 1,643 | 189,793 | First natively multimodal model in the GLM-5 series: 320B total / 18B active MoE with hybrid sparse + linear attention and a reported ~1M context. Trending because Z.ai positions it as GLM-5.2-level (or better) coding and agent scores at a fraction of the serving cost. |
| [GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,296 | 8,804 | Full GLM-5.3 flagship (MoE + DSA tags) for conversational text generation. It is the “quality” sibling of Flash and is being pulled in by teams comparing Z.ai’s new generation against Kimi K3 and Qwen3.8 Max. |
| [Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 291 | 1,394 | Tencent Hunyuan’s new 770B / 49B-active MoE with a 1M-token window, gated DSA, and an Apache-style open release. Fresh this week and aimed at coding, office, and research workflows; early internal blind evals put it slightly ahead of GLM-5.3 and Kimi K3 on engineering tasks. |
| [Ornith-1.5-35B-A3B](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) | ornith-ai | 500 | 106,562 | Qwen3.5-MoE-style 35B-A3B multimodal text model. It is trending as a mid-size open alternative that keeps vision + chat in one checkpoint without the 27B dense or 100B+ MoE footprint. |
| [Thomson-1.0-Small](https://huggingface.co/thomsonreuters/Thomson-1.0-Small) | thomsonreuters | 152 | 831 | Compact Qwen3.5-MoE conversational VLM from Thomson Reuters. Interest is less about raw likes and more about a rare enterprise publisher shipping an open image-text chat weight. |
| [phonellm-alpha-1](https://huggingface.co/pipecat-ai/phonellm-alpha-1) | pipecat-ai | 138 | 2,668 | Nemotron-H based text model from the Pipecat realtime-voice stack. It is on the board because voice-agent builders want a small, telephony-oriented LLM rather than a general chat giant. |
| [DeepSeek-V4-Flash-0731](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731) | deepseek-ai | 3,811 | 4,330,482 | Same 284B / ~13B-active V4-Flash architecture with a July 31 post-training refresh that jumped agentic scores (e.g. Terminal Bench 2.1 61.8 → 82.7). Still one of the most downloaded open chat models because it is cheap, fast, and now much stronger at coding agents. |
| [Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3) | moonshotai | 11,083 | 2,701,014 | Moonshot’s 2.8T-class MoE (~104B active) multimodal flagship—the largest widely cited open-weight model. It remains a Hub fixture because labs treat it as the open ceiling to beat on long-context reasoning and agent work. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,316 | 52,341 | Official Qwen4-architecture preview: ~125B MoE + 51B n-gram embeddings, **6B active**, 262K context, text/image/video-in → text-out. It is the week’s breakout because it claims coding/office gains over Qwen3.7-Plus at ~1/9 the train/serve cost and already has Unsloth local recipes. |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 13,283 | 4,028,839 | Dense 27B native VLM (text + image + long video, 262K native context, thinking/instruct switch). Highest likes on this list and the default “fits on one box” multimodal model after strong OSWorld / AndroidWorld / LiveCodeBench numbers. |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,162 | 1,044,661 | Open image/text/video-to-video stack with native 4K and on-prem LoRA support. Trending as the fully open, commercially usable alternative to MiniMax H3 for teams that need local video generation. |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,631 | 5,018,833 | General multimodal generator: text/image/video/audio in, up to 15s 2K video with native stereo audio. Highest video-model downloads this week; ecosystem LoRAs and ControlNets are already stacking on top of it. |
| [Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 193 | 1,017 | New open text-to-speech checkpoint in the Breeze family. It is a small but distinct audio-generation signal on a board otherwise owned by VLMs and video. |
| [MiniMax-H3-Fun-Controlnet-Union](https://huggingface.co/alibaba-pai/MiniMax-H3-Fun-Controlnet-Union) | alibaba-pai | 162 | 4,250 | VideoX-Fun ControlNet union for MiniMax-H3 (video-to-video / text-to-video / image-text-to-video). Trending because H3 adopters want spatial/motion control, not just text prompts. |
| [FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree](https://huggingface.co/FastVideo/FastVideo-FastH3-4-step-Preview-v1-VSA-DataFree) | FastVideo | 160 | 0 | 4-step distilled H3 preview aimed at data-free / VSA fast sampling. Early research drop; likes reflect speed-first video inference even before downloads appear. |
| [MiniMax-H3-Acc-LoRAs](https://huggingface.co/alibaba-pai/MiniMax-H3-Acc-LoRAs) | alibaba-pai | 147 | 13,767 | Acceleration LoRAs for MiniMax-H3 (VideoX-Fun). Companion to the ControlNet union—community is treating H3 as a platform, not a single checkpoint. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Tiel-Coder-35B-A3B-GGUF](https://huggingface.co/peculiar-ragdoll/Tiel-Coder-35B-A3B-GGUF) | peculiar-ragdoll | 129 | 47,817 | llama.cpp GGUF of a 35B-A3B Qwen3.5-MoE coder with imatrix quants. It is on the board as a purpose-built coding weight rather than a general uncensored chat fork. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 578 | 188,061 | Day-zero Unsloth GGUF of Flash-Next; docs claim extreme quants can run in ~75GB unified memory. This is how most people will actually try the Qwen4 preview locally. |
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,192 | 8,363,481 | Unsloth GGUF of the 27B VLM—**highest downloads on the entire list**. Default llama.cpp / desktop path for Qwen3.8-27B. |
| [Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 929 | 645,554 | Abliterated Qwen3.8-27B in MLX / safetensors / GGUF. Popular because it keeps the 27B multimodal base while stripping refusal behavior. |
| [GLM-5.3-Flash-GGUF](https://huggingface.co/unsloth/GLM-5.3-Flash-GGUF) | unsloth | 276 | 27,288 | Unsloth GGUF of GLM-5.3-Flash. Confirms the same pattern as Qwen: official MoE drop → immediate local quant. |
| [Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX) | orcarouter | 1,220 | 97,508 | Apple-silicon MLX port of an uncensored / abliterated 27B. Trending with Mac users who want the vision model without a CUDA box. |
| [Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 756 | 1,061,687 | Aggressive uncensored + MTP GGUF of the 27B VLM. Very high downloads for a community fork—MTP speculative decoding is a selling point. |
| [Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8) | orcarouter | 1,264 | 290,216 | FP8 transformers build of the same uncensored 27B. Aimed at high-throughput GPU serving rather than llama.cpp. |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 562 | 215,892 | GGUF sibling of OrcaRouter’s uncensored 27B line. Completes the MLX / FP8 / GGUF coverage for one community recipe. |
| [Qwen3.8-Flash-Next-FP8](https://huggingface.co/Qwen/Qwen3.8-Flash-Next-FP8) | Qwen | 155 | 44,281 | Official FP8 of Flash-Next (experts block-quantized). The production serving checkpoint for people who will not wait for community GGUFs. |
| [Huihui-Qwen3.8-27B-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF) | huihui-ai | 442 | 1,485,837 | Another high-download abliterated 27B GGUF. Huihui’s brand is now a reliable “uncensored Qwen drop within days” pattern. |
| [Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 830 | 1,843,237 | llama.cpp / MTP-oriented uncensored 27B GGUF with very large download volume. Competes directly with Huihui and HauhauCS on the same base. |
| [Qwen-Fixed-Chat-Templates](https://huggingface.co/froggeric/Qwen-Fixed-Chat-Templates) | froggeric | 1,519 | 0 | Jinja / MLX chat-template pack for Qwen3.5/3.8. High likes and zero weights downloads—infrastructure, not a model, but it is what local UIs need after every Qwen template break. |
| [Qwen3.8-27B-Uncensored](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored) | orcarouter | 212 | 42,987 | Full-precision / safetensors uncensored 27B that the FP8, MLX, and GGUF variants are derived from. Base of a whole community family this week. |

## 3. Ecosystem Signal

**Qwen3.8 is the gravitational center.** Official Flash-Next and 27B plus more than a dozen GGUF/MLX/FP8/abliterated children occupy roughly half the board. That is not just “a popular release”—it is a full local-runtime ecosystem forming in under a week: Unsloth for RAM-friendly GGUF, OrcaRouter/Huihui/HauhauCS/JonathanColetti for refusal-stripped multimodal chat, and froggeric fixing templates so frontends keep working.

**Chinese labs are shipping open flagships in parallel, not sequentially.** In a short window the Hub has Qwen3.8 (Alibaba), GLM-5.3 / Flash (Z.ai), Kimi-K3 (Moonshot, 2.8T-class), DeepSeek-V4-Flash-0731 (post-train refresh, huge downloads), Hy4-preview (Tencent, 770B/49B), and MiniMax-H3 (video). Open weights are the default competitive move; proprietary APIs still matter for latency/price, but the “must-download” artifacts are all open or conditionally open.

**Sparse MoE + cheap long context is the shared architecture story.** Flash-Next (6B active), GLM-5.3-Flash (18B active, hybrid linear/sparse), Hy4 (49B active, gated DSA), Kimi-K3 and DeepSeek-V4-Flash all sell the same bargain: frontier-ish quality without dense-flagship FLOPs, plus 256K–1M windows.

**Video is the second platform.** MiniMax-H3’s download count and the immediate Alibaba-PAI ControlNet/LoRA plus FastVideo 4-step distill show H3 is being treated like Stable Diffusion was: a base to fine-tune. LTX-2.5 is the counter-weight for teams that want fewer license/geo constraints and native 4K.

**Quantization velocity is the real adoption metric.** Unsloth’s Qwen3.8-27B-GGUF at **8,363,481** downloads dwarfs most official repos. Local 27B VLM + uncensored variants are where practitioners actually spend cycles.

## 4. Worth Exploring

1. **[Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)** — Newest architecture preview (Qwen4 hybrid attention, 6B active, vision + 262K). Best single checkpoint if you want to study where Qwen is going, not just what already fits on a 3090. Pair with the official FP8 or Unsloth GGUF.

2. **[zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash)** — Strongest “new this week” coding/agent + native multimodal alternative to Qwen. Hybrid attention and the 18B-active / 1M-context pitch make it the right A/B against Flash-Next and DeepSeek-V4-Flash-0731.

3. **[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)** (and **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)** if license/geo or 4K/on-prem matter more) — H3 is the video base the Hub is already forking; LTX-2.5 is the cleaner open-weights path. Together they define the current open video stack better than any single LLM on this list.

**Honorable local default:** [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) if the goal is to run a capable multimodal model this afternoon rather than benchmark a 100B+ MoE.