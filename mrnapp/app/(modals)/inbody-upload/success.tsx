import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '../../../src/components/modals/ModalHeader';
import { ParsedInBodyScan } from '../../../src/data/mockParsers';
import { useGoal } from '../../../src/hooks/useGoal';
import { useInBody } from '../../../src/hooks/useInBody';
import { clearPendingScan, getPendingScan } from '../../../src/state/inbodyScanFlow';
import { colors, fontWeight, spacing } from '../../../src/theme';

type Tone = 'good' | 'neutral';

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function formatScanDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function weeksBetween(olderIso: string, newerIso: string): number {
  const diff = Date.parse(newerIso) - Date.parse(olderIso);
  return Math.max(0, Math.round(diff / MS_PER_WEEK));
}

function bodyFatTone(delta: number, goalType: string | undefined): Tone {
  if (goalType === 'Reduce body fat' && delta < 0) return 'good';
  return 'neutral';
}

function muscleTone(delta: number, goalType: string | undefined): Tone {
  if (goalType === 'Reduce body fat' && delta > 0) return 'good';
  if (goalType === 'Gain muscle' && delta > 0) return 'good';
  return 'neutral';
}

function formatDelta(value: number, unit: string): string {
  if (value === 0) return `0 ${unit}`;
  const rounded = Math.round(value * 10) / 10;
  const arrow = rounded > 0 ? '↑' : '↓';
  return `${arrow} ${Math.abs(rounded)}${unit}`;
}

export default function InBodySuccessScreen() {
  const router = useRouter();
  const { scanHistory, addScan } = useInBody();
  const { data: goal } = useGoal();
  const pending = getPendingScan();

  // Capture isFirstScan once on mount so it's stable across re-renders that
  // happen after addScan flips the history length.
  const isFirstScan = useMemo(() => scanHistory.length === 0, []); // eslint-disable-line react-hooks/exhaustive-deps
  const priorScan: ParsedInBodyScan | null = useMemo(
    () => (scanHistory.length > 0 ? scanHistory[scanHistory.length - 1] : null),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const onDone = () => {
    if (pending) addScan(pending);
    clearPendingScan();
    router.dismissAll();
  };

  if (!pending) {
    // Defensive — shouldn't happen in the happy path.
    return (
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ModalHeader title="All Set" onClose={() => router.dismissAll()} />
        <View style={styles.body}>
          <Text style={styles.title}>Scan not found</Text>
          <Text style={styles.sub}>Please try the upload again.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <ModalHeader title="All Set" onClose={() => router.dismissAll()} />

      <View style={styles.body}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={44} color={colors.accent} />
        </View>

        <Text style={styles.title}>Scan Saved</Text>

        {isFirstScan || !priorScan ? (
          <FirstScanContent scan={pending} />
        ) : (
          <SubsequentScanContent
            scan={pending}
            prior={priorScan}
            goalType={goal?.type}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={onDone}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}>
          <Text style={styles.ctaText}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function FirstScanContent({ scan }: { scan: ParsedInBodyScan }) {
  return (
    <>
      <Text style={styles.sub}>
        Your body composition and segmental data will inform every recommendation going
        forward.
      </Text>
      <View style={styles.peek}>
        <PeekRow label="Body Fat" value={`${scan.bodyFat}%`} />
        <PeekRow label="Muscle Mass" value={`${scan.muscleMass} kg`} last />
      </View>
    </>
  );
}

function SubsequentScanContent({
  scan,
  prior,
  goalType,
}: {
  scan: ParsedInBodyScan;
  prior: ParsedInBodyScan;
  goalType: string | undefined;
}) {
  const weeks = weeksBetween(prior.scanDate, scan.scanDate);
  const bodyFatDelta = scan.bodyFat - prior.bodyFat;
  const muscleDelta = scan.muscleMass - prior.muscleMass;

  const bfTone = bodyFatTone(bodyFatDelta, goalType);
  const muTone = muscleTone(muscleDelta, goalType);

  return (
    <>
      <Text style={styles.sub}>
        {weeks} week{weeks === 1 ? '' : 's'} since your last scan. Here&apos;s how things
        have moved.
      </Text>
      <View style={styles.peek}>
        <PeekDelta
          label="Body Fat"
          deltaText={formatDelta(bodyFatDelta, '%')}
          currentText={`to ${scan.bodyFat}%`}
          tone={bfTone}
        />
        <PeekDelta
          label="Muscle Mass"
          deltaText={formatDelta(muscleDelta, ' kg')}
          currentText={`to ${scan.muscleMass} kg`}
          tone={muTone}
          last
        />
        <View style={styles.peekFooterDivider} />
        <Text style={styles.peekFooter}>vs scan from {formatScanDate(prior.scanDate)}</Text>
      </View>
    </>
  );
}

function PeekRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.peekRow, !last && styles.peekRowDivider]}>
      <Text style={styles.peekLabel}>{label}</Text>
      <Text style={styles.peekValue}>{value}</Text>
    </View>
  );
}

function PeekDelta({
  label,
  deltaText,
  currentText,
  tone,
  last,
}: {
  label: string;
  deltaText: string;
  currentText: string;
  tone: Tone;
  last?: boolean;
}) {
  const deltaColor = tone === 'good' ? colors.accentDark : colors.textSecondary;
  return (
    <View style={[styles.peekRow, !last && styles.peekRowDivider]}>
      <Text style={styles.peekLabel}>{label}</Text>
      <View style={styles.peekValueCol}>
        <Text style={[styles.peekValue, { color: deltaColor }]}>{deltaText}</Text>
        <Text style={styles.peekMuted}>{currentText}</Text>
      </View>
    </View>
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
    gap: 14,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 6,
  },
  sub: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 14 * 1.5,
    textAlign: 'center',
    maxWidth: 280,
  },
  peek: {
    width: '100%',
    maxWidth: 280,
    marginTop: 6,
    padding: 14,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 14,
  },
  peekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 12,
  },
  peekRowDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  peekLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  peekValue: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  peekValueCol: {
    alignItems: 'flex-end',
    gap: 1,
  },
  peekMuted: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  peekFooterDivider: {
    height: 0.5,
    backgroundColor: colors.borderTertiary,
    marginVertical: 8,
  },
  peekFooter: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.sectionX,
    paddingBottom: 16,
    paddingTop: 8,
  },
  cta: {
    paddingVertical: 14,
    backgroundColor: colors.accent,
    borderRadius: 9999,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
});
