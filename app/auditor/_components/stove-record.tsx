'use client';

import { CookingPot, ExternalLink, Flame, IdCard, UserRound } from 'lucide-react';
import { useAuditStove } from '../_lib/hooks/use-auditor';
import { AccountBadge, FlagAlert, KycBadge } from './badges';
import { formatDate, formatDateTime } from './format';
import { Details, RecordHeader, RecordSection, RecordState, useRecordDrawer } from './record-drawer';

function Photo({ url, label, icon: Icon }: { url: string | null; label: string; icon: typeof UserRound }) {
  if (!url) {
    return (
      <div className="grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-destructive bg-destructive-surface text-center text-xs text-destructive">
        <span className="grid justify-items-center gap-1">
          <Icon className="size-5" aria-hidden />
          {label} missing
        </span>
      </div>
    );
  }
  return (
    <figure>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary-hosted evidence, already resized on upload */}
        <img src={url} alt={label} className="aspect-[4/3] w-full rounded-lg border border-border object-cover" />
      </a>
      <figcaption className="mt-1 text-xs text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

export function StoveRecord({ stoveUnitUuid }: { stoveUnitUuid: string }) {
  const { data: stove, isLoading, isError, error } = useAuditStove(stoveUnitUuid);
  const { openAgent } = useRecordDrawer();

  if (isLoading) return <RecordState message="Loading the registration…" />;
  if (isError || !stove) return <RecordState tone="error" message={error?.message ?? 'This stove could not be loaded.'} />;

  const { customer, household, evidence, agreement, agent } = stove;
  const hasGps = evidence.latitude !== null && evidence.longitude !== null;
  const coordinates = hasGps ? `${evidence.latitude!.toFixed(5)}, ${evidence.longitude!.toFixed(5)}` : null;

  return (
    <>
      <RecordHeader eyebrow="Registered stove" title={<span className="font-mono">{stove.serial_number}</span>}>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {stove.model.name} · registered {formatDateTime(stove.registered_at)}
        </p>
      </RecordHeader>
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {stove.flags.length ? (
          <RecordSection>
            {stove.flags.map((flag) => (
              <FlagAlert key={flag.code} flag={flag} />
            ))}
          </RecordSection>
        ) : null}

        <RecordSection title="Customer">
          <Details
            rows={[
              ['Name', customer.full_name],
              ['Phone', customer.phone_number],
              ['Email', customer.email ?? '—'],
              ['Gender', customer.gender ? customer.gender[0].toUpperCase() + customer.gender.slice(1) : '—'],
              ['Date of birth', customer.date_of_birth ? formatDate(customer.date_of_birth) : '—'],
              ['Address', customer.address ?? '—'],
              ['Ward', customer.ward ?? '—'],
              ['LGA / State', [customer.lga, customer.state].filter(Boolean).join(', ') || '—'],
              [
                'Identity',
                <span key="identity" className="inline-flex flex-wrap items-center gap-2">
                  <KycBadge status={customer.kyc_status} />
                  {customer.verified_identifier ? (
                    <span className="text-muted-foreground">
                      {customer.verified_identifier} ****{customer.identifier_last4}
                    </span>
                  ) : null}
                </span>,
              ],
            ]}
          />
        </RecordSection>

        <RecordSection title="Household">
          {household ? (
            <Details
              rows={[
                ['Children (0–14)', String(household.children_0_14)],
                ['Females (15+)', String(household.females_15_plus)],
                ['Males (15–59)', String(household.males_15_59)],
                ['Males (60+)', String(household.males_60_plus)],
                ['Total', `${household.total} ${household.total === 1 ? 'person' : 'people'}`],
              ]}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Not recorded. This registration is from before the household was asked for.</p>
          )}
        </RecordSection>

        <RecordSection title="Delivery evidence">
          {/* Each registration shows the photos its agreement version asked for. */}
          <div className="grid grid-cols-2 gap-3">
            {evidence.captures_beneficiary_evidence ? (
              <>
                <Photo url={evidence.id_photo_url} label="Government ID" icon={IdCard} />
                <Photo url={evidence.baseline_stove_photo_url} label="Old (baseline) stove" icon={Flame} />
                <Photo url={evidence.customer_photo_url} label="Customer with the new stove" icon={UserRound} />
              </>
            ) : (
              <>
                <Photo url={evidence.customer_photo_url} label="Customer photo" icon={UserRound} />
                <Photo url={evidence.stove_photo_url} label="Stove photo" icon={CookingPot} />
              </>
            )}
          </div>
          {coordinates ? (
            <Details
              rows={[
                ['GPS', <span key="gps" className="font-mono text-xs">{coordinates}</span>],
                ...(evidence.captured_at ? [['Captured', formatDateTime(evidence.captured_at)] as [string, string]] : []),
                [
                  'Map',
                  <a
                    key="map"
                    href={`https://www.google.com/maps?q=${evidence.latitude},${evidence.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    Open in Google Maps <ExternalLink className="size-3.5" aria-hidden />
                  </a>,
                ],
              ]}
            />
          ) : (
            <p className="text-sm text-destructive">No GPS location was recorded for this installation.</p>
          )}
        </RecordSection>

        <RecordSection title="Signed agreement">
          {agreement.terms_text ? <p className="max-w-prose whitespace-pre-line text-sm leading-6 text-muted-foreground">{agreement.terms_text}</p> : null}
          {agreement.signature_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element -- Cloudinary-hosted signature
            <img
              src={agreement.signature_image_url}
              alt="Customer signature"
              className="h-20 rounded-lg border border-border bg-white object-contain px-3"
            />
          ) : (
            <p className="text-sm text-destructive">No signature recorded.</p>
          )}
          <p className="text-xs text-muted-foreground">
            {agreement.terms_version ? `Version ${agreement.terms_version}` : 'No agreement version recorded'}
            {agreement.accepted_at ? ` · accepted ${formatDateTime(agreement.accepted_at)}` : ''}
          </p>
        </RecordSection>

        <RecordSection title="Registered by">
          <Details
            rows={[
              [
                'Agent',
                <span key="agent" className="inline-flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => openAgent(agent.agent_uuid)} className="font-medium text-primary hover:underline">
                    {agent.full_name}
                  </button>
                  <AccountBadge status={agent.account_status} />
                </span>,
              ],
              ['Email', agent.email],
              ['Phone', agent.phone_number ?? '—'],
            ]}
          />
        </RecordSection>

        <RecordSection title="History">
          <ol className="space-y-3">
            {stove.history.map((item) => (
              <li key={`${item.at}-${item.event}`} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2.5 text-sm">
                <span className="mt-1.5 size-2 rounded-full bg-primary" aria-hidden />
                <span>
                  <span className="text-ink">{item.event}</span>
                  <span className="block text-xs text-muted-foreground">{formatDateTime(item.at)}</span>
                </span>
              </li>
            ))}
          </ol>
        </RecordSection>
      </div>
    </>
  );
}
