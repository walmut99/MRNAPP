import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, spacing } from '../theme';

type Props = { name: string };

export default function PlaceholderScreen({ name }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.sectionX,
  },
  text: {
    fontSize: fontSize.greeting,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
});
