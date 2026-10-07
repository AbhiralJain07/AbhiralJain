"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Layers,
  Send,
  Sparkles,
  ShieldCheck,
  Cpu,
  Users,
  Award,
} from "lucide-react";
import HeroParallax from "@/components/HeroParallax";
import InteractivePhotoCard from "@/components/InteractivePhotoCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import { getProfile, Profile } from "@/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    bio_text: "",
    availability_status: true,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const portalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const prof = await getProfile();
      setProfile(prof);
    }
    loadData();
  }, []);

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".reveal-line",
        { y: "120%", skewY: 10 },
        { y: "0%", skewY: 0, duration: 1.2, ease: "power4.out", stagger: 0.1 }
      ).fromTo(
        ".reveal-fade",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 },
        "-=0.6"
      );

      if (scrollCueRef.current) {
        gsap.to(scrollCueRef.current, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom 80%",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".portal-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: portalSectionRef.current,
            start: "top 75%",
          },
        }
      );
    });

    return () => gsapContext.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0b0b0c] text-[#f5f5f7] selection:bg-accent selection:text-black">
      
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[140px] -z-10" />

      {/* --- SECTION 1: HERO / INTRO CONTENT --- */}
      <section
        ref={heroRef}
        className="min-h-[92vh] w-full flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto relative"
      >
        {/* Top Status Bar: Availability Badge + Edition Tag */}
        <div className="reveal-fade flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                profile.availability_status
                  ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"
                  : "bg-zinc-500"
              }`}
            />
            <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase font-mono">
              {profile.availability_status
                ? "Available for select engineering opportunities"
                : "Unavailable / In Build Mode"}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border border-borderDark/80 px-3 py-1 rounded-full bg-[#121214]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>PORTFOLIO // 2026 EDITION</span>
          </div>
        </div>

        {/* Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-4">
          
          {/* Left Column: Identity, Role, Value Prop, CTAs & Specs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Professional Identity Badge */}
            <div className="reveal-fade inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.08)]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-mono text-xs font-semibold uppercase tracking-wider">
                AI/ML Engineer & Full-Stack Developer
              </span>
            </div>

            {/* Main Name Heading */}
            <div className="reveal-fade space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.25rem] font-display font-extrabold uppercase tracking-tight leading-[0.92]">
                <span className="text-[#f5f5f7]">ABHIRAL</span>{" "}
                <span className="text-accent drop-shadow-[0_0_30px_rgba(0,229,255,0.45)]">JAIN</span>
              </h1>
            </div>

            {/* Value Proposition */}
            <p className="reveal-fade text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-xl">
              I build intelligent products at the intersection of AI, software engineering, and real-world systems.
            </p>

            {/* Hero CTAs */}
            <div className="reveal-fade flex flex-wrap items-center gap-4 pt-1">
              <Magnetic strength={0.3} range={70}>
                <Link
                  href="/experience-projects"
                  className="group inline-flex items-center space-x-2.5 px-7 py-4 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] hover:shadow-[0_0_25px_rgba(0,229,255,0.45)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>VIEW MY WORK</span>
                  <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Magnetic>

              <Magnetic strength={0.3} range={70}>
                <a
                  href="/Abhiral_Jain_Resume.pdf"
                  download="Abhiral_Jain_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-2.5 px-7 py-4 rounded-full border border-borderDark hover:border-accent bg-[#121214]/80 hover:bg-[#151518] text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>DOWNLOAD RESUME</span>
                  <span className="text-sm font-bold transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </a>
              </Magnetic>
            </div>

            {/* Quick Tech Spec Telemetry Bar */}
            <div className="reveal-fade pt-4 border-t border-borderDark/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[#f5f5f7] font-semibold">&lt;200ms</span>
                <span>ML Inference</span>
              </div>
              <div className="hidden sm:block text-zinc-600">•</div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[#f5f5f7] font-semibold">DPDP Compliant</span>
                <span>Microservices</span>
              </div>
              <div className="hidden sm:block text-zinc-600">•</div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[#f5f5f7] font-semibold">EvolVIT</span>
                <span>Dev Lead</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive HUD Portrait Card */}
          <div className="lg:col-span-5 reveal-fade flex items-center justify-center">
            <HeroParallax />
          </div>

        </div>

        {/* Scroll cue indicator */}
        <div
          ref={scrollCueRef}
          className="flex flex-col items-center space-y-2 pointer-events-none opacity-80 pt-4"
        >
          <span className="text-[9px] tracking-widest uppercase text-zinc-500 font-mono">
            Scroll to explore
          </span>
          <div className="h-7 w-[1px] bg-gradient-to-b from-zinc-600 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce" />
          </div>
        </div>
      </section>

      {/* --- SECTION 2: BIOGRAPHY & 3D INTERACTION --- */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="w-full flex items-center py-24 px-6 md:px-12 border-t border-borderDark relative"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Bio text column */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs tracking-widest uppercase text-accent font-bold font-mono">
                01 / Biography
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight uppercase">
              Building software that actually solves real problems.
            </h2>

            <div className="text-zinc-400 font-light text-base md:text-lg leading-relaxed space-y-6">
              <p>
                {profile.bio_text ||
                  "I'm a developer who loves turning real-world problems into clean, fast, and reliable software. Whether I'm training ML models to predict risk or building full-stack platforms from scratch, I focus on practical tools that genuinely help people."}
              </p>
              <p>
                As President of <span className="text-[#f5f5f7] font-semibold">EvolVIT</span> at VIT Bhopal, I spend a lot of my time mentoring fellow students, organizing hands-on hack nights, and helping peers land engineering internships. Outside of shipping code, I enjoy experimenting with open-source tools, tinkering with automation workflows, and brainstorming new project ideas.
              </p>
            </div>

            {/* Core quick stats pill bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-xl border border-borderDark bg-[#121214]/60">
                <Users className="text-accent mb-1" size={16} />
                <div className="text-xl font-display font-bold text-[#f5f5f7]">50+</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Peers Mentored</div>
              </div>
              <div className="p-3.5 rounded-xl border border-borderDark bg-[#121214]/60">
                <Award className="text-accent mb-1" size={16} />
                <div className="text-xl font-display font-bold text-[#f5f5f7]">100th</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Club Founded</div>
              </div>
              <div className="p-3.5 rounded-xl border border-borderDark bg-[#121214]/60">
                <Cpu className="text-accent mb-1" size={16} />
                <div className="text-xl font-display font-bold text-[#f5f5f7]">&lt;200ms</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">ML Latency</div>
              </div>
              <div className="p-3.5 rounded-xl border border-borderDark bg-[#121214]/60">
                <ShieldCheck className="text-accent mb-1" size={16} />
                <div className="text-xl font-display font-bold text-[#f5f5f7]">DPDP</div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Act Compliant</div>
              </div>
            </div>
          </div>

          {/* Interactive Screen-Tracking 3D Photo Component */}
          <div className="w-full order-1 lg:order-2 flex items-center justify-center">
            <InteractivePhotoCard />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: MULTI-PAGE PORTAL DIRECTORY --- */}
      <section
        ref={portalSectionRef}
        className="w-full py-24 px-6 md:px-12 border-t border-borderDark relative bg-gradient-to-b from-transparent via-[#0f0f12] to-transparent"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-[1px] bg-accent" />
                <span className="text-xs tracking-widest uppercase text-accent font-bold font-mono">
                  02 / Site Directory
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase leading-tight">
                Explore Dedicated Sections.
              </h2>
            </div>
            <p className="text-zinc-400 font-light text-sm md:text-base max-w-md">
              Navigate through focused pages dedicated to industry experience, production projects, verified skills, and direct contact.
            </p>
          </div>

          {/* 3 Primary Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Experience & Projects */}
            <Link
              href="/experience-projects"
              className="portal-card group p-8 rounded-2xl border border-borderDark bg-[#121214]/80 hover:bg-[#151518] hover:border-accent transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    <Briefcase size={22} />
                  </div>
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-accent transition-colors">
                    01 / PAGE
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors">
                  Experience & Projects
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Career trajectory at EvolVIT, WeWin, and DataTrack, coupled with deep-dives into production software like Atithi & CrashRisk.
                </p>
              </div>

              <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <span>View Timeline & Works</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Tech Stack & Resume */}
            <Link
              href="/tech-stack-resume"
              className="portal-card group p-8 rounded-2xl border border-borderDark bg-[#121214]/80 hover:bg-[#151518] hover:border-accent transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    <Layers size={22} />
                  </div>
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-accent transition-colors">
                    02 / PAGE
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors">
                  Tech Stack & Resume
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Interactive technology breakdown, marquee animations, architectural toolsets, and immediate official resume PDF download.
                </p>
              </div>

              <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <span>Inspect Stack & Download CV</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Get in Touch */}
            <Link
              href="/get-in-touch"
              className="portal-card group p-8 rounded-2xl border border-borderDark bg-[#121214]/80 hover:bg-[#151518] hover:border-accent transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    <Send size={22} />
                  </div>
                  <span className="font-mono text-xs text-zinc-500 group-hover:text-accent transition-colors">
                    03 / PAGE
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors">
                  Get in Touch
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  Direct email communication, verified LinkedIn & GitHub coordinates, and instant contact channels for collaborations.
                </p>
              </div>

              <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <span>Initiate Contact</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CALL TO ACTION BANNER --- */}
      <section className="w-full py-20 px-6 md:px-12 border-t border-borderDark relative text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Open for select technical roles</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase leading-tight">
            Ready to build resilient, <br className="hidden sm:inline" /> high-impact software?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3} range={60}>
              <Link
                href="/experience-projects"
                className="px-8 py-4 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300"
              >
                Explore Experience & Projects
              </Link>
            </Magnetic>
            <Magnetic strength={0.3} range={60}>
              <Link
                href="/get-in-touch"
                className="px-8 py-4 rounded-full border border-borderDark hover:border-accent bg-[#121214]/60 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              >
                Send a Message
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
