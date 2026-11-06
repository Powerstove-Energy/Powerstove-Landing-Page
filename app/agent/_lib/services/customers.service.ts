'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';
import { CreateCustomerInput } from '../schemas/customer.schema';
import { Customer, KycStatus, PaginatedResult, PaymentTransaction } from '../types';

export interface ListCustomersParams {
  q?: string;
  kyc_status?: KycStatus;
  page?: number;
  pageSize?: number;
}

export interface RegistrationTerms {
  version: string;
  text: string;
}

export async function getRegistrationTerms(): Promise<ServiceResult<RegistrationTerms>> {
  return executeBackendService(() =>
    backendRequest<RegistrationTerms>(API_ROUTES.customers.registrationTerms()),
  );
}

export async function listCustomers(
  params: ListCustomersParams,
): Promise<ServiceResult<PaginatedResult<Customer>>> {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.kyc_status) query.set('kyc_status', params.kyc_status);
  if (params.page) query.set('page', String(params.page));
  if (params.pageSize) query.set('pageSize', String(params.pageSize));

  const suffix = query.toString() ? `?${query.toString()}` : '';

  return executeBackendService(() =>
    backendRequest<PaginatedResult<Customer>>(`${API_ROUTES.customers.list()}${suffix}`),
  );
}

export async function createCustomer(input: CreateCustomerInput): Promise<ServiceResult<Customer>> {
  return executeBackendService(() =>
    backendRequest<Customer>(API_ROUTES.customers.create(), {
      method: 'POST',
      body: {
        registration_reference: input.registration_reference,
        nin: input.nin || undefined,
        bvn: input.bvn || undefined,
        full_name: input.full_name,
        phone_number: input.phone_number,
        email: input.email || undefined,
        address: input.address,
        state: input.state,
        lga: input.lga,
        ward: input.ward,
        date_of_birth: input.date_of_birth || undefined,
        gender: input.gender,
        household_children_0_14: input.household_children_0_14,
        household_females_15_plus: input.household_females_15_plus,
        household_males_15_59: input.household_males_15_59,
        household_males_60_plus: input.household_males_60_plus,
        stove_model_uuid: input.stove_model_uuid,
        serial_number: input.serial_number || undefined,
        customer_photo: input.customer_photo,
        id_photo: input.id_photo,
        baseline_stove_photo: input.baseline_stove_photo,
        gps: input.gps,
        signature: input.signature,
        terms_version: input.terms_version,
      },
    }),
  );
}

export async function getCustomer(customerUuid: string): Promise<ServiceResult<Customer>> {
  return executeBackendService(() => backendRequest<Customer>(API_ROUTES.customers.detail(customerUuid)));
}

export async function listCustomerTransactions(
  customerUuid: string,
): Promise<ServiceResult<PaginatedResult<PaymentTransaction>>> {
  return executeBackendService(() =>
    backendRequest<PaginatedResult<PaymentTransaction>>(API_ROUTES.customers.transactions(customerUuid)),
  );
}
