import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  variant?: 'default' | 'muted' | 'dashed';
  trailingMark?: '✓' | '×' | null;
};

export default function Chip({
  label,
  selected,
  onPress,
  variant = 'default',
  trailingMark = null,
}: Props) {
  const showCheck = selected && trailingMark === null;
  const mark = trailingMark ?? (showCheck ? '✓' : null);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : variant === 'dashed' ? styles.chipDashed : styles.chipDefault,
        pressed && { opacity: 0.7 },
      ]}>
      <Text
        style={[
          styles.label,
          selected
            ? styles.labelSelected
            : variant === 'muted'
              ? styles.labelMuted
              : styles.labelDefault,
        ]}>
        {label}
        {mark ? <Text style={styles.mark}>  {mark}</Text> : null}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9999,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.borderTertiary,
  },
  chipSelected: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
  },
  chipDashed: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.borderTertiary,
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
  },
  labelDefault: {
    color: colors.textPrimary,
  },
  labelMuted: {
    color: colors.textSecondary,
  },
  labelSelected: {
    color: colors.accentDark,
  },
  mark: {
    fontWeight: fontWeight.medium as '500',
  },
});
