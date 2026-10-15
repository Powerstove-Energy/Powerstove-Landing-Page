import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { AgentProviders } from '@/app/agent/_components/agent-providers';
import { requireAuditor } from '@/lib/auth/session';
import { AuditorShell } from './_components/auditor-shell';

export const metadata: Metadata = { title: 'Auditor · PowerStove' };

export default async function AuditorLayout({ children }: { children: ReactNode }) {
  const auditor = await requireAuditor();

  return (
    <AgentProviders>
      <AuditorShell auditor={auditor}>{children}</AuditorShell>
    </AgentProviders>
  );
}
