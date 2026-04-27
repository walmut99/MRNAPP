import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, letterSpacing } from '../../theme';

type Props = {
  name: string;
  value: number;
  unit: string;
  range: string;
  barPct: number;
  onPress?: () => void;
};

export default function BorderlineCard({ name, value, unit, range, barPct, onPress }: Props) {
  const fillPct = Math.max(0, Math.min(100, barPct));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.left}>
        <Text style={styles.pill}>⚠ BORDERLINE</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.range}>Range {range}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>
          {value}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${fillPct}%` }]} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.borderlineLight,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  pressed: {
    opacity: 0.6,
  },
  left: {
    flex: 1,
    gap: 4,
  },
  right: {
    alignItems: 'flex-end',
    gap: 6,
  },
  pill: {
    fontSize: fontSize.sectionLabel,
    fontWeight: '600',
    color: colors.borderline,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel,
  },
  name: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  range: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: fontSize.subtab,
    fontWeight: fontWeight.regular as '400',
    color: colors.textSecondary,
  },
  barTrack: {
    width: 90,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.backgroundSecondary,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.borderline,
  },
});
