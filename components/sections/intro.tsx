'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useI18n } from '@/hooks/use-i18n';
import { useLenis } from '@/components/providers/lenis-provider';
import { loadScrollTrigger } from '@/lib/gsap-scroll-trigger';
import { isMobileExperience } from '@/lib/mobile-experience';
import { cn } from '@/lib/utils';

const REVEAL_START = 'top 85%';
const REVEAL_EASE = 'power3.out';
const FOCUS_VIEWPORT_RATIO = 0.52;
const MOBILE_FOCUS_VIEWPORT_RATIO = 0.4;
const INACTIVE_OPACITY = 0.38;
const INACTIVE_Y = 6;

const INTRO_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;

export function Intro() {
  const { dict } = useI18n();
  const { prefersReducedMotion } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const parallax = parallaxRef.current;
      const title = titleRef.current;
      const paragraphs = paragraphsRef.current;

      if (!section || !parallax || !title || !paragraphs) return;

      const items = paragraphs.querySelectorAll<HTMLParagraphElement>('.intro-paragraph');

      if (prefersReducedMotion) {
        gsap.set([title, items], {
          clearProps: 'all',
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: 'none',
        });
        items.forEach((item) => item.classList.add('intro-paragraph--active'));
        return;
      }

      let cancelled = false;
      let activeIndex = -1;
      let mobileScrollRaf = 0;
      let mobileScrollHandler: (() => void) | null = null;
      let focusTrigger: ReturnType<
        Awaited<ReturnType<typeof loadScrollTrigger>>['create']
      > | null = null;

      const applyFocus = (index: number) => {
        if (index === activeIndex) return;
        activeIndex = index;

        items.forEach((item, i) => {
          const isActive = i === index;
          item.classList.toggle('intro-paragraph--active', isActive);

          gsap.to(item, {
            opacity: isActive ? 1 : INACTIVE_OPACITY,
            y: isActive ? 0 : INACTIVE_Y,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };

      const mobileExperience = isMobileExperience();

      const updateFocusFromScroll = () => {
        const viewportCenter =
          window.innerHeight *
          (mobileExperience
            ? MOBILE_FOCUS_VIEWPORT_RATIO
            : FOCUS_VIEWPORT_RATIO);
        const sectionRect = section.getBoundingClientRect();

        if (
          sectionRect.bottom < viewportCenter * 0.35 ||
          sectionRect.top > window.innerHeight * 0.85
        ) {
          return;
        }

        let closest = 0;
        let minDistance = Infinity;

        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const distance = Math.abs(itemCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closest = index;
          }
        });

        applyFocus(closest);
      };

      gsap.set(title, {
        opacity: 0,
        x: -32,
        clipPath: 'inset(0 100% 0 0)',
      });
      gsap.set(items, { opacity: 0, y: 24 });

      void loadScrollTrigger().then((ScrollTrigger) => {
        if (cancelled || !sectionRef.current) return;

        gsap.to(parallax, {
          y: -24,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(title, {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: REVEAL_EASE,
          scrollTrigger: {
            trigger: title,
            start: REVEAL_START,
            once: true,
          },
        });

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: paragraphs,
            start: REVEAL_START,
            once: true,
          },
        });

        revealTimeline.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: REVEAL_EASE,
          onComplete: () => {
            items.forEach((item, index) => {
              if (index !== 0) {
                gsap.set(item, { opacity: INACTIVE_OPACITY, y: INACTIVE_Y });
                item.classList.remove('intro-paragraph--active');
              } else {
                item.classList.add('intro-paragraph--active');
              }
            });
            updateFocusFromScroll();
          },
        });

        focusTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: updateFocusFromScroll,
        });

        if (mobileExperience) {
          mobileScrollHandler = () => {
            cancelAnimationFrame(mobileScrollRaf);
            mobileScrollRaf = requestAnimationFrame(() => {
              ScrollTrigger.update();
              updateFocusFromScroll();
            });
          };

          window.addEventListener('scroll', mobileScrollHandler, {
            passive: true,
          });
          window.addEventListener('touchmove', mobileScrollHandler, {
            passive: true,
          });

          ScrollTrigger.refresh();
          updateFocusFromScroll();
        }
      });

      return () => {
        cancelled = true;
        focusTrigger?.kill();

        if (mobileScrollHandler) {
          window.removeEventListener('scroll', mobileScrollHandler);
          window.removeEventListener('touchmove', mobileScrollHandler);
          cancelAnimationFrame(mobileScrollRaf);
        }
      };
    },
    {
      scope: sectionRef,
      dependencies: [
        dict.intro.title,
        ...INTRO_KEYS.map((key) => dict.intro[key]),
        prefersReducedMotion,
      ],
    },
  );

  return (
    <section ref={sectionRef} className='py-20 px-6 text-center overflow-hidden'>
      <div ref={parallaxRef} className='max-w-2xl mx-auto space-y-6 will-change-transform'>
        <h2
          ref={titleRef}
          className='text-4xl md:text-5xl font-bold overflow-hidden'
        >
          {dict.intro.title}
        </h2>

        <div ref={paragraphsRef} className='space-y-6'>
          {INTRO_KEYS.map((key, index) => (
            <p
              key={key}
              className={cn(
                'intro-paragraph text-lg leading-relaxed',
                index === 0 && 'intro-paragraph--active',
              )}
            >
              {dict.intro[key]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
