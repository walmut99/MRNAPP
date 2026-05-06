import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const MIN_AGE_YEARS = 16;

function isValidDob(dd: string, mm: string, yyyy: string): { ok: boolean; error?: string } {
  if (!dd || !mm || !yyyy) return { ok: false };
  const d = Number(dd);
  const m = Number(mm);
  const y = Number(yyyy);
  if (
    !Number.isInteger(d) ||
    !Number.isInteger(m) ||
    !Number.isInteger(y) ||
    d < 1 ||
    d > 31 ||
    m < 1 ||
    m > 12 ||
    y < 1900 ||
    y > 2100
  ) {
    return { ok: false, error: 'Enter a real date' };
  }
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return { ok: false, error: 'Enter a real date' };
  }
  const now = new Date();
  if (date > now) return { ok: false, error: "That's in the future" };
  const minDate = new Date(now.getFullYear() - MIN_AGE_YEARS, now.getMonth(), now.getDate());
  if (date > minDate) {
    return { ok: false, error: `You must be at least ${MIN_AGE_YEARS}` };
  }
  return { ok: true };
}

export default function DateOfBirthScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();
  const [dd, setDd] = useState('');
  const [mm, setMm] = useState('');
  const [yyyy, setYyyy] = useState('');

  const validation = useMemo(() => isValidDob(dd, mm, yyyy), [dd, mm, yyyy]);
  const showError = (dd.length > 0 || mm.length > 0 || yyyy.length > 0) && !validation.ok;

  const onContinue = () => {
    if (!validation.ok) return;
    const iso = new Date(Number(yyyy), Number(mm) - 1, Number(dd)).toISOString();
    update({ dob: iso });
    router.push('/onboarding/sex');
  };

  return (
    <OnboardingShell
      step={displayStep(3, state)}
      totalSteps={totalSteps(state)}
      showBack={false}
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={validation.ok}
      onPrimaryPress={onContinue}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="calendar-outline" />
      </View>

      <Text style={styles.headline}>When were you born?</Text>
      <Text style={styles.subtitle}>
        Age helps set realistic targets and adjusts your daily calorie needs.
      </Text>

      <View style={styles.row}>
        <DatePart placeholder="DD" max={2} value={dd} onChange={setDd} />
        <Text style={styles.divider}>/</Text>
        <DatePart placeholder="MM" max={2} value={mm} onChange={setMm} />
        <Text style={styles.divider}>/</Text>
        <DatePart placeholder="YYYY" max={4} value={yyyy} onChange={setYyyy} flex={2} />
      </View>

      {showError && validation.error ? (
        <Text style={styles.error}>{validation.error}</Text>
      ) : null}
    </OnboardingShell>
  );
}

function DatePart({
  placeholder,
  max,
  value,
  onChange,
  flex = 1,
}: {
  placeholder: string;
  max: number;
  value: string;
  onChange: (v: string) => void;
  flex?: number;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={(t) => onChange(t.replace(/[^0-9]/g, '').slice(0, max))}
      keyboardType="number-pad"
      maxLength={max}
      placeholderTextColor={colors.textSecondary}
      style={[styles.input, { flex }]}
    />
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginTop: 20,
    lineHeight: 24 * 1.25,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 14 * 1.5,
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 12,
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  divider: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  error: {
    marginTop: 10,
    fontSize: 12,
    color: colors.danger,
  },
});
