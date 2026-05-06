import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

const AVATAR_SIZE = 80;

export default function AIIntroScreen() {
  const router = useRouter();
  const { data: state } = useOnboardingState();

  // The DOB onboarding flow doesn't capture firstName explicitly.
  // We rely on a future personal-details step or fallback.
  const greetingName = '';

  return (
    <OnboardingShell
      step={displayStep(17, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Let's set my goal"
      onPrimaryPress={() => router.push('/onboarding/goal')}>
      <View style={styles.center}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AI</Text>
        </View>

        <Text style={styles.headline}>
          {greetingName
            ? `Hi ${greetingName}. I'm your AI nutritionist.`
            : "Hi there. I'm your AI nutritionist."}
        </Text>

        <Text style={styles.body}>
          Tell me what you want to achieve. I&apos;ll turn it into a plan rooted in your
          real data.
        </Text>
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    gap: 28,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  headline: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22 * 1.3,
    maxWidth: 280,
  },
  body: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15 * 1.6,
    maxWidth: 290,
  },
});
