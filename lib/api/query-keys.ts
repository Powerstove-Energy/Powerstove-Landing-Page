export const queryKeys = {
  agent: {
    me: () => ['agent', 'me'] as const,
  },
  customers: {
    all: () => ['customers'] as const,
    list: (params: Record<string, unknown>) => ['customers', 'list', params] as const,
    detail: (customerUuid: string) => ['customers', 'detail', customerUuid] as const,
    transactions: (customerUuid: string) => ['customers', customerUuid, 'transactions'] as const,
  },
  stoves: {
    models: () => ['stoves', 'models'] as const,
    units: (params: Record<string, unknown>) => ['stoves', 'units', params] as const,
  },
  payments: {
    account: (customerUuid: string) => ['payments', 'account', customerUuid] as const,
  },
  dashboard: {
    summary: () => ['dashboard', 'summary'] as const,
  },
} as const;
