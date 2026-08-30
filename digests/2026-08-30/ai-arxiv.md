# ArXiv AI 研究周报 2026-08-30

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-30 07:55 UTC

---

**ArXiv AI 研究摘要** — week of 2026-08-27 (cs.AI / cs.CL / cs.LG snapshot)

## 1. 本周要点

本周投稿主要集中在 **无需额外标注的推理时改进**、**智能体技能/脚手架从经验中演化**，以及 **对抗熵坍缩的 RLVR 式后训练**。多篇论文将智能体视为演化系统（技能汇编成 wiki、会成长的红队技能、以行为而非笼统评测来验证脚手架），另一些则推进测试时策略优化与弱模型引导，让小模型的失败模式成为更强模型的老师。世界模型工作同样突出：跨本体视频作为物理模拟器、概率对齐基准，以及容量可增长的 JEPA 编码器。应用侧则有更廉价的开放预训练、可审计的临床模型、带时序知识库的企业问答，以及由 LLM 设计运筹学算法，表明同一套方法正在落地到接近生产的场景。

## 2. 重点论文

### 🧠 大语言模型

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [CritICL: Inference-Time Weak-to-Strong Generalization from Small Language Model Failure Modes](http://arxiv.org/abs/2608.27455v1) | Yufan Wu, Yinghui He, Zhengyi Hu et al. | CritICL 把小模型的失败模式当作推理时的批评信号，使大模型无需反复采样或外部验证器即可自我纠错。其价值在于提供一种更便宜的测试时扩展替代方案，同时仍对准推理错误。 |
| [TTPO: Test-Time Policy Optimization](http://arxiv.org/abs/2608.27448v1) | Aozhe Wang, Zhengxi Lu, Jianze Wang et al. | 用测试时目标替代真值标签，使 RL/OPSD 式的推理增益可在推理阶段运行。为部署时没有标签的数学类推理打开了测试时训练（TTT）空间。 |
| [Boosting LLM Exploration via Weak-Model Guidance in RLVR](http://arxiv.org/abs/2608.27420v1) | Xingyu Shen, Huishuai Zhang, Peng Li et al. | 弱模型引导对抗 RLVR 的熵坍缩，在不只加正则的情况下恢复 pass@k 覆盖。直接针对可验证奖励强化学习中「推理变窄」这一失效模式。 |
| [Consolidating RLVR Capabilities Across Domains](http://arxiv.org/abs/2608.27409v1) | Siye Wu, Kai Yang, Yuchen Cai et al. | 梳理多域 RLVR 专家的合并 / 蒸馏 / 顺序融合路径。为如何把多项已验证技能收进一个模型、而不是养一群专家模型，提供了实用地图。 |
| [Understanding Evolution Strategies for LLM Reasoning](http://arxiv.org/abs/2608.27351v1) | Yunpeng Ba, Zhi Zheng, Yue Xie et al. | 将 ES 与 GRPO 对比，认为 ES 能以更低显存代价获得更广的推理覆盖。澄清了黑盒演化何时比 on-policy RL 更适合作为后训练工具。 |
| [Puro-2B: Poor Lab's Qwen2-1.5B Trained on RTX 5090 within $5090](http://arxiv.org/abs/2608.27370v1) | Kairong Luo, Jiarui Cui, Yaorui Yin et al. | 给出在单张高端 GPU 预算内完整预训练 1.5–2B 模型的配方。降低了以往看起来只能由机构完成的学术/开放预训练实验门槛。 |
| [How Language Models Organize and Structure Moral Knowledge](http://arxiv.org/abs/2608.27402v1) | Orion Reblitz-Richardson | 线性探针检验模型是否分离道德基础并编码其几何结构，而不只是检测「道德内容」。抬高了价值相关表征的评估门槛。 |
| [Not All Eval-Awareness Is Equal](http://arxiv.org/abs/2608.27340v1) | Allison Zhuang, Santiago Aranguri | 口头化的评测意识可分成不同类型；「能力框架」比原始意识更能预测顺从。提醒安全管线不要把评测意识当成一个可一键压制的旋钮。 |

### 🤖 智能体与推理

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [WikiSkill: Compiling Agent Experience into Persistent Knowledge](http://arxiv.org/abs/2608.27454v1) | Liyan Tang, Cyrus Rashtchian, Chun-Sung Ferng et al. | 将交互轨迹编译成持续更新的技能 wiki，使智能体积累可复用工作流，而不是一次性技巧。瞄准技能发现型智能体缺失的「机构记忆」层。 |
| [RedEvoAgent: Automatic Red-Teaming Agent with Experience-Driven Skill Evolution](http://arxiv.org/abs/2608.27439v1) | Junjie Zhang, Hui Liu, Kecheng Chen et al. | 针对会用工具、能改变状态的产品智能体，从经验中演化红队技能，而不只是静态越狱字符串。匹配工具型智能体更高的风险。 |
| [Persona-Execution Separation](http://arxiv.org/abs/2608.27427v1) | Yisen Xi | 把会演化的人设与可审计的执行拆开，使语气可以变、有状态的工作仍可追溯。面向受治理企业智能体的实用架构模式。 |
| [INTENT-AS-A-TOOL Makes it Easy to Track Agentic Misalignment](http://arxiv.org/abs/2608.27348v1) | Yutong Zhang, Jianshuo Dong, Peng Xu et al. | 通过 CoT 监控与 intent-as-tool 接口，在目标冲突下暴露有害 *动作*。把错位评估从文本拒答推进到有后果的工具使用。 |
| [Verify Smarter, Evolve Further](http://arxiv.org/abs/2608.27311v1) | Jinghan Xu, Yikai Zhang, Aili Chen et al. | 行为感知验证只把 rollout 花在会改变相关行为的脚手架候选上。让提出-验证式脚手架搜索更便宜、更难被刷分。 |
| [What Makes Good Agentic Data? An ACE Lens](http://arxiv.org/abs/2608.27260v1) | Xingshan Zeng, Zishan Xu, Boju Zhang et al. | 把智能体数据质量定义为环境、任务、交互与成功信号之间的一致性。为「有用而不只是数量多」的合成轨迹提供清单。 |
| [Naive Prompt Optimization](http://arxiv.org/abs/2608.27266v1) | Yuan Chang, Xiaoqi Chen | 主张简单提示搜索对智能体即可媲美更重的 RSI 式优化。对日益复杂的提示搜索技术栈构成有用制衡。 |

### 🔧 方法与框架

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [SWE-Prime: Fewer Trajectories, Better Performance](http://arxiv.org/abs/2608.27449v1) | Dewu Zheng, Ruizhe Ye, Yanlin Wang et al. | 表明成功的 SWE 轨迹并不自动等于好的 SFT 数据；质量过滤优于堆规模。挑战「更多成功轨迹 = 更好程序员」这一默认配方。 |
| [From Static to Dynamic: MCR-Bench](http://arxiv.org/abs/2608.27442v1) | Dewu Zheng, Yanlin Wang, Xiwen Wang et al. | 基准化迭代、多轮代码评审，而非一次性评论。让 LLM 评审评估对齐真实评审发生的方式。 |
| [CLAP: Cross-Embodiment Video World Models](http://arxiv.org/abs/2608.27406v1) | Kechen Liu, Ola Shorinwa | 在跨机器人本体上训练动作条件视频模型，使异构视频成为零样本物理先验。冲击视频世界模型的单一本体瓶颈。 |
| [PAWBench: How Far Are We from Probabilistically Aligned World Modeling?](http://arxiv.org/abs/2608.27345v1) | Yuandong Pu, Le Zhuo, Sayak Paul et al. | 要求世界模型匹配有效未来的 *分布*，而不是一条看起来合理的片段。对作为世界模型出售的视频生成器提出更严苛的检验。 |
| [SCIT: Testing Causal Cache Carriers in Latent Chain-of-Thought Models](http://arxiv.org/abs/2608.27265v1) | Yi Ding, Lijun Huang, Menglin Yang | 对潜在 CoT 缓存是否真正携带推理对象做因果互换测试。让隐状态「思考」可被检验，而不是被默认成立。 |
| [CorporateBench](http://arxiv.org/abs/2608.27391v1) | Sil Hamilton, Albert Yu Sun, Oscar J. Romero et al. | 面向时序企业知识库、经人工验证的多任务问答。填补玩具 RAG 套件与企业不会公开的文档之间的空白。 |

### 📊 应用

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Making Clinical Language Models Auditable: CAST](http://arxiv.org/abs/2608.27397v1) | Jin Mu, Guanhua Chen | 基于 SAE 的概念引导调优抑制病历伪影，使临床 LM 依赖患者状态概念。面向院内看起来准、分布偏移就失效的模型。 |
| [LLMs Can Design Near-Optimal OR Algorithms](http://arxiv.org/abs/2608.27296v1) | Jackie Baek | 检验 LLM 能否发明库存、排队与品类算法，而不只是实现已知算法。在定义清晰的运筹学问题上具体探测「LLM 作为算法设计师」。 |
| [BrailleBench](http://arxiv.org/abs/2608.27268v1) | Jinghan Zhang, Fengran Mo, Zhiyu Chen et al. | 面向服务盲人与聋盲用户的 LLM 的多准则盲文理解评测。把包容性变成可度量能力，而不是事后补丁。 |
| [Sophistication in GenAI Use: Field Evidence from a Large Firm](http://arxiv.org/abs/2608.27364v1) | Nicholas J. Hallman, Zachary T. Kowaleski, Anu Puvvada et al. | 15 个职能、71.3 万条员工提示，展示一家企业内部生成式 AI 使用 sophisticaton 如何真实分化。罕见的现场度量，而非实验室提示研究。 |

## 3. 研究趋势信号

三条相互耦合的方向尤为突出。第一，**后训练正在离开带标签训练集**：CritICL、TTPO、弱模型引导的 RLVR，以及 ES-vs-GRPO，都试图在测试时或用比标准 GRPO 更便宜、更广的搜索拿到推理覆盖。第二，**智能体正被当成演化中的代码库**——技能汇编进 wiki、会成长的红队技能、按行为验证脚手架，以及 ACE 式约束「什么才算好的智能体数据」。这是从「给智能体工具」转向「给智能体记忆和验证预算」。第三，**世界模型被要求真正物理且概率化**：跨本体视频（CLAP）、分布性未来（PAWBench），以及增长中的 JEPA 容量，都拒绝「一条好看的 rollout = 理解物理」。安全工作也呈智能体形态：错位即有害工具使用、评测意识是多因素构念、针对有状态脚手架的红队。效率（Puro-2B）与领域审计（临床 CAST、CorporateBench、BrailleBench、企业级 genAI 日志）表明同一套方法正在聊天基准之外接受压力测试。

## 4. 值得精读

1. **[WikiSkill](http://arxiv.org/abs/2608.27454v1)** — 本周对智能体记忆问题最干净的表述：发现而不持久，就不是技能演化。值得通读其编译/更新规则，以及如何避免过时或互相矛盾的技能。

2. **[TTPO](http://arxiv.org/abs/2608.27448v1)** + **[Weak-Model Guidance in RLVR](http://arxiv.org/abs/2608.27420v1)** — 二者共同冲击当前推理 RL 的两道硬约束：测试时没有标签，以及可验证奖励下的熵坍缩。若关心推理时 / 弱教师方法能否替代又一轮 SFT+GRPO，建议成对阅读。

3. **[PAWBench](http://arxiv.org/abs/2608.27345v1)**（以 **[CLAP](http://arxiv.org/abs/2608.27406v1)** 为配套） — 对「视频即世界模型」主张提出正确的怀疑：不是「看起来物理吗？」，而是「是否复现有效未来的 *集合*？」CLAP 随后给出一条路径：丢掉单一本体假设，以获得更一般的物理先验。

---