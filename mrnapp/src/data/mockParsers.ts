import { inbody } from './sarah';

export type InBodySegmentStatus = 'lower' | 'normal' | 'higher';

export type InBodySegment = {
  kg: number;
  status: InBodySegmentStatus;
  delta: number;
};

export type InBodySegments = {
  leftArm: InBodySegment;
  rightArm: InBodySegment;
  trunk: InBodySegment;
  leftLeg: InBodySegment;
  rightLeg: InBodySegment;
};

export type ParsedInBodyScan = {
  scanDate: string; // ISO date string
  weight: number;
  bodyFat: number;
  muscleMass: number;
  fatMass: number;
  bmr: number;
  visceralFat: number;
  segments: InBodySegments;
};

/**
 * Stubbed parser used during the prototype. Returns Sarah's seed values plus
 * today's date. Replace this with a real Claude Vision OCR call when the
 * backend sprint wires up.
 */
export async function mockParseInBody(): Promise<ParsedInBodyScan> {
  // Simulated parse latency. The parsing screen also uses 3s for the visible
  // delay, so resolve here on the same clock.
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    scanDate: new Date().toISOString(),
    weight: 68.4,
    bodyFat: 28.1,
    muscleMass: 24.1,
    fatMass: 19.2,
    bmr: 1420,
    visceralFat: 6,
    segments: inbody.segments as InBodySegments,
  };
}
