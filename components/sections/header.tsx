'use client';

import Image from 'next/image';
import { ThemeToggle } from '@/components/common/theme-toggle';

export function Header() {
  return (
    <div className='fixed top-6 left-1/2 -translate-x-1/2 z-50'>
      <div
        className='
    flex items-center justify-between gap-3
    w-[92vw] max-w-md 
    px-4 py-2
    rounded-full
    border border-border
    bg-background/60
    backdrop-blur-xl
    shadow-lg
  '
      >
        {/* AVATAR */}
        <div className='relative w-9 h-9'>
          <Image
            src='/magaiveravatar.jpg'
            alt='Magaiver'
            fill
            className='
              rounded-full 
              object-cover
              transition-all duration-300
              hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
            '
          />
        </div>

        {/* NAME */}
        <span className='text-sm font-medium tracking-wide truncate'>
          Magaiver Tech
        </span>

        {/* DIVIDER */}
        <div className='hidden md:block w-px h-4 bg-border' />

        <span className='hidden md:block text-xs text-muted-foreground'>
          Available
        </span>

        <div className='hidden md:block w-px h-4 bg-border' />

        {/* DIVIDER */}
        <div className='w-px h-4 bg-border' />

        {/* LANGUAGE (placeholder) */}
        <button className='text-xs opacity-70 hover:opacity-100 transition'>
          PT | EN
        </button>

        {/* THEME */}
        <ThemeToggle />
      </div>
    </div>
  );
}
