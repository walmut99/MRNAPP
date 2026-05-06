import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight, spacing } from '../../theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { update } = useOnboardingState();

  const onAlreadyHaveAccount = () => {
    update({ completed: true });
    router.replace('/');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      <View style={styles.topSpacer} />

      <View style={styles.brand}>
        <Text style={styles.brandLatin}>MRN</Text>
        <Text style={styles.brandArabic}>مرن</Text>
      </View>

      <View style={styles.gap40} />

      <Text style={styles.headline}>Health Intelligence, Made for You.</Text>

      <View style={styles.gap16} />

      <Text style={styles.subtitle}>
        An AI nutritionist that learns from your blood work, body composition, and daily
        habits.
      </Text>

      <View style={styles.spacer} />

      <Pressable
        onPress={() => router.push('/onboarding/intro')}
        style={({ pressed }) => [styles.primary, pressed && { opacity: 0.85 }]}>
        <Text style={styles.primaryText}>Get Started</Text>
      </Pressable>

      <Pressable
        onPress={onAlreadyHaveAccount}
        style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.6 }]}>
        <Text style={styles.secondaryText}>I already have an account</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingBottom: 24,
  },
  topSpacer: {
    height: 60,
  },
  brand: {
    alignItems: 'center',
    gap: 4,
  },
  brandLatin: {
    fontSize: 40,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
    letterSpacing: -0.8,
  },
  brandArabic: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  gap16: { height: 16 },
  gap40: { height: 40 },
  spacer: { flex: 1 },
  headline: {
    fontSize: 28,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28 * 1.2,
    maxWidth: 280,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15 * 1.55,
    maxWidth: 280,
    alignSelf: 'center',
  },
  primary: {
    paddingVertical: 14,
    backgroundColor: colors.accent,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  secondary: {
    paddingVertical: 12,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
});
