"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect touch device or hoverless pointer
    const checkDevice = () => {
      const mobile = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return () => window.removeEventListener("resize", checkDevice);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial centered coordinates
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 1 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 1 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3.out" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        setIsVisible(true);
        hasMoved = true;
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Event Delegation for hover effects
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(
        "a, button, select, input, textarea, [role='button'], [data-hover]"
      );
      const projectCard = target.closest("[data-cursor]");

      if (projectCard) {
        const text = projectCard.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        
        // Morph ring into a larger view pill
        gsap.to(ring, {
          width: 90,
          height: 90,
          backgroundColor: "rgba(0, 229, 255, 0.2)",
          borderColor: "#00e5ff",
          borderWidth: "1.5px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.2,
        });
      } else if (interactive) {
        // Simple link scale effect
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "#00e5ff",
          backgroundColor: "rgba(0, 229, 255, 0.05)",
          borderWidth: "1px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: "#00e5ff",
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const leavingInteractive = target.closest(
        "a, button, select, input, textarea, [role='button'], [data-hover]"
      );
      const leavingProject = target.closest("[data-cursor]");

      // Check where mouse went to avoid flickering
      const nextTarget = e.relatedTarget as HTMLElement;
      const enteringInteractive = nextTarget?.closest(
        "a, button, select, input, textarea, [role='button'], [data-hover]"
      );
      const enteringProject = nextTarget?.closest("[data-cursor]");

      if (leavingProject && !enteringProject) {
        setCursorText("");
        gsap.to(ring, {
          width: 32,
          height: 32,
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(245, 245, 247, 0.3)",
          borderWidth: "1.5px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#00e5ff",
          duration: 0.2,
        });
      }

      if (leavingInteractive && !enteringInteractive && !enteringProject) {
        gsap.to(ring, {
          scale: 1,
          width: 32,
          height: 32,
          backgroundColor: "transparent",
          borderColor: "rgba(245, 245, 247, 0.3)",
          borderWidth: "1.5px",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#00e5ff",
          duration: 0.2,
        });
      }
    };

    // Simple click scaling
    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
      gsap.to(dot, { scale: 1.5, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-1.5 border-[#f5f5f7]/30 pointer-events-none flex items-center justify-center overflow-hidden transition-[background-color,border-color] duration-300"
        style={{ willChange: "transform, width, height" }}
      >
        {cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-black select-none uppercase font-display animate-fade-in">
            {cursorText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
