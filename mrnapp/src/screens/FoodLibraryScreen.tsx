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
import { useFoodLibrary } from '../hooks/useFoodLibrary';
import type { FoodEntry } from '../hooks/useFoodLibrary';
import { colors, fontSize, fontWeight, spacing } from '../theme';

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.heroCircle}>
        <Ionicons name="bookmark-outline" size={32} color={colors.accent} />
      </View>
      <Text style={styles.emptyTitle}>No meals saved yet</Text>
      <Text style={styles.emptySub}>Meals you save in chat show up here.</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleLabel}>TRY SAYING</Text>
        <Text style={styles.exampleQuote}>"Save this as my usual breakfast"</Text>
        <Text style={styles.exampleQuote}>"Save this — call it 'Chicken Avocado Salad'"</Text>
      </View>
    </View>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

function MacroPill({ entry }: { entry: FoodEntry }) {
  return (
    <View style={styles.macroRow}>
      <Text style={styles.macroNum}>{entry.protein}</Text>
      <Text style={styles.macroLabel}>g P </Text>
      <Text style={styles.macroDot}>·</Text>
      <Text style={styles.macroNum}> {entry.fat}</Text>
      <Text style={styles.macroLabel}>g F </Text>
      <Text style={styles.macroDot}>·</Text>
      <Text style={styles.macroNum}> {entry.carbs}</Text>
      <Text style={styles.macroLabel}>g C</Text>
    </View>
  );
}

function FoodCard({ entry }: { entry: FoodEntry }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.cardName} numberOfLines={1}>{entry.name}</Text>
        <Text style={styles.cardKcal}>{entry.kcal} kcal</Text>
      </View>
      {entry.restaurant ? (
        <Text style={styles.cardRestaurant}>From {entry.restaurant}</Text>
      ) : null}
      <View style={styles.cardBottom}>
        <MacroPill entry={entry} />
        <View style={styles.loggedBadge}>
          <Text style={styles.loggedText}>Logged {entry.timesLogged}×</Text>
        </View>
      </View>
    </View>
  );
}

// ── List header ───────────────────────────────────────────────────────────────

function ListHeader({ count }: { count: number }) {
  return (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}>Your saved meals</Text>
      <View style={styles.countBadge}>
        <Text style={styles.countBadgeText}>{count} meal{count !== 1 ? 's' : ''}</Text>
      </View>
    </View>
  );
}

// ── Swipe hint ────────────────────────────────────────────────────────────────

function SwipeHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <Pressable onPress={onDismiss} style={styles.hint}>
      <View style={styles.hintRow}>
        <Ionicons name="chevron-forward" size={12} color="#4A7FA5" />
        <Text style={styles.hintText}>Swipe right to edit</Text>
      </View>
      <View style={styles.hintRow}>
        <Ionicons name="chevron-back" size={12} color="#C57676" />
        <Text style={styles.hintText}>Swipe left to delete</Text>
      </View>
    </Pressable>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function FoodLibraryScreen() {
  const router = useRouter();
  const { entries, deleteEntry } = useFoodLibrary();
  const [hintVisible, setHintVisible] = useState(true);

  function openEdit(entry: FoodEntry) {
    router.push({
      pathname: '/(modals)/food-library/edit',
      params: { entryId: entry.id },
    } as never);
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Food Library</Text>
      </View>

      {entries.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(e) => e.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={<ListHeader count={entries.length} />}
          ListFooterComponent={
            hintVisible
              ? <SwipeHint onDismiss={() => setHintVisible(false)} />
              : null
          }
          renderItem={({ item }) => (
            <SwipeableCardRow
              editable
              onDelete={() => deleteEntry(item.id)}
              onEdit={() => openEdit(item)}>
              <FoodCard entry={item} />
            </SwipeableCardRow>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
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

  // List
  list: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  listContent: {
    paddingBottom: 32,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.borderTertiary,
  },

  // List header
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing.sectionX,
    paddingTop: 16,
    paddingBottom: 10,
  },
  listHeaderTitle: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 0.5,
    borderColor: colors.borderTertiary,
  },
  countBadgeText: {
    fontSize: 10,
    color: colors.textSecondary,
  },

  // Card
  card: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
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
  cardKcal: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  cardRestaurant: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  // Macros
  macroRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  macroNum: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
  macroLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  macroDot: {
    fontSize: 11,
    color: colors.borderTertiary,
  },

  // Logged badge
  loggedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    backgroundColor: colors.accentLight,
  },
  loggedText: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },

  // Swipe hint
  hint: {
    paddingVertical: 16,
    paddingTop: 20,
    alignItems: 'center',
    gap: 6,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hintText: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sectionX,
    gap: 12,
  },
  heroCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: fontSize.body * 1.5,
  },
  exampleCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 14,
    padding: 16,
    width: '100%',
    maxWidth: 300,
    gap: 8,
    marginTop: 4,
  },
  exampleLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  exampleQuote: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: fontSize.body * 1.5,
  },
});
