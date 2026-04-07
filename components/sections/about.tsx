'use client';

import { useState } from 'react';
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
      'Systems were not designed to scale, causing instability, slow growth and operational bottlenecks.',
    solution:
      'Redesigned architecture into multi-tenant SaaS with proper data isolation, authentication and modular services.',
    result:
      'Enabled scalable growth, reduced system failures and supported a significant increase in concurrent users.',
  },
  {
    title: 'Performance Optimization',
    metric: '-48% load time',
    problem:
      'Applications had slow load times, unnecessary re-renders and inefficient data flow impacting user experience.',
    solution:
      'Optimized rendering, caching strategies and API communication, reducing unnecessary processing.',
    result:
      'Achieved faster load times, smoother navigation and higher user retention.',
  },
  {
    title: 'AI Integration',
    metric: '+65% automation rate',
    problem:
      'Users depended heavily on manual processes, reducing productivity and increasing friction.',
    solution:
      'Integrated AI to generate personalized outputs, automate workflows and reduce manual actions.',
    result:
      'Significant productivity gain and improved user engagement through smarter interactions.',
  },
  {
    title: 'Business Impact',
    metric: '+30% operational efficiency',
    problem:
      'Businesses lacked visibility, control and efficiency in daily operations.',
    solution:
      'Built dashboards, automation flows and structured systems aligned with business goals.',
    result:
      'Improved decision-making, reduced operational cost and increased efficiency across processes.',
  },
];

export function About() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className='container mx-auto px-6 py-32'>
      <div className='max-w-5xl mx-auto text-center'>
        {/* TITLE */}
        <Reveal>
          <h2 className='text-3xl md:text-5xl font-bold mb-6'>About me</h2>
        </Reveal>

        {/* MAIN TEXT */}
        <Reveal delay={0.1}>
          <p className='text-muted-foreground leading-relaxed text-lg mb-16'>
            I build scalable and high-performance systems focused on real
            business impact. My work is not just about writing code, but
            designing solutions that solve real problems, improve performance
            and generate measurable results in production environments.
          </p>
        </Reveal>

        {/* CARDS */}
        <div className='grid md:grid-cols-2 gap-6 text-left'>
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
                    hover:scale-[1.02]
                    ${isActive ? 'bg-muted shadow-xl' : 'bg-background'}
                  `}
                >
                  {/* TITLE */}
                  <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>

                  {/* METRIC */}
                  <p className='text-sm font-semibold text-primary mb-4'>
                    {item.metric}
                  </p>

                  {/* CONTENT */}
                  <div className='space-y-3 text-sm text-muted-foreground leading-relaxed'>
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
