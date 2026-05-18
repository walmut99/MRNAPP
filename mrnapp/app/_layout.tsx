import 'react-native-gesture-handler';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useOnboardingState } from '../src/hooks/useOnboardingState';
import { OnboardingProvider } from '../src/state/OnboardingProvider';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OnboardingProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <OnboardingGate />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
            <Stack.Screen name="marker/[name]" />
            <Stack.Screen name="progress" />
            <Stack.Screen name="profile/billing" />
            <Stack.Screen name="profile/blood-test-history" />
            <Stack.Screen name="profile/panel-detail" />
            <Stack.Screen name="profile/connected-devices" />
            <Stack.Screen name="profile/food-library" />
            <Stack.Screen name="profile/inbody-scan-history" />
            <Stack.Screen name="profile/inbody-scan-detail" />
            <Stack.Screen name="profile/notifications" />
            <Stack.Screen name="profile/personal-details" />
            <Stack.Screen name="profile/plans" />
            <Stack.Screen name="profile/progress-photos" />
            <Stack.Screen name="profile/supplements" />
            <Stack.Screen name="profile/supplements-medications" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}

/**
 * Sits at the root and routes the user into onboarding if it's not yet complete.
 * Runs in an effect (rather than via <Redirect>) so the rest of the navigator
 * mounts normally during AsyncStorage hydration on first launch.
 */
function OnboardingGate() {
  const router = useRouter();
  const segments = useSegments();
  const { data, isLoading } = useOnboardingState();

  useEffect(() => {
    if (isLoading) return;
    const inOnboarding = segments[0] === 'onboarding';
    if (!data.completed && !inOnboarding) {
      router.replace('/onboarding');
    }
  }, [isLoading, data.completed, segments, router]);

  return null;
}
