import type { KycStatus, PageInfo } from '@/app/agent/_lib/types';

export type FlagSeverity = 'high' | 'medium' | 'low';

export interface AuditFlag {
  code: 'KYC_FAILED' | 'KYC_PENDING' | 'MISSING_EVIDENCE' | 'SAME_LOCATION' | 'AGENT_SUSPENDED';
  severity: FlagSeverity;
  title: string;
  detail: string;
}

/** ACTIVE = can sign in; UNVERIFIED = has not confirmed their email yet. */
export type AgentAccountStatus = 'ACTIVE' | 'SUSPENDED' | 'UNVERIFIED';

export interface AuditSummary {
  generated_at: string;
  stoves: {
    total: number;
    last_30_days: number;
    kyc_verified: number;
    kyc_verified_pct: number | null;
    evidence_complete: number;
    evidence_complete_pct: number | null;
    needs_review: number;
  };
  agents: { total: number; active: number; suspended: number };
  weekly_registrations: Array<{ week_start: string; count: number }>;
  by_state: Array<{ state: string; count: number }>;
  top_agents: AuditAgent[];
  review_queue: Array<{
    stove_unit_uuid: string;
    serial_number: string;
    agent_name: string;
    registered_at: string;
    flag: AuditFlag;
  }>;
}

/**
 * Which evidence a registration has. Null means it was never asked for: registrations
 * under the beneficiary agreement have no separate stove photo, and earlier ones have
 * no ID or baseline stove photo.
 */
export interface AuditEvidence {
  id_photo: boolean | null;
  baseline_stove_photo: boolean | null;
  /** The customer with the new stove (earlier registrations: the customer alone). */
  customer_photo: boolean;
  stove_photo: boolean | null;
  gps: boolean;
  signature: boolean;
}

export interface AuditStove {
  stove_unit_uuid: string;
  serial_number: string;
  model: { stove_model_uuid: string; name: string };
  customer: { full_name: string; phone_masked: string; state: string | null; lga: string | null; ward: string | null };
  household_size: number | null;
  agent: { agent_uuid: string; full_name: string };
  registered_at: string;
  kyc_status: KycStatus;
  verified_identifier: 'NIN' | 'BVN' | null;
  identifier_last4: string | null;
  evidence: AuditEvidence;
  flags: AuditFlag[];
}

export interface AuditHousehold {
  children_0_14: number;
  females_15_plus: number;
  males_15_59: number;
  males_60_plus: number;
  total: number;
}

export interface AuditStoveList {
  items: AuditStove[];
  page_info: PageInfo;
  facets: {
    states: string[];
    models: Array<{ stove_model_uuid: string; sku: string; name: string }>;
  };
}

export interface AuditStoveDetail {
  stove_unit_uuid: string;
  serial_number: string;
  model: { stove_model_uuid: string; sku: string; name: string };
  registered_at: string;
  flags: AuditFlag[];
  customer: {
    customer_uuid: string;
    full_name: string;
    phone_number: string;
    email: string | null;
    gender: string | null;
    date_of_birth: string | null;
    address: string | null;
    state: string | null;
    lga: string | null;
    ward: string | null;
    kyc_status: KycStatus;
    verified_identifier: 'NIN' | 'BVN' | null;
    identifier_last4: string | null;
  };
  /** Null on registrations from before the household was asked for. */
  household: AuditHousehold | null;
  evidence: {
    /** Signed under the beneficiary agreement, which asks for ID and baseline stove photos. */
    captures_beneficiary_evidence: boolean;
    id_photo_url: string | null;
    baseline_stove_photo_url: string | null;
    customer_photo_url: string | null;
    stove_photo_url: string | null;
    latitude: number | null;
    longitude: number | null;
    captured_at: string | null;
  };
  agreement: {
    terms_version: string | null;
    terms_text: string | null;
    accepted_at: string | null;
    signature_image_url: string | null;
  };
  agent: AuditAgentProfile;
  history: Array<{ at: string; event: string }>;
}

export interface AuditAgentProfile {
  agent_uuid: string;
  full_name: string;
  email: string;
  phone_number: string | null;
  account_status: AgentAccountStatus;
  email_verified_at: string | null;
  created_at: string;
}

export interface AuditAgent extends AuditAgentProfile {
  stoves_registered: number;
  kyc_verified_pct: number | null;
  last_registration_at: string | null;
  states: string[];
  stoves_needing_review: number;
}

export interface AuditAgentDetail extends AuditAgent {
  recent_stoves: AuditStove[];
}

export interface AuditAgentList {
  items: AuditAgent[];
  page_info: PageInfo;
}

export interface AuditStoveFilters {
  q?: string;
  state?: string;
  stove_model_uuid?: string;
  kyc_status?: KycStatus;
  agent_uuid?: string;
  needs_review?: boolean;
}

export interface AuditAgentFilters {
  q?: string;
  status?: AgentAccountStatus;
}

/** Turns filters plus paging into a query string, dropping empty values. */
export function toQueryString(params: object): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '' && value !== false && value !== null) {
      query.set(key, String(value));
    }
  }
  const text = query.toString();
  return text ? `?${text}` : '';
}
