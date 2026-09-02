'use client';

import { useMutation } from '@tanstack/react-query';
import { lookupBvn, lookupNin } from '../services/kyc.service';

export function useNinLookup() {
  return useMutation({
    mutationFn: (nin: string) => lookupNin(nin),
  });
}

export function useBvnLookup() {
  return useMutation({
    mutationFn: (bvn: string) => lookupBvn(bvn),
  });
}
