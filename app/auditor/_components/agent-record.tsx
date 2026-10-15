'use client';

import Link from 'next/link';
import { useAuditAgent } from '../_lib/hooks/use-auditor';
import { AccountBadge, FlagLabel, KycBadge } from './badges';
import { formatDate, formatDateTime, formatPercent } from './format';
import { Details, RecordHeader, RecordSection, RecordState, useRecordDrawer } from './record-drawer';

export function AgentRecord({ agentUuid }: { agentUuid: string }) {
  const { data: agent, isLoading, isError, error } = useAuditAgent(agentUuid);
  const { openStove, close } = useRecordDrawer();

  if (isLoading) return <RecordState message="Loading the agent…" />;
  if (isError || !agent) return <RecordState tone="error" message={error?.message ?? 'This agent could not be loaded.'} />;

  const stats: Array<[string, string]> = [
    ['Stoves', String(agent.stoves_registered)],
    ['KYC verified', formatPercent(agent.kyc_verified_pct)],
    ['To review', String(agent.stoves_needing_review)],
  ];

  return (
    <>
      <RecordHeader eyebrow="Field agent" title={agent.full_name}>
        <div className="mt-2">
          <AccountBadge status={agent.account_status} />
        </div>
      </RecordHeader>
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        <RecordSection>
          <div className="grid grid-cols-3 gap-3">
            {stats.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border px-3 py-2.5">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums text-ink">{value}</p>
              </div>
            ))}
          </div>
        </RecordSection>

        <RecordSection title="Account">
          <Details
            rows={[
              ['Email', agent.email],
              ['Phone', agent.phone_number ?? '—'],
              ['Joined', formatDate(agent.created_at)],
              ['Areas', agent.states.length ? agent.states.join(', ') : '—'],
              ['Last registration', agent.last_registration_at ? formatDateTime(agent.last_registration_at) : 'None yet'],
              ['Payment accounts', agent.payment_account_pct === null ? '—' : `${agent.payment_account_pct}% of customers`],
            ]}
          />
        </RecordSection>

        <RecordSection title="Recent registrations">
          {agent.recent_stoves.length ? (
            <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
              {agent.recent_stoves.map((stove) => (
                <button
                  key={stove.stove_unit_uuid}
                  type="button"
                  onClick={() => openStove(stove.stove_unit_uuid)}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 text-left hover:bg-surface"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-sm text-ink">{stove.serial_number}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {stove.customer.full_name} · {stove.customer.lga ?? stove.customer.state ?? '—'} · {formatDate(stove.registered_at)}
                    </span>
                  </span>
                  {stove.flags.some((flag) => flag.severity !== 'low') ? <FlagLabel flags={stove.flags} compact /> : <KycBadge status={stove.kyc_status} />}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">This agent has not registered a stove yet.</p>
          )}
          {agent.stoves_registered > agent.recent_stoves.length ? (
            <Link href={`/auditor/stoves?agent=${agent.agent_uuid}`} onClick={close} className="inline-block text-sm font-medium text-primary hover:underline">
              See all {agent.stoves_registered} in Registered stoves
            </Link>
          ) : null}
        </RecordSection>
      </div>
    </>
  );
}
