// hooks/useKnobScale.ts

import Animated, { useDerivedValue, withTiming } from "react-native-reanimated";

interface UseKnobScaleParams {
  isPanActive: Animated.SharedValue<boolean>;
  debug: boolean;
}

export const useKnobScale = ({ isPanActive, debug }: UseKnobScaleParams) => {
  const knobScale = useDerivedValue(() => {
    return debug ? 1 : withTiming(isPanActive.value ? 1 : 0);
  });

  return knobScale;
};
