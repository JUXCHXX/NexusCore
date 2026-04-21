"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";

export function useCountUp(value: number, opts?: { duration?: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const fmt = opts?.format ?? ((n: number) => Math.round(n).toLocaleString());
    anime({
      targets: obj,
      v: value,
      duration: opts?.duration ?? 1200,
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
      update: () => { if (el) el.textContent = fmt(obj.v); },
    });
  }, [value, opts?.duration, opts?.format]);
  return ref;
}
