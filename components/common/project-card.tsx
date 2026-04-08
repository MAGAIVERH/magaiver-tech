'use client';

import { motion } from 'framer-motion';
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
  Layers, // ✅ ADICIONADO
} from 'lucide-react';

type Props = {
  project: Project;
  onClick: () => void;
};

// ✅ MAPA MELHORADO (SEM QUEBRAR SUA LÓGICA)
const projectIconMap = {
  fit: Brain, // melhor pra AI
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

  return 'default';
}

export function ProjectCard({ project, onClick }: Props) {
  const iconKey = getProjectIconKey(project.title);
  const Icon = projectIconMap[iconKey];

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className='cursor-hover group relative rounded-xl border border-border bg-card p-6 cursor-pointer transition-colors duration-300 hover:bg-muted/50'
    >
      {/* HEADER */}
      <div className='flex items-center gap-3'>
        {/* ✅ MELHORIA VISUAL (badge) */}
        <div className='p-2 rounded-md bg-primary/10'>
          <Icon size={16} className='text-primary' />
        </div>

        <motion.h3
          layoutId={`title-${project.id}`}
          className='font-semibold text-lg'
        >
          {project.title}
        </motion.h3>
      </div>

      {/* DESCRIPTION */}
      <motion.p
        layoutId={`desc-${project.id}`}
        className='mt-2 text-sm text-muted-foreground'
      >
        {project.description}
      </motion.p>
    </motion.div>
  );
}
