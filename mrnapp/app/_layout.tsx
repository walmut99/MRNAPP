import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="marker/[name]" />
        <Stack.Screen name="progress" />
        <Stack.Screen name="profile/billing" />
        <Stack.Screen name="profile/blood-test-history" />
        <Stack.Screen name="profile/connected-devices" />
        <Stack.Screen name="profile/food-library" />
        <Stack.Screen name="profile/inbody-scan-history" />
        <Stack.Screen name="profile/notifications" />
        <Stack.Screen name="profile/personal-details" />
        <Stack.Screen name="profile/plans" />
        <Stack.Screen name="profile/progress-photos" />
        <Stack.Screen name="profile/supplements" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
