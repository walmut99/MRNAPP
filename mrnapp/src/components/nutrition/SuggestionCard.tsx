import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, macroColors } from '../../theme';
import { formatNumber } from '../../utils/formatNumber';

export type MacroImpact = {
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
};

type Props = {
  dish: string;
  badge: string;
  impact: MacroImpact;
  onLog: () => void;
};

const MAX_BAR = 60;

function ImpactBar({
  label,
  delta,
  unit,
  color,
  scaleMax,
}: {
  label: string;
  delta: number;
  unit: string;
  color: string;
  scaleMax: number;
}) {
  const width = scaleMax > 0 ? Math.min(100, (delta / scaleMax) * 100) : 0;
  return (
    <View style={styles.impactRow}>
      <Text style={styles.impactLabel}>{label}</Text>
      <View style={styles.impactTrack}>
        <View style={[styles.impactFill, { width: `${width}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.impactDelta}>
        +{formatNumber(delta)}
        {unit}
      </Text>
    </View>
  );
}

export default function SuggestionCard({ dish, badge, impact, onLog }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Text style={styles.dish} numberOfLines={1}>
          {dish}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      </View>

      <View style={styles.impacts}>
        <ImpactBar
          label="Protein"
          delta={impact.protein}
          unit="g"
          color={macroColors.protein}
          scaleMax={MAX_BAR}
        />
        <ImpactBar
          label="Fat"
          delta={impact.fat}
          unit="g"
          color={macroColors.fat}
          scaleMax={MAX_BAR}
        />
        <ImpactBar
          label="Carbs"
          delta={impact.carbs}
          unit="g"
          color={macroColors.carbs}
          scaleMax={MAX_BAR}
        />
        <ImpactBar
          label="Calories"
          delta={impact.calories}
          unit=""
          color={macroColors.calories}
          scaleMax={600}
        />
      </View>

      <Pressable onPress={onLog} style={styles.logWrap} hitSlop={8}>
        <Text style={styles.logText}>Log this</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  dish: {
    flex: 1,
    fontSize: fontSize.unit,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.accentLight,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.accentDark,
  },
  impacts: {
    gap: 6,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactLabel: {
    width: 56,
    fontSize: fontSize.sectionLabel,
    color: colors.textSecondary,
  },
  impactTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderTertiary,
    overflow: 'hidden',
  },
  impactFill: {
    height: '100%',
    borderRadius: 2,
  },
  impactDelta: {
    minWidth: 48,
    textAlign: 'right',
    fontSize: fontSize.sublabel,
    color: colors.textPrimary,
  },
  logWrap: {
    alignSelf: 'flex-end',
  },
  logText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
  },
});
