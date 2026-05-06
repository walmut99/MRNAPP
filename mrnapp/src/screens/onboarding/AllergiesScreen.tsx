import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import MultiChipGroup from '../../components/onboarding/MultiChipGroup';
import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const OPTIONS = ['Peanuts', 'Shellfish', 'Eggs', 'Soy', 'Wheat', 'Dairy'];

export default function AllergiesScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const canContinue =
    state.allergies.length > 0 || state.customAllergies.length > 0;

  return (
    <OnboardingShell
      step={displayStep(11, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={canContinue}
      onPrimaryPress={() => router.push('/onboarding/meals')}
      scrollable>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="ban-outline" />
      </View>

      <Text style={styles.headline}>Any allergies or foods to avoid?</Text>
      <Text style={styles.subtitle}>
        Select any that apply. Your AI nutritionist will keep these out of your food.
      </Text>

      <MultiChipGroup
        options={OPTIONS}
        noneLabel="None"
        selected={state.allergies}
        onChange={(next) => update({ allergies: next })}
        customValues={state.customAllergies}
        onCustomChange={(next) => update({ customAllergies: next })}
        enableCustom
        customPlaceholder="e.g. tree nuts"
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
