import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';
import { formatNumber } from '../../utils/formatNumber';

type BarColor = 'accent' | 'warn';

type Props = {
  label: string;
  value: number;
  unit: string;
  barPct: number;
  barColor: BarColor;
  tappable?: boolean;
  last?: boolean;
  onPress?: () => void;
};

const BAR_WIDTH = 60;
const BAR_HEIGHT = 3;

function formatValue(v: number): string {
  return Number.isInteger(v) ? formatNumber(v) : v.toString();
}

export default function BodyCompRow({
  label,
  value,
  unit,
  barPct,
  barColor,
  tappable,
  last,
  onPress,
}: Props) {
  const fillPct = Math.max(0, Math.min(100, barPct));
  const fillColor = barColor === 'warn' ? colors.warn : colors.accent;

  const inner = (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {formatValue(value)}
        <Text style={styles.unit}> {unit}</Text>
      </Text>
      <View style={styles.barWrap}>
        <View style={styles.barTrack} />
        <View style={[styles.barFill, { width: `${fillPct}%`, backgroundColor: fillColor }]} />
      </View>
      {tappable ? <Text style={styles.chevron}>›</Text> : <View style={styles.chevronSpacer} />}
    </>
  );

  if (tappable) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, last && styles.rowLast, pressed && styles.pressed]}>
        {inner}
      </Pressable>
    );
  }

  return <View style={[styles.row, last && styles.rowLast]}>{inner}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  value: {
    width: 80,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.regular as '400',
    color: colors.textSecondary,
  },
  barWrap: {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    backgroundColor: colors.borderTertiary,
    borderRadius: BAR_HEIGHT / 2,
    overflow: 'hidden',
  },
  barTrack: {
    ...StyleSheet.absoluteFillObject,
  },
  barFill: {
    height: '100%',
    borderRadius: BAR_HEIGHT / 2,
  },
  chevron: {
    width: 12,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  chevronSpacer: {
    width: 12,
  },
});
