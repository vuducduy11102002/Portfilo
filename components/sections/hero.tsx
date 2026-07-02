"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { siteConfig } from "@/data/site";
import { tr } from "@/lib/i18n/types";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { CodeTerminal } from "@/components/ui/code-terminal";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { KineticText } from "@/components/ui/kinetic-text";
import { HeroAvatar } from "@/components/ui/hero-avatar";
import { Magnetic } from "@/components/ui/magnetic";
import { RoleRotator } from "@/components/ui/role-rotator";
import { Tilt } from "@/components/ui/tilt";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: GithubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center py-16"
    >
      {/* Lưới chấm tương tác, full-bleed, mờ dần ở rìa */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 z-0 h-full w-screen -translate-x-1/2 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,black,transparent)]"
      >
        <InteractiveGrid />
      </div>

      <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Cột trái */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6">
            <HeroAvatar src={siteConfig.avatar} name={siteConfig.name} />
          </motion.div>

          {siteConfig.available && (
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {tr(locale, siteConfig.availableText)}
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="mb-2 text-base font-medium text-muted"
          >
            {t.hero.greeting}
          </motion.p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
            <KineticText
              text={siteConfig.name}
              charClassName="text-gradient-animate"
            />
          </h1>

          <motion.div
            variants={item}
            className="mt-4 text-xl font-medium text-muted sm:text-2xl"
          >
            <RoleRotator roles={tr(locale, siteConfig.roles)} />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {tr(locale, siteConfig.tagline)}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background shadow-lg shadow-accent/10 transition-shadow hover:shadow-accent/25"
              >
                {t.hero.viewProjects}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-card-hover"
              >
                {t.hero.contact}
              </a>
            </Magnetic>
            <a
              href="/cv.pdf"
              download="Vu-Duc-Duy-CV.pdf"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <Download size={16} />
              {t.hero.downloadCV}
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted transition hover:border-accent/40 hover:text-accent"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Cột phải — terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Tilt max={13} glare glareClassName="rounded-xl">
              <CodeTerminal />
            </Tilt>
          </motion.div>
        </motion.div>
      </div>

      {/* Gợi ý cuộn */}
      <motion.a
        href="#about"
        aria-label={t.a11y.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs tracking-wide text-muted sm:inline-flex"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border"
        >
          <ArrowDown size={15} />
        </motion.span>
        {t.hero.explore}
      </motion.a>
    </section>
  );
}
