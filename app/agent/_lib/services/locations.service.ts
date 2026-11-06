'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';

export interface StateLocations {
  state: string;
  lgas: Array<{ name: string; wards: string[] }>;
}

/** A state's LGAs and their wards, for the registration address dropdowns. */
export async function getStateLocations(state: string): Promise<ServiceResult<StateLocations>> {
  return executeBackendService(() =>
    backendRequest<StateLocations>(`${API_ROUTES.locations.list()}?state=${encodeURIComponent(state)}`),
  );
}
