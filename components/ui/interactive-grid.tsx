"use client";

import { useEffect, useRef } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(h)) return null;
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Lưới chấm phủ nền hero. Quanh con trỏ: chấm sáng + ngả về màu accent, và các
 * chấm lân cận được NỐI ĐƯỜNG với nhau tạo hiệu ứng "chòm sao".
 * Canvas + rAF (nhẹ), theme-aware, tạm dừng khi ngoài viewport, đứng yên nếu
 * người dùng bật prefers-reduced-motion.
 */
export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gap = 34;
    const influence = 160;
    let width = 0;
    let height = 0;
    let running = false;
    let cols: number[] = [];
    let rows: number[] = [];

    let accent: [number, number, number] = [167, 139, 250];
    let base: [number, number, number] = [255, 255, 255];

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const a = hexToRgb(cs.getPropertyValue("--accent"));
      const f = hexToRgb(cs.getPropertyValue("--foreground"));
      if (a) accent = a;
      if (f) base = f;
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = [];
      for (let x = gap / 2; x < width; x += gap) cols.push(x);
      rows = [];
      for (let y = gap / 2; y < height; y += gap) rows.push(y);
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Cường độ theo khoảng cách tới con trỏ cho mỗi điểm
      const t: number[][] = [];
      for (let i = 0; i < cols.length; i++) {
        t[i] = [];
        for (let j = 0; j < rows.length; j++) {
          const dx = cols[i] - mx;
          const dy = rows[j] - my;
          t[i][j] = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / influence);
        }
      }

      // Đường nối (chòm sao) — chỉ vẽ quanh con trỏ
      ctx!.lineWidth = 1;
      for (let i = 0; i < cols.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          const here = t[i][j];
          if (i + 1 < cols.length) {
            const m = Math.max(here, t[i + 1][j]);
            if (m > 0.08) {
              ctx!.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${m * 0.45})`;
              ctx!.beginPath();
              ctx!.moveTo(cols[i], rows[j]);
              ctx!.lineTo(cols[i + 1], rows[j]);
              ctx!.stroke();
            }
          }
          if (j + 1 < rows.length) {
            const m = Math.max(here, t[i][j + 1]);
            if (m > 0.08) {
              ctx!.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${m * 0.45})`;
              ctx!.beginPath();
              ctx!.moveTo(cols[i], rows[j]);
              ctx!.lineTo(cols[i], rows[j + 1]);
              ctx!.stroke();
            }
          }
        }
      }

      // Chấm
      for (let i = 0; i < cols.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          const k = t[i][j];
          const r = 1 + k * 2.4;
          const alpha = 0.06 + k * 0.8;
          const cr = Math.round(base[0] + (accent[0] - base[0]) * k);
          const cg = Math.round(base[1] + (accent[1] - base[1]) * k);
          const cb = Math.round(base[2] + (accent[2] - base[2]) * k);
          ctx!.beginPath();
          ctx!.arc(cols[i], rows[j], r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx!.fill();
        }
      }
    }

    function loop() {
      draw();
      raf.current = requestAnimationFrame(loop);
    }

    function start() {
      if (reduce) {
        draw();
        return;
      }
      cancelAnimationFrame(raf.current);
      loop();
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    readColors();
    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce || !running) draw();
    });
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) start();
        else cancelAnimationFrame(raf.current);
      },
      { threshold: 0 },
    );
    io.observe(parent);

    const mo = new MutationObserver(() => {
      readColors();
      if (reduce || !running) draw();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-accent"],
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
