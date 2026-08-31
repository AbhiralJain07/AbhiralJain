"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  // GSAP quickTo references for ultra-smooth 60fps tracking
  const xToCard = useRef<Function | null>(null);
  const yToCard = useRef<Function | null>(null);

  const xToText = useRef<Function | null>(null);
  const yToText = useRef<Function | null>(null);

  useEffect(() => {
    if (!cardRef.current || !textRef.current || !containerRef.current) return;

    // 1. Tilt rotation quickTo interpolators
    xToCard.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
    yToCard.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });

    // 2. Parallax text shifting quickTo interpolators
    xToText.current = gsap.quickTo(textRef.current, "x", { duration: 0.5, ease: "power2.out" });
    yToText.current = gsap.quickTo(textRef.current, "y", { duration: 0.5, ease: "power2.out" });
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
    if (xToCard.current) xToCard.current(mouseX * 25); // rotateY
    if (yToCard.current) yToCard.current(-mouseY * 25); // rotateX

    // Shift text in opposite direction of mouse for parallax reveal
    if (xToText.current) xToText.current(-mouseX * 60);
    if (yToText.current) yToText.current(-mouseY * 60);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    // Fade in name text to full opacity and scale it to full size
    gsap.to(textRef.current, {
      opacity: 1,
      scale: 1,
      z: 90, // Float text far forward in 3D perspective
      duration: 0.6,
      ease: "power3.out",
    });

    // Make the foreground portrait semi-transparent on hover (opacity: 0.3)
    gsap.to(imageRef.current, {
      opacity: 0.3,
      z: 30,
      scale: 1.08,
      duration: 0.6,
      ease: "power3.out",
    });

    // Fade up the tech tags and outline rings for visual density
    gsap.to(".hud-element", {
      opacity: 0.7,
      duration: 0.4,
      stagger: 0.05,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Reset card tilt and text parallax
    if (xToCard.current) xToCard.current(0);
    if (yToCard.current) yToCard.current(0);
    if (xToText.current) xToText.current(0);
    if (yToText.current) yToText.current(0);

    // Hide the name text
    gsap.to(textRef.current, {
      opacity: 0,
      scale: 0.9,
      z: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    // Reset image opacity and depth back to default solid state
    gsap.to(imageRef.current, {
      opacity: 1,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    // Return HUD elements to subtle standby opacity
    gsap.to(".hud-element", {
      opacity: 0.25,
      duration: 0.4,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[750px] aspect-[4/3] mx-auto flex items-center justify-center cursor-pointer perspective-[1200px] select-none"
    >
      {/* 3D Parallax Tilt Wrapper (No background, border, or bounding box) */}
      <div
        ref={cardRef}
        className="w-full h-full transform-style-3d relative transition-transform duration-100 ease-out bg-transparent"
      >
        
        {/* ================= BACKGROUND TECH ELEMENTS (Depth Layer: translateZ(-80px) to (-20px)) ================= */}
        
        {/* Dotted HUD Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1.5px,transparent_1.5px)] bg-[size:24px_24px] opacity-40 z-0 pointer-events-none transform-style-3d"
          style={{ transform: "translateZ(-80px)" }}
        />

        {/* Ambient Cyan Aura Glow */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transform-style-3d"
          style={{ transform: "translateZ(-60px)" }}
        >
          <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1)_0%,transparent_65%)] animate-pulse" style={{ animationDuration: "6s" }} />
        </div>

        {/* Rotating Circular HUD Ring */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 transform-style-3d"
          style={{ transform: "translateZ(-40px)" }}
        >
          <svg className="w-[420px] h-[420px] stroke-white/5 stroke-[0.75] fill-none animate-spin pointer-events-none opacity-20 hud-element" style={{ animationDuration: "25s" }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" strokeDasharray="2 3" />
            <circle cx="50" cy="50" r="42" strokeDasharray="10 1" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="36" strokeDasharray="1 8" />
          </svg>
        </div>

        {/* ================= TEXT LAYER (Background - floats behind portrait, initially hidden) ================= */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 transform-style-3d opacity-0"
          style={{
            transform: "translateZ(0px) scale(0.9)",
          }}
        >
          <h1 className="text-7xl sm:text-8xl md:text-[7.5rem] lg:text-[9rem] font-display font-extrabold leading-[0.82] tracking-tight uppercase text-center select-none drop-shadow-[0_0_40px_rgba(0,0,0,0.85)]">
            <span className="text-[#f5f5f7]">ABHIRAL</span>
            <br />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">JAIN</span>
          </h1>
        </div>

        {/* ================= HUD CORNER TARGET BRACKETS (Depth Layer: translateZ(20px)) ================= */}
        <div 
          className="absolute inset-0 pointer-events-none z-15 transform-style-3d flex items-center justify-center"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Virtual target container representing the crop boundaries */}
          <div className="relative w-[280px] h-[370px] sm:w-[350px] sm:h-[460px] transition-all duration-700 ease-out border border-white/5 group-hover:border-[#00e5ff]/20 group-hover:scale-[1.03] rounded">
            {/* Top-Left Bracket */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:-translate-x-2.5 group-hover:-translate-y-2.5" />
            {/* Top-Right Bracket */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:translate-x-2.5 group-hover:-translate-y-2.5" />
            {/* Bottom-Left Bracket */}
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:-translate-x-2.5 group-hover:translate-y-2.5" />
            {/* Bottom-Right Bracket */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 transition-all duration-500 ease-out group-hover:border-accent group-hover:translate-x-2.5 group-hover:translate-y-2.5" />
            
            {/* Target Crosshair lines */}
            <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            <div className="absolute left-1/2 top-2 bottom-2 w-[1px] bg-white/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-center" />
          </div>
        </div>

        {/* ================= FOREGROUND PORTRAIT (Cutout - Center Layer) ================= */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none transform-style-3d flex items-center justify-center transition-opacity duration-300"
          style={{
            transform: "translateZ(0px)",
          }}
        >
          {/* Increased Size: Container spans h-[105%] to allow portrait to extend slightly for depth */}
          <div className="relative w-full h-[105%] flex items-center justify-center">
            <Image
              src="/projects/abhiral1.jpeg?v=4"
              alt="Abhiral Jain Cutout"
              fill
              sizes="(max-width: 768px) 100vw, 750px"
              priority
              className="object-contain object-center filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>

        {/* ================= FOREGROUND HUD LABELS (Depth Layer: translateZ(40px) to (60px)) ================= */}
        
        {/* Top Left Tech Tag */}
        <div 
          className="absolute top-[8%] left-[4%] font-mono text-[9px] tracking-[0.25em] text-zinc-500 opacity-25 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(45px)" }}
        >
          [ MODE: DEV_ENG // STABLE ]
        </div>

        {/* Bottom Right Sys Arch Tag */}
        <div 
          className="absolute bottom-[10%] right-[4%] font-mono text-[9px] tracking-[0.25em] text-accent/80 opacity-25 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(55px)" }}
        >
          {"{ sys: \"sub-200ms_inf\" }"}
        </div>

      </div>
    </div>
  );
}
