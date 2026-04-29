import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Rect, Text as SvgText } from 'react-native-svg';

import { colors } from '../../theme';

export type TrendPoint = { date: string; value: number };

type Props = {
  points: TrendPoint[];
  color: string;
  unit?: string;
};

const VB_W = 320;
const VB_H = 150;
const PAD_X = 28;
const CHART_TOP = 30;
const CHART_BOTTOM = 110;
const DATE_LABEL_Y = 132;
const LABEL_OFFSET = 12;
const FLIP_THRESHOLD = 16;

function formatLabel(value: number, unit?: string): string {
  if (!unit) return `${value}`;
  if (unit === '%') return `${value}%`;
  return `${value} ${unit}`;
}

export default function MarkerTrendChart({ points, color, unit }: Props) {
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

        {points.map((p, i) => {
          const text = formatLabel(p.value, unit);
          const longLabel = text.length > 8;
          const charWidth = longLabel ? 5 : 5.5;
          const labelWidth = text.length * charWidth;
          const px = xAt(i);
          const py = yAt(p.value);
          const flipBelow = py < FLIP_THRESHOLD;
          const labelY = flipBelow ? py + LABEL_OFFSET + 4 : py - LABEL_OFFSET;

          return (
            <Rect
              key={`${p.date}-halo`}
              x={px - labelWidth / 2 - 4}
              y={labelY - 9}
              width={labelWidth + 8}
              height={12}
              rx={3}
              fill={colors.backgroundPrimary}
            />
          );
        })}

        {points.map((p, i) => {
          const text = formatLabel(p.value, unit);
          const longLabel = text.length > 8;
          const fontSize = longLabel ? 9 : 10;
          const px = xAt(i);
          const py = yAt(p.value);
          const flipBelow = py < FLIP_THRESHOLD;
          const labelY = flipBelow ? py + LABEL_OFFSET + 4 : py - LABEL_OFFSET;

          return (
            <SvgText
              key={`${p.date}-val`}
              x={px}
              y={labelY}
              fontSize={fontSize}
              fontWeight="500"
              fill={colors.textPrimary}
              textAnchor="middle">
              {text}
            </SvgText>
          );
        })}

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
