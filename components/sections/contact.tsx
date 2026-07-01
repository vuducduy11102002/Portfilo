"use client";

import { motion } from "framer-motion";
import { Code2, Link2, Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useI18n } from "@/components/providers/language-provider";
import { siteConfig } from "@/data/site";
import { tr } from "@/lib/i18n/types";
import { AnimatedSection, Reveal } from "@/components/ui/animated-section";

const inputClass =
  "w-full rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground outline-none backdrop-blur-sm transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-ring/20";

export function Contact() {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent("Portfolio contact");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  return (
    <AnimatedSection id="contact" className="scroll-mt-20 py-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">05</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.nav.contact}
          </h2>
          <span className="h-px flex-1 bg-border" />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal delay={0.1}>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {t.contact.titleLead}{" "}
            <span className="text-gradient">{t.contact.titleAccent}</span>.
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            {t.contact.desc}
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3 text-sm text-muted transition hover:text-accent"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60">
                <Mail size={16} />
              </span>
              {siteConfig.email}
            </a>
            {siteConfig.phone && (
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 text-sm text-muted transition hover:text-accent"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60">
                  <Phone size={16} />
                </span>
                {siteConfig.phone}
              </a>
            )}
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60">
                <MapPin size={16} />
              </span>
              {tr(locale, siteConfig.location)}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted transition hover:border-accent/40 hover:text-accent"
                aria-label="GitHub"
              >
                <Code2 size={17} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted transition hover:border-accent/40 hover:text-accent"
                aria-label="LinkedIn"
              >
                <Link2 size={17} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} direction="left">
          <form
            onSubmit={handleSubmit}
            className="glass space-y-4 rounded-2xl p-6 sm:p-8"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                {t.contact.name}
              </label>
              <input id="name" name="name" required className={inputClass} />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                {t.contact.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                {t.contact.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background shadow-lg shadow-accent/10 transition-shadow hover:shadow-accent/25"
            >
              <Send size={16} />
              {t.contact.send}
            </motion.button>
            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-accent"
              >
                {t.contact.sent}
              </motion.p>
            )}
          </form>
        </Reveal>
      </div>
    </AnimatedSection>
  );
}
