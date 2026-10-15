import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { backendRequest, BackendRequestError } from '../api/server-api-client';
import { ACCESS_COOKIE_OPTIONS, AUTH_COOKIE, REFRESH_COOKIE_OPTIONS } from './auth-cookies';
import { AccountRole, HOME_FOR_ROLE } from './roles';

export interface SessionAgent {
  agent_uuid: string;
  full_name: string;
  email: string;
  phone_number: string | null;
  role: AccountRole;
  status: string;
  email_verified_at: string | null;
  created_at: string;
}

export async function setAuthCookies(tokens: { access_token: string; refresh_token: string }): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE.access, tokens.access_token, ACCESS_COOKIE_OPTIONS);
  cookieStore.set(AUTH_COOKIE.refresh, tokens.refresh_token, REFRESH_COOKIE_OPTIONS);
}

export async function setAccessCookie(accessToken: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE.access, accessToken, ACCESS_COOKIE_OPTIONS);
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE.access);
  cookieStore.delete(AUTH_COOKIE.refresh);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE.access)?.value;
}

/**
 * The authoritative auth check — call from Server Components that gate access.
 * proxy.ts only checks cookie *presence* for redirect UX; this re-validates the token
 * against the backend (GET /agents/me), which itself re-checks the agent's live
 * status/token_version on every call, so a revoked session is rejected immediately.
 *
 * An expired access token is renewed from the refresh cookie — by proxy.ts before the
 * page renders, and by backendRequest() on a 401 — so agents stay signed in for the
 * refresh token's lifetime (30 days) rather than the access token's 15 minutes.
 */
async function requireSession(): Promise<SessionAgent> {
  const cookieStore = await cookies();

  // A missing access cookie with a live refresh cookie is renewed inside backendRequest.
  if (!cookieStore.has(AUTH_COOKIE.access) && !cookieStore.has(AUTH_COOKIE.refresh)) {
    redirect('/agent/login');
  }

  try {
    return await backendRequest<SessionAgent>('/agents/me');
  } catch (error) {
    if (error instanceof BackendRequestError) {
      await clearAuthCookies();
    }
    redirect('/agent/login');
  }
}

/** Gate for the field-agent portal. Auditors are sent to their own dashboard. */
export async function requireAgent(): Promise<SessionAgent> {
  const session = await requireSession();
  if (session.role !== 'AGENT') redirect(HOME_FOR_ROLE[session.role] ?? '/agent/login');
  return session;
}

/** Gate for the read-only auditor dashboard. Field agents are sent to their own portal. */
export async function requireAuditor(): Promise<SessionAgent> {
  const session = await requireSession();
  if (session.role !== 'AUDITOR') redirect(HOME_FOR_ROLE[session.role] ?? '/agent/login');
  return session;
}
