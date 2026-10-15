'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/api/query-keys';
import { unwrapServiceResult } from '@/lib/api/service-result';
import {
  getAuditAgent,
  getAuditStove,
  getAuditSummary,
  listAuditAgents,
  listAuditStoves,
} from '../services/auditor.service';
import { AuditAgentFilters, AuditStoveFilters } from '../types';

export function useAuditSummary() {
  return useQuery({
    queryKey: queryKeys.auditor.summary(),
    queryFn: async () => unwrapServiceResult(await getAuditSummary()),
  });
}

export function useAuditStoves(params: AuditStoveFilters & { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.auditor.stoves(params),
    queryFn: async () => unwrapServiceResult(await listAuditStoves(params)),
    placeholderData: keepPreviousData,
  });
}

export function useAuditStove(stoveUnitUuid: string | null) {
  return useQuery({
    queryKey: queryKeys.auditor.stove(stoveUnitUuid ?? ''),
    queryFn: async () => unwrapServiceResult(await getAuditStove(stoveUnitUuid!)),
    enabled: !!stoveUnitUuid,
  });
}

export function useAuditAgents(params: AuditAgentFilters & { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.auditor.agents(params),
    queryFn: async () => unwrapServiceResult(await listAuditAgents(params)),
    placeholderData: keepPreviousData,
  });
}

export function useAuditAgent(agentUuid: string | null) {
  return useQuery({
    queryKey: queryKeys.auditor.agent(agentUuid ?? ''),
    queryFn: async () => unwrapServiceResult(await getAuditAgent(agentUuid!)),
    enabled: !!agentUuid,
  });
}
