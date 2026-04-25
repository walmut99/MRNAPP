import { Pressable, StyleSheet, Text, View } from 'react-native';

import { consumedToday, meals, targets } from '../../data/sarah';
import { colors, fontSize, fontWeight, macroColors, spacing } from '../../theme';
import { formatNumber } from '../../utils/formatNumber';
import MacroArc from './MacroArc';
import Section from './Section';

function pct(current: number, target: number) {
  return Math.max(0, Math.min(100, (current / target) * 100));
}

export default function TodaysNutrition() {
  const c = consumedToday;
  const t = targets;
  const lunch = meals.lunch!;

  return (
    <Section
      label="Today's nutrition"
      count={`${formatNumber(c.calories)} / ${formatNumber(t.calories)} kcal`}>
      <View style={styles.row}>
        <MacroArc
          color={macroColors.calories}
          percent={pct(c.calories, t.calories)}
          label="Calories"
          value={`${formatNumber(c.calories)} / ${formatNumber(t.calories)}`}
        />
        <MacroArc
          color={macroColors.protein}
          percent={pct(c.protein, t.protein)}
          label="Protein"
          value={`${c.protein} / ${t.protein}g`}
        />
        <MacroArc
          color={macroColors.fat}
          percent={pct(c.fat, t.fat)}
          label="Fat"
          value={`${c.fat} / ${t.fat}g`}
        />
        <MacroArc
          color={macroColors.carbs}
          percent={pct(c.carbs, t.carbs)}
          label="Carbs"
          value={`${c.carbs} / ${t.carbs}g`}
        />
      </View>

      <View style={styles.mealStrip}>
        <View style={styles.mealInfo}>
          <Text style={styles.mealName}>Last meal · {lunch.name}</Text>
          <Text style={styles.mealMeta}>
            {formatNumber(lunch.calories)} kcal · {lunch.protein}g protein
          </Text>
        </View>
        <Pressable>
          <Text style={styles.link}>View log →</Text>
        </Pressable>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.macroGap,
  },
  mealStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: spacing.divider,
    borderTopColor: colors.borderTertiary,
  },
  mealInfo: {
    gap: 2,
  },
  mealName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  mealMeta: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  link: {
    fontSize: fontSize.subtab,
    color: colors.accent,
    fontWeight: fontWeight.medium as '500',
  },
});
