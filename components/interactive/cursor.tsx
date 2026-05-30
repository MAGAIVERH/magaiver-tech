'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LERP = 0.15;
const RING_LERP = 0.1;

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

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setEnabled(finePointer.matches);
    reducedMotion.current = motionQuery.matches;

    if (!finePointer.matches) return;

    const onMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
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

    const tick = () => {
      const dotLerp = reducedMotion.current ? 1 : LERP;
      const ringLerpValue = reducedMotion.current ? 1 : RING_LERP;

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
