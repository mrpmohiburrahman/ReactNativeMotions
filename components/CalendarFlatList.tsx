// components/CalendarFlatList.tsx

import React, { useRef, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, ViewToken } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

interface CalendarFlatListProps {
  onDateChange: (date: Date) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

// Define a large number to simulate infinite scrolling
const TOTAL_DAYS = 365 * 100; // 100 years
const BASE_INDEX = Math.floor(TOTAL_DAYS / 2); // Today is at the center

const CalendarFlatList: React.FC<CalendarFlatListProps> = ({
  onDateChange,
}) => {
  // Create a data array with indices from 0 to TOTAL_DAYS
  const data = Array.from({ length: TOTAL_DAYS }, (_, i) => i);

  const flatListRef = useRef<Animated.FlatList<number>>(null);

  // Today's date
  const today = new Date();

  // Calculate the date for a given index
  const getDateForIndex = (index: number): Date => {
    const date = new Date(today);
    const diff = index - BASE_INDEX;
    date.setDate(date.getDate() + diff);
    return date;
  };

  // Handle when viewable items change
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index ?? BASE_INDEX;
        const date = getDateForIndex(index);
        onDateChange(date);
      }
    }
  ).current;

  // Viewability config
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  // Scroll to the base index on mount
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: BASE_INDEX,
      animated: false,
    });
  }, []);

  // Handle scrolling events if needed
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

  // Render a single date item
  const renderItem = ({ item }: { item: number }) => {
    const date = getDateForIndex(item);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const dayOfWeek = date.toLocaleString("default", { weekday: "short" });

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
    );
  };

  // Handle FlatList's getItemLayout for performance
  const getItemLayout = (_: any, index: number) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      bounces={false}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig.current}
      initialScrollIndex={BASE_INDEX}
      getItemLayout={getItemLayout}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#1E3E62",
  },
  dayOfWeek: {
    fontSize: 16,
    color: "white",
  },
  day: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  month: {
    fontSize: 16,
    color: "white",
  },
});

export default CalendarFlatList;
