import { StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

const ITEMS = [
  'Unlimited AI nutritionist messages',
  'Unlimited blood test and InBody uploads',
  'Weekly Sunday review + treatment tracking',
  'Weekly meal plans + shopping lists',
];

export default function WhatPremiumAddsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>What Premium Adds</Text>
      {ITEMS.map((item) => (
        <View key={item} style={styles.row}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 22,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.accentLight,
    gap: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  plus: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
    lineHeight: 12 * 1.5,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 12 * 1.5,
    color: colors.accentDark,
  },
});
