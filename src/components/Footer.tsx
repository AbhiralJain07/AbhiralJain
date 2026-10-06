"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import Magnetic from "@/components/Magnetic";

export default function Footer() {
  return (
    <footer className="w-full border-t border-borderDark bg-[#0c0c0e] py-14 px-6 md:px-12 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link
            href="/"
            className="text-lg font-display font-bold tracking-widest text-[#f5f5f7] hover:text-accent transition-colors"
          >
            ABHIRAL JAIN
          </Link>
          <p className="font-mono text-zinc-500 text-[11px]">
            Creative Full-Stack Developer & ML Engineer • VIT Bhopal
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
          <Link href="/experience-projects" className="hover:text-accent transition-colors">
            Experience & Projects
          </Link>
          <span className="text-zinc-700">•</span>
          <Link href="/tech-stack-resume" className="hover:text-accent transition-colors">
            Tech Stack & Resume
          </Link>
          <span className="text-zinc-700">•</span>
          <Link href="/get-in-touch" className="hover:text-accent transition-colors">
            Get in Touch
          </Link>
        </div>

        {/* Social connections */}
        <div className="flex items-center space-x-6">
          <Magnetic strength={0.3} range={50}>
            <a
              href="mailto:jainabhiral7@gmail.com"
              className="flex items-center space-x-1.5 hover:text-accent transition-colors text-[#f5f5f7] py-1"
              title="Email Abhiral Jain"
            >
              <Mail size={14} />
              <span className="font-mono text-[11px]">Email</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3} range={50}>
            <a
              href="https://www.linkedin.com/in/jainabhiral/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-accent transition-colors text-[#f5f5f7] py-1"
              title="LinkedIn Profile"
            >
              <Linkedin size={14} />
              <span className="font-mono text-[11px] flex items-center gap-0.5">
                LinkedIn
                <ArrowUpRight size={10} />
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3} range={50}>
            <a
              href="https://github.com/AbhiralJain07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-accent transition-colors text-[#f5f5f7] py-1"
              title="GitHub Profile"
            >
              <Github size={14} />
              <span className="font-mono text-[11px] flex items-center gap-0.5">
                GitHub
                <ArrowUpRight size={10} />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-borderDark/40 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-2">
        <div>
          © {new Date().getFullYear()} Abhiral Jain. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <span>Sub-200ms Latency</span>
          <span>•</span>
          <span>DPDP Act Compliant</span>
          <span>•</span>
          <a href="/Abhiral_Jain_Resume.pdf" download="Abhiral_Jain_Resume.pdf" className="text-zinc-500 hover:text-accent transition-colors">
            Resume.pdf
          </a>
        </div>
      </div>
    </footer>
  );
}
