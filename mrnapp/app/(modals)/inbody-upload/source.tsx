import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../../../src/components/modals/ModalHeader';
import UploadOptionCard from '../../../src/components/modals/UploadOptionCard';
import { colors, fontWeight, spacing } from '../../../src/theme';

export default function InBodySourcePicker() {
  const router = useRouter();

  const proceed = (source: 'camera' | 'library') => {
    // Mock: in a real build we'd open the camera or photo library here and
    // pass the selected asset URI through to the parsing screen. For the
    // prototype we just navigate forward.
    console.log('InBody upload source selected:', source);
    router.push('/(modals)/inbody-upload/parsing');
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <ModalHeader title="New InBody Scan" onClose={() => router.dismissAll()} />

      <View style={styles.body}>
        <Text style={styles.headline}>How would you like to add it?</Text>
        <Text style={styles.subtitle}>
          We&apos;ll pull your body composition and segmental data automatically.
        </Text>

        <View style={styles.options}>
          <UploadOptionCard
            icon="camera-outline"
            title="Take a Photo"
            description="Snap your printed InBody report"
            onPress={() => proceed('camera')}
          />
          <UploadOptionCard
            icon="image-outline"
            title="Choose From Library"
            description="Pick a saved photo or scanned PDF"
            onPress={() => proceed('library')}
          />
        </View>
      </View>
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
    paddingHorizontal: spacing.sectionX,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headline: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginBottom: 8,
    lineHeight: 22 * 1.25,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 14 * 1.5,
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
});
