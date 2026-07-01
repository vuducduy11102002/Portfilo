"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

/** Section wrapper — fade + rise khi cuộn tới. Dùng cho mọi section chính. */
export function AnimatedSection({
  id,
  className,
  children,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.section>
  );
}

type Direction = "up" | "down" | "left" | "right";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
};

/** Phần tử con reveal độc lập. `FadeIn` giữ lại như alias tương thích. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const from = offset[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...from }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn(props: RevealProps) {
  return <Reveal {...props} />;
}

/** Container stagger — con dùng `staggerItem`. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
