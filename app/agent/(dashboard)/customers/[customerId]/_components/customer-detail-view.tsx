'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/ui/status-badge';
import { useCustomer, useCustomerTransactions, useRegistrationTerms } from '@/app/agent/_lib/hooks/use-customers';
import { usePaymentAccount } from '@/app/agent/_lib/hooks/use-payments';
import { KycStatus, PaymentTransactionStatus } from '@/app/agent/_lib/types';
import { GeneratePaymentAccountDialog } from './generate-payment-account-dialog';

function kycTone(status: KycStatus) {
  if (status === 'VERIFIED') return 'success' as const;
  if (status === 'FAILED') return 'destructive' as const;
  return 'warning' as const;
}

function transactionTone(status: PaymentTransactionStatus) {
  if (status === 'SUCCESS') return 'success' as const;
  if (status === 'FAILED') return 'destructive' as const;
  return 'warning' as const;
}

function formatNaira(kobo: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}

export function CustomerDetailView({ customerUuid }: { customerUuid: string }) {
  const { data: customer, isLoading, isError } = useCustomer(customerUuid);
  const registrationTerms = useRegistrationTerms();
  const paymentAccount = usePaymentAccount(customerUuid);
  const transactions = useCustomerTransactions(customerUuid);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !customer) {
    return <p className="text-sm text-destructive">Could not load this customer.</p>;
  }

  return (
    <div>
      <Link
        href="/agent/customers"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Back to customers
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">{customer.full_name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{customer.phone_number}</p>
        </div>
        <StatusBadge tone={kycTone(customer.kyc_status)}>{customer.kyc_status}</StatusBadge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-ink">
            <p>
              Verified with:{' '}
              {customer.verified_identifier === 'BVN'
                ? `BVN *****${customer.bvn_last4 ?? ''}`
                : customer.verified_identifier === 'NIN'
                  ? `NIN *****${customer.nin_last4 ?? ''}`
                  : '—'}
            </p>
            <p>Email: {customer.email ?? '—'}</p>
            <p>Address: {customer.address ?? '—'}</p>
            <p>
              State / LGA: {customer.state ?? '—'} / {customer.lga ?? '—'}
            </p>
            <p>
              Date of birth:{' '}
              {customer.date_of_birth ? new Date(customer.date_of_birth).toLocaleDateString() : '—'}
            </p>
            <p>Gender: {customer.gender ?? '—'}</p>
            <p>Registered: {new Date(customer.created_at).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stove</CardTitle>
          </CardHeader>
          <CardContent>
            {customer.stove_unit ? (
              <div className="space-y-1 text-sm text-ink">
                <p className="font-medium">{customer.stove_unit.model.name}</p>
                <p className="text-muted-foreground">Serial: {customer.stove_unit.serial_number}</p>
                <StatusBadge tone="success">{customer.stove_unit.status}</StatusBadge>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No stove assignment record is available.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Delivery evidence</CardTitle>
        </CardHeader>
        <CardContent>
          {customer.stove_unit?.customer_photo_url || customer.stove_unit?.stove_photo_url ? (
            <div className="grid grid-cols-2 gap-3">
              {customer.stove_unit?.customer_photo_url ? (
                <figure>
                  <img
                    src={customer.stove_unit.customer_photo_url}
                    alt="Customer photo"
                    className="aspect-[3/4] w-full rounded-lg border border-border object-cover"
                  />
                  <figcaption className="mt-1 text-xs text-muted-foreground">Customer photo</figcaption>
                </figure>
              ) : null}
              {customer.stove_unit?.stove_photo_url ? (
                <figure>
                  <img
                    src={customer.stove_unit.stove_photo_url}
                    alt="Stove photo"
                    className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
                  />
                  <figcaption className="mt-1 text-xs text-muted-foreground">Stove photo</figcaption>
                </figure>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No delivery evidence recorded.</p>
          )}
          {customer.stove_unit?.installation_latitude != null &&
          customer.stove_unit?.installation_longitude != null ? (
            <p className="mt-3 text-sm text-muted-foreground">
              GPS:{' '}
              {customer.stove_unit.installation_latitude.toFixed(5)},{' '}
              {customer.stove_unit.installation_longitude.toFixed(5)}
              {customer.stove_unit.installation_captured_at
                ? ` · ${new Date(customer.stove_unit.installation_captured_at).toLocaleString()}`
                : ''}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Signed carbon ownership agreement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {registrationTerms.data ? (
            <p className="text-sm leading-6 text-ink">{registrationTerms.data.text}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Agreement text unavailable.</p>
          )}
          {customer.signature_image_url ? (
            <div>
              <img
                src={customer.signature_image_url}
                alt="Customer signature"
                className="h-20 rounded-lg border border-border bg-surface object-contain px-3"
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No signature recorded.</p>
          )}
          <p className="text-xs text-muted-foreground">
            {customer.terms_version ? `Version: ${customer.terms_version}` : ''}
            {customer.terms_accepted_at
              ? ` · Accepted: ${new Date(customer.terms_accepted_at).toLocaleString()}`
              : ''}
          </p>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Payment account</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentAccount.isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : paymentAccount.data ? (
            <div className="space-y-1 text-sm text-ink">
              <p className="font-medium">{paymentAccount.data.account_number}</p>
              <p className="text-muted-foreground">
                {paymentAccount.data.account_name} · {paymentAccount.data.bank_name}
              </p>
              <StatusBadge tone={paymentAccount.data.status === 'ACTIVE' ? 'success' : 'neutral'}>
                {paymentAccount.data.status}
              </StatusBadge>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No payment account yet — the customer can pay whenever it&apos;s generated.
              </p>
              <GeneratePaymentAccountDialog
                customerUuid={customer.customer_uuid}
                trigger={
                  <Button variant="secondary" size="sm">
                    Generate payment account
                  </Button>
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : transactions.data && transactions.data.items.length > 0 ? (
            <div className="divide-y divide-border">
              {transactions.data.items.map((transaction) => (
                <div
                  key={transaction.payment_transaction_uuid}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{formatNaira(transaction.amount_kobo)}</p>
                    <p className="text-muted-foreground">
                      {transaction.paid_at ? new Date(transaction.paid_at).toLocaleString() : '—'}
                    </p>
                  </div>
                  <StatusBadge tone={transactionTone(transaction.status)}>{transaction.status}</StatusBadge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
