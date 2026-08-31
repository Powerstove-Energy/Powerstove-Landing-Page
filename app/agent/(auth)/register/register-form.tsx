'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema } from '../../_lib/schemas/auth.schema';
import { registerAgent } from '../../_lib/services/auth.service';

export function RegisterForm() {
  const [values, setValues] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Check the form and try again');
      return;
    }

    setPending(true);
    const result = await registerAgent(parsed.data);
    setPending(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 rounded-lg bg-success-surface p-4 text-sm text-success">
        Registration successful. Check <strong>{values.email}</strong> for a verification link
        before signing in.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          autoComplete="name"
          value={values.full_name}
          onChange={(event) => setValues((prev) => ({ ...prev, full_name: event.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="phone_number">Phone number (optional)</Label>
        <Input
          id="phone_number"
          type="tel"
          autoComplete="tel"
          value={values.phone_number}
          onChange={(event) => setValues((prev) => ({ ...prev, phone_number: event.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => setValues((prev) => ({ ...prev, password: event.target.value }))}
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" isLoading={pending}>
        Create account
      </Button>
    </form>
  );
}
