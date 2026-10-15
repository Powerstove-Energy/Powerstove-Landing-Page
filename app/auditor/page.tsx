import { Overview } from './_components/overview';

export default function AuditorOverviewPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">Registration audit</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Every stove handed over by field agents, with the identity check, delivery evidence and signed carbon
          agreement behind it.
        </p>
      </div>
      <Overview />
    </div>
  );
}
