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
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // MOUSE
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: Event) => {
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

    const touchStart = () => {
      setHovered(true);
    };

    const touchEnd = () => {
      setHovered(false);
    };

    // Listeners
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);

    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchend', touchEnd);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);

      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchstart', touchStart);
      window.removeEventListener('touchend', touchEnd);
    };
  }, []);

  return (
    <div
      className='pointer-events-none fixed z-50 transition-transform duration-150'
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full border transition-all duration-200 backdrop-blur-md ${
          hovered
            ? isTouch
              ? 'h-8 w-8 bg-black/30 dark:bg-white/20'
              : 'h-12 w-12 bg-black/40 border-black/40 dark:bg-white/30 dark:border-white/50'
            : 'h-6 w-6 bg-black/30 border-black/30 dark:bg-white/20 dark:border-white/30'
        }`}
      />
    </div>
  );
}
