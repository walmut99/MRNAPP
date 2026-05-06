import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import UnitToggle from '../../components/onboarding/UnitToggle';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const MIN_KG = 30;
const MAX_KG = 300;

export default function WeightScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();
  const [unit, setUnit] = useState<'kg' | 'lb'>(state.weightUnit);
  const initial = state.weightKg
    ? unit === 'kg'
      ? String(state.weightKg)
      : String(Math.round(state.weightKg * 2.2046))
    : '';
  const [value, setValue] = useState<string>(initial);

  const weightKg = useMemo(() => {
    const v = Number(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    return unit === 'kg' ? v : Math.round(v / 2.2046);
  }, [value, unit]);

  const valid = weightKg !== null && weightKg >= MIN_KG && weightKg <= MAX_KG;

  const onContinue = () => {
    if (!valid || weightKg === null) return;
    update({ weightKg, weightUnit: unit });
    router.push('/onboarding/activity');
  };

  return (
    <OnboardingShell
      step={displayStep(6, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={valid}
      onPrimaryPress={onContinue}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="time-outline" />
      </View>

      <Text style={styles.headline}>What&apos;s your current weight?</Text>
      <Text style={styles.subtitle}>Just so we know where you&apos;re starting from.</Text>

      <UnitToggle options={['kg', 'lb'] as const} value={unit} onChange={setUnit} />

      <View style={styles.inputRow}>
        <View style={styles.inputWrap}>
          <TextInput
            value={value}
            onChangeText={(t) => setValue(t.replace(/[^0-9.]/g, ''))}
            keyboardType="decimal-pad"
            placeholder={unit === 'kg' ? '68' : '150'}
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
          <Text style={styles.suffix}>{unit}</Text>
        </View>
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
  inputRow: {
    marginTop: 16,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
  },
  suffix: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
});
