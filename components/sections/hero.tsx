'use client';

import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/interactive/spotlight';
import { MagneticButton } from '@/components/common/magnetic-button';
import { GlowButton } from '@/components/common/glow-button';
import { Reveal } from '@/components/common/reveal';
import { useI18n } from '@/hooks/use-i18n';

export function Hero() {
  const { dict } = useI18n();
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      className='relative min-h-[90vh] flex flex-col items-center justify-center 
    text-center px-6 bg-background text-foreground overflow-hidden'
    >
      <Spotlight />

      {/* TITLE */}
      <Reveal>
        <h1
          className='relative z-10 text-4xl md:text-5xl font-bold tracking-tight max-w-3xl 
        leading-tight'
        >
          <span
            className='
    bg-gradient-to-b 
    from-foreground 
    to-foreground/70 
    dark:to-foreground/60 
    bg-clip-text 
    text-transparent
  '
          >
            {dict.hero.title}
          </span>
        </h1>
      </Reveal>

      {/* SUBTITLE */}
      <Reveal>
        <p className='relative z-10 mt-6 text-lg md:text-xl text-muted-foreground max-w-xl'>
          {dict.hero.subtitle}
        </p>
      </Reveal>

      {/* BUTTONS */}
      <Reveal>
        <div className='relative z-10 mt-8 flex gap-4'>
          <MagneticButton>
            <GlowButton>
              <Button
                size='lg'
                onClick={() => scrollTo('projects')}
                className='relative z-10 transition-all duration-300 hover:scale-105'
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
                className='relative z-10 transition-all duration-300 hover:scale-105'
              >
                {dict.hero.contact}
              </Button>
            </GlowButton>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
