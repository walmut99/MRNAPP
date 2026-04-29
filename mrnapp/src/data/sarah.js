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
  {
    name: 'Cortisol',
    value: 23,
    unit: 'µg/dL',
    range: '6–18',
    status: 'high',
    barPct: 92,
    trend: [
      { date: 'Mar 5',  value: 26 },
      { date: 'Apr 2',  value: 25 },
      { date: 'Apr 16', value: 23 },
    ],
    nutrition_note:
      "Cortisol's still high but easing — keep magnesium-rich meals consistent and caffeine to one coffee before noon.",
    treatments: [],
  },
  {
    name: 'Ferritin',
    value: 18,
    unit: 'µg/L',
    range: '30–200',
    status: 'low',
    barPct: 14,
    trend: [
      { date: 'Mar 5',  value: 14 },
      { date: 'Apr 2',  value: 16 },
      { date: 'Apr 16', value: 18 },
    ],
    nutrition_note:
      "Ferritin's climbing — 14 to 18 in six weeks. Keep red meat or lentils at lunch and pair with vitamin C. Avoid tea or coffee within an hour of iron.",
    treatments: [
      {
        name: 'Iron supplement',
        schedule: 'Daily 8:00 AM',
        nextDose: 'today, 8:00',
        streak: 14,
        adherence: 96,
      },
    ],
  },
  {
    name: 'LDL',
    value: 118,
    unit: 'mg/dL',
    range: '<100',
    status: 'borderline',
    barPct: 65,
    trend: [
      { date: 'Mar 5',  value: 128 },
      { date: 'Apr 2',  value: 122 },
      { date: 'Apr 16', value: 118 },
    ],
    nutrition_note:
      'LDL is trending the right direction. Keep fish twice a week and current fibre intake — should cross under 100 by your next draw.',
    treatments: [],
  },
];

export const markers = {
  nextDrawDate: 'May 14, 2026',

  flagged: flaggedMarkers,

  normal: [
    { category: 'Nutrients', name: 'Vitamin D',         value: '42 ng/mL',   range: '30–100',   barPct: 18, trend: [{ date: 'Mar 5', value: 38 }, { date: 'Apr 2', value: 40 }, { date: 'Apr 16', value: 42 }] },
    { category: 'Nutrients', name: 'Vitamin B12',       value: '580 pg/mL',  range: '200–900',  barPct: 54, trend: [{ date: 'Mar 5', value: 540 }, { date: 'Apr 2', value: 560 }, { date: 'Apr 16', value: 580 }] },
    { category: 'Nutrients', name: 'Magnesium',         value: '2.1 mg/dL',  range: '1.7–2.2',  barPct: 82, trend: [{ date: 'Mar 5', value: 2.0 }, { date: 'Apr 2', value: 2.05 }, { date: 'Apr 16', value: 2.1 }] },
    { category: 'Nutrients', name: 'Folate',            value: '12 ng/mL',   range: '>5',       barPct: 70, trend: [{ date: 'Mar 5', value: 10 }, { date: 'Apr 2', value: 11 }, { date: 'Apr 16', value: 12 }] },
    { category: 'Hormonal',  name: 'TSH',               value: '2.1 mIU/L',  range: '0.4–4.0',  barPct: 48, trend: [{ date: 'Mar 5', value: 2.4 }, { date: 'Apr 2', value: 2.2 }, { date: 'Apr 16', value: 2.1 }] },
    { category: 'Hormonal',  name: 'Free T4',           value: '1.3 ng/dL',  range: '0.8–1.8',  barPct: 52, trend: [{ date: 'Mar 5', value: 1.2 }, { date: 'Apr 2', value: 1.25 }, { date: 'Apr 16', value: 1.3 }] },
    { category: 'Hormonal',  name: 'Estradiol',         value: '128 pg/mL',  range: '30–400',   barPct: 26, trend: [{ date: 'Mar 5', value: 118 }, { date: 'Apr 2', value: 124 }, { date: 'Apr 16', value: 128 }] },
    { category: 'Metabolic', name: 'Glucose (fasting)', value: '88 mg/dL',   range: '70–99',    barPct: 62, trend: [{ date: 'Mar 5', value: 92 }, { date: 'Apr 2', value: 90 }, { date: 'Apr 16', value: 88 }] },
    { category: 'Metabolic', name: 'HbA1c',             value: '5.2 %',      range: '<5.7',     barPct: 45, trend: [{ date: 'Mar 5', value: 5.4 }, { date: 'Apr 2', value: 5.3 }, { date: 'Apr 16', value: 5.2 }] },
    { category: 'Metabolic', name: 'Insulin',           value: '6.4 µIU/mL', range: '2.6–24.9', barPct: 18, trend: [{ date: 'Mar 5', value: 7.1 }, { date: 'Apr 2', value: 6.7 }, { date: 'Apr 16', value: 6.4 }] },
    { category: 'Lipids',    name: 'HDL',               value: '62 mg/dL',   range: '>50',      barPct: 72, trend: [{ date: 'Mar 5', value: 58 }, { date: 'Apr 2', value: 60 }, { date: 'Apr 16', value: 62 }] },
    { category: 'Lipids',    name: 'Triglycerides',     value: '94 mg/dL',   range: '<150',     barPct: 38, trend: [{ date: 'Mar 5', value: 102 }, { date: 'Apr 2', value: 98 }, { date: 'Apr 16', value: 94 }] },
    { category: 'Lipids',    name: 'Total cholesterol', value: '198 mg/dL',  range: '<200',     barPct: 88, trend: [{ date: 'Mar 5', value: 206 }, { date: 'Apr 2', value: 202 }, { date: 'Apr 16', value: 198 }] },
  ],
};

export const inbody = {
  lastScanDate: 'Mar 5, 2026',
  inbodyScore: 78,

  bodyComposition: [
    { id: 'weight',      label: 'Weight',       value: 68.4, unit: 'kg',    barPct: 62, barColor: 'accent', tappable: true  },
    { id: 'bodyFat',     label: 'Body Fat %',   value: 28.1, unit: '%',     barPct: 70, barColor: 'warn',   tappable: true  },
    { id: 'muscleMass',  label: 'Muscle Mass',  value: 24.1, unit: 'kg',    barPct: 58, barColor: 'accent', tappable: true  },
    { id: 'fatMass',     label: 'Fat Mass',     value: 19.2, unit: 'kg',    barPct: 68, barColor: 'warn',   tappable: false },
    { id: 'bmr',         label: 'BMR',          value: 1420, unit: 'kcal',  barPct: 54, barColor: 'accent', tappable: false },
    { id: 'visceralFat', label: 'Visceral Fat', value: 6,    unit: 'level', barPct: 35, barColor: 'accent', tappable: false },
  ],

  segments: {
    leftArm:  { kg: 2.4,  status: 'normal', delta: 0.1  },
    rightArm: { kg: 2.5,  status: 'normal', delta: 0.1  },
    trunk:    { kg: 19.8, status: 'normal', delta: 0.2  },
    leftLeg:  { kg: 7.6,  status: 'lower',  delta: -0.1 },
    rightLeg: { kg: 7.8,  status: 'normal', delta: 0.1  },
  },

  hasPreviousScan: true,
};

export const bodyCompMetrics = {
  weight: {
    name: 'Weight',
    value: 68.4,
    unit: 'kg',
    barPct: 62,
    status: 'normal',
    trend: [
      { date: 'Mar 5',  value: 71.0 },
      { date: 'Apr 2',  value: 69.6 },
      { date: 'Apr 16', value: 68.4 },
    ],
    nutrition_note:
      "Down 2.6kg over six weeks — that's a healthy pace at roughly 0.4kg per week. Your protein intake is the lever keeping muscle while the scale moves.",
    isGoalMetric: false,
  },
  bodyFat: {
    name: 'Body Fat',
    value: 28.1,
    unit: '%',
    barPct: 70,
    status: 'warn',
    trend: [
      { date: 'Mar 5',  value: 29.5 },
      { date: 'Apr 2',  value: 28.8 },
      { date: 'Apr 16', value: 28.1 },
    ],
    nutrition_note:
      "Down 1.4% over six weeks — exactly the pace your goal needs. Protein adherence at lunch and dinner is the lever here.",
    isGoalMetric: true,
    goalProgress: { from: 29.5, to: 23.0, current: 28.1, pct: 22 },
  },
  muscleMass: {
    name: 'Muscle Mass',
    value: 24.1,
    unit: 'kg',
    barPct: 58,
    status: 'normal',
    trend: [
      { date: 'Mar 5',  value: 23.8  },
      { date: 'Apr 2',  value: 23.95 },
      { date: 'Apr 16', value: 24.1  },
    ],
    nutrition_note:
      "Up 0.3kg in six weeks while losing fat — exactly what you want during a recomposition phase. Keep protein at 110g daily.",
    isGoalMetric: false,
  },
};

export default {
  patient,
  goal,
  bodyComp,
  targets,
  consumedToday,
  meals,
  proactiveMessage,
  flaggedMarkers,
  markers,
  inbody,
  bodyCompMetrics,
};
