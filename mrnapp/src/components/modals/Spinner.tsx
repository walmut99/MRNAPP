import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '../../theme';

type Props = {
  size?: number;
  strokeWidth?: number;
};

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function Spinner({ size = 96, strokeWidth = 5 }: Props) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // 180/251 keeps a long gap so the rotation reads clearly.
  const dashArray = `${circumference * 0.72}, ${circumference}`;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.borderTertiary}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
      <AnimatedSvg
        width={size}
        height={size}
        style={[StyleSheet.absoluteFill, { transform: [{ rotate: spin }] }]}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          fill="none"
        />
      </AnimatedSvg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
