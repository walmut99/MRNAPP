import { StyleSheet, Text, View } from 'react-native';

import { patient } from '../../data/sarah';
import { colors, fontWeight, letterSpacing, spacing } from '../../theme';

const AVATAR_SIZE = 64;

export default function IdentityCard() {
  const meta = `${patient.age} · ${patient.sex} · ${patient.heightCm}cm · ${patient.activity}`;

  return (
    <View style={styles.wrap}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{patient.initials}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>
          {patient.firstName} {patient.lastName}
        </Text>
        <Text style={styles.meta}>{meta}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{patient.plan.toUpperCase()} PLAN</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: spacing.sectionY,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  right: {
    flex: 1,
    gap: 8,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.accentLight,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
  },
});
