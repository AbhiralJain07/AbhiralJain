import React from "react";
import { Calendar, MapPin, Building2 } from "lucide-react";
import { Experience } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  totalCount?: number;
  className?: string;
}

export default function ExperienceCard({
  experience,
  index,
  totalCount,
  className,
}: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "p-8 md:p-10 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-sm hover:border-accent transition-all duration-500 relative overflow-hidden group shadow-2xl",
        className
      )}
    >
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Info: Type, Period, Location, Role, Organization */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] text-accent uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              {experience.type}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <Calendar size={13} className="text-zinc-500" />
              {experience.period}
            </span>
            {experience.location && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                <MapPin size={13} />
                {experience.location}
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors duration-300">
            {experience.role}
          </h3>

          <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-zinc-300">
            <Building2 size={18} className="text-accent" />
            <span>{experience.organization}</span>
          </div>
        </div>

        {typeof index === "number" && totalCount && (
          <div className="font-mono text-xs text-zinc-600 hidden lg:block">
            0{index + 1} / 0{totalCount}
          </div>
        )}
      </div>

      {/* Responsibilities description */}
      <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-6">
        {experience.description}
      </p>

      {/* Highlights List */}
      {experience.highlights && experience.highlights.length > 0 && (
        <div className="space-y-2.5 mb-8 border-l-2 border-accent/40 pl-4 py-1 bg-accent/[0.02] rounded-r-lg">
          {experience.highlights.map((highlight, hIdx) => (
            <div
              key={hIdx}
              className="flex items-start space-x-2.5 text-xs md:text-sm text-zinc-400 leading-relaxed"
            >
              <span className="text-accent mt-0.5 font-bold">›</span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack badges */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-borderDark/60">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-2">
            Skills Applied:
          </span>
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1 rounded-full border border-borderDark text-[10px] tracking-wider uppercase font-mono text-zinc-300 bg-[#0c0c0e] group-hover:border-zinc-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
