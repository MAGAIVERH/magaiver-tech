'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import type Lenis from 'lenis';
import { gsap } from 'gsap';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useLenis } from '@/components/providers/lenis-provider';
import { useI18n } from '@/hooks/use-i18n';
import { cn } from '@/lib/utils';

const SCROLL_TOP_THRESHOLD = 72;
const HIDE_SCROLL_THRESHOLD = 120;

export function Header() {
  const { dict, locale, setLocale } = useI18n();
  const { lenis, prefersReducedMotion } = useLenis();
  const { theme } = useTheme();

  const shellRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const themeWrapRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    if (prefersReducedMotion) {
      gsap.set(shell, { y: 0 });
      return;
    }

    gsap.to(shell, {
      y: isHidden ? -120 : 0,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    });
  }, [isHidden, prefersReducedMotion]);

  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar || prefersReducedMotion) return;

    const pulse = gsap.to(avatar, {
      scale: 1.04,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    const onEnter = () => {
      pulse.pause();
      gsap.to(avatar, { scale: 1.12, duration: 0.35, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(avatar, { scale: 1, duration: 0.35, ease: 'power2.out', onComplete: () => pulse.resume() });
    };

    avatar.addEventListener('mouseenter', onEnter);
    avatar.addEventListener('mouseleave', onLeave);

    return () => {
      pulse.kill();
      avatar.removeEventListener('mouseenter', onEnter);
      avatar.removeEventListener('mouseleave', onLeave);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = (scroll: number, direction: number) => {
      setIsScrolled(scroll > SCROLL_TOP_THRESHOLD);

      if (scroll < HIDE_SCROLL_THRESHOLD) {
        setIsHidden(false);
        return;
      }

      if (direction > 0) setIsHidden(true);
      else if (direction < 0) setIsHidden(false);
    };

    if (lenis) {
      const onLenisScroll = (instance: Lenis) => {
        handleScroll(instance.scroll, instance.direction);
      };

      lenis.on('scroll', onLenisScroll);
      handleScroll(lenis.scroll, 0);

      return () => {
        lenis.off('scroll', onLenisScroll);
      };
    }

    let lastY = window.scrollY;

    const onNativeScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? 1 : currentY < lastY ? -1 : 0;
      lastY = currentY;
      handleScroll(currentY, direction);
    };

    onNativeScroll();
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => window.removeEventListener('scroll', onNativeScroll);
  }, [lenis]);

  const hasThemeAnimated = useRef(false);

  useEffect(() => {
    const themeWrap = themeWrapRef.current;
    if (!themeWrap || prefersReducedMotion) return;

    const onEnter = () => {
      gsap.to(themeWrap, { rotate: 12, scale: 1.08, duration: 0.3, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(themeWrap, { rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
    };

    themeWrap.addEventListener('mouseenter', onEnter);
    themeWrap.addEventListener('mouseleave', onLeave);

    return () => {
      themeWrap.removeEventListener('mouseenter', onEnter);
      themeWrap.removeEventListener('mouseleave', onLeave);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const themeWrap = themeWrapRef.current;
    if (!themeWrap || !theme || prefersReducedMotion) return;

    if (!hasThemeAnimated.current) {
      hasThemeAnimated.current = true;
      return;
    }

    gsap.fromTo(
      themeWrap,
      { rotate: -18, scale: 0.88 },
      { rotate: 0, scale: 1, duration: 0.5, ease: 'back.out(2.2)' },
    );
  }, [theme, prefersReducedMotion]);

  return (
    <header
      ref={shellRef}
      className="pointer-events-none fixed top-6 left-1/2 z-header w-[92vw] max-w-md -translate-x-1/2 will-change-transform"
      aria-hidden={isHidden}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 rounded-full border px-3 py-2 shadow-lg transition-[background-color,backdrop-filter,border-color,box-shadow,opacity] duration-500 md:gap-3 md:px-4',
          isHidden ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100',
          isScrolled
            ? 'border-border/80 bg-background/88 shadow-xl backdrop-blur-2xl'
            : 'border-border/40 bg-background/50 backdrop-blur-lg',
        )}
      >
        <div className="flex min-w-0 shrink items-center gap-2">
          <div ref={avatarRef} className="relative h-9 w-9 shrink-0">
            <span
              className={cn(
                'absolute inset-0 rounded-full transition-opacity duration-500',
                isScrolled
                  ? 'bg-foreground/10 opacity-100'
                  : 'bg-foreground/5 opacity-70',
              )}
              aria-hidden
            />
            <Image
              src="/magaiveravatar.jpg"
              alt="Magaiver"
              fill
              sizes="36px"
              priority
              className="relative z-10 rounded-full object-cover ring-1 ring-border/60"
            />
          </div>

          <span className="truncate text-sm font-medium tracking-wide">Magaiver Tech</span>
        </div>

        <div className="hidden h-4 w-px bg-border md:block" />

        <span className="hidden truncate text-xs text-muted-foreground md:block">
          {dict.header.title}
        </span>

        <div className="h-4 w-px bg-border" />

        <div className="flex items-center gap-1.5 text-xs md:gap-2">
          <button
            type="button"
            onClick={() => setLocale('pt')}
            className={cn(
              'flex items-center gap-1 transition-opacity',
              locale === 'pt' ? 'font-semibold opacity-100' : 'opacity-50 hover:opacity-100',
            )}
            aria-pressed={locale === 'pt'}
          >
            <div className="relative h-4 w-6 shrink-0 overflow-hidden rounded-sm">
              <Image src="https://flagcdn.com/w40/br.png" alt="Brasil" fill sizes="24px" className="object-cover" />
            </div>
            <span className="hidden sm:inline">PT</span>
          </button>

          <span className="opacity-40" aria-hidden>
            |
          </span>

          <button
            type="button"
            onClick={() => setLocale('en')}
            className={cn(
              'flex items-center gap-1 transition-opacity',
              locale === 'en' ? 'font-semibold opacity-100' : 'opacity-50 hover:opacity-100',
            )}
            aria-pressed={locale === 'en'}
          >
            <div className="relative h-4 w-6 shrink-0 overflow-hidden rounded-sm">
              <Image
                src="https://flagcdn.com/w40/us.png"
                alt="Estados Unidos"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="hidden sm:inline">EN</span>
          </button>

          <div ref={themeWrapRef} className="inline-flex">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
