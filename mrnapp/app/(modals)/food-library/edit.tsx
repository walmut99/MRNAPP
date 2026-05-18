import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFoodLibrary } from '../../../src/hooks/useFoodLibrary';
import { colors, fontSize, fontWeight, radii, spacing } from '../../../src/theme';

// ── Field components ──────────────────────────────────────────────────────────

function FieldLabel({ label }: { label: string }) {
  return <Text style={styles.fieldLabel}>{label}</Text>;
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad';
  autoFocus?: boolean;
}) {
  return (
    <View style={styles.field}>
      <FieldLabel label={label} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        style={styles.textInput}
        returnKeyType="done"
      />
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function FoodLibraryEditModal() {
  const router = useRouter();
  const { entryId } = useLocalSearchParams<{ entryId: string }>();
  const { entries, updateEntry } = useFoodLibrary();

  const entry = entries.find(e => e.id === entryId) ?? null;

  const [name, setName]           = useState(entry?.name ?? '');
  const [restaurant, setRestaurant] = useState(entry?.restaurant ?? '');
  const [kcal, setKcal]           = useState(entry ? String(entry.kcal) : '');
  const [protein, setProtein]     = useState(entry ? String(entry.protein) : '');
  const [fat, setFat]             = useState(entry ? String(entry.fat) : '');
  const [carbs, setCarbs]         = useState(entry ? String(entry.carbs) : '');

  if (!entry) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.dismiss()}
            style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}>
            <Ionicons name="close" size={22} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.topBarTitle}>Edit</Text>
        </View>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Entry not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const nameValid = name.trim().length > 0;
  const kcalNum = parseInt(kcal, 10);
  const kcalValid = !isNaN(kcalNum) && kcalNum > 0;
  const proteinNum = protein === '' ? entry.protein : parseFloat(protein);
  const fatNum = fat === '' ? entry.fat : parseFloat(fat);
  const carbsNum = carbs === '' ? entry.carbs : parseFloat(carbs);
  const macrosValid =
    !isNaN(proteinNum) && proteinNum >= 0 &&
    !isNaN(fatNum) && fatNum >= 0 &&
    !isNaN(carbsNum) && carbsNum >= 0;

  const canSave = nameValid && kcalValid && macrosValid;

  function handleSave() {
    if (!canSave) return;
    updateEntry(entry.id, {
      name: name.trim(),
      restaurant: restaurant.trim() || null,
      kcal: kcalNum,
      protein: protein === '' ? entry.protein : proteinNum,
      fat: fat === '' ? entry.fat : fatNum,
      carbs: carbs === '' ? entry.carbs : carbsNum,
    });
    router.dismissTo('/profile/food-library' as never);
  }

  function handleClose() {
    router.dismissTo('/profile/food-library' as never);
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={handleClose}
          style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}>
          <Ionicons name="close" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topBarTitle} numberOfLines={1}>{entry.name}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* Name */}
          <InputField
            label="NAME"
            value={name}
            onChangeText={setName}
            placeholder="Meal name"
            autoFocus
          />

          {/* Restaurant */}
          <InputField
            label="RESTAURANT"
            value={restaurant}
            onChangeText={setRestaurant}
            placeholder="e.g. Slider Station (optional)"
          />

          {/* Macros */}
          <View style={styles.macroSection}>
            <Text style={styles.macroSectionLabel}>PER SERVING</Text>
            <View style={styles.macroGrid}>
              <View style={styles.macroGridRow}>
                <View style={[styles.field, styles.macroField]}>
                  <FieldLabel label="CALORIES" />
                  <TextInput
                    value={kcal}
                    onChangeText={setKcal}
                    placeholder="kcal"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="number-pad"
                    style={styles.textInput}
                    returnKeyType="done"
                  />
                </View>
                <View style={[styles.field, styles.macroField]}>
                  <FieldLabel label="PROTEIN (g)" />
                  <TextInput
                    value={protein}
                    onChangeText={setProtein}
                    placeholder="g"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="decimal-pad"
                    style={styles.textInput}
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View style={styles.macroGridRow}>
                <View style={[styles.field, styles.macroField]}>
                  <FieldLabel label="FAT (g)" />
                  <TextInput
                    value={fat}
                    onChangeText={setFat}
                    placeholder="g"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="decimal-pad"
                    style={styles.textInput}
                    returnKeyType="done"
                  />
                </View>
                <View style={[styles.field, styles.macroField]}>
                  <FieldLabel label="CARBS (g)" />
                  <TextInput
                    value={carbs}
                    onChangeText={setCarbs}
                    placeholder="g"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="decimal-pad"
                    style={styles.textInput}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </View>
          </View>

        </ScrollView>

        {/* Footer save button */}
        <View style={styles.footer}>
          <Pressable
            onPress={handleSave}
            disabled={!canSave}
            style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}>
            <Text style={styles.saveBtnText}>Save</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  flex: {
    flex: 1,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: spacing.topBarV,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },

  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: 16,
  },

  // Fields
  field: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 8,
  },
  fieldLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  textInput: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 8,
    backgroundColor: colors.backgroundPrimary,
  },

  // Macro 2×2 grid
  macroSection: {
    backgroundColor: colors.backgroundPrimary,
    paddingTop: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  macroSectionLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    paddingHorizontal: spacing.sectionX,
    marginBottom: 10,
  },
  macroGrid: {
    gap: 0,
  },
  macroGridRow: {
    flexDirection: 'row',
  },
  macroField: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: colors.borderTertiary,
  },

  // Footer
  footer: {
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
  },
  saveBtn: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: colors.borderTertiary,
  },
  saveBtnText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
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
