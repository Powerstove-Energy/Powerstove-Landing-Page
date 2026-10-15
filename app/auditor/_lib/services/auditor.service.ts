'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';
import {
  AuditAgentDetail,
  AuditAgentFilters,
  AuditAgentList,
  AuditStoveDetail,
  AuditStoveFilters,
  AuditStoveList,
  AuditSummary,
  toQueryString,
} from '../types';

interface Paging {
  page?: number;
  pageSize?: number;
}

export async function getAuditSummary(): Promise<ServiceResult<AuditSummary>> {
  return executeBackendService(() => backendRequest<AuditSummary>(API_ROUTES.auditor.summary()));
}

export async function listAuditStoves(
  params: AuditStoveFilters & Paging,
): Promise<ServiceResult<AuditStoveList>> {
  return executeBackendService(() =>
    backendRequest<AuditStoveList>(`${API_ROUTES.auditor.stoves()}${toQueryString(params)}`),
  );
}

export async function getAuditStove(stoveUnitUuid: string): Promise<ServiceResult<AuditStoveDetail>> {
  return executeBackendService(() => backendRequest<AuditStoveDetail>(API_ROUTES.auditor.stove(stoveUnitUuid)));
}

export async function listAuditAgents(
  params: AuditAgentFilters & Paging,
): Promise<ServiceResult<AuditAgentList>> {
  return executeBackendService(() =>
    backendRequest<AuditAgentList>(`${API_ROUTES.auditor.agents()}${toQueryString(params)}`),
  );
}

export async function getAuditAgent(agentUuid: string): Promise<ServiceResult<AuditAgentDetail>> {
  return executeBackendService(() => backendRequest<AuditAgentDetail>(API_ROUTES.auditor.agent(agentUuid)));
}
