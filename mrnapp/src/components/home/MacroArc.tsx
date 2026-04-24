import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

import { colors, components, fontSize, fontWeight, macroColors, spacing } from '../../theme';

type Props = {
  color: string;
  percent: number;
  label: string;
  value: string;
};

export default function MacroArc({ color, percent, label, value }: Props) {
  const size = components.macroArc.size;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = c * (1 - clamped / 100);
  const center = size / 2;

  return (
    <View style={styles.col}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={center}
          cy={center}
          r={r}
          stroke={macroColors.track}
          strokeWidth={stroke}
          fill="none"
        />
        <G rotation={-90} originX={center} originY={center}>
          <Circle
            cx={center}
            cy={center}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${c}, ${c}`}
            strokeDashoffset={offset}
          />
        </G>
        <SvgText
          x={center}
          y={center + 4}
          textAnchor="middle"
          fontSize={11}
          fontWeight="500"
          fill={colors.textPrimary}>
          {`${Math.round(clamped)}%`}
        </SvgText>
      </Svg>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.macroArcGap,
  },
  label: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  value: {
    fontSize: fontSize.subtab,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
});

// Keep macroColors export in one import for callers who want dedicated arc colours.
export { macroColors };
