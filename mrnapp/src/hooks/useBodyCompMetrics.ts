import { bodyCompMetrics } from '../data/sarah';

export function useBodyCompMetrics() {
  return {
    data: bodyCompMetrics,
    isLoading: false,
    error: null,
  };
}
