import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { swipe } from "../../assets";

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);

const SwipeMotion = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    handlePress();
  }, []);
  const handlePress = () => {
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true
      ),
      // go back to 0 at the end
      withTiming(0, { duration: TIME / 2, easing: EASING })
    );
  };
  return (
    <View style={styles.container}>
      <Animated.Image
        source={swipe}
        style={[styles.imageContainer, animatedStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: -50,
  },
  imageContainer: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    position: "absolute",
    zIndex: 1,
  },
});

export default SwipeMotion;
