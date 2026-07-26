'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Follow speeds as exponential-decay rates (higher = snappier), not per-frame
 * lerp factors: a fixed factor makes the cursor drift further behind on 60Hz
 * than on 144Hz. `1 - e^(-lambda * dt)` keeps the feel identical on any
 * display. The dot is near-instant so it reads as the pointer itself; the ring
 * trails just enough to feel alive.
 */
const DOT_LAMBDA = 55;
const RING_LAMBDA = 17;

/** Cap the step after a tab switch / dropped frames so nothing teleports. */
const MAX_FRAME_MS = 50;

const HOVER_TARGETS = 'button, a, .cursor-hover, [role="button"]';

function isHoverTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(HOVER_TARGETS));
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const reducedMotion = useRef(false);
  const seenPointer = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Pointer capability is only knowable on the client; sync once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(finePointer.matches);
    reducedMotion.current = motionQuery.matches;

    if (!finePointer.matches) return;

    const onMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      // First sighting: snap both layers onto the pointer instead of letting
      // them crawl in from the top-left origin.
      if (!seenPointer.current) {
        seenPointer.current = true;
        dotPos.current.x = event.clientX;
        dotPos.current.y = event.clientY;
        ringPos.current.x = event.clientX;
        ringPos.current.y = event.clientY;
      }

      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const next = isHoverTarget(event.target);
      if (next === hovering.current) return;

      hovering.current = next;

      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: next ? 1.75 : 1,
          duration: 0.35,
          ease: 'power3.out',
        });
      }
    };

    const onDown = () => {
      if (!dotRef.current || !ringRef.current) return;

      gsap.fromTo(
        dotRef.current,
        { scale: 0.6 },
        { scale: 1, duration: 0.25, ease: 'power3.out' },
      );

      gsap.fromTo(
        ringRef.current,
        { scale: hovering.current ? 1.5 : 0.85 },
        {
          scale: hovering.current ? 1.75 : 1,
          duration: 0.35,
          ease: 'power3.out',
        },
      );
    };

    const tick = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, MAX_FRAME_MS) / 1000;
      const dotLerp = reducedMotion.current
        ? 1
        : 1 - Math.exp(-DOT_LAMBDA * dt);
      const ringLerpValue = reducedMotion.current
        ? 1
        : 1 - Math.exp(-RING_LAMBDA * dt);

      dotPos.current.x += (mouse.current.x - dotPos.current.x) * dotLerp;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * dotLerp;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringLerpValue;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringLerpValue;

      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: dotPos.current.x,
          y: dotPos.current.y,
          xPercent: -50,
          yPercent: -50,
        });
      }

      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: ringPos.current.x,
          y: ringPos.current.y,
          xPercent: -50,
          yPercent: -50,
        });
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      gsap.ticker.remove(tick);
    };
  }, []);

  if (enabled !== true) return null;

  return (
    <div
      className='pointer-events-none fixed inset-0 z-cursor'
      aria-hidden='true'
    >
      <div
        ref={ringRef}
        className={`cursor-ring ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
