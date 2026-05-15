import { patient } from '../data/sarah';

export function usePatient() {
  const subscriptionTier: 'essentials' | 'premium' =
    patient.plan === 'Premium' ? 'premium' : 'essentials';
  return {
    data: patient,
    subscriptionTier,
    isLoading: false,
    error: null,
  };
}
