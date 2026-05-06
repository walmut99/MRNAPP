import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext } from 'react';

export type Sex = 'female' | 'male';
export type ActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active';
export type PregnancyStatus = 'no' | 'pregnant' | 'breastfeeding';
export type GoalType =
  | 'lose_weight'
  | 'reduce_body_fat'
  | 'build_muscle'
  | 'visible_abs'
  | 'eat_healthier'
  | 'wedding'
  | 'custom';

export type OnboardingGoal = {
  type: GoalType;
  description: string;
  targetBodyFatPct?: number;
  timeframeWeeks?: number;
  dailyCalories?: number;
  dailyProteinG?: number;
};

export type OnboardingState = {
  dob: string | null;
  sex: Sex | null;
  heightCm: number | null;
  heightUnit: 'cm' | 'ft';
  weightKg: number | null;
  weightUnit: 'kg' | 'lb';
  activityLevel: ActivityLevel | null;
  bodyFatPct: number | null;
  inbodyUploaded: boolean;
  dietaryRestrictions: string[];
  allergies: string[];
  customAllergies: string[];
  mealsPerDay: 2 | 3 | 4 | null;
  supplements: string[];
  customSupplements: string[];
  medicalSectionSkipped: boolean;
  conditions: string[];
  customConditions: string[];
  conditionsSkipped: boolean;
  pregnancyStatus: PregnancyStatus | null;
  pregnancySkipped: boolean;
  goal: OnboardingGoal | null;
  selectedPlan: 'essentials' | 'premium' | null;
  completed: boolean;
};

export const INITIAL_STATE: OnboardingState = {
  dob: null,
  sex: null,
  heightCm: null,
  heightUnit: 'cm',
  weightKg: null,
  weightUnit: 'kg',
  activityLevel: null,
  bodyFatPct: null,
  inbodyUploaded: false,
  dietaryRestrictions: [],
  allergies: [],
  customAllergies: [],
  mealsPerDay: 3,
  supplements: [],
  customSupplements: [],
  medicalSectionSkipped: false,
  conditions: [],
  customConditions: [],
  conditionsSkipped: false,
  pregnancyStatus: null,
  pregnancySkipped: false,
  goal: null,
  selectedPlan: null,
  completed: false,
};

export const STORAGE_KEY = 'mrn:onboarding:v1';

export type OnboardingContextValue = {
  state: OnboardingState;
  isHydrated: boolean;
  update: (patch: Partial<OnboardingState>) => void;
  reset: () => void;
};

export const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboardingContext(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error(
      'useOnboardingContext must be used inside <OnboardingProvider>',
    );
  }
  return ctx;
}

export async function readPersistedState(): Promise<Partial<OnboardingState> | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<OnboardingState>;
  } catch {
    return null;
  }
}

export async function writePersistedState(state: OnboardingState): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore — non-fatal
  }
}

export async function clearPersistedState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Returns the route the user should land on, given their current state.
 * Used by /onboarding/index.tsx to resume mid-flow.
 */
export function nextRouteForState(state: OnboardingState): string {
  if (state.completed) return '/';
  if (!state.dob) {
    if (!hasSeenIntro(state)) return '/onboarding/welcome';
    return '/onboarding/dob';
  }
  if (!state.sex) return '/onboarding/sex';
  if (!state.heightCm) return '/onboarding/height';
  if (!state.weightKg) return '/onboarding/weight';
  if (!state.activityLevel) return '/onboarding/activity';
  if (state.bodyFatPct === null && !hasAnsweredBodyFat(state)) {
    return '/onboarding/body-fat';
  }
  if (!hasSeenInBodyOffer(state)) return '/onboarding/inbody-upload';
  if (state.dietaryRestrictions.length === 0) return '/onboarding/dietary';
  if (state.allergies.length === 0 && state.customAllergies.length === 0) {
    return '/onboarding/allergies';
  }
  if (state.mealsPerDay === null) return '/onboarding/meals';
  if (state.supplements.length === 0 && state.customSupplements.length === 0) {
    return '/onboarding/supplements';
  }
  if (!state.medicalSectionSkipped) {
    if (
      state.conditions.length === 0 &&
      state.customConditions.length === 0 &&
      !state.conditionsSkipped
    ) {
      return '/onboarding/conditions';
    }
    if (
      state.sex === 'female' &&
      state.pregnancyStatus === null &&
      !state.pregnancySkipped
    ) {
      return '/onboarding/pregnancy';
    }
  }
  if (!state.goal) {
    return '/onboarding/ai-intro';
  }
  if (!state.selectedPlan) return '/onboarding/plan';
  return '/';
}

// Helpers — track "user has at least seen this screen" through proxy fields.
// These can stay loose for the prototype.
function hasSeenIntro(_state: OnboardingState): boolean {
  return false;
}
function hasAnsweredBodyFat(state: OnboardingState): boolean {
  return state.bodyFatPct !== null;
}
function hasSeenInBodyOffer(state: OnboardingState): boolean {
  return state.inbodyUploaded || state.dietaryRestrictions.length > 0;
}
