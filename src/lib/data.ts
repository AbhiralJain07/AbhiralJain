export interface Project {
  id: string;
  title: string;
  category?: string;
  description: string;
  long_description: string;
  technologies: string[];
  image_url: string;
  project_url: string;
  github_url: string;
  sort_order: number;
  created_at?: string;
  metrics?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: "Research & Lead" | "Internship" | "Leadership & Community";
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Profile {
  id?: string;
  bio_text: string;
  availability_status: boolean;
  updated_at?: string;
}

// Verified Portfolio Projects (Frontend Static Data)
export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Atithi — Multi-Tenant Visitor Management",
    category: "Full-Stack & Security",
    description:
      "DPDP Act 2023 compliant multi-tenant VMS featuring JWT authentication and self-hosted facial recognition.",
    long_description:
      "Architected a multi-tenant Visitor Management System (VMS) with JWT authentication and a 6-tier Role-Based Access Control (RBAC) hierarchy ranging from Super Admin to Security, meeting DPDP Act 2023 compliance. Built a self-hosted facial recognition microservice (Python/Flask/InsightFace) for biometric check-in and blacklist detection, integrated with a Telegram Bot for host approvals to eliminate external API costs. Serves with rate limiting, audit logging, and dynamic 5-language localization.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "TypeScript",
      "Python",
      "Flask",
      "InsightFace",
    ],
    image_url: "atithi",
    project_url: "https://visitor-management-system-ochre.vercel.app",
    github_url: "https://github.com/AbhiralJain07/visitor-management-system",
    metrics: "DPDP 2023 Compliant • 6-Tier RBAC • 0 External API Costs",
    sort_order: 0,
    created_at: new Date(2026, 5, 1).toISOString(),
  },
  {
    id: "project-2",
    title: "CrashRisk — Aviation Safety Intelligence",
    category: "Machine Learning & AI",
    description:
      "Predictive flight safety platform using Gradient Boosting Classifier with sub-200ms inference.",
    long_description:
      "Built a full-stack Machine Learning application classifying flight scenarios into 4 distinct risk tiers. Deployed on Render with sub-200ms inference times using a Gradient Boosting Classifier. Engineered an interactive live Risk Simulator with 11 parameters that maps non-obvious factor interactions (e.g., how pilot experience can outweigh severe weather conditions).",
    technologies: [
      "Python",
      "Gradient Boosting",
      "Scikit-Learn",
      "NumPy",
      "Pandas",
      "Flask",
      "React",
      "TypeScript",
    ],
    image_url: "crashrisk",
    project_url: "https://crashrisk.onrender.com",
    github_url: "https://github.com/AbhiralJain07/CrashRisk",
    metrics: "< 200ms Inference • 11 Risk Parameters • 4 Tiers",
    sort_order: 1,
    created_at: new Date(2025, 8, 1).toISOString(),
  },
  {
    id: "project-3",
    title: "ITSM — Enterprise IT Service Management Platform",
    category: "Full-Stack & Security",
    description:
      "Enterprise IT service management system with realm-based multi-tenancy, RBAC, automated SLA tracking, and real-time incident analytics.",
    long_description:
      "Architected a scalable, production-grade IT Service Management (ITSM) system built with ASP.NET Core Web API and Next.js App Router. Features realm-based tenant isolation, secure JWT authentication with HttpOnly cookies, 3-tier Role-Based Access Control (Admin, Agent, User), and an automated C# Background Automation Worker for real-time SLA target monitoring and breach tracking. Includes Recharts analytics dashboards for incident volume statistics, daily closure rates, and live system latency telemetry.",
    technologies: [
      "Next.js",
      "ASP.NET Core",
      "TypeScript",
      "C#",
      "Entity Framework Core",
      "PostgreSQL",
      "JWT Auth",
      "Tailwind CSS",
      "Recharts",
    ],
    image_url: "itsm",
    project_url: "https://github.com/AbhiralJain07/ITSM",
    github_url: "https://github.com/AbhiralJain07/ITSM",
    metrics: "Realm-Based Multi-Tenancy • 3-Tier RBAC • C# SLA Worker",
    sort_order: 2,
    created_at: new Date(2025, 11, 1).toISOString(),
  },
];

// Verified Work & Leadership Experience
export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "President & Research/Development Lead",
    organization: "EvolVIT",
    period: "Aug 2026 — Present",
    location: "VIT Bhopal University",
    type: "Research & Lead",
    description:
      "Spearheading engineering research, leading developer teams in building scalable microservices, and automating backend pipelines while fostering student technical development.",
    highlights: [
      "Architected high-concurrency microservices and automated n8n workflows eliminating operational bottlenecks.",
      "Spearheaded university-to-industry partnerships and placed 50+ peers into verified tech internships.",
      "Led ML optimization research achieving sub-200ms inference on production models.",
      "Mentored student developers on clean code architecture, full-stack pipelines, and security best practices.",
    ],
    technologies: [
      "Next.js",
      "Microservices",
      "n8n.io",
      "Python",
      "Flask",
      "Node.js",
      "Redis",
      "Leadership",
      "Communication Skill",
    ],
  },
  {
    id: "exp-2",
    role: "Software Development Intern",
    organization: "WeWin Engineering Services & Suppliers Pvt. Ltd.",
    period: "May 2025 - June 2025",
    location: "Bhopal, India",
    type: "Internship",
    description:
      "Engineered scalable backend REST APIs, implemented responsive frontend interfaces, and optimized data transactions for client enterprise services.",
    highlights: [
      "Built modular REST API endpoints in Express/Node.js with rigorous validation and role-based security.",
      "Streamlined state management and frontend UI components in React, reducing page render bottlenecks.",
      "Collaborated in agile team sprints, code reviews, and production deployment cycles.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Git",
      "JavaScript",
    ],
  },
  {
    id: "exp-3",
    role: "Full Stack Web Intern",
    organization: "DataTrack",
    period: "April 2026 — June 2026",
    location: "Remote",
    type: "Internship",
    description:
      "Developed real-time telemetry dashboards, optimized database indexing, and built responsive customer portals with secure authentication flows.",
    highlights: [
      "Engineered dynamic analytics interfaces consuming live telemetry and customer transaction streams.",
      "Optimized PostgreSQL schema queries and indexing to significantly enhance report rendering speed.",
      "Integrated secure authentication protocols and granular user permission roles.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "PostgreSQL",
      "Tailwind CSS",
      "Data Telemetry",
      "REST APIs",
      "N8n.io",
      "Automation",
    ],
  },
];

// Profile Metadata
export const PROFILE: Profile = {
  bio_text:
    "I'm a developer who loves turning real-world problems into clean, fast, and reliable software. Whether I'm training ML models to predict risk or building full-stack platforms from scratch, I focus on practical tools that genuinely help people.",
  availability_status: true,
};

// Pure Synchronous / Direct Getter Functions
export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getExperiences(): Experience[] {
  return EXPERIENCES;
}

export function getProfile(): Profile {
  return PROFILE;
}
