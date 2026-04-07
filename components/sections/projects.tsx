'use client';

import { Reveal } from '@/components/common/reveal';
import { ProjectCard } from '@/components/common/project-card';
import { projects } from '@/constants/projects';

export function Projects() {
  return (
    <section className='py-24 px-6 bg-background text-foreground'>
      <div className='max-w-5xl mx-auto'>
        <Reveal>
          <h2 className='text-3xl md:text-4xl font-bold'>Selected Projects</h2>
        </Reveal>

        <Reveal>
          <p className='mt-4 text-muted-foreground max-w-2xl'>
            A selection of projects focused on performance, scalability and
            real-world impact.
          </p>
        </Reveal>

        <div className='mt-12 grid md:grid-cols-2 gap-6'>
          {projects.map((project) => (
            <Reveal key={project.title}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
