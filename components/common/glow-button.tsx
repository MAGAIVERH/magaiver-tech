'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

function getIsFinePointer() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(pointer: fine)').matches;
}

export function GlowButton({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(true);
  const { resolvedTheme } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setIsFinePointer(getIsFinePointer());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    wrapRef.current?.style.setProperty('--glow-x', `${x}px`);
    wrapRef.current?.style.setProperty('--glow-y', `${y}px`);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isFinePointer && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='relative inline-block'
      style={
        {
          '--glow-x': '50%',
          '--glow-y': '50%',
          '--glow-radius': isDark ? '110px' : '90px',
          '--glow-color': isDark
            ? 'rgba(var(--glow) / 0.22)'
            : 'rgba(var(--glow) / 0.07)',
        } as React.CSSProperties
      }
    >
      {isFinePointer && (
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 z-0 rounded-lg transition-opacity duration-300'
          style={{
            opacity: hovered ? 1 : 0,
            background:
              'radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 72%)',
          }}
        />
      )}

      {children}
    </div>
  );
}
