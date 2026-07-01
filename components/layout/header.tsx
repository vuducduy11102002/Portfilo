"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/intro/logo-mark";
import { useI18n } from "@/components/providers/language-provider";
import { siteConfig } from "@/data/site";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

const navIds = ["about", "skills", "experience", "projects", "contact"] as const;
const sectionIds = ["hero", ...navIds];

export function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const { t } = useI18n();

  const navItems = navIds.map((id) => ({ id, label: t.nav[id] }));

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
        >
          <LogoMark name={siteConfig.name} size="sm" />
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-accent/10 ring-1 ring-accent/20"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
          <span className="mx-2 h-5 w-px bg-border" />
          <LanguageToggle />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground"
            aria-label={t.a11y.toggleMenu}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors",
                    active === item.id
                      ? "bg-accent/10 text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
