import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { backendRequest, BackendRequestError } from '../api/server-api-client';
import { ACCESS_COOKIE_OPTIONS, AUTH_COOKIE, REFRESH_COOKIE_OPTIONS } from './auth-cookies';

export interface SessionAgent {
  agent_uuid: string;
  full_name: string;
  email: string;
  phone_number: string | null;
  role: string;
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
 * Known v1 limitation: no silent token refresh here (Next only allows setting cookies
 * from Server Actions/Route Handlers, not during Server Component render) — once the
 * 15-minute access token expires, the agent is redirected to log in again. If that
 * proves too tight in practice, raise JWT_ACCESS_EXPIRY in the backend's .env.
 */
export async function requireAgent(): Promise<SessionAgent> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
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
