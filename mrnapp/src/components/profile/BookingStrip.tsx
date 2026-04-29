import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, letterSpacing } from '../../theme';

type Props = {
  date: string;
  clinic: string;
  phone: string;
};

export default function BookingStrip({ date, clinic, phone }: Props) {
  const onPress = async () => {
    try {
      await Linking.openURL(`tel:${phone}`);
    } catch (err) {
      console.warn('Failed to open dialer', err);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.label}>Next Blood Draw</Text>
        <Text style={styles.value}>
          {date} · {clinic}
        </Text>
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.6 }]}>
        <Text style={styles.ctaText}>Book Now</Text>
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
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 14,
    gap: 12,
  },
  left: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel,
  },
  value: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
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
