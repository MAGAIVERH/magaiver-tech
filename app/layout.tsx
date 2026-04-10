import type { Metadata } from 'next';

import { SmoothScroll } from '@/components/interactive/smooth-scroll';
import './globals.css';
import { ThemeProvider } from '@/components/common/theme-provider';
import { I18nProvider } from '@/hooks/use-i18n';
import { Cursor } from '@/components/interactive/cursor';

export const metadata: Metadata = {
  title: 'Magaiver Tech',
  description:
    'Full Stack Engineer focused on performance, scalable architecture and real business impact.',

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  openGraph: {
    title: 'Magaiver Tech',
    description:
      'Full Stack Engineer focused on performance, scalable architecture and real business impact.',
    url: 'https://magaiver-tech.vercel.app', // depois troca se quiser
    siteName: 'Magaiver Tech',
    images: [
      {
        url: '/apresentacao.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Magaiver Tech',
    description:
      'Full Stack Engineer focused on performance, scalable architecture and real business impact.',
    images: ['/apresentacao.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative'>
        <SmoothScroll />
        <Cursor />

        <I18nProvider>
          <ThemeProvider>
            <div className='relative z-10'>{children}</div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
