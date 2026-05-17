'use client';

import Image from 'next/image';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useI18n } from '@/hooks/use-i18n';

export function Header() {
  const { dict } = useI18n();
  const { locale, setLocale } = useI18n();
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
    flex items-center justify-between gap-3
    w-[92vw] max-w-md 
    px-4 py-2
    rounded-full
    border border-border
    bg-background/60
    backdrop-blur-xl
    shadow-lg
  "
      >
        {/* AVATAR */}
        <div className="relative w-9 h-9">
          <Image
            src="/magaiveravatar.jpg"
            alt="Magaiver"
            fill
            className="
              rounded-full 
              object-cover
              transition-all duration-300
              hover:scale-110 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] 
              dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
            "
          />
        </div>

        {/* NAME */}
        <span className="text-sm font-medium tracking-wide truncate">
          Magaiver Tech
        </span>

        {/* DIVIDER */}
        <div className="hidden md:block w-px h-4 bg-border" />

        <span className="hidden md:block text-xs text-muted-foreground">
          {dict.header.title}
        </span>

        {/* DIVIDER */}
        <div className="w-px h-4 bg-border" />

        {/* Language */}
        <button
          onClick={() => setLocale('pt')}
          className={`flex items-center gap-1 transition ${
            locale === 'pt'
              ? 'opacity-100 font-semibold'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          <div className="relative w-6 h-4 overflow-hidden rounded-sm shrink-0">
            <Image
              src="https://flagcdn.com/w40/br.png"
              alt="Brasil"
              fill
              className="object-cover"
            />
          </div>
          PT
        </button>

        <span className="opacity-40">|</span>

        <button
          onClick={() => setLocale('en')}
          className={`flex items-center gap-1 transition ${
            locale === 'en'
              ? 'opacity-100 font-semibold'
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          <div className="relative w-6 h-4 overflow-hidden rounded-sm shrink-0">
            <Image
              src="https://flagcdn.com/w40/us.png"
              alt="Estados Unidos"
              fill
              className="object-cover"
            />
          </div>
          EN
        </button>

        {/* THEME */}
        <ThemeToggle />
      </div>
    </div>
  );
}
