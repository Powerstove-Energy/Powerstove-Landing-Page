'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';

export type UploadKind = 'customer_photo' | 'stove_photo' | 'signature';

export interface UploadSignature {
  upload_url: string;
  cloud_name: string;
  api_key: string;
  timestamp: number;
  signature: string;
  public_id: string;
  allowed_formats: string;
  format?: string;
  transformation?: string;
  overwrite: boolean;
  invalidate: boolean;
}

export interface ClaimedAsset {
  secure_url: string;
  public_id: string;
  version: number;
}

export async function createUploadSignature(
  kind: UploadKind,
  registrationReference: string,
): Promise<ServiceResult<UploadSignature>> {
  return executeBackendService(() =>
    backendRequest<UploadSignature>(API_ROUTES.media.uploadSignature(), {
      method: 'POST',
      body: { kind, registration_reference: registrationReference },
    }),
  );
}
