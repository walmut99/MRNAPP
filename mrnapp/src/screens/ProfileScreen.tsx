import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Section from '../components/home/Section';
import BookingStrip from '../components/profile/BookingStrip';
import IdentityCard from '../components/profile/IdentityCard';
import ProfileRow from '../components/profile/ProfileRow';
import { markers, patient } from '../data/sarah';
import { colors, fontWeight, spacing } from '../theme';

const CLINIC_PHONE = '22267222';
const CLINIC_NAME = 'Al Bannay Clinic';

type RowDef = {
  label: string;
  meta?: string;
  path: string;
};

const HEALTH_GOALS_ROWS: RowDef[] = [
  { label: 'Goal & Progress', path: '/progress' },
  { label: 'Progress Photos', path: '/profile/progress-photos' },
];

const RECORDS_ROWS: RowDef[] = [
  { label: 'Food Library', path: '/profile/food-library' },
  { label: 'Blood Test History', path: '/profile/blood-test-history' },
  { label: 'InBody Scan History', path: '/profile/inbody-scan-history' },
  { label: 'Supplements & Treatments', path: '/profile/supplements' },
];

const PREFERENCES_ROWS: RowDef[] = [
  { label: 'Personal Details', path: '/profile/personal-details' },
  { label: 'Notifications', path: '/profile/notifications' },
  { label: 'Connected Devices', path: '/profile/connected-devices' },
];

function RowList({ rows, onPress }: { rows: RowDef[]; onPress: (path: string) => void }) {
  return (
    <>
      {rows.map((row, i) => (
        <ProfileRow
          key={row.label}
          label={row.label}
          meta={row.meta}
          onPress={() => onPress(row.path)}
          last={i === rows.length - 1}
        />
      ))}
    </>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  const go = (path: string) => router.push(path as never);

  const billingRows: RowDef[] = [
    { label: 'Plan & Billing', meta: patient.plan, path: '/profile/billing' },
    { label: 'Upgrade Plan', path: '/profile/plans' },
  ];

  const onSignOut = () => {
    console.log('Sign out pressed');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <IdentityCard />

        <Section label="Health & Goals">
          <RowList rows={HEALTH_GOALS_ROWS} onPress={go} />
        </Section>

        <Section label="Records">
          <RowList rows={RECORDS_ROWS} onPress={go} />
        </Section>

        <Section label="Preferences">
          <RowList rows={PREFERENCES_ROWS} onPress={go} />
        </Section>

        <Section label="Subscription & Billing">
          <RowList rows={billingRows} onPress={go} />
        </Section>

        <BookingStrip
          date={markers.nextDrawDate}
          clinic={CLINIC_NAME}
          phone={CLINIC_PHONE}
        />

        <Pressable
          onPress={onSignOut}
          style={({ pressed }) => [styles.signOut, pressed && { opacity: 0.6 }]}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    backgroundColor: colors.backgroundPrimary,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderTertiary,
  },
  title: {
    fontSize: 22,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    paddingBottom: 24,
  },
  signOut: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 13,
    fontWeight: fontWeight.medium as '500',
    color: colors.danger,
  },
});
