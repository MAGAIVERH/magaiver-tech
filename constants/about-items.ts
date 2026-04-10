export type AboutItem = {
  id: string;
  icon: string;
  label: {
    en: string;
    pt: string;
  };
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
    icon: '⚡',
    label: { en: 'Performance', pt: 'Performance' },
    title: { en: 'Performance Engineering', pt: 'Engenharia de Performance' },
    metric: { en: '-48% load time', pt: '-48% tempo de carregamento' },
    problem: {
      en: 'Users were abandoning the app before it even finished loading. Analytics showed a 34% drop-off on the first screen, not because the product was bad, but because it took 6.2 seconds to become interactive. On slower devices, it was closer to 9 seconds. Every second was costing real revenue.',
      pt: 'Usuários abandonavam o app antes mesmo de ele terminar de carregar. Os dados mostravam 34% de abandono na primeira tela, não porque o produto era ruim, mas porque levava 6,2 segundos para se tornar interativo. Em dispositivos mais lentos, chegava a 9 segundos. Cada segundo custava receita real.',
    },
    solution: {
      en: 'I ran a full performance audit using Lighthouse and React Profiler, mapping every unnecessary render and waterfall request. I restructured the component tree, introduced strategic memoization, moved critical data fetching to the server, and implemented route-based code splitting. I also replaced heavy libraries with lightweight alternatives where the tradeoff made sense.',
      pt: 'Realizei uma auditoria completa com Lighthouse e React Profiler, mapeando cada renderização desnecessária e requisição em cascata. Reestruturei a árvore de componentes, introduzi memoização estratégica, movi o carregamento crítico para o servidor e implementei code splitting por rota. Também substituí bibliotecas pesadas por alternativas leves onde fazia sentido.',
    },
    result: {
      en: 'Load time dropped from 6.2s to 3.2s a 48% improvement. Time to Interactive fell below 2 seconds on median devices. The 34% drop-off rate reversed to a 12% improvement in session starts. Users who previously churned in the first minute started completing core flows.',
      pt: 'O tempo de carregamento caiu de 6,2s para 3,2s melhora de 48%. O Time to Interactive ficou abaixo de 2 segundos em dispositivos medianos. A taxa de abandono de 34% se reverteu em 12% de melhora nos inícios de sessão. Usuários que antes saíam no primeiro minuto passaram a completar os fluxos principais.',
    },
  },

  {
    id: 'saas',
    icon: '📦',
    label: { en: 'SaaS', pt: 'SaaS' },
    title: { en: 'SaaS Architecture', pt: 'Arquitetura SaaS' },
    metric: { en: '+120% scalability', pt: '+120% escalabilidade' },
    problem: {
      en: 'The platform was built as a single-tenant monolith, fine for the first 50 clients, catastrophic at 200. One heavy customer running a large export would degrade performance for everyone else. We were hitting limits on our database connections, and onboarding new clients required manual configuration each time.',
      pt: 'A plataforma foi construída como um monolito single-tenant, ótimo para os primeiros 50 clientes, catastrófico em 200. Um cliente pesado rodando uma exportação grande degradava a performance de todos. Atingíamos limites de conexões no banco, e cada novo cliente exigia configuração manual.',
    },
    solution: {
      en: 'I redesigned the architecture into a true multi-tenant system with tenant isolation at the database level using schema separation. I extracted shared services into independent modules, implemented connection pooling, and built an automated onboarding pipeline that provisioned new tenants without manual intervention.',
      pt: 'Redesenhei a arquitetura em um sistema multi-tenant real com isolamento no banco via separação de schemas. Extraí serviços compartilhados em módulos independentes, implementei connection pooling e construí um pipeline de onboarding automatizado que provisionava novos tenants sem intervenção manual.',
    },
    result: {
      en: 'The system went from supporting 200 concurrent tenants to 440+ with zero degradation. Onboarding time dropped from 2 days (manual) to under 4 minutes (automated). Infrastructure costs per tenant fell by 30% due to efficient resource sharing.',
      pt: 'O sistema passou de 200 tenants simultâneos para 440+ sem degradação. O tempo de onboarding caiu de 2 dias (manual) para menos de 4 minutos (automatizado). O custo de infraestrutura por tenant caiu 30% com o compartilhamento eficiente de recursos.',
    },
  },

  {
    id: 'ai',
    icon: '🤖',
    label: { en: 'AI', pt: 'IA' },
    title: { en: 'AI Integration', pt: 'Integração com IA' },
    metric: { en: '+65% automation', pt: '+65% automação' },
    problem: {
      en: 'The operations team was spending 6+ hours a day on tasks that were repetitive but required reading context: classifying support tickets, routing them to the right team, summarizing long threads, and flagging urgent cases. Human error in routing caused SLA breaches weekly.',
      pt: 'O time de operações gastava mais de 6 horas por dia em tarefas repetitivas que exigiam leitura de contexto: classificar tickets, rotear para o time certo, resumir threads longas e sinalizar casos urgentes. Erros humanos no roteamento causavam violações de SLA semanalmente.',
    },
    solution: {
      en: 'I integrated an LLM pipeline that read incoming tickets, classified intent and urgency using structured prompts, auto-routed based on a rules engine enriched with AI context, and generated a structured summary for the agent. I built confidence thresholds so edge cases still went to humans, preventing hallucination risk in critical paths.',
      pt: 'Integrei um pipeline com LLM que lia tickets recebidos, classificava intenção e urgência com prompts estruturados, fazia roteamento automático com regras enriquecidas por contexto de IA e gerava um resumo estruturado para o agente. Criei thresholds de confiança para que casos limítrofes ainda fossem para humanos.',
    },
    result: {
      en: '65% of all incoming requests are now handled end-to-end without human intervention. The ops team reclaimed 4 hours daily for higher-value work. SLA breach rate dropped by 80%. First-response time fell from 38 minutes average to under 3 minutes.',
      pt: '65% de todas as requisições são resolvidas de ponta a ponta sem intervenção humana. O time de ops recuperou 4 horas diárias para trabalho de maior valor. A taxa de violação de SLA caiu 80%. O tempo médio de primeira resposta caiu de 38 minutos para menos de 3 minutos.',
    },
  },

  {
    id: 'backend',
    icon: '🖥',
    label: { en: 'Backend', pt: 'Backend' },
    title: { en: 'Backend Optimization', pt: 'Otimização de Backend' },
    metric: { en: '-35% response time', pt: '-35% tempo de resposta' },
    problem: {
      en: 'The API was averaging 820ms per response on the most critical endpoints, the ones users hit on every page load. Under load, this climbed past 2 seconds. We traced it to N+1 query patterns that had accumulated over years of feature additions, and a lack of any caching layer.',
      pt: 'A API tinha média de 820ms por resposta nos endpoints mais críticos, aqueles acionados a cada carregamento de página. Sob carga, passava de 2 segundos. O problema vinha de padrões N+1 acumulados ao longo de anos de novas features, e ausência de qualquer camada de cache.',
    },
    solution: {
      en: 'I profiled every slow endpoint with query tracing enabled, identified 14 N+1 patterns, and rewrote them using eager loading and batched queries. I introduced a Redis caching layer for read-heavy endpoints with intelligent cache invalidation. I also restructured middleware chains to eliminate redundant processing on each request.',
      pt: 'Fiz profiling de cada endpoint lento com rastreamento de queries, identifiquei 14 padrões N+1 e os reescrevi usando eager loading e queries em batch. Introduzi uma camada de cache em Redis para endpoints de leitura intensa com invalidação inteligente. Também reestruturei as chains de middleware para eliminar processamento redundante.',
    },
    result: {
      en: 'Average response time on critical endpoints dropped from 820ms to 535ms, a 35% reduction. Under peak load, 95th percentile latency fell from 2.1s to 680ms. Server CPU usage dropped 22%, reducing infrastructure costs without any hardware changes.',
      pt: 'O tempo médio de resposta nos endpoints críticos caiu de 820ms para 535ms, redução de 35%. Sob carga máxima, a latência no percentil 95 caiu de 2,1s para 680ms. O uso de CPU dos servidores caiu 22%, reduzindo custos sem mudanças de hardware.',
    },
  },

  {
    id: 'database',
    icon: '🗄',
    label: { en: 'Database', pt: 'Banco' },
    title: { en: 'Database Optimization', pt: 'Banco de Dados' },
    metric: { en: '+40% efficiency', pt: '+40% eficiência' },
    problem: {
      en: 'During peak hours, the database CPU would spike to 90%+ and queries that ran in milliseconds on staging would take 8-12 seconds in production. The on-call team was regularly woken up at 3am by alerts. A full table scan on the orders table which had grown to 40M rows was being triggered on every dashboard load.',
      pt: 'Nos horários de pico, o CPU do banco disparava para 90%+ e queries que rodavam em milissegundos no staging levavam 8-12 segundos em produção. O time de plantão era acordado às 3h com alertas. Um full table scan na tabela de pedidos com 40M de linhas era acionado a cada carregamento de dashboard.',
    },
    solution: {
      en: 'I ran EXPLAIN ANALYZE on the top 20 slowest queries and found missing composite indexes, unnecessary sequential scans, and a reporting query that was joining 7 tables without proper constraints. I redesigned the schema for the hot paths, added targeted indexes, partitioned the orders table by date, and moved analytical queries to a read replica.',
      pt: 'Rodei EXPLAIN ANALYZE nas 20 queries mais lentas e encontrei índices compostos ausentes, full scans desnecessários e uma query de relatório que fazia join de 7 tabelas sem constraints adequadas. Redesenhei o schema para os caminhos críticos, adicionei índices direcionados, particionei a tabela de pedidos por data e movi queries analíticas para um read replica.',
    },
    result: {
      en: 'Overall database query efficiency improved by 40%. The dashboard load that took 12 seconds now runs in 1.1 seconds. Peak CPU dropped from 90% to 52%. The on-call team went from 3-4 alerts per week to zero in the following month.',
      pt: 'A eficiência geral das queries melhorou 40%. O carregamento do dashboard que levava 12 segundos agora roda em 1,1 segundo. O CPU no pico caiu de 90% para 52%. O time de plantão passou de 3-4 alertas por semana para zero no mês seguinte.',
    },
  },

  {
    id: 'frontend',
    icon: '🎨',
    label: { en: 'Frontend', pt: 'Frontend' },
    title: { en: 'Frontend Architecture', pt: 'Frontend' },
    metric: { en: '+30% task completion', pt: '+30% conclusão de tarefas' },
    problem: {
      en: 'The frontend had grown organically for 3 years with no shared design system. There were 14 different button styles, 6 modal implementations, and inconsistent spacing throughout. New features took twice as long to build because developers had to reverse-engineer existing patterns each time. Users reported feeling "confused" in usability tests.',
      pt: 'O frontend cresceu organicamente por 3 anos sem um design system compartilhado. Havia 14 estilos de botão diferentes, 6 implementações de modal e espaçamentos inconsistentes. Novas features levavam o dobro do tempo por reengenharia constante de padrões. Usuários relatavam "confusão" nos testes de usabilidade.',
    },
    solution: {
      en: 'I led a full frontend refactor: extracted a component library with strict prop contracts, established a design token system for colors, spacing, and typography, and migrated the state management layer from scattered local state to a predictable global store. I documented every component with usage examples and created a living style guide.',
      pt: 'Liderei uma refatoração completa do frontend: extrai uma biblioteca de componentes com contratos de props rígidos, estabeleci um sistema de design tokens para cores, espaçamento e tipografia, e migrei o gerenciamento de estado de local state espalhado para uma store global previsível. Documentei cada componente com exemplos de uso.',
    },
    result: {
      en: 'Task completion rate in usability tests improved by 30%. Feature development velocity increased by 45%, new screens that took 3 days now take under 1.5 days. Designer-developer handoff time dropped by 60% with the shared token system.',
      pt: 'A taxa de conclusão de tarefas nos testes de usabilidade melhorou 30%. A velocidade de desenvolvimento de features aumentou 45%, telas que levavam 3 dias agora levam menos de 1,5 dia. O tempo de handoff designer-desenvolvedor caiu 60% com o sistema de tokens compartilhado.',
    },
  },

  {
    id: 'analytics',
    icon: '📊',
    label: { en: 'Analytics', pt: 'Analytics' },
    title: { en: 'Analytics Systems', pt: 'Analytics' },
    metric: { en: '+50% decision speed', pt: '+50% velocidade de decisão' },
    problem: {
      en: 'The leadership team was making product decisions based on gut feel and monthly Excel reports that took 3 days to prepare. By the time the data was ready, the opportunity window had often closed. There was no visibility into real-time behavior no one knew which features were actually being used or where users were dropping off.',
      pt: 'A liderança tomava decisões com base na intuição e em relatórios mensais em Excel que levavam 3 dias para preparar. Quando os dados ficavam prontos, a janela de oportunidade muitas vezes já havia fechado. Não havia visibilidade do comportamento em tempo real, ninguém sabia quais features eram usadas ou onde os usuários saíam.',
    },
    solution: {
      en: 'I designed and built an analytics platform from scratch: instrumented the product with a structured event taxonomy, built a real-time data pipeline into a data warehouse, and created role-specific dashboards for product, marketing, and engineering. I also set up funnel analysis and cohort retention views.',
      pt: 'Projetei e construí uma plataforma de analytics do zero: instrumentei o produto com uma taxonomia estruturada de eventos, construí um pipeline de dados em tempo real para um data warehouse e criei dashboards específicos por função para produto, marketing e engenharia. Também configurei análises de funil e retenção por coorte.',
    },
    result: {
      en: 'Decision-making speed increased by 50%, weekly reviews replaced the monthly Excel ritual. The team discovered that 40% of users never reached a key activation step, leading to a targeted fix that improved activation by 22%. Monthly reporting prep went from 3 days to automated and real-time.',
      pt: 'A velocidade de tomada de decisão aumentou 50%, revisões semanais substituíram o ritual mensal de Excel. O time descobriu que 40% dos usuários nunca chegavam a um passo chave de ativação, gerando uma correção que melhorou a ativação em 22%. A preparação de relatórios mensais passou de 3 dias para automático e em tempo real.',
    },
  },

  {
    id: 'infra',
    icon: '🔧',
    label: { en: 'Infra', pt: 'Infra' },
    title: { en: 'Infrastructure', pt: 'Infraestrutura' },
    metric: { en: '+70% uptime reliability', pt: '+70% confiabilidade' },
    problem: {
      en: 'The system was going down 2-3 times per month always at the worst possible moments, during peak traffic or major client demos. Deployments were manual, nerve-wracking events that required the whole team to be on standby. There was no staging environment, so bugs went directly to production. Rollback meant a 2-hour manual process.',
      pt: 'O sistema caia 2-3 vezes por mês sempre nos piores momentos, durante pico de tráfego ou demos importantes para clientes. Deploys eram eventos manuais e tensos que exigiam a equipe inteira de sobreaviso. Sem ambiente de staging, bugs iam direto para produção. Rollback levava 2 horas de processo manual.',
    },
    solution: {
      en: 'I rebuilt the deployment pipeline from scratch with CI/CD, automated testing gates, blue-green deployments, and one-click rollback. I set up proper staging and production environments with infrastructure-as-code, implemented health checks and auto-restart policies, and added structured alerting with runbooks attached to each alert type.',
      pt: 'Reconstruí o pipeline de deploy com CI/CD, gates de testes automatizados, deployments blue-green e rollback com um clique. Configurei ambientes de staging e produção com infraestrutura como código, implementei health checks e políticas de restart automático, e adicionei alertas estruturados com runbooks para cada tipo de alerta.',
    },
    result: {
      en: 'System uptime went from 97.1% to 99.8%, eliminating over 70% of downtime incidents. Deployment time dropped from 45 minutes (manual, risky) to 8 minutes (automated, safe). The team stopped fearing deploy days. Rollback, when needed, now takes under 90 seconds.',
      pt: 'A disponibilidade do sistema passou de 97,1% para 99,8%, eliminando mais de 70% dos incidentes de downtime. O tempo de deploy caiu de 45 minutos (manual, arriscado) para 8 minutos (automatizado, seguro). O time parou de temer os dias de deploy. O rollback, quando necessário, agora leva menos de 90 segundos.',
    },
  },

  {
    id: 'api',
    icon: '🔌',
    label: { en: 'API', pt: 'API' },
    title: { en: 'API Design', pt: 'Design de APIs' },
    metric: {
      en: '+45% integration speed',
      pt: '+45% velocidade de integração',
    },
    problem: {
      en: 'Third-party developers were struggling to integrate with the API. Documentation was outdated, endpoints were inconsistent and some used camelCase, others snake_case, some returned errors as 200s with an error field, others used proper HTTP status codes. Each integration took weeks and generated support tickets.',
      pt: 'Desenvolvedores terceiros lutavam para integrar com a API. A documentação estava desatualizada, os endpoints eram inconsistentes e alguns usavam camelCase, outros snake_case, alguns retornavam erros como 200 com um campo de erro, outros usavam códigos HTTP corretos. Cada integração levava semanas e gerava tickets de suporte.',
    },
    solution: {
      en: 'I audited every public endpoint, established a consistent API design standard (RESTful conventions, unified error schema, versioning strategy), and refactored the endpoints in a backward-compatible way. I introduced auto-generated OpenAPI docs with live examples, built a sandbox environment for testing, and created an SDK for the most common languages.',
      pt: 'Auditei cada endpoint público, estabeleci um padrão consistente de design de API (convenções RESTful, schema de erro unificado, estratégia de versionamento) e refatorei os endpoints de forma retrocompatível. Introduzi docs OpenAPI com exemplos ao vivo, construí um ambiente sandbox para testes e criei um SDK para as linguagens mais comuns.',
    },
    result: {
      en: 'Average integration time dropped from 3 weeks to under 10 days with 45% improvement. Support tickets related to API confusion fell by 68%. Partner satisfaction scores improved from 5.8 to 8.6 out of 10. The SDK alone saved partners an estimated 40 hours of boilerplate per integration.',
      pt: 'O tempo médio de integração caiu de 3 semanas para menos de 10 dias com melhora de 45%. Tickets de suporte relacionados à API caíram 68%. As notas de satisfação dos parceiros subiram de 5,8 para 8,6 em 10. O SDK sozinho economizou em média 40 horas de boilerplate por integração.',
    },
  },

  {
    id: 'growth',
    icon: '🚀',
    label: { en: 'Growth', pt: 'Growth' },
    title: { en: 'Growth Engineering', pt: 'Growth' },
    metric: { en: '+30% activation rate', pt: '+30% taxa de ativação' },
    problem: {
      en: "Acquisition was strong but activation was broken. 60% of new signups never completed onboarding. The team kept adding more features thinking that was the problem, but users were churning before they ever saw them. The onboarding flow had 11 steps and asked for information the product didn't even use.",
      pt: 'A aquisição era forte, mas a ativação estava quebrada. 60% dos novos cadastros nunca completavam o onboarding. O time adicionava features pensando que esse era o problema, mas os usuários saíam antes de vê-las. O fluxo de onboarding tinha 11 etapas e pedia informações que o produto nem usava.',
    },
    solution: {
      en: 'I ran a jobs-to-be-done analysis with churned users and found the real barrier: users couldn\'t see value before being asked to invest time. I redesigned onboarding from 11 steps to 3, moved the "aha moment" to within the first 2 minutes, implemented a progress indicator, and added contextual tooltips that showed up exactly when needed not upfront.',
      pt: 'Realizei uma análise jobs-to-be-done com usuários que saíram e identifiquei a barreira real: os usuários não conseguiam ver valor antes de precisar investir tempo. Redesenhei o onboarding de 11 etapas para 3, movi o "momento aha" para os primeiros 2 minutos, implementei um indicador de progresso e adicionei tooltips contextuais que apareciam exatamente quando necessários.',
    },
    result: {
      en: 'Activation rate improved from 40% to 70%, a 30-point increase. Time-to-value dropped from 18 minutes to under 4 minutes. 30-day retention for activated users improved by 22%. The product team stopped building new features for 6 weeks and saw better growth metrics than the previous 6 months of shipping.',
      pt: 'A taxa de ativação subiu de 40% para 70%, aumento de 30 pontos percentuais. O tempo até o primeiro valor caiu de 18 minutos para menos de 4 minutos. A retenção de 30 dias para usuários ativados melhorou 22%. O time de produto parou de lançar features por 6 semanas e viu métricas melhores do que nos 6 meses anteriores.',
    },
  },

  {
    id: 'monitoring',
    icon: '📡',
    label: { en: 'Monitoring', pt: 'Monitoramento' },
    title: { en: 'Observability Systems', pt: 'Observabilidade' },
    metric: { en: '-74% mean time to resolve', pt: '-74% tempo de resolução' },
    problem: {
      en: 'When something broke, the team found out from angry users on Twitter not from internal alerts. Debugging took hours because logs were unstructured text scattered across 4 different servers. There was no distributed tracing, so following a request through the system was detective work. The average time to resolve an incident was 4.2 hours.',
      pt: 'Quando algo quebrava, o time ficava sabendo pelos usuários irritados no Twitter não por alertas internos. O debugging levava horas porque os logs eram texto não estruturado espalhado em 4 servidores. Sem rastreamento distribuído, seguir uma requisição pelo sistema era trabalho de detetive. O tempo médio de resolução de um incidente era de 4,2 horas.',
    },
    solution: {
      en: 'I implemented a full observability stack: structured JSON logging with correlation IDs that linked every log to a specific request, distributed tracing across services, and a metrics layer with SLO-based alerting. I created runbooks for the top 10 most common incidents and set up anomaly detection to catch problems before users did.',
      pt: 'Implementei uma stack completa de observabilidade: logs JSON estruturados com IDs de correlação que ligavam cada log a uma requisição específica, rastreamento distribuído entre serviços e uma camada de métricas com alertas baseados em SLOs. Criei runbooks para os 10 incidentes mais comuns e configurei detecção de anomalias para capturar problemas antes dos usuários.',
    },
    result: {
      en: 'Mean time to detect an incident dropped from "whenever users complained" to under 4 minutes. Mean time to resolve fell from 4.2 hours to 1.1 hours, with 74% improvement. The team stopped finding out about problems from Twitter. On-call stress dropped measurably — engineers stopped avoiding rotation.',
      pt: 'O tempo médio de detecção de incidentes caiu de "quando os usuários reclamavam" para menos de 4 minutos. O tempo médio de resolução caiu de 4,2 horas para 1,1 hora, melhora de 74%. O time parou de descobrir problemas pelo Twitter. O estresse de plantão caiu visivelmente — os engenheiros pararam de evitar a rotação.',
    },
  },

  {
    id: 'data',
    icon: '🔀',
    label: { en: 'Data', pt: 'Dados' },
    title: { en: 'Data Pipeline Optimization', pt: 'Pipeline de Dados' },
    metric: { en: '-82% processing time', pt: '-82% tempo de processamento' },
    problem: {
      en: 'The nightly data pipeline was taking 11 hours to complete which meant it regularly ran into the next business day. Reports that executives needed at 9am were still processing at noon. The pipeline was a monolithic sequential script with no parallelization, no error recovery, and no observability. One bad record could silently corrupt the entire run.',
      pt: 'O pipeline noturno de dados levava 11 horas para completar o que significava que regularmente entrava no próximo dia útil. Relatórios que a diretoria precisava às 9h ainda estavam processando ao meio-dia. O pipeline era um script sequencial monolítico sem paralelização, sem recuperação de erros e sem observabilidade. Um registro ruim podia corromper silenciosamente toda a execução.',
    },
    solution: {
      en: 'I redesigned the pipeline from sequential to parallel processing using a DAG-based orchestrator, enabling independent steps to run concurrently. I implemented idempotent processing so failed jobs could safely retry from the last checkpoint, added schema validation at ingestion to catch bad data early, and moved from batch-only to a hybrid streaming/batch approach for time-sensitive data.',
      pt: 'Redesenhei o pipeline de sequencial para processamento paralelo usando um orquestrador baseado em DAG, permitindo que etapas independentes rodassem simultaneamente. Implementei processamento idempotente para que jobs falhos pudessem reiniciar com segurança do último checkpoint, adicionei validação de schema na ingestão para capturar dados incorretos cedo e migrei de batch-only para uma abordagem híbrida streaming/batch para dados sensíveis ao tempo.',
    },
    result: {
      en: 'Pipeline runtime dropped from 11 hours to 2 hours, with 82% reduction. Executive reports were ready by 6am, 3 hours before the workday started. Data quality incidents dropped by 91% due to early validation. The system now processes 3x the data volume compared to when the optimization began.',
      pt: 'O tempo de execução do pipeline caiu de 11 horas para 2 horas, redução de 82%. Os relatórios da diretoria ficavam prontos às 6h, 3 horas antes do início do dia útil. Os incidentes de qualidade de dados caíram 91% com a validação antecipada. O sistema agora processa 3x o volume de dados em relação ao início da otimização.',
    },
  },
];
