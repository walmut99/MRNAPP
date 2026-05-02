import { StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

export type PlanFeature = { label: string; value: string };

type Variant = 'premium' | 'essentials';

type Props = {
  variant: Variant;
  planName: string;
  priceText: string;
  renewalDate: string;
  features: PlanFeature[];
};

export default function CurrentPlanCard({
  variant,
  planName,
  priceText,
  renewalDate,
  features,
}: Props) {
  const isPremium = variant === 'premium';
  const bg = isPremium ? colors.accentLight : colors.backgroundSecondary;
  const primary = isPremium ? colors.accentDark : colors.textPrimary;
  const secondary = isPremium ? colors.accentDark : colors.textSecondary;

  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.topRow}>
        <Text style={[styles.name, { color: primary }]}>{planName}</Text>
        <Text style={[styles.price, { color: primary }]}>{priceText}</Text>
      </View>
      <Text style={[styles.renewal, { color: secondary, opacity: isPremium ? 0.75 : 1 }]}>
        Renews {renewalDate}
      </Text>

      <View style={styles.features}>
        {features.map((f) => (
          <View key={f.label} style={styles.featureRow}>
            <Text style={[styles.featureLabel, { color: primary, opacity: isPremium ? 0.85 : 1 }]}>
              {f.label}
            </Text>
            <Text style={[styles.featureValue, { color: primary }]}>{f.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 22,
    marginVertical: 14,
    padding: 18,
    borderRadius: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
  },
  price: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
  },
  renewal: {
    fontSize: 11,
    marginTop: 4,
  },
  features: {
    marginTop: 14,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureLabel: {
    fontSize: 12,
    flex: 1,
  },
  featureValue: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
  },
});
