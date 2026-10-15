'use client';

import { useSearchParams } from 'next/navigation';
import { useDeferredValue, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { paymentProviderName, type KycStatus } from '@/app/agent/_lib/types';
import { useAuditStoves } from '../_lib/hooks/use-auditor';
import { toQueryString } from '../_lib/types';
import { EvidenceIcons, FlagLabel, KycBadge } from './badges';
import { ExportLink, FilterBar, SearchInput, selectClassName } from './filters';
import { formatDate } from './format';
import { Pagination } from './pagination';
import { useRecordDrawer } from './record-drawer';

const PAGE_SIZE = 25;
const COLUMNS = ['Serial / model', 'Customer', 'Registered by', 'Location', 'Date', 'KYC', 'Evidence', 'Payment', 'Review'];

export function StovesTable() {
  const searchParams = useSearchParams();
  const { openStove } = useRecordDrawer();
  const [q, setQ] = useState('');
  const [state, setState] = useState('');
  const [modelUuid, setModelUuid] = useState('');
  const [kycStatus, setKycStatus] = useState<KycStatus | ''>('');
  const [needsReview, setNeedsReview] = useState(searchParams.get('review') === '1');
  const [agentUuid, setAgentUuid] = useState(searchParams.get('agent') ?? '');
  const [page, setPage] = useState(1);

  const filters = {
    q: useDeferredValue(q.trim()) || undefined,
    state: state || undefined,
    stove_model_uuid: modelUuid || undefined,
    kyc_status: kycStatus || undefined,
    agent_uuid: agentUuid || undefined,
    needs_review: needsReview || undefined,
  };
  const { data, isLoading, isError, isFetching } = useAuditStoves({ ...filters, page, pageSize: PAGE_SIZE });

  // Any filter change goes back to the first page.
  const update = <T,>(setter: (value: T) => void) => (value: T) => {
    setter(value);
    setPage(1);
  };
  const agentName = agentUuid ? data?.items.find((item) => item.agent.agent_uuid === agentUuid)?.agent.full_name : null;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink">Registered stoves</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Click a row to see the customer, photos, GPS location, signature and payments.
          </p>
        </div>
        <ExportLink href={`/auditor/export/stoves${toQueryString(filters)}`} />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <FilterBar>
          <SearchInput value={q} onChange={update(setQ)} placeholder="Search serial, customer or agent" label="Search stoves" />
          <select aria-label="State" className={selectClassName} value={state} onChange={(event) => update(setState)(event.target.value)}>
            <option value="">All states</option>
            {data?.facets.states.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <select aria-label="Model" className={selectClassName} value={modelUuid} onChange={(event) => update(setModelUuid)(event.target.value)}>
            <option value="">All models</option>
            {data?.facets.models.map((model) => (
              <option key={model.stove_model_uuid} value={model.stove_model_uuid}>
                {model.name}
              </option>
            ))}
          </select>
          <select
            aria-label="KYC status"
            className={selectClassName}
            value={kycStatus}
            onChange={(event) => update(setKycStatus)(event.target.value as KycStatus | '')}
          >
            <option value="">Any KYC status</option>
            <option value="VERIFIED">Verified</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
          <label className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm text-ink">
            <input type="checkbox" className="size-4 accent-primary" checked={needsReview} onChange={(event) => update(setNeedsReview)(event.target.checked)} />
            Needs review only
          </label>
          {agentUuid ? (
            <button
              type="button"
              onClick={() => update(setAgentUuid)('')}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-muted px-3 text-sm text-ink hover:bg-border"
            >
              Agent: {agentName ?? 'selected'} <span aria-hidden>×</span>
              <span className="sr-only">Clear agent filter</span>
            </button>
          ) : null}
        </FilterBar>

        <div className={`overflow-x-auto transition-opacity ${isFetching && !isLoading ? 'opacity-60' : ''}`}>
          <table className="w-full min-w-[60rem] text-left text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr className="border-b border-border">
                {COLUMNS.map((column) => (
                  <th key={column} className="whitespace-nowrap px-4 py-2.5 font-medium">
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
                    Could not load registered stoves. Refresh to try again.
                  </td>
                </tr>
              ) : null}
              {data && data.items.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-muted-foreground">
                    No stoves match these filters.
                  </td>
                </tr>
              ) : null}
              {data?.items.map((stove) => (
                <tr
                  key={stove.stove_unit_uuid}
                  tabIndex={0}
                  onClick={() => openStove(stove.stove_unit_uuid)}
                  onKeyDown={(event) => (event.key === 'Enter' ? openStove(stove.stove_unit_uuid) : null)}
                  className="cursor-pointer hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                >
                  <td className="px-4 py-3">
                    <span className="block font-mono text-[13px] font-medium text-ink">{stove.serial_number}</span>
                    <span className="block text-xs text-muted-foreground">{stove.model.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block font-medium text-ink">{stove.customer.full_name}</span>
                    <span className="block text-xs tabular-nums text-muted-foreground">{stove.customer.phone_masked}</span>
                  </td>
                  <td className="px-4 py-3 text-ink">{stove.agent.full_name}</td>
                  <td className="px-4 py-3">
                    <span className="block text-ink">{stove.customer.lga ?? '—'}</span>
                    <span className="block text-xs text-muted-foreground">{stove.customer.state ?? '—'}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">{formatDate(stove.registered_at)}</td>
                  <td className="px-4 py-3">
                    <KycBadge status={stove.kyc_status} />
                    {stove.verified_identifier ? (
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {stove.verified_identifier} ****{stove.identifier_last4}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <EvidenceIcons evidence={stove.evidence} />
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {stove.payment_provider ? paymentProviderName(stove.payment_provider) : <span className="text-muted-foreground">None yet</span>}
                  </td>
                  <td className="px-4 py-3">
                    <FlagLabel flags={stove.flags} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data ? <Pagination pageInfo={data.page_info} noun="stoves" onPage={setPage} /> : null}
      </div>
    </div>
  );
}
