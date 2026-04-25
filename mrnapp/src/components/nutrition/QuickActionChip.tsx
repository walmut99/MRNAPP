import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  label: string;
  onPress: () => void;
};

export default function QuickActionChip({ label, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.chip}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: fontWeight.regular as '400',
    color: colors.textPrimary,
  },
});
