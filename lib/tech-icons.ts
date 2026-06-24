import type { IconType } from 'react-icons';
import { FaReact, FaNodeJs } from 'react-icons/fa';
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
  SiRedis,
  SiDocker,
  SiTurborepo,
  SiVercel,
} from 'react-icons/si';
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Database,
  Workflow,
} from 'lucide-react';

/**
 * Single source of truth for tech-stack glyphs, shared by the projects modal
 * and the featured spotlight. Falls back gracefully when a logo doesn't exist
 * in react-icons (BullMQ, Better Auth, pgvector) by using a lucide glyph.
 */
export const techIcons: Record<string, IconType> = {
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
  Redis: SiRedis,
  Docker: SiDocker,
  Turborepo: SiTurborepo,
  Vercel: SiVercel,
  'Better Auth': Lock,
  pgvector: Database,
  BullMQ: Workflow,
};
