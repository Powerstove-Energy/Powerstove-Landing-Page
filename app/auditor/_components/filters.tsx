'use client';

import { Download, Search } from 'lucide-react';
import { ReactNode } from 'react';

export const selectClassName = 'h-9 rounded-lg border border-border bg-background px-3 text-sm text-ink';

export function SearchInput({ value, onChange, placeholder, label }: { value: string; onChange(value: string): void; placeholder: string; label: string }) {
  return (
    <label className="relative min-w-0 flex-[1_1_15rem]">
      <span className="sr-only">{label}</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-ink placeholder:text-muted-foreground"
      />
    </label>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">{children}</div>;
}

/** A plain link: the browser downloads the CSV the route handler streams back. */
export function ExportLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-ink hover:bg-surface"
    >
      <Download className="size-4" aria-hidden />
      Export CSV
    </a>
  );
}
