import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SubTabSwitcher from '../components/nutrition/SubTabSwitcher';
import { colors, fontWeight, spacing } from '../theme';
import BloodMarkersTab from './lab/BloodMarkersTab';
import InBodyTab from './lab/InBodyTab';

const TABS = ['Blood Markers', 'InBody'] as const;

export default function LabScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Data</Text>
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
  divider: {
    height: 0.5,
    backgroundColor: colors.borderTertiary,
  },
  body: {
    flex: 1,
  },
});
