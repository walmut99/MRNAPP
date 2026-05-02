import { billing } from '../data/sarah';

export function useBilling() {
  return {
    data: billing,
    isLoading: false,
    error: null,
  };
}
