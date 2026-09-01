"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import HeroParallax from "@/components/HeroParallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";
import { getProjects, getProfile, Project, Profile } from "@/lib/supabase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lazy-load the interactive 3D Spline Scene to prevent SSR hydration lag
const SplineScene = dynamic(() => import("@/components/ui/splite").then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 font-mono tracking-widest uppercase">
      [ Initializing 3D Scene ]
    </div>
  ),
});

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile>({ bio_text: "", availability_status: true });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Fetch db/local content
  useEffect(() => {
    async function loadData() {
      const projs = await getProjects();
      const prof = await getProfile();
      setProjects(projs);
      setProfile(prof);
    }
    loadData();
  }, []);

  // Monitor scroll for nav capsule transitions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations for page load & ScrollTrigger
  useEffect(() => {
    const gsapContext = gsap.context(() => {
      // 1. Hero text stagger reveal on load (Mask reveal style)
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".reveal-line",
        { y: "120%", skewY: 10 },
        { y: "0%", skewY: 0, duration: 1.2, ease: "power4.out", stagger: 0.1 }
      )
      .fromTo(
        ".reveal-fade",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 },
        "-=0.6"
      );

      // 2. Scroll cue fade on scroll
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

      // 3. Staggered reveal for Project Rows using ScrollTrigger
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 4. Staggered reveal for skills tag grid
      gsap.fromTo(
        ".skill-tag",
        { opacity: 0, scale: 0.85, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => gsapContext.revert();
  }, [projects]);

  // Floating preview image coordinates sync
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveFloatingPreview = (e: MouseEvent) => {
      if (floatingPreviewRef.current && hoveredIndex !== null) {
        gsap.to(floatingPreviewRef.current, {
          x: e.clientX + 30,
          y: e.clientY - 120,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", moveFloatingPreview);
    return () => window.removeEventListener("mousemove", moveFloatingPreview);
  }, [hoveredIndex]);

  // Handle section clicking for smooth scrolling
  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to render static images or stylized icons
  const getProjectImage = (imgKey: string) => {
    if (imgKey === "atithi") return "/projects/atithi.jpg";
    if (imgKey === "crashrisk") return "/projects/crashrisk.jpg";
    // Check if valid URL or path
    if (imgKey?.startsWith("http") || imgKey?.startsWith("/")) return imgKey;
    return null;
  };

  return (
    <main className="relative min-h-screen selection:bg-accent selection:text-black">
      
      {/* --- HEADER / NAVIGATION --- */}
      <header
        className={`fixed z-50 transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? "top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[850px] bg-[#0c0c0e]/85 border border-borderDark backdrop-blur-md px-8 py-3.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.65)]"
            : "top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 mix-blend-difference"
        }`}
      >
        <Link
          href="/"
          className="text-xl font-display font-bold tracking-widest text-[#f5f5f7] hover:text-accent transition-colors duration-300"
        >
          AJ.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-xs tracking-widest uppercase font-medium">
          <Magnetic>
            <button
              onClick={() => handleScrollTo("about")}
              className={`transition-colors py-2 ${scrolled ? "text-zinc-400 hover:text-accent" : "text-[#f5f5f7] hover:text-accent"}`}
            >
              About
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => handleScrollTo("work")}
              className={`transition-colors py-2 ${scrolled ? "text-zinc-400 hover:text-accent" : "text-[#f5f5f7] hover:text-accent"}`}
            >
              Work
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => handleScrollTo("skills")}
              className={`transition-colors py-2 ${scrolled ? "text-zinc-400 hover:text-accent" : "text-[#f5f5f7] hover:text-accent"}`}
            >
              Skills
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => handleScrollTo("contact")}
              className={`transition-colors py-2 ${scrolled ? "text-zinc-400 hover:text-accent" : "text-[#f5f5f7] hover:text-accent"}`}
            >
              Contact
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
              className={`transition-colors py-2 uppercase font-medium text-xs tracking-widest ${
                scrolled ? "text-zinc-400 hover:text-accent" : "text-[#f5f5f7] hover:text-accent"
              }`}
            >
              Terminal
            </button>
          </Magnetic>
          <Magnetic>
            <Link
              href="/admin"
              className={`px-5 py-2 rounded-full border transition-all duration-300 text-xs tracking-widest uppercase font-medium ${
                scrolled
                  ? "border-zinc-700 hover:border-accent hover:text-accent text-zinc-300 bg-[#121214]/50"
                  : "border-[#f5f5f7]/30 hover:border-accent hover:text-accent text-[#f5f5f7]"
              }`}
            >
              CMS Admin
            </Link>
          </Magnetic>
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
            className="text-xs px-3 py-1.5 border border-[#f5f5f7]/20 rounded-full text-[#f5f5f7]"
          >
            CLI
          </button>
          <Link href="/admin" className="text-xs px-3 py-1.5 border border-[#f5f5f7]/20 rounded-full text-[#f5f5f7]">CMS</Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#f5f5f7] p-2">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-12 space-y-8 animate-fade-in md:hidden">
          <button onClick={() => handleScrollTo("about")} className="text-4xl font-display text-left hover:text-accent">01. About</button>
          <button onClick={() => handleScrollTo("work")} className="text-4xl font-display text-left hover:text-accent">02. Selected Work</button>
          <button onClick={() => handleScrollTo("skills")} className="text-4xl font-display text-left hover:text-accent">03. Stack</button>
          <button onClick={() => handleScrollTo("contact")} className="text-4xl font-display text-left hover:text-accent">04. Get In Touch</button>
          <button
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new CustomEvent("toggle-terminal"));
            }}
            className="text-4xl font-display text-left hover:text-accent text-accent"
          >
            05. CLI Console
          </button>
        </div>
      )}

      {/* --- SECTION 1: HERO / INTRO --- */}
      <section ref={heroRef} className="min-h-screen w-full flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-24 pt-32 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Availability Badge */}
          <div className="reveal-fade flex items-center space-x-3 mb-6">
            <span className={`w-2.5 h-2.5 rounded-full ${profile.availability_status ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" : "bg-zinc-500"}`} />
            <span className="text-[10px] tracking-widest font-bold text-zinc-400 uppercase font-sans">
              {profile.availability_status ? "Available for select opportunities" : "Unavailable / Building"}
            </span>
          </div>

          {/* 3D Parallax Photo & Name Reveal */}
          <div className="reveal-fade my-8">
            <HeroParallax />
          </div>

          {/* Subtext info */}
          <div className="reveal-fade grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#f5f5f7]/10">
            <div className="text-zinc-500 text-xs tracking-widest uppercase font-medium">Role</div>
            <div className="text-[#f5f5f7] text-sm md:col-span-2 font-light max-w-lg leading-relaxed">
              Creative Full-Stack Developer & ML Engineer focused on designing production-grade architectures and responsive microservices with sub-200ms inference.
            </div>
          </div>
        </div>

        {/* Scroll cue indicator */}
        <div ref={scrollCueRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none opacity-80 z-10">
          <span className="text-[9px] tracking-widest uppercase text-zinc-600 font-bold">Scroll to explore</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-zinc-600 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-bounce" />
          </div>
        </div>
      </section>

      {/* --- SECTION 2: ABOUT --- */}
      <section id="about" className="min-h-screen w-full flex items-center py-24 px-6 md:px-12 relative overflow-hidden bg-background border-t border-borderDark">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Bio text column */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs tracking-widest uppercase text-accent font-bold">01 / Biography</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight uppercase">
              Engineering systems with micro-level precision.
            </h2>
            
            <div className="text-zinc-400 font-light text-base md:text-lg leading-relaxed space-y-6">
              <p>
                {profile.bio_text || "Full-stack developer and ML engineer building production-grade systems — from a DPDP Act compliant, multi-tenant SaaS platform to ML-based predictive models with sub-200ms inference."}
              </p>
              <p>
                As a researcher and development team lead at <span className="text-[#f5f5f7] font-normal">EvolVIT</span>, I specialize in architecting modern microservices and automating n8n backend pipelines. I enjoy turning complex data pipelines and server designs into highly responsive, visually rich user interfaces.
              </p>
            </div>
          </div>

          {/* 3D Spline Scene canvas */}
          <div className="w-full h-[350px] sm:h-[450px] lg:h-[600px] order-1 lg:order-2 relative flex items-center justify-center">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SELECTED WORK / PROJECTS --- */}
      <section id="work" ref={projectsSectionRef} className="min-h-screen w-full py-24 px-6 md:px-12 bg-background border-t border-borderDark relative">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-xs tracking-widest uppercase text-accent font-bold">02 / Selected Projects</span>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase">
              ({projects.length} Showcased)
            </span>
          </div>

          {/* Project listing */}
          <div className="divide-y divide-borderDark border-y border-borderDark">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                data-cursor="VIEW"
                className="project-row group py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center transition-colors duration-500 hover:bg-[#121214]/30 cursor-none relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Index & Title */}
                <div className="md:col-span-6 flex items-center space-x-6 md:space-x-8">
                  <span className="font-mono text-xs text-zinc-600">0{idx + 1}</span>
                  <Link href={`/projects/${proj.id}`} className="text-2xl md:text-4xl font-display font-medium text-[#f5f5f7] group-hover:text-accent transition-colors duration-300">
                    {proj.title}
                  </Link>
                </div>

                {/* Short description */}
                <div className="md:col-span-4 text-sm text-zinc-400 font-light pr-4 leading-relaxed group-hover:text-[#f5f5f7] transition-colors duration-300">
                  {proj.description}
                </div>

                {/* Action button link */}
                <div className="md:col-span-2 flex md:justify-end">
                  <Link
                    href={`/projects/${proj.id}`}
                    className="p-3.5 rounded-full border border-borderDark group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awwwards style floating review card overlay */}
        {hoveredIndex !== null && projects[hoveredIndex] && (
          <div
            ref={floatingPreviewRef}
            className="pointer-events-none fixed top-0 left-0 z-50 w-[320px] h-[210px] rounded-lg border border-borderDark bg-[#121214] overflow-hidden shadow-2xl transition-opacity duration-300 opacity-100 hidden md:block"
          >
            {/* Sliding ribbon matching hovered index */}
            <div
              className="w-full flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{
                transform: `translateY(-${hoveredIndex * 210}px)`,
                height: `${projects.length * 210}px`,
              }}
            >
              {projects.map((p) => {
                const imgSource = getProjectImage(p.image_url);
                return (
                  <div key={p.id} className="w-full h-[210px] relative bg-zinc-950 flex items-center justify-center">
                    {imgSource ? (
                      <Image
                        src={imgSource}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="320px"
                        priority
                      />
                    ) : (
                      // Backup beautiful grid pattern if no image
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-indigo-900/30 flex flex-col justify-end p-4 border-l-4 border-accent">
                        <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-1">Illustration Map</div>
                        <div className="text-sm font-display font-semibold truncate text-[#f5f5f7]">{p.title}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* --- SECTION 4: SKILLS / STACK --- */}
      <section id="skills" ref={skillsRef} className="w-full py-24 bg-background border-t border-borderDark overflow-hidden relative">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs tracking-widest uppercase text-accent font-bold">03 / Technologies</span>
          </div>
        </div>

        {/* Infinite Marquee Ticker */}
        <div className="w-full border-y border-borderDark py-8 md:py-12 bg-[#0c0c0e]">
          <div className="animate-marquee whitespace-nowrap text-4xl md:text-7xl font-display font-extrabold tracking-tight uppercase flex items-center space-x-12 select-none text-zinc-800">
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="hover:text-accent transition-colors duration-3000">TypeScript</span>
                <span className="text-accent">•</span>
                <span className="hover:text-[#f5f5f7] transition-colors duration-3000">Next.js</span>
                <span className="text-[#f5f5f7]/20">•</span>
                <span className="hover:text-accent transition-colors duration-3000">Python</span>
                <span className="text-accent">•</span>
                <span className="hover:text-[#f5f5f7] transition-colors duration-3000">Machine Learning</span>
                <span className="text-[#f5f5f7]/20">•</span>
                <span className="hover:text-accent transition-colors duration-3000">GSAP</span>
                <span className="text-accent">•</span>
                <span className="hover:text-[#f5f5f7] transition-colors duration-3000">Three.js</span>
                <span className="text-[#f5f5f7]/20">•</span>
                <span className="hover:text-accent transition-colors duration-3000">PostgreSQL</span>
                <span className="text-accent">•</span>
                <span className="hover:text-[#f5f5f7] transition-colors duration-3000">n8n Automation</span>
                <span className="text-[#f5f5f7]/20">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Scattered/Grid tag cloud */}
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 mt-16 flex flex-wrap justify-center gap-3">
          {[
            "React", "Node.js", "Express.js", "Flask", "MongoDB", "PostgreSQL",
            "JWT Auth", "RBAC Security", "DPDP Act Compliance", "InsightFace API",
            "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "Gradient Boosting",
            "Vercel", "Render", "n8n.io", "Git/GitHub", "RabbitMQ", "Clean Architecture",
            "Tailwind CSS", "Framer Motion", "Three.js", "R3F", "Lenis Scroll"
          ].map((tag) => (
            <div
              key={tag}
              className="skill-tag px-6 py-3 rounded-full border border-borderDark bg-[#121214]/40 hover:border-accent hover:bg-accent/5 transition-all duration-300 text-xs tracking-wide uppercase font-medium text-zinc-400 hover:text-[#f5f5f7]"
            >
              {tag}
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 5: CONTACT / FOOTER --- */}
      <section id="contact" className="min-h-[85vh] w-full flex flex-col justify-between py-16 px-6 md:px-12 bg-background border-t border-borderDark relative">
        <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-center text-center">
          
          <div className="flex items-center space-x-2 mb-10">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs tracking-widest uppercase text-accent font-bold">04 / Let&apos;s Connect</span>
          </div>

          {/* Magnetic Giant Text CTA */}
          <div className="mb-12">
            <Magnetic strength={0.25} range={80}>
              <a
                href="mailto:jainabhiral7@gmail.com"
                className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold leading-none tracking-tight uppercase hover:text-accent transition-colors duration-500 block py-6 cursor-none"
              >
                Let&apos;s Build <br /> Something.
              </a>
            </Magnetic>
          </div>

          <Magnetic>
            <a
              href="mailto:jainabhiral7@gmail.com"
              className="flex items-center space-x-3 px-8 py-5 rounded-full border border-[#f5f5f7]/30 hover:border-accent bg-transparent text-[#f5f5f7] hover:text-accent transition-all duration-300 text-sm tracking-widest uppercase font-semibold"
            >
              <Mail size={16} />
              <span>jainabhiral7@gmail.com</span>
            </a>
          </Magnetic>
        </div>

        {/* Small Footer bar */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-borderDark pt-8 text-xs text-zinc-500 font-light gap-4">
          <div>
            © 2026 Abhiral Jain. Built with Next.js 14 & GSAP.
          </div>
          
          {/* Social connections */}
          <div className="flex items-center space-x-8">
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/jainabhiral/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-accent transition-colors"
              >
                <Linkedin size={14} />
                <span className="relative group py-1">
                  LinkedIn
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/AbhiralJain07"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-accent transition-colors"
              >
                <Github size={14} />
                <span className="relative group py-1">
                  GitHub
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}
