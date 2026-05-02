import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  date: string;
  plan: string;
  amount: string;
  onDownload: () => void;
  last?: boolean;
};

export default function InvoiceRow({ date, plan, amount, onDownload, last }: Props) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <View style={styles.left}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.plan}>{plan}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{amount}</Text>
        <Pressable onPress={onDownload} hitSlop={8}>
          <Text style={styles.download}>Download</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  left: {
    flex: 1,
    gap: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  plan: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  amount: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  download: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
  },
});
