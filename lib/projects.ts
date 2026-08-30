export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  featured?: boolean;
  categoryTags: string[];
  demoUrl?: string;
  repoUrl?: string;
  context?: string;
  userFlow?: string;
  systemDesign?: string;
  llmWorkflow?: string;
  highlights: string[];
  results?: string;
  role?: string;
  architecture?: string;
  decisions?: string[];
};

export const projects: Project[] = [
  {
    slug: "coding-agent-policy-optimization",
    title: "Coding Agent Policy Optimization",
    featured: true,
    categoryTags: ["AI / Agent", "Research"],
    role: "May – Aug 2026",
    shortDescription:
      "Repository-level coding agent — model post-training and harness policy tuned together.",
    longDescription:
      "A coding agent that can search a repo, edit files, run tests, and recover from a failed run. Two levers: train the model policy from real trajectories, and tune the harness — which tools are exposed, how much context goes in, when to retry or replan.",
    techStack: [
      "Python",
      "PyTorch",
      "LoRA",
      "GRPO",
      "Qwen2.5-Coder-7B",
      "SWE-bench",
    ],
    context:
      "Most coding-agent work fixes either the model or the runtime. This project asks what each layer buys on its own, and what happens when you optimize both.",
    systemDesign:
      "Trajectories from a repository-level agent are split into success and failure. Failure-aware data feeds LoRA-SFT, then GRPO with rewards tied to task success, test output, recovery, and cost. On the harness side, tool surface, context window, and verification change with task state; progress detection, retry/replan, and checkpoint recovery cut loops and dead ends.",
    llmWorkflow:
      "Locate → edit → run tests → recover on failure → verify",
    highlights: [
      "Self-built repo-level coding agent and execution environment",
      "Failure-aware trajectory data from SWE-smith for LoRA-SFT + GRPO on Qwen2.5-Coder-7B",
      "Reward from task success, test results, recovery, and execution cost",
      "Harness adjusts tool surface, context, and verification by state",
      "Progress detection, retry/replan, and checkpoint recovery in the loop",
      "Compared base, model-only, harness-only, and joint optimization on 50 SWE-bench Verified tasks",
    ],
    results:
      "Joint optimization solved 3 more tasks than base (+6pp resolve rate), recovery rate up ~10pp, average tool calls down 15%. SWE-Explore used to separate gains from better code localization vs. context selection.",
  },
  {
    slug: "openclaw-stateful-agent-runtime",
    title: "OpenClaw Stateful Agent Runtime",
    featured: true,
    categoryTags: ["AI / Agent", "Research"],
    role: "Mar – Jul 2026",
    shortDescription:
      "Compress long OpenClaw runs into task state — fewer tokens, better recovery after a crash.",
    longDescription:
      "OpenClaw sessions balloon: every tool result and turn sits in context until something breaks. Here, history is folded into executable task state. Important checkpoints stay; the rest compresses. Repeated system prompts go through a LoRA-distilled shortcut on Qwen3-8B.",
    techStack: ["Python", "PyTorch", "LoRA", "KL distillation", "Qwen3-8B", "Node.js"],
    context:
      "Long-horizon agents pay twice — token cost while running, and a full restart when context compaction or a network blip loses state. Same research line as LAR, but at the session layer.",
    systemDesign:
      "Task state is rebuilt from trajectory: progress and dependencies decide what to keep. Checkpoints before compression; on failure, recover from the last good state. System-prompt spans that repeat every turn are replaced with a learned token via LoRA + KL distillation against the full-prompt teacher. Compared against native OpenClaw, hard truncation, and summarization.",
    llmWorkflow:
      "Track task state → compress context → checkpoint → recover on fault → continue",
    highlights: [
      "State-aware context compression keyed on task progress and dependencies",
      "Checkpoint recovery instead of restarting a long run from scratch",
      "LoRA + KL distillation on Qwen3-8B for repeated system prompts",
      "Benchmarked against truncation and summarization baselines",
      "Fault injection to measure whether the session actually survives",
    ],
    results:
      "Context tokens down 46.7% vs. native OpenClaw. Task success after compression up 8.4pp. Recovery rate up 83.3pp under injected faults.",
  },
  {
    slug: "hsc-power-ai-learning",
    title: "HSC Power",
    featured: true,
    categoryTags: ["AI Product", "Full-Stack"],
    role: "Sep – Dec 2025",
    shortDescription:
      "Diagnose → plan → practice → mark. Four LangGraph agents, one tutoring loop.",
    longDescription:
      "Multi-role study platform underneath: diagnosis, planning, question generation, and marking are separate agents on a shared state graph. RAG and tool calls fire when the task needs them; outputs are schema-bound so one bad generation does not poison the next step.",
    techStack: [
      "LangChain",
      "LangGraph",
      "RAG",
      "React",
      "Node.js",
      "Express",
      "Supabase",
    ],
    demoUrl: "https://ai-hsc-passion-oriented-study-plann.vercel.app/",
    context:
      "One chatbot prompt cannot do diagnosis and marking well at the same time. Splitting into agents with explicit handoffs made failures easier to trace.",
    systemDesign:
      "LangGraph workflow: knowledge diagnosis → learning plan → practice generation → answer evaluation. Shared state and conditional routing between agents. LangChain wraps RAG retrieval, tool calling, and structured output; schema constraints on inter-agent data and tool args. React + Express + Supabase for roles, tasks, and execution state.",
    llmWorkflow:
      "Diagnose gaps → plan → generate practice → evaluate answers",
    highlights: [
      "Four-agent LangGraph workflow with shared state and conditional routing",
      "RAG + tool calling triggered by task state, not on every turn",
      "Schema constraints on agent outputs and tool parameters",
      "React + Express + Supabase — students, teachers, parents, admins",
    ],
    results:
      "End-to-end loop from subject selection to graded feedback. Live demo linked on this page.",
  },
  {
    slug: "distributed-ecommerce-microservices",
    title: "E-commerce Microservices",
    featured: false,
    categoryTags: ["Distributed", "Backend"],
    role: "Course project · Sep – Nov 2025",
    shortDescription:
      "Four Spring Boot services — Saga rollback when payment, stock, or delivery fails mid-order.",
    longDescription:
      "Store, Bank, DeliveryCo, Email. REST and gRPC between services. Orders cross service boundaries; Saga compensation rolls back when any step fails.",
    techStack: ["Java", "Spring Boot", "gRPC", "RabbitMQ", "Docker", "Docker Compose"],
    context:
      "Distributed systems coursework. The point is cross-service consistency, not catalog CRUD.",
    systemDesign:
      "Saga pattern for payment, inventory, and delivery with compensating actions. RabbitMQ for async notifications — persistent messages, ack, retry, idempotent consumers. Docker Compose for local multi-service deploy.",
    highlights: [
      "Saga compensation across order, payment, inventory, and delivery",
      "RabbitMQ with persistence, ack, retry, and idempotent consumption",
      "REST + gRPC service mesh",
      "Docker Compose deployment",
    ],
    results:
      "Full stack runs from one compose file. Mid-flow payment failure triggers compensation on the rest.",
  },
  {
    slug: "reinforcement-learning-network-defense",
    title: "RL for Network Attack–Defense",
    featured: false,
    categoryTags: ["AI/ML", "Research"],
    role: "Undergraduate thesis · Oct 2023 – Apr 2024",
    shortDescription:
      "NASim attack paths as an MDP — DQN learns scan, exploit, and privilege escalation.",
    longDescription:
      "Network attack on NASim, framed as sequential decision-making: host discovery, vulnerability exploitation, privilege escalation. State, action, and reward design turn multi-step path search into something a DQN can learn.",
    techStack: ["Python", "PyTorch", "DQN", "NASim"],
    context:
      "Undergrad thesis on whether an RL agent can learn attack strategy in simulation instead of following a fixed script.",
    systemDesign:
      "MDP over NASim at multiple network scales. DQN with experience replay, target network, ε-greedy. Compared reward shaping, exploration, and hyperparameters via success rate, cumulative reward, average steps, and convergence speed.",
    highlights: [
      "MDP formulation for discovery, exploit, and escalation on NASim",
      "DQN with replay buffer, target network, and ε-greedy exploration",
      "Ablation on reward design, exploration, and hyperparameters",
    ],
    results:
      "Agent learns viable attack paths; larger networks need more training steps. Convergence curves in the thesis write-up.",
  },
  {
    slug: "hanchuan-qiangu",
    title: "汉传千古",
    featured: false,
    categoryTags: ["Interactive"],
    role: "Undergrad · Unity",
    shortDescription:
      "Walk-through classical garden in Unity — leaves, water, courtyards from poem imagery.",
    longDescription:
      "An atmosphere piece, not a scored game. Courtyards and water drawn from classical Chinese garden and poetry references. Part of why this site ended up pink.",
    techStack: ["Unity", "C#"],
    context: "Student computer-design competition entry.",
    highlights: [
      "Ambient walk-through with weather and water",
      "Layout and props from classical garden and poem imagery",
    ],
    results: "National student computer-design competition entry.",
  },
  {
    slug: "lightgbm-financial-prediction",
    title: "Subscription Prediction (LightGBM)",
    featured: false,
    categoryTags: ["Data/ML"],
    role: "Course project",
    shortDescription: "Bank subscription intent — LightGBM vs. tree, SVM, AdaBoost.",
    longDescription:
      "Tabular features, light feature engineering, LightGBM as the main model. Same split for decision tree, SVM, and AdaBoost baselines.",
    techStack: ["Python", "LightGBM", "scikit-learn"],
    context: "Course tabular ML exercise.",
    highlights: [
      "Feature engineering with held-out evaluation",
      "LightGBM compared to tree, SVM, and AdaBoost on the same split",
    ],
    results: "LightGBM led on the course evaluation split.",
  },
  {
    slug: "secondhand-phone-mall",
    title: "Second-hand Phone Shop",
    featured: false,
    categoryTags: ["Full-Stack"],
    role: "Course project · MEAN",
    shortDescription: "MEAN storefront — auth, cart, orders, payment, admin.",
    longDescription:
      "MongoDB, Express, Vue, Node. Customer checkout flow plus admin for products, users, and orders.",
    techStack: ["MongoDB", "Express", "Vue.js", "Node.js"],
    context: "Full-stack course project including admin tooling.",
    highlights: ["Customer auth, cart, checkout", "Admin catalogue and order management"],
    results: "Runs locally. Not deployed.",
  },
  {
    slug: "course-qa-system",
    title: "Course Q&A",
    featured: false,
    categoryTags: ["Full-Stack"],
    role: "Course project",
    shortDescription: "Spring Boot + Vue Q&A with student, teacher, and admin roles.",
    longDescription:
      "Subjects, questions, answers, discussion threads. Role-based access on Spring Boot, Vue, and MySQL.",
    techStack: ["Spring Boot", "Vue.js", "MySQL", "Java"],
    context: "Course teaching-assistant Q&A system.",
    highlights: ["Three roles with different permissions", "Subject threads and replies"],
    results: "Course demo. Not deployed.",
  },
];

/** @deprecated Use openclaw-stateful-agent-runtime */
const legacySlugRedirects: Record<string, string> = {
  latentmemory: "openclaw-stateful-agent-runtime",
};

export const getProjectBySlug = (slug: string) => {
  const resolved = legacySlugRedirects[slug] ?? slug;
  return projects.find((p) => p.slug === resolved);
};

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectsByCategory = (cat: string) =>
  cat === "All" ? projects : projects.filter((p) => p.categoryTags.includes(cat));

export const getAllProjectSlugs = () => [
  ...projects.map((p) => p.slug),
  ...Object.keys(legacySlugRedirects),
];
