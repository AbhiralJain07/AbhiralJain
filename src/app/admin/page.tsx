"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, AlertCircle, Sparkles } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { loginAdmin, isAdminAuthenticated, supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAdminAuthenticated()) {
      router.push("/admin/dashboard");
    }
    // Check if live Supabase is active
    setIsDemo(!supabase);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await loginAdmin(email, password);
      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError(
          isDemo
            ? "Invalid demo credentials. Use 'admin' as email and 'admin' as password."
            : "Authentication failed. Check your admin email and password."
        );
      }
    } catch (err) {
      setError("An error occurred during authentication.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center px-6 relative overflow-hidden">
      
      {/* Decorative radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Back Link */}
      <div className="absolute top-8 left-8">
        <Magnetic>
          <Link href="/" className="flex items-center space-x-2 text-xs tracking-widest uppercase font-bold text-zinc-400 hover:text-accent transition-colors py-2 cursor-none">
            <ArrowLeft size={14} />
            <span>Portfolio</span>
          </Link>
        </Magnetic>
      </div>

      {/* Card Body */}
      <div className="w-full max-w-md bg-cardBg border border-borderDark/80 p-8 rounded-2xl shadow-2xl relative z-10 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-accent/10 text-accent mb-2">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-display font-bold uppercase tracking-wide text-[#f5f5f7]">
            CMS Dashboard Admin
          </h1>
          <p className="text-xs text-zinc-500 font-light">
            Authenticate to modify projects, availability, and bio text.
          </p>
        </div>

        {/* Demo Mode Notice Banner */}
        {isDemo && (
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-borderDark flex items-start space-x-3 text-xs leading-relaxed text-zinc-400">
            <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-accent block mb-0.5">Demo Sandbox Mode Active</span>
              No Supabase environment variables detected. Log in using Email: <code className="text-[#f5f5f7] bg-zinc-800 px-1 py-0.5 rounded font-mono">admin</code> and Password: <code className="text-[#f5f5f7] bg-zinc-800 px-1 py-0.5 rounded font-mono">admin</code>. Data will be saved in your browser's local sandbox.
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2 animate-shake">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Email input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  required
                  placeholder={isDemo ? "admin" : "name@example.com"}
                  className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 pl-10 text-[#f5f5f7] outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                Security Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder={isDemo ? "admin" : "••••••••"}
                  className="w-full bg-zinc-950 border border-borderDark focus:border-accent text-sm rounded-xl py-3 px-4 pl-10 text-[#f5f5f7] outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-[#00c5dd] text-black font-semibold uppercase tracking-wider text-xs py-4 rounded-xl transition-all duration-300 shadow-lg shadow-accent/10"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}
