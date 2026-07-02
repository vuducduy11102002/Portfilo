"use client";

import { motion } from "framer-motion";
import { BookOpen, Hammer, Quote, Telescope, type LucideIcon } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { nowItems } from "@/data/now";
import { tr } from "@/lib/i18n/types";
import {
  AnimatedSection,
  Reveal,
  Stagger,
  staggerItem,
} from "@/components/ui/animated-section";

const iconByKey: Record<string, LucideIcon> = {
  building: Hammer,
  learning: BookOpen,
  exploring: Telescope,
};

export function Now() {
  const { t, locale } = useI18n();
  const labelByKey: Record<string, string> = {
    building: t.now.building,
    learning: t.now.learning,
    exploring: t.now.exploring,
  };

  return (
    <AnimatedSection id="now" className="scroll-mt-20 py-24">
      <Reveal>
        <p className="font-mono text-sm text-accent">{t.now.tag}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.now.title}
        </h2>
      </Reveal>

      <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {nowItems.map((it) => {
          const Icon = iconByKey[it.icon];
          return (
            <motion.div
              key={it.icon}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/30"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-center gap-2 text-accent">
                <Icon size={17} />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  {labelByKey[it.icon]}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {tr(locale, it.text)}
              </p>
            </motion.div>
          );
        })}

        {/* Châm ngôn */}
        <motion.div
          variants={staggerItem}
          className="relative flex flex-col justify-center overflow-hidden rounded-xl border border-accent/25 bg-accent-muted/40 p-5"
        >
          <Quote
            size={40}
            className="absolute -right-1 -top-1 text-accent/15"
            fill="currentColor"
          />
          <p className="relative text-base font-medium leading-relaxed text-foreground italic">
            &ldquo;{t.now.quote}&rdquo;
          </p>
        </motion.div>
      </Stagger>
    </AnimatedSection>
  );
}
