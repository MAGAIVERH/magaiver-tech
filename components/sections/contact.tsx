'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Reveal } from '@/components/common/reveal';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { MagneticButton } from '../common/magnetic-button';
import { useI18n } from '@/hooks/use-i18n';
import { useLenis } from '@/components/providers/lenis-provider';
import { loadScrollTrigger } from '@/lib/gsap-scroll-trigger';

const EMAIL = 'magaivermagalhaes.mm@gmail.com';

function EmailShimmer() {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className='group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
    >
      <span className='email-shimmer font-mono text-xs sm:text-sm tracking-tight'>
        {EMAIL}
      </span>
    </a>
  );
}

export function Contact() {
  const { dict } = useI18n();
  const { prefersReducedMotion } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const actions = actionsRef.current;
      if (!actions) return;

      const items = actions.querySelectorAll('.contact-action');

      if (prefersReducedMotion) {
        gsap.set(items, { clearProps: 'all', opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 22 });

      let cancelled = false;

      void loadScrollTrigger().then(() => {
        if (cancelled || !actionsRef.current) return;

        const currentItems = actionsRef.current.querySelectorAll('.contact-action');

        gsap.to(currentItems, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: actionsRef.current,
            start: 'top 88%',
            once: true,
          },
        });
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  const linkClass =
    'flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-foreground hover:text-background transition';

  return (
    <section
      ref={sectionRef}
      id='contact'
      className='py-32 px-6 bg-background text-foreground'
    >
      <div className='max-w-3xl mx-auto text-center'>
        <Reveal variant='title'>
          <h2 className='text-4xl md:text-5xl font-bold '>
            {dict.contact.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className='mt-4 text-muted-foreground'>
            {dict.contact.description}
          </p>
        </Reveal>

        <div ref={actionsRef} className='mt-8 flex justify-center gap-4 flex-wrap'>
          <MagneticButton intensity={0.42} className='contact-action'>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              <FiMail size={16} className='shrink-0' />
              {dict.contact.email}
            </a>
          </MagneticButton>

          <MagneticButton intensity={0.42} className='contact-action'>
            <a
              href='https://wa.me/5585981467094'
              target='_blank'
              rel='noopener noreferrer'
              className={linkClass}
            >
              <FaWhatsapp size={16} className='shrink-0' />
              {dict.contact.whatsapp}
            </a>
          </MagneticButton>

          <MagneticButton intensity={0.42} className='contact-action'>
            <a
              href='https://github.com/MAGAIVERH'
              target='_blank'
              rel='noopener noreferrer'
              className={linkClass}
            >
              <FaGithub size={16} className='shrink-0' />
              {dict.contact.github}
            </a>
          </MagneticButton>

          <MagneticButton intensity={0.42} className='contact-action'>
            <a
              href='https://www.linkedin.com/in/magaiver-magalhaes'
              target='_blank'
              rel='noopener noreferrer'
              className={linkClass}
            >
              <FaLinkedin size={16} className='shrink-0' />
              {dict.contact.linkedin}
            </a>
          </MagneticButton>
        </div>

        <Reveal delay={0.3}>
          <div className='mt-6 flex flex-col items-center gap-2'>
            <EmailShimmer />
            <p className='text-sm text-muted-foreground'>
              {dict.contact.phone} <strong>+55 (85) 98146-7094</strong>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
