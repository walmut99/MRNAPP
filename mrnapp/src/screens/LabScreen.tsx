import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SubTabSwitcher from '../components/nutrition/SubTabSwitcher';
import { colors, fontWeight, spacing } from '../theme';
import BloodMarkersTab from './lab/BloodMarkersTab';
import InBodyTab from './lab/InBodyTab';

const TABS = ['Blood Markers', 'InBody'] as const;

export default function LabScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Lab</Text>
        <Pressable
          onPress={() => router.push('/(modals)/add-health-data')}
          hitSlop={8}
          style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.6 }]}
          accessibilityRole="button"
          accessibilityLabel="Add health data">
          <Ionicons name="add" size={18} color={colors.accentDark} />
        </Pressable>
      </View>
      <SubTabSwitcher
        tabs={TABS}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        equalWidth
      />
      <View style={styles.divider} />
      <View style={styles.body}>
        {activeIndex === 0 && <BloodMarkersTab />}
        {activeIndex === 1 && <InBodyTab />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sectionX,
    paddingTop: spacing.topBarV,
    paddingBottom: 6,
    backgroundColor: colors.backgroundPrimary,
  },
  title: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.borderTertiary,
  },
  body: {
    flex: 1,
  },
});
