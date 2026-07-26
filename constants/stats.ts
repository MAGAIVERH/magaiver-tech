type LocalizedText = {
  en: string;
  pt: string;
};

export type Stat = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: LocalizedText;
};

/**
 * Credibility metrics shown in the animated stats strip.
 *
 * Rule: career-level signals only. Never single-project trivia (endpoint or
 * test counts belong on that project's card, where they have context) and
 * never counts of the portfolio's own content. Two numbers of scale, two of
 * measured business impact.
 *
 * Sources: years and shipped projects from the CV; 48% is the load-time win in
 * the `performance` case study (6.2s to 3.2s) and 74% the MTTR win in the
 * `monitoring` case study (4.2h to 1.1h), both in `constants/about-items.ts`.
 */
export const stats: Stat[] = [
  {
    id: 'years',
    value: 5,
    suffix: '+',
    label: { en: 'Years of experience', pt: 'Anos de experiência' },
  },
  {
    id: 'projects',
    value: 15,
    suffix: '+',
    label: { en: 'Projects in production', pt: 'Projetos em produção' },
  },
  {
    id: 'load-time',
    value: 48,
    suffix: '%',
    label: {
      en: 'Faster load times delivered',
      pt: 'Mais rápido no carregamento',
    },
  },
  {
    id: 'incident-recovery',
    value: 74,
    suffix: '%',
    label: {
      en: 'Faster incident recovery',
      pt: 'Mais rápido para resolver incidentes',
    },
  },
];
