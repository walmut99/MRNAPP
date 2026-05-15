import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import OnboardingShell from '../../components/onboarding/OnboardingShell';
import PlanCard from '../../components/onboarding/PlanCard';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { useSupplements } from '../../hooks/useSupplements';
import { colors, fontWeight } from '../../theme';
import type { SupplementEntry } from '../../hooks/useSupplements';

const TEMPLATE_UNITS: Record<string, SupplementEntry['unit']> = {
  'Vitamin D3': 'IU',
  Creatine: 'g',
  Multivitamin: 'capsule',
  Probiotics: 'capsule',
  Iron: 'mg',
  'Magnesium glycinate': 'mg',
  'Omega-3': 'mg',
  B12: 'mcg',
  Zinc: 'mg',
  Collagen: 'g',
};

export default function PlanSelectionScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();
  const { addEntry } = useSupplements();

  const choose = (plan: 'essentials' | 'premium') => {
    console.log('IAP placeholder: purchase', plan);
    update({ selectedPlan: plan, completed: true });

    if (plan === 'premium') {
      const allSelected = [
        ...state.supplements,
        ...state.customSupplements,
      ];
      allSelected.forEach(name => {
        addEntry({
          type: 'supplement',
          isTemplate: true,
          name,
          dose: null,
          unit: TEMPLATE_UNITS[name] ?? null,
          frequency: null,
          frequencyDay: null,
          frequencyDays: null,
          startedDate: null,
          linkedMarkerId: null,
          retestDate: null,
          stoppedDate: null,
          source: 'onboarding',
          reminderEnabled: false,
        });
      });
    }

    router.replace('/');
  };

  return (
    <OnboardingShell
      step={displayStep(19, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      hideFooter
      scrollable>
      <Text style={styles.headline}>Choose your plan</Text>
      <Text style={styles.subtitle}>
        7 days free, then your subscription starts. Cancel anytime.
      </Text>

      <View style={styles.cards}>
        <PlanCard
          name="Essentials"
          priceText="9 KWD"
          description="15 AI messages/day · 1 of each upload · 30-day trends"
          ctaLabel="Choose Essentials"
          onPress={() => choose('essentials')}
        />
        <View style={{ height: 18 }} />
        <PlanCard
          name="Premium"
          priceText="18 KWD"
          description="Unlimited AI · unlimited uploads · Sunday review · treatment tracking · weekly meal plans"
          ctaLabel="Choose Premium"
          popular
          onPress={() => choose('premium')}
        />
      </View>

      <Text style={styles.footer}>
        7-day free trial. Cancel anytime. Prices in Kuwaiti Dinar.
      </Text>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginTop: 8,
    marginBottom: 8,
    lineHeight: 24 * 1.25,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 13 * 1.5,
    marginBottom: 24,
  },
  cards: {
    paddingTop: 12,
  },
  footer: {
    marginTop: 24,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 11 * 1.5,
    textAlign: 'center',
    paddingHorizontal: 14,
    paddingBottom: 24,
  },
});
