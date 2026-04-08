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
      'Full-stack AI-powered workout platform that generates personalized training plans and tracks user performance. Built with a modern architecture separating frontend and API, including authentication, real-time interactions, and AI integration for dynamic plan generation.',
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
    title: 'Dr. Agenda',
    description:
      'Complete SaaS platform for clinic management, focused on scheduling, financial control, and operational efficiency. Includes authentication, dashboard, appointment flow, and Stripe integration for billing and subscriptions.',
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
    title: 'Personal Trainer Scheduling Platform',
    description:
      'Scheduling platform for personal trainers with booking flows and responsive UI, designed to manage client sessions efficiently, and modern frontend architecture.',
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
    title: 'SaaS Sales Platform',
    description:
      'End-to-end SaaS platform for selling and delivering ready-to-launch web solutions. Includes landing pages, checkout, onboarding flows, and an operational dashboard for client management.',
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
    title: 'Tattoo Artist Booking Platform',
    description:
      'Booking platform for tattoo artists with scheduling features, service management, and responsive interface. Built to streamline client booking experience.',
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
    title: 'Crowdfunding Platform',
    description:
      'Full-stack donation platform built for Jiu-Jitsu athletes, enabling fundraising campaigns and community support. Focused on usability, performance, and scalability.',
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
    title: 'Food Delivery Platform',
    description:
      'Frontend-focused food delivery application simulating real-world ordering systems with interactive UI and responsive design.',
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
    title: 'Online Store (E-commerce)',
    description:
      'Interactive e-commerce application built with React and Next.js, focusing on reusable components, performance, and modern frontend architecture.',
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
    title: 'Auto-Meki (Food Ordering Platform)',
    description:
      'Full-stack food ordering platform inspired by iFood, featuring dynamic menus, ordering flow, and responsive design. Built to simulate real-world delivery systems and user experience.',
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
    title: 'Finance Intel Dashboard',
    description:
      'Reliability-focused financial dashboard designed to visualize macro data and risk metrics. Emphasizes data clarity, performance, and scalable UI architecture using modern frontend patterns.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Shadcnui'],
    live: 'https://finance-intel-dashboard.vercel.app/',
    github: 'https://github.com/MAGAIVERH/finance-intel-dashboard',
    linkedin:
      'https://www.linkedin.com/in/magaiver-magalhaes-bb9572234/details/experience/',
    image: '/dashboard-finance.png',
  },
];
