import { StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  brand: string;
  last4: string;
  expiry: string;
};

export default function PaymentMethodRow({ brand, last4, expiry }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.brand}>
        <Text style={styles.brandText}>{brand}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.number}>•••• •••• •••• {last4}</Text>
        <Text style={styles.expiry}>Expires {expiry}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  brand: {
    width: 42,
    height: 28,
    borderRadius: 4,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 9,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
    letterSpacing: 0.45,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  number: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  expiry: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
