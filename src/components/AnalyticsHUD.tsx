"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Cpu, Activity, X, ChevronUp, ChevronDown } from "lucide-react";
import gsap from "gsap";

interface Log {
  time: string;
  msg: string;
}

type ArchetypeType = "EXPLORER" | "RECRUITER" | "DESIGNER" | "ENGINEER";

export default function AnalyticsHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  
  // Sensory States
  const [cursorVelocity, setCursorVelocity] = useState(0);
  const [maxCursorVelocity, setMaxCursorVelocity] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [hoverCount, setHoverCount] = useState({ visual: 0, tech: 0, nav: 0 });
  const [dwellTime, setDwellTime] = useState(0); // in seconds
  const [idleRatio, setIdleRatio] = useState(0); // percentage

  // Model Probability States
  const [probabilities, setProbabilities] = useState({
    EXPLORER: 100,
    RECRUITER: 0,
    DESIGNER: 0,
    ENGINEER: 0,
  });
  const [activeArchetype, setActiveArchetype] = useState<ArchetypeType>("EXPLORER");

  // Telemetry references
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const mouseVelocityBuffer = useRef<number[]>([]);
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const lastActivityTime = useRef(Date.now());
  const totalIdleTime = useRef(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Helper to add live terminal logs
  const addLog = (msg: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs((prev) => {
      const updated = [...prev, { time: timeStr, msg }];
      return updated.slice(-15); // keep last 15 logs
    });
  };

  // Scroll to bottom of terminal when logs update
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Initial setup logs
  useEffect(() => {
    addLog("SYS: SENSORS ACTIVE V1.04");
    addLog("SYS: CONNECTING CLASSIFIER MODULES...");
    addLog("SYS: HEURISTIC NEURAL WEIGHTS READY");
    addLog("SYS: PREDICTING BASELINE -> EXPLORER");
  }, []);

  // Tracking sensors
  useEffect(() => {
    // 1. Mouse Velocity tracking
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = (now - lastMousePos.current.time) / 1000;
      lastActivityTime.current = now;

      if (dt > 0.01) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const velocity = Math.round(dist / dt); // pixels per second

        // Buffer and average velocity to smooth noise
        mouseVelocityBuffer.current.push(velocity);
        if (mouseVelocityBuffer.current.length > 10) {
          mouseVelocityBuffer.current.shift();
        }
        const avgVel = Math.round(
          mouseVelocityBuffer.current.reduce((a, b) => a + b, 0) /
            mouseVelocityBuffer.current.length
        );

        setCursorVelocity(avgVel);
        if (avgVel > maxCursorVelocity) {
          setMaxCursorVelocity(avgVel);
          // Log extreme speeds
          if (avgVel > 1800) {
            addLog(`TRIG: SPEED_PEAK_DETECTED (${avgVel} px/s)`);
          }
        }
      }

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    // 2. Scroll depth and speed tracking
    const handleScroll = () => {
      const now = Date.now();
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depthPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollDepth(depthPercent);

      const dt = (now - lastScrollTime.current) / 1000;
      lastActivityTime.current = now;

      if (dt > 0.02) {
        const dy = Math.abs(scrollTop - lastScrollTop.current);
        const speed = Math.round(dy / dt);
        setScrollVelocity(speed);

        if (speed > 1200) {
          addLog("TRIG: FAST_SCROLL_BURST");
        }
      }

      lastScrollTop.current = scrollTop;
      lastScrollTime.current = now;
    };

    // 3. Hover elements listener (Event Delegation)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isNav = target.closest("a, button, [role='button']");
      const isTech = target.closest(".skill-tag");
      const isVisual = target.closest("canvas, [data-cursor], img, .project-row");

      if (isTech) {
        setHoverCount((prev) => ({ ...prev, tech: prev.tech + 1 }));
        const text = target.textContent?.trim().slice(0, 15) || "tag";
        addLog(`HOVER: Skill "${text}"`);
      } else if (isVisual) {
        setHoverCount((prev) => ({ ...prev, visual: prev.visual + 1 }));
        const label = target.closest(".project-row") ? "Project Row" : target.tagName.toLowerCase();
        addLog(`HOVER: Visual (${label})`);
      } else if (isNav) {
        setHoverCount((prev) => ({ ...prev, nav: prev.nav + 1 }));
        addLog("HOVER: Navigation element");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [maxCursorVelocity]);

  // Dwell, Idle time, and ML Classifier interval runs (every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      // Increment dwell time
      setDwellTime((prev) => prev + 1);

      // Check idle time (no event recorded for > 3.0s)
      const now = Date.now();
      const elapsedSinceActivity = (now - lastActivityTime.current) / 1000;
      if (elapsedSinceActivity > 3.0) {
        totalIdleTime.current += 1;
      }

      // Update idle ratio
      setDwellTime((prevDwell) => {
        const ratio = prevDwell > 0 ? Math.round((totalIdleTime.current / prevDwell) * 100) : 0;
        setIdleRatio(ratio);
        return prevDwell;
      });

      // Decay scroll speed metric slowly to zero when scrolling stops
      setScrollVelocity((prev) => Math.max(0, Math.round(prev * 0.5)));
      setCursorVelocity((prev) => Math.max(0, Math.round(prev * 0.75)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ML Inference Loop (runs every 1.5 seconds to compute archetype probabilities)
  useEffect(() => {
    const inferenceTimer = setInterval(() => {
      // 1. Calculate features
      const totalHovers = hoverCount.visual + hoverCount.tech + hoverCount.nav;
      const visualShare = totalHovers > 0 ? hoverCount.visual / totalHovers : 0;
      const techShare = totalHovers > 0 ? hoverCount.tech / totalHovers : 0;
      const navShare = totalHovers > 0 ? hoverCount.nav / totalHovers : 0;

      // 2. Base Heuristic Scores
      // Recruiter: High scroll, low dwell relative to scroll, focuses on nav/contact, ignores visuals/tech tags
      let recruiterScore = 0;
      if (scrollDepth > 20) recruiterScore += 15;
      if (scrollVelocity > 500) recruiterScore += 20;
      if (navShare > 0.4) recruiterScore += 25;
      if (dwellTime > 0 && scrollDepth > 0) {
        const speedRatio = scrollDepth / (dwellTime + 1);
        if (speedRatio > 2.0) recruiterScore += 30; // speed reader
      }
      recruiterScore -= (hoverCount.tech * 2.0) + (hoverCount.visual * 1.5);

      // Designer: Focuses heavily on canvases, particle spheres, image elements, moves slower
      let designerScore = 0;
      if (hoverCount.visual > 0) designerScore += hoverCount.visual * 8;
      if (visualShare > 0.45) designerScore += 25;
      if (scrollVelocity < 300 && scrollDepth > 0) designerScore += 15;
      if (idleRatio > 10 && idleRatio < 40) designerScore += 10; // pauses to look

      // Engineer: Focuses heavily on skill tags, detail grids, reads project texts
      let engineerScore = 0;
      if (hoverCount.tech > 0) engineerScore += hoverCount.tech * 12;
      if (techShare > 0.4) engineerScore += 30;
      if (dwellTime > 25) engineerScore += 15;
      engineerScore -= (scrollVelocity * 0.02);

      // Explorer: Baseline / Balanced. Starts high, slowly decays.
      let explorerScore = Math.max(0, 45 - (dwellTime * 0.8));

      // Rectify scores to absolute non-negatives
      const rScore = Math.max(0, recruiterScore);
      const dScore = Math.max(0, designerScore);
      const eScore = Math.max(0, engineerScore);
      const exScore = Math.max(0, explorerScore);

      const sum = rScore + dScore + eScore + exScore;

      if (sum > 0) {
        const rProb = Math.round((rScore / sum) * 100);
        const dProb = Math.round((dScore / sum) * 100);
        const eProb = Math.round((eScore / sum) * 100);
        const exProb = 100 - (rProb + dProb + eProb); // Ensure sum is exactly 100%

        setProbabilities({
          EXPLORER: Math.max(0, exProb),
          RECRUITER: rProb,
          DESIGNER: dProb,
          ENGINEER: eProb,
        });

        // Determine highest archetype
        const scores: { type: ArchetypeType; val: number }[] = [
          { type: "EXPLORER", val: exProb },
          { type: "RECRUITER", val: rProb },
          { type: "DESIGNER", val: dProb },
          { type: "ENGINEER", val: eProb },
        ];
        scores.sort((a, b) => b.val - a.val);

        if (scores[0].type !== activeArchetype) {
          setActiveArchetype(scores[0].type);
          addLog(`MODEL: PRED_SHIFT -> ${scores[0].type} (${scores[0].val}%)`);
        }
      }
    }, 1500);

    return () => clearInterval(inferenceTimer);
  }, [hoverCount, scrollDepth, scrollVelocity, dwellTime, idleRatio, activeArchetype]);

  // Publish telemetry to window for Terminal CLI integration
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__visitorTelemetry = {
        activeArchetype,
        probabilities,
        hoverCount,
        cursorVelocity,
        scrollDepth,
        idleRatio,
        dwellTime
      };
    }
  }, [activeArchetype, probabilities, hoverCount, cursorVelocity, scrollDepth, idleRatio, dwellTime]);

  // GSAP animation for slide-in / scale-up on toggle
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power4.out" }
      );
    }
  }, [isOpen]);

  // Get color depending on the predicted archetype
  const getThemeColor = (type: ArchetypeType) => {
    switch (type) {
      case "RECRUITER":
        return "#ffb300"; // Warm Yellow-Orange
      case "DESIGNER":
        return "#00e5ff"; // Cyan
      case "ENGINEER":
        return "#d500f9"; // Violet / Pink
      default:
        return "#a1a1aa"; // Zinc
    }
  };

  const getArchetypeMeta = (type: ArchetypeType) => {
    switch (type) {
      case "RECRUITER":
        return {
          title: "Speed Recruiter",
          desc: "Browsing behavior shows high efficiency. Targeted vertical scans, checking core nav options, and focus on contacts/admin. Minimizing visual dwell to verify key assets quickly.",
        };
      case "DESIGNER":
        return {
          title: "Design Connoisseur",
          desc: "Browsing behavior indicates visual inspection. Engaging with animations, particle canvases, image cards, and custom cursor elements. Taking pauses to digest layouts.",
        };
      case "ENGINEER":
        return {
          title: "Technical Architect",
          desc: "Browsing behavior suggests deep structure logic lookup. Reviewing programming stack, tech listings, skill tags, and exploring case studies with steady read pace.",
        };
      default:
        return {
          title: "Passive Explorer",
          desc: "Baseline browsing state. Analyzing visitor behavior to calibrate features. Keep scrolling or interact with components to run active classification.",
        };
    }
  };

  const activeMeta = getArchetypeMeta(activeArchetype);
  const themeColor = getThemeColor(activeArchetype);

  return (
    <>
      {/* 1. COLLAPSED BADGE (BOTTOM LEFT) */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-[99] hidden md:block">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-full border border-borderDark bg-[#0c0c0e]/85 backdrop-blur-md hover:border-[#00e5ff]/50 shadow-2xl transition-all duration-300 group cursor-none"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: themeColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: themeColor }}
              />
            </span>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5f5f7] font-semibold group-hover:text-accent transition-colors flex items-center gap-1.5">
              <Cpu size={12} className="text-accent" />
              ML CLASSIFIER: {activeMeta.title} ({probabilities[activeArchetype]}%)
            </span>

            <ChevronUp size={12} className="text-zinc-500 group-hover:text-accent transition-colors" />
          </button>
        </div>
      )}

      {/* 2. EXPANDED HUD SIDE-PANEL */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-[99] w-[350px] md:w-[380px] hidden md:block">
          <div
            ref={panelRef}
            className="bg-[#0b0b0c]/90 border border-borderDark rounded-lg backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.85)] p-5 flex flex-col font-mono text-[11px] leading-relaxed tracking-wider text-zinc-400 select-none overflow-hidden relative"
            style={{ borderColor: `${themeColor}25` }}
          >
            {/* Tech Scan Line Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20" />

            {/* Glowing Accent Border top */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] shadow-[0_2px_15px_rgba(0,229,255,0.5)]"
              style={{ backgroundColor: themeColor }}
            />

            {/* PANEL HEADER */}
            <div className="flex items-center justify-between pb-3 border-b border-borderDark mb-4">
              <div className="flex items-center space-x-2">
                <Cpu size={14} className="text-accent animate-pulse" />
                <span className="text-xs font-bold text-[#f5f5f7] tracking-widest uppercase">
                  CLASSIFIER_SYS_V1.04
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-borderDark rounded text-zinc-500 hover:text-accent transition-all cursor-none"
              >
                <X size={14} />
              </button>
            </div>

            {/* SENSED TELEMETRY Dials */}
            <div className="space-y-3 mb-4">
              <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1">
                <Activity size={10} className="text-accent" />
                [ Live Interaction Telemetry ]
              </div>

              {/* Cursor speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span>CURS_VELOCITY:</span>
                  <span className="text-[#f5f5f7] font-semibold">{cursorVelocity} px/s</span>
                </div>
                <div className="h-1 bg-borderDark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-150"
                    style={{ width: `${Math.min(100, (cursorVelocity / 2000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Scroll speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span>SCROLL_DEPTH:</span>
                  <span className="text-[#f5f5f7] font-semibold">{scrollDepth}% depth</span>
                </div>
                <div className="h-1 bg-borderDark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${scrollDepth}%` }}
                  />
                </div>
              </div>

              {/* Hover count */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span>HOVER_DENSITY:</span>
                  <span className="text-[#f5f5f7] font-semibold">
                    v:{hoverCount.visual} / t:{hoverCount.tech} / n:{hoverCount.nav}
                  </span>
                </div>
                <div className="h-1 bg-borderDark rounded-full overflow-hidden flex">
                  {/* Segmented bar for visual, tech and nav hovers */}
                  {(() => {
                    const total = hoverCount.visual + hoverCount.tech + hoverCount.nav;
                    if (total === 0) return <div className="w-0 bg-transparent" />;
                    return (
                      <>
                        <div
                          className="h-full bg-[#00e5ff] transition-all duration-300"
                          style={{ width: `${(hoverCount.visual / total) * 100}%` }}
                        />
                        <div
                          className="h-full bg-[#d500f9] transition-all duration-300"
                          style={{ width: `${(hoverCount.tech / total) * 100}%` }}
                        />
                        <div
                          className="h-full bg-[#ffb300] transition-all duration-300"
                          style={{ width: `${(hoverCount.nav / total) * 100}%` }}
                        />
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Idle percentage */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex justify-between text-[10px]">
                  <span>SESSION_TIME:</span>
                  <span className="text-[#f5f5f7]">{dwellTime}s</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>IDLE_RATIO:</span>
                  <span className="text-[#f5f5f7]">{idleRatio}%</span>
                </div>
              </div>
            </div>

            {/* CLASSIFICATION OUTPUT */}
            <div
              className="bg-[#0f0f11] rounded border border-borderDark p-3 mb-4 relative"
              style={{ borderColor: `${themeColor}20` }}
            >
              <div className="text-[9px] uppercase font-bold text-zinc-500 mb-1.5 tracking-widest">
                [ MODEL PREDICTION ]
              </div>
              <div
                className="text-sm font-black uppercase tracking-wider mb-2"
                style={{ color: themeColor }}
              >
                &gt;&gt;&gt; {activeMeta.title}
              </div>

              {/* Confidence bars */}
              <div className="space-y-1.5 mb-2.5">
                {Object.entries(probabilities).map(([key, value]) => {
                  const isCurrent = key === activeArchetype;
                  const barColor = getThemeColor(key as ArchetypeType);
                  return (
                    <div key={key} className="flex items-center text-[9px] space-x-2">
                      <span className={`w-14 uppercase ${isCurrent ? "text-[#f5f5f7] font-semibold" : "text-zinc-600"}`}>
                        {key.slice(0, 5)}
                      </span>
                      <div className="flex-grow h-1.5 bg-borderDark rounded-sm overflow-hidden relative">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${value}%`,
                            backgroundColor: barColor,
                            opacity: isCurrent ? 1 : 0.4,
                          }}
                        />
                      </div>
                      <span className={`w-8 text-right ${isCurrent ? "text-[#f5f5f7] font-semibold" : "text-zinc-600"}`}>
                        {value}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">{activeMeta.desc}</p>
            </div>

            {/* LOG TERMINAL */}
            <div className="space-y-1.5 flex flex-col flex-grow">
              <div className="text-[9px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                <Terminal size={10} className="text-emerald-500" />
                [ Sensor Logs Stream ]
              </div>
              <div className="bg-[#050506] border border-borderDark rounded p-2 h-24 overflow-y-auto font-mono text-[9px] text-emerald-500/90 space-y-1 custom-scrollbar">
                {logs.map((log, index) => (
                  <div key={index} className="flex space-x-1.5 items-start">
                    <span className="text-emerald-950">[{log.time}]</span>
                    <span className="break-all">{log.msg}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 py-1.5 border border-borderDark hover:border-accent bg-[#0c0c0e] text-[9px] text-center text-zinc-500 hover:text-accent font-bold uppercase transition-all rounded flex items-center justify-center gap-1 cursor-none"
            >
              <ChevronDown size={12} />
              COLLAPSE DASHBOARD
            </button>
          </div>
        </div>
      )}
    </>
  );
}
