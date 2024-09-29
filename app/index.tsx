import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const CardHeight = 120;
const CardWidth = (3 / 4) * CardHeight;

const App = () => {
  const progress = useSharedValue(0);

  return (
    <Animated.View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withTiming(1, {
          // mass: 2,
        });
      }}
      onTouchEnd={() => {
        progress.value = withTiming(0);
      }}
    >
      {new Array(4).fill(null).map((_, index) => {
        const rStyle = useAnimatedStyle(() => {
          const translateX = interpolate(
            progress.value,
            [0, 1],
            [0, index * 10]
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
              styles.card,
              {
                height: CardHeight - index * 10,
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3E62",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    height: CardHeight,
    width: CardWidth,
    borderRadius: 20,
    borderCurve: "continuous",
    backgroundColor: "white",
    // shadowColor: "#bbbbbb",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.1,
    // shadowRadius: 15,
    // elevation: 4,
    borderWidth: 0.5,
    borderColor: "#a0a0a0",
  },
});
export default App;
