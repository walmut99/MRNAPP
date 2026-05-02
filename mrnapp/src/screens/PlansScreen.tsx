import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BillingCycleToggle, { Cycle } from '../components/plans/BillingCycleToggle';
import PlanCard from '../components/plans/PlanCard';
import { plans } from '../data/sarah';
import { colors, fontWeight, spacing } from '../theme';

type PlanSeed = {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  annualTotal: number;
  keyLimit: string;
  differentiator: string;
  current: boolean;
  popular: boolean;
};

export default function PlansScreen() {
  const router = useRouter();
  const [cycle, setCycle] = useState<Cycle>('monthly');

  const list = plans as PlanSeed[];

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          Choose Your Plan
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <BillingCycleToggle cycle={cycle} onChange={setCycle} />

        <View style={styles.cards}>
          {list.map((p) => (
            <PlanCard
              key={p.id}
              name={p.name}
              monthly={p.monthly}
              annual={p.annual}
              annualTotal={p.annualTotal}
              keyLimit={p.keyLimit}
              differentiator={p.differentiator}
              cycle={cycle}
              current={p.current}
              popular={p.popular}
              onChoose={() => console.log('Choose plan pressed', p.id, cycle)}
            />
          ))}
        </View>

        <Text style={styles.footer}>
          All plans include a 7-day free trial. Cancel anytime.{'\n'}
          Prices in Kuwaiti Dinar.
        </Text>
      </ScrollView>
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
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
    gap: 8,
  },
  back: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  cards: {
    marginHorizontal: 22,
    marginTop: 22,
    gap: 10,
  },
  footer: {
    fontSize: 11,
    lineHeight: 11 * 1.5,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 24,
  },
});
