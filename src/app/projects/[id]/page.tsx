"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import { Github } from "@/components/Icons";
import gsap from "gsap";
import Magnetic from "@/components/Magnetic";
import { getProjects, Project } from "@/lib/supabase";

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      const list = await getProjects();
      const found = list.find((p: Project) => p.id === id);
      setProject(found || null);
      setLoading(false);
    }
    loadProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      // Stagger details reveal on mount
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );
    }
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center font-mono text-xs uppercase tracking-widest text-zinc-500">
        [ Loading Project details ]
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-2xl font-display font-bold mb-4 uppercase text-[#f5f5f7]">Project Not Found</h1>
        <p className="text-sm text-zinc-500 mb-8 max-w-sm">The project you are looking for does not exist or has been removed from the CMS.</p>
        <Magnetic>
          <Link href="/" className="px-6 py-3 rounded-full border border-accent text-accent text-xs tracking-widest uppercase font-semibold hover:bg-accent hover:text-black transition-colors">
            Back to Home
          </Link>
        </Magnetic>
      </div>
    );
  }

  // Image path negotiation
  const getProjectImage = (imgKey: string) => {
    if (imgKey === "atithi") return "/projects/atithi.jpg";
    if (imgKey === "crashrisk") return "/projects/crashrisk.jpg";
    if (imgKey?.startsWith("http") || imgKey?.startsWith("/")) return imgKey;
    return null;
  };

  const imageSource = getProjectImage(project.image_url);

  return (
    <main className="min-h-screen bg-background text-[#f5f5f7] pb-24 relative overflow-hidden">
      
      {/* Top Banner Navigation */}
      <div className="px-6 py-6 md:px-12 md:py-8 flex items-center justify-between border-b border-borderDark/60 bg-background/50 backdrop-blur-md sticky top-0 z-30">
        <Magnetic>
          <Link href="/" className="flex items-center space-x-2 text-xs tracking-widest uppercase font-bold text-zinc-400 hover:text-accent transition-colors py-2 cursor-none">
            <ArrowLeft size={14} />
            <span>Back to Work</span>
          </Link>
        </Magnetic>
        
        <div className="text-[10px] font-mono text-zinc-500 tracking-wider">
          PROJECT / {project.title.split("—")[0].trim()}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 space-y-16">
        
        {/* Title */}
        <div className="reveal-item max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight uppercase leading-none">
            {project.title}
          </h1>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies?.map((tech: string) => (
              <span key={tech} className="px-4 py-1.5 rounded-full border border-borderDark text-[10px] tracking-wider uppercase font-mono text-zinc-400 bg-[#121214]/50">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Mockup Image */}
        <div className="reveal-item w-full aspect-[16/10] md:aspect-[16/9] relative rounded-2xl overflow-hidden border border-borderDark/80 bg-zinc-950 shadow-2xl">
          {imageSource ? (
            <Image
              src={imageSource}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-indigo-900/30 flex flex-col justify-center items-center p-8">
              <Code size={48} className="text-accent mb-4 animate-pulse" />
              <div className="text-lg font-display text-zinc-400">Mockup Visual Concept</div>
            </div>
          )}
        </div>

        {/* Dynamic Project Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Left Column: Metadata cards */}
          <div className="lg:col-span-4 space-y-8 reveal-item">
            <div className="border-t border-borderDark/60 pt-6">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1.5 font-semibold">Service</div>
              <div className="text-sm font-light text-zinc-300">Software Architecture & Microservices</div>
            </div>
            
            <div className="border-t border-borderDark/60 pt-6">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1.5 font-semibold">Deployment</div>
              <div className="text-sm font-light text-zinc-300">Vercel, Render PaaS Cloud</div>
            </div>

            {project.project_url && (
              <div className="border-t border-borderDark/60 pt-6">
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-semibold">Live Prototype</div>
                <Magnetic>
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-accent text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#00c5dd] transition-all duration-300"
                  >
                    <span>Visit Website</span>
                    <ExternalLink size={12} />
                  </a>
                </Magnetic>
              </div>
            )}
            
            {project.github_url && (
              <div className="border-t border-borderDark/60 pt-6">
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-semibold">Repository</div>
                <Magnetic>
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-borderDark text-zinc-300 hover:border-accent hover:text-accent text-xs font-medium uppercase tracking-wider transition-all duration-300"
                  >
                    <Github size={12} />
                    <span>View on GitHub</span>
                  </a>
                </Magnetic>
              </div>
            )}
          </div>

          {/* Right Column: Long details description */}
          <div className="lg:col-span-8 space-y-6 reveal-item">
            <h3 className="text-xs text-zinc-500 uppercase tracking-widest font-bold">02 / Deep Dive Case Study</h3>
            <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 font-sans">
              {project.long_description || project.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
