"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/intro/logo-mark";
import { useI18n } from "@/components/providers/language-provider";
import { faqs } from "@/data/faq";
import { siteConfig } from "@/data/site";
import { tr } from "@/lib/i18n/types";

const HINT_KEY = "portfolio-chat-hint";

type Turn = { type: "q" | "a"; id: string };

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <LogoMark name={siteConfig.name} size="sm" />
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-card/70 px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line text-foreground">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-foreground px-3.5 py-2.5 text-sm font-medium text-background">
        {children}
      </div>
    </div>
  );
}

export function ChatWidget() {
  const { t, locale } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<Turn[]>([]);
  const [showHint, setShowHint] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Coach-mark: hiện ngay khi vào trang (sau khi intro tan), chỉ lần đầu
  useEffect(() => {
    if (!mounted) return;
    let seen = false;
    try {
      seen = localStorage.getItem(HINT_KEY) === "1";
    } catch {}
    if (seen) return;

    const id = setTimeout(() => setShowHint(true), 3600);
    return () => clearTimeout(id);
  }, [mounted]);

  // Auto-scroll xuống cuối khi có tin nhắn mới / mở panel
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [thread, open]);

  function markSeen() {
    setShowHint(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
  }

  function toggleOpen() {
    setOpen((o) => !o);
    markSeen();
  }

  const answered = new Set(
    thread.filter((m) => m.type === "q").map((m) => m.id),
  );
  const remaining = faqs.filter((f) => !answered.has(f.id));
  const byId = (id: string) => faqs.find((f) => f.id === id)!;

  function ask(id: string) {
    setThread((prev) => [...prev, { type: "q", id }, { type: "a", id }]);
  }

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Panel chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="glass flex max-h-[70vh] w-[min(92vw,25rem)] flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/25"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <LogoMark name={siteConfig.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {siteConfig.name}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {t.ask.status}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.ask.close}
                className="text-muted transition hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tin nhắn */}
            <div
              ref={listRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              <BotBubble>{t.ask.greeting}</BotBubble>
              {thread.map((m, i) =>
                m.type === "q" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <UserBubble>{tr(locale, byId(m.id).question)}</UserBubble>
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.12 }}
                  >
                    <BotBubble>{tr(locale, byId(m.id).answer)}</BotBubble>
                  </motion.div>
                ),
              )}
            </div>

            {/* Chip câu hỏi / kết thúc */}
            <div className="border-t border-border/60 px-4 py-3">
              {remaining.length > 0 ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {remaining.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => ask(f.id)}
                        className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted transition hover:border-accent/40 hover:text-accent"
                      >
                        {tr(locale, f.question)}
                      </button>
                    ))}
                  </div>
                  {thread.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setThread([])}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-accent"
                    >
                      <RotateCcw size={12} />
                      {t.ask.reset}
                    </button>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted">{t.ask.allDone}</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="#contact"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition hover:opacity-90"
                    >
                      {t.ask.contactCta}
                      <ArrowRight size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setThread([])}
                      className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-accent"
                    >
                      <RotateCcw size={12} />
                      {t.ask.reset}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coach-mark khi cuộn tới cuối trang */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="relative mr-1 max-w-[21rem]"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl rounded-br-sm border-2 border-accent/40 bg-card p-5 shadow-xl shadow-accent/25 ring-1 ring-accent/10"
            >
              <button
                type="button"
                onClick={markSeen}
                aria-label={t.ask.close}
                className="absolute right-3 top-3 text-muted transition hover:text-foreground"
              >
                <X size={16} />
              </button>
              <p className="pr-5 text-base leading-relaxed text-foreground">
                {t.ask.hint}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bong bóng */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? t.ask.close : t.ask.open}
        className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-3 text-background shadow-lg shadow-accent/30 transition-transform hover:scale-105 active:scale-95"
      >
        {showHint && !open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            {open ? <X size={26} /> : <MessageCircle size={26} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
