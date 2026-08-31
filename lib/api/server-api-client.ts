import { cookies } from 'next/headers';
import { AUTH_COOKIE } from '../auth/auth-cookies';

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

/**
 * Server-only transport to the powerstove-agent-api backend. Only feature *.service.ts
 * Server Actions call this — client components never fetch() the backend directly.
 */
export async function backendRequest<T>(path: string, options: BackendRequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Request-Id': crypto.randomUUID(),
  };

  if (!options.skipAuth) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AUTH_COOKIE.access)?.value;

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
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

  const payload = (await response.json().catch(() => null)) as BackendEnvelope<T> | null;

  if (!response.ok || !payload || payload.status === 0) {
    throw new BackendRequestError(payload?.message ?? 'Something went wrong', response.status);
  }

  return payload.data as T;
}
