'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema } from '../../_lib/schemas/auth.schema';
import { requestPasswordReset } from '../../_lib/services/auth.service';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid email');
      return;
    }

    setPending(true);
    const result = await requestPasswordReset(parsed.data.email);
    setPending(false);

    // The backend is deliberately enumeration-resistant — it always responds with the
    // same generic message whether or not the account exists — so the UI does too.
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error.message);
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-lg bg-info-surface p-4 text-sm text-info">
        If an account exists for <strong>{email}</strong>, a password reset link has been sent.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" isLoading={pending}>
        Send reset link
      </Button>
    </form>
  );
}
