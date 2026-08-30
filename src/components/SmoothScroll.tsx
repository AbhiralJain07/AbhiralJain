"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if the user prefers reduced motion. If so, bypass smooth scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decel
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Tick lenis in requestAnimationFrame
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    const initScrollTriggerSync = async () => {
      try {
        const { default: gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        
        gsap.registerPlugin(ScrollTrigger);
        
        // Update ScrollTrigger on Lenis scroll
        lenis.on("scroll", () => {
          ScrollTrigger.update();
        });

        // Tell ScrollTrigger to use Lenis's scroll position
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value as number);
              return;
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          // If we are using transform on container, use transform proxy. Else fallback to fixed
          pinType: document.body.style.transform ? "transform" : "fixed",
        });

        // Keep ScrollTrigger up to date when Lenis finishes updating
        ScrollTrigger.defaults({ scroller: document.body });
        ScrollTrigger.addEventListener("refresh", () => lenis.resize());
        ScrollTrigger.refresh();
      } catch (err) {
        console.error("Failed to sync Lenis with GSAP ScrollTrigger:", err);
      }
    };

    initScrollTriggerSync();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
