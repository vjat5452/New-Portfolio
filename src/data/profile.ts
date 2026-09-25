export type RoleKey = "ai" | "fullstack" | "web";

export const profile = {
  name: "Vijay Saharan",
  firstName: "Vijay",
  headline: "Full-Stack & AI Engineer",
  roles: [
    { key: "ai" as RoleKey, label: "AI Engineer" },
    { key: "fullstack" as RoleKey, label: "Full-Stack Engineer" },
    { key: "web" as RoleKey, label: "Creative Web Developer" },
  ],
  tagline:
    "I build high-performance web platforms and RAG-powered conversational AI end to end: Next.js front ends, FastAPI services, vector search and tool-calling LLM agents that ship to production.",
  location: "Noida, India",
  email: "vijaykumarsaharan22@gmail.com",
  phone: "+91 90245 25897",
  availability: "Open to full-time roles and freelance work",
  links: {
    github: "https://github.com/vjat5452",
    linkedin: "https://www.linkedin.com/in/vijay-saharan-16015a264",
    resume: "/resume.pdf",
  },
  summary:
    "Computer Science engineer from IIIT Jabalpur (2025) with a strong foundation in DSA, distributed systems and modern web stacks. I love taking an idea from a Figma frame all the way to a production deployment on Vercel. Lately I have been deep into RAG pipelines, vector databases and tool-calling LLM agents, shipping a multi-service AI Experience Centre kiosk and a brand-wide chatbot at Sparrow Interactive.",
  stats: [
    { label: "DSA problems solved", value: "700+" },
    { label: "All-India JEE rank", value: "Top 1%" },
    { label: "HackByte finalists", value: "Top 5" },
    { label: "Years building", value: "3+" },
  ],
  education: {
    school: "Indian Institute of Information Technology (IIIT) Jabalpur",
    degree: "B.Tech, Computer Science and Engineering",
    period: "Dec 2021 – Jul 2025",
    location: "Jabalpur, India",
  },
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  roles: RoleKey[];
  stack: string[];
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "Sparrow Interactive",
    role: "Full-Stack & AI Engineer",
    period: "Feb 2026 – Present",
    location: "Noida, India",
    roles: ["ai", "fullstack", "web"],
    stack: ["Next.js 16", "React 19", "Python", "FastAPI", "Claude API", "Sarvam AI", "Qdrant"],
    bullets: [
      "Built Sparrow's flagship corporate website (20+ pages) on Next.js 16 / React 19 with GSAP, Framer Motion, Three.js, Spline, Lenis and a custom responsive grid.",
      "Designed an end-to-end sales-focused RAG chatbot: FastAPI, Claude and Sarvam AI, Qdrant embeddings with Sentence-Transformers, semantic chunking, a reranker, PDF parsing and live web-scrape ingestion, delivered as an embeddable widget.",
      "Shipped a React/Vite admin dashboard for conversations, leads, golden QA, WhatsApp, email campaigns and real-time analytics.",
      "Building the Sparrowi AI Experience Centre: a 6-microservice kiosk platform with face recognition (InsightFace), a tool-calling LLM (Ollama qwen2.5:14b) and live emotion/pose analytics (MediaPipe).",
    ],
  },
  {
    company: "Freelance",
    role: "Freelance Developer",
    period: "2024 – Present",
    location: "Remote",
    roles: ["fullstack", "web", "ai"],
    stack: ["Next.js", "React", "Node.js", "Python"],
    bullets: [
      "Take on freelance projects on the side: small web apps, landing pages and AI-powered tools for independent clients.",
    ],
  },
  {
    company: "Swafinix Technologies",
    role: "Full-Stack Developer Intern",
    period: "Nov 2025 – Feb 2026",
    location: "Kolkata (Remote)",
    roles: ["ai", "fullstack"],
    stack: ["Python", "React", "Node.js", "MongoDB"],
    bullets: [
      "Delivered an agentic RAG chatbot that lifted information-retrieval accuracy and user interaction across the platform.",
      "Built production features for 3 client web apps using a modular, class-based architecture with REST APIs.",
    ],
  },
  {
    company: "Zexa Technologies",
    role: "Software Development Intern",
    period: "Jul 2025 – Oct 2025",
    location: "Jaipur (Remote)",
    roles: ["fullstack"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js"],
    bullets: [
      "Contributed reusable modules to the ZexaNext Next.js boilerplate with a focus on scalability and maintainability.",
      "Delivered customer-facing MVPs and product websites with API integrations and UI performance tuning.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  roles: RoleKey[];
  github?: string;
  live?: string;
  year: string;
  featured?: boolean;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "sparrow-website",
    title: "Sparrow Interactive Website",
    tagline: "Flagship 20+ page corporate platform",
    description:
      "A 20+ page corporate site on Next.js 16 + React 19 with GSAP, Framer Motion, React Three Fiber and Spline scenes, Lenis smooth-scroll, a custom responsive grid, lazy-loaded media and a Nodemailer-backed contact pipeline.",
    highlights: ["20+ pages", "R3F and Spline 3D scenes", "98 Lighthouse score"],
    stack: ["Next.js 16", "React 19", "GSAP", "Three.js", "Spline", "Tailwind CSS"],
    roles: ["web", "fullstack"],
    live: "https://sparrowi.com",
    year: "2026",
    featured: true,
    gradient: "from-violet-500 via-fuchsia-500 to-cyan-400",
  },
  {
    slug: "ai-experience-centre",
    title: "Sparrowi AI Experience Centre",
    tagline: "Multi-service AI kiosk platform",
    description:
      "A kiosk platform with face recognition (InsightFace + SQLite vector search), a tool-calling LLM brain (Ollama qwen2.5:14b), real-time emotion and pose analytics (MediaPipe, DeepFace) and auto-generated visit reports. Six microservices over FastAPI + Next.js 14.",
    highlights: ["6 microservices", "Edge inference", "Real-time WebSockets"],
    stack: ["FastAPI", "Ollama", "InsightFace", "MediaPipe", "DeepFace", "WebSockets", "Next.js"],
    roles: ["ai", "fullstack"],
    year: "2026",
    featured: true,
    gradient: "from-cyan-400 via-sky-500 to-indigo-500",
  },
  {
    slug: "sparrow-rag-chatbot",
    title: "Sparrow RAG Chatbot + Admin",
    tagline: "Conversational AI with a control plane",
    description:
      "A full RAG pipeline: Claude and Sarvam AI, Qdrant vectors with Sentence-Transformers, semantic chunking, a reranker, PDF parsing, live web-scrape ingestion, lead capture, session management and SQL analytics, plus a React control plane with automated email outreach.",
    highlights: ["Semantic rerank", "PDF + web ingestion", "Lead capture and analytics"],
    stack: ["Python", "FastAPI", "Claude API", "Sarvam AI", "Qdrant", "React", "SQL"],
    roles: ["ai", "fullstack"],
    live: "https://sparrowi.com",
    year: "2026",
    featured: true,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    slug: "realdocs",
    title: "RealDocs",
    tagline: "Real-time collaborative editor",
    description:
      "A Google Docs clone built with Next.js and TypeScript: Lexical Editor for rich text, Liveblocks for live multi-cursor collaboration and shadcn/ui polish, with auth and document sharing.",
    highlights: ["Live cursors", "Lexical rich-text editor", "Auth + sharing"],
    stack: ["Next.js", "TypeScript", "Lexical", "Liveblocks", "shadcn/ui"],
    roles: ["fullstack", "web"],
    year: "2024",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
  },
  {
    slug: "hostel-hub-base",
    title: "Hostel Hub Base",
    tagline: "Hostel management microservice",
    description:
      "A hostel management microservice with four roles and an 85% active-user rate. One-click and manual allocation flows let admins and caretakers manage hostel and room assignments efficiently.",
    highlights: ["4 RBAC roles", "85% active users", "One-click allocation"],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    roles: ["fullstack"],
    year: "2023",
    gradient: "from-sky-400 via-blue-500 to-violet-500",
  },
  {
    slug: "aircargopro",
    title: "AirCargoPro",
    tagline: "Cargo booking with smart route search",
    description:
      "A scalable cargo booking platform on React, Node.js and MongoDB with JWT auth and a responsive Tailwind UI. A custom depth-limited search finds optimal direct and one-stop flight routes, backed by Redis caching, with REST APIs for real-time shipment tracking and React Query for optimistic updates.",
    highlights: ["Depth-limited route search", "Redis caching", "Real-time shipment tracking"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS", "React Query"],
    roles: ["fullstack"],
    year: "2022",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
  },
  {
    slug: "org-hierarchy",
    title: "Org Hierarchy System",
    tagline: "MERN app with a recursive tree UI",
    description:
      "A non-blocking Node.js/Express API with optimised CRUD (50% faster responses), a recursive React tree with instant expand/collapse and a 10+ rule client-side validator.",
    highlights: ["50% lower latency", "Recursive tree", "10+ validators"],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    roles: ["fullstack"],
    year: "2022",
    gradient: "from-lime-400 via-emerald-500 to-teal-500",
  },
];

export type SkillGroup = {
  key: RoleKey;
  title: string;
  blurb: string;
  skills: { name: string; note: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "ai",
    title: "AI Engineering",
    blurb: "Retrieval, agents and vision models that turn LLMs into product features.",
    skills: [
      { name: "Claude API", note: "Tool-use, prompt caching" },
      { name: "Sarvam AI", note: "Chat completions" },
      { name: "RAG Pipelines", note: "Chunk → embed → rerank" },
      { name: "Qdrant", note: "Vector search at scale" },
      { name: "Sentence-Transformers", note: "Embeddings" },
      { name: "Ollama", note: "Local qwen2.5:14b" },
      { name: "InsightFace", note: "Face recognition" },
      { name: "MediaPipe", note: "Pose / landmarks" },
      { name: "DeepFace", note: "Emotion analytics" },
      { name: "FastAPI", note: "Async Python services" },
      { name: "Python", note: "AI / backend / scripts" },
      { name: "n8n", note: "Workflow automation" },
    ],
  },
  {
    key: "fullstack",
    title: "Full-Stack",
    blurb: "Type-safe front ends, scalable APIs and the databases underneath them.",
    skills: [
      { name: "TypeScript", note: "Daily driver" },
      { name: "JavaScript", note: "ES2024+" },
      { name: "Next.js", note: "App router, RSC, edge" },
      { name: "React", note: "19 + hooks + Suspense" },
      { name: "Node.js", note: "Streams & workers" },
      { name: "Express", note: "REST APIs" },
      { name: "Prisma", note: "Type-safe ORM" },
      { name: "PostgreSQL", note: "Relational + JSONB" },
      { name: "MongoDB", note: "Document store" },
      { name: "MySQL", note: "OLTP workloads" },
      { name: "SQLite (vector)", note: "Embedded vector store" },
      { name: "C++", note: "DSA & systems" },
      { name: "Java", note: "OOP fundamentals" },
      { name: "Docker", note: "Compose & multi-stage" },
      { name: "GCP", note: "Cloud Run, Storage" },
      { name: "AWS", note: "EC2, Lightsail, S3, Lambda" },
      { name: "Git", note: "Trunk + feature flow" },
    ],
  },
  {
    key: "web",
    title: "Creative Web",
    blurb: "Motion, 3D and performance work that makes a site feel like a product.",
    skills: [
      { name: "Three.js / R3F", note: "3D scenes" },
      { name: "Spline", note: "Designed 3D visuals" },
      { name: "GSAP", note: "Scroll-triggered motion" },
      { name: "Framer Motion", note: "React animation" },
      { name: "Lenis", note: "Smooth scroll" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "shadcn/ui", note: "Component polish" },
      { name: "Lexical + Liveblocks", note: "Real-time editors" },
      { name: "WebSockets", note: "Realtime UIs" },
      { name: "Vercel", note: "Edge deploys" },
    ],
  },
];

export const certifications = [
  { title: "AI Intern Certificate", issuer: "Swafinix Technologies", date: "Feb 2026" },
];

export const achievements = [
  "Solved 700+ DSA problems across LeetCode, Codeforces, CodeChef and GeeksforGeeks.",
  "Top 5 finalist at HackByte (IIIT Jabalpur) with AI Helper, out of 10+ hackathons attended.",
  "All-India top 1% rank in JEE.",
];

export const marqueeTech = [
  "TypeScript", "Python", "Next.js", "React", "FastAPI", "Claude API", "Sarvam AI", "Qdrant", "Ollama",
  "PostgreSQL", "MongoDB", "Docker", "GCP", "AWS", "Three.js", "GSAP", "Framer Motion",
];

export const suggestedQuestions = [
  "What has Vijay built at Sparrow Interactive?",
  "How does the RAG chatbot pipeline work?",
  "Which projects show full-stack skills?",
  "Is Vijay open to new roles right now?",
];
