// components/Card.tsx

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

interface CardProps {
  activeIndex: number; // 0: Today or earlier, 1: Tomorrow, 2: Day after tomorrow or later
  translateXStep?: number; // Optional: Step size for translation (default: 8)
  animationDuration?: number; // Optional: Animation duration in milliseconds (default: 300)
}

const CARD_HEIGHT = 60;
const CARD_WIDTH = 60;

const Card: React.FC<CardProps> = ({
  activeIndex,
  translateXStep = 8,
  animationDuration = 300,
}) => {
  const translateXSecondCard = useSharedValue(0);
  const translateXThirdCard = useSharedValue(0);
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    colorProgress.value = withTiming(activeIndex !== 0 ? 1 : 0, {
      duration: animationDuration,
    });

    // Determine the direction based on positive or negative activeIndex
    const direction = activeIndex >= 0 ? 1 : -1;
    const absIndex = Math.abs(activeIndex);

    // Calculate translateX values
    translateXSecondCard.value = withTiming(
      absIndex >= 1 ? translateXStep * direction : 0,
      { duration: animationDuration }
    );

    translateXThirdCard.value = withTiming(
      absIndex >= 2 ? translateXStep * 2 * direction : 0,
      { duration: animationDuration }
    );
  }, [activeIndex, translateXStep, animationDuration]);

  const animatedStyleSecondCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXSecondCard.value }],
  }));

  const animatedStyleThirdCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXThirdCard.value }],
  }));

  // Animated style for the base card's background color
  const animatedStyleBaseCard = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      ["#f0e9ed", "#f4524e"]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={styles.cardContainer}>
      {/* Base card (always at the bottom) */}
      <Animated.View style={[styles.baseCard, animatedStyleBaseCard]} />

      {/* Second card */}
      <Animated.View style={[styles.secondCard, animatedStyleSecondCard]} />

      {/* Top card */}
      <Animated.View style={[styles.topCard, animatedStyleThirdCard]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH + 16, // Adjust width to accommodate maximum offsets
    height: CARD_HEIGHT + 16, // Adjust height if needed
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  baseCard: {
    position: "absolute",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 16,
    // Set initial background color to match the initial colorProgress (0)
    backgroundColor: "#f0e9ed",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: 1,
  },
  secondCard: {
    position: "absolute",
    height: CARD_HEIGHT - 5, // Slightly smaller height
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: 0,
  },
  topCard: {
    position: "absolute",
    height: CARD_HEIGHT - 10, // Even smaller height
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: -1,
  },
});

export default Card;
