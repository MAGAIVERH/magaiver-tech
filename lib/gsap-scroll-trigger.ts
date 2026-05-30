'use client';

import { gsap } from 'gsap';

type ScrollTriggerStatic = typeof import('gsap/ScrollTrigger').ScrollTrigger;

let pluginPromise: Promise<ScrollTriggerStatic> | null = null;

export function loadScrollTrigger(): Promise<ScrollTriggerStatic> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('ScrollTrigger is client-only'));
  }

  if (!pluginPromise) {
    pluginPromise = import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger;
    });
  }

  return pluginPromise;
}

export async function refreshScrollTrigger(): Promise<void> {
  const ScrollTrigger = await loadScrollTrigger();
  ScrollTrigger.refresh();
}
