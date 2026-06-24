'use client';

import type { ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  Check,
  Sparkles,
  Users,
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
const VH = 650;

type ArchLabels = {
  caption: string;
  multiTenant: string;
  buyers: string;
  buyersSub: string;
  brokerages: string;
  brokeragesSub: string;
  marketplace: string;
  marketplaceSub: string;
  coreSub: string;
  edgeSearch: string;
  edgeLeads: string;
  edgeApi: string;
  edgeDashboard: string;
  rls: string;
  semantic: string;
  asyncJobs: string;
};

type NodeDef = {
  x: number;
  y: number;
  w: number;
  h: number;
  icon: ReactNode;
  title: string;
  sub?: string;
  variant?: 'core' | 'default' | 'ai' | 'actor' | 'market';
};

type EdgeDef = { id: string; d: string };
type EdgeLabel = { x: number; y: number; text: string };

function buildNodes(t: ArchLabels): NodeDef[] {
  return [
    // people layer
    {
      x: 18,
      y: 30,
      w: 120,
      h: 48,
      icon: <Users size={13} />,
      title: t.buyers,
      sub: t.buyersSub,
      variant: 'actor',
    },
    {
      x: 222,
      y: 30,
      w: 120,
      h: 48,
      icon: <Building2 size={13} />,
      title: t.brokerages,
      sub: t.brokeragesSub,
      variant: 'actor',
    },
    // meeting point
    {
      x: 110,
      y: 150,
      w: 140,
      h: 54,
      icon: <Store size={13} />,
      title: t.marketplace,
      sub: t.marketplaceSub,
      variant: 'market',
    },
    // engine
    {
      x: 96,
      y: 282,
      w: 168,
      h: 56,
      icon: <Server size={14} />,
      title: 'PropAI Core',
      sub: t.coreSub,
      variant: 'core',
    },
    // data layer
    {
      x: 12,
      y: 412,
      w: 104,
      h: 50,
      icon: <Database size={12} />,
      title: 'PostgreSQL',
      sub: t.rls,
    },
    {
      x: 128,
      y: 412,
      w: 104,
      h: 50,
      icon: <Search size={12} />,
      title: 'pgvector',
      sub: t.semantic,
    },
    {
      x: 244,
      y: 412,
      w: 104,
      h: 50,
      icon: <Workflow size={12} />,
      title: 'Redis · BullMQ',
      sub: t.asyncJobs,
    },
    // async AI workers
    {
      x: 12,
      y: 530,
      w: 104,
      h: 50,
      icon: <Eye size={12} />,
      title: 'Vision',
      sub: 'Gemini',
      variant: 'ai',
    },
    {
      x: 128,
      y: 530,
      w: 104,
      h: 50,
      icon: <Sparkles size={12} />,
      title: 'Embeddings',
      sub: 'OpenAI',
      variant: 'ai',
    },
    {
      x: 244,
      y: 530,
      w: 104,
      h: 50,
      icon: <Target size={12} />,
      title: 'Lead scoring',
      sub: 'LLM',
      variant: 'ai',
    },
  ];
}

const CONNECTORS: EdgeDef[] = [
  { id: 'c-buy', d: 'M 78 78 C 78 118 122 138 152 150' },
  { id: 'c-brk', d: 'M 208 150 C 238 138 282 118 282 78' },
  { id: 'c-mkt', d: 'M 180 204 L 180 282' },
  { id: 'c-brk2', d: 'M 282 78 C 326 160 312 252 250 284' },
  { id: 'c-d0', d: 'M 168 338 C 120 364 64 384 64 412' },
  { id: 'c-d1', d: 'M 180 338 L 180 412' },
  { id: 'c-d2', d: 'M 192 338 C 240 364 296 384 296 412' },
  { id: 'c-a0', d: 'M 64 462 L 64 530' },
  { id: 'c-a1', d: 'M 180 462 L 180 530' },
  { id: 'c-a2', d: 'M 296 462 L 296 530' },
];

function buildEdgeLabels(t: ArchLabels): EdgeLabel[] {
  return [
    { x: 108, y: 116, text: t.edgeSearch },
    { x: 252, y: 116, text: t.edgeLeads },
    { x: 180, y: 243, text: t.edgeApi },
    { x: 316, y: 182, text: t.edgeDashboard },
  ];
}

function ArchNode({ node }: { node: NodeDef }) {
  const isCore = node.variant === 'core';
  const isAi = node.variant === 'ai';
  const isMarket = node.variant === 'market';

  return (
    <foreignObject x={node.x} y={node.y} width={node.w} height={node.h}>
      <div
        className={[
          'flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg border px-1 text-center backdrop-blur-sm',
          isCore
            ? 'border-accent/50 bg-accent/15 shadow-[0_0_22px_-4px_rgb(var(--accent)/0.5)]'
            : isMarket
              ? 'border-accent/40 bg-accent/[0.08]'
              : isAi
                ? 'border-dashed border-accent/30 bg-background/60'
                : 'border-border/70 bg-background/75',
        ].join(' ')}
      >
        <div
          className={[
            'flex items-center gap-1 font-semibold leading-none',
            isCore || isMarket ? 'text-accent' : 'text-foreground/85',
          ].join(' ')}
          style={{ fontSize: isCore ? 12 : 10 }}
        >
          <span className={isCore || isMarket ? 'text-accent' : 'text-accent/80'}>
            {node.icon}
          </span>
          {node.title}
        </div>
        {node.sub && (
          <div
            className="leading-tight text-muted-foreground"
            style={{ fontSize: 8 }}
          >
            {node.sub}
          </div>
        )}
      </div>
    </foreignObject>
  );
}

function PropAIArchitecture({
  title,
  labels,
}: {
  title: string;
  labels: ArchLabels;
}) {
  const { prefersReducedMotion } = useLenis();
  const nodes = buildNodes(labels);
  const edgeLabels = buildEdgeLabels(labels);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--foreground)/0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground)/0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse 90% 90% at 50% 40%, black 40%, transparent 85%)',
        }}
      />

      <div className="relative flex items-center justify-between">
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
          {labels.multiTenant}
        </span>
      </div>

      {/* plain-language caption */}
      <p className="relative mt-2 text-[11px] leading-relaxed text-muted-foreground">
        {labels.caption}
      </p>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="relative mt-3 block h-auto w-full"
        role="img"
        aria-label={labels.caption}
      >
        {/* stacked cards behind the brokerages node => signals "many" */}
        <g>
          <rect
            x={233}
            y={22}
            width={120}
            height={48}
            rx={9}
            fill="rgb(var(--background))"
            stroke="rgb(var(--border) / 0.5)"
          />
          <rect
            x={227}
            y={26}
            width={120}
            height={48}
            rx={9}
            fill="rgb(var(--background))"
            stroke="rgb(var(--border) / 0.7)"
          />
        </g>

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

        {/* edge labels (what each connection means) */}
        {edgeLabels.map((l) => (
          <foreignObject
            key={l.text}
            x={l.x - 42}
            y={l.y - 8}
            width={84}
            height={16}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span
                className="truncate rounded-full border border-border/70 bg-background/90 px-1.5 py-0.5 font-medium text-muted-foreground"
                style={{ fontSize: 8 }}
              >
                {l.text}
              </span>
            </div>
          </foreignObject>
        ))}

        {/* nodes */}
        {nodes.map((node, i) => (
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
            <div className="grid gap-8 rounded-[11px] border border-border/80 bg-card p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
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
              <div>
                <PropAIArchitecture
                  title={dict.featured.architectureTitle}
                  labels={dict.featured.arch}
                />
              </div>
            </div>
          </GlowBorder>
        </Reveal>
      </div>
    </section>
  );
}
