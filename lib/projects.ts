
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
  // Added optional fields to resolve type errors in ProjectDetail components
  role?: string;
  architecture?: string;
  decisions?: string[];
};

export const projects: Project[] = [
  {
    slug: 'hsc-power-ai-learning',
    title: 'HSC Power AI Learning',
    featured: true,
    categoryTags: ['AI Product', 'Full-Stack'],
    shortDescription: 'Adaptive learning engine powered by GPT-4 for high-school curriculum optimization.',
    longDescription: 'An intelligent platform designed to analyze student performance gaps and dynamically generate personalized learning materials. It integrates RAG (Retrieval Augmented Generation) to ensure syllabus alignment.',
    techStack: ['Next.js', 'Python', 'OpenAI', 'Pinecone', 'FastAPI'],
    demoUrl: 'https://hsc-power.demo.ai',
    repoUrl: 'https://github.com/qiyue-chen/hsc-power-ai',
    context: 'Developed to bridge the gap in specialized tutoring for underprivileged students.',
    userFlow: 'Login -> Diagnostic Test -> AI Analyzes Weak Points -> Personalized Roadmap Generated -> Interactive Lessons.',
    systemDesign: 'Distributed architecture separating the LLM orchestration layer from the user management system to handle async token streaming.',
    llmWorkflow: 'Uses GPT-4o for evaluation and GPT-4-turbo for content generation, grounded by Pinecone vector storage.',
    highlights: [
      'Implemented custom RAG pipeline with 94% syllabus accuracy.',
      'Reduced average student study time by 30% through targeted drills.',
      'Architected a resilient streaming interface for real-time AI feedback.'
    ],
    results: 'Scaled to 5,000 active users in the first beta month with an average NPS of 72.'
  },
  {
    slug: 'distributed-ecommerce-microservices',
    title: 'Nexus Distributed Commerce',
    featured: true,
    categoryTags: ['Distributed', 'Backend'],
    shortDescription: 'Cloud-native e-commerce core handling 50k+ transactions per second.',
    longDescription: 'A robust, event-driven backend system for global scale. Built with a focus on data consistency, horizontal scalability, and multi-region availability.',
    techStack: ['Go', 'gRPC', 'PostgreSQL', 'Kafka', 'Redis', 'Kubernetes'],
    repoUrl: 'https://github.com/qiyue-chen/nexus-core',
    context: 'Architected for a high-growth retail unicorn transitioning from monolith to microservices.',
    systemDesign: 'Event-driven choreography using Kafka. Implemented SAGA pattern for distributed transaction management across order and payment services.',
    highlights: [
      'Engineered a distributed lock mechanism using Redis for inventory synchronization.',
      'Designed gRPC-based service communication reducing latency by 45% vs REST.',
      'Implemented zero-downtime canary deployments via Kubernetes ingress.'
    ],
    results: 'Survived 2023 Black Friday traffic with 99.99% uptime and p99 latency under 150ms.'
  },
  {
    slug: 'llm-doc-reviewer',
    title: 'InsightDoc AI',
    featured: true,
    categoryTags: ['AI Product', 'Data/ML'],
    shortDescription: 'Automated legal and technical document auditing using Large Language Models.',
    longDescription: 'An enterprise-grade tool for reviewing thousands of pages of documentation to identify compliance risks and technical inconsistencies.',
    techStack: ['TypeScript', 'LangChain', 'Python', 'AWS Lambda', 'React'],
    demoUrl: 'https://insightdoc.demo.io',
    context: 'Built to automate the manual review process for legal compliance teams in fintech.',
    llmWorkflow: 'Multi-stage chain using LangChain. Step 1: Chunking; Step 2: Extraction; Step 3: Consistency check; Step 4: Final summary.',
    highlights: [
      'Built a custom extraction parser reducing LLM hallucination in technical specs by 18%.',
      'Developed a React-based interactive diff-viewer for document versions.',
      'Integrated SSO and enterprise-grade encryption for PII protection.'
    ],
    results: 'Reduced manual audit time from 4 days to 15 minutes per document bundle.'
  }
];

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (cat: string) => 
  cat === 'All' ? projects : projects.filter(p => p.categoryTags.includes(cat));
