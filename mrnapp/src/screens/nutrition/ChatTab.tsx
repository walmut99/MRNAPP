import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ChatBubble from '../../components/nutrition/ChatBubble';
import { useChat } from '../../hooks';
import { colors, spacing } from '../../theme';

type Message = {
  id: string;
  role: 'ai' | 'user';
  text: string;
};

export default function ChatTab() {
  const { data: chat } = useChat();
  const messages: Message[] = [
    { id: '1', role: 'ai', text: chat?.proactiveMessage ?? '' },
  ];

  return (
    <View style={styles.flex}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {messages.map((m) => (
          <View key={m.id} style={styles.bubbleWrap}>
            <ChatBubble role={m.role} text={m.text} />
          </View>
        ))}
      </ScrollView>

      {/*
        TEMPORARY PLACEHOLDER — chat input removed pending backend integration.
        When Claude API is wired, restore the input with:
        - react-native-keyboard-controller for proper keyboard handling
        - Real send button calling the AI API
        - Real chip actions (Log a meal, etc.)
        See KEYBOARD_ISSUE.md for context on prior keyboard handling problems.
      */}
      <View style={styles.placeholder}>
        <Ionicons name="lock-closed-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.placeholderText}>Chat input coming with the next update</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.sectionX,
    paddingTop: 16,
    paddingBottom: 16,
  },
  bubbleWrap: {
    marginBottom: 12,
  },
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 14,
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  placeholderText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 12 * 1.4,
  },
});
