import React from "react";
import { View, StyleSheet } from "react-native";

const DotIndicator = ({ activeIndex }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 3 }, (_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex - 1 ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#363C4B", // 활성화된 동그라미
  },
  inactiveDot: {
    backgroundColor: "lightgrey", // 비활성화된 동그라미
  },
});

export default DotIndicator;
