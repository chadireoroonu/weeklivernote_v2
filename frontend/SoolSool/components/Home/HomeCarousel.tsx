import * as React from "react";
import {
  StatusBar,
  Animated,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import UserStatus from "./UserStatus";
import { mainbackground } from "../../assets";

const { width } = Dimensions.get("screen");

const DATA = [
  {
    key: "0",
  },
  {
    key: "1",
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 40,
        flexDirection: "row",
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 8,
              width: 8,
              borderRadius: 5,
              backgroundColor: "#FFDE68",
              opacity,
              margin: 10,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

export default function HomeCarousel() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.background}>
      <StatusBar hidden />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 180 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center" }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "flex-start",
                  padding: 20,
                }}
              >
                <UserStatus identifier={item.key} />
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    // backgroundColor: "red",
    height: 480,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0%",
  },
});
