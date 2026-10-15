import { Suspense } from 'react';
import { StovesTable } from '../_components/stoves-table';

export default function AuditorStovesPage() {
  // StovesTable reads ?agent= and ?review= links from the overview and agent records.
  return (
    <Suspense>
      <StovesTable />
    </Suspense>
  );
}
