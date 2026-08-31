import Link from 'next/link';
import { verifyAgentEmail } from '../../_lib/services/auth.service';

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-ink">Verification link missing</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This link is missing its token. Try registering again or contact support.
        </p>
      </div>
    );
  }

  const result = await verifyAgentEmail(token);

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">
        {result.success ? 'Email verified' : 'Verification failed'}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {result.success ? result.data.message : result.error.message}
      </p>
      <Link href="/agent/login" className="mt-6 inline-block font-medium text-primary hover:underline">
        Go to sign in
      </Link>
    </div>
  );
}
