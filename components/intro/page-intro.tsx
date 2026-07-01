"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/components/providers/language-provider";
import { siteConfig } from "@/data/site";
import { tr } from "@/lib/i18n/types";
import { LogoMark } from "@/components/intro/logo-mark";

type PageIntroProps = {
  children: React.ReactNode;
};

const DURATION = 2400;

export function PageIntro({ children }: PageIntroProps) {
  const { t, locale } = useI18n();
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  const dismiss = useCallback(() => {
    setShowIntro(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(dismiss, DURATION);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [dismiss]);

  if (!mounted) {
    return <div className="min-h-screen bg-background" aria-hidden />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            onClick={dismiss}
            className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-intro-bg"
            exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* aurora nền cho intro */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
            >
              <div
                className="aurora-blob left-1/4 top-1/4 h-64 w-64"
                style={{
                  background: "rgba(96,165,250,0.30)",
                  animation: "aurora-drift-a 8s ease-in-out infinite",
                }}
              />
              <div
                className="aurora-blob bottom-1/4 right-1/4 h-64 w-64"
                style={{
                  background: "rgba(129,140,248,0.24)",
                  animation: "aurora-drift-b 10s ease-in-out infinite",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center"
            >
              <LogoMark name={siteConfig.name} size="lg" />

              <motion.p
                className="mt-8 text-sm font-medium tracking-[0.35em] text-accent uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {t.intro.label}
              </motion.p>

              <motion.h1
                className="mt-3 text-2xl font-bold tracking-tight text-intro-fg sm:text-3xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                {siteConfig.name}
              </motion.h1>

              <motion.p
                className="mt-2 text-sm text-intro-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5 }}
              >
                {tr(locale, siteConfig.role)}
              </motion.p>
            </motion.div>

            <motion.div
              className="absolute bottom-16 h-0.5 w-48 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: DURATION / 1000 - 0.4, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.span
              className="absolute bottom-8 text-xs tracking-wide text-intro-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {t.intro.skip}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, delay: showIntro ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
