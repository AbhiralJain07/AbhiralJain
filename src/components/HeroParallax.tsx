"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP quickTo references for ultra-smooth 60fps tracking
  const xToCard = useRef<((value: number) => void) | null>(null);
  const yToCard = useRef<((value: number) => void) | null>(null);

  const xToText = useRef<((value: number) => void) | null>(null);
  const yToText = useRef<((value: number) => void) | null>(null);

  const xToImage = useRef<((value: number) => void) | null>(null);
  const yToImage = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!cardRef.current || !textRef.current || !containerRef.current || !imageRef.current) return;

    // 1. Tilt rotation quickTo interpolators
    xToCard.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.6, ease: "power3.out" });
    yToCard.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.6, ease: "power3.out" });

    // 2. Parallax text shifting quickTo interpolators
    xToText.current = gsap.quickTo(textRef.current, "x", { duration: 0.5, ease: "power2.out" });
    yToText.current = gsap.quickTo(textRef.current, "y", { duration: 0.5, ease: "power2.out" });

    // 3. Parallax image shifting quickTo interpolators
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
    if (xToCard.current) xToCard.current(mouseX * 16); // rotateY
    if (yToCard.current) yToCard.current(-mouseY * 16); // rotateX

    // Shift text in opposite direction of mouse for parallax depth
    if (xToText.current) xToText.current(-mouseX * 25);
    if (yToText.current) yToText.current(-mouseY * 15);

    // Shift foreground portrait slightly in mouse direction for foreground layer pop
    if (xToImage.current) xToImage.current(mouseX * 12);
    if (yToImage.current) yToImage.current(mouseY * 8);
  };

  const handleMouseEnter = () => {
    // Elevate text and image layers in 3D perspective
    gsap.to(textRef.current, {
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
    });

    // Keep portrait 100% visible and sharp while adding subtle 3D lift
    gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
    });

    // Elevate HUD elements slightly to highlight interactive feel
    gsap.to(".hud-element", {
      opacity: 0.55,
      duration: 0.4,
      stagger: 0.04,
    });
  };

  const handleMouseLeave = () => {
    // Reset card tilt and parallax offsets
    if (xToCard.current) xToCard.current(0);
    if (yToCard.current) yToCard.current(0);
    if (xToText.current) xToText.current(0);
    if (yToText.current) yToText.current(0);
    if (xToImage.current) xToImage.current(0);
    if (yToImage.current) yToImage.current(0);

    // Return text and image to default rest state
    gsap.to(textRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(imageRef.current, {
      opacity: 1,
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
      className="relative w-full max-w-[680px] h-[300px] sm:h-[360px] md:h-[400px] mx-auto flex items-center justify-center cursor-pointer perspective-[1200px] select-none"
    >
      {/* 3D Parallax Tilt Wrapper */}
      <div
        ref={cardRef}
        className="w-full h-full transform-style-3d relative transition-transform duration-100 ease-out bg-transparent"
      >
        
        {/* ================= BACKGROUND TECH ELEMENTS ================= */}
        
        {/* Dotted HUD Grid */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 z-0 pointer-events-none transform-style-3d"
          style={{ transform: "translateZ(-60px)" }}
        />

        {/* Ambient Cyan Aura Glow & Rim Backlight */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transform-style-3d"
          style={{ transform: "translateZ(-40px)" }}
        >
          <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.14)_0%,rgba(0,229,255,0.03)_50%,transparent_70%)] animate-pulse" style={{ animationDuration: "5s" }} />
        </div>

        {/* Rotating Circular HUD Ring */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 transform-style-3d"
          style={{ transform: "translateZ(-30px)" }}
        >
          <svg className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] stroke-white/10 stroke-[0.75] fill-none animate-spin pointer-events-none opacity-20 hud-element" style={{ animationDuration: "30s" }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="40" strokeDasharray="8 2" strokeWidth="0.3" stroke="rgba(0,229,255,0.3)" />
            <circle cx="50" cy="50" r="34" strokeDasharray="1 6" />
          </svg>
        </div>

        {/* ================= NAME TYPOGRAPHY LAYER (Framed to keep face completely clear) ================= */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-between py-1 sm:py-3 pointer-events-none select-none z-10 transform-style-3d"
          style={{
            transform: "translateZ(-15px)",
          }}
        >
          {/* Top Line: ABHIRAL (Sits above the head / upper shoulders) */}
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-display font-extrabold tracking-tight uppercase text-center select-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            <span className="text-[#f5f5f7] tracking-tight">ABHIRAL</span>
          </div>

          {/* Bottom Line: JAIN (Sits across lower torso) */}
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-display font-extrabold tracking-tight uppercase text-center select-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
            <span className="text-accent drop-shadow-[0_0_25px_rgba(0,229,255,0.45)]">JAIN</span>
          </div>
        </div>

        {/* ================= HUD CORNER TARGET BRACKETS ================= */}
        <div 
          className="absolute inset-0 pointer-events-none z-15 transform-style-3d flex items-center justify-center"
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Virtual target container framing the portrait */}
          <div className="relative w-[220px] h-[270px] sm:w-[270px] sm:h-[330px] md:w-[300px] md:h-[370px] transition-all duration-700 ease-out border border-white/5 group-hover:border-accent/20 rounded">
            {/* Top-Left Bracket */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/25 transition-all duration-500 ease-out group-hover:border-accent group-hover:-translate-x-1.5 group-hover:-translate-y-1.5" />
            {/* Top-Right Bracket */}
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/25 transition-all duration-500 ease-out group-hover:border-accent group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
            {/* Bottom-Left Bracket */}
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/25 transition-all duration-500 ease-out group-hover:border-accent group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />
            {/* Bottom-Right Bracket */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/25 transition-all duration-500 ease-out group-hover:border-accent group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
          </div>
        </div>

        {/* ================= FOREGROUND PORTRAIT (High Visibility, Face Clear, Cinematic Contrast) ================= */}
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none transform-style-3d flex items-center justify-center"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          {/* Calibrated container offset to bring head and face into clear focus within the HUD target */}
          <div className="relative w-full h-[122%] -top-[11%] flex items-center justify-center">
            <Image
              src="/projects/abhiral1.jpeg?v=4"
              alt="Abhiral Jain Portrait"
              fill
              sizes="(max-width: 768px) 90vw, 650px"
              priority
              className="object-contain object-center filter contrast-[1.07] brightness-[1.04] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* ================= FOREGROUND HUD LABELS ================= */}
        
        {/* Top Left Tech Tag */}
        <div 
          className="absolute top-[4%] left-[2%] sm:left-[4%] font-mono text-[9px] tracking-[0.2em] text-zinc-500 opacity-30 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(30px)" }}
        >
          [ CORE: DEV_ENG // STABLE ]
        </div>

        {/* Bottom Right Sys Arch Tag */}
        <div 
          className="absolute bottom-[4%] right-[2%] sm:right-[4%] font-mono text-[9px] tracking-[0.2em] text-accent/80 opacity-30 pointer-events-none z-30 transform-style-3d hud-element"
          style={{ transform: "translateZ(30px)" }}
        >
          {"{ sys: \"sub-200ms_inf\" }"}
        </div>

      </div>
    </div>
  );
}


