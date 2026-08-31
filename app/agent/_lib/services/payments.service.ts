'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest, BackendRequestError } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';
import { PaymentAccountSummary } from '../types';

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
): Promise<ServiceResult<PaymentAccountSummary>> {
  return executeBackendService(() =>
    backendRequest<PaymentAccountSummary>(API_ROUTES.payments.createAccount(), {
      method: 'POST',
      body: { customer_uuid: customerUuid },
    }),
  );
}
