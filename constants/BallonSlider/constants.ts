// utils/constants.ts

export const clamp = (
  value: number,
  min = 0,
  max = Number.MAX_SAFE_INTEGER
): number => {
  "worklet";
  return Math.min(max, Math.max(min, value));
};

export const LAYOUT = {
  spacing: 10,
  radius: 10,
  knobSize: 20,
  indicatorSize: 48,
};

export const COLORS = {
  base: "#683FC2",
  light: "#683FC255",
  dark: "#683FC2DD",
};

export const MIN_ANGLE_TO_ACTIVATE_SENSOR = 5; // in degrees
export const POINTS_PER_ANGLE = 0.2;
