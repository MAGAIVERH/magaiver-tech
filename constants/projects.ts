export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  live: string;
  github: string;
  linkedin: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 'fit-ai',
    title: 'Fit.AI',
    description:
      'AI-powered workout platform with personalized plans and performance tracking.',
    stack: ['Next.js', 'Fastify', 'Prisma', 'PostgreSQL', 'AI'],
    live: '#',
    github: '#',
    linkedin: '#',
  },
  {
    id: 'dr-agenda',
    title: 'Dr. Agenda',
    description:
      'Clinic management SaaS with scheduling, dashboard and billing integration.',
    stack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    live: '#',
    github: '#',
    linkedin: '#',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    description: 'Full-featured e-commerce with payments, admin and analytics.',
    stack: ['Next.js', 'Stripe', 'PostgreSQL'],
    live: '#',
    github: '#',
    linkedin: '#',
  },
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description:
      'Real-time analytics dashboard with charts and performance metrics.',
    stack: ['React', 'Chart.js', 'Node'],
    live: '#',
    github: '#',
    linkedin: '#',
  },
  {
    id: 'saas',
    title: 'SaaS Platform',
    description: 'Multi-tenant SaaS with authentication and billing system.',
    stack: ['Next.js', 'Prisma', 'Stripe'],
    live: '#',
    github: '#',
    linkedin: '#',
  },
  {
    id: 'portfolio',
    title: 'Interactive Portfolio',
    description: 'Modern portfolio with animations and interactive UI.',
    stack: ['Next.js', 'Framer Motion'],
    live: '#',
    github: '#',
    linkedin: '#',
  },
];
