'use client';

import { motion } from 'framer-motion';

type Project = {
  title: string;
  description: string;
  stack: string[];
  live: string;
  github: string;
  linkedin: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className='border border-border rounded-xl p-6 bg-background hover:shadow-xl transition-all duration-300'
    >
      <h3 className='text-xl font-semibold'>{project.title}</h3>

      <p className='mt-2 text-muted-foreground'>{project.description}</p>

      {/* STACK */}
      <div className='mt-4 flex flex-wrap gap-2'>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className='text-sm px-2 py-1 border border-border rounded-md'
          >
            {tech}
          </span>
        ))}
      </div>

      {/* LINKS */}
      <div className='mt-6 flex gap-4 text-sm'>
        <a href={project.live} className='underline'>
          Live
        </a>
        <a href={project.github} className='underline'>
          GitHub
        </a>
        <a href={project.linkedin} className='underline'>
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
