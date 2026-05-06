import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import OptionCard from '../../components/onboarding/OptionCard';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { Sex } from '../../state/onboarding';
import { colors, fontWeight } from '../../theme';

export default function SexScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const select = (sex: Sex) => update({ sex });

  return (
    <OnboardingShell
      step={displayStep(4, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      primaryEnabled={state.sex !== null}
      onPrimaryPress={() => router.push('/onboarding/height')}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="person-outline" />
      </View>

      <Text style={styles.headline}>What&apos;s your sex?</Text>
      <Text style={styles.subtitle}>
        Your body&apos;s nutritional and metabolic needs differ between sexes.
      </Text>

      <View style={styles.options}>
        <OptionCard title="Female" selected={state.sex === 'female'} onPress={() => select('female')} />
        <OptionCard title="Male" selected={state.sex === 'male'} onPress={() => select('male')} />
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
    marginBottom: 32,
  },
  options: {
    gap: 10,
  },
});
