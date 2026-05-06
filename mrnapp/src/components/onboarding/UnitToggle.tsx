import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight } from '../../theme';

type Props<T extends string> = {
  options: readonly [T, T];
  value: T;
  onChange: (value: T) => void;
};

export default function UnitToggle<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View style={styles.container}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={({ pressed }) => [
              styles.option,
              active && styles.optionActive,
              pressed && !active && { opacity: 0.6 },
            ]}>
            <Text style={[styles.label, active && styles.labelActive]}>
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 9999,
    padding: 4,
    alignSelf: 'flex-start',
  },
  option: {
    paddingHorizontal: 18,
    paddingVertical: 6,
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
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
