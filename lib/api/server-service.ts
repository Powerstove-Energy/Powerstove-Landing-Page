import { BackendRequestError } from './server-api-client';
import { ServiceResult } from './service-result';

/**
 * Wraps a backend call into a plain, serializable ServiceResult — Server Actions must
 * return serializable values, and a thrown class-instance error gets sanitized by
 * Next.js into an opaque message on the client, losing the real error text.
 */
export async function executeBackendService<T>(operation: () => Promise<T>): Promise<ServiceResult<T>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    if (error instanceof BackendRequestError) {
      return { success: false, error: { message: error.message, status: error.status } };
    }

    return { success: false, error: { message: 'Something went wrong', status: 500 } };
  }
}
