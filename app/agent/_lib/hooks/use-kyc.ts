'use client';

import { useMutation } from '@tanstack/react-query';
import { lookupNin } from '../services/kyc.service';

export function useNinLookup() {
  return useMutation({
    mutationFn: (nin: string) => lookupNin(nin),
  });
}
