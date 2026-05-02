import { consumedToday } from '../data/sarah';

export function useTodaysIntake() {
  return {
    data: consumedToday,
    isLoading: false,
    error: null,
  };
}
