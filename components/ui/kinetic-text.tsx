"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};

const charVariant: Variants = {
  hidden: { y: "0.55em", opacity: 0, filter: "blur(10px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type KineticTextProps = {
  text: string;
  className?: string;
  /**
   * Class áp cho TỪNG ký tự. Đặt gradient (vd `.text-gradient-animate`) ở đây,
   * KHÔNG đặt trên span cha — vì mỗi ký tự có transform nên clip gradient phải
   * nằm ngay trên chính nó, nếu không chữ sẽ trong suốt.
   */
  charClassName?: string;
};

/** Hiện headline theo từng ký tự (rise + blur), giữ nguyên từ không xuống dòng giữa chừng. */
export function KineticText({ text, className, charClassName }: KineticTextProps) {
  const words = text.split(" ");

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={ci}
              variants={charVariant}
              aria-hidden
              className={cn("inline-block", charClassName)}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
