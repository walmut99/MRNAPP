import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

import Chip from './Chip';

type Props = {
  // Mutually-exclusive options (e.g., "None")
  options: string[];
  noneLabel?: string;
  selected: string[];
  onChange: (next: string[]) => void;
  customValues?: string[];
  onCustomChange?: (next: string[]) => void;
  enableCustom?: boolean;
  customCtaLabel?: string;
  customPlaceholder?: string;
};

export default function MultiChipGroup({
  options,
  noneLabel,
  selected,
  onChange,
  customValues = [],
  onCustomChange,
  enableCustom = false,
  customCtaLabel = '+ Other',
  customPlaceholder = 'Type and tap Add',
}: Props) {
  const [customOpen, setCustomOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const isNoneSelected = noneLabel ? selected.includes(noneLabel) : false;

  const toggle = (value: string) => {
    if (noneLabel) {
      if (value === noneLabel) {
        onChange([noneLabel]);
        if (onCustomChange) onCustomChange([]);
        return;
      }
      // Selecting any non-None deselects None
      let next = selected.filter((v) => v !== noneLabel);
      next = next.includes(value) ? next.filter((v) => v !== value) : [...next, value];
      onChange(next);
    } else {
      onChange(
        selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      );
    }
  };

  const addCustom = () => {
    const trimmed = draft.trim();
    if (!trimmed || !onCustomChange) return;
    if (customValues.includes(trimmed)) return;
    onCustomChange([...customValues, trimmed]);
    if (noneLabel && isNoneSelected) onChange(selected.filter((v) => v !== noneLabel));
    setDraft('');
    setCustomOpen(false);
  };

  const removeCustom = (value: string) => {
    if (!onCustomChange) return;
    onCustomChange(customValues.filter((v) => v !== value));
  };

  return (
    <View>
      <View style={styles.chips}>
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            selected={selected.includes(opt)}
            onPress={() => toggle(opt)}
          />
        ))}

        {customValues.map((cv) => (
          <Chip
            key={`custom-${cv}`}
            label={cv}
            selected
            trailingMark="×"
            onPress={() => removeCustom(cv)}
          />
        ))}

        {enableCustom ? (
          <Chip
            label={customCtaLabel}
            selected={false}
            variant="dashed"
            onPress={() => setCustomOpen((v) => !v)}
          />
        ) : null}

        {noneLabel ? (
          <Chip
            label={noneLabel}
            selected={isNoneSelected}
            variant={isNoneSelected ? 'default' : 'muted'}
            onPress={() => toggle(noneLabel)}
          />
        ) : null}
      </View>

      {enableCustom && customOpen ? (
        <View style={styles.customRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder={customPlaceholder}
            placeholderTextColor={colors.textSecondary}
            style={styles.customInput}
            onSubmitEditing={addCustom}
            returnKeyType="done"
          />
          <Pressable
            onPress={addCustom}
            disabled={!draft.trim()}
            style={({ pressed }) => [
              styles.addBtn,
              !draft.trim() && { opacity: 0.4 },
              pressed && draft.trim() && { opacity: 0.8 },
            ]}>
            <Text style={styles.addBtnText}>Add</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  customRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  customInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 12,
    fontSize: 14,
    color: colors.textPrimary,
  },
  addBtn: {
    paddingHorizontal: 18,
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
});
