import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../../../src/components/modals/ModalHeader';
import { useMarkers } from '../../../src/hooks';
import { useSupplements, SupplementEntry } from '../../../src/hooks/useSupplements';
import { colors, fontSize, fontWeight, radii, spacing } from '../../../src/theme';

// ── Constants ────────────────────────────────────────────────────────────────

const UNITS: NonNullable<SupplementEntry['unit']>[] = [
  'mg', 'mcg', 'g', 'IU', 'capsule', 'scoop',
];

const FREQ_OPTIONS: { label: string; value: NonNullable<SupplementEntry['frequency']> }[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Twice weekly', value: 'twice-weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'As needed', value: 'as-needed' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TEMPLATE_UNITS: Record<string, SupplementEntry['unit']> = {
  'Vitamin D3': 'IU',
  Creatine: 'g',
  Multivitamin: 'capsule',
  Probiotics: 'capsule',
  Iron: 'mg',
  'Magnesium glycinate': 'mg',
  'Omega-3': 'mg',
  B12: 'mcg',
  Zinc: 'mg',
  Collagen: 'g',
};

const TEMPLATE_MARKER_HINTS: Record<string, string> = {
  Iron: 'Ferritin',
  'Vitamin D3': 'Vitamin D',
  'Magnesium glycinate': 'Magnesium',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function parseStoredDate(str: string): Date {
  const d = new Date(str);
  return isNaN(d.getTime()) ? new Date() : d;
}

// ── Field primitives ─────────────────────────────────────────────────────────

function FieldLabel({ label }: { label: string }) {
  return <Text style={styles.fieldLabel}>{label}</Text>;
}

function ChipRow({
  options,
  value,
  onSelect,
  wrap = false,
}: {
  options: { label: string; value: string }[];
  value: string | null;
  onSelect: (v: string) => void;
  wrap?: boolean;
}) {
  const inner = options.map(opt => {
    const active = value === opt.value;
    return (
      <Pressable
        key={opt.value}
        onPress={() => onSelect(opt.value)}
        style={[styles.chip, active && styles.chipActive]}>
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt.label}</Text>
      </Pressable>
    );
  });

  if (wrap) {
    return <View style={styles.chipWrap}>{inner}</View>;
  }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipScroll}>
      {inner}
    </ScrollView>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function FormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    mode?: string;
    template?: string;
    entryType?: string;
    entryId?: string;
    prefillName?: string;
    prefillDose?: string;
    prefillUnit?: string;
    prefillFrequency?: string;
  }>();

  const mode = params.mode === 'edit' ? 'edit' : 'add';
  const template = params.template ?? null;
  const entryType: 'supplement' | 'medication' =
    params.entryType === 'medication' ? 'medication' : 'supplement';

  const { entries, addEntry, updateEntry, deleteEntry } = useSupplements();
  const { data: markersData } = useMarkers();

  const existingEntry =
    mode === 'edit' && params.entryId
      ? (entries.find(e => e.id === params.entryId) ?? null)
      : null;

  const flaggedMarkers: { name: string; status: string }[] = markersData?.flagged ?? [];
  const hasFlags = flaggedMarkers.length > 0;

  const templateHint = template ? TEMPLATE_MARKER_HINTS[template] ?? null : null;
  const hintFlagged = templateHint
    ? flaggedMarkers.some(m => m.name === templateHint)
    : false;

  // ── Form state ───────────────────────────────────────────────────────────

  const [name, setName] = useState(
    existingEntry?.name ?? params.prefillName ?? '',
  );
  const [doseAmount, setDoseAmount] = useState(
    existingEntry?.dose != null
      ? String(existingEntry.dose)
      : (params.prefillDose ?? ''),
  );
  const [unit, setUnit] = useState<SupplementEntry['unit']>(
    existingEntry?.unit ??
    (template ? (TEMPLATE_UNITS[template] ?? 'mg') : null) ??
    (params.prefillUnit as SupplementEntry['unit'] | undefined) ??
    'mg',
  );
  const [frequency, setFrequency] = useState<SupplementEntry['frequency']>(
    existingEntry?.frequency ??
    (params.prefillFrequency as SupplementEntry['frequency'] | undefined) ??
    null,
  );
  const [freqDay, setFreqDay] = useState<number | null>(existingEntry?.frequencyDay ?? null);
  const [freqDays, setFreqDays] = useState<number[]>(existingEntry?.frequencyDays ?? []);
  const [startedDate, setStartedDate] = useState<Date>(
    existingEntry?.startedDate ? parseStoredDate(existingEntry.startedDate) : new Date(),
  );
  const [linkedMarkerId, setLinkedMarkerId] = useState<string | null>(
    existingEntry?.linkedMarkerId ?? (hintFlagged ? templateHint : null),
  );
  const [retestDate, setRetestDate] = useState<Date | null>(
    existingEntry?.retestDate ? parseStoredDate(existingEntry.retestDate) : null,
  );
  const [stopped, setStopped] = useState(!!existingEntry?.stoppedDate);
  const [showStartedPicker, setShowStartedPicker] = useState(false);
  const [showRetestPicker, setShowRetestPicker] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────

  const showNameBanner = template !== null;
  const resolvedName = showNameBanner ? template : name.trim();

  const title =
    mode === 'edit'
      ? (existingEntry?.name ?? 'Edit')
      : entryType === 'medication'
        ? 'New Medication'
        : 'New Supplement';

  const canSave =
    resolvedName.length > 0 &&
    doseAmount.trim().length > 0 &&
    unit !== null &&
    frequency !== null &&
    (frequency !== 'weekly' || freqDay !== null) &&
    (frequency !== 'twice-weekly' || freqDays.length === 2) &&
    (frequency !== 'monthly' || freqDay !== null);

  const saveBtnDisabled = mode === 'add' && !canSave;

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleFreqChange(val: NonNullable<SupplementEntry['frequency']>) {
    setFrequency(val);
    setFreqDay(null);
    setFreqDays([]);
  }

  function toggleTwiceDay(day: number) {
    if (freqDays.includes(day)) {
      setFreqDays(freqDays.filter(d => d !== day));
    } else if (freqDays.length < 2) {
      setFreqDays([...freqDays, day].sort((a, b) => a - b));
    }
  }

  function handleSave() {
    const payload: Omit<SupplementEntry, 'id'> = {
      type: entryType,
      isTemplate: showNameBanner,
      name: resolvedName,
      dose: doseAmount ? parseFloat(doseAmount) : null,
      unit,
      frequency,
      frequencyDay:
        frequency === 'weekly' || frequency === 'monthly' ? freqDay : null,
      frequencyDays: frequency === 'twice-weekly' ? freqDays : null,
      startedDate: formatDisplayDate(startedDate),
      linkedMarkerId,
      retestDate: retestDate ? formatDisplayDate(retestDate) : null,
      stoppedDate: stopped ? new Date().toISOString().split('T')[0] : null,
      source: 'manual',
      reminderEnabled: false,
    };

    if (mode === 'edit' && existingEntry) {
      updateEntry(existingEntry.id, payload);
    } else {
      addEntry(payload);
    }
    router.dismissTo('/profile/supplements-medications' as never);
  }

  function handleDelete() {
    if (!existingEntry) return;
    Alert.alert(`Delete ${existingEntry.name}?`, "This can't be undone.", [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteEntry(existingEntry.id);
          router.dismissTo('/profile/supplements-medications' as never);
        },
      },
    ]);
  }

  const tomorrow = new Date(Date.now() + 86_400_000);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <ModalHeader title={title} onClose={() => router.dismissTo('/profile/supplements-medications' as never)} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* ── Name banner (template) ── */}
        {showNameBanner && (
          <View style={styles.nameBanner}>
            <Text style={styles.nameBannerLabel}>Adding</Text>
            <Text style={styles.nameBannerName}>{template}</Text>
          </View>
        )}

        {/* ── Name input (custom / edit) ── */}
        {!showNameBanner && (
          <View style={styles.field}>
            <FieldLabel label="NAME" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={entryType === 'medication' ? 'Medication name' : 'Supplement name'}
              placeholderTextColor={colors.textSecondary}
              style={styles.textInput}
              returnKeyType="done"
              autoFocus={mode === 'add'}
            />
          </View>
        )}

        {/* ── Dose ── */}
        <View style={styles.field}>
          <FieldLabel label="DOSE" />
          <TextInput
            value={doseAmount}
            onChangeText={setDoseAmount}
            placeholder="Amount"
            placeholderTextColor={colors.textSecondary}
            keyboardType="decimal-pad"
            style={styles.textInput}
            returnKeyType="done"
          />
          <ChipRow
            options={UNITS.map(u => ({ label: u, value: u }))}
            value={unit}
            onSelect={v => setUnit(v as SupplementEntry['unit'])}
          />
        </View>

        {/* ── How often ── */}
        <View style={styles.field}>
          <FieldLabel label="HOW OFTEN" />
          <ChipRow
            options={FREQ_OPTIONS.map(o => ({ label: o.label, value: o.value }))}
            value={frequency}
            onSelect={v => handleFreqChange(v as NonNullable<SupplementEntry['frequency']>)}
            wrap
          />

          {/* Weekly: single day */}
          {frequency === 'weekly' && (
            <View style={styles.dayRow}>
              {DAYS.map((day, i) => (
                <Pressable
                  key={day}
                  onPress={() => setFreqDay(i)}
                  style={[styles.dayChip, freqDay === i && styles.dayChipActive]}>
                  <Text style={[styles.dayChipText, freqDay === i && styles.dayChipTextActive]}>
                    {day}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Twice weekly: pick exactly 2 */}
          {frequency === 'twice-weekly' && (
            <View style={styles.dayRow}>
              {DAYS.map((day, i) => {
                const selected = freqDays.includes(i);
                const dimmed = !selected && freqDays.length >= 2;
                return (
                  <Pressable
                    key={day}
                    onPress={() => toggleTwiceDay(i)}
                    style={[
                      styles.dayChip,
                      selected && styles.dayChipActive,
                      dimmed && styles.dayChipDimmed,
                    ]}>
                    <Text
                      style={[
                        styles.dayChipText,
                        selected && styles.dayChipTextActive,
                      ]}>
                      {day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Monthly: pick day 1–31 */}
          {frequency === 'monthly' && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.monthlyScroll}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <Pressable
                  key={day}
                  onPress={() => setFreqDay(day)}
                  style={[styles.numChip, freqDay === day && styles.numChipActive]}>
                  <Text
                    style={[styles.numChipText, freqDay === day && styles.numChipTextActive]}>
                    {day}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* ── Started ── */}
        <View style={styles.field}>
          <FieldLabel label="STARTED" />
          <Pressable
            onPress={() => setShowStartedPicker(v => !v)}
            style={styles.dateRow}>
            <Text style={styles.dateValue}>{formatDisplayDate(startedDate)}</Text>
            <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
          </Pressable>
          {showStartedPicker && (
            <DateTimePicker
              value={startedDate}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={(_, date) => {
                if (date) setStartedDate(date);
              }}
            />
          )}
        </View>

        {/* ── Linked to marker ── */}
        {hasFlags && (
          <View style={styles.field}>
            <FieldLabel label="LINKED TO A MARKER" />
            <ChipRow
              options={[
                { label: 'Not linked', value: '__none__' },
                ...flaggedMarkers.map(m => ({ label: m.name, value: m.name })),
              ]}
              value={linkedMarkerId ?? '__none__'}
              onSelect={v => setLinkedMarkerId(v === '__none__' ? null : v)}
              wrap
            />
          </View>
        )}

        {/* ── Retest reminder ── */}
        <View style={styles.field}>
          <FieldLabel label="RETEST REMINDER" />
          <Pressable
            onPress={() => setShowRetestPicker(v => !v)}
            style={styles.dateRow}>
            <Text style={[styles.dateValue, !retestDate && styles.datePlaceholder]}>
              {retestDate ? formatDisplayDate(retestDate) : 'Not set'}
            </Text>
            <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
          </Pressable>
          {showRetestPicker && (
            <DateTimePicker
              value={retestDate ?? tomorrow}
              mode="date"
              display="spinner"
              minimumDate={tomorrow}
              onChange={(_, date) => {
                if (date) setRetestDate(date);
              }}
            />
          )}
          {retestDate && (
            <Pressable
              onPress={() => {
                setRetestDate(null);
                setShowRetestPicker(false);
              }}
              style={styles.clearDate}>
              <Text style={styles.clearDateText}>Clear reminder</Text>
            </Pressable>
          )}
        </View>

        {/* ── Daily reminder (Phase 2) ── */}
        <View style={[styles.field, styles.fieldDisabled]}>
          <View style={styles.toggleRow}>
            <View>
              <FieldLabel label="DAILY REMINDER" />
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Coming soon</Text>
              </View>
            </View>
            <Switch
              value={false}
              disabled
              trackColor={{ false: colors.borderTertiary, true: colors.accent }}
            />
          </View>
        </View>

        {/* ── Edit-mode additions ── */}
        {mode === 'edit' && (
          <>
            <View style={styles.editDivider} />

            <View style={styles.field}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleTitle}>Stopped taking this</Text>
                  <Text style={styles.toggleSub}>
                    AI keeps the history but won't treat it as current
                  </Text>
                </View>
                <Switch
                  value={stopped}
                  onValueChange={setStopped}
                  trackColor={{ false: colors.borderTertiary, true: colors.accent }}
                  thumbColor={colors.backgroundPrimary}
                />
              </View>
            </View>

            <View style={[styles.field, styles.fieldLast]}>
              <Pressable
                onPress={handleDelete}
                style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.7 }]}>
                <Ionicons name="trash-outline" size={16} color={colors.danger} />
                <Text style={styles.deleteBtnText}>Delete this {entryType}</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Pressable
          onPress={handleSave}
          disabled={saveBtnDisabled}
          style={[styles.saveBtn, saveBtnDisabled && styles.saveBtnDisabled]}>
          <Text style={styles.saveBtnText}>
            {mode === 'edit' ? 'Save Changes' : 'Save'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    paddingBottom: 16,
  },

  // Name banner
  nameBanner: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  nameBannerLabel: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  nameBannerName: {
    fontSize: 17,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },

  // Field wrapper
  field: {
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 10,
  },
  fieldDisabled: {
    opacity: 0.55,
  },
  fieldLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },

  // Text input
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

  // Chips
  chipScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
  },
  chipActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  chipText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.accentDark,
    fontWeight: fontWeight.medium as '500',
  },

  // Day chips (weekly / twice-weekly)
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  dayChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  dayChipDimmed: {
    opacity: 0.35,
  },
  dayChipText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  dayChipTextActive: {
    color: colors.backgroundPrimary,
    fontWeight: fontWeight.medium as '500',
  },

  // Monthly number chips
  monthlyScroll: {
    gap: 6,
    paddingVertical: 2,
  },
  numChip: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  numChipText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  numChipTextActive: {
    color: colors.backgroundPrimary,
    fontWeight: fontWeight.medium as '500',
  },

  // Date row
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 8,
    backgroundColor: colors.backgroundPrimary,
  },
  dateValue: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  datePlaceholder: {
    color: colors.textSecondary,
  },
  clearDate: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
  },
  clearDateText: {
    fontSize: fontSize.sublabel,
    color: colors.danger,
  },

  // Toggle rows (daily reminder + stopped)
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  toggleTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  toggleSub: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
    marginTop: 3,
    lineHeight: fontSize.sublabel * 1.5,
  },
  comingSoonBadge: {
    marginTop: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
  },
  comingSoonText: {
    fontSize: 10,
    color: colors.textSecondary,
  },

  // Edit divider + delete
  editDivider: {
    height: 20,
    backgroundColor: colors.backgroundSecondary,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dangerLight,
  },
  deleteBtnText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.danger,
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
});
