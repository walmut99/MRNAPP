import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontWeight, spacing } from '../../theme';

type Promise = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const PROMISES: Promise[] = [
  {
    icon: 'person-outline',
    title: 'A few questions',
    description: 'About your basics, your eating habits, and your goals. Takes 4–5 minutes.',
  },
  {
    icon: 'information-circle-outline',
    title: 'Why we ask',
    description:
      'Each answer helps your AI nutritionist personalize your guidance from day one.',
  },
  {
    icon: 'lock-closed-outline',
    title: 'Your data is yours',
    description: 'Encrypted, never sold, never shared. You can delete it anytime.',
  },
];

export default function WhatToExpectScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      <View style={styles.topRow}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}>
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.headline}>Let&apos;s get to know you.</Text>

        <View style={styles.list}>
          {PROMISES.map((p) => (
            <View key={p.title} style={styles.row}>
              <View style={styles.iconTile}>
                <Ionicons name={p.icon} size={18} color={colors.accent} />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.title}>{p.title}</Text>
                <Text style={styles.desc}>{p.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push('/onboarding/dob')}
          style={({ pressed }) => [styles.primary, pressed && { opacity: 0.85 }]}>
          <Text style={styles.primaryText}>Let&apos;s begin</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  topRow: {
    paddingHorizontal: spacing.sectionX,
    paddingTop: 12,
    paddingBottom: 4,
  },
  back: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -4,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.sectionX,
    paddingTop: 24,
  },
  headline: {
    fontSize: 24,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginBottom: 32,
  },
  list: {
    gap: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconTile: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  desc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 13 * 1.5,
  },
  footer: {
    paddingHorizontal: spacing.sectionX,
    paddingBottom: 24,
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
});
