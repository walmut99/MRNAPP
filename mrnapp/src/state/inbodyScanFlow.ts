import { ParsedInBodyScan } from '../data/mockParsers';

/**
 * Temporary scan that's been parsed but not yet persisted. The parsing screen
 * writes here; the success screen reads. Module-level so it survives the
 * navigation between two modal screens without ceremony.
 */
let pendingScan: ParsedInBodyScan | null = null;

export function setPendingScan(scan: ParsedInBodyScan | null) {
  pendingScan = scan;
}

export function getPendingScan(): ParsedInBodyScan | null {
  return pendingScan;
}

export function clearPendingScan() {
  pendingScan = null;
}
