import { useRouter } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Section from '../../components/home/Section';
import BodyCompRow from '../../components/lab/BodyCompRow';
import InBodyScoreCard from '../../components/lab/InBodyScoreCard';
import SegmentalFigure, { Segments } from '../../components/lab/SegmentalFigure';
import SegmentalLegend from '../../components/lab/SegmentalLegend';
import TopStrip from '../../components/lab/TopStrip';
import { inbody } from '../../data/sarah';
import { colors, fontWeight, spacing } from '../../theme';

type BodyCompId = 'weight' | 'bodyFat' | 'muscleMass' | 'fatMass' | 'bmr' | 'visceralFat';

type BodyCompSeed = {
  id: BodyCompId;
  label: string;
  value: number;
  unit: string;
  barPct: number;
  barColor: 'accent' | 'warn';
  tappable: boolean;
};

export default function InBodyTab() {
  const router = useRouter();
  const rows = inbody.bodyComposition as BodyCompSeed[];
  const segments = inbody.segments as Segments;

  const onBookPress = async () => {
    try {
      await Linking.openURL('tel:22267222');
    } catch (err) {
      console.warn('Failed to open dialer', err);
    }
  };

  const openMetric = (id: BodyCompId) => {
    router.push({ pathname: '/marker/[name]', params: { name: id } });
  };

  return (
    <View style={styles.wrap}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TopStrip
          label="Last InBody Scan"
          value={inbody.lastScanDate}
          ctaLabel="Book scan"
          onPress={onBookPress}
        />

        <InBodyScoreCard score={inbody.inbodyScore} />

        <Section label="Segmental Muscle">
          <SegmentalFigure segments={segments} showDeltas={inbody.hasPreviousScan} />
          <SegmentalLegend />
        </Section>

        <Section label="Body Composition">
          {rows.map((r, i) => (
            <BodyCompRow
              key={r.id}
              label={r.label}
              value={r.value}
              unit={r.unit}
              barPct={r.barPct}
              barColor={r.barColor}
              tappable={r.tappable}
              last={i === rows.length - 1}
              onPress={r.tappable ? () => openMetric(r.id) : undefined}
            />
          ))}
        </Section>
      </ScrollView>

      <View style={styles.ctaBar}>
        <Pressable
          onPress={() => router.push('/nutrition')}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}>
          <Text style={styles.ctaText}>Discuss with AI Nutritionist</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  ctaBar: {
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 16,
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  cta: {
    paddingVertical: 11,
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.accent,
    borderWidth: 0.5,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: {
    opacity: 0.6,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: fontWeight.medium as '500',
    color: colors.accent,
  },
});
