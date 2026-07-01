"use client";

import { useI18n } from "@/components/providers/language-provider";
import { metrics } from "@/data/metrics";
import { tr } from "@/lib/i18n/types";
import { Reveal, Stagger, staggerItem } from "@/components/ui/animated-section";
import { CountUp } from "@/components/ui/count-up";
import { motion } from "framer-motion";

export function Metrics() {
  const { t, locale } = useI18n();

  return (
    <section id="metrics" className="scroll-mt-20 py-16">
      {/* Hairline gradient trên — separator tinh tế */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="py-12">
        <Reveal>
          <p className="mb-8 text-center font-mono text-sm text-accent">
            {t.metrics.tag}
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {metrics.map((m) => (
            <motion.div
              key={tr(locale, m.label)}
              variants={staggerItem}
              className="text-center"
            >
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-gradient">
                  {m.prefix}
                  <CountUp to={m.value} />
                  {m.suffix}
                </span>
              </p>
              <p className="mx-auto mt-2 max-w-[16ch] text-sm leading-snug text-muted">
                {tr(locale, m.label)}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>

      {/* Hairline gradient dưới */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
