import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight } from '../../theme';

type Props = {
  note: string;
};

const AVATAR_SIZE = 24;

export default function AINoteBlock({ note }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>AI</Text>
      </View>
      <Text style={styles.note}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  avatarText: {
    color: colors.backgroundPrimary,
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
  },
  note: {
    flex: 1,
    fontSize: 13,
    lineHeight: 13 * 1.5,
    color: colors.textPrimary,
  },
});
