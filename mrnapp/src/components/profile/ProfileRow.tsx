import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  label: string;
  meta?: string;
  onPress: () => void;
  last?: boolean;
};

export default function ProfileRow({ label, meta, onPress, last }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, last && styles.rowLast, pressed && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
      {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
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
    fontWeight: fontWeight.regular as '400',
    color: colors.textPrimary,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chevron: {
    width: 12,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
