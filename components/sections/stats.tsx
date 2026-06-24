'use client';

import { useEffect, useRef, useState } from 'react';
import { stats, type Stat } from '@/constants/stats';
import { useI18n } from '@/hooks/use-i18n';
import { useLenis } from '@/components/providers/lenis-provider';

const COUNT_DURATION = 1400;

function CountUp({ value, active }: { value: number; active: boolean }) {
  const { prefersReducedMotion } = useLenis();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    let raf = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / COUNT_DURATION, 1);
      // easeOutExpo for a snappy, premium count
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, value, prefersReducedMotion]);

  // Reduced motion: render the final value with no animation/state churn.
  return <>{prefersReducedMotion ? value : display}</>;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const { locale } = useI18n();

  return (
    <div className='group relative flex flex-col items-center px-4 text-center'>
      <div className='flex items-baseline justify-center text-5xl font-bold tracking-tight tabular-nums md:text-6xl'>
        {stat.prefix && (
          <span className='text-accent'>{stat.prefix}</span>
        )}
        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
          <CountUp value={stat.value} active={active} />
        </span>
        {stat.suffix && <span className='text-accent'>{stat.suffix}</span>}
      </div>
      <p className='mt-3 max-w-[12rem] text-sm leading-relaxed text-muted-foreground'>
        {stat.label[locale]}
      </p>
    </div>
  );
}

export function Stats() {
  const { dict } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className='px-6 py-20'>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
            {dict.stats.title}
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-muted-foreground'>
            {dict.stats.subtitle}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-y-10 rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm md:grid-cols-4 md:divide-x md:divide-border/60'>
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
