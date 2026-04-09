export type AboutItem = {
  id: string;
  icon: string;
  title: {
    en: string;
    pt: string;
  };
  metric: {
    en: string;
    pt: string;
  };
  problem: {
    en: string;
    pt: string;
  };
  solution: {
    en: string;
    pt: string;
  };
  result: {
    en: string;
    pt: string;
  };
};

export const aboutItems: AboutItem[] = [
  {
    id: 'performance',
    icon: 'zap',
    title: {
      en: 'Performance Engineering',
      pt: 'Engenharia de Performance',
    },
    metric: {
      en: '-48% load time',
      pt: '-48% tempo de carregamento',
    },
    problem: {
      en: 'Slow applications caused user frustration and drop-offs due to inefficient rendering.',
      pt: 'Aplicações lentas causavam frustração e abandono devido à renderização ineficiente.',
    },
    solution: {
      en: 'Optimized rendering cycles, caching strategies and eliminated unnecessary re-renders.',
      pt: 'Otimizei ciclos de renderização, estratégias de cache e eliminei re-renderizações desnecessárias.',
    },
    result: {
      en: 'Reduced load time by 48% and improved user retention.',
      pt: 'Reduzi o tempo de carregamento em 48% e aumentei a retenção de usuários.',
    },
  },
  {
    id: 'saas',
    icon: 'layers',
    title: {
      en: 'SaaS Architecture',
      pt: 'Arquitetura SaaS',
    },
    metric: {
      en: '+120% scalability',
      pt: '+120% escalabilidade',
    },
    problem: {
      en: 'System could not handle user growth, causing instability.',
      pt: 'O sistema não suportava o crescimento de usuários, causando instabilidade.',
    },
    solution: {
      en: 'Designed multi-tenant architecture with scalable modules.',
      pt: 'Projetei arquitetura multi-tenant com módulos escaláveis.',
    },
    result: {
      en: 'Handled 2x more users with stable performance.',
      pt: 'Passei a suportar o dobro de usuários com estabilidade.',
    },
  },
  {
    id: 'ai',
    icon: 'brain',
    title: {
      en: 'AI Integration',
      pt: 'Integração com IA',
    },
    metric: {
      en: '+65% automation',
      pt: '+65% automação',
    },
    problem: {
      en: 'Manual workflows slowed operations and reduced efficiency.',
      pt: 'Processos manuais tornavam a operação lenta e ineficiente.',
    },
    solution: {
      en: 'Integrated AI for automation and intelligent decision-making.',
      pt: 'Integrei IA para automação e tomada de decisão inteligente.',
    },
    result: {
      en: 'Increased automation rate by 65%.',
      pt: 'Aumentei a taxa de automação em 65%.',
    },
  },
  {
    id: 'backend',
    icon: 'server',
    title: {
      en: 'Backend Optimization',
      pt: 'Otimização de Backend',
    },
    metric: {
      en: '-35% response time',
      pt: '-35% tempo de resposta',
    },
    problem: {
      en: 'Slow APIs impacted overall application performance.',
      pt: 'APIs lentas impactavam a performance geral da aplicação.',
    },
    solution: {
      en: 'Optimized queries and reduced bottlenecks.',
      pt: 'Otimizei queries e eliminei gargalos.',
    },
    result: {
      en: 'Improved response time significantly.',
      pt: 'Melhorei significativamente o tempo de resposta.',
    },
  },
  {
    id: 'database',
    icon: 'database',
    title: {
      en: 'Database Optimization',
      pt: 'Otimização de Banco de Dados',
    },
    metric: {
      en: '+40% efficiency',
      pt: '+40% eficiência',
    },
    problem: {
      en: 'Inefficient queries overloaded the system.',
      pt: 'Consultas ineficientes sobrecarregavam o sistema.',
    },
    solution: {
      en: 'Redesigned schema and indexing strategy.',
      pt: 'Redesenhei o schema e a estratégia de índices.',
    },
    result: {
      en: 'Faster queries and lower resource usage.',
      pt: 'Consultas mais rápidas e menor uso de recursos.',
    },
  },
  {
    id: 'frontend',
    icon: 'code',
    title: {
      en: 'Frontend Architecture',
      pt: 'Arquitetura Frontend',
    },
    metric: {
      en: '+30% UX improvement',
      pt: '+30% melhoria na UX',
    },
    problem: {
      en: 'Poor UI responsiveness impacted user experience.',
      pt: 'Baixa responsividade prejudicava a experiência do usuário.',
    },
    solution: {
      en: 'Refactored components and improved state handling.',
      pt: 'Refatorei componentes e melhorei o gerenciamento de estado.',
    },
    result: {
      en: 'Smoother interactions and better UX.',
      pt: 'Interações mais fluidas e melhor experiência.',
    },
  },
  {
    id: 'analytics',
    icon: 'chart',
    title: {
      en: 'Analytics Systems',
      pt: 'Sistemas de Analytics',
    },
    metric: {
      en: '+50% data clarity',
      pt: '+50% clareza de dados',
    },
    problem: {
      en: 'Lack of visibility into business data.',
      pt: 'Falta de visibilidade nos dados do negócio.',
    },
    solution: {
      en: 'Built real-time dashboards and metrics.',
      pt: 'Criei dashboards e métricas em tempo real.',
    },
    result: {
      en: 'Better decision-making and insights.',
      pt: 'Melhores decisões e mais insights.',
    },
  },
  {
    id: 'infra',
    icon: 'settings',
    title: {
      en: 'Infrastructure',
      pt: 'Infraestrutura',
    },
    metric: {
      en: '+70% reliability',
      pt: '+70% confiabilidade',
    },
    problem: {
      en: 'Frequent downtime affected business operations.',
      pt: 'Quedas frequentes afetavam a operação.',
    },
    solution: {
      en: 'Improved deployment pipelines and monitoring.',
      pt: 'Melhorei pipelines de deploy e monitoramento.',
    },
    result: {
      en: 'More stable production systems.',
      pt: 'Sistemas mais estáveis em produção.',
    },
  },
  {
    id: 'api',
    icon: 'cpu',
    title: {
      en: 'API Design',
      pt: 'Design de APIs',
    },
    metric: {
      en: '+45% efficiency',
      pt: '+45% eficiência',
    },
    problem: {
      en: 'Redundant API calls reduced performance.',
      pt: 'Chamadas redundantes prejudicavam a performance.',
    },
    solution: {
      en: 'Redesigned endpoints and data flow.',
      pt: 'Redesenhei endpoints e fluxo de dados.',
    },
    result: {
      en: 'Cleaner architecture and faster responses.',
      pt: 'Arquitetura mais limpa e respostas mais rápidas.',
    },
  },
  {
    id: 'growth',
    icon: 'rocket',
    title: {
      en: 'Growth Engineering',
      pt: 'Growth Engineering',
    },
    metric: {
      en: '+30% engagement',
      pt: '+30% engajamento',
    },
    problem: {
      en: 'Low user engagement and retention.',
      pt: 'Baixo engajamento e retenção de usuários.',
    },
    solution: {
      en: 'Optimized UX and performance.',
      pt: 'Otimizei UX e performance.',
    },
    result: {
      en: 'Higher engagement metrics.',
      pt: 'Aumento nas métricas de engajamento.',
    },
  },
  {
    id: 'monitoring',
    icon: 'activity',
    title: {
      en: 'Monitoring',
      pt: 'Monitoramento',
    },
    metric: {
      en: '+60% visibility',
      pt: '+60% visibilidade',
    },
    problem: {
      en: 'Lack of system observability.',
      pt: 'Falta de observabilidade do sistema.',
    },
    solution: {
      en: 'Implemented logs and monitoring tools.',
      pt: 'Implementei logs e ferramentas de monitoramento.',
    },
    result: {
      en: 'Faster debugging and issue resolution.',
      pt: 'Debug mais rápido e resolução eficiente.',
    },
  },
  {
    id: 'data',
    icon: 'flow',
    title: {
      en: 'Data Flow Optimization',
      pt: 'Otimização de Fluxo de Dados',
    },
    metric: {
      en: '+35% speed',
      pt: '+35% velocidade',
    },
    problem: {
      en: 'Slow data processing pipelines.',
      pt: 'Pipelines de dados lentos.',
    },
    solution: {
      en: 'Optimized async flows and pipelines.',
      pt: 'Otimizei fluxos assíncronos e pipelines.',
    },
    result: {
      en: 'Faster data processing and performance.',
      pt: 'Processamento mais rápido e melhor performance.',
    },
  },
];
