// Extra
import { Balloon } from "@/components/2.BalloonSlider/Balloon";
import { Knob } from "@/components/2.BalloonSlider/Knob";
import { clamp, COLORS, LAYOUT } from "@/constants/BallonSlider/constants";
import { SCREEN_HEIGHT } from "@/constants/metrics";
import { useKnobScale } from "@/hooks/BallonSlider/useKnobScale";
import React from "react";
import { SafeAreaView, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// BallonSlider Component
interface BallonSliderProps {
  debug?: boolean; // New prop for debugging
}

export function BallonSlider({ debug = false }: BallonSliderProps) {
  const x = useSharedValue(0);
  const progress = useSharedValue(0);
  const isSensorActive = useSharedValue(true);
  const isPanActive = useSharedValue(false);

  // Modify knobScale to consider debug mode
  const knobScale = useKnobScale({ isPanActive, debug });

  const aRef = useAnimatedRef<View>();

  const panGesture = Gesture.Pan()
    .averageTouches(true)
    .activateAfterLongPress(1)
    .onBegin(() => {
      isSensorActive.value = false;
      isPanActive.value = true;
    })
    .onChange((ev) => {
      const size = measure(aRef);
      if (!size) {
        return;
      }
      isSensorActive.value = false;
      x.value = clamp((x.value += ev.changeX), 0, size.width);
      progress.value = 100 * (x.value / size.width);
    })
    .onEnd(() => {
      isSensorActive.value = true;
      isPanActive.value = false;
    });

  const ballonSpringyX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const ballonAngle = useDerivedValue(() => {
    return (
      90 +
      (Math.atan2(-LAYOUT.indicatorSize * 2, ballonSpringyX.value - x.value) *
        180) /
        Math.PI
    );
  });

  const ballonStyle = useAnimatedStyle(() => {
    return {
      opacity: knobScale.value,
      transform: [
        { translateX: ballonSpringyX.value },
        { scale: knobScale.value },
        {
          translateY: interpolate(
            knobScale.value,
            [0, 1],
            [0, -LAYOUT.indicatorSize]
          ),
        },
        { rotate: `${ballonAngle.value}deg` },
      ],
    };
  });

  // Animated Styles
  const animatedKnobStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(
      knobScale.value,
      [0, 1],
      [LAYOUT.knobSize / 3, 1],
      Extrapolation.CLAMP
    ),
    transform: [{ translateX: x.value }, { scale: knobScale.value + 1 }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <View
          ref={aRef}
          style={{
            // borderWidth: 1,
            borderColor: "red",
            backgroundColor: COLORS.light,
            height: 5,
            justifyContent: "center",
            borderRadius: 2.5,
          }}
          hitSlop={{ left: 10, bottom: 10, right: 10, top: 10 }}
        >
          {/* Balloon */}
          <Balloon ballonStyle={ballonStyle} progress={progress} />

          {/* Progress Indicator */}
          <Animated.View
            style={[
              {
                // borderWidth: 1,
                borderColor: "black",
                height: 5,
                backgroundColor: COLORS.dark,
                position: "absolute",
              },
              { width: x },
            ]}
          />

          {/* Knob */}
          <Knob animatedStyle={animatedKnobStyle} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

// App Component
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ height: SCREEN_HEIGHT * 0.4 }} />
        <BallonSlider
        // debug={true}
        />
      </View>
    </SafeAreaView>
  );
}
