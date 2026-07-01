"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Sparkles } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { projects, type Project } from "@/data/projects";
import { tr } from "@/lib/i18n/types";
import type { Dictionary } from "@/lib/i18n/dictionary";
import {
  AnimatedSection,
  Reveal,
  Stagger,
  staggerItem,
} from "@/components/ui/animated-section";

function ProjectLinks({ project, t }: { project: Project; t: Dictionary }) {
  return (
    <div className="flex flex-wrap gap-4">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
        >
          <Code2 size={15} /> {t.projects.code}
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
        >
          <ArrowUpRight size={15} /> {t.projects.demo}
        </a>
      )}
    </div>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function Projects() {
  const { t, locale } = useI18n();
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);

  return (
    <AnimatedSection id="projects" className="scroll-mt-20 py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">04</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.nav.projects}
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      {/* Dự án nổi bật */}
      {featured && (
        <Reveal delay={0.1}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="gradient-border group mt-10 overflow-hidden p-6 sm:p-8"
          >
            <div className="relative">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/20">
                  <Sparkles size={13} /> {t.projects.featured}
                </span>
                {featured.year && (
                  <span className="font-mono text-xs text-muted">
                    {featured.year}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                {tr(locale, featured.title)}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                {tr(locale, featured.description)}
              </p>

              <div className="mt-5">
                <Tags tags={featured.tags} />
              </div>
              <div className="mt-6">
                <ProjectLinks project={featured} t={t} />
              </div>
            </div>
          </motion.article>
        </Reveal>
      )}

      {/* Lưới dự án còn lại */}
      <Stagger className="mt-6 grid gap-5 sm:grid-cols-2">
        {rest.map((project) => (
          <motion.article
            key={tr(locale, project.title)}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-accent/30"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {tr(locale, project.title)}
              </h3>
              {project.year && (
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              )}
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {tr(locale, project.description)}
            </p>
            <div className="mt-4">
              <Tags tags={project.tags} />
            </div>
            <div className="mt-5">
              <ProjectLinks project={project} t={t} />
            </div>
          </motion.article>
        ))}
      </Stagger>
    </AnimatedSection>
  );
}
