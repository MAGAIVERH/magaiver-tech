'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { AboutItem, aboutItems } from '@/constants/about-items';
import { useI18n } from '@/hooks/use-i18n';
import { useLenis } from '@/components/providers/lenis-provider';
import { isMobileExperience } from '@/lib/mobile-experience';
import { getAboutIcon } from '@/lib/get-about-icon';

const ORBIT_DURATION = 60;
const VIEW_SIZE = 600;
const CENTER = VIEW_SIZE / 2;

export function AboutRadial() {
  const { locale, dict } = useI18n();
  const { prefersReducedMotion, isCoarsePointer } = useLenis();
  const [active, setActive] = useState<AboutItem | null>(null);
  const [hovered, setHovered] = useState<AboutItem | null>(null);
  const [radius, setRadius] = useState(170);
  const [containerSize, setContainerSize] = useState(300);

  const sectionRef = useRef<HTMLElement>(null);
  const orbitGroupRef = useRef<HTMLDivElement>(null);
  const orbitTlRef = useRef<gsap.core.Timeline | null>(null);
  const pulseTweenRef = useRef<gsap.core.Tween | null>(null);
  const iconRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    function updateOrbitMetrics() {
      const width = window.innerWidth;

      if (width >= 768) setContainerSize(600);
      else if (width >= 640) setContainerSize(420);
      else setContainerSize(300);

      if (width >= 1024) setRadius(260);
      else if (width >= 640) setRadius(180);
      else setRadius(170);
    }

    updateOrbitMetrics();
    window.addEventListener('resize', updateOrbitMetrics);
    return () => window.removeEventListener('resize', updateOrbitMetrics);
  }, []);

  const viewBoxRadius = radius * (VIEW_SIZE / containerSize);

  const pauseOrbit = useCallback(() => {
    orbitTlRef.current?.pause();
  }, []);

  const resumeOrbit = useCallback(() => {
    if (!hovered) orbitTlRef.current?.play();
  }, [hovered]);

  useGSAP(
    () => {
      const group = orbitGroupRef.current;
      if (!group) return;

      orbitTlRef.current?.kill();
      gsap.killTweensOf(group.querySelectorAll('.about-connection-line'));

      if (prefersReducedMotion) {
        gsap.set(group.querySelectorAll('[data-orbit-arm]'), { rotation: 0 });
        gsap.set(group.querySelectorAll('[data-orbit-counter]'), { rotation: 0 });
        return;
      }

      const arms = group.querySelectorAll<HTMLElement>('[data-orbit-arm]');
      const counters = group.querySelectorAll<HTMLElement>('[data-orbit-counter]');
      const lines = group.querySelectorAll<SVGLineElement>('.about-connection-line');
      const mobileExperience = isMobileExperience();

      if (mobileExperience) {
        gsap.set([...arms, ...counters], { force3D: true });
      }

      const tl = gsap.timeline({ repeat: -1, paused: false });
      arms.forEach((arm) => {
        tl.to(
          arm,
          { rotation: 360, duration: ORBIT_DURATION, ease: 'none' },
          0,
        );
      });
      counters.forEach((counter) => {
        tl.to(
          counter,
          { rotation: -360, duration: ORBIT_DURATION, ease: 'none' },
          0,
        );
      });

      lines.forEach((line, i) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: `${length * 0.12} ${length * 0.2}`,
          strokeDashoffset: length,
        });
        gsap.to(line, {
          strokeDashoffset: -length * 0.5,
          duration: 4,
          repeat: -1,
          ease: 'none',
          delay: i * 0.35,
        });
      });

      // Energy particles flowing from the core outward along each ray.
      const particles = group.querySelectorAll<SVGCircleElement>(
        '.about-flow-particle',
      );
      particles.forEach((particle, i) => {
        const angle = (i / aboutItems.length) * 2 * Math.PI;
        const ex = CENTER + Math.cos(angle) * viewBoxRadius;
        const ey = CENTER + Math.sin(angle) * viewBoxRadius;

        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6, delay: i * 0.22 })
          .fromTo(
            particle,
            { attr: { cx: CENTER, cy: CENTER } },
            { attr: { cx: ex, cy: ey }, duration: 2.4, ease: 'power1.inOut' },
            0,
          )
          .fromTo(particle, { opacity: 0 }, { opacity: 0.9, duration: 0.5 }, 0)
          .to(particle, { opacity: 0, duration: 0.7 }, 1.7);
      });

      orbitTlRef.current = tl;
      tl.play();

      if (mobileExperience) {
        gsap.ticker.wake();
        requestAnimationFrame(() => {
          orbitTlRef.current?.play();
        });
      }

      return () => {
        tl.kill();
        orbitTlRef.current = null;
      };
    },
    {
      scope: sectionRef,
      dependencies: [radius, containerSize, prefersReducedMotion, isCoarsePointer],
    },
  );

  useEffect(() => {
    pulseTweenRef.current?.kill();

    iconRefs.current.forEach((btn) => {
      gsap.to(btn, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.25,
        overwrite: true,
      });
    });

    if (!hovered || prefersReducedMotion) return;

    const btn = iconRefs.current.get(hovered.id);
    if (!btn) return;

    pulseTweenRef.current = gsap.to(btn, {
      scale: 1.18,
      duration: 0.85,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      boxShadow: '0 0 18px rgb(var(--primary) / 0.22)',
    });

    return () => {
      pulseTweenRef.current?.kill();
      gsap.to(btn, { scale: 1, boxShadow: 'none', duration: 0.25 });
    };
  }, [hovered, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !isCoarsePointer) return;

    // On touch devices there is no hover; reset once so the orbit keeps spinning.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHovered(null);

    const wakeOrbit = () => {
      orbitTlRef.current?.play();
      gsap.ticker.wake();
    };

    wakeOrbit();
    const rafId = requestAnimationFrame(wakeOrbit);

    return () => cancelAnimationFrame(rafId);
  }, [isCoarsePointer, prefersReducedMotion]);

  const handleIconEnter = (item: AboutItem) => {
    setHovered(item);
    pauseOrbit();
  };

  const handleIconLeave = () => {
    setHovered(null);
    orbitTlRef.current?.play();
  };

  const handleOrbitEnter = () => {
    if (!hovered) pauseOrbit();
  };

  const handleOrbitLeave = () => {
    if (!hovered) resumeOrbit();
  };

  const handleIconPointerEnter = (
    item: AboutItem,
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (event.pointerType !== 'mouse') return;
    handleIconEnter(item);
  };

  const handleIconPointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    handleIconLeave();
  };

  const handleOrbitPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    handleOrbitEnter();
  };

  const handleOrbitPointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    handleOrbitLeave();
  };

  return (
    <section ref={sectionRef} className='py-32 flex items-center justify-center relative overflow-x-clip'>
      <div className='relative flex items-center justify-center'>
        <div
          className='relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px]'
          onPointerEnter={handleOrbitPointerEnter}
          onPointerLeave={handleOrbitPointerLeave}
        >
          {/* TEXTO CENTRAL */}
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-8 md:px-16'>
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className='flex flex-col items-center gap-1.5'
              >
                {(() => {
                  const HoveredIcon = getAboutIcon(hovered.iconKey);
                  return (
                    <span className='flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent'>
                      <HoveredIcon size={22} strokeWidth={1.75} />
                    </span>
                  );
                })()}
                <p className='text-base md:text-lg font-semibold text-foreground leading-tight'>
                  {hovered.title[locale]}
                </p>
                <p className='text-xs md:text-sm font-medium text-primary'>
                  {hovered.metric[locale]}
                </p>
                <p className='text-[10px] md:text-xs text-muted-foreground/60 mt-1'>
                  {dict.about.hint}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key='default'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className='flex flex-col items-center gap-2'
              >
                <h2 className='text-4xl md:text-5xl font-bold'>
                  {dict.about.title}
                </h2>
                <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
                  {dict.about.description}
                </p>
                <p className='text-xs mt-1 text-muted-foreground/60'>
                  {dict.about.hint}
                </p>
              </motion.div>
            )}
          </div>

          {/* ÓRBITA + LINHAS SVG */}
          <div
            ref={orbitGroupRef}
            className='absolute inset-0'
            style={{ transformOrigin: '50% 50%' }}
          >
            <svg
              className='absolute inset-0 w-full h-full pointer-events-none about-radial-lines'
              viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
              aria-hidden
            >
              <defs>
                <filter
                  id='about-glow'
                  x='-50%'
                  y='-50%'
                  width='200%'
                  height='200%'
                >
                  <feGaussianBlur stdDeviation='2.4' result='blur' />
                  <feMerge>
                    <feMergeNode in='blur' />
                    <feMergeNode in='SourceGraphic' />
                  </feMerge>
                </filter>
              </defs>

              {/* faint structural rays + animated dash flow */}
              {aboutItems.map((_, index) => {
                const angle = (index / aboutItems.length) * 2 * Math.PI;
                const x2 = CENTER + Math.cos(angle) * viewBoxRadius;
                const y2 = CENTER + Math.sin(angle) * viewBoxRadius;
                return (
                  <line
                    key={index}
                    className='about-connection-line'
                    x1={CENTER}
                    y1={CENTER}
                    x2={x2}
                    y2={y2}
                  />
                );
              })}

              {/* energy particles flowing outward along each ray */}
              {aboutItems.map((_, index) => (
                <circle
                  key={`p-${index}`}
                  className='about-flow-particle'
                  cx={CENTER}
                  cy={CENTER}
                  r={3}
                  fill='rgb(var(--accent))'
                  opacity={0}
                  filter='url(#about-glow)'
                />
              ))}

              {/* central core */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={5}
                fill='rgb(var(--accent))'
                opacity={0.6}
                filter='url(#about-glow)'
              />
            </svg>

            {aboutItems.map((item: AboutItem, index: number) => {
              const angle = (index / aboutItems.length) * 2 * Math.PI;
              const Icon = getAboutIcon(item.iconKey);

              return (
                <div
                  key={item.id}
                  data-orbit-arm
                  className='absolute left-1/2 top-1/2 will-change-transform'
                  style={{ transformOrigin: '0 0' }}
                >
                  <div
                    style={{
                      transform: `translate(-50%, -50%) translate(
                        ${Math.cos(angle) * radius}px,
                        ${Math.sin(angle) * radius}px
                      )`,
                    }}
                  >
                    <div
                      data-orbit-counter
                      className='will-change-transform'
                      style={{ transformOrigin: '50% 50%' }}
                    >
                      <button
                        ref={(el) => {
                          if (el) iconRefs.current.set(item.id, el);
                          else iconRefs.current.delete(item.id);
                        }}
                        onClick={() => setActive(item)}
                        onPointerEnter={(event) => handleIconPointerEnter(item, event)}
                        onPointerLeave={handleIconPointerLeave}
                        aria-label={item.title[locale]}
                        className='
                          group/node
                          w-11 h-11 md:w-12 md:h-12
                          rounded-full
                          border border-border/70
                          flex items-center justify-center
                          transition-colors duration-200
                          bg-card/80
                          backdrop-blur
                          text-muted-foreground
                          hover:bg-accent/10
                          hover:border-accent/50
                          hover:text-accent
                          shadow-sm
                          select-none
                          relative z-[1]
                        '
                      >
                        <Icon
                          size={19}
                          strokeWidth={1.75}
                          className='transition-colors duration-200'
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key='about-modal-backdrop'
            className='fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-modal px-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActive(null)}
          >
            <motion.div
              key={active.id}
              initial={{ scale: 0.82, opacity: 0, y: 28 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 28,
                mass: 0.75,
              }}
              className='bg-background border border-white/10 rounded-2xl w-full max-w-[460px] overflow-hidden shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/5'>
                <div className='flex items-center gap-3'>
                  <motion.span
                    initial={{ scale: 0.5, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 22,
                      delay: 0.05,
                    }}
                    className='text-3xl'
                  >
                    {active.icon}
                  </motion.span>
                  <div>
                    <h3 className='text-lg font-bold leading-tight'>
                      {active.title[locale]}
                    </h3>
                    <p className='text-sm font-semibold text-primary mt-0.5'>
                      {active.metric[locale]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className='text-muted-foreground hover:text-foreground transition text-xl leading-none mt-0.5'
                  aria-label='Close'
                >
                  ×
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className='p-5 sm:p-6 space-y-5'
              >
                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5'>
                    {dict.about.modal.problem}
                  </p>
                  <p className='text-sm leading-relaxed text-foreground/80'>
                    {active.problem[locale]}
                  </p>
                </div>

                <div>
                  <p className='text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5'>
                    {dict.about.modal.solution}
                  </p>
                  <p className='text-sm leading-relaxed text-foreground/80'>
                    {active.solution[locale]}
                  </p>
                </div>

                <div className='rounded-xl bg-primary/5 border border-primary/10 p-4'>
                  <p className='text-[11px] font-semibold uppercase tracking-widest text-primary/70 mb-1.5'>
                    {dict.about.modal.result}
                  </p>
                  <p className='text-sm leading-relaxed text-foreground/90 font-medium'>
                    {active.result[locale]}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
