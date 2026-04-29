import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Section from '../components/home/Section';
import AINoteBlock from '../components/marker/AINoteBlock';
import GoalProgressBlock from '../components/marker/GoalProgressBlock';
import MarkerSnapshot, { MarkerStatus } from '../components/marker/MarkerSnapshot';
import MarkerTrendChart, { TrendPoint } from '../components/marker/MarkerTrendChart';
import TreatmentBlock, { Treatment } from '../components/marker/TreatmentBlock';
import { bodyCompMetrics, markers } from '../data/sarah';
import { colors, fontSize, fontWeight, spacing } from '../theme';

type FlaggedSeed = {
  name: string;
  value: number;
  unit: string;
  range: string;
  status: 'high' | 'low' | 'borderline';
  barPct: number;
  trend: TrendPoint[];
  nutrition_note?: string;
  treatments?: Treatment[];
};

type NormalSeed = {
  category: string;
  name: string;
  value: string;
  range: string;
  barPct: number;
  trend: TrendPoint[];
};

type GoalProgress = { from: number; to: number; current: number; pct: number };

type BodyCompSeed = {
  name: string;
  value: number;
  unit: string;
  barPct: number;
  status: MarkerStatus;
  trend: TrendPoint[];
  nutrition_note: string;
  isGoalMetric: boolean;
  goalProgress?: GoalProgress;
};

type Resolved = {
  name: string;
  valueText: string;
  unit: string;
  range?: string;
  status: MarkerStatus;
  barPct: number;
  trend: TrendPoint[];
  showAINote: boolean;
  showTreatment: boolean;
  nutritionNote?: string;
  treatments: Treatment[];
  goalProgress?: GoalProgress;
};

const STATUS_COLOR: Record<MarkerStatus, string> = {
  high: colors.danger,
  low: colors.warn,
  borderline: colors.borderline,
  normal: colors.accent,
  warn: colors.warn,
};

function splitValueAndUnit(raw: string): { value: string; unit: string } {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([0-9.]+)\s*(.*)$/);
  if (match) return { value: match[1], unit: match[2] };
  return { value: trimmed, unit: '' };
}

function resolve(name: string): Resolved | null {
  const flagged = (markers.flagged as FlaggedSeed[]).find((m) => m.name === name);
  if (flagged) {
    return {
      name: flagged.name,
      valueText: String(flagged.value),
      unit: flagged.unit,
      range: flagged.range,
      status: flagged.status as MarkerStatus,
      barPct: flagged.barPct,
      trend: flagged.trend,
      showAINote: !!flagged.nutrition_note,
      showTreatment: true,
      nutritionNote: flagged.nutrition_note,
      treatments: flagged.treatments ?? [],
    };
  }

  const normal = (markers.normal as NormalSeed[]).find((m) => m.name === name);
  if (normal) {
    const { value, unit } = splitValueAndUnit(normal.value);
    return {
      name: normal.name,
      valueText: value,
      unit,
      range: normal.range,
      status: 'normal',
      barPct: normal.barPct,
      trend: normal.trend,
      showAINote: false,
      showTreatment: false,
      treatments: [],
    };
  }

  const bodyCompMap = bodyCompMetrics as Record<string, BodyCompSeed>;
  const bc = bodyCompMap[name];
  if (bc) {
    return {
      name: bc.name,
      valueText: String(bc.value),
      unit: bc.unit,
      status: bc.status,
      barPct: bc.barPct,
      trend: bc.trend,
      showAINote: !!bc.nutrition_note,
      showTreatment: false,
      nutritionNote: bc.nutrition_note,
      treatments: [],
      goalProgress: bc.isGoalMetric ? bc.goalProgress : undefined,
    };
  }

  return null;
}

function changeIndicator(trend: TrendPoint[], status: MarkerStatus, unit: string) {
  if (trend.length < 2) return null;
  const first = trend[0];
  const last = trend[trend.length - 1];
  const raw = last.value - first.value;
  if (raw === 0) return null;

  const rounded = Math.round(raw * 100) / 100;
  const arrow = rounded > 0 ? '↑' : '↓';
  const num = rounded > 0 ? `+${rounded}` : `${rounded}`;
  const unitSuffix = unit ? ` ${unit}` : '';

  // "Good" direction: HIGH/BORDERLINE/WARN moving down, LOW moving up, NORMAL stable-or-improving.
  const goingDown = rounded < 0;
  const goodDirection =
    status === 'high' || status === 'borderline' || status === 'warn'
      ? goingDown
      : status === 'low'
        ? !goingDown
        : true;

  return {
    text: `${arrow} ${num}${unitSuffix} since ${first.date}`,
    color: goodDirection ? colors.accent : colors.textSecondary,
  };
}

type Props = {
  name: string;
};

export default function MarkerDetailScreen({ name }: Props) {
  const router = useRouter();
  const marker = resolve(name);

  if (!marker) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <Header title="Marker not found" onBack={() => router.back()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>No marker named &quot;{name}&quot; was found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const change = changeIndicator(marker.trend, marker.status, marker.unit);
  const lineColor = STATUS_COLOR[marker.status];

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <Header title={marker.name} onBack={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <MarkerSnapshot
          value={marker.valueText}
          unit={marker.unit}
          range={marker.range}
          status={marker.status}
          barPct={marker.barPct}
        />

        {marker.goalProgress ? (
          <Section label="Goal Progress">
            <GoalProgressBlock
              from={marker.goalProgress.from}
              to={marker.goalProgress.to}
              current={marker.goalProgress.current}
              pct={marker.goalProgress.pct}
              unit={marker.unit}
            />
          </Section>
        ) : null}

        <Section
          label="Trend"
          right={
            change ? (
              <Text style={[styles.changeIndicator, { color: change.color }]}>{change.text}</Text>
            ) : undefined
          }>
          <MarkerTrendChart points={marker.trend} color={lineColor} unit={marker.unit} />
        </Section>

        {marker.showAINote && marker.nutritionNote ? (
          <Section label="From Your AI Nutritionist">
            <AINoteBlock note={marker.nutritionNote} />
          </Section>
        ) : null}

        {marker.showTreatment ? (
          <Section
            label="Treatment"
            count={
              marker.treatments.length > 0
                ? `${marker.treatments.length} active`
                : 'none tracked'
            }>
            <TreatmentBlock treatments={marker.treatments} />
          </Section>
        ) : null}
      </ScrollView>

      <View style={styles.ctaBar}>
        <Pressable
          onPress={() => router.push('/nutrition')}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
          <Text style={styles.ctaText}>Discuss with AI Nutritionist</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        hitSlop={8}
        style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}>
        <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 8,
  },
  back: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  ctaBar: {
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 16,
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  cta: {
    paddingVertical: 11,
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.accent,
    borderWidth: 0.5,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: {
    opacity: 0.6,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  notFoundText: {
    fontSize: fontSize.unit,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  changeIndicator: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
  },
});
