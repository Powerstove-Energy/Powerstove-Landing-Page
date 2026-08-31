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
import { useCreatePaymentAccount } from '@/app/agent/_lib/hooks/use-payments';

export function GeneratePaymentAccountDialog({
  customerUuid,
  trigger,
}: {
  customerUuid: string;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createPaymentAccount = useCreatePaymentAccount();

  const handleConfirm = async () => {
    setError(null);
    const result = await createPaymentAccount.mutateAsync(customerUuid);

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
            This creates a dedicated bank account number the customer can pay into at any time.
            This is optional — only do this if the customer is ready to pay now or wants a
            reusable account for later.
          </DialogDescription>
        </DialogHeader>
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
