'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuditSummary } from '../_lib/hooks/use-auditor';
import { daysAgo, formatPercent } from './format';
import { useRecordDrawer } from './record-drawer';
import { WeeklyChart } from './weekly-chart';

function Panel({ title, aside, children, className }: { title: string; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn('min-w-0 rounded-xl border border-border bg-background', className)}>
      <div className="flex items-center justify-between gap-3 px-5 pt-4">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        {aside}
      </div>
      <div className="px-5 pb-5 pt-3">{children}</div>
    </section>
  );
}

function Kpi({ label, value, note, meter }: { label: string; value: string; note: ReactNode; meter?: number | null }) {
  return (
    <div className="grid gap-1.5 rounded-xl border border-border bg-background px-5 py-4">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-3xl font-semibold tabular-nums tracking-tight text-ink">{value}</span>
      {meter !== undefined && meter !== null ? (
        <span className="h-1.5 overflow-hidden rounded-full bg-muted">
          <span className="block h-full rounded-full bg-success" style={{ width: `${meter}%` }} />
        </span>
      ) : null}
      <span className="text-sm text-muted-foreground">{note}</span>
    </div>
  );
}

const SEVERITY_DOT = { high: 'bg-destructive', medium: 'bg-warning', low: 'bg-muted-foreground' } as const;

export function Overview() {
  const { data, isLoading, isError } = useAuditSummary();
  const { openStove, openAgent } = useRecordDrawer();

  if (isLoading) {
    return (
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </div>
    );
  }
  if (isError || !data) {
    return <p className="text-sm text-destructive">Could not load the audit summary. Refresh to try again.</p>;
  }

  const { stoves, agents } = data;
  const stateMax = Math.max(...data.by_state.map((row) => row.count), 1);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label="Stoves registered"
          value={String(stoves.total)}
          note={
            <>
              <span className="font-semibold text-success">+{stoves.last_30_days}</span> in the last 30 days
            </>
          }
        />
        <Kpi
          label="Identity verified"
          value={formatPercent(stoves.kyc_verified_pct)}
          meter={stoves.kyc_verified_pct}
          note={`${stoves.kyc_verified} of ${stoves.total} by NIN or BVN`}
        />
        <Kpi
          label="Evidence complete"
          value={formatPercent(stoves.evidence_complete_pct)}
          meter={stoves.evidence_complete_pct}
          note="Photos, GPS and signature on file"
        />
        <Kpi
          label="Active agents"
          value={String(agents.active)}
          note={`${agents.total} registered · ${agents.suspended} suspended`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel
          title="Stoves registered per week"
          aside={<span className="text-xs uppercase tracking-wide text-muted-foreground">Last 12 weeks</span>}
          className="lg:col-span-3"
        >
          <WeeklyChart weeks={data.weekly_registrations} />
        </Panel>

        <Panel
          title="Needs review"
          aside={<span className="text-xs uppercase tracking-wide text-muted-foreground">{stoves.needs_review} stoves</span>}
          className="lg:col-span-2"
        >
          {data.review_queue.length ? (
            <ul className="divide-y divide-border">
              {data.review_queue.map((item) => (
                <li key={item.stove_unit_uuid}>
                  <button
                    type="button"
                    onClick={() => openStove(item.stove_unit_uuid)}
                    className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-left"
                  >
                    <span className={cn('size-2 rounded-full', SEVERITY_DOT[item.flag.severity])} aria-label={`${item.flag.severity} priority`} />
                    <span className="min-w-0">
                      <span className="block font-medium text-ink group-hover:text-primary">{item.flag.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        <span className="font-mono">{item.serial_number}</span> · {item.agent_name}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">{daysAgo(item.registered_at)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-sm text-muted-foreground">Nothing needs review. Every registration has a verified identity and full evidence.</p>
          )}
          {stoves.needs_review > data.review_queue.length ? (
            <Link href="/auditor/stoves?review=1" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              See all {stoves.needs_review} that need review
            </Link>
          ) : null}
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel
          title="Top agents"
          aside={
            <Link href="/auditor/agents" className="text-sm font-medium text-primary hover:underline">
              All agents
            </Link>
          }
          className="lg:col-span-3"
        >
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-2 font-medium">Agent</th>
                  <th className="px-5 py-2 text-right font-medium">Stoves</th>
                  <th className="px-5 py-2 text-right font-medium">KYC verified</th>
                  <th className="px-5 py-2 font-medium">Last registration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.top_agents.map((agent) => (
                  <tr key={agent.agent_uuid} onClick={() => openAgent(agent.agent_uuid)} className="cursor-pointer hover:bg-surface">
                    <td className="px-5 py-2.5">
                      <span className="block font-medium text-ink">{agent.full_name}</span>
                      <span className="block text-xs text-muted-foreground">{agent.states.join(', ') || '—'}</span>
                    </td>
                    <td className="px-5 py-2.5 text-right tabular-nums">{agent.stoves_registered}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums">{formatPercent(agent.kyc_verified_pct)}</td>
                    <td className="px-5 py-2.5 text-muted-foreground">
                      {agent.last_registration_at ? daysAgo(agent.last_registration_at) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Stoves by state" className="lg:col-span-2">
          <div className="grid gap-2.5">
            {data.by_state.map((row) => (
              <div key={row.state} className="grid grid-cols-[6rem_minmax(0,1fr)_2.5rem] items-center gap-3 text-sm">
                <span className="truncate text-ink">{row.state}</span>
                <span className="h-2 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full rounded-full bg-ink/80" style={{ width: `${(100 * row.count) / stateMax}%` }} />
                </span>
                <span className="text-right tabular-nums text-muted-foreground">{row.count}</span>
              </div>
            ))}
            {data.by_state.length === 0 ? <p className="text-sm text-muted-foreground">No registrations yet.</p> : null}
          </div>
        </Panel>
      </div>
    </div>
  );
}
