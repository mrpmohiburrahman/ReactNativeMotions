import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const CARD_HEIGHT = 60;
const CARD_WIDTH = 60;
const ANIMATION_DURATION = 300; // Duration for the translateX animation in milliseconds
const TRANSLATE_X_STEP = 8; // The step size for each translateX increment

const App = () => {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Shared values for translateX of the second and third cards
  const translateXSecondCard = useSharedValue(0);
  const translateXThirdCard = useSharedValue(0);

  // Reference for viewability config callback
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50, // Item is considered visible if 50% is visible
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
      console.log("Current Index:", viewableItems[0].index);
    }
  }).current;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumBegin: () => {
      console.log("The list is moving.");
    },
    onMomentumEnd: () => {
      console.log("The list stopped moving.");
    },
  });

  // Update translateX values based on activeIndex
  useEffect(() => {
    switch (activeIndex) {
      case 0:
        // All cards stacked as one
        translateXSecondCard.value = withTiming(0, {
          duration: ANIMATION_DURATION,
        });
        translateXThirdCard.value = withTiming(0, {
          duration: ANIMATION_DURATION,
        });
        break;
      case 1:
        // Two cards visible: second and third cards offset
        translateXSecondCard.value = withTiming(TRANSLATE_X_STEP, {
          duration: ANIMATION_DURATION,
        });
        translateXThirdCard.value = withTiming(TRANSLATE_X_STEP, {
          duration: ANIMATION_DURATION,
        });
        break;
      case 2:
        // Three cards visible: second card offset by TRANSLATE_X_STEP, third card by double
        translateXSecondCard.value = withTiming(TRANSLATE_X_STEP, {
          duration: ANIMATION_DURATION,
        });
        translateXThirdCard.value = withTiming(TRANSLATE_X_STEP * 2, {
          duration: ANIMATION_DURATION,
        });
        break;
      default:
        // For any index beyond 2, maintain the maximum offset
        translateXSecondCard.value = withTiming(TRANSLATE_X_STEP, {
          duration: ANIMATION_DURATION,
        });
        translateXThirdCard.value = withTiming(TRANSLATE_X_STEP * 2, {
          duration: ANIMATION_DURATION,
        });
        break;
    }
  }, [activeIndex, translateXSecondCard, translateXThirdCard]);

  // Animated styles for the second and third cards
  const animatedStyleSecondCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXSecondCard.value }],
  }));

  const animatedStyleThirdCard = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXThirdCard.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Stacked card */}
      <View style={styles.cardContainer}>
        {/* Base card (always at the bottom) */}
        <View style={styles.baseCard} />

        {/* Second card */}
        <Animated.View style={[styles.secondCard, animatedStyleSecondCard]} />

        {/* Top card */}
        <Animated.View style={[styles.topCard, animatedStyleThirdCard]} />
      </View>

      {/* Display Current Index */}
      <Text style={styles.indexText}>Current Index: {activeIndex}</Text>

      {/* FlatList */}
      <Animated.FlatList
        data={[0, 1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
        renderItem={() => (
          <View style={styles.listItem}>
            <Text>helloworld</Text>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3E62",
    justifyContent: "center",
  },
  cardContainer: {
    width: CARD_WIDTH + TRANSLATE_X_STEP * 2, // Adjust width to accommodate maximum offsets
    height: CARD_HEIGHT + TRANSLATE_X_STEP * 2, // Adjust height if needed
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  baseCard: {
    position: "absolute",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 20,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: 1,
  },
  secondCard: {
    position: "absolute",
    height: CARD_HEIGHT - 5, // Slightly smaller height
    width: CARD_WIDTH,
    borderRadius: 20,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: 0,
  },
  topCard: {
    position: "absolute",
    height: CARD_HEIGHT - 10, // Even smaller height
    width: CARD_WIDTH,
    borderRadius: 20,
    backgroundColor: "#ede8ec",
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
    zIndex: -1,
  },
  indexText: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  listItem: {
    height: 40,
    width: SCREEN_WIDTH,
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
