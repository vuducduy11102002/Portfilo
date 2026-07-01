"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Góc nghiêng tối đa (độ). */
  max?: number;
  /** Bật vệt sáng (glare) lướt theo con trỏ. */
  glare?: boolean;
  /** Class bo góc cho lớp glare để khớp với phần tử con. */
  glareClassName?: string;
};

/**
 * Bọc phần tử để nó nghiêng 3D theo con trỏ (perspective + rotateX/Y, spring),
 * kèm phóng nhẹ + vệt sáng lướt trên bề mặt khi hover.
 * Tự tắt trên thiết bị cảm ứng và khi prefers-reduced-motion.
 */
export function Tilt({
  children,
  className,
  max = 10,
  glare = false,
  glareClassName = "rounded-xl",
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const px = useMotionValue(0); // -0.5..0.5
  const py = useMotionValue(0);
  const hover = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15, mass: 0.4 };

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.035]), spring);
  const glareOpacity = useSpring(hover, { stiffness: 120, damping: 20 });

  const gx = useTransform(px, (v) => `${(v + 0.5) * 100}%`);
  const gy = useTransform(py, (v) => `${(v + 0.5) * 100}%`);
  // Vệt sáng màu accent (tím → hồng) — hiện rõ ở cả light lẫn dark mode
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, color-mix(in srgb, var(--accent) 55%, transparent) 0%, color-mix(in srgb, var(--accent-3) 30%, transparent) 32%, transparent 60%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onEnter() {
    if (!reduce) hover.set(1);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
    hover.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ perspective: 850 }}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            style={{ background: glareBg, opacity: glareOpacity }}
            className={cn(
              "pointer-events-none absolute inset-0 z-10",
              glareClassName,
            )}
          />
        )}
      </motion.div>
    </div>
  );
}
