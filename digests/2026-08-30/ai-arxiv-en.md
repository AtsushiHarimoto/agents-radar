# ArXiv AI Research Digest 2026-08-30

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-08-30 07:55 UTC

---

**ArXiv AI Research Digest** — week of 2026-08-27 (cs.AI / cs.CL / cs.LG snapshot)

## 1. This Week’s Highlights

This week’s submissions cluster around **inference-time improvement without extra labels**, **agent skill/harness evolution from experience**, and **RLVR-style post-training that fights entropy collapse**. Several papers treat agents as evolving systems (skills compiled into wikis, red-team skills that grow, harnesses verified by behavior rather than blanket eval), while others push test-time policy optimization and weak-model guidance so a small model’s failure modes become a teacher for a stronger one. World-model work is also prominent: cross-embodiment video as a physics simulator, probabilistic alignment benchmarks, and capacity-growing JEPA encoders. On the applied side, cheaper open pretraining, auditable clinical models, enterprise Q&A with temporal KBs, and OR algorithm design by LLMs show the same methods landing in production-shaped settings.

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [CritICL: Inference-Time Weak-to-Strong Generalization from Small Language Model Failure Modes](http://arxiv.org/abs/2608.27455v1) | Yufan Wu, Yinghui He, Zhengyi Hu et al. | CritICL uses small-model failure modes as inference-time critique signals so a larger model can correct itself without repeated sampling or an external verifier. It matters as a cheaper alternative to test-time scaling that still targets reasoning errors. |
| [TTPO: Test-Time Policy Optimization](http://arxiv.org/abs/2608.27448v1) | Aozhe Wang, Zhengxi Lu, Jianze Wang et al. | Replaces ground-truth labels with a test-time objective so RL/OPSD-style reasoning gains can run at inference. Opens TTT for math-style reasoning where labels are unavailable at deployment. |
| [Boosting LLM Exploration via Weak-Model Guidance in RLVR](http://arxiv.org/abs/2608.27420v1) | Xingyu Shen, Huishuai Zhang, Peng Li et al. | Weak-model guidance counters RLVR entropy collapse and recovers pass@k coverage without only adding regularization. Directly addresses the “narrowed reasoning” failure mode of verifiable-reward RL. |
| [Consolidating RLVR Capabilities Across Domains](http://arxiv.org/abs/2608.27409v1) | Siye Wu, Kai Yang, Yuchen Cai et al. | Organizes merge / distill / sequential fusion for multi-domain RLVR experts. Useful map of how to keep several verified skills in one model instead of a zoo of specialists. |
| [Understanding Evolution Strategies for LLM Reasoning](http://arxiv.org/abs/2608.27351v1) | Yunpeng Ba, Zhi Zheng, Yue Xie et al. | Compares ES to GRPO and argues ES yields broader reasoning coverage at lower memory cost. Clarifies when black-box evolution is a better post-training tool than on-policy RL. |
| [Puro-2B: Poor Lab's Qwen2-1.5B Trained on RTX 5090 within $5090](http://arxiv.org/abs/2608.27370v1) | Kairong Luo, Jiarui Cui, Yaorui Yin et al. | A full pretraining recipe for a 1.5–2B model on a single high-end GPU budget. Lowers the bar for academic/open pretraining experiments that used to look institution-only. |
| [How Language Models Organize and Structure Moral Knowledge](http://arxiv.org/abs/2608.27402v1) | Orion Reblitz-Richardson | Linear probes show whether models separate moral foundations and encode their geometry, not just detect “moral content.” Raises the evaluation bar for value-laden representations. |
| [Not All Eval-Awareness Is Equal](http://arxiv.org/abs/2608.27340v1) | Allison Zhuang, Santiago Aranguri | Verbalized eval-awareness splits into types; “capabilities framing” predicts compliance more than raw awareness. Warns safety pipelines that treat eval-awareness as one knob to suppress. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [WikiSkill: Compiling Agent Experience into Persistent Knowledge](http://arxiv.org/abs/2608.27454v1) | Liyan Tang, Cyrus Rashtchian, Chun-Sung Ferng et al. | Turns interaction traces into a living skill wiki so agents accumulate reusable workflows instead of one-off tricks. Targets the missing “institutional memory” layer in skill-discovery agents. |
| [RedEvoAgent: Automatic Red-Teaming Agent with Experience-Driven Skill Evolution](http://arxiv.org/abs/2608.27439v1) | Junjie Zhang, Hui Liu, Kecheng Chen et al. | Evolves red-team skills from experience against tool-using product agents, not just static jailbreak strings. Matches the higher stakes of agents that can change state via tools. |
| [Persona-Execution Separation](http://arxiv.org/abs/2608.27427v1) | Yisen Xi | Splits evolving persona from audited execution so tone can change while stateful work stays traceable. A practical architecture pattern for governed enterprise agents. |
| [INTENT-AS-A-TOOL Makes it Easy to Track Agentic Misalignment](http://arxiv.org/abs/2608.27348v1) | Yutong Zhang, Jianshuo Dong, Peng Xu et al. | Surfaces harmful *actions* under goal conflict via CoT monitoring and an intent-as-tool interface. Moves misalignment eval from text refusals to consequential tool use. |
| [Verify Smarter, Evolve Further](http://arxiv.org/abs/2608.27311v1) | Jinghan Xu, Yikai Zhang, Aili Chen et al. | Behavior-aware verification spends rollouts only on harness candidates that change relevant behaviors. Makes propose-and-verify harness search cheaper and less gameable. |
| [What Makes Good Agentic Data? An ACE Lens](http://arxiv.org/abs/2608.27260v1) | Xingshan Zeng, Zishan Xu, Boju Zhang et al. | Frames agentic data quality as consistency among environment, task, interaction, and success signal. Gives a checklist for synthetic trajectories that are useful, not just numerous. |
| [Naive Prompt Optimization](http://arxiv.org/abs/2608.27266v1) | Yuan Chang, Xiaoqi Chen | Argues simple prompt search can match heavier RSI-style optimization for agents. Useful counterweight to increasingly elaborate prompt-search stacks. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [SWE-Prime: Fewer Trajectories, Better Performance](http://arxiv.org/abs/2608.27449v1) | Dewu Zheng, Ruizhe Ye, Yanlin Wang et al. | Shows successful SWE trajectories are not automatically good SFT data; quality filtering beats scale. Challenges “more successful traces = better coder” as a default recipe. |
| [From Static to Dynamic: MCR-Bench](http://arxiv.org/abs/2608.27442v1) | Dewu Zheng, Yanlin Wang, Xiwen Wang et al. | Benchmarks iterative, multi-turn code review instead of one-shot comments. Aligns LLM review eval with how real review actually happens. |
| [CLAP: Cross-Embodiment Video World Models](http://arxiv.org/abs/2608.27406v1) | Kechen Liu, Ola Shorinwa | Trains action-conditioned video models across robot bodies so heterogeneous video becomes a zero-shot physics prior. Attacks the single-embodiment bottleneck in video world models. |
| [PAWBench: How Far Are We from Probabilistically Aligned World Modeling?](http://arxiv.org/abs/2608.27345v1) | Yuandong Pu, Le Zhuo, Sayak Paul et al. | Asks world models to match *distributions* of valid futures, not one plausible clip. A stricter test for video generators sold as world models. |
| [SCIT: Testing Causal Cache Carriers in Latent Chain-of-Thought Models](http://arxiv.org/abs/2608.27265v1) | Yi Ding, Lijun Huang, Menglin Yang | Causal interchange test for whether latent CoT caches actually carry the reasoning object. Makes hidden-state “thinking” inspectable instead of assumed. |
| [CorporateBench](http://arxiv.org/abs/2608.27391v1) | Sil Hamilton, Albert Yu Sun, Oscar J. Romero et al. | Human-validated multi-task Q&A over temporal enterprise knowledge bases. Fills the gap between toy RAG suites and documents companies will not release. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Making Clinical Language Models Auditable: CAST](http://arxiv.org/abs/2608.27397v1) | Jin Mu, Guanhua Chen | SAE-based concept-guided tuning suppresses note artifacts so clinical LMs rely on patient-state concepts. Aimed at models that look accurate in-hospital and fail under shift. |
| [LLMs Can Design Near-Optimal OR Algorithms](http://arxiv.org/abs/2608.27296v1) | Jackie Baek | Tests whether LLMs can invent inventory, queueing, and assortment algorithms, not just code known ones. A concrete probe of “LLM as algorithm designer” on well-specified OR problems. |
| [BrailleBench](http://arxiv.org/abs/2608.27268v1) | Jinghan Zhang, Fengran Mo, Zhiyu Chen et al. | Multi-criteria Braille comprehension eval for LLMs serving blind and deafblind users. Makes inclusion a measurable capability rather than an afterthought. |
| [Sophistication in GenAI Use: Field Evidence from a Large Firm](http://arxiv.org/abs/2608.27364v1) | Nicholas J. Hallman, Zachary T. Kowaleski, Anu Puvvada et al. | 713k employee prompts across 15 functions show how sophistication in genAI use actually varies inside a firm. Rare field measurement instead of lab prompting studies. |

## 3. Research Trend Signal

Three coupled directions stand out. First, **post-training is moving off the labeled train set**: CritICL, TTPO, weak-model-guided RLVR, and ES-vs-GRPO all try to get reasoning coverage at test time or with cheaper, broader search than standard GRPO. Second, **agents are being treated as evolving codebases**—skills compiled into wikis, red-team skills that grow, harnesses verified by behavior, and ACE-style constraints on what “good agentic data” even is. That is a shift from “give the agent tools” to “give the agent a memory and a verification budget.” Third, **world models are being forced to be physical and probabilistic**: cross-embodiment video (CLAP), distributional futures (PAWBench), and growing JEPA capacity all reject “one pretty rollout = understanding physics.” Safety work is also agent-shaped: misalignment as harmful tool use, eval-awareness as a multi-factor construct, and red-teaming against stateful harnesses. Efficiency (Puro-2B) and domain audits (clinical CAST, CorporateBench, BrailleBench, firm-level genAI logs) suggest the same methods are being stress-tested outside chat benchmarks.

## 4. Worth Deep Reading

1. **[WikiSkill](http://arxiv.org/abs/2608.27454v1)** — Cleanest statement this week of the agent-memory problem: discovery without persistence is not skill evolution. Worth the full paper for the compilation/update rules and how they avoid stale or contradictory skills.

2. **[TTPO](http://arxiv.org/abs/2608.27448v1)** + **[Weak-Model Guidance in RLVR](http://arxiv.org/abs/2608.27420v1)** — Together they attack the two hard constraints of current reasoning RL: no labels at test time, and entropy collapse under verifiable rewards. Read as a pair if you care about whether inference-time / weak-teacher methods can replace another SFT+GRPO cycle.

3. **[PAWBench](http://arxiv.org/abs/2608.27345v1)** (with **[CLAP](http://arxiv.org/abs/2608.27406v1)** as companion) — The right skeptical question for video-as-world-model claims: not “does it look physical?” but “does it reproduce the *set* of valid futures?” CLAP then shows one path to more general physics by dropping the single-embodiment assumption.