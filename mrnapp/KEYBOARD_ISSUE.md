# Keyboard Issue — Chat Input

The chat input has been removed from the Nutrition tab pending backend integration. When restoring:

1. Use `react-native-keyboard-controller`'s `KeyboardAvoidingView` instead of React Native's built-in version
2. Test on both iOS (especially with Dynamic Island devices) and Android
3. Ensure keyboard dismisses on send, on tap outside, and on tab switch
4. The visual design of the input is preserved in the original NutritionScreen git history (see commit before removal)
