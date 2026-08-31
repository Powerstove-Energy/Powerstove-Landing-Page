import { ResetPasswordForm } from './reset-password-form';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Set a new password</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose a new password for your account.</p>
      {token ? (
        <ResetPasswordForm token={token} />
      ) : (
        <p className="mt-6 text-sm text-destructive">
          This reset link is missing its token. Request a new one from the forgot password page.
        </p>
      )}
    </div>
  );
}
