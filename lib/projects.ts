
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
    title: 'HSC Power AI Learning Platform',
    featured: true,
    categoryTags: ['AI Product', 'Full-Stack'],
    shortDescription: 'Full-stack learning system with personalized learning plans, AI question generation, and automatic grading.',
    longDescription: 'A comprehensive learning platform for students, teachers, parents, and administrators. Provides personalized learning plans, AI-powered question generation, automatic grading, and learning feedback. Built using React 19 + Vite for the frontend, Node.js/Express for REST API, and Supabase for database and authentication with RLS security policies.',
    techStack: ['React', 'Node.js', 'Supabase', 'OpenAI', 'Express', 'Vite'],
    demoUrl: 'https://ai-hsc-passion-oriented-study-plann.vercel.app/',
    context: 'Built to provide personalized learning assistance for high school students with AI-powered content generation and feedback.',
    systemDesign: 'Full-stack architecture with React frontend, Node.js backend, Supabase for database and authentication. Integrated OpenAI to build multi-agent AI workflow for subject recognition, learning plan generation, question creation, and grading.',
    llmWorkflow: 'Multi-agent AI workflow: Subject Recognition → Learning Plan Generation → Question Generation → Automatic Grading → Feedback Delivery.',
    highlights: [
      'Integrated OpenAI to build multi-agent AI workflow (subject recognition → learning plan → question generation → grading)',
      'Used React 19 + Vite for modern frontend development',
      'Implemented Supabase for database, authentication, and RLS security policies',
      'Based on MBSE (Model-Based Systems Engineering) methodology for system modeling'
    ],
    results: 'Successfully built a comprehensive learning platform supporting multiple user roles with AI-powered features.'
  },
  {
    slug: 'distributed-ecommerce-microservices',
    title: 'Distributed E-commerce Microservices Platform',
    featured: true,
    categoryTags: ['Distributed', 'Backend'],
    shortDescription: 'Spring Boot-based microservices platform with Saga distributed transactions and reliable messaging.',
    longDescription: 'Designed four microservices (Store/Bank/DeliveryCo/Email) based on Spring Boot, providing RESTful API + gRPC service interfaces. Built Saga distributed transaction covering payment, inventory, and delivery processes with compensation logic and eventual consistency.',
    techStack: ['Java', 'Spring Boot', 'gRPC', 'RabbitMQ', 'Docker', 'Docker Compose'],
    context: 'Course project to build a distributed e-commerce system demonstrating microservices architecture and distributed transaction handling.',
    systemDesign: 'Four microservices architecture: Store/Bank/DeliveryCo/Email. Implemented Saga pattern for distributed transactions with compensation logic. Used RabbitMQ for reliable asynchronous messaging (persistence, Ack, retry, idempotent consumption). Deployed using Docker Compose for cross-service containerization.',
    highlights: [
      'Designed Saga distributed transaction pattern with compensation logic for eventual consistency',
      'Implemented reliable asynchronous messaging using RabbitMQ (persistence, Ack, retry, idempotent consumption)',
      'Built RESTful API + gRPC service interfaces for inter-service communication',
      'Completed cross-service containerization deployment using Docker Compose',
      'Performed performance modeling and bottleneck analysis based on queuing theory'
    ],
    results: 'Successfully implemented a distributed microservices platform demonstrating scalability and reliability patterns.'
  },
  {
    slug: 'reinforcement-learning-network-defense',
    title: 'Reinforcement Learning Network Attack-Defense Training',
    featured: true,
    categoryTags: ['AI/ML', 'Research'],
    shortDescription: 'Research on adaptive control methods for network attack-defense training using reinforcement learning.',
    longDescription: 'Built reinforcement learning framework to simulate network attack-defense environments using Markov Decision Process. Designed network attack-defense state, action, and reward mechanisms based on NASim. Implemented Deep Q-Learning algorithm using PyTorch with experience replay and target network techniques.',
    techStack: ['Python', 'PyTorch', 'Reinforcement Learning', 'Deep Q-Learning', 'NASim'],
    context: 'Graduation thesis project researching adaptive control methods for network attack-defense training systems.',
    systemDesign: 'Reinforcement learning model using Markov Decision Process to simulate network attack scenarios. Based on NASim framework to build network environment with key network components. Deep Q-Learning algorithm with experience replay and target network for stable training.',
    highlights: [
      'Built reinforcement learning framework to simulate network attack-defense environments',
      'Designed state, action, and reward mechanisms for network security scenarios',
      'Implemented Deep Q-Learning algorithm using PyTorch with experience replay and target network',
      'Successfully trained intelligent agent capable of learning optimal attack-defense strategies',
      'Based on NASim framework for network simulation'
    ],
    results: 'Successfully implemented and trained a reinforcement learning agent for network attack-defense scenarios as part of graduation thesis.'
  },
  {
    slug: 'lightgbm-financial-prediction',
    title: 'Financial Product Subscription Prediction (LightGBM)',
    featured: false,
    categoryTags: ['Data/ML'],
    shortDescription: 'Machine learning model to predict bank customer financial product subscription intentions using LightGBM.',
    longDescription: 'Deep analysis of bank user data using machine learning algorithms to predict customer potential financial product subscription intentions. Achieved 98% accuracy through feature engineering and algorithm parameter optimization.',
    techStack: ['Python', 'LightGBM', 'Machine Learning', 'Feature Engineering'],
    context: 'Course project to predict customer financial product subscription intentions using machine learning.',
    highlights: [
      'Achieved 98% prediction accuracy through feature engineering and parameter optimization',
      'Compared performance with Decision Tree, SVM, Adaboost and other classic models',
      'Verified LightGBM advantages in financial product subscription prediction tasks'
    ],
    results: 'Achieved 98% accuracy in predicting customer financial product subscription intentions.'
  },
  {
    slug: 'secondhand-phone-mall',
    title: 'Second-hand Phone E-commerce Platform',
    featured: false,
    categoryTags: ['Full-Stack', 'MEAN Stack'],
    shortDescription: 'E-commerce platform built with MEAN stack supporting user management, shopping cart, orders, and payments.',
    longDescription: 'Built e-commerce platform based on MEAN architecture (MongoDB, Express, Vue, Node.js), supporting user login, shopping cart, orders, and payment. Implemented administrator-side product management, user management, and order tracking to improve system maintainability.',
    techStack: ['MongoDB', 'Express', 'Vue.js', 'Node.js', 'MEAN Stack'],
    context: 'Course project to build a complete e-commerce platform using MEAN stack technologies.',
    highlights: [
      'Built complete e-commerce platform using MEAN stack architecture',
      'Implemented user authentication, shopping cart, order management, and payment features',
      'Developed administrator dashboard for product, user, and order management',
      'Improved system maintainability with modular design'
    ],
    results: 'Successfully built a functional e-commerce platform with full CRUD operations and user management.'
  },
  {
    slug: 'course-qa-system',
    title: 'Course Teaching Q&A System',
    featured: false,
    categoryTags: ['Full-Stack'],
    shortDescription: 'Course Q&A system with Spring Boot backend, Vue frontend, and MySQL database.',
    longDescription: 'Developed course Q&A system using Spring Boot framework for backend, Vue.js for frontend, and MySQL for database. Includes both admin backend and user web interface, supporting administrator, student, and teacher roles with modules for subject types, student questions, teacher answers, discussion area, and system basics.',
    techStack: ['Spring Boot', 'Vue.js', 'MySQL', 'Java'],
    context: 'Course project to build a Q&A system for educational purposes.',
    highlights: [
      'Built full-stack application with Spring Boot and Vue.js',
      'Designed multi-role system (administrator, student, teacher)',
      'Implemented modules for subjects, questions, answers, and discussions',
      'Used MySQL for data persistence'
    ],
    results: 'Successfully developed a functional course Q&A system supporting multiple user roles.'
  }
];

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (cat: string) => 
  cat === 'All' ? projects : projects.filter(p => p.categoryTags.includes(cat));
