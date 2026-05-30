import { cn } from '@/lib/utils';

type DotPatternProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function DotPattern({
  className,
  width = 20,
  height = 20,
}: DotPatternProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-25',
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(rgb(var(--foreground) / 0.12) 1px, transparent 1px)`,
        backgroundSize: `${width}px ${height}px`,
        maskImage:
          'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
      }}
    />
  );
}
