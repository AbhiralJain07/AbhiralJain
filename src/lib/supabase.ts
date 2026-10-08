import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize Supabase client if keys are present
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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

// Initial project seed data based on Abhiral's verified portfolio & resume
const INITIAL_PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Atithi — Multi-Tenant Visitor Management",
    category: "Full-Stack & Security",
    description: "DPDP Act 2023 compliant multi-tenant VMS featuring JWT authentication and self-hosted facial recognition.",
    long_description: "Architected a multi-tenant Visitor Management System (VMS) with JWT authentication and a 6-tier Role-Based Access Control (RBAC) hierarchy ranging from Super Admin to Security, meeting DPDP Act 2023 compliance. Built a self-hosted facial recognition microservice (Python/Flask/InsightFace) for biometric check-in and blacklist detection, integrated with a Telegram Bot for host approvals to eliminate external API costs. Serves with rate limiting, audit logging, and dynamic 5-language localization.",
    technologies: ["Node.js", "Express", "MongoDB", "React", "TypeScript", "Python", "Flask", "InsightFace"],
    image_url: "atithi", // Key for dynamic SVG / CSS illustration
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
    description: "Predictive flight safety platform using Gradient Boosting Classifier with sub-200ms inference.",
    long_description: "Built a full-stack Machine Learning application classifying flight scenarios into 4 distinct risk tiers. Deployed on Render with sub-200ms inference times using a Gradient Boosting Classifier. Engineered an interactive live Risk Simulator with 11 parameters that maps non-obvious factor interactions (e.g., how pilot experience can outweigh severe weather conditions).",
    technologies: ["Python", "Gradient Boosting", "Scikit-Learn", "NumPy", "Pandas", "Flask", "React", "TypeScript"],
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
    description: "Enterprise IT service management system with realm-based multi-tenancy, RBAC, automated SLA tracking, and real-time incident analytics.",
    long_description: "Architected a scalable, production-grade IT Service Management (ITSM) system built with ASP.NET Core Web API and Next.js App Router. Features realm-based tenant isolation, secure JWT authentication with HttpOnly cookies, 3-tier Role-Based Access Control (Admin, Agent, User), and an automated C# Background Automation Worker for real-time SLA target monitoring and breach tracking. Includes Recharts analytics dashboards for incident volume statistics, daily closure rates, and live system latency telemetry.",
    technologies: ["Next.js", "ASP.NET Core", "TypeScript", "C#", "Entity Framework Core", "PostgreSQL", "JWT Auth", "Tailwind CSS", "Recharts"],
    image_url: "itsm",
    project_url: "https://github.com/AbhiralJain07/ITSM",
    github_url: "https://github.com/AbhiralJain07/ITSM",
    metrics: "Realm-Based Multi-Tenancy • 3-Tier RBAC • C# SLA Worker",
    sort_order: 2,
    created_at: new Date(2025, 11, 1).toISOString(),
  },
  // {
  //   id: "project-4",
  //   title: "AgentNexus — Multi-Agent Autonomous Network",
  //   category: "Machine Learning & AI",
  //   description: "Collaborative multi-agent reasoning framework with vector memory retrieval and structured tool execution.",
  //   long_description: "Architected a multi-agent orchestration architecture where specialized agents autonomously coordinate complex software workflows. Features local vector indexing for contextual memory, recursive task decomposition, and schema-validated tool calling.",
  //   technologies: ["Python", "LangChain", "Vector Embeddings", "FastAPI", "Next.js", "Tailwind CSS"],
  //   image_url: "agentnexus",
  //   project_url: "https://github.com/AbhiralJain07",
  //   github_url: "https://github.com/AbhiralJain07",
  //   metrics: "Autonomous Multi-Agent • Sub-second Context Retrieval",
  //   sort_order: 3,
  //   created_at: new Date(2026, 1, 1).toISOString(),
  // },
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "President & Research/Development Lead",
    organization: "EvolVIT",
    period: "Aug 2024 — Present",
    location: "VIT Bhopal University",
    type: "Research & Lead",
    description: "Spearheading engineering research, leading developer teams in building scalable microservices, and automating backend pipelines while fostering student technical development.",
    highlights: [
      "Architected high-concurrency microservices and automated n8n workflows eliminating operational bottlenecks.",
      "Spearheaded university-to-industry partnerships and placed 50+ peers into verified tech internships.",
      "Led ML optimization research achieving sub-200ms inference on production models.",
      "Mentored student developers on clean code architecture, full-stack pipelines, and security best practices."
    ],
    technologies: ["Next.js", "Microservices", "n8n.io", "Python", "Flask", "Node.js", "Redis", "Leadership", "Communication Skill"],
  },
  {
    id: "exp-2",
    role: "Software Development Intern",
    organization: "WeWin Engineering Services & Suppliers Pvt. Ltd.",
    period: "May 2025 - June 2025",
    location: "Bhopal, India",
    type: "Internship",
    description: "Engineered scalable backend REST APIs, implemented responsive frontend interfaces, and optimized data transactions for client enterprise services.",
    highlights: [
      "Built modular REST API endpoints in Express/Node.js with rigorous validation and role-based security.",
      "Streamlined state management and frontend UI components in React, reducing page render bottlenecks.",
      "Collaborated in agile team sprints, code reviews, and production deployment cycles."
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "JavaScript"],
  },
  {
    id: "exp-3",
    role: "Full Stack Web Intern",
    organization: "DataTrack",
    period: "April 2026 — June 2026",
    location: "Remote",
    type: "Internship",
    description: "Developed real-time telemetry dashboards, optimized database indexing, and built responsive customer portals with secure authentication flows.",
    highlights: [
      "Engineered dynamic analytics interfaces consuming live telemetry and customer transaction streams.",
      "Optimized PostgreSQL schema queries and indexing to significantly enhance report rendering speed.",
      "Integrated secure authentication protocols and granular user permission roles."
    ],
    technologies: ["TypeScript", "React", "PostgreSQL", "Tailwind CSS", "Data Telemetry", "REST APIs", "N8n.io", "Automation"],
  },
];

const INITIAL_PROFILE: Profile = {
  bio_text: "I'm a developer who loves turning real-world problems into clean, fast, and reliable software. Whether I'm training ML models to predict risk or building full-stack platforms from scratch, I focus on practical tools that genuinely help people.",
  availability_status: true,
};

export async function getExperiences(): Promise<Experience[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data as Experience[];
  }

  // Fallback / Demo Mode
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem("portfolio_experiences_v2");
    if (cached) {
      try {
        return JSON.parse(cached) as Experience[];
      } catch {
        // Fall back to initial if corrupt
      }
    }
    localStorage.setItem("portfolio_experiences_v2", JSON.stringify(INITIAL_EXPERIENCES));
  }
  return INITIAL_EXPERIENCES;
}

// --- API Service Layer with Sandbox Fallback ---

const STORAGE_PROJECTS_KEY = "portfolio_projects_v5";

export async function getProjects(): Promise<Project[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data as Project[];
    console.error("Supabase error fetching projects:", error);
  }

  // Fallback / Demo Mode (LocalStorage Sandbox)
  if (typeof window !== "undefined") {
    // Clear outdated legacy keys
    localStorage.removeItem("portfolio_projects");
    localStorage.removeItem("portfolio_projects_v2");
    localStorage.removeItem("portfolio_projects_v3");
    localStorage.removeItem("portfolio_projects_v4");

    const cached = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Project[];
        // Always ensure seed projects in code take precedence, keeping any custom user-added projects
        const userCreated = parsed.filter(
          (p) => !INITIAL_PROJECTS.some((seed) => seed.id === p.id)
        );
        const combined = [...INITIAL_PROJECTS, ...userCreated].map((p, idx) => ({
          ...p,
          sort_order: p.sort_order ?? idx,
        }));
        localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(combined));
        return combined;
      } catch {
        // Fall back to INITIAL_PROJECTS if cache is corrupt
      }
    }
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
  }
  return INITIAL_PROJECTS;
}

export async function saveProject(project: Partial<Project> & { id?: string }): Promise<Project> {
  if (supabase) {
    const { id, ...projectData } = project;
    if (id && !id.startsWith("project-")) {
      const { data, error } = await supabase.from("projects").update(projectData).eq("id", id).select();
      if (!error && data?.[0]) return data[0] as Project;
    } else {
      const { data, error } = await supabase.from("projects").insert([projectData]).select();
      if (!error && data?.[0]) return data[0] as Project;
    }
  }

  // Fallback / Demo Mode
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(STORAGE_PROJECTS_KEY);
    const list: Project[] = cached ? JSON.parse(cached) : INITIAL_PROJECTS;
    
    if (project.id) {
      const index = list.findIndex((p: Project) => p.id === project.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...(project as Project) };
      }
    } else {
      const newProj: Project = {
        title: project.title || "",
        category: project.category || "Software & Cloud",
        description: project.description || "",
        long_description: project.long_description || "",
        technologies: project.technologies || [],
        image_url: project.image_url || "",
        project_url: project.project_url || "",
        github_url: project.github_url || "",
        metrics: project.metrics || "",
        id: "project-" + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        sort_order: list.length,
      };
      list.push(newProj);
      project = newProj;
    }
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(list));
    return project as Project;
  }
  return project as Project;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) return true;
  }

  // Fallback / Demo Mode
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (cached) {
      const list = (JSON.parse(cached) as Project[]).filter((p: Project) => p.id !== id);
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(list));
      return true;
    }
  }
  return true;
}

export async function reorderProjectsInDB(projects: Project[]): Promise<void> {
  if (supabase) {
    const promises = projects.map((p, index) =>
      supabase!.from("projects").update({ sort_order: index }).eq("id", p.id)
    );
    await Promise.all(promises);
    return;
  }

  if (typeof window !== "undefined") {
    const updated = projects.map((p, index) => ({ ...p, sort_order: index }));
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
  }
}

export async function getProfile(): Promise<Profile> {
  if (supabase) {
    const { data, error } = await supabase.from("profile").select("*").maybeSingle();
    if (!error && data) return data as Profile;
    console.error("Supabase error fetching profile:", error);
  }

  // Fallback / Demo Mode
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem("portfolio_profile");
    if (cached) return JSON.parse(cached);
    localStorage.setItem("portfolio_profile", JSON.stringify(INITIAL_PROFILE));
  }
  return INITIAL_PROFILE;
}

export async function updateProfile(profileData: { bio_text: string; availability_status: boolean }) {
  if (supabase) {
    // Attempt to update. Since it's a single profile, we update the first matching row or insert
    const { data: existing } = await supabase.from("profile").select("id").limit(1);
    if (existing && existing.length > 0) {
      const { data, error } = await supabase
        .from("profile")
        .update({ ...profileData, updated_at: new Date().toISOString() })
        .eq("id", existing[0].id)
        .select();
      if (!error) return data[0];
    } else {
      const { data, error } = await supabase.from("profile").insert([profileData]).select();
      if (!error) return data[0];
    }
  }

  // Fallback / Demo Mode
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_profile", JSON.stringify(profileData));
  }
  return profileData;
}

// --- Admin Authentication Helpers ---

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user) return true;
    return false;
  }

  // Fallback / Demo Mode login (Bypasses with "admin" / "admin")
  if (email.toLowerCase() === "admin" && password === "admin") {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_session", "demo-token");
    }
    return true;
  }
  return false;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  if (supabase) {
    // Sync session check for SSR / Client render
    // In actual server environments we use middlewear, on client we do basic check
    const session = localStorage.getItem("sb-" + supabaseUrl.split(".")[0].split("//")[1] + "-auth-token");
    return !!session;
  }

  return localStorage.getItem("admin_session") === "demo-token";
}

export async function logoutAdmin() {
  if (supabase) {
    await supabase.auth.signOut();
  } else if (typeof window !== "undefined") {
    localStorage.removeItem("admin_session");
  }
}
