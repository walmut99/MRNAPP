import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, radii } from '../../theme';

export type Treatment = {
  name: string;
  schedule: string;
  nextDose: string;
  streak: number;
  adherence: number;
};

type Props = {
  treatments: Treatment[];
};

export default function TreatmentBlock({ treatments }: Props) {
  if (treatments.length === 0) {
    return (
      <Text style={styles.empty}>
        No treatment tracked. Mention any prescription to your AI nutritionist and they&apos;ll
        add it.
      </Text>
    );
  }

  return (
    <View style={styles.list}>
      {treatments.map((t) => (
        <View key={t.name} style={styles.item}>
          <View style={styles.topRow}>
            <View style={styles.nameCol}>
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.schedule}>{t.schedule}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{t.nextDose}</Text>
            </View>
          </View>
          <Text style={styles.stats}>
            {t.streak}-day streak · {t.adherence}% adherence
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  item: {
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  nameCol: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: fontSize.unit,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  schedule: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.accentLight,
    borderRadius: radii.pill,
  },
  pillText: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },
  stats: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  empty: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 14,
  },
});
