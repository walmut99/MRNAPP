import { StyleSheet, Text, View } from 'react-native';

import { useGoal } from '../../hooks';
import { colors, fontSize, fontWeight, radii, spacing } from '../../theme';
import Section from './Section';

function Thumb({ label }: { label: string }) {
  return (
    <View style={styles.thumb}>
      <View style={styles.thumbLabelWrap}>
        <Text style={styles.thumbLabel}>{label}</Text>
      </View>
    </View>
  );
}

export default function ProgressSection() {
  const { data: goal } = useGoal();
  const percent = Math.max(0, Math.min(100, goal?.percent ?? 0));

  return (
    <Section
      label="Progress"
      count={`Week ${goal?.week ?? 0} of ${goal?.totalWeeks ?? 0}`}>
      <View style={styles.thumbs}>
        <Thumb label="Week 0" />
        <Thumb label={`Week ${goal?.week ?? 0}`} />
      </View>
      <View style={styles.goal}>
        <View style={styles.goalRow}>
          <Text style={styles.goalLabel}>
            Body fat {goal?.from ?? 0}% → {goal?.to ?? 0}%
          </Text>
          <Text style={styles.goalValue}>{goal?.percent ?? 0}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  thumbs: {
    flexDirection: 'row',
    gap: spacing.progressThumbGap,
  },
  thumb: {
    flex: 1,
    aspectRatio: 3 / 4,
    backgroundColor: '#DEDEDB',
    borderRadius: radii.thumb,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  thumbLabelWrap: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  thumbLabel: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  goal: {
    marginTop: 14,
    gap: 6,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalLabel: {
    fontSize: fontSize.subtab,
    color: colors.textSecondary,
  },
  goalValue: {
    fontSize: fontSize.subtab,
    color: colors.textPrimary,
    fontWeight: fontWeight.medium as '500',
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.borderTertiary,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
  },
});
