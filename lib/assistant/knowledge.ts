import { buildArticleKnowledge } from "./article-knowledge";
import { publishedContent, contentVersion } from "../notes";
import { projects } from "../projects";
import type { KnowledgeChunk } from "./types";

const VERSION = `2026-10-02.6:${contentVersion}`;

function projectChunk(
  slug: string,
  answerSummaryZh: string,
  keywords: string[]
): KnowledgeChunk {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing portfolio project: ${slug}`);

  return {
    id: `project:${slug}`,
    title: project.cardTitle ?? project.title,
    href: `/work/${slug}`,
    kind: "project",
    answerSummary: project.shortDescription,
    answerSummaryZh,
    facts: [
      { label: "Role", value: project.role ?? "Portfolio project" },
      ...(project.venue ? [{ label: "Venue", value: project.venue }] : []),
      {
        label: "Mechanism",
        value: project.llmWorkflow ?? project.systemDesign ?? project.highlights[0],
      },
      { label: "Evidence", value: project.results ?? project.highlights.at(-1) ?? "See case study" },
      ...(project.repoUrl ? [{ label: "Source", value: project.repoUrl }] : []),
    ],
    content: [
      project.title,
      project.shortDescription,
      project.longDescription,
      project.context,
      project.systemDesign,
      project.llmWorkflow,
      project.results,
      project.repoUrl,
      project.highlights.join(" "),
      project.techStack.join(" "),
    ]
      .filter(Boolean)
      .join(" "),
    keywords: [...keywords, ...project.categoryTags, ...project.techStack],
    version: VERSION,
  };
}

function repositoryChunk(slug: string, keywords: string[]): KnowledgeChunk {
  const project = projects.find((item) => item.slug === slug);
  if (!project?.repoUrl) throw new Error(`Missing public repository: ${slug}`);

  return {
    id: `repository:${slug}`,
    title: `${project.cardTitle ?? project.title} · GitHub`,
    href: project.repoUrl,
    kind: "project",
    answerSummary: `Public source repository: ${project.repoUrl}`,
    answerSummaryZh: `公开源码仓库：${project.repoUrl}`,
    facts: [
      { label: "Project", value: project.cardTitle ?? project.title },
      { label: "Repository", value: project.repoUrl },
    ],
    content: `${project.title} public GitHub repository source code ${project.repoUrl}`,
    keywords: ["github", "repository", "repo", "source code", "源码", "仓库", "公开链接", ...keywords],
    version: VERSION,
  };
}

const projectDetailsZh: Record<string, Record<string, string>> = {
  "coding-agent-policy-optimization": {
    context: "这个项目关注两件事：模型能否选择更有效的动作，以及运行环境能否帮助它从失败中恢复。通过分别调整模型和 Harness，再比较联合调整的结果，观察两层各自的作用。",
    mechanism: "流程从定位代码开始，随后修改文件、运行测试、检查结果。模型侧将成功和失败轨迹用于 LoRA-SFT 与 GRPO；运行时则根据任务状态调整工具、上下文和验证步骤。发现进度停滞后，会尝试重试或重新规划，并通过检查点保留已有进度。",
    results: "项目记录中的联合优化比基线多解决 3 个任务，解决率提高 6 个百分点，恢复率约提高 10 个百分点，平均工具调用减少 15%。评估同时比较基线、仅优化模型、仅优化 Harness 和联合优化四种设置。",
  },
  "latent-action-reparameterization": {
    context: "Agent 的执行轨迹里常有反复出现的动作文本。LAR 希望减少这些重复内容的生成成本，同时保留工具调用所需的精确参数。",
    mechanism: "先根据频率和熵筛选轨迹中的重复片段，形成潜在动作词表；再通过 LoRA 和轨迹级 KL 蒸馏，让模型用较短的动作表示替代这些片段。查询参数和工具调用仍保留为文本，保证运行时可以执行。随后用 GRPO 与跨任务评估观察压缩后的策略表现。",
    results: "项目记录报告：Qwen3-8B 在 TriviaQA 的严格匹配率为 80.09%，动作 token 减少 27.1%；KodCode 为 54.30%，Mind2Web 为 39.84%。TriviaQA 吞吐量从每秒 127.8 token 提高到 150.2 token，并进行了跨任务和模型规模的迁移评估。",
  },
};

function projectDetails(): KnowledgeChunk[] {
  return projects.flatMap(project => {
    const label = project.cardTitle ?? project.title;
    const sections = [
      { key: "context", title: "背景与问题", content: project.context, keywords: ["背景", "问题", "为什么", "解决什么", "background", "problem"] },
      { key: "mechanism", title: "实现机制", content: [project.systemDesign, project.llmWorkflow].filter(Boolean).join("\n\n"), keywords: ["怎么实现", "怎么做", "原理", "机制", "架构", "implementation", "how", "mechanism"] },
      { key: "results", title: "结果与验证", content: project.results, keywords: ["效果", "结果", "验证", "测试", "results", "evaluation"] },
    ];
    return sections.filter(section => section.content).map(section => ({
      id: `project-detail:${project.slug}:${section.key}`, title: `${label} · ${section.title}`,
      href: `/work/${project.slug}`, kind: "project" as const,
      answerSummary: section.content!, answerSummaryZh: projectDetailsZh[project.slug]?.[section.key] ?? section.content!, content: `${label} ${section.content}`,
      keywords: [label, ...section.keywords], facts: [], version: VERSION,
    }));
  });
}

export const knowledgeChunks: KnowledgeChunk[] = [
  ...projectDetails(),
  ...buildArticleKnowledge(publishedContent, VERSION),
  {
    id: "profile:overview",
    title: "Kikiarya · AI Agent Research & Engineering",
    href: "/#work",
    kind: "profile",
    answerSummary:
      "Kikiarya builds agent systems that act, recover, and improve, spanning post-training, runtime reliability, RAG workflows, and interactive AI products.",
    answerSummaryZh:
      "Kikiarya 主要研究并构建具备执行、恢复与持续改进能力的 Agent 系统，方向包括后训练、运行时可靠性、RAG 工作流和交互式 AI 产品。",
    facts: [
      { label: "Focus", value: "Agent post-training · runtime reliability · interactive AI" },
      { label: "Education", value: "Master of Computer Science · University of Sydney" },
      { label: "Availability", value: "Open to AI engineering roles · graduating Nov 2026" },
    ],
    content:
      "Kikiarya is a Master of Computer Science student at the University of Sydney, graduating in November 2026. Current focus: agent post-training, runtime reliability, RAG, tool use, recovery, evaluation, and interactive AI systems.",
    keywords: [
      "kikiarya",
      "about",
      "overview",
      "介绍",
      "是谁",
      "做什么",
      "方向",
      "agent",
      "ai engineering",
    ],
    version: VERSION,
  },
  projectChunk(
    "latent-action-reparameterization",
    "LAR 将高频、低熵的文本动作压缩为可学习的 latent actions，同时保留查询参数与工具调用文本，确保工具仍能正确执行。",
    ["lar", "latent action", "动作压缩", "推理效率", "distillation", "grpo", "论文", "论文状态", "录用", "接收", "主会", "poster", "accepted", "neurips"]
  ),
  projectChunk(
    "coding-agent-policy-optimization",
    "Coding Agent 项目同时优化模型策略与运行时 Harness，并通过进度检测、重新规划和检查点恢复跳出失败循环。",
    ["coding agent", "代码智能体", "恢复", "recovery", "checkpoint", "swe-bench", "harness"]
  ),
  projectChunk(
    "openclaw-stateful-agent-runtime",
    "OpenClaw 项目的当前本地实现侧重静态提示词片段挖掘与 LoRA/KL 蒸馏压缩；图谱展示严格 EM 与压缩率的取舍，不宣称动态检查点恢复已经得到验证。",
    ["openclaw", "stateful runtime", "上下文压缩", "任务状态", "故障恢复"]
  ),
  projectChunk(
    "hsc-power-ai-learning",
    "HSC Power 使用四个 LangGraph Agent 组成诊断、计划、练习和评估闭环，并按任务状态触发 RAG 与工具调用。",
    ["hsc", "rag", "langgraph", "multi-agent", "多智能体", "学习规划"]
  ),
  projectChunk(
    "distributed-ecommerce-microservices",
    "电商项目包含基于规则的客服编排、Checkout 状态机、支付 UNKNOWN 对账与 Outbox 异步事件；图谱同时标明事务范围和消息重复投递的边界。",
    ["ecommerce", "电商", "saga", "rabbitmq", "microservices", "微服务"]
  ),
  projectChunk(
    "reinforcement-learning-network-defense",
    "本科毕业项目将 NASim 攻击路径建模为 MDP，使用 DQN 学习扫描、利用和权限提升的多步策略。",
    ["reinforcement learning", "强化学习", "nasim", "dqn", "network defense", "网络攻防"]
  ),
  repositoryChunk("coding-agent-policy-optimization", ["coding agent", "代码智能体"]),
  repositoryChunk("openclaw-stateful-agent-runtime", ["openclaw", "上下文压缩"]),
  repositoryChunk("ai-career-copilot", ["career copilot", "求职工作台"]),
  repositoryChunk("distributed-ecommerce-microservices", ["commerce", "ecommerce", "电商"]),
  repositoryChunk("hsc-power-ai-learning", ["hsc", "learning planner"]),
  repositoryChunk("reinforcement-learning-network-defense", ["nasim", "dqn"]),
  repositoryChunk("secondhand-phone-mall", ["old phone", "商城"]),
  {
    id: "experience:aisphere",
    title: "AIsphere · PixVerse Game",
    href: "/#experience",
    kind: "experience",
    answerSummary:
      "At AIsphere, Kikiarya worked on interactive video driven by player text, connecting task state, segmented generation, live delivery, and session recovery.",
    answerSummaryZh:
      "在 AIsphere，Kikiarya 参与开发由玩家文本驱动的交互视频，将任务状态、分段生成、实时传输与会话恢复串联起来。",
    facts: [
      { label: "Period", value: "Dec 2025 — Feb 2026" },
      { label: "Flow", value: "Player text → task state → segmented video → live stream" },
      { label: "Reliability", value: "Session recovery for network or generation failures" },
    ],
    content:
      "AIsphere PixVerse Game internship interactive video player text prompt context game state segmented generation live stream network failure generation failure session recovery.",
    keywords: ["aisphere", "pixverse", "internship", "实习", "交互视频", "video generation"],
    version: VERSION,
  },
  {
    id: "experience:education",
    title: "University of Sydney",
    href: "/resume",
    kind: "experience",
    answerSummary:
      "Kikiarya is completing a Master of Computer Science at the University of Sydney, with software engineering and data science & AI streams, graduating in November 2026.",
    answerSummaryZh:
      "Kikiarya 正在悉尼大学攻读计算机科学硕士，方向覆盖软件工程与数据科学 / AI，预计 2026 年 11 月毕业。",
    facts: [
      { label: "Degree", value: "Master of Computer Science" },
      { label: "Streams", value: "Software Engineering · Data Science & AI" },
      { label: "Graduation", value: "November 2026" },
    ],
    content:
      "University of Sydney Master of Computer Science software engineering data science artificial intelligence graduation November 2026 education resume.",
    keywords: ["education", "学历", "毕业", "悉尼大学", "university", "resume", "简历"] ,
    version: VERSION,
  },
  {
    id: "navigation:contact",
    title: "Contact & navigation",
    href: "/#contact",
    kind: "navigation",
    answerSummary:
      "Use the Work index for all projects, Resume for education and experience, or Contact to reach Kikiarya directly.",
    answerSummaryZh:
      "你可以在 Work 浏览全部项目，在 Resume 查看教育与经历，也可以通过 Contact 直接联系 Kikiarya。",
    facts: [
      { label: "Work", value: "/work" },
      { label: "Resume", value: "/resume" },
      { label: "Contact", value: "/contact" },
    ],
    content: "portfolio navigation work projects resume experience contact email GitHub 导航 项目 简历 联系",
    keywords: ["contact", "联系", "email", "邮箱", "resume", "简历", "work", "项目"],
    version: VERSION,
  },
];

export const knowledgeVersion = VERSION;

