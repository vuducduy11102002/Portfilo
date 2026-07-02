"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/language-provider";
import { skillCategories } from "@/data/skills";
import { tr } from "@/lib/i18n/types";
import {
  AnimatedSection,
  Reveal,
  Stagger,
  staggerItem,
} from "@/components/ui/animated-section";

export function Skills() {
  const { t, locale } = useI18n();

  return (
    <AnimatedSection id="skills" className="scroll-mt-20 py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">02</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.nav.skills}
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-accent/30"
          >
            {/* glow góc khi hover */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {tr(locale, category.name)}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-muted-bg px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </Stagger>
    </AnimatedSection>
  );
}
