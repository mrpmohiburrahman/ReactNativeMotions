// hooks/useBalloonAnimations.ts

import { LAYOUT } from "@/constants/BallonSlider/constants";
import Animated, {
  useDerivedValue,
  withSpring,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

interface UseBalloonAnimationsParams {
  x: Animated.SharedValue<number>;
  knobScale: Animated.SharedValue<number>;
}

export const useBalloonAnimations = ({
  x,
  knobScale,
}: UseBalloonAnimationsParams) => {
  const ballonSpringyX = useDerivedValue(() => withSpring(x.value));

  const ballonAngle = useDerivedValue(() => {
    return (
      90 +
      (Math.atan2(-LAYOUT.indicatorSize * 2, ballonSpringyX.value - x.value) *
        180) /
        Math.PI
    );
  });

  const ballonStyle = useDerivedValue(() => ({
    opacity: knobScale.value,
    transform: [
      { translateX: ballonSpringyX.value },
      { scale: knobScale.value },
      {
        translateY: interpolate(
          knobScale.value,
          [0, 1],
          [0, -LAYOUT.indicatorSize],
          Extrapolation.CLAMP
        ),
      },
      { rotate: `${ballonAngle.value}deg` },
    ],
  }));

  return { ballonSpringyX, ballonAngle, ballonStyle };
};
