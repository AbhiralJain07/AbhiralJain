"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Save,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Code,
  Link as LinkIcon,
  Globe,
} from "lucide-react";
import { Github } from "@/components/Icons";
import Magnetic from "@/components/Magnetic";
import {
  getProjects,
  saveProject,
  deleteProject,
  reorderProjectsInDB,
  getProfile,
  updateProfile,
  isAdminAuthenticated,
  logoutAdmin,
  supabase,
} from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  // Auth gate check
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  const [projects, setProjects] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({ bio_text: "", availability_status: true });
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(true);

  // Forms states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    long_description: "",
    technologies: "",
    image_url: "",
    project_url: "",
    github_url: "",
  });

  const [notification, setNotification] = useState("");

  // Fetch content on mount
  useEffect(() => {
    async function loadData() {
      try {
        const projs = await getProjects();
        const prof = await getProfile();
        setProjects(projs);
        setProfile(prof);
        setIsDemo(!supabase);
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin");
  };

  // --- Profile Actions ---
  const handleSaveProfile = async () => {
    try {
      await updateProfile(profile);
      triggerNotification("Biography & Availability updated successfully!");
    } catch (err) {
      console.error(err);
      triggerNotification("Error updating biography profile.");
    }
  };

  // --- Project Actions ---
  const handleEditProject = (proj: any) => {
    setEditingId(proj.id);
    setProjectForm({
      title: proj.title || "",
      description: proj.description || "",
      long_description: proj.long_description || "",
      technologies: proj.technologies?.join(", ") || "",
      image_url: proj.image_url || "",
      project_url: proj.project_url || "",
      github_url: proj.github_url || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateNewProject = () => {
    setEditingId(null);
    setProjectForm({
      title: "",
      description: "",
      long_description: "",
      technologies: "",
      image_url: "",
      project_url: "",
      github_url: "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedTech = projectForm.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const toSave = {
        ...projectForm,
        id: editingId || undefined,
        technologies: parsedTech,
      };

      const saved = await saveProject(toSave);
      
      // Update local state
      const list = await getProjects();
      setProjects(list);
      
      setShowForm(false);
      setEditingId(null);
      triggerNotification(
        editingId ? "Project updated successfully!" : "New project added successfully!"
      );
    } catch (err) {
      console.error(err);
      triggerNotification("Error saving project.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      triggerNotification("Project deleted successfully.");
    } catch (err) {
      console.error(err);
      triggerNotification("Error deleting project.");
    }
  };

  const moveProject = async (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= projects.length) return;

    const list = [...projects];
    // Swap projects
    const temp = list[index];
    list[index] = list[nextIndex];
    list[nextIndex] = temp;

    setProjects(list);
    await reorderProjectsInDB(list);
    triggerNotification("Projects order updated.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center font-mono text-xs uppercase tracking-widest text-zinc-500">
        [ Loading CMS Workspace ]
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-[#f5f5f7] pb-24 px-6 md:px-12 relative">
      
      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto py-8 flex items-center justify-between border-b border-borderDark/60 sticky top-0 bg-background/80 backdrop-blur-md z-30">
        <div className="flex items-center space-x-4">
          <Magnetic>
            <Link href="/" className="flex items-center space-x-2 text-xs tracking-widest uppercase font-bold text-zinc-400 hover:text-accent transition-colors py-2 cursor-none">
              <ArrowLeft size={14} />
              <span>Site</span>
            </Link>
          </Magnetic>
          
          <span className="text-zinc-600 font-mono">/</span>
          <span className="text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-1.5">
            {isDemo && <Sparkles size={12} />}
            {isDemo ? "Demo Sandbox" : "Supabase CMS Workspace"}
          </span>
        </div>

        <Magnetic>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-red-500/30 hover:bg-red-500/10 text-red-400 text-xs uppercase tracking-widest font-semibold transition-colors cursor-none"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </Magnetic>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Floating Notification */}
        {notification && (
          <div className="fixed bottom-8 right-8 z-[999] p-4 bg-zinc-900 border border-[#00e5ff]/20 text-[#00e5ff] rounded-xl flex items-center space-x-2 text-xs font-mono uppercase tracking-wider shadow-xl animate-slide-up">
            <CheckCircle size={16} />
            <span>{notification}</span>
          </div>
        )}

        {/* LEFT COLUMN: Profile info, bio and availability */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-cardBg border border-borderDark/80 rounded-2xl p-6 space-y-6">
            <h2 className="text-sm uppercase tracking-widest font-bold text-zinc-400 pb-3 border-b border-borderDark">
              Profile Meta Settings
            </h2>

            {/* Bio Editor */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                Biography Paragraph
              </label>
              <textarea
                rows={6}
                className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 text-[#f5f5f7] outline-none transition-colors leading-relaxed"
                value={profile.bio_text}
                onChange={(e) => setProfile({ ...profile, bio_text: e.target.value })}
              />
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between py-2 border-t border-borderDark/60">
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                  Availability Status
                </div>
                <div className="text-xs text-zinc-400 font-light">
                  {profile.availability_status ? "Open to opportunities" : "Full-time occupied"}
                </div>
              </div>
              
              <button
                onClick={() =>
                  setProfile({ ...profile, availability_status: !profile.availability_status })
                }
                className="text-zinc-400 hover:text-accent transition-colors cursor-none"
              >
                {profile.availability_status ? (
                  <ToggleRight size={32} className="text-accent" />
                ) : (
                  <ToggleLeft size={32} className="text-zinc-600" />
                )}
              </button>
            </div>

            {/* Save Profile Button */}
            <button
              onClick={handleSaveProfile}
              className="w-full bg-zinc-950 border border-borderDark hover:border-accent hover:text-accent text-xs uppercase tracking-widest font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Save size={14} />
              <span>Save Meta Settings</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Projects Manager & Project Form Editor */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Form expand zone */}
          {showForm && (
            <div className="bg-cardBg border border-accent/20 rounded-2xl p-6 space-y-6 animate-slide-up">
              <h2 className="text-sm uppercase tracking-widest font-bold text-accent pb-3 border-b border-borderDark">
                {editingId ? "Edit Case Study Project" : "Add New Case Study Project"}
              </h2>

              <form onSubmit={handleSaveProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                      Project Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Atithi — Visitor Management System"
                      className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 text-[#f5f5f7] outline-none"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    />
                  </div>

                  {/* Image Key / URL */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                      Image Key or URL
                    </label>
                    <input
                      type="text"
                      placeholder="atithi or /projects/custom.jpg"
                      className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 text-[#f5f5f7] outline-none"
                      value={projectForm.image_url}
                      onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                    Short Description (For listings card)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Short 1-sentence tag description..."
                    className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 text-[#f5f5f7] outline-none"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                    Technologies (Comma-separated)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="React, TypeScript, Next.js, Node.js"
                      className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 pl-10 text-[#f5f5f7] outline-none"
                      value={projectForm.technologies}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, technologies: e.target.value })
                      }
                    />
                    <Code size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                  </div>
                </div>

                {/* Project Links (GitHub, URL) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                      Live Project URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="https://example.com"
                        className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 pl-10 text-[#f5f5f7] outline-none"
                        value={projectForm.project_url}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, project_url: e.target.value })
                        }
                      />
                      <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                      GitHub Repository URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="https://github.com"
                        className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 pl-10 text-[#f5f5f7] outline-none"
                        value={projectForm.github_url}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, github_url: e.target.value })
                        }
                      />
                      <Github size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
                    </div>
                  </div>
                </div>

                {/* Long description case study */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                    Case Study Detail (Long description)
                  </label>
                  <textarea
                    rows={8}
                    required
                    placeholder="Provide full technical case study breakdown including architectures, databases, ML details..."
                    className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 text-[#f5f5f7] outline-none leading-relaxed"
                    value={projectForm.long_description}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, long_description: e.target.value })
                    }
                  />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className="px-5 py-2.5 rounded-xl border border-borderDark text-zinc-400 text-xs font-semibold uppercase tracking-wider hover:bg-zinc-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-accent text-black text-xs font-bold uppercase tracking-wider hover:bg-[#00c5dd] transition-colors"
                  >
                    Save Project Case Study
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Projects manager card container */}
          <div className="bg-cardBg border border-borderDark/80 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-borderDark">
              <h2 className="text-sm uppercase tracking-widest font-bold text-zinc-400">
                Showcase Projects
              </h2>
              {!showForm && (
                <button
                  onClick={handleCreateNewProject}
                  className="flex items-center space-x-1.5 text-xs text-accent font-semibold hover:underline"
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              )}
            </div>

            {/* List */}
            {projects.length === 0 ? (
              <div className="text-center py-10 text-xs text-zinc-600 font-mono uppercase">
                [ No projects listed. Click Add Project to start ]
              </div>
            ) : (
              <div className="divide-y divide-borderDark/60">
                {projects.map((p, idx) => (
                  <div key={p.id} className="py-4 flex items-center justify-between gap-4">
                    {/* Index, name, technologies */}
                    <div className="min-w-0 flex-grow space-y-1">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-[10px] font-mono text-zinc-600">0{idx + 1}</span>
                        <div className="text-sm font-semibold truncate text-[#f5f5f7]">
                          {p.title}
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500 font-light truncate max-w-md">
                        {p.technologies?.join(" • ")}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-2 shrink-0">
                      {/* Sort arrows */}
                      <button
                        onClick={() => moveProject(idx, "up")}
                        disabled={idx === 0}
                        className={`p-2 rounded border border-borderDark ${
                          idx === 0 ? "text-zinc-700 cursor-not-allowed" : "text-zinc-400 hover:text-accent hover:border-accent/40"
                        }`}
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => moveProject(idx, "down")}
                        disabled={idx === projects.length - 1}
                        className={`p-2 rounded border border-borderDark ${
                          idx === projects.length - 1 ? "text-zinc-700 cursor-not-allowed" : "text-zinc-400 hover:text-accent hover:border-accent/40"
                        }`}
                      >
                        <ArrowDown size={12} />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleEditProject(p)}
                        className="p-2 rounded border border-borderDark text-zinc-400 hover:text-accent hover:border-accent/40"
                      >
                        <Edit2 size={12} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 rounded border border-red-950 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
