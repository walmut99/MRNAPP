import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../theme';

type Props = {
  children?: ReactNode;
  ionicon?: keyof typeof Ionicons.glyphMap;
};

export default function OnboardingIcon({ children, ionicon }: Props) {
  return (
    <View style={styles.tile}>
      {ionicon ? <Ionicons name={ionicon} size={28} color={colors.accent} /> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
