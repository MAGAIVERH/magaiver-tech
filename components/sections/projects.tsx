'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const techIcons: Record<string, IconType> = {
  React: FaReact,
  'Next.js': SiNextdotjs,
  Node: FaNodeJs,
  TypeScript: SiTypescript,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
};

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section className='py-24 px-6 bg-background text-foreground'>
      <div className='max-w-5xl mx-auto'>
        <Reveal>
          <h2 className='text-3xl md:text-4xl font-bold'>Selected Projects</h2>
        </Reveal>

        {/* GRID */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-6'>
          {visibleProjects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard
                project={project}
                onClick={() => setSelected(project)}
              />
            </Reveal>
          ))}
        </div>

        <div className='mt-10 flex justify-center'>
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className='
      px-5 py-2 
      text-sm 
      border border-border 
      rounded-md 
      transition-all duration-300
      hover:bg-foreground 
      hover:text-background
    '
          >
            {showAll ? 'View less' : 'View more'}
          </button>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className='fixed inset-0 z-50 flex items-center justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* BACKDROP */}
              <div
                className='absolute inset-0 bg-black/60 backdrop-blur-sm'
                onClick={() => setSelected(null)}
              />

              {/* MODAL */}
              <motion.div
                layoutId={`card-${selected.id}`}
                onClick={(e) => e.stopPropagation()}
                className='
                  relative
                  w-[92%]
                  max-w-xl
                  bg-background
                  border border-border
                  rounded-xl
                  p-5
                  shadow-2xl
                  max-h-[85vh]
                  overflow-y-auto
                '
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setSelected(null)}
                  className='absolute top-3 right-3 p-1 rounded-md hover:bg-muted'
                >
                  <FiX size={18} />
                </button>

                {/* TITLE */}
                <motion.h3
                  layoutId={`title-${selected.id}`}
                  className='text-lg md:text-2xl font-bold pr-6'
                >
                  {selected.title}
                </motion.h3>

                {/* DESC */}
                <motion.p
                  layoutId={`desc-${selected.id}`}
                  className='mt-2 text-sm md:text-base text-muted-foreground'
                >
                  {selected.description}
                </motion.p>

                {/* PREVIEW */}
                <div className='mt-4 h-32 md:h-40 rounded-lg border border-border flex items-center justify-center text-xs opacity-50'>
                  Project Preview
                </div>

                {/* STORY */}
                <div className='mt-4 space-y-3 text-xs md:text-sm text-muted-foreground'>
                  <p>
                    <strong>Overview:</strong> Built to deliver scalable
                    architecture and high-performance UX.
                  </p>
                  <p>
                    <strong>Problem:</strong> Lack of real-time visibility and
                    inefficient workflows.
                  </p>
                  <p>
                    <strong>Solution:</strong> Modern application with optimized
                    performance and intuitive UI.
                  </p>
                  <p>
                    <strong>Impact:</strong> Increased efficiency by up to 40%.
                  </p>
                </div>

                {/* STACK */}
                <div className='mt-4 flex flex-wrap gap-2'>
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
                </div>

                {/* LINKS */}
                <div className='mt-4 flex flex-wrap gap-4 text-xs'>
                  <a
                    href={selected.live}
                    className='flex items-center gap-2 underline'
                  >
                    <FiExternalLink size={12} /> Live
                  </a>

                  <a
                    href={selected.github}
                    className='flex items-center gap-2 underline'
                  >
                    <FaGithub size={12} /> GitHub
                  </a>

                  <a
                    href={selected.linkedin}
                    className='flex items-center gap-2 underline'
                  >
                    <FaLinkedin size={12} /> LinkedIn
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
