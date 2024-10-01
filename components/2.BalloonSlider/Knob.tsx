// components/Knob.tsx

import { COLORS, LAYOUT } from "@/constants/BallonSlider/constants";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

interface KnobProps {
  animatedStyle: AnimatedStyle<ViewStyle>;
}

export const Knob: React.FC<KnobProps> = ({ animatedStyle }) => {
  return <Animated.View style={[styles.knob, animatedStyle]} />;
};

const styles = StyleSheet.create({
  knob: {
    width: LAYOUT.knobSize,
    height: LAYOUT.knobSize,
    borderRadius: LAYOUT.knobSize / 2,
    backgroundColor: "#fff",
    borderColor: COLORS.base,
    position: "absolute",
    left: -LAYOUT.knobSize / 2,
  },
});
