const TIME_ZONE = 'Africa/Lagos';

export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TIME_ZONE });
}

export function formatDateTime(value: string | Date): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  });
}

/** "Today", "Yesterday" or "12 days ago". */
export function daysAgo(value: string | Date, now = new Date()): string {
  const days = Math.floor((now.getTime() - new Date(value).getTime()) / 86_400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export function formatNaira(kobo: number): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(
    kobo / 100,
  );
}

export function formatPercent(value: number | null): string {
  return value === null ? '—' : `${value}%`;
}
