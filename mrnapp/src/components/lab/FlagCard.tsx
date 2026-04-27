import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, letterSpacing } from '../../theme';

type Status = 'high' | 'low';

type Props = {
  status: Status;
  name: string;
  value: number;
  unit: string;
  range: string;
  barPct: number;
  onPress?: () => void;
};

const STATUS_TOKENS: Record<Status, { bg: string; fg: string; arrow: string; label: string }> = {
  high: { bg: colors.dangerLight, fg: colors.danger, arrow: '↑', label: 'HIGH' },
  low: { bg: colors.warnLight, fg: colors.warn, arrow: '↓', label: 'LOW' },
};

export default function FlagCard({ status, name, value, unit, range, barPct, onPress }: Props) {
  const tokens = STATUS_TOKENS[status];
  const fillPct = Math.max(0, Math.min(100, barPct));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: tokens.bg },
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.pill, { color: tokens.fg }]}>
        {tokens.arrow} {tokens.label}
      </Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>
        {value}
        <Text style={styles.unit}> {unit}</Text>
      </Text>
      <Text style={styles.range}>Range {range}</Text>
      <View style={styles.barTrack}>
        <View
          style={[styles.barFill, { width: `${fillPct}%`, backgroundColor: tokens.fg }]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  pressed: {
    opacity: 0.6,
  },
  pill: {
    fontSize: fontSize.sectionLabel,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel,
  },
  name: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginTop: 2,
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
  range: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  barTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.backgroundSecondary,
    overflow: 'hidden',
    marginTop: 6,
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
