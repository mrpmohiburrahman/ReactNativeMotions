import React, { useState, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const CardHeight = 60;
const CardWidth = 60;

const App = () => {
  const progress = useSharedValue(0);
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reference for viewability config callback
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50, // Item is considered visible if 50% is visible
  });

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E3E62" }}>
      {/* Stacked card */}
      <View
        style={{
          width: CardWidth,
          height: CardHeight,
          alignSelf: "center",
          marginVertical: 20,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "#1E3E62",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
          }}
          onTouchStart={() => {
            progress.value = withTiming(1);
          }}
          onTouchEnd={() => {
            progress.value = withTiming(0);
          }}
        >
          {new Array(3).fill(null).map((_, index) => {
            const rStyle = useAnimatedStyle(() => {
              const translateX = interpolate(
                progress.value,
                [0, 1],
                [0, index * 8]
              );

              return {
                transform: [
                  {
                    translateX: translateX,
                  },
                ],
              };
            }, []);

            return (
              <Animated.View
                key={index}
                style={[
                  {
                    position: "absolute",
                    height: CardHeight,
                    width: CardWidth,
                    borderRadius: 20,
                    borderCurve: "continuous",
                    backgroundColor: "#ede8ec",
                    borderWidth: 0.5,
                    borderColor: "#a0a0a0",
                  },
                  {
                    height: CardHeight - index * 5,
                  },
                  {
                    zIndex: -index,
                  },
                  rStyle,
                ]}
              />
            );
          })}
        </Animated.View>
      </View>

      {/* Display Current Index */}
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        Current Index: {activeIndex}
      </Text>

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
          <View
            style={{
              height: 40,
              width: SCREEN_WIDTH,
              borderWidth: 1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
  indexText: {},
});

export default App;
