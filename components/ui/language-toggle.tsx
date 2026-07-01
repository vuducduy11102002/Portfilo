"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/providers/language-provider";
import { LOCALES, type Locale } from "@/lib/i18n/types";

const labels: Record<Locale, string> = { vi: "VI", en: "EN" };

export function LanguageToggle({ idSuffix = "default" }: { idSuffix?: string }) {
  const { locale, setLocale, t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-[68px] rounded-lg border border-border bg-card"
        aria-hidden
      />
    );
  }

  return (
    <div
      role="group"
      aria-label={t.a11y.switchLang}
      className="relative inline-flex h-9 items-center rounded-lg border border-border bg-card p-0.5 text-xs font-semibold"
    >
      {LOCALES.map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              active ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`lang-active-${idSuffix}`}
                className="absolute inset-0 -z-10 rounded-md bg-accent/15 ring-1 ring-accent/30"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            {labels[l]}
          </button>
        );
      })}
    </div>
  );
}
