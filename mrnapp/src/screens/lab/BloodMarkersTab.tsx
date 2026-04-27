import { useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import Section from '../../components/home/Section';
import BorderlineCard from '../../components/lab/BorderlineCard';
import FlagCard from '../../components/lab/FlagCard';
import NormalMarkerRow from '../../components/lab/NormalMarkerRow';
import TopStrip from '../../components/lab/TopStrip';
import { markers } from '../../data/sarah';
import { colors, fontSize, fontWeight, letterSpacing } from '../../theme';

type FlaggedMarker = {
  name: string;
  value: number;
  unit: string;
  range: string;
  status: 'high' | 'low' | 'borderline';
  barPct: number;
};

type NormalMarker = {
  category: string;
  name: string;
  value: string;
  range: string;
  barPct: number;
};

const CATEGORY_ORDER = ['Nutrients', 'Hormonal', 'Metabolic', 'Lipids'] as const;

function groupByCategory(rows: NormalMarker[]) {
  const map = new Map<string, NormalMarker[]>();
  for (const row of rows) {
    const list = map.get(row.category) ?? [];
    list.push(row);
    map.set(row.category, list);
  }
  return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
    category: c,
    rows: map.get(c) as NormalMarker[],
  }));
}

export default function BloodMarkersTab() {
  const router = useRouter();
  const flagged = markers.flagged as FlaggedMarker[];
  const normal = markers.normal as NormalMarker[];

  const flagCards = flagged.filter((m) => m.status === 'high' || m.status === 'low');
  const borderlineCards = flagged.filter((m) => m.status === 'borderline');
  const grouped = groupByCategory(normal);

  const openMarker = (name: string) => {
    router.push({ pathname: '/marker/[name]', params: { name } });
  };

  const onBookPress = async () => {
    try {
      await Linking.openURL('tel:22267222');
    } catch (err) {
      console.warn('Failed to open dialer', err);
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <TopStrip
        label="Next blood draw"
        value={markers.nextDrawDate}
        ctaLabel="Book now"
        onPress={onBookPress}
      />

      <Section label="Needs attention" count={`${flagged.length} flagged`}>
        <View style={styles.flagGrid}>
          {flagCards.map((m) => (
            <FlagCard
              key={m.name}
              status={m.status as 'high' | 'low'}
              name={m.name}
              value={m.value}
              unit={m.unit}
              range={m.range}
              barPct={m.barPct}
              onPress={() => openMarker(m.name)}
            />
          ))}
        </View>
        <View style={styles.borderlineList}>
          {borderlineCards.map((m) => (
            <BorderlineCard
              key={m.name}
              name={m.name}
              value={m.value}
              unit={m.unit}
              range={m.range}
              barPct={m.barPct}
              onPress={() => openMarker(m.name)}
            />
          ))}
        </View>
      </Section>

      <Section label="All normal" count={`${normal.length} markers`}>
        {grouped.map((group, gi) => (
          <View key={group.category} style={gi > 0 && styles.categoryGap}>
            <Text style={styles.categoryLabel}>{group.category}</Text>
            {group.rows.map((row, ri) => (
              <NormalMarkerRow
                key={row.name}
                name={row.name}
                value={row.value}
                barPct={row.barPct}
                last={ri === group.rows.length - 1}
                onPress={() => openMarker(row.name)}
              />
            ))}
          </View>
        ))}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  flagGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  borderlineList: {
    gap: 12,
    marginTop: 12,
  },
  categoryGap: {
    marginTop: 20,
  },
  categoryLabel: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
    marginBottom: 10,
  },
});
