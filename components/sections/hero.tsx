'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { DotPattern } from '@/components/ui/dot-pattern';
import { MagneticButton } from '@/components/common/magnetic-button';
import { GlowButton } from '@/components/common/glow-button';
import { useI18n } from '@/hooks/use-i18n';
import { useScrollTo } from '@/hooks/use-scroll-to';
import { useLenis } from '@/components/providers/lenis-provider';

export function Hero() {
  const { dict } = useI18n();
  const scrollTo = useScrollTo();
  const { prefersReducedMotion } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const ctas = ctaRef.current;

    if (!section || !title || !subtitle || !ctas) return;

    const buttons = ctas.children;

    if (prefersReducedMotion) {
      gsap.set([title, subtitle, buttons], { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    gsap.set([title, subtitle, buttons], { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(title, { opacity: 1, y: 0, duration: 0.75 })
        .to(subtitle, { opacity: 1, y: 0, duration: 0.65 }, '-=0.4')
        .to(buttons, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, '-=0.35');
    }, section);

    return () => ctx.revert();
  }, [dict.hero.title, dict.hero.subtitle, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground'
    >
      <DotPattern />

      <h1
        ref={titleRef}
        className='relative z-10 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl'
      >
        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent dark:to-foreground/60'>
          {dict.hero.title}
        </span>
      </h1>

      <p
        ref={subtitleRef}
        className='relative z-10 mt-6 max-w-xl text-lg text-muted-foreground md:text-xl'
      >
        {dict.hero.subtitle}
      </p>

      <div ref={ctaRef} className='relative z-10 mt-8 flex flex-wrap justify-center gap-4'>
        <MagneticButton>
          <GlowButton>
            <Button
              size='lg'
              onClick={() => scrollTo('projects')}
              className='relative z-10 transition-transform duration-300 hover:scale-105'
            >
              {dict.hero.cta}
            </Button>
          </GlowButton>
        </MagneticButton>

        <MagneticButton>
          <GlowButton>
            <Button
              variant='outline'
              size='lg'
              onClick={() => scrollTo('contact')}
              className='relative z-10 transition-transform duration-300 hover:scale-105'
            >
              {dict.hero.contact}
            </Button>
          </GlowButton>
        </MagneticButton>
      </div>
    </section>
  );
}
