"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";
import Magnetic from "@/components/Magnetic";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Experience & Projects", href: "/experience-projects" },
  { label: "Tech Stack & Resume", href: "/tech-stack-resume" },
  { label: "Get in Touch", href: "/get-in-touch" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? "top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[1080px] bg-[#0c0c0e]/90 border border-borderDark backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.65)]"
            : "top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 bg-transparent"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-2.5 transition-all duration-300"
          aria-label="Abhiral Jain - Home"
        >
          <div className="relative h-8 sm:h-9 md:h-10 w-auto aspect-[539/333] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo-white.png"
              alt="Abhiral Jain Logo"
              width={140}
              height={86}
              priority
              className="h-full w-auto object-contain brightness-100 group-hover:brightness-110 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.35)] transition-all duration-300"
            />
          </div>
        </Link>

        {/* Desktop Navigation - 3 Main Sections */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 text-xs tracking-widest uppercase font-medium">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Magnetic key={item.href} strength={0.2} range={60}>
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                    active
                      ? "text-accent bg-accent/10 border border-accent/30 font-semibold shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                      : "text-zinc-400 hover:text-[#f5f5f7] hover:bg-white/[0.04]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </Link>
              </Magnetic>
            );
          })}

          {/* Quick CLI console launcher */}
          <Magnetic strength={0.2} range={50}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
              className="ml-2 px-3 py-1.5 rounded-full border border-borderDark hover:border-accent/60 text-zinc-400 hover:text-accent bg-[#121214]/60 transition-all duration-300 text-[11px] tracking-wider uppercase font-mono flex items-center gap-1.5"
              title="Open Terminal CLI (press `)"
            >
              <TerminalIcon size={12} />
              <span>CLI</span>
            </button>
          </Magnetic>
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center space-x-2.5">
          <a
            href="/Abhiral_Jain_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] px-3 py-1.5 border border-accent/60 rounded-full text-accent flex items-center gap-1 font-semibold uppercase tracking-wider bg-accent/5"
          >
            <span>CV</span>
            <ArrowUpRight size={11} />
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
            className="text-[11px] px-2.5 py-1.5 border border-[#f5f5f7]/20 rounded-full text-[#f5f5f7] font-mono"
            aria-label="Toggle terminal"
          >
            CLI
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#f5f5f7] p-2 rounded-lg bg-[#121214] border border-borderDark hover:border-accent transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0b0b0c]/98 backdrop-blur-xl flex flex-col justify-center px-8 space-y-6 animate-fade-in md:hidden border-b border-borderDark">
          <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">
            Navigation Menu
          </div>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`text-2xl sm:text-3xl font-display font-bold text-left transition-colors flex items-center justify-between ${
              pathname === "/" ? "text-accent" : "text-[#f5f5f7] hover:text-accent"
            }`}
          >
            <span>00. Home</span>
            {pathname === "/" && <span className="text-xs font-mono text-accent">[Active]</span>}
          </Link>

          {NAV_ITEMS.map((item, idx) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl sm:text-3xl font-display font-bold text-left transition-colors flex items-center justify-between ${
                  active ? "text-accent" : "text-[#f5f5f7] hover:text-accent"
                }`}
              >
                <span>0{idx + 1}. {item.label}</span>
                {active && <span className="text-xs font-mono text-accent">[Active]</span>}
              </Link>
            );
          })}

          <div className="pt-6 border-t border-borderDark/80 flex flex-col space-y-3">
            <a
              href="/Abhiral_Jain_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-base font-display text-accent hover:text-white flex items-center justify-between py-2"
            >
              <span>Download Official Resume (PDF)</span>
              <ArrowUpRight size={18} />
            </a>

            <button
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent("toggle-terminal"));
              }}
              className="text-base font-display text-left text-zinc-400 hover:text-accent flex items-center justify-between py-2 font-mono"
            >
              <span>Launch Terminal CLI (Console)</span>
              <span className="text-xs border border-zinc-700 px-2 py-0.5 rounded">` key</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
