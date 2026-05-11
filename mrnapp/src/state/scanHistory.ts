import { ParsedInBodyScan } from '../data/mockParsers';
import { inbody, bodyCompMetrics } from '../data/sarah';

/**
 * In-memory InBody scan history for the prototype. Seeded on module load
 * from Sarah's existing data so the "subsequent scan" success peek has a
 * real prior scan to diff against. Survives navigation; resets on app
 * restart. Replace with a real persistence layer when the backend lands.
 */

type SeedTrendPoint = { date: string; value: number };

function priorValue(metric: 'weight' | 'bodyFat' | 'muscleMass'): number {
  const m = bodyCompMetrics as Record<string, { trend: SeedTrendPoint[] } | undefined>;
  const trend = m[metric]?.trend ?? [];
  return trend[0]?.value ?? 0;
}

const seededPriorScan: ParsedInBodyScan = {
  scanDate: parseSeedDate(inbody.lastScanDate),
  weight: priorValue('weight'),
  bodyFat: priorValue('bodyFat'),
  muscleMass: priorValue('muscleMass'),
  // No historical values for these in the seed — fall back to the latest
  // numbers; the success-screen delta peek doesn't reference them.
  fatMass: 19.2,
  bmr: 1420,
  visceralFat: 6,
  segments: inbody.segments as ParsedInBodyScan['segments'],
};

function parseSeedDate(s: string): string {
  // Sarah's seed uses 'Mar 5, 2026' style strings. Date.parse handles that.
  const t = Date.parse(s);
  return Number.isNaN(t) ? new Date().toISOString() : new Date(t).toISOString();
}

let scanHistory: ParsedInBodyScan[] = [seededPriorScan];

export function getScanHistory(): ParsedInBodyScan[] {
  return scanHistory;
}

export function addScan(scan: ParsedInBodyScan): void {
  scanHistory = [...scanHistory, scan];
}

export function resetScanHistory(): void {
  scanHistory = [seededPriorScan];
}
