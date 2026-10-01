import { projects } from "../projects";
import type { KnowledgeChunk } from "./types";

const VERSION = "2026-09-22.1";

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
      {
        label: "Mechanism",
        value: project.llmWorkflow ?? project.systemDesign ?? project.highlights[0],
      },
      { label: "Evidence", value: project.results ?? project.highlights.at(-1) ?? "See case study" },
    ],
    content: [
      project.title,
      project.shortDescription,
      project.longDescription,
      project.context,
      project.systemDesign,
      project.llmWorkflow,
      project.results,
      project.highlights.join(" "),
      project.techStack.join(" "),
    ]
      .filter(Boolean)
      .join(" "),
    keywords: [...keywords, ...project.categoryTags, ...project.techStack],
    version: VERSION,
  };
}

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "profile:overview",
    title: "Kikiarya · AI Agent Research & Engineering",
    href: "/#work",
    kind: "profile",
    answerSummary:
      "Kikiarya builds agent systems that act, recover, and improve, spanning post-training, runtime reliability, RAG workflows, and interactive AI products.",
    answerSummaryZh:
      "Kikiarya 主要研究和构建能够行动、恢复并持续改进的 Agent 系统，覆盖后训练、运行时可靠性、RAG 工作流和交互式 AI 产品。",
    facts: [
      { label: "Focus", value: "Agent post-training · runtime reliability · interactive AI" },
      { label: "Education", value: "Master of Computer Science · University of Sydney" },
      { label: "Availability", value: "Open to AI engineering roles · graduating Dec 2026" },
    ],
    content:
      "Kikiarya is a Master of Computer Science student at the University of Sydney, graduating in December 2026. Current focus: agent post-training, runtime reliability, RAG, tool use, recovery, evaluation, and interactive AI systems.",
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
    "LAR 将高频、低熵的文本动作压缩为可学习的 latent actions，同时保留查询参数和工具调用文本，使运行时仍然可以执行。",
    ["lar", "latent action", "动作压缩", "推理效率", "distillation", "grpo"]
  ),
  projectChunk(
    "coding-agent-policy-optimization",
    "Coding Agent 项目同时优化模型策略与运行时 Harness，并通过进度检测、重规划和 checkpoint recovery 处理失败循环。",
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
    "电商项目包含规则客服编排、Checkout 状态机、支付 UNKNOWN 对账与 Outbox 异步事件；图谱明确事务范围和重复投递边界。",
    ["ecommerce", "电商", "saga", "rabbitmq", "microservices", "微服务"]
  ),
  projectChunk(
    "reinforcement-learning-network-defense",
    "本科毕业项目将 NASim 攻击路径建模为 MDP，使用 DQN 学习扫描、利用和权限提升的多步策略。",
    ["reinforcement learning", "强化学习", "nasim", "dqn", "network defense", "网络攻防"]
  ),
  {
    id: "experience:aisphere",
    title: "AIsphere · PixVerse Game",
    href: "/#experience",
    kind: "experience",
    answerSummary:
      "At AIsphere, Kikiarya worked on interactive video driven by player text, connecting task state, segmented generation, live delivery, and session recovery.",
    answerSummaryZh:
      "在 AIsphere，Kikiarya 参与了由玩家文本驱动的交互视频，把任务状态、分段生成、实时交付和会话恢复连接起来。",
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
      "Kikiarya is completing a Master of Computer Science at the University of Sydney, with software engineering and data science & AI streams, graduating in December 2026.",
    answerSummaryZh:
      "Kikiarya 正在悉尼大学攻读计算机科学硕士，方向覆盖软件工程与数据科学 / AI，预计 2026 年 12 月毕业。",
    facts: [
      { label: "Degree", value: "Master of Computer Science" },
      { label: "Streams", value: "Software Engineering · Data Science & AI" },
      { label: "Graduation", value: "December 2026" },
    ],
    content:
      "University of Sydney Master of Computer Science software engineering data science artificial intelligence graduation December 2026 education resume.",
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
      "可以前往 Work 查看全部项目、在 Resume 查看教育与经历，或通过 Contact 直接联系 Kikiarya。",
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

