import React from "react";
import { Users, Award, Cpu, ShieldCheck, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MetricItem {
  id?: string;
  icon?: LucideIcon;
  value: string;
  label: string;
}

export const DEFAULT_METRICS: MetricItem[] = [
  {
    id: "peers",
    icon: Users,
    value: "50+",
    label: "Peers Mentored / Placed",
  },
  {
    id: "club",
    icon: Award,
    value: "100th",
    label: "Official University Club",
  },
  {
    id: "latency",
    icon: Cpu,
    value: "<200ms",
    label: "ML Inference Latency",
  },
  {
    id: "reliability",
    icon: ShieldCheck,
    value: "99.9%",
    label: "DPDP / Reliability Standard",
  },
];

interface MetricsGridProps {
  metrics?: MetricItem[];
  className?: string;
  cardClassName?: string;
  variant?: "cards" | "compact";
}

export default function MetricsGrid({
  metrics = DEFAULT_METRICS,
  className,
  cardClassName,
  variant = "cards",
}: MetricsGridProps) {
  if (variant === "compact") {
    return (
      <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3", className)}>
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id || idx}
              className={cn(
                "p-3.5 rounded-xl border border-borderDark bg-[#121214]/60 backdrop-blur-sm",
                cardClassName
              )}
            >
              {Icon && <Icon className="text-accent mb-1" size={16} />}
              <div className="text-xl font-display font-bold text-[#f5f5f7]">
                {item.value}
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
        className
      )}
    >
      {metrics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id || idx}
            className={cn(
              "p-6 rounded-2xl border border-borderDark bg-[#121214]/70 backdrop-blur-md relative overflow-hidden group hover:border-accent transition-all duration-300",
              cardClassName
            )}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
            {Icon && <Icon className="text-accent mb-3" size={22} />}
            <div className="text-3xl md:text-4xl font-display font-extrabold text-[#f5f5f7] mb-1">
              {item.value}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
