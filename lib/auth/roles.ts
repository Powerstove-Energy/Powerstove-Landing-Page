/** Client-safe role constants, shared by the login form and the server-side session gates. */
export type AccountRole = 'AGENT' | 'AUDITOR';

/** Where each role lands after signing in. */
export const HOME_FOR_ROLE: Record<AccountRole, string> = {
  AGENT: '/agent/dashboard',
  AUDITOR: '/auditor',
};
