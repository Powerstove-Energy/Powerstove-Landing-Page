import { ReactNode } from 'react';
import { requireAgent } from '@/lib/auth/session';
import { AgentShell } from './_components/agent-shell';

export default async function AgentDashboardLayout({ children }: { children: ReactNode }) {
  const agent = await requireAgent();

  return <AgentShell agent={agent}>{children}</AgentShell>;
}
