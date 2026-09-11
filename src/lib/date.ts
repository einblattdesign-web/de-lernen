// All "day" comparisons in this app are done on UTC calendar dates so that a
// single self-hosted deployment behaves consistently regardless of server TZ.
export function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function today(): Date {
  return startOfUtcDay(new Date());
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function diffInDays(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((startOfUtcDay(a).getTime() - startOfUtcDay(b).getTime()) / msPerDay);
}

export function isSameUtcDay(a: Date, b: Date): boolean {
  return diffInDays(a, b) === 0;
}

// Exclusive upper bound for "due today or earlier" queries. Using this
// (rather than `today()`) ensures cards scheduled for "now" earlier the same
// day are still picked up, since `today()` alone is midnight UTC.
export function endOfToday(): Date {
  return addDays(today(), 1);
}
