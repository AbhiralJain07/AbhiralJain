"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import SectionHeader from "@/components/SectionHeader";
import MetricsGrid from "@/components/MetricsGrid";
import CategoryFilter from "@/components/CategoryFilter";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getProjects,
  getExperiences,
  Project,
  Experience,
} from "@/lib/data";
import { PROJECT_CATEGORIES } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExperienceProjectsPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const headerRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const [exps, projs] = await Promise.all([getExperiences(), getProjects()]);
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

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#f5f5f7] pt-28 md:pt-36 pb-24 selection:bg-accent selection:text-black">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      {/* --- PAGE HEADER --- */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <SectionHeader
          className="page-header-anim"
          badge="01 / Professional Journey & Works"
          title={
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase leading-[1.05] tracking-tight">
              Experience & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-200 to-white">
                Featured Projects.
              </span>
            </h1>
          }
          subtitle="A comprehensive showcase of my roles at EvolVIT, WeWin, and DataTrack, combined with production-grade engineering applications built with sub-200ms inference and full-stack rigor."
          actions={
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
          }
        />

        {/* Executive Metrics Strip */}
        <div className="mt-16 page-header-anim">
          <MetricsGrid />
        </div>
      </section>

      {/* --- SECTION 1: EXPERIENCE SECTION --- */}
      <section
        id="experience-section"
        ref={expRef}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-borderDark"
      >
        <SectionHeader
          className="mb-16"
          badge="Career & Leadership"
          title="Work Experience."
          subtitle="Direct industry internships, software engineering responsibilities, and leadership roles in student tech communities."
        />

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={idx}
              totalCount={experiences.length}
              className="exp-timeline-card"
            />
          ))}
        </div>
      </section>

      {/* --- SECTION 2: PROJECTS SECTION --- */}
      <section
        id="projects-section"
        ref={projRef}
        className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-borderDark"
      >
        <SectionHeader
          className="mb-12"
          badge="Production Implementations"
          title="Featured Projects."
          actions={
            <CategoryFilter
              categories={PROJECT_CATEGORIES as unknown as string[]}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          }
        />

        {/* Project Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              className="project-card-anim"
            />
          ))}
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
