import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

export default function BodyFatScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();
  const [value, setValue] = useState<string>(
    state.bodyFatPct !== null ? String(state.bodyFatPct) : '',
  );

  const onContinue = () => {
    const v = Number(value);
    if (Number.isFinite(v) && v >= 5 && v <= 60) {
      update({ bodyFatPct: v });
    }
    router.push('/onboarding/inbody-upload');
  };

  const onSkip = () => {
    update({ bodyFatPct: null });
    router.push('/onboarding/inbody-upload');
  };

  return (
    <OnboardingShell
      step={displayStep(8, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      onPrimaryPress={onContinue}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="ellipse-outline" />
      </View>

      <Text style={styles.headline}>Do you know your body fat %?</Text>
      <Text style={styles.subtitle}>
        Optional. If you&apos;ve had an InBody or DEXA scan recently, enter it. If not,
        we&apos;ll estimate.
      </Text>

      <View style={styles.inputWrap}>
        <TextInput
          value={value}
          onChangeText={(t) => setValue(t.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad"
          placeholder="Enter %"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
        <Text style={styles.suffix}>%</Text>
      </View>

      <Pressable
        onPress={onSkip}
        style={({ pressed }) => [styles.skip, pressed && { opacity: 0.6 }]}>
        <Text style={styles.skipText}>I don&apos;t know — estimate it</Text>
      </Pressable>
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
  skip: {
    paddingVertical: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
});
