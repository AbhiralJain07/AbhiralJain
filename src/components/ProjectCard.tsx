import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Layers, ChevronRight } from "lucide-react";
import { Github } from "@/components/Icons";
import Magnetic from "@/components/Magnetic";
import { Project } from "@/lib/data";
import { getProjectImage, cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  showCaseStudyLink?: boolean;
}

export default function ProjectCard({
  project,
  className,
  showCaseStudyLink = true,
}: ProjectCardProps) {
  const imgSource = getProjectImage(project.image_url);
  const hasLiveDemo =
    project.project_url &&
    project.project_url.trim() !== "" &&
    !project.project_url.includes("github.com") &&
    project.project_url !== "#";

  return (
    <div
      className={cn(
        "group rounded-2xl border border-borderDark bg-[#121214]/80 hover:bg-[#141418] hover:border-accent transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl relative",
        className
      )}
    >
      {/* Image Banner / Canvas Preview */}
      <div className="w-full h-56 relative bg-zinc-950 overflow-hidden border-b border-borderDark">
        {imgSource ? (
          <Image
            src={imgSource}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-black p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                {project.category || "Architecture"}
              </span>
              <Layers size={18} className="text-zinc-600" />
            </div>
            <div>
              <div className="text-xs font-mono text-zinc-500 uppercase">
                System Architecture
              </div>
              <div className="text-xl font-display font-bold text-white">
                {project.title}
              </div>
            </div>
          </div>
        )}

        {/* Category Pill on image */}
        {project.category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5f5f7] px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
              {project.category}
            </span>
          </div>
        )}

        {/* Metrics Badge */}
        {project.metrics && (
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <span className="text-[10px] font-mono text-cyan-300 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/20 inline-block">
              ⚡ {project.metrics}
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-7 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <Link
            href={`/projects/${project.id}`}
            className="text-2xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors block"
          >
            {project.title}
          </Link>

          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech stack badges & Actions */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.map((tech) => (
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
              {/* GitHub Repo Button */}
              {project.github_url && (
                <Magnetic strength={0.2} range={40}>
                  <a
                    href={project.github_url}
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

              {/* Live Deployed Project Button */}
              {hasLiveDemo && (
                <Magnetic strength={0.2} range={40}>
                  <a
                    href={project.project_url}
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
            {showCaseStudyLink && (
              <Link
                href={`/projects/${project.id}`}
                className="text-xs font-mono text-zinc-500 hover:text-accent flex items-center gap-1 transition-colors"
              >
                <span>Case Study</span>
                <ChevronRight size={13} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
