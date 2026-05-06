import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
};

export default function OptionCard({ title, description, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.cardSelected : styles.cardDefault,
        pressed && { opacity: 0.85 },
      ]}>
      <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, selected && styles.descriptionSelected]}>
          {description}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  cardDefault: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.borderTertiary,
  },
  cardSelected: {
    backgroundColor: colors.accentLight,
    borderColor: colors.accent,
  },
  title: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  titleSelected: {
    color: colors.accentDark,
  },
  description: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 12 * 1.4,
  },
  descriptionSelected: {
    color: colors.accentDark,
    opacity: 0.85,
  },
});
