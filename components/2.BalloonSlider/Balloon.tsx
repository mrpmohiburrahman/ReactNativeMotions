// components/Balloon.tsx

import { AnimatedText } from "@/components/2.BalloonSlider/AnimatedText";
import { COLORS, LAYOUT } from "@/constants/BallonSlider/constants";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

interface BalloonProps {
  ballonStyle: AnimatedStyle<ViewStyle>;
  progress: Animated.SharedValue<number>;
}

export const Balloon: React.FC<BalloonProps> = ({ ballonStyle, progress }) => {
  return (
    <Animated.View style={[styles.balloon, ballonStyle]}>
      {/* Balloon Body */}
      <View style={styles.balloonBody}>
        <AnimatedText text={progress} style={styles.balloonText} />
      </View>

      {/* Knot */}
      <View style={styles.knot} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  balloon: {
    alignItems: "center",
    justifyContent: "center",
    height: LAYOUT.indicatorSize,
    bottom: -LAYOUT.knobSize / 2,
    borderRadius: 2,
    backgroundColor: COLORS.base,
    position: "absolute",
  },
  balloonBody: {
    width: 52,
    height: 52,
    borderTopLeftRadius: 240, // 480% of 52
    borderTopRightRadius: 240,
    borderBottomLeftRadius: 240,
    borderBottomRightRadius: 31.2, // 60% of 52
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.base,
    position: "absolute",
    top: -LAYOUT.knobSize,
    transform: [{ rotateZ: "45deg" }],
  },
  balloonText: {
    color: "white",
    fontWeight: "600",
    borderColor: "black",
    transform: [{ rotateZ: "-45deg" }],
  },
  knot: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLORS.base,
    position: "absolute",
    top: 35, // Position at the bottom of the balloon
  },
});
