'use client';

import { useEffect, useState } from 'react';

type UseScrollSpyOptions = {
  sectionIds: string[];
  threshold?: number;
  rootMargin?: string;
};

function resolveSections(ids: string[]): HTMLElement[] {
  const elements: HTMLElement[] = [];

  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) elements.push(element);
  }

  return elements;
}

export function useScrollSpy({
  sectionIds,
  threshold = 0.2,
  rootMargin = '-12% 0px -58% 0px',
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionKey ? sectionKey.split(',') : [];
    if (ids.length === 0) return;

    const ratios = new Map<string, number>();
    let observer: IntersectionObserver | null = null;
    let retryId = 0;
    let cancelled = false;

    const updateActive = () => {
      let bestId: string | null = null;
      let bestRatio = 0;

      for (const [id, ratio] of ratios) {
        if (ratio >= threshold && ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      setActiveId(bestId);
    };

    const attach = (elements: HTMLElement[]) => {
      observer?.disconnect();

      for (const id of ids) {
        ratios.set(id, 0);
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = entry.target.id;
            if (!id) continue;
            ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          }
          updateActive();
        },
        {
          rootMargin,
          threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        },
      );

      for (const element of elements) {
        observer.observe(element);
      }
    };

    const tryAttach = (attempt = 0) => {
      if (cancelled) return;

      const elements = resolveSections(ids);
      if (elements.length > 0) {
        attach(elements);
        return;
      }

      if (attempt < 20) {
        retryId = window.setTimeout(() => tryAttach(attempt + 1), 100);
      }
    };

    tryAttach();

    return () => {
      cancelled = true;
      window.clearTimeout(retryId);
      observer?.disconnect();
    };
  }, [sectionKey, threshold, rootMargin]);

  return activeId;
}
