import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useMarkers, usePatient } from '../hooks';
import { useSupplements, SupplementEntry } from '../hooks/useSupplements';
import { colors, components, fontSize, fontWeight, radii, spacing } from '../theme';

type Tier = 'essentials' | 'premium';

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'th';
  switch (v % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatDose(entry: SupplementEntry): string {
  const doseStr =
    entry.dose !== null && entry.unit !== null ? `${entry.dose} ${entry.unit}` : null;

  if (!entry.frequency) return doseStr ?? '';

  let freqStr = '';
  switch (entry.frequency) {
    case 'daily':
      freqStr = 'daily';
      break;
    case 'weekly':
      freqStr =
        entry.frequencyDay !== null
          ? `weekly on ${DAY_LONG[entry.frequencyDay]}s`
          : 'weekly';
      break;
    case 'twice-weekly':
      freqStr = entry.frequencyDays?.length
        ? `twice weekly · ${entry.frequencyDays.map(d => DAY_SHORT[d]).join('/')}`
        : 'twice weekly';
      break;
    case 'monthly':
      freqStr =
        entry.frequencyDay !== null
          ? `monthly on the ${entry.frequencyDay}${ordinal(entry.frequencyDay)}`
          : 'monthly';
      break;
    case 'as-needed':
      freqStr = 'as needed';
      break;
  }

  return [doseStr, freqStr].filter(Boolean).join(' · ');
}

// ── Shared primitives ────────────────────────────────────────────────────────

function HeroCircle({ children }: { children: React.ReactNode }) {
  return <View style={styles.heroCircle}>{children}</View>;
}

function PillButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pillBtn, pressed && { opacity: 0.75 }]}>
      <Text style={styles.pillBtnText}>{label}</Text>
    </Pressable>
  );
}

// ── Locked state ─────────────────────────────────────────────────────────────

const FEATURES = [
  'Log supplements and medications',
  'AI accounts for your regimen in recommendations',
  'Daily reminders and retest tracking',
];

function LockedState({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <View style={styles.centerContent}>
      <HeroCircle>
        <Ionicons name="lock-closed" size={28} color={colors.accentDark} />
      </HeroCircle>
      <Text style={styles.heroTitle}>Track What You're Taking</Text>
      <Text style={styles.heroSub}>
        Available with Premium. Your AI nutritionist factors in your regimen for more accurate
        advice.
      </Text>
      <View style={styles.featureCard}>
        {FEATURES.map(feat => (
          <View key={feat} style={styles.featureRow}>
            <Text style={styles.featureCheck}>✓</Text>
            <Text style={styles.featureText}>{feat}</Text>
          </View>
        ))}
      </View>
      <PillButton label="Upgrade to Premium" onPress={onUpgrade} />
    </View>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.centerContent}>
      <HeroCircle>
        <Ionicons name="medkit" size={28} color={colors.accentDark} />
      </HeroCircle>
      <Text style={styles.heroTitle}>Nothing tracked yet</Text>
      <Text style={styles.heroSub}>
        Add what you're taking — supplements, vitamins, or medications. Your AI nutritionist will
        factor it in.
      </Text>
      <PillButton label="+ Add Your First" onPress={onAdd} />
    </View>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

type TagColors = { bg: string | null; text: string | null };

function SupplementCard({
  entry,
  edgeColor,
  tag,
  onPress,
}: {
  entry: SupplementEntry;
  edgeColor: string;
  tag: TagColors;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
      <View style={[styles.cardEdge, { backgroundColor: edgeColor }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.cardName} numberOfLines={1}>
            {entry.name}
          </Text>
          <Text style={styles.cardDose} numberOfLines={1}>
            {formatDose(entry)}
          </Text>
        </View>
        <View style={styles.cardMeta}>
          <Text style={styles.metaText} numberOfLines={1}>
            {entry.startedDate ? `Started ${entry.startedDate}` : ''}
            {entry.startedDate && entry.retestDate ? ' · ' : ''}
            {entry.retestDate ? (
              <Text style={{ color: colors.warn }}>Retest {entry.retestDate}</Text>
            ) : null}
          </Text>
          {entry.linkedMarkerId && tag.bg ? (
            <View style={[styles.markerTag, { backgroundColor: tag.bg }]}>
              <Text style={[styles.markerTagText, { color: tag.text ?? colors.textSecondary }]}>
                {entry.linkedMarkerId}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

// ── Add tile ─────────────────────────────────────────────────────────────────

function AddTile({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.addTile, pressed && { opacity: 0.6 }]}>
      <Ionicons name="add" size={16} color={colors.textSecondary} />
      <Text style={styles.addTileText}>{label}</Text>
    </Pressable>
  );
}

// ── Populated section ────────────────────────────────────────────────────────

function EntrySection({
  label,
  entries,
  addLabel,
  onAdd,
  onCardPress,
  resolveEdgeColor,
  resolveTag,
}: {
  label: string;
  entries: SupplementEntry[];
  addLabel: string;
  onAdd: () => void;
  onCardPress: (id: string) => void;
  resolveEdgeColor: (entry: SupplementEntry) => string;
  resolveTag: (entry: SupplementEntry) => TagColors;
}) {
  const countLabel = entries.length === 0 ? 'None' : String(entries.length);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionLabel}>{label.toUpperCase()}</Text>
        <Text style={styles.sectionCount}>{countLabel}</Text>
      </View>
      {entries.map(entry => (
        <SupplementCard
          key={entry.id}
          entry={entry}
          edgeColor={resolveEdgeColor(entry)}
          tag={resolveTag(entry)}
          onPress={() => onCardPress(entry.id)}
        />
      ))}
      <AddTile label={addLabel} onPress={onAdd} />
    </View>
  );
}

// ── Populated state ──────────────────────────────────────────────────────────

function PopulatedState({
  entriesByType,
  onAdd,
  onCardPress,
  resolveEdgeColor,
  resolveTag,
}: {
  entriesByType: { supplement: SupplementEntry[]; medication: SupplementEntry[] };
  onAdd: (type: 'supplement' | 'medication') => void;
  onCardPress: (id: string) => void;
  resolveEdgeColor: (entry: SupplementEntry) => string;
  resolveTag: (entry: SupplementEntry) => TagColors;
}) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <EntrySection
        label="Supplements"
        entries={entriesByType.supplement}
        addLabel="Add a supplement"
        onAdd={() => onAdd('supplement')}
        onCardPress={onCardPress}
        resolveEdgeColor={resolveEdgeColor}
        resolveTag={resolveTag}
      />
      <EntrySection
        label="Medications"
        entries={entriesByType.medication}
        addLabel="Add a medication"
        onAdd={() => onAdd('medication')}
        onCardPress={onCardPress}
        resolveEdgeColor={resolveEdgeColor}
        resolveTag={resolveTag}
      />
    </ScrollView>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function SupplementsMedicationsScreen() {
  const router = useRouter();
  const { subscriptionTier: patientTier } = usePatient();
  const [devTier, setDevTier] = useState<Tier | null>(null);
  const tier: Tier = __DEV__ && devTier !== null ? devTier : patientTier;

  const { activeEntries, entriesByType } = useSupplements();
  const { data: markersData } = useMarkers();

  const markerStatusMap = useMemo<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    (markersData?.flagged ?? []).forEach((m: { name: string; status: string }) => {
      map[m.name] = m.status;
    });
    return map;
  }, [markersData]);

  const isLocked = tier === 'essentials';
  const isEmpty = !isLocked && activeEntries.length === 0;
  const isPopulated = !isLocked && activeEntries.length > 0;

  function resolveEdgeColor(entry: SupplementEntry): string {
    if (!entry.linkedMarkerId) return 'rgba(29,158,117,0.4)';
    const status = markerStatusMap[entry.linkedMarkerId];
    if (status === 'low') return colors.warn;
    if (status === 'high') return colors.danger;
    return 'rgba(29,158,117,0.4)';
  }

  function resolveTag(entry: SupplementEntry): TagColors {
    if (!entry.linkedMarkerId) return { bg: null, text: null };
    const status = markerStatusMap[entry.linkedMarkerId];
    if (status === 'low') return { bg: colors.warnLight, text: colors.warn };
    if (status === 'high') return { bg: colors.dangerLight, text: colors.danger };
    return { bg: null, text: null };
  }

  function handleAdd(type?: 'supplement' | 'medication') {
    router.push({
      pathname: '/(modals)/supplements/picker',
      params: { entryType: type ?? 'supplement' },
    } as never);
  }

  function handleCardPress(id: string) {
    router.push({
      pathname: '/(modals)/supplements/form',
      params: { mode: 'edit', entryId: id },
    } as never);
  }

  function cycleDevTier() {
    setDevTier(prev => {
      if (prev === null) return 'essentials';
      if (prev === 'essentials') return 'premium';
      return null;
    });
  }

  const devTierDisplay = devTier ?? patientTier;

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.title} numberOfLines={1}>
            Supplements and Medications
          </Text>
          {__DEV__ ? (
            <Pressable onPress={cycleDevTier}>
              <Text style={styles.devLabel}>{devTierDisplay}</Text>
            </Pressable>
          ) : null}
        </View>

        <Pressable
          onPress={isLocked ? undefined : () => handleAdd()}
          style={[styles.addBtn, isLocked && styles.addBtnLocked]}>
          {isLocked ? (
            <Ionicons name="lock-closed" size={16} color={colors.textSecondary} />
          ) : (
            <Ionicons name="add" size={22} color={colors.accentDark} />
          )}
        </Pressable>
      </View>

      {/* Body */}
      {isLocked && <LockedState onUpgrade={() => router.push('/profile/plans' as never)} />}
      {isEmpty && <EmptyState onAdd={() => handleAdd()} />}
      {isPopulated && (
        <PopulatedState
          entriesByType={entriesByType}
          onAdd={handleAdd}
          onCardPress={handleCardPress}
          resolveEdgeColor={resolveEdgeColor}
          resolveTag={resolveTag}
        />
      )}
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

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
    borderBottomWidth: spacing.divider,
    borderBottomColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
  },
  backBtn: {
    width: components.backBar.btnSize,
    height: components.backBar.btnSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: spacing.backBarGap,
  },
  title: {
    fontSize: 17,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  devLabel: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnLocked: {
    backgroundColor: colors.backgroundSecondary,
  },

  // Center states (locked / empty)
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingBottom: 48,
  },
  heroCircle: {
    width: components.avatar.sizeLg,
    height: components.avatar.sizeLg,
    borderRadius: components.avatar.sizeLg / 2,
    backgroundColor: colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSub: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: fontSize.body * 1.5,
    marginBottom: 24,
    maxWidth: 300,
  },
  featureCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    maxWidth: 280,
    width: '100%',
    marginBottom: 24,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  featureCheck: {
    fontSize: fontSize.body,
    color: colors.accent,
    fontWeight: fontWeight.medium as '500',
    lineHeight: fontSize.body * 1.5,
  },
  featureText: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    lineHeight: fontSize.body * 1.5,
  },
  pillBtn: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  pillBtnText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },

  // Populated state
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: spacing.sectionX,
    gap: 8,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  sectionCount: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    overflow: 'hidden',
  },
  cardEdge: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 5,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardName: {
    flex: 1,
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  cardDose: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    flexShrink: 0,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  markerTag: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  markerTagText: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
  },

  // Add tile
  addTile: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderTertiary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  addTileText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
});
