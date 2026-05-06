import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import OptionCard from '../../components/onboarding/OptionCard';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { ActivityLevel } from '../../state/onboarding';
import { colors, fontWeight } from '../../theme';

const OPTIONS: { value: ActivityLevel; title: string; description: string }[] = [
  { value: 'sedentary', title: 'Sedentary', description: 'Desk job, little to no exercise' },
  { value: 'lightly_active', title: 'Lightly Active', description: 'Light walks or exercise 1–2 days a week' },
  { value: 'moderately_active', title: 'Moderately Active', description: 'Exercise 3–4 days a week' },
  { value: 'very_active', title: 'Very Active', description: 'Exercise 5+ days a week' },
];

export default function ActivityScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  return (
    <OnboardingShell
      step={displayStep(7, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={state.activityLevel !== null}
      onPrimaryPress={() => router.push('/onboarding/body-fat')}
      scrollable>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="walk-outline" />
      </View>

      <Text style={styles.headline}>How active are you?</Text>
      <Text style={styles.subtitle}>Sets your daily calorie target.</Text>

      <View style={styles.options}>
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.value}
            title={o.title}
            description={o.description}
            selected={state.activityLevel === o.value}
            onPress={() => update({ activityLevel: o.value })}
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
