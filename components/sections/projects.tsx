'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { Reveal } from '@/components/common/reveal';
import { ProjectCard } from '@/components/common/project-card';
import { projects, type Project } from '@/constants/projects';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiPrisma,
  SiPostgresql,
  SiFastify,
  SiTailwindcss,
  SiStripe,
  SiShadcnui,
  SiDrizzle,
  SiRadixui,
} from 'react-icons/si';
import { ShieldCheck, Sparkles } from 'lucide-react';
import type { IconType } from 'react-icons';
import Image from 'next/image';
import { useI18n } from '@/hooks/use-i18n';
import { useScrollTo } from '@/hooks/use-scroll-to';
import { useLenis } from '@/components/providers/lenis-provider';
import { cn } from '@/lib/utils';
import { loadScrollTrigger, refreshScrollTrigger } from '@/lib/gsap-scroll-trigger';

const INITIAL_VISIBLE = 4;

const techIcons: Record<string, IconType> = {
  React: FaReact,
  'Next.js': SiNextdotjs,
  Node: FaNodeJs,
  TypeScript: SiTypescript,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
  Fastify: SiFastify,
  AI: Sparkles,
  Tailwind: SiTailwindcss,
  Stripe: SiStripe,
  Shadcnui: SiShadcnui,
  Drizzle: SiDrizzle,
  Zod: ShieldCheck,
  'Radix UI': SiRadixui,
};

const modalContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const modalItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type ViewMoreButtonProps = {
  showAll: boolean;
  hiddenCount: number;
  labelMore: string;
  labelLess: string;
  onClick: () => void;
};

function ViewMoreButton({
  showAll,
  hiddenCount,
  labelMore,
  labelLess,
  onClick,
}: ViewMoreButtonProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayCount, setDisplayCount] = useState(0);

  useMotionValueEvent(rounded, 'change', setDisplayCount);

  useEffect(() => {
    if (showAll) {
      count.set(hiddenCount);
      return;
    }
    count.set(0);
    const controls = animate(count, hiddenCount, {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [showAll, hiddenCount, count]);

  return (
    <motion.button
      type='button'
      layout
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex items-center justify-center gap-2 overflow-hidden',
        'rounded-lg border border-border px-5 py-2.5 text-sm font-medium',
        'transition-colors duration-300 hover:bg-foreground hover:text-background',
        showAll ? 'min-w-[8.5rem]' : 'min-w-[10.5rem]',
      )}
    >
      <AnimatePresence mode='wait' initial={false}>
        {showAll ? (
          <motion.span
            key='less'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {labelLess}
          </motion.span>
        ) : (
          <motion.span
            key='more'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className='flex items-center gap-2'
          >
            <span>{labelMore}</span>
            <motion.span
              layout
              className='tabular-nums rounded-full bg-foreground/10 px-2 py-0.5 text-xs font-semibold'
            >
              +{displayCount}
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Projects() {
  const { dict, locale } = useI18n();
  const scrollTo = useScrollTo();
  const { prefersReducedMotion, lenis } = useLenis();
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_VISIBLE);
  const hiddenCount = projects.length - INITIAL_VISIBLE;

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll<HTMLElement>(
        '[data-project-card]:not([data-revealed])',
      );
      if (!cards.length) return;

      if (prefersReducedMotion) {
        cards.forEach((card) => {
          gsap.set(card, { clearProps: 'all', opacity: 1, y: 0 });
          card.setAttribute('data-revealed', 'true');
        });
        return;
      }

      const gridAlreadyRevealed = Boolean(
        grid.querySelector('[data-project-card][data-revealed]'),
      );

      let cancelled = false;

      void loadScrollTrigger().then(() => {
        if (cancelled || !gridRef.current) return;

        const currentCards = gridRef.current.querySelectorAll<HTMLElement>(
          '[data-project-card]:not([data-revealed])',
        );
        if (!currentCards.length) return;

        gsap.fromTo(
          currentCards,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: gridAlreadyRevealed ? 0.55 : 0.65,
            ease: 'power3.out',
            stagger: 0.12,
            ...(gridAlreadyRevealed
              ? {}
              : {
                  scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                    once: true,
                  },
                }),
            onComplete: () => {
              currentCards.forEach((card) =>
                card.setAttribute('data-revealed', 'true'),
              );
            },
          },
        );
      });

      return () => {
        cancelled = true;
      };
    },
    {
      scope: gridRef,
      dependencies: [visibleProjects, prefersReducedMotion, showAll],
    },
  );

  useEffect(() => {
    void refreshScrollTrigger();
  }, [showAll]);

  useEffect(() => {
    if (!selected) return;

    lenis?.stop();

    const prevOverflow = document.body.style.overflow;
    if (!lenis) {
      document.body.style.overflow = 'hidden';
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      lenis?.start();
      if (!lenis) {
        document.body.style.overflow = prevOverflow;
      }
      window.removeEventListener('keydown', onKey);
    };
  }, [selected, lenis]);

  return (
    <section id='projects' className='py-32 px-6 bg-background text-foreground'>
      <div className='max-w-5xl mx-auto'>
        <Reveal variant='title'>
          <h2 className='text-4xl md:text-5xl font-bold text-center'>
            {dict.projects.title}
          </h2>
        </Reveal>

        <div
          ref={gridRef}
          className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6'
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {hiddenCount > 0 && (
          <Reveal delay={0.1}>
            <div className='mt-10 flex justify-center'>
              <ViewMoreButton
                showAll={showAll}
                hiddenCount={hiddenCount}
                labelMore={dict.projects.viewMore}
                labelLess={dict.projects.viewLess}
                onClick={() => {
                  setShowAll((prev) => {
                    const next = !prev;
                    if (prev) {
                      setTimeout(() => scrollTo('projects'), 100);
                    }
                    return next;
                  });
                }}
              />
            </div>
          </Reveal>
        )}

        <AnimatePresence>
          {selected && (
            <motion.div
              className='fixed inset-0 z-modal flex items-center justify-center p-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className='absolute inset-0 bg-black/55'
                initial={{ backdropFilter: 'blur(0px)' }}
                animate={{ backdropFilter: 'blur(14px)' }}
                exit={{ backdropFilter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelected(null)}
              />

              <motion.div
                layoutId={`card-${selected.id}`}
                role='dialog'
                aria-modal
                data-lenis-prevent
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'relative w-full max-w-xl',
                  'bg-background border border-border rounded-xl',
                  'p-5 md:p-6 shadow-2xl',
                  'max-h-[92vh] overflow-y-auto overscroll-contain scrollbar-hidden',
                )}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 32,
                }}
              >
                <motion.button
                  type='button'
                  variants={modalItem}
                  initial='hidden'
                  animate='show'
                  onClick={() => setSelected(null)}
                  className='absolute top-3 right-3 z-10 p-1.5 rounded-md hover:bg-muted transition-colors'
                  aria-label='Close'
                >
                  <FiX size={18} />
                </motion.button>

                <motion.div
                  variants={modalContainer}
                  initial='hidden'
                  animate='show'
                >
                  <motion.h3
                    layoutId={`title-${selected.id}`}
                    variants={modalItem}
                    className='text-lg md:text-2xl font-bold pr-8'
                  >
                    {selected.title[locale]}
                  </motion.h3>

                  <motion.p
                    layoutId={`desc-${selected.id}`}
                    variants={modalItem}
                    className='mt-2 text-sm md:text-base text-muted-foreground'
                  >
                    {selected.description[locale]}
                  </motion.p>

                  <motion.div
                    variants={modalItem}
                    className={cn(
                      'mt-4 rounded-lg border border-border overflow-hidden',
                      selected.imageFit === 'contain'
                        ? 'bg-muted/40'
                        : 'relative h-56 md:h-72',
                    )}
                  >
                    {selected.image &&
                      (selected.imageFit === 'contain' ? (
                        <Image
                          src={selected.image}
                          alt={selected.title[locale]}
                          width={selected.imageSize?.width ?? 1200}
                          height={selected.imageSize?.height ?? 675}
                          className='w-full h-auto'
                          sizes='(max-width: 768px) 100vw, 36rem'
                        />
                      ) : (
                        <Image
                          src={selected.image}
                          alt={selected.title[locale]}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, 36rem'
                        />
                      ))}
                  </motion.div>

                  <motion.div
                    variants={modalItem}
                    className='mt-4 space-y-3 text-xs md:text-sm text-muted-foreground'
                  >
                    <p>
                      <strong>{dict.projects.modal.overviewTitle}:</strong>{' '}
                      {selected.details?.overview[locale] ??
                        dict.projects.modal.overview}
                    </p>
                    <p>
                      <strong>{dict.projects.modal.problemTitle}:</strong>{' '}
                      {selected.details?.problem[locale] ??
                        dict.projects.modal.problem}
                    </p>
                    <p>
                      <strong>{dict.projects.modal.solutionTitle}:</strong>{' '}
                      {selected.details?.solution[locale] ??
                        dict.projects.modal.solution}
                    </p>
                    <p>
                      <strong>{dict.projects.modal.impactTitle}:</strong>{' '}
                      {selected.details?.impact[locale] ??
                        dict.projects.modal.impact}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={modalItem}
                    className='mt-4 flex flex-wrap gap-2'
                  >
                    {selected.stack.map((tech) => {
                      const Icon = techIcons[tech];
                      return (
                        <div
                          key={tech}
                          className='flex items-center gap-2 text-xs px-2 py-1 border border-border rounded-md'
                        >
                          {Icon && <Icon size={12} />}
                          {tech}
                        </div>
                      );
                    })}
                  </motion.div>

                  <motion.div
                    variants={modalItem}
                    className='mt-4 flex flex-wrap gap-4 text-xs'
                  >
                    <a
                      href={selected.live}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 underline underline-offset-4 hover:text-foreground transition-colors'
                    >
                      <FiExternalLink size={12} /> Live
                    </a>
                    <a
                      href={selected.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 underline underline-offset-4 hover:text-foreground transition-colors'
                    >
                      <FaGithub size={12} /> GitHub
                    </a>
                    <a
                      href={selected.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 underline underline-offset-4 hover:text-foreground transition-colors'
                    >
                      <FaLinkedin size={12} /> LinkedIn
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
