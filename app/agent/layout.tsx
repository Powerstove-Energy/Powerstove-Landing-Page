import { ReactNode } from 'react';
import { AgentProviders } from './_components/agent-providers';

export default function AgentLayout({ children }: { children: ReactNode }) {
  return <AgentProviders>{children}</AgentProviders>;
}
