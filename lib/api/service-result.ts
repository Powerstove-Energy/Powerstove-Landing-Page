export interface ApiError {
  message: string;
  status: number;
}

export type ServiceResult<T> = { success: true; data: T } | { success: false; error: ApiError };

/** Client-side helper: turns a ServiceResult back into data, or throws the ApiError's message. */
export function unwrapServiceResult<T>(result: ServiceResult<T>): T {
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
}
