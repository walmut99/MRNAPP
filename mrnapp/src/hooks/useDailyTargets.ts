import { targets } from '../data/sarah';

export function useDailyTargets() {
  return {
    data: targets,
    isLoading: false,
    error: null,
  };
}
