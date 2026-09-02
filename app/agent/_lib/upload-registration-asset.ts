import { createUploadSignature } from './services/media.service';
import type { ClaimedAsset, UploadKind, UploadSignature } from './services/media.service';

function appendSignedParameters(formData: FormData, signature: UploadSignature): void {
  formData.append('api_key', signature.api_key);
  formData.append('timestamp', String(signature.timestamp));
  formData.append('signature', signature.signature);
  formData.append('public_id', signature.public_id);
  formData.append('allowed_formats', signature.allowed_formats);
  formData.append('overwrite', String(signature.overwrite));
  formData.append('invalidate', String(signature.invalidate));

  if (signature.format) formData.append('format', signature.format);
  if (signature.transformation) formData.append('transformation', signature.transformation);
}

function isClaimedAsset(value: unknown): value is ClaimedAsset {
  if (!value || typeof value !== 'object') return false;
  const asset = value as Record<string, unknown>;
  return (
    typeof asset.secure_url === 'string' &&
    typeof asset.public_id === 'string' &&
    typeof asset.version === 'number'
  );
}

/**
 * Uploads directly from the agent's browser to Cloudinary. The app server only
 * issues a short-lived signed authorization; it never receives image bytes.
 */
export async function uploadRegistrationAsset(
  file: File,
  kind: UploadKind,
  registrationReference: string,
): Promise<ClaimedAsset> {
  const signatureResult = await createUploadSignature(kind, registrationReference);
  if (!signatureResult.success) {
    throw new Error(signatureResult.error.message);
  }

  const formData = new FormData();
  formData.append('file', file);
  appendSignedParameters(formData, signatureResult.data);

  const response = await fetch(signatureResult.data.upload_url, { method: 'POST', body: formData });
  const body: unknown = await response.json().catch(() => null);

  if (!response.ok || !isClaimedAsset(body)) {
    throw new Error('Could not upload the image. Please try again.');
  }

  if (body.public_id !== signatureResult.data.public_id) {
    throw new Error('The uploaded image could not be matched to this registration.');
  }

  return body;
}
