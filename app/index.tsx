import Card from "@/components/Cards";
import CustomFlatList from "@/components/CustomFlatList";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Stacked Card Component */}
      <Card activeIndex={activeIndex} />

      {/* Display Current Index */}
      <Text style={styles.indexText}>Current Index: {activeIndex}</Text>

      {/* FlatList Component */}
      <CustomFlatList data={[0, 1, 2, 3, 4]} onIndexChange={setActiveIndex} />
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
