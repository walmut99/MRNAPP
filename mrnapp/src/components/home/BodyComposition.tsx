import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useBodyComp } from '../../hooks';
import { colors, fontSize, fontWeight, lineHeight, spacing } from '../../theme';
import Section from './Section';

type Stat = {
  label: string;
  value: number;
  unit: string;
  change: number;
  routeName?: string;
};

function Trend({ change, unit }: { change: number; unit: string }) {
  const arrow = change > 0 ? '↑' : '↓';
  return (
    <Text style={styles.trend}>
      {arrow} {Math.abs(change)}{unit}
    </Text>
  );
}

function StatCellInner({ stat }: { stat: Stat }) {
  return (
    <>
      <Text style={styles.label}>{stat.label}</Text>
      <Text style={styles.value}>
        {stat.value}
        <Text style={styles.valueUnit}>{stat.unit}</Text>
      </Text>
      <Trend change={stat.change} unit={stat.unit} />
    </>
  );
}

export default function BodyComposition() {
  const router = useRouter();
  const { data: bodyComp } = useBodyComp();

  const stats: Stat[] = bodyComp
    ? [
        { label: 'Weight',   value: bodyComp.weight.value,  unit: bodyComp.weight.unit,  change: bodyComp.weight.change,  routeName: 'weight' },
        { label: 'Body Fat', value: bodyComp.bodyFat.value, unit: bodyComp.bodyFat.unit, change: bodyComp.bodyFat.change, routeName: 'bodyFat' },
        { label: 'Muscle',   value: bodyComp.muscle.value,  unit: bodyComp.muscle.unit,  change: bodyComp.muscle.change,  routeName: 'muscleMass' },
      ]
    : [];

  return (
    <Section label="Body Composition">
      <View style={styles.row}>
        {stats.map((s, i) => {
          const onPress = s.routeName
            ? () => router.push({ pathname: '/marker/[name]', params: { name: s.routeName as string } })
            : undefined;

          if (onPress) {
            return (
              <Pressable
                key={s.label}
                onPress={onPress}
                style={({ pressed }) => [
                  styles.cell,
                  i > 0 && styles.cellDivider,
                  { opacity: pressed ? 0.6 : 1 },
                ]}>
                <StatCellInner stat={s} />
              </Pressable>
            );
          }
          return (
            <View key={s.label} style={[styles.cell, i > 0 && styles.cellDivider]}>
              <StatCellInner stat={s} />
            </View>
          );
        })}
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
