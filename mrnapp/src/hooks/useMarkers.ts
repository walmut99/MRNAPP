import { markers } from '../data/sarah';

export function useMarkers() {
  return {
    data: markers,
    isLoading: false,
    error: null,
  };
}
