'use client';

import { ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCustomer } from '@/app/agent/_lib/hooks/use-customers';
import { useNinLookup } from '@/app/agent/_lib/hooks/use-kyc';
import { useCreatePaymentAccount } from '@/app/agent/_lib/hooks/use-payments';
import { useAssignStoveUnit, useAvailableStoveUnits, useStoveModels } from '@/app/agent/_lib/hooks/use-stoves';
import { createCustomerSchema } from '@/app/agent/_lib/schemas/customer.schema';

type Step = 1 | 2 | 3;
type Gender = '' | 'male' | 'female' | 'other';

const INITIAL_DRAFT = {
  nin: '',
  full_name: '',
  phone_number: '',
  email: '',
  address: '',
  state: '',
  lga: '',
  date_of_birth: '',
  gender: '' as Gender,
  stove_model_uuid: '',
  stove_unit_uuid: '',
  generate_payment_account: false,
};

export function RegisterCustomerDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState(INITIAL_DRAFT);
  const [ninError, setNinError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ninLookup = useNinLookup();
  const createCustomer = useCreateCustomer();
  const assignStove = useAssignStoveUnit();
  const createPaymentAccount = useCreatePaymentAccount();

  const stoveModels = useStoveModels();
  const availableUnits = useAvailableStoveUnits(draft.stove_model_uuid || undefined);

  const resetAndClose = () => {
    setOpen(false);
    setStep(1);
    setDraft(INITIAL_DRAFT);
    setNinError(null);
    setVerified(false);
    setSubmitError(null);
  };

  const handleVerify = async () => {
    setNinError(null);

    if (!/^\d{11}$/.test(draft.nin)) {
      setNinError('NIN must be exactly 11 digits');
      return;
    }

    const result = await ninLookup.mutateAsync(draft.nin);

    if (!result.success) {
      setNinError(result.error.message);
      return;
    }

    setDraft((prev) => ({
      ...prev,
      full_name: result.data.full_name,
      date_of_birth: result.data.date_of_birth?.slice(0, 10) ?? prev.date_of_birth,
      gender: ((result.data.gender?.toLowerCase() as Gender) || prev.gender) ?? prev.gender,
      phone_number: result.data.phone_number ?? prev.phone_number,
    }));
    setVerified(true);
    setStep(2);
  };

  const handleSkipVerification = () => {
    setVerified(false);
    setStep(2);
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    const parsed = createCustomerSchema.safeParse(draft);
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? 'Check the form and try again');
      return;
    }

    const customerResult = await createCustomer.mutateAsync(parsed.data);

    if (!customerResult.success) {
      setSubmitError(customerResult.error.message);
      return;
    }

    toast.success('Customer registered');
    const customerUuid = customerResult.data.customer_uuid;

    if (draft.stove_unit_uuid) {
      const assignResult = await assignStove.mutateAsync({
        stoveUnitUuid: draft.stove_unit_uuid,
        customerUuid,
      });

      if (assignResult.success) {
        toast.success('Stove assigned');
      } else {
        toast.error(`Stove assignment failed: ${assignResult.error.message}. Retry from the customer's page.`);
      }
    }

    if (draft.generate_payment_account) {
      const paymentResult = await createPaymentAccount.mutateAsync(customerUuid);

      if (paymentResult.success) {
        toast.success('Payment account generated');
      } else {
        toast.error(`Payment account failed: ${paymentResult.error.message}. Retry from the customer's page.`);
      }
    }

    resetAndClose();
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? setOpen(true) : resetAndClose())}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Register a customer</DialogTitle>
          <DialogDescription>Step {step} of 3</DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="nin">Customer NIN</Label>
              <Input
                id="nin"
                inputMode="numeric"
                maxLength={11}
                value={draft.nin}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, nin: event.target.value.replace(/\D/g, '') }))
                }
                placeholder="11-digit National ID Number"
              />
            </div>
            {ninError ? (
              <div className="space-y-2">
                <p role="alert" className="text-sm text-destructive">
                  {ninError}
                </p>
                <Button type="button" variant="secondary" size="sm" onClick={handleSkipVerification}>
                  Save without verification (retry later)
                </Button>
              </div>
            ) : null}
            <div className="flex justify-end">
              <Button type="button" onClick={handleVerify} isLoading={ninLookup.isPending}>
                Verify identity
              </Button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            {verified ? (
              <p className="rounded-lg bg-success-surface px-3 py-2 text-sm text-success">
                Identity verified — confirm the details below.
              </p>
            ) : (
              <p className="rounded-lg bg-warning-surface px-3 py-2 text-sm text-warning">
                Registering without verification — KYC status will show as pending.
              </p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  value={draft.full_name}
                  onChange={(event) => setDraft((prev) => ({ ...prev, full_name: event.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone_number">Phone number</Label>
                <Input
                  id="phone_number"
                  value={draft.phone_number}
                  onChange={(event) => setDraft((prev) => ({ ...prev, phone_number: event.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={draft.email}
                  onChange={(event) => setDraft((prev) => ({ ...prev, email: event.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="date_of_birth">Date of birth (optional)</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={draft.date_of_birth}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, date_of_birth: event.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender (optional)</Label>
                <select
                  id="gender"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                  value={draft.gender}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, gender: event.target.value as Gender }))
                  }
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address (optional)</Label>
                <Input
                  id="address"
                  value={draft.address}
                  onChange={(event) => setDraft((prev) => ({ ...prev, address: event.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="state">State (optional)</Label>
                <Input
                  id="state"
                  value={draft.state}
                  onChange={(event) => setDraft((prev) => ({ ...prev, state: event.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="lga">LGA (optional)</Label>
                <Input
                  id="lga"
                  value={draft.lga}
                  onChange={(event) => setDraft((prev) => ({ ...prev, lga: event.target.value }))}
                />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-ink">Stove (optional)</p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stove_model">Model</Label>
                  <select
                    id="stove_model"
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                    value={draft.stove_model_uuid}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        stove_model_uuid: event.target.value,
                        stove_unit_uuid: '',
                      }))
                    }
                  >
                    <option value="">None</option>
                    {stoveModels.data?.map((model) => (
                      <option key={model.stove_model_uuid} value={model.stove_model_uuid}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="stove_unit">Unit (serial number)</Label>
                  <select
                    id="stove_unit"
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm disabled:opacity-50"
                    disabled={!draft.stove_model_uuid}
                    value={draft.stove_unit_uuid}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, stove_unit_uuid: event.target.value }))
                    }
                  >
                    <option value="">Select a unit</option>
                    {availableUnits.data?.map((unit) => (
                      <option key={unit.stove_unit_uuid} value={unit.stove_unit_uuid}>
                        {unit.serial_number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setStep(3)}
                disabled={!draft.full_name || !draft.phone_number}
              >
                Continue
              </Button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <label className="flex items-center gap-3 rounded-lg border border-border p-3">
              <input
                type="checkbox"
                checked={draft.generate_payment_account}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, generate_payment_account: event.target.checked }))
                }
                className="size-4"
              />
              <span className="text-sm text-ink">
                Generate a payment account now, so the customer can pay immediately.
                <span className="block text-muted-foreground">
                  You can also do this later from the customer&apos;s page.
                </span>
              </span>
            </label>

            {submitError ? (
              <p role="alert" className="text-sm text-destructive">
                {submitError}
              </p>
            ) : null}

            <div className="flex justify-between pt-2">
              <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                isLoading={
                  createCustomer.isPending || assignStove.isPending || createPaymentAccount.isPending
                }
              >
                Register customer
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
