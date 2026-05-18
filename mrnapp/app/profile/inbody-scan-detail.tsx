import { useLocalSearchParams } from 'expo-router';

import InBodyScanDetailScreen from '../../src/screens/InBodyScanDetailScreen';

export default function InBodyScanDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <InBodyScanDetailScreen scanId={id ?? ''} />;
}
