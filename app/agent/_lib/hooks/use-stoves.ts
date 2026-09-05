'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { addStoveUnits, listAvailableStoveUnits, listStoveModels } from '../services/stoves.service';

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

export function useAddStoveUnits() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { stove_model_uuid: string; serial_numbers: string[] }) =>
      addStoveUnits(input),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['stoves', 'units'] });
      }
    },
  });
}
