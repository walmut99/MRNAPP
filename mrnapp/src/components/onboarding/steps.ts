import { OnboardingState } from '../../state/onboarding';

/**
 * Total visible steps for a given user. Pregnancy (16) is hidden for males,
 * so male flows show 18 and female flows show 19.
 */
export function totalSteps(state: OnboardingState): number {
  return state.sex === 'male' ? 18 : 19;
}

/**
 * Map a screen's intrinsic position (1-19 from the spec) to the displayed
 * step number for the user's path. For male users, screens after pregnancy
 * (17, 18, 19) are renumbered down by 1.
 */
export function displayStep(intrinsicStep: number, state: OnboardingState): number {
  if (state.sex === 'male' && intrinsicStep >= 17) return intrinsicStep - 1;
  return intrinsicStep;
}
