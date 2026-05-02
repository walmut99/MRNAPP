import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useDailyTargets, useMeals, useTodaysIntake } from '../../hooks';
import { colors, fontSize, fontWeight, macroColors, spacing } from '../../theme';
import { formatNumber } from '../../utils/formatNumber';
import MacroArc from './MacroArc';
import Section from './Section';

function pct(current: number, target: number) {
  if (!target) return 0;
  return Math.max(0, Math.min(100, (current / target) * 100));
}

export default function TodaysNutrition() {
  const { data: intake } = useTodaysIntake();
  const { data: targets } = useDailyTargets();
  const { data: meals } = useMeals();

  const cCalories = intake?.calories ?? 0;
  const cProtein = intake?.protein ?? 0;
  const cFat = intake?.fat ?? 0;
  const cCarbs = intake?.carbs ?? 0;

  const tCalories = targets?.calories ?? 0;
  const tProtein = targets?.protein ?? 0;
  const tFat = targets?.fat ?? 0;
  const tCarbs = targets?.carbs ?? 0;

  const lunch = meals?.lunch;

  return (
    <Section
      label="Today's Nutrition"
      count={`${formatNumber(cCalories)} / ${formatNumber(tCalories)} kcal`}>
      <View style={styles.row}>
        <MacroArc
          color={macroColors.calories}
          percent={pct(cCalories, tCalories)}
          label="Calories"
          value={`${formatNumber(cCalories)} / ${formatNumber(tCalories)}`}
        />
        <MacroArc
          color={macroColors.protein}
          percent={pct(cProtein, tProtein)}
          label="Protein"
          value={`${cProtein} / ${tProtein}g`}
        />
        <MacroArc
          color={macroColors.fat}
          percent={pct(cFat, tFat)}
          label="Fat"
          value={`${cFat} / ${tFat}g`}
        />
        <MacroArc
          color={macroColors.carbs}
          percent={pct(cCarbs, tCarbs)}
          label="Carbs"
          value={`${cCarbs} / ${tCarbs}g`}
        />
      </View>

      {lunch ? (
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
      ) : null}
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
