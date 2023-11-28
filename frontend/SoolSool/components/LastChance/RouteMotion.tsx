import React from "react";
import { StyleSheet, View, Text } from "react-native";

const RouteMotion = ({ sectionTimeArr }) => {
  const totalSectionTime = sectionTimeArr.reduce(
    (acc, section) => acc + section.sectionTime,
    0
  );

  return (
    <View style={styles.container}>
      {sectionTimeArr.map((section, index) => {
        const barColor =
          section.trafficType === 1
            ? "#FF6D4D"
            : section.trafficType === 2
            ? "#6878FF"
            : "lightgray";

        const barWidth = (section.sectionTime / totalSectionTime) * 100;

        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                backgroundColor: barColor,
                width: `${barWidth}%`,
                borderTopLeftRadius: index === 0 ? 5 : 0, // 첫번째 왼쪽 가장자리 둥글게
                borderBottomLeftRadius: index === 0 ? 5 : 0, // 첫번째 왼쪽 가장자리 둥글게
                borderTopRightRadius:
                  index === sectionTimeArr.length - 1 ? 5 : 0, // 마지막 오른쪽 가장자리 둥글게
                borderBottomRightRadius:
                  index === sectionTimeArr.length - 1 ? 5 : 0, // 마지막 오른쪽 가장자리 둥글게
              },
            ]}
          >
            <Text style={styles.timeText}>{section.sectionTime}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  bar: {
    height: 15,
    display: "flex",
    alignItems: "center",
  },
  timeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default RouteMotion;
