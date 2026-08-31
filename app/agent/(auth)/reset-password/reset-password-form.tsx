'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPasswordSchema } from '../../_lib/schemas/auth.schema';
import { resetAgentPassword } from '../../_lib/services/auth.service';

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [values, setValues] = useState({ password: '', confirm_password: '' });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const parsed = resetPasswordSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Check the form and try again');
      return;
    }

    setPending(true);
    const result = await resetAgentPassword(token, parsed.data.password);
    setPending(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    toast.success('Password reset. Please sign in with your new password.');
    router.push('/agent/login');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="confirm_password">Confirm new password</Label>
        <Input
          id="confirm_password"
          type="password"
          autoComplete="new-password"
          value={values.confirm_password}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, confirm_password: event.target.value }))
          }
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" isLoading={pending}>
        Reset password
      </Button>
    </form>
  );
}
