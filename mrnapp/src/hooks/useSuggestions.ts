export type MealSuggestion = {
  dish: string;
  badge: string;
  impact: { protein: number; fat: number; carbs: number; calories: number };
};

const SUGGESTIONS: MealSuggestion[] = [
  {
    dish: 'Grilled beef kofta with lentils',
    badge: 'Great for ferritin',
    impact: { protein: 32, fat: 12, carbs: 18, calories: 420 },
  },
  {
    dish: 'Salmon with quinoa salad',
    badge: 'Best match today',
    impact: { protein: 28, fat: 15, carbs: 35, calories: 480 },
  },
];

export function useSuggestions() {
  return {
    data: SUGGESTIONS,
    isLoading: false,
    error: null,
  };
}
