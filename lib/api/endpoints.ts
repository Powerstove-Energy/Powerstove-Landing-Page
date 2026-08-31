export const API_ROUTES = {
  auth: {
    register: () => '/auth/register',
    verifyEmail: () => '/auth/verify-email',
    resendVerification: () => '/auth/resend-verification',
    login: () => '/auth/login',
    refresh: () => '/auth/refresh',
    logout: () => '/auth/logout',
    forgotPassword: () => '/auth/forgot-password',
    resetPassword: () => '/auth/reset-password',
  },
  agents: {
    me: () => '/agents/me',
  },
  kyc: {
    lookupNin: () => '/kyc/nin/lookup',
  },
  customers: {
    list: () => '/customers',
    create: () => '/customers',
    detail: (customerUuid: string) => `/customers/${customerUuid}`,
    kycStatus: (customerUuid: string) => `/customers/${customerUuid}/kyc-status`,
    transactions: (customerUuid: string) => `/customers/${customerUuid}/transactions`,
  },
  stoves: {
    models: () => '/stoves/models',
    units: () => '/stoves/units',
    assign: (stoveUnitUuid: string) => `/stoves/units/${stoveUnitUuid}/assign`,
  },
  payments: {
    createAccount: () => '/payments/accounts',
    getAccount: (customerUuid: string) => `/payments/accounts/${customerUuid}`,
  },
  dashboard: {
    summary: () => '/dashboard/summary',
  },
} as const;
