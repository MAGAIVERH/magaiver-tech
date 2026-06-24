'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { DotPattern } from '@/components/ui/dot-pattern';
import { MagneticButton } from '@/components/common/magnetic-button';
import { GlowButton } from '@/components/common/glow-button';
import { useI18n } from '@/hooks/use-i18n';
import { useScrollTo } from '@/hooks/use-scroll-to';
import { useLenis } from '@/components/providers/lenis-provider';

const ROLE_INTERVAL = 2600;

function RoleRotator({ roles }: { roles: string[] }) {
  const { prefersReducedMotion } = useLenis();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || roles.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, ROLE_INTERVAL);
    return () => window.clearInterval(id);
  }, [roles.length, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className='text-accent'>{roles[0]}</span>;
  }

  return (
    <span className='relative inline-grid'>
      <AnimatePresence mode='wait'>
        <motion.span
          key={roles[index]}
          initial={{ y: '0.6em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-0.6em', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className='col-start-1 row-start-1 text-accent'
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { dict } = useI18n();
  const scrollTo = useScrollTo();
  const { prefersReducedMotion } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const roles = dict.hero.roles as string[];

  useEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const ctas = ctaRef.current;
    const cue = cueRef.current;

    if (!section || !badge || !eyebrow || !title || !subtitle || !ctas || !cue)
      return;

    const buttons = ctas.children;
    const reveal = [badge, eyebrow, title, subtitle, buttons, cue];

    if (prefersReducedMotion) {
      gsap.set(reveal, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    gsap.set(reveal, { opacity: 0, y: 24 });

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(badge, { opacity: 1, y: 0, duration: 0.6 })
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
        .to(title, { opacity: 1, y: 0, duration: 0.75 }, '-=0.3')
        .to(subtitle, { opacity: 1, y: 0, duration: 0.65 }, '-=0.45')
        .to(buttons, { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, '-=0.35')
        .to(cue, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
    }, section);

    return () => ctx.revert();
  }, [dict.hero.title, dict.hero.subtitle, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className='relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground'
    >
      {/* Ambient aurora field */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
        <div className='aurora-orb aurora-orb-a left-[8%] top-[12%] h-[clamp(220px,40vw,460px)] w-[clamp(220px,40vw,460px)]' />
        <div className='aurora-orb aurora-orb-b right-[6%] top-[22%] h-[clamp(200px,34vw,400px)] w-[clamp(200px,34vw,400px)]' />
        <div className='aurora-orb aurora-orb-c bottom-[6%] left-1/2 h-[clamp(220px,38vw,440px)] w-[clamp(220px,38vw,440px)] -translate-x-1/2' />
      </div>

      <DotPattern />

      <div
        ref={badgeRef}
        className='relative z-10 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md'
      >
        <span className='relative flex h-2 w-2'>
          <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70' />
          <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
        </span>
        {dict.hero.badge}
      </div>

      <p
        ref={eyebrowRef}
        className='relative z-10 mt-6 text-sm font-medium tracking-wide text-muted-foreground sm:text-base'
      >
        Magaiver Magalhães
        <span className='mx-2 opacity-40'>·</span>
        <RoleRotator roles={roles} />
      </p>

      <h1
        ref={titleRef}
        className='relative z-10 mt-4 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl'
      >
        <span className='bg-gradient-to-b from-foreground to-foreground/65 bg-clip-text text-transparent dark:to-foreground/55'>
          {dict.hero.title}
        </span>
      </h1>

      <p
        ref={subtitleRef}
        className='relative z-10 mt-6 max-w-xl text-pretty text-lg text-muted-foreground md:text-xl'
      >
        {dict.hero.subtitle}
      </p>

      <div
        ref={ctaRef}
        className='relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4'
      >
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

        <a
          href='/Magaiver_Magalhaes_CV.pdf'
          download
          className='cursor-hover group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <FiDownload
            size={16}
            className='transition-transform duration-300 group-hover:translate-y-0.5'
          />
          {dict.hero.downloadCv}
        </a>
      </div>

      <div
        ref={cueRef}
        className='absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/70'
      >
        <span className='text-[11px] uppercase tracking-[0.2em]'>
          {dict.hero.scroll}
        </span>
        <span className='flex h-9 w-5 items-start justify-center rounded-full border border-border/70 p-1'>
          <span className='scroll-cue-dot h-1.5 w-1.5 rounded-full bg-muted-foreground/70' />
        </span>
      </div>
    </section>
  );
}
