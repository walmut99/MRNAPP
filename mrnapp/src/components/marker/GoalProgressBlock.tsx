import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';

type Props = {
  from: number;
  to: number;
  current: number;
  pct: number;
  unit: string;
};

export default function GoalProgressBlock({ from, to, current, pct, unit }: Props) {
  const fillPct = Math.max(0, Math.min(100, pct));

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Text style={styles.range}>
            {from}
            {unit} → {to}
            {unit}
          </Text>
          <Text style={styles.current}>
            Currently {current}
            {unit}
          </Text>
        </View>
        <Text style={styles.pct}>{Math.round(pct)}%</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${fillPct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  left: {
    flex: 1,
    gap: 2,
  },
  range: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  current: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  pct: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderTertiary,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
});
