import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TechCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

interface TechCategoryCardProps {
  category: TechCategory;
  className?: string;
}

export default function TechCategoryCard({
  category,
  className,
}: TechCategoryCardProps) {
  const Icon = category.icon;

  return (
    <div
      className={cn(
        "p-6 md:p-8 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-md hover:border-accent transition-all duration-300 relative group flex flex-col justify-between shadow-xl",
        className
      )}
    >
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all duration-300">
            <Icon size={20} />
          </div>
          <h3 className="font-display font-bold text-lg md:text-xl text-[#f5f5f7]">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-lg border border-borderDark bg-[#0c0c0e] text-xs font-mono text-zinc-300 group-hover:border-zinc-700 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
