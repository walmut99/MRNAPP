import { useLocalSearchParams } from 'expo-router';

import MarkerDetailScreen from '../../src/screens/MarkerDetailScreen';

export default function MarkerRoute() {
  const { name } = useLocalSearchParams<{ name: string }>();
  return <MarkerDetailScreen name={name ?? ''} />;
}
