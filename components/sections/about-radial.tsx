'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AboutItem, aboutItems } from '@/constants/about-items';
import { useI18n } from '@/hooks/use-i18n';

export function AboutRadial() {
  const { locale, dict } = useI18n();
  const [active, setActive] = useState<AboutItem | null>(null);
  const [hovered, setHovered] = useState<AboutItem | null>(null);
  const [radius, setRadius] = useState(170);

  useEffect(() => {
    function updateRadius() {
      const width = window.innerWidth;
      if (width >= 1024) setRadius(260);
      else if (width >= 640) setRadius(180);
      else setRadius(170);
    }
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <section className='py-32 flex items-center justify-center relative'>
      <div className='relative flex items-center justify-center'>
        {/* ORBITA */}
        <div className='relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[600px] md:h-[600px]'>
          {/* TEXTO CENTRAL — dinâmico com hover */}
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-8 md:px-16'>
            {hovered ? (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className='flex flex-col items-center gap-1'
              >
                <span className='text-2xl'>{hovered.icon}</span>
                <p className='text-base md:text-lg font-semibold text-foreground leading-tight'>
                  {hovered.title[locale]}
                </p>
                <p className='text-xs md:text-sm font-medium text-primary'>
                  {hovered.metric[locale]}
                </p>
                <p className='text-[10px] md:text-xs text-muted-foreground/60 mt-1'>
                  {dict.about.hint}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key='default'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className='flex flex-col items-center gap-2'
              >
                <h2 className='text-4xl md:text-5xl font-bold'>
                  {dict.about.title}
                </h2>
                <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
                  {dict.about.description}
                </p>
                <p className='text-xs mt-1 text-muted-foreground/60'>
                  {dict.about.hint}
                </p>
              </motion.div>
            )}
          </div>

          {/* ÍCONES ORBITANDO */}
          {aboutItems.map((item: AboutItem, index: number) => {
            const angle = (index / aboutItems.length) * 2 * Math.PI;
            const DURATION = 60;

            return (
              <motion.div
                key={item.id}
                className='absolute left-1/2 top-1/2'
                style={{ transformOrigin: '0 0' }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: DURATION,
                  ease: 'linear',
                }}
              >
                {/* wrapper de posição */}
                <div
                  style={{
                    transform: `translate(-50%, -50%) translate(
                      ${Math.cos(angle) * radius}px,
                      ${Math.sin(angle) * radius}px
                    )`,
                  }}
                >
                  {/*
                    Counter-rotate: cancela a rotação do pai para manter
                    o ícone sempre upright e a label sempre legível.
                  */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      repeat: Infinity,
                      duration: DURATION,
                      ease: 'linear',
                    }}
                  >
                    <button
                      onClick={() => setActive(item)}
                      onMouseEnter={() => setHovered(item)}
                      onMouseLeave={() => setHovered(null)}
                      aria-label={item.title[locale]}
                      className='
                        w-10 h-10 md:w-12 md:h-12
                        rounded-full
                        border border-black/10
                        flex items-center justify-center
                        transition-all duration-200
                        bg-black/5
                        backdrop-blur
                        hover:scale-125
                        hover:bg-primary/10
                        hover:border-primary/30
                        hover:shadow-lg
                        dark:border-white/20
                        dark:bg-background/40
                        text-base md:text-lg
                        select-none
                      '
                    >
                      {item.icon}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MODAL de detalhes ao clicar */}
      {active && (
        <div
          className='fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4'
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className='bg-background border border-white/10 rounded-2xl w-full max-w-[460px] overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/5'>
              <div className='flex items-center gap-3'>
                <span className='text-3xl'>{active.icon}</span>
                <div>
                  <h3 className='text-lg font-bold leading-tight'>
                    {active.title[locale]}
                  </h3>
                  <p className='text-sm font-semibold text-primary mt-0.5'>
                    {active.metric[locale]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className='text-muted-foreground hover:text-foreground transition text-xl leading-none mt-0.5'
                aria-label='Close'
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className='p-5 sm:p-6 space-y-5'>
              <div>
                <p className='text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5'>
                  {dict.about.modal.problem}
                </p>
                <p className='text-sm leading-relaxed text-foreground/80'>
                  {active.problem[locale]}
                </p>
              </div>

              <div>
                <p className='text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1.5'>
                  {dict.about.modal.solution}
                </p>
                <p className='text-sm leading-relaxed text-foreground/80'>
                  {active.solution[locale]}
                </p>
              </div>

              <div className='rounded-xl bg-primary/5 border border-primary/10 p-4'>
                <p className='text-[11px] font-semibold uppercase tracking-widest text-primary/70 mb-1.5'>
                  {dict.about.modal.result}
                </p>
                <p className='text-sm leading-relaxed text-foreground/90 font-medium'>
                  {active.result[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
