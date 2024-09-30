import React, { useRef, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, ViewToken } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

interface CalendarFlatListProps {
  onDateChange: (date: Date) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const TOTAL_DAYS = 365 * 100;
const BASE_INDEX = Math.floor(TOTAL_DAYS / 2);

const CalendarFlatList: React.FC<CalendarFlatListProps> = ({
  onDateChange,
}) => {
  const data = Array.from({ length: TOTAL_DAYS }, (_, i) => i);
  const flatListRef = useRef<Animated.FlatList<number>>(null);
  const today = new Date();
  const getDateForIndex = (index: number): Date => {
    const date = new Date(today);
    const diff = index - BASE_INDEX;
    date.setDate(date.getDate() + diff);
    return date;
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index ?? BASE_INDEX;
        const date = getDateForIndex(index);
        onDateChange(date);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: BASE_INDEX,
      animated: false,
    });
  }, []);

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
      scrollEventThrottle={16}
      bounces={false}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig.current}
      initialScrollIndex={BASE_INDEX}
      getItemLayout={getItemLayout}
      contentContainerStyle={{ height: 100 }}
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
