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
    slug: "latentmemory",
    title: "LatentMemory",
    featured: true,
    categoryTags: ["AI / Agent", "Research"],
    role: "Graduation design · research & engineering",
    shortDescription:
      "Token efficiency and context reliability for an open-source LLM agent runtime (OpenClaw).",
    longDescription:
      "Graduation research project targeting two failure modes in long agent sessions: repeated prompt token cost, and context-window overflow that breaks the conversation. Built dual-path optimizations — latent prompt compression and a recovery layer for silent compaction failures — then plugged them into a Node.js gateway without changing agent business logic.",
    techStack: ["Python", "PyTorch", "PEFT / LoRA", "vLLM", "Node.js", "Qwen3-8B"],
    context:
      "Long sessions on OpenClaw wasted tokens on repeated system prompts and could silently fail when context was compacted. The work sits on the same research line as co-authored LAR (Latent Action Reparameterization) on CoRR.",
    systemDesign:
      "Latent prompt compression replaces high-frequency, low-entropy system prompt spans with a learnable special token. A LoRA adapter is distilled on Qwen3-8B with KL divergence against full-prompt teacher outputs. A separate recovery layer detects truncation, rebuilds session state, and applies semantics-preserving compression. Integration uses Node.js gateway hooks (before_prompt_build, replaceMessages) as a non-invasive plugin, with JSONL event logs for replay and debugging.",
    llmWorkflow:
      "System prompt → latent compression token → LoRA-adapted generation → optional compaction recovery → agent continue",
    highlights: [
      "Latent prompt compression with LoRA distillation (KL) on Qwen3-8B",
      "TriviaQA (5,000): average prompt tokens −6.7% while Exact Match rose from 0.4218 to 0.5358",
      "Swept compression rates 6.7%–45.3%; usable band about 6.7%–15%; extreme config 687 → 376 avg prompt tokens",
      "Fault injection: session survival after compaction failures from 0% to 100%",
      "Plugin hooks into OpenClaw gateway without rewriting agent business logic",
    ],
    results:
      "On TriviaQA (5,000), −6.7% average prompt tokens with Exact Match 0.4218 → 0.5358; session survival under compaction faults 0% → 100%.",
  },
  {
    slug: "hsc-power-ai-learning",
    title: "HSC Power AI Learning Platform",
    featured: true,
    categoryTags: ["AI Product", "Full-Stack"],
    role: "Full-stack project",
    shortDescription:
      "Learning platform with plans, AI-generated questions, auto-grading, and feedback for students, teachers, and parents.",
    longDescription:
      "Multi-role learning system (students, teachers, parents, admins) with personalized plans, question generation, grading, and feedback. Frontend: React 19 + Vite. API: Node.js / Express. Data and auth: Supabase with RLS.",
    techStack: ["React", "Node.js", "Supabase", "OpenAI", "Express", "Vite"],
    demoUrl: "https://ai-hsc-passion-oriented-study-plann.vercel.app/",
    context:
      "Built as a full-stack AI product for high-school learning support — plans, questions, grading, and feedback in one loop.",
    systemDesign:
      "React frontend, Node.js/Express REST API, Supabase for database, auth, and RLS. OpenAI powers a multi-stage workflow: subject recognition → learning plan → question generation → auto-grading.",
    llmWorkflow:
      "Subject recognition → learning plan → question generation → auto-grading → feedback",
    highlights: [
      "Multi-stage OpenAI workflow wired into teaching features",
      "React 19 + Vite frontend",
      "Supabase auth, database, and RLS",
    ],
    results:
      "The full loop runs end to end — from picking a subject to getting graded feedback. Live demo linked above.",
  },
  {
    slug: "distributed-ecommerce-microservices",
    title: "Distributed E-commerce Microservices Platform",
    featured: true,
    categoryTags: ["Distributed", "Backend"],
    role: "Course project",
    shortDescription:
      "Four Spring Boot services with Saga transactions, compensation, and RabbitMQ messaging.",
    longDescription:
      "Store / Bank / DeliveryCo / Email on Spring Boot with REST and gRPC. Covers order, payment, inventory, and delivery with Saga compensation and eventual consistency.",
    techStack: ["Java", "Spring Boot", "gRPC", "RabbitMQ", "Docker", "Docker Compose"],
    context:
      "Course project for a distributed e-commerce backend: microservices, distributed transactions, and async messaging.",
    systemDesign:
      "Four services with Saga for cross-service compensation. RabbitMQ for durable async messaging (persistence, Ack, retry, idempotent consumers). Docker Compose for multi-service deploy.",
    highlights: [
      "Saga with compensation and eventual consistency",
      "RabbitMQ: persistence, Ack, retry, idempotent consumption",
      "REST + gRPC between services",
      "Docker Compose multi-service deployment",
    ],
    results:
      "One docker compose up brings up all four services. Kill a payment mid-flow and you can watch the Saga compensation clean up after it.",
  },
  {
    slug: "reinforcement-learning-network-defense",
    title: "RL Network Attack–Defense Training",
    featured: false,
    categoryTags: ["AI/ML", "Research"],
    role: "Undergraduate thesis",
    shortDescription:
      "Undergraduate thesis: Deep Q-Learning agent for network attack–defense on NASim.",
    longDescription:
      "MDP-style attack–defense environment on NASim; DQN in PyTorch with experience replay and a target network.",
    techStack: ["Python", "PyTorch", "Reinforcement Learning", "Deep Q-Learning", "NASim"],
    context:
      "Undergraduate thesis on adaptive control for network attack–defense training.",
    systemDesign:
      "NASim simulation with attack/defense state, action, and reward design. DQN with experience replay and target network.",
    highlights: [
      "NASim environment for attack–defense decisions",
      "DQN with experience replay and target network in PyTorch",
    ],
    results: "Trained DQN agent on NASim as undergraduate thesis work.",
  },
  {
    slug: "lightgbm-financial-prediction",
    title: "Financial Product Subscription Prediction (LightGBM)",
    featured: false,
    categoryTags: ["Data/ML"],
    shortDescription: "LightGBM model predicting bank customers’ product subscription intent.",
    longDescription:
      "Predict subscription intent from bank customer features. Feature engineering and tuning; compared against Decision Tree, SVM, and AdaBoost in a course evaluation setup.",
    techStack: ["Python", "LightGBM", "Machine Learning", "Feature Engineering"],
    context: "Course project on subscription intent prediction.",
    highlights: [
      "Feature engineering and parameter tuning",
      "Compared LightGBM with Decision Tree, SVM, and AdaBoost",
    ],
    results: "Course evaluation reported 98% accuracy for the LightGBM setup used.",
  },
  {
    slug: "secondhand-phone-mall",
    title: "Second-hand Phone E-commerce Platform",
    featured: false,
    categoryTags: ["Full-Stack", "MEAN Stack"],
    shortDescription: "MEAN-stack shop: auth, cart, orders, payments, plus an admin console.",
    longDescription:
      "MEAN (MongoDB, Express, Vue, Node.js) storefront with login, cart, orders, and payment. Admin side covers products, users, and order tracking.",
    techStack: ["MongoDB", "Express", "Vue.js", "Node.js", "MEAN Stack"],
    context: "Course project for a complete storefront with admin tools.",
    highlights: [
      "MEAN stack storefront",
      "Auth, cart, orders, payment",
      "Admin console for catalog and orders",
    ],
    results: "Runnable storefront and admin CRUD flows.",
  },
  {
    slug: "course-qa-system",
    title: "Course Teaching Q&A System",
    featured: false,
    categoryTags: ["Full-Stack"],
    shortDescription:
      "Spring Boot + Vue + MySQL Q&A for courses, with student, teacher, and admin roles.",
    longDescription:
      "Course Q&A with Spring Boot, Vue, and MySQL. Roles: admin, student, teacher. Modules cover subjects, questions, answers, discussion, and basic settings.",
    techStack: ["Spring Boot", "Vue.js", "MySQL", "Java"],
    context: "Course project for multi-role teaching Q&A.",
    highlights: [
      "Spring Boot + Vue full-stack",
      "Admin / student / teacher roles",
      "Subjects, questions, answers, discussion",
    ],
    results: "Working multi-role Q&A for course questions and answers.",
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectsByCategory = (cat: string) =>
  cat === "All" ? projects : projects.filter((p) => p.categoryTags.includes(cat));
