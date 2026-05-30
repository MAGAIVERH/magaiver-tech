'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { loadScrollTrigger } from '@/lib/gsap-scroll-trigger';

type LenisContextValue = {
  lenis: Lenis | null;
  prefersReducedMotion: boolean;
  isCoarsePointer: boolean;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenis(): LenisContextValue {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within LenisProvider');
  }
  return context;
}

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    const syncMotion = () => setPrefersReducedMotion(motionQuery.matches);
    const syncPointer = () => setIsCoarsePointer(pointerQuery.matches);

    syncMotion();
    syncPointer();

    motionQuery.addEventListener('change', syncMotion);
    pointerQuery.addEventListener('change', syncPointer);

    return () => {
      motionQuery.removeEventListener('change', syncMotion);
      pointerQuery.removeEventListener('change', syncPointer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      'reduce-motion',
      prefersReducedMotion,
    );
    return () => document.documentElement.classList.remove('reduce-motion');
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isCoarsePointer) {
      setLenis(null);
      return;
    }

    let cancelled = false;
    let instance: Lenis | null = null;
    let onScroll: (() => void) | null = null;

    void loadScrollTrigger().then((ScrollTrigger) => {
      if (cancelled) return;

      const startLenis = () => {
        if (cancelled) return;

        instance = new Lenis({
          duration: 1.2,
          smoothWheel: true,
          autoRaf: true,
        });

        onScroll = () => ScrollTrigger.update();
        instance.on('scroll', onScroll);
        setLenis(instance);
      };

      const schedule =
        typeof requestIdleCallback === 'function'
          ? (cb: () => void) => requestIdleCallback(cb, { timeout: 1500 })
          : (cb: () => void) => setTimeout(cb, 1);

      schedule(startLenis);
    });

    return () => {
      cancelled = true;
      if (instance && onScroll) {
        instance.off('scroll', onScroll);
        instance.destroy();
      }
      setLenis(null);
    };
  }, [prefersReducedMotion, isCoarsePointer]);

  const value = useMemo(
    () => ({ lenis, prefersReducedMotion, isCoarsePointer }),
    [lenis, prefersReducedMotion, isCoarsePointer],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
