import { Stack } from 'expo-router';

import { colors, fontSize, fontWeight } from '../../../src/theme';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundPrimary },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: fontSize.greeting,
          fontWeight: fontWeight.medium as '500',
          color: colors.textPrimary,
        },
        headerTintColor: colors.textPrimary,
        headerBackTitle: 'Back',
        contentStyle: { backgroundColor: colors.backgroundSecondary },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="billing" options={{ title: 'Billing' }} />
      <Stack.Screen name="plans" options={{ title: 'Plans' }} />
      <Stack.Screen name="progress" options={{ title: 'Progress' }} />
      <Stack.Screen name="progress-photos" options={{ title: 'Progress Photos' }} />
      <Stack.Screen name="food-library" options={{ title: 'Food Library' }} />
      <Stack.Screen name="blood-test-history" options={{ title: 'Blood Test History' }} />
      <Stack.Screen name="inbody-scan-history" options={{ title: 'InBody Scan History' }} />
      <Stack.Screen name="personal-details" options={{ title: 'Personal Details' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="connected-devices" options={{ title: 'Connected Devices' }} />
    </Stack>
  );
}
