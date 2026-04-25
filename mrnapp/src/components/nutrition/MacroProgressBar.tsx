import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';
import { formatNumber } from '../../utils/formatNumber';

type Props = {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string;
};

export default function MacroProgressBar({ name, current, target, unit, color }: Props) {
  const pct = target > 0 ? Math.max(0, Math.min(100, (current / target) * 100)) : 0;
  const pctRounded = Math.round(pct);

  return (
    <View style={styles.row}>
      <View style={styles.headRow}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.values}>
            {formatNumber(current)} of {formatNumber(target)}
            {unit}
          </Text>
        </View>
        <Text style={styles.pct}>{pctRounded}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 6,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  values: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pct: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderTertiary,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
