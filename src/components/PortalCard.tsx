import React from "react";
import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortalCardProps {
  href: string;
  icon: LucideIcon;
  pageNumber: string;
  title: string;
  description: string;
  actionText: string;
  className?: string;
}

export default function PortalCard({
  href,
  icon: Icon,
  pageNumber,
  title,
  description,
  actionText,
  className,
}: PortalCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "portal-card group p-8 rounded-2xl border border-borderDark bg-[#121214]/80 hover:bg-[#151518] hover:border-accent transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-xl",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
            <Icon size={22} />
          </div>
          <span className="font-mono text-xs text-zinc-500 group-hover:text-accent transition-colors">
            {pageNumber} / PAGE
          </span>
        </div>

        <h3 className="text-2xl font-display font-bold text-[#f5f5f7] group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-sm text-zinc-400 font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-accent font-semibold">
        <span>{actionText}</span>
        <ArrowUpRight
          size={16}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
        />
      </div>
    </Link>
  );
}
