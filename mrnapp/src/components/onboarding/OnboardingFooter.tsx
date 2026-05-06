import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, spacing } from '../../theme';

type Props = {
  primaryLabel: string;
  onPrimaryPress: () => void;
  primaryEnabled?: boolean;
  primaryVariant?: 'filled' | 'plain';
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
};

export default function OnboardingFooter({
  primaryLabel,
  onPrimaryPress,
  primaryEnabled = true,
  primaryVariant = 'filled',
  secondaryLabel,
  onSecondaryPress,
}: Props) {
  const isPlain = primaryVariant === 'plain';
  return (
    <View style={styles.wrap}>
      <Pressable
        disabled={!primaryEnabled}
        onPress={onPrimaryPress}
        style={({ pressed }) => [
          isPlain ? styles.plainPrimary : styles.primary,
          !primaryEnabled && { opacity: 0.4 },
          pressed && primaryEnabled && { opacity: isPlain ? 0.6 : 0.85 },
        ]}>
        <Text style={isPlain ? styles.plainPrimaryText : styles.primaryText}>
          {primaryLabel}
        </Text>
      </Pressable>

      {secondaryLabel && onSecondaryPress ? (
        <Pressable
          onPress={onSecondaryPress}
          style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.6 }]}>
          <Text style={styles.secondaryText}>{secondaryLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.sectionX,
    paddingBottom: 24,
    paddingTop: 8,
    gap: 4,
  },
  primary: {
    paddingVertical: 14,
    backgroundColor: colors.accent,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  plainPrimary: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plainPrimaryText: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
  secondary: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
});
