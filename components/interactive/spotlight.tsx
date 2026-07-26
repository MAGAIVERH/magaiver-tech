'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

/**
 * Exponential-decay follow rate (see `cursor.tsx`): frame-rate independent, so
 * the glow keeps the same softness at 60Hz and 144Hz. Deliberately slower than
 * the cursor ring, since this layer is ambient light rather than the pointer.
 */
const LAMBDA = 11;
const MAX_FRAME_MS = 50;

function getIsTouch() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function GlobalSpotlight() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [isTouch] = useState(getIsTouch);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const syncPosition = () => {
      const x = `${pos.current.x}px`;
      const y = `${pos.current.y}px`;

      if (layerRef.current) {
        layerRef.current.style.setProperty('--x', x);
        layerRef.current.style.setProperty('--y', y);
      }
    };

    let seenPointer = false;

    const onMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      // Start the glow under the pointer rather than dragging it across the
      // page from the (0, 0) origin on the very first move.
      if (!seenPointer) {
        seenPointer = true;
        pos.current.x = event.clientX;
        pos.current.y = event.clientY;
        syncPosition();
      }

      if (reducedMotion) {
        pos.current.x = mouse.current.x;
        pos.current.y = mouse.current.y;
        syncPosition();
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    if (reducedMotion) {
      syncPosition();
      return () => window.removeEventListener('mousemove', onMove);
    }

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, MAX_FRAME_MS) / 1000;
      const lerp = 1 - Math.exp(-LAMBDA * dt);

      pos.current.x += (mouse.current.x - pos.current.x) * lerp;
      pos.current.y += (mouse.current.y - pos.current.y) * lerp;
      syncPosition();
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
    };
  }, [isTouch]);

  if (isTouch) {
    return (
      <>
        <div
          className={cn(
            'spotlight-orb-main pointer-events-none fixed -top-[10%] -right-[15%] z-spotlight',
            'h-[min(70vw,400px)] w-[min(70vw,400px)] rounded-full blur-3xl',
          )}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(180,180,255,0.14) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(15,23,42,0.06) 0%, transparent 70%)',
          }}
        />

        <div
          className={cn(
            'spotlight-orb-secondary pointer-events-none fixed -bottom-[5%] -left-[20%] z-spotlight',
            'h-[min(60vw,340px)] w-[min(60vw,340px)] rounded-full blur-3xl',
          )}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(200,160,255,0.10) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(15,23,42,0.04) 0%, transparent 70%)',
          }}
        />
      </>
    );
  }

  return (
    <div
      ref={layerRef}
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 z-spotlight transition-opacity duration-500',
        isDark ? 'spotlight-dark' : 'spotlight-light',
      )}
      style={
        {
          '--x': '50vw',
          '--y': '40vh',
        } as React.CSSProperties
      }
    />
  );
}

/** @deprecated Use GlobalSpotlight in layout instead. Kept for backward compatibility. */
export function Spotlight() {
  return <GlobalSpotlight />;
}
