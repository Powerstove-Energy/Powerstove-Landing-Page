'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';

export interface DashboardSummary {
  total_customers: number;
  kyc_verified_count: number;
  stoves_assigned_count: number;
  active_payment_accounts_count: number;
  total_collected_kobo: number;
}

export async function getDashboardSummary(): Promise<ServiceResult<DashboardSummary>> {
  return executeBackendService(() => backendRequest<DashboardSummary>(API_ROUTES.dashboard.summary()));
}
