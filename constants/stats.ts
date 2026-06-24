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
 * Credibility metrics shown in the animated stats strip. Every number is
 * defensible against the CV (years of experience, shipped projects, and the
 * PropAI OS flagship: 37 REST endpoints, 45 integration tests).
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
    id: 'endpoints',
    value: 37,
    label: {
      en: 'REST endpoints on PropAI OS',
      pt: 'Endpoints REST no PropAI OS',
    },
  },
  {
    id: 'tests',
    value: 45,
    label: { en: 'Integration tests passing', pt: 'Testes de integração' },
  },
];
