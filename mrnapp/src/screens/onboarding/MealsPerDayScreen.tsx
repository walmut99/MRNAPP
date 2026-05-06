import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const OPTIONS: { value: 2 | 3 | 4; numberLabel: string; descriptor: string }[] = [
  { value: 2, numberLabel: '2', descriptor: 'Skip a meal' },
  { value: 3, numberLabel: '3', descriptor: 'Standard' },
  { value: 4, numberLabel: '4+', descriptor: 'With snacks' },
];

export default function MealsPerDayScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  return (
    <OnboardingShell
      step={displayStep(12, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={state.mealsPerDay !== null}
      onPrimaryPress={() => router.push('/onboarding/supplements')}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="restaurant-outline" />
      </View>

      <Text style={styles.headline}>How many meals a day?</Text>
      <Text style={styles.subtitle}>
        Helps spread your daily targets across the right number of meals.
      </Text>

      <View style={styles.row}>
        {OPTIONS.map((o) => {
          const active = state.mealsPerDay === o.value;
          return (
            <Pressable
              key={o.value}
              onPress={() => update({ mealsPerDay: o.value })}
              style={({ pressed }) => [
                styles.tile,
                active ? styles.tileActive : styles.tileDefault,
                pressed && { opacity: 0.85 },
              ]}>
              <Text style={[styles.number, active && styles.numberActive]}>
                {o.numberLabel}
              </Text>
              <Text style={[styles.descriptor, active && styles.descriptorActive]}>
                {o.descriptor}
              </Text>
            </Pressable>
          );
        })}
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
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  tile: {
    flex: 1,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  tileDefault: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.borderTertiary,
  },
  tileActive: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
  },
  number: {
    fontSize: 28,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  numberActive: {
    color: colors.accentDark,
  },
  descriptor: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  descriptorActive: {
    color: colors.accentDark,
    opacity: 0.8,
  },
});
