'use client';

import { Check } from 'lucide-react';
import { ReactNode, useDeferredValue, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateCustomer, useRegistrationTerms } from '@/app/agent/_lib/hooks/use-customers';
import { useBvnLookup, useNinLookup } from '@/app/agent/_lib/hooks/use-kyc';
import { useStateLocations } from '@/app/agent/_lib/hooks/use-locations';
import { useCreatePaymentAccount } from '@/app/agent/_lib/hooks/use-payments';
import { useInStockSerialSearch, useNextSerial, useStoveModels } from '@/app/agent/_lib/hooks/use-stoves';
import { createCustomerSchema, customerDetailsSchema } from '@/app/agent/_lib/schemas/customer.schema';
import { matchPlace, matchState, NIGERIAN_STATES } from '@/app/agent/_lib/nigerian-states';
import { PAYMENT_METHOD_OPTIONS, PaymentMethod } from '@/app/agent/_lib/types';
import { uploadRegistrationAsset } from '@/app/agent/_lib/upload-registration-asset';
import { SignaturePad, SignaturePadHandle } from './signature-pad';

type Step = 1 | 2 | 3 | 4;
type Gender = '' | 'male' | 'female' | 'other';
type HouseholdGroup = 'household_children_0_14' | 'household_females_15_plus' | 'household_males_15_59' | 'household_males_60_plus';
type PhotoKey = 'id_photo' | 'baseline_stove_photo' | 'customer_photo';

/** The standard adult-equivalent age groups. */
const HOUSEHOLD_GROUPS: Array<{ key: HouseholdGroup; label: string }> = [
  { key: 'household_children_0_14', label: 'Children (0–14)' },
  { key: 'household_females_15_plus', label: 'Females (15 and over)' },
  { key: 'household_males_15_59', label: 'Males (15–59)' },
  { key: 'household_males_60_plus', label: 'Males (60 and over)' },
];

const PHOTOS: Array<{ key: PhotoKey; label: string; hint: string }> = [
  { key: 'id_photo', label: 'Government ID photo', hint: 'The ID card the customer showed you, with the details readable.' },
  { key: 'baseline_stove_photo', label: 'Old (baseline) stove photo', hint: 'The stove or fire the household cooked on before this one.' },
  { key: 'customer_photo', label: 'Customer with the new stove', hint: 'The customer standing next to the new stove at their home.' },
];

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
  ward: string;
  date_of_birth: string;
  gender: Gender;
  // Kept as typed so an empty box stays empty; converted to numbers when checked.
  household_children_0_14: string;
  household_females_15_plus: string;
  household_males_15_59: string;
  household_males_60_plus: string;
  stove_model_uuid: string;
  serial_number: string;
  id_photo: File | null;
  baseline_stove_photo: File | null;
  customer_photo: File | null;
  gps: { latitude: number; longitude: number } | null;
  generate_payment_account: boolean;
  payment_method: PaymentMethod;
  accepted_terms: boolean;
}

function initialDraft(): RegistrationDraft {
  return {
    registration_reference: '', nin: '', bvn: '', full_name: '', phone_number: '', email: '',
    address: '', state: '', lga: '', ward: '', date_of_birth: '', gender: '',
    household_children_0_14: '', household_females_15_plus: '', household_males_15_59: '', household_males_60_plus: '',
    stove_model_uuid: '', serial_number: '', id_photo: null, baseline_stove_photo: null, customer_photo: null, gps: null,
    generate_payment_account: false, payment_method: 'paystack', accepted_terms: false,
  };
}

/**
 * The draft as the schema expects it: a typed state in its stored spelling, and household
 * counts as numbers (NaN when blank, which the schema rejects).
 */
function withHouseholdCounts(draft: RegistrationDraft) {
  const count = (value: string) => (value.trim() === '' ? Number.NaN : Number(value));
  return {
    ...draft,
    state: matchState(draft.state) ?? draft.state,
    household_children_0_14: count(draft.household_children_0_14),
    household_females_15_plus: count(draft.household_females_15_plus),
    household_males_15_59: count(draft.household_males_15_59),
    household_males_60_plus: count(draft.household_males_60_plus),
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
  const [completed, setCompleted] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [assignedSerial, setAssignedSerial] = useState('');
  const signatureRef = useRef<SignaturePadHandle>(null);

  const ninLookup = useNinLookup();
  const bvnLookup = useBvnLookup();
  const createCustomer = useCreateCustomer();
  const createPaymentAccount = useCreatePaymentAccount();
  const registrationTerms = useRegistrationTerms();
  const stoveModels = useStoveModels();
  const inStockUnits = useInStockSerialSearch(useDeferredValue(draft.serial_number.trim()));
  const nextSerial = useNextSerial(open && step === 2);
  // Agents can type any LGA or ward; the list only suggests. Suggestions need a recognised state.
  const knownState = matchState(draft.state);
  const locations = useStateLocations(knownState ?? '');
  const lgaNames = locations.data?.lgas.map((lga) => lga.name) ?? [];
  const knownLga = matchPlace(lgaNames, draft.lga);
  const lgaWards = locations.data?.lgas.find((lga) => lga.name === knownLga)?.wards ?? [];
  const knownWard = matchPlace(lgaWards, draft.ward);

  /** Typing a different state or LGA clears what was entered below it, which belonged to the old one. */
  const setPlace = (field: 'state' | 'lga' | 'ward', value: string) =>
    setDraft((current) => {
      const next = { ...current, [field]: value };
      if (field === 'state' && matchState(value) !== matchState(current.state)) return { ...next, lga: '', ward: '' };
      if (field === 'lga' && matchPlace(lgaNames, value) !== matchPlace(lgaNames, current.lga)) return { ...next, ward: '' };
      return next;
    });

  const resetAndClose = () => {
    setOpen(false); setStep(1); setDraft(initialDraft()); setNinError(null); setBvnMessage(null);
    setSubmitError(null); setVerified(false); setHasSignature(false); setCompleted(false); setAssignedSerial('');
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
    if ((draft.nin && !hasNin) || (draft.bvn && !hasBvn)) { setNinError('NIN and BVN must each be exactly 11 digits'); return; }
    const applyIdentity = (data: { full_name: string; date_of_birth: string; gender: string; phone_number?: string }) => {
      const resultGender = data.gender.toLowerCase();
      const dateOfBirth = data.date_of_birth.slice(0, 10);
      setDraft((current) => ({
        ...current,
        full_name: data.full_name,
        date_of_birth: /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) ? dateOfBirth : current.date_of_birth,
        gender: isGender(resultGender) ? resultGender : current.gender,
        phone_number: data.phone_number ? data.phone_number.replace(/[^\d+]/g, '') : current.phone_number,
      }));
    };
    try {
      // Every identifier entered is verified — an unchecked one would still be saved against this customer.
      const [ninResult, bvnResult] = await Promise.all([
        hasNin ? ninLookup.mutateAsync(draft.nin) : null,
        hasBvn ? bvnLookup.mutateAsync(draft.bvn) : null,
      ]);
      if (ninResult && !ninResult.success) { setNinError(`NIN: ${ninResult.error.message}`); return; }
      if (bvnResult && !bvnResult.success) { setNinError(`BVN: ${bvnResult.error.message}`); return; }
      if (bvnResult?.success) setBvnMessage(`Verified with BVN for ${bvnResult.data.full_name}`);
      const identity = ninResult?.success ? ninResult.data : bvnResult?.success ? bvnResult.data : null;
      if (identity) applyIdentity(identity);
    } catch (error) {
      setNinError(messageFor(error, 'Could not reach the verification service. Check your connection and try again.'));
      return;
    }
    setVerified(true); setStep(2);
  };

  const continueFromDetails = () => {
    const parsed = customerDetailsSchema.safeParse(withHouseholdCounts(draft));
    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? 'Complete the required customer and stove details before continuing.');
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
    if (!draft.id_photo || !draft.baseline_stove_photo || !draft.customer_photo || !draft.gps || !draft.accepted_terms) {
      setSubmitError('All three photos, the GPS location and the signed agreement are required.'); return;
    }
    if (!registrationTerms.data || registrationTerms.isError) {
      setSubmitError('The beneficiary agreement could not be loaded. Refresh and try again.'); return;
    }
    try {
      setIsUploading(true);
      const signatureFile = await signatureRef.current?.toFile();
      if (!signatureFile) throw new Error('Customer signature is required');
      const [id_photo, baseline_stove_photo, customer_photo, signature] = await Promise.all([
        uploadRegistrationAsset(draft.id_photo, 'id_photo', draft.registration_reference),
        uploadRegistrationAsset(draft.baseline_stove_photo, 'baseline_stove_photo', draft.registration_reference),
        uploadRegistrationAsset(draft.customer_photo, 'customer_photo', draft.registration_reference),
        uploadRegistrationAsset(signatureFile, 'signature', draft.registration_reference),
      ]);
      const parsed = createCustomerSchema.safeParse({
        ...withHouseholdCounts(draft), id_photo, baseline_stove_photo, customer_photo, gps: draft.gps, signature,
        terms_version: registrationTerms.data.version,
      });
      if (!parsed.success) { setSubmitError(parsed.error.issues[0]?.message ?? 'Check the form and try again.'); return; }
      setIsUploading(false);
      const customerResult = await createCustomer.mutateAsync(parsed.data);
      if (!customerResult.success) { setSubmitError(customerResult.error.message); return; }
      setAssignedSerial(customerResult.data.stove_unit?.serial_number ?? draft.serial_number.trim());
      toast.success('Customer registered and stove assigned');
      if (draft.generate_payment_account) {
        const paymentResult = await createPaymentAccount.mutateAsync({
          customerUuid: customerResult.data.customer_uuid,
          paymentMethod: draft.payment_method,
        });
        if (paymentResult.success) toast.success('Payment account generated');
        else toast.error(`Payment account failed: ${paymentResult.error.message}`);
      }
      setCompleted(true);
    } catch (error) {
      setSubmitError(messageFor(error, 'Registration could not be completed. Please try again.'));
    } finally { setIsUploading(false); }
  };

  const isSaving = isUploading || createCustomer.isPending || createPaymentAccount.isPending;

  const selectedModel = stoveModels.data?.find((m) => m.stove_model_uuid === draft.stove_model_uuid);
  const serialNumber = draft.serial_number.trim();
  // Exact match only — serial numbers are case-sensitive.
  const stockedUnit = inStockUnits.data?.find((u) => u.serial_number === serialNumber);
  const identityLabel = draft.nin ? `NIN *****${draft.nin.slice(-4)}` : draft.bvn ? `BVN *****${draft.bvn.slice(-4)}` : '—';
  const household = HOUSEHOLD_GROUPS.map(({ key }) => Number(draft[key]) || 0);
  const householdTotal = household.reduce((sum, count) => sum + count, 0);

  const summaryRows: Array<{ label: string; value: string }> = [
    { label: 'Full name', value: draft.full_name },
    { label: 'Phone', value: draft.phone_number },
    { label: 'Verified with', value: identityLabel },
    { label: 'Address', value: [draft.address, `${draft.ward} ward`, `${draft.lga} LGA`, draft.state].join(', ') },
    { label: 'Household', value: `${householdTotal} ${householdTotal === 1 ? 'person' : 'people'}: ${household[0]} children, ${household[1]} females, ${household[2]} males 15–59, ${household[3]} males 60+` },
    { label: 'Stove', value: `${selectedModel?.name ?? ''} · ${serialNumber || `next number${nextSerial.data ? ` (${nextSerial.data.serial_number})` : ''}`}` },
    { label: 'Evidence', value: [...PHOTOS.filter(({ key }) => draft[key]).map(({ label }) => label), ...(draft.gps ? ['GPS'] : [])].join(', ') },
  ];

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? openDialog() : resetAndClose())}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Register a customer</DialogTitle><DialogDescription>Step {step} of 4</DialogDescription>
          <div className="mt-2 flex items-center gap-1">
            {['Identity', 'Details & stove', 'Evidence', 'Confirm'].map((label, index) => {
              const n = index + 1;
              const active = n === step;
              const done = n < step;
              return (
                <div key={label} className="flex flex-1 flex-col gap-1">
                  <div className={`h-1 rounded-full ${done ? 'bg-success' : active ? 'bg-ink' : 'bg-border'}`} />
                  <span className={`text-[10px] ${active || done ? 'text-ink' : 'text-muted-foreground'}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </DialogHeader>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><Label htmlFor="full_name">Full name</Label><Input id="full_name" value={draft.full_name} onChange={(event) => setDraft((current) => ({ ...current, full_name: event.target.value }))} /></div>
            <div><Label htmlFor="phone_number">Phone number</Label><Input id="phone_number" type="tel" inputMode="tel" value={draft.phone_number} onChange={(event) => setDraft((current) => ({ ...current, phone_number: event.target.value }))} /></div>
            <div><Label htmlFor="email">Email (optional)</Label><Input id="email" type="email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} /></div>
            <div><Label htmlFor="date_of_birth">Date of birth (optional)</Label><Input id="date_of_birth" type="date" value={draft.date_of_birth} onChange={(event) => setDraft((current) => ({ ...current, date_of_birth: event.target.value }))} /></div>
            <div><Label htmlFor="gender">Gender</Label><select id="gender" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" value={draft.gender} onChange={(event) => setDraft((current) => ({ ...current, gender: event.target.value as Gender }))}><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></div>
            <div><Label htmlFor="state">State</Label><Input id="state" list="state_options" autoComplete="off" placeholder="Pick or type a state" value={draft.state} onChange={(event) => setPlace('state', event.target.value)} /><datalist id="state_options">{NIGERIAN_STATES.map((state) => <option key={state} value={state}>{state === 'FCT' ? 'FCT (Abuja)' : undefined}</option>)}</datalist>{draft.state.trim() && !knownState ? <p className="mt-1 text-xs text-destructive">Not a Nigerian state. Pick one from the list.</p> : null}</div>
            <div><Label htmlFor="lga">LGA</Label><Input id="lga" list="lga_options" autoComplete="off" placeholder={knownState && locations.isLoading ? 'Loading LGAs…' : 'Pick or type an LGA'} value={draft.lga} onChange={(event) => setPlace('lga', event.target.value)} /><datalist id="lga_options">{lgaNames.map((name) => <option key={name} value={name} />)}</datalist>{draft.lga.trim() && locations.data && !knownLga ? <p className="mt-1 text-xs text-muted-foreground">Not on the INEC list for {knownState}. It will be saved as typed.</p> : null}</div>
            <div><Label htmlFor="ward">Ward</Label><Input id="ward" list="ward_options" autoComplete="off" placeholder="Pick or type a ward" value={draft.ward} onChange={(event) => setPlace('ward', event.target.value)} /><datalist id="ward_options">{lgaWards.map((ward) => <option key={ward} value={ward} />)}</datalist>{draft.ward.trim() && knownLga && !knownWard ? <p className="mt-1 text-xs text-muted-foreground">Not on the INEC list for {knownLga}. It will be saved as typed.</p> : null}</div>
            <div><Label htmlFor="address">House, street or village</Label><Input id="address" value={draft.address} onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))} /></div>
            {locations.isError ? <p role="alert" className="text-sm text-muted-foreground sm:col-span-2">The LGA and ward suggestions could not be loaded. You can still type them.</p> : null}
          </div>
          <div className="border-t border-border pt-4"><p className="text-sm font-medium text-ink">Household members</p><p className="mt-1 text-xs text-muted-foreground">Everyone who lives in the household, including the customer. Enter 0 for a group with nobody in it.</p><div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">{HOUSEHOLD_GROUPS.map(({ key, label }) => <div key={key}><Label htmlFor={key}>{label}</Label><Input id={key} type="number" inputMode="numeric" min={0} max={50} step={1} value={draft[key]} onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value.replace(/\D/g, '') }))} /></div>)}</div><p className="mt-2 text-xs text-muted-foreground">Total: {householdTotal} {householdTotal === 1 ? 'person' : 'people'}</p></div>
          <div className="border-t border-border pt-4"><p className="text-sm font-medium text-ink">Delivered stove</p><div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2"><div><Label htmlFor="stove_model">Model</Label><select id="stove_model" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" value={draft.stove_model_uuid} onChange={(event) => setDraft((current) => ({ ...current, stove_model_uuid: event.target.value }))}><option value="">Select a model</option>{stoveModels.data?.map((model) => <option key={model.stove_model_uuid} value={model.stove_model_uuid}>{model.name}</option>)}</select></div><div><Label htmlFor="serial_number">Serial number (optional)</Label><Input id="serial_number" list="in_stock_serials" autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder={nextSerial.data ? `Leave empty for ${nextSerial.data.serial_number}` : 'Leave empty for the next number'} value={draft.serial_number} onChange={(event) => setDraft((current) => ({ ...current, serial_number: event.target.value }))} /><datalist id="in_stock_serials">{inStockUnits.data?.map((unit) => <option key={unit.stove_unit_uuid} value={unit.serial_number}>{unit.model.name}</option>)}</datalist></div></div><p className="mt-2 text-xs text-muted-foreground">{!serialNumber ? `Leave this empty and the stove gets the next Planethos number${nextSerial.data ? `, ${nextSerial.data.serial_number}` : ''}, when you register. Or pick a serial from stock or type the one on the stove.` : stockedUnit ? (stockedUnit.stove_model_uuid === draft.stove_model_uuid || !draft.stove_model_uuid ? `In stock as ${stockedUnit.model.name}.` : `In stock as ${stockedUnit.model.name} — it will be recorded as ${selectedModel?.name ?? 'the selected model'}.`) : 'Not in stock — this serial will be added to inventory when you register.'}</p></div>
          {submitError ? <p role="alert" className="text-sm text-destructive">{submitError}</p> : null}
          <div className="flex justify-between"><Button type="button" variant="secondary" onClick={() => setStep(1)}>Back</Button><Button type="button" onClick={continueFromDetails}>Continue</Button></div>
        </div> : null}
        {step === 3 ? <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Capture delivery evidence at the customer&apos;s home.</p>
          {PHOTOS.map(({ key, label, hint }) => {
            const file = draft[key];
            return <div key={key}><Label htmlFor={key}>{label}</Label><p className="mb-1 text-xs text-muted-foreground">{hint}</p><Input id={key} type="file" accept="image/jpeg,image/png,image/heic,image/heif" capture="environment" onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.files?.[0] ?? null }))} />{file ? <p className="mt-1 text-xs text-muted-foreground">{file.name}</p> : null}</div>;
          })}
          <div className="rounded-lg border border-border p-3"><p className="text-sm font-medium text-ink">Installation GPS location</p><p className="mt-1 text-xs text-muted-foreground">Location is captured from this device when the stove is delivered.</p><div className="mt-3 flex items-center gap-3"><Button type="button" variant="secondary" onClick={captureLocation} isLoading={isLocating}>Capture location</Button>{draft.gps ? <span className="text-xs text-success">Location captured</span> : null}</div></div>
          {submitError ? <p role="alert" className="text-sm text-destructive">{submitError}</p> : null}
          <div className="flex justify-between"><Button type="button" variant="secondary" onClick={() => setStep(2)}>Back</Button><Button type="button" disabled={PHOTOS.some(({ key }) => !draft[key]) || !draft.gps} onClick={() => { setSubmitError(null); setStep(4); }}>Continue</Button></div>
        </div> : null}
        {!completed && step === 4 ? <div className="space-y-4">
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-ink">Confirm &amp; sign</p>
            <p className="mt-1 text-sm text-muted-foreground">Review the registration, read the agreement to the customer, then have them sign.</p>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {summaryRows.map((row) => (
                <div key={row.label} className="flex flex-col">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{row.label}</dt>
                  <dd className="text-sm font-medium text-ink">{row.value || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-semibold text-ink">Beneficiary agreement</p>
            {registrationTerms.isLoading ? <p className="mt-2 text-sm text-muted-foreground">Loading the agreement…</p> : registrationTerms.data ? <div className="mt-2 max-h-72 overflow-y-auto whitespace-pre-line rounded-lg bg-surface p-3 text-sm leading-6 text-ink">{registrationTerms.data.text}</div> : <p role="alert" className="mt-2 text-sm text-destructive">The agreement could not be loaded.</p>}
            <div className="mt-4">
              <SignaturePad ref={signatureRef} onChange={setHasSignature} />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-border p-3"><input type="checkbox" checked={draft.accepted_terms} onChange={(event) => setDraft((current) => ({ ...current, accepted_terms: event.target.checked }))} className="mt-0.5 size-4" /><span className="text-sm text-ink">The agreement was read or explained to the customer in a language they understand, and they accepted it before signing.</span></label>
          <div className="rounded-lg border border-border p-3">
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={draft.generate_payment_account} onChange={(event) => setDraft((current) => ({ ...current, generate_payment_account: event.target.checked }))} className="mt-0.5 size-4" />
              <span className="text-sm text-ink">Generate a payment account now.<span className="block text-muted-foreground">This is optional and can also be done later.</span></span>
            </label>
            {draft.generate_payment_account ? (
              <div className="mt-3">
                <Label htmlFor="payment_method">Payment method</Label>
                <select id="payment_method" className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" value={draft.payment_method} onChange={(event) => setDraft((current) => ({ ...current, payment_method: event.target.value as PaymentMethod }))}>
                  {PAYMENT_METHOD_OPTIONS.map((method) => (
                    <option key={method.value} value={method.value}>{method.label}</option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
          {submitError ? <p role="alert" className="text-sm text-destructive">{submitError}</p> : null}
          <div className="flex justify-between border-t border-border pt-4"><Button type="button" variant="secondary" onClick={() => setStep(3)} disabled={isSaving}>Back</Button><Button type="button" onClick={submit} disabled={!draft.accepted_terms || !hasSignature || registrationTerms.isLoading || registrationTerms.isError} isLoading={isSaving}>Register customer</Button></div>
        </div> : null}
        {completed ? <div className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-success-surface text-success"><Check className="size-7" /></div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Customer registered</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedModel?.name ?? 'Stove'} · {assignedSerial} has been assigned to {draft.full_name || 'the customer'}.
            </p>
          </div>
          <Button type="button" onClick={resetAndClose}>Done</Button>
        </div> : null}
      </DialogContent>
    </Dialog>
  );
}
