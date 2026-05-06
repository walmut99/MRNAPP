import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';

import OnboardingFooter from './OnboardingFooter';
import OnboardingHeader from './OnboardingHeader';

type Props = {
  children: ReactNode;
  step: number;
  totalSteps: number;
  showBack: boolean;
  onBack: () => void;
  primaryLabel?: string;
  onPrimaryPress?: () => void;
  primaryEnabled?: boolean;
  primaryVariant?: 'filled' | 'plain';
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  scrollable?: boolean;
  hideFooter?: boolean;
};

/**
 * Standard chrome for screens 3-19 (header + content + footer).
 * Welcome (1) and What to Expect (2) don't use this; they use a custom layout.
 */
export default function OnboardingShell({
  children,
  step,
  totalSteps,
  showBack,
  onBack,
  primaryLabel,
  onPrimaryPress,
  primaryEnabled = true,
  primaryVariant = 'filled',
  secondaryLabel,
  onSecondaryPress,
  scrollable = false,
  hideFooter = false,
}: Props) {
  const showFooter = !hideFooter && primaryLabel && onPrimaryPress;
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      <OnboardingHeader
        step={step}
        totalSteps={totalSteps}
        showBack={showBack}
        onBack={onBack}
      />

      {scrollable ? (
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.body, styles.bodyContent]}>{children}</View>
      )}

      {showFooter && primaryLabel && onPrimaryPress ? (
        <OnboardingFooter
          primaryLabel={primaryLabel}
          onPrimaryPress={onPrimaryPress}
          primaryEnabled={primaryEnabled}
          primaryVariant={primaryVariant}
          secondaryLabel={secondaryLabel}
          onSecondaryPress={onSecondaryPress}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  body: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  bodyContent: {
    paddingHorizontal: spacing.sectionX,
    paddingTop: 12,
    paddingBottom: 16,
  },
});
