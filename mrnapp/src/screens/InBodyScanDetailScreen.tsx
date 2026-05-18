import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useInBodyScanHistory } from '../hooks/useHistory';
import {
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  spacing,
} from '../theme';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// ── Body composition grid ─────────────────────────────────────────────────────

type CompCardProps = {
  label: string;
  value: number;
  unit: string;
  tappable?: boolean;
  onPress?: () => void;
};

function CompCard({ label, value, unit, tappable = false, onPress }: CompCardProps) {
  const inner = (
    <View style={styles.compCard}>
      <Text style={styles.compLabel}>{label}</Text>
      <View style={styles.compValueRow}>
        <Text style={styles.compValue}>{value}</Text>
        <Text style={styles.compUnit}>{unit}</Text>
      </View>
    </View>
  );

  if (tappable && onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.compCardWrap, pressed && { opacity: 0.7 }]}>
        {inner}
      </Pressable>
    );
  }

  return <View style={styles.compCardWrap}>{inner}</View>;
}

// ── Body stats rows ───────────────────────────────────────────────────────────

function StatRow({
  label,
  value,
  unit,
  last = false,
}: {
  label: string;
  value: number;
  unit: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.statRow, last && styles.statRowLast]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>
        {value}
        {unit ? <Text style={styles.statUnit}> {unit}</Text> : null}
      </Text>
    </View>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHead({ label }: { label: string }) {
  return <Text style={styles.sectionLabel}>{label}</Text>;
}

// ── Screen ────────────────────────────────────────────────────────────────────

type Props = { scanId: string };

export default function InBodyScanDetailScreen({ scanId }: Props) {
  const router = useRouter();
  const { scans } = useInBodyScanHistory();
  const scan = scans.find(s => s.id === scanId) ?? null;

  if (!scan) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>InBody Scan</Text>
        </View>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Scan not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  function goMarker(key: string) {
    router.push(('/marker/' + key) as never);
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>InBody Scan</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ── Scan header strip ── */}
        <View style={styles.scanHeader}>
          <View style={styles.scanHeaderLeft}>
            <Text style={styles.scanDate}>{formatDate(scan.date)}</Text>
            <Text style={styles.scanMeta}>
              {scan.lab} · Scan {scan.scanNumber}
            </Text>
          </View>
          <View style={styles.scanHeaderRight}>
            <Text style={styles.scoreValue}>{scan.score}</Text>
            <Text style={styles.scoreLabel}>InBody Score</Text>
          </View>
        </View>

        {/* ── Body Composition ── */}
        <View style={styles.section}>
          <SectionHead label="Body Composition" />
          <View style={styles.compGrid}>
            <View style={styles.compRow}>
              <CompCard
                label="Weight"
                value={scan.weight}
                unit="kg"
                tappable
                onPress={() => goMarker('weight')}
              />
              <CompCard
                label="Body Fat"
                value={scan.bodyFat}
                unit="%"
                tappable
                onPress={() => goMarker('bodyFat')}
              />
            </View>
            <View style={styles.compRow}>
              <CompCard
                label="Muscle Mass"
                value={scan.muscle}
                unit="kg"
                tappable
                onPress={() => goMarker('muscleMass')}
              />
              <CompCard
                label="Fat Mass"
                value={scan.fatMass}
                unit="kg"
              />
            </View>
          </View>
        </View>

        {/* ── Body Stats ── */}
        <View style={styles.section}>
          <SectionHead label="Body Stats" />
          <View style={styles.statsBlock}>
            <StatRow label="BMR"               value={scan.bmr}        unit="kcal" />
            <StatRow label="Visceral Fat Level" value={scan.visceralFat} unit="" />
            <StatRow label="Total Body Water"  value={scan.water}      unit="L" />
            <StatRow label="Protein"           value={scan.protein}    unit="kg" />
            <StatRow label="Minerals"          value={scan.minerals}   unit="kg" last />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },

  // Top bar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: spacing.topBarV,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.backBarGap,
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },

  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 40,
  },

  // Scan header
  scanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  scanHeaderLeft: {
    gap: 4,
  },
  scanDate: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    letterSpacing: -0.22,
  },
  scanMeta: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  scanHeaderRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },
  scoreLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: letterSpacing.sectionLabel,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },

  // Section wrapper
  section: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 14,
  },
  sectionLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: letterSpacing.sectionLabel,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },

  // Body composition grid
  compGrid: {
    gap: 10,
  },
  compRow: {
    flexDirection: 'row',
    gap: 10,
  },
  compCardWrap: {
    flex: 1,
  },
  compCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  compLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: letterSpacing.sectionLabel,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  compValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  compValue: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  compUnit: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Stats rows
  statsBlock: {
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statLabel: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  statValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  statUnit: {
    fontWeight: fontWeight.regular as '400',
  },

  // Not found
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
});
