"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import SectionHeader from "@/components/SectionHeader";
import TechCategoryCard from "@/components/TechCategoryCard";
import { TECH_CATEGORIES, ALL_SKILL_TAGS } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechStackResumePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".page-header-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );

      // Category cards
      gsap.fromTo(
        ".tech-category-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );

      // Skill tags cloud
      gsap.fromTo(
        ".skill-cloud-tag",
        { opacity: 0, scale: 0.85, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: ".skill-cloud-container",
            start: "top 85%",
          },
        }
      );

      // Resume card reveal
      gsap.fromTo(
        ".resume-card-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: resumeRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#f5f5f7] pt-28 md:pt-36 pb-24 selection:bg-accent selection:text-black">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      {/* --- PAGE HEADER --- */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <SectionHeader
          className="page-header-anim"
          badge="02 / Capabilities & Credentials"
          title={
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase leading-[1.05] tracking-tight">
              Tech Stack & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-200 to-white">
                Official Resume.
              </span>
            </h1>
          }
          subtitle="Curated stack of full-stack web, machine learning, and automation frameworks utilized across production deployments, alongside the downloadable official curriculum vitae."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#resume-section"
                className="px-6 py-3 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 flex items-center gap-2"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>
              <a
                href="#tech-section"
                className="px-5 py-3 rounded-full border border-borderDark hover:border-accent bg-[#121214]/60 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all duration-300"
              >
                Explore Stack ↓
              </a>
            </div>
          }
        />
      </section>

      {/* --- SECTION 1: INFINITE MARQUEE TICKER --- */}
      <section className="w-full border-y border-borderDark py-8 md:py-10 bg-[#0c0c0e] overflow-hidden my-12">
        <div className="animate-marquee whitespace-nowrap text-3xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight uppercase flex items-center space-x-12 select-none text-zinc-800">
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="hover:text-accent transition-colors duration-300">TypeScript</span>
              <span className="text-accent">•</span>
              <span className="hover:text-[#f5f5f7] transition-colors duration-300">Next.js 14</span>
              <span className="text-[#f5f5f7]/20">•</span>
              <span className="hover:text-accent transition-colors duration-300">Python</span>
              <span className="text-accent">•</span>
              <span className="hover:text-[#f5f5f7] transition-colors duration-300">Machine Learning</span>
              <span className="text-[#f5f5f7]/20">•</span>
              <span className="hover:text-accent transition-colors duration-300">GSAP & Three.js</span>
              <span className="text-accent">•</span>
              <span className="hover:text-[#f5f5f7] transition-colors duration-300">PostgreSQL</span>
              <span className="text-accent">•</span>
              <span className="hover:text-accent transition-colors duration-300">n8n Automation</span>
              <span className="text-[#f5f5f7]/20">•</span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* --- SECTION 2: CATEGORIZED TECH ARCHITECTURE --- */}
      <section id="tech-section" ref={skillsRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <SectionHeader
          className="mb-12"
          badge="Architectural Breakdown"
          title="Technologies by Domain."
          subtitle="Organized across frontend, backend microservices, ML modeling, and cloud pipeline automation."
        />

        {/* 6 Grid Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((cat) => (
            <TechCategoryCard
              key={cat.title}
              category={cat}
              className="tech-category-card"
            />
          ))}
        </div>

        {/* Full Tag Cloud */}
        <div className="skill-cloud-container mt-16 pt-12 border-t border-borderDark/60">
          <div className="text-center mb-8 space-y-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Quick Index of All Verified Technologies
            </span>
            <h3 className="text-xl font-display font-bold uppercase text-[#f5f5f7]">
              Comprehensive Skill Matrix
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
            {ALL_SKILL_TAGS.map((tag) => (
              <div
                key={tag}
                className="skill-cloud-tag px-5 py-2.5 rounded-full border border-borderDark bg-[#121214]/80 hover:border-accent hover:bg-accent/10 hover:text-white transition-all duration-300 text-xs tracking-wide uppercase font-mono text-zinc-400"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: DEDICATED RESUME SECTION --- */}
      <section
        id="resume-section"
        ref={resumeRef}
        className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-borderDark"
      >
        <SectionHeader
          className="mb-12"
          badge="Official Document"
          title="Curriculum Vitae / Resume."
          subtitle="Verified qualifications, education at VIT Bhopal University, project history, and core competencies formatted for recruitment and technical evaluations."
        />

        {/* Featured Resume Showcase Card */}
        <div className="resume-card-anim rounded-3xl border border-borderDark bg-gradient-to-br from-[#121214] via-[#101012] to-[#0a0a0c] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Summary & Meta */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-[#f5f5f7]">
                    Abhiral Jain — Resume
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    Full-Stack Developer & Machine Learning Engineer • Latest 2026 Edition
                  </p>
                </div>
              </div>

              {/* Verified Highlights Checklist */}
              <div className="space-y-3.5 bg-[#0c0c0e]/80 p-6 rounded-2xl border border-borderDark/80">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-xs md:text-sm text-zinc-300">
                    <span className="font-semibold text-white">Education:</span> VIT Bhopal University — B.Tech in Computer Science & Engineering
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-xs md:text-sm text-zinc-300">
                    <span className="font-semibold text-white">Industry Experience:</span> EvolVIT (President), WeWin Engineering (Software Intern), DataTrack (Full Stack Intern)
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-xs md:text-sm text-zinc-300">
                    <span className="font-semibold text-white">Key Projects:</span> Atithi (DPDP-compliant VMS, Face Recognition), CrashRisk (ML Aviation Risk Simulator)
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-xs md:text-sm text-zinc-300">
                    <span className="font-semibold text-white">Leadership Impact:</span> Founded 100th Official University Club, placed 50+ student peers into internships
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Magnetic strength={0.3} range={60}>
                  <a
                    href="/Abhiral_Jain_Resume.pdf"
                    download="Abhiral_Jain_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300"
                  >
                    <Download size={16} />
                    <span>Download Official PDF</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3} range={60}>
                  <a
                    href="/Abhiral_Jain_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-4 rounded-full border border-borderDark hover:border-accent bg-[#121214]/60 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={14} />
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Right Column: Interactive PDF Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-borderDark/80 bg-[#0c0c0e] p-6 shadow-2xl space-y-6 relative group hover:border-accent/60 transition-all duration-500">
                <div className="flex items-center justify-between border-b border-borderDark pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    Abhiral_Jain_Resume.pdf
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs text-zinc-400 bg-[#121214]/60 p-5 rounded-xl border border-borderDark/60">
                  <div className="text-white font-display font-bold text-base">
                    ABHIRAL JAIN
                  </div>
                  <div className="text-accent text-[11px]">
                    jainabhiral7@gmail.com • github.com/AbhiralJain07
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Bhopal, MP, India • linkedin.com/in/jainabhiral
                  </div>
                  <hr className="border-borderDark" />
                  <div className="space-y-1">
                    <div className="text-zinc-300 font-semibold uppercase text-[10px] tracking-wider text-accent">
                      Executive Summary
                    </div>
                    <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      Creative Full-Stack Developer & ML Engineer experienced in building production SaaS platforms, microservices, and predictive ML models with sub-200ms latency.
                    </div>
                  </div>
                </div>

                <a
                  href="/Abhiral_Jain_Resume.pdf"
                  download="Abhiral_Jain_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent hover:text-black text-accent text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Download size={14} />
                  <span>Click to Download File</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOTTOM NAVIGATION LINK --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-borderDark flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-display font-semibold text-[#f5f5f7]">
            Ready to discuss a project or opportunity?
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Direct communication channels are available on the contact page.
          </p>
        </div>

        <Magnetic strength={0.3} range={50}>
          <Link
            href="/get-in-touch"
            className="px-6 py-3 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] transition-all"
          >
            Get in Touch →
          </Link>
        </Magnetic>
      </section>
    </main>
  );
}
