import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import UnitToggle from '../../components/onboarding/UnitToggle';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const MIN_CM = 100;
const MAX_CM = 250;

export default function HeightScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();
  const [unit, setUnit] = useState<'cm' | 'ft'>(state.heightUnit);
  const [cm, setCm] = useState<string>(state.heightCm ? String(state.heightCm) : '');
  const [ft, setFt] = useState<string>('');
  const [inches, setInches] = useState<string>('');

  useEffect(() => {
    if (unit === 'ft' && state.heightCm) {
      const totalIn = state.heightCm / 2.54;
      const f = Math.floor(totalIn / 12);
      const i = Math.round(totalIn - f * 12);
      setFt(String(f));
      setInches(String(i));
    }
  }, [unit, state.heightCm]);

  const heightCm = useMemo(() => {
    if (unit === 'cm') {
      const v = Number(cm);
      return Number.isFinite(v) && v > 0 ? v : null;
    }
    const f = Number(ft);
    const i = Number(inches || '0');
    if (!Number.isFinite(f) || f <= 0) return null;
    return Math.round((f * 12 + i) * 2.54);
  }, [unit, cm, ft, inches]);

  const valid = heightCm !== null && heightCm >= MIN_CM && heightCm <= MAX_CM;

  const onContinue = () => {
    if (!valid || heightCm === null) return;
    update({ heightCm, heightUnit: unit });
    router.push('/onboarding/weight');
  };

  return (
    <OnboardingShell
      step={displayStep(5, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={valid}
      onPrimaryPress={onContinue}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="resize-outline" />
      </View>

      <Text style={styles.headline}>How tall are you?</Text>
      <Text style={styles.subtitle}>
        We use this with your weight to estimate body composition.
      </Text>

      <UnitToggle options={['cm', 'ft'] as const} value={unit} onChange={setUnit} />

      <View style={styles.inputRow}>
        {unit === 'cm' ? (
          <View style={styles.inputWrap}>
            <TextInput
              value={cm}
              onChangeText={(t) => setCm(t.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              placeholder="165"
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />
            <Text style={styles.suffix}>cm</Text>
          </View>
        ) : (
          <View style={styles.inputDuo}>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <TextInput
                value={ft}
                onChangeText={(t) => setFt(t.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder="5"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
              />
              <Text style={styles.suffix}>ft</Text>
            </View>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <TextInput
                value={inches}
                onChangeText={(t) => setInches(t.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder="5"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
              />
              <Text style={styles.suffix}>in</Text>
            </View>
          </View>
        )}
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
  inputDuo: {
    flexDirection: 'row',
    gap: 10,
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
