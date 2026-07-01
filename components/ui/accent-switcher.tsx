"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers/language-provider";

const ACCENT_KEY = "portfolio-accent";

const ACCENTS = [
  { key: "violet", labelVi: "Tím", labelEn: "Violet", dot: "#a78bfa" },
  { key: "blue", labelVi: "Xanh dương", labelEn: "Blue", dot: "#60a5fa" },
  { key: "emerald", labelVi: "Xanh lá", labelEn: "Emerald", dot: "#34d399" },
  { key: "amber", labelVi: "Cam", labelEn: "Amber", dot: "#fbbf24" },
  { key: "rose", labelVi: "Hồng", labelEn: "Rose", dot: "#fb7185" },
];

export function AccentSwitcher() {
  const { t, locale } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState("blue");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const a = localStorage.getItem(ACCENT_KEY);
      if (a) setAccent(a);
    } catch {}
  }, []);

  // Đóng popover khi bấm ra ngoài
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function pick(key: string) {
    setAccent(key);
    document.documentElement.setAttribute("data-accent", key);
    try {
      localStorage.setItem(ACCENT_KEY, key);
    } catch {}
    setOpen(false);
  }

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-border bg-card" aria-hidden />
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.a11y.accentColor}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted transition hover:border-accent/40 hover:text-accent"
      >
        <Palette size={17} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="glass absolute right-0 top-11 z-50 w-44 rounded-xl p-2 shadow-xl shadow-black/20"
          >
            <p className="px-2 py-1 text-xs font-medium text-muted">
              {t.a11y.accentColor}
            </p>
            {ACCENTS.map((a) => {
              const active = accent === a.key;
              return (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => pick(a.key)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-foreground transition hover:bg-muted-bg"
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: a.dot }}
                  />
                  <span className="flex-1 text-left">
                    {locale === "vi" ? a.labelVi : a.labelEn}
                  </span>
                  {active && <Check size={14} className="text-accent" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
