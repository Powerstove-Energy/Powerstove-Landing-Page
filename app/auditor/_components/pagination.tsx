'use client';

import { Button } from '@/components/ui/button';
import type { PageInfo } from '@/app/agent/_lib/types';

export function Pagination({ pageInfo, noun, onPage }: { pageInfo: PageInfo; noun: string; onPage(page: number): void }) {
  const first = pageInfo.total === 0 ? 0 : (pageInfo.page - 1) * pageInfo.limit + 1;
  const last = Math.min(pageInfo.page * pageInfo.limit, pageInfo.total);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground">
      <span className="tabular-nums">
        {pageInfo.total === 0 ? `No ${noun}` : `Showing ${first}–${last} of ${pageInfo.total} ${noun}`}
      </span>
      {pageInfo.total_pages > 1 ? (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled={pageInfo.page <= 1} onClick={() => onPage(pageInfo.page - 1)}>
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={pageInfo.page >= pageInfo.total_pages}
            onClick={() => onPage(pageInfo.page + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
