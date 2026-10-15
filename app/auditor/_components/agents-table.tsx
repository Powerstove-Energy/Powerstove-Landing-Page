'use client';

import { useDeferredValue, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuditAgents } from '../_lib/hooks/use-auditor';
import { AgentAccountStatus, toQueryString } from '../_lib/types';
import { AccountBadge } from './badges';
import { ExportLink, FilterBar, SearchInput, selectClassName } from './filters';
import { daysAgo, formatDate, formatPercent } from './format';
import { Pagination } from './pagination';
import { useRecordDrawer } from './record-drawer';

const PAGE_SIZE = 25;
const COLUMNS: Array<[string, boolean]> = [
  ['Agent', false],
  ['Phone', false],
  ['Account', false],
  ['Joined', false],
  ['Stoves', true],
  ['KYC verified', true],
  ['Payment accounts', true],
  ['Last registration', false],
  ['Areas', false],
  ['Review', false],
];

export function AgentsTable() {
  const { openAgent } = useRecordDrawer();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<AgentAccountStatus | ''>('');
  const [page, setPage] = useState(1);

  const filters = { q: useDeferredValue(q.trim()) || undefined, status: status || undefined };
  const { data, isLoading, isError, isFetching } = useAuditAgents({ ...filters, page, pageSize: PAGE_SIZE });

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink">Agents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everyone registered as a field agent, their account status and the quality of their registrations.
          </p>
        </div>
        <ExportLink href={`/auditor/export/agents${toQueryString(filters)}`} />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <FilterBar>
          <SearchInput
            value={q}
            onChange={(value) => {
              setQ(value);
              setPage(1);
            }}
            placeholder="Search name, email or phone"
            label="Search agents"
          />
          <select
            aria-label="Account status"
            className={selectClassName}
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as AgentAccountStatus | '');
              setPage(1);
            }}
          >
            <option value="">Any status</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="UNVERIFIED">Email not verified</option>
          </select>
        </FilterBar>

        <div className={`overflow-x-auto transition-opacity ${isFetching && !isLoading ? 'opacity-60' : ''}`}>
          <table className="w-full min-w-[64rem] text-left text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr className="border-b border-border">
                {COLUMNS.map(([column, numeric]) => (
                  <th key={column} className={`whitespace-nowrap px-4 py-2.5 font-medium ${numeric ? 'text-right' : ''}`}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array.from({ length: 6 }, (_, index) => (
                    <tr key={index}>
                      <td colSpan={COLUMNS.length} className="px-4 py-3">
                        <Skeleton className="h-5 w-full" />
                      </td>
                    </tr>
                  ))
                : null}
              {isError ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-destructive">
                    Could not load agents. Refresh to try again.
                  </td>
                </tr>
              ) : null}
              {data && data.items.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-muted-foreground">
                    No agents match these filters.
                  </td>
                </tr>
              ) : null}
              {data?.items.map((agent) => (
                <tr
                  key={agent.agent_uuid}
                  tabIndex={0}
                  onClick={() => openAgent(agent.agent_uuid)}
                  onKeyDown={(event) => (event.key === 'Enter' ? openAgent(agent.agent_uuid) : null)}
                  className="cursor-pointer hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                >
                  <td className="px-4 py-3">
                    <span className="block font-medium text-ink">{agent.full_name}</span>
                    <span className="block text-xs text-muted-foreground">{agent.email}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink">{agent.phone_number ?? '—'}</td>
                  <td className="px-4 py-3">
                    <AccountBadge status={agent.account_status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{formatDate(agent.created_at)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink">{agent.stoves_registered}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink">{formatPercent(agent.kyc_verified_pct)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-ink">{formatPercent(agent.payment_account_pct)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {agent.last_registration_at ? daysAgo(agent.last_registration_at) : 'No registrations'}
                  </td>
                  <td className="px-4 py-3 text-ink">{agent.states.length ? agent.states.join(', ') : '—'}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {agent.stoves_needing_review ? (
                      <span className="text-xs font-medium text-warning">
                        {agent.stoves_needing_review} stove{agent.stoves_needing_review === 1 ? '' : 's'}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data ? <Pagination pageInfo={data.page_info} noun="agents" onPage={setPage} /> : null}
      </div>
    </div>
  );
}
