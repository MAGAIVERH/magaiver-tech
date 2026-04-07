'use client';

import { useState } from 'react';

export function GlowButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='relative inline-block'
    >
      {/* Glow */}
      <div
        className='pointer-events-none absolute inset-0 rounded-lg opacity-0 transition duration-300 z-0'
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(
            120px circle at ${position.x}px ${position.y}px,
            rgba(255,255,255,0.25),
            transparent 70%
          )`,
        }}
      />

      {children}
    </div>
  );
}
