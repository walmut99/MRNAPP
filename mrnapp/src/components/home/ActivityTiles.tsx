import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Path,
  Rect,
} from 'react-native-svg';

import { consumedToday, targets } from '../../data/sarah';
import { colors, fontSize, fontWeight, radii, spacing } from '../../theme';
import Section from './Section';

function WaterBottle({ currentMl, targetMl }: { currentMl: number; targetMl: number }) {
  const fillPct = Math.min(currentMl / targetMl, 1);
  const fillY = 82 - fillPct * 58;
  const bodyPath = 'M 8 24 L 8 82 Q 8 88 14 88 L 26 88 Q 32 88 32 82 L 32 24 Z';

  return (
    <Svg width={40} height={92} viewBox="0 0 40 92">
      <Defs>
        <ClipPath id="bottleInside">
          <Path d={bodyPath} />
        </ClipPath>
      </Defs>
      <Rect x={15} y={2}  width={10} height={10} rx={2} fill={colors.textPrimary} opacity={0.5} />
      <Rect x={13} y={11} width={14} height={5}  rx={1} fill={colors.textPrimary} opacity={0.7} />
      <Path d="M 14 16 L 14 24 L 26 24 L 26 16 Z" fill={colors.borderTertiary} />
      <Path
        d={bodyPath}
        fill={colors.backgroundPrimary}
        stroke={colors.textSecondary}
        strokeWidth={1}
      />
      <Rect
        x={8}
        y={fillY}
        width={24}
        height={82 - fillY + 6}
        fill={colors.accent}
        opacity={0.75}
        clipPath="url(#bottleInside)"
      />
    </Svg>
  );
}

function Walker() {
  return (
    <Svg width={42} height={64} viewBox="0 0 42 64" fill={colors.accent}>
      <Circle cx={21} cy={8} r={5} />
      <Path d="M 21 14 Q 18 24 16 36 L 20 38 Q 22 28 24 18 Z" />
      <Path d="M 16 36 Q 12 46 10 58 L 14 58 Q 17 48 20 38 Z" />
      <Path d="M 22 30 Q 28 40 30 52 L 26 52 Q 24 44 20 36 Z" />
      <Path d="M 20 18 Q 14 22 10 30 L 13 31 Q 18 24 22 20 Z" />
      <Path d="M 22 18 Q 30 20 34 28 L 31 30 Q 27 24 22 20 Z" />
    </Svg>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${clamped}%` }]} />
    </View>
  );
}

export default function ActivityTiles() {
  const [waterMl, setWaterMl] = useState(consumedToday.water);
  const addWater = (ml: number) => setWaterMl((prev) => prev + ml);
  const stepsPct = (consumedToday.steps / consumedToday.stepsGoal) * 100;
  const remaining = Math.max(0, targets.water - waterMl);

  return (
    <Section label="Activity">
      <View style={styles.row}>
        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Water</Text>
          <View style={styles.tileMain}>
            <WaterBottle currentMl={waterMl} targetMl={targets.water} />
          </View>
          <View>
            <Text style={styles.tileValue}>{(waterMl / 1000).toFixed(1)}L</Text>
            <Text style={styles.tileSub}>{remaining}ml to goal</Text>
          </View>
          <View style={styles.waterButtons}>
            <Pressable style={styles.waterBtn} onPress={() => addWater(250)}>
              <Text style={styles.waterBtnText}>+250ml</Text>
            </Pressable>
            <Pressable style={styles.waterBtn} onPress={() => addWater(500)}>
              <Text style={styles.waterBtnText}>+500ml</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.tile}>
          <Text style={styles.tileLabel}>Steps</Text>
          <View style={styles.tileMain}>
            <Walker />
          </View>
          <View>
            <Text style={styles.tileValue}>
              {consumedToday.steps.toLocaleString()}
            </Text>
            <Text style={styles.tileSub}>
              of {consumedToday.stepsGoal.toLocaleString()} goal
            </Text>
          </View>
          <View style={styles.stepsProgress}>
            <ProgressBar percent={stepsPct} />
          </View>
        </View>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.activityGap,
  },
  tile: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radii.activityTile,
    padding: spacing.activityPad,
    gap: 8,
    minHeight: 148,
  },
  tileLabel: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  tileMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileValue: {
    fontSize: fontSize.activityVal,
    fontWeight: fontWeight.medium as '500',
    color: colors.textPrimary,
  },
  tileSub: {
    fontSize: fontSize.sublabel,
    color: colors.textSecondary,
  },
  waterButtons: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  waterBtn: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: colors.backgroundPrimary,
    borderWidth: spacing.divider,
    borderColor: colors.borderTertiary,
    borderRadius: radii.waterBtn,
    alignItems: 'center',
  },
  waterBtnText: {
    fontSize: fontSize.sublabel,
    fontWeight: fontWeight.medium as '500',
    color: colors.accentDark,
  },
  stepsProgress: {
    marginTop: 'auto',
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.borderTertiary,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
  },
});
