import { ScrollView, StyleSheet, Text, View } from 'react-native';

import MacroProgressBar from '../../components/nutrition/MacroProgressBar';
import MealSlotRow, { MealSource } from '../../components/nutrition/MealSlotRow';
import SuggestionCard from '../../components/nutrition/SuggestionCard';
import Section from '../../components/home/Section';
import { colors, fontSize, fontWeight, letterSpacing, macroColors } from '../../theme';
import { formatNumber } from '../../utils/formatNumber';

type LoggedMeal = {
  meal: string;
  dish: string;
  calories: number;
  protein: number;
  source: MealSource;
};

const MACROS = [
  { name: 'Calories', current: 1000, target: 1750, unit: ' kcal', color: macroColors.calories },
  { name: 'Protein', current: 73, target: 110, unit: 'g', color: macroColors.protein },
  { name: 'Fat', current: 32, target: 55, unit: 'g', color: macroColors.fat },
  { name: 'Carbs', current: 95, target: 180, unit: 'g', color: macroColors.carbs },
];

const LOGGED_MEALS: LoggedMeal[] = [
  { meal: 'Breakfast', dish: 'Eggs & labneh', calories: 420, protein: 35, source: 'AI' },
  { meal: 'Lunch', dish: 'Chicken rice bowl', calories: 580, protein: 38, source: 'Saved' },
];

const STILL_NEEDED = [
  { label: 'Calories', value: formatNumber(750) },
  { label: 'Protein', value: '37g' },
  { label: 'Fat', value: '23g' },
  { label: 'Carbs', value: '85g' },
];

export default function TodaysLogTab() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Section label="Consumed today">
        <View style={styles.macros}>
          {MACROS.map((m) => (
            <MacroProgressBar
              key={m.name}
              name={m.name}
              current={m.current}
              target={m.target}
              unit={m.unit}
              color={m.color}
            />
          ))}
        </View>
      </Section>

      <Section label="Meals">
        {LOGGED_MEALS.map((m, i) => (
          <MealSlotRow
            key={m.meal}
            meal={m.meal}
            dish={m.dish}
            macros={`${formatNumber(m.calories)} kcal · ${m.protein}g P`}
            source={m.source}
            last={i === LOGGED_MEALS.length - 1}
          />
        ))}
      </Section>

      <Section label="Still needed">
        <View style={styles.stillRow}>
          {STILL_NEEDED.map((s, i) => (
            <View
              key={s.label}
              style={[styles.stillCol, i < STILL_NEEDED.length - 1 && styles.stillColDivider]}>
              <Text style={styles.stillLabel}>{s.label}</Text>
              <Text style={styles.stillValue}>{s.value}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section label="Suggestions for you">
        <View style={styles.suggestions}>
          <SuggestionCard
            dish="Grilled beef kofta with lentils"
            badge="Great for ferritin"
            impact={{ protein: 32, fat: 12, carbs: 18, calories: 420 }}
            onLog={() => {}}
          />
          <SuggestionCard
            dish="Salmon with quinoa salad"
            badge="Best match today"
            impact={{ protein: 28, fat: 15, carbs: 35, calories: 480 }}
            onLog={() => {}}
          />
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  macros: {
    gap: 14,
  },
  stillRow: {
    flexDirection: 'row',
  },
  stillCol: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  stillColDivider: {
    borderRightWidth: 0.5,
    borderRightColor: colors.borderTertiary,
  },
  stillLabel: {
    fontSize: fontSize.sectionLabel,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.7,
  },
  stillValue: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  suggestions: {
    gap: 12,
  },
});
