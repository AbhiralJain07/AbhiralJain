"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Camera, Sparkles, Compass } from "lucide-react";

export default function InteractivePhotoCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const [activePhoto, setActivePhoto] = useState<"scenic" | "studio">("scenic");
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // GSAP quickTo interpolators for ultra-responsive 60fps screen-wide tracking
  const xToCard = useRef<((value: number) => void) | null>(null);
  const yToCard = useRef<((value: number) => void) | null>(null);

  const xToImage = useRef<((value: number) => void) | null>(null);
  const yToImage = useRef<((value: number) => void) | null>(null);

  const xToGlare = useRef<((value: number) => void) | null>(null);
  const yToGlare = useRef<((value: number) => void) | null>(null);

  const xToAura = useRef<((value: number) => void) | null>(null);
  const yToAura = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!cardRef.current || !imageWrapperRef.current || !glareRef.current) return;

    // Initialize quickTo instances
    xToCard.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.7, ease: "power2.out" });
    yToCard.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.7, ease: "power2.out" });

    xToImage.current = gsap.quickTo(imageWrapperRef.current, "x", { duration: 0.6, ease: "power2.out" });
    yToImage.current = gsap.quickTo(imageWrapperRef.current, "y", { duration: 0.6, ease: "power2.out" });

    xToGlare.current = gsap.quickTo(glareRef.current, "x", { duration: 0.4, ease: "power1.out" });
    yToGlare.current = gsap.quickTo(glareRef.current, "y", { duration: 0.4, ease: "power1.out" });

    if (auraRef.current) {
      xToAura.current = gsap.quickTo(auraRef.current, "x", { duration: 0.8, ease: "power2.out" });
      yToAura.current = gsap.quickTo(auraRef.current, "y", { duration: 0.8, ease: "power2.out" });
    }

    // Window-level screen cursor tracking
    let frameId: number;
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      
      // Normalized coordinates (-1 to 1) relative to viewport center
      const nx = (e.clientX / innerWidth - 0.5) * 2;
      const ny = (e.clientY / innerHeight - 0.5) * 2;

      // Update state coordinates (throttled by animation frame)
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setCoords({
          x: Math.round(nx * 100) / 100,
          y: Math.round(ny * 100) / 100,
        });
      });

      // 1. 3D Card Tilt (up to 15 degrees)
      if (xToCard.current) xToCard.current(nx * 14);
      if (yToCard.current) yToCard.current(-ny * 14);

      // 2. Inner Image Parallax Shift (opposite direction for lens window effect)
      if (xToImage.current) xToImage.current(-nx * 20);
      if (yToImage.current) yToImage.current(-ny * 16);

      // 3. Specular Glare Reflection (follows light vector)
      if (xToGlare.current) xToGlare.current(nx * 120);
      if (yToGlare.current) yToGlare.current(ny * 120);

      // 4. Ambient Aura Drift behind card
      if (xToAura.current) xToAura.current(nx * 40);
      if (yToAura.current) yToAura.current(ny * 40);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[530px] flex items-center justify-center perspective-[1400px] select-none"
    >
      {/* Dynamic Ambient Aura that drifts with cursor */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.18)_0%,rgba(0,229,255,0.03)_50%,transparent_70%)] blur-2xl -z-10"
      />

      {/* 3D Parallax Card */}
      <div
        ref={cardRef}
        className="group relative w-full h-full transform-style-3d rounded-3xl bg-gradient-to-b from-[#16161b]/95 via-[#101013]/95 to-[#0b0b0d]/95 border border-borderDark/90 hover:border-accent/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(0,229,255,0.15)] transition-colors duration-500 overflow-hidden"
      >
        {/* Dotted HUD Grid in background layer */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px] opacity-60 z-0 pointer-events-none transform-style-3d"
          style={{ transform: "translateZ(-30px)" }}
        />

        {/* Inner Image Wrapper with Parallax Shift */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 z-10 pointer-events-none transform-style-3d flex items-center justify-center overflow-hidden rounded-3xl"
          style={{ transform: "translateZ(10px)" }}
        >
          {activePhoto === "scenic" ? (
            <div className="relative w-full h-full">
              <Image
                src="/projects/abhiral2.jpeg"
                alt="Abhiral Jain Scenic Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                className="object-cover object-top sm:object-center filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
              {/* Soft bottom vignette for seamless card integration */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/50 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-[#141418] via-[#0e0e11] to-[#09090b] pt-12 pb-4 px-4">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/projects/abhiral1.jpeg?v=4"
                  alt="Abhiral Jain Studio Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                  className="object-contain object-center filter contrast-[1.06] brightness-[1.03] drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                />
                {/* Soft bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
              </div>
            </div>
          )}
          
          {/* Subtle perimeter border shadow */}
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </div>

        {/* Dynamic Specular Glare / Glass Reflection */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute -inset-full z-20 opacity-25 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(0,229,255,0.06)_35%,transparent_60%)]"
          style={{ transform: "translateZ(30px)" }}
        />

        {/* HUD Corner Target Brackets */}
        <div 
          className="absolute inset-4 pointer-events-none z-25 transform-style-3d"
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30 group-hover:border-accent transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30 group-hover:border-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30 group-hover:border-accent transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30 group-hover:border-accent transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
        </div>

        {/* Top HUD Telemetry Bar */}
        <div 
          className="absolute top-5 inset-x-5 flex items-center justify-between z-30 pointer-events-none transform-style-3d"
          style={{ transform: "translateZ(35px)" }}
        >
          {/* Live Radar Coordinates Tag */}
          <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center space-x-2 text-[10px] font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>RADAR [ X:{coords.x} Y:{coords.y} ]</span>
          </div>

          {/* Interactive Mode Tag */}
          <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center space-x-1.5 text-[10px] font-mono text-accent">
            <Compass size={11} className="animate-spin" style={{ animationDuration: "12s" }} />
            <span>3D_CURSOR_TRACK</span>
          </div>
        </div>

        {/* Bottom HUD Information & Photo Switcher */}
        <div 
          className="absolute bottom-5 inset-x-5 flex items-center justify-between z-30 transform-style-3d"
          style={{ transform: "translateZ(35px)" }}
        >
          {/* Persona Tag */}
          <div className="pointer-events-none px-3.5 py-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md flex flex-col space-y-0.5">
            <div className="text-xs font-display font-bold text-[#f5f5f7] tracking-wider uppercase flex items-center space-x-1.5">
              <span>Abhiral Jain</span>
              <Sparkles size={11} className="text-accent" />
            </div>
            <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
              AI/ML & Systems Lead
            </div>
          </div>

          {/* Photo Switcher Button */}
          <button
            type="button"
            onClick={() => setActivePhoto((prev) => (prev === "scenic" ? "studio" : "scenic"))}
            className="pointer-events-auto px-3 py-1.5 rounded-xl bg-[#121216]/90 border border-accent/40 hover:border-accent text-accent hover:text-white text-[10px] font-mono uppercase tracking-wider flex items-center space-x-1.5 backdrop-blur-md hover:bg-accent/20 transition-all duration-300 shadow-lg"
            title="Switch Photo View"
          >
            <Camera size={12} />
            <span>{activePhoto === "scenic" ? "View Studio" : "View Field"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
