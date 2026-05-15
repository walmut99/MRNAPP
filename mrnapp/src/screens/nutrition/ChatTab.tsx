import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useChat, useMarkers } from '../../hooks';
import { useSupplements, SupplementEntry } from '../../hooks/useSupplements';
import { colors, fontSize, fontWeight, radii, spacing } from '../../theme';

// ── Types ────────────────────────────────────────────────────────────────────

type ParsedEntry = {
  name: string;
  dose: number;
  unit: NonNullable<SupplementEntry['unit']>;
  frequency: NonNullable<SupplementEntry['frequency']>;
};

type PartialParsed = { partial: true; name: string };

type ChatMsg = { kind: 'message'; id: string; role: 'ai' | 'user'; text: string };
type ChatCard = {
  kind: 'card';
  id: string;
  entry: ParsedEntry;
  cardState: 'pending' | 'confirmed';
};
type ChatItem = ChatMsg | ChatCard;

// ── Pattern matching ─────────────────────────────────────────────────────────

const KNOWN_NAMES: Record<string, string> = {
  'b12': 'B12',
  'collagen': 'Collagen',
  'creatine': 'Creatine',
  'iron': 'Iron',
  'magnesium glycinate': 'Magnesium glycinate',
  'magnesium': 'Magnesium glycinate',
  'multivitamin': 'Multivitamin',
  'omega-3': 'Omega-3',
  'omega 3': 'Omega-3',
  'probiotics': 'Probiotics',
  'probiotic': 'Probiotics',
  'vitamin d3': 'Vitamin D3',
  'vitamin d': 'Vitamin D3',
  'zinc': 'Zinc',
};

const TRIGGER_PHRASES = [
  'started taking', 'i take', "i'm taking", 'i am taking', "i'm on", 'i am on', 'taking',
];

function normalizeUnit(raw: string): NonNullable<SupplementEntry['unit']> {
  const lower = raw.toLowerCase();
  if (lower === 'iu') return 'IU';
  if (lower === 'mcg') return 'mcg';
  if (lower === 'mg') return 'mg';
  if (lower === 'g') return 'g';
  if (lower.startsWith('capsule')) return 'capsule';
  if (lower.startsWith('scoop')) return 'scoop';
  return 'mg';
}

function normalizeFrequency(raw: string): NonNullable<SupplementEntry['frequency']> {
  const lower = raw.toLowerCase();
  if (lower.includes('daily') || lower.includes('every day') || lower === 'nightly') return 'daily';
  if (lower.includes('twice')) return 'twice-weekly';
  if (lower.includes('weekly') || lower.includes('week')) return 'weekly';
  if (lower.includes('monthly') || lower.includes('month')) return 'monthly';
  return 'daily';
}

function parseMessage(text: string): ParsedEntry | PartialParsed | null {
  const lower = text.toLowerCase();

  const hasTrigger = TRIGGER_PHRASES.some(p => lower.includes(p));
  if (!hasTrigger) return null;

  // Find supplement name (longest match first)
  const nameKeys = Object.keys(KNOWN_NAMES).sort((a, b) => b.length - a.length);
  let foundKey: string | null = null;
  for (const key of nameKeys) {
    if (lower.includes(key)) {
      foundKey = key;
      break;
    }
  }
  if (!foundKey) return null;

  const displayName = KNOWN_NAMES[foundKey];

  // Extract dose + unit
  const doseMatch = lower.match(/(\d+(?:\.\d+)?)\s*(mg|mcg|g\b|iu|capsules?|scoops?)/i);
  const dose = doseMatch ? parseFloat(doseMatch[1]) : null;
  const unit = doseMatch ? normalizeUnit(doseMatch[2]) : null;

  // Extract frequency
  const freqMatch = lower.match(
    /\b(daily|every day|nightly|once a day|weekly|every week|twice a week|twice weekly|monthly|every month)\b/i,
  );
  const frequency = freqMatch ? normalizeFrequency(freqMatch[0]) : null;

  if (dose !== null && unit !== null && frequency !== null) {
    return { name: displayName, dose, unit, frequency };
  }

  return { partial: true, name: displayName };
}

// ── AI follow-up copy ─────────────────────────────────────────────────────────

const RETEST_NAMES = new Set(['iron', 'b12', 'vitamin d3', 'zinc', 'magnesium glycinate']);
const MARKER_LINKS: Record<string, string> = {
  iron: 'Ferritin',
  'vitamin d3': 'Vitamin D',
  'magnesium glycinate': 'Magnesium',
};

function followUpMessage(
  name: string,
  flaggedMarkers: { name: string }[],
): string {
  const lower = name.toLowerCase();
  const flaggedNames = flaggedMarkers.map(m => m.name.toLowerCase());
  const linkedMarker = MARKER_LINKS[lower];

  if (linkedMarker && flaggedNames.includes(linkedMarker.toLowerCase())) {
    return `I'll factor it in. Once your ${linkedMarker} retests, we'll see how it's moving.`;
  }
  if (RETEST_NAMES.has(lower)) {
    return "I'll factor it in. Want a reminder to retest your performance markers in 8 weeks?";
  }
  return "I'll factor it in.";
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCardDose(entry: ParsedEntry): string {
  const freqLabels: Record<string, string> = {
    daily: 'daily',
    weekly: 'weekly',
    'twice-weekly': 'twice weekly',
    monthly: 'monthly',
    'as-needed': 'as needed',
  };
  return `${entry.dose} ${entry.unit} · ${freqLabels[entry.frequency] ?? entry.frequency}`;
}

let _idCounter = 100;
function nextId() {
  return `chat-${++_idCounter}`;
}

// ── AiAvatar ─────────────────────────────────────────────────────────────────

function AiAvatar() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>AI</Text>
    </View>
  );
}

// ── Confirm card ─────────────────────────────────────────────────────────────

function SupplementCard({
  entry,
  cardState,
  onAdd,
  onEdit,
  onCancel,
}: {
  entry: ParsedEntry;
  cardState: 'pending' | 'confirmed';
  onAdd: () => void;
  onEdit: () => void;
  onCancel: () => void;
}) {
  const confirmed = cardState === 'confirmed';

  return (
    <View style={styles.cardRow}>
      <AiAvatar />
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons
            name={confirmed ? 'checkmark-circle' : 'add-circle'}
            size={12}
            color={colors.accent}
          />
          <Text style={styles.cardHeadLabel}>
            {confirmed ? 'ADDED TO SUPPLEMENTS' : 'ADD TO YOUR SUPPLEMENTS'}
          </Text>
        </View>

        <Text style={styles.cardName}>{entry.name}</Text>
        <Text style={styles.cardDoseText}>{formatCardDose(entry)}</Text>
        <Text style={styles.cardStarted}>Started {formatDisplayDate(new Date())}</Text>

        {!confirmed && (
          <View style={styles.cardActions}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [styles.actionOutline, pressed && { opacity: 0.7 }]}>
              <Text style={styles.actionOutlineText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onEdit}
              style={({ pressed }) => [styles.actionOutline, pressed && { opacity: 0.7 }]}>
              <Text style={styles.actionOutlineText}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={onAdd}
              style={({ pressed }) => [styles.actionFill, pressed && { opacity: 0.75 }]}>
              <Text style={styles.actionFillText}>Add</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

// ── Screen ───────────────────────────────────────────────────────────────────

export default function ChatTab() {
  const { data: chat } = useChat();
  const { addEntry } = useSupplements();
  const { data: markersData } = useMarkers();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [items, setItems] = useState<ChatItem[]>([
    { kind: 'message', id: 'init', role: 'ai', text: chat?.proactiveMessage ?? '' },
  ]);
  const [input, setInput] = useState('');

  function pushItem(item: ChatItem) {
    setItems(prev => [...prev, item]);
  }

  function aiMessage(text: string) {
    pushItem({ kind: 'message', id: nextId(), role: 'ai', text });
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');

    pushItem({ kind: 'message', id: nextId(), role: 'user', text });

    const parsed = parseMessage(text);

    if (!parsed) {
      setTimeout(() => aiMessage("Got it! Let me know if you'd like nutrition advice."), 400);
      return;
    }

    if ('partial' in parsed) {
      const followUp = `Got it on ${parsed.name}. How much do you take and how often?`;
      setTimeout(() => aiMessage(followUp), 400);
      return;
    }

    // Full match — show confirmation card
    setTimeout(
      () => pushItem({ kind: 'card', id: nextId(), entry: parsed, cardState: 'pending' }),
      400,
    );
  }

  function handleCardAdd(cardId: string, entry: ParsedEntry) {
    addEntry({
      type: 'supplement',
      isTemplate: false,
      name: entry.name,
      dose: entry.dose,
      unit: entry.unit,
      frequency: entry.frequency,
      frequencyDay: null,
      frequencyDays: null,
      startedDate: formatDisplayDate(new Date()),
      linkedMarkerId: null,
      retestDate: null,
      stoppedDate: null,
      source: 'chat-extraction',
      reminderEnabled: false,
    });

    setItems(prev =>
      prev.map(item =>
        item.id === cardId && item.kind === 'card'
          ? { ...item, cardState: 'confirmed' }
          : item,
      ),
    );

    const follow = followUpMessage(entry.name, markersData?.flagged ?? []);
    setTimeout(() => aiMessage(follow), 500);
  }

  function handleCardEdit(entry: ParsedEntry) {
    router.push({
      pathname: '/(modals)/supplements/form',
      params: {
        mode: 'add',
        entryType: 'supplement',
        prefillName: entry.name,
        prefillDose: String(entry.dose),
        prefillUnit: entry.unit,
        prefillFrequency: entry.frequency,
      },
    } as never);
  }

  function handleCardCancel(cardId: string) {
    setItems(prev => prev.filter(item => item.id !== cardId));
    setTimeout(() => aiMessage('No problem.'), 300);
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {items.map(item => {
          if (item.kind === 'card') {
            return (
              <View key={item.id} style={styles.bubbleWrap}>
                <SupplementCard
                  entry={item.entry}
                  cardState={item.cardState}
                  onAdd={() => handleCardAdd(item.id, item.entry)}
                  onEdit={() => handleCardEdit(item.entry)}
                  onCancel={() => handleCardCancel(item.id)}
                />
              </View>
            );
          }

          if (item.role === 'ai') {
            return (
              <View key={item.id} style={styles.bubbleWrap}>
                <View style={styles.aiRow}>
                  <AiAvatar />
                  <View style={[styles.bubble, styles.bubbleAi]}>
                    <Text style={styles.bubbleText}>{item.text}</Text>
                  </View>
                </View>
              </View>
            );
          }

          return (
            <View key={item.id} style={styles.bubbleWrap}>
              <View style={styles.userRow}>
                <View style={[styles.bubble, styles.bubbleUser]}>
                  <Text style={styles.bubbleText}>{item.text}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder='Try "I started taking creatine 5g daily"'
          placeholderTextColor={colors.textSecondary}
          style={styles.inputField}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <Pressable
          onPress={handleSend}
          disabled={!input.trim()}
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}>
          <Ionicons name="arrow-up" size={16} color={colors.backgroundPrimary} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.sectionX,
    paddingTop: 16,
    paddingBottom: 8,
  },
  bubbleWrap: {
    marginBottom: 12,
  },

  // Bubbles
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 11,
    fontWeight: fontWeight.medium as '500',
    color: colors.backgroundPrimary,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  bubbleAi: {
    backgroundColor: colors.accentLight,
  },
  bubbleUser: {
    backgroundColor: colors.backgroundSecondary,
  },
  bubbleText: {
    fontSize: fontSize.body,
    color: colors.textPrimary,
    lineHeight: fontSize.body * 1.45,
  },

  // Confirmation card
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  card: {
    maxWidth: '82%',
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 14,
    gap: 3,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  cardHeadLabel: {
    fontSize: 10,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
    letterSpacing: 0.7,
  },
  cardName: {
    fontSize: 17,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  cardDoseText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginTop: 1,
  },
  cardStarted: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
    marginTop: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  actionOutline: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
    backgroundColor: colors.backgroundPrimary,
  },
  actionOutlineText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium as '500',
  },
  actionFill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  actionFillText: {
    fontSize: 12,
    color: colors.backgroundPrimary,
    fontWeight: fontWeight.medium as '500',
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: spacing.sectionX,
    paddingVertical: 10,
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderTertiary,
  },
  inputField: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.borderTertiary,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.borderTertiary,
  },
});
