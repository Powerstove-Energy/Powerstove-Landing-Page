'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import { getStateLocations } from '../services/locations.service';

/** LGAs and wards of one state. The list only changes with a deploy, so it is never refetched. */
export function useStateLocations(state: string) {
  return useQuery({
    queryKey: queryKeys.locations.state(state),
    queryFn: async () => unwrapServiceResult(await getStateLocations(state)),
    enabled: !!state,
    staleTime: Infinity,
  });
}
