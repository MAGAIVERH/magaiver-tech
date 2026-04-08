'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/common/reveal';

type Item = {
  title: string;
  metric: string;
  problem: string;
  solution: string;
  result: string;
};

const items: Item[] = [
  {
    title: 'SaaS & Platform Architecture',
    metric: '+120% scalability capacity',
    problem:
      'Systems were not designed to scale, causing instability and limiting business growth.',
    solution:
      'Redesigned into a multi-tenant SaaS architecture with modular services and proper data isolation.',
    result:
      'Enabled system growth without bottlenecks and improved stability under high load.',
  },
  {
    title: 'Performance Optimization',
    metric: '-48% load time',
    problem:
      'Slow rendering and inefficient data handling were impacting user experience.',
    solution:
      'Optimized rendering cycles, caching strategies and API communication.',
    result: 'Faster navigation, improved UX and increased user retention.',
  },
  {
    title: 'AI Integration',
    metric: '+65% automation rate',
    problem:
      'Manual workflows were slowing down users and reducing productivity.',
    solution:
      'Integrated AI-driven features to automate processes and personalize outputs.',
    result: 'Higher engagement and significant reduction in manual operations.',
  },
  {
    title: 'Business Impact',
    metric: '+30% operational efficiency',
    problem:
      'Lack of visibility and inefficient processes were limiting performance.',
    solution:
      'Built dashboards and automation systems aligned with business metrics.',
    result: 'Better decision-making and increased operational efficiency.',
  },
];

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
        1,
      );

      const index = Math.floor(progress * items.length);
      setActiveIndex(Math.min(index, items.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className='container mx-auto px-6 py-32'>
      <div className='max-w-6xl mx-auto'>
        {/* HEADER */}
        <div className='text-center mb-20'>
          <Reveal>
            <h2 className='text-3xl md:text-5xl font-bold mb-6'>About me</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              I design and build systems focused on real impact. Every solution
              I create is driven by performance, scalability and measurable
              results in production.
            </p>
          </Reveal>
        </div>

        {/* GRID */}
        <div className='grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-start'>
          {/* LEFT SIDE (sticky) */}
          <div className='space-y-10'>
            {items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={item.title}
                  className={`transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                  }`}
                >
                  <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>

                  <p className='text-primary font-semibold mb-3'>
                    {item.metric}
                  </p>

                  {isActive && (
                    <div className='space-y-2 text-sm text-muted-foreground'>
                      <p>
                        <span className='font-medium text-foreground'>
                          Problem:
                        </span>{' '}
                        {item.problem}
                      </p>
                      <p>
                        <span className='font-medium text-foreground'>
                          Solution:
                        </span>{' '}
                        {item.solution}
                      </p>
                      <p>
                        <span className='font-medium text-foreground'>
                          Result:
                        </span>{' '}
                        {item.result}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE (visual indicator) */}
          <div className='relative hidden md:flex justify-center'>
            <div className='relative w-[2px] bg-border h-full'>
              {items.map((_, index) => {
                const isActive = activeIndex >= index;

                return (
                  <div
                    key={index}
                    className='absolute left-1/2 -translate-x-1/2'
                    style={{ top: `${index * 120}px` }}
                  >
                    <div
                      className={`
              w-4 h-4 rounded-full border transition-all
              ${
                isActive
                  ? 'bg-primary border-primary scale-110'
                  : 'bg-background border-muted'
              }
            `}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
