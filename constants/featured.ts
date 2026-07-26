type LocalizedText = {
  en: string;
  pt: string;
};

export type FeaturedProject = {
  id: string;
  name: string;
  status: 'live' | 'in-development';
  tagline: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  metrics: Array<{ value: string; label: LocalizedText }>;
  stack: string[];
  github: string;
  live?: string;
  /**
   * Public demo account for the brokerage dashboard, reachable from the live
   * site via "Agent login" (credentials published in the repo README).
   */
  demo?: { email: string; password: string };
  linkedin: string;
};

/**
 * The flagship case study (PropAI OS). Rendered as a dedicated spotlight above
 * the projects grid. Content mirrors the CV — multi-tenant SaaS for US real
 * estate, built on a Turborepo monorepo with an async AI pipeline.
 *
 * Shipped to production on Vercel (web) + Render (Dockerized Fastify API) +
 * Neon (Postgres), with a public demo account.
 */
export const featuredProject: FeaturedProject = {
  id: 'propai-os',
  name: 'PropAI OS',
  status: 'live',
  tagline: {
    en: 'An AI-powered, multi-tenant operating system for US real-estate brokerages.',
    pt: 'Um sistema operacional multi-tenant com IA para imobiliárias dos EUA.',
  },
  description: {
    en: 'A live, multi-tenant SaaS platform where tenant isolation is enforced at the database level with PostgreSQL Row-Level Security, semantic search is powered by pgvector, and four feature-flagged AI capabilities run as async BullMQ jobs so they never block an HTTP request. Deployed end to end: Vercel for the web app, a Dockerized Fastify API on Render, Neon for Postgres.',
    pt: 'Uma plataforma SaaS multi-tenant no ar, onde o isolamento de tenants é garantido no nível do banco com PostgreSQL Row-Level Security, a busca semântica é movida por pgvector, e quatro capacidades de IA com feature flags rodam como jobs assíncronos no BullMQ, sem nunca bloquear uma requisição HTTP. Deploy de ponta a ponta: Vercel para o app web, API Fastify dockerizada na Render e Neon para o Postgres.',
  },
  highlights: [
    {
      en: 'Database-level multi-tenancy: PostgreSQL Row-Level Security wired through Drizzle ORM, not just application-layer checks.',
      pt: 'Multi-tenancy no banco: PostgreSQL Row-Level Security integrado via Drizzle ORM, não apenas checagens na aplicação.',
    },
    {
      en: 'Async AI pipeline on BullMQ: computer vision (Gemini Flash 2.0) turns listing photos into copy, OpenAI embeddings feed pgvector search, lead scoring & price estimates run as independent feature-flagged jobs.',
      pt: 'Pipeline de IA assíncrono no BullMQ: visão computacional (Gemini Flash 2.0) transforma fotos do imóvel em anúncio, embeddings da OpenAI alimentam a busca pgvector, scoring de leads e estimativa de preço rodam como jobs independentes com feature flags.',
    },
    {
      en: 'Cross-domain auth: a same-origin Next.js rewrite proxy connects the web app and the API on isolated domains while keeping cookies strictly first-party.',
      pt: 'Auth cross-domain: um proxy de rewrite same-origin no Next.js conecta o app web e a API em domínios isolados, mantendo os cookies estritamente first-party.',
    },
    {
      en: 'SEO-first public marketplace: SSR listing pages with JSON-LD, natural-language search ranked by a hybrid score, and lead capture that lands on the CRM Kanban in real time over WebSocket.',
      pt: 'Marketplace público SEO-first: páginas de anúncio em SSR com JSON-LD, busca em linguagem natural com ranking híbrido e captura de leads que cai no Kanban do CRM em tempo real via WebSocket.',
    },
    {
      en: 'Analytics & billing: funnel metrics, agent leaderboard, CSV export and Stripe subscriptions with Free/Pro feature gates.',
      pt: 'Analytics & billing: métricas de funil, leaderboard de corretores, export CSV e assinaturas Stripe com feature gates Free/Pro.',
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
    'Stripe',
    'Docker',
    'Turborepo',
    'AI',
  ],
  github: 'https://github.com/MAGAIVERH/propai-os',
  live: 'https://propai-os-api.vercel.app',
  demo: {
    email: 'magaiiver@oi.com',
    password: '12345678',
  },
  linkedin: 'https://www.linkedin.com/in/magaiver-magalhaes/details/experience/',
};
