'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { useLenis } from '@/components/providers/lenis-provider';
import { loadScrollTrigger } from '@/lib/gsap-scroll-trigger';

const REVEAL_START = 'top 85%';
const REVEAL_EASE = 'power3.out';
const REVEAL_DURATION = 0.65;

type RevealVariant = 'fade-up' | 'title';

type Props = {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  variant = 'fade-up',
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useLenis();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (prefersReducedMotion) {
        gsap.set(el, { clearProps: 'all', opacity: 1, x: 0, y: 0, clipPath: 'none' });
        return;
      }

      let cancelled = false;

      const from =
        variant === 'title'
          ? { opacity: 0, x: -32, clipPath: 'inset(0 100% 0 0)' }
          : { opacity: 0, y: 24 };

      const to =
        variant === 'title'
          ? { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
          : { opacity: 1, y: 0 };

      void loadScrollTrigger().then(() => {
        if (cancelled || !containerRef.current) return;

        gsap.fromTo(containerRef.current, from, {
          ...to,
          duration: variant === 'title' ? 0.8 : REVEAL_DURATION,
          ease: REVEAL_EASE,
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: REVEAL_START,
            once: true,
          },
        });
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: containerRef, dependencies: [delay, variant, prefersReducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      className={cn(variant === 'title' && 'overflow-hidden', className)}
    >
      {children}
    </div>
  );
}
