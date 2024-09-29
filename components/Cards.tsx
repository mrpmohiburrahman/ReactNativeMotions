import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

interface CardProps {
  activeIndex: number;
  translateXStep?: number;
  animationDuration?: number;
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
    switch (activeIndex) {
      case 0:
        translateXSecondCard.value = withTiming(0, {
          duration: animationDuration,
        });
        translateXThirdCard.value = withTiming(0, {
          duration: animationDuration,
        });
        colorProgress.value = withTiming(0, {
          duration: animationDuration,
        });
        break;
      case 1:
        translateXSecondCard.value = withTiming(translateXStep, {
          duration: animationDuration,
        });
        translateXThirdCard.value = withTiming(translateXStep, {
          duration: animationDuration,
        });
        colorProgress.value = withTiming(1, {
          duration: animationDuration,
        });
        break;
      case 2:
        translateXSecondCard.value = withTiming(translateXStep, {
          duration: animationDuration,
        });
        translateXThirdCard.value = withTiming(translateXStep * 2, {
          duration: animationDuration,
        });
        colorProgress.value = withTiming(1, {
          duration: animationDuration,
        });
        break;
      default:
        translateXSecondCard.value = withTiming(translateXStep, {
          duration: animationDuration,
        });
        translateXThirdCard.value = withTiming(translateXStep * 2, {
          duration: animationDuration,
        });
        colorProgress.value = withTiming(1, {
          duration: animationDuration,
        });
        break;
    }
  }, [
    activeIndex,
    translateXStep,
    animationDuration,
    translateXSecondCard,
    translateXThirdCard,
    colorProgress,
  ]);

  const animatedStyleSecondCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXSecondCard.value }],
  }));

  const animatedStyleThirdCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXThirdCard.value }],
  }));

  const animatedStyleBaseCard = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      ["#f0e9ed", "#f4524e"]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={styles.cardContainer}>
      <Animated.View style={[styles.baseCard, animatedStyleBaseCard]} />
      <Animated.View style={[styles.secondCard, animatedStyleSecondCard]} />
      <Animated.View style={[styles.topCard, animatedStyleThirdCard]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH + 16,
    height: CARD_HEIGHT + 16,
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  baseCard: {
    position: "absolute",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "#f0e9ed",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: 1,
  },
  secondCard: {
    position: "absolute",
    height: CARD_HEIGHT - 5,
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: 0,
  },
  topCard: {
    position: "absolute",
    height: CARD_HEIGHT - 10,
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: -1,
  },
});

export default Card;
