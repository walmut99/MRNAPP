import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../../src/components/modals/ModalHeader';
import UploadOptionCard from '../../src/components/modals/UploadOptionCard';
import { colors, fontWeight, spacing } from '../../src/theme';

export default function AddHealthDataModal() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <ModalHeader title="Add Health Data" onClose={() => router.dismissAll()} />

      <View style={styles.body}>
        <Text style={styles.headline}>What would you like to add?</Text>
        <Text style={styles.subtitle}>
          Upload a blood test or InBody scan. We&apos;ll handle the rest.
        </Text>

        <View style={styles.options}>
          <UploadOptionCard
            icon="document-text-outline"
            title="Blood Test"
            description="Upload a lab report or test result"
            // TODO: route to a real blood-test source picker once that flow is built.
            onPress={() => {
              router.dismissAll();
              router.push('/profile/blood-test-history');
            }}
          />
          <UploadOptionCard
            icon="body-outline"
            title="InBody Scan"
            description="Add a new body composition scan"
            onPress={() => router.push('/(modals)/inbody-upload/source')}
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
