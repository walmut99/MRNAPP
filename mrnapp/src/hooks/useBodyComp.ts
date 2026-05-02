import { bodyComp } from '../data/sarah';

export function useBodyComp() {
  return {
    data: bodyComp,
    isLoading: false,
    error: null,
  };
}
