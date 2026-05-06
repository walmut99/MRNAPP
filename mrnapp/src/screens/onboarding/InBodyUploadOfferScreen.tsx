import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import OnboardingIcon from '../../components/onboarding/OnboardingIcon';
import OnboardingShell from '../../components/onboarding/OnboardingShell';
import { displayStep, totalSteps } from '../../components/onboarding/steps';
import { useOnboardingState } from '../../hooks/useOnboardingState';
import { colors, fontWeight } from '../../theme';

type OptionDef = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
};

export default function InBodyUploadOfferScreen() {
  const router = useRouter();
  const { data: state, update } = useOnboardingState();

  const proceed = (uploaded: boolean) => {
    update({ inbodyUploaded: uploaded });
    router.push('/onboarding/dietary');
  };

  const options: OptionDef[] = [
    {
      icon: 'camera-outline',
      title: 'Take a photo',
      description: 'Snap your printed report',
      onPress: () => {
        console.log('InBody upload: take photo');
        proceed(true);
      },
    },
    {
      icon: 'document-outline',
      title: 'Choose a file',
      description: 'Pick a digital PDF',
      onPress: () => {
        console.log('InBody upload: choose file');
        proceed(true);
      },
    },
  ];

  return (
    <OnboardingShell
      step={displayStep(9, state)}
      totalSteps={totalSteps(state)}
      showBack
      onBack={() => router.back()}
      primaryLabel="Maybe later"
      primaryVariant="plain"
      onPrimaryPress={() => proceed(false)}>
      <View style={{ marginTop: 20 }}>
        <OnboardingIcon ionicon="cloud-upload-outline" />
      </View>

      <Text style={styles.headline}>Have an InBody scan handy?</Text>
      <Text style={styles.subtitle}>
        Upload it now for precise body composition data. Takes about 30 seconds.
      </Text>

      <View style={styles.cards}>
        {options.map((opt) => (
          <Pressable
            key={opt.title}
            onPress={opt.onPress}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}>
            <View style={styles.iconTile}>
              <Ionicons name={opt.icon} size={20} color={colors.textPrimary} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.title}>{opt.title}</Text>
              <Text style={styles.desc}>{opt.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
    lineHeight: 24 * 1.25,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 14 * 1.5,
    marginBottom: 24,
  },
  cards: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    borderRadius: 12,
    padding: 16,
  },
  iconTile: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  desc: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
