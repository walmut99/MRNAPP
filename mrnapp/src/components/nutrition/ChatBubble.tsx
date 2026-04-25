import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fontWeight, lineHeight, radii } from '../../theme';

type Props = {
  role: 'ai' | 'user';
  text: string;
};

const AVATAR_SIZE = 28;

function AiAvatar() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>AI</Text>
    </View>
  );
}

export default function ChatBubble({ role, text }: Props) {
  if (role === 'ai') {
    return (
      <View style={styles.aiRow}>
        <AiAvatar />
        <View style={[styles.bubble, styles.bubbleAi]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.userRow}>
      <View style={[styles.bubble, styles.bubbleUser]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aiRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.backgroundPrimary,
    fontSize: 11,
    fontWeight: fontWeight.medium as '500',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radii.bubble,
  },
  bubbleAi: {
    backgroundColor: colors.accentLight,
  },
  bubbleUser: {
    backgroundColor: colors.backgroundSecondary,
  },
  text: {
    fontSize: fontSize.unit,
    lineHeight: fontSize.unit * lineHeight.bubble,
    color: colors.textPrimary,
  },
});
