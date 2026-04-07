'use client';

import { useState } from 'react';
import { Reveal } from '@/components/common/reveal';

type Item = {
  title: string;
  highlight: string;
  details: string;
};

const items: Item[] = [
  {
    title: 'SaaS & Systems',
    highlight: '+3 production systems deployed',
    details:
      'Designed multi-tenant SaaS platforms with authentication, billing and dashboards. Reduced operational friction and enabled scalable growth.',
  },
  {
    title: 'Performance',
    highlight: 'Up to 40% faster load times',
    details:
      'Improved frontend and backend performance through better data flow, caching and rendering strategies.',
  },
  {
    title: 'AI Integration',
    highlight: 'Automated user workflows',
    details:
      'Integrated AI features for personalization and automation, improving engagement and reducing manual effort.',
  },
  {
    title: 'Business Impact',
    highlight: 'Real-world problem solving',
    details:
      'Built solutions focused on revenue, efficiency and user retention instead of just UI delivery.',
  },
];

export function About() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className='container mx-auto px-6 py-32'>
      <div className='max-w-6xl mx-auto'>
        {/* TITLE */}
        <Reveal>
          <h2 className='text-3xl md:text-5xl font-bold mb-8'>About me</h2>
        </Reveal>

        {/* MAIN TEXT */}
        <Reveal delay={0.1}>
          <p className='text-muted-foreground max-w-2xl leading-relaxed mb-16 text-lg'>
            I build systems that solve real problems and generate real value. My
            focus is not just writing code, but designing scalable architecture,
            improving performance and delivering products that actually work in
            production.
          </p>
        </Reveal>

        {/* GRID INTERATIVO */}
        <div className='grid md:grid-cols-2 gap-6'>
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <Reveal key={item.title} delay={0.2 + index * 0.1}>
                <div
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`
                    relative border rounded-xl p-6 cursor-pointer
                    transition-all duration-300
                    ${isActive ? 'bg-muted scale-[1.02]' : 'bg-background'}
                  `}
                >
                  {/* TITLE */}
                  <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>

                  {/* HIGHLIGHT */}
                  <p className='text-sm font-medium mb-3 text-primary'>
                    {item.highlight}
                  </p>

                  {/* DETAILS (aparece no hover) */}
                  <p
                    className={`
                      text-sm text-muted-foreground leading-relaxed
                      transition-all duration-300
                      ${isActive ? 'opacity-100' : 'opacity-60'}
                    `}
                  >
                    {item.details}
                  </p>

                  {/* GLOW */}
                  <div
                    className={`
                      pointer-events-none absolute inset-0 rounded-xl
                      opacity-0 transition duration-300
                      ${isActive ? 'opacity-100' : ''}
                    `}
                  >
                    <div className='w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl' />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
