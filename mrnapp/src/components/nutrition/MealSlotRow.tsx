import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';

export type MealSource = 'AI' | 'Saved';

type Props = {
  meal: string;
  dish: string;
  macros: string;
  source: MealSource;
  last?: boolean;
};

export default function MealSlotRow({ meal, dish, macros, source, last }: Props) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <View style={styles.left}>
        <Text style={styles.meal}>{meal}</Text>
        <Text style={styles.dish}>{dish}</Text>
      </View>

      <Text style={styles.macros}>{macros}</Text>

      <View style={styles.right}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{source}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 12,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  left: {
    flex: 1,
    gap: 2,
  },
  meal: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  dish: {
    fontSize: fontSize.subtab,
    color: colors.textSecondary,
  },
  macros: {
    fontSize: fontSize.subtab,
    color: colors.textSecondary,
  },
  right: {
    minWidth: 56,
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.accentLight,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.accentDark,
  },
});
