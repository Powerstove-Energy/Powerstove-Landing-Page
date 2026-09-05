import { StockForm } from './_components/stock-form';

export default function StockPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Stock</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add stove serial numbers to inventory. Enter one serial number per line.
      </p>
      <div className="mt-6">
        <StockForm />
      </div>
    </div>
  );
}
