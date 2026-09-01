"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X } from "lucide-react";
import { getProjects, Project } from "@/lib/supabase";
import gsap from "gsap";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

export default function TerminalCLI() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<LogLine[]>([
    { text: "AJ_OS [Version 1.04.26]", type: "system" },
    { text: "(c) 2026 Abhiral Jain Corporation. All rights reserved.", type: "system" },
    { text: "", type: "system" },
    { text: "Type 'help' to fetch command directory or press ` to close.", type: "system" },
    { text: "", type: "system" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrix, setIsMatrix] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const drawerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch projects database on mount
  useEffect(() => {
    async function loadData() {
      const data = await getProjects();
      setProjects(data);
    }
    loadData();
  }, []);

  // Web Audio keypress click synthesizer
  const playKeyPressSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Mechanical sound signature: short duration high frequency pop
      osc.frequency.setValueAtTime(600 + Math.random() * 400, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignore initial audio block flags
    }
  };

  // Keyboard shortcut ` (backtick) global listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle Matrix state off with any key
      if (isMatrix) {
        setIsMatrix(false);
        e.preventDefault();
        return;
      }

      if (e.key === "`" || e.key === "~") {
        // Prevent toggle if user is typing in forms / admin console
        const active = document.activeElement;
        const isInput = active && (
          active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.getAttribute("contenteditable") === "true"
        );

        if (!isInput) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isMatrix]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Slide-in animation using GSAP
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Matrix screensaver renderer
  useEffect(() => {
    if (!isMatrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%+=-*";
    const charArr = characters.split("");
    const fontSize = 11;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drop points
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent background to create trailing motion
      ctx.fillStyle = "rgba(7, 7, 8, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00e5ff"; // Terminal style cyan
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop position randomly once it reaches bottom of page
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMatrix]);

  // Shell Command Parser
  const runCommand = (commandStr: string) => {
    const trimmed = commandStr.trim();
    if (!trimmed) return;

    // Save to command history
    setCommandHistory((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)].slice(0, 30));
    setHistoryIndex(-1);

    // Print command line run
    setHistory((prev) => [...prev, { text: `visitor@aj_os:~$ ${trimmed}`, type: "input" }]);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "help":
        setHistory((prev) => [
          ...prev,
          { text: "--------------------------------------------------------", type: "system" },
          { text: "AJ_OS SHELL UTILITIES V1.04 COMMAND DIRECTORY:", type: "system" },
          { text: "  help       - List terminal utilities.", type: "system" },
          { text: "  about      - Read developer biography description.", type: "system" },
          { text: "  skills     - Query full stack & ML technical stack.", type: "system" },
          { text: "  projects   - Query developer database projects.", type: "system" },
          { text: "  project    - Inspect project details. Usage: project <num>", type: "system" },
          { text: "  hud        - Fetch live visitor archetype telemetry from ML HUD.", type: "system" },
          { text: "  matrix     - Toggle green matrix screensaver overlay.", type: "system" },
          { text: "  clear      - Flush terminal logs buffer.", type: "system" },
          { text: "  exit       - Terminate terminal session.", type: "system" },
          { text: "--------------------------------------------------------", type: "system" },
        ]);
        break;

      case "about":
        setHistory((prev) => [
          ...prev,
          { text: "SYS PROFILE: ABHIRAL JAIN", type: "system" },
          { text: "  ROLE   : Creative Developer & Machine Learning Lead", type: "system" },
          { text: "  TEAMS  : Researcher and development team lead at EvolVIT", type: "system" },
          { text: "  SPECIAL: DPDP Act SaaS architectures, sub-200ms ML model inference", type: "system" },
          { text: "  MISSION: Bridging low-level data engineering with visually premium layouts.", type: "system" },
        ]);
        break;

      case "skills":
        setHistory((prev) => [
          ...prev,
          { text: "=================== SOFTWARE STACK ===================", type: "system" },
          { text: "  FRONT-END  :: TypeScript, JavaScript, Next.js, React, GSAP, CSS, Three.js", type: "system" },
          { text: "  BACK-END   :: Node.js, Express, Python, Flask, n8n Backend Automation", type: "system" },
          { text: "  DATABASE   :: PostgreSQL, MongoDB, Cloud Firestore, Supabase SDK", type: "system" },
          { text: "  ML ENGINE  :: Scikit-Learn, NumPy, Pandas, InsightFace Classifier", type: "system" },
          { text: "  CORE ARCh  :: JWT, RBAC security, DPDP compliance audit rules", type: "system" },
          { text: "======================================================", type: "system" },
        ]);
        break;

      case "projects":
        setHistory((prev) => {
          const lines = projects.map((p, idx) => `  [${idx + 1}] ${p.title}`);
          return [
            ...prev,
            { text: "SHOWCASING SECURE DATABASE ENTRIES:", type: "system" },
            ...lines.map((l) => ({ text: l, type: "system" as const })),
            { text: "(Type 'project <num>' to print structural case study logs)", type: "system" },
          ];
        });
        break;

      case "project":
        const index = parseInt(args[0], 10) - 1;
        if (isNaN(index) || index < 0 || index >= projects.length) {
          setHistory((prev) => [
            ...prev,
            { text: "ERROR: Invalid project index. Usage: project <num>. Run 'projects' to check index.", type: "error" },
          ]);
        } else {
          const p = projects[index];
          setHistory((prev) => [
            ...prev,
            { text: `--------------------------------------------------------`, type: "system" },
            { text: `TITLE       : ${p.title}`, type: "system" },
            { text: `DESCRIPTION : ${p.description}`, type: "system" },
            { text: `STACK       : ${p.technologies.join(", ")}`, type: "system" },
            { text: `LINK        : ${p.project_url || "N/A"}`, type: "system" },
            { text: `DETAILS     : ${p.long_description || ""}`, type: "system" },
            { text: `--------------------------------------------------------`, type: "system" },
          ]);
        }
        break;

      case "hud": {
        const telemetry = (window as unknown as {
          __visitorTelemetry?: {
            activeArchetype: string;
            probabilities: Record<string, number>;
            dwellTime: number;
            idleRatio: number;
            cursorVelocity: number;
            scrollDepth: number;
            hoverCount: { visual: number; tech: number; nav: number };
          };
        }).__visitorTelemetry;
        if (telemetry) {
          setHistory((prev) => [
            ...prev,
            { text: "============= ACTIVE USER TELEMETRY RECORD =============", type: "system" },
            { text: `  PRED_ARCHETYPE  :: ${telemetry.activeArchetype} (${telemetry.probabilities[telemetry.activeArchetype]}%)`, type: "system" },
            { text: `  SESSION_TIME    :: ${telemetry.dwellTime}s`, type: "system" },
            { text: `  IDLE_RATIO      :: ${telemetry.idleRatio}%`, type: "system" },
            { text: `  CURS_VELOCITY   :: ${telemetry.cursorVelocity} px/s`, type: "system" },
            { text: `  SCROLL_POSITION :: ${telemetry.scrollDepth}% depth`, type: "system" },
            { text: `  HOVERS_DENSITY  :: visual:${telemetry.hoverCount.visual} | tech:${telemetry.hoverCount.tech} | nav:${telemetry.hoverCount.nav}`, type: "system" },
            { text: "=======================================================", type: "system" },
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { text: "ERROR: Classification telemetry dashboard offline. Mount AnalyticsHUD component.", type: "error" },
          ]);
        }
        break;
      }

      case "matrix":
        setIsMatrix(true);
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
      case "close":
        // Close drawer with GSAP slide-out
        gsap.to(drawerRef.current, {
          x: "100%",
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => setIsOpen(false),
        });
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { text: `ERROR: command not found: "${cmd}". Run "help" to see valid arguments.`, type: "error" },
        ]);
    }
  };

  // Keyboard action parser inside terminal input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeyPressSound();

    if (e.key === "Enter") {
      runCommand(inputValue);
      setInputValue("");
    } else if (e.key === "ArrowUp") {
      // Command history backward navigation
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      // Command history forward navigation
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      if (nextIndex >= 0) {
        setInputValue(commandHistory[nextIndex]);
      } else {
        setInputValue("");
        setHistoryIndex(-1);
      }
    }
  };

  const handleClose = () => {
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setIsOpen(false),
    });
  };

  // Listen to custom event toggles from external page buttons
  useEffect(() => {
    const handleToggleEvent = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggle-terminal", handleToggleEvent);
    return () => window.removeEventListener("toggle-terminal", handleToggleEvent);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={drawerRef}
      onClick={() => inputRef.current?.focus()}
      className="fixed top-0 right-0 h-screen w-full md:w-[600px] z-[100] bg-[#070708]/95 border-l border-borderDark backdrop-blur-md shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col font-mono text-[11px] text-zinc-400 select-none"
    >
      {/* Scanline CRT overlay filter */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none z-10 opacity-30" />

      {/* MATRIX CANVAS */}
      {isMatrix && (
        <div className="absolute inset-0 z-20 cursor-pointer">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#00e5ff] animate-pulse bg-[#070708]/80 px-3 py-1.5 border border-borderDark rounded tracking-widest uppercase">
            Click anywhere or press any key to exit Matrix screen
          </div>
        </div>
      )}

      {/* TERMINAL HEADER */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-borderDark bg-[#09090b] relative z-10">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-accent animate-pulse" />
          <span className="text-[10px] font-bold text-[#f5f5f7] tracking-widest uppercase">
            AJ_OS://COMMAND_DRAWER
          </span>
        </div>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-borderDark rounded text-zinc-500 hover:text-accent transition-all cursor-none"
        >
          <X size={14} />
        </button>
      </div>

      {/* CONSOLE DISPLAY LOG BUFFER */}
      <div className="flex-grow p-6 overflow-y-auto space-y-2 custom-scrollbar relative z-10">
        {history.map((line, idx) => {
          let colorClass = "text-zinc-400";
          if (line.type === "input") colorClass = "text-emerald-400 font-medium";
          else if (line.type === "error") colorClass = "text-red-500 font-bold";
          else if (line.type === "system") colorClass = "text-[#00e5ff]/90";

          return (
            <div key={idx} className={`${colorClass} whitespace-pre-wrap break-words leading-relaxed`}>
              {line.text}
            </div>
          );
        })}
        <div ref={historyEndRef} />
      </div>

      {/* INPUT COMMAND FIELD */}
      <div className="p-5 border-t border-borderDark bg-[#09090b] flex items-center space-x-2 relative z-10">
        <span className="text-emerald-500 font-bold">visitor@aj_os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent border-none outline-none text-emerald-400 font-medium caret-[#00e5ff] w-full"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
