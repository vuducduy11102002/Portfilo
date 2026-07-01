"use client";

import { Code2, Link2, Mail } from "lucide-react";
import { useI18n } from "@/components/providers/language-provider";
import { siteConfig } from "@/data/site";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: Code2 },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Link2 },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-0.5 text-sm text-muted">
            © {new Date().getFullYear()} · {t.footer.built}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted transition hover:border-accent/40 hover:text-accent"
              aria-label={label}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
