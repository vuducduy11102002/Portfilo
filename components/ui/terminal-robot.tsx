"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Robot mini đi qua lại trên thanh tiêu đề terminal — mắt sáng màu accent. */
export function TerminalRobot() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-3 top-1/2 z-10 text-muted"
      style={{ translateY: "-50%" }}
      initial={{ x: 0, scaleX: -1 }}
      animate={
        reduce
          ? undefined
          : { x: [0, -72, -72, 0, 0], scaleX: [-1, -1, 1, 1, -1] }
      }
      transition={{
        duration: 6.5,
        times: [0, 0.42, 0.5, 0.92, 1],
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* nhún nhảy khi bước */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
          {/* ăng-ten */}
          <line
            x1="14"
            y1="3.5"
            x2="14"
            y2="7.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="14" cy="2.6" r="1.7" fill="var(--accent)">
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
          {/* đầu */}
          <rect
            x="6"
            y="7.5"
            width="16"
            height="12"
            rx="3.5"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          {/* mắt */}
          <circle cx="11" cy="13.5" r="1.7" fill="var(--accent)" />
          <circle cx="17" cy="13.5" r="1.7" fill="var(--accent)" />
          {/* chân */}
          <line
            x1="10.5"
            y1="19.5"
            x2="10.5"
            y2="23.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="17.5"
            y1="19.5"
            x2="17.5"
            y2="23.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
