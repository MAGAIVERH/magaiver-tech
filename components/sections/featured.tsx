'use client';

import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Check, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/common/reveal';
import { GlowBorder } from '@/components/ui/glow-border';
import { featuredProject } from '@/constants/featured';
import { techIcons } from '@/lib/tech-icons';
import { useI18n } from '@/hooks/use-i18n';

function ArchitectureDiagram() {
  const node =
    'rounded-lg border border-border/70 bg-background/70 px-3 py-2 text-center text-[11px] font-medium leading-tight backdrop-blur-sm';
  const lane =
    'text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60';

  return (
    <div className='relative h-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 p-5'>
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.4]'
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--foreground)/0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--foreground)/0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      <div className='relative flex flex-col gap-4'>
        <div className='space-y-2'>
          <p className={lane}>Clients</p>
          <div className='grid grid-cols-2 gap-2'>
            <div className={node}>Next.js Dashboard</div>
            <div className={node}>Next.js Marketplace</div>
          </div>
        </div>

        <div className='flex justify-center'>
          <span className='h-5 w-px bg-gradient-to-b from-accent/70 to-transparent' />
        </div>

        <div className='space-y-2'>
          <p className={lane}>API · shared Zod contracts</p>
          <div className='rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-center text-[11px] font-semibold'>
            Fastify · Better Auth · RBAC
          </div>
        </div>

        <div className='flex justify-center'>
          <span className='h-5 w-px bg-gradient-to-b from-accent/70 to-transparent' />
        </div>

        <div className='space-y-2'>
          <p className={lane}>Data & async AI</p>
          <div className='grid grid-cols-3 gap-2'>
            <div className={node}>PostgreSQL · RLS</div>
            <div className={node}>pgvector</div>
            <div className={node}>Redis · BullMQ</div>
          </div>
          <div className='rounded-lg border border-dashed border-border/70 bg-background/50 px-3 py-2 text-center text-[10px] text-muted-foreground'>
            Vision (Gemini) · Embeddings (OpenAI) · Lead scoring
          </div>
        </div>
      </div>
    </div>
  );
}

export function Featured() {
  const { dict, locale } = useI18n();
  const project = featuredProject;

  return (
    <section className='px-6 py-24'>
      <div className='mx-auto max-w-5xl'>
        <Reveal>
          <div className='mb-8 flex items-center gap-3'>
            <span className='inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent'>
              <Sparkles size={13} />
              {dict.featured.eyebrow}
            </span>
            <span className='h-px flex-1 bg-border/60' />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <GlowBorder className='w-full'>
            <div className='grid gap-8 rounded-[11px] border border-border/80 bg-card p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]'>
              {/* Left: narrative */}
              <div className='flex flex-col'>
                <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
                  {project.name}
                </h2>
                <p className='mt-2 text-base font-medium text-foreground/80'>
                  {project.tagline[locale]}
                </p>
                <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                  {project.description[locale]}
                </p>

                {/* metrics */}
                <div className='mt-6 grid grid-cols-3 gap-3'>
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label.en}
                      className='rounded-lg border border-border/60 bg-background/50 px-3 py-3 text-center'
                    >
                      <div className='text-xl font-bold tracking-tight text-accent md:text-2xl'>
                        {metric.value}
                      </div>
                      <div className='mt-1 text-[11px] leading-tight text-muted-foreground'>
                        {metric.label[locale]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* highlights */}
                <p className='mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60'>
                  {dict.featured.highlightsTitle}
                </p>
                <ul className='mt-3 space-y-2.5'>
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight.en}
                      className='flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85'
                    >
                      <Check
                        size={16}
                        className='mt-0.5 shrink-0 text-accent'
                      />
                      <span>{highlight[locale]}</span>
                    </li>
                  ))}
                </ul>

                {/* stack + actions */}
                <div className='mt-7 flex flex-wrap gap-2'>
                  {project.stack.map((tech) => {
                    const Icon = techIcons[tech];
                    return (
                      <span
                        key={tech}
                        className='inline-flex items-center gap-1.5 rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground'
                      >
                        {Icon && <Icon size={12} />}
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className='mt-7 flex flex-wrap gap-3'>
                  {project.live && (
                    <a
                      href={project.live}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='cursor-hover inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90'
                    >
                      <FiExternalLink size={15} />
                      {dict.featured.viewProject}
                    </a>
                  )}
                  <a
                    href={project.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='cursor-hover inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background'
                  >
                    <FaGithub size={15} />
                    {dict.featured.viewCode}
                  </a>
                </div>
              </div>

              {/* Right: architecture visual */}
              <div className='min-h-[20rem]'>
                <ArchitectureDiagram />
              </div>
            </div>
          </GlowBorder>
        </Reveal>
      </div>
    </section>
  );
}
