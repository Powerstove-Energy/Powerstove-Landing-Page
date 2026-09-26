'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest, BackendRequestError } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';
import { PaymentAccountSummary, PaymentMethod } from '../types';

export async function getPaymentAccount(
  customerUuid: string,
): Promise<ServiceResult<PaymentAccountSummary | null>> {
  return executeBackendService(async () => {
    try {
      return await backendRequest<PaymentAccountSummary>(API_ROUTES.payments.getAccount(customerUuid));
    } catch (error) {
      // 404 means "not generated yet" — a legitimate, expected state, not a failure.
      if (error instanceof BackendRequestError && error.status === 404) {
        return null;
      }
      throw error;
    }
  });
}

export async function createPaymentAccount(
  customerUuid: string,
  paymentMethod?: PaymentMethod,
): Promise<ServiceResult<PaymentAccountSummary>> {
  return executeBackendService(() =>
    backendRequest<PaymentAccountSummary>(API_ROUTES.payments.createAccount(), {
      method: 'POST',
      // Omit the field to let the backend apply its default (Paystack).
      body: paymentMethod
        ? { customer_uuid: customerUuid, payment_method: paymentMethod }
        : { customer_uuid: customerUuid },
    }),
  );
}
