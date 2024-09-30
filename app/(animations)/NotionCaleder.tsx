// App.tsx

import CalendarFlatList from "@/components/CalendarFlatList";
import Card from "@/components/Cards";
import { getDayDifference } from "@/utis/getDayDifference";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleDateChange = (selectedDate: Date) => {
    const today = new Date();
    const difference = getDayDifference(today, selectedDate);
    setActiveIndex(difference);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card activeIndex={activeIndex} />
      {/* <Text style={styles.indexText}>Current Index: {activeIndex}</Text> */}
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
