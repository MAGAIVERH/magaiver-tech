'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';
import { AboutItem, aboutItems } from '@/constants/about-items';
import { getAboutIcon } from '@/lib/get-about-icon';
import { GlowBorder } from '@/components/ui/glow-border';
import { Reveal } from '@/components/common/reveal';
import { useI18n } from '@/hooks/use-i18n';
import { useLenis } from '@/components/providers/lenis-provider';
import {
  loadScrollTrigger,
  refreshScrollTrigger,
} from '@/lib/gsap-scroll-trigger';

type ScrollTriggerInstance = {
  kill: (reset?: boolean) => void;
};

function ExpertiseCard({
  item,
  index,
  onOpen,
}: {
  item: AboutItem;
  index: number;
  onOpen: () => void;
}) {
  const { locale, dict } = useI18n();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="cursor-hover group/card block w-full text-left"
    >
      <GlowBorder>
        <div className="flex min-h-[19rem] flex-col rounded-[11px] border border-border/80 bg-card p-5 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
              {createElement(getAboutIcon(item.iconKey), {
                size: 18,
                strokeWidth: 1.75,
              })}
            </span>
            <span className="text-xs font-semibold tabular-nums text-muted-foreground/40">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="mt-4 text-base font-semibold leading-snug">
            {item.title[locale]}
          </h3>

          <p className="mt-1 text-2xl font-bold tracking-tight text-accent">
            {item.metric[locale]}
          </p>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {item.problem[locale]}
          </p>

          <span className="mt-auto inline-flex items-center gap-1 pt-6 text-xs font-medium text-muted-foreground/80 transition-colors group-hover/card:text-foreground">
            {dict.expertise.cta}
            <span className="transition-transform duration-300 group-hover/card:translate-x-1">
              →
            </span>
          </span>
        </div>
      </GlowBorder>
    </button>
  );
}

export function Expertise() {
  const { dict, locale } = useI18n();
  const { lenis, prefersReducedMotion } = useLenis();
  const [active, setActive] = useState<AboutItem | null>(null);
  const [horizontal, setHorizontal] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Enable the pinned horizontal scroll only on real desktop pointers.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const sync = () => setHorizontal(mq.matches && !prefersReducedMotion);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [prefersReducedMotion]);

  // Lock scroll while a case-study modal is open.
  useEffect(() => {
    if (!active) return;

    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    if (!lenis) document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      lenis?.start();
      if (!lenis) document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, lenis]);

  // Pin the section and drive the horizontal track from vertical scroll.
  useGSAP(
    () => {
      if (!horizontal) return;

      const pin = pinRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!pin || !track) return;

      let cancelled = false;
      let st: ScrollTriggerInstance | null = null;
      let tween: gsap.core.Tween | null = null;

      void loadScrollTrigger().then((ScrollTrigger) => {
        if (cancelled || !pinRef.current || !trackRef.current) return;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
        });

        st = ScrollTrigger.create({
          trigger: pin,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          animation: tween,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`;
            }
          },
        });

        refreshScrollTrigger();
      });

      return () => {
        cancelled = true;
        st?.kill();
        tween?.kill();
      };
    },
    { scope: sectionRef, dependencies: [horizontal] },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="px-6 pt-24 pb-10">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {dict.expertise.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight md:text-4xl">
            {dict.expertise.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {dict.expertise.subtitle}
          </p>
        </Reveal>
      </div>

      {horizontal ? (
        <div ref={pinRef} className="relative h-screen overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-5 px-[6vw] will-change-transform"
          >
            {aboutItems.map((item, index) => (
              <div key={item.id} className="w-[320px] shrink-0">
                <ExpertiseCard
                  item={item}
                  index={index}
                  onOpen={() => setActive(item)}
                />
              </div>
            ))}
          </div>

          {/* horizontal progress indicator */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 h-1 w-[160px] -translate-x-1/2 overflow-hidden rounded-full bg-border/60">
            <div
              ref={progressRef}
              className="h-full w-full origin-left scale-x-0 rounded-full bg-accent"
            />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutItems.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 0.06}>
                <ExpertiseCard
                  item={item}
                  index={index}
                  onOpen={() => setActive(item)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-modal flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/55"
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(12px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(null)}
            />

            <motion.div
              role="dialog"
              aria-modal
              data-lenis-prevent
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 14 }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background shadow-2xl scrollbar-hidden"
            >
              <div className="flex items-start justify-between gap-4 border-b border-border/60 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    {createElement(getAboutIcon(active.iconKey), {
                      size: 22,
                      strokeWidth: 1.75,
                    })}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-tight">
                      {active.title[locale]}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-accent">
                      {active.metric[locale]}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="cursor-hover rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {dict.expertise.modal.problem}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {active.problem[locale]}
                  </p>
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {dict.expertise.modal.solution}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {active.solution[locale]}
                  </p>
                </div>

                <div className="rounded-xl border border-accent/15 bg-accent/5 p-4">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent/70">
                    {dict.expertise.modal.result}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-foreground/90">
                    {active.result[locale]}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
