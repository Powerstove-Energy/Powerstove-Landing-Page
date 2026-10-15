export const queryKeys = {
  agent: {
    me: () => ['agent', 'me'] as const,
  },
  customers: {
    all: () => ['customers'] as const,
    list: <T extends object>(params: T) => ['customers', 'list', params] as const,
    detail: (customerUuid: string) => ['customers', 'detail', customerUuid] as const,
    transactions: (customerUuid: string) => ['customers', customerUuid, 'transactions'] as const,
  },
  stoves: {
    models: () => ['stoves', 'models'] as const,
    units: <T extends object>(params: T) => ['stoves', 'units', params] as const,
  },
  payments: {
    account: (customerUuid: string) => ['payments', 'account', customerUuid] as const,
  },
  dashboard: {
    summary: () => ['dashboard', 'summary'] as const,
  },
  auditor: {
    summary: () => ['auditor', 'summary'] as const,
    stoves: <T extends object>(params: T) => ['auditor', 'stoves', params] as const,
    stove: (stoveUnitUuid: string) => ['auditor', 'stove', stoveUnitUuid] as const,
    agents: <T extends object>(params: T) => ['auditor', 'agents', params] as const,
    agent: (agentUuid: string) => ['auditor', 'agent', agentUuid] as const,
  },
} as const;
