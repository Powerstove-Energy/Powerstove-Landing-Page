'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { createPaymentAccount, getPaymentAccount } from '../services/payments.service';

export function usePaymentAccount(customerUuid: string) {
  return useQuery({
    queryKey: queryKeys.payments.account(customerUuid),
    queryFn: async () => unwrapServiceResult(await getPaymentAccount(customerUuid)),
    enabled: !!customerUuid,
  });
}

export function useCreatePaymentAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerUuid: string) => createPaymentAccount(customerUuid),
    onSuccess: (result, customerUuid) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.payments.account(customerUuid) });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary() });
      }
    },
  });
}
