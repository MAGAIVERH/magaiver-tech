import {
  Zap,
  Layers,
  Brain,
  Server,
  Database,
  Code,
  BarChart3,
  Settings,
  Cpu,
  Rocket,
  Activity,
  Workflow,
} from 'lucide-react';

export function getAboutIcon(icon: string) {
  switch (icon) {
    case 'zap':
      return Zap;
    case 'layers':
      return Layers;
    case 'brain':
      return Brain;
    case 'server':
      return Server;
    case 'database':
      return Database;
    case 'code':
      return Code;
    case 'chart':
      return BarChart3;
    case 'settings':
      return Settings;
    case 'cpu':
      return Cpu;
    case 'rocket':
      return Rocket;
    case 'activity':
      return Activity;
    case 'flow':
      return Workflow;
    default:
      return Zap;
  }
}
