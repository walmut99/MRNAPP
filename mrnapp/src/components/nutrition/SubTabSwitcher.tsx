import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, spacing } from '../../theme';

type Props = {
  tabs: readonly string[];
  activeIndex: number;
  onChange: (index: number) => void;
  equalWidth?: boolean;
};

export default function SubTabSwitcher({ tabs, activeIndex, onChange, equalWidth }: Props) {
  return (
    <View style={styles.row}>
      {tabs.map((label, i) => {
        const active = i === activeIndex;
        return (
          <Pressable
            key={label}
            onPress={() => onChange(i)}
            style={[styles.tab, equalWidth && styles.tabEqual, active && styles.tabActive]}>
            <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sectionX,
    backgroundColor: colors.backgroundPrimary,
  },
  tab: {
    paddingVertical: 10,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabEqual: {
    flex: 1,
    marginRight: 0,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomColor: colors.accent,
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.accent,
  },
});
