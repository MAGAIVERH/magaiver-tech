import {
  Zap,
  Layers,
  Brain,
  Server,
  Database,
  Code,
  BarChart3,
  Cloud,
  Network,
  Rocket,
  RadioTower,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps a stable string key to a professional lucide glyph. Replaces the old
 * emoji set so the skills orbit reads as credible engineering, not decoration.
 */
export function getAboutIcon(icon: string): LucideIcon {
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
    case 'cloud':
      return Cloud;
    case 'network':
      return Network;
    case 'rocket':
      return Rocket;
    case 'radar':
      return RadioTower;
    case 'flow':
      return Workflow;
    default:
      return Zap;
  }
}
