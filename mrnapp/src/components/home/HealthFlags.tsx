import { Pressable, StyleSheet, Text, View } from 'react-native';

import { flaggedMarkers } from '../../data/sarah';
import { colors, fontSize, fontWeight, radii, spacing } from '../../theme';
import Section from './Section';

type Status = 'high' | 'low' | 'borderline';

const STATUS_STYLES: Record<Status, { bg: string; fg: string; arrow: string }> = {
  high:       { bg: colors.dangerLight,     fg: colors.danger,     arrow: '↑' },
  low:        { bg: colors.warnLight,       fg: colors.warn,       arrow: '↓' },
  borderline: { bg: colors.borderlineLight, fg: colors.borderline, arrow: '⚠' },
};

export default function HealthFlags() {
  return (
    <Section
      label="Health flags"
      count={`${flaggedMarkers.length} flagged`}>
      {flaggedMarkers.map((m, idx) => {
        const s = STATUS_STYLES[m.status as Status];
        const isLast = idx === flaggedMarkers.length - 1;
        return (
          <Pressable
            key={m.name}
            style={[
              styles.row,
              { backgroundColor: s.bg },
              !isLast && { marginBottom: spacing.flagRowGap },
            ]}>
            <View style={styles.left}>
              <Text style={[styles.arrow, { color: s.fg }]}>{s.arrow}</Text>
              <Text style={[styles.name, { color: s.fg }]}>
                {m.name} · {m.status.toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.value, { color: s.fg }]}>
              {m.value} {m.unit}
            </Text>
          </Pressable>
        );
      })}
    </Section>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.flagRowPadH,
    paddingVertical: spacing.flagRowPadV,
    borderRadius: radii.flagRow,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.flagRowGap,
  },
  arrow: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
  },
  name: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
  },
  value: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
  },
});
