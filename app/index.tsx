// App.tsx

import CalendarFlatList from "@/components/CalendarFlatList";
import Card from "@/components/Cards";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
// import Card from "./components/Card";
// import CalendarFlatList from "./components/CalendarFlatList";

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Helper function to calculate difference in days between two dates
  const getDayDifference = (date1: Date, date2: Date): number => {
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  };

  const handleDateChange = (selectedDate: Date) => {
    const today = new Date();
    const difference = getDayDifference(today, selectedDate);

    let newActiveIndex: number;
    if (difference <= 0) {
      newActiveIndex = 0;
    } else if (difference === 1) {
      newActiveIndex = 1;
    } else {
      newActiveIndex = 2;
    }

    setActiveIndex(newActiveIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Stacked Card Component */}
      <Card activeIndex={activeIndex} />

      {/* Display Current Index */}
      <Text style={styles.indexText}>Current Index: {activeIndex}</Text>

      {/* Calendar FlatList Component */}
      <CalendarFlatList onDateChange={handleDateChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3E62",
    justifyContent: "center",
  },
  indexText: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});

export default App;
