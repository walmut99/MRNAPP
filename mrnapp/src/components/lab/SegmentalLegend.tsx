import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, fontWeight, letterSpacing } from '../../theme';

type Item = {
  label: string;
  swatch: ViewStyle;
};

const ITEMS: Item[] = [
  { label: 'Lower', swatch: { backgroundColor: colors.warn } },
  { label: 'Normal', swatch: { backgroundColor: colors.accent } },
  {
    label: 'Higher',
    swatch: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.accent,
    },
  },
];

export default function SegmentalLegend() {
  return (
    <View style={styles.row}>
      {ITEMS.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.swatch, item.swatch]} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swatch: {
    width: 9,
    height: 9,
  },
  label: {
    fontSize: 9,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
  },
});
