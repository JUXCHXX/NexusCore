"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      anime.remove(el);
      anime({
        targets: el,
        left: e.clientX - 150,
        top: e.clientY - 150,
        duration: 800,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="cursor-glow hidden md:block" style={{ left: -300, top: -300 }} />;
}
