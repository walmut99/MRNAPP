import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';

type Props = {
  name: string;
  value: string;
  barPct: number;
  last?: boolean;
  onPress?: () => void;
};

const BAR_WIDTH = 60;
const DOT_SIZE = 6;

export default function NormalMarkerRow({ name, value, barPct, last, onPress }: Props) {
  const clamped = Math.max(0, Math.min(100, barPct));
  const dotLeft = (BAR_WIDTH - DOT_SIZE) * (clamped / 100);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, last && styles.rowLast, pressed && styles.pressed]}>
      <View style={styles.dot} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <View style={styles.barWrap}>
        <View style={styles.barTrack} />
        <View style={[styles.barDot, { left: dotLeft }]} />
      </View>
      <Text style={styles.value}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  pressed: {
    opacity: 0.6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  name: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
  },
  barWrap: {
    width: BAR_WIDTH,
    height: DOT_SIZE,
    justifyContent: 'center',
  },
  barTrack: {
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.borderTertiary,
  },
  barDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.accent,
  },
  value: {
    fontSize: fontSize.subtab,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'right',
  },
});
