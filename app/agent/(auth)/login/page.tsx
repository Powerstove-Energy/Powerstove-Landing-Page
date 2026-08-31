import Link from 'next/link';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Agent sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to register customers and manage payments.
      </p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/agent/register" className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
