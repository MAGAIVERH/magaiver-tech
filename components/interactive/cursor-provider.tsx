'use client';

import { Cursor } from '@/components/interactive/cursor';

export function CursorProvider() {
  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouch) return null;

  return <Cursor />;
}
