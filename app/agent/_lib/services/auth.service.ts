'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';
import { clearAuthCookies, setAuthCookies } from '@/lib/auth/session';
import { LoginInput, RegisterInput } from '../schemas/auth.schema';

interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export async function registerAgent(input: RegisterInput): Promise<ServiceResult<{ message: string }>> {
  return executeBackendService(() =>
    backendRequest<{ message: string }>(API_ROUTES.auth.register(), {
      method: 'POST',
      body: {
        full_name: input.full_name,
        email: input.email,
        phone_number: input.phone_number || undefined,
        password: input.password,
      },
      skipAuth: true,
    }),
  );
}

export async function loginAgent(input: LoginInput): Promise<ServiceResult<{ message: string }>> {
  return executeBackendService(async () => {
    const tokens = await backendRequest<AuthTokens>(API_ROUTES.auth.login(), {
      method: 'POST',
      body: input,
      skipAuth: true,
    });

    await setAuthCookies(tokens);
    return { message: 'Login successful' };
  });
}

export async function logoutAgent(): Promise<void> {
  try {
    await backendRequest(API_ROUTES.auth.logout(), { method: 'POST' });
  } finally {
    await clearAuthCookies();
  }
}

export async function verifyAgentEmail(token: string): Promise<ServiceResult<{ message: string }>> {
  return executeBackendService(() =>
    backendRequest<{ message: string }>(API_ROUTES.auth.verifyEmail(), {
      method: 'POST',
      body: { token },
      skipAuth: true,
    }),
  );
}

export async function resendVerificationEmail(email: string): Promise<ServiceResult<{ message: string }>> {
  return executeBackendService(() =>
    backendRequest<{ message: string }>(API_ROUTES.auth.resendVerification(), {
      method: 'POST',
      body: { email },
      skipAuth: true,
    }),
  );
}

export async function requestPasswordReset(email: string): Promise<ServiceResult<{ message: string }>> {
  return executeBackendService(() =>
    backendRequest<{ message: string }>(API_ROUTES.auth.forgotPassword(), {
      method: 'POST',
      body: { email },
      skipAuth: true,
    }),
  );
}

export async function resetAgentPassword(
  token: string,
  newPassword: string,
): Promise<ServiceResult<{ message: string }>> {
  return executeBackendService(() =>
    backendRequest<{ message: string }>(API_ROUTES.auth.resetPassword(), {
      method: 'POST',
      body: { token, new_password: newPassword },
      skipAuth: true,
    }),
  );
}
