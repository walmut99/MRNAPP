# Known Issue — Keyboard Overlaps Chat Input on iOS

**Screen:** AI Nutritionist → Chat tab
**File:** `src/screens/nutrition/ChatTab.tsx`
**Severity:** Blocker — user cannot send messages on iOS because the input field is hidden behind the keyboard.
**Platform:** iOS (Expo Go on iPhone). Android not yet verified.

## Reproduction

1. Open the app in Expo Go on iPhone.
2. Tap the **Nutrition** tab in the bottom nav.
3. Land on the **Chat** sub-tab (default).
4. Tap the text input at the bottom.
5. The keyboard slides up and covers the input bar. The user cannot see what they are typing.

## What's been tried

Two rounds of fixes attempted with Claude Code, neither worked:

**Attempt 1** — Wrapped chat layout in `KeyboardAvoidingView` with `behavior="padding"` on iOS, `keyboardVerticalOffset={90}`. Still overlapping.

**Attempt 2** — Switched `keyboardVerticalOffset` to use `useHeaderHeight()` + `useBottomTabBarHeight()` from React Navigation hooks. Also added `keyboardShouldPersistTaps="handled"` and bottom-anchored ScrollView content. Still overlapping.

## Likely causes to investigate

1. **`KeyboardAvoidingView` is not the outermost element of the rendered tree.** Check whether `app/(tabs)/nutrition.tsx` or `AINutritionistScreen.tsx` wraps the ChatTab in a `SafeAreaView` or `View` that breaks `KeyboardAvoidingView`'s ability to measure offset.
2. **expo-router tab bar height is not what `useBottomTabBarHeight()` reports.** expo-router and React Navigation's tab bar measurement can desync. Manually log the value and compare to the actual rendered height on device.
3. **`react-native-keyboard-controller` is the better fix.** The standard `KeyboardAvoidingView` is well-known to be unreliable. Recommend installing `react-native-keyboard-controller` and using its `KeyboardAvoidingView` instead — it auto-calculates offsets and handles edge cases the built-in version doesn't.

## Suggested fix

Install `react-native-keyboard-controller`:

```
npx expo install react-native-keyboard-controller
```

Wrap the root `_layout.tsx` with `<KeyboardProvider>`, then in `ChatTab.tsx` use the `KeyboardAvoidingView` from that package instead of from `react-native`. Remove all manual `keyboardVerticalOffset` calculations.

Reference: https://kirillzyusko.github.io/react-native-keyboard-controller/

## Acceptance criteria

- On iPhone (any size, any iOS version 16+), tapping the chat input causes the keyboard to slide up AND the input bar to slide up with it, fully visible above the keyboard.
- Typing is visible in real time.
- Sending a message keeps the keyboard open and clears the input.
- Tapping a quick-action chip with the keyboard open fills the input without dismissing the keyboard.
- Behaviour also verified on Android.
