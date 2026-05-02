import { meals } from '../data/sarah';

export function useMeals() {
  return {
    data: meals,
    isLoading: false,
    error: null,
  };
}
