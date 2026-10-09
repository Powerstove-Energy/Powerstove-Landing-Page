export type KycStatus = 'PENDING' | 'VERIFIED' | 'FAILED';
export type StoveUnitStatus = 'IN_STOCK' | 'ASSIGNED' | 'RETIRED';
export type PaymentAccountStatus = 'ACTIVE' | 'INACTIVE';
export type PaymentTransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

/** How the customer pays. `cash` is collected in the field and only recorded here. */
export type PaymentMethod = 'paystack' | 'embedly' | 'cash';

/** Selectable payment methods. `embedly` is the API name for Sterling Bank. */
export const PAYMENT_METHOD_OPTIONS: Array<{ value: PaymentMethod; label: string }> = [
  { value: 'paystack', label: 'Paystack — dedicated bank account' },
  { value: 'embedly', label: 'Sterling Bank — dedicated bank account' },
  { value: 'cash', label: 'Cash — collected in person' },
];

const PAYMENT_PROVIDER_NAMES: Record<string, string> = {
  paystack: 'Paystack',
  embedly: 'Sterling Bank',
  cash: 'Cash',
};

export function paymentProviderName(provider: string): string {
  return PAYMENT_PROVIDER_NAMES[provider] ?? provider;
}

export interface StoveUnitSummary {
  stove_unit_uuid: string;
  serial_number: string;
  status: StoveUnitStatus;
  assigned_at: string | null;
  customer_photo_url: string | null;
  stove_photo_url: string | null;
  installation_latitude: number | null;
  installation_longitude: number | null;
  installation_captured_at: string | null;
  model: { stove_model_uuid: string; sku: string; name: string; category: string };
}

export interface PaymentAccountSummary {
  payment_account_uuid: string;
  provider: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  status: PaymentAccountStatus;
  created_at: string;
}

export interface Customer {
  customer_uuid: string;
  agent_uuid: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  address: string | null;
  state: string | null;
  lga: string | null;
  date_of_birth: string | null;
  gender: string | null;
  nin_last4: string | null;
  kyc_status: KycStatus;
  kyc_provider_reference: string | null;
  kyc_verified_at: string | null;
  verified_identifier: 'NIN' | 'BVN' | null;
  bvn_last4: string | null;
  bvn_verified_at: string | null;
  terms_version: string | null;
  terms_accepted_at: string | null;
  signature_image_url: string | null;
  created_at: string;
  updated_at: string;
  stove_unit: StoveUnitSummary | null;
  payment_account: PaymentAccountSummary | null;
}

export interface PaymentTransaction {
  payment_transaction_uuid: string;
  provider_reference: string;
  amount_kobo: number;
  currency: string;
  status: PaymentTransactionStatus;
  channel: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface PageInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page_info: PageInfo;
}
