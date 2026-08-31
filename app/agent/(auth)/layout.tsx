import Image from 'next/image';
import { ReactNode } from 'react';

export default function AgentAuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src="/logo.png" alt="PowerStove" width={140} height={40} priority />
        </div>
        <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">{children}</div>
      </div>
    </div>
  );
}
