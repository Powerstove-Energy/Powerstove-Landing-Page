import { CustomerDetailView } from './_components/customer-detail-view';

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) {
  const { customerId } = await params;

  return <CustomerDetailView customerUuid={customerId} />;
}
