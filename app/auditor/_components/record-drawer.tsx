'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { AgentRecord } from './agent-record';
import { StoveRecord } from './stove-record';

type OpenRecord = { kind: 'stove'; id: string } | { kind: 'agent'; id: string };

interface RecordDrawerContextValue {
  openStove(stoveUnitUuid: string): void;
  openAgent(agentUuid: string): void;
  close(): void;
}

const RecordDrawerContext = createContext<RecordDrawerContextValue | null>(null);

export function useRecordDrawer(): RecordDrawerContextValue {
  const value = useContext(RecordDrawerContext);
  if (!value) throw new Error('useRecordDrawer must be used inside RecordDrawerProvider');
  return value;
}

/**
 * One right-hand panel shared by every auditor page. Opening a stove from an agent's
 * record (or the agent from a stove) swaps the panel's content in place.
 */
export function RecordDrawerProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<OpenRecord | null>(null);

  const close = useCallback(() => setRecord(null), []);
  const value = useMemo<RecordDrawerContextValue>(
    () => ({
      openStove: (id) => setRecord({ kind: 'stove', id }),
      openAgent: (id) => setRecord({ kind: 'agent', id }),
      close,
    }),
    [close],
  );

  return (
    <RecordDrawerContext.Provider value={value}>
      {children}
      <RadixDialog.Root open={!!record} onOpenChange={(open) => (open ? null : close())}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className="fixed inset-0 z-50 bg-ink/30" />
          <RadixDialog.Content
            aria-describedby={undefined}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-border bg-background shadow-xl focus:outline-none"
          >
            {record?.kind === 'stove' ? <StoveRecord key={record.id} stoveUnitUuid={record.id} /> : null}
            {record?.kind === 'agent' ? <AgentRecord key={record.id} agentUuid={record.id} /> : null}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </RecordDrawerContext.Provider>
  );
}

/** Header shared by both record types. */
export function RecordHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
        <RadixDialog.Title className="mt-1 text-lg font-semibold text-ink">{title}</RadixDialog.Title>
        {children}
      </div>
      <RadixDialog.Close className="grid size-8 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-surface hover:text-ink">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </RadixDialog.Close>
    </div>
  );
}

export function RecordSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-3 border-b border-border py-5 last:border-b-0">
      {title ? <h3 className="text-sm font-semibold text-ink">{title}</h3> : null}
      {children}
    </section>
  );
}

export function Details({ rows }: { rows: Array<[string, ReactNode]> }) {
  return (
    <dl className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="min-w-0 break-words text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function RecordState({ message, tone = 'muted' }: { message: string; tone?: 'muted' | 'error' }) {
  return (
    <>
      <RecordHeader eyebrow="Record" title={tone === 'error' ? 'Could not load' : 'Loading…'} />
      <p className={`px-6 py-8 text-sm ${tone === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>{message}</p>
    </>
  );
}
