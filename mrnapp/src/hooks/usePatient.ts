import { patient } from '../data/sarah';

export function usePatient() {
  return {
    data: patient,
    isLoading: false,
    error: null,
  };
}
