"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Đảo qua lại danh sách vai trò với hiệu ứng trượt dọc + con trỏ nhấp nháy. */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="relative inline-flex h-[1.6em] items-center overflow-hidden align-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient inline-block font-semibold whitespace-nowrap"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        className="inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-accent"
      />
    </span>
  );
}
