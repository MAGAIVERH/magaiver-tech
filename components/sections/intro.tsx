'use client';

import { useI18n } from '@/hooks/use-i18n';

export function Intro() {
  const { dict } = useI18n();
  return (
    <section className='py-20 px-6 text-center'>
      <div className='max-w-2xl mx-auto space-y-6'>
        <h2 className='text-4xl md:text-5xl font-bold '>{dict.intro.title}</h2>

        <p className='text-muted-foreground text-lg leading-relaxed'>
          {dict.intro.p1}
        </p>

        <p className='text-muted-foreground text-lg leading-relaxed'>
          {dict.intro.p2}
        </p>

        <p className='text-muted-foreground text-lg leading-relaxed'>
          {dict.intro.p3}
        </p>

        <p className='text-muted-foreground text-lg leading-relaxed'>
          {dict.intro.p4}
        </p>

        <p className='text-muted-foreground text-lg leading-relaxed'>
          {dict.intro.p5}
        </p>
      </div>
    </section>
  );
}
