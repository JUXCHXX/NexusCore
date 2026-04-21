"use client";
import { useEffect, useRef } from "react";
import anime from "animejs";

export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(options?: {
  delay?: number;
  duration?: number;
  translateY?: number;
  threshold?: number;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [options?.translateY ?? 24, 0],
            duration: options?.duration ?? 700,
            delay: options?.delay ?? 0,
            easing: "cubicBezier(0.16, 1, 0.3, 1)",
          });
          observer.unobserve(el);
        }
      },
      { threshold: options?.threshold ?? 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.delay, options?.duration, options?.translateY, options?.threshold]);

  return ref;
}
