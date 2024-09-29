import React, { useRef } from "react";
import { Dimensions, StyleSheet, Text, View, ViewToken } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

interface CustomFlatListProps {
  data: number[];
  onIndexChange: (index: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const CustomFlatList: React.FC<CustomFlatListProps> = ({
  data,
  onIndexChange,
}) => {
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index ?? 0;
        onIndexChange(index);
        console.log("Current Index:", index);
      }
    }
  ).current;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // Additional scroll handling if necessary
    },
    onMomentumBegin: () => {
      console.log("The list is moving.");
    },
    onMomentumEnd: () => {
      console.log("The list stopped moving.");
    },
  });

  return (
    <Animated.FlatList
      data={data}
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
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 40,
    width: SCREEN_WIDTH,
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomFlatList;
