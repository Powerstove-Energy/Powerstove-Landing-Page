'use client';

import { ReactNode, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCustomer, useRegistrationTerms } from '@/app/agent/_lib/hooks/use-customers';
import { useBvnLookup, useNinLookup } from '@/app/agent/_lib/hooks/use-kyc';
import { useCreatePaymentAccount } from '@/app/agent/_lib/hooks/use-payments';
import { useAvailableStoveUnits, useStoveModels } from '@/app/agent/_lib/hooks/use-stoves';
import { createCustomerSchema } from '@/app/agent/_lib/schemas/customer.schema';
import { uploadRegistrationAsset } from '@/app/agent/_lib/upload-registration-asset';
import { SignaturePad, SignaturePadHandle } from './signature-pad';

type Step = 1 | 2 | 3 | 4;
type Gender = '' | 'male' | 'female' | 'other';

interface RegistrationDraft {
  registration_reference: string;
  nin: string;
  bvn: string;
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  state: string;
  lga: string;
  date_of_birth: string;
  gender: Gender;
  stove_model_uuid: string;
  stove_unit_uuid: string;
  customer_photo: File | null;
  stove_photo: File | null;
  gps: { latitude: number; longitude: number } | null;
  generate_payment_account: boolean;
  accepted_terms: boolean;
}

function initialDraft(): RegistrationDraft {
  return {
    registration_reference: '', nin: '', bvn: '', full_name: '', phone_number: '', email: '',
    address: '', state: '', lga: '', date_of_birth: '', gender: '', stove_model_uuid: '',
    stove_unit_uuid: '', customer_photo: null, stove_photo: null, gps: null,
    generate_payment_account: false, accepted_terms: false,
  };
}

function isGender(value: string): value is Exclude<Gender, ''> {
  return value === 'male' || value === 'female' || value === 'other';
}

function messageFor(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function RegisterCustomerDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<RegistrationDraft>(initialDraft);
  const [ninError, setNinError] = useState<string | null>(null);
  const [bvnMessage, setBvnMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const signatureRef = useRef<SignaturePadHandle>(null);

  const ninLookup = useNinLookup();
  const bvnLookup = useBvnLookup();
  const createCustomer = useCreateCustomer();
  const createPaymentAccount = useCreatePaymentAccount();
  const registrationTerms = useRegistrationTerms();
  const stoveModels = useStoveModels();
  const availableUnits = useAvailableStoveUnits(draft.stove_model_uuid || undefined);

  const resetAndClose = () => {
    setOpen(false); setStep(1); setDraft(initialDraft()); setNinError(null); setBvnMessage(null);
    setSubmitError(null); setVerified(false); setHasSignature(false);
  };

  const openDialog = () => {
    setDraft((current) => ({ ...current, registration_reference: globalThis.crypto.randomUUID() }));
    setOpen(true);
  };

  const verifyIdentity = async () => {
    setNinError(null); setVerified(false); setBvnMessage(null);
    const hasNin = /^\d{11}$/.test(draft.nin);
    const hasBvn = /^\d{11}$/.test(draft.bvn);
    if (!hasNin && !hasBvn) { setNinError('Enter a valid NIN or BVN to verify this customer'); return; }
    const applyIdentity = (data: { full_name: string; date_of_birth: string; gender: string; phone_number?: string }) => {
      const resultGender = data.gender.toLowerCase();
      setDraft((current) => ({
        ...current,
        full_name: data.full_name,
        date_of_birth: data.date_of_birth.slice(0, 10),
        gender: isGender(resultGender) ? resultGender : current.gender,
        phone_number: data.phone_number ?? current.phone_number,
      }));
    };
    if (hasNin) {
      const result = await ninLookup.mutateAsync(draft.nin);
      if (!result.success) { setNinError(result.error.message); return; }
      applyIdentity(result.data);
    } else {
      const result = await bvnLookup.mutateAsync(draft.bvn);
      if (!result.success) { setNinError(result.error.message); return; }
      setBvnMessage(`Verified with BVN for ${result.data.full_name}`);
      applyIdentity(result.data);
    }
    setVerified(true); setStep(2);
  };

  const continueFromDetails = () => {
    if (!draft.full_name || !draft.phone_number || !draft.address || !draft.state || !draft.lga || !draft.gender || !draft.stove_unit_uuid) {
      setSubmitError('Complete the required customer and stove details before continuing.');
      return;
    }
    setSubmitError(null); setStep(3);
  };

  const captureLocation = () => {
    if (!navigator.geolocation) { setSubmitError('This browser does not support location capture.'); return; }
    setSubmitError(null); setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setDraft((current) => ({ ...current, gps: { latitude: coords.latitude, longitude: coords.longitude } }));
        setIsLocating(false);
      },
      () => { setSubmitError('Location could not be captured. Allow location access and try again.'); setIsLocating(false); },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  const submit = async () => {
    setSubmitError(null);
    if (!draft.customer_photo || !draft.stove_photo || !draft.gps || !draft.accepted_terms) {
      setSubmitError('Customer photo, stove photo, GPS location, and consent are all required.'); return;
    }
    if (!registrationTerms.data || registrationTerms.isError) {
      setSubmitError('The registration consent could not be loaded. Refresh and try again.'); return;
    }
    try {
      setIsUploading(true);
      const signatureFile = await signatureRef.current?.toFile();
      if (!signatureFile) throw new Error('Customer signature is required');
      const [customer_photo, stove_photo, signature] = await Promise.all([
        uploadRegistrationAsset(draft.customer_photo, 'customer_photo', draft.registration_reference),
        uploadRegistrationAsset(draft.stove_photo, 'stove_photo', draft.registration_reference),
        uploadRegistrationAsset(signatureFile, 'signature', draft.registration_reference),
      ]);
      const parsed = createCustomerSchema.safeParse({
        ...draft, customer_photo, stove_photo, gps: draft.gps, signature,
        terms_version: registrationTerms.data.version,
      });
      if (!parsed.success) { setSubmitError(parsed.error.issues[0]?.message ?? 'Check the form and try again.'); return; }
      setIsUploading(false);
      const customerResult = await createCustomer.mutateAsync(parsed.data);
      if (!customerResult.success) { setSubmitError(customerResult.error.message); return; }
      toast.success('Customer registered and stove assigned');
      if (draft.generate_payment_account) {
        const paymentResult = await createPaymentAccount.mutateAsync(customerResult.data.customer_uuid);
        paymentResult.success ? toast.success('Payment account generated') : toast.error(`Payment account failed: ${paymentResult.error.message}`);
      }
      resetAndClose();
    } catch (error) {
      setSubmitError(messageFor(error, 'Registration could not be completed. Please try again.'));
    } finally { setIsUploading(false); }
  };

  const isSaving = isUploading || createCustomer.isPending || createPaymentAccount.isPending;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? openDialog() : resetAndClose())}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Register a customer</DialogTitle><DialogDescription>Step {step} of 4</DialogDescription></DialogHeader>
        {step === 1 ? <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Verify the customer with either their NIN or BVN. Enter at least one.</p>
          <div><Label htmlFor="nin">Customer NIN (or BVN)</Label><Input id="nin" inputMode="numeric" maxLength={11} value={draft.nin} onChange={(event) => setDraft((current) => ({ ...current, nin: event.target.value.replace(/\D/g, '') }))} placeholder="11-digit National ID Number" /></div>
          <div><Label htmlFor="bvn">Customer BVN (or NIN)</Label><Input id="bvn" inputMode="numeric" maxLength={11} value={draft.bvn} onChange={(event) => setDraft((current) => ({ ...current, bvn: event.target.value.replace(/\D/g, '') }))} placeholder="11-digit Bank Verification Number" /></div>
          {bvnMessage ? <p className="text-sm text-success">{bvnMessage}</p> : null}
          {ninError ? <p role="alert" className="text-sm text-destructive">{ninError}</p> : null}
          <div className="flex justify-end"><Button type="button" onClick={verifyIdentity} isLoading={ninLookup.isPending || bvnLookup.isPending}>Verify identity</Button></div>
        </div> : null}
        {step === 2 ? <div className="space-y-4">
          {verified ? <p className="rounded-lg bg-success-surface px-3 py-2 text-sm text-success">Identity verified — confirm the details and select the stove being delivered.</p> : null}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><Label htmlFor="full_name">Full name</Label><Input id="full_name" value={draft.full_name} onChange={(event) => setDraft((current) => ({ ...current, full_name: event.target.value }))} /></div>
            <div><Label htmlFor="phone_number">Phone number</Label><Input id="phone_number" value={draft.phone_number} onChange={(event) => setDraft((current) => ({ ...current, phone_number: event.target.value }))} /></div>
            <div><Label htmlFor="email">Email (optional)</Label><Input id="email" type="email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} /></div>
            <div><Label htmlFor="date_of_birth">Date of birth (optional)</Label><Input id="date_of_birth" type="date" value={draft.date_of_birth} onChange={(event) => setDraft((current) => ({ ...current, date_of_birth: event.target.value }))} /></div>
            <div><Label htmlFor="gender">Gender</Label><select id="gender" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" value={draft.gender} onChange={(event) => setDraft((current) => ({ ...current, gender: event.target.value as Gender }))}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
            <div className="col-span-2"><Label htmlFor="address">Address</Label><Input id="address" value={draft.address} onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))} /></div>
            <div><Label htmlFor="state">State</Label><Input id="state" value={draft.state} onChange={(event) => setDraft((current) => ({ ...current, state: event.target.value }))} /></div>
            <div><Label htmlFor="lga">LGA</Label><Input id="lga" value={draft.lga} onChange={(event) => setDraft((current) => ({ ...current, lga: event.target.value }))} /></div>
          </div>
          <div className="border-t border-border pt-4"><p className="text-sm font-medium text-ink">Delivered stove</p><div className="mt-2 grid grid-cols-2 gap-4"><div><Label htmlFor="stove_model">Model</Label><select id="stove_model" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" value={draft.stove_model_uuid} onChange={(event) => setDraft((current) => ({ ...current, stove_model_uuid: event.target.value, stove_unit_uuid: '' }))}><option value="">Select a model</option>{stoveModels.data?.map((model) => <option key={model.stove_model_uuid} value={model.stove_model_uuid}>{model.name}</option>)}</select></div><div><Label htmlFor="stove_unit">Unit serial number</Label><select id="stove_unit" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm disabled:opacity-50" disabled={!draft.stove_model_uuid} value={draft.stove_unit_uuid} onChange={(event) => setDraft((current) => ({ ...current, stove_unit_uuid: event.target.value }))}><option value="">Select a unit</option>{availableUnits.data?.map((unit) => <option key={unit.stove_unit_uuid} value={unit.stove_unit_uuid}>{unit.serial_number}</option>)}</select></div></div></div>
          {submitError ? <p role="alert" className="text-sm text-destructive">{submitError}</p> : null}
          <div className="flex justify-between"><Button type="button" variant="secondary" onClick={() => setStep(1)}>Back</Button><Button type="button" onClick={continueFromDetails}>Continue</Button></div>
        </div> : null}
        {step === 3 ? <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Capture delivery evidence at the customer&apos;s location.</p>
          <div><Label htmlFor="customer_photo">Customer photo</Label><Input id="customer_photo" type="file" accept="image/jpeg,image/png,image/heic,image/heif" capture="user" onChange={(event) => setDraft((current) => ({ ...current, customer_photo: event.target.files?.[0] ?? null }))} />{draft.customer_photo ? <p className="mt-1 text-xs text-muted-foreground">{draft.customer_photo.name}</p> : null}</div>
          <div><Label htmlFor="stove_photo">Stove photo</Label><Input id="stove_photo" type="file" accept="image/jpeg,image/png,image/heic,image/heif" capture="environment" onChange={(event) => setDraft((current) => ({ ...current, stove_photo: event.target.files?.[0] ?? null }))} />{draft.stove_photo ? <p className="mt-1 text-xs text-muted-foreground">{draft.stove_photo.name}</p> : null}</div>
          <div className="rounded-lg border border-border p-3"><p className="text-sm font-medium text-ink">Installation GPS location</p><p className="mt-1 text-xs text-muted-foreground">Location is captured from this device when the stove is delivered.</p><div className="mt-3 flex items-center gap-3"><Button type="button" variant="secondary" onClick={captureLocation} isLoading={isLocating}>Capture location</Button>{draft.gps ? <span className="text-xs text-success">Location captured</span> : null}</div></div>
          {submitError ? <p role="alert" className="text-sm text-destructive">{submitError}</p> : null}
          <div className="flex justify-between"><Button type="button" variant="secondary" onClick={() => setStep(2)}>Back</Button><Button type="button" disabled={!draft.customer_photo || !draft.stove_photo || !draft.gps} onClick={() => { setSubmitError(null); setStep(4); }}>Continue</Button></div>
        </div> : null}
        {step === 4 ? <div className="space-y-4">
          <div className="rounded-lg border border-border bg-surface p-4"><p className="text-sm font-semibold text-ink">Customer consent</p>{registrationTerms.isLoading ? <p className="mt-2 text-sm text-muted-foreground">Loading consent…</p> : registrationTerms.data ? <p className="mt-2 text-sm leading-6 text-ink">{registrationTerms.data.text}</p> : <p role="alert" className="mt-2 text-sm text-destructive">The consent could not be loaded.</p>}</div>
          <SignaturePad ref={signatureRef} onChange={setHasSignature} />
          <label className="flex items-start gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={draft.accepted_terms} onChange={(event) => setDraft((current) => ({ ...current, accepted_terms: event.target.checked }))} className="mt-0.5 size-4" /><span className="text-sm text-ink">The customer has read and accepted this consent before signing.</span></label>
          <label className="flex items-start gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={draft.generate_payment_account} onChange={(event) => setDraft((current) => ({ ...current, generate_payment_account: event.target.checked }))} className="mt-0.5 size-4" /><span className="text-sm text-ink">Generate a payment account now.<span className="block text-muted-foreground">This is optional and can also be done later.</span></span></label>
          {submitError ? <p role="alert" className="text-sm text-destructive">{submitError}</p> : null}
          <div className="flex justify-between"><Button type="button" variant="secondary" onClick={() => setStep(3)} disabled={isSaving}>Back</Button><Button type="button" onClick={submit} disabled={!draft.accepted_terms || !hasSignature || registrationTerms.isLoading || registrationTerms.isError} isLoading={isSaving}>Register customer</Button></div>
        </div> : null}
      </DialogContent>
    </Dialog>
  );
}
