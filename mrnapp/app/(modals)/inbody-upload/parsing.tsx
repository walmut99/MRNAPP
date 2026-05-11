import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../../../src/components/modals/ModalHeader';
import Spinner from '../../../src/components/modals/Spinner';
import { mockParseInBody } from '../../../src/data/mockParsers';
import { setPendingScan } from '../../../src/state/inbodyScanFlow';
import { colors, fontWeight, spacing } from '../../../src/theme';

export default function InBodyParsingScreen() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    mockParseInBody().then((scan) => {
      if (cancelled) return;
      setPendingScan(scan);
      router.replace('/(modals)/inbody-upload/success');
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <ModalHeader title="New InBody Scan" onClose={() => router.dismissAll()} />

      <View style={styles.body}>
        <View style={styles.spinnerWrap}>
          <Spinner size={96} strokeWidth={5} />
          <View style={styles.iconCenter} pointerEvents="none">
            <Ionicons name="body-outline" size={32} color={colors.accent} />
          </View>
        </View>

        <Text style={styles.title}>Reading your scan</Text>
        <Text style={styles.subtitle}>
          Extracting body composition and segmental analysis. This usually takes about 10
          seconds.
        </Text>
      </View>

      <Text style={styles.footer}>Privacy: this stays on your device until you save</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sectionX,
    gap: 16,
  },
  spinnerWrap: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 14 * 1.5,
    textAlign: 'center',
    maxWidth: 260,
  },
  footer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.sectionX,
    paddingBottom: 16,
  },
});
