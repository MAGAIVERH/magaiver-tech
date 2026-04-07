'use client';

import { ThemeToggle } from '@/components/common/theme-toggle';

export function Header() {
  return (
    <header className='w-full flex items-center justify-between p-4'>
      <span className='font-bold'>Magaiver Tech</span>

      <div className='flex items-center gap-2'>
        <ThemeToggle />
      </div>
    </header>
  );
}
