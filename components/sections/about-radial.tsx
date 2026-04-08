'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutItems } from '@/constants/about-items';
import { getAboutIcon } from '@/lib/get-about-icon';

type AboutItem = {
  id: string;
  icon: string;
  title: string;
  metric: string;
  problem: string;
  solution: string;
  result: string;
};

export function AboutRadial() {
  const [active, setActive] = useState<AboutItem | null>(null);
  const [radius, setRadius] = useState(140);

  // ✅ Responsivo REAL (sem Tailwind hack)
  useEffect(() => {
    function updateRadius() {
      const width = window.innerWidth;

      if (width >= 1024) setRadius(260); // desktop
      else if (width >= 640) setRadius(180); // tablet
      else setRadius(140); // mobile
    }

    updateRadius();
    window.addEventListener('resize', updateRadius);

    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <section className='py-32 flex items-center justify-center relative'>
      <div className='relative flex items-center justify-center'>
        {/* TEXTO CENTRAL */}
        <div className='absolute text-center z-10 px-6 max-w-md'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>About me</h2>

          <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
            I design and build systems focused on performance, scalability and
            real business impact.
          </p>

          <p className='text-xs mt-4 text-muted-foreground/70'>
            Click on the orbiting elements to explore how I solve real-world
            problems.
          </p>
        </div>

        {/* ORBITA */}
        <div className='relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px]'>
          {aboutItems.map((item: AboutItem, index: number) => {
            const Icon = getAboutIcon(item.icon);

            const angle = (index / aboutItems.length) * 2 * Math.PI;

            return (
              <motion.div
                key={item.id}
                className='absolute left-1/2 top-1/2'
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 60,
                  ease: 'linear',
                }}
              >
                <div
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translate(
                        ${Math.cos(angle) * radius}px,
                        ${Math.sin(angle) * radius}px
                      )
                    `,
                  }}
                >
                  <button
                    onClick={() => setActive(item)}
                    className='
                      w-10 h-10 md:w-12 md:h-12
                      rounded-full
                      border border-white/20
                      flex items-center justify-center
                      hover:scale-110
                      transition
                      bg-background/40
                      backdrop-blur
                    '
                  >
                    <Icon size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CARD CENTRAL */}
      {active && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4'
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-background border border-white/10 rounded-2xl w-full max-w-[420px] p-5 sm:p-6 md:p-8'
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='text-xl font-bold mb-2'>{active.title}</h3>

            <p className='text-sm mb-4 text-primary'>{active.metric}</p>

            <p className='mb-3 text-sm'>
              <strong>Problem:</strong> {active.problem}
            </p>

            <p className='mb-3 text-sm'>
              <strong>Solution:</strong> {active.solution}
            </p>

            <p className='text-sm'>
              <strong>Result:</strong> {active.result}
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
