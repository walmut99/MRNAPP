import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SwipeableCardRow from '../components/SwipeableCardRow';
import { useInBodyScanHistory } from '../hooks/useHistory';
import type { InBodyScan } from '../hooks/useHistory';
import { colors, fontSize, fontWeight, spacing } from '../theme';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCell({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <View style={styles.statCell}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statUnit}>{unit}</Text>
      </View>
    </View>
  );
}

function ScanCard({
  scan,
  onPress,
  onDelete,
}: {
  scan: InBodyScan;
  onPress: () => void;
  onDelete: () => void;
}) {
  return (
    <SwipeableCardRow editable={false} onDelete={onDelete}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.75 }]}>
        <View style={styles.cardTop}>
          <Text style={styles.cardDate}>{formatDate(scan.date)}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
        </View>
        <View style={styles.statsGrid}>
          <StatCell label="Weight" value={scan.weight} unit="kg" />
          <View style={styles.statDivider} />
          <StatCell label="Body Fat" value={scan.bodyFat} unit="%" />
          <View style={styles.statDivider} />
          <StatCell label="Muscle" value={scan.muscle} unit="kg" />
        </View>
      </Pressable>
    </SwipeableCardRow>
  );
}

function SwipeHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <Pressable onPress={onDismiss} style={styles.hint}>
      <Ionicons name="arrow-back" size={12} color={colors.textSecondary} style={{ marginRight: 4 }} />
      <Text style={styles.hintText}>Swipe left on any scan to delete</Text>
    </Pressable>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function InBodyScanHistoryScreen() {
  const router = useRouter();
  const { scans, deleteScan } = useInBodyScanHistory();
  const [hintVisible, setHintVisible] = useState(true);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>InBody Scan History</Text>
        <Pressable
          onPress={() => router.push('/(modals)/add-health-data' as never)}
          style={styles.addBtn}>
          <Ionicons name="add" size={20} color={colors.accentDark} />
        </Pressable>
      </View>

      <FlatList
        data={scans}
        keyExtractor={(s) => s.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No scans yet.</Text>
            <Text style={styles.emptySubText}>Tap + to upload your first InBody scan.</Text>
          </View>
        }
        ListFooterComponent={
          scans.length > 0 && hintVisible
            ? <SwipeHint onDismiss={() => setHintVisible(false)} />
            : null
        }
        renderItem={({ item }) => (
          <ScanCard
            scan={item}
            onPress={() => {
              // TODO Prompt 2: router.push(`/profile/inbody-scan/${item.id}`)
            }}
            onDelete={() => deleteScan(item.id)}
          />
        )}
      />
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
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // List
  list: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.borderTertiary,
  },

  // Card
  card: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardDate: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statDivider: {
    width: 0.5,
    height: 32,
    backgroundColor: colors.borderTertiary,
  },
  statLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  statUnit: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },

  // Swipe hint
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingTop: 20,
  },
  hintText: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },

  // Empty state
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 6,
  },
  emptyText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  emptySubText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
});
