"use client";
import { useEffect, useRef, useCallback } from "react";
import anime from "animejs";

export function useAnime() {
  const animationsRef = useRef<anime.AnimeInstance[]>([]);

  const animate = useCallback((params: anime.AnimeParams) => {
    const instance = anime(params);
    animationsRef.current.push(instance);
    return instance;
  }, []);

  useEffect(() => {
    return () => {
      animationsRef.current.forEach((a) => a.pause());
      animationsRef.current = [];
    };
  }, []);

  return { animate, anime };
}
