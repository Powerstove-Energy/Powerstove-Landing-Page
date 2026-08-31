'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';

export interface NinLookupResult {
  nin_last4: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  phone_number?: string;
  provider_reference: string;
}

export async function lookupNin(nin: string): Promise<ServiceResult<NinLookupResult>> {
  return executeBackendService(() =>
    backendRequest<NinLookupResult>(API_ROUTES.kyc.lookupNin(), {
      method: 'POST',
      body: { nin },
    }),
  );
}
