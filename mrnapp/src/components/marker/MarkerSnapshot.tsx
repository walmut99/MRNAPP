import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, letterSpacing } from '../../theme';

export type MarkerStatus = 'high' | 'low' | 'borderline' | 'normal' | 'warn';

type Props = {
  value: string;
  unit: string;
  range?: string;
  status: MarkerStatus;
  barPct: number;
};

const STATUS_TOKENS: Record<
  MarkerStatus,
  { bg: string; fg: string; label: string; pillText: string }
> = {
  high: { bg: colors.dangerLight, fg: colors.danger, label: 'HIGH', pillText: '↑ HIGH' },
  low: { bg: colors.warnLight, fg: colors.warn, label: 'LOW', pillText: '↓ LOW' },
  borderline: {
    bg: colors.borderlineLight,
    fg: colors.borderline,
    label: 'BORDERLINE',
    pillText: '⚠ BORDERLINE',
  },
  normal: { bg: colors.accentLight, fg: colors.accentDark, label: 'NORMAL', pillText: '✓ NORMAL' },
  warn: {
    bg: colors.warnLight,
    fg: colors.warn,
    label: 'ABOVE TARGET',
    pillText: '↑ ABOVE TARGET',
  },
};

export default function MarkerSnapshot({ value, unit, range, status, barPct }: Props) {
  const tokens = STATUS_TOKENS[status];
  const fillPct = Math.max(0, Math.min(100, barPct));

  return (
    <View style={styles.section}>
      <View style={styles.topRow}>
        <View style={styles.valueCol}>
          <Text style={styles.value}>
            {value}
            <Text style={styles.unit}> {unit}</Text>
          </Text>
          {range ? <Text style={styles.range}>RANGE {range}</Text> : null}
        </View>
        <View style={[styles.pill, { backgroundColor: tokens.bg }]}>
          <Text style={[styles.pillText, { color: tokens.fg }]}>{tokens.pillText}</Text>
        </View>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${fillPct}%`, backgroundColor: tokens.fg }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 22,
    paddingVertical: 22,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  valueCol: {
    flex: 1,
  },
  value: {
    fontSize: 32,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    lineHeight: 32,
  },
  unit: {
    fontSize: fontSize.unit,
    fontWeight: fontWeight.regular as '400',
    color: colors.textSecondary,
  },
  range: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
    marginTop: 6,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pillText: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
  },
  barTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderTertiary,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
