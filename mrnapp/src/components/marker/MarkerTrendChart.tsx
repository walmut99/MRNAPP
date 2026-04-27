import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Text as SvgText } from 'react-native-svg';

import { colors } from '../../theme';

export type TrendPoint = { date: string; value: number };

type Props = {
  points: TrendPoint[];
  color: string;
};

const VB_W = 320;
const VB_H = 150;
const PAD_X = 28;
const VAL_LABEL_Y = 14;
const CHART_TOP = 30;
const CHART_BOTTOM = 110;
const DATE_LABEL_Y = 132;

export default function MarkerTrendChart({ points, color }: Props) {
  if (points.length === 0) return null;

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const xAt = (i: number) =>
    points.length === 1 ? VB_W / 2 : PAD_X + ((VB_W - PAD_X * 2) * i) / (points.length - 1);
  const yAt = (v: number) =>
    CHART_TOP + (CHART_BOTTOM - CHART_TOP) * (1 - (v - min) / range);

  const polyPoints = points.map((p, i) => `${xAt(i)},${yAt(p.value)}`).join(' ');

  return (
    <View style={styles.wrap}>
      <Svg width="100%" height={VB_H} viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
        {[0, 0.5, 1].map((t) => {
          const y = CHART_TOP + (CHART_BOTTOM - CHART_TOP) * t;
          return (
            <Line
              key={t}
              x1={PAD_X}
              x2={VB_W - PAD_X}
              y1={y}
              y2={y}
              stroke={colors.borderTertiary}
              strokeWidth={0.5}
              strokeDasharray="2,3"
            />
          );
        })}
        <Polyline
          points={polyPoints}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <SvgText
            key={`${p.date}-val`}
            x={xAt(i)}
            y={VAL_LABEL_Y}
            fontSize={10}
            fontWeight="500"
            fill={colors.textPrimary}
            textAnchor="middle">
            {p.value}
          </SvgText>
        ))}
        {points.map((p, i) => (
          <Circle key={`${p.date}-outer`} cx={xAt(i)} cy={yAt(p.value)} r={4} fill={color} />
        ))}
        {points.map((p, i) => (
          <Circle
            key={`${p.date}-inner`}
            cx={xAt(i)}
            cy={yAt(p.value)}
            r={2}
            fill={colors.backgroundPrimary}
          />
        ))}
        {points.map((p, i) => (
          <SvgText
            key={`${p.date}-date`}
            x={xAt(i)}
            y={DATE_LABEL_Y}
            fontSize={9}
            fill={colors.textSecondary}
            textAnchor="middle">
            {p.date}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
});
