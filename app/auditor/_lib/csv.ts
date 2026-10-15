import type { NextRequest } from 'next/server';
import { backendRequest, BackendRequestError } from '@/lib/api/server-api-client';

/** Quotes every cell and defuses spreadsheet formulas (=, +, @, or - followed by a non-digit). */
function cell(value: unknown): string {
  let text = value === null || value === undefined ? '' : String(value);
  if (/^[=+@]/.test(text) || /^-[^\d]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function toCsv(rows: Array<Record<string, unknown>>): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  return [headers.map(cell).join(','), ...rows.map((row) => headers.map((key) => cell(row[key])).join(','))].join('\r\n');
}

/** Fetches an auditor export from the backend (filters pass straight through) and returns it as a CSV download. */
export async function csvDownload(request: NextRequest, backendPath: string, filenamePrefix: string): Promise<Response> {
  try {
    const rows = await backendRequest<Array<Record<string, unknown>>>(`${backendPath}${request.nextUrl.search}`);
    const date = new Date().toISOString().slice(0, 10);
    // BOM so Excel opens UTF-8 names correctly.
    return new Response(`﻿${toCsv(rows)}`, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filenamePrefix}-${date}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const status = error instanceof BackendRequestError && error.status >= 400 ? error.status : 502;
    const message = error instanceof Error ? error.message : 'Export failed';
    return new Response(message, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}
