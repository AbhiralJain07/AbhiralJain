"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key="page-container" className="relative">
        {/* Fullscreen wipe transition overlay */}
        <motion.div
          className="fixed inset-0 bg-background z-[999] pointer-events-none origin-top flex flex-col justify-end"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle accent border running at the bottom of the wipe */}
          <div className="h-[2px] w-full bg-accent" />
        </motion.div>

        {/* Content reveal container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
