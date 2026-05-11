import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, spacing } from '../../theme';

type Props = {
  title: string;
  onClose: () => void;
};

export default function ModalHeader({ title, onClose }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable
        onPress={onClose}
        hitSlop={8}
        style={({ pressed }) => [styles.close, pressed && { opacity: 0.6 }]}
        accessibilityRole="button"
        accessibilityLabel="Close">
        <Ionicons name="close" size={22} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  close: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -6,
  },
});
