'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/ui/status-badge';
import { useCustomers } from '@/app/agent/_lib/hooks/use-customers';
import { KycStatus } from '@/app/agent/_lib/types';
import { RegisterCustomerDialog } from './register-customer-dialog';

const KYC_FILTERS: { label: string; value: KycStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Verified', value: 'VERIFIED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Failed', value: 'FAILED' },
];

function kycTone(status: KycStatus) {
  if (status === 'VERIFIED') return 'success' as const;
  if (status === 'FAILED') return 'destructive' as const;
  return 'warning' as const;
}

export function CustomersTable() {
  const [search, setSearch] = useState('');
  const [kycFilter, setKycFilter] = useState<KycStatus | 'ALL'>('ALL');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCustomers({
    q: search || undefined,
    kyc_status: kycFilter === 'ALL' ? undefined : kycFilter,
    page,
    pageSize: 20,
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search by name or phone"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="w-64"
          />
          <div className="flex gap-1 rounded-lg border border-border p-1">
            {KYC_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => {
                  setKycFilter(filter.value);
                  setPage(1);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  kycFilter === filter.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <RegisterCustomerDialog trigger={<Button>Register Customer</Button>} />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">KYC</th>
              <th className="px-4 py-3 font-medium">Stove</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3" colSpan={6}>
                      <Skeleton className="h-5 w-full" />
                    </td>
                  </tr>
                ))
              : null}
            {isError ? (
              <tr>
                <td className="px-4 py-6 text-center text-destructive" colSpan={6}>
                  Could not load customers. Try refreshing.
                </td>
              </tr>
            ) : null}
            {!isLoading && !isError && data?.items.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-muted-foreground" colSpan={6}>
                  No customers yet — register your first one.
                </td>
              </tr>
            ) : null}
            {data?.items.map((customer) => (
              <tr key={customer.customer_uuid} className="hover:bg-surface">
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/agent/customers/${customer.customer_uuid}`} className="hover:underline">
                    {customer.full_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{customer.phone_number}</td>
                <td className="px-4 py-3">
                  <StatusBadge tone={kycTone(customer.kyc_status)}>{customer.kyc_status}</StatusBadge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {customer.stove_unit ? customer.stove_unit.model.name : '—'}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {customer.payment_account ? customer.payment_account.account_number : '—'}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(customer.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.page_info.total_pages > 1 ? (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {data.page_info.page} of {data.page_info.total_pages} ({data.page_info.total} customers)
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= data.page_info.total_pages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
