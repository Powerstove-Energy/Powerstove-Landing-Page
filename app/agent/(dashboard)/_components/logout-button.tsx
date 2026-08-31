'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { logoutAgent } from '@/app/agent/_lib/services/auth.service';

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleLogout = async () => {
    setPending(true);
    await logoutAgent();
    router.push('/agent/login');
    router.refresh();
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleLogout} isLoading={pending}>
      Log out
    </Button>
  );
}
