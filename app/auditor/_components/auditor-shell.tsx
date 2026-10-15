import { Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { LogoutButton } from '@/app/agent/(dashboard)/_components/logout-button';
import { SessionAgent } from '@/lib/auth/session';
import { AuditorNav } from './auditor-nav';
import { RecordDrawerProvider } from './record-drawer';

export function AuditorShell({ auditor, children }: { auditor: SessionAgent; children: ReactNode }) {
  const initials = auditor.full_name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <RecordDrawerProvider>
      <div className="min-h-screen bg-surface">
        <header className="sticky top-0 z-40 border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <Link href="/auditor" className="flex items-center">
                  <Image src="/logo.png" alt="PowerStove" width={110} height={32} />
                </Link>
                <span className="hidden border-l border-border pl-3 text-sm font-medium text-muted-foreground sm:inline">
                  Auditor
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Lock className="size-3" aria-hidden />
                  Read-only
                </span>
                <span className="hidden text-sm text-muted-foreground md:inline">{auditor.full_name}</span>
                <span
                  className="hidden size-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-ink sm:grid"
                  aria-hidden
                >
                  {initials}
                </span>
                <LogoutButton />
              </div>
            </div>
            <AuditorNav />
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </RecordDrawerProvider>
  );
}
