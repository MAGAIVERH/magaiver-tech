// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { useTheme } from 'next-themes';

// export function Spotlight() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isTouch, setIsTouch] = useState<boolean | null>(null);
//   const { resolvedTheme } = useTheme();

//   const isTouchRef = useRef<boolean | null>(
//     typeof window !== 'undefined'
//       ? window.matchMedia('(pointer: coarse)').matches
//       : null,
//   );

//   useEffect(() => {
//     setIsTouch(isTouchRef.current);
//   }, []);

//   useEffect(() => {
//     if (isTouch) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [isTouch]);

//   if (isTouch === null) return null;

//   const isDark = resolvedTheme === 'dark';

//   if (isTouch) {
//     return (
//       <>
//         <style>{`
//           @keyframes orb-pulse {
//             0%, 100% { opacity: 0.55; transform: scale(1); }
//             50% { opacity: 0.80; transform: scale(1.08); }
//           }
//           @keyframes orb-drift {
//             0%, 100% { transform: translateY(0px) scale(1); }
//             33% { transform: translateY(-18px) scale(1.04); }
//             66% { transform: translateY(10px) scale(0.97); }
//           }
//           .orb-main {
//             animation: orb-pulse 6s ease-in-out infinite, orb-drift 12s ease-in-out infinite;
//           }
//           .orb-secondary {
//             animation: orb-pulse 9s ease-in-out infinite reverse, orb-drift 16s ease-in-out infinite reverse;
//           }
//         `}</style>

//         <div
//           className='orb-main pointer-events-none fixed z-0'
//           style={{
//             top: '-10%',
//             right: '-15%',
//             width: '70vw',
//             height: '70vw',
//             maxWidth: '400px',
//             maxHeight: '400px',
//             borderRadius: '50%',
//             background: isDark
//               ? 'radial-gradient(circle, rgba(180,180,255,0.18) 0%, rgba(120,120,220,0.10) 40%, transparent 70%)'
//               : 'radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.05) 40%, transparent 70%)',
//             filter: 'blur(40px)',
//           }}
//         />

//         <div
//           className='orb-secondary pointer-events-none fixed z-0'
//           style={{
//             bottom: '5%',
//             left: '-20%',
//             width: '60vw',
//             height: '60vw',
//             maxWidth: '340px',
//             maxHeight: '340px',
//             borderRadius: '50%',
//             background: isDark
//               ? 'radial-gradient(circle, rgba(200,160,255,0.14) 0%, rgba(140,100,220,0.08) 40%, transparent 70%)'
//               : 'radial-gradient(circle, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.03) 40%, transparent 70%)',
//             filter: 'blur(50px)',
//           }}
//         />
//       </>
//     );
//   }

//   // DESKTOP: spotlight original — sem alteração
//   const spotlightColor = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)';

//   const radius = isDark ? 800 : 500;

//   return (
//     <div
//       className='pointer-events-none fixed inset-0 z-50'
//       style={{
//         background: `radial-gradient(
//           ${radius}px at ${position.x}px ${position.y}px,
//           ${spotlightColor},
//           transparent 70%
//         )`,
//       }}
//     />
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

function getIsTouch() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export function Spotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch] = useState(getIsTouch);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  const isDark = resolvedTheme === 'dark';

  if (isTouch) {
    return (
      <>
        <style>{`
          @keyframes orb-pulse {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50% { opacity: 0.80; transform: scale(1.08); }
          }
          @keyframes orb-drift {
            0%, 100% { transform: translateY(0px) scale(1); }
            33% { transform: translateY(-18px) scale(1.04); }
            66% { transform: translateY(10px) scale(0.97); }
          }
          .orb-main {
            animation: orb-pulse 6s ease-in-out infinite, orb-drift 12s ease-in-out infinite;
          }
          .orb-secondary {
            animation: orb-pulse 9s ease-in-out infinite reverse, orb-drift 16s ease-in-out infinite reverse;
          }
        `}</style>

        <div
          className='orb-main pointer-events-none fixed z-0'
          style={{
            top: '-10%',
            right: '-15%',
            width: '70vw',
            height: '70vw',
            maxWidth: '400px',
            maxHeight: '400px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(180,180,255,0.18) 0%, rgba(120,120,220,0.10) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.05) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div
          className='orb-secondary pointer-events-none fixed z-0'
          style={{
            bottom: '5%',
            left: '-20%',
            width: '60vw',
            height: '60vw',
            maxWidth: '340px',
            maxHeight: '340px',
            borderRadius: '50%',
            background: isDark
              ? 'radial-gradient(circle, rgba(200,160,255,0.14) 0%, rgba(140,100,220,0.08) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.03) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </>
    );
  }

  // DESKTOP: código original — sem nenhuma alteração
  const spotlightColor =
    resolvedTheme === 'dark'
      ? `rgba(255,255,255,0.20)`
      : `rgba(0,0,0,0.20) 0%,
       rgba(0,0,0,0.35) 55%,
       rgba(0,0,0,0.80) 20%,
       transparent 80%`;

  const radius = resolvedTheme === 'light' ? 400 : 800;

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
