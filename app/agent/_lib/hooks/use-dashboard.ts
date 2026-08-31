'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { getDashboardSummary } from '../services/dashboard.service';

export function useDashboardSummary() {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: async () => unwrapServiceResult(await getDashboardSummary()),
  });
}
