'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { CreateCustomerInput } from '../schemas/customer.schema';
import {
  createCustomer,
  getRegistrationTerms,
  getCustomer,
  listCustomers,
  ListCustomersParams,
  listCustomerTransactions,
} from '../services/customers.service';

export function useCustomers(params: ListCustomersParams) {
  return useQuery({
    queryKey: queryKeys.customers.list(params),
    queryFn: async () => unwrapServiceResult(await listCustomers(params)),
  });
}

export function useRegistrationTerms() {
  return useQuery({
    queryKey: ['customers', 'registration-terms'],
    queryFn: async () => unwrapServiceResult(await getRegistrationTerms()),
    staleTime: Infinity,
  });
}

export function useCustomer(customerUuid: string) {
  return useQuery({
    queryKey: queryKeys.customers.detail(customerUuid),
    queryFn: async () => unwrapServiceResult(await getCustomer(customerUuid)),
    enabled: !!customerUuid,
  });
}

export function useCustomerTransactions(customerUuid: string) {
  return useQuery({
    queryKey: queryKeys.customers.transactions(customerUuid),
    queryFn: async () => unwrapServiceResult(await listCustomerTransactions(customerUuid)),
    enabled: !!customerUuid,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCustomerInput) => createCustomer(input),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.customers.all() });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.summary() });
      }
    },
  });
}
