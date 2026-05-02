import { StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props = {
  label: string;
  used?: number;
  limit?: number;
  note?: string;
  // When showBar is false, render the label + note only (used for "Last 30 days only" trend slot)
  showBar?: boolean;
  fillColor?: string;
  noteColor?: string;
};

export default function UsageBar({
  label,
  used,
  limit,
  note,
  showBar = true,
  fillColor = colors.accent,
  noteColor = colors.textSecondary,
}: Props) {
  const pct = showBar && limit && limit > 0 ? Math.min(100, ((used ?? 0) / limit) * 100) : 0;

  return (
    <View style={styles.row}>
      <View style={styles.headRow}>
        <Text style={styles.label}>{label}</Text>
        {showBar && limit !== undefined ? (
          <Text style={styles.usage}>
            {used} of {limit}
          </Text>
        ) : null}
      </View>
      {showBar ? (
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct}%`, backgroundColor: fillColor }]} />
        </View>
      ) : null}
      {note ? <Text style={[styles.note, { color: noteColor }]}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 4,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  usage: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderTertiary,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  note: {
    fontSize: 11,
    marginTop: 2,
  },
});
