import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-health-data" />
      <Stack.Screen name="inbody-upload/source" />
      <Stack.Screen name="inbody-upload/parsing" />
      <Stack.Screen name="inbody-upload/success" />
      <Stack.Screen name="supplements/picker" />
      <Stack.Screen name="supplements/form" />
      <Stack.Screen name="food-library/edit" />
    </Stack>
  );
}
