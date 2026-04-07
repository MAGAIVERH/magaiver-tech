'use client';

import { Reveal } from '@/components/common/reveal';

export function About() {
  return (
    <section className='container mx-auto px-6 py-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* LEFT - TEXT */}
        <div>
          <Reveal>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>About me</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className='text-muted-foreground max-w-xl leading-relaxed mb-6'>
              I am a Full Stack Engineer focused on building scalable and
              high-performance web applications. My work goes beyond just
              writing code — I design systems, solve real business problems, and
              deliver products that are ready for production.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className='text-muted-foreground max-w-xl leading-relaxed mb-6'>
              I specialize in modern technologies like React, Next.js,
              TypeScript, Node.js and PostgreSQL, with strong experience in SaaS
              platforms, dashboards and AI-driven applications.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className='text-muted-foreground max-w-xl leading-relaxed'>
              I care about performance, architecture and user experience. Every
              project I build is designed to scale, perform and deliver real
              value.
            </p>
          </Reveal>
        </div>

        {/* RIGHT - STATS */}
        <div className='grid grid-cols-2 gap-4'>
          <Reveal delay={0.2}>
            <div className='border rounded-xl p-6 hover:bg-muted transition-all'>
              <h3 className='text-2xl font-bold'>4+</h3>
              <p className='text-sm text-muted-foreground'>
                Years building production applications
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className='border rounded-xl p-6 hover:bg-muted transition-all'>
              <h3 className='text-2xl font-bold'>10+</h3>
              <p className='text-sm text-muted-foreground'>
                Projects shipped end-to-end
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className='border rounded-xl p-6 hover:bg-muted transition-all'>
              <h3 className='text-2xl font-bold'>SaaS</h3>
              <p className='text-sm text-muted-foreground'>
                Multi-tenant platforms and dashboards
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className='border rounded-xl p-6 hover:bg-muted transition-all'>
              <h3 className='text-2xl font-bold'>AI</h3>
              <p className='text-sm text-muted-foreground'>
                AI integrations and smart features
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
