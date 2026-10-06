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
    title: "FlowSync — Event-Driven n8n Automation Engine",
    category: "Cloud & Automation",
    description: "High-throughput webhook orchestration pipeline with distributed event retry queues and monitoring.",
    long_description: "Engineered an enterprise-grade automation pipeline using n8n and Node.js microservices. Integrated asynchronous webhook listeners, automated data transformation, and reliable dead-letter queue retries with Telegram & email alerts for mission-critical operations.",
    technologies: ["n8n.io", "Node.js", "Redis", "Webhooks", "PostgreSQL", "Docker"],
    image_url: "flowsync",
    project_url: "https://github.com/AbhiralJain07",
    github_url: "https://github.com/AbhiralJain07",
    metrics: "99.9% Pipeline Reliability • Zero Message Loss • Real-Time Alerts",
    sort_order: 2,
    created_at: new Date(2025, 10, 1).toISOString(),
  },
  {
    id: "project-4",
    title: "AgentNexus — Multi-Agent Autonomous Network",
    category: "Machine Learning & AI",
    description: "Collaborative multi-agent reasoning framework with vector memory retrieval and structured tool execution.",
    long_description: "Architected a multi-agent orchestration architecture where specialized agents autonomously coordinate complex software workflows. Features local vector indexing for contextual memory, recursive task decomposition, and schema-validated tool calling.",
    technologies: ["Python", "LangChain", "Vector Embeddings", "FastAPI", "Next.js", "Tailwind CSS"],
    image_url: "agentnexus",
    project_url: "https://github.com/AbhiralJain07",
    github_url: "https://github.com/AbhiralJain07",
    metrics: "Autonomous Multi-Agent • Sub-second Context Retrieval",
    sort_order: 3,
    created_at: new Date(2026, 1, 1).toISOString(),
  },
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
    technologies: ["Next.js", "Microservices", "n8n.io", "Python", "Flask", "Node.js", "Redis", "Leadership"],
  },
  {
    id: "exp-2",
    role: "Software Development Intern",
    organization: "WeWin Engineering Services & Suppliers Pvt. Ltd.",
    period: "2024",
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
    period: "2024",
    location: "Remote",
    type: "Internship",
    description: "Developed real-time telemetry dashboards, optimized database indexing, and built responsive customer portals with secure authentication flows.",
    highlights: [
      "Engineered dynamic analytics interfaces consuming live telemetry and customer transaction streams.",
      "Optimized PostgreSQL schema queries and indexing to significantly enhance report rendering speed.",
      "Integrated secure authentication protocols and granular user permission roles."
    ],
    technologies: ["TypeScript", "React", "PostgreSQL", "Tailwind CSS", "Data Telemetry", "REST APIs"],
  },
];

const INITIAL_PROFILE: Profile = {
  bio_text: "Full-stack developer and ML engineer building production-grade systems — from a DPDP Act compliant, multi-tenant SaaS platform to ML-based predictive models with sub-200ms inference. Founded VIT Bhopal's 100th official club and placed 50+ peers into industry internships through direct startup partnerships.",
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

export async function getProjects(): Promise<Project[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) return data as Project[];
    console.error("Supabase error fetching projects:", error);
  }

  // Fallback / Demo Mode
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem("portfolio_projects");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Project[];
        let changed = false;
        parsed.forEach((p) => {
          if (p.github_url === "https://github.com" || p.github_url === "https://github.com/" || !p.github_url) {
            const seed = INITIAL_PROJECTS.find((s) => s.id === p.id);
            if (seed?.github_url) {
              p.github_url = seed.github_url;
              changed = true;
            }
          }
        });
        if (changed) {
          localStorage.setItem("portfolio_projects", JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        // Fall back to INITIAL_PROJECTS if cache is corrupt
      }
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(INITIAL_PROJECTS));
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
    const cached = localStorage.getItem("portfolio_projects");
    const list: Project[] = cached ? JSON.parse(cached) : INITIAL_PROJECTS;
    
    if (project.id) {
      const index = list.findIndex((p: Project) => p.id === project.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...(project as Project) };
      }
    } else {
      const newProj: Project = {
        title: project.title || "",
        description: project.description || "",
        long_description: project.long_description || "",
        technologies: project.technologies || [],
        image_url: project.image_url || "",
        project_url: project.project_url || "",
        github_url: project.github_url || "",
        id: "project-" + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        sort_order: list.length,
      };
      list.push(newProj);
      project = newProj;
    }
    localStorage.setItem("portfolio_projects", JSON.stringify(list));
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
    const cached = localStorage.getItem("portfolio_projects");
    if (cached) {
      const list = (JSON.parse(cached) as Project[]).filter((p: Project) => p.id !== id);
      localStorage.setItem("portfolio_projects", JSON.stringify(list));
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
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
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
