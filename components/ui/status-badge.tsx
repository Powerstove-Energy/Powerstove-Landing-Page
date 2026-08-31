import { CheckCircle2, Circle, Clock, Info, XCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'success' | 'warning' | 'destructive' | 'info' | 'neutral';

const TONE_CONFIG: Record<Tone, { icon: typeof CheckCircle2; className: string }> = {
  success: { icon: CheckCircle2, className: 'bg-success-surface text-success' },
  warning: { icon: Clock, className: 'bg-warning-surface text-warning' },
  destructive: { icon: XCircle, className: 'bg-destructive-surface text-destructive' },
  info: { icon: Info, className: 'bg-info-surface text-info' },
  neutral: { icon: Circle, className: 'bg-muted text-muted-foreground' },
};

interface StatusBadgeProps {
  tone: Tone;
  children: ReactNode;
  className?: string;
}

/** Tone is always paired with a distinct icon — status is never conveyed by color alone. */
export function StatusBadge({ tone, children, className }: StatusBadgeProps) {
  const { icon: Icon, className: toneClassName } = TONE_CONFIG[tone];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        toneClassName,
        className,
      )}
    >
      <Icon className="size-3.5" />
      {children}
    </span>
  );
}
