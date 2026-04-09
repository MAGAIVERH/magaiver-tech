// 'use client';

// import { useState } from 'react';

// export function GlowButton({ children }: { children: React.ReactNode }) {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [hovered, setHovered] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     setPosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   return (
//     <div
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className='relative inline-block'
//     >
//       {/* Glow */}
//       <div
//         className='pointer-events-none absolute inset-0 rounded-lg opacity-0 transition duration-300 z-0'
//         style={{
//           opacity: hovered ? 1 : 0,
//           background: `radial-gradient(
//             120px circle at ${position.x}px ${position.y}px,
//             rgba(255,255,255,0.25),
//             transparent 70%
//           )`,
//         }}
//       />

//       {children}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';

export function GlowButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

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
            ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)'},
            transparent 70%
          )`,
        }}
      />

      {children}
    </div>
  );
}
