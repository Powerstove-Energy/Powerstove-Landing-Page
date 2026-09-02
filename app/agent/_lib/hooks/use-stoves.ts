'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { listAvailableStoveUnits, listStoveModels } from '../services/stoves.service';

export function useStoveModels() {
  return useQuery({
    queryKey: queryKeys.stoves.models(),
    queryFn: async () => unwrapServiceResult(await listStoveModels()),
  });
}

export function useAvailableStoveUnits(stoveModelUuid: string | undefined) {
  return useQuery({
    queryKey: queryKeys.stoves.units({ stoveModelUuid, status: 'IN_STOCK' }),
    queryFn: async () => unwrapServiceResult(await listAvailableStoveUnits(stoveModelUuid!)),
    enabled: !!stoveModelUuid,
  });
}
