import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import ChatBubble from '../../components/nutrition/ChatBubble';
import QuickActionChip from '../../components/nutrition/QuickActionChip';
import { proactiveMessage } from '../../data/sarah';
import { colors, spacing } from '../../theme';

type Message = {
  id: string;
  role: 'ai' | 'user';
  text: string;
};

const QUICK_ACTIONS = ['Log a meal', "What should I eat?", 'Log manually', 'My targets'] as const;

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    text: proactiveMessage,
  },
];

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setDraft('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'ai', text: 'Got it, working on that…' },
      ]);
    }, 600);
  };

  const onChipPress = (label: string) => {
    setDraft(label);
    inputRef.current?.focus();
  };

  const onCameraPress = () => {
    // placeholder
  };

  const canSend = draft.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight + tabBarHeight : 0}>
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {messages.map((m) => (
          <View key={m.id} style={styles.bubbleWrap}>
            <ChatBubble role={m.role} text={m.text} />
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chipsContent}
        style={styles.chipsRow}>
        {QUICK_ACTIONS.map((a) => (
          <View key={a} style={styles.chipWrap}>
            <QuickActionChip label={a} onPress={() => onChipPress(a)} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <Pressable onPress={onCameraPress} hitSlop={8} style={styles.cameraBtn}>
          <Ionicons name="camera-outline" size={24} color={colors.textSecondary} />
        </Pressable>
        <TextInput
          ref={inputRef}
          value={draft}
          onChangeText={setDraft}
          placeholder="Ask a question or log a meal..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          multiline
          maxLength={2000}
        />
        <Pressable
          onPress={send}
          disabled={!canSend}
          style={[styles.sendBtn, !canSend && styles.sendBtnDisabled]}>
          <Ionicons name="arrow-up" size={20} color={colors.backgroundPrimary} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.sectionX,
    paddingTop: 16,
    paddingBottom: 8,
  },
  bubbleWrap: {
    marginBottom: 12,
  },
  chipsRow: {
    flexGrow: 0,
  },
  chipsContent: {
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 10,
    gap: 8,
  },
  chipWrap: {
    marginRight: 0,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 10,
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  cameraBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 96,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 18,
    color: colors.textPrimary,
    fontSize: 14,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    marginLeft: 0,
  },
  sendBtnDisabled: {
    backgroundColor: colors.borderTertiary,
  },
});
