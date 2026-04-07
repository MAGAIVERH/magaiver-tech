'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/interactive/spotlight';

export function Hero() {
  return (
    <section className='relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 bg-background text-foreground overflow-hidden'>
      {/* Spotlight */}
      <Spotlight />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl'
      >
        Building scalable and high-performance web applications
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10 mt-6 text-lg md:text-xl text-muted-foreground max-w-xl'
      >
        Full Stack Engineer focused on performance, architecture and user
        experience.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='relative z-10 mt-8 flex gap-4'
      >
        <Button size='lg'>View Projects</Button>

        <Button variant='outline' size='lg'>
          Contact
        </Button>
      </motion.div>
    </section>
  );
}
