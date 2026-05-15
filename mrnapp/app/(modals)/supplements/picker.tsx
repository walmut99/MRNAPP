import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../../../src/components/modals/ModalHeader';
import { colors, fontSize, fontWeight, spacing } from '../../../src/theme';

const COMMON_SUPPLEMENTS = [
  'B12',
  'Collagen',
  'Creatine',
  'Iron',
  'Magnesium glycinate',
  'Multivitamin',
  'Omega-3',
  'Probiotics',
  'Vitamin D3',
  'Zinc',
];

export default function PickerScreen() {
  const router = useRouter();

  function openForm(params: { template?: string; entryType: string }) {
    router.push({
      pathname: '/(modals)/supplements/form',
      params: { mode: 'add', ...params },
    } as never);
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <ModalHeader title="Add to Your Regimen" onClose={() => router.dismissAll()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>COMMON SUPPLEMENTS</Text>
        <View style={styles.list}>
          {COMMON_SUPPLEMENTS.map(name => (
            <Pressable
              key={name}
              onPress={() => openForm({ template: name, entryType: 'supplement' })}
              style={({ pressed }) => [
                styles.row,
                pressed && { backgroundColor: colors.backgroundSecondary },
              ]}>
              <Text style={styles.rowLabel}>{name}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 28 }]}>OR</Text>
        <View style={styles.list}>
          <Pressable
            onPress={() => openForm({ entryType: 'supplement' })}
            style={({ pressed }) => [
              styles.row,
              pressed && { backgroundColor: colors.backgroundSecondary },
            ]}>
            <Ionicons name="add-circle-outline" size={18} color={colors.accentDark} />
            <Text style={[styles.rowLabel, styles.rowLabelAccent]}>Add custom supplement</Text>
          </Pressable>
          <Pressable
            onPress={() => openForm({ entryType: 'medication' })}
            style={({ pressed }) => [
              styles.row,
              pressed && { backgroundColor: colors.backgroundSecondary },
            ]}>
            <Ionicons name="add-circle-outline" size={18} color={colors.accentDark} />
            <Text style={[styles.rowLabel, styles.rowLabelAccent]}>Add medication</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    paddingHorizontal: spacing.sectionX,
    marginBottom: 6,
  },
  list: {
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 10,
  },
  rowLabel: {
    flex: 1,
    fontSize: fontSize.body + 1,
    color: colors.textPrimary,
  },
  rowLabelAccent: {
    color: colors.accentDark,
    fontWeight: fontWeight.medium as '500',
  },
});
