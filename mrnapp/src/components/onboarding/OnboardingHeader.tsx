import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontWeight, spacing } from '../../theme';

type Props = {
  step: number;
  totalSteps: number;
  showBack: boolean;
  onBack: () => void;
};

const PROGRESS_MAX_WIDTH = 140;
const SEGMENT_GAP = 3;

export default function OnboardingHeader({ step, totalSteps, showBack, onBack }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.backSlot}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={8}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}>
            <Ionicons name="chevron-back" size={18} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.counter}>
        {step} of {totalSteps}
      </Text>

      <ProgressBar step={step} totalSteps={totalSteps} />
    </View>
  );
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  const segments = Array.from({ length: totalSteps }, (_, i) => i);
  return (
    <View style={[styles.progress, { maxWidth: PROGRESS_MAX_WIDTH }]}>
      {segments.map((i) => {
        const filled = i < step;
        return (
          <View
            key={i}
            style={[
              styles.segment,
              i < segments.length - 1 && { marginRight: SEGMENT_GAP },
              { backgroundColor: filled ? colors.accent : colors.borderTertiary },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
  },
  backSlot: {
    width: 24,
  },
  backBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -4,
  },
  counter: {
    fontSize: 11,
    fontWeight: fontWeight.medium as '500',
    color: colors.textSecondary,
    letterSpacing: 0.4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  segment: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
  },
});
