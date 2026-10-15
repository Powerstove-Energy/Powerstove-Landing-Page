import type { AuditSummary } from '../_lib/types';

const W = 600;
const H = 220;
const PAD_LEFT = 30;
const PAD_BOTTOM = 26;
const PAD_TOP = 20;

/** Bars per Lagos calendar week; the last bar is the week in progress and drawn lighter. */
export function WeeklyChart({ weeks }: { weeks: AuditSummary['weekly_registrations'] }) {
  const max = Math.max(...weeks.map((week) => week.count), 0);
  const step = Math.max(1, Math.ceil(max / 4));
  const top = step * 4;
  const slot = (W - PAD_LEFT) / weeks.length;
  const y = (value: number) => H - PAD_BOTTOM - (value / top) * (H - PAD_BOTTOM - PAD_TOP);
  const label = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Stoves registered per week over the last 12 weeks">
      {Array.from({ length: 5 }, (_, index) => index * step).map((tick) => (
        <g key={tick}>
          <line x1={PAD_LEFT} x2={W} y1={y(tick)} y2={y(tick)} className="stroke-border" strokeWidth={1} />
          <text x={PAD_LEFT - 8} y={y(tick) + 4} textAnchor="end" className="fill-muted-foreground text-[11px]">
            {tick}
          </text>
        </g>
      ))}
      {weeks.map((week, index) => {
        const current = index === weeks.length - 1;
        const x = PAD_LEFT + index * slot + slot * 0.2;
        const width = slot * 0.6;
        const barTop = y(week.count);
        return (
          <g key={week.week_start}>
            <rect
              x={x}
              y={barTop}
              width={width}
              height={Math.max(H - PAD_BOTTOM - barTop, 0.5)}
              rx={3}
              className={current ? 'fill-primary/30 stroke-primary' : 'fill-primary'}
              strokeDasharray={current ? '3 2' : undefined}
            >
              <title>{`Week of ${label(week.week_start)}: ${week.count} stoves${current ? ' (week in progress)' : ''}`}</title>
            </rect>
            {current || (week.count === max && max > 0) ? (
              <text x={x + width / 2} y={barTop - 6} textAnchor="middle" className="fill-ink text-[11px] font-semibold">
                {week.count}
              </text>
            ) : null}
            {index % 2 === 1 ? (
              <text x={x + width / 2} y={H - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">
                {label(week.week_start)}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
