import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBloodPanelHistory } from '../hooks/useHistory';
import type { BloodMarker, BloodMarkerCategory } from '../hooks/useHistory';
import {
  colors,
  fontSize,
  fontWeight,
  letterSpacing,
  spacing,
} from '../theme';

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_ORDER: BloodMarkerCategory[] = [
  'Nutrients',
  'Hormonal',
  'Metabolic',
  'Lipids',
  'Kidney & Liver',
  'Other',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function statusLabel(status: BloodMarker['status']): string {
  switch (status) {
    case 'high': return '↑ HIGH';
    case 'low': return '↓ LOW';
    case 'borderline': return '⚠ BORDERLINE';
    default: return '';
  }
}

function flaggedBg(status: BloodMarker['status']): string {
  return status === 'high' ? colors.dangerLight : colors.warnLight;
}

function flaggedFg(status: BloodMarker['status']): string {
  if (status === 'high') return colors.danger;
  if (status === 'low') return colors.warn;
  return colors.borderline;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BackBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        hitSlop={8}
        style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
        <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

function FlaggedCard({
  marker,
  onPress,
}: {
  marker: BloodMarker;
  onPress: () => void;
}) {
  const bg = flaggedBg(marker.status);
  const fg = flaggedFg(marker.status);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.flaggedCard, { backgroundColor: bg }, pressed && { opacity: 0.75 }]}>
      <View style={styles.flaggedTop}>
        <Text style={[styles.flaggedName, { color: fg }]}>{marker.name}</Text>
        <View style={[styles.statusPill, { backgroundColor: fg + '22' }]}>
          <Text style={[styles.statusPillText, { color: fg }]}>
            {statusLabel(marker.status)}
          </Text>
        </View>
      </View>
      <Text style={[styles.flaggedValue, { color: fg }]}>
        {marker.value}
        <Text style={styles.flaggedUnit}> {marker.unit}</Text>
      </Text>
      {marker.range ? (
        <Text style={[styles.flaggedRange, { color: fg + 'AA' }]}>
          Reference: {marker.range}
        </Text>
      ) : null}
    </Pressable>
  );
}

function NormalRow({
  marker,
  last,
  onPress,
}: {
  marker: BloodMarker;
  last: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.normalRow,
        last && styles.normalRowLast,
        pressed && { opacity: 0.7 },
      ]}>
      <View style={styles.normalDot} />
      <Text style={styles.normalName} numberOfLines={1}>{marker.name}</Text>
      <Text style={styles.normalValue} numberOfLines={1}>
        {marker.value} {marker.unit}
      </Text>
    </Pressable>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

type Props = { panelId: string };

export default function PanelDetailScreen({ panelId }: Props) {
  const router = useRouter();
  const { panels } = useBloodPanelHistory();
  const panel = panels.find(p => p.id === panelId) ?? null;

  if (!panel) {
    return (
      <SafeAreaView edges={['top']} style={styles.safe}>
        <BackBar title="Panel" onBack={() => router.back()} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Panel not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const flaggedMarkers = panel.markers.filter(m => m.status !== 'normal');
  const normalMarkers = panel.markers.filter(m => m.status === 'normal');

  const grouped: Partial<Record<BloodMarkerCategory, BloodMarker[]>> = {};
  for (const cat of CATEGORY_ORDER) {
    const inCat = normalMarkers.filter(m => m.category === cat);
    if (inCat.length > 0) grouped[cat] = inCat;
  }
  const groupedCategories = CATEGORY_ORDER.filter(cat => !!grouped[cat]);

  function goMarker(name: string) {
    router.push(('/marker/' + encodeURIComponent(name)) as never);
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <BackBar title="Panel" onBack={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* ── Panel header ── */}
        <View style={styles.panelHeader}>
          <Text style={styles.panelDate}>{formatDate(panel.date)}</Text>
          <View style={styles.panelMeta}>
            <Text style={styles.panelMetaText}>
              {panel.lab} · {panel.markerCount} markers ·{' '}
            </Text>
            <Text
              style={[
                styles.panelMetaText,
                panel.flaggedCount > 0 && { color: colors.danger },
              ]}>
              {panel.flaggedCount} flagged
            </Text>
          </View>
        </View>

        {/* ── Needs Attention ── */}
        {flaggedMarkers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Needs Attention</Text>
            <View style={styles.flaggedList}>
              {flaggedMarkers.map(m => (
                <FlaggedCard
                  key={m.name}
                  marker={m}
                  onPress={() => goMarker(m.name)}
                />
              ))}
            </View>
          </View>
        )}

        {/* ── All Normal ── */}
        {groupedCategories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>All Normal</Text>
            {groupedCategories.map(cat => {
              const rows = grouped[cat]!;
              return (
                <View key={cat} style={styles.categoryBlock}>
                  <Text style={styles.categoryLabel}>{cat}</Text>
                  {rows.map((m, idx) => (
                    <NormalRow
                      key={m.name}
                      marker={m}
                      last={idx === rows.length - 1}
                      onPress={() => goMarker(m.name)}
                    />
                  ))}
                </View>
              );
            })}
          </View>
        )}

        {/* ── Empty panel ── */}
        {panel.markers.length === 0 && (
          <View style={styles.emptyPanel}>
            <Text style={styles.emptyPanelText}>
              Marker details are not available for this panel.
            </Text>
          </View>
        )}

        {/* ── Footer note ── */}
        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            This panel contained {panel.markerCount} markers. Other panels may
            include different markers — each lab visit can vary.
          </Text>
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

  // Header
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

  // Panel header strip
  panelHeader: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 18,
    gap: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  panelDate: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    letterSpacing: -0.22,
  },
  panelMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  panelMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },

  // Section wrapper (manual, not using Section component — different background)
  section: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 12,
  },
  sectionLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: letterSpacing.sectionLabel,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },

  // Flagged cards
  flaggedList: {
    gap: 10,
  },
  flaggedCard: {
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  flaggedTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  flaggedName: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    flex: 1,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: fontWeight.medium as '500',
  },
  flaggedValue: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
  },
  flaggedUnit: {
    fontSize: 13,
    fontWeight: fontWeight.regular as '400',
  },
  flaggedRange: {
    fontSize: 11,
  },

  // Normal rows
  categoryBlock: {
    gap: 0,
  },
  categoryLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 10,
  },
  normalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  normalRowLast: {
    borderBottomWidth: 0,
  },
  normalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    flexShrink: 0,
  },
  normalName: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  normalValue: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },

  // Empty / not found
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  emptyPanel: {
    margin: spacing.sectionX,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  emptyPanelText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: fontSize.body * 1.5,
  },

  // Footer note
  footerNote: {
    margin: spacing.sectionX,
    marginTop: 16,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    padding: 14,
  },
  footerNoteText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
