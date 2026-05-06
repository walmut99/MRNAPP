import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import OnboardingHeader from '../../components/onboarding/OnboardingHeader';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { GoalType, OnboardingGoal } from '../../state/onboarding';
import { colors, fontWeight, letterSpacing, spacing } from '../../theme';

const AVATAR = 28;
const AVATAR_GUTTER = 38; // chips/CTAs indent under bubble

const CHIPS: { label: string; type: GoalType }[] = [
  { label: 'Lose weight', type: 'lose_weight' },
  { label: 'Reduce body fat', type: 'reduce_body_fat' },
  { label: 'Build muscle', type: 'build_muscle' },
  { label: 'Visible abs', type: 'visible_abs' },
  { label: 'Eat healthier', type: 'eat_healthier' },
  { label: 'I have a wedding coming up', type: 'wedding' },
];

type Phase = 'idle' | 'thinking' | 'response';

type ProposedPlan = {
  goalLabel: string;
  timeframe: string;
  dailyTarget: string;
};

function templateResponse(type: GoalType, freeText?: string): string {
  switch (type) {
    case 'lose_weight':
    case 'reduce_body_fat':
    case 'visible_abs':
      return "From your stats I'd estimate you're around 28% body fat. A realistic 16-week target would be 23%. That's about 0.3% per week — sustainable, no extreme deficits.";
    case 'build_muscle':
      return 'Based on your weight and activity, a realistic goal is gaining 0.25–0.5 kg of muscle per month. We’ll aim for 1.5 kg over 16 weeks with adequate protein and consistent training.';
    case 'eat_healthier':
      return "Let's keep it simple. We'll work toward a balanced daily intake matched to your activity level — no extreme goals, just steady habits.";
    case 'wedding':
      return 'Tell me a bit more — when is the wedding, and how do you want to feel by then?';
    case 'custom':
    default:
      return freeText
        ? `Got it: "${freeText}". Tell me a little more about the timeframe — when do you want to feel the difference?`
        : 'Tell me a bit more about what you want to achieve.';
  }
}

function templatePlan(type: GoalType): ProposedPlan {
  switch (type) {
    case 'lose_weight':
    case 'reduce_body_fat':
    case 'visible_abs':
      return {
        goalLabel: '23% body fat',
        timeframe: '16 weeks',
        dailyTarget: '1,750 kcal · 110g protein',
      };
    case 'build_muscle':
      return {
        goalLabel: '+1.5 kg muscle',
        timeframe: '16 weeks',
        dailyTarget: '2,200 kcal · 140g protein',
      };
    case 'eat_healthier':
      return {
        goalLabel: 'Balanced daily intake',
        timeframe: 'Ongoing',
        dailyTarget: '1,900 kcal · 100g protein',
      };
    default:
      return {
        goalLabel: 'Custom plan',
        timeframe: '12 weeks',
        dailyTarget: '1,900 kcal · 110g protein',
      };
  }
}

type Bubble =
  | { kind: 'ai'; id: string; text: string }
  | { kind: 'user'; id: string; text: string }
  | { kind: 'thinking'; id: string };

const INITIAL_BUBBLE: Bubble = {
  kind: 'ai',
  id: 'init',
  text: 'What would you like to work on?',
};

export default function GoalConversationScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();
  const scrollRef = useRef<ScrollView>(null);

  const [bubbles, setBubbles] = useState<Bubble[]>([INITIAL_BUBBLE]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [draft, setDraft] = useState('');
  const [chosenGoal, setChosenGoal] = useState<{
    type: GoalType;
    description: string;
  } | null>(null);
  const [plan, setPlan] = useState<ProposedPlan | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  }, [bubbles, phase, plan]);

  const submit = (type: GoalType, description: string) => {
    setChosenGoal({ type, description });
    setBubbles((prev) => [
      ...prev.filter((b) => b.kind !== 'thinking'),
      { kind: 'user', id: `u-${Date.now()}`, text: description },
      { kind: 'thinking', id: `t-${Date.now()}` },
    ]);
    setPhase('thinking');
    setTimeout(() => {
      setBubbles((prev) => [
        ...prev.filter((b) => b.kind !== 'thinking'),
        {
          kind: 'ai',
          id: `a-${Date.now()}`,
          text: templateResponse(type, type === 'custom' ? description : undefined),
        },
      ]);
      setPlan(templatePlan(type));
      setPhase('response');
    }, 800);
  };

  const onChipPress = (chip: (typeof CHIPS)[number]) => {
    if (phase !== 'idle') return;
    submit(chip.type, chip.label);
  };

  const onSendFreeText = () => {
    const text = draft.trim();
    if (!text || phase !== 'idle') return;
    setDraft('');
    submit('custom', text);
  };

  const onAdjust = () => {
    setBubbles([INITIAL_BUBBLE]);
    setPhase('idle');
    setChosenGoal(null);
    setPlan(null);
  };

  const onAccept = () => {
    if (!chosenGoal || !plan) return;
    const goal: OnboardingGoal = {
      type: chosenGoal.type,
      description: chosenGoal.description,
      timeframeWeeks: 16,
      targetBodyFatPct:
        chosenGoal.type === 'reduce_body_fat' ||
        chosenGoal.type === 'lose_weight' ||
        chosenGoal.type === 'visible_abs'
          ? 23
          : undefined,
      dailyCalories: 1750,
      dailyProteinG: 110,
    };
    update({ goal });
    router.push('/onboarding/plan');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      <OnboardingHeader
        step={displayStep(18, state)}
        totalSteps={totalSteps(state)}
        showBack
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {bubbles.map((b) => (
            <BubbleRow key={b.id} bubble={b} />
          ))}

          {phase === 'idle' ? (
            <View style={styles.chipsRow}>
              {CHIPS.map((c) => (
                <Pressable
                  key={c.type}
                  onPress={() => onChipPress(c)}
                  style={({ pressed }) => [styles.chip, pressed && { opacity: 0.7 }]}>
                  <Text style={styles.chipText}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          {phase === 'response' && plan ? (
            <View style={styles.planSlot}>
              <View style={styles.planCard}>
                <Text style={styles.planLabel}>Your Proposed Plan</Text>
                <PlanRow label="Goal" value={plan.goalLabel} />
                <PlanRow label="Timeframe" value={plan.timeframe} />
                <PlanRow label="Daily target" value={plan.dailyTarget} last />
              </View>

              <View style={styles.ctaRow}>
                <Pressable
                  onPress={onAccept}
                  style={({ pressed }) => [styles.ctaPrimary, pressed && { opacity: 0.85 }]}>
                  <Text style={styles.ctaPrimaryText}>Sounds good</Text>
                </Pressable>
                <Pressable
                  onPress={onAdjust}
                  style={({ pressed }) => [styles.ctaSecondary, pressed && { opacity: 0.85 }]}>
                  <Text style={styles.ctaSecondaryText}>Adjust</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.inputArea}>
          <Text style={styles.hint}>
            Or describe it however feels natural — e.g. &quot;fit my old jeans&quot;, &quot;feel less tired&quot;, &quot;be ready for summer&quot;...
          </Text>
          <View style={styles.inputBar}>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              editable={phase === 'idle'}
              placeholder="Type your goal..."
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
              onSubmitEditing={onSendFreeText}
              returnKeyType="send"
            />
            <Pressable
              onPress={onSendFreeText}
              disabled={!draft.trim() || phase !== 'idle'}
              style={({ pressed }) => [
                styles.sendBtn,
                (!draft.trim() || phase !== 'idle') && { opacity: 0.4 },
                pressed && draft.trim() && phase === 'idle' && { opacity: 0.85 },
              ]}>
              <Ionicons name="send" size={16} color={colors.backgroundPrimary} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function BubbleRow({ bubble }: { bubble: Bubble }) {
  if (bubble.kind === 'user') {
    return (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          <Text style={styles.bubbleText}>{bubble.text}</Text>
        </View>
      </View>
    );
  }

  if (bubble.kind === 'thinking') {
    return (
      <View style={styles.aiRow}>
        <AiBadge />
        <View style={styles.aiBubble}>
          <ThinkingDots />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.aiRow}>
      <AiBadge />
      <View style={styles.aiBubble}>
        <Text style={styles.bubbleText}>{bubble.text}</Text>
      </View>
    </View>
  );
}

function AiBadge() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>AI</Text>
    </View>
  );
}

function ThinkingDots() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 3), 350);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={styles.dotsRow}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={[styles.dot, { opacity: tick === i ? 1 : 0.3 }]} />
      ))}
    </View>
  );
}

function PlanRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.planRow, !last && styles.planRowDivider]}>
      <Text style={styles.planRowLabel}>{label}</Text>
      <Text style={styles.planRowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  flex: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContent: {
    paddingHorizontal: spacing.sectionX,
    paddingTop: 12,
    paddingBottom: 16,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.backgroundPrimary,
    fontSize: 11,
    fontWeight: fontWeight.medium as '500',
  },
  aiBubble: {
    maxWidth: '78%',
    backgroundColor: colors.accentLight,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  userBubble: {
    maxWidth: '78%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bubbleText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 14 * 1.45,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingLeft: AVATAR_GUTTER,
    marginTop: -4,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 9999,
  },
  chipText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: fontWeight.medium as '500',
  },
  planSlot: {
    paddingLeft: AVATAR_GUTTER,
    marginTop: 4,
  },
  planCard: {
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 14,
    padding: 16,
  },
  planLabel: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
    textTransform: 'uppercase',
    letterSpacing: letterSpacing.sectionLabel,
    marginBottom: 12,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 12,
  },
  planRowDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  planRowLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  planRowValue: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: 'right',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  ctaPrimary: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 9999,
    alignItems: 'center',
  },
  ctaPrimaryText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  ctaSecondary: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 9999,
    alignItems: 'center',
  },
  ctaSecondaryText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  inputArea: {
    paddingHorizontal: spacing.sectionX,
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
  },
  hint: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    color: colors.textSecondary,
    paddingLeft: 4,
    marginBottom: 8,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 4,
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentDark,
  },
});
