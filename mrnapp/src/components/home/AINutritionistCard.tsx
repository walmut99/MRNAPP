import { Pressable, StyleSheet, Text, View } from 'react-native';

import { proactiveMessage } from '../../data/sarah';
import { colors, components, fontSize, fontWeight, radii, spacing } from '../../theme';
import Section from './Section';

function AiAvatar() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>AI</Text>
    </View>
  );
}

function Chip({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <Pressable
      style={[styles.chip, accent && styles.chipAccent]}>
      <Text style={[styles.chipText, accent && styles.chipTextAccent]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function AINutritionistCard() {
  return (
    <Section label="AI nutritionist">
      <View style={styles.card}>
        <AiAvatar />
        <View style={styles.body}>
          <Text style={styles.message}>{proactiveMessage}</Text>
          <View style={styles.chips}>
            <Chip label="What to eat?" accent />
            <Chip label="Log a meal" />
          </View>
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  avatar: {
    width: components.avatar.size,
    height: components.avatar.size,
    borderRadius: components.avatar.size / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.backgroundPrimary,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
  },
  body: {
    flex: 1,
  },
  message: {
    fontSize: fontSize.body,
    lineHeight: fontSize.body * 1.5,
    color: colors.textPrimary,
  },
  chips: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: spacing.chipPadH,
    paddingVertical: spacing.chipPadV,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radii.pill,
  },
  chipAccent: {
    backgroundColor: colors.accentLight,
  },
  chipText: {
    fontSize: fontSize.subtab,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  chipTextAccent: {
    color: colors.accentDark,
  },
});
