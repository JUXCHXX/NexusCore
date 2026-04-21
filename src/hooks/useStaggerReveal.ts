"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";

/** Stagger reveal de cualquier elemento con [data-animate] dentro del contenedor. */
export function useStaggerReveal(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-animate]");
    if (targets.length === 0) return;
    targets.forEach((t) => (t.style.opacity = "0"));
    anime({
      targets: Array.from(targets),
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      delay: anime.stagger(70, { start: 80 }),
      easing: "cubicBezier(0.16, 1, 0.3, 1)",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
