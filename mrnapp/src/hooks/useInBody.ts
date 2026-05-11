import { ParsedInBodyScan } from '../data/mockParsers';
import { inbody } from '../data/sarah';
import { addScan, getScanHistory } from '../state/scanHistory';

export function useInBody() {
  return {
    data: inbody,
    scanHistory: getScanHistory(),
    addScan: (scan: ParsedInBodyScan) => addScan(scan),
    isLoading: false,
    error: null,
  };
}
