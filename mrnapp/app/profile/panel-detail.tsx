import { useLocalSearchParams } from 'expo-router';

import PanelDetailScreen from '../../src/screens/PanelDetailScreen';

export default function PanelDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PanelDetailScreen panelId={id ?? ''} />;
}
