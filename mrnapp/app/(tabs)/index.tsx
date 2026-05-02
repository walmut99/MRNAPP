import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AINutritionistCard from '../../src/components/home/AINutritionistCard';
import ActivityTiles from '../../src/components/home/ActivityTiles';
import BodyComposition from '../../src/components/home/BodyComposition';
import HealthFlags from '../../src/components/home/HealthFlags';
import ProgressSection from '../../src/components/home/ProgressSection';
import TodaysNutrition from '../../src/components/home/TodaysNutrition';
import { usePatient } from '../../src/hooks';
import { colors, components, fontSize, fontWeight, radii, spacing } from '../../src/theme';

function TopBar() {
  const { data: patient } = usePatient();
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.greeting}>Good morning, {patient?.firstName}</Text>
        <View style={styles.weekChip}>
          <View style={styles.weekChipDot} />
          <Text style={styles.weekChipText}>
            Week {patient?.programWeek} of {patient?.programTotalWeeks} · {patient?.streakDays}-day streak
          </Text>
        </View>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{patient?.initials}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TopBar />
        <BodyComposition />
        <TodaysNutrition />
        <ActivityTiles />
        <AINutritionistCard />
        <ProgressSection />
        <HealthFlags />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sectionX,
    paddingVertical: spacing.topBarV,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: spacing.divider,
    borderBottomColor: colors.borderTertiary,
  },
  greeting: {
    fontSize: fontSize.greeting,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  weekChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.weekChipPadH,
    paddingVertical: spacing.weekChipPadV,
    backgroundColor: colors.accentLight,
    borderRadius: radii.pill,
    marginTop: 6,
  },
  weekChipDot: {
    width: components.weekChipDot.size,
    height: components.weekChipDot.size,
    borderRadius: components.weekChipDot.size / 2,
    backgroundColor: colors.accent,
  },
  weekChipText: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },
  avatar: {
    width: components.avatar.size,
    height: components.avatar.size,
    borderRadius: components.avatar.size / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.backgroundPrimary,
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium as '500',
  },
});
