import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const PROMISES: { bold: string; text: string }[] = [
  { bold: 'Encrypted and private.', text: 'Never sold. Never shared.' },
  {
    bold: 'Only used for your guidance.',
    text: 'Your AI nutritionist references this when relevant.',
  },
  {
    bold: "Skip anything you'd rather not answer.",
    text: 'Each question is optional.',
  },
];

export default function PrivacyDisclaimerScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const onSkipSection = () => {
    update({
      medicalSectionSkipped: true,
      conditionsSkipped: true,
      pregnancySkipped: true,
    });
    router.push('/onboarding/ai-intro');
  };

  return (
    <OnboardingShell
      step={displayStep(14, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Continue"
      onPrimaryPress={() => router.push('/onboarding/conditions')}
      secondaryLabel="Skip this section"
      onSecondaryPress={onSkipSection}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="lock-closed-outline" />
      </View>

      <Text style={styles.headline}>A few medical questions next.</Text>
      <Text style={styles.subtitle}>
        These help your AI nutritionist work safely around any conditions you&apos;re
        managing.
      </Text>

      <View style={styles.card}>
        {PROMISES.map((p) => (
          <View key={p.bold} style={styles.row}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>{p.bold}</Text> {p.text}
            </Text>
          </View>
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
    lineHeight: 14 * 1.55,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  check: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: fontWeight.medium as '500',
    lineHeight: 13 * 1.5,
  },
  text: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 13 * 1.5,
  },
  bold: {
    fontWeight: fontWeight.medium as '500',
  },
});
