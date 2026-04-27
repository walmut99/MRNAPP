import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, letterSpacing, spacing } from '../../theme';

type Props = {
  label: string;
  value: string;
  ctaLabel: string;
  onPress: () => void;
};

export default function TopStrip({ label, value, ctaLabel, onPress }: Props) {
  return (
    <View style={styles.strip}>
      <View style={styles.left}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Pressable onPress={onPress} style={styles.cta}>
        <Text style={styles.ctaText}>{ctaLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 12,
  },
  left: {
    gap: 4,
  },
  label: {
    fontSize: fontSize.sectionLabel,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel,
    fontWeight: fontWeight.medium as '500',
  },
  value: {
    fontSize: fontSize.unit,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  cta: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.accent,
    borderRadius: 22,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
});
