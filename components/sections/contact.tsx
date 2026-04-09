'use client';

import { Reveal } from '@/components/common/reveal';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { MagneticButton } from '../common/magnetic-button';
import { useI18n } from '@/hooks/use-i18n';

export function Contact() {
  const { dict } = useI18n();
  return (
    <section id='contact' className='py-32 px-6 bg-background text-foreground'>
      <div className='max-w-3xl mx-auto text-center'>
        <Reveal>
          <h2 className='text-4xl md:text-5xl font-bold '>
            {dict.contact.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className='mt-4 text-muted-foreground'>
            {dict.contact.description}
          </p>
        </Reveal>

        {/* BUTTONS */}
        <Reveal delay={0.2}>
          <div className='mt-8 flex justify-center gap-4 flex-wrap'>
            {/* EMAIL */}
            <MagneticButton>
              <a
                href='mailto:magaivermagalhaes.mm@gmail.com'
                className='flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-foreground hover:text-background transition'
              >
                <FiMail size={16} />
                {dict.contact.email}
              </a>
            </MagneticButton>

            {/* WHATSAPP */}
            <MagneticButton>
              <a
                href='https://wa.me/5585981467094'
                target='_blank'
                className='flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-foreground hover:text-background transition'
              >
                <FaWhatsapp size={16} />
                {dict.contact.whatsapp}
              </a>
            </MagneticButton>

            {/* GITHUB */}
            <MagneticButton>
              <a
                href='https://github.com/MAGAIVERH'
                target='_blank'
                className='flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-foreground hover:text-background transition'
              >
                <FaGithub size={16} />
                {dict.contact.github}
              </a>
            </MagneticButton>

            {/* LINKEDIN */}
            <MagneticButton>
              <a
                href='https://www.linkedin.com/in/magaiver-magalhaes-bb9572234'
                target='_blank'
                className='flex items-center gap-2 px-6 py-3 border border-border rounded-md hover:bg-foreground hover:text-background transition'
              >
                <FaLinkedin size={16} />
                {dict.contact.linkedin}
              </a>
            </MagneticButton>
          </div>
        </Reveal>

        {/* PHONE TEXT (opcional, mais profissional) */}
        <Reveal delay={0.3}>
          <p className='mt-6 text-sm text-muted-foreground'>
            {dict.contact.phone} <strong>+55 (85) 98146-7094</strong>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
