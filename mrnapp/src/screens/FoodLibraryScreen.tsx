import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFoodLibrary } from '../hooks/useFoodLibrary';
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

// ── Screen ────────────────────────────────────────────────────────────────────

export default function FoodLibraryScreen() {
  const router = useRouter();
  const { entries } = useFoodLibrary();

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

      {entries.length === 0 && <EmptyState />}
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
