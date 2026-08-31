import { CustomersTable } from './_components/customers-table';

export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Customers</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Everyone you&apos;ve registered, and their KYC/payment status.
      </p>
      <div className="mt-6">
        <CustomersTable />
      </div>
    </div>
  );
}
