import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { useOnboardingState } from '../../src/hooks/useOnboardingState';
import { nextRouteForState } from '../../src/state/onboarding';

export default function OnboardingEntry() {
  const { data, isLoading } = useOnboardingState();
  if (isLoading) return <View />;
  return <Redirect href={nextRouteForState(data) as never} />;
}
