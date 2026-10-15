'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/auditor', label: 'Overview' },
  { href: '/auditor/stoves', label: 'Registered stoves' },
  { href: '/auditor/agents', label: 'Agents' },
];

export function AuditorNav() {
  const pathname = usePathname();
  return (
    <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Auditor sections">
      {TABS.map((tab) => {
        const active = tab.href === '/auditor' ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'whitespace-nowrap border-b-2 px-3 pb-3 pt-2 text-sm font-medium transition-colors',
              active ? 'border-primary text-ink' : 'border-transparent text-muted-foreground hover:text-ink',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
