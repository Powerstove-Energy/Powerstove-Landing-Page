'use client';

import { ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useCreatePaymentAccount } from '@/app/agent/_lib/hooks/use-payments';
import { PaymentMethod } from '@/app/agent/_lib/types';

const PAYMENT_METHODS: Array<{ value: PaymentMethod; label: string }> = [
  { value: 'paystack', label: 'Paystack — dedicated bank account' },
  { value: 'embedly', label: 'Embedly (Sterling) — static account' },
  { value: 'cash', label: 'Cash — collected in person' },
];

export function GeneratePaymentAccountDialog({
  customerUuid,
  trigger,
}: {
  customerUuid: string;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paystack');
  const createPaymentAccount = useCreatePaymentAccount();

  const handleConfirm = async () => {
    setError(null);
    const result = await createPaymentAccount.mutateAsync({ customerUuid, paymentMethod });

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    toast.success('Payment account generated');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a payment account</DialogTitle>
          <DialogDescription>
            Choose how this customer pays. Paystack and Embedly issue a dedicated account
            number the customer can pay into at any time. Cash is collected in the field and
            recorded here. This is optional — you can do it later.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <Label htmlFor="payment_method">Payment method</Label>
          <select
            id="payment_method"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
            disabled={createPaymentAccount.isPending}
          >
            {PAYMENT_METHODS.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={createPaymentAccount.isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} isLoading={createPaymentAccount.isPending}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
