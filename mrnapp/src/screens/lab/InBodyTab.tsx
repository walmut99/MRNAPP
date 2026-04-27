import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';

export default function InBodyTab() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="body-outline" size={36} color={colors.textSecondary} />
      </View>
      <Text style={styles.title}>Coming soon</Text>
      <Text style={styles.subtitle}>This tab is under construction</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    gap: 8,
    padding: 32,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: fontSize.unit,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
});
