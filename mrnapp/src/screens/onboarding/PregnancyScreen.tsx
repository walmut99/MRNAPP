import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import OptionCard from '../../components/onboarding/OptionCard';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { PregnancyStatus } from '../../state/onboarding';
import { colors, fontWeight } from '../../theme';

const OPTIONS: { value: PregnancyStatus; title: string }[] = [
  { value: 'no', title: 'No' },
  { value: 'pregnant', title: 'Pregnant' },
  { value: 'breastfeeding', title: 'Breastfeeding' },
];

export default function PregnancyScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const proceed = (skipped: boolean) => {
    update({ pregnancySkipped: skipped });
    router.push('/onboarding/ai-intro');
  };

  return (
    <OnboardingShell
      step={displayStep(16, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={state.pregnancyStatus !== null}
      onPrimaryPress={() => proceed(false)}
      secondaryLabel="Skip this question"
      onSecondaryPress={() => proceed(true)}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="people-outline" />
      </View>

      <Text style={styles.headline}>Are you pregnant or breastfeeding?</Text>
      <Text style={styles.subtitle}>
        Calorie and nutrient needs change significantly during these times.
      </Text>

      <View style={styles.options}>
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.value}
            title={o.title}
            selected={state.pregnancyStatus === o.value}
            onPress={() => update({ pregnancyStatus: o.value })}
          />
        ))}
      </View>
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
  options: {
    gap: 10,
  },
});
