import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import AnimationListItem from "@/components/AnimationListItem";
import {
  AnimationListData,
  AnimationListDataType,
} from "@/constants/AnimationListData";

const App: React.FC = () => {
  const renderItem: ListRenderItem<AnimationListDataType> = ({ item }) => (
    <AnimationListItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={AnimationListData}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292F3F",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  indexText: {
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});

export default App;
