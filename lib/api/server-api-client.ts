import { cookies } from 'next/headers';
import { ACCESS_COOKIE_OPTIONS, AUTH_COOKIE } from '../auth/auth-cookies';

const API_BASE_URL = process.env.AGENT_API_URL ?? 'http://localhost:4000';
const REQUEST_TIMEOUT_MS = 15000;

interface BackendEnvelope<T> {
  status: 1 | 0;
  message: string;
  data: T | null;
}

export class BackendRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'BackendRequestError';
  }
}

interface BackendRequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  /** Skip attaching the agent's access token — only for public endpoints (login/register/etc). */
  skipAuth?: boolean;
}

/** Exchanges a refresh token for a new access token, or returns null if it's rejected. */
export async function exchangeRefreshToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Request-Id': crypto.randomUUID() },
      body: JSON.stringify({ refresh_token: refreshToken }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: 'no-store',
    });
    const payload = (await response.json().catch(() => null)) as BackendEnvelope<{ access_token: string }> | null;
    return response.ok && payload?.status === 1 && payload.data ? payload.data.access_token : null;
  } catch {
    return null;
  }
}

/**
 * Renews an expired access token from the refresh cookie so a long field session (a
 * registration wizard left open past the 15-minute access lifetime) doesn't fail on submit.
 */
async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AUTH_COOKIE.refresh)?.value;
  if (!refreshToken) return null;

  const accessToken = await exchangeRefreshToken(refreshToken);
  if (!accessToken) return null;

  try {
    cookieStore.set(AUTH_COOKIE.access, accessToken, ACCESS_COOKIE_OPTIONS);
  } catch {
    // Server Component render can't set cookies; proxy.ts persists a fresh token on the next request.
  }
  return accessToken;
}

/**
 * Server-only transport to the powerstove-agent-api backend. Only feature *.service.ts
 * Server Actions call this — client components never fetch() the backend directly.
 * An authenticated request rejected with 401 is retried once after refreshing the token.
 */
export async function backendRequest<T>(path: string, options: BackendRequestOptions = {}): Promise<T> {
  let accessToken: string | undefined;
  if (!options.skipAuth) {
    const cookieStore = await cookies();
    accessToken = cookieStore.get(AUTH_COOKIE.access)?.value ?? (await refreshAccessToken()) ?? undefined;
  }

  let response = await send(path, options, accessToken);

  if (response.status === 401 && !options.skipAuth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      response = await send(path, options, refreshed);
    }
  }

  const payload = (await response.json().catch(() => null)) as BackendEnvelope<T> | null;

  if (!response.ok || !payload || payload.status === 0) {
    throw new BackendRequestError(payload?.message ?? 'Something went wrong', response.status);
  }

  return payload.data as T;
}

async function send(path: string, options: BackendRequestOptions, accessToken: string | undefined): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Request-Id': crypto.randomUUID(),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
      cache: 'no-store',
    });
  } catch {
    throw new BackendRequestError('Could not reach the server, please try again', 0);
  } finally {
    clearTimeout(timeout);
  }
}
