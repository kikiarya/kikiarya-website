export type ProjectMetric = {
  numeric: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
};

export type DiagramStep = {
  label: string;
  detail?: string;
};

export type EvaluationBar = {
  label: string;
  caption: string;
  highlight?: boolean;
};

export type EditorialFigureId = "coding-agent" | "latent-memory" | "latent-action";

export type ProjectDiagram = {
  kind: "architecture" | "pipeline" | "evaluation" | "editorial";
  figure?: EditorialFigureId;
  caption: string;
  steps?: DiagramStep[];
  bars?: EvaluationBar[];
  /** Click/hover stepper — used for the LAR explorable figure. */
  explorable?: boolean;
};

export type TrajectoryStep = {
  time: string;
  title: string;
  detail: string;
  textAction?: string;
  latentAction?: string;
};

export type ProjectTrajectory = {
  kind: "coding-agent" | "lar";
  label: string;
  steps: TrajectoryStep[];
};

export type Project = {
  slug: string;
  title: string;
  cardTitle?: string;
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
  venue?: string;
  arxivId?: string;
  bibtex?: string;
  metrics?: ProjectMetric[];
  diagrams?: ProjectDiagram[];
  trajectory?: ProjectTrajectory;
};

export const projects: Project[] = [
  {
    slug: "latent-action-reparameterization",
    title: "Latent Action Reparameterization for Efficient Agent Inference",
    cardTitle: "LAR",
    featured: true,
    categoryTags: ["AI / Agent", "Research"],
    venue: "NeurIPS 2026 · Main Conference · Poster",
    arxivId: "2605.18597",
    role: "Feb – Jul 2026 · third author",
    shortDescription:
      "NeurIPS 2026 main conference poster. Compress high-frequency text actions into latent actions while keeping tools executable.",
    longDescription:
      "Fine-grained text actions make agent trajectories long and expensive. LAR folds high-frequency, low-entropy action spans into learnable latent actions, while query parameters and tool calls stay in plain text so they remain executable.",
    techStack: ["Python", "PyTorch", "LoRA", "GRPO", "KL distillation", "Qwen3-8B"],
    context:
      "Agent trajectories can contain repeated, low-entropy action spans. Those spans are expensive to generate and boring to supervise. The question is whether they can be reparameterized without breaking the tools that still need exact arguments.",
    systemDesign:
      "A latent-action vocabulary is mined from trajectories by frequency and entropy filters. LoRA plus trajectory-level KL distillation maps those spans onto learned tokens; GRPO probes whether the compressed policy stays stable. Query params and tool calls are left in text so the runtime can still execute them.",
    llmWorkflow: "Filter actions → distill latents → keep tools executable → transfer",
    highlights: [
      "Latent-action vocabulary from frequency and entropy filtering on real traces",
      "LoRA + trajectory-level KL distillation against the full-text teacher",
      "GRPO runs to check training stability after compression",
      "Evaluated on TriviaQA, KodCode, Mind2Web — equivalence, compression, transfer",
      "Qwen3-8B TriviaQA: ReAct 77.84% → LAR 80.09% strict EM (Vanilla 67.40%), action tokens −27.1%, throughput +17.5%",
    ],
    results:
      "Qwen3-8B LAR: TriviaQA strict EM 80.09% (action tokens −27.1%), KodCode 54.30% (−9.2%), Mind2Web 39.84% (−2.9%). TriviaQA throughput 127.8 → 150.2 tokens/s. Transfers to HumanEval, MBPP, and Qwen3-32B.",
    bibtex: `@misc{lar2026,
  title={Latent Action Reparameterization for Efficient Agent Inference},
  author={Kikiarya},
  year={2026},
  eprint={2605.18597},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  note={Accepted to the NeurIPS 2026 main conference as a poster}
}`,
    metrics: [
      { numeric: 80.09, prefix: "", suffix: "%", decimals: 2, label: "TriviaQA" },
      { numeric: 54.3, prefix: "", suffix: "%", decimals: 2, label: "KodCode" },
      { numeric: 39.84, prefix: "", suffix: "%", decimals: 2, label: "Mind2Web" },
    ],
    diagrams: [
      {
        kind: "editorial",
        figure: "latent-action",
        caption: "Text verbs compress; tool arguments stay executable.",
      },
      {
        kind: "evaluation",
        caption: "Qwen3-8B LAR on the three held-in agent benchmarks.",
        bars: [
          { label: "TriviaQA", caption: "67.40% → 80.09%", highlight: true },
          { label: "KodCode", caption: "34.44% → 54.30%" },
          { label: "Mind2Web", caption: "36.73% → 39.84%" },
        ],
      },
    ],
    trajectory: {
      kind: "lar",
      label: "Illustrative run",
      steps: [
        {
          time: "t₁",
          title: "Retrieve",
          detail:
            "A repeated retrieve verb collapses to one latent. The query string stays in text so search still runs.",
          textAction: 'search(query="capital of France")',
          latentAction: "<a_retrieve> query=\"capital of France\"",
        },
        {
          time: "t₂",
          title: "Read",
          detail:
            "Another high-frequency span. The latent is shorter to generate; the document id is unchanged.",
          textAction: "read_doc(id=wiki:paris#1)",
          latentAction: "<a_read> id=wiki:paris#1",
        },
        {
          time: "t₃",
          title: "Answer",
          detail:
            "The final emit stays closer to text — low frequency, high entropy — so the answer does not get mashed into a code.",
          textAction: "answer(\"Paris\")",
          latentAction: "answer(\"Paris\")",
        },
      ],
    },
  },
  {
    slug: "coding-agent-policy-optimization",
    title: "Coding Agent Policy Optimization",
    featured: true,
    categoryTags: ["AI / Agent", "Research"],
    role: "May – Aug 2026",
    repoUrl: "https://github.com/kikiarya/Coding-Agent",
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
    metrics: [
      { numeric: 6, prefix: "+", suffix: "pp", decimals: 0, label: "resolve" },
      { numeric: 10, prefix: "~+", suffix: "pp", decimals: 0, label: "recovery" },
      { numeric: 15, prefix: "−", suffix: "%", decimals: 0, label: "tool calls" },
    ],
    diagrams: [
      {
        kind: "editorial",
        figure: "coding-agent",
        caption: "Execute, recover, collect trajectories, then update the policy.",
      },
      {
        kind: "evaluation",
        caption: "50 SWE-bench Verified tasks. Numbers reported only for joint vs. base.",
        bars: [
          { label: "Base", caption: "Reference run" },
          { label: "Model-only", caption: "Post-training alone" },
          { label: "Harness-only", caption: "Runtime policy alone" },
          { label: "Joint", caption: "+6pp · ~+10pp · −15%", highlight: true },
        ],
      },
    ],
    trajectory: {
      kind: "coding-agent",
      label: "Illustrative run",
      steps: [
        {
          time: "00:04",
          title: "Locate",
          detail:
            "Search the SWE-bench repo for the failing test and the function it actually calls — not the first file that matches the issue title.",
        },
        {
          time: "00:18",
          title: "Edit",
          detail:
            "Patch the handler. The harness keeps the diff small enough for the verifier and drops unused files from context.",
        },
        {
          time: "00:31",
          title: "Test",
          detail:
            "Run the target tests. Failures go back into the trajectory as training signal, not as a reason to start over.",
        },
        {
          time: "00:47",
          title: "Recover",
          detail:
            "Progress detection fires a replan. Checkpoint restores the last green state instead of looping the same tool calls.",
        },
      ],
    },
  },
  {
    "slug": "openclaw-stateful-agent-runtime",
    "title": "OpenClaw Static Context Compression",
    "cardTitle": "OpenClaw Compression",
    "featured": true,
    "categoryTags": [
      "AI / Agent",
      "Research"
    ],
    "role": "Mar – Jul 2026",
    "repoUrl": "https://github.com/kikiarya/OpenClaw_LAR",
    "shortDescription": "Learn compact representations of repeated static prompts, and measure the quality–cost trade-off.",
    "longDescription": "The local implementation extracts real OpenClaw inputs, prepares static content for mining, builds a segment vocabulary and distills a compressed student. Dynamic checkpoint recovery is a separate, unverified claim.",
    "techStack": [
      "Python",
      "PyTorch",
      "LoRA",
      "KL distillation",
      "Qwen3-8B"
    ],
    "systemDesign": "Static input extraction → segment mining → vocabulary mapping → paired distillation → controlled evaluation.",
    "llmWorkflow": "Extract → mine → distill → evaluate",
    "highlights": [
      "Separate static mining input from dynamic workspace context",
      "Compare compression settings under the reported strict EM metric",
      "Inspect tool parsing separately from final-answer correctness"
    ],
    "results": "Reported strict EM: Vanilla 42.18%; Short 53.58% at 6.7% compression; AllStatic 43.08% at 45.3% compression. The checked-in substring scorer differs from the reported strict EM protocol; reproducing the numbers requires the matching evaluator version."
  },

  {
    slug: "hsc-power-ai-learning",
    title: "HSC Power",
    featured: false,
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
    repoUrl: "https://github.com/kikiarya/AI-HSC-Passion-Oriented-Study-Planner",
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
    "slug": "distributed-ecommerce-microservices",
    "title": "Commerce Agent & Transaction Boundaries",
    "featured": false,
    "categoryTags": [
      "Distributed",
      "Backend",
      "AI / Agent"
    ],
    "role": "Course project · Sep – Nov 2025",
    "repoUrl": "https://github.com/kikiarya/Agent-Commerce-Platform",
    "shortDescription": "Rule-based support orchestration alongside explicit checkout, payment and Outbox state transitions.",
    "longDescription": "The support path routes intents, queries FAQ or business data, and optionally uses an LLM to phrase the result. The transaction path tracks quotes, confirmation, payment uncertainty and asynchronous event delivery.",
    "techStack": [
      "Java",
      "Spring Boot",
      "RabbitMQ",
      "Node.js",
      "Docker Compose"
    ],
    "systemDesign": "Separate conversational responses from the transaction state machine. Payment UNKNOWN stays pending for reconciliation; Outbox delivery can repeat after a crash.",
    "highlights": [
      "Checkout lifecycle with quote expiration and invalidation on edits",
      "Payment UNKNOWN distinguished from confirmed failure",
      "Database Outbox with publisher confirmation",
      "Explicit review of outer transaction scope and duplicate delivery windows"
    ],
    "results": "Source review establishes the control flow, not a production throughput result. Quote-version fencing, completion replay semantics and the physical transaction boundary remain explicit review points."
  },

  {
    slug: "reinforcement-learning-network-defense",
    title: "RL for Network Attack–Defense",
    featured: false,
    categoryTags: ["AI/ML", "Research"],
    role: "Undergraduate thesis · Oct 2023 – Apr 2024",
    repoUrl: "https://github.com/kikiarya/NASim-DQN-Agent",
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
    repoUrl: "https://github.com/kikiarya/OldPhoneStore",
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
  {
    "slug": "pixverse-realtime-agent",
    "title": "PixVerse Real-time Interaction",
    "featured": false,
    "categoryTags": [
      "AI / Agent",
      "Full-Stack"
    ],
    "role": "AIsphere internship · Dec 2025 – Feb 2026",
    "shortDescription": "Connect user interactions, session state and generation tasks across an asynchronous video pipeline.",
    "longDescription": "My work covered WebSocket / Session / GenerationTask synchronization, Suggestion frontend and backend, and LLM task-branch context and output handling. These diagrams reconstruct historical internship notes; the company source is not available in this checkout.",
    "techStack": [
      "WebSocket",
      "Session lifecycle",
      "WebRTC",
      "LLM integration"
    ],
    "systemDesign": "Control messages and video transport have different responsibilities. Track which session and generation task owns each update.",
    "highlights": [
      "Session and generation-task lifecycle synchronization",
      "Suggestion flow across frontend and backend",
      "LLM task-branch context and output adaptation"
    ],
    "results": "The delayed-result diagram is an interview design scenario, not a claim of a deployed generation-fencing mechanism or measured latency improvement."
  },
  {
    "slug": "ai-career-copilot",
    "title": "AI Career Copilot",
    "featured": false,
    "categoryTags": [
      "AI / Agent",
      "Full-Stack"
    ],
    "role": "Personal project",
    "repoUrl": "https://github.com/kikiarya/AI-Career-Copilot",
    "shortDescription": "Turn candidate evidence into career preparation artifacts through a durable, inspectable workflow.",
    "longDescription": "A five-step workflow analyzes requirements, matches candidate evidence, diagnoses gaps, creates a plan and drafts an artifact. The local matcher uses keywords; references are checked against confirmed evidence IDs.",
    "techStack": [
      "JavaScript",
      "Worker leases",
      "Structured output",
      "Evidence validation"
    ],
    "systemDesign": "Persist the run input, claim work with a lease, execute structured steps and constrain artifact references. Whole-run retry does not imply step-level checkpoint recovery.",
    "highlights": [
      "Input snapshots and user-scoped idempotency keys",
      "Structured model outputs with validation and retries",
      "Confirmed evidence references separated from partial or missing evidence",
      "Lease recovery analyzed against stale-worker completion"
    ],
    "results": "Reference membership validation does not prove semantic faithfulness. The architecture explicitly identifies the missing execution-owner fence as a reliability improvement."
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
