'use client';

import type { ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  Check,
  Sparkles,
  Building2,
  Store,
  Server,
  Database,
  Search,
  Workflow,
  Eye,
  Target,
} from 'lucide-react';
import { Reveal } from '@/components/common/reveal';
import { GlowBorder } from '@/components/ui/glow-border';
import { featuredProject } from '@/constants/featured';
import { techIcons } from '@/lib/tech-icons';
import { useI18n } from '@/hooks/use-i18n';
import { useLenis } from '@/components/providers/lenis-provider';

/* ----------------------------- Architecture ----------------------------- */

const VW = 360;
const VH = 560;

type NodeDef = {
  x: number;
  y: number;
  w: number;
  h: number;
  icon: ReactNode;
  title: string;
  sub?: string;
  variant?: 'core' | 'default' | 'ai';
};

const TENANT_CX = [52, 142, 232];

const NODES: NodeDef[] = [
  // tenants (many brokerages)
  ...TENANT_CX.map((cx, i) => ({
    x: cx - 38,
    y: 14,
    w: 76,
    h: 42,
    icon: <Building2 size={11} />,
    title: `Brokerage ${i + 1}`,
  })),
  // public marketplace
  {
    x: 12,
    y: 150,
    w: 132,
    h: 46,
    icon: <Store size={12} />,
    title: 'Public Marketplace',
    sub: 'SEO leads',
  },
  // core
  {
    x: 98,
    y: 248,
    w: 164,
    h: 60,
    icon: <Server size={14} />,
    title: 'PropAI Core',
    sub: 'Fastify · RBAC · Zod',
    variant: 'core' as const,
  },
  // data layer
  {
    x: 12,
    y: 366,
    w: 104,
    h: 46,
    icon: <Database size={12} />,
    title: 'PostgreSQL',
    sub: 'Row-Level Security',
  },
  {
    x: 128,
    y: 366,
    w: 104,
    h: 46,
    icon: <Search size={12} />,
    title: 'pgvector',
    sub: 'Semantic search',
  },
  {
    x: 244,
    y: 366,
    w: 104,
    h: 46,
    icon: <Workflow size={12} />,
    title: 'Redis · BullMQ',
    sub: 'Async jobs',
  },
  // async AI workers
  {
    x: 12,
    y: 476,
    w: 104,
    h: 46,
    icon: <Eye size={12} />,
    title: 'Vision',
    sub: 'Gemini',
    variant: 'ai' as const,
  },
  {
    x: 128,
    y: 476,
    w: 104,
    h: 46,
    icon: <Sparkles size={12} />,
    title: 'Embeddings',
    sub: 'OpenAI',
    variant: 'ai' as const,
  },
  {
    x: 244,
    y: 476,
    w: 104,
    h: 46,
    icon: <Target size={12} />,
    title: 'Lead scoring',
    sub: 'LLM',
    variant: 'ai' as const,
  },
];

// connector paths (id -> svg path), flowing from inputs down through the core
const CONNECTORS: { id: string; d: string }[] = [
  { id: 'c-t0', d: 'M 52 56 C 52 150 180 150 180 248' },
  { id: 'c-t1', d: 'M 142 56 C 142 150 180 180 180 248' },
  { id: 'c-t2', d: 'M 232 56 C 232 150 180 150 180 248' },
  { id: 'c-mk', d: 'M 144 173 C 168 200 150 235 116 268' },
  { id: 'c-d0', d: 'M 170 308 C 120 338 64 338 64 366' },
  { id: 'c-d1', d: 'M 180 308 L 180 366' },
  { id: 'c-d2', d: 'M 190 308 C 240 338 296 338 296 366' },
  { id: 'c-a0', d: 'M 64 412 L 64 476' },
  { id: 'c-a1', d: 'M 180 412 L 180 476' },
  { id: 'c-a2', d: 'M 296 412 L 296 476' },
];

function ArchNode({ node }: { node: NodeDef }) {
  const isCore = node.variant === 'core';
  const isAi = node.variant === 'ai';

  return (
    <foreignObject x={node.x} y={node.y} width={node.w} height={node.h}>
      <div
        className={[
          'flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg border px-1 text-center backdrop-blur-sm',
          isCore
            ? 'border-accent/50 bg-accent/15 shadow-[0_0_22px_-4px_rgb(var(--accent)/0.5)]'
            : isAi
              ? 'border-dashed border-accent/30 bg-background/60'
              : 'border-border/70 bg-background/70',
        ].join(' ')}
      >
        <div
          className={[
            'flex items-center gap-1 font-semibold leading-none',
            isCore ? 'text-accent' : 'text-foreground/85',
          ].join(' ')}
          style={{ fontSize: isCore ? 12 : 10 }}
        >
          <span className={isCore ? 'text-accent' : 'text-accent/80'}>
            {node.icon}
          </span>
          {node.title}
        </div>
        {node.sub && (
          <div
            className="leading-none text-muted-foreground"
            style={{ fontSize: 8 }}
          >
            {node.sub}
          </div>
        )}
      </div>
    </foreignObject>
  );
}

function PropAIArchitecture({ title }: { title: string }) {
  const { prefersReducedMotion } = useLenis();

  return (
    <div className="relative h-full min-h-[24rem] overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-4">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--foreground)/0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground)/0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse 85% 85% at 50% 45%, black 35%, transparent 82%)',
        }}
      />

      <div className="relative mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
          {title}
        </span>
        <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground/70">
          <span className="relative flex h-1.5 w-1.5">
            {!prefersReducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Multi-tenant
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        className="relative h-[calc(100%-1.75rem)] w-full"
        role="img"
        aria-label="PropAI OS architecture: brokerages and a public marketplace feed a Fastify core, backed by PostgreSQL with row-level security, pgvector, Redis/BullMQ and async AI workers."
      >
        {/* connectors */}
        <g
          fill="none"
          stroke="rgb(var(--foreground) / 0.18)"
          strokeWidth={1.4}
          strokeLinecap="round"
        >
          {CONNECTORS.map((c) => (
            <path key={c.id} id={c.id} d={c.d} />
          ))}
        </g>

        {/* flowing data packets */}
        {!prefersReducedMotion && (
          <g>
            {CONNECTORS.map((c, i) => (
              <circle
                key={`pk-${c.id}`}
                r={2.6}
                fill="rgb(var(--accent))"
                opacity={0}
              >
                <animateMotion
                  dur="2.6s"
                  repeatCount="indefinite"
                  begin={`${(i * 0.26).toFixed(2)}s`}
                >
                  <mpath href={`#${c.id}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="2.6s"
                  repeatCount="indefinite"
                  begin={`${(i * 0.26).toFixed(2)}s`}
                />
              </circle>
            ))}
          </g>
        )}

        {/* nodes */}
        {NODES.map((node, i) => (
          <ArchNode key={i} node={node} />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------- Section -------------------------------- */

export function Featured() {
  const { dict, locale } = useI18n();
  const project = featuredProject;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-8 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles size={13} />
              {dict.featured.eyebrow}
            </span>
            <span className="h-px flex-1 bg-border/60" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <GlowBorder className="w-full">
            <div className="grid gap-8 rounded-[11px] border border-border/80 bg-card p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left: narrative */}
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {project.name}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                    </span>
                    {dict.featured.inDevelopment}
                  </span>
                </div>

                <p className="mt-2 text-base font-medium text-foreground/80">
                  {project.tagline[locale]}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description[locale]}
                </p>

                {/* metrics */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label.en}
                      className="rounded-lg border border-border/60 bg-background/50 px-3 py-3 text-center"
                    >
                      <div className="text-xl font-bold tracking-tight text-accent md:text-2xl">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                        {metric.label[locale]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* highlights */}
                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60">
                  {dict.featured.highlightsTitle}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight.en}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      <span>{highlight[locale]}</span>
                    </li>
                  ))}
                </ul>

                {/* stack + actions */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack.map((tech) => {
                    const Icon = techIcons[tech];
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground"
                      >
                        {Icon && <Icon size={12} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-hover inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      <FiExternalLink size={15} />
                      {dict.featured.viewProject}
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-hover inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    <FaGithub size={15} />
                    {dict.featured.viewCode}
                  </a>
                </div>
              </div>

              {/* Right: live architecture visual */}
              <div className="min-h-[24rem]">
                <PropAIArchitecture title={dict.featured.architectureTitle} />
              </div>
            </div>
          </GlowBorder>
        </Reveal>
      </div>
    </section>
  );
}
