import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, letterSpacing } from '../../theme';

import type { Cycle } from './BillingCycleToggle';

type Props = {
  name: string;
  monthly: number;
  annual: number;
  annualTotal: number;
  keyLimit: string;
  differentiator: string;
  cycle: Cycle;
  current: boolean;
  popular: boolean;
  onChoose: () => void;
};

function formatPrice(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}

export default function PlanCard({
  name,
  monthly,
  annual,
  annualTotal,
  keyLimit,
  differentiator,
  cycle,
  current,
  popular,
  onChoose,
}: Props) {
  const priceValue = cycle === 'annual' ? annual : monthly;
  const priceText = `${formatPrice(priceValue)} KWD`;

  return (
    <View
      style={[
        styles.card,
        popular ? styles.cardPopular : styles.cardDefault,
      ]}>
      {popular ? (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      ) : null}

      <View style={styles.topRow}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceCol}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{priceText}</Text>
            <Text style={styles.priceSuffix}>/mo</Text>
          </View>
          {cycle === 'annual' ? (
            <Text style={styles.annualTotal}>{annualTotal} KWD/year</Text>
          ) : null}
        </View>
      </View>

      <Text style={styles.keyLimit}>{keyLimit}</Text>
      <Text style={styles.differentiator}>{differentiator}</Text>

      {current ? (
        <View style={[styles.cta, styles.ctaCurrent]}>
          <Text style={styles.ctaCurrentText}>Current Plan</Text>
        </View>
      ) : (
        <Pressable
          onPress={onChoose}
          style={({ pressed }) => [
            styles.cta,
            popular ? styles.ctaPopular : styles.ctaDefault,
            pressed && { opacity: 0.6 },
          ]}>
          <Text style={popular ? styles.ctaPopularText : styles.ctaDefaultText}>
            Choose {name}
          </Text>
        </Pressable>
      )}
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
    borderWidth: 0.5,
    borderColor: colors.borderTertiary,
  },
  cardPopular: {
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 18,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.accent,
    borderRadius: 9999,
  },
  popularText: {
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
  priceCol: {
    alignItems: 'flex-end',
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
  annualTotal: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  keyLimit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 12,
  },
  differentiator: {
    fontSize: 12,
    lineHeight: 12 * 1.5,
    color: colors.textPrimary,
    marginBottom: 14,
  },
  cta: {
    paddingVertical: 10,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaCurrent: {
    backgroundColor: colors.backgroundSecondary,
  },
  ctaCurrentText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
  ctaPopular: {
    backgroundColor: colors.accent,
  },
  ctaPopularText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  ctaDefault: {
    backgroundColor: colors.textPrimary,
  },
  ctaDefaultText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
});
