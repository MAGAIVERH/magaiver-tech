'use client';

import dynamic from 'next/dynamic';

const Cursor = dynamic(
  () =>
    import('@/components/interactive/cursor').then((m) => ({
      default: m.Cursor,
    })),
  { ssr: false },
);

const GlobalSpotlight = dynamic(
  () =>
    import('@/components/interactive/spotlight').then((m) => ({
      default: m.GlobalSpotlight,
    })),
  { ssr: false },
);

export function SiteEffects() {
  return (
    <>
      <GlobalSpotlight />
      <Cursor />
    </>
  );
}
