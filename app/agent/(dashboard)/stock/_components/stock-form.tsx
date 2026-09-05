'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAddStoveUnits, useAvailableStoveUnits, useStoveModels } from '@/app/agent/_lib/hooks/use-stoves';

export function StockForm() {
  const [modelUuid, setModelUuid] = useState('');
  const [serials, setSerials] = useState('');

  const models = useStoveModels();
  const availableUnits = useAvailableStoveUnits(modelUuid || undefined);
  const addStoveUnits = useAddStoveUnits();

  const parseSerials = (value: string) =>
    [...new Set(value.split('\n').map((line) => line.trim()).filter((line) => line.length > 0))];

  const isSaving = addStoveUnits.isPending;

  const submit = async () => {
    const serialNumbers = parseSerials(serials);
    if (!modelUuid) { toast.error('Select a stove model first.'); return; }
    if (serialNumbers.length === 0) { toast.error('Enter at least one serial number.'); return; }

    const result = await addStoveUnits.mutateAsync({ stove_model_uuid: modelUuid, serial_numbers: serialNumbers });
    if (!result.success) { toast.error(result.error.message); return; }

    const { created, skipped } = result.data;
    toast.success(created > 0 ? `Added ${created} unit(s) to inventory.` : 'No new units added.');
    if (skipped > 0) toast.info(`${skipped} serial number(s) already existed and were skipped.`);
    setSerials('');
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Add stock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="model">Stove model</Label>
            <select
              id="model"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              value={modelUuid}
              onChange={(event) => { setModelUuid(event.target.value); setSerials(''); }}
            >
              <option value="">Select a model</option>
              {models.data?.map((model) => (
                <option key={model.stove_model_uuid} value={model.stove_model_uuid}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="serials">Serial numbers</Label>
            <textarea
              id="serials"
              value={serials}
              onChange={(event) => setSerials(event.target.value)}
              rows={8}
              placeholder={'One serial number per line, e.g.\nPS-0001\nPS-0002'}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
            />
          </div>

          <Button type="button" onClick={submit} disabled={!modelUuid || serials.trim().length === 0} isLoading={isSaving}>
            Add to inventory
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In stock {modelUuid ? `(${availableUnits.data?.length ?? 0})` : ''}</CardTitle>
        </CardHeader>
        <CardContent>
          {!modelUuid ? (
            <p className="text-sm text-muted-foreground">Select a model to see its available units.</p>
          ) : availableUnits.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (availableUnits.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">No units in stock for this model yet.</p>
          ) : (
            <ul className="max-h-96 divide-y divide-border overflow-y-auto text-sm">
              {availableUnits.data?.map((unit) => (
                <li key={unit.stove_unit_uuid} className="py-2 font-mono text-ink">
                  {unit.serial_number}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
