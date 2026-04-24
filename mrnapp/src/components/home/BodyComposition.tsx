import { StyleSheet, Text, View } from 'react-native';

import { bodyComp } from '../../data/sarah';
import { colors, fontSize, fontWeight, lineHeight, spacing } from '../../theme';
import Section from './Section';

type Stat = { label: string; value: number; unit: string; change: number };

function Trend({ change, unit }: { change: number; unit: string }) {
  const arrow = change > 0 ? '↑' : '↓';
  return (
    <Text style={styles.trend}>
      {arrow} {Math.abs(change)}{unit}
    </Text>
  );
}

function StatCell({ stat, withDivider }: { stat: Stat; withDivider: boolean }) {
  return (
    <View style={[styles.cell, withDivider && styles.cellDivider]}>
      <Text style={styles.label}>{stat.label}</Text>
      <Text style={styles.value}>
        {stat.value}
        <Text style={styles.valueUnit}>{stat.unit}</Text>
      </Text>
      <Trend change={stat.change} unit={stat.unit} />
    </View>
  );
}

export default function BodyComposition() {
  const stats: Stat[] = [
    { label: 'Weight',   value: bodyComp.weight.value,  unit: bodyComp.weight.unit,  change: bodyComp.weight.change },
    { label: 'Body fat', value: bodyComp.bodyFat.value, unit: bodyComp.bodyFat.unit, change: bodyComp.bodyFat.change },
    { label: 'Muscle',   value: bodyComp.muscle.value,  unit: bodyComp.muscle.unit,  change: bodyComp.muscle.change },
  ];

  return (
    <Section label="Body composition">
      <View style={styles.row}>
        {stats.map((s, i) => (
          <StatCell key={s.label} stat={s} withDivider={i > 0} />
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
    gap: 6,
  },
  cellDivider: {
    borderLeftWidth: spacing.divider,
    borderLeftColor: colors.borderTertiary,
    paddingLeft: 14,
    marginLeft: 14,
  },
  label: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  value: {
    fontSize: fontSize.hero,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    lineHeight: fontSize.hero * lineHeight.tight,
    letterSpacing: -0.6,
  },
  valueUnit: {
    fontSize: fontSize.unit,
    fontWeight: fontWeight.regular as '400',
    color: colors.textSecondary,
  },
  trend: {
    fontSize: fontSize.sublabel,
    color: colors.accent,
  },
});
