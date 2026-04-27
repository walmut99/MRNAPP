import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, fontSize, fontWeight, letterSpacing, spacing } from '../../theme';

type Props = {
  label: string;
  count?: string;
  right?: ReactNode;
  children: ReactNode;
  tight?: boolean;
  style?: ViewStyle;
};

export default function Section({ label, count, right, children, tight, style }: Props) {
  return (
    <View style={[styles.section, tight && styles.sectionTight, style]}>
      <View style={styles.head}>
        <Text style={styles.label}>{label}</Text>
        {right ? right : count ? <Text style={[styles.label, styles.count]}>{count}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: spacing.sectionY,
    paddingHorizontal: spacing.sectionX,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: spacing.divider,
    borderBottomColor: colors.borderTertiary,
  },
  sectionTight: {
    paddingTop: spacing.sectionTight,
    paddingBottom: spacing.sectionTight,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sectionHead,
  },
  label: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: letterSpacing.sectionLabel,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  count: {
    fontWeight: fontWeight.regular as '400',
  },
});
