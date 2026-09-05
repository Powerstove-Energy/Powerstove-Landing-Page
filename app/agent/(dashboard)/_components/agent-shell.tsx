import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { SessionAgent } from '@/lib/auth/session';
import { LogoutButton } from './logout-button';

const NAV_ITEMS = [
  { href: '/agent/dashboard', label: 'Dashboard' },
  { href: '/agent/customers', label: 'Customers' },
  { href: '/agent/stock', label: 'Stock' },
];

export function AgentShell({ agent, children }: { agent: SessionAgent; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/agent/dashboard" className="flex items-center gap-2">
              <Image src="/logo.png" alt="PowerStove" width={110} height={32} />
            </Link>
            <nav className="hidden gap-6 sm:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">{agent.full_name}</span>
            <LogoutButton />
          </div>
        </div>
        <nav className="flex gap-6 border-t border-border px-4 py-2 sm:hidden">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
