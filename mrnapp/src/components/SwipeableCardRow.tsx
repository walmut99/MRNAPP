import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

const ACTION_W = 80;
const REVEAL_THRESHOLD = 60;

const SPRING = { stiffness: 280, damping: 28 };

export type SwipeableCardRowProps = {
  editable?: boolean;
  onDelete: () => void;
  onEdit?: () => void;
  children: React.ReactNode;
};

export default function SwipeableCardRow({
  editable = false,
  onDelete,
  onEdit,
  children,
}: SwipeableCardRowProps) {
  const tx = useSharedValue(0);

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((e) => {
      'worklet';
      if (e.translationX < 0) {
        tx.value = Math.max(e.translationX, -ACTION_W - 12);
      } else if (editable && e.translationX > 0) {
        tx.value = Math.min(e.translationX, ACTION_W + 12);
      }
    })
    .onEnd((e) => {
      'worklet';
      if (e.translationX < -REVEAL_THRESHOLD) {
        tx.value = withSpring(-ACTION_W, SPRING);
      } else if (editable && e.translationX > REVEAL_THRESHOLD) {
        tx.value = withSpring(ACTION_W, SPRING);
      } else {
        tx.value = withSpring(0, SPRING);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }));

  function handleDeletePress() {
    Alert.alert('Delete entry?', "This can't be undone.", [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => { tx.value = withSpring(0, SPRING); },
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  }

  function handleEditPress() {
    tx.value = withSpring(0, SPRING);
    onEdit?.();
  }

  return (
    <View style={styles.container}>
      {/* Delete — right side, revealed by left swipe */}
      <View style={styles.deleteBg}>
        <Pressable
          style={styles.actionInner}
          onPress={handleDeletePress}>
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.actionLabel}>Delete</Text>
        </Pressable>
      </View>

      {/* Edit — left side, revealed by right swipe */}
      {editable && (
        <View style={styles.editBg}>
          <Pressable
            style={styles.actionInner}
            onPress={handleEditPress}>
            <Ionicons name="pencil-outline" size={18} color="#fff" />
            <Text style={styles.actionLabel}>Edit</Text>
          </Pressable>
        </View>
      )}

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.card, cardStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  deleteBg: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_W,
    backgroundColor: '#C57676',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: ACTION_W,
    backgroundColor: '#4A7FA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionInner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.backgroundPrimary,
  },
});
