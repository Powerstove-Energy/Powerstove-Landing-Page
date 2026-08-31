import Link from 'next/link';
import { RegisterForm } from './register-form';

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Create your agent account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Register to start signing up customers and collecting payments.
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/agent/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
