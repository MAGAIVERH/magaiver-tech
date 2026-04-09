// 'use client';

// import { useEffect, useState } from 'react';

// export function Cursor() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     const handleMouseOver = (e: Event) => {
//       const target = e.target as HTMLElement;

//       if (
//         target.closest('button') ||
//         target.closest('a') ||
//         target.closest('.cursor-hover')
//       ) {
//         setHovered(true);
//       } else {
//         setHovered(false);
//       }
//     };

//     window.addEventListener('mousemove', move);
//     window.addEventListener('mouseover', handleMouseOver);

//     return () => {
//       window.removeEventListener('mousemove', move);
//       window.removeEventListener('mouseover', handleMouseOver);
//     };
//   }, []);

//   return (
//     <div
//       className='pointer-events-none fixed z-50 transition-transform duration-150'
//       style={{
//         left: position.x,
//         top: position.y,
//         transform: 'translate(-50%, -50%)',
//       }}
//     >
//       <div
//         className={`rounded-full border transition-all duration-200 backdrop-blur-md
//         ${
//           hovered
//             ? 'h-12 w-12 bg-black/40 border-black/40 dark:bg-white/30 dark:border-white/50'
//             : 'h-6 w-6 bg-black/30 border-black/30 dark:bg-white/20 dark:border-white/30'
//         }`}
//       />
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const isTouch =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    // MOUSE (desktop)
    const move = (e: MouseEvent) => {
      if (isTouch) return;
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: Event) => {
      if (isTouch) return;

      const target = e.target as HTMLElement;

      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-hover')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    // TOUCH (mobile)
    const touchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX,
        y: touch.clientY,
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);

    window.addEventListener('touchmove', touchMove);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchmove', touchMove);
    };
  }, [isTouch]);

  return (
    <div
      className='pointer-events-none fixed z-50 transition-transform duration-75'
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* 🔥 MOBILE → só bolinha */}
      {isTouch ? (
        <div className='h-4 w-4 rounded-full bg-black/40 dark:bg-white/40' />
      ) : (
        /* 🔥 DESKTOP → mantém efeito original */
        <div
          className={`rounded-full border transition-all duration-200 backdrop-blur-md ${
            hovered
              ? 'h-12 w-12 bg-black/40 border-black/40 dark:bg-white/30 dark:border-white/50'
              : 'h-6 w-6 bg-black/30 border-black/30 dark:bg-white/20 dark:border-white/30'
          }`}
        />
      )}
    </div>
  );
}
