'use client';

import { ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAssignStoveUnit, useAvailableStoveUnits, useStoveModels } from '@/app/agent/_lib/hooks/use-stoves';

export function AssignStoveDialog({ customerUuid, trigger }: { customerUuid: string; trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [stoveModelUuid, setStoveModelUuid] = useState('');
  const [stoveUnitUuid, setStoveUnitUuid] = useState('');
  const [error, setError] = useState<string | null>(null);

  const stoveModels = useStoveModels();
  const availableUnits = useAvailableStoveUnits(stoveModelUuid || undefined);
  const assignStove = useAssignStoveUnit();

  const reset = () => {
    setOpen(false);
    setStoveModelUuid('');
    setStoveUnitUuid('');
    setError(null);
  };

  const handleConfirm = async () => {
    setError(null);

    if (!stoveUnitUuid) {
      setError('Select a stove unit');
      return;
    }

    const result = await assignStove.mutateAsync({ stoveUnitUuid, customerUuid });

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    toast.success('Stove assigned');
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? setOpen(true) : reset())}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign a stove</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="assign-stove-model">Model</Label>
            <select
              id="assign-stove-model"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
              value={stoveModelUuid}
              onChange={(event) => {
                setStoveModelUuid(event.target.value);
                setStoveUnitUuid('');
              }}
            >
              <option value="">Select a model</option>
              {stoveModels.data?.map((model) => (
                <option key={model.stove_model_uuid} value={model.stove_model_uuid}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="assign-stove-unit">Unit (serial number)</Label>
            <select
              id="assign-stove-unit"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm disabled:opacity-50"
              disabled={!stoveModelUuid}
              value={stoveUnitUuid}
              onChange={(event) => setStoveUnitUuid(event.target.value)}
            >
              <option value="">Select a unit</option>
              {availableUnits.data?.map((unit) => (
                <option key={unit.stove_unit_uuid} value={unit.stove_unit_uuid}>
                  {unit.serial_number}
                </option>
              ))}
            </select>
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={reset} disabled={assignStove.isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} isLoading={assignStove.isPending}>
            Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
