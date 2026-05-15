import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import MultiChipGroup from '../../components/onboarding/MultiChipGroup';
import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const OPTIONS = [
  'B12',
  'Collagen',
  'Creatine',
  'Iron',
  'Magnesium glycinate',
  'Multivitamin',
  'Omega-3',
  'Probiotics',
  'Vitamin D3',
  'Zinc',
];

export default function SupplementsScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const canContinue =
    state.supplements.length > 0 || state.customSupplements.length > 0;

  return (
    <OnboardingShell
      step={displayStep(13, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={canContinue}
      onPrimaryPress={() => router.push('/onboarding/medical-intro')}
      scrollable>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="medkit-outline" />
      </View>

      <Text style={styles.headline}>Taking any supplements?</Text>
      <Text style={styles.subtitle}>
        Helps your AI nutritionist see what you&apos;re already covering.
      </Text>

      <MultiChipGroup
        options={OPTIONS}
        noneLabel="None"
        selected={state.supplements}
        onChange={(next) => update({ supplements: next })}
        customValues={state.customSupplements}
        onCustomChange={(next) => update({ customSupplements: next })}
        enableCustom
        customPlaceholder="Type a supplement"
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
