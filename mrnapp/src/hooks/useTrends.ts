import { bodyCompMetrics, markers } from '../data/sarah';

export type TrendPoint = { date: string; value: number };

type FlaggedLike = { name: string; trend: TrendPoint[] };
type NormalLike = { name: string; trend: TrendPoint[] };
type BodyCompLike = { trend: TrendPoint[] };

export function useTrends(markerKey: string) {
  const flagged = (markers.flagged as FlaggedLike[]).find((m) => m.name === markerKey);
  if (flagged) {
    return { data: flagged.trend, isLoading: false, error: null };
  }

  const normal = (markers.normal as NormalLike[]).find((m) => m.name === markerKey);
  if (normal) {
    return { data: normal.trend, isLoading: false, error: null };
  }

  const bcMap = bodyCompMetrics as Record<string, BodyCompLike | undefined>;
  const bc = bcMap[markerKey];
  if (bc) {
    return { data: bc.trend, isLoading: false, error: null };
  }

  return { data: null as TrendPoint[] | null, isLoading: false, error: null };
}
