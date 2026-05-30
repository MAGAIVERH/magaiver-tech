'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type GlowBorderProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

/** Aceternity-inspired animated border glow on hover */
export function GlowBorder({
  children,
  className,
  innerClassName,
}: GlowBorderProps) {
  return (
    <div
      className={cn(
        'group/glow relative rounded-xl p-[1px] transition-shadow duration-500',
        'hover:shadow-[0_0_28px_-6px_rgba(var(--glow)/0.35)]',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500',
          'group-hover/glow:opacity-100',
          'bg-[conic-gradient(from_var(--border-angle),transparent_0deg,rgba(var(--glow)/0.55)_90deg,transparent_180deg,rgba(var(--glow)/0.35)_270deg,transparent_360deg)]',
          '[--border-angle:0deg]',
          'motion-safe:group-hover/glow:animate-[glow-border-spin_3s_linear_infinite]',
        )}
      />
      <span
        aria-hidden
        className='pointer-events-none absolute inset-[1px] rounded-[11px] bg-card opacity-100'
      />
      <div className={cn('relative rounded-[11px]', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
