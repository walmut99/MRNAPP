import { Platform, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme';

type Props = {
  size?: number;
};

const FONT_SIZE_MAP: Record<number, number> = {
  80: 30,
  36: 14,
  28: 12,
  24: 10,
};

const ARABIC_FONT = Platform.select({
  ios: 'Geeza Pro',
  web: "'Geeza Pro', 'Damascus', 'Al Bayan', 'Amiri', 'Scheherazade New', 'Times New Roman', serif",
  default: undefined,
});

export function AIAvatar({ size = 28 }: Props) {
  const borderWidth = size >= 80 ? 2 : 1.5;
  const fontSize = FONT_SIZE_MAP[size] ?? Math.round(size * 0.42);
  const downPad = size >= 36 ? 2 : 1;

  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            fontSize,
            lineHeight: fontSize * 1.1,
            marginTop: downPad,
            fontFamily: ARABIC_FONT,
          },
        ]}
        allowFontScaling={false}>
        مرن
      </Text>
    </View>
  );
}

export default AIAvatar;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.accent,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
});
