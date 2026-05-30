'use client';

import { useCallback } from 'react';
import type { ScrollToOptions } from 'lenis';
import { useLenis } from '@/components/providers/lenis-provider';

type ScrollToTargetOptions = Pick<ScrollToOptions, 'offset' | 'immediate' | 'duration'>;

export function useScrollTo() {
  const { lenis, prefersReducedMotion } = useLenis();

  return useCallback(
    (id: string, options?: ScrollToTargetOptions) => {
      const target = id.startsWith('#') ? id : `#${id}`;

      if (lenis && !prefersReducedMotion) {
        lenis.scrollTo(target, options);
        return;
      }

      const element = document.querySelector<HTMLElement>(target);
      if (!element) return;

      element.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    },
    [lenis, prefersReducedMotion],
  );
}
