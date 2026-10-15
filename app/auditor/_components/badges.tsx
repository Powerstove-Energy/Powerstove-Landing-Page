import { CookingPot, Flag, MapPin, Signature, UserRound } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import type { KycStatus } from '@/app/agent/_lib/types';
import { cn } from '@/lib/utils';
import type { AgentAccountStatus, AuditFlag, AuditStove } from '../_lib/types';

const KYC_LABEL: Record<KycStatus, string> = { VERIFIED: 'Verified', PENDING: 'Pending', FAILED: 'Failed' };

export function KycBadge({ status }: { status: KycStatus }) {
  const tone = status === 'VERIFIED' ? 'success' : status === 'FAILED' ? 'destructive' : 'warning';
  return <StatusBadge tone={tone}>{KYC_LABEL[status]}</StatusBadge>;
}

export function AccountBadge({ status }: { status: AgentAccountStatus }) {
  if (status === 'SUSPENDED') return <StatusBadge tone="destructive">Suspended</StatusBadge>;
  if (status === 'UNVERIFIED') return <StatusBadge tone="warning">Email not verified</StatusBadge>;
  return <StatusBadge tone="success">Active</StatusBadge>;
}

const SEVERITY_CLASS = {
  high: 'text-destructive',
  medium: 'text-warning',
  low: 'text-muted-foreground',
} as const;

/** The most serious flag, plus a count of the rest. */
export function FlagLabel({ flags, compact }: { flags: AuditFlag[]; compact?: boolean }) {
  if (!flags.length) return <span className="text-muted-foreground">—</span>;
  const [top] = [...flags].sort((a, b) => rank(a) - rank(b));
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium', SEVERITY_CLASS[top.severity])}>
      <Flag className="size-3.5" aria-hidden />
      {compact ? <span className="sr-only">{top.title}</span> : top.title.replace(/ as .+$/, '')}
      {!compact && flags.length > 1 ? <span className="text-muted-foreground">+{flags.length - 1}</span> : null}
    </span>
  );
}

function rank(flag: AuditFlag): number {
  return flag.severity === 'high' ? 0 : flag.severity === 'medium' ? 1 : 2;
}

export function FlagAlert({ flag }: { flag: AuditFlag }) {
  const className =
    flag.severity === 'high'
      ? 'bg-destructive-surface text-destructive'
      : flag.severity === 'medium'
        ? 'bg-warning-surface text-warning'
        : 'bg-muted text-muted-foreground';
  return (
    <div className={cn('rounded-lg px-3 py-2.5 text-sm', className)}>
      <p className="font-semibold">{flag.title}</p>
      <p className="mt-0.5">{flag.detail}</p>
    </div>
  );
}

const EVIDENCE = [
  { key: 'customer_photo', label: 'Customer photo', icon: UserRound },
  { key: 'stove_photo', label: 'Stove photo', icon: CookingPot },
  { key: 'gps', label: 'GPS location', icon: MapPin },
  { key: 'signature', label: 'Signature', icon: Signature },
] as const;

export function EvidenceIcons({ evidence }: { evidence: AuditStove['evidence'] }) {
  return (
    <span className="inline-flex gap-1">
      {EVIDENCE.map(({ key, label, icon: Icon }) => {
        const present = evidence[key];
        const text = `${label} ${present ? 'captured' : 'missing'}`;
        return (
          <span
            key={key}
            title={text}
            className={cn(
              'grid size-6 place-items-center rounded-md',
              present ? 'bg-success-surface text-success' : 'bg-destructive-surface text-destructive',
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            <span className="sr-only">{text}</span>
          </span>
        );
      })}
    </span>
  );
}
