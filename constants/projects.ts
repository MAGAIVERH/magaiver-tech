export type Project = {
  id: string;
  title: {
    en: string;
    pt: string;
  };
  description: {
    en: string;
    pt: string;
  };
  stack: string[];
  live: string;
  github: string;
  linkedin: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 'fit-ai',
    title: {
      en: 'FitAI',
      pt: 'FitAI',
    },
    description: {
      en: 'Full-stack AI-powered workout platform that generates personalized training plans and tracks user performance. Built with a modern architecture separating frontend and API, including authentication, real-time interactions, and AI integration for dynamic plan generation.',
      pt: 'Plataforma de treino completa, com inteligência artificial, que gera planos de treino personalizados e monitoriza o desempenho do utilizador. Construída com uma arquitetura moderna que separa o frontend da API, incluindo autenticação, interações em tempo real e integração de IA para geração dinâmica de planos.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Fastify',
      'Prisma',
      'PostgreSQL',
      'AI',
    ],
    live: 'https://treinos-frontend-gold.vercel.app/auth',
    github: 'https://github.com/MAGAIVERH/treinos-frontend',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/fitai.png',
  },
  {
    id: 'dr-agenda',
    title: {
      en: 'Dr. Schedule',
      pt: 'Dr. Agenda',
    },
    description: {
      en: 'Complete SaaS platform for clinic management, focused on scheduling, financial control, and operational efficiency. Includes authentication, dashboard, appointment flow, and Stripe integration for billing and subscriptions.',
      pt: 'Plataforma SaaS completa para gestão de clínicas, focada em agendamento, controle financeiro e eficiência operacional. Inclui autenticação, painel de controle, fluxo de consultas e integração com o Stripe para faturamento e assinaturas.',
    },

    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://dr-agenda-bay.vercel.app/authentication',
    github: 'https://github.com/MAGAIVERH/dr.agenda',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/dr.doctor.png',
  },
  {
    id: 'personal-trainer',
    title: {
      en: 'Personal Trainer Scheduling Platform',
      pt: 'Plataforma de Agendamento de Personal Trainers',
    },
    description: {
      en: 'Scheduling platform for personal trainers with booking flows and responsive UI, designed to manage client sessions efficiently, and modern frontend architecture.',
      pt: 'Plataforma de agendamento para personal trainers com fluxos de reserva e interface de usuário responsiva, projetada para gerenciar sessões de clientes com eficiência e arquitetura de front-end moderna.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://personal-chi-cyan.vercel.app/',
    github: 'https://github.com/MAGAIVERH/adotapet',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/personal.png',
  },

  {
    id: 'saas-platform',
    title: {
      en: 'SaaS Sales Platform',
      pt: 'SaaS Venda de plataformas',
    },
    description: {
      en: 'End-to-end SaaS platform for selling and delivering ready-to-launch web solutions. Includes landing pages, checkout, onboarding flows, and an operational dashboard for client management.',
      pt: 'Plataforma SaaS completa para venda e entrega de soluções web prontas para lançamento. Inclui páginas de destino, checkout, fluxos de integração e um painel operacional para gerenciamento de clientes.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Drizzle',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://minhaplataforma-nine.vercel.app/',
    github: 'https://github.com/MAGAIVERH/landing-sales',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/minha-plataforma.png',
  },
  // {
  //   id: 'ecommerce-production',
  //   title: 'E-commerce Platform (Production)',
  //   description:
  //     'Production-ready e-commerce platform with complete purchase flow, product management, and responsive UI. Built focusing on performance, scalability, and real-world usability.',
  //   stack: ['Next.js', 'React', 'TypeScript'],
  //   live: 'https://loja-online-next.vercel.app/',
  //   github: 'https://github.com/MAGAIVERH/loja-online',
  //   linkedin:
  //     'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
  //   image: '/loja-online-product.png',
  // },
  {
    id: 'tattoo-booking',
    title: {
      en: 'Tattoo Artist Booking Platform',
      pt: 'Plataforma de agendamento de tatuadores',
    },
    description: {
      en: 'Booking platform for tattoo artists with scheduling features, service management, and responsive interface. Built to streamline client booking experience.',
      pt: 'Plataforma de agendamento para tatuadores com recursos de marcação de horários, gerenciamento de serviços e interface responsiva. Desenvolvida para simplificar a experiência de agendamento do cliente.',
    },
    stack: [
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://tatto-shop.vercel.app/',
    github: 'https://github.com/MAGAIVERH/TattoShop',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/tatoo-shop.png',
  },

  // {
  //   id: 'ai-scheduling',
  //   title: 'AI Scheduling Platform',
  //   description:
  //     'AI-powered scheduling platform combining traditional booking systems with conversational AI. Designed to automate scheduling workflows and improve user interaction efficiency.',
  //   stack: ['Next.js', 'React', 'AI'],
  //   live: '#',
  //   github: '#',
  //   linkedin: 'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
  //   image: '/projects/ai-scheduling.png',
  // },

  // {
  //   id: 'ai-scheduling',
  //   title: 'AI Scheduling Platform',
  //   description:
  //     'AI-powered scheduling platform combining traditional booking systems with conversational AI. Designed to automate scheduling workflows and improve user interaction efficiency.',
  //   stack: ['Next.js', 'React', 'AI'],
  //   live: '#',
  //   github: '#',
  //   linkedin: 'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
  //   image: '/projects/ai-scheduling.png',
  // },
  {
    id: 'crowdfunding',
    title: {
      en: 'Crowdfunding Platform',
      pt: 'Plataforma de financiamento coletivo',
    },
    description: {
      en: 'Full-stack donation platform built for Jiu-Jitsu athletes, enabling fundraising campaigns and community support. Focused on usability, performance, and scalability.',
      pt: 'Plataforma completa de doações desenvolvida para atletas de Jiu-Jitsu, permitindo campanhas de arrecadação de fundos e apoio da comunidade. Focada em usabilidade, desempenho e escalabilidade.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://bjjfund.vercel.app/',
    github: 'https://github.com/MAGAIVERH',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/bjjfund.png',
  },

  {
    id: 'food-delivery',
    title: {
      en: 'Food Delivery Platform',
      pt: 'Plataforma de entrega de alimentos',
    },
    description: {
      en: 'Frontend-focused food delivery application simulating real-world ordering systems with interactive UI and responsive design.',
      pt: 'Aplicativo de entrega de comida com foco na interface do usuário, simulando sistemas de pedidos do mundo real com interface interativa e design responsivo.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://mmtech-foods.vercel.app/',
    github: 'https://github.com/MAGAIVERH/mmtech-foods',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/mmfood.png',
  },
  {
    id: 'online-store',
    title: {
      en: 'Online Store (E-commerce)',
      pt: 'Loja online (comércio eletrônico)',
    },
    description: {
      en: 'Interactive e-commerce application built with React and Next.js, focusing on reusable components, performance, and modern frontend architecture.',
      pt: 'Aplicativo de comércio eletrônico interativo desenvolvido com React e Next.js, com foco em componentes reutilizáveis, desempenho e arquitetura de front-end moderna.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://bewear-navy.vercel.app/',
    github: 'https://github.com/MAGAIVERH/BEWEAR',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/bewear-ecommerce.png',
  },
  {
    id: 'auto-meki',
    title: {
      en: 'Auto-Meki (Food Ordering Platform)',
      pt: 'Auto-Meki (Plataforma de Pedidos de Comida)',
    },
    description: {
      en: 'Full-stack food ordering platform inspired by iFood, featuring dynamic menus, ordering flow, and responsive design. Built to simulate real-world delivery systems and user experience.',
      pt: 'Plataforma completa para pedidos de comida inspirada no iFood, com menus dinâmicos, fluxo de pedidos e design responsivo. Desenvolvida para simular sistemas de entrega e experiência do usuário do mundo real.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Shadcnui',
      'Prisma',
      'PostgreSQL',
      'Stripe',
    ],
    live: 'https://auto-meki.vercel.app/maga-donalds',
    github: 'https://github.com/MAGAIVERH/auto-meki',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/auto-meki.png',
  },
  {
    id: 'finance-dashboard',
    title: {
      en: 'Finance Intel Dashboard',
      pt: 'Painel Financeiro Intel',
    },
    description: {
      en: 'Reliability-focused financial dashboard designed to visualize macro data and risk metrics. Emphasizes data clarity, performance, and scalable UI architecture using modern frontend patterns.',
      pt: 'Painel financeiro focado em confiabilidade, projetado para visualizar dados macro e métricas de risco. Prioriza a clareza dos dados, o desempenho e uma arquitetura de interface de usuário escalável, utilizando padrões modernos de front-end.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Shadcnui'],
    live: 'https://finance-intel-dashboard.vercel.app/',
    github: 'https://github.com/MAGAIVERH/finance-intel-dashboard',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/dashboard-finance.png',
  },
];
