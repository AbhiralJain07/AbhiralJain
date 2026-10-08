"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ExternalLink,
  Award,
  Users,
  Cpu,
  ShieldCheck,
  Building2,
  Calendar,
  MapPin,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Github } from "@/components/Icons";
import Magnetic from "@/components/Magnetic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getProjects,
  getExperiences,
  Project,
  Experience,
} from "@/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECT_CATEGORIES = [
  "All",
  "Full-Stack & Security",
  "Machine Learning & AI",
  "Cloud & Automation",
];

export default function ExperienceProjectsPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const headerRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const exps = await getExperiences();
      const projs = await getProjects();
      setExperiences(exps);
      setProjects(projs);
    }
    loadData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        ".page-header-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );

      // Experience timeline cards
      gsap.fromTo(
        ".exp-timeline-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: expRef.current,
            start: "top 80%",
          },
        }
      );

      // Project cards
      gsap.fromTo(
        ".project-card-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: projRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [experiences, projects, selectedCategory]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === selectedCategory ||
            p.technologies?.some((t) =>
              t.toLowerCase().includes(selectedCategory.toLowerCase())
            )
        );

  const getProjectImage = (imgKey: string) => {
    if (imgKey === "atithi") return "/projects/atithi.jpg";
    if (imgKey === "crashrisk") return "/projects/crashrisk.jpg";
    if (imgKey === "itsm" || imgKey === "flowsync") return "/projects/itsm.jpg";
    if (imgKey?.startsWith("http") || imgKey?.startsWith("/")) return imgKey;
    return null;
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#f5f5f7] pt-28 md:pt-36 pb-24 selection:bg-accent selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      {/* --- PAGE HEADER --- */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="flex items-center space-x-2 mb-4 page-header-anim">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-xs tracking-widest uppercase text-accent font-bold font-mono">
            01 / Professional Journey & Works
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 page-header-anim">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase leading-[1.05] tracking-tight">
              Experience & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-200 to-white">
                Featured Projects.
              </span>
            </h1>
            <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed">
              A comprehensive showcase of my roles at EvolVIT, WeWin, and DataTrack, combined with production-grade engineering applications built with sub-200ms inference and full-stack rigor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#experience-section"
              className="px-5 py-2.5 rounded-full border border-borderDark hover:border-accent bg-[#121214]/60 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              ↓ Experience
            </a>
            <a
              href="#projects-section"
              className="px-5 py-2.5 rounded-full bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300"
            >
              ↓ Projects
            </a>
          </div>
        </div>

        {/* Executive Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 page-header-anim">
          <div className="p-6 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-md relative overflow-hidden group hover:border-accent transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <Users className="text-accent mb-3" size={22} />
            <div className="text-3xl md:text-4xl font-display font-extrabold text-[#f5f5f7] mb-1">
              50+
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Peers Placed in Internships
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-md relative overflow-hidden group hover:border-accent transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <Award className="text-accent mb-3" size={22} />
            <div className="text-3xl md:text-4xl font-display font-extrabold text-[#f5f5f7] mb-1">
              100th
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Official University Club
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-md relative overflow-hidden group hover:border-accent transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <Cpu className="text-accent mb-3" size={22} />
            <div className="text-3xl md:text-4xl font-display font-extrabold text-[#f5f5f7] mb-1">
              &lt;200ms
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              ML Inference Latency
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-md relative overflow-hidden group hover:border-accent transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            <ShieldCheck className="text-accent mb-3" size={22} />
            <div className="text-3xl md:text-4xl font-display font-extrabold text-[#f5f5f7] mb-1">
              99.9%
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Pipeline Reliability
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: EXPERIENCE SECTION --- */}
      <section
        id="experience-section"
        ref={expRef}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-borderDark"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs tracking-widest uppercase text-accent font-bold font-mono">
                Career & Leadership
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase leading-tight">
              Work Experience.
            </h2>
          </div>
          <p className="text-zinc-400 font-light text-sm md:text-base max-w-md">
            Direct industry internships, software engineering responsibilities, and leadership roles in student tech communities.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="exp-timeline-card p-8 md:p-10 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-sm hover:border-accent transition-all duration-500 relative overflow-hidden group shadow-2xl"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] text-accent uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <Calendar size={13} className="text-zinc-500" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors duration-300">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-zinc-300">
                    <Building2 size={18} className="text-accent" />
                    <span>{exp.organization}</span>
                  </div>
                </div>

                <div className="font-mono text-xs text-zinc-600 hidden lg:block">
                  0{idx + 1} / 0{experiences.length}
                </div>
              </div>

              {/* Responsibilities description */}
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 mb-8 border-l-2 border-accent/40 pl-4 py-1 bg-accent/[0.02] rounded-r-lg">
                {exp.highlights?.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start space-x-2.5 text-xs md:text-sm text-zinc-400 leading-relaxed"
                  >
                    <span className="text-accent mt-0.5 font-bold">›</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack badges */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-borderDark/60">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">
                  Skills Applied:
                </span>
                {exp.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1 rounded-full border border-borderDark text-[10px] tracking-wider uppercase font-mono text-zinc-300 bg-[#0c0c0e] group-hover:border-zinc-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: PROJECTS SECTION --- */}
      <section
        id="projects-section"
        ref={projRef}
        className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-borderDark"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs tracking-widest uppercase text-accent font-bold font-mono">
                Production Implementations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase leading-tight">
              Featured Projects.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121214]/90 p-1.5 rounded-full border border-borderDark">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] uppercase font-mono tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-accent text-black font-bold shadow-[0_0_15px_rgba(0,229,255,0.35)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => {
            const imgSource = getProjectImage(proj.image_url);
            const hasLiveDemo =
              proj.project_url &&
              proj.project_url.trim() !== "" &&
              !proj.project_url.includes("github.com") &&
              proj.project_url !== "#";

            return (
              <div
                key={proj.id}
                className="project-card-anim group rounded-2xl border border-borderDark bg-[#121214]/80 hover:bg-[#141418] hover:border-accent transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl relative"
              >
                {/* Image Banner / Canvas Preview */}
                <div className="w-full h-56 relative bg-zinc-950 overflow-hidden border-b border-borderDark">
                  {imgSource ? (
                    <Image
                      src={imgSource}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-black p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-accent uppercase tracking-widest px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                          {proj.category || "Architecture"}
                        </span>
                        <Layers size={18} className="text-zinc-600" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-zinc-500 uppercase">
                          System Architecture
                        </div>
                        <div className="text-xl font-display font-bold text-white">
                          {proj.title}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Category Pill on image */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5f5f7] px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                      {proj.category}
                    </span>
                  </div>

                  {proj.metrics && (
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <span className="text-[10px] font-mono text-cyan-300 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/20 inline-block">
                        ⚡ {proj.metrics}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-7 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/projects/${proj.id}`}
                        className="text-2xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors block"
                      >
                        {proj.title}
                      </Link>
                    </div>

                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-zinc-400 px-2.5 py-1 rounded bg-[#0c0c0e] border border-borderDark group-hover:border-zinc-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: GitHub & Live Demo */}
                    <div className="pt-4 border-t border-borderDark/60 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {/* GitHub Repo Button - Always working link */}
                        {proj.github_url && (
                          <Magnetic strength={0.2} range={40}>
                            <a
                              href={proj.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-borderDark hover:border-accent bg-[#0c0c0e] text-zinc-300 hover:text-accent text-xs font-mono transition-all duration-300"
                              title="View Source on GitHub"
                            >
                              <Github size={13} />
                              <span>GitHub</span>
                              <ArrowUpRight size={12} />
                            </a>
                          </Magnetic>
                        )}

                        {/* Live Deployed Project Button - Only rendered when actual live demo exists */}
                        {hasLiveDemo && (
                          <Magnetic strength={0.2} range={40}>
                            <a
                              href={proj.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-accent text-black font-semibold text-xs font-mono hover:bg-[#00c5dd] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300"
                              title="Open Live Deployed Application"
                            >
                              <ExternalLink size={13} />
                              <span>Live Demo</span>
                            </a>
                          </Magnetic>
                        )}
                      </div>

                      {/* Detail Case Study link */}
                      <Link
                        href={`/projects/${proj.id}`}
                        className="text-xs font-mono text-zinc-500 hover:text-accent flex items-center gap-1 transition-colors"
                      >
                        <span>Case Study</span>
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-borderDark flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-display font-semibold text-[#f5f5f7]">
            Want to see the tech stack or inspect my resume?
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Explore the categorized technologies and download the official PDF.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Magnetic strength={0.3} range={50}>
            <Link
              href="/tech-stack-resume"
              className="px-6 py-3 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] transition-all"
            >
              Tech Stack & Resume →
            </Link>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}
