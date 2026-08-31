'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { assignStoveUnit, listAvailableStoveUnits, listStoveModels } from '../services/stoves.service';

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

export function useAssignStoveUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ stoveUnitUuid, customerUuid }: { stoveUnitUuid: string; customerUuid: string }) =>
      assignStoveUnit(stoveUnitUuid, customerUuid),
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.customers.detail(variables.customerUuid) });
        queryClient.invalidateQueries({ queryKey: queryKeys.customers.all() });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary() });
      }
    },
  });
}
