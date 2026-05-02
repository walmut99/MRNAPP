import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

export type Cycle = 'monthly' | 'annual';

type Props = {
  cycle: Cycle;
  onChange: (cycle: Cycle) => void;
};

export default function BillingCycleToggle({ cycle, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        label="Monthly"
        active={cycle === 'monthly'}
        onPress={() => onChange('monthly')}
      />
      <Option
        label="Annual"
        sublabel="save 2mo"
        active={cycle === 'annual'}
        onPress={() => onChange('annual')}
      />
    </View>
  );
}

function Option({
  label,
  sublabel,
  active,
  onPress,
}: {
  label: string;
  sublabel?: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        active && styles.optionActive,
        pressed && !active && { opacity: 0.6 },
      ]}>
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
      {sublabel ? (
        <Text style={[styles.sublabel, active && styles.sublabelActive]}>{sublabel}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 9999,
    padding: 4,
    marginHorizontal: 22,
    marginTop: 14,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  optionActive: {
    backgroundColor: colors.backgroundPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textPrimary,
  },
  sublabel: {
    fontSize: 9,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
    letterSpacing: 0.45,
  },
  sublabelActive: {
    color: colors.accent,
  },
});
