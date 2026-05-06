import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, letterSpacing } from '../../theme';

type Props = {
  name: string;
  priceText: string;
  description: string;
  ctaLabel: string;
  popular?: boolean;
  onPress: () => void;
};

export default function PlanCard({
  name,
  priceText,
  description,
  ctaLabel,
  popular = false,
  onPress,
}: Props) {
  return (
    <View style={[styles.card, popular ? styles.cardPopular : styles.cardDefault]}>
      {popular ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Our Recommendation</Text>
        </View>
      ) : null}

      <View style={[styles.topRow, popular && { marginTop: 6 }]}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{priceText}</Text>
          <Text style={styles.priceSuffix}>/mo</Text>
        </View>
      </View>

      <Text style={[styles.description, popular ? styles.descPrimary : styles.descSecondary]}>
        {description}
      </Text>

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.cta,
          popular ? styles.ctaPopular : styles.ctaDefault,
          pressed && { opacity: 0.85 },
        ]}>
        <Text style={popular ? styles.ctaTextPopular : styles.ctaTextDefault}>{ctaLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 14,
    padding: 18,
    position: 'relative',
  },
  cardDefault: {
    borderWidth: 1,
    borderColor: colors.borderTertiary,
  },
  cardPopular: {
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  badge: {
    position: 'absolute',
    top: -10,
    left: 18,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.accent,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  priceSuffix: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 12,
    lineHeight: 12 * 1.5,
    marginTop: 8,
    marginBottom: 14,
  },
  descSecondary: {
    color: colors.textSecondary,
  },
  descPrimary: {
    color: colors.textPrimary,
  },
  cta: {
    paddingVertical: 11,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDefault: {
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
  },
  ctaPopular: {
    backgroundColor: colors.accent,
  },
  ctaTextDefault: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  ctaTextPopular: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
});
