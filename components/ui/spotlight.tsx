"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Bán kính vùng sáng (px). */
  size?: number;
};

/**
 * Vùng bọc có đốm sáng radial bám theo con trỏ — hiệu ứng "spotlight".
 * Chỉ hiện khi hover; ẩn tự nhiên trên mobile vì không có con trỏ.
 */
export function Spotlight({ children, className, size = 480 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function reset() {
    mouseX.set(-size);
    mouseY.set(-size);
  }

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ position: "relative" }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
