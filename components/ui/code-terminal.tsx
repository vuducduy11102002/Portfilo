"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TerminalRobot } from "@/components/ui/terminal-robot";

type LineType = "cmd" | "out" | "ok";
type Line = { text: string; type: LineType };

const LINES: Line[] = [
  { text: "$ whoami", type: "cmd" },
  { text: "Vũ Đức Duy — Full Stack Developer", type: "out" },
  { text: "$ cat stack.json", type: "cmd" },
  { text: '{ "backend": ["Node.js", "NestJS", "FastAPI"],', type: "out" },
  { text: '  "data": ["PostgreSQL", "MongoDB", "Redis"] }', type: "out" },
  { text: "$ ./hire-me --status", type: "cmd" },
  { text: "✔ available for new opportunities", type: "ok" },
];

const colorByType: Record<LineType, string> = {
  cmd: "text-foreground",
  out: "text-muted",
  ok: "text-accent",
};

export function CodeTerminal({ className }: { className?: string }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) {
      setLineIdx(LINES.length);
      setCharIdx(0);
      return;
    }
    if (lineIdx >= LINES.length) return;

    const line = LINES[lineIdx];
    if (charIdx < line.text.length) {
      const speed = line.type === "cmd" ? 42 : 16;
      const id = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 320);
    return () => clearTimeout(id);
  }, [lineIdx, charIdx, reduce]);

  const done = lineIdx >= LINES.length;

  return (
    <div
      className={cn(
        "glass relative w-full overflow-hidden rounded-xl font-mono text-[13px] shadow-2xl shadow-black/20",
        className,
      )}
    >
      {/* Vệt sáng tự lướt qua định kỳ — gợi ý bề mặt tương tác */}
      <div
        aria-hidden
        className="shine-sweep pointer-events-none absolute inset-0 z-20"
      />

      {/* Thanh tiêu đề */}
      <div className="relative flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs text-muted">duy@portfolio ~ zsh</span>
        <TerminalRobot />
      </div>

      {/* Thân terminal */}
      <div className="min-h-[188px] space-y-1 p-4 leading-relaxed">
        {LINES.map((line, i) => {
          if (i > lineIdx) return null;
          const shown = i < lineIdx ? line.text : line.text.slice(0, charIdx);
          const isCurrent = i === lineIdx && !done;
          return (
            <div key={i} className={cn("whitespace-pre-wrap", colorByType[line.type])}>
              {shown}
              {isCurrent && (
                <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[0.15em] animate-pulse bg-accent" />
              )}
            </div>
          );
        })}
        {done && (
          <span className="inline-block h-[1.05em] w-[7px] translate-y-[0.15em] animate-pulse bg-accent" />
        )}
      </div>
    </div>
  );
}
