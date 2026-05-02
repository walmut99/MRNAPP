import { plans } from '../data/sarah';

export function usePlans() {
  return {
    data: plans,
    isLoading: false,
    error: null,
  };
}
