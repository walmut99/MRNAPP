import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  saveAmount: number;
  effectiveMonthly: number;
  onPress: () => void;
};

function formatMonthly(value: number): string {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2);
}

export default function AnnualNudgeCard({ saveAmount, effectiveMonthly, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.headline}>Switch to Annual · Save {saveAmount} KWD</Text>
        <Text style={styles.sub}>2 months free · {formatMonthly(effectiveMonthly)} KWD/mo</Text>
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.6 }]}>
        <Text style={styles.ctaText}>Switch</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.accentLight,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 22,
    marginVertical: 14,
    gap: 12,
  },
  left: {
    flex: 1,
    gap: 4,
  },
  headline: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },
  sub: {
    fontSize: 11,
    color: colors.accentDark,
    opacity: 0.8,
  },
  cta: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: colors.accent,
    borderRadius: 9999,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
});
