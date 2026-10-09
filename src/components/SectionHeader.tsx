import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  badgeClassName?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  actions,
  className,
  badgeClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Badge with accent line */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-[1px] bg-accent" />
        <span
          className={cn(
            "text-xs tracking-widest uppercase text-accent font-bold font-mono",
            badgeClassName
          )}
        >
          {badge}
        </span>
      </div>

      {/* Main Title and Optional Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          {typeof title === "string" ? (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase leading-tight text-[#f5f5f7]">
              {title}
            </h2>
          ) : (
            title
          )}

          {subtitle && (
            <div className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
              {subtitle}
            </div>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
