import React from "react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  className?: string;
  buttonClassName?: string;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  className,
  buttonClassName,
}: CategoryFilterProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 bg-[#121214]/90 p-1.5 rounded-full border border-borderDark",
        className
      )}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-[11px] uppercase font-mono tracking-wider transition-all duration-300",
            selected === cat
              ? "bg-accent text-black font-bold shadow-[0_0_15px_rgba(0,229,255,0.35)]"
              : "text-zinc-400 hover:text-white",
            buttonClassName
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
