import { useOnboardingContext, OnboardingState } from '../state/onboarding';

type Result = {
  data: OnboardingState;
  isLoading: boolean;
  error: null;
  update: (patch: Partial<OnboardingState>) => void;
  reset: () => void;
};

export function useOnboardingState(): Result {
  const { state, isHydrated, update, reset } = useOnboardingContext();
  return {
    data: state,
    isLoading: !isHydrated,
    error: null,
    update,
    reset,
  };
}
