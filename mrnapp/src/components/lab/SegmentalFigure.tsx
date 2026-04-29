import { StyleSheet, View } from 'react-native';
import Svg, { Ellipse, Path, Text as SvgText } from 'react-native-svg';

import { colors } from '../../theme';

export type SegmentStatus = 'lower' | 'normal' | 'higher';

export type Segment = {
  kg: number;
  status: SegmentStatus;
  delta: number;
};

export type Segments = {
  leftArm: Segment;
  rightArm: Segment;
  trunk: Segment;
  leftLeg: Segment;
  rightLeg: Segment;
};

type Props = {
  segments: Segments;
  showDeltas: boolean;
};

function colorFor(status: SegmentStatus): string {
  return status === 'lower' ? colors.warn : colors.accent;
}

function opacityFor(status: SegmentStatus): number {
  if (status === 'lower') return 0.45;
  if (status === 'higher') return 0.4;
  return 0.72;
}

function deltaText(delta: number): string {
  if (delta === 0) return '0';
  const rounded = Math.round(delta * 100) / 100;
  return rounded > 0 ? `+${rounded}` : `${rounded}`;
}

function deltaColor(delta: number): string {
  if (delta > 0) return colors.accent;
  if (delta < 0) return colors.danger;
  return colors.textSecondary;
}

function SegmentLabel({
  x,
  y,
  anchor,
  name,
  kg,
  delta,
  showDelta,
}: {
  x: number;
  y: number;
  anchor: 'start' | 'end';
  name: string;
  kg: number;
  delta: number;
  showDelta: boolean;
}) {
  return (
    <>
      <SvgText
        x={x}
        y={y}
        textAnchor={anchor}
        fontSize={9}
        fontWeight="500"
        fill={colors.textSecondary}>
        {name}
      </SvgText>
      <SvgText
        x={x}
        y={y + 13}
        textAnchor={anchor}
        fontSize={11}
        fontWeight="500"
        fill={colors.textPrimary}>
        {kg} kg
      </SvgText>
      {showDelta ? (
        <SvgText
          x={x}
          y={y + 25}
          textAnchor={anchor}
          fontSize={10}
          fontWeight="500"
          fill={deltaColor(delta)}>
          {deltaText(delta)}
        </SvgText>
      ) : null}
    </>
  );
}

export default function SegmentalFigure({ segments, showDeltas }: Props) {
  const headStatus: SegmentStatus = 'normal';

  return (
    <View style={styles.wrap}>
      <Svg width={240} height={290} viewBox="0 0 280 340">
        <Ellipse
          cx={140}
          cy={38}
          rx={22}
          ry={24}
          fill={colorFor(headStatus)}
          opacity={opacityFor(headStatus)}
        />

        <Path
          d="M 128 60 Q 140 68 152 60 L 156 76 Q 140 84 124 76 Z"
          fill={colors.accent}
          opacity={0.55}
        />

        <Path
          d="M 118 80 Q 88 110 76 154 Q 72 168 80 170 Q 88 168 96 156 Q 110 124 124 102 Z"
          fill={colorFor(segments.leftArm.status)}
          opacity={opacityFor(segments.leftArm.status)}
        />

        <Path
          d="M 162 80 Q 192 110 204 154 Q 208 168 200 170 Q 192 168 184 156 Q 170 124 156 102 Z"
          fill={colorFor(segments.rightArm.status)}
          opacity={opacityFor(segments.rightArm.status)}
        />

        <Path
          d="M 108 78 Q 100 96 100 130 Q 100 168 108 188 Q 122 196 140 196 Q 158 196 172 188 Q 180 168 180 130 Q 180 96 172 78 Q 156 70 140 70 Q 124 70 108 78 Z"
          fill={colorFor(segments.trunk.status)}
          opacity={opacityFor(segments.trunk.status)}
        />

        <Path
          d="M 110 198 Q 106 240 110 280 Q 112 308 118 318 Q 128 322 134 318 Q 138 308 138 280 Q 138 240 136 198 Z"
          fill={colorFor(segments.leftLeg.status)}
          opacity={opacityFor(segments.leftLeg.status)}
        />

        <Path
          d="M 144 198 Q 142 240 142 280 Q 142 308 146 318 Q 152 322 162 318 Q 168 308 170 280 Q 174 240 170 198 Z"
          fill={colorFor(segments.rightLeg.status)}
          opacity={opacityFor(segments.rightLeg.status)}
        />

        <SegmentLabel
          x={42}
          y={140}
          anchor="end"
          name="L ARM"
          kg={segments.leftArm.kg}
          delta={segments.leftArm.delta}
          showDelta={showDeltas}
        />
        <SegmentLabel
          x={238}
          y={140}
          anchor="start"
          name="R ARM"
          kg={segments.rightArm.kg}
          delta={segments.rightArm.delta}
          showDelta={showDeltas}
        />
        <SegmentLabel
          x={168}
          y={30}
          anchor="start"
          name="TRUNK"
          kg={segments.trunk.kg}
          delta={segments.trunk.delta}
          showDelta={showDeltas}
        />
        <SegmentLabel
          x={42}
          y={260}
          anchor="end"
          name="L LEG"
          kg={segments.leftLeg.kg}
          delta={segments.leftLeg.delta}
          showDelta={showDeltas}
        />
        <SegmentLabel
          x={238}
          y={260}
          anchor="start"
          name="R LEG"
          kg={segments.rightLeg.kg}
          delta={segments.rightLeg.delta}
          showDelta={showDeltas}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
