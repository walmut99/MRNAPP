import { StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, letterSpacing } from '../../theme';

type Props = {
  score: number;
};

export default function InBodyScoreCard({ score }: Props) {
  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.label}>InBody score</Text>
          <Text style={styles.sublabel}>Composite body composition score</Text>
        </View>
        <Text style={styles.score}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.accentLight,
    borderRadius: 14,
    padding: 16,
    gap: 16,
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
  sublabel: {
    fontSize: 10,
    color: colors.accentDark,
    opacity: 0.7,
  },
  score: {
    fontSize: 32,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
    lineHeight: 32,
  },
});
