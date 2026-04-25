import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, spacing } from '../../theme';

type Props = {
  tabs: readonly [string, string];
  activeIndex: 0 | 1;
  onChange: (index: 0 | 1) => void;
};

export default function SubTabSwitcher({ tabs, activeIndex, onChange }: Props) {
  return (
    <View style={styles.row}>
      {tabs.map((label, i) => {
        const active = i === activeIndex;
        return (
          <Pressable
            key={label}
            onPress={() => onChange(i as 0 | 1)}
            style={[styles.tab, active && styles.tabActive]}>
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
