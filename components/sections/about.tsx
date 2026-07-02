"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { principles } from "@/data/principles";
import { siteConfig } from "@/data/site";
import { tr } from "@/lib/i18n/types";
import {
  AnimatedSection,
  Reveal,
  Stagger,
  staggerItem,
} from "@/components/ui/animated-section";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

const principleIcons: Record<string, LucideIcon> = {
  performance: Zap,
  architecture: Layers,
  reliability: ShieldCheck,
  automation: Wrench,
};

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: GithubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

export function About() {
  const { t, locale } = useI18n();

  return (
    <AnimatedSection id="about" className="scroll-mt-20 py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">01</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.nav.about}
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed whitespace-pre-line text-muted sm:text-lg">
            {tr(locale, siteConfig.about)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
              >
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} direction="left">
          <div className="grid gap-4">
            {siteConfig.stats.map((stat, i) => (
              <motion.div
                key={tr(locale, stat.label)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/30"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <p className="text-gradient text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{tr(locale, stat.label)}</p>
              </motion.div>
            ))}
            <div className="flex items-center gap-2 px-1 pt-1 text-sm text-muted">
              <MapPin size={15} className="text-accent" />
              {tr(locale, siteConfig.location)}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Nguyên tắc làm việc */}
      <Reveal delay={0.1}>
        <h3 className="mt-14 mb-5 text-sm font-semibold tracking-wide text-muted uppercase">
          {t.about.principlesTitle}
        </h3>
      </Reveal>
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p) => {
          const Icon = principleIcons[p.icon];
          return (
            <motion.div
              key={p.icon}
              variants={staggerItem}
              className="rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/30"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <Icon size={18} />
              </span>
              <h4 className="mt-3 text-sm font-semibold text-foreground">
                {tr(locale, p.title)}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {tr(locale, p.description)}
              </p>
            </motion.div>
          );
        })}
      </Stagger>
    </AnimatedSection>
  );
}
