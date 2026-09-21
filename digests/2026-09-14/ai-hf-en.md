# Hugging Face Trending Models Weekly 2026-09-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-13 22:07 UTC

---

I'll pull a few model cards so the summaries stay accurate, then write the digest.# Hugging Face Trending Models Digest
**Week of 2026-09-14** · 30 models by weekly likes

## 1. This Week's Highlights

The board is split between a new flagship efficiency story and a Qwen3.8 ecosystem explosion. **DeepSeek-V4.1-Flash** landed mid-week as a 552B MoE multimodal model with a Causal Encoder–Decoder design (8B active on prefill, 16B on decode) and a sharply compressed KV cache—DeepSeek is already routing production traffic onto it. **Qwen3.8-27B** and **Qwen3.8-Flash-Next** dominate both likes and downloads, with Unsloth and ISTA-DASLab GGUF/GSQ packs pulling multi-million download weeks. On the generation side, **MiniMax-H3** (native stereo video+audio, up to 2K / 15s) and **Lightricks LTX-2.5** keep video pipelines busy, while **YuE2-3B** is the surprise music release: lyrics-to-song with an editable ABC score layer that the team claims beats Suno v5 on WildSongBench. Small on-device models (**MiniCPM5-2B**, **Spark-X2.5-4B**) and agentic Qwen3.5-MoE derivatives (**Nex-N2.5**, **Edge0-35B-A3B**) fill the local-inference lane.

## 2. Trending Models

### 🧠 Language Models (LLMs, chat models, instruction-tuned)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,334 | 150,110 | Apache-2.0 2.5B dense Llama-style on-device LLM with 128K context, aimed at local assistants, coding, and tool use. Trending because OpenBMB reports 2B-class SOTA (avg 53.9) and it beats several 4B baselines on math and agent benches. |
| [Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 987 | 3,552 | MLX-first Qwen3.5 MoE preview (35B-A3B) packaged for edge inference. Interest is high relative to downloads because it targets Apple-silicon / local MoE serving rather than datacenter throughput. |
| [Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,152 | 21,336 | Compact 4B general-purpose model with hybrid full + sliding-window attention and a native 1M-token window across 200+ languages. Climbing the board on agent/tool benches (τ³, MCP-Atlas) versus same-size Qwen/Gemma baselines. |
| [gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,030 | 15,158,496 | The original 124M GPT-2 checkpoint, still a default teaching and pipeline baseline. Weekly volume is infrastructure gravity, not a new release. |
| [Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 138 | 474 | Small Agnes-family image-text-to-text chat model. Low download count but enough weekly likes to surface as a new experimental chat checkpoint. |
| [NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,736 | 7,979 | 4B Qwen3.5-text derivative tagged for agentic text generation. High like-to-download ratio suggests community interest in a compact agent base rather than production traffic yet. |

### 🎨 Multimodal & Generation (image, video, audio, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,191 | 244,457 | Native multimodal 552B MoE (CED architecture) with 1M context; 8B active on input, 16B on output, and a KV cache cut to ~1/8 of V4-Flash SSD footprint. Trending as DeepSeek’s new default Flash SKU that the lab says already beats V4-Pro on cost/speed. |
| [Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 754 | 3,970 | Qwen3.5-35B-A3B-based multimodal agent model focused on computer use, browsing, and visually grounded tools. Mini is the cheap, high-throughput SKU in a Mini/Pro/Max family posting competitive OSWorld and coding-agent numbers. |
| [Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,960 | 7,768,964 | Official 27B multimodal Qwen3.8 dense model (image-text-to-text, conversational). Highest-like official weight on this list and the parent of the week’s biggest GGUF packs. |
| [Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | Larger Nex-N2.5 multimodal agent (same Qwen3.5 MoE line) with stronger SWE-Bench Pro / OSWorld-Verified scores than Mini. Downloads already exceed Mini, so Pro is the practical deploy target. |
| [YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 397 | 3,707 | 3B lyrics-to-song model that first writes an editable ABC melody/chord plan, then renders 48 kHz stereo vocals + accompaniment. WildSongBench best-of-8 average of 6.9632 is the claim that put it above Suno v5 in the team’s table. |
| [LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,731 | 1,548,442 | Lightricks diffusion video stack covering T2V, I2V, V2V, and image-text-to-video. Sustained million-scale downloads make it a default ComfyUI / local video backend this week. |
| [Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 369 | 123,491 | Community MiniMax-H3 video checkpoint (T2V / I2V / V2V). Riding the official H3 open-weight wave with substantial inference traffic. |
| [MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,236 | 4,819,845 | Official omni-modal video model: text/image/video/audio in, video + native stereo audio out, up to 2K and 15 seconds (FL2VA and Ref2VA variants). The open-weight video release with the largest download footprint on this list. |
| [Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,161 | 624,390 | 125B-main + 51B n-gram multimodal MoE (~6B active), previewing Qwen4 (Gated DeltaNet + Gated Attention). Fast local/API competitor to GLM-5.3-Flash on coding and office-agent work. |
| [AuK](https://huggingface.co/tencent/AuK) | tencent | 185 | 1,202 | Tencent zero-shot TTS / voice-cloning checkpoint. Early-stage likes; the tag set is the draw (zero-shot TTS) more than current download volume. |
| [GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,302 | 1,576,209 | Z.ai 320B-total / 18B-active multimodal Flash model, MIT license, native 1M context. Strong coding/tool-use benches and a live API make it the other half of this week’s Flash rivalry. |
| [Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | 4B Qwen vision-language model specialized for autonomous-driving perception and motion planning. Niche but official, and one of the few driving-stack weights on the trending list. |

### 🔧 Specialized Models (code, math, medical, embeddings)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google’s third-generation pretrained time-series foundation model in PyTorch. High downloads reflect forecasting pipelines adopting a new official TimesFM drop. |
| [GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 429 | 30,310 | Abliterated / refusal-removed GLM-5.3 MoE specialized for cybersecurity workflows, shipped FP8. Trending in the “uncensored domain expert” niche rather than as a general chat model. |
| [all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,926 | 252,928,721 | 22M-parameter sentence embedding workhorse. Still the highest-download model on the list by a wide margin—RAG and search defaults have not moved off it. |
| [bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,300 | 46,513,338 | Classic 110M BERT encoder. Persistent fill-mask / feature-extraction traffic, not a 2026 research event. |
| [mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 526 | 12,880 | Meta Massively Multilingual Speech 300M wav2vec2 pretrain. Steady interest as a multilingual ASR/speech encoder base. |
| [distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,433 | 7,325,282 | Distilled BERT encoder still used as a cheap classifier and NER backbone. Same “evergreen infra” pattern as BERT and MiniLM. |
| [clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,499 | 21,331,361 | Original CLIP ViT-B/32 zero-shot image-text model. Remains the default retrieval/classification encoder in a huge number of apps. |

### 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 966 | 769,557 | Mixed-precision GSQ + RCO GGUF of official Qwen3.8-27B. Research-grade quantization with production-scale downloads. |
| [Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,007 | 11,005,880 | Unsloth’s official-line GGUF pack of Qwen3.8-27B. The single largest Qwen3.8 download sink this week—local llama.cpp / Ollama demand in one repo. |
| [Qwen3.8-27B-TURBO-Fable-Cold-Fusion-…-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 630 | 750,591 | Uncensored / “heretic” + coder-oriented merge of Qwen3.8-27B in GGUF, with MTP-oriented packaging. High downloads show the uncensored-coder merge niche is still commercially relevant. |
| [MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 215 | 99,716 | Official GGUF of MiniCPM5-2B for llama.cpp-class runtimes. Confirms the 2B on-device model is being consumed locally, not just as safetensors. |
| [Minimax-H3-ComfyUI](https://huggingface.co/Alissonerdx/Minimax-H3-ComfyUI) | Alissonerdx | 139 | 11,860 | ComfyUI LoRA / helper pack on top of MiniMax-H3. Small likes, but it is how a lot of local H3 video workflows actually get loaded. |

## 3. Ecosystem Signal

**Qwen3.8 is the gravitational center.** Official **Qwen3.8-27B** and **Qwen3.8-Flash-Next** plus Unsloth and ISTA-DASLab derivatives account for a large share of both likes and downloads. Flash-Next is explicitly framed as a Qwen4 architecture preview (hybrid Gated DeltaNet + Gated Attention, Muon optimizer, n-gram embeddings), so the community is treating it as a research checkpoint *and* a local coding agent.

**DeepSeek and Z.ai are competing on the same “Flash” product shape:** huge sparse backbones, few active parameters, million-token context, multimodal input, and KV-cache compression as the cost lever. DeepSeek-V4.1-Flash’s CED split (8B prefill / 16B decode) is the most distinctive new architecture on the board.

**Open weights remain the default for everything except the oldest embedding/ASR baselines.** MiniMax open-sourced H3 (with two modules still API-only), YuE2 shipped CC-BY-NC music weights that challenge a closed music incumbent on a public bench, and even driving (Qwen-Drive) and cybersecurity (abliterated GLM-5.3) are showing up as open checkpoints.

**Quantization and local packaging are first-class releases, not afterthoughts.** Unsloth GGUF of Qwen3.8-27B alone exceeds 11M downloads; ISTA-DASLab GSQ-RCO and DavidAU uncensored merges each clear 750K. MiniCPM5 and MiniMax-H3 both have official or community runtime packs (GGUF, ComfyUI, MLX) within days of the base drop. The winning pattern is: official multimodal/MoE base → GGUF/MLX/ComfyUI within the same news cycle.

**Evergreen infra has not left the list.** MiniLM, BERT, DistilBERT, CLIP, and GPT-2 still print enormous download numbers. Trending “research” and trending “production embedding stack” are different markets sharing one leaderboard.

## 4. Worth Exploring

1. **[DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash)** — Best architecture paper-of-the-week energy. CED + aggressive KV compression is aimed at agent workloads that are input-heavy and cache-hit expensive. If you serve long-context multimodal agents, this is the checkpoint to benchmark against GLM-5.3-Flash and Qwen3.8-Flash-Next.

2. **[YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B)** — Rare case of an open music model competing with a closed commercial SOTA *and* exposing an editable symbolic plan. The agentic edit loop (score → feedback → revised score) is more interesting than another lyrics-to-wav demo. Fits a single 24GB GPU.

3. **[MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B)** (plus the [GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF)) — If the 2B-beats-4B eval table holds under independent runs, this is the new default tiny local assistant. Apache-2.0, 128K context, already in MLX/GGUF, and cheap enough to pair with a larger Qwen3.8/DeepSeek Flash as a router or drafter.