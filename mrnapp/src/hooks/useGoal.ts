import { goal } from '../data/sarah';

export function useGoal() {
  return {
    data: goal,
    isLoading: false,
    error: null,
  };
}
