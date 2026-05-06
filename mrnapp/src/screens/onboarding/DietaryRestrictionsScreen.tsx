import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import MultiChipGroup from '../../components/onboarding/MultiChipGroup';
import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Halal',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
];

export default function DietaryRestrictionsScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const canContinue = state.dietaryRestrictions.length > 0;

  return (
    <OnboardingShell
      step={displayStep(10, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={canContinue}
      onPrimaryPress={() => router.push('/onboarding/allergies')}
      scrollable>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="locate-outline" />
      </View>

      <Text style={styles.headline}>Any dietary restrictions?</Text>
      <Text style={styles.subtitle}>
        Select all that apply. Your AI nutritionist will work around them.
      </Text>

      <MultiChipGroup
        options={OPTIONS}
        noneLabel="None"
        selected={state.dietaryRestrictions}
        onChange={(next) => update({ dietaryRestrictions: next })}
      />
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
    lineHeight: 24 * 1.25,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 14 * 1.5,
    marginBottom: 24,
  },
});
