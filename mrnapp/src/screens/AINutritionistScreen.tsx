import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SubTabSwitcher from '../components/nutrition/SubTabSwitcher';
import { colors, fontWeight, spacing } from '../theme';
import ChatTab from './nutrition/ChatTab';
import TodaysLogTab from './nutrition/TodaysLogTab';

const TABS = ['Chat', "Today's log"] as const;

export default function AINutritionistScreen() {
  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Nutritionist</Text>
      </View>
      <SubTabSwitcher tabs={TABS} activeIndex={activeIndex} onChange={setActiveIndex} />
      <View style={styles.divider} />
      <View style={styles.body}>
        {activeIndex === 0 ? <ChatTab /> : <TodaysLogTab />}
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
