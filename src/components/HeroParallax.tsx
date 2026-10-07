"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // GSAP quickTo references for ultra-smooth 60fps tracking
  const xToCard = useRef<((value: number) => void) | null>(null);
  const yToCard = useRef<((value: number) => void) | null>(null);

  const xToImage = useRef<((value: number) => void) | null>(null);
  const yToImage = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!cardRef.current || !containerRef.current || !imageRef.current) return;

    // 1. Tilt rotation quickTo interpolators
    xToCard.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
    yToCard.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });

    // 2. Parallax image shifting quickTo interpolators
    xToImage.current = gsap.quickTo(imageRef.current, "x", { duration: 0.5, ease: "power2.out" });
    yToImage.current = gsap.quickTo(imageRef.current, "y", { duration: 0.5, ease: "power2.out" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !cardRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Apply smooth 3D tilt
    if (xToCard.current) xToCard.current(mouseX * 18); // rotateY
    if (yToCard.current) yToCard.current(-mouseY * 18); // rotateX

    // Shift foreground portrait slightly in mouse direction for foreground layer pop
    if (xToImage.current) xToImage.current(mouseX * 14);
    if (yToImage.current) yToImage.current(mouseY * 10);
  };

  const handleMouseEnter = () => {
    // Elevate image layer in 3D perspective
    gsap.to(imageRef.current, {
      scale: 1.03,
      duration: 0.5,
      ease: "power2.out",
    });

    // Elevate HUD elements slightly to highlight interactive feel
    gsap.to(".hud-element", {
      opacity: 0.65,
      duration: 0.4,
      stagger: 0.04,
    });
  };

  const handleMouseLeave = () => {
    // Reset card tilt and parallax offsets
    if (xToCard.current) xToCard.current(0);
    if (yToCard.current) yToCard.current(0);
    if (xToImage.current) xToImage.current(0);
    if (yToImage.current) yToImage.current(0);

    // Return image to default rest state
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    // Return HUD elements to subtle standby opacity
    gsap.to(".hud-element", {
      opacity: 0.35,
      duration: 0.4,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] sm:max-w-[460px] h-[460px] sm:h-[520px] lg:h-[550px] mx-auto flex items-center justify-center cursor-pointer perspective-[1200px] select-none"
    >
      {/* 3D Parallax Tilt Card */}
      <div
        ref={cardRef}
        className="group w-full h-full transform-style-3d relative rounded-3xl bg-gradient-to-b from-[#141418]/95 via-[#0e0e11]/95 to-[#09090b]/98 border border-borderDark/80 hover:border-accent/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,229,255,0.12)] transition-colors duration-500 overflow-hidden"
      >
        
        {/* ================= BACKGROUND TECH ELEMENTS ================= */}
        
        {/* Dotted HUD Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:18px_18px] opacity-50 z-0 pointer-events-none transform-style-3d"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* Ambient Cyan Aura Glow & Rim Backlight */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transform-style-3d"
          style={{ transform: "translateZ(-30px)" }}
        >
          <div className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18)_0%,rgba(0,229,255,0.04)_50%,transparent_70%)] animate-pulse" style={{ animationDuration: "5s" }} />
        </div>

        {/* Rotating Circular HUD Ring */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 transform-style-3d"
          style={{ transform: "translateZ(-20px)" }}
        >
          <svg className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] stroke-white/10 stroke-[0.75] fill-none animate-spin pointer-events-none opacity-25 hud-element" style={{ animationDuration: "35s" }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="40" strokeDasharray="8 2" strokeWidth="0.3" stroke="rgba(0,229,255,0.4)" />
            <circle cx="50" cy="50" r="34" strokeDasharray="1 6" />
          </svg>
        </div>

        {/* ================= HUD CORNER TARGET BRACKETS ================= */}
        <div 
          className="absolute inset-4 pointer-events-none z-15 transform-style-3d"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Top-Left Bracket */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:-translate-x-1 group-hover:-translate-y-1" />
          {/* Top-Right Bracket */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:translate-x-1 group-hover:-translate-y-1" />
          {/* Bottom-Left Bracket */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:-translate-x-1 group-hover:translate-y-1" />
          {/* Bottom-Right Bracket */}
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:translate-x-1 group-hover:translate-y-1" />
        </div>

        {/* ================= FOREGROUND PORTRAIT (Full Head & Torso with Natural Fit) ================= */}
        <div
          ref={imageRef}
          className="absolute inset-0 pt-8 pb-3 px-3 z-20 pointer-events-none transform-style-3d flex items-center justify-center"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/projects/abhiral1.jpeg?v=4"
              alt="Abhiral Jain Portrait"
              fill
              sizes="(max-width: 768px) 90vw, 480px"
              priority
              className="object-contain object-center filter contrast-[1.06] brightness-[1.03] drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
            />
            {/* Subtle soft gradient fade at the very base to blend the waist into the card */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ================= FOREGROUND HUD LABELS ================= */}
        
        {/* Top Left Status Tag */}
        <div 
          className="absolute top-4 left-5 font-mono text-[9px] tracking-[0.2em] text-zinc-400 opacity-60 pointer-events-none z-30 transform-style-3d hud-element flex items-center space-x-1.5"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span>DEV_ENG // PROD</span>
        </div>

        {/* Top Right Live Tag */}
        <div 
          className="absolute top-4 right-5 font-mono text-[9px] tracking-[0.2em] text-accent opacity-70 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(30px)" }}
        >
          [ ONLINE ]
        </div>

        {/* Bottom Left Telemetry */}
        <div 
          className="absolute bottom-4 left-5 font-mono text-[9px] tracking-[0.2em] text-accent/80 opacity-60 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(30px)" }}
        >
          {"{ sys: \"sub-200ms_inf\" }"}
        </div>

        {/* Bottom Right Arch Tag */}
        <div 
          className="absolute bottom-4 right-5 font-mono text-[9px] tracking-[0.2em] text-zinc-500 opacity-60 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(30px)" }}
        >
          CORE_V4
        </div>

      </div>
    </div>
  );
}



