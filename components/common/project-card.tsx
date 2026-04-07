'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/constants/projects';
import {
  Dumbbell,
  Stethoscope,
  ShoppingCart,
  BarChart3,
  Layers,
  LayoutDashboard,
} from 'lucide-react';

type Props = {
  project: Project;
  onClick: () => void;
};

// ✅ MAPA FORA DO COMPONENTE (resolve o erro)
const projectIconMap = {
  fit: Dumbbell,
  doctor: Stethoscope,
  ecommerce: ShoppingCart,
  analytics: BarChart3,
  saas: Layers,
  default: LayoutDashboard,
};

function getProjectIconKey(title: string): keyof typeof projectIconMap {
  const lower = title.toLowerCase();

  if (lower.includes('fit')) return 'fit';
  if (lower.includes('dr')) return 'doctor';
  if (lower.includes('e-commerce')) return 'ecommerce';
  if (lower.includes('analytics')) return 'analytics';
  if (lower.includes('saas')) return 'saas';

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
      className='group relative rounded-xl border border-border bg-card p-6 cursor-pointer transition-colors duration-300 hover:bg-muted/50'
    >
      {/* HEADER */}
      <div className='flex items-center gap-3'>
        <Icon size={18} className='opacity-70' />

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
