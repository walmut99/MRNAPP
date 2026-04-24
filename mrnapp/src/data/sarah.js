// Sarah Al-Mutairi — sample patient data from Section 10 of MRN_Specification.md.
// Kept in one place so all screens share a single source of truth.

export const patient = {
  firstName: 'Sarah',
  lastName: 'Al-Mutairi',
  initials: 'SA',
  age: 31,
  sex: 'F',
  heightCm: 165,
  activity: 'Lightly active',
  plan: 'Premium',
  programWeek: 6,
  programTotalWeeks: 16,
  streakDays: 14,
  onTrack: true,
};

export const goal = {
  type: 'Reduce body fat',
  from: 29.5,
  to: 23.0,
  unit: '%',
  week: 6,
  totalWeeks: 16,
  percent: 37.5,
};

export const bodyComp = {
  weight:  { value: 68.4, change: -2.6, unit: 'kg' },
  bodyFat: { value: 28.1, change: -1.4, unit: '%' },
  muscle:  { value: 24.1, change: 0.3,  unit: 'kg' },
};

export const targets = {
  calories: 1750,
  protein: 110,
  fat: 55,
  carbs: 180,
  water: 3300,
};

export const consumedToday = {
  calories: 1000,
  protein: 73,
  fat: 32,
  carbs: 82,
  water: 1800,
  steps: 6400,
  stepsGoal: 8000,
};

export const meals = {
  breakfast: { name: 'Eggs & labneh',     calories: 420, protein: 35, fat: 22, carbs: 14, source: 'AI' },
  lunch:     { name: 'Chicken rice bowl', calories: 580, protein: 38, fat: 10, carbs: 68, source: 'AI' },
  dinner: null,
  snacks: null,
};

export const proactiveMessage =
  "Morning Sarah. Ferritin's still low and yesterday's protein came up 18g short. Let's fix both at lunch — grilled beef kofta with a side of lentils hits iron and closes the protein gap.";

export const flaggedMarkers = [
  { name: 'Cortisol', value: 23,  unit: 'µg/dL', range: '6–18',   status: 'high',       barPct: 92 },
  { name: 'Ferritin', value: 18,  unit: 'µg/L',  range: '30–200', status: 'low',        barPct: 14 },
  { name: 'LDL',      value: 118, unit: 'mg/dL', range: '<100',   status: 'borderline', barPct: 65 },
];

export default {
  patient,
  goal,
  bodyComp,
  targets,
  consumedToday,
  meals,
  proactiveMessage,
  flaggedMarkers,
};
