"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: React.ReactElement<{ className?: string }>;
  range?: number; // Distance threshold in px to start pulling
  strength?: number; // Pull factor (0 to 1)
}

export default function Magnetic({ children, range = 50, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = containerRef.current;
    if (!el) return;

    // Use elastic ease for realistic spring action when snapping back
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from mouse to center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        // Pull element towards cursor
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        // Snap back to origin
        xTo(0);
        yTo(0);
      }
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, strength]);

  return (
    <div ref={containerRef} className="inline-block" style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
