import type { NextRequest } from 'next/server';
import { API_ROUTES } from '@/lib/api/endpoints';
import { csvDownload } from '../../_lib/csv';

export function GET(request: NextRequest) {
  return csvDownload(request, API_ROUTES.auditor.stovesExport(), 'powerstove-registered-stoves');
}
