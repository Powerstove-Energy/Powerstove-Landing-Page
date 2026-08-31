import { KpiCards } from './_components/kpi-cards';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">A quick overview of your activity.</p>
      <div className="mt-6">
        <KpiCards />
      </div>
    </div>
  );
}
