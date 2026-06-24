import type { Metadata } from 'next';

import { LenisProvider } from '@/components/providers/lenis-provider';
import './globals.css';
import { ThemeProvider } from '@/components/common/theme-provider';
import { I18nProvider } from '@/hooks/use-i18n';
import { SiteEffects } from '@/components/interactive/site-effects';

const SITE_URL = 'https://magaiver-tech.vercel.app';
const DESCRIPTION =
  'Magaiver Magalhães — Full Stack Engineer with 5+ years building multi-tenant SaaS and AI-powered platforms end-to-end. Next.js, React, TypeScript, Node.js, PostgreSQL.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Magaiver Magalhães — Full Stack Engineer',
    template: '%s · Magaiver Magalhães',
  },
  description: DESCRIPTION,
  applicationName: 'Magaiver Tech',
  authors: [{ name: 'Magaiver Magalhães', url: SITE_URL }],
  creator: 'Magaiver Magalhães',
  keywords: [
    'Magaiver Magalhães',
    'Full Stack Engineer',
    'Frontend Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Multi-tenant SaaS',
    'AI Platforms',
    'Software Engineer Brazil',
  ],

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: 'Magaiver Magalhães — Full Stack Engineer',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Magaiver Magalhães',
    images: [
      {
        url: '/apresentacao.png',
        width: 1200,
        height: 630,
        alt: 'Magaiver Magalhães — Full Stack Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Magaiver Magalhães — Full Stack Engineer',
    description: DESCRIPTION,
    images: ['/apresentacao4.png'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Magaiver Magalhães',
  url: SITE_URL,
  jobTitle: 'Full Stack Engineer',
  email: 'mailto:magaivermagalhaes.mm@gmail.com',
  description: DESCRIPTION,
  sameAs: [
    'https://github.com/MAGAIVERH',
    'https://www.linkedin.com/in/magaiver-magalhaes',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Fastify',
    'PostgreSQL',
    'Multi-tenant SaaS',
    'AI Integration',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LenisProvider>
          <I18nProvider>
            <ThemeProvider>
              <SiteEffects />
              <div className='relative z-10'>{children}</div>
            </ThemeProvider>
          </I18nProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
