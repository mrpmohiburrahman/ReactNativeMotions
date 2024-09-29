import { SafeAreaView, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CardHeight = 60;
const CardWidth = 60; //(3 / 4) * CardHeight;

const App = () => {
  const progress = useSharedValue(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E3E62" }}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "#1E3E62",
          alignItems: "center",
          justifyContent: "center",
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
                  // shadowColor: "#bbbbbb",
                  // shadowOffset: { width: 0, height: 0 },
                  // shadowOpacity: 0.1,
                  // shadowRadius: 15,
                  // elevation: 4,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {},
});
export default App;
