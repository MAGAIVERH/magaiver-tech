// 'use client';

// import { useEffect, useState } from 'react';

// export function Spotlight() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setPosition({
//         x: e.clientX,
//         y: e.clientY,
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       className='pointer-events-none fixed inset-0 z-0'
//       style={{
//         background: `radial-gradient(
//           600px at ${position.x}px ${position.y}px,
//           rgba(255,255,255,0.15),
//           transparent 80%
//         )`,
//       }}
//     />
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function Spotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const spotlightColor =
    resolvedTheme === 'dark'
      ? `rgba(255,255,255,0.20)`
      : `rgba(0,0,0,0.20) 0%,
       rgba(0,0,0,0.35) 55%,
       rgba(0,0,0,0.80) 20%,
       transparent 80%`;

  const radius = resolvedTheme === 'light' ? 400 : 800;

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return null;
  }
  return (
    <div
      className='pointer-events-none fixed inset-0 z-50'
      style={{
        background: `radial-gradient(
        ${radius}px at ${position.x}px ${position.y}px,
          ${spotlightColor},
          transparent 70%
        )`,
      }}
    />
  );
}
