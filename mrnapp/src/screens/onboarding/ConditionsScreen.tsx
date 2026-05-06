import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import MultiChipGroup from '../../components/onboarding/MultiChipGroup';
import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const OPTIONS = [
  'Diabetes',
  'PCOS',
  'Thyroid Disorder',
  'Anemia',
  'Hypertension',
  'High Cholesterol',
  'IBS',
];

export default function ConditionsScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const proceed = (skipped: boolean) => {
    update({ conditionsSkipped: skipped });
    if (state.sex === 'male') {
      router.push('/onboarding/ai-intro');
    } else {
      router.push('/onboarding/pregnancy');
    }
  };

  return (
    <OnboardingShell
      step={displayStep(15, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      onPrimaryPress={() => proceed(false)}
      secondaryLabel="Skip this question"
      onSecondaryPress={() => proceed(true)}
      scrollable>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="pulse-outline" />
      </View>

      <Text style={styles.headline}>Any diagnosed conditions?</Text>
      <Text style={styles.subtitle}>
        Your AI nutritionist will work safely around them.
      </Text>

      <MultiChipGroup
        options={OPTIONS}
        noneLabel="None"
        selected={state.conditions}
        onChange={(next) => update({ conditions: next })}
        customValues={state.customConditions}
        onCustomChange={(next) => update({ customConditions: next })}
        enableCustom
        customPlaceholder="Type a condition"
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
