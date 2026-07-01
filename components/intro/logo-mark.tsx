"use client";

import { motion } from "framer-motion";
import { getInitials } from "@/lib/initials";

type LogoMarkProps = {
  name: string;
  size?: "sm" | "lg";
};

export function LogoMark({ name, size = "lg" }: LogoMarkProps) {
  const initials = getInitials(name);
  const isLarge = size === "lg";

  if (!isLarge) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent-muted text-xs font-bold text-accent">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative flex h-28 w-28 items-center justify-center">
      {/* Vòng tròn viền vẽ dần */}
      <motion.svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="50%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          className="opacity-15"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#logo-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
        />
      </motion.svg>

      {/* Khối initials với viền gradient */}
      <motion.div
        className="gradient-border relative flex h-20 w-20 items-center justify-center rounded-2xl"
        initial={{ scale: 0, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.4 }}
      >
        <span className="text-gradient text-3xl font-bold">{initials}</span>
      </motion.div>

      {/* Glow toả */}
      <motion.div
        className="absolute inset-0 rounded-full bg-accent/25 blur-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.4, opacity: [0, 0.6, 0.35] }}
        transition={{ duration: 1.4, delay: 0.5 }}
      />
    </div>
  );
}
