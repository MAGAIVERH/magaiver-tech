'use client';

import { techIcons } from '@/lib/tech-icons';
import { useI18n } from '@/hooks/use-i18n';

const MARQUEE_ITEMS = [
  'Next.js',
  'React',
  'TypeScript',
  'Node',
  'Fastify',
  'PostgreSQL',
  'Drizzle',
  'Prisma',
  'pgvector',
  'Redis',
  'BullMQ',
  'Better Auth',
  'Tailwind',
  'Docker',
  'Turborepo',
  'Stripe',
  'Vercel',
];

function MarqueeGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      className='flex shrink-0 items-center gap-3 pr-3'
      aria-hidden={ariaHidden}
    >
      {MARQUEE_ITEMS.map((tech, i) => {
        const Icon = techIcons[tech];
        return (
          <li
            key={`${tech}-${i}`}
            className='flex shrink-0 items-center gap-2.5 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur-sm'
          >
            {Icon && <Icon size={16} className='text-foreground/80' />}
            {tech}
          </li>
        );
      })}
    </ul>
  );
}

export function TechMarquee() {
  const { dict } = useI18n();

  return (
    <section className='overflow-hidden py-12'>
      <p className='mb-7 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70'>
        {dict.marquee.title}
      </p>

      <div className='marquee-viewport marquee-mask relative flex w-full select-none'>
        {/* One animated track with two identical groups creates a seamless -50% loop */}
        <div className='marquee-track'>
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </div>
    </section>
  );
}
