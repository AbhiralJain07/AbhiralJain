"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import Magnetic from "@/components/Magnetic";
import gsap from "gsap";

export default function GetInTouchPage() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  
  // Form states
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  // Submission status states
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.2 }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jainabhiral7@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch message via NodeMailer.");
      }

      setStatus("success");
      setStatusMessage(data.message || "Your message has been sent successfully!");
      setSenderName("");
      setSenderEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      const errText = err instanceof Error ? err.message : "An unexpected error occurred.";
      setStatusMessage(errText);
    }
  };

  const handleDirectMailtoFallback = () => {
    const encodedSub = encodeURIComponent(subject || "Inquiry from Portfolio");
    const encodedBody = encodeURIComponent(`${message}\n\n— From: ${senderName} (${senderEmail})`);
    window.location.href = `mailto:jainabhiral7@gmail.com?subject=${encodedSub}&body=${encodedBody}`;
  };

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#f5f5f7] pt-28 md:pt-36 pb-24 selection:bg-accent selection:text-black">
      
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/5 rounded-full blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- PAGE HEADER --- */}
        <div ref={headerRef} className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2 contact-anim">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-xs tracking-widest uppercase text-accent font-bold font-mono">
              03 / Communications
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase leading-[1.05] tracking-tight contact-anim">
            Get in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-200 to-white">
              Touch.
            </span>
          </h1>

          <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed contact-anim">
            Have a project inquiry, software engineering role, or technical collaboration? Send a direct dispatch below via the integrated NodeMailer engine.
          </p>
        </div>

        {/* --- MAIN CONTACT GRID --- */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column (5 Cols): Direct Verified Channels & Meta */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="contact-card p-8 rounded-2xl border border-borderDark bg-[#121214]/80 backdrop-blur-sm hover:border-accent transition-all duration-500 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Mail size={22} />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Primary Contact
                </span>
              </div>

              <div className="space-y-1 mb-6">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Direct Email Address
                </div>
                <a
                  href="mailto:jainabhiral7@gmail.com"
                  className="text-lg sm:text-xl font-display font-bold text-white hover:text-accent transition-colors block break-all"
                >
                  jainabhiral7@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Magnetic strength={0.2} range={50}>
                  <a
                    href="mailto:jainabhiral7@gmail.com"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00c5dd] transition-all"
                  >
                    <Send size={13} />
                    <span>Open Email Client</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.2} range={50}>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-full border border-borderDark hover:border-accent bg-[#0c0c0e] text-zinc-300 hover:text-white text-xs font-mono transition-all"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Social Coordinates Cards (LinkedIn & GitHub) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/jainabhiral/?isSelfProfile=true"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card p-6 rounded-2xl border border-borderDark bg-[#121214]/70 hover:border-accent hover:bg-[#141418] transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Professional</div>
                  <div className="text-base font-display font-bold text-white group-hover:text-accent transition-colors">
                    LinkedIn
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                    in/jainabhiral
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AbhiralJain07"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card p-6 rounded-2xl border border-borderDark bg-[#121214]/70 hover:border-accent hover:bg-[#141418] transition-all duration-300 group flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                    <Github size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Source Code</div>
                  <div className="text-base font-display font-bold text-white group-hover:text-accent transition-colors">
                    GitHub
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                    @AbhiralJain07
                  </div>
                </div>
              </a>
            </div>

            {/* Availability & Location Telemetry Badge */}
            <div className="contact-card p-6 rounded-2xl border border-borderDark bg-[#0c0c0e]/90 space-y-4">
              <div className="flex items-center justify-between border-b border-borderDark pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-xs font-mono font-semibold uppercase text-emerald-400">
                    Status: Available
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  SLA: &lt; 24 hrs
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1">
                    <MapPin size={12} />
                    <span>Location</span>
                  </div>
                  <div className="text-zinc-300 font-semibold">Bhopal, India</div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-500 flex items-center gap-1">
                    <Clock size={12} />
                    <span>Local Time (IST)</span>
                  </div>
                  <div className="text-zinc-300 font-semibold">
                    {currentTime || "Loading..."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): NodeMailer Interactive Form */}
          <div className="lg:col-span-7 contact-card">
            <div className="rounded-3xl border border-borderDark bg-[#121214]/90 p-8 md:p-10 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-accent text-xs font-mono uppercase tracking-wider">
                  <MessageSquare size={14} />
                  <span>NodeMailer Dispatch Terminal</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Send a Direct Message.
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  Enter your details below to dispatch a message directly to Abhiral&apos;s verified inbox via server-side NodeMailer.
                </p>
              </div>

              {/* Status Alerts */}
              {status === "success" ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <Check size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-bold text-white">
                      Message Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-200/80 font-mono">
                      {statusMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-emerald-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                  >
                    <RefreshCw size={13} />
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                  
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">Transmission issue:</div>
                          <div>{statusMessage}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleDirectMailtoFallback}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded text-[11px] whitespace-nowrap transition-colors"
                      >
                        Use Mailto
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name-field" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Your Name / Organization <span className="text-accent">*</span>
                      </label>
                      <input
                        id="name-field"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Alex Smith / Tech Corp"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0e] border border-borderDark focus:border-accent text-white placeholder-zinc-600 text-sm font-sans outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email-field" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Your Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email-field"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0e] border border-borderDark focus:border-accent text-white placeholder-zinc-600 text-sm font-sans outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject-field" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Subject / Topic
                    </label>
                    <input
                      id="subject-field"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Full-Stack / ML Engineering Role"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0e] border border-borderDark focus:border-accent text-white placeholder-zinc-600 text-sm font-sans outline-none transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message-field" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Message Content <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message-field"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your project, team requirements, or collaboration inquiry..."
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0c0c0e] border border-borderDark focus:border-accent text-white placeholder-zinc-600 text-sm font-sans outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Form Footer */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-accent" />
                      <span>NodeMailer Backend • Secure Transport</span>
                    </div>

                    <Magnetic strength={0.3} range={60}>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00c5dd] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Send via NodeMailer</span>
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* --- QUICK ACTION NAVIGATION STRIP --- */}
        <div className="pt-12 border-t border-borderDark flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-display font-semibold text-[#f5f5f7]">
              Looking to review my credentials or works first?
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              Jump back to explore experience timeline or download resume.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/experience-projects"
              className="px-5 py-2.5 rounded-full border border-borderDark hover:border-accent bg-[#121214]/60 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all"
            >
              ← Experience & Projects
            </Link>
            <Link
              href="/tech-stack-resume"
              className="px-5 py-2.5 rounded-full bg-accent/10 border border-accent/40 text-accent hover:bg-accent hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all"
            >
              Tech Stack & Resume →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
