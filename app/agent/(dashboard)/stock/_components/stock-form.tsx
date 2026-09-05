'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAddStoveUnits, useAvailableStoveUnits, useStoveModels } from '@/app/agent/_lib/hooks/use-stoves';

// Per-request batch ceiling. Huge pastes (e.g. 100,000 serials) are split into
// chunks of this size and sent sequentially to keep each payload + the API's
// per-request validation (ArrayMaxSize) comfortable.
const BATCH_SIZE = 1000;

export function StockForm() {
  const [modelUuid, setModelUuid] = useState('');
  const [serials, setSerials] = useState('');
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const models = useStoveModels();
  const availableUnits = useAvailableStoveUnits(modelUuid || undefined);
  const addStoveUnits = useAddStoveUnits();

  const parseSerials = (value: string) =>
    [...new Set(value.split('\n').map((line) => line.trim()).filter((line) => line.length > 0))];

  const isSaving = addStoveUnits.isPending || progress !== null;

  const submit = async () => {
    const serialNumbers = parseSerials(serials);
    if (!modelUuid) { toast.error('Select a stove model first.'); return; }
    if (serialNumbers.length === 0) { toast.error('Enter at least one serial number.'); return; }

    const chunks: string[][] = [];
    for (let i = 0; i < serialNumbers.length; i += BATCH_SIZE) {
      chunks.push(serialNumbers.slice(i, i + BATCH_SIZE));
    }

    setProgress({ current: 0, total: chunks.length });
    let created = 0;
    let skipped = 0;

    try {
      for (let i = 0; i < chunks.length; i += 1) {
        setProgress({ current: i + 1, total: chunks.length });
        const result = await addStoveUnits.mutateAsync({
          stove_model_uuid: modelUuid,
          serial_numbers: chunks[i],
        });
        if (!result.success) {
          toast.error(`Batch ${i + 1} failed: ${result.error.message}. Nothing from this batch was added.`);
          return;
        }
        created += result.data.created;
        skipped += result.data.skipped;
      }

      toast.success(created > 0 ? `Added ${created.toLocaleString()} unit(s) to inventory.` : 'No new units added.');
      if (skipped > 0) toast.info(`${skipped.toLocaleString()} serial number(s) already existed and were skipped.`);
      setSerials('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed. Try again.');
    } finally {
      setProgress(null);
    }
  };

  // The in-stock list can be large — show the first batch and the full count.
  const shownUnits = availableUnits.data?.slice(0, 200) ?? [];
  const totalUnits = availableUnits.data?.length ?? 0;

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
            {parsedCount(serials) > 1 ? (
              <p className="mt-1 text-xs text-muted-foreground">{parsedCount(serials).toLocaleString()} serial number(s) detected.</p>
            ) : null}
          </div>

          {progress ? (
            <div className="rounded-lg border border-border p-3">
              <p className="text-sm text-ink">
                Uploading batch {progress.current} of {progress.total}…
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div className="h-full bg-success transition-all" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
              </div>
            </div>
          ) : null}

          <Button type="button" onClick={submit} disabled={!modelUuid || serials.trim().length === 0} isLoading={isSaving}>
            Add to inventory
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In stock {modelUuid ? `(${totalUnits.toLocaleString()})` : ''}</CardTitle>
        </CardHeader>
        <CardContent>
          {!modelUuid ? (
            <p className="text-sm text-muted-foreground">Select a model to see its available units.</p>
          ) : availableUnits.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : totalUnits === 0 ? (
            <p className="text-sm text-muted-foreground">No units in stock for this model yet.</p>
          ) : (
            <>
              <ul className="max-h-96 divide-y divide-border overflow-y-auto text-sm">
                {shownUnits.map((unit) => (
                  <li key={unit.stove_unit_uuid} className="py-2 font-mono text-ink">
                    {unit.serial_number}
                  </li>
                ))}
              </ul>
              {totalUnits > shownUnits.length ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  Showing {shownUnits.length.toLocaleString()} of {totalUnits.toLocaleString()} units in stock.
                </p>
              ) : null}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function parsedCount(value: string): number {
  return new Set(value.split('\n').map((line) => line.trim()).filter(Boolean)).size;
}
