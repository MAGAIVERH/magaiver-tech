'use client';

import { createElement } from 'react';
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

// Render the list twice per group so a single group is always wider than the
// viewport — guarantees the -50% loop never reveals an empty gap.
const RENDER_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

function MarqueeGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {RENDER_ITEMS.map((tech, i) => {
        const Icon = techIcons[tech];
        return (
          <li
            key={`${tech}-${i}`}
            className="cursor-hover tech-item group/item flex w-[150px] shrink-0 flex-col items-center gap-3.5 py-2 [perspective:700px]"
          >
            {Icon && (
              <span
                className="tech-icon-spin text-foreground/55 transition-colors duration-300 group-hover/item:text-accent"
                style={{ animationDelay: `${(-i * 0.35).toFixed(2)}s` }}
              >
                {createElement(Icon, { size: 40 })}
              </span>
            )}
            <span className="relative">
              <span className="block whitespace-nowrap text-sm font-medium text-muted-foreground/60 transition-colors duration-300 group-hover/item:text-foreground">
                {tech}
              </span>
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover/item:scale-x-100" />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function TechMarquee() {
  const { dict } = useI18n();

  return (
    <section className="overflow-hidden py-12">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
        {dict.marquee.title}
      </p>

      <div className="marquee-viewport marquee-mask relative flex w-full select-none">
        {/* One animated track with two identical groups creates a seamless -50% loop */}
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup ariaHidden />
        </div>
      </div>
    </section>
  );
}
