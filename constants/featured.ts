type LocalizedText = {
  en: string;
  pt: string;
};

export type FeaturedProject = {
  id: string;
  name: string;
  tagline: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  metrics: Array<{ value: string; label: LocalizedText }>;
  stack: string[];
  github: string;
  live?: string;
  linkedin: string;
};

/**
 * The flagship case study (PropAI OS). Rendered as a dedicated spotlight above
 * the projects grid. Content mirrors the CV — multi-tenant SaaS for US real
 * estate, built on a Turborepo monorepo with an async AI pipeline.
 */
export const featuredProject: FeaturedProject = {
  id: 'propai-os',
  name: 'PropAI OS',
  tagline: {
    en: 'An AI-powered, multi-tenant operating system for US real-estate brokerages.',
    pt: 'Um sistema operacional multi-tenant com IA para imobiliárias dos EUA.',
  },
  description: {
    en: 'A production SaaS platform where tenant isolation is enforced at the database level with PostgreSQL Row-Level Security, semantic search is powered by pgvector, and four feature-flagged AI capabilities run as async BullMQ jobs so they never block an HTTP request.',
    pt: 'Uma plataforma SaaS em produção onde o isolamento de tenants é garantido no nível do banco com PostgreSQL Row-Level Security, a busca semântica é movida por pgvector, e quatro capacidades de IA com feature flags rodam como jobs assíncronos no BullMQ, sem nunca bloquear uma requisição HTTP.',
  },
  highlights: [
    {
      en: 'Database-level multi-tenancy: PostgreSQL Row-Level Security wired through Drizzle ORM, not just application-layer checks.',
      pt: 'Multi-tenancy no banco: PostgreSQL Row-Level Security integrado via Drizzle ORM, não apenas checagens na aplicação.',
    },
    {
      en: 'Async AI pipeline on BullMQ: computer vision (Gemini) auto-fills listings, OpenAI embeddings feed pgvector search, lead scoring & pricing run as independent jobs.',
      pt: 'Pipeline de IA assíncrono no BullMQ: visão computacional (Gemini) preenche anúncios, embeddings da OpenAI alimentam a busca com pgvector, scoring de leads e precificação rodam como jobs independentes.',
    },
    {
      en: 'Auth & RBAC with Better Auth + Organizations: brokerage sign-up, team invites and roles (owner, manager, agent, viewer).',
      pt: 'Auth & RBAC com Better Auth + Organizations: cadastro de imobiliárias, convites de equipe e papéis (owner, manager, agent, viewer).',
    },
    {
      en: 'Turborepo monorepo with shared Zod contracts between a Fastify API and two Next.js apps, enforced by GitHub Actions on every PR.',
      pt: 'Monorepo Turborepo com contratos Zod compartilhados entre uma API Fastify e dois apps Next.js, validados por GitHub Actions a cada PR.',
    },
  ],
  metrics: [
    {
      value: '16',
      label: { en: 'RLS-protected tables', pt: 'Tabelas com RLS' },
    },
    {
      value: '37',
      label: { en: 'REST endpoints', pt: 'Endpoints REST' },
    },
    {
      value: '45',
      label: { en: 'Integration tests', pt: 'Testes de integração' },
    },
  ],
  stack: [
    'Next.js',
    'TypeScript',
    'Fastify',
    'PostgreSQL',
    'Drizzle',
    'pgvector',
    'Redis',
    'BullMQ',
    'Better Auth',
    'Turborepo',
    'AI',
  ],
  github: 'https://github.com/MAGAIVERH/propai-os',
  linkedin: 'https://www.linkedin.com/in/magaiver-magalhaes/details/experience/',
};
