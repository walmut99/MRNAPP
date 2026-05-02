import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Section from '../components/home/Section';
import AnnualNudgeCard from '../components/billing/AnnualNudgeCard';
import CurrentPlanCard, { PlanFeature } from '../components/billing/CurrentPlanCard';
import InvoiceRow from '../components/billing/InvoiceRow';
import PaymentMethodRow from '../components/billing/PaymentMethodRow';
import UsageBar from '../components/billing/UsageBar';
import WhatPremiumAddsCard from '../components/billing/WhatPremiumAddsCard';
import { billing } from '../data/sarah';
import { colors, fontWeight, letterSpacing, spacing } from '../theme';

type BillingView = 'premium' | 'essentials';

const PREMIUM_FEATURES: PlanFeature[] = [
  { label: 'AI Nutritionist', value: 'Unlimited' },
  { label: 'Blood Test & InBody Parsing', value: 'Automated' },
  { label: 'Trend History', value: 'Full History' },
  { label: 'Weekly AI Review', value: 'Every Sunday' },
  { label: 'Treatment Tracking', value: 'Reminders + Streaks' },
];

export default function BillingScreen() {
  const router = useRouter();
  const [view, setView] = useState<BillingView>('premium');

  const isPremium = view === 'premium';
  const usage = billing.essentialsUsage;

  const monthlyPrice = isPremium ? billing.monthlyPrice : 9;
  const annualTotal = isPremium ? billing.annualPrice : 90;
  const annualEffective = isPremium ? billing.annualEffectiveMonthly : 7.5;
  const saveAmount = monthlyPrice * 12 - annualTotal;

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
          Plan & Billing
        </Text>
        <Pressable
          onPress={() => setView(isPremium ? 'essentials' : 'premium')}
          style={({ pressed }) => [styles.devToggle, pressed && { opacity: 0.6 }]}>
          <Text style={styles.devToggleText}>
            View as {isPremium ? 'Essentials' : 'Premium'}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {isPremium ? (
          <CurrentPlanCard
            variant="premium"
            planName="Premium"
            priceText={`${billing.monthlyPrice} KWD/mo`}
            renewalDate={billing.renewalDate}
            features={PREMIUM_FEATURES}
          />
        ) : (
          <>
            <CurrentPlanCard
              variant="essentials"
              planName="Essentials"
              priceText="9 KWD/mo"
              renewalDate={billing.renewalDate}
              features={[]}
            />
            <View style={styles.usageBlock}>
              <UsageBar
                label="AI Messages Today"
                used={usage.aiMessagesUsed}
                limit={usage.aiMessagesLimit}
                note={`${usage.aiMessagesLimit - usage.aiMessagesUsed} remaining · resets at midnight`}
              />
              <UsageBar
                label="Blood Test Uploads"
                used={usage.bloodTestsUsed}
                limit={usage.bloodTestsLimit}
              />
              <UsageBar
                label="InBody Scan Uploads"
                used={usage.inbodyScansUsed}
                limit={usage.inbodyScansLimit}
              />
              <UsageBar
                label="Trend History"
                showBar={false}
                note="Last 30 days only"
                noteColor={colors.warn}
              />
            </View>
          </>
        )}

        {!isPremium ? <WhatPremiumAddsCard /> : null}

        <AnnualNudgeCard
          saveAmount={saveAmount}
          effectiveMonthly={annualEffective}
          onPress={() => console.log('Switch to annual pressed')}
        />

        <Section label="Payment Method">
          <PaymentMethodRow
            brand={billing.card.brand}
            last4={billing.card.last4}
            expiry={billing.card.expiry}
          />
        </Section>

        <Section label="Billing History">
          {billing.history.map((inv, i) => (
            <InvoiceRow
              key={inv.date}
              date={inv.date}
              plan={inv.plan}
              amount={inv.amount}
              onDownload={() => console.log('Download invoice', inv.date)}
              last={i === billing.history.length - 1}
            />
          ))}
        </Section>

        <Pressable
          onPress={() => console.log('Cancel subscription pressed')}
          style={({ pressed }) => [styles.cancel, pressed && { opacity: 0.6 }]}>
          <Text style={styles.cancelText}>Cancel Subscription</Text>
          <Text style={styles.cancelSub}>Access continues until {billing.renewalDate}</Text>
        </Pressable>
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
  devToggle: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 9999,
  },
  devToggleText: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel * 0.86,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  usageBlock: {
    marginHorizontal: 22,
    marginTop: -2,
    marginBottom: 14,
    padding: 16,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 12,
    gap: 10,
  },
  cancel: {
    paddingVertical: 20,
    alignItems: 'center',
    gap: 4,
  },
  cancelText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.danger,
  },
  cancelSub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
