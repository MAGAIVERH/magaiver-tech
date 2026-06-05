'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { Project } from '@/constants/projects';
import {
  Dumbbell,
  HandCoins,
  Sparkles,
  Utensils,
  ShoppingCart,
  BarChart3,
  Brain,
  Stethoscope,
  LayoutDashboard,
  Layers,
} from 'lucide-react';
import { useI18n } from '@/hooks/use-i18n';
import { GlowBorder } from '@/components/ui/glow-border';
import { cn } from '@/lib/utils';

type Props = {
  project: Project;
  onClick: () => void;
  className?: string;
};

const projectIconMap = {
  fit: Brain,
  doctor: Stethoscope,
  ecommerce: ShoppingCart,
  analytics: BarChart3,
  saas: Layers,
  tattoo: Sparkles,
  food: Utensils,
  crowdfunding: HandCoins,
  personal: Dumbbell,
  default: LayoutDashboard,
};

function getProjectIconKey(title: string): keyof typeof projectIconMap {
  const lower = title.toLowerCase();

  if (lower.includes('fit')) return 'fit';
  if (lower.includes('dr')) return 'doctor';
  if (lower.includes('e-commerce') || lower.includes('store'))
    return 'ecommerce';
  if (lower.includes('analytics') || lower.includes('finance'))
    return 'analytics';
  if (lower.includes('saas')) return 'saas';
  if (lower.includes('tattoo')) return 'tattoo';
  if (lower.includes('food') || lower.includes('meki')) return 'food';
  if (lower.includes('crowd')) return 'crowdfunding';
  if (lower.includes('personal')) return 'personal';
  if (
    lower.includes('pirillo') ||
    lower.includes('academy') ||
    lower.includes('jiu')
  )
    return 'personal';

  return 'default';
}

const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.4 };

export function ProjectCard({ project, onClick, className }: Props) {
  const { locale } = useI18n();
  const iconKey = getProjectIconKey(project.title[locale]);
  const Icon = projectIconMap[iconKey];
  const cardRef = useRef<HTMLDivElement>(null);
  const [enableTilt, setEnableTilt] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setEnableTilt(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [7, -7]),
    TILT_SPRING,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-7, 7]),
    TILT_SPRING,
  );
  const glareX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [0, 100]),
    TILT_SPRING,
  );
  const glareY = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [0, 100]),
    TILT_SPRING,
  );
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(var(--glow) / 0.14), transparent 55%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-project-card
      layoutId={`card-${project.id}`}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={
        enableTilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 900,
            }
          : undefined
      }
      whileTap={{ scale: 0.985 }}
      className={cn('cursor-hover will-change-transform', className)}
    >
      <GlowBorder
        innerClassName='h-full'
        className='h-full transition-transform duration-300 group-hover/glow:-translate-y-0.5'
      >
        <div className='relative overflow-hidden rounded-[11px] border border-border/80 bg-card p-6 transition-colors duration-300 hover:bg-muted/40'>
          <motion.div
            aria-hidden
            className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100'
            style={{ background: glareBackground }}
          />

          <div className='relative project-card-content'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-md bg-primary/10 ring-1 ring-primary/15'>
                <Icon size={16} className='text-primary' />
              </div>

              <motion.h3
                layoutId={`title-${project.id}`}
                className='font-semibold text-lg leading-snug'
              >
                {project.title[locale]}
              </motion.h3>
            </div>

            <motion.p
              layoutId={`desc-${project.id}`}
              className='mt-2 text-sm text-muted-foreground line-clamp-3'
            >
              {project.description[locale]}
            </motion.p>

            <p className='mt-4 text-xs font-medium text-muted-foreground/80 group-hover/glow:text-foreground transition-colors'>
              {locale === 'pt' ? 'Ver detalhes' : 'View details'}
              <span className='inline-block ml-1 transition-transform duration-300 group-hover/glow:translate-x-1'>
                →
              </span>
            </p>
          </div>
        </div>
      </GlowBorder>
    </motion.div>
  );
}
