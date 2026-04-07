'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/interactive/spotlight';
import { MagneticButton } from '@/components/common/magnetic-button';
import { GlowButton } from '@/components/common/glow-button';

export function Hero() {
  return (
    <section className='relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 bg-background text-foreground overflow-hidden'>
      <Spotlight />

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight'
      >
        <span className='bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent'>
          Building scalable and high-performance web applications
        </span>
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10 mt-6 text-lg md:text-xl text-muted-foreground max-w-xl'
      >
        Full Stack Engineer focused on performance, architecture and user
        experience.
      </motion.p>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='relative z-10 mt-8 flex gap-4'
      >
        <MagneticButton>
          <GlowButton>
            <Button
              size='lg'
              className='relative z-10 transition-all duration-300 hover:scale-105'
            >
              View Projects
            </Button>
          </GlowButton>
        </MagneticButton>

        <MagneticButton>
          <GlowButton>
            <Button
              variant='outline'
              size='lg'
              className='relative z-10 transition-all duration-300 hover:scale-105'
            >
              Contact
            </Button>
          </GlowButton>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
