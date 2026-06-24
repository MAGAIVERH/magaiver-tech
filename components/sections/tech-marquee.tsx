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

function MarqueeGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {MARQUEE_ITEMS.map((tech, i) => {
        const Icon = techIcons[tech];
        return (
          <li key={`${tech}-${i}`} className="flex items-center">
            <span className="cursor-hover group/item flex items-center px-6 py-3 [perspective:700px]">
              {/* 3D tilt wrapper */}
              <span className="flex items-center gap-2.5 transition-transform duration-500 ease-out [transform-style:preserve-3d] will-change-transform group-hover/item:[transform:translateY(-4px)_rotateX(12deg)_rotateY(-18deg)]">
                {Icon && (
                  <span className="text-foreground/45 transition-[transform,color] duration-700 ease-out [transform-style:preserve-3d] group-hover/item:text-accent group-hover/item:[transform:rotateY(360deg)_translateZ(22px)_scale(1.18)]">
                    {createElement(Icon, { size: 22 })}
                  </span>
                )}
                <span className="relative [transform:translateZ(0)]">
                  <span className="block text-[15px] font-medium text-muted-foreground/60 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-foreground">
                    {tech}
                  </span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover/item:scale-x-100" />
                </span>
              </span>
            </span>

            {/* separator dot */}
            <span aria-hidden className="h-1 w-1 rounded-full bg-border/70" />
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
