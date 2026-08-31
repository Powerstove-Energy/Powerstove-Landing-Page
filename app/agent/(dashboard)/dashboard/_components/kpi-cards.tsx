'use client';

import { CreditCard, Flame, ShieldCheck, Users, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardSummary } from '@/app/agent/_lib/hooks/use-dashboard';
import { DashboardSummary } from '@/app/agent/_lib/services/dashboard.service';

function formatNaira(kobo: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}

const STAT_CONFIG: {
  key: keyof DashboardSummary;
  label: string;
  icon: typeof Users;
  format: (value: number) => string;
}[] = [
  { key: 'total_customers', label: 'Customers registered', icon: Users, format: String },
  { key: 'kyc_verified_count', label: 'KYC verified', icon: ShieldCheck, format: String },
  { key: 'stoves_assigned_count', label: 'Stoves given out', icon: Flame, format: String },
  { key: 'active_payment_accounts_count', label: 'Payment accounts', icon: CreditCard, format: String },
  { key: 'total_collected_kobo', label: 'Total collected', icon: Wallet, format: formatNaira },
];

export function KpiCards() {
  const { data, isLoading, isError } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {STAT_CONFIG.map((stat) => (
          <Card key={stat.key}>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-7 w-16" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <p className="text-sm text-destructive">Could not load your dashboard summary. Try refreshing.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {STAT_CONFIG.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.key}>
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-ink">{stat.format(data[stat.key])}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
