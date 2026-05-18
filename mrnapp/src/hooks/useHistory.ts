import { useEffect, useState } from 'react';

import { bloodPanels, inBodyScans } from '../data/sarah';

// ── Types ─────────────────────────────────────────────────────────────────────

export type BloodMarkerCategory =
  | 'Nutrients'
  | 'Hormonal'
  | 'Metabolic'
  | 'Kidney & Liver'
  | 'Lipids'
  | 'Other';

export type BloodMarkerStatus = 'normal' | 'high' | 'low' | 'borderline';

export type BloodMarker = {
  name: string;
  value: number;
  unit: string;
  status: BloodMarkerStatus;
  range?: string;
  category: BloodMarkerCategory;
};

export type BloodPanel = {
  id: string;
  date: string;
  lab: string;
  markerCount: number;
  flaggedCount: number;
  flaggedHighest: 'high' | 'low' | null;
  markers: BloodMarker[];
};

export type InBodySegmentStatus = 'lower' | 'normal' | 'higher';

export type InBodySegment = {
  kg: number;
  pct: number;
  status: InBodySegmentStatus;
};

export type InBodyScan = {
  id: string;
  date: string;
  scanNumber: number;
  lab: string;
  score: number;
  weight: number;
  bodyFat: number;
  muscle: number;
  fatMass: number;
  bmr: number;
  visceralFat: number;
  water: number;
  protein: number;
  minerals: number;
  segments: {
    leftArm: InBodySegment;
    rightArm: InBodySegment;
    trunk: InBodySegment;
    leftLeg: InBodySegment;
    rightLeg: InBodySegment;
  };
};

// ── Module-level state (same pattern as useSupplements) ───────────────────────

let _panels: BloodPanel[] = bloodPanels as BloodPanel[];
let _scans: InBodyScan[] = inBodyScans as InBodyScan[];

const _panelSubs = new Set<() => void>();
const _scanSubs = new Set<() => void>();

function emitPanels() { _panelSubs.forEach(fn => fn()); }
function emitScans() { _scanSubs.forEach(fn => fn()); }

// ── Hooks ─────────────────────────────────────────────────────────────────────

export function useBloodPanelHistory() {
  const [, tick] = useState(0);

  useEffect(() => {
    const rerender = () => tick(n => n + 1);
    _panelSubs.add(rerender);
    return () => { _panelSubs.delete(rerender); };
  }, []);

  return {
    panels: [..._panels].sort((a, b) => b.date.localeCompare(a.date)),

    deletePanel(id: string) {
      _panels = _panels.filter(p => p.id !== id);
      emitPanels();
    },

    addPanel(panel: BloodPanel) {
      _panels = [panel, ..._panels];
      emitPanels();
    },
  };
}

export function useInBodyScanHistory() {
  const [, tick] = useState(0);

  useEffect(() => {
    const rerender = () => tick(n => n + 1);
    _scanSubs.add(rerender);
    return () => { _scanSubs.delete(rerender); };
  }, []);

  return {
    scans: [..._scans].sort((a, b) => b.date.localeCompare(a.date)),

    deleteScan(id: string) {
      _scans = _scans.filter(s => s.id !== id);
      emitScans();
    },

    addScan(scan: InBodyScan) {
      _scans = [scan, ..._scans];
      emitScans();
    },
  };
}
