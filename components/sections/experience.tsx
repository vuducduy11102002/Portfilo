"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/language-provider";
import { education, experiences } from "@/data/experience";
import { tr } from "@/lib/i18n/types";
import { AnimatedSection, Reveal } from "@/components/ui/animated-section";

export function Experience() {
  const { t, locale } = useI18n();

  return (
    <AnimatedSection id="experience" className="scroll-mt-20 py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">03</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.nav.experience}
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <div className="relative mt-12 pl-8 sm:pl-10">
        {/* Đường dọc timeline */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-2/50 to-transparent sm:left-[9px]" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <Reveal key={`${tr(locale, exp.company)}-${tr(locale, exp.period)}`} delay={i * 0.1}>
              <div className="relative">
                {/* Chấm mốc */}
                <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center sm:-left-10">
                  <motion.span
                    className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-background"
                    whileInView={{ scale: [0.6, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  />
                </span>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/30 sm:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {tr(locale, exp.role)}
                      <span className="text-accent"> · {tr(locale, exp.company)}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {tr(locale, exp.period)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {tr(locale, exp.description)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Education */}
      <Reveal delay={0.1}>
        <h3 className="mt-16 mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted uppercase">
          <GraduationCap size={16} className="text-accent" />
          {t.experience.education}
        </h3>
        <div className="rounded-xl border border-border bg-card/60 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="text-lg font-semibold text-foreground">
              {tr(locale, education.school)}
            </h4>
            <span className="font-mono text-xs text-muted">
              {tr(locale, education.period)}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {tr(locale, education.degree)}
          </p>
        </div>
      </Reveal>
    </AnimatedSection>
  );
}
